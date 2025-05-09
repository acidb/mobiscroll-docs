---
sidebar_position: 3
sidebar_label: Using the source code
displayed_sidebar: jquerySidebar
title: Using Mobiscroll with the source code
---

## Overview

The following guide will help in using the development packages (a.k.a. source code) of Mobiscroll.

:::info

To have access to the source code you will need a Complete License or a License with the Source Code Addon.
You can find more details on licenses on the [pricing page](https://mobiscroll.com/pricing).

:::

The source code can be downloaded from the [download page](https://download.mobiscroll.com/). If you have access to the development packages, a dropdown will be there with the compression level label. Select the development level if it's not selected already from the dropdown. After selecting the components, themes, languages and icon packs you want to include hit the download button. You will get a zip file with the source code in it.

The source code of Mobiscroll is written in [TypeScript](https://www.typescriptlang.org/), but a compiled JavaScript version is also supplied with the packages built on our [download page](https://download.mobiscroll.com/).

## Package contents

The package comes with two folders: `src` and `dist`. The full source code of the selected components can be found under the `src` folder. The contents of the `dist` folder is a ready to use bundle, with all the components from the package, that is compiled but still unminified.

For javascript projects that don't use TypeScript, the compiled bundle is recommended. Since it is not minified, the source can be modified in the bundle file directly.

## Using the source

When you want to use the actual source code in your project, you will need to copy over the contents of the `src` folder to your project. There is a `src/jquery/bundle-esm.ts` barrel file that imports and exports everything relevant from the source. You can use this file to import components and types or you can import each component from their respective file under `src/jquery/components/{component}.ts`.

```jsx
import { Datepicker, Select } from './my-mobiscroll-dir/jquery/bundle-esm';
// OR
import { Datepicker } from './my-mobiscroll-dir/jquery/components/datepicker';
import { Select } from './my-mobiscroll-dir/jquery/components/select';
```

The imported Mobiscroll components need to be registered so their initialization function becomes available through the jquery function chaining.

```jsx
$('#myid').mobiscroll().datepicker({ select: 'range' });
```

For the above initialization function to work, the datepicker component needs to be registered like this:

```jsx
import { Datepicker } from './my-mobiscroll-dir/jquery/components/datepicker';
import { Select } from './my-mobiscroll-dir/jquery/components/select';
import { registerComponent } from './my-mobiscroll-dir/jquery/base';

registerComponent(Datepicker);
registerComponent(Select);
```

All components must be registered only once in an app. After that, they become available for initialization through jquery.

```jsx
import $ from 'jquery';

$('#my-input').mobiscroll().datepicker({ select: 'range', controls: ['date', 'time']});
$('#my-select').mobiscroll().select({ filter: true });
```