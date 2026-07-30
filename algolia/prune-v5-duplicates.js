// Post-crawl step, run after every docsearch-scraper crawl (wired into
// .github/workflows/algolia-crawl-dev.yml / algolia-crawl.yml).
//
// The v5.35.0 crawl indexes its auto-generated API reference pages at the same
// granularity as v6, which duplicates almost everything v6 already has (see
// algolia/generate-v5-anchor-sets.js). This deletes those duplicates, keeping only:
//   - records with no `anchor` (guide/landing pages — genuinely version-specific, not
//     auto-generated API duplication)
//   - records whose `anchor` is in v5-only-anchors.json (content that only exists in v5.35.0)
//
// Required env: ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY, ALGOLIA_INDEX_NAME

const fs = require('fs');
const path = require('path');
const { algoliaConfig, browseAll, runBatch } = require('./lib');

const v5OnlyAnchors = new Set(
  JSON.parse(fs.readFileSync(path.join(__dirname, 'v5-only-anchors.json'), 'utf8')),
);

async function main() {
  const config = algoliaConfig();
  const toDelete = [];

  const scanned = await browseAll(config, 'docusaurus_tag:docs-default-5.35.0', (hit) => {
    if (hit.anchor && !v5OnlyAnchors.has(hit.anchor)) {
      toDelete.push({ action: 'deleteObject', body: { objectID: hit.objectID } });
    }
  });

  if (toDelete.length > 0) {
    await runBatch(config, toDelete);
  }

  console.log(`Scanned ${scanned} v5.35.0-tagged records.`);
  console.log(`Deleted ${toDelete.length} duplicate records (kept in v6, pruned from v5.35.0).`);
  console.log(`Remaining v5.35.0 records: guide/landing pages + ${v5OnlyAnchors.size} v5-only API entries.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
