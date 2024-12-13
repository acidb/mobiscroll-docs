---
sidebar_label: Using the source code
displayed_sidebar: reactSidebar
title: Using Mobiscroll with the source code
---

## Overview

The following guide will help in using the development packages (a.k.a. source code) of Mobiscroll.

:::info

To have access to the source code you will need a Complete License or a License with the Source Code Addon.
You can find more details on licenses on the [pricing page](https://mobiscroll.com/pricing).

:::

The source code can be downloaded from the [download page](https://download.mobiscroll.com/). If you have access to the development packages, a dropdown will be there with the compression level label. Select the development level if it's not selected already from the dropdown. After selecting the components, themes, languages and icon packs you want to include hit the download button. You will get a zip file with the source code in it.

The source code of Mobiscroll is written in [TypeScript](https://www.typescriptlang.org/) and [SASS](https://sass-lang.com/), but a compiled JavaScript and Css version is also supplied with the packages built on our [download page](https://download.mobiscroll.com/).

## Package contents

The package comes with two folders: `src` and `dist`. The full source code of the selected components can be found under the `src` folder. The contents of the `dist` folder is a ready to use bundle, with all the components from the package, that is compiled but still unminified.

For javascript projects that don't use TypeScript, the compiled bundle is recommended. Since it is not minified, the source can be modified in the bundle file directly.

## Using the source

:::tip

Currently the [strict type checking](https://www.typescriptlang.org/tsconfig/#strict) is not supported by the development build. If you are using typescript with the strict option on, you will need to turn it off for the source code to compile in your project. Be aware that some projects have this option turned on by default (for example the create-react-app). You can turn strict mode off in your tsconfig.json file in the root of your project.

:::

```jsx title="tsconfig.json"
{
    "compilerOptions": {
        "strict": false,
        ...
```

:::info

When using the source code with React 17 or greater, the `/** @jsx createElement */` comment needs to be removed from the top of all `*.tsx` files for the project to build without error. [Check out the official react blog post](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) to learn more about this change.

:::

When you want to use the actual source code in your project, you will need to copy over the contents of the `src` folder to your project. There is a `src/react/bundle-esm.ts` barrel file that imports and exports everything relevant from the source. You can use this file to import components and types or you can import each component from their respective file under `src/react/components/{component}`.

When importing the components from their own files, the base theme files need to be loaded as well. The base themes and custom themes need to be loaded only once in the project.

```jsx title="Using the Datepicker from the source"
import './my-mobiscroll-dir/core/icons.scss';
import './my-mobiscroll-dir/core/themes';
import './my-mobiscroll-dir/core/custom-themes.scss';

import { Datepicker } from './my-mobiscroll-dir/react/components/datepicker';

function Example() {
    return <Datepicker />
}
```

For the above example to work, you will need to be able to import SASS files into your project. In case of a create-react-app project, the sass library needs to be installed, with the following command:

```jsx
$ npm install sass --save-dev
```