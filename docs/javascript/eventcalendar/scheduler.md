---
sidebar_position: 4
sidebar_label: Scheduler
displayed_sidebar: javascriptSidebar
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

```javascript title="Work-week configuration example"
mobiscroll.eventcalendar('#myDiv', {
  view: {
    schedule: {
      type: 'week',
      startDay: 1, // Monday
      endDay: 5, // Friday
      startTime: '07:30',
      endTime: '18:30',
    }
  }
});
```

<div className="img-row">
    <img className="w70 pdg-img" src="https://docs.mobiscroll.com/Content/img/docs/desktop-schedule.png" width="759" height="375" />
    <img className="w30 pdg-img" src="https://docs.mobiscroll.com/Content/img/docs/mobile-schedule.png" width="410" height="205" />
</div>

## Configuring the view option
Below are listed the Scheduler view option's properties.

<div className="option-list no-padding">

### view {#opt-view}
MbscEventcalendarView

</div>

`schedule`: Configures the scheduler view. Properties:
- `type`: *&#039;day&#039; | &#039;week&#039; | &#039;month&#039;* (default `'week'`) - Sets the scheduler type.
- `size`: *number* (default: `1`)- Specifies the number of displayed months, weeks or days.
- `allDay`: *boolean* (default `true`) - Show or hide the all day events.
- `currentTimeIndicator`: *boolean* (default `true`) - Show or hide the current time indicator.
- `days`: *boolean* (default `true`) - Show or hide week days above the scheduler grid.
- `startDay`: *number* (default `0`) - Specifies the first visible weekday of the view. Sunday is 0, Monday is 1, etc.
  Days outside of the `startDay` and `endDay` range will not be visible.
  Should not be mistaken for the [firstDay](#localization-firstDay) option,
  which sets the first day of the week, and, if not set, is defined by the [localization](#localization-locale).
- `endDay`: *number* (default `6`) - Specifies the last visible weekday of the view. Sunday is 0, Monday is 1, etc.
- `startTime`: *string* (default `'00:00'`) - Set the start time of scheduler column.
  Hours and minutes can be specified in the same string, example: `'09:30'`.
- `endTime`: *string* (default `'24:00'`) - Set the end time of scheduler column.
  Hours and minutes can be specified in the same string, example: `'18:30'`.
- `maxEventStack`: *&#039;all&#039; | &#039;auto&#039; | number* - Limit the number of displayed events. When the number of overlapping events reaches the
  specified value, a &quot;more&quot; button will be displayed which opens a popover showing the rest of the events.
    - If it is a `number`, it specifies how many events will be displayed before the &quot;more&quot; button appears.
    - If set to `'all'`, all events will be displayed.
    - If set to `'auto'`, the component will decide how many events can be placed inside the column,
  based on the `minEventWidth` view option and the actual column width.
- `minEventWidth`: *number* - Specifies the minimum event width. Will be used when `maxEventStack: 'auto'` is used.
- `timeCellStep`: *number* (default `60`) - Set the step of the grid cells in minutes.
  Supported values: 1, 5, 10, 15, 20, 30, 60, 120, 180, 240, 360, 480, 720, 1440.
- `timeLabelStep`: *number* (default `60`) - Set the step of the time labels in minutes.
  Supported values: 1, 5, 10, 15, 20, 30, 60, 120, 180, 240, 360, 480, 720, 1440.
- `timezones`: *Array&lt;string | object&gt;* - Display times in multiple timezones on the time scale and time indicator.
  The timezones array can contain timezone strings or objects with timezone and label properties.
  Timezone strings must use the name from the [IANA time zone database](https://gist.github.com/aviflax/a4093965be1cd008f172).
  If no label is provided, the time column label will be UTC +/- the timezone offset.
   ```js
   timezones: ['Europe/Berlin','Europe/Bucharest']
   ```

   ```js
   timezones: [
     { timezone: 'America/Chicago', label: 'CHI'},
     { timezone: 'America/New_York', label: 'NY'}
   ]
   ```

## View Combination

The daily scheduler can also be combined with the calendar week view. The view option will look like the following:

```javascript title="Daily Scheduler combined with Weekly Calendar"
mobiscroll.eventcalendar('#myDiv', {
  view: {
    calendar: {
      type: 'week'
    },
    schedule: {
      type: 'day'
    }
  }
});
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

```javascript title="Grouping resources by date"
mobiscroll.eventcalendar('#myDiv', {
  // highlight-next-line
  groupBy: 'date',
  resources: [{
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
  }]
});
```

The color property controls the default event color of the resource. If an event doesn't have a specified color it will inherit from the resource. The [agenda](agenda) and [calendar view](calendar) events and labels will also inherit the resource color.

[Events](#opt-data), [colors](#opt-colors), [invalids](#opt-invalids) can be tied to a single or multiple resources. This can be done with the `resource` property of the objects, where the id of the resource should be passed. It can be a single value where the element would be linked to a single resource or in case of an array the element will show up at all of the specified resources. If no resource property is specified to the color/event/invalid object then the element will show up in every resource group.

```javascript title="Invalid rule tied to a single resource"
mobiscroll.eventcalendar('#myDiv', {
  invalid: [{
    // highlight-next-line
    resource: 1, // this invalid will be displayed only in resource group where id is 1
    start: '13:00',
    end: '12:00',
    recurring: { repeat: 'weekly', weekDays: 'MO,TU,WE,TH,FR' },
    title: 'Lunch break'
  }]
});
```

```javascript title="Event tied to multiple resources"
mobiscroll.eventcalendar('#myDiv', {
  data: [{
    // highlight-next-line
    resource: [2, 3] // this event will be displayed in resource groups where id is 2 and 3
    start: new Date(2021, 5, 23),
    end: new Date(2021, 5, 30),
    title: 'Conference',
    allDay: true,
  }]
});
```

```javascript title="Color rule for all the resources (resource not specified)"
mobiscroll.eventcalendar('#myDiv', {
  colors: [{
    // highlight-next-line
    // this color will display at every resource group
    start: new Date(2021, 5, 12, 16),
    end: new Date(2021, 5, 12, 17),
    color: "green",
  }]
});
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
The display of Scheduler can be customized with different [renderer](#renderers) functions.

### Event and buffer areas
For customizing the event content, you can pass a custom rendering function to the [renderScheduleEvent](#renderer-renderScheduleEvent) option.

The buffers can be customized through the [renderBufferBefore](#renderer-renderBufferBefore) and [renderBufferAfter](#renderer-renderBufferAfter) options.

Check out how you can style event content and buffer areas in [this example](https://demo.mobiscroll.com/scheduler/customizing-events#) or just play with the slider below to see the differences.

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
Use the [renderDay](#renderer-renderDay) option for rendering a custom date header.

Check out how you can style the date header in [this example](https://demo.mobiscroll.com/scheduler/date-header-template#) or just play with the slider below to see the differences.

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
Use the [renderResource](#renderer-renderResource) option for rendering a custom resource header.

Check out how you can style the resources in [this example](https://demo.mobiscroll.com/scheduler/custom-resource-header-template#) or just play with the slider below to see the differences.

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
Use the [renderHeader](#renderer-renderHeader) option for passing a custom header layout.

Check out how you can style the header in [this example](https://demo.mobiscroll.com/scheduler/customizing-header#) or just play with the slider below to see the differences.

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
Here is a comprehensive list of all the specific options, events and methods of the Scheduler view.

<div className="calendar-api-header">

### Options
</div>
Explore the following API options that help you easily configure the Scheduler.

<Options />

<div className="calendar-api-header">

### Events
</div>
The Scheduler ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

<div className="calendar-api-header">

### Localization
</div>
The Scheduler is fully localized. This covers date and time format, button copy, rtl and more.

<Localizations />

<div className="calendar-api-header">

### Renderers
</div>
The display of Scheduler can be customized with different renderer functions.

<Slots />

</div>
