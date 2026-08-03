# Algolia Search

## Automated crawl (current)

Crawling now runs via GitHub Actions instead of the manual Docker flow below:
- `.github/workflows/algolia-crawl-dev.yml` — manual (`workflow_dispatch`) crawl of the test
  index (`dev_docs_mobiscroll`), using `search-config-dev.json`.
- `.github/workflows/algolia-crawl.yml` — crawl of the production index (`docs_mobiscroll`),
  using `search-config.json`. Runs weekly (Monday 03:00 UTC) and can also be triggered
  manually, gated behind a typed `confirm: CONFIRM` input (scheduled runs skip that gate by
  design — there's no input to type).

Both run the exact same pipeline — `algolia/docsearch-scraper` the same way the manual steps
below describe, wrapped with a freshness gate and followed by two post-crawl scripts, all from
the `algolia/` folder:
- `algolia/plant-freshness-sentinel.js` (runs *before* the crawl) — plants a throwaway
  object in the target index. `docsearch-scraper` crawls into a temporary index and
  atomically swaps it into the real index name at the very end of its run; that swap is
  async, so a read against the index right after the crawl step reports success can still
  return stale pre-crawl data (or 404, if the index didn't exist before) with no error.
- `algolia/wait-for-fresh-crawl.js` (runs right after the crawl) — blocks until that
  sentinel is gone, which only happens once the swap has fully replaced the index. Times
  out loudly (~2 min) rather than letting the next two scripts run against stale data.
- `algolia/prune-v5-duplicates.js` — deletes v5.35.0-tagged records that duplicate v6 content
  (keeps only genuinely v5-only auto-generated entries, per `algolia/v5-only-anchors.json`).
- `algolia/tag-present-in-v5.js` — for v6 records shared with v5.35.0 (per
  `algolia/v5-anchors.json`), overwrites that record's own `docusaurus_tag` facet with
  `[currentVersionTag, "docs-default-5.35.0"]` (a plain full-array write, not Algolia's
  `AddUnique` operation — confirmed in practice that `AddUnique`'s write didn't persist,
  while a plain field write did) and sets an informational `presentInV5` boolean. The tag
  addition is what actually makes the record searchable from
  a v5.35.0 page — Algolia rejects expressing "v5.35.0 OR (v6 AND presentInV5)" as a query
  filter outright, so the record itself carries both versions' tags instead of the query
  needing to combine them (see `src/components/Search/util.ts`'s `getSearchScope`).

Both artifact files (`v5-anchors.json`, `v5-only-anchors.json`) come from
`algolia/generate-v5-anchor-sets.js`, a one-time script — rerun it by hand only if v5.35.0's
own docs are corrected (v5.35.0 is otherwise frozen, so this shouldn't need to run often).

Required secrets (already configured): `ALGOLIA_APP_ID`, `ALGOLIA_ADMIN_API_KEY`.

The manual Docker flow below is still useful for local debugging of `search-config.json`
changes before running them through the Actions workflow.

## Setup (manual / local debugging)

Indexing is done manually running a docker image. Requirements are the docker and jq installed from here:

https://www.docker.com/get-started/

https://github.com/jqlang/jq/wiki/Installation

On windows 10 or later the following command will install `jq`:

```bash
winget install jqlang.jq
```

## Indexing

On mac the following command will run the indexing and update the index on our Algolia account:

```bash
docker run -it --env-file=.env -e "CONFIG=$(cat search-config.json | jq -r tostring)" algolia/docsearch-scraper
```

However, this will not work on Windows (it would be too simple).
There are 3 variables that the docker algolia/docsearch-scraper needs:
1. Application ID - from the Algolia account
2. API key - from the Algolia account for writing the index
3. Config - a configuration json that configures the crawler

All these are passed through environment variables to the docker image. The first two are read from the `.env` file and the config is passed as an argument using the `-e` flag.
The config variables is basicall read from the `search-config.json` file and it is piped through the jq command to minify it.

This won't work on Windows machines for a number of reasons. But the quickest way to workaround trough this is to add the CONFIG to the `.env` file as well.

Manually running the

```powershell
cat search-config.json | jq -r tostring >> search-config-min.txt

# for local development
cat search-config-dev.json | jq -r tostring >> search-config-min.txt
```

in powershell will output the json settings into the `search-config-min.txt` file. You can copy it over to the `.env` file. The contents should be similar to this:

```conf
APPLICATION_ID=K01Y8I3I2D
API_KEY=f3c7f4d593cf0af20d1a3ceebd27f1b3
CONFIG={"index_name":"dev_docs_mobiscroll","start_urls":[{"url...
```

Then the following command should run the indexing:

```bash
docker run -it --env-file=.env  algolia/docsearch-scraper

# for local development
docker run -it --env-file=.env-dev  algolia/docsearch-scraper
```
