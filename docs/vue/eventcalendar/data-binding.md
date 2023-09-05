---
sidebar_position: 6
sidebar_label: Data binding
displayed_sidebar: vueSidebar
---

# Data binding

The event calendar accepts an array of event objects through the [data option](api#opt-data) of the component. The event array can be either a local static array, or populated on demand with remote requests.

## Event data structure

The events of the eventcalendar are specified as an array of event objects. The event object supports the following properties:

- `id` _String, Number_ - A unique id for the event. If not specifed, the event will get a generated id.
- `start` _Date, String, Object_ - Specifies the start of the event.
- `end` _Date, String, Object_ - Specifies the end of the event.
- `title` _String_ - The title of the event.
- `color` _String_ - The color of the event.
- `allDay` _Boolean_ - Specifies if the event is all day or not.
- `editable` _Boolean_ - specify if an event is editable or not. Setting it to false disables drag & drop, resize and delete, and the event will have the `.mbsc-readonly-event` css class. With this class, the fixed events will be easily customizable, for example: add opacity or disable the cursor on the fixed events.
- `dragBetweenResources` _Boolean_ - specifies whether the event is movable across resources. It applies for [scheduler](scheduler) and [timeline](timeline) views. Has precedence over the `eventDragBetweenResources` property of the [resource](resources) and the [`dragBetweenResources` option](api#opt-dragBetweenResources).
- `dragInTime` _Boolean_ - specifies whether the event is movable in time. Has precedence over the `eventDragInTime` property of the [resource](resources) and the [`dragInTime` option](api#opt-dragInTime).
- `resize` _Boolean_ - specifies whether the event is resizable. Has precedence over the `eventResize` property of the [resource](resources) and the [`dragToResize` option](api#opt-dragToResize).
- `resource` _String, Number, Array_ - specify resource ids for the events. The event will display only in the specified [resource](resources) group. If there is no resource id defined the event will be displayed at every resource group.
- `slot` _String, Number_ - specify slot ids for the events. The event will display only in the specified [slot](api#opt-slots) group. If there is no slot id defined the event will be displayed at every slot group.
- `recurring` _String, Object_ - Recurrence rule for the event.
- `recurringException` _String, Object, Array_ - Represents the exceptions of a recurring event. Useful when specific dates need to be skipped from the rule.
- `recurringExceptionRule` _String, Object_ - Represents the exception rule of a recurring event. Useful when recurring dates need to be skipped from the rule.
- `timezone` _String_ - The timezone of the event. When specified, it takes precedence over [`dataTimezone`](api#opt-dataTimezone). A timezone plugin must be also passed to the component.
- `tooltip` _String_ - Specifies the tooltip text of the event.
- `cssClass` _String_ - Can be used to pass custom CSS classes on an event to event basis. Useful when customization is needed on the event level. For example: setting the width for specific events.

```javascript title="Simple event object"
const myMeeting = {
  start: "2023-07-14T08:00",
  end: "2023-07-14T09:00",
  title: "Meeting with Jenny",
};
```

:::info
The dates in the above structure can be specified as JavaScript Date objects, ISO 8601 strings, or moment objects.
:::

```javascript title="Using date object in event objects"
const myBirthday = {
  // highlight-next-line
  start: new Date(1988, 5, 28), // 1988 June 28th
  allDay: true,
  recurring: {
    repeat: "yearly",
  },
  title: "My Birthday",
};
```

The event objects may have additional custom properties as well. The custom properties are not used by the eventcalendar, but they are kept and will be available anywhere the event objects are used. E.g. the [`onEventClick` event](api#event-onEventClick) will receive the event object as argument, containing the custom properties as well.

```javascript title="Event object with custom properties"
const weeklyMeeting = {
  start: '2023-07-26T15:45',
  end: '2023-07-26T16:00',
  title: 'Daily summary',
  // highlight-start
  address: 'Main Street 64'
  videoUrl: 'https://myaddress.com/location',
  recipients: ['Jack', 'Sam', 'Teal`c']
  // highlight-end
}
```

## Recurring events

The `recurring`, `recurringException` and `recurringExceptionRule` properties of the event object are used to define events that happen again over time. Check out the [recurrence section](../core-concepts/recurrence) for a more comprehensive description on recurring rules.

## Local data

To bind local data to the event calendar, you can simply assign a JavaScript array of objects to the [data option](api#opt-data) of the component.

```html
<script setup>
  import { MbscEventcalendar } from "@mobiscroll/vue";

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
</script>

<template>
  <MbscEventcalendar :data="myData" />
</template>
```

## Remote data

You can load the data through an external request and assign it to the data option of the component.

```html
<script setup>
  import { ref, onMounted } from "vue";
  import { MbscEventcalendar, getJson } from "@mobiscroll/vue";

  const myEvents = ref([]);

  const myView = {
    calendar: { type: "month" },
    agenda: { type: "month" },
  };

  // highlight-start
  onMounted(() => {
    getJson(
      "https://trial.mobiscroll.com/events/?vers=5",
      (events) => {
        myEvents.value = events;
      },
      "jsonp"
    );
  });
  // highlight-end
</script>

<template>
  <MbscEventcalendar :view="myView" // highlight-next-line :data="myEvents" />
</template>
```

## On demand loading

Use the [`onPageLoading` event](api#event-onPageLoading) to load the data relevant to the currently active view. The event fires every time the date range of the view changes, for example when someone navigates the event calendar. Getting the events in real time as the user interacts with the UI improves load performance and always serves the most recent data.

:::tip
You can pass the view variables - like month and year - in the URL and handle the filtering inside the API implementation.
:::

```html
<script setup>
  import { ref } from 'vue'
  import { MbscEventcalendar, getJson } from '@mobiscroll/vue'

  const myEvents = ref([])

  const myView = {
    schedule: { type: 'day' }
  }
  // highlight-start
  function handlePageLoading(args) {
    const year = args.month.getFullYear()
    const month = args.month.getMonth()

    getJson(
      'https://trial.mobiscroll.com/weeklyevents/?year=' + year + '&month=' + month + '&day=' + day',
      (data) => {
        myEvents.value = data
      },
      'jsonp'
    )
  }
  // highlight-end
</script>

<template>
  <MbscEventcalendar :view="myView" :data="myEvents" // highlight-next-line
  @page-loading="handlePageLoading" />
</template>
```
