---
sidebar_position: 3
sidebar_label: Return value
displayed_sidebar: jquerySidebar
description: 'Datepicker return value formats in Mobiscroll jQuery — date objects, ISO strings, and range output structures.'
---

import Content from '../../_shared/datepicker/return_value.mdx';

# Return value

<Content />

```js title="Passing Moment.js to the Datepicker"
import $ from 'jquery';
import * as moment from 'moment';
import * as mobiscroll from '@mobiscroll/jquery';
import '@mobiscroll/jquery/dist/css/mobiscroll.min.css';

$('#myInput').mobiscroll().datepicker({
  moment: moment,
  returnFormat: 'moment'
});
```
