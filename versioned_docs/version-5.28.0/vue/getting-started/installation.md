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

## Starting with the trial

Start a free trial by entering your email address on the [Mobiscroll homepage](https://mobiscroll.com) and create your account. When asked, enter your first name, set a password and you're ready to go!

### This is how the free trial works:
1. You can try Mobiscroll for free.
2. The trial needs an active connection to Mobiscroll servers for validation. Don't worry, the licensed product will work offline with downloadable resource files.
Read about the [differences between trial and licensed products](http://help.mobiscroll.com/trials/what-are-the-limitations-of-the-trial).
3. You can upgrade to the licensed product at any time during or after your trial.

### Installing a trial package

To install the Mobiscroll Trial, you will need to open a terminal window in the root folder of you project and run the following command:

```bash
mobiscroll config vue --trial
```

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

You will also need to import the css file of the installed library under the node_modules folder (at `@mobiscroll/vue/dist/css/mobiscroll.min.css`). If you are [using SCSS](https://sass-lang.com/), you will also find a full and a modular `.scss` file in the same directory.

In case you installed the library from a downloaded package and did not include the Eventcalendar in the package, you can choose a different component as well.

```html
<script setup>
  import { ref } from 'vue';
  import { MbscEventcalendar, setOptions, localeEnGB } from '@mobiscroll/vue';
  import '@mobiscroll/vue/dist/css/mobiscroll.min.css';

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
  <MbscEventcalendar :view="myView" />
</template>
```
