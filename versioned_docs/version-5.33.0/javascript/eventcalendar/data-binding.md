---
sidebar_position: 6
sidebar_label: Data binding
displayed_sidebar: javascriptSidebar
title: Data binding
---

import EventDataStructure from '../../_shared/eventcalendar/event-data-structure.mdx';
import { toc as dataTOC } from '../../_shared/eventcalendar/event-data-structure.mdx';

export const toc = [...dataTOC,
 { value: 'Local Data', level: 2, id: 'local-data'},
 { value: 'Remote Data', level: 2, id: 'remote-data'},
 { value: 'On demand loading', level: 2, id: 'on-demand-loading'}
];

<EventDataStructure />

<h2 id="local-data">Local data</h2>

To bind local data to the event calendar, you can simply assign a JavaScript array of objects to the [`data`](api#opt-data) option of the component.

```js
mobiscroll.eventcalendar('#myDiv', {
  data: [{
    id: "event_id1",
    start: "2023-07-09",
    end: "2023-07-13",
    title: "My First Event",
  },
  {
    id: "event_id2",
    start: "2023-08-01",
    end: "2023-08-03",
    title: "My Second Event",
  }],
});
```

<h2 id="remote-data">Remote data</h2>

You can load the data through an external request and use the [`setEvents`](./api#method-setEvents) method to update the eventcalendar with the newly received data.

```js
const inst = mobiscroll.eventcalendar('#myDiv', {
  view: {
    calendar: { type: "month" },
    agenda: { type: "month" },
  }
});

mobiscroll.getJson(
  "https://trial.mobiscroll.com/events/?vers=5",
  (events) => {
    inst.setEvents(events);
  },
  "jsonp"
);
```

<h2 id="on-demand-loading">On demand loading</h2>

Use the [`onPageLoading`](api#event-onPageLoading) event to load the data relevant to the currently active view. The event fires every time the date range of the view changes, for example when someone navigates the event calendar. Getting the events in real time as the user interacts with the UI improves load performance and always serves the most recent data.

:::tip
You can pass the view variables - like month and year - in the URL and handle the filtering inside the API implementation.
:::

```js
mobiscroll.eventcalendar('#myDiv', {
  view: {
    schedule: { type: 'day' }
  },
  onPageLoading: function(args, inst) {
    const year = args.month.getFullYear();
    const month = args.month.getMonth();
    const day = args.month.getDate();

    mobiscroll.getJson(
      'https://trial.mobiscroll.com/weeklyevents/?year=' + year + '&month=' + month + '&day=' + day,
      (data) => {
        inst.setEvents(data);
      },
      'jsonp'
    );
  }
});
```
