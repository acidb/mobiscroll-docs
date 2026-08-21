#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const lib = require(path.join(__dirname, 'lib.js'));
const RULES = require(path.join(__dirname, '..', '..', 'scripts', 'llms-marker-rules.js'));

// PostToolUse: enforces the llms marker system documented in writing-docs.md
// ("Marking up component content the llms plugin would otherwise delete").
// For `kind: 'simple'`/`kind: 'blockremove'` components (see
// scripts/llms-marker-rules.js), the correct marker is mechanically
// derivable from the tag's own attributes with no ambiguity, so this hook
// auto-inserts it directly into the file. For `kind: 'complex'` components,
// getting the wrap boundaries right needs judgment a regex could get wrong,
// so this hook only flags them — it never edits for those. Reports what it
// did via exit 2 (the one channel PostToolUse has to surface text back to
// the model, same as post-tool-use-log.js).

function extractAttrs(tagAttrsStr) {
  const attrs = {};
  const re = /([a-zA-Z][\w-]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
  let m;
  while ((m = re.exec(tagAttrsStr))) {
    attrs[m[1]] = m[2] !== undefined ? m[2] : m[3];
  }
  return attrs;
}

function buildMarker(rule, attrs) {
  const parts = [];
  for (const key of rule.attrs) {
    if (!(key in attrs)) return null; // required attr missing — don't guess, skip auto-insert
    parts.push(`${key}=${attrs[key]}`);
  }
  for (const key of rule.optionalAttrs || []) {
    if (key in attrs) parts.push(`${key}=${attrs[key]}`);
  }
  const paramStr = parts.length ? `;${parts.join(';')}` : '';
  return `{/* llms:${rule.marker}${paramStr} */}`;
}

// Simple/self-closing components: single-line usage only — a component
// whose attributes span multiple lines needs a human to place the marker
// correctly, so it's left for the `complex` bucket's "needs attention" path.
// The marker can sit either inline right before the tag on the same line
// (e.g. postman-collection.md) or alone on the line directly above it (e.g.
// ai-integration.md) — both are real conventions already in use, so both
// must be recognized or an already-marked usage gets a duplicate marker.
function processSimpleRule(lines, rule) {
  const tagRe = new RegExp(`<${rule.component}\\b([^>]*)/>`);
  const markerRe = `\\{/\\*\\s*llms:${rule.marker}(?:;[^*]*)?\\s*\\*/\\}`;
  const inlineBeforeRe = new RegExp(`${markerRe}\\s*<${rule.component}\\b`);
  const standaloneAboveRe = new RegExp(`^\\s*${markerRe}\\s*$`);
  let inserted = 0;
  let needsAttention = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!tagRe.test(line)) continue;
    if (inlineBeforeRe.test(line)) continue;
    if (i > 0 && standaloneAboveRe.test(lines[i - 1])) continue;
    const match = line.match(tagRe);
    const attrs = extractAttrs(match[1]);
    const marker = buildMarker(rule, attrs);
    if (!marker) {
      needsAttention = true; // required attr missing/unparseable — flag, don't guess
      continue;
    }
    const idx = match.index;
    lines[i] = line.slice(0, idx) + marker + line.slice(idx);
    inserted++;
  }
  return { inserted, needsAttention };
}

// ImgComparisonSlider: fixed, non-nesting wrapper — find each opening tag
// (open/close form only; a self-closing usage has no children to hide, so
// nothing to mark) not already preceded by the marker, and wrap through its
// first matching closing tag.
function processBlockRemoveRule(lines, rule) {
  const openRe = new RegExp(`<${rule.component}\\b[^>]*>`);
  const closeRe = new RegExp(`</${rule.component}>`);
  const alreadyOpenRe = /^\s*\{\/\*\s*llms:blockremove\s*\*\/\}\s*$/;
  const alreadyCloseRe = /^\s*\{\/\*\s*\/llms:blockremove\s*\*\/\}\s*$/;
  let inserted = 0;
  let needsAttention = false;
  const insertions = []; // { atLine, text } applied after the scan, back-to-front

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!openRe.test(line) || /\/>/.test(line)) continue; // skip self-closing
    if (i > 0 && alreadyOpenRe.test(lines[i - 1])) continue; // already marked
    let closeLine = -1;
    for (let j = i; j < lines.length; j++) {
      if (closeRe.test(lines[j])) {
        closeLine = j;
        break;
      }
    }
    if (closeLine === -1) {
      needsAttention = true; // no closing tag found on this file's content — don't guess
      continue;
    }
    if (closeLine + 1 < lines.length && alreadyCloseRe.test(lines[closeLine + 1])) continue; // already marked
    insertions.push({ before: i, after: closeLine });
    inserted++;
  }

  // Apply back-to-front so earlier indices stay valid as lines are inserted.
  for (const { before, after } of insertions.reverse()) {
    lines.splice(after + 1, 0, '{/* /llms:blockremove */}');
    lines.splice(before, 0, '{/* llms:blockremove */}');
  }
  return { inserted, needsAttention };
}

