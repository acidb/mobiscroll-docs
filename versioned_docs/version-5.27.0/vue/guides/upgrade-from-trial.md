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

## Upgrading the library in your project

There are two options how to upgrade, depending on how did you install the trial in your project and what type of license did you purchase.

1. [Upgrade to the full package](#upgrade-to-full)
2. [Upgrade to a custom package](#upgrade-to-custom)

### Upgrading to the full package {#upgrade-to-full}

This method will include a Mobiscroll package into your project from NPM. In order for this to work, you will need a license from the following types of licenses with an [active maintenance](http://help.mobiscroll.com/en/articles/666557-maintenance-explained):
* Date & Time picking
* Scheduling & Calendaring
* Complete
* Enterprise (SaaS)

:::info
The package installed will contain all the components of the framework, except for the Date & Time license. In that case only the associated components will be included in the package. Check out the [pricing page](https://mobiscroll.com/pricing) for more details on which components are included in the Date & Time picking license.
:::

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

### Upgrading to a Component license {#upgrade-to-custom}

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
mobiscroll config vue --no-npm
```

The Mobiscroll CLI under the hood will create and install a local NPM package from the lib folder. After the installation is complete, your package.json file should have an entry for a dependency like this:

```json
"@mobiscroll/vue": "file:./src/lib/mobiscroll-package/mobiscroll-vue-5.27.1.tgz",
```

The `.tgz` file referenced here is the Mobiscroll package and it should be added to your repository too.

At this point the trial package should be replaced with the commercial package, and building and running your project should work.
