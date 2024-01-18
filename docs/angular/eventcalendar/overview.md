---
sidebar_position: 1
sidebar_label: Overview
displayed_sidebar: javascriptSidebar
---

# Eventcalendar

The Eventcalendar component supports four highly configurable views: a calendar view, a scheduler with time grid, a timeline and an agenda view.

## Usage

The following example will create an Eventcalendar with the default options.

```html
<mbsc-eventcalendar></mbsc-eventcalendar>
```

## Data binding

The Eventcalendar accepts an array of event objects through the [data](./api#opt-data) option of the component.
The event array can be either a local static array, or populated on demand with remote requests.

### Local data

To bind local data to the event calendar, you can simply assign a JavaScript array of objects to the [data](./api#opt-data) option of the component.

```html
<mbsc-eventcalendar [data]="myData"></mbsc-eventcalendar>
```

```ts
import { MbscCalendarEvent } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  myData: MbscCalendarEvent[] = [
    {
      start: new Date(2020, 2, 18, 8, 0),
      end: new Date(2020, 2, 18, 17, 0),
      title: "My First Event",
    },
    {
      start: new Date(2020, 2, 18, 9, 0),
      end: new Date(2020, 2, 20, 13, 0),
      title: "My Second Event",
    }
  ];
}
```

### Remote data

You can load the data through a remote request and assign it to the [data](./api#opt-data) option of the component.

```ts
import { MbscCalendarEvent, getJson } from '@mobiscroll/angular';

@Component({...})
export class MyComponent implements OnInit {
  myData: MbscCalendarEvent[] = [];

  ngOnInit() {
    getJson("https://trial.mobiscroll.com/events/?vers=5",
      (events) => {
        this.myData = events;
      },
      "jsonp"
    );
  }
}
```

### Load on demand

Use the [onPageLoading](./api#event-onPageLoading) event to load the data for the currently active view.
The event fires every time the view changes, for example when someone navigates the event calendar.
Getting the events in real time as the user interacts with the UI improves load performance and always serves the most recent data.

You can pass the view variables - like month and year - in the URL and handle the filtering inside the API implementation.

```html
<mbsc-eventcalendar [data]="myData" (onPageLoading)="handlePageLoading($event)"></mbsc-eventcalendar>
```

```ts
import { MbscCalendarEvent, getJson } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  myData: MbscCalendarEvent[] = [];

  handlePageLoading(args) {
    const year = args.month.getFullYear();
    const month = args.month.getMonth();
    const day = args.month.getDate();
    getJson('https://trial.mobiscroll.com/weeklyevents/?year=' + year + '&month=' + month + '&day=' + day,
      (events) => {
        args.inst.setEvents(events);
      },
      "jsonp"
    );
  }
}
```
