// Run AFTER docsearch-scraper and BEFORE prune-v5-duplicates.js/tag-present-in-v5.js
// (wired into .github/workflows/algolia-crawl-dev.yml / algolia-crawl.yml). Blocks until
// the freshness sentinel planted by plant-freshness-sentinel.js is gone, proving the
// crawl's atomic index swap has landed — see algolia/lib.js's comment above
// waitForFreshCrawl for the full reasoning. Fails loudly on timeout rather than letting
// Prune/Tag silently run against stale, pre-crawl data.
//
// Required env: ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY, ALGOLIA_INDEX_NAME

const { algoliaConfig, waitForFreshCrawl } = require('./lib');

waitForFreshCrawl(algoliaConfig())
  .then(() => console.log('Fresh crawl confirmed live — proceeding.'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
