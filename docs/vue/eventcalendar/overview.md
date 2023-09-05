---
sidebar_position: 1
sidebar_label: Overview
displayed_sidebar: vueSidebar
---

# Eventcalendar

The Eventcalendar component supports four highly configurable views: a calendar view, a scheduler with time grid, a timeline and an agenda view.

## Usage

The following example will create an event calendar with the default options.

```html
<script setup>
  import { MbscEventcalendar } from "@mobiscroll/vue";
</script>

<template>
  <MbscEventcalendar />
</template>
```

## Data binding

The event calendar accepts an array of event objects through the [data](./api#opt-data) option of the component.
The event array can be either a local static array, or populated on demand with remote requests.

### Local data

To bind local data to the event calendar, you can simply assign a JavaScript array of objects to the [data](./api#opt-data) option of the component.

```html
<script setup>
  import { ref } from "vue";
  import { MbscEventcalendar } from "@mobiscroll/vue";

  const myData = ref([
    {
      start: new Date(2020, 2, 18, 8, 0),
      end: new Date(2020, 2, 18, 17, 0),
      title: "My First Event",
    },
    {
      start: new Date(2020, 2, 18, 9, 0),
      end: new Date(2020, 2, 20, 13, 0),
      title: "My Second Event",
    },
  ]);
</script>

<template>
  <MbscEventcalendar :data="myData" />
</template>
```

### Remote data

You can load the data through a remote request and assign it to the [data](./api#opt-data) option of the component.

```html
<script setup>
  import { ref, onMounted } from "vue";
  import { MbscEventcalendar, getJson } from "@mobiscroll/vue";

  const myData = ref([]);

  onMounted(() => {
    getJson(
      "https://trial.mobiscroll.com/events/?vers=5",
      (events) => {
        myData.value = events;
      },
      "jsonp"
    );
  });
</script>

<template>
  <MbscEventcalendar :data="myData" />
</template>
```

### Load on demand

Use the [@page-loading](./api#event-onPageLoading) event to load the data for the currently active view.
The event fires every time the view changes, for example when someone navigates the event calendar.
Getting the events in real time as the user interacts with the UI improves load performance and always serves the most recent data.

You can pass the view variables - like month and year - in the URL and handle the filtering inside the API implmentation.

```html
<script setup>
  import { ref } from "vue";
  import { MbscEventcalendar, getJson } from "@mobiscroll/vue";

  const myData = ref([]);

  function handlePageLoading(args) {
    const year = args.month.getFullYear();
    const month = args.month.getMonth();
    const day = args.month.getDate();

    getJson(
      'https://trial.mobiscroll.com/weeklyevents/?year=' + year + '&month=' + month + '&day=' + day,
      (events) => {
        myData.value = events;
      },
      "jsonp"
    );
  }
</script>

<template>
  <MbscEventcalendar :data="myEvents" @page-loading="handlePageLoading" />
</template>
```
