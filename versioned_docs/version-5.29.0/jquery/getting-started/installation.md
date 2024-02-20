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

## Installing from NPM

<InstallNpm framework="jquery" />

<ImportStyles framework="jquery" />

### Registering components

When using module loaders, components that we want to include in the project's bundle need to be registered. For example, if we wanted to use the eventcalendar calling $('selector').mobiscroll().eventcalendar(), we can do so only after registering the eventcalendar with the registerComponent function. This registration should be done only once.

```javascript title="How to register components"
import $ from 'jquery';
import {
  // highlight-start
  registerComponent, // import the registerComponent function
  Eventcalendar, // import component classes that needed to be regitered
  // highlight-end
  Datepicker,
  Button,
  Checkbox,
} from '@mobiscroll/jquery';
import '@mobiscroll/jquery/dist/css/mobiscroll.min.css'

// register components for jQuery
// highlight-next-line
registerComponent(Eventcalendar);
registerComponent(Datepicker);
registerComponent(Button);
registerComponent(Checkbox);
```

After doing the registration the initialization functions can be called through the jquery selectors like this:

```javascript
$('#my-div').mobiscroll().eventcalendar({
  view: {
    schedule: {
      type: 'week'
    }
  },
  theme: 'ios',
});
```

## Installing a downloaded package

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
    view: { schedule: { type: 'day' }},
  });
  $('#my-other-div').mobiscroll().datepicker({
    select: 'range',
  });
});
```

## ESM Bundle

With every Mobiscroll package we provide an ESM bundle, so it can be used as a JavaScript Module. This way many bundlers (for example Rollup, Webpack, etc...) can take advantage of the tree-shaking technique and eliminate dead code. This reduces the bundle size to only what is actually used in the application.

The ESM bundles are under the `esm5` folder of the package.

The Mobiscrol ESM bundle has all the components the regular bundle has, but it omits a few setup steps in order to be tree-shakeable. One of these steps is the [registering of components](#registering-components), that needs to be done manually for the auto-initialization to work.

## Manual vs Auto initialization

All of the Mobiscroll components can be initialized manually using their initialization functions:

```javascript
$('#my-element').mobiscroll().button();
```

Some Mobiscroll components can also be initialized using a html attribute that automatically initializes the component:

```html
<button id="my-element" mbsc-button onclick="myOnClickFunction();"></button>
<!-- the mbsc-button attribute is used to auto-initialize the button component -->
```

:::caution
When using an ESM bundles the auto-initialization will work only after [registering the components](#registering-components).
:::
