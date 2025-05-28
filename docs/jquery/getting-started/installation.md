---
sidebar_position: 2
sidebar_label: Installation
displayed_sidebar: jquerySidebar
---

import CliInstall from '../../\_shared/getting-started/cliinstall.mdx';
import TrialStart from '../../\_shared/getting-started/starting_trial.mdx';
import InstallNpm from '../../\_shared/getting-started/install_npm.mdx';
import InstallDownload from '../../\_shared/getting-started/install_download.mdx';
import ImportStyles from '../../\_shared/getting-started/import_styles.mdx';
import CiCdUsage from '../../\_shared/getting-started/cicd_usage.mdx';

# Getting started with Mobiscroll for jQuery

Depending on the target project, the Mobiscroll library can be installed into:

1. A web application with module loaders (like webpack or similar app building tools)
2. Simple HTML web pages (with script and link tags)

For simple web pages the Mobiscroll CLI is not required and you can follow the [install guide for web pages](#web-pages).

To install the Mobiscroll library to your web application, you will need the Mobiscroll CLI.

## Install the CLI

<CliInstall />

## Starting with the trial

<TrialStart framework="jquery" />

By default the CLI will install the [ESM Bundle](../core-concepts/esm-bundle) of the trial package. You might need to [register components for the auto-initialization](../core-concepts/esm-bundle.md#manual-vs-auto-initialization) feature to work.

## Installing from NPM

<InstallNpm framework="jquery" />

<ImportStyles framework="jquery" />

By default the CLI will install the [ESM Bundle](../core-concepts/esm-bundle). You might need to [register components for the auto-initialization](../core-concepts/esm-bundle.md#manual-vs-auto-initialization) feature to work.

## Setting up for CI/CD

<CiCdUsage/>

## Installing manually

A downloaded package can be installed into a webapp with module loaders as well as a simple web page by including the code into the html.

<InstallDownload framework="jquery" />

<ImportStyles framework="jquery" />

When using module loaders, components that we want to include in the project's bundle need to be registered as described in [Registering components](#registering-components) section above.

### Web pages

To include a downloaded package to a simple website, unzip the contents of the downloaded zip file. Copy the `css` and `js` folders to your project, next to your html file. A script and a stylesheet will need to be included into the html like this:

```html title="Your html file, for example index.html"
<!-- Include jQuery -->
<script src="jquery-2.2.2.min.js"></script>
<!-- Include Mobiscroll -->
<script src="js/mobiscroll.jquery.min.js"></script>
<link href="css/mobiscroll.jquery.min.css" rel="stylesheet" type="text/css">
```

Then you can use the initialization functions through jquery:

```javascript
$(function() {
  $('#my-div').mobiscroll().eventcalendar({
    view: { scheduler: { type: 'day' }},
  });
  $('#my-other-div').mobiscroll().datepicker({
    select: 'range',
  });
});
```

:::info ESM Bundle
Would you like to use Mobiscroll as an ESM (ECMAScript Module) bundle to reduce the bundle size? It's possible, [read this guide](../core-concepts/esm-bundle) on how to make it work.
:::