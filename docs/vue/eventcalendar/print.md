---
sidebar_position: 9
sidebar_label: Print
displayed_sidebar: vueSidebar
---

# Print

The Print Module is an optional module, that includes styles and functions for printing. It can be installed and used with the Mobiscroll Eventcalendar.

## Installing the Print Module

When your Mobiscroll package is created with the [Download Builder](https://download.mobiscroll.com) and you have access to the Print Module, you can choose to include it in the built package. In this case you will need make sure you checked the print module before downloading the package from the download page. After installing your downloaded package, the Print Module will be available for import. In case it was downloaded with the download builder, the Print Module needs to be imported from the generated package.

When you're using the full Mobiscroll package from NPM, then you have the possibility to install the Print Module as an additional package (also from NPM). In this case, after successfully using the Mobiscroll CLI to configure the project, you will have to install the `@mobiscroll/print` package from npm. Use the following command:

```bash
npm install @mobiscroll/print
```

## Importing the Print Module

The Print Module consists of print specific styles, that need to be loaded into the document. Also, there's a javascript part, that needs to be imported and passed to the component via the [`modules`](./api.md#opt-modules) option.

#### Stylesheets

:::info
In the case of the package built by the download builder, there's no additional stylesheet. It is already bundled into the same file all the other component files are.
:::

For the NPM package, styles can be found at the `dist/css/` folder inside the package.

```javascript
// importing the css
import '@mobiscroll/print/dist/css/mobiscroll.min.css';

// importing the SASS - if you are using SASS
import '@mobiscroll/print/dist/css/mobiscroll.scss';
```

#### JavaScript

The print module can be imported from the installed package and passed to the component using the [modules](./api.md#opt-modules) option. Here's an example:

```html
<script setup>
  import { MbscEventcalendar } from "@mobiscroll/vue";
  import { print } from '@mobiscroll/print';

  const myModules = [print];
</script>

<template>
  <MbscEventcalendar :modules="myModules" />
</template>
```

## Printing

Printing the Eventcalendar contents can be done using the print method of the Eventcalendar [instance](../core-concepts/instance). Calling this method will create a new window containing only the Eventcalendar and will invoke the print function of the browser. After the printing is done, the window should close automatically.

:::info
When you want to include more than just the Eventcalendar in your print, you can invoke the print screen of your browser. You don't have to worry about the printing styles for the eventcalendar, they will be applied in this case as well.
:::

The new window created by the print method will include all the styles and links to stylesheets from the original page. These styles will be copied over automatically, but in case you are using relative urls, the base url of the new window might not match yours. In this case, the print method can be passed a config object, with your custom `baseUrl`, to make the relative paths work. By default, the `baseUrl` will be the original pages origin.

:::caution
Popup blockers might block the created window, so you need to disable the blocker for this method to work.
:::

```html
<script setup>
  import { ref } from 'vue';
  import { MbscEventcalendar } from "@mobiscroll/vue";
  import { print } from '@mobiscroll/print';

  const myModules = [print];
  const calInstance = ref(null);

  function myPrint() {
    calInstance.value.instance.print();
  }
</script>

<template>
  <button @click="myPrint">Print it!</button>
  <MbscEventcalendar ref="calInstance" :modules="myModules" />
</template>
```

:::info
If you want to learn more about calling instance methods check out the [instance](../core-concepts/instance) section!
:::