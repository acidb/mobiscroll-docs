---
sidebar_position: 3
sidebar_label: Return value
displayed_sidebar: jquerySidebar
---

import Content from '../../_shared/datepicker/return_value.mdx';

# Return value

<Content />

```js title="Passing Moment.js to the Datepicker"
import $ from 'jquery';
import * as moment from 'moment';

$('#myInput').mobiscroll().datepicker({
  moment: moment,
  returnFormat: 'moment'
});
```
