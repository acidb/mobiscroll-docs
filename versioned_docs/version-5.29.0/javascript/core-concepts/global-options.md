---
sidebar_label: Global options
displayed_sidebar: javascriptSidebar
---

import SetOptionsDescription from '../../_shared/core-concepts/global_setoptions.mdx';

# Global options

<SetOptionsDescription />

```javascript
// Specify options globally for all components
mobiscroll.setOptions({
  locale: localeDe,
  theme: 'ios',
  themeVariant: 'dark',
});

mobiscroll.datepicker('#my-input', {
  select: 'range',
});
```

In the above example the datepicker will use the global options for the theme, locale and themeVariant.