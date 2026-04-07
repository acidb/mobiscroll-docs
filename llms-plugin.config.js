// @ts-check
// Shared docusaurus-plugin-llms configuration for all build targets.
// Each docusaurus.config.*.js should require() this file and spread it into
// their plugins array.
//
// The plugin scans `docsDir`, excludes partials and auto-generated fragments,
// then emits llms.txt, llms-full.txt, and per-framework variants.

/** @type {import('docusaurus-plugin-llms').PluginOptions} */
const llmsOptions = {
  // Hub files are generated as customLLMFiles below (llms.txt / llms-full.txt)
  generateLLMsTxt: false,
  generateLLMsFullTxt: false,
  processingBatchSize: 50,

  // Emit individual .md files so AI tools can link to canonical .md URLs
  generateMarkdownFiles: true,
  // Strip the docsDir prefix (docs/javascript/... → build/javascript/...)
  preserveDirectoryStructure: false,

  docsDir: 'docs',

  // Clean up MDX import statements and redundant headings for LLM consumption
  excludeImports: false,
  removeDuplicateHeadings: true,

  title: 'Mobiscroll Documentation',
  description:
    'API reference and developer guides for Mobiscroll UI components — ' +
    'Eventcalendar, Datepicker, Select, Popup, Forms, and more — ' +
    'available for JavaScript, React, Angular, Vue, and jQuery, ' +
    'plus Mobiscroll Connect for unified calendar integration ' +
    '(Google, Outlook, Apple Calendar, CalDAV).',

  // Exclude shared MDX partials and auto-generated fragments (they are
  // imported by the real API pages and must not appear as standalone entries).
  ignoreFiles: [
    // Shared MDX partials
    '_shared/**',
    '**/_shared/**',
    // Auto-generated API fragments (imported via MDX in api.md pages)
    '**/_auto-generated/**',
    // JS helper files that live inside the docs tree
    '**/links.js',
    '**/connectLinks.js',
    '**/frameworkLinks.js',
  ],

  // Section ordering for the combined llms.txt / llms-full.txt
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

  // Per-framework output files – keeps each framework's AI context isolated
  customLLMFiles: [
    // ── Hub: llms.txt (general info + links to framework files) ─────────
    {
      filename: 'llms.txt',
      includePatterns: [''],
      fullContent: true,
      title: 'Mobiscroll Documentation',
      description:
        'API reference and developer guides for Mobiscroll UI components — ' +
        'Eventcalendar, Datepicker, Select, Popup, Forms, and more — ' +
        'available for JavaScript, React, Angular, Vue, and jQuery, ' +
        'plus Mobiscroll Connect for unified calendar integration ' +
        '(Google, Outlook, Apple Calendar, CalDAV).',
      rootContent:
        '## Framework-Specific Documentation\n\n' +
        'For detailed, framework-specific API references and guides, see:\n\n' +
        '- [Mobiscroll for JavaScript](llms-javascript.txt) — [Full docs](llms-javascript-full.txt)\n' +
        '- [Mobiscroll for React](llms-react.txt) — [Full docs](llms-react-full.txt)\n' +
        '- [Mobiscroll for Angular](llms-angular.txt) — [Full docs](llms-angular-full.txt)\n' +
        '- [Mobiscroll for Vue](llms-vue.txt) — [Full docs](llms-vue-full.txt)\n' +
        '- [Mobiscroll for jQuery](llms-jquery.txt) — [Full docs](llms-jquery-full.txt)\n\n' +
        '## Mobiscroll Connect — Calendar Integration API\n\n' +
        '- [Mobiscroll Connect](llms-connect.txt) — [Full docs](llms-connect-full.txt)\n',
    },
    // ── Hub: llms-full.txt (general content + links to full framework files)
    {
      filename: 'llms-full.txt',
      includePatterns: [''],
      fullContent: true,
      title: 'Mobiscroll Documentation',
      description:
        'API reference and developer guides for Mobiscroll UI components — ' +
        'Eventcalendar, Datepicker, Select, Popup, Forms, and more — ' +
        'available for JavaScript, React, Angular, Vue, and jQuery, ' +
        'plus Mobiscroll Connect for unified calendar integration ' +
        '(Google, Outlook, Apple Calendar, CalDAV).',
      rootContent:
        '## Framework-Specific Full Documentation\n\n' +
        '- [Mobiscroll for JavaScript — Full](llms-javascript-full.txt)\n' +
        '- [Mobiscroll for React — Full](llms-react-full.txt)\n' +
        '- [Mobiscroll for Angular — Full](llms-angular-full.txt)\n' +
        '- [Mobiscroll for Vue — Full](llms-vue-full.txt)\n' +
        '- [Mobiscroll for jQuery — Full](llms-jquery-full.txt)\n\n' +
        '## Mobiscroll Connect — Calendar Integration API\n\n' +
        '- [Mobiscroll Connect — Full](llms-connect-full.txt)\n',
    },

    // ── JavaScript ──────────────────────────────────────────────────────────
    {
      filename: 'llms-javascript.txt',
      includePatterns: ['javascript/**/*.md', 'getting-started.md'],
      ignorePatterns: ['javascript/**/_auto-generated/**'],
      fullContent: false,
      title: 'Mobiscroll for JavaScript',
      description:
        'Links to all Mobiscroll JavaScript component docs: Eventcalendar, Datepicker, Select, Forms, Popup, and more.',
      orderPatterns: [
        'getting-started.md',
        'javascript/getting-started/**',
        'javascript/core-concepts/**',
        'javascript/eventcalendar/**',
        'javascript/datepicker/**',
        'javascript/select/**',
        'javascript/forms/**',
        'javascript/popup/**',
        'javascript/notifications/**',
        'javascript/gridlayout/**',
        'javascript/theming/**',
        'javascript/guides/**',
      ],
    },
    {
      filename: 'llms-javascript-full.txt',
      includePatterns: ['javascript/**/*.md', 'getting-started.md'],
      ignorePatterns: ['javascript/**/_auto-generated/**'],
      fullContent: true,
      title: 'Mobiscroll for JavaScript — Full Documentation',
      description:
        'Complete Mobiscroll JavaScript documentation including Eventcalendar, Datepicker, Select, Popup, Forms, theming, and guides.',
      orderPatterns: [
        'getting-started.md',
        'javascript/getting-started/**',
        'javascript/core-concepts/**',
        'javascript/eventcalendar/**',
        'javascript/datepicker/**',
        'javascript/select/**',
        'javascript/forms/**',
        'javascript/popup/**',
        'javascript/notifications/**',
        'javascript/gridlayout/**',
        'javascript/theming/**',
        'javascript/guides/**',
      ],
    },

    // ── React ────────────────────────────────────────────────────────────────
    {
      filename: 'llms-react.txt',
      includePatterns: ['react/**/*.md', 'getting-started.md'],
      ignorePatterns: ['react/**/_auto-generated/**'],
      fullContent: false,
      title: 'Mobiscroll for React',
      description:
        'Links to all Mobiscroll React component docs: Eventcalendar, Datepicker, Select, Forms, Popup, and more.',
      orderPatterns: [
        'getting-started.md',
        'react/getting-started/**',
        'react/core-concepts/**',
        'react/eventcalendar/**',
        'react/datepicker/**',
        'react/select/**',
        'react/forms/**',
        'react/popup/**',
        'react/notifications/**',
        'react/gridlayout/**',
        'react/theming/**',
        'react/guides/**',
      ],
    },
    {
      filename: 'llms-react-full.txt',
      includePatterns: ['react/**/*.md', 'getting-started.md'],
      ignorePatterns: ['react/**/_auto-generated/**'],
      fullContent: true,
      title: 'Mobiscroll for React — Full Documentation',
      description:
        'Complete Mobiscroll React documentation including Eventcalendar, Datepicker, Select, Popup, Forms, theming, and guides.',
      orderPatterns: [
        'getting-started.md',
        'react/getting-started/**',
        'react/core-concepts/**',
        'react/eventcalendar/**',
        'react/datepicker/**',
        'react/select/**',
        'react/forms/**',
        'react/popup/**',
        'react/notifications/**',
        'react/gridlayout/**',
        'react/theming/**',
        'react/guides/**',
      ],
    },

    // ── Angular ──────────────────────────────────────────────────────────────
    {
      filename: 'llms-angular.txt',
      includePatterns: ['angular/**/*.md', 'getting-started.md'],
      ignorePatterns: ['angular/**/_auto-generated/**'],
      fullContent: false,
      title: 'Mobiscroll for Angular',
      description:
        'Links to all Mobiscroll Angular component docs: Eventcalendar, Datepicker, Select, Forms, Popup, and more.',
      orderPatterns: [
        'getting-started.md',
        'angular/getting-started/**',
        'angular/core-concepts/**',
        'angular/eventcalendar/**',
        'angular/datepicker/**',
        'angular/select/**',
        'angular/forms/**',
        'angular/popup/**',
        'angular/notifications/**',
        'angular/gridlayout/**',
        'angular/theming/**',
        'angular/guides/**',
      ],
    },
    {
      filename: 'llms-angular-full.txt',
      includePatterns: ['angular/**/*.md', 'getting-started.md'],
      ignorePatterns: ['angular/**/_auto-generated/**'],
      fullContent: true,
      title: 'Mobiscroll for Angular — Full Documentation',
      description:
        'Complete Mobiscroll Angular documentation including Eventcalendar, Datepicker, Select, Popup, Forms, theming, and guides.',
      orderPatterns: [
        'getting-started.md',
        'angular/getting-started/**',
        'angular/core-concepts/**',
        'angular/eventcalendar/**',
        'angular/datepicker/**',
        'angular/select/**',
        'angular/forms/**',
        'angular/popup/**',
        'angular/notifications/**',
        'angular/gridlayout/**',
        'angular/theming/**',
        'angular/guides/**',
      ],
    },

    // ── Vue ──────────────────────────────────────────────────────────────────
    {
      filename: 'llms-vue.txt',
      includePatterns: ['vue/**/*.md', 'getting-started.md'],
      ignorePatterns: ['vue/**/_auto-generated/**'],
      fullContent: false,
      title: 'Mobiscroll for Vue',
      description:
        'Links to all Mobiscroll Vue component docs: Eventcalendar, Datepicker, Select, Forms, Popup, and more.',
      orderPatterns: [
        'getting-started.md',
        'vue/getting-started/**',
        'vue/core-concepts/**',
        'vue/eventcalendar/**',
        'vue/datepicker/**',
        'vue/select/**',
        'vue/forms/**',
        'vue/popup/**',
        'vue/notifications/**',
        'vue/gridlayout/**',
        'vue/theming/**',
        'vue/guides/**',
      ],
    },
    {
      filename: 'llms-vue-full.txt',
      includePatterns: ['vue/**/*.md', 'getting-started.md'],
      ignorePatterns: ['vue/**/_auto-generated/**'],
      fullContent: true,
      title: 'Mobiscroll for Vue — Full Documentation',
      description:
        'Complete Mobiscroll Vue documentation including Eventcalendar, Datepicker, Select, Popup, Forms, theming, and guides.',
      orderPatterns: [
        'getting-started.md',
        'vue/getting-started/**',
        'vue/core-concepts/**',
        'vue/eventcalendar/**',
        'vue/datepicker/**',
        'vue/select/**',
        'vue/forms/**',
        'vue/popup/**',
        'vue/notifications/**',
        'vue/gridlayout/**',
        'vue/theming/**',
        'vue/guides/**',
      ],
    },

    // ── jQuery ───────────────────────────────────────────────────────────────
    {
      filename: 'llms-jquery.txt',
      includePatterns: ['jquery/**/*.md', 'getting-started.md'],
      ignorePatterns: ['jquery/**/_auto-generated/**'],
      fullContent: false,
      title: 'Mobiscroll for jQuery',
      description:
        'Links to all Mobiscroll jQuery component docs: Eventcalendar, Datepicker, Select, Forms, Popup, and more.',
      orderPatterns: [
        'getting-started.md',
        'jquery/getting-started/**',
        'jquery/core-concepts/**',
        'jquery/eventcalendar/**',
        'jquery/datepicker/**',
        'jquery/select/**',
        'jquery/forms/**',
        'jquery/popup/**',
        'jquery/notifications/**',
        'jquery/gridlayout/**',
        'jquery/theming/**',
        'jquery/guides/**',
      ],
    },
    {
      filename: 'llms-jquery-full.txt',
      includePatterns: ['jquery/**/*.md', 'getting-started.md'],
      ignorePatterns: ['jquery/**/_auto-generated/**'],
      fullContent: true,
      title: 'Mobiscroll for jQuery — Full Documentation',
      description:
        'Complete Mobiscroll jQuery documentation including Eventcalendar, Datepicker, Select, Popup, Forms, theming, and guides.',
      orderPatterns: [
        'getting-started.md',
        'jquery/getting-started/**',
        'jquery/core-concepts/**',
        'jquery/eventcalendar/**',
        'jquery/datepicker/**',
        'jquery/select/**',
        'jquery/forms/**',
        'jquery/popup/**',
        'jquery/notifications/**',
        'jquery/gridlayout/**',
        'jquery/theming/**',
        'jquery/guides/**',
      ],
    },
  ],
};

module.exports = ['docusaurus-plugin-llms', llmsOptions];
