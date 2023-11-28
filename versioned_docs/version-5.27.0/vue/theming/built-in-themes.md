---
sidebar_position: 1
sidebar_label: Built-in themes
displayed_sidebar: vueSidebar
---

# Theming

Mobiscroll components are shipped with a ready-to-use, carefully crafted design, with the ability to adapt to the platform where they are being used. The available themes are:

- `ios` and `ios-dark` - theme matching the iOS platform look & feel
- `material` and `material-dark` - theme matching the Material Design specification
- `windows` and `windows-dark` - theme matching the Universal Windows platform look & feel

The Mobiscroll package is shipped with a pre-built css file, once it's added to your project, the bundled themes can be used right away. The packages also contain scss files, for theme customizations and tree shaking solutions.

### Customizing the look and feel

While the provided pre-built themes are enough in many use cases, most of the times on top of adapting to a specific platform, you'd also like to match a brand or color scheme. Mobiscroll provides various ways to achieve this:

- [Override the Sass color variables](./sass-variables) - the straightforward way to change the colors in one place throughout the application.
- [Create custom themes using Sass](./sass-themes) - use this, if you need multiple themes with different color variatons, in case you have pages with different colors, or you'd like to users to customize the colors of your app.
- [Create custom themes using the theme builder](#theme-builder) - the custom themes can be also built using our theme builder, on a graphical user interface, without any coding, or the need for Sass support in your project.

To work with the first two methods, you need to have Sass support configured for your project.

### Theme Builder

If Sass support is not available in your project, or you prefer a visual theme editor, you can use our theme builder to create custom themes.

The theme builder is very easy to use, no coding is needed, you just choose the colors, and save the custom theme. Using our [download builder](https://download.mobiscroll.com) you can select one or more custom themes to include in the package.

You can find more information on the theme builder features and usage [here](http://help.mobiscroll.com/mobiscroll-products-and-tools/theme-builder).
