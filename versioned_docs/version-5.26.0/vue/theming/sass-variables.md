---
sidebar_position: 1
sidebar_label: Sass variables
displayed_sidebar: vueSidebar
---

# Sass variables

A convenient way to customize the colors of the components is to override the Sass color variables.

Let's say your branding uses a nice red accent color, and you'd like that color to appear on the Mobiscroll components as well,
while still using platform specific themes (e.g. `ios` on iOS devices, `material` on Android devices).
You can override the accent color for every theme:

```scss
$mbsc-ios-accent: #e61d2a;
$mbsc-material-accent: #e61d2a;
$mbsc-windows-accent: #e61d2a;

@import '~@mobiscroll/vue/dist/css/mobiscroll.scss';
```

:::info
It's important that you override the variables BEFORE the scss file import, otherwise the variables won't take effect.
:::
