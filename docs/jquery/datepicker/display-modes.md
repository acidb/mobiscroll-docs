---
sidebar_position: 6
sidebar_label: Display modes
displayed_sidebar: jquerySidebar
description: 'Control how the Mobiscroll Datepicker appears in jQuery — inline, floating popover, bottom sheet, or full-screen modal display modes.'
---

import Content from '../../_shared/display_modes.mdx';

# Display modes

<Content />

```js title="Setting a display option"
import $ from 'jquery';
import * as mobiscroll from '@mobiscroll/jquery';
import '@mobiscroll/jquery/dist/css/mobiscroll.min.css';

$('#myInput').mobiscroll().datepicker({
  display: 'anchored',
});
```
