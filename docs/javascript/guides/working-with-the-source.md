---
sidebar_position: 3
sidebar_label: Using the source code
displayed_sidebar: javascriptSidebar
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

When you want to use the actual source code in your project, you will need to copy over the contents of the `src` folder to your project. There is a `src/javascript/bundle-esm.ts` barrel file that imports and exports everything relevant from the source. You can use this file to import components and types or you can import each component from their respective file under `src/javascript/components/{component}.ts`.

```jsx
import { datepicker, MbscDatepickerOptions, select, MbscSelectOptions } from './my-mobiscroll-dir/javascript/bundle-esm';
// OR
import { datepicker, MbscDatepickerOptions } from './my-mobiscroll-dir/javascript/components/datepicker';
import { select, MbscSelectOptions } from './my-mobiscroll-dir/javascript/components/select';
```

```jsx
const options: MbscDatepickerOptions = {
    theme: 'ios',
    select: 'range',
    min: new Date(2022, 0, 1),
};

datepicker('#my-input', options);
select('#my-select', { theme: 'ios' } as MbscSelectOptions);
```

## Auto-initializing components

Components can be auto-initialized with HTML element attributes. There is an `enhance` function that can be called on an element that goes through the children and initializes the mobiscroll components based on the attributes. These attributes to work, the components need to be registerd for the enhance function.

```jsx title="Registering the Input component for auto-initialization"
Registering the Input component for auto-initialization
import { Input } from './my-mobiscroll-dir/javascript/components/forms';
import { registerComponent } from './my-mobiscroll-dir/javascript/base';

registerComponent(Input); // this will make the mbsc-input attribute awailable for the enhance function
```

```jsx
import { enhance } from './my-mobiscroll-dir/preact/renderer';
import { datepicker } from './my-mobiscroll-dir/javascript/components/datepicker';

// anhance the input element to have Mobiscroll Input styles
enhance(document.getElementById('my-div'));

// initialize a datepicker on the enhanced input
datepicker('#my-input', { select: 'range' });
```

```jsx
<div id="my-div">
    <label>
        My Range Picker
        <input id="my-input" mbsc-input />
    </label>
</div>
```