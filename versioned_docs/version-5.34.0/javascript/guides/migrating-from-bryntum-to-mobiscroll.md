---
sidebar_position: 8
sidebar_label: Migrating from Bryntum
displayed_sidebar: javascriptSidebar
title: Migrating from Bryntum to Mobiscroll
toc_max_heading_level: 2
---

## Overview

This article provides a comprehensive guide for migrating your scheduling solution from Bryntum to Mobiscroll. It highlights the key differences between the two libraries and outlines step-by-step instructions, covering installation, configuration, resources, events, and features, ensuring a smooth and informed transition.

## Installation

Migrating from Bryntum to Mobiscroll starts with a different approach to installation, especially regarding package access and tooling.

### Mobiscroll installation steps:

Install the [Mobiscroll CLI](/javascript/getting-started/installation#install-the-cli) (only needed once):

```bash
npm install -g @mobiscroll/cli
```

[Configure Mobiscroll](/javascript/getting-started/installation#installing-from-npm) in your project (navigate to your project root folder and run):

```bash
mobiscroll config javascript
```

Alternatively, Mobiscroll also supports [manual installation](/javascript/getting-started/installation#installing-manually) if you’re not using NPM. However, using NPM is generally the recommended approach for simplicity and maintainability.

## Initialization

### Bryntum:

```jsx
const scheduler = new Scheduler({
    appendTo   : 'container',
    // ...
});
```

### Mobiscroll:

```jsx
mobiscroll.eventcalendar('#container', {
    // ...
});
```

## View configuration

Key Differences:
- With Mobiscroll, you get precise control over [time ranges](https://demo.mobiscroll.com/scheduler/show-hide-hours-days) on Scheduler and [Timeline](https://demo.mobiscroll.com/timeline/daily-weekly-monthly-yearly-timeline) views, plus feature-rich [Event Calendar](https://demo.mobiscroll.com/eventcalendar) and [Agenda](https://demo.mobiscroll.com/agenda) views for seamless scheduling.
- Bryntum provides built-in view presets.

### Bryntum Scheduler Pro:

For the Bryntum Scheduler, the time axis is configured using three settings: `startDate`, `endDate`, and `viewPreset`. The `startDate` and `endDate` define the overall date range visible on the axis, while the `viewPreset` controls its visual layout and determines which specific dates are displayed.

```jsx
const scheduler = new Scheduler({
    appendTo   : 'container',
    startDate  : new Date(2017, 0, 1, 6),
    endDate    : new Date(2017, 0, 1, 20),
    viewPreset : 'hourAndDay'
});
```

### Mobiscroll Timeline view:

In the Mobiscroll Timeline view, the `timeline` object within the `view` [option](/javascript/eventcalendar/timeline#configuring-the-view) allows you to customize the visible days and the timeline’s scale. You can specify which days to display (e.g., weekdays), set the time scale (e.g., 30-minute intervals), and define the frequency of the labels shown (e.g., every 15 minutes).

```jsx
mobiscroll.eventcalendar('#container', {
    view: {
        timeline: {
            type: 'day',
            size: 1,
            startTime: '06:00',
            endTime: '20:00',
        }
    },
    defaultSelectedDate: '2017-01-01' // if you want to set the initial view to a specific date
});
```

Check out how you can configure the Timeline view in [this live example](https://demo.mobiscroll.com/javascript/timeline/daily-weekly-monthly-yearly-timeline#).

### Bryntum Calendar view config:

In the Bryntum Calendar, the `date` option sets the initial date that the Calendar, its sidebar date picker, and the active view should center around upon initialization. The `mode` option determines which of the built-in views (such as day, week, or month) is active by default.

```jsx
const calendar = new Calendar({
    appendTo   : 'container',
    date : new Date(2020, 9, 12),
    mode : 'week'
});
```

### Mobiscroll Scheduler:

You can customize the visible days and hours, as well as the time grid scale, using the `schedule` object under the `view` [option](/javascript/eventcalendar/scheduler#configuring-the-view). This allows you to define which days are shown (e.g., weekdays), set the visible time range (e.g., 8 AM to 6 PM), adjust the time scale (e.g., 30-minute intervals), and control the frequency of the labels (e.g., every 15 minutes).

```jsx
mobiscroll.eventcalendar('#container', {
    view: {
        schedule: {
            type: 'week'
        }
    },
    defaultSelectedDate: '2020-09-12' // if you want to set the initial view to a specific date
});
```

Check out how you can configure the Scheduler view in [this live example](https://demo.mobiscroll.com/javascript/scheduler/show-hide-hours-days#).

## Resource configuration

Migrating resource data from Bryntum to Mobiscroll should be relatively straightforward.

### Bryntum Scheduler Pro – resource definition:

```jsx
resources: [
    { id: 'r1', name: 'Mike' },
    { id: 'r2', name: 'Linda' },
    // ...
]
```

### Mobiscroll Timeline view/ Scheduler – resource definition:

```jsx
resources: [
    { id: 'r1', name: 'Mike' },
    { id: 'r2', name: 'Linda' },
    // ...
]
```

As shown above, both Bryntum and Mobiscroll use similar structures for defining resources, typically including `id` and `name` [properties](javascript/eventcalendar/timeline#opt-resources). Like Bryntum, Mobiscroll also supports a wide range of additional properties, as demonstrated in [this example](https://demo.mobiscroll.com/javascript/timeline/resource-data-structure#).

For more advanced use cases, refer to the [Mobiscroll documentation](/javascript/eventcalendar/resources) for additional options, including [custom rendering and templating of resources](/javascript/eventcalendar/timeline#the-resource-their-header-and-footer). You can also explore our demo page for [detailed resource configuration](https://demo.mobiscroll.com/timeline/timeline-resource-details-side-panel-footer) examples.

## Event migration

As shown above, there are clear differences in how events are structured between Bryntum and Mobiscroll. Bryntum defines an event inside the `events` option using a `startDate`, along with a `duration` and `durationUnit` to determine the end time. In contrast, Mobiscroll uses the `data` [option](/javascript/eventcalendar/timeline#opt-data) and explicit `start` and `end` [properties](https://demo.mobiscroll.com/javascript/timeline/event-data-structure#) for defining the event period.

### Event structure comparison

#### Bryntum:

```jsx
events: [
    {
        id: 1,
        resourceId: 'r1',
        startDate: new Date(2017, 0, 1, 10),
        duration: 2,
        durationUnit: 'h',
        name: 'Click me'
    }
]
```

#### Mobiscroll:

```jsx
data: [
    {
        id: 1,
        resource: 'r1',
        start: '2017-01-01T10:00',
        end: '2017-01-01T12:00',
        title: 'Click me'
    }
]
```

### Converting Bryntum events to Mobiscroll format

Here’s a simple example of how to convert Bryntum-style events into the format used by Mobiscroll:

```jsx
const mobiscrollEvents = bryntumEvents.map(event => {
    const start = new Date(event.startDate);
    const end = new Date(start.getTime() + event.duration * 60 * 60 * 1000);

    return {
        id: event.id,
        title: event.name,
        start,
        end,
        resource: event.resourceId
    };
});
```

Every project may have its own unique data format and requirements, so this script serves only as a basic starting point. You’ll likely need to adapt your transformation logic to fit your application’s specific needs.

### Loading and saving data

When selecting a scheduling or calendar UI component, one of the most important factors to evaluate is how the component loads and saves data. The chosen approach can significantly influence performance, scalability, and integration complexity.

We will examine how each framework handles:
- Loading data from local or remote sources.
- Saving or synchronizing changes to a backend system.

### Loading data

Bryntum:
- Bryntum components use stores, structured data collections that manage entities such as resources, events, and project details.
- Data is typically loaded from remote REST endpoints (e.g., /load, /read-resources) that return JSON. These endpoints can support filtering and chunking to optimize handling of large datasets.
- Lazy loading (or paginated loading) is supported, allowing data to be fetched on demand as the user scrolls or navigates, minimizing initial load times and memory usage.
- The backend layer is fully decoupled, enabling the use of any technology stack (Node.js, PHP, Java, etc.) to deliver JSON payloads to the Bryntum frontend.

Mobiscroll:
- Mobiscroll components accept static arrays, which can be [inline](/javascript/eventcalendar/data-binding#local-data) (preloaded in memory) or [dynamically fetched](/javascript/eventcalendar/data-binding#remote-data) from remote APIs. 
- The `onPageLoading` [event](/javascript/eventcalendar/api#event-onPageLoading) plays a central role in incremental data loading, enabling applications to [request only the events needed](/javascript/eventcalendar/load-events-on-demand#) for the current view (e.g., the current month or week) as the user navigates.
- Mobiscroll also offers [integration with external calendar services](/javascript/eventcalendar/calendar-integrations/) ([Google Calendar](https://demo.mobiscroll.com/javascript/eventcalendar/sync-events-google-calendar#), [Outlook](https://demo.mobiscroll.com/javascript/eventcalendar/sync-events-outlook-calendar#)) via plugins, handling data retrieval and format conversion internally.

Let’s see an example for each case:

### Local data

#### Bryntum:

You can use the `events` option for passing the data inline.

```jsx
events: [
    {
        id: 1,
        resourceId: 'r1',
        startDate: new Date(2017, 0, 1, 10),
        duration: 2,
        durationUnit: 'h',
        name: 'Click me'
    }
]
```

#### Mobiscroll:

Pass the event array to the `data` [option](/javascript/eventcalendar/api#opt-data).

```jsx
data: [
    {
        id: 1,
        resource: 'r1',
        start: '2017-01-01T10:00',
        end: '2017-01-01T12:00',
        title: 'Click me'
    }
]
```

### Remote data

#### Bryntum

You can use a [class called](https://bryntum.com/products/scheduler/docs/guide/Scheduler/data/crud_manager) `CrudManager` or a project definition that solves the loading of the events from the backend.

```jsx
// With CRUD Manager
const crudManager = new CrudManager({
    autoLoad : true,
    loadUrl  : 'read.php',
    syncUrl  : 'save.php'
});

const scheduler = new Scheduler({
    // ... other configs
    crudManager : crudManager
});

// With project setup
const scheduler = new Scheduler({
    // ... other configs
    project : {
            autoLoad        : true,
            autoSync        : true,
            loadUrl         : 'read.php',
            syncUrl         : 'save.php',
    }
});
```

#### Mobiscroll

You can load the data through an external request and use the `setEvents` [method](/javascript/eventcalendar/api#method-setEvents) to update the event calendar with the newly received data.

In case of Mobiscroll, you can also use the `onPageLoading` [pevent](/javascript/eventcalendar/api#event-onPageLoading) to load the data (on demand) relevant to the currently active view. The event fires every time the date range of the view changes, for example, when someone navigates the event calendar. Getting the events in real time as the user interacts with the UI improves load performance and always serves the most recent data.

```jsx
mobiscroll.eventcalendar('#myDiv', {
  view: {
    schedule: { type: 'day' }
  },
  onPageLoading: function(args, inst) {
    const year = args.month.getFullYear();
    const month = args.month.getMonth();
    const day = args.month.getDate();

    mobiscroll.getJson(
      'https://example.remotedata.com/weeklyevents/?year=' + year + '&month=' + month + '&day=' + day,
      (data) => {
        inst.setEvents(data);
      },
      'jsonp'
    );
  }
});
```

In case of the timeline view, data can also be [loaded dynamically during scrolling](/javascript/eventcalendar/timeline#load-data-on-scroll). Scrolling vertically or horizontally triggers the `onVirtualLoading` [lifecycle event](/javascript/eventcalendar/data-binding#event-onVirtualLoading), which can be used to [load data incrementally during scrolling](https://demo.mobiscroll.com/timeline/load-resources-on-scroll).

### Saving data

#### Bryntum

- Bryntum provides a configurable `CrudManager` for orchestrating create, update, and delete operations, or developers can manually connect stores to custom endpoints.
- By enabling `autoSync: true` in the project configuration, local changes automatically trigger API requests to persist modifications without additional boilerplate.

Example:

```jsx
// With CRUD Manager
const crudManager = new CrudManager({
    syncUrl  : 'save.php'
});

const scheduler = new Scheduler({
    // ... other configs
    crudManager : crudManager
});

// With project setup
const scheduler = new Scheduler({
    // ... other configs
    project : {
            autoSync        : true,
            syncUrl         : 'save.php',
    }
});
```

#### Mobiscroll

- Persistence is managed by listening to Mobiscroll’s [CRUD lifecycle events](/javascript/eventcalendar/crud).
- To overwrite all events with a new set of data on the event calendar, you can use the `setEvents` [method](/javascript/eventcalendar/api#method-setEvents).
- The Event Calendar exposes a [variety of events](/javascript/eventcalendar/api#events) that are triggered on certain actions made on calendar events. These events can be used to send your data to your API or save it to persistent storage.

Example for saving, updating, and deleting an event through an API:

```jsx
mobiscroll.eventcalendar('#myDiv', {
    view: { schedule: { type: "week" } },
    data: [
      { id: 'id1' start: '2023-09-24', end: '2023-09-30', title: 'Short trip!'},
    ],

    onEventCreated: function (args, inst) {
      fetch('save.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify(args.event)
      });
    },
    
    onEventUpdated: function (args, inst) {
      fetch('update.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify(args.event)
      });
    },

    onEventDeleted: function (args, inst) {
      fetch('update.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify(args.event)
      });
    }
});
```

Mobiscroll offers a flexible, event-driven approach suitable for both lightweight client-side setups and API-driven applications. Developers are responsible for implementing their own persistence logic, allowing for high adaptability but requiring more manual integration effort.

Both libraries are capable of handling modern scheduling needs, but the choice depends largely on application scale, data complexity, and desired control over the persistence layer.

## Lifecycle events

Both libraries, Bryntum and Mobiscroll, provide a comprehensive set of lifecycle event hooks, enabling deep customization and integration with your application logic. These events are emitted at various stages of a component’s lifecycle, offering developers full control to inject custom behavior and extend default functionality.

Whether you’re looking to manipulate data before rendering, respond to user interactions, or perform cleanup tasks, Mobiscroll’s event system offers the flexibility to tailor components to your specific needs.

When migrating between Bryntum and Mobiscroll, it’s important to note that most lifecycle events follow similar patterns across both libraries. This alignment minimizes friction during the transition process and helps preserve custom behaviors with minimal adjustments.

One such example is how each library handles a double-click on a cell. Below is a comparison of the respective event handlers and their parameters.

### Bryntum

In Bryntum, the onCellDblClick event is triggered when a user double-clicks a grid cell. This event provides access to several key objects that describe the interaction and context:
- `event`: Object - The Bryntum event object
- `grid`: Grid - The grid instance
- `record`: Model - The record representing the row
- `column`: Column - The column to which the cell belongs
- `cellElement`: HTMLElement - The cell HTML element
- `target`: HTMLElement - The target element
- `event`: MouseEvent - The native DOM event

Example:

```jsx
const scheduler = new bryntum.scheduler.Scheduler({
    // ...other config...
    listeners: {
        cellDblClick({ date, resourceRecord, column }) {
            console.log('Cell double-clicked:', date, column);
            // Example: open editor for a new event
            // scheduler.editEventDialog.show({ startDate: date, resourceRecord });
        }
    }
});
```

### Mobiscroll

Mobiscroll components (e.g., Event Calendar, Scheduler, Timeline) expose a similar onCellDoubleClick event, which is fired when a cell is double-clicked. It includes contextual information that allows for granular control over the interaction:
- `args` - The event argument with the following properties:
  - `date`: Date - The date of the clicked cell.
  - `domEvent`: Event - The DOM event of the click.
  - `events`: Array - The events for the clicked date.
  - `resource`: string | number - The id of the resource where the cell was clicked, if resources are set.
  - `selected`: boolean - Specifies if the day is currently selected or not (before it was clicked).
  - `source`: 'calendar' | 'schedule' | 'timeline' - The view where the cell was clicked.
  - `target`: HTMLElement - The DOM element of the clicked cell.
- `inst` - The component instance.

Example:

```jsx
mobiscroll.eventcalendar('#my-calendar', {
    // ...other options...
     events,
    onCellDoubleClick: function (args, inst) {
        // args contains info about the clicked cell: date, resource, etc.
        console.log('Cell double-clicked:', args.date, args);
        // Example: open a new event creation dialog
        // showCreateEventDialog(args.date, args.resource);
    }
});
```

Although the naming conventions and parameter structures differ slightly between Bryntum and Mobiscroll, the overall event purpose and customization potential remain aligned. Developers familiar with Bryntum’s event model will find it straightforward to adapt similar functionality in Mobiscroll, ensuring a smooth migration path with minimal overhead.

To explore the full list of available Mobiscroll lifecycle events and understand how they can be leveraged, please refer to the [documentation](/javascript/eventcalendar/api#events).

Additionally, you can see these events in action through live, interactive examples for the following Mobiscroll components:
- [Event Calendar](https://demo.mobiscroll.com/javascript/eventcalendar/event-hooks)
- [Scheduler](https://demo.mobiscroll.com/javascript/scheduler/event-hooks)
- [Timeline](https://demo.mobiscroll.com/javascript/timeline/event-hooks)
- [Agenda](https://demo.mobiscroll.com/javascript/agenda/event-hooks)

These examples provide hands-on insights into how lifecycle events work in practice.

## Feature migration

As a final step, let’s explore how core features from Bryntum can be replicated using Mobiscroll. While some capabilities are available out of the box in Bryntum, Mobiscroll often requires more explicit setup but offers much more flexibility.

### Drag & Drop functionality

- Bryntum enables drag-and-drop operations by default with no extra configuration needed.
- In Mobiscroll, the D&D features must be enabled explicitly via [configuration options](/javascript/eventcalendar/drag-and-drop).

#### Enabling Drag & Drop in Mobiscroll:

```jsx
mobiscroll.eventcalendar('#container', {
    clickToCreate: true,
    dragToCreate: true,
    dragToMove: true,
    dragToResize: true,
    eventDelete: true
});
```

This configuration allows users to create, move, resize, and delete events in Mobiscroll.

### Switching Views (Calendar/Scheduler/Agenda)

- Bryntum enables switching views by default with no extra configuration needed.
- Mobiscroll doesn’t include a built-in view-switching UI by default. However, it offers greater flexibility by allowing you to implement a custom header where you can design the view-switching experience to fit your needs. For example, you can use a [dropdown menu](https://demo.mobiscroll.com/select) or [segmented controls](https://demo.mobiscroll.com/forms/segmented) to let users switch between views like Calendar, Scheduler, Agenda, or any other layout that fits your use case.

#### Bryntum:

```jsx
const calendar = new Calendar({
    appendTo   : 'container',
    date : new Date(2020, 9, 12),
    mode : 'week'
});
```

#### Mobiscroll:

In Mobiscroll, switching between views like Day, Week, or Month requires setting up a custom header along with event listeners to handle the view changes. You can see an example of this implementation [here](https://demo.mobiscroll.com/scheduler/switching-calendar-scheduler-agenda).

```jsx
var calendar = mobiscroll.eventcalendar('#container', {

  view: {
    calendar: {
      labels: true,
    },
  },
  defaultSelectedDate: '2020-09-12', // if you want to set the initial view to a specific date

  renderHeader: function () {
    return (
      '<div mbsc-calendar-nav class="cal-header-nav"></div>' +
      '<div class="cal-header-picker">' +
      '<label>Year<input mbsc-segmented type="radio" name="view" value="year" class="md-view-change"></label>' +
      '<label>Month<input mbsc-segmented type="radio" name="view" value="month" class="md-view-change" checked></label>' +
      '<label>Week<input mbsc-segmented type="radio" name="view" value="week" class="md-view-change"></label>' +
      '<label>Day<input mbsc-segmented type="radio" name="view" value="day" class="md-view-change"></label>' +
      '<label>Agenda<input mbsc-segmented type="radio" name="view" value="agenda" class="md-view-change"></label>' +
      '</div>' +
      '<div mbsc-calendar-prev class="cal-header-prev"></div>' +
      '<div mbsc-calendar-today class="cal-header-today"></div>' +
      '<div mbsc-calendar-next class="cal-header-next"></div>'
    );
  },
});

document.querySelectorAll('.md-view-change').forEach(function (elm) {
  elm.addEventListener('change', function (ev) {
    switch (ev.target.value) {
      case 'year':
        calendar.setOptions({
          view: {
            calendar: { type: 'year' },
          },
        });
        break;
      case 'month':
        calendar.setOptions({
          view: {
            calendar: {
              labels: true,
            },
          },
        });
        break;
      case 'week':
        calendar.setOptions({
          view: {
            schedule: { type: 'week' },
          },
        });
        break;
      case 'day':
        calendar.setOptions({
          view: {
            schedule: { type: 'day' },
          },
        });
        break;
      case 'agenda':
        calendar.setOptions({
          view: {
            calendar: { type: 'week' },
            agenda: { type: 'week' },
          },
        });
        break;
    }
  });

});
```

### Drag & Drop functionality

Handling time zones accurately is crucial in calendar and scheduling applications, especially when working across regions or coordinating international events. Both Bryntum and Mobiscroll offer support for working with time zones, though they approach it differently in terms of configuration and underlying technology. So, let’s see a simple example of how this scenario is handled in the case of Bryntum and Mobiscroll.

#### Bryntum

Bryntum provides built-in time zone support across all of its scheduling products. This allows you to configure components to operate in a specific time zone, independent of the browser or system time.

To enable time zone conversion in Bryntum, simply set the `timeZone` [configuration](https://bryntum.com/products/schedulerpro/docs/api/Scheduler/model/ProjectModel#config-timeZone) on the project object. You can use either:
- an IANA time zone identifier (e.g., 'Europe/Stockholm'), or
- a UTC offset in minutes (e.g., -120)

This configuration automatically adjusts the timeline headers, event/task start and end times, and all other time-based calculations to match the configured zone.

```jsx
new Scheduler({
    project : {
        // This will convert time to CET (UTC+1) or
        // CEST (UTC+2) depending on DST 
        timeZone : 'Europe/Stockholm'
    }
});
```

#### Mobiscroll

By default, Mobiscroll will not do any timezone conversion, will display the dates without modification, handling them as timezone-less. If your use case requires interpreting or displaying data in a different time zone, you can achieve this by using one of the supported third-party libraries for time zone conversion:
- [Moment-Timezone](/javascript/eventcalendar/timezones#the-moment-timezone-library)
- [Luxon](/javascript/eventcalendar/timezones#the-luxon-library)
- [Day.js](/javascript/eventcalendar/timezones#the-dayjs-library)

Mobiscroll exposes two configuration options to handle time zones:
- `dataTimezone` [option](/javascript/eventcalendar/api#opt-dataTimezone) – the time zone in which your event data is stored (e.g., 'utc')
- `displayTimezone` [option](/javascript/eventcalendar/api#opt-displayTimezone) – the time zone in which you want the data to be presented (e.g., 'Europe/Stockholm')

So, let’s say you want to use the Day.js timezone library. After [installing](/javascript/eventcalendar/timezones#the-dayjs-library) it into your project, you can pass the `dayjsTimezone` object to the Timeline’s `timezonePlugin` [option](/javascript/eventcalendar/api#opt-timezonePlugin):

```jsx
import { eventcalendar, dayjsTimezone } from '@mobiscroll/javascript';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjsTimezone.dayjs = dayjs;

eventcalendar('#myDiv', {
  timezonePlugin: dayjsTimezone,
  dataTimezone: "utc",
  displayTimezone: "Europe/Stockholm",
});
```

Also, feel free to explore live examples to see how time zones work in action:
- [Event Calendar](https://demo.mobiscroll.com/javascript/eventcalendar/setting-the-timezone#)
- [Scheduler](https://demo.mobiscroll.com/javascript/scheduler/setting-the-timezone#)
- [Timeline](https://demo.mobiscroll.com/javascript/timeline/setting-the-timezone#)
- [Agenda](https://demo.mobiscroll.com/javascript/agenda/setting-the-timezone#)

Or you can also check advanced demos such as:
- [switching timezones (on the fly) from the header](https://demo.mobiscroll.com/javascript/eventcalendar/multiple-timezone-support)
- [display time for multiple timezones](https://demo.mobiscroll.com/javascript/scheduler/show-multiple-timezones) 
- [create a meeting planner across multiple timezones](https://demo.mobiscroll.com/javascript/timeline/timezone-meeting-planner)

You can also store the timezone inside the event data, using the `timezone` [property](/javascript/eventcalendar/api#opt-data).

As a conclusion, both libraries, Bryntum and Mobiscroll, provide timezone support. Mobiscroll supports multiple timezone libraries ([Moment-Timezone](/javascript/eventcalendar/timezones#the-moment-timezone-library), [Luxon](/javascript/eventcalendar/timezones#the-luxon-library), and [Day.js](/javascript/eventcalendar/timezones#the-dayjs-library)), while Bryntum relies on JavaScript Date, which may introduce DST inconsistencies.

#### Conclusion

While Bryntum offers more built-in functionality out of the box, Mobiscroll provides greater flexibility, enabling tailored behavior through configuration and custom UI components:
- Feel free to explore our demo page for [Timeline](https://demo.mobiscroll.com/timeline), [Scheduler](https://demo.mobiscroll.com/scheduler), [Event Calendar](https://demo.mobiscroll.com/eventcalendar), and [Agenda](https://demo.mobiscroll.com/agenda) views - featuring grouped examples, including [common use cases](https://demo.mobiscroll.com/timeline/employee-shifts), [view configuration](https://demo.mobiscroll.com/scheduler/custom-range-view), [event](https://demo.mobiscroll.com/timeline/timeline-custom-event-rendering) and [resource](https://demo.mobiscroll.com/scheduler/custom-resource-header-template) templating, and [lifecycle event handling](https://demo.mobiscroll.com/timeline/event-hooks).
- We also offer comprehensive documentation for the [Timeline](/javascript/eventcalendar/timeline), [Scheduler](/javascript/eventcalendar/scheduler), [Event Calendar](/javascript/eventcalendar/calendar), and [Agenda](/javascript/eventcalendar/agenda) views. It covers [usage](/javascript/eventcalendar/timezones), [APIs](/javascript/eventcalendar/api), [customization options](/javascript/eventcalendar/templating), and more in detail.

In addition to drag & drop and custom view-switching, Mobiscroll also supports [timezone handling](https://demo.mobiscroll.com/scheduler/setting-the-timezone) and [zooming levels](https://demo.mobiscroll.com/timeline/calendar-zoom). All of our views work seamlessly across both [mobile](https://demo.mobiscroll.com/scheduler/mobile-day-view) and [desktop](https://demo.mobiscroll.com/scheduler/desktop-day-view) environments, with full support for touch interactions.

As mentioned above, with some additional setup, most —if not all— features can be effectively replicated when migrating from Bryntum to Mobiscroll.
If you have any specific questions or run into any issues, don’t hesitate to [reach out](https://mobiscroll.com#get-help) — we’re happy to help.

## Conclusion

Migrating from Bryntum Scheduler to Mobiscroll Scheduler involves rethinking certain configurations, especially around views, events, and feature toggles. While Bryntum comes with richer built-in functionality out of the box (like zooming, vertical timelines, and infinite scrolling), Mobiscroll shines in flexibility, responsive design, and easier timeline and calendar customizations.

The overall migration process includes:
- Adjusting initialization patterns
- Adapting view configurations
- Mapping resources and events to Mobiscroll’s structure
- Enabling features like drag-and-drop manually

With a clear understanding of both libraries’ capabilities and structures, you can migrate efficiently and take full advantage of Mobiscroll’s modern UI and feature-rich environment.

#### Considering migrating from Bryntum to Mobiscroll?

[Schedule a call](https://calendly.com/mobiscroll/30min) and let's chat about how we can help.
We're here to support you in the migration process.