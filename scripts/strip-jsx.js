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
  /^\s*>?\s*import\s+.*from\s+['"]@theme\/.*['"]\s*;?\s*$/,
  /^\s*>?\s*import\s+.*from\s+['"]@site\/.*['"]\s*;?\s*$/,
  /^\s*>?\s*import\s+.*from\s+['"]\.\.?\/.*\.mdx?['"]\s*;?\s*$/,
  /^\s*>?\s*import\s+.*from\s+['"]\.\.?\/.*links\.js['"]\s*;?\s*$/,
  /^\s*>?\s*import\s+.*from\s+['"]\.\.?\/.*Links\.js['"]\s*;?\s*$/,
  /^\s*>?\s*import\s+\{.*toc\s+as\s+.*\}\s+from\s+['"].*['"]\s*;?\s*$/,
  /^\s*>?\s*import\s+.*from\s+['"]@img-comparison-slider\/.*['"]\s*;?\s*$/,
  /^\s*>?\s*import\s+.*from\s+['"]react['"]\s*;?\s*$/,
  /^\s*>?\s*import\s+.*from\s+['"]@docusaurus\/.*['"]\s*;?\s*$/,
];

function isMdxImport(line) {
  return MDX_IMPORT_PATTERNS.some((re) => re.test(line));
}

// Self-closing MDX component tags to remove entirely (line by line).
// These are Docusaurus UI components that produce no useful text for LLMs.
const SELF_CLOSING_MDX = /^\s*<(?:DocCardList|SupportedPlatforms|PostmanRunButton)\b[^>]*\/>\s*$/;

// Multi-line self-closing MDX tag (e.g. <DocCardList items={[\n...\n]} />)
const MULTI_LINE_SELF_CLOSING_START = /^\s*<(?:DocCardList|SupportedPlatforms|PostmanRunButton)\b/;

// docs/*/guides/ai-integration.md and connect/getting-started/ai-integration.md define
// local components (DocsUrl, DocsLink, FileBlock, McpUrl, McpConfigBlock, McpCliBlock)
// whose entire output is computed from props at render time — 0.5.1's blanket PascalCase
// tag strip removes the tag (and thus the props) with nothing left behind. These
// <!--llms:...--> markers (added around each usage in the source) survive that stripping
// untouched, so we use them to reconstruct plain-text equivalents of what each component
// actually renders. See each component's definition at the top of the relevant .md file.
const DOCS_BASE_URL = 'https://mobiscroll.com/docs';
const MCP_BASE_URL = 'https://mcp.mobiscroll.com/';

function mcpConfigJson(tool) {
  const configs = {
    claude: { mcpServers: { mobiscroll: { type: 'http', url: MCP_BASE_URL } } },
    cursor: { mcpServers: { mobiscroll: { url: MCP_BASE_URL } } },
    vscode: { servers: { mobiscroll: { type: 'http', url: MCP_BASE_URL } } },
  };
  return JSON.stringify(configs[tool], null, 2);
}

function parseMarkerParams(paramStr) {
  const params = {};
  if (!paramStr) return params;
  for (const pair of paramStr.split(';')) {
    const eq = pair.indexOf('=');
    if (eq === -1) continue;
    params[pair.slice(0, eq)] = pair.slice(eq + 1);
  }
  return params;
}

// Single-marker (no children to preserve) component reconstructions: docsurl, mcpurl,
// mcpconfig, mcpcli, fileblock. Resolved in one pass over the whole file, since each
// occurrence is fully self-contained in its own marker. Params are `;`-separated (not
// `|`) since these markers sit inside GFM table cells, where an unescaped `|` would
// split into a new column.
function resolveInlineMarkers(content) {
  content = content.replace(/\{\/\*\s*llms:(docsurl|mcpurl|mcpconfig|mcpcli|fileblock)(?:;(.*?))?\s*\*\/\}/g, (_m, type, paramStr) => {
    const params = parseMarkerParams(paramStr);
    switch (type) {
      case 'docsurl':
        return '`' + DOCS_BASE_URL + '/' + params.path + '`';
      case 'mcpurl':
        return '`' + MCP_BASE_URL + '`';
      case 'mcpconfig':
        return '```json\n' + mcpConfigJson(params.tool) + '\n```';
      case 'mcpcli': {
        const scopeFlag = params.scope ? ` --scope ${params.scope}` : '';
        return '```bash\nclaude mcp add --transport http' + scopeFlag + ' mobiscroll ' + MCP_BASE_URL + '\n```';
      }
      case 'fileblock': {
        const filePath = path.join(__dirname, '..', 'static', params.src);
        let fileContent;
        try {
          fileContent = fs.readFileSync(filePath, 'utf8');
        } catch (e) {
          return `[Could not load ${params.src}]`;
        }
        return fileContent.replace(/\{\{DOCS_BASE_URL\}\}/g, DOCS_BASE_URL);
      }
      default:
        return '';
    }
  });
  // docslink wraps a tag that may or may not have had children: {/* llms:docslink|
  // path=X|filename=Y */}SURVIVING_TEXT{/* /llms:docslink */}. SURVIVING_TEXT is
  // whatever the plugin's "strip tag, keep inner text" left behind — empty for a
  // self-closing usage, the link's visible label for a wrapping one. Rebuild as a
  // proper markdown link either way.
  content = content.replace(/\{\/\*\s*llms:docslink;(.*?)\s*\*\/\}([\s\S]*?)\{\/\*\s*\/llms:docslink\s*\*\/\}/g, (_m, paramStr, body) => {
    const params = parseMarkerParams(paramStr);
    const label = body.trim() || params.filename || params.path.split('/').pop();
    return `[${label}](${DOCS_BASE_URL}/${params.path})`;
  });
  return content;
}

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
  // Normalize Windows CRLF to LF so blank-line collapse (\n{3,}) works correctly
  content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  // Resolve MDX prop {props.framework} before any other processing
  if (framework) {
    content = content.replace(/\$\{props\.framework\}/g, framework);
    content = content.replace(/\{props\.framework\}/g, framework);
  }
  // Resolve self-contained <!--llms:docsurl|...--> etc. markers (see their definition
  // above) before line-by-line processing, since they need no surrounding context.
  content = resolveInlineMarkers(content);
  const lines = content.split('\n');
  const out = [];
  let inFencedBlock = false;
  let inCodeBlockTag = false; // inside <!-- llms-fence: ... --> ... <!-- /llms-fence -->
  let codeBlockLang = '';
  let codeBlockTitle = '';
  let codeBlockBody = [];
  let inMultiLineSelfClosing = false;
  let selfClosingDepth = 0;
  let inBlockRemoveTag = false;
  let blockRemoveTagName = '';
  let inMarkerBlockRemove = false; // between {/* llms:blockremove */} and {/* /llms:blockremove */}
  let paramStack = []; // stack of in-progress {/* llms:param;... */} ... {/* /llms:param */} frames
  let inExportFn = false;
  let exportFnDepth = 0;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // ── {/* llms:param;name=..;type=..;required=1;default=.. */} ... {/* /llms:param */}
    // → rebuild a <Parameter name type required defaultValue>...</Parameter> block
    // cleanly. 0.5.1 strips the wrapper tag but keeps children, so the description
    // (real body text) survives on its own — but name/type/required/defaultValue are
    // all attributes, not children, so they're deleted along with the tag with
    // nothing left behind. Worse, when defaultValue's value contains a nested tag
    // (defaultValue={<code>text</code>}), the plugin's tag regex stops at the
    // *inner* tag's '>', leaving mangled leftover text (e.g. "text</code>} id=\"...\">")
    // in the middle of the description. The marker carries every attribute's true
    // value, so we discard any such mangled leftover and rebuild a full header
    // ("**name** (`type`, required)") plus a trailing "**Default:**" line.
    // Parameter blocks can nest (an object-typed parameter listing its own
    // sub-fields), so this is a stack: each nested block's finished reconstruction
    // is appended into its parent's body rather than emitted directly. This whole
    // check runs *before* fenced-code-block tracking below, and while a frame is
    // open every other line (including ``` fences and their contents) is redirected
    // into that frame's body verbatim, since a Parameter's description can itself
    // contain a code sample — the outer inFencedBlock state must not see those
    // fences, or their content would leak straight to `out` out of order instead
    // of landing inside the reconstructed block where it belongs.
    if (/^\s*\{\/\*\s*\/llms:param\s*\*\/\}\s*$/.test(line)) {
      const frame = paramStack.pop();
      const body = frame.body.filter((l) => !/^[^<]*<\/code>\}[^<]*>\s*$/.test(l));
      while (body.length && body[0].trim() === '') body.shift();
      while (body.length && body[body.length - 1].trim() === '') body.pop();
      const header =
        '**' + frame.name + '**' + (frame.type ? ' (`' + frame.type + '`' + (frame.required ? ', required' : '') + ')' : '');
      const rebuilt = [header, '', ...body];
      if (frame.hasDefault) rebuilt.push('', '**Default:** `' + frame.defaultValue + '`');
      const target = paramStack.length ? paramStack[paramStack.length - 1].body : out;
      target.push(...rebuilt);
      continue;
    }
    const paramOpen = line.match(/^\s*\{\/\*\s*llms:param;(.*?)\s*\*\/\}\s*$/);
    if (paramOpen) {
      const params = {};
      for (const pair of paramOpen[1].split(';')) {
        const eq = pair.indexOf('=');
        if (eq === -1) continue;
        params[pair.slice(0, eq)] = pair.slice(eq + 1);
      }
      paramStack.push({
        name: params.name || '',
        type: params.type || '',
        required: params.required === '1',
        hasDefault: Object.prototype.hasOwnProperty.call(params, 'default'),
        defaultValue: (params.default || '').replace(/&#59;/g, ';'),
        body: [],
      });
      continue;
    }
    if (paramStack.length) {
      paramStack[paramStack.length - 1].body.push(line);
      continue;
    }

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

    // ── {/* llms:blockremove */} ... {/* /llms:blockremove */} → drop entirely ──
    // Marks components like <ImgComparisonSlider> whose whole block (including
    // real HTML children — <figure>, <img>, <svg> — that 0.5.1 leaves behind once
    // it strips only the wrapper tag) has no useful text for LLMs and should be
    // removed the same way BLOCK_REMOVE_TAGS below already does for the pre-0.5.1
    // case where the wrapper tag itself was still present to detect.
    if (inMarkerBlockRemove) {
      if (/^\s*\{\/\*\s*\/llms:blockremove\s*\*\/\}\s*$/.test(line)) {
        inMarkerBlockRemove = false;
      }
      continue;
    }
    if (/^\s*\{\/\*\s*llms:blockremove\s*\*\/\}\s*$/.test(line)) {
      inMarkerBlockRemove = true;
      continue;
    }

    // ── Skip lines inside export arrow function declarations ─────────────────
    if (inExportFn) {
      for (const ch of line) {
        if (ch === '{') exportFnDepth++;
        if (ch === '}') exportFnDepth--;
      }
      if (exportFnDepth <= 0) {
        inExportFn = false;
        exportFnDepth = 0;
      }
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

    // ── <!-- llms-fence: lang | title --> ... <!-- /llms-fence --> → fenced code block ──
    // docusaurus-plugin-llms (0.5.1+) strips <CodeBlock>/</CodeBlock> tags themselves
    // before this script runs, leaving only whatever text was on those lines besides
    // the tag (often blank, sometimes a leftover `{`/`}` template-literal wrapper).
    // These HTML comment markers (added around <CodeBlock> usage in docs/_shared
    // partials that need {props.framework} substitution, which only JSX — not a plain
    // fence — evaluates) survive that stripping untouched, so we use them to recover
    // the language/title info and rebuild a proper fence from what's left.
    const fenceOpen = line.match(/^\s*<!--\s*llms-fence:\s*([^|>]+?)(?:\s*\|\s*(.+?))?\s*-->\s*$/);
    if (fenceOpen) {
      inCodeBlockTag = true;
      codeBlockLang = fenceOpen[1].trim();
      codeBlockTitle = fenceOpen[2] ? fenceOpen[2].trim() : '';
      codeBlockBody = [];
      continue;
    }
    if (inCodeBlockTag) {
      if (/^\s*<!--\s*\/llms-fence\s*-->\s*$/.test(line)) {
        let body = codeBlockBody
          .join('\n')
          .replace(/^\{\s*`/, '')
          .replace(/`\s*\}$/, '')
          .trim();
        if (codeBlockTitle) {
          out.push('**' + codeBlockTitle + '**');
          out.push('');
        }
        out.push('```' + codeBlockLang);
        out.push(...body.split('\n'));
        out.push('```');
        inCodeBlockTag = false;
        codeBlockLang = '';
        codeBlockTitle = '';
        codeBlockBody = [];
      } else {
        codeBlockBody.push(line);
      }
      continue;
    }

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

    // ── Export arrow function declarations → remove ──────────────────────────
    if (/^\s*export\s+const\s+\w+\s*=.*=>/.test(line)) {
      let depth = 0;
      for (const ch of line) {
        if (ch === '{') depth++;
        if (ch === '}') depth--;
      }
      if (depth > 0) {
        inExportFn = true;
        exportFnDepth = depth;
      }
      continue;
    }

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

  // Clean up excessive blank lines (3+ → 2), trim leading blank lines, then decode HTML entities.
  // Pass !!framework so &lt;/&gt; are decoded for framework files but preserved for connect/icons.
  return decodeHtmlEntities(
    out.join('\n').replace(/\n{3,}/g, '\n\n').replace(/^\n+/, ''),
    !!framework
  );
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
