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

## ESM Bundle

With every Mobiscroll package we provide an ESM bundle, so it can be used as a JavaScript Module. This way many bundlers (for example Rollup, Webpack, etc...) can take advantage of the tree-shaking technique and eliminate dead code. This reduces the bundle size to only what is actually used in the application.

The ESM bundles are under the `esm5` folder of the package.

The Mobiscrol ESM bundle has all the components the regular bundle has, but it omits a few setup steps in order to be tree-shakeable. One of these steps is the [registering of components](#registering-components), that needs to be done manually for the auto-initialization to work.

## Manual vs Auto initialization

All of the Mobiscroll components can be initialized manually using their initialization functions:

```javascript
import { button } from '.\esm5\mobiscroll.javascript.min.js'; // import the button initialization function
button('#my-element'); // initialize a button on the element with id 'my-element'
```

Some Mobiscroll components can also be initialized using a html attribute that automatically initializes the component:

```html
<button id="my-element" mbsc-button onclick="myOnClickFunction();"></button>
<!-- the mbsc-button attribute is used to auto-initialize the button component -->
```

### Registering components

In ESM bundles, for the auto-initialization to work, the components will need to be registered. This registration can be done using the registerComponent function.

Manually initializing components will work the same way in both regular and esm bundles.

```javascript
import {
  // highlight-start
  registerComponent, // import the registerComponent function used to register the components for auto-initialization
  Button, // import component classes that needed to be regitered
  // highlight-end
  Checkbox,
  Segmented,
  SegmentedGroup
} from '.\esm5\mobiscroll.javascript.min.js';

// register components for auto-initialization
// highlight-next-line
registerComponent(Button);
registerComponent(Checkbox);
registerComponent(Segmented);
registerComponent(SegmentedGroup);
```