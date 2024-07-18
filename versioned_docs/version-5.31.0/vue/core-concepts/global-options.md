---
sidebar_position: 2
sidebar_label: Global options
displayed_sidebar: vueSidebar
---

import SetOptionsDescription from '../../_shared/core-concepts/global_setoptions.mdx';

# Global options

<SetOptionsDescription />

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
