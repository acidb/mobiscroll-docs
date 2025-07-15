---
sidebar_position: 8
sidebar_label: Migrating from Bryntum to Mobiscroll
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
- Mobiscroll offers refined control over time ranges and timeline views.
- Bryntum provides more built-in view presets.

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
    selectedDate: '2017-01-01' // if you want to set the initial view to a specific date
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

### Mobiscroll Scheduler view:

You can customize the visible days and hours, as well as the time grid scale, using the `schedule` object under the `view` [option](/javascript/eventcalendar/scheduler#configuring-the-view). This allows you to define which days are shown (e.g., weekdays), set the visible time range (e.g., 8 AM to 6 PM), adjust the time scale (e.g., 30-minute intervals), and control the frequency of the labels (e.g., every 15 minutes).

```jsx
mobiscroll.eventcalendar('#container', {
    view: {
        schedule: {
            type: 'week'
        }
    },
    selectedDate: '2020-09-12' // if you want to set the initial view to a specific date
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

### Mobiscroll Timeline view – resource definition:

```jsx
resources: [
    { id: 'r1', name: 'Mike' },
    { id: 'r2', name: 'Linda' },
    // ...
]
```

As shown above, both Bryntum and Mobiscroll use similar structures for defining resources, typically including `id` and `name` [properties](javascript/eventcalendar/timeline#opt-resources). Like Bryntum, Mobiscroll also supports a wide range of additional properties, as demonstrated in [this example](https://demo.mobiscroll.com/javascript/timeline/resource-data-structure#).

For more complex use cases, consult the [Mobiscroll documentation](/javascript/eventcalendar/timeline#resources) for additional options and examples related to resource rendering and configuration.

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

## Feature migration

As a final step, let’s explore how core features from Bryntum can be replicated using Mobiscroll. While some capabilities are available out of the box in Bryntum, Mobiscroll often requires more explicit setup but offers comparable flexibility.

### Drag & Drop functionality

- Bryntum enables drag-and-drop operations by default with no extra configuration needed.
- In Mobiscroll, the D&D features must be enabled explicitly via configuration options.

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

This setup activates event creation, moving, resizing, and deletion in the Mobiscroll.

### Switching Views (Calendar/Scheduler/Agenda)

- Bryntum enables switching views by default with no extra configuration needed.
- Mobiscroll does not provide a built-in view switching UI. You need to implement a custom header with segmented controls to allow users to toggle between views like Calendar, Scheduler, and Agenda.

#### Bryntum:

```jsx
const calendar = new Calendar({
    appendTo   : 'container',
    date : new Date(2020, 9, 12),
    mode : 'week'
});
```

#### Mobiscroll:

In Mobiscroll, switching between views such as day/week/month requires implementing a custom header and event listeners:

```jsx
var calendar = mobiscroll.eventcalendar('#container', {

  view: {
    calendar: {
      labels: true,
    },
  },
  selectedDate: '2020-09-12' // if you want to set the initial view to a specific date
  
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

While Bryntum offers more built-in functionality with minimal setup, Mobiscroll provides flexibility that allows for tailored behavior through configuration and custom UI. With a bit of extra implementation, most features can be effectively mirrored when transitioning from Bryntum to Mobiscroll.

## Conclusion

Migrating from Bryntum Scheduler to Mobiscroll Scheduler involves rethinking certain configurations, especially around views, events, and feature toggles. While Bryntum comes with richer built-in functionality out of the box (like zooming, vertical timelines, and infinite scrolling), Mobiscroll shines in flexibility, responsive design, and easier timeline and calendar customizations.

The overall migration process includes:
- Adjusting initialization patterns
- Adapting view configurations
- Mapping resources and events to Mobiscroll’s structure
- Enabling features like drag-and-drop manually

With a clear understanding of both libraries’ capabilities and structures, you can migrate efficiently and take full advantage of Mobiscroll’s modern UI and feature-rich environment.