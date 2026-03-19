---
sidebar_position: 9
sidebar_label: Setting the initial view
displayed_sidebar: angularSidebar
---

# Setting the initial view

By default the initial view of the calendar displays the current date. Depending on the view type, this might be the current day, week, month or year. For views, where time is also displayed, the view will be scrolled to the current time as well.

To change the initial view to another date, the [`selectedDate`](./api#opt-selectedDate) option can be used.

Use two-way binding on the property (using the "banana in the box" syntax), so that the bound value will be updated on calendar navigation, and changing the value programmatically will navigate the calendar to the given date and time.

```html
<mbsc-eventcalendar [(selectedDate)]="myDate"></mbsc-eventcalendar>
```
```ts
@Component({...})
export class AppComponent {
  myDate = new Date(2020, 2, 18);
}
```

For views, where time is also displayed, the view will be scrolled to the specified time. If the time part is not explicitly specified, it defaults to the start of the day.

When multiple days, weeks, months or years are displayed, the position of the specified date on the view (first, second, third, etc. day/week/month/year) is determined by the [`refDate`](./api#opt-refDate) option.
