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

module.exports = { algoliaConfig, browseAll, runBatch };
