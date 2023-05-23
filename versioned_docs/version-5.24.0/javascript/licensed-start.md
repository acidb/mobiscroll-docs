---
sidebar_position: 1
sidebar_label: Getting started with licensed
displayed_sidebar: javascriptSidebar
---

import CliInstall from '../\_shared/cliinstall.mdx';

## Installation

<CliInstall />

Run `mobiscroll config react` in the root folder of you app in a terminal window.

```
mobiscroll config javascript
```

:::tip
If you're working from behind a proxy, additional configuration might be needed. Please check the [proxy configuration options](https://docs.mobiscroll.com/cli#proxy) in the documentation.
:::

:::tip
The package will be installed from a private npm registry, which requires authentication. If your project uses a CI/CD workflow, [read this guide](http://help.mobiscroll.com/en/articles/1195431-installing-mobiscroll-with-npm#setting-up-for-cicd) on how to make it work.
:::

## Using the download builder

When building your package, select the required components on the [download page](https://download.mobiscroll.com/).

Copy Mobiscroll into your app.

Extract the zip file you just downloaded, then grab the `js`, `src` and `css` folders and copy it into src/lib/mobiscroll folder of your JavaScript app. If there is no such folder available, you can create it.

Load the necessary scripts
