---
sidebar_position: 2
sidebar_label: Installation
displayed_sidebar: reactSidebar
---

import CliInstall from '../../\_shared/getting-started/cliinstall.mdx';
import TrialStart from '../../\_shared/getting-started/starting_trial.mdx';
import InstallNpm from '../../\_shared/getting-started/install_npm.mdx';
import InstallDownload from '../../\_shared/getting-started/install_download.mdx';
import ImportStyles from '../../\_shared/getting-started/import_styles.mdx';
import CiCdUsage from '../../\_shared/getting-started/cicd_usage.mdx';

# Getting started with Mobiscroll for React

## Install the CLI

The first step you need to install the Mobiscroll library into your app is to install the Mobiscroll CLI.

<CliInstall />

## Starting with the trial

<TrialStart framework="react" />

## Installing from NPM

<InstallNpm framework="react" />

## Setting up for CI/CD

<CiCdUsage/>

## Installing manually

<InstallDownload framework="react" />

## Use the components

<ImportStyles framework="react" />

To test the installation, import the Eventcalendar component to your app. You can also pass it a view option and/or set a specific theme or locale if you want.

In case you installed the library from a downloaded package and did not include the Eventcalendar in the package, you can choose a different component as well.

```jsx
  import { Eventcalendar, localeEnGB } from '@mobiscroll/react';
  import '@mobiscroll/react/dist/css/mobiscroll.min.css';

  export function App() {
    return <Eventcalendar locale={localeEnGB} theme="ios" />
  }
```
