---
sidebar_position: 9
sidebar_label: Drag & drop
displayed_sidebar: reactSidebar
title: Drag & drop
---

import DropcontainerEvents from '../_auto-generated/dropcontainer/events.md';
import DraggableOptions from '../_auto-generated/draggable/options.md';

import Content from '../../_shared/eventcalendar/dnd-internal.mdx';
import { toc as intTOC } from '../../_shared/eventcalendar/dnd-internal.mdx';

export const toc = [...intTOC,
  { value: 'The Eventcalendar as source', level: 2, id: 'the-eventcalendar-as-source'},
  { value: 'Dropcontainer', level: 3, id: 'dropcontainer'},
  { value: 'Dropcontainer events', level: 3, id: 'dropcontainer-events'},
];

<Content />

<h3 id="draggable">Draggable</h3>

You can initialize the draggable containers by using the `<Draggable />` component and reference the draggable container in the `element` option.

```jsx
import { useState } from 'react';
import { Eventcalendar, Draggable } from '@mobiscroll/react';

function App() {
  const [dragEl, setDragEl] = useState(null);
  const myData = {
    title: "My new 3h long event",
    start: new Date(2023, 10, 10, 12),
    end: new Date(2023, 10, 10, 15),
    color: "green",
  };

  return <>
    <div ref={setDragEl}>
      <div>My Draggable event</div>
      <Draggable element={dragEl} dragData={myData} />
    </div>

    <Eventcalendar externalDrop={true} />
  </>
}
```

<div className="option-list">
  <DraggableOptions />
</div>

<h2 id="the-eventcalendar-as-source">The Eventcalendar as source</h2>

The [`externalDrag`](./api#opt-externalDrag) option enables events to be dragged out from the calendar/schedule/timeline views and dropped on another instance of the Eventcalendar or any [Dropcontainer](#dropcontainer).

When an event leaves the Eventcalendar the [`onEventDragLeave`](./api#event-onEventDragLeave) life-cycle event will be fired and a clone of the calendar event will be displayed for a better illustration of the movement. If the [`dragToMove`](./api#opt-dragToMove) option is not enabled the dragged event will instantly leave the calendar container and the [`onEventDragLeave`](./api#event-onEventDragLeave) event will fire and the event clone will be displayed. When an event enters the Eventcalendar the [`onEventDragEnter`](./api#event-onEventDragEnter) life-cycle event will be fired.


<h3 id="dropcontainer">Dropcontainer</h3>

The Dropcontainer defines a container where events can be dragged from or dropped to. The [`onItemDragLeave`](#event-onItemDragLeave) and [`onItemDragEnter`](#event-onItemDragEnter) life-cycle events can be used to track when an event exits or enters the Dropcontainer. When an item is dropped inside the container the [`onItemDrop`](#event-onItemDrop) event is triggered. This can be useful for unscheduling work or appointments that were already scheduled.
```jsx
import { setState } from 'react';
import { Draggable, Dropcontainer, Eventcalendar } from '@mobiscroll/react';

function MyTask({ event }) {
  const [draggableEl, setDraggableEl] = useState(null);
  return <li ref={setDraggableEl}>
    <div>{event.title}</div>
    <Draggable dragData={event} element={draggableEl} />
  </li>
}

function MySchedule() {
  const [dropcontainerEl, setDropcontainerEl] = useState(null);
  const [unscheduledEvents, setEvents] = useState<MbscCalendarEvent[]>([
    {
        id: 1,
        title: "My new 3h long event",
        start: new Date(2023, 10, 10, 12),
        end: new Date(2023, 10, 10, 15),
        color: "green",
    },
  ]);
  const unscheduleEvent = (dropEvent) => {
    setEvents([...unscheduledEvents, dropEvent.data]);
  }
  const scheduleEvent = (args) => {
    setEvents(unscheduledEvents.filter(item => item.id !== args.event.id));
  }
  return <>
    <div ref={setDropcontainerEl}>
      <Dropcontainer element={dropcontainerEl} onItemDrop={unscheduleEvent}>
        <div>Events:</div>
        {unscheduledEvents.map((event) => <MyTask key={event.id} event={event} />)}
      </Dropcontainer>
    </div>
    <Eventcalendar
      externalDrop={true}
      externalDrag={true}
      dragToCreate={true}
      dragToMove={true}
      onEventCreate={scheduleEvent}
    />
  </>
}
```
<h3 id="dropcontainer-events">Dropcontainer events</h3>

<div className="option-list">

<DropcontainerEvents />

</div>