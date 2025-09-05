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
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MbscCalendarEvent, MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'component',
  templateUrl: './component.html',
  standalone: true,
  imports: [CommonModule, MbscModule]
})
export class AppComponent {
  public myData: MbscCalendarEvent[] = [{
      start: new Date(2020, 2, 18, 9, 0),
      end: new Date(2020, 2, 18, 17, 0),
      title: 'Repeat every 2 days 5 times',
      // highlight-start
      recurring: {
        repeat: 'daily',
          count: 5,
          interval: 2
      }
      // highlight-end
    }, {
      start: new Date(2020, 2, 17, 20, 0),
      end: new Date(2020, 2, 17, 22, 0),
      title: 'Football training every Monday and Wednesday',
      // highlight-next-line
      recurring: 'FREQ=WEEKLY;UNTIL=2020-06-17;BYDAY=MO,WE'
    }, {
      title: 'Pay the bills - on every first Friday of the months',
       // highlight-start
      recurring: {
        repeat: 'monthly',
          pos: 1,
          weekDays: 'FR',
      }
      // highlight-end
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
