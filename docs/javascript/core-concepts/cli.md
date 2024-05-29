---
sidebar_position: 1
sidebar_label: Mobiscroll CLI
displayed_sidebar: javascriptSidebar
title: Mobiscroll CLI
---

## Overview

The Mobiscroll Command Line Interface helps to install and configure the mobiscroll library into a project.

:::info
Requires Node.js 11 or newer.
:::

## Installation

Using the node package manager (npm), the mobiscroll cli can be installed with the following command:

```bash
$ npm install -g @mobiscroll/cli
```

:::info
On Windows client computers, the execution of PowerShell scripts is disabled by default. When using Powershell, to be able to install the Mobiscroll CLI you will need to set the following [execution policy](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.3):

`Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`

Make sure to read the message displayed after executing the command and follow the instructions.
:::

## Config

Configures your current project with the Mobiscroll resources and dependencies. Use the `--version` option to define which supported main version would you like to install:

```bash title='Installs the latest v4 package'
$ mobiscroll config [types] [options] --version=4
```

```bash title='Installs the latest v5 package'
$ mobiscroll config [types] [options]
```

Options:
- `-t`, `--trial`: The project will be tuned up with trial configuration.
- `-i`, `--lite`: The project will be tuned up with lite configuration.
- `-n`, `--no-npm`: Mobiscroll resources won't be installed from npm. In this case the Mobiscroll resources must be copied manually to the `src/lib` folder.
- `-h`, `--help`: Output usage information
- `--proxy [url]`: Define a proxy URL which will be passed to the internal requests.
- `--scss`: The project will be configured with scss styles instead of css.
- `--css`: The project will be configured with css styles instead of scss.
- `--legacy-peer-deps`: This option will be passed to internally executed `npm install` command.
- `--version [version]`: Pass the Mobiscroll version which you want to install. It supports semver versions (`--version="4.10.7"`) and main versions (`--version="4"`). In case of main version it will install the latest package available.

Types:
- `angular`: Use it for configuring Angular 4+ applications.
- `ionic`: Use it for configuring Ionic 2.2.0+ applications.
- `javascript`: Use it for configuring JavaScript applications. Use it with frameworks like: Knockout, Ember.js...
- `jquery`: Use it for configuring jQuery 1.7+ applications.
- `react`: Use it for configuring React 16.2+ applications.
- `vue`: Use it for configuring Vue 3+ applications.

## Login

Logs you in to the Mobiscroll npm registry. (Use the `--global` flag if you want to login globally).

```bash
$ mobiscroll login [options]
```

Options:
- `-h`, `--help`: output usage information

## Logout

Logs you out from the Mobiscroll npm registry. (Use the `--global` flag if you want to log out globally).

```bash
$ mobiscroll logout [options]
```

Options:
- `-h`, `--help`: output usage information

## Start

Creates a new Mobiscroll starter project and installs the Mobiscroll resources from npm.

```bash
$ mobiscroll start [options] [types] [name]
```

Options:
- `-t`, `--trial`: The project will be tuned up with trial configuration.
- `-h`, `--help`: Output usage information
- `--ionic-version`: Specify the ionic version of the ionic-angular starter.

Types:
- `angular`: Creates an angular 6 applications.(Based on Angular CLI application.)
- `ionic`: Creates an ionic application. (Based on Ionic 3 application.)
- `ionic-angular`: Creates an ionic-angular application. (Based on Ionic 4/5 angular application.)
- `ionic-react`: Creates an ionic-react application. (Based on Ionic 5 react application.)
- `react`: Creates an react applications.(Based on Create React App application.)

## Using the CLI behind a proxy

If you're behind a proxy, the `mobiscroll` command might not work out of the box. There are multiple ways to solve this.

### 1. Using environment variables

The preferred way is to set the `http_proxy` and `https_proxy` environment variables on your system. This is usually needed for other CLI commands as well which are making requests and needs to be routed through a proxy server as well.

```bash title='Mac OS / Linux'
$ export http_proxy=http://myuser:mypassword@myproxy.com:1234
$ export https_proxy=http://myuser:mypassword@myproxy.com:1234
```

This will set the environment variables for the current terminal session. To permanently set the variables, add the above lines to your user's `~/.bash_profile` or `~/.zshrc` files.

```bash title='Windows'
$ setx HTTP_PROXY "http://myuser:mypassword@myproxy.com:1234"
$ setx HTTPS_PROXY "http://myuser:mypassword@myproxy.com:1234"
```

The `setx` command will permanently set the environment variables.

### 2. Using the `--proxy` parameter

The quick and dirty method without the need to modify any system configuration, is to pass the proxy address to the `mobiscroll config` command using the `--proxy` option. This will be used for any external request made to our servers or the npm registry.

```bash
$ mobiscroll config [framework] --proxy http://myuser:mypassword@myproxy.com:1234
```