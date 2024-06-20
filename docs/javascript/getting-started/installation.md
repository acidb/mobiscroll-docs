---
sidebar_position: 2
sidebar_label: Installation
displayed_sidebar: javascriptSidebar
---

import CliInstall from '../../\_shared/getting-started/cliinstall.mdx';
import TrialStart from '../../\_shared/getting-started/starting_trial.mdx';
import InstallNpm from '../../\_shared/getting-started/install_npm.mdx';
import InstallDownload from '../../\_shared/getting-started/install_download.mdx';
import ImportStyles from '../../\_shared/getting-started/import_styles.mdx';

# Getting started with Mobiscroll for JavaScript

Depending on the target project, the Mobiscroll library can be installed into:

1. A web application with module loaders (like webpack or similar app building tools)
2. Simple HTML web pages (with script and link tags)

For simple web pages the Mobiscroll CLI is not required and you can follow the [install guide for web pages](#web-pages).

To install the Mobiscroll library to your web application, you will need the Mobiscroll CLI.

## Install the CLI

<CliInstall />

## Starting with the trial

<TrialStart framework="javascript" />

## Installing from NPM

<InstallNpm framework="javascript" />

<ImportStyles framework="javascript" />

## Installing a downloaded package

A downloaded package can be installed into a webapp with module loaders as well as a simple web page by including the code into the html.

<InstallDownload framework="javascript" />

<ImportStyles framework="javascript" />

### Web pages

To include a downloaded package to a simple website, unzip the contents of the downloaded zip file. Copy the `css` and `js` folders to your project, next to your html file. A script and a stylesheet will need to be included into the html like this:

```html title="Your html file, for example index.html"
<!-- Include Mobiscroll -->
<script src="js/mobiscroll.javascript.min.js"></script>
<link href="css/mobiscroll.javascript.min.css" rel="stylesheet" type="text/css">
```

Then you can use the initialization functions from the mobiscroll namespace:

```javascript
mobiscroll.eventcalendar('#my-div', {
  view: { schedule: { type: 'day' }},
});

mobiscroll.datepicker('#my-other-div', {
  select: 'range',
});
```

:::info ESM Bundle
Would you like to use Mobiscroll with ESM Bundle to reduce the bundle size? It's possible, [read this guide](../core-concepts/esm_bundle) on how to make it work.
:::