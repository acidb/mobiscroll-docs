// @ts-check
// Shared docusaurus-plugin-llms configuration for Mobiscroll Connect docs.
// Each docusaurus.config.*.js should require() this file and spread it into
// their plugins array alongside the main llms-plugin.config.js.
//
// Generates llms-connect.txt from the connect/ folder.

/** @type {import('docusaurus-plugin-llms').PluginOptions} */
const llmsConnectOptions = {
  id: 'llms-connect',

  generateLLMsTxt: true,
  generateLLMsFullTxt: true,
  processingBatchSize: 50,

  generateMarkdownFiles: true,
  preserveDirectoryStructure: true,

  docsDir: 'connect',

  excludeImports: true,
  removeDuplicateHeadings: true,

  llmsTxtFilename: 'llms-connect.txt',
  llmsFullTxtFilename: 'llms-connect-full.txt',

  title: 'Mobiscroll Connect Documentation',
  description:
    'API reference and developer guides for Mobiscroll Connect — ' +
    'a unified OAuth 2.0 calendar integration service supporting ' +
    'Google Calendar, Outlook, Apple Calendar, and CalDAV.',

  ignoreFiles: [
    '**/links.js',
    '**/connectLinks.js',
    '**/_category_.json',
  ],

  // No `pathTransformation` here: docsDir's implicit routeBasePath ('connect')
  // is already prepended once by the plugin's own fallback URL-construction
  // branch (lib/processor.js) whenever a page can't be matched to its real
  // Docusaurus route by suffix (which, for the connect section, is every
  // page — none of their slugs end in a path that matches their source file
  // name, e.g. connect/api/calendars.md has slug: /calendars). A previously
  // present `addPaths: ['connect']` double-applied that same segment,
  // producing build/connect/connect/... for every connect API/guide page —
  // self-consistent (link matched its own generated file) but not matching
  // the real site route (e.g. the real page for calendars.md is
  // /docs/connect/calendars, not /docs/connect/connect/api/calendars).

  // Section ordering for the combined llms-connect.txt
  includeOrder: [
    'getting-started/**',
    'api/**',
    'scopes.md',
    'integration/**',
  ],
};

module.exports = ['docusaurus-plugin-llms', llmsConnectOptions];
