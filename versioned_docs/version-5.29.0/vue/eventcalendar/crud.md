---
sidebar_position: 8
sidebar_label: CRUD
displayed_sidebar: vueSidebar
---

# CRUD

## Updating event properties

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

## Working with servers

The Eventcalendar exposes a variety of [events](api#events) that are triggered on certain actions made on calendar events. These events can be used to send your data to your API or save it to a persistent storage.

### Event create

To enable the creation of events on the Eventcalendar you can use the [`dragToCreate`](api#opt-dragToCreate) and the [`clickToCreate`](api#opt-clickToCreate) options (desktop browsers only).

When an event is about to be created using click or drag on the Eventcalendar UI, the [`@event-create`](api#event-onEventCreate) event is fired. If not canceled by returning `false` a temporary event is created on the Eventcalendar followed by the [`@event-created`](api#event-onEventCreated). Any of these two events are passed the event properties that can be used to save the event to a persistent storage or to send it through an API.

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

Similar to [event creation](#event-creation) above, to enable event editing you can use the [`dragToResize`](api#opt-dragToResize) and [`dragToMove`](api#opt-dragToMove) options.

When an event is about to be updated by dragging on the Eventcalendar UI, the [`@event-update`](api#event-onEventUpdate) event is fired. If not canceled by returning `false` the calendar event is updated on the calendar. This update is followed by the [`@event-updated`](api#event-onEventUpdated). Any of these two events are passed the calendar event previous and new properties that can be used to save the event to a persistent storage or to send it through an API.

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
  function updateEvent(args, inst) {
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
    @event-updated="updateEvent"
  />
</template>
```


:::info
When updating a recurring event from the UI (by dragging for example), the update won't affect all the occurences of the event. A single instance is updated from a set of occurences by adding an [exception to the rule](../core-concepts/recurrence#rule-exceptions) and creating another event with the changed properties.

Adding this exception to the rule is an update to the event, so the [`@event-update`](./api#event-onEventUpdate) and [`@event-updated`](./api#event-onEventUpdated) will be fired as expected. There will also be an [`@event-create`](./api#event-onEventCreate) and [`@event-created](./api#event-onEventCreated) event fired for the changed occurence, that is not be part of the recurring set anymore.
:::

### Event delete

When an event is selected on the Eventcalendar, hitting the `Delete` or `Backspace` button will delete the event.

Just before the event is deleted, the [`@event-delete`](./api#event-onEventDelete) event is fired. Returning `false` from the `@event-delete` will prevent the delete from happening. If not prevented, there will be an [`@event-deleted`](./api#event-onEventDeleted) event fired and the event will be removed from the Eventcalendar.

Either one of these events can be used to send the deletion through an API.

```html title="Notify a server of an event deletion"
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
  function deleteEvent(args, inst) {
    const theEvent = args.event;
    // you can use whatever library you want instead of axios
    axios.post('/your-api', theEvent);
  }
  // highlight-end
</script>

<template>
  <MbscEventcalendar
    :view="myView"
    :data="myEvents"
    // highlight-next-line
    @event-deleted="deleteEvent"
  />
</template>
```

:::caution
When deleting a recurring event, there will not be an [`@event-delete`](./api#event-onEventDelete) nor an [`@event-deleted`](./api#event-onEventDeleted) event fired because the event is not deleted actually. A single instance is deleted from a set of occurences by adding an [exception to the rule](../core-concepts/recurrence#rule-exceptions).

Adding this exception to the rule is an update to the event, so the [`@event-update`](./api#event-onEventUpdate) and [`@event-updated`](./api#event-onEventUpdated) are fired instead of the delete.
:::