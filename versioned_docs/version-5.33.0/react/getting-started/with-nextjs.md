---
sidebar_position: 3
sidebar_label: Using with Next.js
displayed_sidebar: reactSidebar
---

import InstallNpm from '../../_shared/getting-started/install_npm.mdx';

# Using Mobiscroll with Next.js

This guide will walk you through integrating Mobiscroll React into a Next.js project. You'll learn how to create a new project, install Mobiscroll, and add a Datepicker component to test the setup.

## Using the Mobiscroll CLI and NPM

### Step 1: Create a Next.js App

First, create a new Next.js app using the `create-next-app` command. If you already have a Next.js project, you can skip this step.

```bash
npx create-next-app@latest my-next-app
cd my-next-app
```

:::info
Note that it could take a couple of minutes until the app is created (depending on your internet connection and machine performance).
:::


### Step 2: Install the Mobiscroll CLI

Install Mobiscroll CLI from NPM. You'll only have to do this step once on a single development machine. You won't need to repeat this on other machines or production servers.

```bash
$ npm install -g @mobiscroll/cli
```

### Step 3: Configure the project using the CLI

<InstallNpm framework="react" />

The command will ask for your credentials (email and password). If you already have a mobiscroll account but you are unsure about the details, you find them on your [account page](https://mobiscroll.com/account). If you don't have an account yet, you can start a trial in no time following [these steps](./installation.md#starting-with-the-trial).

:::info
If you already have a license, it is recommended to set up and use [team NPM accounts](http://help.mobiscroll.com/en/articles/8095168-team-npm-accounts) instead of individual developer credentials for installing Mobiscroll.
:::

### Step 4: Add Mobiscroll components to your page

Lets edit the `src/page.js` or the typescript equivalent if you use typescript in your project (`src/app/page.tsx`). You will need to import the component you want to use and the css from the mobiscroll package:

```tsx
import { Datepicker } from '@mobiscroll/react'; /* or import any other component */
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
```

:::caution Enable client side rendering
By default Next.js projects use SSR (Server Side Rendering) and Mobiscroll components need to be rendered client side. For this to work, the `'use client'` directive has to be set on the top of the file.

```tsx title="src/page.js"
'use client'
import { Datepicker } from '@mobiscroll/react';
// ...
```
:::

Add the datepicker to the page:

```tsx
export default function Home() {
  return (
  <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <Datepicker theme={'ios'} />
    </main>
    ...
```

### Step 5: Run the App

Start the development server to see your Mobiscroll Datepicker in action.

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser. You should see the Mobiscroll Datepicker rendered on the page.

:::info One more thing

**Setting up for CI/CD**

The config command in [step 3](#step-3-configure-the-project-using-the-cli) will create a file named `.npmrc` in the project root, containing the access tokens to the Mobiscroll NPM registry. Commit this file into the repository to ensure the package will install for other team members and in CI/CD environments.

If you are using Yarn or Docker, check out the [setup instructions here](./installation.md#setting-up-for-cicd).
:::


## What's Next?

Congratulations! You've successfully integrated Mobiscroll React into your Next.js app. For more components and advanced configuration options, visit the [Component's documentation](https://mobiscroll.com/docs/react#ui-components) or check out our [demo pages](https://demo.mobiscroll.com).

