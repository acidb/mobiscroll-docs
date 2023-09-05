---
sidebar_label: Global options
displayed_sidebar: vueSidebar
---

# Global options

Global options can be used to set options for all components used on a page.
Useful for speicifying application-wide options, like theme and locale.

You can use the `setOptions` utility function to specify the global options.
It can be called on initial page load or any time later.
All existing component on the page will be updated with the new options,
and components instantiated later will take into account the new global options.

Components can override the global options with their individual options,
e.g. if a component has a specific theme specified, it will override the global theme option.

```html
<script setup>
  import { setOptions, localeDe } from '@mobiscroll/vue';

  // Specify options globally for all components
  setOptions({
    locale: localeDe,
    theme: 'ios',
    themeVariant: 'dark',
  });
</script>
```
