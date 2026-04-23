---
sidebar_position: 8
sidebar_label: CRUD
displayed_sidebar: jquerySidebar
---

import HelperOptions from '../_auto-generated/utils/options.md';

# CRUD

## Updating event properties

The Eventcalendar is bound to an array of event objects as described in the [data binding](data-binding) section. To update a single event with new event data the [`updateEvent`](./api#method-updateEvent) method can be used.

```jsx title="Updating an event title"
const myEvents = [
  { id: 'id1' start: '2023-09-24', end: '2023-09-30', title: 'Short trip!'},
  // highlight-next-line
  { id: 'id2' start: '2023-10-12', end: '2023-10-12', title: 'Birthday'},
  { id: 'id3' start: '2023-12-24', end: '2023-12-26', title: 'X-mas'},
];

// intialize the eventcalendar
$('#myDiv').mobiscroll().eventcalendar({
  view: {
    calendar: { type: "month" },
    agenda: { type: "month" },
  },
  data: myEvents,
});

// get and update the event title property
const myEvent = myEvents.find((ev) => ev.id === 'id2');
myEvent.title = 'My Birthday';

// get the instance of the eventcalendar
const inst = $('#myDiv').mobiscroll('getInst');
// update the event on the eventcalendar
// highlight-next-line
inst.updateEvent(myEvent);
```

The same concept can be used to add or delete a calendar event or to update any properties of an event with incoming data, regardless where the data comes from (outside of the eventcalendar), be it an edit form or an external API.

To add an event to the eventcalendar you can use the [`addEvent`](./api#method-addEvent) method. To delete an event from the eventcalendar the [`removeEvent`](./api#method-removeEvent) method can be used. To overwrite all events with a new set of data on the eventcalendar you can use the [`setEvents`](./api#method-setEvents) method.

## Working with servers

The Eventcalendar exposes a variety of [events](api#events) that are triggered on certain actions made on calendar events. These events can be used to send your data to your API or save it to a persistent storage.

### Event create

To enable the creation of events on the Eventcalendar you can use the [`dragToCreate`](api#opt-dragToCreate) and the [`clickToCreate`](api#opt-clickToCreate) options (desktop browsers only).

When an event is about to be created using click or drag on the Eventcalendar UI, the [`onEventCreate`](api#event-onEventCreate) event is fired. If not canceled by returning `false` a temporary event is created on the Eventcalendar followed by the [`onEventCreated`](api#event-onEventCreated). Any of these two events are passed the event properties that can be used to save the event to a persistent storage or to send it through an API.

```js title="Save a new event through an API"
$('#myDiv').mobiscroll().eventcalendar({
    view: { schedule: { type: "week" } },
    // highlight-start
    onEventCreate: function (args, inst) {
      const eventToSave = args.event;
      $.post('/your-api', eventToSave);
    }
    // highlight-end
});
```

### Event update

Similar to [event creation](#event-create) above, to enable event editing you can use the [`dragToResize`](api#opt-dragToResize) and [`dragToMove`](api#opt-dragToMove) options.

When an event is about to be updated by dragging on the Eventcalendar UI, the [`onEventUpdate`](api#event-onEventUpdate) event is fired. If not canceled by returning `false` the calendar event is updated on the calendar. This update is followed by the [`onEventUpdated`](api#event-onEventUpdated). Any of these two events are passed the calendar event previous and new properties that can be used to save the event to a persistent storage or to send it through an API.

```js title="Send an updated event through an API"
$('#myDiv').mobiscroll().eventcalendar({
    view: { schedule: { type: "week" } },
    data: [
      { id: 'id1' start: '2023-09-24', end: '2023-09-30', title: 'Short trip!'},
    ],
    // highlight-start
    onEventUpdated: function (args, inst) {
      const updatedEvent = args.event;
      $.post('/your-api', updatedEvent);
    }
    // highlight-end
});
```

:::info
When updating a recurring event from the UI (by dragging for example), the update won't affect all the occurences of the event. A single instance is updated from a set of occurences by adding an [exception to the rule](../core-concepts/recurrence#rule-exceptions) and creating another event with the changed properties.

Adding this exception to the rule is an update to the event, so the [`onEventUpdate`](./api#event-onEventUpdate) and [`onEventUpdated`](./api#event-onEventUpdated) will be fired as expected. There will also be an [`onEventCreate`](./api#event-onEventCreate) and [`onEventCreated](./api#event-onEventCreated) event fired for the changed occurence, that is not be part of the recurring set anymore.
:::

In case you would like to edit a recurring event, you can use the `updateRecurringEvent` helper function:

<div className="option-list no-padding">

<HelperOptions />

</div>

### Event delete

When an event is selected on the Eventcalendar, hitting the `Delete` or `Backspace` button will delete the event.

Just before the event is deleted, the [`onEventDelete`](./api#event-onEventDelete) event is fired. Returning `false` from the `onEventDelete` will prevent the delete from happening. If not prevented, there will be an [`onEventDeleted`](./api#event-onEventDeleted) event fired and the event will be removed from the Eventcalendar.

Either one of these events can be used to send the deletion through an API.

```js title="Notify a server of an event deletion"
$('#myDiv').mobiscroll().eventcalendar({
    view: { schedule: { type: "week" } },
    data: [
      { id: 'id1' start: '2023-09-24', end: '2023-09-30', title: 'Short trip!'},
    ],
    // highlight-start
    onEventDeleted: function (args, inst) {
      const theEvent = args.event;
      $.post('/your-api', theEvent);
    }
    // highlight-end
});
```

:::caution
When deleting a recurring event, there will not be an [`onEventDelete`](./api#event-onEventDelete) nor an [`onEventDeleted`](./api#event-onEventDeleted) event fired because the event is not deleted actually. A single instance is deleted from a set of occurences by adding an [exception to the rule](../core-concepts/recurrence#rule-exceptions).

Adding this exception to the rule is an update to the event, so the [`onEventUpdate`](./api#event-onEventUpdate) and [`onEventUpdated`](./api#event-onEventUpdated) are fired instead of the delete.
:::
