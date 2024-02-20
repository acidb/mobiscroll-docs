---
sidebar_position: 8
sidebar_label: CRUD
displayed_sidebar: reactSidebar
---

# CRUD

## Updating event properties

The Eventcalendar is bound to an array of event objects as described in the [data binding](data-binding) section. To update a single event with new event data, it's not enough to update the particular event object. A new event array reference is also needed otherwise the change won't be picked up by the eventcalendar.

```jsx title="Updating an event title"
import { useState } from 'react';
import { Eventcalendar, Button } from "@mobiscroll/react";

const MY_VIEW = {
  calendar: { type: "month" },
  agenda: { type: "month" },
};

function App() {
  const [myEvents, setMyEvents] = useState([
    { id: 'id1' start: '2023-09-24', end: '2023-09-30', title: 'Short trip!'},
    // highlight-next-line
    { id: 'id2' start: '2023-10-12', end: '2023-10-12', title: 'Birthday'},
    { id: 'id3' start: '2023-12-24', end: '2023-12-26', title: 'X-mas'},
  ]);

  const editEvent = () => {
    const eventID = 'id2';
    // highlight-start
    const myNewArray = [...myEvents];
    const index = myNewArray.findIndex((ev) => ev.id === eventID);
    myNewArray[index].title = 'My Birthday';
    setMyEvents(myNewArray);
    // highlight-end
  }

  return <>
    <Eventcalendar view={MY_VIEW} data={myEvents} />
    // highlight-next-line
    <Button onClick={editEvent}>Edit second event</Button>
  </>
}
```

The same concept can be used to add or delete a calendar event. Or to update any properties of an event with incoming data. Regardless where the data comes from (outside of the eventcalendar), be it an edit form or an external API.

## Working with servers

The Eventcalendar exposes a variety of [events](api#events) that are triggered on certain actions made on calendar events. These events can be used to send your data to your API or save it to a persistent storage.

### Event create

To enable the creation of events on the Eventcalendar you can use the [`dragToCreate`](api#opt-dragToCreate) and the [`clickToCreate`](api#opt-clickToCreate) options (desktop browsers only).

When an event is about to be created using click or drag on the Eventcalendar UI, the [`onEventCreate`](api#event-onEventCreate) event is fired. If not canceled by returning `false` a temporary event is created on the Eventcalendar followed by the [`onEventCreated`](api#event-onEventCreated). Any of these two events are passed the event properties that can be used to save the event to a persistent storage or to send it through an API.

```jsx title="Save a new event through an API"
import { useState } from "react";
import { Eventcalendar } from "@mobiscroll/react";
import axios from 'axios';

const MY_VIEW = {
  schedule: { type: "week" },
};

function App() {
  const [myEvents] = useState([]);
  // highlight-start
  const saveEvent = (args, inst) => {
    const eventToSave = args.event;
    // you can use whatever library you want instead of axios
    axios.post('/your-api', eventToSave);
  }
  // highlight-end

  return <Eventcalendar
    view={MY_VIEW}
    // highlight-next-line
    onEventCreate={saveEvent}
    data={myEvents}
  />
}
```

### Event update

Similar to [event creation](#event-create) above, to enable event editing you can use the [`dragToResize`](api#opt-dragToResize) and [`dragToMove`](api#opt-dragToMove) options.

When an event is about to be updated by dragging on the Eventcalendar UI, the [`onEventUpdate`](api#event-onEventUpdate) event is fired. If not canceled by returning `false` the calendar event is updated on the calendar. This update is followed by the [`onEventUpdated`](api#event-onEventUpdated). Any of these two events are passed the calendar event previous and new properties that can be used to save the event to a persistent storage or to send it through an API.

```jsx title="Send an updated event through an API"
import { useState } from "react";
import { Eventcalendar } from "@mobiscroll/react";
import axios from 'axios';

const MY_VIEW = {
  schedule: { type: "week" },
};

function App() {
  const [myEvents] = useState([
    { id: 'id1' start: '2023-09-24', end: '2023-09-30', title: 'Short trip!'},
  ]);

  // highlight-start
  const updateEvent = (args, inst) => {
    const updatedEvent = args.event;
    // you can use whatever library you want instead of axios
    axios.post('/your-api', updatedEvent);
  }
  // highlight-end

  return <Eventcalendar
    view={MY_VIEW}
    data={myEvents}
    // highlight-next-line
    onEventUpdated={updateEvent}
  />
}
```


:::info
When updating a recurring event from the UI (by dragging for example), the update won't affect all the occurences of the event. A single instance is updated from a set of occurences by adding an [exception to the rule](../core-concepts/recurrence#rule-exceptions) and creating another event with the changed properties.

Adding this exception to the rule is an update to the event, so the [`onEventUpdate`](./api#event-onEventUpdate) and [`onEventUpdated`](./api#event-onEventUpdated) will be fired as expected. There will also be an [`onEventCreate`](./api#event-onEventCreate) and [`onEventCreated](./api#event-onEventCreated) event fired for the changed occurence, that is not be part of the recurring set anymore.
:::

### Event delete

When an event is selected on the Eventcalendar, hitting the `Delete` or `Backspace` button will delete the event.

Just before the event is deleted, the [`onEventDelete`](./api#event-onEventDelete) event is fired. Returning `false` from the `onEventDelete` will prevent the delete from happening. If not prevented, there will be an [`onEventDeleted`](./api#event-onEventDeleted) event fired and the event will be removed from the Eventcalendar.

Either one of these events can be used to send the deletion through an API.

```jsx title="Notify a server of an event deletion"
import { useState } from "react";
import { Eventcalendar } from "@mobiscroll/react";
import axios from 'axios';

const MY_VIEW = {
  schedule: { type: "week" },
};

function App() {
  const [myEvents] = useState([
    { id: 'id1' start: '2023-09-24', end: '2023-09-30', title: 'Short trip!'},
  ]);

  // highlight-start
  const deleteEvent = (args, inst) => {
    const theEvent = args.event;
    // you can use whatever library you want instead of axios
    axios.post('/your-api', theEvent);
  }
  // highlight-end

  return <Eventcalendar
    view={MY_VIEW}
    data={myEvents}
    // highlight-next-line
    onEventDeleted={deleteEvent}
  />
}
```

:::caution
When deleting a recurring event, there will not be an [`onEventDelete`](./api#event-onEventDelete) nor an [`onEventDeleted`](./api#event-onEventDeleted) event fired because the event is not deleted actually. A single instance is deleted from a set of occurences by adding an [exception to the rule](../core-concepts/recurrence#rule-exceptions).

Adding this exception to the rule is an update to the event, so the [`onEventUpdate`](./api#event-onEventUpdate) and [`onEventUpdated`](./api#event-onEventUpdated) are fired instead of the delete.
:::
