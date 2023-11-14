---
sidebar_position: 9
sidebar_label: Drag & drop
displayed_sidebar: vueSidebar
---

# Drag & drop

Calendar events can be created, moved and resized on the Eventcalendar. Furthermore it is possible to drag and drop events from an external source or to drag and drop to an external target from the Eventcalendar. The following sections describe how these solutions can be implemented and used.

## Internal drag/resize/create

The events on the Eventcalendar can be moved and resized with mouse/touch interactions. The [`dragToMove`](./api#opt-dragToMove) and [`dragToResize`](./api#opt-dragToResize) options enable the events drag and drop and resize functionality. With the [`dragTimeStep`](./api#opt-dragTimeStep) option the minimum amount of drag/resize step can be specified in minutes.

With the [`dragToCreate`](./api#opt-dragToCreate) option enabled, events can be created by dragging on the empty areas of the Eventcalendar. On a desktop environment a new event can also be created with the [`clickToCreate`](./api#opt-clickToCreate) option.

To customize the newly created event use the [`extendDefaultEvent`](./api#opt-extendDefaultEvent) option.

<div className="pdg-img">
    <img src="https://docs.mobiscroll.com/Content/img/docs/drag-resize-create.gif" alt="Eventcalendar move/resize/create" />
    <label className="img-label">Eventcalendar move/resize/create</label>
</div>

## Targeting the Eventcalendar

There is a possibility to drag & drop any external element into your calendar.

In order to achieve this, first you need to grant permission to your calendar to accept this behavior. You can do that by setting the [`externalDrop`](./api#opt-externalDrop) option to `true`.

As a second step, you'll have to create your external draggable element and pass a skeleton event definition through the `dragData` option which will be added to the Eventcalendar on drop. If omitted, a default event will be created.

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

## The Eventcalendar as source

The [`externalDrag`](./api#opt-externalDrag) option enables events to be dragged out from the calendar/schedule/timeline views and dropped on another instance of the Eventcalendar or any [Dropcontainer](#dropcontainer).

When an event leaves the Eventcalendar the [`@event-drag-leave`](./api#event-onEventDragLeave) life-cycle event will be fired and a clone of the calendar event will be displayed for a better illustration of the movement. If the [`dragToMove`](./api#opt-dragToMove) option is not enabled the dragged event will instantly leave the calendar container and the [`@event-drag-leave`](./api#event-onEventDragLeave) event will fire and the event clone will be displayed. When an event enters the Eventcalendar the [`@event-drag-enter`](./api#event-onEventDragEnter) life-cycle event will be fired.

### Dropcontainer {#dropcontainer}

The Dropcontainer defines a container where events can be dragged from or dropped to. The `@item-drag-leave` and `@item-drag-enter` life-cycle events can be used to track when an event exits or enters the Dropcontainer. When an item is dropped inside the container the `@item-drop` event is triggered. This can be useful for unscheduling work or appointments that were already scheduled.

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
