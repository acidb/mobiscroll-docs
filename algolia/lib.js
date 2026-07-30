// Small shared helper for the post-crawl scripts. Plain Node `fetch` against Algolia's
// REST API directly — no algoliasearch client dependency, matching the project's existing
// no-extra-dependency pattern for search tooling (docker + jq for the crawl itself).

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function algoliaConfig() {
  return {
    appId: requireEnv('ALGOLIA_APP_ID'),
    apiKey: requireEnv('ALGOLIA_ADMIN_API_KEY'),
    indexName: requireEnv('ALGOLIA_INDEX_NAME'),
  };
}

async function algoliaRequest(config, apiPath, body) {
  const res = await fetch(`https://${config.appId}.algolia.net/1/indexes/${config.indexName}${apiPath}`, {
    method: 'POST',
    headers: {
      'X-Algolia-Application-Id': config.appId,
      'X-Algolia-API-Key': config.apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    const err = new Error(`Algolia API error ${res.status} on ${apiPath}: ${text}`);
    err.status = res.status;
    err.body = text;
    throw err;
  }
  return res.json();
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// docsearch-scraper crawls into a temporary index and atomically swaps it into the real
// index name at the very end of the run — that swap is itself an async Algolia operation,
// so the target index can briefly 404 ("does not exist") right after the crawl step
// reports success, before the swap has fully propagated. Retries only this specific,
// known-transient condition (confirmed in practice: a crawl that logged "Nb hits: 115567"
// still 404'd on the very next step) — any other error still fails immediately, since
// this is not a generic retry-everything wrapper.
function isIndexNotYetVisible(err) {
  return err.status === 404 && /does not exist/i.test(err.body || '');
}

async function withIndexReadyRetry(fn, { retries = 6, delayMs = 10000 } = {}) {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (isIndexNotYetVisible(err) && attempt < retries) {
        console.log(`Index not visible yet (attempt ${attempt + 1}/${retries}) — the crawl's final index swap is likely still propagating. Retrying in ${delayMs / 1000}s...`);
        await sleep(delayMs);
        continue;
      }
      throw err;
    }
  }
}

// Iterates every record matching `filters`, calling onHit(hit) for each one.
async function browseAll(config, filters, onHit) {
  let cursor;
  let total = 0;
  do {
    const body = cursor ? { cursor } : { filters, hitsPerPage: 1000 };
    const page = await withIndexReadyRetry(() => algoliaRequest(config, '/browse', body));
    for (const hit of page.hits) {
      onHit(hit);
      total++;
    }
    cursor = page.cursor;
  } while (cursor);
  return total;
}

async function runBatch(config, requests) {
  const CHUNK_SIZE = 1000;
  for (let i = 0; i < requests.length; i += CHUNK_SIZE) {
    const chunk = requests.slice(i, i + CHUNK_SIZE);
    await algoliaRequest(config, '/batch', { requests: chunk });
  }
}

async function algoliaGetObject(config, objectID) {
  const res = await fetch(`https://${config.appId}.algolia.net/1/indexes/${config.indexName}/${objectID}`, {
    method: 'GET',
    headers: {
      'X-Algolia-Application-Id': config.appId,
      'X-Algolia-API-Key': config.apiKey,
    },
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    const text = await res.text();
    const err = new Error(`Algolia API error ${res.status} on GET /${objectID}: ${text}`);
    err.status = res.status;
    err.body = text;
    throw err;
  }
  return res.json();
}

// docsearch-scraper crawls into a temporary index and atomically swaps it into the real
// index name at the very end of the run, which fully replaces the index's contents. That
// swap is an async Algolia operation, so a read against the target index right after the
// crawl step reports success can still land on the OLD data (or 404, if the index didn't
// exist before) — no error, just stale-and-silent. Comparing record counts against the
// crawl's own logged total was considered and rejected: it requires parsing
// docsearch-scraper's stdout (fragile if its output format ever changes) and a >=/=== count
// check has a real edge case (a re-crawl that legitimately produces FEWER records than
// before can make the stale, larger old count look "done" prematurely).
//
// Instead: plant a throwaway sentinel object in the target index BEFORE the crawl runs
// (plantFreshnessSentinel — also auto-creates the index if it doesn't exist yet, covering
// that case for free), then after the crawl, wait until that exact sentinel is gone
// (waitForFreshCrawl) — since the swap fully replaces the index's contents, the sentinel's
// disappearance is a direct, content-agnostic proof the fresh crawl is now live, with no
// dependency on record counts or the crawler's log wording.
const FRESHNESS_SENTINEL_OBJECT_ID = '__pre_crawl_freshness_sentinel__';

async function plantFreshnessSentinel(config) {
  await runBatch(config, [
    { action: 'updateObject', body: { objectID: FRESHNESS_SENTINEL_OBJECT_ID, plantedAt: new Date().toISOString() } },
  ]);
}

async function waitForFreshCrawl(config, { retries = 12, delayMs = 10000 } = {}) {
  for (let attempt = 0; ; attempt++) {
    const sentinel = await algoliaGetObject(config, FRESHNESS_SENTINEL_OBJECT_ID);
    if (!sentinel) return; // gone — the crawl's atomic swap has replaced the index
    if (attempt >= retries) {
      throw new Error(
        `Timed out waiting for the crawl's index swap to complete (freshness sentinel still present after ${retries} retries). Refusing to run Prune/Tag against what may be stale, pre-crawl data.`,
      );
    }
    console.log(`Freshness sentinel still present (attempt ${attempt + 1}/${retries}) — the crawl's index swap likely hasn't landed yet. Retrying in ${delayMs / 1000}s...`);
    await sleep(delayMs);
  }
}

// Derives the page-path key used in algolia/v5-anchors.json / v5-only-anchors.json from a
// crawled record's `url` (e.g. "https://mobiscroll.com/docs/5.35.0/react/eventcalendar/
// scheduler#opt-x" -> "react/eventcalendar/scheduler") — strips domain, the "/docs/"
// prefix, an optional "5.35.0/" version segment, and the URL fragment/trailing slash, so
// v5.35.0-tagged and current-version-tagged records normalize to the same key shape.
function pagePathFromUrl(url) {
  const { pathname } = new URL(url);
  return pathname
    .replace(/^\/docs\//, '')
    .replace(/^5\.35\.0\//, '')
    .replace(/\/$/, '');
}

function toAnchorSetMap(pagePathToAnchors) {
  const map = {};
  for (const [pagePath, anchors] of Object.entries(pagePathToAnchors)) {
    map[pagePath] = new Set(anchors);
  }
  return map;
}

module.exports = {
  algoliaConfig,
  browseAll,
  runBatch,
  pagePathFromUrl,
  toAnchorSetMap,
  plantFreshnessSentinel,
  waitForFreshCrawl,
};
