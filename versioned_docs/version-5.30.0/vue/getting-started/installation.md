---
sidebar_position: 2
sidebar_label: Installation
displayed_sidebar: vueSidebar
---

import CliInstall from '../../\_shared/getting-started/cliinstall.mdx';
import TrialStart from '../../\_shared/getting-started/starting_trial.mdx';
import InstallNpm from '../../\_shared/getting-started/install_npm.mdx';
import InstallDownload from '../../\_shared/getting-started/install_download.mdx';
import ImportStyles from '../../\_shared/getting-started/import_styles.mdx';

# Getting started with Mobiscroll for Vue

## Install the CLI

The first step you need to install the Mobiscroll library into your app is to install the Mobiscroll CLI.

<CliInstall />

## Starting with the trial

<TrialStart framework="vue" />

## Installing from NPM

<InstallNpm framework="vue" />

## Installing a downloaded package

<InstallDownload framework="vue" />

## Use the components

<ImportStyles framework="vue" />

To test the installation, create a single file component (SFC), import the Eventcalendar component in it. You can also pass it a view option and/or set a specific theme if you want.

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
