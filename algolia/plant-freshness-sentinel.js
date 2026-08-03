// Run BEFORE docsearch-scraper (wired into .github/workflows/algolia-crawl-dev.yml /
// algolia-crawl.yml). Plants a throwaway sentinel object so wait-for-fresh-crawl.js can
// later detect, unambiguously, that the crawl's atomic index swap has landed — see
// algolia/lib.js's comment above waitForFreshCrawl for the full reasoning. Also
// auto-creates the target index if it doesn't exist yet (e.g. after a manual delete).
//
// Required env: ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY, ALGOLIA_INDEX_NAME

const { algoliaConfig, plantFreshnessSentinel } = require('./lib');

plantFreshnessSentinel(algoliaConfig())
  .then(() => console.log('Freshness sentinel planted.'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
