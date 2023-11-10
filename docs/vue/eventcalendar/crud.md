---
sidebar_position: 8
sidebar_label: CRUD
displayed_sidebar: vueSidebar
---

# CRUD

## How to update an event property?

The Eventcalendar is bound to an array of event objects as described in the [data binding](data-binding) section. To update a single event with new event data, it's not enough to update the particular event object. A new event array reference is also needed otherwise the change won't be picked up by the eventcalendar.

```html title="Updating an event title"
<script setup>
  import { ref } from "vue";
  import { MbscEventcalendar, getJson } from "@mobiscroll/vue";

  const myEvents = ref([
    { id: 'id1' start: '2023-09-24', end: '2023-09-30', title: 'Short trip!'},
    // highlight-next-line
    { id: 'id2' start: '2023-10-12', end: '2023-10-12', title: 'Birthday'},
    { id: 'id3' start: '2023-12-24', end: '2023-12-26', title: 'X-mas'},
  ]);

  const myView = {
    calendar: { type: "month" },
    agenda: { type: "month" },
  };

  function editEvent(eventID) {
     // highlight-start
     const myNewArray = [...myEvents.value];
     const index = myNewArray.findIndex((ev) => ev.id === eventID);
     myNewArray[index].title = 'My Birthday';
     myEvents.value = myNewArray;
     // highlight-end
  }
</script>

<template>
  <MbscEventcalendar :view="myView" :data="myEvents" />
  // highlight-next-line
  <MbscButton @click="editEvent('id2')">Edit second event</MbscButton>
</template>
```

The same concept can be used to add or delete a calendar event. Or to update any properties of an event with incoming data. Regardless where the data comes from (outside of the eventcalendar), be it an edit form or an external API.

## How to modify events from the Eventcalendar UI?

The Eventcalendar exposes a variety of [events](api#events) that are triggered on certain actions made on calendar events. These events can be used to send your data to your API or save it to a persistent storage.

### Event creation

To enable the creation of events on the Eventcalendar you can use the [dragToCreate](api#opt-dragToCreate) and the [clickToCreate](api#opt-clickToCreate) options (desktop browsers only).

When an event is about to be created using click or drag on the Eventcalendar UI, the [@event-create](api#event-onEventCreate) event is fired. If not canceled by returning `false` a temporary event is created on the Eventcalendar followed by the [@event-created](api#event-onEventCreated). Any of these two events are passed the event properties that can be used to save the event to a persistent storage or to send it through an API.

```html title="Save a new event through an API"
<script setup>
  import { ref } from "vue";
  import { MbscEventcalendar } from "@mobiscroll/vue";
  import axios from 'axios';

  const myEvents = ref([]);

  const myView = {
    schedule: { type: "week" },
  };

  // highlight-start
  function saveEvent(args, inst) {
    const eventToSave = args.event;
    // you can use whatever library you want instead of axios
    axios.post('/your-api', eventToSave);
  }
  // highlight-end
</script>

<template>
  <MbscEventcalendar
    :view="myView"
    :data="myEvents"
    // highlight-next-line
    @event-create="saveEvent"
  />
</template>
```

### Event update

Similar to [event creation](#event-creation) above, to enable event editing you can use the [dragToResize](api#opt-dragToResize) and [dragToMove](api#opt-dragToMove) events.

When an event is about to be updated by dragging on the Eventcalendar UI, the [@event-update](api#event-onEventUpdate) event is fired. If not canceled by returning `false` the calendar event is updated on the calendar. This update is followed by the [@event-updated](api#event-onEventUpdated). Any of these two events are passed the calendar event previous and new properties that can be used to save the event to a persistent storage or to send it through an API.

```html title="Send an updated event through an API"
<script setup>
  import { ref } from "vue";
  import { MbscEventcalendar } from "@mobiscroll/vue";
  import axios from 'axios';

  const myEvents = ref([
    { id: 'id1' start: '2023-09-24', end: '2023-09-30', title: 'Short trip!'},
  ]);

  const myView = {
    schedule: { type: "week" },
  };

  // highlight-start
  function saveEvent(args, inst) {
    const updatedEvent = args.event;
    // you can use whatever library you want instead of axios
    axios.post('/your-api', updatedEvent);
  }
  // highlight-end
</script>

<template>
  <MbscEventcalendar
    :view="myView"
    :data="myEvents"
    // highlight-next-line
    @event-updated="saveEvent"
  />
</template>
```