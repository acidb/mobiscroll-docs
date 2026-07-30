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
    throw new Error(`Algolia API error ${res.status} on ${apiPath}: ${text}`);
  }
  return res.json();
}

// Iterates every record matching `filters`, calling onHit(hit) for each one.
async function browseAll(config, filters, onHit) {
  let cursor;
  let total = 0;
  do {
    const body = cursor ? { cursor } : { filters, hitsPerPage: 1000 };
    const page = await algoliaRequest(config, '/browse', body);
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

module.exports = { algoliaConfig, browseAll, runBatch, pagePathFromUrl, toAnchorSetMap };
