---
sidebar_position: 6
sidebar_label: Data binding
displayed_sidebar: reactSidebar
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

```jsx
import { Eventcalendar } from "@mobiscroll/react";

const myData = [
  {
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
  },
];

function App() {
  return <Eventcalendar data={myData} />
}
```

<h2 id="remote-data">Remote data</h2>

You can load the data through an external request and assign it to the data option of the component.

```jsx
import { useEffect, useState } from "react";
import { Eventcalendar, getJson } from "@mobiscroll/react";

const MYVIEW = {
  calendar: { type: "month" },
  agenda: { type: "month" },
};

function App() {
  const [events, setEvents] = useState([]); // store events in the state

  // after render get the event data
  useEffect(() => {
    getJson(
      "https://trial.mobiscroll.com/events/?vers=5",
      (events) => {
        setEvents(events); // put the returned events into the state
      },
      "jsonp"
    );
  });

  return <Eventcalendar view={MYVIEW} data={events} />
}
```

<h2 id="on-demand-loading">On demand loading</h2>

Use the [`onPageLoading`](api#event-onPageLoading) event to load the data relevant to the currently active view. The event fires every time the date range of the view changes, for example when someone navigates the event calendar. Getting the events in real time as the user interacts with the UI improves load performance and always serves the most recent data.

:::tip
You can pass the view variables - like month and year - in the URL and handle the filtering inside the API implementation.
:::

```jsx
import { useCallback, useState } from 'react'
import { Eventcalendar, getJson } from '@mobiscroll/vue'

const MY_VIEW = {
  schedule: { type: 'day' }
};

function App() {
  const [myEvents, setEvents] = useState([]);

  // highlight-start
  const myLoadPage = useCallback((args) => {
    const year = args.month.getFullYear();
    const month = args.month.getMonth();
    const day = args.month.getDate();

    getJson(
      'https://trial.mobiscroll.com/weeklyevents/?year=' + year + '&month=' + month + '&day=' + day,
      (data) => {
        setEvents(data);
      },
      'jsonp'
    )
  }, []);
  // highlight-end

  return <Eventcalendar data={myEvents} onPageLoading={myLoadPage} view={MY_VIEW} />
}
```

In case of the timeline view, data can also be [loaded dynamically during scrolling](timeline#load-data-on-scroll). Scrolling vertically or horizontally triggers the [onVirtualLoading](#event-onVirtualLoading) lifecycle event, which can be used to [load data incrementally during scrolling](https://demo.mobiscroll.com/timeline/load-resources-on-scroll#).