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
  { value: 'Draggable', level: 3, id: 'draggable'},
  { value: 'Draggable options', level: 3, id: 'draggable-options'},
  { value: 'Third party dragging support', level: 3, id: 'third-party-dragging-support'},
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

<h3 id="draggable-options">Draggable options</h3>

<div className="option-list">
  <DraggableOptions />
</div>

<h3 id="third-party-dragging-support">Third party dragging libraries</h3>

Mobiscroll comes with built-in support for two of the most popular third-party dragging libraries: [SortableJS](https://sortablejs.github.io/Sortable/) and [Dragula](https://bevacqua.github.io/dragula/). With the `sortableJsDraggable` and `dragulaDraggable` plugins, you can seamlessly drag items into the Eventcalendar with just a few lines of code.   

<h4 id="sortable-js">SortableJS:</h4>

Integration: call the `sortableJsDraggable` plugin’s `init()` method and pass the SortableJS instance along with the `options: MbscSortableJsDraggableOptions` object.
The options object can include the following properties: 
- `cloneSelector` - the selector of the SortableJS clone element, typically `'.sortable-drag'`
- `dragData` - *(el: HTMLElement) => MbscCalendarEvent | MbscResource* - function to build the resource or event object. Defaults to `data-drag-data` attribute on the element. 
- `type` - *'event' | 'resource'* - Creates an event or resource on the Eventcalendar. Defaults to `'event'`

```tsx
// TODO sortable js for react example - this works, but ...
import { Eventcalendar, sortableJsDraggable} from '@mobiscroll/react';
import { useEffect } from 'react';
import Sortable from 'sortablejs';

function App() {
  useEffect(() => {
    const sortableList = document.getElementById('sortable-list');
    const sortableInst = Sortable.create(sortableList, {
      animation: 150,
      forceFallback: true,
    });

    sortableJsDraggable.init(sortableInst, {
      cloneSelector: '.sortable-drag',
    });
  }, []);

  return <>
    <div className="mbsc-form-group-title">Sortable appointments</div>
      <div id="sortable-list">
        <div className="task" data-drag-data='{ "title": "Winfred Lesley - Teeth whitening", "start": "00:00", "end": "01:30" }'>
          <div>Winfred Lesley - Teeth whitening</div>
          <div>1.5 hours</div>
        </div>
        <div className="task" data-drag-data='{ "title": "Rosalin Delice - Crown and bridge", "start": "00:00", "end": "02:00" }'>
          <div>Rosalin Delice - Crown and bridge</div>
          <div>2 hours</div>
        </div>
      </div>
    </div>
    <Eventcalendar externalDrop={true} />
  </>
}
```

:::info
The SortableJS integration works only if fallback mode is used.  
The `cloneSelector` must be set in the `options: MbscSortableJsDraggableOptions` object.
:::

<h4 id="dragula">Dragula:</h4>

Integration: call the `dragulaDraggable` plugin’s `init()` method and pass the Dragula instance, optionally providing an `options: MbscDragulaDraggableOptions` object to customize the behavior.
The options object can include the following properties:
- `dragData` - *(el: HTMLElement) => MbscCalendarEvent | MbscResource* - function to build the resource or event object. Defaults to `data-drag-data` attribute on the element.
- `type` - *'event' | 'resource'* - Creates an event or resource on the Eventcalendar. Defaults to `'event'`

```tsx
// TODO dragula for react example
import dragula from 'dragula';
import { Eventcalendar, dragulaDraggable} from '@mobiscroll/react';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    var dragulaList = document.getElementById('dragula-list');
    var drake = dragula([dragulaList], {
      copy: true,
    });
    dragulaDraggable.init(drake);
  }, []);

  return <>
    <div className="mbsc-form-group-title">Sortable appointments</div>
      <div id="dragula-list">
        <div className="task" data-drag-data='{ "title": "Winfred Lesley - Teeth whitening", "start": "00:00", "end": "01:30" }'>
          <div>Winfred Lesley - Teeth whitening</div>
          <div>1.5 hours</div>
        </div>
        <div className="task" data-drag-data='{ "title": "Rosalin Delice - Crown and bridge", "start": "00:00", "end": "02:00" }'>
          <div>Rosalin Delice - Crown and bridge</div>
          <div>2 hours</div>
        </div>
      </div>
    </div>
    <Eventcalendar externalDrop={true} />
  </>
}
```

:::info
When using the Dragula integration on touch devices, draggable items require the following CSS rule to ensure proper behavior:
`.task {
  touch-action: none;
}` 
This is a known limitation in Dragula’s touch support that has not been addressed yet.
:::


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