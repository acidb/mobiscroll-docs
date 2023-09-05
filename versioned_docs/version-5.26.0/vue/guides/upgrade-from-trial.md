---
sidebar_label: Upgrade from trial
displayed_sidebar: vueSidebar
---

# How to upgrade from the trial version

## Requirements

### Acquiring a license

When upgrading from a trial license to a commercial, the first step is to purchase the commercial license. This can be done from our [pricing page](https://mobiscroll.com/pricing) among other areas of our website.
If you are still looking for which license to choose or if you have any questions, [let us know](mailto:support@mobiscroll.com)! We are here to help!

### Assigning the license to the developer

After the purhcase of the commercial license, it should be assigned to the developer, who will do the development. This can be done immediately after the purchase, or later from the [licenses page](https://mobiscroll.com/account/licenses). When the buyer and the developer is the same person, the license can be self-assigned as well.

### Upgrading the library in your project

There are three options how to upgrade, depending on how did you install the trial in your project and what type of license did you purhcase.

1. [Upgrade to full framework using the CLI](#upgrade-to-full)
2. [Upgrade to custom package using the CLI](#upgrade-to-custom)
3. [Upgrade manually to custom package](#upgrade-manual)

The first two options are for projects where the trial was set up with the Mobiscroll CLI. These projects inlcude Vue.js apps or Stencil.js apps.

The third options is for projects, that don't have a dedicated build process, or where the source files are referenced on the web pages directly via `<script>` and `<link />` elements.

## Upgrading to Framework, Complete or SaaS license {#upgrade-to-full}

This method will include the full mobiscroll package into your project from NPM. In order for this to work, you will need a Full Framework, Complete or SaaS license.

To upgrade the trial package in your project, the commercial license needs to be assigned to your account. If you are the developer, but somebody else purchased the license, then the buyer can assign the license to your account. You should instruct the buyer to log in to his account and proceed to the [licenses page](https://mobiscroll.com/account/licenses). From there, he can assign the license to you account.

After the license is assigned to your account, run the following commands in your project root directory to upgrade the package:

**1. Log in to your account**

If you are using the same account for the commercial license that you were using with the trial, then you can skip this step.

```bash
mobiscroll login
```

When you are asked, please provide your credentials. If you haven't set a password yet, you can set one from your [account page](https://mobiscroll.com/account).

**2. Configure the project**

```bash
mobiscroll config vue
```

At this point the trial package should be replaced with the commercial package, and building and running your project should work.

## Upgrading to a Component license {#upgrade-to-custom}

With this method, you will download a package from our website, then you will use the Mobiscroll CLI to install that package to your project.

If you don't have access to the Full Framework, or if you want to customize your package to only contain specific components, this is the way to go.

**1. Download your package**

Access the [download page](https://download.mobiscroll.com), by logging in to your account. The commercial license needs to be assigned to your account. If you are the developer, but somebody else purchased the license, then the buyer can assign the license to your account. You can instruct the buyer to loggin into his account and proceed to the licenses page.

After selecting the components, themes, custom themes and font icon packs that you need, hit the download button and download your package. If you have multiple licenses and have access to multiple frameworks, you might need to select the framework as well.

**2. Copy the library to your project**

Extract the zip file you just downloaded, then grab the `js`, `src` and `css` folders and copy it into the `src/lib/mobiscroll` folder of your project. If there is no such folder available, you should create it.

**3. Configure the project**

Run the config command in your project's root folder with the `--no-npm` flag to proceed with the upgrade.

```bash
mobiscroll config javascript --no-npm
```

The Mobiscroll CLI under the hood will create and install a local NPM package from the lib folder. After the installation is complete, your package.json file should have an entry for a dependency like this:

```json
"@mobiscroll/javascript": "file:./src/lib/mobiscroll-package/mobiscroll-javascript-4.10.1.tgz",
```

The `.tgz` file referenced here is the mobiscroll package and it should be added to your repository too.

At this point the trial package should be replaced with the commercial package, and building and running your project should work.

## Manual upgrade {#upgrade-manual}

In this guide you will download a custom package from our website and change the files from your project to the newly downloaded package.
It is suitable for projects, where there is no dedicated build process, or where the source files are referenced on the web pages directly via `<script>` and `<link />` elements.

**1. Download the package**

Access the [download page](https://download.mobiscroll.com), by logging in to your account. The commercial license needs to be assigned to your account. If you are the developer, but somebody else purchased the license, then the buyer can assign the license to your account. You can instruct the buyer to loggin into his account and proceed to the licenses page.

After selecting the components, themes, custom themes and font icon packs that you need, hit the download button and download your package. If you have multiple licenses and have access to multiple frameworks, you might need to select the framework as well.

**2. Copy over the files to your project**

If you had the trial version installed, remove the `js` and `css` folders of the trial from your project and replace them with the newly downloaded package `js` and `css` folders.

You should also check and update the links to the new package in your page if the paths are different:

```html
<link href="css/mobiscroll.javascript.min.css" rel="stylesheet" />
<script src="js/mobiscroll.javascript.min.js"></script>
```

At this point you should have a working project with the mobiscroll commercial components included.