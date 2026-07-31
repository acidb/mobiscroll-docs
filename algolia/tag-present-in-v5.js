// Post-crawl step, run after every docsearch-scraper crawl (wired into
// .github/workflows/algolia-crawl-dev.yml / algolia-crawl.yml).
//
// Stamps every current-version (v6) record whose (page path, anchor) pair is part of the
// frozen v5.35.0 set (algolia/v5-anchors.json, see algolia/generate-v5-anchor-sets.js) with
// a `presentInV5: true` marker AND, more importantly, adds "docs-default-5.35.0" to that
// record's `docusaurus_tag` facet (Algolia facets can hold multiple values, and a
// facetFilters/filters match succeeds if ANY value matches).
//
// Written as a plain full-array overwrite (`[currentTag, legacyTag]`), not Algolia's
// `AddUnique` array operation — confirmed in practice that AddUnique's write didn't
// persist (presentInV5, a plain field in the same request, DID apply; docusaurus_tag,
// using AddUnique, did not), so this avoids depending on that operation's exact behavior.
// Safe to overwrite outright rather than append: every record processed here was just
// browsed via a `docusaurus_tag:"docs-default-<currentVersion>"` filter, so its current
// value is already known to be exactly that single tag before this write.
//
// That tag addition is what actually makes a v5.35.0-page search find this content: it
// turns "v5.35.0's own records OR (v6 records AND presentInV5:true)" — an OR-of-an-AND that
// Algolia's `filters` grammar rejects outright ("(X AND Y) OR Z is not allowed") — into a
// single plain `docusaurus_tag:"docs-default-5.35.0"` match, identical in shape to every
// other page's query (see src/components/Search/util.ts). The record's OTHER
// docusaurus_tag value (docs-default-<currentVersion>) is explicitly included in the
// overwritten array too, so its own version's searches keep matching it exactly as before
// — nothing is removed, only added. Matched by page path, not anchor alone, so a v6 page
// that happens to reuse an
// anchor name from a page v5.35.0 doesn't have (e.g. a per-view split like
// options_calendarview.md with no v5.35.0 equivalent page) is never mistakenly tagged just
// because the anchor string exists somewhere else in v5.35.0's docs.
//
// Since v5.35.0 is frozen, this script always recomputes the same classification from the
// same static input — idempotent, no "did v6 change" logic, safe to run after every crawl
// (each crawl's atomic swap resets docusaurus_tag to its plain single value, so there's no
// stale-tag risk to clean up between runs).
//
// Required env: ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY, ALGOLIA_INDEX_NAME

const fs = require('fs');
const path = require('path');
const { algoliaConfig, browseAll, runBatch, pagePathFromUrl, toAnchorSetMap, isTrackedAnchor } = require('./lib');

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
    if (!isTrackedAnchor(hit.anchor)) return; // guide/landing content — not part of the v5/v6 API overlap
    const pagePath = pagePathFromUrl(hit.url);
    const presentInV5 = !!(v5SharedByPage[pagePath] && v5SharedByPage[pagePath].has(hit.anchor));
    const body = { objectID: hit.objectID, presentInV5 };
    if (presentInV5) {
      body.docusaurus_tag = [`docs-default-${currentVersion}`, 'docs-default-5.35.0'];
    }
    updates.push({ action: 'partialUpdateObject', body });
  });

  if (updates.length > 0) {
    await runBatch(config, updates);
  }

  const presentCount = updates.filter((u) => u.body.presentInV5).length;
  console.log(`Scanned ${scanned} docs-default-${currentVersion}-tagged records.`);
  console.log(`Tagged ${updates.length} anchored records (${presentCount} presentInV5:true, tag added).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
