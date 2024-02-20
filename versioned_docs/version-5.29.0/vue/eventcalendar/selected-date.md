---
sidebar_position: 9
sidebar_label: Setting the initial view
displayed_sidebar: vueSidebar
---

# Setting the initial view

By default the initial view of the calendar displays the current date. Depending on the view type, this might be the current day, week, month or year. For views, where time is also displayed, the view will be scrolled to the current time as well.

To set the initial date of the event calendar use the [`selectedDate`](./api#opt-selectedDate) option to pass the date and the [`@selected-date-change`](./api#event-onSelectedDateChange) event to update the state when the date is changed from the calendar, e.g. using the navigation arrows.

```html
<script setup>
  import { ref } from "vue";
  import { MbscEventcalendar } from "@mobiscroll/vue";

  // highlight-next-line
  const myDate = ref(new Date(2020, 2, 18));

  // highlight-start
  function myDateChange(args) {
    myDate.value = args.date;
  }
  // highlight-end
</script>

<template>
  <MbscEventcalendar :selectedDate="myDate" @selected-date-change="myDateChange($event)" />
</template>
```

For views, where time is also displayed, the view will be scrolled to the specified time. If the time part is not explicitly specified, it defaults to the start of the day.

When multiple days, weeks, months or years are displayed, the position of the specified date on the view (first, second, third, etc. day/week/month/year) is determined by the [`refDate`](./api#opt-refDate) option.
