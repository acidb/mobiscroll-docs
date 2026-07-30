// Post-crawl step, run after every docsearch-scraper crawl (wired into
// .github/workflows/algolia-crawl-dev.yml / algolia-crawl.yml).
//
// Stamps every current-version (v6) record with a `presentInV5` boolean, based on whether
// its (page path, anchor) pair is part of the frozen v5.35.0 set (algolia/v5-anchors.json,
// see algolia/generate-v5-anchor-sets.js). Matched by page path, not anchor alone, so a v6
// page that happens to reuse an anchor name from a page v5.35.0 doesn't have (e.g. a
// per-view split like options_calendarview.md with no v5.35.0 equivalent page) is never
// mistakenly marked presentInV5 just because the anchor string exists somewhere else in
// v5.35.0's docs.
//
// This is what lets a search made from a v5.35.0 page reuse v6's index for shared API
// content (see src/components/Search/util.ts) without needing a large per-query whitelist
// or any blacklist that would need updating every time v6's docs change: since v5.35.0 is
// frozen, this script always recomputes the same classification from the same static
// input — idempotent, no "did v6 change" logic.
//
// Required env: ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY, ALGOLIA_INDEX_NAME

const fs = require('fs');
const path = require('path');
const { algoliaConfig, browseAll, runBatch, pagePathFromUrl, toAnchorSetMap } = require('./lib');

const v5SharedByPage = toAnchorSetMap(
  JSON.parse(fs.readFileSync(path.join(__dirname, 'v5-anchors.json'), 'utf8')),
);
// versions.json's first entry is always the current ("latest") UI version — see the same
// convention already used in src/components/Search/util.ts's useCurrentVersion().
const [currentVersion] = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'versions.json'), 'utf8'),
);

async function main() {
  const config = algoliaConfig();
  const updates = [];

  const scanned = await browseAll(config, `docusaurus_tag:"docs-default-${currentVersion}"`, (hit) => {
    if (!hit.anchor) return; // guide/landing content — not part of the v5/v6 API overlap
    const pagePath = pagePathFromUrl(hit.url);
    const sharedAnchors = v5SharedByPage[pagePath];
    updates.push({
      action: 'partialUpdateObject',
      body: { objectID: hit.objectID, presentInV5: !!(sharedAnchors && sharedAnchors.has(hit.anchor)) },
    });
  });

  if (updates.length > 0) {
    await runBatch(config, updates);
  }

  const presentCount = updates.filter((u) => u.body.presentInV5).length;
  console.log(`Scanned ${scanned} docs-default-${currentVersion}-tagged records.`);
  console.log(`Tagged ${updates.length} anchored records (${presentCount} presentInV5:true).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
