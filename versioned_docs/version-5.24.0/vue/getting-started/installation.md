---
sidebar_position: 2
sidebar_label: Installation
displayed_sidebar: vueSidebar
---

import CliInstall from '../../\_shared/cliinstall.mdx';

# Getting started with Mobiscroll for Vue

## Install the CLI

The first step you need to install the Mobiscroll library into your app is to install the Mobiscroll CLI.

<CliInstall />

## Installing from NPM

To install the Mobiscroll library from NPM, you will need to open a terminal window in the root folder of you project and run the following command:

```bash
mobiscroll config vue
```

:::info
If you're working behind a proxy, additional configuration might be needed. Please check the [proxy configuration options](https://docs.mobiscroll.com/cli#proxy) of the CLI.
:::

:::info
The package will be installed from a private npm registry, which requires authentication. If your project uses a CI/CD workflow, [read this guide](http://help.mobiscroll.com/en/articles/1195431-installing-mobiscroll-with-npm#setting-up-for-cicd) on how to make it work.
:::

## Installing a downloaded package

On the [download page](https://download.mobiscroll.com/) a custom package can be built by picking only the components, themes, languages and additional modules you need.

When building your package, select the required components and other resources, then hit the download button.

### Copy Mobiscroll into your app.

Extract the zip file you just downloaded, then grab the `js`, `src` and `css` folders and copy it into src/lib/mobiscroll folder of your JavaScript app. If there is no such folder available, you can create it.

### Run the config command

Run the config command in the root folder of your app in a terminal window.

```bash
mobiscroll config vue --no-npm
```

## Use the components

To test the installation, create a single file component (SFC), import the Eventcalendar component in it. You can also pass it a view option and/or set a specific theme if you want.

In case you installed the library from a downloaded package and did not include the Eventcalendar in the package, you can choose a different component as well.

```html
<script setup>
  import { ref } from 'vue';
  import { MbscEventcalendar, setOptions, localeEnGB } from '@mobiscroll/vue';

  setOptions({
    locale: localeEnGB,
    theme: 'ios',
    themeVariant: 'light',
  });

  const myView = ref({
    calendar: { type: 'month' },
    agenda: { type: 'month' },
  });
</script>

<template>
  <MbscEventcalendar :view="myView"></MbscEventcalendar>
</template>
```
