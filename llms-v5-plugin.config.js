// @ts-check
// docusaurus-plugin-llms configuration for Mobiscroll v5 (version 5.35.0).
// Reads from versioned_docs/version-5.35.0 and emits all output files under
// build/5.35.0/ so AI tools see a clearly version-scoped entrypoint.
//
// Run scripts/copy-v5-descriptions.js before building to ensure description
// frontmatter is populated in versioned_docs/version-5.35.0.

const ORDER_PATTERNS = (fw) => [
  'getting-started.md',
  `${fw}/getting-started/**`,
  `${fw}/core-concepts/**`,
  `${fw}/eventcalendar/**`,
  `${fw}/datepicker/**`,
  `${fw}/select/**`,
  `${fw}/forms/**`,
  `${fw}/popup/**`,
  `${fw}/notifications/**`,
  `${fw}/gridlayout/**`,
  `${fw}/theming/**`,
  `${fw}/guides/**`,
];

/** @type {import('docusaurus-plugin-llms').PluginOptions} */
const llmsV5Options = {
  id: 'llms-v5',

  generateLLMsTxt: false,
  generateLLMsFullTxt: false,
  processingBatchSize: 50,

  // Must be false — preserveDirectoryStructure: false would write to build/angular/*.md
  // etc., conflicting with the main plugin's output for the same paths.
  generateMarkdownFiles: true,
  preserveDirectoryStructure: false,

  docsDir: 'versioned_docs/version-5.35.0',

  excludeImports: true,
  removeDuplicateHeadings: true,

  // llmsTxtFilename: '5.35.0/llms-v5.txt',

  version: '5.35.0',
  title: 'Mobiscroll v5 Documentation',
  description:
    '[v5] API reference and developer guides for Mobiscroll v5 UI components — ' +
    'Eventcalendar, Datepicker, Select, Popup, Forms, and more — ' +
    'available for JavaScript, React, Angular, Vue, and jQuery. ' +
    'This documentation refers to Mobiscroll version 5.35.0.',

  ignoreFiles: [
    '_shared/**',
    '**/_shared/**',
    '**/_auto-generated/**',
    '**/links.js',
    '**/connectLinks.js',
    '**/frameworkLinks.js',
    '**/ai-integration.md',
    'llms-content.md'
  ],

  // v5 versioned docs are served at /{version}/... in Docusaurus
  pathTransformation: {
    addPaths: ['5.35.0'],
  },

  includeOrder: [
    'getting-started.md',
    '*/getting-started/**',
    '*/core-concepts/**',
    '*/eventcalendar/**',
    '*/datepicker/**',
    '*/select/**',
    '*/forms/**',
    '*/popup/**',
    '*/notifications/**',
    '*/gridlayout/**',
    '*/theming/**',
    '*/guides/**',
  ],

  customLLMFiles: [
    // ── JavaScript ──────────────────────────────────────────────────────────
    {
      filename: '5.35.0/llms-javascript.txt',
      includePatterns: ['javascript/**/*.md'],
      ignorePatterns: ['javascript/**/_auto-generated/**'],
      fullContent: false,
      title: '[v5] Mobiscroll for JavaScript',
      description:
        'Links to all Mobiscroll v5 JavaScript component docs. ' +
        'This documentation refers to Mobiscroll version 5.35.0.',
      orderPatterns: ORDER_PATTERNS('javascript'),
    },

    // ── React ────────────────────────────────────────────────────────────────
    {
      filename: '5.35.0/llms-react.txt',
      includePatterns: ['react/**/*.md'],
      ignorePatterns: ['react/**/_auto-generated/**'],
      fullContent: false,
      title: '[v5] Mobiscroll for React',
      description:
        'Links to all Mobiscroll v5 React component docs. ' +
        'This documentation refers to Mobiscroll version 5.35.0.',
      orderPatterns: ORDER_PATTERNS('react'),
    },

    // ── Angular ──────────────────────────────────────────────────────────────
    {
      filename: '5.35.0/llms-angular.txt',
      includePatterns: ['angular/**/*.md'],
      ignorePatterns: ['angular/**/_auto-generated/**'],
      fullContent: false,
      title: '[v5] Mobiscroll for Angular',
      description:
        'Links to all Mobiscroll v5 Angular component docs. ' +
        'This documentation refers to Mobiscroll version 5.35.0.',
      orderPatterns: ORDER_PATTERNS('angular'),
    },

    // ── Vue ──────────────────────────────────────────────────────────────────
    {
      filename: '5.35.0/llms-vue.txt',
      includePatterns: ['vue/**/*.md'],
      ignorePatterns: ['vue/**/_auto-generated/**'],
      fullContent: false,
      title: '[v5] Mobiscroll for Vue',
      description:
        'Links to all Mobiscroll v5 Vue component docs. ' +
        'This documentation refers to Mobiscroll version 5.35.0.',
      orderPatterns: ORDER_PATTERNS('vue'),
    },

    // ── jQuery ───────────────────────────────────────────────────────────────
    {
      filename: '5.35.0/llms-jquery.txt',
      includePatterns: ['jquery/**/*.md'],
      ignorePatterns: ['jquery/**/_auto-generated/**'],
      fullContent: false,
      title: '[v5] Mobiscroll for jQuery',
      description:
        'Links to all Mobiscroll v5 jQuery component docs. ' +
        'This documentation refers to Mobiscroll version 5.35.0.',
      orderPatterns: ORDER_PATTERNS('jquery'),
    },
  ],
};

module.exports = ['docusaurus-plugin-llms', llmsV5Options];
