---
sidebar_label: Update version
displayed_sidebar: vueSidebar
---

# Updating to the latest Mobiscroll

In this guide you will learn how to update an already installed package in your project to the latest version. If you are looking for how to install Mobiscroll for the first time, you can check the [getting started guide](../getting-started/installation.md), if you want to upgrade from trial to a licensed version you can check out our [upgrade guide](./upgrade-from-trial.md).

:::caution
In order to have access to the latest version, you will need an [active maintenance](http://help.mobiscroll.com/en/articles/666557-maintenance-explained).
:::

There are multiple options on how to update to the latest version, depending on how you installed Mobiscroll in your project in the first place and what kind of license you have:

1. [Updating from our NPM repository](#npm-update)
2. [Updating with the Mobiscroll CLI](#cli-update)
3. [Updating with the Mobiscroll CLI using a downloaded package](#download-update)

## Updating from our NPM repository {#npm-update}

### Prerequisites

* Mobiscroll was set up with the Mobiscroll CLI before
* You own one of the following [types of licenses](https://mobiscroll.com/pricing):
  - Date & Time picking
  - Scheduling & Calendaring
  - Complete
  - Enterprise (SaaS)
* You have an [active maintenance](http://help.mobiscroll.com/en/articles/666557-maintenance-explained)

### Update Steps

Running the following command in your project root folder will update your package to the latest:

```bash
npm update @mobiscroll/vue
```

## Updating with the CLI {#cli-update}

### Prerequisites

* Mobiscroll was set up with the Mobiscroll CLI before
* You have the Mobiscroll CLI installed globally
* You own one of the following [types of licenses](https://mobiscroll.com/pricing):
  - Date & Time picking
  - Scheduling & Calendaring
  - Complete
  - Enterprise (SaaS)
* You have an [active maintenance](http://help.mobiscroll.com/en/articles/666557-maintenance-explained)

### Update Steps

Running the following command in your project root folder will update your package to the latest:

```bash
mobiscroll config vue
```

## Updating from a downloaded package {#download-update}

This option can be used if you are using a downloaded package in your project.

### Prerequisites

* Mobiscroll was set up with the Mobiscroll CLI before
* You have access to the [Download page](https://download.mobiscroll.com) with a licensed account

### Update Steps

#### 1. Download a new package

The first step is to download a new package from the [download page](https://download.mobiscroll.com). There is a version dropdown at the top right corner of the screen. You can check there that you selected the latest version. After selecting the components, themes, languages and icon packs you need, hit the download button and wait for the package to download.

:::caution
Make sure you select all the components and themes you used in your project, otherwise they will not work after the update.
:::

:::tip
You can save / bookmark the download page URL to keep track the download configuration you used.
:::

#### 2. Copy the resources to your project

Unzip the downloaded package into a temporary folder.
After that, create a folder with the following path `src/lib/mobiscroll` from your projects root directory.
Copy the `src`, `js`, `css`, `esm5` folders from the temp folder to your project's `src/lib/mobiscroll` folder you created.

#### 3. Run the config command

Running the following command will update the package in your project:

```bash
mobiscroll config vue --no-npm
```
