---
sidebar_position: 8
sidebar_label: Migrating from Bryntum
displayed_sidebar: angularSidebar
title: Migrating from Bryntum to Mobiscroll
toc_max_heading_level: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

This article provides a comprehensive guide for migrating your scheduling solution from Bryntum to Mobiscroll. It highlights the key differences between the two libraries and outlines step-by-step instructions, covering installation, configuration, resources, events, and features, ensuring a smooth and informed transition.

## Installation

Migrating from Bryntum to Mobiscroll starts with a different approach to installation, especially regarding package access and tooling.

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

### Bryntum:

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<bryntum-scheduler-pro></bryntum-scheduler-pro>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { Component } from '@angular/core';
import { BryntumSchedulerProModule } from '@bryntum/schedulerpro-angular';

@Component({
  selector: 'app-root',
  imports: [BryntumSchedulerProModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
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
- Bryntum provides built-in view presets.

### Bryntum Scheduler Pro:

For the Bryntum Scheduler, the time axis is configured using three settings: `startDate`, `endDate`, and `viewPreset`. The `startDate` and `endDate` define the overall date range visible on the axis, while the `viewPreset` controls its visual layout and determines which specific dates are displayed.

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<bryntum-scheduler-pro
  #schedulerpro
  [startDate]="schedulerProProps.startDate!"
  [endDate]="schedulerProProps.endDate!"
  [viewPreset]="schedulerProProps.viewPreset!"
></bryntum-scheduler-pro>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { Component } from '@angular/core';
import { BryntumSchedulerProModule, BryntumSchedulerProps } from '@bryntum/schedulerpro-angular';

const schedulerProProps: BryntumSchedulerProps = {
  startDate: new Date(2017, 0, 1, 6),
  endDate: new Date(2017, 0, 1, 20),
  viewPreset: 'hourAndDay',
};

@Component({
  selector: 'app-root',
  imports: [BryntumSchedulerProModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
xport class AppComponent {
  schedulerProProps = schedulerProProps;
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

Check out how you can configure the Timeline view in [this live example](https://demo.mobiscroll.com/timeline/daily-weekly-monthly-yearly-timeline#).

### Bryntum Calendar view config:

In the Bryntum Calendar, the `date` option sets the initial date that the Calendar, its sidebar date picker, and the active view should center around upon initialization. The `mode` option determines which of the built-in views (such as day, week, or month) is active by default.

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<bryntum-calendar
  #calendar
  [date]="calendarProps.date!"
  mode="week"
></bryntum-calendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { Component } from '@angular/core';
import {
  BryntumCalendarModule,
  BryntumCalendarProps,
} from '@bryntum/calendar-angular';

const calendarProps: BryntumCalendarProps = {
  date: new Date(2022, 0, 1),
};

@Component({
  selector: 'app-root',
  imports: [BryntumCalendarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  calendarProps = calendarProps;
}       
```

</TabItem>
</Tabs>

### Mobiscroll Scheduler:

You can customize the visible days and hours, as well as the time grid scale, using the `schedule` object under the [`view`](/angular/eventcalendar/scheduler#configuring-the-view) option. This allows you to define which days are shown (e.g., weekdays), set the visible time range (e.g., 8 AM to 6 PM), adjust the time scale (e.g., 30-minute intervals), and control the frequency of the labels (e.g., every 15 minutes).

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
  imports: [MbscModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  myView: MbscEventcalendarView = {
    scheduler: {
      type: 'week'
    }
  };
  
  mySelectedDate: MbscDate = '2022-01-01'; // if you want to set the initial view to a specific date
}        
```

</TabItem>
</Tabs>

Check out how you can configure the Scheduler view in [this live example](https://demo.mobiscroll.com/scheduler/show-hide-hours-days#).

## Resource configuration

Migrating resource data from Bryntum to Mobiscroll should be relatively straightforward.

### Bryntum Scheduler Pro – resource definition:

```ts
myResources = [
  { id: 'r1', name: 'Mike' },
  { id: 'r2', name: 'Linda' },
  // ...
];
```

### Mobiscroll Timeline view/ Scheduler – resource definition:

```ts
myResources: MbscResource[] = [
  { id: 'r1', name: 'Mike' },
  { id: 'r2', name: 'Linda' },
  // ...
];
```

As shown above, both Bryntum and Mobiscroll use similar structures for defining resources, typically including `id` and `name` [properties](/angular/eventcalendar/timeline#opt-resources). Like Bryntum, Mobiscroll also supports a wide range of additional properties, as demonstrated in [this example](https://demo.mobiscroll.com/timeline/resource-data-structure#).

For more advanced use cases, refer to the [Mobiscroll documentation](/angular/eventcalendar/resources) for additional options, including [custom rendering and templating of resources](/angular/eventcalendar/timeline#the-resource-their-header-and-footer). You can also explore our demo page for [detailed resource configuration](https://demo.mobiscroll.com/timeline/timeline-resource-details-side-panel-footer) examples.

## Event migration

As shown above, there are clear differences in how events are structured between Bryntum and Mobiscroll. Bryntum defines an event inside the `events` option using a `startDate`, along with a `duration` and `durationUnit` to determine the end time. In contrast, Mobiscroll uses the [`data`](/angular/eventcalendar/timeline#opt-data) option and explicit `start` and `end` [properties](https://demo.mobiscroll.com/timeline/event-data-structure#) for defining the event period.

### Event structure comparison

#### Bryntum:

```ts
myEvents = [
  {
      id: 1,
      resourceId: 'r1',
      startDate: new Date(2017, 0, 1, 10),
      duration: 2,
      durationUnit: 'h',
      name: 'Click me'
  }
];
```

#### Mobiscroll:

```ts
myEvents: MbscCalendarEvent[] = [
  {
      id: 1, 
      resource: 'r1',
      start: '2017-01-01T10:00',
      end: '2017-01-01T12:00',
      title: 'Click me'
  }
];
```

### Converting Bryntum events to Mobiscroll format

Here’s a simple example of how to convert Bryntum-style events into the format used by Mobiscroll:

```ts
this.mobiscrollEvents = this.bryntumEvents.map(event => {
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
- Mobiscroll components accept static arrays, which can be [inline](/angular/eventcalendar/data-binding#local-data) (preloaded in memory) or [dynamically fetched](/angular/eventcalendar/data-binding#remote-data) from remote APIs.
- The [`onPageLoading`](/angular/eventcalendar/api#event-onPageLoading) event plays a central role in incremental data loading, enabling applications to [request only the events needed](https://demo.mobiscroll.com/timeline/load-events-on-demand) for the current view (e.g., the current month or week) as the user navigates.
- Mobiscroll also offers [integration with external calendar services](/angular/eventcalendar/calendar-integrations/) ([Google Calendar](https://demo.mobiscroll.com/eventcalendar/sync-events-google-calendar#), [Outlook](https://demo.mobiscroll.com/eventcalendar/sync-events-outlook-calendar#)) via plugins, handling data retrieval and format conversion internally.

Let’s see an example for each case:

### Local data

#### Bryntum:

You can use the `events` option for passing the data inline.

```html
<bryntum-scheduler-pro [events]="myEvents"></bryntum-scheduler-pro>
```

#### Mobiscroll:

Pass the event array to the [`data`](/angular/eventcalendar/api#opt-data) option.

```html
<mbsc-eventcalendar [data]="myEvents"></mbsc-eventcalendar>
```

### Remote data

#### Bryntum

You can use a project definition that solves the loading of the events from the backend.

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<bryntum-scheduler-pro-project-model
  #project
  [autoLoad]="true"
  [autoSync]="true"
  loadUrl="read.php"
  syncUrl="save.php"
></bryntum-scheduler-pro-project-model>

<bryntum-scheduler-pro
  #schedulerpro
  [columns]="schedulerProProps.columns!"
  [startDate]="schedulerProProps.startDate!"
  [endDate]="schedulerProProps.endDate!"
  [viewPreset]="schedulerProProps.viewPreset!"
  [project]="project"
></bryntum-scheduler-pro>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { Component } from '@angular/core';
import { BryntumSchedulerProModule, BryntumSchedulerProps } from '@bryntum/schedulerpro-angular';

const schedulerProProps: BryntumSchedulerProps = {
  columns: [{ type: 'resourceInfo', width: 150 }],
  startDate: new Date(2017, 0, 1, 6),
  endDate: new Date(2017, 0, 1, 20),
  viewPreset: 'hourAndDay',
};

@Component({
  selector: 'app-root',
  imports: [BryntumSchedulerProModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  schedulerProProps = schedulerProProps;
}      
```

</TabItem>
</Tabs>

#### Mobiscroll

You can load the data through an external request and assign it to the data-bound variable to update the eventcalendar with the newly received data.

In case of Mobiscroll, you can also use the [`onPageLoading`](/angular/eventcalendar/api#event-onPageLoading) pevent to load the data (on demand) relevant to the currently active view. The event fires every time the date range of the view changes, for example, when someone navigates the event calendar. Getting the events in real time as the user interacts with the UI improves load performance and always serves the most recent data.

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
      "jsonp"
    );
  }
}   
```

</TabItem>
</Tabs>

In case of the timeline view, data can also be [loaded dynamically during scrolling](/angular/eventcalendar/timeline#load-data-on-scroll). Scrolling vertically or horizontally triggers the [`onVirtualLoading`](/angular/eventcalendar/api#event-onVirtualLoading) lifecycle event, which can be used to [load data incrementally during scrolling](https://demo.mobiscroll.com/timeline/load-resources-on-scroll).

### Saving data

#### Bryntum

- Developers can manually connect stores to custom endpoints.
- By enabling `autoSync: true` in the project configuration, local changes automatically trigger API requests to persist modifications without additional boilerplate.

Example:

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<bryntum-scheduler-pro-project-model
  #project
  [autoLoad]="true"
  [autoSync]="true"
  loadUrl="read.php"
  syncUrl="save.php"
></bryntum-scheduler-pro-project-model>

<bryntum-scheduler-pro
  #schedulerpro
  [columns]="schedulerProProps.columns!"
  [startDate]="schedulerProProps.startDate!"
  [endDate]="schedulerProProps.endDate!"
  [viewPreset]="schedulerProProps.viewPreset!"
  [project]="project"
></bryntum-scheduler-pro>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { Component } from '@angular/core';
import { BryntumSchedulerProModule, BryntumSchedulerProps } from '@bryntum/schedulerpro-angular';

const schedulerProProps: BryntumSchedulerProps = {
  columns: [{ type: 'resourceInfo', width: 150 }],
  startDate: new Date(2017, 0, 1, 6),
  endDate: new Date(2017, 0, 1, 20),
  viewPreset: 'hourAndDay',
};

@Component({
  selector: 'app-root',
  imports: [BryntumSchedulerProModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  schedulerProProps = schedulerProProps;
}      
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
    schedule: { type: "week" },
  };

  myEvents: MbscCalendarEvent[] = [
    { id: 'id1' start: '2023-09-24', end: '2023-09-30', title: 'Short trip!'},
  ];

  saveEvent(args: MbscEventCreatedEvent) {
    fetch('add.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args.event)
    });
  },
    
  updateEvent(args: MbscEventUpdatedEvent) {
    fetch('update.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args.event)
    });
  },

  deleteEvent(args: MbscEventDeletedEvent) {
    fetch('delete.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args.event)
    });
  }
});   
```

</TabItem>
</Tabs>

Mobiscroll offers a flexible, event-driven approach suitable for both lightweight client-side setups and API-driven applications. Developers are responsible for implementing their own persistence logic, allowing for high adaptability but requiring more manual integration effort.

Both libraries are capable of handling modern scheduling needs, but the choice depends largely on application scale, data complexity, and desired control over the persistence layer.

## Lifecycle events

Both libraries, Bryntum and Mobiscroll, provide a comprehensive set of lifecycle event hooks, enabling deep customization and integration with your application logic. These events are emitted at various stages of a component’s lifecycle, offering developers full control to inject custom behavior and extend default functionality.

Whether you’re looking to manipulate data before rendering, respond to user interactions, or perform cleanup tasks, Mobiscroll’s event system offers the flexibility to tailor components to your specific needs.

When migrating between Bryntum and Mobiscroll, it’s important to note that most lifecycle events follow similar patterns across both libraries. This alignment minimizes friction during the transition process and helps preserve custom behaviors with minimal adjustments.

One such example is how each library handles a double-click on a cell. Below is a comparison of the respective event handlers and their parameters.

### Bryntum

In Bryntum, the `onCellDblClick` event is triggered when a user double-clicks a grid cell. This event provides access to several key objects that describe the interaction and context:
- `event`: Object - The Bryntum event object
- `grid`: Grid - The grid instance
- `record`: Model - The record representing the row
- `column`: Column - The column to which the cell belongs
- `cellElement`: HTMLElement - The cell HTML element
- `target`: HTMLElement - The target element
- `event`: MouseEvent - The native DOM event

Example:

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<bryntum-scheduler-pro
  #schedulerpro
  (onCellDblClick)="handleCellDblClick($event)"
></bryntum-scheduler-pro>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
@Component({...});
export class AppComponent {
  // ...

  handleCellDblClick(event: { date: Date; resourceRecord: any }) {
    console.log('Cell double-clicked:', event.date, event.resourceRecord);
    // Example: open editor for a new event
    // this.schedulerpro.editEventDialog.show({ startDate: event.date, event.resourceRecord });
  }
}   
```

</TabItem>
</Tabs>

### Mobiscroll

Mobiscroll components (e.g., Event Calendar, Scheduler, Timeline) expose a similar [`onCellDoubleClick`](/angular/eventcalendar/api#event-onCellDoubleClick) event, which is fired when a cell is double-clicked. It includes contextual information that allows for granular control over the interaction:
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

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<mbsc-eventcalendar
  (onCellDoubleClick)="handleCellDblClick($event)"
></mbsc-eventcalendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
@Component({...});
export class AppComponent {
  // ...

  handleCellDblClick(args: MbscEventClickEvent) {
    console.log('Cell double-clicked:', args.date, args.resource);
    // Example: open editor for a new event
    // this.showCreateEventDialog(args.date, args.resource);
  }
}   
```

</TabItem>
</Tabs>

Although the naming conventions and parameter structures differ slightly between Bryntum and Mobiscroll, the overall event purpose and customization potential remain aligned. Developers familiar with Bryntum’s event model will find it straightforward to adapt similar functionality in Mobiscroll, ensuring a smooth migration path with minimal overhead.

To explore the full list of available Mobiscroll lifecycle events and understand how they can be leveraged, please refer to the [documentation](/angular/eventcalendar/api#events).

Additionally, you can see these events in action through live, interactive examples for the following Mobiscroll components:
- [Event Calendar](https://demo.mobiscroll.com/eventcalendar/event-hooks)
- [Scheduler](https://demo.mobiscroll.com/scheduler/event-hooks)
- [Timeline](https://demo.mobiscroll.com/timeline/event-hooks)
- [Agenda](https://demo.mobiscroll.com/agenda/event-hooks)

These examples provide hands-on insights into how lifecycle events work in practice.

## Feature migration

As a final step, let’s explore how core features from Bryntum can be replicated using Mobiscroll. While some capabilities are available out of the box in Bryntum, Mobiscroll often requires more explicit setup but offers much more flexibility.

### Drag & Drop functionality

- Bryntum enables drag-and-drop operations by default with no extra configuration needed.
- In Mobiscroll, the D&D features must be enabled explicitly via [configuration options](/angular/eventcalendar/drag-and-drop).

#### Enabling Drag & Drop in Mobiscroll:

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

- Bryntum enables switching views by default with no extra configuration needed.
- Mobiscroll doesn’t include a built-in view-switching UI by default. However, it offers greater flexibility by allowing you to implement a custom header where you can design the view-switching experience to fit your needs. For example, you can use a [dropdown menu](https://demo.mobiscroll.com/select) or [segmented controls](https://demo.mobiscroll.com/forms/segmented) to let users switch between views like Calendar, Scheduler, Agenda, or any other layout that fits your use case.

#### Bryntum:

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<bryntum-calendar
  #calendar
  [date]="calendarProps.date!"
  mode="week"
></bryntum-calendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { Component } from '@angular/core';
import {
  BryntumCalendarModule,
  BryntumCalendarProps,
} from '@bryntum/calendar-angular';

const calendarProps: BryntumCalendarProps = {
  date: new Date(2022, 0, 1),
};

@Component({
  selector: 'app-root',
  imports: [BryntumCalendarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  calendarProps = calendarProps;
}   
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

Handling time zones accurately is crucial in calendar and scheduling applications, especially when working across regions or coordinating international events. Both Bryntum and Mobiscroll offer support for working with time zones, though they approach it differently in terms of configuration and underlying technology. So, let’s see a simple example of how this scenario is handled in the case of Bryntum and Mobiscroll.

#### Bryntum

Bryntum provides built-in time zone support across all of its scheduling products. This allows you to configure components to operate in a specific time zone, independent of the browser or system time.

To enable time zone conversion in Bryntum, simply set the [`timeZone`](https://bryntum.com/products/schedulerpro/docs/api/Scheduler/model/ProjectModel#config-timeZone) configuration on the project object. You can use either:
- an IANA time zone identifier (e.g., 'Europe/Stockholm'), or
- a UTC offset in minutes (e.g., -120)

Timezone can be set on the project or on the scheduler component directly:

```html
<bryntum-scheduler-pro-project-model
  #project
  timeZone="Europe/Stockholm"
></bryntum-scheduler-pro-project-model>
```

```html
<bryntum-scheduler-pro
  #schedulerpro
  timeZone="Europe/Stockholm"
></bryntum-scheduler-pro>
```

#### Mobiscroll

By default, Mobiscroll will not do any timezone conversion, will display the dates without modification, handling them as timezone-less. If your use case requires interpreting or displaying data in a different time zone, you can achieve this by using one of the supported third-party libraries for time zone conversion:
- [Moment-Timezone](/angular/eventcalendar/timezones#the-moment-timezone-library)
- [Luxon](/angular/eventcalendar/timezones#the-luxon-library)
- [Day.js](/angular/eventcalendar/timezones#the-dayjs-library)

Mobiscroll exposes two configuration options to handle time zones:
- `dataTimezone` [option](/angular/eventcalendar/api#opt-dataTimezone) – the time zone in which your event data is stored (e.g., 'utc')
- `displayTimezone` [option](/angular/eventcalendar/api#opt-displayTimezone) – the time zone in which you want the data to be presented (e.g., 'Europe/Stockholm')

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

As a conclusion, both libraries, Bryntum and Mobiscroll, provide timezone support. Mobiscroll supports multiple timezone libraries ([Moment-Timezone](/angular/eventcalendar/timezones#the-moment-timezone-library), [Luxon](/angular/eventcalendar/timezones#the-luxon-library), and [Day.js](/angular/eventcalendar/timezones#the-dayjs-library)), while Bryntum relies on angular Date, which may introduce DST inconsistencies.

#### Conclusion

While Bryntum offers more built-in functionality out of the box, Mobiscroll provides greater flexibility, enabling tailored behavior through configuration and custom UI components:
- Feel free to explore our demo page for [Timeline](https://demo.mobiscroll.com/timeline), [Scheduler](https://demo.mobiscroll.com/scheduler), [Event Calendar](https://demo.mobiscroll.com/eventcalendar), and [Agenda](https://demo.mobiscroll.com/agenda) views - featuring grouped examples, including [common use cases](https://demo.mobiscroll.com/timeline/employee-shifts), [view configuration](https://demo.mobiscroll.com/scheduler/custom-range-view), [event](https://demo.mobiscroll.com/timeline/timeline-custom-event-rendering) and [resource](https://demo.mobiscroll.com/scheduler/custom-resource-header-template) templating, and [lifecycle event handling](https://demo.mobiscroll.com/timeline/event-hooks).
- We also offer comprehensive documentation for the [Timeline](/angular/eventcalendar/timeline), [Scheduler](/angular/eventcalendar/scheduler), [Event Calendar](/angular/eventcalendar/calendar), and [Agenda](/angular/eventcalendar/agenda) views. It covers [usage](/angular/eventcalendar/timezones), [APIs](/angular/eventcalendar/api), [customization options](/angular/eventcalendar/templating), and more in detail.

In addition to drag & drop and custom view-switching, Mobiscroll also supports [timezone handling](https://demo.mobiscroll.com/scheduler/setting-the-timezone) and [zooming levels](https://demo.mobiscroll.com/timeline/calendar-zoom). All of our views work seamlessly across both [mobile](https://demo.mobiscroll.com/scheduler/mobile-day-view) and [desktop](https://demo.mobiscroll.com/scheduler/desktop-day-view) environments, with full support for touch interactions.

As mentioned above, with some additional setup, most —if not all— features can be effectively replicated when migrating from Bryntum to Mobiscroll.
If you have any specific questions or run into any issues, don’t hesitate to [reach out](https://mobiscroll.com#get-help) — we’re happy to help.

## Templating and renderers

### Event templating

#### Bryntum

Bryntum handles templating for events, resources, and other UI elements through a flexible system that allows developers to customize content rendering using template functions or strings.

In case of Bryntum you can show any HTML structure inside an event bar using the [`eventRenderer`](https://bryntum.com/products/schedulerpro/docs/api/Scheduler/view/mixin/SchedulerEventRendering#config-eventRenderer).

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<bryntum-scheduler-pro
  #schedulerpro
  [eventRenderer]="customEventRenderer"
  [events]="myEvents"
></bryntum-scheduler-pro>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { Component } from '@angular/core';
import { BryntumSchedulerProModule, BryntumSchedulerProps } from '@bryntum/schedulerpro-angular';

@Component({
  selector: 'app-root',
  imports: [BryntumSchedulerProModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  myEvents = [
    {
      id: 10,
      resourceId: 'r1',
      name: 'Custom Meeting',
      startDate: '2017-01-01 09:00',
      endDate: '2017-01-01 11:00',
      duration: 2
    },
  ];

  customEventRenderer({ eventRecord }) {
    return {
      html: `
        <div style="background:#a8d8ea; border-radius:4px; padding:4px;">
          <strong>${eventRecord.name}</strong>
          <div style="font-size:12px; color:#444;">Duration: ${eventRecord.duration}h</div>
        </div>
      `,
    };
  }
}  
```

</TabItem>
</Tabs>

#### Mobiscroll

You can customize many parts of the Event Calendar by writing custom templates. In the context of plain angular these templates are functions that return a string containing the html markup. You will find a comprehensive list of all the available render functions for the Event Calendar in the [API templates](/angular/eventcalendar/api#renderers) section.

When you want to customize how the events look, depending on what your goal is, you have two options:
- [Customize the event content](/angular/eventcalendar/templating#event-content-templating) - Mobiscroll takes care of rendering the events in the correct order and also prints basic fields, like `start`/`end`, whether it is an `allDay` event or not and also takes care of coloring the event appropriately. Everything else comes from the custom template.
- [Customize the full event](/angular/eventcalendar/templating#full-event-templating) - Mobiscroll takes care of rendering the events in the correct order, but everything else comes form the template you write.

To define a template, create an `<ng-template>` tag with a variable reference and pass it to the apropriate eventcalendar option:

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<mbsc-eventcalendar [scheduleEventTemplate]="myTemplate">
  <ng-template #myTemplate let-eventRecord>
    <div style="background:#a8d8ea; border-radius:4px; padding:4px;">
      <strong>{{eventRecord.name}}</strong>
      <div style="font-size:12px; color:#444;">Duration: {{eventRecord.duration}}h</div>
    </div>
  </ng-template>
</mbsc-eventcalendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
@Component({...});
export class AppComponent {
  // ...

  myEvents: MbscCalendarEvent[] = [
    {
      id: 10,
      resourceId: 'r1',
      name: 'Custom Meeting',
      startDate: '2017-01-01 09:00',
      endDate: '2017-01-01 11:00',
      duration: 2
    },
  ];
}   
```

</TabItem>
</Tabs>

Feel free to explore live examples to see how event content templating work in action:
- [Event Calendar](https://demo.mobiscroll.com/eventcalendar/customize-label-look-and-feel#)
- [Scheduler](https://demo.mobiscroll.com/scheduler/customizing-events#)
- [Timeline](https://demo.mobiscroll.com/timeline/meal-planner#)
- [Agenda](https://demo.mobiscroll.com/agenda/event-content-customization#)

Feel free to explore live examples to see how full event templating work in action:
- [Event Calendar](https://demo.mobiscroll.com/eventcalendar/customize-event-popover#)
- [Scheduler](https://demo.mobiscroll.com/scheduler/customizing-events#)
- [Timeline](https://demo.mobiscroll.com/timeline/timeline-custom-event-rendering#)
- [Agenda](https://demo.mobiscroll.com/angular/agenda/customizing-calendar-header)

### Resource templating

#### Bryntum

You can customize cell content and styling in a column using a [renderer](https://bryntum.com/products/scheduler/docs/api/Grid/column/Column#config-renderer) function.

To customize the column header, use the [`headerRenderer`](https://bryntum.com/products/scheduler/docs/api/Grid/column/Column#config-headerRenderer) option.

<Tabs>
<TabItem value="html" label="app.component.html">

```html
<bryntum-scheduler-pro
  #schedulerpro
  [columns]="schedulerProProps.columns!"
  [startDate]="schedulerProProps.startDate!"
  [endDate]="schedulerProProps.endDate!"
  [viewPreset]="schedulerProProps.viewPreset!"
  [resources]="myResources"
></bryntum-scheduler-pro>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { Component } from '@angular/core';
import {
  BryntumSchedulerProModule,
  BryntumSchedulerProps,
} from '@bryntum/schedulerpro-angular';

const schedulerProProps: BryntumSchedulerProps = {
  columns: [
    {
      text: 'Name',
      field: 'name',
      width: 130,
      headerRenderer: () => {
        return '<strong>Name</strong>';
      },
      renderer: ({ record }: any) => {
        return { html: `<strong>${record.name}</strong>` };
      },
    },
    {
      text: 'City',
      field: 'city',
      width: 90,
      headerRenderer: () => {
        return '<i>City</i>';
      },
      renderer: ({ record }: any) => {
        return { html: `<i>${record.city}</i>` };
      },
    },
  ],
  startDate: new Date(2017, 0, 1, 6),
  endDate: new Date(2017, 0, 1, 20),
  viewPreset: 'hourAndDay',
};

@Component({
  selector: 'app-root',
  imports: [BryntumSchedulerProModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  schedulerProProps = schedulerProProps;

  myResources = [
    { id: 1, name: 'Adam', city: 'Washington' },
    { id: 2, name: 'Eva', city: 'New York' },
  ];
}   
```

</TabItem>
</Tabs>

#### Mobiscroll

In the case of Mobiscroll, we take a different approach. We provide various templating options (listed below), which allow you to customize the resources. This is unlike Bryntum, where customization requires modifying the columns with different renderers.

#### Scheduler

Use the [`resourceTemplate`](/angular/eventcalendar/scheduler#template-resourceTemplate) option to customize the resource template of the Scheduler. Customize how the resource headers look and what they show. Utilize properties passed in the [resources](/angular/eventcalendar/scheduler#opt-resources) array. It takes a function that should return the desired markup.

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
      <strong>{{record.name}}</strong>
    </div>
    <div class="my-resource-cell">
      <i>{{record.city}}</i>
    </div>
  </ng-template>
</mbsc-eventcalendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
@Component({...});
export class AppComponent {
  // ...

  myResources: MbscResource[] = [
    { id: 1, name: 'Adam', city: 'Washington' },
    { id: 2, name: 'Eva', city: 'New York' },
  ];
}    
```

</TabItem>
</Tabs>

### Header templating

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
    <div class="my-custom-title">{{myTitle}}</div>
  </ng-template>
</mbsc-eventcalendar>
```

Also, feel free to explore live examples to see how header templating work in action:
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

- [Empty state templating](/angular/eventcalendar/agenda#the-agenda-empty-state) - Customize the look of the empty state through [`agendaEmptyTemplate`](/angular/eventcalendar/agenda#template-agendaEmptyTemplate) function.

  Check out how you can style the empty state in [this example](https://demo.mobiscroll.com/agenda/empty-state#).

## Localization

### Bryntum

Bryntum supports localization by allowing developers to select from built-in locales or define custom ones. Key aspects include:
- Locale files translate UI text, date formats, and number formats to the target language.
- Custom locales can be created or modified using their locale structure.
- Right-to-left (RTL) layout support is included

```ts
import { LocaleManager } from '@bryntum/schedulerpro';
import '@bryntum/schedulerpro/locales/schedulerpro.locale.FrFr';

LocaleManager.applyLocale('FrFr');
```

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
import { localeDe, MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [MbscModule]
})
export class AppComponent {
    myLocale = localeFr; // French locale applied globally
}   
```

</TabItem>
</Tabs>

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