// Recognizes both marker families in use: {/* llms:TYPE;... */} and, for
// CodeBlock specifically, the HTML-comment <!-- llms-fence: ... --> form
// (required over {/* */} because it must survive sitting inline next to
// real JSX in some usages — see writing-docs.md).
const ANY_MARKER_RE = /\{\/\*\s*llms:\w+|<!--\s*llms-fence/;

function processComplexRule(lines, rule) {
  const tagRe = new RegExp(`<${rule.component}\\b`);
  for (let i = 0; i < lines.length; i++) {
    if (!tagRe.test(lines[i])) continue;
    const sameLine = lines[i].slice(0, lines[i].search(tagRe));
    const prevLine = i > 0 ? lines[i - 1] : '';
    if (ANY_MARKER_RE.test(sameLine) || ANY_MARKER_RE.test(prevLine)) continue;
    return true; // at least one unmarked usage found
  }
  return false;
}

function main() {
  const payload = lib.readStdinJson();
  const root = payload.cwd || process.cwd();

  const toolName = payload.tool_name;
  if (!['Edit', 'Write', 'MultiEdit'].includes(toolName)) process.exit(0);

  const toolInput = payload.tool_input || {};
  const rawPath = toolInput.file_path;
  if (!rawPath) process.exit(0);

  const relPath = lib.toRelative(root, rawPath);
  if (!relPath || lib.isExcludedPath(relPath)) process.exit(0);
  if (!/\.mdx?$/.test(relPath)) process.exit(0);
  // Only the actual documentation content trees ever contain real JSX usage
  // of these components — everything else (CLAUDE.md, writing-docs.md,
  // README-style repo docs, .ai/knowledge/, etc.) only ever *mentions* a
  // component name in prose, which would otherwise false-positive here.
  if (!/^(docs|connect|versioned_docs)\//.test(relPath)) process.exit(0);

  const absPath = path.join(root, relPath);
  let content;
  try {
    content = fs.readFileSync(absPath, 'utf8');
  } catch (_) {
    process.exit(0);
  }

  const lines = content.split('\n');
  const autoAdded = [];
  const needsAttention = [];
  let changed = false;

  for (const rule of RULES) {
    try {
      if (rule.kind === 'simple') {
        const { inserted, needsAttention: flagged } = processSimpleRule(lines, rule);
        if (inserted > 0) {
          changed = true;
          autoAdded.push(`${rule.component} (${inserted}x, {/* llms:${rule.marker} */})`);
        }
        if (flagged) needsAttention.push(`${rule.component} — a usage is missing a required attribute; add {/* llms:${rule.marker};... */} by hand`);
      } else if (rule.kind === 'blockremove') {
        const { inserted, needsAttention: flagged } = processBlockRemoveRule(lines, rule);
        if (inserted > 0) {
          changed = true;
          autoAdded.push(`${rule.component} (${inserted}x, {/* llms:blockremove */} wrap)`);
        }
        if (flagged) needsAttention.push(`${rule.component} — a usage has no matching closing tag in this file; wrap it with {/* llms:blockremove */} by hand`);
      } else if (rule.kind === 'complex') {
        if (processComplexRule(lines, rule)) {
          needsAttention.push(`${rule.component} — ${rule.reason}. See writing-docs.md's marker table.`);
        }
      }
    } catch (err) {
      lib.logError(root, 'post-tool-use-marker-check', `rule:${rule.component}`, err);
    }
  }

  if (changed) {
    try {
      fs.writeFileSync(absPath, lines.join('\n'));
    } catch (err) {
      lib.logError(root, 'post-tool-use-marker-check', 'write', err);
      process.exit(0);
    }
  }

  if (autoAdded.length === 0 && needsAttention.length === 0) process.exit(0);

  const msgParts = [`llms marker check for ${relPath}:`];
  if (autoAdded.length) msgParts.push(`Auto-added markers for: ${autoAdded.join(', ')}. Verify they look correct.`);
  if (needsAttention.length) msgParts.push(`Needs a manual marker: ${needsAttention.join('; ')}.`);
  process.stderr.write(msgParts.join(' ') + '\n');
  process.exit(2);
}

main();
