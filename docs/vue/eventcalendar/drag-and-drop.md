---
sidebar_position: 9
sidebar_label: Drag & drop
displayed_sidebar: vueSidebar
title: Drag & drop
---

import DropcontainerEvents from '../_auto-generated/dropcontainer/events.md';

import Content from '../../_shared/eventcalendar/dnd-internal.mdx';
import { toc as intTOC } from '../../_shared/eventcalendar/dnd-internal.mdx';

export const toc = [...intTOC,
  { value: 'The Eventcalendar as source', level: 2, id: 'the-eventcalendar-as-source'},
  { value: 'Dropcontainer', level: 3, id: 'dropcontainer'},
  { value: 'Dropcontainer events', level: 3, id: 'dropcontainer-events'},
];

<Content />

<h3 id="draggable">Draggable</h3>

You can initialize the draggable containers by using the `<MbscDraggable />` component and reference the draggable container in the `element` option.

```html
<script setup>
  import { ref } from 'vue'
  import { MbscEventcalendar, MbscDraggable } from '@mobiscroll/vue'

  const dragEl = ref();
  const myData = {
    title: "My new 3h long event",
    start: new Date(2023, 10, 10, 12),
    end: new Date(2023, 10, 10, 15),
    color: "green",
  };
</script>

<template>
  <div ref="dragEl">
    <div>My Draggable event</div>
    <MbscDraggable :element="dragEl" :dragData="myData" />
  </div>

  <MbscEventcalendar :externalDrop="true" />
</template>
```

<h2 id="the-eventcalendar-as-source">The Eventcalendar as source</h2>

The [`externalDrag`](./api#opt-externalDrag) option enables events to be dragged out from the calendar/schedule/timeline views and dropped on another instance of the Eventcalendar or any [Dropcontainer](#dropcontainer).

When an event leaves the Eventcalendar the [`@event-drag-leave`](./api#event-onEventDragLeave) life-cycle event will be fired and a clone of the calendar event will be displayed for a better illustration of the movement. If the [`dragToMove`](./api#opt-dragToMove) option is not enabled the dragged event will instantly leave the calendar container and the [`@event-drag-leave`](./api#event-onEventDragLeave) event will fire and the event clone will be displayed. When an event enters the Eventcalendar the [`@event-drag-enter`](./api#event-onEventDragEnter) life-cycle event will be fired.


<h3 id="dropcontainer">Dropcontainer</h3>

The Dropcontainer defines a container where events can be dragged from or dropped to. The [`@item-drag-leave`](#event-onItemDragLeave) and [`@item-drag-enter`](#event-onItemDragEnter) life-cycle events can be used to track when an event exits or enters the Dropcontainer. When an item is dropped inside the container the [`@item-drop`](#event-onItemDrop) event is triggered. This can be useful for unscheduling work or appointments that were already scheduled.

```html
<script setup>
  import { ref } from 'vue'
  import { MbscEventcalendar, MbscDraggable, MbscDropcontainer } from '@mobiscroll/vue'

  const dragEls = ref([]);
  const dropContainerEl = ref();
  const unscheduledEvents = ref([
    {
        id: 1,
        title: "My new 3h long event",
        start: new Date(2023, 10, 10, 12),
        end: new Date(2023, 10, 10, 15),
        color: "green",
    },
  ]);

  function unscheduleEvent(dropEvent: any) {
    unscheduledEvents.value = [...unscheduledEvents.value, dropEvent.data];
  }
  function scheduleEvent(args: any) {
    unscheduledEvents.value = unscheduledEvents.value.filter((item) => item.id !== args.event.id);
  }
</script>

<template>
  <div ref="dropContainerEl">
    <MbscDropcontainer :element="dropContainerEl" @item-drop="unscheduleEvent">
      <div>Events:</div>
      <ul v-for="(ev, i) in unscheduledEvents" :key="i">
        <li ref="dragEls">
          <div>{{ ev.title }}</div>
          <MbscDraggable :dragData="ev" :element="dragEls[i]" />
        </li>
      </ul>
    </MbscDropcontainer>
  </div>

  <MbscEventcalendar :externalDrop="true" :externalDrag="true" :dragToCreate="true" :dragToMove="true" @event-create="scheduleEvent" />
</template>
```

<h3 id="dropcontainer-events">Dropcontainer events</h3>

<div className="option-list">

<DropcontainerEvents />

</div>