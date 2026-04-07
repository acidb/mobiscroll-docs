#!/usr/bin/env node
// Post-build script: strips MDX/JSX artifacts from generated LLM files.
// Handles imports and component tags while preserving code block content.

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', 'build');

// Collect all .txt and .md files recursively
function collectFiles(dir, result = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(full, result);
    } else if (/\.(txt|md)$/.test(entry.name)) {
      result.push(full);
    }
  }
  return result;
}

// MDX import sources that should be removed (Docusaurus internals & local MDX partials).
// Imports from actual packages (e.g. '@mobiscroll/...', 'jquery', 'luxon') are preserved.
const MDX_IMPORT_PATTERNS = [
  /^\s*import\s+.*from\s+['"]@theme\/.*['"]\s*;?\s*$/,
  /^\s*import\s+.*from\s+['"]@site\/.*['"]\s*;?\s*$/,
  /^\s*import\s+.*from\s+['"]\.\.?\/.*\.mdx?['"]\s*;?\s*$/,
  /^\s*import\s+.*from\s+['"]\.\.?\/.*links\.js['"]\s*;?\s*$/,
  /^\s*import\s+.*from\s+['"]\.\.?\/.*Links\.js['"]\s*;?\s*$/,
  /^\s*import\s+\{.*toc\s+as\s+.*\}\s+from\s+['"].*['"]\s*;?\s*$/,
  /^\s*import\s+.*from\s+['"]@img-comparison-slider\/.*['"]\s*;?\s*$/,
];

function isMdxImport(line) {
  return MDX_IMPORT_PATTERNS.some((re) => re.test(line));
}

// Self-closing MDX component tags to remove entirely (line by line).
// These are Docusaurus UI components that produce no useful text for LLMs.
const SELF_CLOSING_MDX = /^\s*<(?:DocCardList|SupportedPlatforms)\b[^>]*\/>\s*$/;

// Multi-line self-closing MDX tag (e.g. <DocCardList items={[\n...\n]} />)
const MULTI_LINE_SELF_CLOSING_START = /^\s*<(?:DocCardList|SupportedPlatforms)\b/;

// Opening/closing tags whose entire block (including children) should be removed.
// These are UI-only components that produce no useful text for LLMs.
const BLOCK_REMOVE_TAGS = ['ImgComparisonSlider'];

function stripJsx(content) {
  const lines = content.split('\n');
  const out = [];
  let inFencedBlock = false;
  let inCodeBlockTag = false; // inside <CodeBlock>...</CodeBlock>
  let codeBlockLang = '';
  let codeBlockBody = [];
  let inMultiLineSelfClosing = false;
  let selfClosingDepth = 0;
  let inBlockRemoveTag = false;
  let blockRemoveTagName = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // ── Track fenced code blocks (```) ──────────────────────────────
    if (/^\s*(`{3,}|~{3,})/.test(line)) {
      if (!inFencedBlock) {
        inFencedBlock = true;
        out.push(line);
        continue;
      } else {
        inFencedBlock = false;
        out.push(line);
        continue;
      }
    }

    // Inside a fenced code block: pass through untouched
    if (inFencedBlock) {
      out.push(line);
      continue;
    }

    // ── Block-remove tags (e.g. <ImgComparisonSlider>...</ImgComparisonSlider>) ──
    if (inBlockRemoveTag) {
      if (new RegExp('^\\s*</' + blockRemoveTagName + '>').test(line)) {
        inBlockRemoveTag = false;
        blockRemoveTagName = '';
      }
      continue; // skip entire block content
    }
    // Check for opening block-remove tag
    const blockMatch = line.match(new RegExp('^\\s*<(' + BLOCK_REMOVE_TAGS.join('|') + ')\\b'));
    if (blockMatch) {
      // Self-closing on same line?
      if (/\/>/.test(line)) continue;
      inBlockRemoveTag = true;
      blockRemoveTagName = blockMatch[1];
      continue;
    }

    // ── Multi-line self-closing MDX component (e.g. <DocCardList items={[...]} />) ──
    if (inMultiLineSelfClosing) {
      // Count braces to find end
      for (const ch of line) {
        if (ch === '{') selfClosingDepth++;
        if (ch === '}') selfClosingDepth--;
      }
      if (/\/>/.test(line) && selfClosingDepth <= 0) {
        inMultiLineSelfClosing = false;
      }
      continue; // skip entire block
    }

    // ── <CodeBlock language="..."> → convert to fenced code block ───
    const cbOpen = line.match(
      /^\s*<CodeBlock\s+language="([^"]*)"(?:\s+title="([^"]*)")?>/
    );
    if (cbOpen) {
      inCodeBlockTag = true;
      codeBlockLang = cbOpen[1] || '';
      codeBlockBody = [];
      if (cbOpen[2]) {
        // Emit the title as a bold line before the code fence
        out.push('**' + cbOpen[2] + '**');
        out.push('');
      }
      continue;
    }
    if (inCodeBlockTag) {
      if (/^\s*<\/CodeBlock>\s*$/.test(line)) {
        // Emit as fenced code block
        out.push('```' + codeBlockLang);
        out.push(...codeBlockBody);
        out.push('```');
        inCodeBlockTag = false;
        codeBlockLang = '';
        codeBlockBody = [];
      } else {
        codeBlockBody.push(line);
      }
      continue;
    }

    // ── <TabItem value="..." label="..."> → convert to heading ──────
    const tabOpen = line.match(
      /^\s*<TabItem\s+[^>]*label="([^"]*)"[^>]*>/
    );
    if (tabOpen) {
      out.push('**' + tabOpen[1] + '**');
      out.push('');
      continue;
    }

    // ── </TabItem>, <Tabs ...>, </Tabs> → remove ───────────────────
    if (/^\s*<\/?Tabs\b[^>]*>?\s*$/.test(line)) continue;
    if (/^\s*<\/TabItem>\s*$/.test(line)) continue;

    // ── Self-closing MDX components (single line) ───────────────────
    if (SELF_CLOSING_MDX.test(line)) continue;

    // ── Multi-line self-closing MDX start ───────────────────────────
    if (MULTI_LINE_SELF_CLOSING_START.test(line) && !/\/>/.test(line)) {
      inMultiLineSelfClosing = true;
      selfClosingDepth = 0;
      for (const ch of line) {
        if (ch === '{') selfClosingDepth++;
        if (ch === '}') selfClosingDepth--;
      }
      continue;
    }

    // ── MDX imports → remove ────────────────────────────────────────
    if (isMdxImport(line)) continue;

    // ── table-hide UI wrapper block → remove ────────────────────────
    if (/^\s*<label\s+className="table-hide-wrapper">/.test(line)) {
      // Skip until </label>
      while (i < lines.length - 1 && !/<\/label>/.test(lines[i])) i++;
      continue;
    }

    // ── Standalone className HTML lines (UI chrome, not code) ───────
    if (/^\s*<[a-z]+\s[^>]*className="[^"]*"[^>]*\/?>/.test(line)) continue;

    out.push(line);
  }

  // Clean up excessive blank lines (3+ → 2)
  return out.join('\n').replace(/\n{3,}/g, '\n\n');
}

// ─── Main ────────────────────────────────────────────────────────────────────
const files = collectFiles(BUILD_DIR);
let processed = 0;

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  const cleaned = stripJsx(original);
  if (cleaned !== original) {
    fs.writeFileSync(file, cleaned, 'utf8');
    processed++;
  }
}

console.log(`strip-jsx: cleaned ${processed} of ${files.length} files in build/`);
