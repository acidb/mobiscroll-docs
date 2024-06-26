---
sidebar_position: 4
sidebar_label: Recurrence
displayed_sidebar: javascriptSidebar
title: Recurrence
---

import Recurrence from '../../_shared/core-concepts/recurrence.mdx';
import { toc as recTOC } from '../../_shared/core-concepts/recurrence.mdx';

export const toc = [...recTOC, { value: 'Full example', level: 2, id: 'full-example'}];

<Recurrence />

<h2 id="full-example">Full example</h2>

```html
<div id="my-div"></div>
```

```javascript title="Recurring events on the eventcalendar"
mobiscroll.eventcalendar('#my-div', {
  data: [{
    start: new Date(2020, 2, 18, 9, 0),
    end: new Date(2020, 2, 18, 17, 0),
    title: 'Repeat every 2 days 5 times',
    recurring: {
        repeat: 'daily',
        count: 5,
        interval: 2
    }
  }, {
    start: new Date(2020, 2, 17, 20, 0),
    end: new Date(2020, 2, 17, 22, 0),
    title: 'Football training every Monday and Wednesday',
    recurring: 'FREQ=WEEKLY;UNTIL=2020-06-17;BYDAY=MO,WE'
  }, {
    title: 'Pay the bills - on every first Friday of the months',
    recurring: {
        repeat: 'monthly',
        pos: 1,
        weekDays: 'FR',
    }
  }],
});
```
