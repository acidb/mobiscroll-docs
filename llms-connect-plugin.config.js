// @ts-check
// Shared docusaurus-plugin-llms configuration for Mobiscroll Connect docs.
// Each docusaurus.config.*.js should require() this file and spread it into
// their plugins array alongside the main llms-plugin.config.js.
//
// Generates llms-connect.txt and llms-connect-full.txt from the connect/ folder.

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
    '**/ai-integration.md',
  ],

  // Route connect docs under /connect/ path
  pathTransformation: {
    addPaths: ['connect'],
  },

  // Section ordering for the combined llms-connect.txt / llms-connect-full.txt
  includeOrder: [
    'getting-started/**',
    'api/**',
    'scopes.md',
    'integration/**',
  ],
};

module.exports = ['docusaurus-plugin-llms', llmsConnectOptions];
