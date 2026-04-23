---
sidebar_position: 10
sidebar_label: Migrating from FullCalendar
displayed_sidebar: angularSidebar
title: Migrating from FullCalendar to Mobiscroll
toc_max_heading_level: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

This article provides a comprehensive guide for migrating your scheduling solution from FullCalendar to Mobiscroll in Angular. It highlights the key differences between the two libraries and outlines step-by-step instructions, covering installation, configuration, resources, events, and features, ensuring a smooth and informed transition.

FullCalendar integrates with Angular through its official `<full-calendar>` component, while Mobiscroll provides native Angular components that plug directly into templates through standard bindings.

If you are currently using FullCalendar in Angular and planning to migrate to Mobiscroll’s Angular components, the following guide outlines the steps required for a smooth transition.

## Installation

Migrating from FullCalendar to Mobiscroll starts with a different approach to installation, especially regarding package access and tooling.

### Mobiscroll installation steps:

Install the [Mobiscroll CLI](/angular/getting-started/installation#install-the-cli) (only needed once):

```bash
npm install -g @mobiscroll/cli
```

[Configure Mobiscroll](/angular/getting-started/installation#installing-from-npm) in your project (navigate to your project root folder and run):

```bash
mobiscroll config angular
```

Alternatively, Mobiscroll also supports [manual installation](/angular/getting-started/installation#installing-manually) if you’re not using NPM. However, using NPM is generally the recommended approach for simplicity and maintainability.

## Initialization

### FullCalendar:

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<full-calendar [options]="calendarOptions"></full-calendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
  };
}
```

</TabItem>
</Tabs>

### Mobiscroll:

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<mbsc-eventcalendar></mbsc-eventcalendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { Component } from '@angular/core';
import { MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MbscModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
}
```

</TabItem>
</Tabs>

## View configuration

Key Differences:
- With Mobiscroll, you get precise control over time ranges on [Scheduler](https://demo.mobiscroll.com/scheduler/show-hide-hours-days) and [Timeline](https://demo.mobiscroll.com/timeline/daily-weekly-monthly-yearly-timeline) views, plus feature-rich [Event Calendar](https://demo.mobiscroll.com/eventcalendar) and [Agenda](https://demo.mobiscroll.com/agenda) views for seamless scheduling.
- FullCalendar uses plugins and view-specific options. Standard calendar layouts such as month, week, day, and list are available through separate packages, while timeline and resource-based scheduling require Premium plugins.

### FullCalendar Timeline view:

In FullCalendar, the Timeline view is configured through the [`initialView`](https://fullcalendar.io/docs/initialView), `slotMinTime`, and `slotMaxTime` options. Resource-based timeline scheduling also requires the `resourceTimelinePlugin` and a `resources` array.

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<full-calendar [options]="calendarOptions"></full-calendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  calendarOptions: CalendarOptions = {
    schedulerLicenseKey: 'YOUR_LICENSE_KEY',
    plugins: [resourceTimelinePlugin],
    initialView: 'resourceTimelineDay',
    initialDate: '2017-01-01',
    slotMinTime: '06:00:00',
    slotMaxTime: '20:00:00'
  };
}
```

</TabItem>
</Tabs>

### Mobiscroll Timeline view:

In the Mobiscroll Timeline view, the `timeline` object within the [`view`](/angular/eventcalendar/timeline#configuring-the-view) option allows you to customize the visible days and the timeline’s scale. You can specify which days to display (e.g., weekdays), set the time scale (e.g., 30-minute intervals), and define the frequency of the labels shown (e.g., every 15 minutes).

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<mbsc-eventcalendar
  [(selectedDate)]="mySelectedDate"
  [view]="myView"
></mbsc-eventcalendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { Component } from '@angular/core';
import { MbscDate, MbscEventcalendarView, MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MbscModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  myView: MbscEventcalendarView = {
    timeline: {
      type: 'day',
      size: 1,
      startTime: '06:00',
      endTime: '20:00',
    }
  };

  mySelectedDate: MbscDate = '2017-01-01'; // if you want to set the initial view to a specific date
}
```

</TabItem>
</Tabs>

Check out how you can configure the Timeline view in [this live example](https://demo.mobiscroll.com/timeline/daily-weekly-monthly-yearly-timeline#).

### FullCalendar TimeGrid view:

For a scheduler-style week layout in FullCalendar, the most common setup is `timeGridWeek` and this need to be specified with the [`initialView`](https://fullcalendar.io/docs/initialView). You choose the initial date with `initialDate`.

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<full-calendar [options]="calendarOptions"></full-calendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  calendarOptions: CalendarOptions = {
    plugins: [timeGridPlugin],
    initialView: 'timeGridWeek',
    initialDate: '2020-09-12'
  };
}
```

</TabItem>
</Tabs>

### Mobiscroll Scheduler:

You can customize the visible days and hours, as well as the time grid scale, using the `schedule` object under the [`view`](/angular/eventcalendar/scheduler#configuring-the-view) option. This allows you to define which days are shown (e.g., weekdays), set the visible time range (e.g., 8 AM to 6 PM), adjust the time scale (e.g., 30-minute intervals), and control the frequency of the labels (e.g., every 15 minutes).

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<mbsc-eventcalendar
  [(selectedDate)]="mySelectedDate"
  [view]="myView"
></mbsc-eventcalendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { Component } from '@angular/core';
import { MbscDate, MbscEventcalendarView, MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MbscModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  myView: MbscEventcalendarView = {
    schedule: {
      type: 'week'
    }
  };

  mySelectedDate: MbscDate = '2020-09-12'; // if you want to set the initial view to a specific date
}
```

</TabItem>
</Tabs>

Check out how you can configure the Scheduler view in [this live example](https://demo.mobiscroll.com/scheduler/show-hide-hours-days#).

## Resource configuration

Migrating resource data from FullCalendar to Mobiscroll should be relatively straightforward.

### FullCalendar - resource definition:

```js
myResources = [
  { id: 'r1', title: 'Mike' },
  { id: 'r2', title: 'Linda' },
  // ...
];
```

### Mobiscroll Timeline view/ Scheduler - resource definition:

```js
myResources: MbscResource[] = [
  { id: 'r1', name: 'Mike' },
  { id: 'r2', name: 'Linda' },
  // ...
];
```

Both FullCalendar and Mobiscroll use similar structures for defining resources, typically including an `id` and a label-like field. In FullCalendar this is usually `title`, while in Mobiscroll it is usually `name` in the [resources](/javascript/eventcalendar/timeline#opt-resources) array. Like FullCalendar's resource objects, Mobiscroll also supports a wide range of additional properties, as demonstrated in [this example](https://demo.mobiscroll.com/timeline/resource-data-structure#).

For more advanced use cases, refer to the [Mobiscroll documentation](/angular/eventcalendar/resources) for additional options, including [custom rendering and templating of resources](/angular/eventcalendar/timeline#the-resource-their-header-and-footer). You can also explore our demo page for [detailed resource configuration](https://demo.mobiscroll.com/timeline/timeline-resource-details-side-panel-footer) examples.

Compared to FullCalendar, Mobiscroll provides a more resource-focused user experience, including features such as fixed rows, reordering, and external drag-and-drop.

## Event migration

FullCalendar defines an event inside the [`events`](https://fullcalendar.io/docs/event-parsing) option using explicit `start` and `end` values, together with fields like `title`, `allDay`, and `extendedProps`. Mobiscroll uses the [`data`](/javascript/eventcalendar/timeline#opt-data) option and explicit `start` and `end` [properties](https://demo.mobiscroll.com/timeline/event-data-structure#) for defining the event period.

### Event structure comparison

#### FullCalendar:

```js
myEvents = [
  {
    id: '1',
    resourceId: 'r1',
    start: '2017-01-01T10:00:00',
    end: '2017-01-01T12:00:00',
    title: 'Click me'
  }
];
```

#### Mobiscroll:

```js
myEvents: MbscCalendarEvent[] = [
  {
    id: '1',
    resource: 'r1',
    start: '2017-01-01T10:00',
    end: '2017-01-01T12:00',
    title: 'Click me'
  }
];
```

### Converting FullCalendar events to Mobiscroll format

Here’s a simple example of how to convert FullCalendar-style events into the format used by Mobiscroll:

```ts
this.mobiscrollEvents = this.fullcalendarEvents.map(({ resourceId, ...event }) => ({
  ...event,
  resource: resourceId,
}));
```

Every project may have its own unique data format and requirements, so this script serves only as a basic starting point. You’ll likely need to adapt your transformation logic to fit your application’s specific needs.

### Loading and saving data

When selecting a scheduling or calendar UI component, one of the most important factors to evaluate is how the component loads and saves data. The chosen approach can significantly influence performance, scalability, and integration complexity.

We will examine how each framework handles:
- Loading data from local or remote sources.
- Saving or synchronizing changes to a backend system.

### Loading data

FullCalendar:
- FullCalendar accepts [local arrays](https://fullcalendar.io/docs/events-array) through the `events` option.
- It can also [load data from JSON](https://fullcalendar.io/docs/events-json-feed) feeds or from an `events` callback function, which receives the visible date range and lets you fetch only the events needed for the current view.
- If needed, you can refresh remote sources programmatically with `refetchEvents()`.

Mobiscroll:
- Mobiscroll components accept static arrays, which can be [inline](/angular/eventcalendar/data-binding#local-data) (preloaded in memory) or [dynamically fetched](/angular/eventcalendar/data-binding#remote-data) from remote APIs.
- The [`onPageLoading`](/angular/eventcalendar/api#event-onPageLoading) event plays a central role in incremental data loading, enabling applications to [request only the events needed](https://demo.mobiscroll.com/timeline/load-events-on-demand) for the current view (e.g., the current month or week) as the user navigates.
- Mobiscroll also offers [integration with external calendar services](/angular/eventcalendar/calendar-integrations/) ([Google Calendar](https://demo.mobiscroll.com/eventcalendar/sync-events-google-calendar#), [Outlook](https://demo.mobiscroll.com/eventcalendar/sync-events-outlook-calendar#)) via plugins, handling data retrieval and format conversion internally.

Let’s see an example for each case:

### Local data

#### FullCalendar:

You can pass the event data inline through the `events` option.

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<full-calendar [options]="calendarOptions"></full-calendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';

calendarOptions: CalendarOptions = {
  plugins: [timeGridPlugin],
  initialView: 'timeGridWeek',
  events: [
    {
      id: '1',
      resourceId: 'r1',
      start: '2017-01-01T10:00:00',
      end: '2017-01-01T12:00:00',
      title: 'Click me'
    }
  ]
};
```

</TabItem>
</Tabs>

#### Mobiscroll:

Pass the event array to the [`data`](/angular/eventcalendar/api#opt-data) option.

```html
<mbsc-eventcalendar [data]="myEvents"></mbsc-eventcalendar>
```

### Remote data

#### FullCalendar

FullCalendar can fetch remote data through an `events` function or by using a JSON feed URL. The callback receives the currently visible date range, which makes it suitable for loading only the events that belong to the active view.

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<full-calendar [options]="calendarOptions"></full-calendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';

calendarOptions: CalendarOptions = {
  plugins: [timeGridPlugin],
  initialView: 'timeGridWeek',
  events: (fetchInfo, successCallback, failureCallback) => {
    fetch(
      `/api/events?start=${fetchInfo.startStr}&end=${fetchInfo.endStr}`
    )
      .then((response) => response.json())
      .then((events) => successCallback(events))
      .catch((error) => failureCallback(error));
  }
};
```

</TabItem>
</Tabs>

#### Mobiscroll

You can load the data through an external request and assign it to the data-bound variable to update the event calendar with the newly received data.

In case of Mobiscroll, you can also use the [`onPageLoading`](/angular/eventcalendar/api#event-onPageLoading) event to load the data (on demand) relevant to the currently active view. The event fires every time the date range of the view changes, for example, when someone navigates the event calendar. Getting the events in real time as the user interacts with the UI improves load performance and always serves the most recent data.

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<mbsc-eventcalendar 
  [data]="myData" 
  [view]="myView" 
  (onPageLoading)="handlePageLoading($event)"
></mbsc-eventcalendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { MbscCalendarEvent, MbscEventcalendarView, MbscPageLoadingEvent, getJson } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  myView: MbscEventcalendarView = {
    schedule: { type: 'day' }
  };

  myData: MbscCalendarEvent[] = [];

  handlePageLoading(args: MbscPageLoadingEvent) {
    const year = args.month.getFullYear();
    const month = args.month.getMonth();
    const day = args.month.getDate();

    getJson(
      'https://example.remotedata.com/weeklyevents/?year=' + year + '&month=' + month + '&day=' + day,
      (events) => {
        this.myData = events;
      },
      'jsonp'
    );
  }
}
```

</TabItem>
</Tabs>

In case of the Timeline view, data can also be [loaded dynamically during scrolling](/angular/eventcalendar/timeline#load-data-on-scroll). Scrolling vertically or horizontally triggers the [`onVirtualLoading`](/angular/eventcalendar/api#event-onVirtualLoading) lifecycle event, which can be used to [load data incrementally during scrolling](https://demo.mobiscroll.com/timeline/load-resources-on-scroll).

### Saving data

#### FullCalendar

- Persistence in FullCalendar is typically implemented by listening to lifecycle callbacks and sending the relevant changes to your backend API.
- Typical hooks include [`eventAdd`](https://fullcalendar.io/docs/eventAdd), [`eventChange`](https://fullcalendar.io/docs/eventChange), and [`eventRemove`](https://fullcalendar.io/docs/eventRemove).
- This gives you full control over how changes are saved, but the data layer must be implemented by your application.

Example:

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<full-calendar [options]="calendarOptions"></full-calendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

calendarOptions: CalendarOptions = {
  plugins: [interactionPlugin, timeGridPlugin],
  initialView: 'timeGridWeek',
  editable: true,
  events: this.events,

  eventAdd: async ({ event }) => {
    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event.toPlainObject())
    });
  },

  eventChange: async ({ event }) => {
    await fetch(`/api/events/${event.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event.toPlainObject())
    });
  },

  eventRemove: async ({ event }) => {
    await fetch(`/api/events/${event.id}`, {
      method: 'DELETE'
    });
  }
};
```

</TabItem>
</Tabs>

#### Mobiscroll

- Persistence is managed by listening to Mobiscroll’s [CRUD lifecycle events](/angular/eventcalendar/crud).
- The Event Calendar exposes a [variety of events](/angular/eventcalendar/api#events) that are triggered on certain actions made on calendar events. These events can be used to send your data to your API or save it to persistent storage.

Example for saving, updating, and deleting an event through an API:

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<mbsc-eventcalendar 
  (onEventCreated)="saveEvent($event)"
  (onEventUpdated)="updateEvent($event)"
  (onEventDeleted)="deleteEvent($event)" 
  [data]="myEvents" 
  [view]="myView">
</mbsc-eventcalendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { MbscCalendarEvent, MbscEventcalendarView, MbscEventCreatedEvent, MbscEventUpdatedEvent, MbscEventDeletedEvent } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  myView: MbscEventcalendarView = {
    schedule: { type: 'week' },
  };

  myEvents: MbscCalendarEvent[] = [
    { id: 'id1', start: '2023-09-24', end: '2023-09-30', title: 'Short trip!' },
  ];

  saveEvent(args: MbscEventCreatedEvent) {
    fetch('add.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args.event)
    });
  }

  updateEvent(args: MbscEventUpdatedEvent) {
    fetch('update.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args.event)
    });
  }

  deleteEvent(args: MbscEventDeletedEvent) {
    fetch('delete.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args.event)
    });
  }
}
```

</TabItem>
</Tabs>

Mobiscroll offers a flexible, event-driven approach suitable for both lightweight client-side setups and API-driven applications. Developers are responsible for implementing their own persistence logic, allowing for high adaptability but requiring more manual integration effort.

Both libraries are capable of handling modern scheduling needs, but the choice depends largely on application scale, data complexity, and desired control over the persistence layer.

## Lifecycle events

Both libraries, FullCalendar and Mobiscroll, provide a comprehensive set of lifecycle event hooks, enabling deep customization and integration with your application logic. These events are emitted at various stages of a component’s lifecycle, offering developers full control to inject custom behavior and extend default functionality.

Whether you’re looking to manipulate data before rendering, respond to user interactions, or perform cleanup tasks, Mobiscroll’s event system offers the flexibility to tailor components to your specific needs.

When migrating between FullCalendar and Mobiscroll, it’s important to note that most lifecycle events follow similar patterns across both libraries. This alignment minimizes friction during the transition process and helps preserve custom behaviors with minimal adjustments.

One such example is how each library handles event updates. Below is a comparison of the respective event handlers and their parameters.

### FullCalendar

In FullCalendar, the [`eventChange`](https://fullcalendar.io/docs/eventChange) callback is triggered after an event has been modified, for example after a drag, resize, or programmatic update. The callback provides access to the updated event, the previous version, related events, and a `revert` function.

Example:

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<full-calendar [options]="calendarOptions"></full-calendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

calendarOptions: CalendarOptions = {
  plugins: [interactionPlugin, timeGridPlugin],
  initialView: 'timeGridWeek',
  editable: true,
  events: this.events,
  eventChange: (changeInfo) => {
    console.log('Event changed:', changeInfo.event);
    // changeInfo.oldEvent contains the previous state
    // changeInfo.revert() can be used if saving fails
  }
};
```

</TabItem>
</Tabs>

### Mobiscroll

Mobiscroll components (e.g., Event Calendar, Scheduler, Timeline) expose a similar [`onEventUpdated`](/angular/eventcalendar/api#event-onEventUpdated) event, which is fired when an event is edited. It includes contextual information that allows for granular control over the interaction.

Example:

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<mbsc-eventcalendar
  [data]="myEvents"
  (onEventUpdated)="handleEventUpdated($event)"
></mbsc-eventcalendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { MbscCalendarEvent, MbscEventUpdatedEvent } from '@mobiscroll/angular';

@Component({...})
export class AppComponent {
  myEvents: MbscCalendarEvent[] = [];

  handleEventUpdated(args: MbscEventUpdatedEvent) {
    console.log('Event updated:', args.event);
  }
}
```

</TabItem>
</Tabs>

Although the naming conventions and parameter structures differ between FullCalendar and Mobiscroll, many common integration scenarios can be implemented in both libraries. During migration, each event handler should be validated separately to account for differences in payload structure, lifecycle timing, and supported behaviors

To explore the full list of available Mobiscroll lifecycle events and understand how they can be leveraged, please refer to the [documentation](/angular/eventcalendar/api#events).

Additionally, you can see these events in action through live, interactive examples for the following Mobiscroll components:
- [Event Calendar](https://demo.mobiscroll.com/eventcalendar/event-hooks)
- [Scheduler](https://demo.mobiscroll.com/scheduler/event-hooks)
- [Timeline](https://demo.mobiscroll.com/timeline/event-hooks)
- [Agenda](https://demo.mobiscroll.com/agenda/event-hooks)

These examples provide hands-on insights into how lifecycle events work in practice.

## Feature migration

As a final step, let’s explore how core features from FullCalendar can be replicated using Mobiscroll. While some capabilities are available out of the box in FullCalendar, Mobiscroll often requires more explicit setup but offers much more flexibility across touch and desktop interactions.

### Drag & Drop functionality

- In FullCalendar, drag-and-drop editing is enabled with `editable: true`. To [support](https://fullcalendar.io/docs/editable) date clicking, selection, and advanced interactions, the [`interaction` plugin](https://fullcalendar.io/docs/editable) is commonly added as well.
- In Mobiscroll, the D&D features must be enabled explicitly via [configuration options](/javascript/eventcalendar/drag-and-drop).

#### FullCalendar:

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<full-calendar [options]="calendarOptions"></full-calendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

calendarOptions: CalendarOptions = {
  plugins: [interactionPlugin, timeGridPlugin],
  initialView: 'timeGridWeek',
  editable: true,
  selectable: true
};
```

</TabItem>
</Tabs>

#### Mobiscroll:

```html
<mbsc-eventcalendar
  [clickToCreate]="true"
  [dragToCreate]="true"
  [dragToMove]="true"
  [dragToResize]="true"
  [eventDelete]="true">
</mbsc-eventcalendar>
```

This configuration allows users to create, move, resize, and delete events in Mobiscroll.

### Switching Views (Calendar/Scheduler/Agenda)

- FullCalendar includes a built-in header toolbar. You can switch between views by declaring them in [`headerToolbar`](https://fullcalendar.io/docs/headerToolbar). An object can be supplied with properties `start/center/end` or `left/center/right`. These properties contain strings with comma/space separated values. Values separated by a comma will be displayed adjacently. Values separated by a space will be displayed with a small gap in between.
- Mobiscroll doesn’t include a built-in view-switching UI by default. However, it offers greater flexibility by allowing you to implement a custom header where you can design the view-switching experience to fit your needs. For example, you can use a [dropdown menu](https://demo.mobiscroll.com/select) or [segmented controls](https://demo.mobiscroll.com/forms/segmented) to let users switch between views like Calendar, Scheduler, Agenda, or any other layout that fits your use case.

#### FullCalendar:

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<full-calendar [options]="calendarOptions"></full-calendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

calendarOptions: CalendarOptions = {
  plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
  initialView: 'timeGridWeek',
  initialDate: '2020-09-12',
  headerToolbar: {
    left: 'title',
    center: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    right: 'prev,today,next'
  }
};
```

</TabItem>
</Tabs>

#### Mobiscroll:

In Mobiscroll, switching between views like Day, Week, or Month requires setting up a custom header along with event listeners to handle the view changes. You can see an example of this implementation [here](https://demo.mobiscroll.com/scheduler/switching-calendar-scheduler-agenda).

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<mbsc-eventcalendar [data]="myEvents" [view]="calView" [headerTemplate]="customTemplate">
  <ng-template #customTemplate>
    <mbsc-calendar-nav class="cal-header-nav"></mbsc-calendar-nav>
    <div class="cal-header-picker">
      <mbsc-segmented-group [(ngModel)]="view" (change)="changeView()">
        <mbsc-segmented value="month">Month</mbsc-segmented>
        <mbsc-segmented value="week">Week</mbsc-segmented>
        <mbsc-segmented value="day">Day</mbsc-segmented>
        <mbsc-segmented value="agenda">Agenda</mbsc-segmented>
      </mbsc-segmented-group>
    </div>
    <mbsc-calendar-prev class="cal-header-prev"></mbsc-calendar-prev>
    <mbsc-calendar-today class="cal-header-today"></mbsc-calendar-today>
    <mbsc-calendar-next class="cal-header-next"></mbsc-calendar-next>
  </ng-template>
</mbsc-eventcalendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MbscCalendarEvent, MbscEventcalendarView, MbscModule, setOptions } from '@mobiscroll/angular';

setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, MbscModule],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  myEvents: MbscCalendarEvent[] = [];
  view = 'month';
  calView: MbscEventcalendarView = {
    calendar: { labels: true },
  };

  ngOnInit(): void {
    this.http.jsonp<MbscCalendarEvent[]>('https://trial.mobiscroll.com/events/?vers=5', 'callback').subscribe((resp) => {
      this.myEvents = resp;
    });
  }

  changeView(): void {
    setTimeout(() => {
      switch (this.view) {
        case 'year':
          this.calView = {
            calendar: { type: 'year' },
          };
          break;
        case 'month':
          this.calView = {
            calendar: { labels: true },
          };
          break;
        case 'week':
          this.calView = {
            schedule: { type: 'week' },
          };
          break;
        case 'day':
          this.calView = {
            schedule: { type: 'day' },
          };
          break;
        case 'agenda':
          this.calView = {
            calendar: { type: 'week' },
            agenda: { type: 'week' },
          };
          break;
      }
    });
  }
}
```

</TabItem>
</Tabs>

### Timezones

Handling time zones correctly is essential in calendar and scheduling applications, especially when users work across multiple regions. Both FullCalendar and Mobiscroll support timezone-related workflows, but they do so through different configuration models and plugin integrations.

#### FullCalendar

FullCalendar supports `local`, `UTC`, and named time zones through the [`timeZone`](https://fullcalendar.io/docs/timeZone) option. Using `UTC` ensures consistent cross-browser display. Named time zones are also supported, but depending on the setup they may require a timezone implementation.

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<full-calendar [options]="calendarOptions"></full-calendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';

calendarOptions: CalendarOptions = {
  plugins: [timeGridPlugin, momentTimezonePlugin],
  initialView: 'timeGridWeek',
  timeZone: 'Europe/Stockholm',
  events: [
    {
      id: '1',
      title: 'Meeting',
      start: '2025-08-27T09:00:00Z',
      end: '2025-08-27T11:00:00Z'
    }
  ]
};
```

</TabItem>
</Tabs>

#### Mobiscroll

By default, Mobiscroll will not do any timezone conversion and will display the dates without modification, handling them as timezone-less. If your use case requires interpreting or displaying data in a different time zone, you can achieve this by using one of the supported third-party libraries for time zone conversion:
- [Moment-Timezone](/angular/eventcalendar/timezones#the-moment-timezone-library)
- [Luxon](/angular/eventcalendar/timezones#the-luxon-library)
- [Day.js](/angular/eventcalendar/timezones#the-dayjs-library)

Mobiscroll exposes two configuration options to handle time zones:
- `dataTimezone` [option](/angular/eventcalendar/api#opt-dataTimezone) - the time zone in which your event data is stored (e.g., 'utc')
- `displayTimezone` [option](/angular/eventcalendar/api#opt-displayTimezone) - the time zone in which you want the data to be presented (e.g., 'Europe/Stockholm')

So, let’s say you want to use the Day.js timezone library. After [installing](/angular/eventcalendar/timezones#the-dayjs-library) it into your project, you can pass the `dayjsTimezone` object to the Timeline’s [`timezonePlugin`](/angular/eventcalendar/api#opt-timezonePlugin) option:

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<mbsc-eventcalendar 
  [timezonePlugin]="myDayjsTimezone"
  dataTimezone="utc" 
  displayTimezone="Europe/Stockholm">
</mbsc-eventcalendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { dayjsTimezone, MbscTimezonePlugin } from '@mobiscroll/angular';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjsTimezone.dayjs = dayjs;

@Component({...})
export class MyComponent {
  myDayjsTimezone: MbscTimezonePlugin = dayjsTimezone;
}
```

</TabItem>
</Tabs>

Also, feel free to explore live examples to see how time zones work in action:
- [Event Calendar](https://demo.mobiscroll.com/eventcalendar/setting-the-timezone#)
- [Scheduler](https://demo.mobiscroll.com/scheduler/setting-the-timezone#)
- [Timeline](https://demo.mobiscroll.com/timeline/setting-the-timezone#)
- [Agenda](https://demo.mobiscroll.com/agenda/setting-the-timezone#)

Or you can also check advanced demos such as:
- [switching timezones (on the fly) from the header](https://demo.mobiscroll.com/eventcalendar/multiple-timezone-support)
- [display time for multiple timezones](https://demo.mobiscroll.com/scheduler/show-multiple-timezones)
- [create a meeting planner across multiple timezones](https://demo.mobiscroll.com/timeline/timezone-meeting-planner)

You can also store the timezone inside the event data, using the [`timezone`](/angular/eventcalendar/api#opt-data) property.

#### Conclusion

FullCalendar offers a familiar plugin-based API and built-in toolbar-based navigation, while Mobiscroll provides a more unified scheduling product line with highly configurable scheduler and timeline experiences:
- Feel free to explore our demo page for [Timeline](https://demo.mobiscroll.com/timeline), [Scheduler](https://demo.mobiscroll.com/scheduler), [Event Calendar](https://demo.mobiscroll.com/eventcalendar), and [Agenda](https://demo.mobiscroll.com/agenda) views - featuring grouped examples, including [common use cases](https://demo.mobiscroll.com/timeline/employee-shifts), [view configuration](https://demo.mobiscroll.com/scheduler/custom-range-view), [event](https://demo.mobiscroll.com/timeline/timeline-custom-event-rendering) and [resource](https://demo.mobiscroll.com/scheduler/custom-resource-header-template) templating, and [lifecycle event handling](https://demo.mobiscroll.com/timeline/event-hooks).
- We also offer comprehensive documentation for the [Timeline](/angular/eventcalendar/timeline), [Scheduler](/angular/eventcalendar/scheduler), [Event Calendar](/angular/eventcalendar/calendar), and [Agenda](/angular/eventcalendar/agenda) views. It covers [usage](/angular/eventcalendar/timezones), [APIs](/angular/eventcalendar/api), [customization options](/angular/eventcalendar/templating), and more in detail.

In addition to drag & drop and custom view-switching, Mobiscroll also supports [timezone handling](https://demo.mobiscroll.com/scheduler/setting-the-timezone) and [zooming levels](https://demo.mobiscroll.com/timeline/calendar-zoom). All of our views work seamlessly across both [mobile](https://demo.mobiscroll.com/scheduler/mobile-day-view) and [desktop](https://demo.mobiscroll.com/scheduler/desktop-day-view) environments, with full support for touch interactions.

As mentioned above, with some additional setup, most - if not all - features can be effectively replicated when migrating from FullCalendar to Mobiscroll.
If you have any specific questions or run into any issues, don’t hesitate to [reach out](https://mobiscroll.com#get-help) - we’re happy to help.

## Templating and renderers

### Event templating

#### FullCalendar

FullCalendar customizes event rendering through [event render hooks](https://fullcalendar.io/docs/event-render-hooks). The most commonly used option is `eventContent`, which allows custom content to be injected into the rendered event. In Angular projects, these rendering areas should be implemented according to the Angular wrapper's supported templating approach.

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<full-calendar [options]="calendarOptions"></full-calendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';

calendarOptions: CalendarOptions = {
  plugins: [timeGridPlugin],
  initialView: 'timeGridWeek',
  eventContent: (arg) => {
    return {
      html: `
        <div style="background:#a8d8ea; border-radius:4px; padding:4px;">
          <strong>${arg.event.title}</strong>
          <div style="font-size:12px; color:#444;">
            Location: ${arg.event.extendedProps['location'] || ''}
          </div>
        </div>
        `,
      };
    },
    events: [
      {
        id: '10',
        title: 'Custom Meeting',
        start: '2025-08-27T09:00:00',
        end: '2025-08-27T11:00:00',
        extendedProps: {
        location: 'Room 203',
      },
      },
    ],
};
```

</TabItem>
</Tabs>

#### Mobiscroll

You can customize many parts of the Event Calendar by writing custom templates. In the context of Angular these templates are `<ng-template>` blocks that can be passed to the appropriate Event Calendar template input.

When you want to customize how the events look, depending on what your goal is, you have two options:
- [Customize the event content](/angular/eventcalendar/templating#event-content-templating) - Mobiscroll takes care of rendering the events in the correct order and also prints basic fields, like `start`/`end`, whether it is an `allDay` event or not and also takes care of coloring the event appropriately. Everything else comes from the custom template.
- [Customize the full event](/angular/eventcalendar/templating#full-event-templating) - Mobiscroll takes care of rendering the events in the correct order, but everything else comes form the template you write.

To define a template, create an `<ng-template>` tag with a variable reference and pass it to the appropriate event calendar option:

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<mbsc-eventcalendar [scheduleEventTemplate]="myTemplate" [data]="myEvents">
  <ng-template #myTemplate let-event>
    <div style="background:#a8d8ea; border-radius:4px; padding:4px;">
      <strong>{{ event.title }}</strong>
      <div style="font-size:12px; color:#444;">Location: {{ event.location }}</div>
    </div>
  </ng-template>
</mbsc-eventcalendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { MbscCalendarEvent } from '@mobiscroll/angular';

@Component({...})
export class AppComponent {
  myEvents: MbscCalendarEvent[] = [
    {
      id: '10',
      title: 'Custom Meeting',
      start: '2025-08-27T09:00',
      end: '2025-08-27T11:00',
      location: 'Room 203'
    },
  ];
}
```

</TabItem>
</Tabs>

Feel free to explore live examples to see how event content templating works in action:
- [Event Calendar](https://demo.mobiscroll.com/eventcalendar/customize-label-look-and-feel#)
- [Scheduler](https://demo.mobiscroll.com/scheduler/customizing-events#)
- [Timeline](https://demo.mobiscroll.com/timeline/meal-planner#)
- [Agenda](https://demo.mobiscroll.com/agenda/event-content-customization#)

Feel free to explore live examples to see how full event templating works in action:
- [Event Calendar](https://demo.mobiscroll.com/eventcalendar/customize-event-popover#)
- [Scheduler](https://demo.mobiscroll.com/scheduler/customizing-events#)
- [Timeline](https://demo.mobiscroll.com/timeline/timeline-custom-event-rendering#)
- [Agenda](https://demo.mobiscroll.com/angular/agenda/customizing-calendar-header)

### Resource templating

#### FullCalendar

In FullCalendar, there are two common approaches for customizing the resource area:
- Use [`resourceAreaColumns`](https://fullcalendar.io/docs/resourceAreaColumns) to turn the resource sidebar into a grid with multiple columns.
- Use resource render hooks such as [`resourceLabelContent`](https://fullcalendar.io/docs/resource-render-hooks#label-hooks) for custom label rendering.

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<full-calendar [options]="calendarOptions"></full-calendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { CalendarOptions } from '@fullcalendar/core';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

calendarOptions: CalendarOptions = {
  schedulerLicenseKey: 'YOUR_LICENSE_KEY',
  plugins: [resourceTimelinePlugin],
  initialView: 'resourceTimelineDay',
  resourceAreaColumns: [
    { field: 'name', headerContent: 'Name' },
    { field: 'city', headerContent: 'City' }
  ],
  resources: [
    { id: '1', title: 'Adam', name: 'Adam', city: 'Washington' },
    { id: '2', title: 'Eva', name: 'Eva', city: 'New York' },
  ]
};
```

</TabItem>
</Tabs>

#### Mobiscroll

In the case of Mobiscroll, we take a different approach. We provide various templating options (listed below), which allow you to customize the resources.

#### Scheduler

Use the [`resourceTemplate`](/angular/eventcalendar/scheduler#template-resourceTemplate) option to customize the resource template of the Scheduler. Customize how the resource headers look and what they show. Utilize properties passed in the [resources](/angular/eventcalendar/scheduler#opt-resources) array.

Check out how you can style the resources in [this example](https://demo.mobiscroll.com/scheduler/custom-resource-header-template#).

#### Timeline

In case of the Timeline view there are three places where you can customize the resource column:
- Use the [`resourceTemplate`](/angular/eventcalendar/timeline#template-resourceTemplate) option to customize the resource template of the Timeline. Customize how the resource headers look and what they show. Utilize properties passed in the [resources](/angular/eventcalendar/timeline#opt-resources) array.
- Customize the empty cell content above the resource column with the [`resourceHeaderTemplate`](/angular/eventcalendar/timeline#template-resourceHeaderTemplate) option.
- Or if you want to customize the empty cell content below the resource column you can achieve this with the [`resourceFooterTemplate`](/angular/eventcalendar/timeline#template-resourceFooterTemplate) option. This element only renders for the Timeline view, if the [`dayFooterTemplate`](/angular/eventcalendar/timeline#template-dayFooterTemplate) option is present.

Check out how you can style these resource parts in [this example](https://demo.mobiscroll.com/timeline/timeline-resource-details-side-panel-footer#).

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<mbsc-eventcalendar
  [resources]="myResources"
  [resourceTemplate]="myResourceTemplate"
  [resourceHeaderTemplate]="myResourceHeaderTemplate"
>
  <ng-template #myResourceHeaderTemplate>
    <div class="my-resource-header">
      <strong>Name</strong>
    </div>
    <div class="my-resource-header">
      <i>City</i>
    </div>
  </ng-template>
  <ng-template #myResourceTemplate let-resource>
    <div class="my-resource-cell">
      <strong>{{ resource.name }}</strong>
    </div>
    <div class="my-resource-cell">
      <i>{{ resource.city }}</i>
    </div>
  </ng-template>
</mbsc-eventcalendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { MbscResource } from '@mobiscroll/angular';

@Component({...})
export class AppComponent {
  myResources: MbscResource[] = [
    { id: 1, name: 'Adam', city: 'Washington' },
    { id: 2, name: 'Eva', city: 'New York' },
  ];
}
```

</TabItem>
</Tabs>

### Header templating

#### FullCalendar

FullCalendar comes with a built-in toolbar system through `headerToolbar` and `customButtons`. You can reorder, hide, or extend the header, but unlike Mobiscroll, you do not fully template the entire header as markup.

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<full-calendar [options]="calendarOptions"></full-calendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

calendarOptions: CalendarOptions = {
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  customButtons: {
    myButton: {
      text: 'Today +',
      click: () => console.log('Custom button clicked')
    }
  },
  headerToolbar: {
    start: 'title',
    center: '',
    end: 'today prev,next myButton'
  }
};
```

</TabItem>
</Tabs>

#### Mobiscroll

The header of the Mobiscroll calendar can be fully customized to one's needs with the use of the [`headerTemplate`](/angular/eventcalendar/timeline#template-headerTemplate) option.

Here's the list of the built in components of the default header. You can initialize these by putting the attributes on the elements:
- `mbsc-calendar-prev` - Previous button component, that navigates to the previous month.
- `mbsc-calendar-next` - Next button component, that navigates to the next month.
- `mbsc-calendar-today` - Today button component, that navigates to the current date.
- `mbsc-calendar-nav` - The title navigation button component, that opens the year/month navigation.

The following example will render the prev and next buttons and a custom title.

```html
<mbsc-eventcalendar [headerTemplate]="header">
  <ng-template #header>
    <mbsc-calendar-prev></mbsc-calendar-prev>
    <mbsc-calendar-next></mbsc-calendar-next>
    <div class="my-custom-title">{{ myTitle }}</div>
  </ng-template>
</mbsc-eventcalendar>
```

Also, feel free to explore live examples to see how header templating works in action:
- [Event Calendar](https://demo.mobiscroll.com/eventcalendar/customizing-header#)
- [Scheduler](https://demo.mobiscroll.com/scheduler/customizing-header#)
- [Timeline](https://demo.mobiscroll.com/timeline/switching-day-week-work-week-timeline)
- [Agenda](https://demo.mobiscroll.com/agenda/customizing-calendar-header)

### Other templating/ renderer options

#### Event Calendar

- Date header templating - There are two approaches you can take:
  - Customize the date headers of the Event Calendar with the [`dayTemplate`](/angular/eventcalendar/calendar#template-dayTemplate) option by adding relevant content, labels or completely change how they look.
  - If you are looking to customize only the content and don't want to bother with the styling of the event, you can use the [`dayContentTemplate`](/angular/eventcalendar/calendar#template-dayContentTemplate) option.

#### Scheduler

- [Date header templating](/angular/eventcalendar/scheduler#the-date-header) - There are two approaches you can take:
  - Customize the date headers of the Scheduler with the [`dayTemplate`](/angular/eventcalendar/scheduler#template-dayTemplate) option by adding relevant content, labels or completely change how they look.
  - If you are looking to customize only the content and don't want to bother with the styling of the event, you can use the [`dayContentTemplate`](/angular/eventcalendar/scheduler#template-dayContentTemplate) option.

  Check out how you can style the date header in [this example](https://demo.mobiscroll.com/scheduler/date-header-template#).

#### Timeline

- [Templating the sidebar header and footer](/angular/eventcalendar/timeline#the-sidebar-their-header-and-footer) - Besides the resource template, an additional sidebar can be rendered on the opposite end of the row and there are three approaches you can take:
  - Use the [`sidebarTemplate`](/angular/eventcalendar/timeline#template-sidebarTemplate) option to render a custom sidebar on the right side of the Timeline.
  - Customize the empty cell content above the sidebar column with the [`sidebarHeaderTemplate`](/angular/eventcalendar/timeline#template-sidebarHeaderTemplate) option.
  - Or if you want to customize the empty cell content below the sidebar column you can achieve this with the [`sidebarFooterTemplate`](/angular/eventcalendar/timeline#template-sidebarFooterTemplate) option.

  Check out how you can style the sidebar parts in [this example](https://demo.mobiscroll.com/timeline/timeline-resource-details-side-panel-footer#).

- [Date header and footer templating](/angular/eventcalendar/timeline#the-date-header-and-footer) - The headers hold key information like the date, day of the week and in some cases it also holds the full date. Whenever you need to show extra information, or if you would like to change the styling or date format, time format you can use the various header templates, depending on the view configuration. You can also show a footer element, for displaying more information.

  Check out how you can style the date header and footer in [this example](https://demo.mobiscroll.com/timeline/hour-day-week-month-quarter-year-header-footer-template#).

- [Slots](/angular/eventcalendar/timeline#the-event-slots) - Use the [`slotTemplate`](/angular/eventcalendar/timeline#template-slotTemplate) option to customize the slot template of the Timeline view.

  Check out how you can style the slots in [this example](https://demo.mobiscroll.com/timeline/shift-template#).

- [Variable event height](/angular/eventcalendar/timeline#variable-event-height) - When using [event templating](/angular/eventcalendar/templating#event-templating), you might end up with various event heights, depending on the displayed content, e.g. larger description, list of tasks, etc. You can enable support for variable event heights by setting the `eventHeight: 'variable'` property for the timeline inside the [`view`](/angular/eventcalendar/timeline#view-timeline-eventHeight) option.

  Check out how you can set and style the variable event height in [this example](https://demo.mobiscroll.com/timeline/variable-event-height).

#### Agenda

- [Day header templating](/angular/eventcalendar/agenda#the-agenda-day-header) - Customize the day headers that appear on the agenda with the [`dayTemplate`](/angular/eventcalendar/agenda#template-dayTemplate) option.

  Check out how you can style the day headers in [this example](https://demo.mobiscroll.com/agenda/customizing-day-header#).

- [Empty state templating](/angular/eventcalendar/agenda#the-agenda-empty-state) - Customize the look of the empty state through [`agendaEmptyTemplate`](/angular/eventcalendar/agenda#template-agendaEmptyTemplate).

  Check out how you can style the empty state in [this example](https://demo.mobiscroll.com/agenda/empty-state#).

## Localization

### FullCalendar

FullCalendar supports localization through the `locale` option. These settings affect button text, month and weekday names, date formatting, week calculations, and the first day of the week.

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<full-calendar [options]="calendarOptions"></full-calendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import frLocale from '@fullcalendar/core/locales/fr';

calendarOptions: CalendarOptions = {
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  locale: frLocale
};
```

</TabItem>
</Tabs>

### Mobiscroll

Mobiscroll [enables localization](/angular/core-concepts/localization) by letting developers set language, date, and time formats both globally (across the entire application) and locally (on individual components). Highlights:
- Global settings object lets developers set locale, theme, and format across the app (first example).
- Each component (e.g., Date Picker, Event Calendar) supports locale switching and custom translations with simple configuration (second example).
- RTL and calendar system support (Gregorian, Jalali, Hijri)
- Quick override ability for localized formats ensures that adaptations can be made case-by-case or via global settings.

Example setting the locale option globally:

```ts
import { setOptions, localeFr } from '@mobiscroll/angular';

setOptions({
  // ...other config...
  locale: localeFr // French locale applied globally
});
```

Example setting the locale at the component level:

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<mbsc-eventcalendar [locale]="myLocale"></mbsc-eventcalendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { Component } from '@angular/core';
import { localeFr, MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [MbscModule]
})
export class AppComponent {
  myLocale = localeFr;
}
```

</TabItem>
</Tabs>

## Conclusion

For teams building customer-facing schedulers - whether for appointments, reservations, healthcare, or mobile apps - Mobiscroll offers a faster, more focused path to production. It combines a complete feature set with strong performance and specialized UX capabilities like fixed resources and multi-calendar support. Instead of combining multiple FullCalendar plugins and premium add-ons, you get a unified scheduling product line with native Angular components and responsive interactions out of the box.

The overall migration process includes:
- Adjusting initialization patterns
- Adapting view configurations
- Mapping resources and events to Mobiscroll’s structure
- Enabling features like drag-and-drop manually

With a clear understanding of both libraries’ capabilities and structures, you can migrate efficiently and take full advantage of Mobiscroll’s modern UI and feature-rich environment.

#### Considering migrating from FullCalendar to Mobiscroll?

[Schedule a call](https://calendly.com/mobiscroll/30min) and let's chat about how we can help.
We're here to support you in the migration process.