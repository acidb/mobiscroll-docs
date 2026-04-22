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

      /** Scan a single directory (non-recursive) for AI context files and replace placeholders. */
      function processDir(dir) {
        if (!fs.existsSync(dir)) return 0;
        const entries = fs.readdirSync(dir);
        const targets = entries.filter(
          (name) => name.startsWith('CLAUDE') || name.endsWith('.mdc'),
        );
        let count = 0;
        for (const name of targets) {
          const filePath = path.join(dir, name);
          const original = fs.readFileSync(filePath, 'utf-8');
          if (!original.includes(PLACEHOLDER)) continue;
          const replaced = original.replaceAll(PLACEHOLDER, docsBaseUrl);
          fs.writeFileSync(filePath, replaced, 'utf-8');
          const rel = path.relative(outDir, filePath);
          console.log(`[replace-base-url] ${rel}: replaced with ${docsBaseUrl}`);
          count++;
        }
        return count;
      }

      // Directories to scan: build root, each framework under docs/, and connect/
      const dirsToScan = [outDir];

      const docsDir = path.join(outDir, 'docs');
      if (fs.existsSync(docsDir)) {
        for (const entry of fs.readdirSync(docsDir)) {
          const full = path.join(docsDir, entry);
          if (fs.statSync(full).isDirectory()) {
            dirsToScan.push(full);
          }
        }
      }

      dirsToScan.push(path.join(outDir, 'connect'));

      const v5Dir = path.join(outDir, '5.35.0');
      if (fs.existsSync(v5Dir)) {
        dirsToScan.push(v5Dir); // catches .mdc files at build/5.35.0/
        for (const entry of fs.readdirSync(v5Dir)) {
          const full = path.join(v5Dir, entry);
          if (fs.statSync(full).isDirectory()) {
            dirsToScan.push(full); // catches CLAUDE.md at build/5.35.0/{fw}/
          }
        }
      }

      let total = 0;
      for (const dir of dirsToScan) {
        total += processDir(dir);
      }

      if (total === 0) {
        console.log('[replace-base-url] No AI context files needed replacement.');
      }
    },
  };
};
