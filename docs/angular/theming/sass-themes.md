---
sidebar_position: 4
sidebar_label: Custom themes
displayed_sidebar: angularSidebar
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import Methods from '../../_shared/theming/theming_methods.mdx';

# Custom themes

If you'd like to use multiple color variations for the Mobiscroll components, the solution is to create one or more custom themes. A custom theme is a variation of one of the [built-in themes](./built-in-themes), referred as the base theme.

## Create a custom theme

To create a custom theme using Sass, you can use the provided [`mbsc-custom-theme`](#method-mbsc-custom-theme) function, which can be called after the mobiscroll scss file has been imported:

```scss
// Import the library
@use "@mobiscroll/angular/dist/css/mobiscroll.scss";

// Specify the custom colors
$colors-my-happy-brand: (
  button: #6D8764,
  accent: #6D8764,
  background: #F7F7F7,
  text: #000000
);

// Create a custom theme called 'my-happy-brand'
@include mobiscroll.mbsc-custom-theme('my-happy-brand', 'ios', $colors-my-happy-brand);
```

When using the deprecated [Ruby Sass](https://sass-lang.com/ruby-sass/) or [LibSass](https://sass-lang.com/libsass/) implementations, use the following syntax:


```scss
// Import the library
@import "@mobiscroll/angular/dist/css/mobiscroll.scss"

// Specify the custom colors:
$colors-my-happy-brand: (
  button: #6D8764,
  accent: #6D8764,
  background: #F7F7F7,
  text: #000000
);

// Create a custom theme called 'my-happy-brand'
@include mbsc-custom-theme('my-happy-brand', 'ios', $colors-my-happy-brand);
```

Before you can use the custom theme, you will also need to register it in your javascript code. This can be done after the mobiscroll resources has been loaded, but before using any of the components. Use the [`createCustomTheme`](#method-createCustomTheme) function. Make sure to use the same name which was specified to the Sass function, and specify the same base theme as second parameter.


<Tabs>
<TabItem value="module" label="app.module.ts">

```js
import { createCustomTheme } from '@mobiscroll/angular';

// register the custom theme
createCustomTheme('my-happy-brand', 'ios');
```

</TabItem>
<TabItem value="html" label="app.component.html">

```html
<mbsc-datepicker theme="my-happy-brand"></mbsc-datepicker>
<mbsc-eventcalendar theme="my-happy-brand"></mbsc-eventcalendar>
```

</TabItem>
</Tabs>



## Light and Dark variants

To use custom themes together with the `themeVariant` option (which controls whether the light or dark variant of a theme will be used), make sure to create two custom themes. The dark version must have the same name as the light one, suffixed with `'-dark'`, for example: `'my-theme'` and `'my-theme-dark'`.

<div className="option-list">

## Methods

<Methods />

</div>
