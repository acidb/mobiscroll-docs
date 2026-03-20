---
sidebar_position: 8
sidebar_label: ESM Bundle
displayed_sidebar: jquerySidebar
title: ESM Bundle
---

## Overview

With every Mobiscroll package we provide an ESM bundle, so it can be used as a JavaScript Module. This way many bundlers (for example Rollup, Webpack, etc...) can take advantage of the tree-shaking technique and eliminate dead code. This reduces the bundle size to only what is actually used in the application.

The ESM bundles are under the `esm5` folder of the package.

## Using components

The Mobiscrol ESM bundle has all the components the regular bundle has, but it omits a few setup steps in order to be tree-shakeable. One of these steps is the [registering of components](#registering-components), that needs to be done manually for the auto-initialization to work.

### Manual vs Auto initialization

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

### Registering components

When using module loaders, components that we want to include in the project's bundle need to be registered. For example, if we wanted to use the eventcalendar calling `$('selector').mobiscroll().eventcalendar()`, we can do so only after registering the eventcalendar with the `registerComponent` function. This registration should be done only once.

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

### Webpack

When using webpack to bundle your project, you can make use of the Mobiscroll CLI to install the Mobiscroll Package and then import in your files only what you need.

Here's the simplest example to start with:

```bash
File structure
/
|--dist/
    |--bundle.js
    |--index.html
|--node_modules/
|--src/
    |--index.js
|--package.json
|--webpack.config.js
```

If you are doing this from scratch, you will need to install webpack and the webpack cli, as well as the css and style loader plugin. The later two is needed for the css imports to work.

```bash
$ npm install webpack webpack-cli style-loader css-loader --save-dev
```

Obviously, if you don't have jQuery installed yet, then you'll need to install it as well.

```bash
$ npm install jquery --save
```

After webpack and jQuery is ready, we'll create a configuration file `webpack.config.js` in the root directory. This is standard configuration for webpack, to project the javascript to `bundle.js` and use the style and css loaders to import styles and icon packs (fonts) too. It will have the following content:

```javascript title='webpack.config.js'
const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
```

The `index.html` file will load only the `bundle.js` and will contain the markup for label and input elements:

```html title='index.html'
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Getting Started</title>
  </head>
  <body>
    <label>
      Datepicker
      <input id="myInput" mbsc-input type="text" />
    </label>
    <script src="bundle.js"></script>
  </body>
</html>
```

Next step is to install the Mobiscroll package via the CLI. Depending on what kind of license you have, you can have a package from the [download page](https://download.mobiscroll.com/) or you can have access to the NPM repository. Either way, you will have to use the `mobiscroll config jquery` command only with different options. If you have a package from the [download page](https://download.mobiscroll.com/), please follow the guide there on how to install the package. If you have access to the NPM package or you're on Trial the following command will install it:

```bash
$ mobiscroll config jquery
```

The above command will install the mobiscroll package inside `node_modules` under `@mobiscroll/jquery`. All the components can be imported from there as follows:

```javascript title='src\index.js'
import $ from 'jquery';
import { Datepicker, registerComponent, Input } from '@mobiscroll/jquery';
import '@mobiscroll/jquery/dist/css/mobiscroll.jquery.min.css';

$(function() {
    registerComponent(Datepicker);
    registerComponent(Input);

    $('#myInput').mobiscroll().datepicker({
        theme: 'ios'
    });
});
```

To build the bundle you can run the webpack binary by:

```bash
$ npx webpack
```

After that, opening the index.html file should show up with the datepicker working and the input enhanced by the `mbsc-input` attribute.