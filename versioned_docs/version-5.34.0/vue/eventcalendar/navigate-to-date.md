---
sidebar_position: 10
sidebar_label: Navigation
displayed_sidebar: vueSidebar
---

# Navigating to a date and time

You can navigate to another view programatically any time, by changing the [`selectedDate`](./api#opt-selectedDate) option.

This will navigate the calendar to the view containing the specified date. For views, where time is also displayed, the view will be scrolled to the specified time. If the time part is not explicitly specified, it defaults to the start of the day.

When multiple days, weeks, months or years are displayed, the position of the specified date on the view (first, second, third, etc. day/week/month/year) is determined by the [`refDate`](./api#opt-refDate) option.

```html
<script setup>
  import { ref } from "vue";
  import { MbscEventcalendar, MbscButton } from "@mobiscroll/vue";

  const myEvents = ref([...]);
  const myDate = ref(new Date(2020, 2, 18));

  function myDateChange(args) {
    myDate.value = args.date;
  }

  function setDate() {
    // Set a specific date
    myDate.value = new Date(2020, 3, 19);
  }
</script>

<template>
  <MbscEventcalendar :data="myEvents" :selectedDate="myDate" @selected-date-change="myDateChange($event)" />
  <MbscButton @click="setDate()">Set New Date</MbscButton>
</template>
```
