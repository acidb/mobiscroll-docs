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
  // llmsFullTxtFilename: '5.35.0/llms-v5-full.txt',

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
    'llms-content.md',
    'llms-content-full.md',
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
      filename: '5.35.0/llms-v5-javascript.txt',
      includePatterns: ['javascript/**/*.md'],
      ignorePatterns: ['javascript/**/_auto-generated/**'],
      fullContent: false,
      title: '[v5] Mobiscroll for JavaScript',
      description:
        'Links to all Mobiscroll v5 JavaScript component docs. ' +
        'This documentation refers to Mobiscroll version 5.35.0.',
      orderPatterns: ORDER_PATTERNS('javascript'),
    },
    {
      filename: '5.35.0/llms-v5-javascript-full.txt',
      includePatterns: ['javascript/**/*.md'],
      ignorePatterns: ['javascript/**/_auto-generated/**'],
      fullContent: true,
      title: '[v5] Mobiscroll for JavaScript — Full Documentation',
      description:
        'Complete Mobiscroll v5 JavaScript documentation including Eventcalendar, Datepicker, Select, Popup, Forms, theming, and guides. ' +
        'This documentation refers to Mobiscroll version 5.35.0.',
      orderPatterns: ORDER_PATTERNS('javascript'),
    },

    // ── React ────────────────────────────────────────────────────────────────
    {
      filename: '5.35.0/llms-v5-react.txt',
      includePatterns: ['react/**/*.md'],
      ignorePatterns: ['react/**/_auto-generated/**'],
      fullContent: false,
      title: '[v5] Mobiscroll for React',
      description:
        'Links to all Mobiscroll v5 React component docs. ' +
        'This documentation refers to Mobiscroll version 5.35.0.',
      orderPatterns: ORDER_PATTERNS('react'),
    },
    {
      filename: '5.35.0/llms-v5-react-full.txt',
      includePatterns: ['react/**/*.md'],
      ignorePatterns: ['react/**/_auto-generated/**'],
      fullContent: true,
      title: '[v5] Mobiscroll for React — Full Documentation',
      description:
        'Complete Mobiscroll v5 React documentation including Eventcalendar, Datepicker, Select, Popup, Forms, theming, and guides. ' +
        'This documentation refers to Mobiscroll version 5.35.0.',
      orderPatterns: ORDER_PATTERNS('react'),
    },

    // ── Angular ──────────────────────────────────────────────────────────────
    {
      filename: '5.35.0/llms-v5-angular.txt',
      includePatterns: ['angular/**/*.md'],
      ignorePatterns: ['angular/**/_auto-generated/**'],
      fullContent: false,
      title: '[v5] Mobiscroll for Angular',
      description:
        'Links to all Mobiscroll v5 Angular component docs. ' +
        'This documentation refers to Mobiscroll version 5.35.0.',
      orderPatterns: ORDER_PATTERNS('angular'),
    },
    {
      filename: '5.35.0/llms-v5-angular-full.txt',
      includePatterns: ['angular/**/*.md'],
      ignorePatterns: ['angular/**/_auto-generated/**'],
      fullContent: true,
      title: '[v5] Mobiscroll for Angular — Full Documentation',
      description:
        'Complete Mobiscroll v5 Angular documentation including Eventcalendar, Datepicker, Select, Popup, Forms, theming, and guides. ' +
        'This documentation refers to Mobiscroll version 5.35.0.',
      orderPatterns: ORDER_PATTERNS('angular'),
    },

    // ── Vue ──────────────────────────────────────────────────────────────────
    {
      filename: '5.35.0/llms-v5-vue.txt',
      includePatterns: ['vue/**/*.md'],
      ignorePatterns: ['vue/**/_auto-generated/**'],
      fullContent: false,
      title: '[v5] Mobiscroll for Vue',
      description:
        'Links to all Mobiscroll v5 Vue component docs. ' +
        'This documentation refers to Mobiscroll version 5.35.0.',
      orderPatterns: ORDER_PATTERNS('vue'),
    },
    {
      filename: '5.35.0/llms-v5-vue-full.txt',
      includePatterns: ['vue/**/*.md'],
      ignorePatterns: ['vue/**/_auto-generated/**'],
      fullContent: true,
      title: '[v5] Mobiscroll for Vue — Full Documentation',
      description:
        'Complete Mobiscroll v5 Vue documentation including Eventcalendar, Datepicker, Select, Popup, Forms, theming, and guides. ' +
        'This documentation refers to Mobiscroll version 5.35.0.',
      orderPatterns: ORDER_PATTERNS('vue'),
    },

    // ── jQuery ───────────────────────────────────────────────────────────────
    {
      filename: '5.35.0/llms-v5-jquery.txt',
      includePatterns: ['jquery/**/*.md'],
      ignorePatterns: ['jquery/**/_auto-generated/**'],
      fullContent: false,
      title: '[v5] Mobiscroll for jQuery',
      description:
        'Links to all Mobiscroll v5 jQuery component docs. ' +
        'This documentation refers to Mobiscroll version 5.35.0.',
      orderPatterns: ORDER_PATTERNS('jquery'),
    },
    {
      filename: '5.35.0/llms-v5-jquery-full.txt',
      includePatterns: ['jquery/**/*.md'],
      ignorePatterns: ['jquery/**/_auto-generated/**'],
      fullContent: true,
      title: '[v5] Mobiscroll for jQuery — Full Documentation',
      description:
        'Complete Mobiscroll v5 jQuery documentation including Eventcalendar, Datepicker, Select, Popup, Forms, theming, and guides. ' +
        'This documentation refers to Mobiscroll version 5.35.0.',
      orderPatterns: ORDER_PATTERNS('jquery'),
    },
  ],
};

module.exports = ['docusaurus-plugin-llms', llmsV5Options];
