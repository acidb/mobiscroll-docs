---
sidebar_position: 8
sidebar_label: ESM Bundle
displayed_sidebar: javascriptSidebar
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
import { button } from '.\esm5\mobiscroll.javascript.min.js'; // import the button initialization function
button('#my-element'); // initialize a button on the element with id 'my-element'
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

In ESM bundles, for the auto-initialization to work, the components will need to be registered. This registration can be done using the `registerComponent` function.

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

The above code will enable the use of the mbsc-button, mbsc-checkbox, mbsc-segmented and mbsc-segmented-group attributes on elements.

## Setting up the ESM Bundle

Using the ESM bundle depends on the project structure you have. Here are a few examples on how to set up in different environments.

### Using ES6 Modules without bundlers

Since modern browsers started supporting native JavaScript modules, ESM bundles can be used directly in them. This "direct" usage means, that initialization functions can be imported into scripts denoted as modules. Scripts can be denoted as modules with the `type="module"` attribute.

:::info
Please note that this may not be supported by all browsers. Check out the browser support for native JavaScript Modules [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#browser_support)!
:::

The following example demonstrates how to import the Mobiscroll initialization functions into scripts. To create the file structure download a JavaScript package from the [download builder](https://download.mobiscroll.com/) and grab the `js`, `css` and `esm5` folders and copy to an empty directory. Create an `index.html` file with the following content:

```html title='index.html'
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Getting Started</title>
    <link rel="stylesheet" href="./css/mobiscroll.javascript.min.css" />
  </head>
  <body>
    <label>
      Datepicker
      <input id="myInput" type="text" />
    </label>
    <script type="module"></script>
  </body>
</html>
```

What you can see here, is:
- the loading of the stylesheet in the header,
- the markup of an input element wrapped in a label and
- an empty script tag with the attribute of type="module".

The file structure you will need is the following:

```bash title='File structure'
File structure
/
|--css/
    |--mobiscroll.javascript.min.css
    |--icons_mobiscroll.ttf
    |--icons_mobiscroll.woff
|--esm5/
    |--mobiscroll.javascript.min.js
|--js/
    |--mobiscroll.javascript.min.js
|--index.html
```

In the script tag, you can import the datepicker initialization function and use it on the input to create the datepicker as follows:

```javascript
<script type="module">
  import { datepicker } from './esm5/mobiscroll.javascript.min.js';

  datepicker('#myInput', {
    theme: 'ios',
    themeVariant: 'dark'
  });
</script>
```

To also enhance the input, and make it a Mobiscroll Input, you will need to add the `mbsc-input` attribute to the input element, and setup the [auto-initialization](#manual-vs-auto-initialization).

Add the attribute to the input:

```javascript
<input mbsc-input id="myInput" type="text" />
```

Register the auto-init of inputs:

```javascript
import { datepicker, registerComponent, Input } from './esm5/mobiscroll.javascript.min.js';

registerComponent(Input);

datepicker('#myInput', {
    theme: 'ios'
});
```

This will enhance the input, and initialize the datepicker on it.

One important thing to note here is that opening the index.html in the browser won't work without a web server. That's because of a cross origin security policy applied by the browser, that won't load the mobiscroll script unless the `index.html` is on the same domain.

This limitation can be solved by using a simple web server. Here's an example of how to use a `http-server` from NPM (Node Package Manager).

### Simple web server for testing

Install the `http-server` via NPM, using the following command:

```bash
$ npm install -g http-server
```

Start the server in the same directory the index.html file is located by the following command:

```bash
$ npx http-server .\ -c-1
```

After starting the server, navigate to the `http://127.0.0.1:8080/` address. This will serve you the index.html file and the example will work now.

### Webpack

When using webpack to bundle your project's javascript, you can make use of the Mobiscroll CLI to install the Mobiscroll Package and then import in your files only what you need.

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

After webpack is ready, we'll create a configuration file `webpack.config.js` in the root directory. This is standard configuration for webpack, to project the javascript to `bundle.js` and use the style and css loaders to import styles too. It will have the following content:

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
    ],
  },
};
```

The index html file will load only the `bundle.js` and will contain the markup for label and input elements:

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

Next step is to install the Mobiscroll package via the CLI. Depending on what kind of license you have, you can have a package from the [download page](https://download.mobiscroll.com/) or you can have access to the NPM repository. Either way, you will have to use the `mobiscroll config javascript` command only with different options. If you have a package from the download page, please follow the guide there on how to install the package. If you have access to the npm package or you're on trial the following command will install it:

```bash
$ mobiscroll config javascript
```

The above command will install the mobiscroll package inside `node_modules` under `@mobiscroll/javascript`. All the components initialization functions can be imported from there as follows:

```javascript title='src\index.js'
import { datepicker } from '@mobiscroll/javascript';
import '@mobiscroll/javascript/dist/css/mobiscroll.min.css';

export function main() {
    console.log('main called.');

    datepicker('#myInput', {
        theme: 'ios'
    });
}

main();
```

To build the bundle you can use the command webpack:

```bash
$ npx webpack
```

After that, opening the index.html file should show up with the datepicker working. To make the `mbsc-input` attribute work, you will have to register the input component for auto-initialization, just as described in [this section](#manual-vs-auto-initialization).

```javascript title='src\index.js'
import { datepicker, registerComponent, Input } from '@mobiscroll/javascript';
import '@mobiscroll/javascript/dist/css/mobiscroll.min.css';

registerComponent(Input);

export function main() {
    console.log('main called.');

    datepicker('#myInput', {
        theme: 'ios'
    });
}

main();
```

After building the bundle again, the input will be also enhanced to Mobiscroll Input, and when clicked the Datepicker will open, just as expected.