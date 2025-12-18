---
sidebar_position: 9
sidebar_label: Migrating from DHTMLX
displayed_sidebar: reactSidebar
title: Migrating from DHTMLX to Mobiscroll
toc_max_heading_level: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

This article provides a comprehensive guide for migrating your scheduling solution from DHTMLX to Mobiscroll. 

DHTMLX Scheduler can be integrated into React by using a custom wrapper component around the plain Javascript scheduler instance, whereas Mobiscroll provides native React components that plug directly into templates through standard bindings.

If you are currently using DHTMLX Scheduler in React via a custom wrapper, or using it within another framework and planning to migrate to Mobiscroll’s React components, the following guide outlines the steps required for a smooth transition.

## Installation

Migrating from DHTMLX Scheduler to Mobiscroll starts with a different approach to installation, especially regarding package access and tooling.

### Mobiscroll installation steps:

Install the [Mobiscroll CLI](/react/getting-started/installation#install-the-cli) (only needed once):

```bash
npm install -g @mobiscroll/cli
```

[Configure Mobiscroll](/react/getting-started/installation#installing-from-npm) in your project (navigate to your project root folder and run):

```bash
mobiscroll config react
```

Alternatively, Mobiscroll also supports [manual installation](/react/getting-started/installation#installing-manually) if you’re not using NPM. However, using NPM is generally the recommended approach for simplicity and maintainability.

## Initialization

### DHTMLX Scheduler:

```jsx
import { useEffect, useRef } from 'react';
import { Scheduler } from '@dhx/trial-scheduler';
import '@dhx/trial-scheduler/codebase/dhtmlxscheduler.css';

export default function SchedulerView() {
  let container = useRef();
  useEffect(() => {
    const cont = container.current;
    const scheduler = Scheduler.getSchedulerInstance();

    scheduler.init(cont);

    return () => {
      scheduler.destructor();
      cont.innerHTML = '';
    };
  }, []);

  return <div ref={container} style={{ width: '100%', height: '100%' }}></div>;
}
```

### Mobiscroll:

```jsx
import { Eventcalendar } from '@mobiscroll/react';
import '@mobiscroll/react/dist/mobiscroll.min.css';

function App() {
  return (
    <Eventcalendar />
  );
}

export default App;
```

## View configuration

Key Differences:
- With Mobiscroll, you get precise control over time ranges on [Scheduler](https://demo.mobiscroll.com/scheduler/show-hide-hours-days) and [Timeline](https://demo.mobiscroll.com/timeline/daily-weekly-monthly-yearly-timeline) views, plus feature-rich [Event Calendar](https://demo.mobiscroll.com/eventcalendar) and [Agenda](https://demo.mobiscroll.com/agenda) views for seamless scheduling.
- DHTMLX uses deeply nested react objects or HTML for defining views, layouts, templates, and event sources. Views like “Day,” “Week,” “Month,” and custom configurations are declared in the scheduler initialization with specific settings for each widget, often grouped into sections and requiring manual wiring for advanced customization.

### DHTMLX Scheduler - Timeline view:

For the DHTMLX you have to use the [`createTimelineView`](https://docs.dhtmlx.com/scheduler/api__scheduler_createtimelineview.html) method for customizing the Timeline view

```jsx
import { useEffect, useRef } from 'react';
import { Scheduler } from '@dhx/trial-scheduler';
import '@dhx/trial-scheduler/codebase/dhtmlxscheduler.css';

export default function SchedulerView() {
  let container = useRef();
  useEffect(() => {
    const cont = container.current;
    const scheduler = Scheduler.getSchedulerInstance();

    scheduler.plugins({
      timeline: true,
    });

    scheduler.createTimelineView({
      name: 'timeline',
      x_unit: 'minute', // measuring unit of the X-Axis.
      x_date: '%H:%i', // date format of the X-Axis
      x_step: 30, // X-Axis step in 'x_unit's
      x_size: 24, // X-Axis length specified as the total number of 'x_step's
      x_start: 16, // X-Axis offset in 'x_unit's
      x_length: 48, // number of 'x_step's that will be scrolled at a time
      y_unit: [
        { key: 1, label: 'Resource 1' },
        { key: 2, label: 'Resource 2' },
        { key: 3, label: 'Resource 3' },
        { key: 4, label: 'Resource 4' },
      ],
      render: 'bar', // view mode
    });
    
    scheduler.init(cont);

    return () => {
      scheduler.destructor();
      cont.innerHTML = '';
    };
  }, []);

  return <div ref={container} style={{ width: '100%', height: '100%' }}></div>;
}
```

### Mobiscroll Timeline view:

In the Mobiscroll Timeline view, the `timeline` object within the [`view`](/react/eventcalendar/timeline#configuring-the-view) option allows you to customize the visible days and the timeline’s scale. You can specify which days to display (e.g., weekdays), set the time scale (e.g., 30-minute intervals), and define the frequency of the labels shown (e.g., every 15 minutes).

```jsx
import { Eventcalendar } from '@mobiscroll/react';
import { useMemo } from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

function App() {

  const myView = useMemo(
    () => ({
      timeline: {
        type: 'day',
        size: 1,
        startTime: '06:00',
        endTime: '20:00',
      }
    }),
    [],
  );

  return (
    <Eventcalendar view={myView} />
  );
}

export default App;
```

Check out how you can configure the Timeline view in [this live example](https://demo.mobiscroll.com/timeline/daily-weekly-monthly-yearly-timeline#).

### DHTMLX Scheduler view:

In case of DHTMLX Scheduler the Week view is added to the [basic scheduler's markup](https://docs.dhtmlx.com/scheduler/scheduler_markup.html) by default. That's why you don't need to provide any extra code for adding the view to the scheduler.

```jsx
import { useEffect, useRef } from 'react';
import { Scheduler } from '@dhx/trial-scheduler';
import '@dhx/trial-scheduler/codebase/dhtmlxscheduler.css';

export default function SchedulerView() {
  let container = useRef();
  useEffect(() => {
    const cont = container.current;
    const scheduler = Scheduler.getSchedulerInstance();

    scheduler.init(cont, new Date(2019,0,10),"week");

    return () => {
      scheduler.destructor();
      cont.innerHTML = '';
    };
  }, []);

  return <div ref={container} style={{ width: '100%', height: '100%' }}></div>;
}
```

### Mobiscroll Scheduler:

You can customize the visible days and hours, as well as the time grid scale, using the `schedule` object under the [`view`](/react/eventcalendar/scheduler#configuring-the-view) option. This allows you to define which days are shown (e.g., weekdays), set the visible time range (e.g., 8 AM to 6 PM), adjust the time scale (e.g., 30-minute intervals), and control the frequency of the labels (e.g., every 15 minutes).

```jsx
import { Eventcalendar } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { useMemo } from 'react';

function App() {

  const myView = useMemo(
    () => ({
      schedule: {
        type: 'week',
      }
    }),
    [],
  );

  return (
    <Eventcalendar view={myView} defaultSelectedDate="2019-01-10" />
  );
}

export default App;
```

Check out how you can configure the Scheduler view in [this live example](https://demo.mobiscroll.com/scheduler/show-hide-hours-days#).

## Resource configuration

Both DHTMLX Scheduler and Mobiscroll support resource-based scheduling (e.g., rooms, employees, assets), but they use different configuration models and event data structures.

In DHTMLX Scheduler, resource assignment depends on the view you use:
- Timeline view uses `y_property` to decide which row an event belongs to.
- Unit view uses `property` to decide which column an event belongs to. You pick the event field name yourself (e.g. `room_id`, `employee_id`), and Scheduler groups events accordingly.

In Mobiscroll, resources are defined once in a global `resources` array. Mobiscroll can handle multiple resources inside a single instance. Mobiscroll also supports multi-resource assignment out of the box.

### DHTMLX Scheduler - Timeline view – resource definition:

```jsx
import { useEffect, useRef } from 'react';
import { Scheduler } from '@dhx/trial-scheduler';
import '@dhx/trial-scheduler/codebase/dhtmlxscheduler.css';

export default function SchedulerView() {
  let container = useRef();
  useEffect(() => {
    const cont = container.current;
    const scheduler = Scheduler.getSchedulerInstance();

    scheduler.plugins({
      timeline: true,
    });
    
    scheduler.createTimelineView({
      name: 'timeline',
      y_property: 'section_id', // mapped data property
      y_unit: [
        { key: 1, label: 'Mike' },
        { key: 2, label: 'Linda' },
        // ...
      ],
    });

    scheduler.init(cont);

    return () => {
      scheduler.destructor();
      cont.innerHTML = '';
    };
  }, []);

  return <div ref={container} style={{ width: '100%', height: '100%' }}></div>;
}
```

### DHTMLX Scheduler - Units view – resource definition:

The DHTMLX Units view uses the `list` parameter of the [`createUnitsView`](https://docs.dhtmlx.com/scheduler/api__scheduler_createunitsview.html) option to set values/ units for the X-Axis. To be correctly processed, `list` items must have 2 mandatory properties:
- `key` - the item's id
- `label` - the item's label

```jsx
import { useEffect, useRef } from 'react';
import { Scheduler } from '@dhx/trial-scheduler';
import '@dhx/trial-scheduler/codebase/dhtmlxscheduler.css';

export default function SchedulerView() {
  let container = useRef();
  useEffect(() => {
    const cont = container.current;
    const scheduler = Scheduler.getSchedulerInstance();

    scheduler.plugins({
      units: true,
    });
    
    scheduler.createUnitsView({
      name: 'unit',
      property: 'unit_id', //the mapped data property
      list: [
        //defines the units of the view
        { key: 1, label: 'Mike' },
        { key: 2, label: 'Linda' },
        // ...
      ],
    });

    scheduler.init(cont);

    return () => {
      scheduler.destructor();
      cont.innerHTML = '';
    };
  }, []);

  return <div ref={container} style={{ width: '100%', height: '100%' }}></div>;
}
```

### Mobiscroll Timeline view/ Scheduler – resource definition

Mobiscroll uses the [`resources`](https://mobiscroll.com/docs/react/eventcalendar/timeline#opt-resources) array with `id` and `name` properties.

```jsx
import { Eventcalendar } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { useMemo } from 'react';

function App() {
  const myResources = useMemo(
    () => [
      { id: 'r1', name: 'Mike' },
      { id: 'r2', name: 'Linda' },
      // ...
    ],
    [],
  );

  return (
    <Eventcalendar
      resources={myResources}
    />
  );
}

export default App;
```

Mobiscroll offers significantly more resource manipulation flexibility, including fixed rows, reorder, and external drag & drop.

For more advanced use cases, refer to the [Mobiscroll documentation](/react/eventcalendar/resources) for additional options, including [custom rendering and templating of resources](/react/eventcalendar/timeline#the-resource-their-header-and-footer). You can also explore our demo page for [detailed resource configuration](https://demo.mobiscroll.com/timeline/timeline-resource-details-side-panel-footer) examples.

## Event migration

As shown below, there are clear differences in how events are structured between DHTMLX and Mobiscroll:
- The basic DHTMLX event structure is a JSON object with a unique event `id`, `start_date` and `end_date` (that defines the event period), an event title defined by `text` property, and optional custom properties like `room_id` to link to resources - this defines how events are internally represented and loaded in the scheduler.
- In contrast, Mobiscroll uses the [`data`](https://demo.mobiscroll.com/timeline/event-data-structure#) option in which `start` and `end` define the event period, the `title` property represents the event’s title, and an event `id` property is also available. Additionally, you can use the `resource` property to specify which resource the event should be assigned to.

### Event structure comparison

#### DHTMLX Scheduler:

```jsx
import { useEffect, useRef } from 'react';
import { Scheduler } from '@dhx/trial-scheduler';
import '@dhx/trial-scheduler/codebase/dhtmlxscheduler.css';

export default function SchedulerView() {
  let container = useRef();
  useEffect(() => {
    const cont = container.current;
    const scheduler = Scheduler.getSchedulerInstance();

    scheduler.init(cont);

    scheduler.parse([
      {
        id: 1,
        text: 'Conference',
        start_date: '2012-09-17 12:00',
        end_date: '2012-09-28 21:00',
        room_id: 1, // Custom property to associate event with a resource (e.g., room)
      },
    ]);

    return () => {
      scheduler.destructor();
      cont.innerHTML = '';
    };
  }, []);

  return <div ref={container} style={{ width: '100%', height: '100%' }}></div>;
}
```

#### Mobiscroll:

```jsx
import { Eventcalendar } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { useMemo } from 'react';

function App() {

  const myEvents = useMemo(
    () => [
      {
        id: 1, 
        resource: 'r1',
        start: '2017-01-01T10:00',
        end: '2017-01-01T12:00',
        title: 'Click me'
      }
    ],
    [],
  );

  return (
    <Eventcalendar
      data={myEvents}
    />
  );
}

export default App;
```

### Converting DHTMLX Scheduler events to Mobiscroll Format

Here’s a simple example of how to convert DHTMLX-style events into the format used by Mobiscroll:

```jsx
const mobiscrollEvents = dhtmlxEvents.map(event => {
    const start = new Date(event.start_date);
    const end = new Date(event.end_date);

    return {
        id: event.id,
        title: event.text,
        start,
        end,
        resource: event.room_id // based on `property` option
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

DHTMLX:

In DHTMLX Scheduler, loading data works by calling `scheduler.parse()` or `scheduler.load()` after initialization:
- `scheduler.load(url, format)` - fetches events from a server (JSON, XML, or iCal).
- `scheduler.parse(data, format)` - loads events directly from a react object. Once loaded, Scheduler automatically renders the events into the current view.

Mobiscroll:

- Mobiscroll components accept static arrays, which can be [inline](/react/eventcalendar/data-binding#local-data) (preloaded in memory) or [dynamically fetched](/react/eventcalendar/data-binding#remote-data) from remote APIs.
- The [`onPageLoading`](/react/eventcalendar/api#event-onPageLoading) event plays a central role in incremental data loading, enabling applications to [request only the events needed](https://demo.mobiscroll.com/timeline/load-events-on-demand) for the current view (e.g., the current month or week) as the user navigates.
- Mobiscroll also offers [integration with external calendar services](/react/eventcalendar/calendar-integrations/) ([Google Calendar](https://demo.mobiscroll.com/eventcalendar/sync-events-google-calendar#), [Outlook](https://demo.mobiscroll.com/eventcalendar/sync-events-outlook-calendar#)) via plugins, handling data retrieval and format conversion internally.

Let’s see an example for each case:

### Local data

#### DHTMLX Scheduler:

```jsx
import { useEffect, useRef } from 'react';
import { Scheduler } from '@dhx/trial-scheduler';
import '@dhx/trial-scheduler/codebase/dhtmlxscheduler.css';

export default function SchedulerView() {
  let container = useRef();
  useEffect(() => {
    const cont = container.current;
    const scheduler = Scheduler.getSchedulerInstance();

    scheduler.init(cont);

    scheduler.parse([
      {
        id: 1,
        text: 'Conference',
        start_date: '2012-09-17 12:00',
        end_date: '2012-09-28 21:00',
        room_id: 1, // Custom property to associate event with a resource (e.g., room)
      },
    ]);

    return () => {
      scheduler.destructor();
      cont.innerHTML = '';
    };
  }, []);

  return <div ref={container} style={{ width: '100%', height: '100%' }}></div>;
}
```

#### Mobiscroll:

Pass the event array to the [`data`](/react/eventcalendar/api#opt-data) option.

```jsx
import { Eventcalendar } from "@mobiscroll/react";
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

const myData = [
  {
    id: 1, 
    resource: 'r1',
    start: '2017-01-01T10:00',
    end: '2017-01-01T12:00',
    title: 'Click me'
  }
];

function App() {
  return <Eventcalendar data={myData} />
}
```

### Remote data

#### DHTMLX Scheduler

In case of DHTMLX, `scheduler.init` initializes the scheduler in the specified HTML element, then `scheduler.load` fetches event data as a JSON array from a remote URL for display in the scheduler.

```jsx
import { useEffect, useRef } from 'react';
import { Scheduler } from '@dhx/trial-scheduler';
import '@dhx/trial-scheduler/codebase/dhtmlxscheduler.css';

export default function SchedulerView() {
  let container = useRef();
  useEffect(() => {
    const cont = container.current;
    const scheduler = Scheduler.getSchedulerInstance();

    scheduler.init(cont, new Date(), 'day');
    
    // enable dynamic loading BEFORE load()
    scheduler.setLoadMode('day'); // "day" | "week" | "month" | "year"
    
    // initial fetch for current range
    scheduler.load('/api/events');

    return () => {
      scheduler.destructor();
      cont.innerHTML = '';
    };
  }, []);

  return <div ref={container} style={{ width: '100%', height: '100%' }}></div>;
}
```

#### Mobiscroll

You can load the data through an external request and assign it to the data-bound variable to update the eventcalendar with the newly received data.

In case of Mobiscroll, you can also use the [`onPageLoading`](/react/eventcalendar/api#event-onPageLoading) pevent to load the data (on demand) relevant to the currently active view. The event fires every time the date range of the view changes, for example, when someone navigates the event calendar. Getting the events in real time as the user interacts with the UI improves load performance and always serves the most recent data.

```jsx
import { Eventcalendar, getJson } from '@mobiscroll/react'
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { useCallback, useState } from 'react'

const myView = {
  schedule: { type: 'day' }
};

function App() {
  const [myEvents, setEvents] = useState([]);

  const handlePageLoading = useCallback((args) => {
    const year = args.month.getFullYear();
    const month = args.month.getMonth();
    const day = args.month.getDate();

    getJson(
      'https://example.remotedata.com/weeklyevents/?year=' + year + '&month=' + month + '&day=' + day,
      (data) => {
        setEvents(data);
      },
      'jsonp'
    )
  }, []);

  return <Eventcalendar data={myEvents} onPageLoading={handlePageLoading} view={myView} />
}
```

In case of the timeline view, data can also be [loaded dynamically during scrolling](/react/eventcalendar/timeline#load-data-on-scroll). Scrolling vertically or horizontally triggers the [`onVirtualLoading`](/react/eventcalendar/api#event-onVirtualLoading) lifecycle event, which can be used to [load data incrementally during scrolling](https://demo.mobiscroll.com/timeline/load-resources-on-scroll).

### Saving data

#### DHTMLX

In DHTMLX Scheduler, saving data works by attaching a `dataProcessor` to the scheduler that handles CRUD operations by sending changes (adds, updates, deletes) to a server-side script which updates the database accordingly.

Example:

```jsx
import { useEffect, useRef } from 'react';
import { Scheduler } from '@dhx/trial-scheduler';
import '@dhx/trial-scheduler/codebase/dhtmlxscheduler.css';

export default function SchedulerView() {
  let container = useRef();
  useEffect(() => {
    const cont = container.current;
    const scheduler = Scheduler.getSchedulerInstance();

    scheduler.init(cont);
    
    scheduler.load('/api/events');
    
    const dp = scheduler.createDataProcessor({
      url: '/api/events',
      mode: 'REST',
    });

    return () => {
      scheduler.destructor();
      cont.innerHTML = '';
    };
  }, []);

  return <div ref={container} style={{ width: '100%', height: '100%' }}></div>;
}
```

#### Mobiscroll

- Persistence is managed by listening to Mobiscroll’s [CRUD lifecycle events](/react/eventcalendar/crud).
- The Event Calendar exposes a [variety of events](/react/eventcalendar/api#events) that are triggered on certain actions made on calendar events. These events can be used to send your data to your API or save it to persistent storage.

Example for saving, updating, and deleting an event through an API:

```jsx
import { Eventcalendar } from "@mobiscroll/react";
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { useCallback, useState } from "react";

const myView = {
  schedule: { type: "week" },
};

function App() {
  const [myEvents] = useState([]);
  
  const saveEvent = useCallback((args) => {
    fetch('add.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args.event)
    });
  }, []);

  const updateEvent = useCallback((args) => {
    fetch('update.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args.event)
    });
  }, []);

  const deleteEvent = useCallback((args) => {
    fetch('delete.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args.event)
    });
  }, []);

  return <Eventcalendar
    view={myView}
    onEventCreated={saveEvent}
    onEventUpdated={updateEvent}
    onEventDeleted={deleteEvent}
    data={myEvents}
  />
}
```

Mobiscroll offers a flexible, event-driven approach suitable for both lightweight client-side setups and API-driven applications. Developers are responsible for implementing their own persistence logic, allowing for high adaptability but requiring more manual integration effort.

Both libraries are capable of handling modern scheduling needs, but the choice depends largely on application scale, data complexity, and desired control over the persistence layer.

## Lifecycle events

Both libraries, DHTMLX and Mobiscroll, provide a comprehensive set of lifecycle event hooks, enabling deep customization and integration with your application logic. These events are emitted at various stages of a component’s lifecycle, offering developers full control to inject custom behavior and extend default functionality.

Whether you’re looking to manipulate data before rendering, respond to user interactions, or perform cleanup tasks, Mobiscroll’s event system offers the flexibility to tailor components to your specific needs.

When migrating between DHTMLX and Mobiscroll, it’s important to note that most lifecycle events follow similar patterns across both libraries. This alignment minimizes friction during the transition process and helps preserve custom behaviors with minimal adjustments.

One such example is how each library handles a double-click on a cell. Below is a comparison of the respective event handlers and their parameters.

### DHTMLX

In DHTMLX Scheduler, lifecycle events such as creating, updating, or deleting an event are handled through the `scheduler.attachEvent()` method. This API allows you to subscribe to internal scheduler callbacks — for example: `onEventAdded`, `onEventChanged`, or `onEventDeleted` — and execute custom logic when these actions occur.

For example the `onXScaleDblClick` event is triggered when the user makes a double click on a cell on the x-axis (the Timeline view only). This event provides access to several key objects that describe the interaction and `contextDblClick`:
- `index`: number - the column index of the clicked cell (zero-based numbering)
- `value`: object - Date object of the start time stamp of the clicked cell
- `e`: event - native event object

Example:

```jsx
import { useEffect, useRef } from 'react';
import { Scheduler } from '@dhx/trial-scheduler';
import '@dhx/trial-scheduler/codebase/dhtmlxscheduler.css';

export default function SchedulerView() {
  let container = useRef();
  useEffect(() => {
    const cont = container.current;
    const scheduler = Scheduler.getSchedulerInstance();

    scheduler.attachEvent('onCellDblClick', function (x_ind, y_ind, x_val, y_val, e) {
      console.log('Cell double-clicked:', x_ind, y_ind, x_val, y_val, e);
      // Example: open a new event creation dialog
      // showCreateEventDialog(x_val, y_val);
    });

    scheduler.init(cont);

    return () => {
      scheduler.destructor();
      cont.innerHTML = '';
    };
  }, []);

  return <div ref={container} style={{ width: '100%', height: '100%' }}></div>;
}
```

### Mobiscroll

Mobiscroll components (e.g., Event Calendar, Scheduler, Timeline) expose a similar [`onCellDoubleClick`](/react/eventcalendar/api#event-onCellDoubleClick) event, which is fired when a cell is double-clicked. It includes contextual information that allows for granular control over the interaction:
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
import { Eventcalendar } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { useCallback } from 'react';

const App = () => {

  const handleCellDblClick = useCallback((args) => {
    console.log('Cell double-clicked:', args.date, args.resource);

    // Example: open a custom dialog to create a new event
    // showCreateEventDialog(args.date, args.resource);
  }, []);

  return (
    <Eventcalendar
      onCellDoubleClick={handleCellDblClick}
    />
  );
};

export default App;
```

To explore the full list of available Mobiscroll lifecycle events and understand how they can be leveraged, please refer to the [documentation](/react/eventcalendar/api#events).

Additionally, you can see these events in action through live, interactive examples for the following Mobiscroll components:
- [Event Calendar](https://demo.mobiscroll.com/eventcalendar/event-hooks)
- [Scheduler](https://demo.mobiscroll.com/scheduler/event-hooks)
- [Timeline](https://demo.mobiscroll.com/timeline/event-hooks)
- [Agenda](https://demo.mobiscroll.com/agenda/event-hooks)

These examples provide hands-on insights into how lifecycle events work in practice.

## Feature migration

As a final step, let’s explore how core features from DHTMLX can be replicated using Mobiscroll. While some capabilities are available out of the box in DHTMLX, Mobiscroll often requires more explicit setup but offers much more flexibility.

### Drag & Drop functionality

- DHTMLX Scheduler enables drag-and-drop operations by default with no extra configuration needed.
- In Mobiscroll, the [D&D features](https://demo.mobiscroll.com/timeline/move-resize-drag-drop-to-create-events#) must be enabled explicitly via [configuration options](/react/eventcalendar/drag-and-drop).

#### Enabling Drag & Drop in Mobiscroll:

```jsx
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Eventcalendar } from '@mobiscroll/react';

function App() {

  return (
    <Eventcalendar
      clickToCreate={true}
      dragToCreat={true}
      dragToMove={true}
      dragToResize={true}
      eventDelete={true}
    />
  );
}

export default App;
```

This configuration allows users to create, move, resize, and delete events in Mobiscroll.

### Switching Views (Calendar/Scheduler/Agenda)

- DHTMLX Scheduler enables switching views by default with no extra configuration needed.
- Mobiscroll doesn’t include a built-in view-switching UI by default. However, it offers greater flexibility by allowing you to implement a custom header where you can design the view-switching experience to fit your needs. For example, you can use a [dropdown menu](https://demo.mobiscroll.com/select) or [segmented controls](https://demo.mobiscroll.com/forms/segmented) to let users switch between views like Calendar, Scheduler, Agenda, or any other layout that fits your use case.

#### DHTMLX Scheduler:

```jsx
import { useEffect, useRef } from 'react';
import { Scheduler } from '@dhx/trial-scheduler';
import '@dhx/trial-scheduler/codebase/dhtmlxscheduler.css';

export default function SchedulerView() {
  let container = useRef();
  useEffect(() => {
    const cont = container.current;
    const scheduler = Scheduler.getSchedulerInstance();

    scheduler.init(cont, new Date(2020,8,12), "week");

    return () => {
      scheduler.destructor();
      cont.innerHTML = '';
    };
  }, []);

  return <div ref={container} style={{ width: '100%', height: '100%' }}></div>;
}
```

#### Mobiscroll:

In Mobiscroll, switching between views like Day, Week, or Month requires setting up a custom header along with event listeners to handle the view changes. You can see an example of this implementation [here](https://demo.mobiscroll.com/scheduler/switching-calendar-scheduler-agenda).

```jsx
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import {
  CalendarNav,
  CalendarNext,
  CalendarPrev,
  CalendarToday,
  Eventcalendar,
  getJson,
  Segmented,
  SegmentedGroup,
} from '@mobiscroll/react';
import { useCallback, useEffect, useState } from 'react';

function App() {
  const [view, setView] = useState('month');
  const [myEvents, setEvents] = useState([]);

  const [calView, setCalView] = useState({
    calendar: { labels: true },
  });

  const changeView = useCallback((event) => {
    let calView;

    switch (event.target.value) {
      case 'year':
        calView = {
          calendar: { type: 'year' },
        };
        break;
      case 'month':
        calView = {
          calendar: { labels: true },
        };
        break;
      case 'week':
        calView = {
          schedule: { type: 'week' },
        };
        break;
      case 'day':
        calView = {
          schedule: { type: 'day' },
        };
        break;
      case 'agenda':
        calView = {
          calendar: { type: 'week' },
          agenda: { type: 'week' },
        };
        break;
    }

    setView(event.target.value);
    setCalView(calView);
  }, []);

  const customWithNavButtons = useCallback(
    () => (
      <>
        <CalendarNav className="cal-header-nav" />
        <div className="cal-header-picker">
          <SegmentedGroup value={view} onChange={changeView}>
            <Segmented value="year">Year</Segmented>
            <Segmented value="month">Month</Segmented>
            <Segmented value="week">Week</Segmented>
            <Segmented value="day">Day</Segmented>
            <Segmented value="agenda">Agenda</Segmented>
          </SegmentedGroup>
        </div>
        <CalendarPrev className="cal-header-prev" />
        <CalendarToday className="cal-header-today" />
        <CalendarNext className="cal-header-next" />
      </>
    ),
    [changeView, view],
  );

  useEffect(() => {
    getJson(
      'https://trial.mobiscroll.com/events/?vers=5',
      (events) => {
        setEvents(events);
      },
      'jsonp',
    );
  }, []);

  return (
    <Eventcalendar
      clickToCreate={true}
      dragToCreate={true}
      dragToMove={true}
      dragToResize={true}
      eventDelete={true}
      renderHeader={customWithNavButtons}
      height={750}
      view={calView}
      data={myEvents}
      cssClass="md-switching-view-cont"
    />
  );
}

export default App;
```

### Timezones

Handling time zones accurately is crucial in calendar and scheduling applications, especially when working across regions or coordinating international events. Mobiscroll and DHTMLX take significantly different approaches. Mobiscroll is clearly superior in timezone management, while DHTMLX only operates with native JS Date objects, which limits its ability to handle complex timezone scenarios. 

#### DHTMLX

DHTMLX Scheduler only operates with native JS Date objects.

#### Mobiscroll

By default, Mobiscroll will not do any timezone conversion, will display the dates without modification, handling them as timezone-less. If your use case requires interpreting or displaying data in a different time zone, you can achieve this by using one of the supported third-party libraries for time zone conversion:
- [Moment-Timezone](/react/eventcalendar/timezones#the-moment-timezone-library)
- [Luxon](/react/eventcalendar/timezones#the-luxon-library)
- [Day.js](/react/eventcalendar/timezones#the-dayjs-library)

Mobiscroll exposes two configuration options to handle time zones:
- `dataTimezone` [option](/react/eventcalendar/api#opt-dataTimezone) – the time zone in which your event data is stored (e.g., 'utc')
- `displayTimezone` [option](/react/eventcalendar/api#opt-displayTimezone) – the time zone in which you want the data to be presented (e.g., 'Europe/Stockholm')

So, let’s say you want to use the Day.js timezone library. After [installing](/react/eventcalendar/timezones#the-dayjs-library) it into your project, you can pass the `dayjsTimezone` object to the Timeline’s [`timezonePlugin`](/react/eventcalendar/api#opt-timezonePlugin) option:

```jsx
import { Eventcalendar, dayjsTimezone } from '@mobiscroll/react';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjsTimezone.dayjs = dayjs;

function App() {
  return <Eventcalendar
    timezonePlugin={dayjsTimezone}
    dataTimezone="utc"
    displayTimezone="Europe/Stockholm"
  />
}
```

Also, feel free to explore live examples to see how time zones work in action:
- [Event Calendar](https://demo.mobiscroll.com/eventcalendar/setting-the-timezone#)
- [Scheduler](https://demo.mobiscroll.com/scheduler/setting-the-timezone#)
- [Timeline](https://demo.mobiscroll.com/timeline/setting-the-timezone#)
- [Agenda](https://demo.mobiscroll.com/agenda/setting-the-timezone#)

Or you can also check advanced demos such as:
- [switching timezones (on the fly) from the header](https://demo.mobiscroll.com/eventcalendar/multiple-timezone-support)
- [display time for multiple timezones](https://demo.mobiscroll.com/scheduler/show-multiple-timezones)
- [create a meeting planner across multiple timezones](https://demo.mobiscroll.com/timeline/timezone-meeting-planner)

You can also store the timezone inside the event data, using the [`timezone`](/react/eventcalendar/api#opt-data) property.

As a conclusion, Mobiscroll is clearly superior in timezone management, DHTMLX only operates with native JS Date objects.

#### Conclusion

DHTMLX Scheduler offers stronger server-side capabilities and export options, while Mobiscroll excels in multi-calendar systems and flexible component design:
- Feel free to explore our demo page for [Timeline](https://demo.mobiscroll.com/timeline), [Scheduler](https://demo.mobiscroll.com/scheduler), [Event Calendar](https://demo.mobiscroll.com/eventcalendar), and [Agenda](https://demo.mobiscroll.com/agenda) views - featuring grouped examples, including [common use cases](https://demo.mobiscroll.com/timeline/employee-shifts), [view configuration](https://demo.mobiscroll.com/scheduler/custom-range-view), [event](https://demo.mobiscroll.com/timeline/timeline-custom-event-rendering) and [resource](https://demo.mobiscroll.com/scheduler/custom-resource-header-template) templating, and [lifecycle event handling](https://demo.mobiscroll.com/timeline/event-hooks).
- We also offer comprehensive documentation for the [Timeline](/react/eventcalendar/timeline), [Scheduler](/react/eventcalendar/scheduler), [Event Calendar](/react/eventcalendar/calendar), and [Agenda](/react/eventcalendar/agenda) views. It covers [usage](/react/eventcalendar/timezones), [APIs](/react/eventcalendar/api), [customization options](/react/eventcalendar/templating), and more in detail.

In addition to drag & drop and custom view-switching, Mobiscroll also supports [timezone handling](https://demo.mobiscroll.com/scheduler/setting-the-timezone) and [zooming levels](https://demo.mobiscroll.com/timeline/calendar-zoom). All of our views work seamlessly across both [mobile](https://demo.mobiscroll.com/scheduler/mobile-day-view) and [desktop](https://demo.mobiscroll.com/scheduler/desktop-day-view) environments, with full support for touch interactions.

As mentioned above, with some additional setup, most —if not all— features can be effectively replicated when migrating from DHTMLX to Mobiscroll.
If you have any specific questions or run into any issues, don’t hesitate to [reach out](https://mobiscroll.com#get-help) — we’re happy to help.

## Templating and renderers

### Event templating

#### DHTMLX

In DHTMLX Scheduler, you can customize the content of events and define which data should be displayed by using templates. Each view relies on its own set of templates, so to determine which templates a particular view uses, refer to the article [Formatting Labels, Dates, Styles](https://docs.dhtmlx.com/scheduler/templates.html) article. 

Most views use the following two templates for customizing event text:
- [`event_header`](https://docs.dhtmlx.com/scheduler/api__scheduler_event_header_template.html) - defines the text shown in the event header
- [`event_text`](https://docs.dhtmlx.com/scheduler/api__scheduler_event_text_template.html) - defines the main text displayed inside the event

DHTMLX also recommends redefining templates inside the `onTemplatesReady` event handler. Doing so ensures that your custom templates are not overwritten by the default ones.

Below is an example of how to display the event location together with the event text in the event box:

```jsx
import { useEffect, useRef } from 'react';
import { Scheduler } from '@dhx/trial-scheduler';
import '@dhx/trial-scheduler/codebase/dhtmlxscheduler.css';

export default function SchedulerView() {
  let container = useRef();
  useEffect(() => {
    const cont = container.current;
    const scheduler = Scheduler.getSchedulerInstance();

    scheduler.attachEvent('onTemplatesReady', function () {
      scheduler.templates.event_text = function (start, end, event) {
        return `
          <div style="background:#a8d8ea; border-radius:4px; padding:4px;">
              <strong>${event.text}</strong>
              <div style="font-size:12px; color:#444;">Location: ${event.location} </div>
          </div>
      `;
      };
    });
    
    scheduler.init(cont, new Date(2019, 5, 5), 'week');
    
    scheduler.parse([
      {
        id: 1,
        text: 'Custom Meeting',
        start_date: '2019-06-05 09:00',
        end_date: '2019-06-05 11:00',
        location: 'Room 1',
      },
    ]);

    return () => {
      scheduler.destructor();
      cont.innerHTML = '';
    };
  }, []);

  return <div ref={container} style={{ width: '100%', height: '100%' }}></div>;
}
```

#### Mobiscroll

You can customize many parts of the Event Calendar by writing custom templates. In the context of plain react these templates are functions that return a string containing the html markup. You will find a comprehensive list of all the available render functions for the Event Calendar in the [API templates](/react/eventcalendar/api#renderers) section.

When you want to customize how the events look, depending on what your goal is, you have two options:
- [Customize the event content](/react/eventcalendar/templating#event-content-templating) - Mobiscroll takes care of rendering the events in the correct order and also prints basic fields, like `start`/`end`, whether it is an `allDay` event or not and also takes care of coloring the event appropriately. Everything else comes from the custom template.
- [Customize the full event](/react/eventcalendar/templating#full-event-templating) - Mobiscroll takes care of rendering the events in the correct order, but everything else comes form the template you write.

To define a template, create an `<ng-template>` tag with a variable reference and pass it to the apropriate eventcalendar option:

```jsx
import { Eventcalendar } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { useCallback, useMemo } from 'react';

const App = () => {
  const myView = useMemo(
    () => ({
      timeline: {
        type: 'week',
      }
    }),
    [],
  );
  
  const myEvents = useMemo(() => [
    {
      id: 10,
      resourceId: 'r1',
      name: 'Custom Meeting',
      start: '2017-01-01T09:00',
      end: '2017-01-01T11:00',
      duration: 2
    }
  ], []);

  const customEventRenderer = useCallback((event) => {
    const { name, duration } = event;
    return (
      <div style={{ background: '#a8d8ea', borderRadius: '4px', padding: '4px' }}>
        <strong>{name}</strong>
        <div style={{ fontSize: '12px', color: '#444' }}>Duration: {duration}h</div>
      </div>
    );
  }, []);

  return (
      <Eventcalendar
        view={myView}
        data={myEvents}
        renderScheduleEvent={customEventRenderer}
      />
  );
};

export default App;
```

Feel free to explore live examples to see how event content templating work in action:
- [Event Calendar](https://demo.mobiscroll.com/eventcalendar/customize-label-look-and-feel#)
- [Scheduler](https://demo.mobiscroll.com/scheduler/customizing-events#)
- [Timeline](https://demo.mobiscroll.com/timeline/meal-planner#)
- [Agenda](https://demo.mobiscroll.com/agenda/event-content-customization#)

Feel free to explore live examples to see how full event templating work in action:
- [Event Calendar](https://demo.mobiscroll.com/eventcalendar/customize-event-popover#)
- [Scheduler](https://demo.mobiscroll.com/scheduler/customizing-events#)
- [Timeline](https://demo.mobiscroll.com/timeline/timeline-custom-event-rendering#)
- [Agenda](https://demo.mobiscroll.com/react/agenda/customizing-calendar-header)

### Resource templating

#### DHTMLX

In case of DHTMLX Scheduler - Timeline view the resources can be customized through the columns property of the timeline configuration object:

```jsx
import { useEffect, useRef } from 'react';
import { Scheduler } from '@dhx/trial-scheduler';
import '@dhx/trial-scheduler/codebase/dhtmlxscheduler.css';

export default function SchedulerView() {
  let container = useRef();
  useEffect(() => {
    const cont = container.current;
    const scheduler = Scheduler.getSchedulerInstance();

    scheduler.plugins({
      timeline: true,
    });
    
    scheduler.createTimelineView({
      name: 'timeline',
      y_unit: [
        { key: 1, label: 'Adam', city: 'Washington' },
        { key: 2, label: 'Eva', city: 'New York' },
      ],
      columns: [
        {
          label: '<strong>Name</strong>',
          width: 130,
          template: function (obj) {
            return '<strong>' + obj.label + '<strong>';
          },
        },
        {
          label: '<i>City</i>',
          width: 90,
          template: function (obj) {
            return '<i>' + obj.city + '<i>';
          },
        },
      ],
    });

    scheduler.init(cont);

    return () => {
      scheduler.destructor();
      cont.innerHTML = '';
    };
  }, []);

  return <div ref={container} style={{ width: '100%', height: '100%' }}></div>;
}
```

#### Mobiscroll

In the case of Mobiscroll, we take a different approach. We provide various templating options (listed below), which allow you to customize the resources.

#### Scheduler

Use the [`renderResource`](/react/eventcalendar/scheduler#renderer-renderResource) option to customize the resource template of the Scheduler. Customize how the resource headers look and what they show. Utilize properties passed in the [resources](/react/eventcalendar/scheduler#opt-resources) array. It takes a function that should return the desired markup.

Check out how you can style the resources in [this example](https://demo.mobiscroll.com/scheduler/custom-resource-header-template#).

#### Timeline

In case of the Timeline view there are three places where you can customize the resource column:
- Use the [`renderResource`](/react/eventcalendar/timeline#renderer-renderResource) option to customize the resource template of the Timeline. Customize how the resource headers look and what they show. Utilize properties passed in the [resources](/react/eventcalendar/timeline#opt-resources) array.
- Customize the empty cell content above the resource column with the [`renderResourceHeader`](/react/eventcalendar/timeline#renderer-renderResourceHeader) option.
- Or if you want to customize the empty cell content below the resource column you can achieve this with the [`renderResourceFooter`](/react/eventcalendar/timeline#renderer-renderResourceFooter) option. This element only renders for the Timeline view, if the [`renderDayFooter`](/react/eventcalendar/timeline#renderer-renderDayFooter) option is present.

Check out how you can style these resource parts in [this example](https://demo.mobiscroll.com/timeline/timeline-resource-details-side-panel-footer#).

```jsx
import { Eventcalendar } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { useCallback, useMemo } from 'react';

const App = () => {
  const myView = useMemo(
    () => ({
      timeline: {
        type: 'week',
      }
    }),
    [],
  );

  const myResources = useMemo(() => [
    { id: 1, name: 'Adam', city: 'Washington' },
    { id: 2, name: 'Eva', city: 'New York' }
  ], []);

  const renderResourceHeader = useCallback(() => (
    <>
      <div className="my-resource-header">
        <strong>Name</strong>
      </div>
      <div className="my-resource-header">
        <i>City</i>
      </div>
    </>
  ), []);

  const renderResource= useCallback((resource) => (
    <>
      <div className="my-resource-cell">
        <strong>{resource.name}</strong>
      </div>
      <div className="my-resource-cell">
        <i>{resource.city}</i>
      </div>
    </>
  ), []);

  return (
      <Eventcalendar
        view={myView}
        resources={myResources}
        renderResource={renderResource}
        renderResourceHeader={renderResourceHeader}
      />
  );
};

export default App;
```

### Header templating

#### DHTMLX

In DHTMLX Scheduler, the header (the top navigation area containing the date, navigation buttons, and view tabs) is generated from a combination of HTML markup and Scheduler’s template system.

The header area corresponds to this block in your code:

```html
<div class="dhx_cal_navline">
  <div class="dhx_cal_prev_button">&nbsp;</div>
  <div class="dhx_cal_next_button">&nbsp;</div>
  <div class="dhx_cal_today_button"></div>
  <div class="dhx_cal_date"></div>
  <div class="dhx_cal_tab" data-tab="day"></div>
  <div class="dhx_cal_tab" data-tab="week" ></div>
  <div class="dhx_cal_tab" data-tab="month"></div>
</div>
```

Scheduler fills these elements using built-in templates, which you can override to control what appears in the header.

#### Mobiscroll

The header of the Mobiscroll calendar can be fully customized to one's needs with the use of the [`renderHeader`](/react/eventcalendar/api#renderer-renderHeader) option.

Here's the list of the built in components of the default header. You can initialize these by putting the attributes on the elements:
- `mbsc-calendar-prev` - Previous button component, that navigates to the previous month.
- `mbsc-calendar-next` - Next button component, that navigates to the next month.
- `mbsc-calendar-today` - Today button component, that navigates to the current date.
- `mbsc-calendar-nav` - The title navigation button component, that opens the year/month navigation.

The following example will render the prev and next buttons and a custom title.

```jsx
const myTitle = 'Awesome title';

const myHeader = () => {
  return <>
    <CalendarPrev />
    <CalendarNext />
    <div class="my-custom-title">{myTitle}</div>
  </>
}

<Eventcalendar renderHeader={myHeader} />
```

Also, feel free to explore live examples to see how header templating work in action:
- [Event Calendar](https://demo.mobiscroll.com/eventcalendar/customizing-header#)
- [Scheduler](https://demo.mobiscroll.com/scheduler/customizing-header#)
- [Timeline](https://demo.mobiscroll.com/timeline/switching-day-week-work-week-timeline)
- [Agenda](https://demo.mobiscroll.com/agenda/customizing-calendar-header)

### Other templating/ renderer options

#### Event Calendar

- Date header templating - There are two approaches you can take:
  - Customize the date headers of the Event Calendar with the [`renderDay`](/react/eventcalendar/calendar#renderer-renderDay) option by adding relevant content, labels or completely change how they look.
  - If you are looking to customize only the content and don't want to bother with the styling of the event, you can use the [`renderDayContent`](/react/eventcalendar/calendar#renderer-renderDayContent) option.

#### Scheduler

- [Date header templating](/react/eventcalendar/scheduler#the-date-header) - There are two approaches you can take:
  - Customize the date headers of the Scheduler with the [`renderDay`](/react/eventcalendar/scheduler#renderer-renderDay) option by adding relevant content, labels or completely change how they look.
  - If you are looking to customize only the content and don't want to bother with the styling of the event, you can use the [`renderDayContent`](/react/eventcalendar/scheduler#renderer-renderDayContent) option.

  Check out how you can style the date header in [this example](https://demo.mobiscroll.com/scheduler/date-header-template#).

#### Timeline

- [Templating the sidebar header and footer](/react/eventcalendar/timeline#the-sidebar-their-header-and-footer) - Besides the resource template, an additional sidebar can be rendered on the opposite end of the row and there are three approaches you can take:
  - Use the [`renderSidebar`](/react/eventcalendar/timeline#renderer-renderSidebar) option to render a custom sidebar on the right side of the Timeline.
  - Customize the empty cell content above the sidebar column with the [`renderSidebarHeader`](/react/eventcalendar/timeline#renderer-renderSidebarHeader) option.
  - Or if you want to customize the empty cell content below the sidebar column you can achieve this with the [`renderSidebarFooter`](/react/eventcalendar/timeline#renderer-renderSidebarFooter) option.

  Check out how you can style the sidebar parts in [this example](https://demo.mobiscroll.com/timeline/timeline-resource-details-side-panel-footer#).

- [Date header and footer templating](/react/eventcalendar/timeline#the-date-header-and-footer) - The headers hold key information like the date, day of the week and in some cases it also holds the full date. Whenever you need to show extra information, or if you would like to change the styling or date format, time format you can use the various header templates, depending on the view configuration. You can also show a footer element, for displaying more information.

  Check out how you can style the date header and footer in [this example](https://demo.mobiscroll.com/timeline/hour-day-week-month-quarter-year-header-footer-template#).

- [Slots](/react/eventcalendar/timeline#the-event-slots) - Use the [`renderSlot`](/react/eventcalendar/timeline#renderer-renderSlot) option to customize the slot template of the Timeline view.

  Check out how you can style the slots in [this example](https://demo.mobiscroll.com/timeline/shift-template#).

- [Variable event height](/react/eventcalendar/timeline#variable-event-height) - When using [event templating](/react/eventcalendar/templating#event-templating), you might end up with various event heights, depending on the displayed content, e.g. larger description, list of tasks, etc. You can enable support for variable event heights by setting the `eventHeight: 'variable'` property for the timeline inside the [`view`](/react/eventcalendar/timeline#view-timeline-eventHeight) option.

  Check out how you can set and style the variable event height in [this example](https://demo.mobiscroll.com/timeline/variable-event-height).

#### Agenda

- [Day header templating](/react/eventcalendar/agenda#the-agenda-day-header) - Customize the day headers that appear on the agenda with the [`renderDay`](/react/eventcalendar/agenda#renderer-renderDay) option.

  Check out how you can style the day headers in [this example](https://demo.mobiscroll.com/agenda/customizing-day-header#).

- [Empty state templating](/react/eventcalendar/agenda#the-agenda-empty-state) - Customize the look of the empty state through [`renderAgendaEmpty`](/react/eventcalendar/agenda#renderer-renderAgendaEmpty) function.

  Check out how you can style the empty state in [this example](https://demo.mobiscroll.com/agenda/empty-state#).

## Localization

### DHTMLX

DHTMLX Scheduler supports scheduler's localization by providing a number of predefined locales and means of creating custom ones. By default, DHTMLX Scheduler uses [English locale](https://docs.dhtmlx.com/scheduler/api__scheduler_locale_other.html).

To set the desired language for the scheduler, you need to activate the necessary locale via the `setLocale` method of the [`scheduler.i18n`](https://docs.dhtmlx.com/scheduler/api__scheduler_i18n_other.html) object.

```jsx
scheduler.i18n.setLocale("fr");
```

You can use and update any of the [predefined locales](https://docs.dhtmlx.com/scheduler/localization.html#includedlocales) that are bundled with the `dhtmlxscheduler.js` file or define a custom locale.

The locale can be switched dynamically but the changes will be applied only after a complete redrawing of the Scheduler either with the `scheduler.render()` or `scheduler.init()` call.

```jsx
scheduler.i18n.setLocale("fr");
scheduler.init("scheduler_here");
```

### Mobiscroll

Mobiscroll [enables localization](/react/core-concepts/localization) by letting developers set language, date, and time formats both globally (across the entire application) and locally (on individual components). Highlights:
- Global settings object lets developers set locale, theme, and format across the app (first example).
- Each component (e.g., Date Picker, Event Calendar) supports locale switching and custom translations with simple configuration (second example).
- RTL and calendar system support (Gregorian, Jalali, Hijri)
- Quick override ability for localized formats ensures that adaptations can be made case-by-case or via global settings.

Example setting the locale option globally:

```jsx
import { setOptions, localeFr } from '@mobiscroll/react';

setOptions({
  // ...other config...
  locale: localeFr // French locale applied globally
});
```

Example setting the locale at the component level:

```jsx
import { Eventcalendar, localeFr } from '@mobiscroll/react';

export function MyComponent() {
  return <Eventcalendar locale={localeFr} />;
}
```

## Conclusion

Migrating from DHTMLX Scheduler to Mobiscroll involves rethinking certain configurations, especially around views, events, and feature toggles. While DHTMLX Scheduler offers strong server-side capabilities and comprehensive export options, Mobiscroll stands out as a modern, developer-friendly, and highly adaptable calendar and scheduling solution. Its superior framework support, refined UX, accessibility readiness, and deep customization make it the better long-term choice for teams building maintainable and scalable scheduling experiences.

The overall migration process includes:
- Adjusting initialization patterns
- Adapting view configurations
- Mapping resources and events to Mobiscroll’s structure
- Enabling features like drag-and-drop manually

With a clear understanding of both libraries’ capabilities and structures, you can migrate efficiently and take full advantage of Mobiscroll’s modern UI and feature-rich environment.

#### Considering migrating from DHTMLX Scheduler to Mobiscroll?

[Schedule a call](https://calendly.com/mobiscroll/30min) and let's chat about how we can help.
We're here to support you in the migration process.