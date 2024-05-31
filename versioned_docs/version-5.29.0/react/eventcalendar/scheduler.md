---
sidebar_position: 4
sidebar_label: Scheduler
displayed_sidebar: reactSidebar
---

import Options from '../\_auto-generated/eventcalendar/options_scheduler.md';
import Events from '../\_auto-generated/eventcalendar/events_scheduler.md';
import Localizations from '../\_auto-generated/eventcalendar/localizations_scheduler.md';
import Slots from '../_auto-generated/eventcalendar/renderers_scheduler.md';
import { ImgComparisonSlider } from '@img-comparison-slider/react';

# Scheduler

Use the [Scheduler view](https://demo.mobiscroll.com/scheduler) which features a time grid - vertically scrollable [daily, weekly and monthly views](https://demo.mobiscroll.com/scheduler/show-hide-hours-days) with built in [resource support](https://demo.mobiscroll.com/scheduler/resource-view), [templating](#templating) and more.

## Overview

The Scheduler displays a time grid with its related events. It can be configured as a [daily, weekly or monthly schedule](https://demo.mobiscroll.com/scheduler/show-hide-hours-days). [Work hours and work days](https://demo.mobiscroll.com/scheduler/work-week-hours) along with [disabled time-spans, breaks](https://demo.mobiscroll.com/scheduler/time-off-blocked-ranges) can be added. Use it for [advanced scheduling tasks](https://demo.mobiscroll.com/scheduler/doctors-appointment) with built-in drag & drop.

The capabilities like [recurring events](/react/core-concepts/recurrence), [all-day, multi-day events](#opt-data), [responsiveness](#responsiveness) are supported by the Scheduler.

![Scheduler overview](/img/scheduler-overview.png)

## Showing the Scheduler

### View combination

The four views - [scheduler](./scheduler), [calendar](./calendar), [timeline](./timeline), [agenda](./agenda) - can be used alone or combined with each-other to create the perfect user experience on mobile, desktop and on everything in-between.

For example, the daily Scheduler can also be combined with the Calendar week view. The view option will look like the following:

```jsx title="Daily Scheduler combined with Weekly Calendar"
function App() {
  const myViewOption = {
    calendar: {
      type: 'week'
    },
    schedule: {
      type: 'day'
    }
  };

  return <Eventcalendar view={myViewOptions} />
}
```

### Configuring the view

The Scheduler view can be configured through the `view` option. Below are listed the `schedule` object properties which can help you fine-tune this view.

```jsx title='Example'
function App() {
  const myViewOptions = {
    schedule: {
      type: 'week',
      startDay: 1,
      endDay: 5,
      startTime: '09:00',
      endTime: '17:00',
      timeCellStep: 60,
      timeLabelStep: 60,
      currentTimeIndicator: true
    }
  };

  return <Eventcalendar view={myViewOptions} />
}
```

<div className="option-list no-padding">

<h3 id="#opt-view">view</h3>

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

### Row height

There might be cases when you would like to change the height of the schedule cell. You can use the following CSS classes for this purpose:

```css
.mbsc-schedule-time-wrapper,
.mbsc-schedule-item {
  height: 20px;
}
```

### Column width

You can use the following CSS classes for changing column widths of the Scheduler:

```css
.mbsc-schedule-col-width {
  width: 100px;
}
```

## Resource grouping

The Scheduler view can display multiple [resources](resources) inside a single instance. By default the displayed resources will be grouped by the given resources and the grouping can be changed with the [`groupBy`](#opt-groupBy) option, which also supports grouping by date.

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

```jsx title="Grouping resources by date"
function App() {
  const myResources = [{
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

  return <Eventcalendar groupBy="date" resources={myResources} />
}
```

The color property controls the default event color of the resource. If an event doesn't have a specified color it will inherit from the resource. The [agenda](agenda) and [calendar view](calendar) events and labels will also inherit the resource color.

[Events](#opt-data), [colors](#opt-colors), [invalids](#opt-invalid) can be tied to a single or multiple resources. This can be done with the `resource` property of the objects, where the id of the resource should be passed. It can be a single value where the element would be linked to a single resource or in case of an array the element will show up at all of the specified resources. If no resource property is specified to the color/event/invalid object then the element will show up in every resource group.

```jsx title="Invalid rule tied to a single resource"
function App() {
  const myInvalidRules = [{
    // highlight-next-line
    resource: 1, // this invalid will be displayed only in resource group where id is 1
    start: '13:00',
    end: '12:00',
    recurring: { repeat: 'weekly', weekDays: 'MO,TU,WE,TH,FR' },
    title: 'Lunch break'
  }];
  return <Eventcalendar invalid={myInvalidRules} />
}
```

```jsx title="Event tied to multiple resources"
function App() {
  const myEvents = [{
    // highlight-next-line
    resource: [2, 3] // this event will be displayed in resource groups where id is 2 and 3
    start: new Date(2021, 5, 23),
    end: new Date(2021, 5, 30),
    title: 'Conference',
    allDay: true,
  }];
  return <Eventcalendar data={myEvents} />
}
```

```jsx title="Color rule for all the resources (resource not specified)"
function App() {
  const myColors = [{
    // highlight-next-line
    // this color will display at every resource group
    start: new Date(2021, 5, 12, 16),
    end: new Date(2021, 5, 12, 17),
    color: "green",
  }];
  return <Eventcalendar colors={myColors} />
}
```

## Responsiveness

The Scheduler is [fully responsive](https://demo.mobiscroll.com/scheduler/responsive-day-week-schedule#). It adapts to the available space and fills the screen to look good everywhere. While you don't have to worry about the width the height can be manually adjusted with the [height](#opt-height) option. This specifies different options for different container widths, in a form of an object, where the keys are the name of the breakpoints, and the values are objects containing the options for the given breakpoint.

Use the [responsive](#opt-responsive) option to configure how the calendar behaves on different sized screens.
The responsive option is equipped with five breakpoints:
- `xsmall` (up to 575px),
- `small` (up to 767px),
- `medium` (up to 991px),
- `large` (up to 1199px),
- `xlarge` (from 1200px).

Also, custom breakpoints can be added if necessary:
- `my-custom-breakpoint: { breakpoint: 600 }` (from 600px up to the next breakpoint).

:::info
The available width is queried from the container element of the component and not the browsers viewport like in css media queries.
:::

```jsx title='Responsive configuration with the view option'
function App() {
  const myResponsive = {
    xsmall: {
      view: { schedule: { type: 'day' }}
    },
    custom: { // Custom breakpoint
      breakpoint: 600,
      view: { schedule: { type: 'week' }}
    }
  };

  return <Eventcalendar responsive={myResponsive} />
}
```

![Scheduler responsive behavior](/img/scheduler-responsive.gif)

## Templating
The display of Scheduler can be customized with different [render functions](#renderers).

### The event, their content and buffer areas
The events can be customized in two ways:
- You can use the [renderScheduleEvent](#renderer-renderScheduleEvent) option to customize the events that appear on the Scheduler. It should return the markup of the event. The Eventcalendar will take care of the positioning, but anything else you want to show is up to you - like a title, description, color the background or show any content.
- If you are looking to customize only the content and don't want to bother with the styling of the event, you can use the [renderScheduleEventContent](#renderer-renderScheduleEventContent) option. Mobiscroll will position the event to the right place and will render essential information like the color of the event, the time and if it's an all day event or not. The title, description and any other fields you want to show (like participants or an avatar) will be coming from your custom function.

The buffers can be customized through the [renderBufferBefore](#renderer-renderBufferBefore) and [renderBufferAfter](#renderer-renderBufferAfter) options. These can help you visualise delays or added minutes for tasks. For example travel time for meetings/appointments, check in/check out for flights.

Check out how you can style event content and buffer areas in [this example](https://demo.mobiscroll.com/scheduler/customizing-events#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="100%" src={require('@site/static/img/normal-event-buffer-templating-scheduler.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="100%" src={require('@site/static/img/event-buffer-templating-scheduler.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

### The date header
There are two approaches you can take:
- Customize the date headers of the Scheduler with the [renderDay](#renderer-renderDay) option by adding relevant content, labels or completely change how they look. It takes a function that should return the desired markup. The Eventcalendar will take care of the positioning, but everything else (like background color, hover effect, etc.) is left to you. The render function will receive an object as parameter. This data can be used to show day specific things on the Scheduler.
- If you are looking to customize only the content and don't want to bother with the styling of the event, you can use the [renderDayContent](#renderer-renderDayContent) option. You will get the styling taken care of by the Eventcalendar, and you can focus on what you show besides the day number. The template will receive an object as data. This data can be used to show day specific things on the Scheduler.

Check out how you can style the date header in [this example](https://demo.mobiscroll.com/scheduler/date-header-template#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="100%" src={require('@site/static/img/normal-date-header-template-scheduler.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="100%" src={require('@site/static/img/date-header-template-scheduler.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

### The resource header
Use the [renderResource](#renderer-renderResource) option to customize the resource template of the Scheduler. Customize how the resource headers look and what they show. Utilize properties passed in the [resources](#opt-resources) array. It takes a function that should return the desired markup. In the returned markup, you can use custom html as well.

Check out how you can style the resources in [this example](https://demo.mobiscroll.com/scheduler/custom-resource-header-template#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="100%" src={require('@site/static/img/normal-resource-template-scheduler.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="100%" src={require('@site/static/img/resource-template-scheduler.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

### The scheduler header
Customize how the header of the Scheduler looks and how the components are arranged with the [renderHeader](#renderer-renderHeader) option. It takes a function that should return the desired markup. In the returned markup, you can use custom html as well as the built in header components of the calendar.

While fully customizing the header is very usefull, sometimes it's desireable to customize only parts of it. In this case you can take advantage of the default header's [building blocks](/react/eventcalendar/templating#header-templating). These components let you put toghether the header you want, while you don't have to worry about the functionality behind them.

Check out how you can style the Scheduler header in [this example](https://demo.mobiscroll.com/scheduler/customizing-header#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="100%" src={require('@site/static/img/normal-header-template-scheduler.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="100%" src={require('@site/static/img/header-template-scheduler.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
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
The display of the Scheduler can be customized with different render functions.

<Slots />

</div>
