---
sidebar_position: 4
sidebar_label: Scheduler
displayed_sidebar: angularSidebar
---

import Options from '../\_auto-generated/eventcalendar/options_scheduler.md';
import Events from '../\_auto-generated/eventcalendar/events_scheduler.md';
import Localizations from '../\_auto-generated/eventcalendar/localizations_scheduler.md';
import Slots from '../_auto-generated/eventcalendar/renderers_scheduler.md';
import { ImgComparisonSlider } from '@img-comparison-slider/react';

# Scheduler

The scheduler displays a time grid with its related events. It can be configured as a daily or weekly schedule.
Work hours and work days along with disabled time-spans, breaks can be added. Use it for advanced scheduling tasks with built-in drag & drop.

The displayed week days can be modified with the `startDay` and `endDay` properties of the [view](./api#opt-view) option.

The displayed hours and minutes can be modified with the `startTime` and `endTime` properties of the [view](./api#opt-view) option.

```ts title="Work-week configuration example"
import { MbscEventcalendarView } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  myView: MbscEventcalendarView = {
    schedule: {
      type: 'week',
      startDay: 1, // Monday
      endDay: 5, // Friday
      startTime: '07:30',
      endTime: '18:30',
    }
  };
}
```
```html
<mbsc-eventcalendar [view]="myView"></mbsc-eventcalendar>
```

<div className="img-row">
    <img className="w70 pdg-img" src="https://docs.mobiscroll.com/Content/img/docs/desktop-schedule.png" width="759" height="375" />
    <img className="w30 pdg-img" src="https://docs.mobiscroll.com/Content/img/docs/mobile-schedule.png" width="410" height="205" />
</div>

## View Combination

The daily scheduler can also be combined with the calendar week view. The view option will look like the following:

```ts title="Daily Scheduler combined with Weekly Calendar"
import { MbscEventcalendarView } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  myView: MbscEventcalendarView = {
    calendar: {
      type: 'week'
    },
    schedule: {
      type: 'day'
    }
  };
}
```
```html
<mbsc-eventcalendar [view]="myView"></mbsc-eventcalendar>
```

## Resource grouping

The scheduler view can display multiple [resources](resources) inside a single instance. By default the displayed resources will be grouped by the given resources and the grouping can be changed with the [`groupBy`](#opt-groupBy) option, which also supports grouping by date.

<div className="img-row">
    <div className="pdg-img">
        <img src="https://docs.mobiscroll.com/Content/img/docs/groupbydate.png" />
        <label className="img-label">Resources grouped by date</label>
    </div>
    <div className="pdg-img">
        <img src="https://docs.mobiscroll.com/Content/img/docs/groupbyresource.png" />
        <label className="img-label">Resources grouped by resource</label>
    </div>
    <div className="pdg-img">
        <img src="https://docs.mobiscroll.com/Content/img/docs/groupbydayview.png" />
        <label className="img-label">Resources grouped by day view</label>
    </div>
</div>

```ts
import { MbscResource } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  myResources: MbscResource[] = [{
    id: 1,
    name: 'Ryan',
    color: '#f7c4b4'
  }, {
    id: 2,
    name: 'Kate',
    color: '#c6f1c9'
  }, {
    id: 3,
    name: 'John',
    color: '#e8d0ef'
  }];
}
```
```html title="Grouping resources by date"
<mbsc-eventcalendar [resources]="myResources" groupBy="date"></mbsc-eventcalendar>
```

The color property controls the default event color of the resource. If an event doesn't have a specified color it will inherit from the resource. The [agenda](agenda) and [calendar view](calendar) events and labels will also inherit the resource color.

[Events](#opt-data), [colors](#opt-colors), [invalids](#opt-invalids) can be tied to a single or multiple resources. This can be done with the `resource` property of the objects, where the id of the resource should be passed. It can be a single value where the element would be linked to a single resource or in case of an array the element will show up at all of the specified resources. If no resource property is specified to the color/event/invalid object then the element will show up in every resource group.

```ts title="Invalid rule tied to a single resource"
import { MbscDateType } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  myInvalid: MbscDateType[] = [{
    // highlight-next-line
    resource: 1, // this invalid will be displayed only in resource group where id is 1
    start: '13:00',
    end: '12:00',
    recurring: { repeat: 'weekly', weekDays: 'MO,TU,WE,TH,FR' },
    title: 'Lunch break'
  }]
}
```
```html
<mbsc-eventcalendar [invalid]="myInvalid"></mbsc-eventcalendar>
```

```ts title="Event tied to multiple resources"
import { MbscCalendarEvent } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  myData: MbscCalendarEvent[] = [{
    // highlight-next-line
    resource: [2, 3] // this event will be displayed in resource groups where id is 2 and 3
    start: new Date(2021, 5, 23),
    end: new Date(2021, 5, 30),
    title: 'Conference',
    allDay: true,
  }];
}
```
```html
<mbsc-eventcalendar [data]="myData"></mbsc-eventcalendar>
```

```ts title="Color rule for all the resources (resource not specified)"
import { MbscCalendarColor } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  myColors: MbscCalendarColor[] = [{
    // highlight-next-line
    // this color will display at every resource group
    start: new Date(2021, 5, 12, 16),
    end: new Date(2021, 5, 12, 17),
    color: "green",
  }];
}
```
```html
<mbsc-eventcalendar [colors]="myColors"></mbsc-eventcalendar>
```

## Row height

There might be cases when you would like to change the height of the schedule cell. You can use the following CSS classes for this purpose:

```css
.mbsc-schedule-time-wrapper,
.mbsc-schedule-item {
  height: 20px;
}
```

## Column width

You can use the following CSS classes for changing column widths of the scheduler:

```css
.mbsc-schedule-col-width {
  width: 100px;
}
```

## Templating
The display of Scheduler can be customized with different [templating](#templates) functions.

### Event and buffer areas
For customizing the event content, you can pass a custom rendering function to the [scheduleEventTemplate](#template-scheduleEventTemplate) option.

The buffers can be customized through the [bufferBeforeTemplate](#template-bufferBeforeTemplate) and [bufferAfterTemplate](#template-bufferAfterTemplate) options.

Check out how you can style event content and buffer areas in [this example](https://demo.mobiscroll.com/angular/scheduler/customizing-events#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
    <figure slot="first" className="before">
        <img width="100%" src={require('@site/static/img/normal-event-buffer-templating-scheduler.png').default} />
        <figcaption>Default</figcaption>
    </figure>
    <figure slot="second" className="after">
        <img width="100%" src={require('@site/static/img/event-buffer-templating-scheduler.png').default} />
        <figcaption>Custom</figcaption>
    </figure>
    <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
        <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" stroke-width="1" fill="#011742" vector-effect="non-scaling-stroke"></path>
    </svg>
</ImgComparisonSlider>

### Date header
Use the [dayTemplate](#template-dayTemplate) option for rendering a custom date header.

Check out how you can style the date header in [this example](https://demo.mobiscroll.com/angular/scheduler/date-header-template#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
    <figure slot="first" className="before">
        <img width="100%" src={require('@site/static/img/normal-date-header-template-scheduler.png').default} />
        <figcaption>Default</figcaption>
    </figure>
    <figure slot="second" className="after">
        <img width="100%" src={require('@site/static/img/date-header-template-scheduler.png').default} />
        <figcaption>Custom</figcaption>
    </figure>
    <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
        <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" stroke-width="1" fill="#011742" vector-effect="non-scaling-stroke"></path>
    </svg>
</ImgComparisonSlider>

### Resource
Use the [resourceTemplate](#template-resourceTemplate) option for rendering a custom resource header.

Check out how you can style the resources in [this example](https://demo.mobiscroll.com/angular/scheduler/custom-resource-header-template#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
    <figure slot="first" className="before">
        <img width="100%" src={require('@site/static/img/normal-resource-template-scheduler.png').default} />
        <figcaption>Default</figcaption>
    </figure>
    <figure slot="second" className="after">
        <img width="100%" src={require('@site/static/img/resource-template-scheduler.png').default} />
        <figcaption>Custom</figcaption>
    </figure>
    <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
        <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" stroke-width="1" fill="#011742" vector-effect="non-scaling-stroke"></path>
    </svg>
</ImgComparisonSlider>

### Header
Use the [headerTemplate](#template-headerTemplate) option for passing a custom header layout.

Check out how you can style the header in [this example](https://demo.mobiscroll.com/angular/scheduler/customizing-header#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
    <figure slot="first" className="before">
        <img width="100%" src={require('@site/static/img/normal-header-template-scheduler.png').default} />
        <figcaption>Default</figcaption>
    </figure>
    <figure slot="second" className="after">
        <img width="100%" src={require('@site/static/img/header-template-scheduler.png').default} />
        <figcaption>Custom</figcaption>
    </figure>
    <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
        <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" stroke-width="1" fill="#011742" vector-effect="non-scaling-stroke"></path>
    </svg>
</ImgComparisonSlider>

<div className="option-list">

## API

### Options

<Options />

### Events

<Events />

### Localization

<Localizations />

<div className="option-list-templates">

### Templates

<Slots />

</div>
</div>
