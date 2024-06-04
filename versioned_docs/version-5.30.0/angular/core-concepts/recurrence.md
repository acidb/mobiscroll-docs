---
sidebar_position: 4
sidebar_label: Recurrence
displayed_sidebar: angularSidebar
title: Recurrence
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import Recurrence from '../../_shared/core-concepts/recurrence.mdx';
import { toc as recTOC } from '../../_shared/core-concepts/recurrence.mdx';

export const toc = [...recTOC, { value: 'Full example', level: 2, id: 'full-example'}];

<Recurrence />

<h2 id="full-example">Full example</h2>

<Tabs>
<TabItem value="ts" label="component.ts">

```ts
@Component({
  selector: 'component',
  templateUrl: './component.html',
})
export class AppComponent {
  public myData: MbscCalendarEvent[] = [{
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
    }
  ];
}
```

</TabItem>
<TabItem value="html" label="component.html">

```html
<mbsc-eventcalendar [data]="myData"></mbsc-eventcalendar>
```

</TabItem>
</Tabs>
