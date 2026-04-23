---
sidebar_position: 3
sidebar_label: Return value
displayed_sidebar: reactSidebar
---

import Content from '../../_shared/datepicker/return_value.mdx';

# Return value

<Content />

```jsx title="Passing Moment.js to the Datepicker"
import { Datepicker } from '@mobiscroll/react';
import * as moment from 'moment';

function App() {
  return <>
    <Datepicker moment={moment} returnFormat="moment" />
  </>
}
```
