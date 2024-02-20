---
sidebar_position: 10
sidebar_label: Navigation
displayed_sidebar: angularSidebar
---

# Navigating to a date and time

You can navigate to another view programatically any time, by changing the [`selectedDate`](./api#opt-selectedDate) option.

This will navigate the calendar to the view containing the specified date. For views, where time is also displayed, the view will be scrolled to the specified time. If the time part is not explicitly specified, it defaults to the start of the day.

When multiple days, weeks, months or years are displayed, the position of the specified date on the view (first, second, third, etc. day/week/month/year) is determined by the [`refDate`](./api#opt-refDate) option.

```html
<mbsc-eventcalendar [(selectedDate)]="myDate"></mbsc-eventcalendar>
<button (click)="setDate()">Set date</button>
```

```ts
@Component({...})
export class AppComponent {
  myDate = new Date(2020, 2, 18);

  setDate() {
    this.myDate = new Date(2020, 3, 19);
  }
}
```
