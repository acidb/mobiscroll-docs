---
sidebar_position: 3
sidebar_label: Return value
displayed_sidebar: javascriptSidebar
---

import Content from '../../_shared/datepicker/return_value.mdx';

# Return value

<Content />

```js title="Passing Moment.js to the Datepicker"
import { datepicker } from '@mobiscroll/javascript';
import * as moment from 'moment';

datepicker('#myInput', {
  moment: moment,
  returnFormat: 'moment'
});
```
