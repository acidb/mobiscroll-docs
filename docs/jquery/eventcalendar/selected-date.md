---
sidebar_position: 9
sidebar_label: Setting the initial view
displayed_sidebar: jquerySidebar
description: 'Set the initially displayed date or date range when the Mobiscroll Eventcalendar mounts in jQuery using the `selectedDate` option.'
---

# Setting the initial view

By default the initial view of the calendar displays the current date. Depending on the view type, this might be the current day, week, month or year. For views, where time is also displayed, the view will be scrolled to the current time as well.

To change the initial view to another date, the [`selectedDate`](./api#opt-selectedDate) option can be used.

```js
import $ from 'jquery';
import * as mobiscroll from '@mobiscroll/jquery';
import '@mobiscroll/jquery/dist/css/mobiscroll.min.css';

$('#myDiv').mobiscroll().eventcalendar({
  data: [/*...*/],
  selectedDate: new Date(2020, 2, 18)
});
```

For views, where time is also displayed, the view will be scrolled to the specified time. If the time part is not explicitly specified, it defaults to the start of the day.

When multiple days, weeks, months or years are displayed, the position of the specified date on the view (first, second, third, etc. day/week/month/year) is determined by the [`refDate`](./api#opt-refDate) option.
