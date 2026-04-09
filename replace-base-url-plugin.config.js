// @ts-check
// Post-build plugin: replaces {{DOCS_BASE_URL}} placeholders in static AI
// context files (CLAUDE.md, *.mdc) with the actual base URL derived from the
// active docusaurus.config.*.js (url + baseUrl).

const fs = require('fs');
const path = require('path');

const PLACEHOLDER = '{{DOCS_BASE_URL}}';

/** @type {import('@docusaurus/types').PluginModule} */
module.exports = function replaceBaseUrlPlugin() {
  return {
    name: 'replace-base-url-plugin',

    async postBuild({ siteConfig, outDir }) {
      // Compute the full docs base URL from the active config.
      // Strip trailing slash so localhost (baseUrl: '/') doesn't produce
      // double slashes in the output URLs.
      const docsBaseUrl = (siteConfig.url + siteConfig.baseUrl).replace(/\/+$/, '');

      // Find target files at the build root (not recursive).
      const entries = fs.readdirSync(outDir);
      const targets = entries.filter(
        (name) => name === 'CLAUDE.md' || name.endsWith('.mdc'),
      );

      if (targets.length === 0) {
        console.log('[replace-base-url] No AI context files found in build output.');
        return;
      }

      for (const name of targets) {
        const filePath = path.join(outDir, name);
        const original = fs.readFileSync(filePath, 'utf-8');

        if (!original.includes(PLACEHOLDER)) {
          continue;
        }

        const replaced = original.replaceAll(PLACEHOLDER, docsBaseUrl);
        fs.writeFileSync(filePath, replaced, 'utf-8');
        console.log(`[replace-base-url] ${name}: replaced with ${docsBaseUrl}`);
      }
    },
  };
};
