---
sidebar_position: 2
sidebar_label: Global options
displayed_sidebar: jquerySidebar
---

import SetOptionsDescription from '../../_shared/core-concepts/global_setoptions.mdx';

# Global options

<SetOptionsDescription />

```javascript
$(function() {
  // Specify options globally for all components
  mobiscroll.setOptions({
    locale: localeDe,
    theme: 'ios',
    themeVariant: 'dark',
  });

  $('#my-input').mobiscroll().datepicker({
    select: 'range',
  });
});
```

In the above example the datepicker will use the global options for the theme, locale and themeVariant.