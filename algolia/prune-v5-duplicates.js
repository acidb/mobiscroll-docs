// Post-crawl step, run after every docsearch-scraper crawl (wired into
// .github/workflows/algolia-crawl-dev.yml / algolia-crawl.yml).
//
// The v5.35.0 crawl indexes its auto-generated API reference pages at the same
// granularity as v6, which duplicates almost everything v6 already has (see
// algolia/generate-v5-anchor-sets.js). This deletes those duplicates, keeping only:
//   - records whose `anchor` isn't a TRACKED (auto-generated-content) prefix — this is
//     NOT the same as "no anchor at all": Docusaurus assigns a real anchor to every
//     heading, including hand-written guide pages (e.g. accessibility.md's
//     "1-perceivable"), so a plain `!hit.anchor` check does NOT protect them — confirmed in
//     practice that guide-page headings were being deleted as unverified duplicates. Only
//     anchors matching lib.js's isTrackedAnchor were ever part of the v5/v6 comparison in
//     the first place, so anything else (no anchor, or an untracked guide anchor) must
//     always be left untouched, verified or not.
//   - records whose (page path, anchor) pair is in v5-only-anchors.json (content that
//     only exists in v5.35.0 at that exact page — matched by page path, not anchor alone,
//     so a v5.35.0 record is never mistakenly pruned just because its anchor string
//     happens to also appear on a DIFFERENT page in v6)
//
// Required env: ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY, ALGOLIA_INDEX_NAME

const fs = require('fs');
const path = require('path');
const { algoliaConfig, browseAll, runBatch, pagePathFromUrl, toAnchorSetMap, isTrackedAnchor } = require('./lib');

const v5OnlyByPage = toAnchorSetMap(
  JSON.parse(fs.readFileSync(path.join(__dirname, 'v5-only-anchors.json'), 'utf8')),
);

async function main() {
  const config = algoliaConfig();
  const toDelete = [];

  const scanned = await browseAll(config, 'docusaurus_tag:"docs-default-5.35.0"', (hit) => {
    if (!isTrackedAnchor(hit.anchor)) return; // guide/landing content — always kept
    const pagePath = pagePathFromUrl(hit.url);
    const onlyAnchors = v5OnlyByPage[pagePath];
    if (!onlyAnchors || !onlyAnchors.has(hit.anchor)) {
      toDelete.push({ action: 'deleteObject', body: { objectID: hit.objectID } });
    }
  });

  if (toDelete.length > 0) {
    await runBatch(config, toDelete);
  }

  console.log(`Scanned ${scanned} v5.35.0-tagged records.`);
  console.log(`Deleted ${toDelete.length} duplicate records (kept in v6, pruned from v5.35.0).`);
  console.log('Remaining v5.35.0 records: guide/landing pages + v5-only-anchors.json entries.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
