---
sidebar_position: 2
sidebar_label: Custom themes
displayed_sidebar: vueSidebar
---

# Custom themes

If you'd like to use multiple color variations for the Mobiscroll components, the solution is to create one or more custom themes. A custom theme is a variation of one of the [built-in themes](./built-in-themes), referred as the base theme.

## Create a custom theme

To create a custom theme using Sass, you can use the provided [`mbsc-custom-theme`](#method-mbsc-custom-theme) function, which can be called after the mobiscroll scss file has been imported:

```scss
// import the library
@import "~@mobiscroll/vue/dist/css/mobiscroll.scss"

// specify the custom input colors:
$colors-ios-my-happy: (
    button: #6D8764,
    accent: #6D8764,
    background: #F7F7F7,
    text: #000000
);

// create a custom theme called 'my-happy-brand'
@include mbsc-custom-theme('my-happy-brand', 'ios', $colors-ios-my-happy);
```

Before you can use the custom theme, you will also need to register it in your javascript code. This can be done after the mobiscroll resources has been loaded, but before using any of the components. Use the [`createCustomTheme`](#method-createCustomTheme) function. Make sure to use the same name which was specified to the Sass function, and specify the same base theme as second parameter.

```html
<script setup>
  import { createCustomTheme } from '@mobiscroll/vue';

  createCustomTheme('my-happy-brand', 'ios'); // register the custom theme
</script>

<template>
  <MbscDatepicker theme="my-happy-brand" />
  <MbscEventcalendar theme="my-happy-brand" />
</template>
```

<div className="option-list">

## Methods

### createCustomTheme {#method-createCustomTheme}

(theme: string, baseTheme: string) => void

Registers a custom theme for use.
* `theme` - _String_ - The name of the custom theme. Make sure to use the same name you used with the SCSS function when creating the theme.
* `baseTheme` - _String_ - One of the [supported base themes](./built-in-themes).

### mbsc-custom-theme {#method-mbsc-custom-theme}

($theme-name, $base-theme-name, $colors) => void

An SCSS function which creates the styling for a custom theme, with the specified colors
* `$theme-name` - _String_ - Name of the custom theme
* `$base-theme-name` - _String_ - Name of the [base theme](./built-in-themes.md) name
* `$colors` - _Map_ - A key-value map containing the input colors. Possible keys:
  - `accent`
  - `background`
  - `text`
  - `button` - for the `ios` base theme only

</div>