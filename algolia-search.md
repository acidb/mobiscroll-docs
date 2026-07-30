# Algolia Search

## Automated crawl (current)

Crawling now runs via GitHub Actions instead of the manual Docker flow below:
- `.github/workflows/algolia-crawl-dev.yml` — manual (`workflow_dispatch`) crawl of the test
  index (`dev_docs_mobiscroll`), using `search-config-dev.json`.
- `.github/workflows/algolia-crawl.yml` — manual, gated (`confirm: CONFIRM`) crawl of the
  production index (`docs_mobiscroll`), using `search-config.json`.

Both run `algolia/docsearch-scraper` the same way the manual steps below describe, then run
two post-crawl scripts from the `algolia/` folder:
- `algolia/prune-v5-duplicates.js` — deletes v5.35.0-tagged records that duplicate v6 content
  (keeps only genuinely v5-only auto-generated entries, per `algolia/v5-only-anchors.json`).
- `algolia/tag-present-in-v5.js` — stamps v6-tagged records with a `presentInV5` boolean (per
  `algolia/v5-anchors.json`), which is how a search made from a v5.35.0 page can reuse v6's
  index for shared API content (see `src/components/Search/util.ts`'s `getSearchScope`).

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
