---
sidebar_position: 10
sidebar_label: Navigation
displayed_sidebar: jquerySidebar
---

# Navigating to a date and time

You can navigate to another view programatically any time, using the [`navigate`](./api#method-navigate) method.

This will navigate the calendar to the view containing the specified date. For views, where time is also displayed, the view will be scrolled to the specified time. If the time part is not explicitly specified, it defaults to the start of the day.

When multiple days, weeks, months or years are displayed, the position of the specified date on the view (first, second, third, etc. day/week/month/year) is determined by the [`refDate`](./api#opt-refDate) option.

```js
$('#myDiv').mobiscroll().eventcalendar({
  data: [/*...*/],
  selectedDate: new Date(2020, 2, 18)
});

const inst = $('#myDiv').mobiscroll('getInst);

inst.navigate(new Date(2020, 3, 19));
```