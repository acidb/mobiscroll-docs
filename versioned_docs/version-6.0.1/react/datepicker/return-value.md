---
sidebar_position: 3
sidebar_label: Return value
displayed_sidebar: reactSidebar
description: 'Datepicker return value formats in Mobiscroll React — date objects, ISO strings, and range output structures.'
---

import Content from '../../_shared/datepicker/return_value.mdx';

# Return value

<Content />

```jsx title="Passing Moment.js to the Datepicker"
import * as moment from 'moment';
import { Datepicker } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

function App() {
  return <>
    <Datepicker moment={moment} returnFormat="moment" />
  </>
}
```
