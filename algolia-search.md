# Algolia Search

## Manual Crawling via Algolia Crawler (recommended)

The recommended approach uses the [Algolia Crawler web interface](https://crawler.algolia.com/) with the official Docusaurus v3 template. No Docker or local tooling is required.

### Steps

1. Log in to [crawler.algolia.com](https://crawler.algolia.com/) with the Mobiscroll Algolia account.
2. Select the **docs_mobiscroll** crawler (or create one if it does not exist).
3. Go to the **Editor** tab.
4. Paste the contents of [`crawler.config.js`](./crawler.config.js) into the editor, replacing `YOUR_WRITE_API_KEY` with the Algolia write API key (must have `addObject`, `editSettings`, `deleteIndex` ACLs).
5. Click **Save**.
6. To trigger a crawl immediately, click **Run a crawl** (top-right of the Overview page).

> Note: If you update `initialIndexSettings` in the crawler config, Algolia recommends deleting the index via the Algolia dashboard and then triggering a new crawl so the index is fully re-initialized with the new settings.

---

## Legacy: Manual Crawling via Docker (old approach)

## Setup

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
