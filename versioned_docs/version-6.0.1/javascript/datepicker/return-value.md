---
sidebar_position: 3
sidebar_label: Return value
displayed_sidebar: javascriptSidebar
description: Datepicker return value formats in Mobiscroll JavaScript — date objects, ISO strings, and range output structures.
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
