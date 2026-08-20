// @ts-check
// docusaurus-plugin-llms configuration for Mobiscroll v5 (version 5.35.0).
// Reads from versioned_docs/version-5.35.0 and emits all output files under
// build/5.35.0/ so AI tools see a clearly version-scoped entrypoint.
//
// Uses the plugin's native `versions` option (path: '5.35.0') so both the
// aggregate llms-*.txt files AND the individual per-page markdown twins are
// written under build/5.35.0/ automatically. Previously this used a flat
// docsDir + manually "5.35.0/"-prefixed customLLMFiles filenames, which left
// generateMarkdownFiles' individual .md output unprefixed — it collided with
// (and was silently overwritten by) the main llms-plugin.config.js's own
// per-page output at the same build/{framework}/... paths, so v5's
// individual pages were never actually reachable at any URL.
//
// Deliberately does NOT set `pathTransformation` here. This site's baseUrl
// is '/docs', so Docusaurus's real routesPaths include that segment (e.g.
// '/docs/5.35.0/react/...'), but the plugin's `versions` routePrefix scoping
// compares against a bare '/5.35.0' — it never matches, so link resolution
// always falls back to unscoped suffix-matching (which prefers the shorter,
// unversioned 6.1.0 route for any page that exists in both versions) UNLESS
// that fallback path is itself forced via pathTransformation — but doing so
// double-applies the version segment together with `versions`' own
// outputSubdir, corrupting individual file paths to build/5.35.0/5.35.0/...
// So: this config only fixes file placement (via versions/outputSubdir);
// the resulting wrong (unversioned) links inside the generated content are
// corrected afterward by scripts/fix-v5-links.js as a plain text rewrite —
// see that script for why a post-process fix was chosen over a plugin-level
// one.
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

const V5_CUSTOM_LLM_FILES = [
  // ── JavaScript ──────────────────────────────────────────────────────────
  {
    filename: 'llms-javascript.txt',
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
    filename: 'llms-javascript-full.txt',
    includePatterns: ['javascript/**/*.md'],
    ignorePatterns: ['javascript/**/_auto-generated/**', 'javascript/core-concepts/icons.md'],
    fullContent: true,
    title: '[v5] Mobiscroll for JavaScript — Full Documentation',
    description:
      'Complete Mobiscroll v5 JavaScript documentation including Eventcalendar, Datepicker, Select, Popup, Forms, theming, and guides. ' +
      'This documentation refers to Mobiscroll version 5.35.0.',
    orderPatterns: ORDER_PATTERNS('javascript'),
  },

  // ── React ────────────────────────────────────────────────────────────────
  {
    filename: 'llms-react.txt',
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
    filename: 'llms-react-full.txt',
    includePatterns: ['react/**/*.md'],
    ignorePatterns: ['react/**/_auto-generated/**', 'react/core-concepts/icons.md'],
    fullContent: true,
    title: '[v5] Mobiscroll for React — Full Documentation',
    description:
      'Complete Mobiscroll v5 React documentation including Eventcalendar, Datepicker, Select, Popup, Forms, theming, and guides. ' +
      'This documentation refers to Mobiscroll version 5.35.0.',
    orderPatterns: ORDER_PATTERNS('react'),
  },

  // ── Angular ──────────────────────────────────────────────────────────────
  {
    filename: 'llms-angular.txt',
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
    filename: 'llms-angular-full.txt',
    includePatterns: ['angular/**/*.md'],
    ignorePatterns: ['angular/**/_auto-generated/**', 'angular/core-concepts/icons.md'],
    fullContent: true,
    title: '[v5] Mobiscroll for Angular — Full Documentation',
    description:
      'Complete Mobiscroll v5 Angular documentation including Eventcalendar, Datepicker, Select, Popup, Forms, theming, and guides. ' +
      'This documentation refers to Mobiscroll version 5.35.0.',
    orderPatterns: ORDER_PATTERNS('angular'),
  },

  // ── Vue ──────────────────────────────────────────────────────────────────
  {
    filename: 'llms-vue.txt',
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
    filename: 'llms-vue-full.txt',
    includePatterns: ['vue/**/*.md'],
    ignorePatterns: ['vue/**/_auto-generated/**', 'vue/core-concepts/icons.md'],
    fullContent: true,
    title: '[v5] Mobiscroll for Vue — Full Documentation',
    description:
      'Complete Mobiscroll v5 Vue documentation including Eventcalendar, Datepicker, Select, Popup, Forms, theming, and guides. ' +
      'This documentation refers to Mobiscroll version 5.35.0.',
    orderPatterns: ORDER_PATTERNS('vue'),
  },

  // ── jQuery ───────────────────────────────────────────────────────────────
  {
    filename: 'llms-jquery.txt',
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
    filename: 'llms-jquery-full.txt',
    includePatterns: ['jquery/**/*.md'],
    ignorePatterns: ['jquery/**/_auto-generated/**', 'jquery/core-concepts/icons.md'],
    fullContent: true,
    title: '[v5] Mobiscroll for jQuery — Full Documentation',
    description:
      'Complete Mobiscroll v5 jQuery documentation including Eventcalendar, Datepicker, Select, Popup, Forms, theming, and guides. ' +
      'This documentation refers to Mobiscroll version 5.35.0.',
    orderPatterns: ORDER_PATTERNS('jquery'),
  },

  // ── Icons (shared — identical across all frameworks) ──────────────────
  {
    filename: 'llms-icons.txt',
    includePatterns: ['react/core-concepts/icons.md'],
    fullContent: true,
    title: '[v5] Mobiscroll Icon Set',
    description:
      'Complete list of built-in Mobiscroll icons (IcoMoon, Font Awesome, Ionicons) for v5. ' +
      'Use these icon names with the mbsc-font-icon mbsc-icon-{name} CSS classes. ' +
      'Applicable to all frameworks (JavaScript, React, Angular, Vue, jQuery). ' +
      'This documentation refers to Mobiscroll version 5.35.0.',
  },
];

/** @type {import('docusaurus-plugin-llms').PluginOptions} */
const llmsV5Options = {
  id: 'llms-v5',

  generateLLMsTxt: false,
  generateLLMsFullTxt: false,
  processingBatchSize: 50,

  generateMarkdownFiles: true,
  preserveDirectoryStructure: false,

  docsDir: 'versioned_docs/version-5.35.0',

  excludeImports: true,
  removeDuplicateHeadings: true,

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
    'llms-content.md',
    'llms-content-full.md',
  ],

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

  // Writes every output file (aggregate .txt AND individual per-page .md
  // twins) under build/5.35.0/, and scopes route/URL resolution to routes
  // under /5.35.0/ so canonical links point at the right place.
  versions: [
    {
      name: '5.35.0',
      docsDir: 'versioned_docs/version-5.35.0',
      path: '5.35.0',
      customLLMFiles: V5_CUSTOM_LLM_FILES,
    },
  ],
};

module.exports = ['docusaurus-plugin-llms', llmsV5Options];
