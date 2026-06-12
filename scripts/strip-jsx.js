#!/usr/bin/env node
// Post-build script: strips MDX/JSX artifacts from generated LLM files.
// Handles imports and component tags while preserving code block content.

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', 'build');

const FRAMEWORKS = ['angular', 'react', 'vue', 'jquery', 'javascript'];

function detectFramework(filePath) {
  const normalized = filePath.replace(/\\/g, '/');
  for (const fw of FRAMEWORKS) {
    if (new RegExp(`[/\\-]${fw}[/\\-.]`).test(normalized)) {
      return fw;
    }
  }
  return null;
}

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

// Decode HTML entities introduced by MDX 3's JSX parser escaping and by the docs build.
// includeAngleBrackets: also decode &lt;/&gt; — safe for framework files (angular, react,
// vue, jquery, javascript) where they appear in type annotations and template examples,
// but NOT for connect files where they protect XML attribute values like
// <Parameter type="Array&lt;Calendar&gt;">.
function decodeHtmlEntities(text, includeAngleBrackets = false) {
  let result = text
    .replace(/&#123;/g, '{')
    .replace(/&#125;/g, '}');
  if (includeAngleBrackets) {
    result = result
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }
  return result;
}

function stripJsx(content, framework) {
  // Resolve MDX prop {props.framework} before any other processing
  if (framework) {
    content = content.replace(/\$\{props\.framework\}/g, framework);
    content = content.replace(/\{props\.framework\}/g, framework);
  }
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
    let line = lines[i];

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

    // ── JSX fragment open/close → remove ────────────────────────────────────
    if (/^\s*<>\s*$/.test(line)) continue;
    if (/^\s*<\/>\s*$/.test(line)) continue;
    if (/^\s*<><\/>\s*$/.test(line)) continue;

    // ── JSX space expression {' '} or {" "} → strip from line ───────────────
    line = line.replace(/\{['"]\s*['"]\}/g, '');

    // ── Heading anchor IDs → strip (MDX explicit anchors, noise in LLM output) ─
    line = line.replace(/^(#{1,6}\s+.*?)\s*\{#[^}]+\}/, '$1');


    // ── HTML tables with className (UI chrome, e.g. WCAG accessibility tables) ─
    if (/^\s*<table\b[^>]*className=/.test(line)) {
      inBlockRemoveTag = true;
      blockRemoveTagName = 'table';
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
      // Capture inline template literal content on the same line as the opening tag
      const restOfLine = line.slice(cbOpen[0].length);
      const inlineMatch = restOfLine.match(/^\s*\{\s*`([\s\S]*)/);
      if (inlineMatch && inlineMatch[1].trim()) codeBlockBody.push(inlineMatch[1]);
      continue;
    }
    if (inCodeBlockTag) {
      let closingMatched = false;
      if (/^\s*\}?\s*<\/CodeBlock>\s*$/.test(line)) {
        closingMatched = true;
      } else if (/`\s*\}\s*<\/CodeBlock>\s*$/.test(line)) {
        // Template literal closes on the same line as last content: extract content before `}
        const contentPart = line.replace(/`\s*\}\s*<\/CodeBlock>\s*$/, '');
        if (contentPart.trim()) codeBlockBody.push(contentPart);
        closingMatched = true;
      }
      if (closingMatched) {
        // Emit as fenced code block, stripping template literal backtick wrappers
        let body = codeBlockBody.slice();
        if (body.length > 0 && body[0].startsWith('`')) body[0] = body[0].slice(1);
        if (body.length > 0 && body[body.length - 1].endsWith('`')) body[body.length - 1] = body[body.length - 1].slice(0, -1);
        while (body.length > 0 && body[0].trim() === '') body.shift();
        while (body.length > 0 && body[body.length - 1].trim() === '') body.pop();
        out.push('```' + codeBlockLang);
        out.push(...body);
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

    // ── MDX toc exports → remove ────────────────────────────────────
    if (/^\s*export\s+const\s+toc\b/.test(line)) continue;

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

  // Clean up excessive blank lines (3+ → 2), then decode HTML entities.
  // Pass !!framework so &lt;/&gt; are decoded for framework files but preserved for connect/icons.
  return decodeHtmlEntities(out.join('\n').replace(/\n{3,}/g, '\n\n'), !!framework);
}

// ─── Main ────────────────────────────────────────────────────────────────────
const files = collectFiles(BUILD_DIR);
let processed = 0;

for (const file of files) {
  const framework = detectFramework(file);
  const original = fs.readFileSync(file, 'utf8');
  const cleaned = stripJsx(original, framework);
  if (cleaned !== original) {
    fs.writeFileSync(file, cleaned, 'utf8');
    processed++;
  }
}

console.log(`strip-jsx: cleaned ${processed} of ${files.length} files in build/`);
