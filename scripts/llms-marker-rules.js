'use strict';
// Canonical list of components that need a {/* llms:TYPE;... */} (or
// <!-- llms-fence --> ) marker next to their usage in .md/.mdx source, or
// docusaurus-plugin-llms silently deletes their content from the generated
// llms output with no build error. See writing-docs.md's "Marking up
// component content the llms plugin would otherwise delete" section for the
// human-facing explanation and the full marker syntax table.
//
// This is the single source of truth for "which components need a marker
// and how automatable each is" — consumed by
// .claude/hooks/post-tool-use-marker-check.js (detection/auto-insertion at
// edit time). scripts/strip-jsx.js implements the actual reconstruction
// logic independently (it runs post-build, over already-marked content) but
// mirrors this same component list — keep both in sync if a component is
// added, removed, or reclassified.
//
// kind: 'simple'      — self-closing, flat attributes, one self-contained
//                        marker with no ambiguity. Safe to auto-insert.
// kind: 'blockremove' — a fixed, non-nesting wrapping component (opening/
//                        closing tag pair never contains another instance
//                        of itself). Safe to auto-insert around.
// kind: 'complex'      — requires judgment about wrap boundaries or
//                        multi-line/nested content. Never auto-inserted;
//                        only flagged for a human/Claude to add by hand.
module.exports = [
  { component: 'DocsUrl', kind: 'simple', marker: 'docsurl', attrs: ['path'] },
  { component: 'McpUrl', kind: 'simple', marker: 'mcpurl', attrs: [] },
  { component: 'McpConfigBlock', kind: 'simple', marker: 'mcpconfig', attrs: ['tool'] },
  { component: 'McpCliBlock', kind: 'simple', marker: 'mcpcli', attrs: [], optionalAttrs: ['scope'] },
  { component: 'FileBlock', kind: 'simple', marker: 'fileblock', attrs: ['src'] },
  { component: 'PostmanRunButton', kind: 'simple', marker: 'postmanrun', attrs: [] },
  { component: 'ImgComparisonSlider', kind: 'blockremove' },
  { component: 'CodeBlock', kind: 'complex', reason: 'needs an <!-- llms-fence: lang | title --> wrap — only required when the block uses {props.framework} substitution; extracting lang/title and the multi-line body correctly needs judgment' },
  { component: 'DocsLink', kind: 'complex', reason: 'needs a docslink open/close pair — label content can be self-closing, single-line, or multi-line' },
  { component: 'Parameter', kind: 'complex', reason: 'needs a param open/close pair — blocks can nest, descriptions can be multi-line, defaultValue can contain nested tags' },
];
