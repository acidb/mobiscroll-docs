---
sidebar_position: 4
sidebar_label: Scheduler
displayed_sidebar: vueSidebar
---

import ViewOptions from '../_auto-generated/eventcalendar/view_schedule.md';
import Options from '../\_auto-generated/eventcalendar/options_scheduler.md';
import Events from '../\_auto-generated/eventcalendar/events_scheduler.md';
import Localizations from '../\_auto-generated/eventcalendar/localizations_scheduler.md';
import Slots from '../_auto-generated/eventcalendar/renderers_scheduler.md';
import Types from '../_auto-generated/eventcalendar/types_scheduler.md';
import { ImgComparisonSlider } from '@img-comparison-slider/react';

# Scheduler

Use the [Scheduler view](https://demo.mobiscroll.com/scheduler) which features a time grid - vertically scrollable [daily, weekly and monthly views](https://demo.mobiscroll.com/scheduler/show-hide-hours-days) with built in [resource support](https://demo.mobiscroll.com/scheduler/resource-view), [templating](#templating) and more.

## Overview

The Scheduler displays a time grid with its related events. It can be configured as a [daily, weekly or monthly schedule](https://demo.mobiscroll.com/scheduler/show-hide-hours-days). [Work hours and work days](https://demo.mobiscroll.com/scheduler/work-week-hours) along with [disabled time-spans, breaks](https://demo.mobiscroll.com/scheduler/time-off-blocked-ranges) can be added. Use it for [advanced scheduling tasks](https://demo.mobiscroll.com/scheduler/doctors-appointment) with built-in drag & drop.

The capabilities like [recurring events](/vue/core-concepts/recurrence), [all-day, multi-day events](#opt-data), [responsiveness](#responsiveness) are supported by the Scheduler.

![Scheduler overview](/img/scheduler-overview.png)

## Showing the Scheduler

### View combination

The four views - [scheduler](./scheduler), [calendar](./calendar), [timeline](./timeline), [agenda](./agenda) - can be used alone or combined with each-other to create the perfect user experience on mobile, desktop and on everything in-between.

For example, the daily Scheduler can also be combined with the Calendar week view. The view option will look like the following:

```html title="Daily Scheduler combined with Weekly Calendar"
<script setup>
const myView = {
  calendar: {
    type: 'week'
  },
  schedule: {
    type: 'day'
  }
}
</script>

<template>
  <MbscEventcalendar :view="myView" />
</template>
```

### Configuring the view

The Scheduler view can be configured through the `view` option. Below are listed the `schedule` object properties which can help you fine-tune this view.

```html title='Example'
<script setup>
const myView = {
  schedule: {
    type: 'week',
    startDay: 1,
    endDay: 5,
    startTime: '09:00',
    endTime: '17:00',
    timeCellStep: 60,
    timeLabelStep: 60
    currentTimeIndicator: true
  }
}
</script>

<template>
  <MbscEventcalendar :view="myView" />
</template>
```

<div className="option-list">

<ViewOptions />

</div>

### Shifted days

[Shifted views](https://demo.mobiscroll.com/scheduler/24-hour-manufacturing-shift-rota-planning) — can be implemented by extending the scheduler [view](#configuring-the-view) with hours from the previous or next calendar days using the <code>startTime</code> and <code>endTime</code> properties with a day-offset format.

![Scheduler shifted days](/img/scheduler-shifted-view.png)

#### Shift Start Time (Previous Day Offset)

Use a negative day offset (HH:MM-D) to show hours from the previous day (e.g., <code>'20:00-1'</code>).

#### Shift End Time (Next Day Offset)

Use a positive day offset (HH:MM+D) to extend the view into the next day (e.g., <code>'06:00+1'</code>).


```ts
view: {
  schedule: {
      type: 'week',
      // Starts the view at 20:00 on the previous day
      startTime: '20:00-1', 
      // Ends the view at 06:00 on the next day
      endTime: '06:00+1' 
  }
}
```

#### Customizing the Calendar Day Start

The library applies the <code>.mbsc-schedule-day-limit</code> CSS class to the time row at the 00:00 midnight boundary. You can optionally customize its appearance using your own stylesheets.

```css
.my-calendar .mbsc-schedule-day-limit::after {
  border-top-color: #d38231;
  border-top-style: dashed;
}
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

CSS classes offer the flexibility to adjust column widths, allowing you to fully customize the layout of both resource columns and day columns.
You can choose to customize them together or separately, giving you the freedom to create a design that suits your specific needs. 

```css title="Setting general column width"
.mbsc-schedule-col-width {
  width: 100px;
}
``` 

#### Customizing weekday column widths

Each weekday column has a predefined CSS class that allows setting different widths for them:

- `.mbsc-schedule-column-mon` (Monday)
- `.mbsc-schedule-column-tue` (Tuesday)
- `.mbsc-schedule-column-wed` (Wednesday)
- `.mbsc-schedule-column-thu` (Thursday)
- `.mbsc-schedule-column-fri` (Friday)
- `.mbsc-schedule-column-sat` (Saturday)
- `.mbsc-schedule-column-sun` (Sunday)

```css title="Adjusting width for Monday"
.mbsc-schedule-column-mon {
  width: 150px;
}
``` 

#### Customizing resource column widths

Resource column widths can be adjusted by assigning a custom CSS class to resources using the <code>cssClass</code> property.

Check out how to change resource column widths in [this example](https://demo.mobiscroll.com/scheduler/content-dependent-resource-width).

```ts title="Assigning a class to a resource"
resources: [
  { id: 1, name: 'Resource 1', cssClass: 'resource-column-small' },
  { id: 2, name: 'Resource 2', cssClass: 'resource-column-large' }
]
``` 

```css title="Define styles for the resource classes"
.resource-column-small {
  width: 80px;
}

.resource-column-large {
  width: 160px;
}
``` 

:::info
If you override both resource and day column widths, make sure column groups (day or resource, depending on the [`groupBy`](#opt-groupBy) option)
are wide enough to contain their child elements, or specify a `min-width` for the group column instead of a fixed width.
:::

### Hide empty columns

Columns without any events can be hidden by setting `hideEmptyColumns` to `true` under the [view](#configuring-the-view) configuration.

### Hide invalid columns

Fully invalid columns can be hidden by setting `hideInvalidColumns` to `true` under the [view](#configuring-the-view) configuration.

   :::info
   A column is considered fully invalid if it contains [invalid](#opt-invalid) periods defined with `allDay`, date values,
   or a single time range that covers a full day or multiple days.
   :::
   
## Resources

### Resource grouping

The Scheduler view can display multiple [resources](resources) inside a single instance. By default the displayed resources will be grouped by the given resources and the grouping can be changed with the [`groupBy`](#opt-groupBy) option, which also supports grouping by date.

<div className="img-row">
    <div className="pdg-img">
        <img width="1000" height="595" src={require('@site/static/img/groupbydate.png').default} />
        <label className="img-label">Resources grouped by date</label>
    </div>
    <div className="pdg-img">
        <img width="1000" height="616" src={require('@site/static/img/groupbyresource.png').default} />
        <label className="img-label">Resources grouped by resource</label>
    </div>
    <div className="pdg-img">
        <img width="1000" height="577" src={require('@site/static/img/groupbydayview.png').default} />
        <label className="img-label">Resources grouped by day view</label>
    </div>
</div>

```javascript title="Grouping resources by date"
// highlight-next-line
const myGrouping = 'date';
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
```
```html
<MbscEventcalendar :resources="myResources" :groupBy="myGrouping" />
```

The color property controls the default event color of the resource. If an event doesn't have a specified color it will inherit from the resource. The [agenda](agenda) and [calendar view](calendar) events and labels will also inherit the resource color.

[Events](#opt-data), [colors](#opt-colors), [invalids](#opt-invalids) can be tied to a single or multiple resources. This can be done with the `resource` property of the objects, where the id of the resource should be passed. It can be a single value where the element would be linked to a single resource or in case of an array the element will show up at all of the specified resources. If no resource property is specified to the color/event/invalid object then the element will show up in every resource group.

```html
<MbscEventcalendar :invalid="myInvalidRules" :data="myEvents" :colors="myColors" />
```

```javascript title="Invalid rule tied to a single resource"
const myInvalidRules = [{
    // highlight-next-line
    resource: 1, // this invalid will be displayed only in resource group where id is 1
    start: '13:00',
    end: '12:00',
    recurring: { repeat: 'weekly', weekDays: 'MO,TU,WE,TH,FR' },
    title: 'Lunch break'
}];
```

```javascript title="Event tied to multiple resources"
const myEvents = [{
    // highlight-next-line
    resource: [2, 3] // this event will be displayed in resource groups where id is 2 and 3
    start: new Date(2021, 5, 23),
    end: new Date(2021, 5, 30),
    title: 'Conference',
    allDay: true,
}];
```

```javascript title="Color rule for all the resources (resource not specified)"
const myColors = [
  {
    // highlight-next-line
    // this color will display at every resource group
    start: new Date(2021, 5, 12, 16),
    end: new Date(2021, 5, 12, 17),
    color: "green",
  },
];
```

### Resource order

The initial order in which the resources appear on the scheduler follows the order of the array passed to the component. If the initial order needs to be changed, sort the resource array before passing it to the event calendar.

For dynamic sorting during runtime, sort the resource array and pass the updated array to the calendar.

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

```html title='Responsive configuration with the view option'
<script setup>
const myResponsive = {
  xsmall: {
    view: { schedule: { type: 'day' }}
  },
  custom: { // Custom breakpoint, you can use multiple if needed, but each must have a unique name.
    breakpoint: 600,
    view: { schedule: { type: 'week' }}
  }
}
</script>

<template>
  <MbscEventcalendar
    :responsive="myResponsive"
  />
</template>
```

![Scheduler responsive behavior](/img/scheduler-responsive.gif)

## Templating
The display of Scheduler can be customized with different [solt functions](#slots).

### The cell
Use the [cell](#slot-cell) slot to fully customize the Scheduler cells. Customize how the cell look and what they show. The slot gets an object with properties like date, events, colors, invalids, and resource, which can be used to display custom content.

:::info
Since cells are rendered frequently while scrolling, keep the customization lightweight for best performance.
:::

Check out how you can style the cell in [this example](https://demo.mobiscroll.com/scheduler/cell-content-template#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="1480" height="975" src={require('@site/static/img/normal-cell-templating-scheduler.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="1479" height="975" src={require('@site/static/img/cell-templating-scheduler.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

### The event, their content and buffer areas
The events can be customized in two ways:
- You can use the [scheduleEvent](#slot-scheduleEvent) option to customize the events that appear on the Scheduler. It should return the markup of the event. The Eventcalendar will take care of the positioning, but anything else you want to show is up to you - like a title, description, color the background or show any content.
- If you are looking to customize only the content and don't want to bother with the styling of the event, you can use the [scheduleEventContent](#slot-scheduleEventContent) option. Mobiscroll will position the event to the right place and will render essential information like the color of the event, the time and if it's an all day event or not. The title, description and any other fields you want to show (like participants or an avatar) will be coming from your custom function.

The buffers can be customized through the [bufferBefore](#slot-bufferBefore) and [bufferAfter](#slot-bufferAfter) options. These can help you visualise delays or added minutes for tasks. For example travel time for meetings/appointments, check in/check out for flights.

Check out how you can style event, their content and buffer areas in [this example](https://demo.mobiscroll.com/vue/scheduler/customizing-events#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="1480" height="975" src={require('@site/static/img/normal-event-buffer-templating-scheduler.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="1479" height="975" src={require('@site/static/img/event-buffer-templating-scheduler.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

### The date header
There are two approaches you can take:
- Customize the date headers of the Scheduler with the [day](#slot-day) option by adding relevant content, labels or completely change how they look. It takes a function that should return the desired markup. The Eventcalendar will take care of the positioning, but everything else (like background color, hover effect, etc.) is left to you. The render function will receive an object as parameter. This data can be used to show day specific things on the Scheduler.
- If you are looking to customize only the content and don't want to bother with the styling of the event, you can use the [dayContent](#slot-dayContent) option. You will get the styling taken care of by the Eventcalendar, and you can focus on what you show besides the day number. The template will receive an object as data. This data can be used to show day specific things on the Scheduler.

Check out how you can style the date header in [this example](https://demo.mobiscroll.com/vue/scheduler/date-header-template#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="1480" height="575" src={require('@site/static/img/normal-date-header-template-scheduler.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="1480" height="575" src={require('@site/static/img/date-header-template-scheduler.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

### The resource header
Use the [resource](#slot-resource) option to customize the resource template of the Scheduler. Customize how the resource headers look and what they show. Utilize properties passed in the [resources](#opt-resources) array. It takes a function that should return the desired markup. In the returned markup, you can use custom html as well.

Check out how you can style the resources in [this example](https://demo.mobiscroll.com/vue/scheduler/custom-resource-header-template#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="1480" height="753" src={require('@site/static/img/normal-resource-template-scheduler.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="1480" height="753" src={require('@site/static/img/resource-template-scheduler.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

### The scheduler header
Customize how the header of the Scheduler looks and how the components are arranged with the [header](#slot-header) option. It takes a function that should return the desired markup. In the returned markup, you can use custom html as well as the built in header components of the calendar.

While fully customizing the header is very usefull, sometimes it's desireable to customize only parts of it. In this case you can take advantage of the default header's [building blocks](/vue/eventcalendar/templating#header-templating). These components let you put toghether the header you want, while you don't have to worry about the functionality behind them.

Check out how you can style the header in [this example](https://demo.mobiscroll.com/vue/scheduler/customizing-header#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="1480" height="625" src={require('@site/static/img/normal-header-template-scheduler.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="1480" height="625" src={require('@site/static/img/header-template-scheduler.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

## Event order

The rendered event order is determined by the following two concepts:

 1. Event data order
 2. Event layout

The combination of these concepts results in the final rendered event order.

### Event data order

The sequence in which events are processed before being passed to the layout algorithm. The default ordering rules are as follows:

 1. All-day events are placed at the top.
 2. Non-all-day events follow, sorted by their start times.
 3. Events with the same start time are further ordered alphabetically by their titles.

This default order can be modified using the  `order` property in the event [event data](#opt-data). The order property takes precedence over the default rules. If two events have the same order value, the default rules apply. For more complex ordering requirements, the [eventOrder](#opt-eventOrder) option can be used. This option accepts a function that compares two events and returns an order (-1 or 1).

### Event layout

The event layout process determines the visual positioning and dimensions of events. This is a built-in functionality and cannot be altered externally. The layout algorithm processes the sorted event list and calculates each event's position and size. The algorithm follows these steps:

 1. The first event is placed in the first position of the event track.
 2. If two or more events overlap in their start/end times, the later event is placed in the next event track, positioned below or next to the previous event.
 3. If a subsequent event does not overlap with any already added events, it is placed back in the first event track.
 4. This process continues until all events are positioned within their respective columns or rows.

<div className="option-list">

## API
Here is a comprehensive list of all the specific options, events and methods of the Scheduler view.

<div className="calendar-api-header">

### Options
</div>
Explore the following API options that help you easily configure the Scheduler.

<Options />

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

### Slots
</div>
The display of the Scheduler can be customized with different slot functions.

<Slots />

### Types

<Types />

</div>
