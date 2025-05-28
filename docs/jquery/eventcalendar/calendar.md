---
sidebar_position: 2
sidebar_label: Calendar
displayed_sidebar: jquerySidebar
---

import ViewOptions from '../_auto-generated/eventcalendar/view_calendar.md';
import Options from '../\_auto-generated/eventcalendar/options_calendarview.md';
import Events from '../\_auto-generated/eventcalendar/events_calendarview.md';
import Localizations from '../\_auto-generated/eventcalendar/localizations_calendarview.md';
import Slots from '../_auto-generated/eventcalendar/renderers_calendarview.md';
import Types from '../_auto-generated/eventcalendar/types_calendarview.md';
import { ImgComparisonSlider } from '@img-comparison-slider/react';

# Calendar

Use the [Event Calendar](https://demo.mobiscroll.com/eventcalendar) as a traditional [month view](https://demo.mobiscroll.com/eventcalendar/desktop-month-view#) or combine it with an agenda as a [week view](https://demo.mobiscroll.com/agenda/daily-agenda-with-week-calendar#).
The events can be rendered as [labels](https://demo.mobiscroll.com/eventcalendar/event-labels#) or in a [popover](https://demo.mobiscroll.com/eventcalendar/event-popover#) that is shown on day click.

## Overview

The Calendar view supports everything from [single to multiple week views](https://demo.mobiscroll.com/eventcalendar/month-week-view#) all the way to [month grids](https://demo.mobiscroll.com/eventcalendar/quarter-year-view#) with various ways to render events.

The capabilities like [recurring events](/javascript/core-concepts/recurrence), [all-day, multi-day events](#opt-data), [responsiveness](#responsiveness) are supported by the Event Calendar.

![Event Calendar overview](/img/event-calendar-overview.png)

## Showing the Calendar

### View combination

The four views - [scheduler](./scheduler), [calendar](./calendar), [timeline](./timeline), [agenda](./agenda) - can be used alone or combined with each-other to create the perfect user experience on mobile, desktop and on everything in-between.

For example, you can choose to [render an agenda below the calendar](https://demo.mobiscroll.com/agenda/daily-agenda-with-week-calendar#) broken up into days ordered chronologically. The view option will look like the following:

```javascript title='Weekly Calendar combined with Daily Agenda'
$('#calendar').mobiscroll().eventcalendar({
  view: {
    calendar: {
      type: 'week'
    },
    agenda: {
      type: 'day'
    }
  }
});
```

### Configuring the view

The Calendar view can be configured through the `view` option. Below are listed the `calendar` object properties which can help you fine-tune this view.

```javascript title='Example'
$('#calendar').mobiscroll().eventcalendar({
  view: {
    calendar: {
      labels: true,
      type: 'week',
      size: 2
    }
  }
});
```

<div className="option-list">

<ViewOptions />

</div>

## Responsiveness

The Event Calendar is [fully responsive](https://demo.mobiscroll.com/eventcalendar/responsive-month-view). It adapts to the available space and fills the screen to look good everywhere. While you don't have to worry about the width the height can be manually adjusted with the [height](#opt-height) option. This specifies different options for different container widths, in a form of an object, where the keys are the name of the breakpoints, and the values are objects containing the options for the given breakpoint.

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

```javascript title='Responsive configuration with the view option'
$('#calendar').mobiscroll().eventcalendar({
  responsive: {
    xsmall: {
      view: {
        calendar: { type: 'week' },
        agenda: { type: 'day' }
      }
    },
    custom: { // Custom breakpoint, you can use multiple if needed, but each must have a unique name.
      breakpoint: 600,
      view: { calendar: { labels: true }}
    }
  }
});
```

![Event Calendar responsive behavior](/img/event-calendar-responsive.gif)

## Templating
The display of Calendar can be customized with different [render functions](#renderers).

### The event label and their content
There are two approaches you can take:
- Customize the label contents, that appears on the calendar - for this you will want to use the [renderCalendarEventContent](#renderer-renderCalendarEventContent) option. The Event Calendar will take care of styling and you can focus on what you show inside of the label.
- Customize the labels that appear on the calendar view - use the [renderCalendarEvent](#renderer-renderCalendarEvent) option. The Event Calendar will take care of the positioning, but everything else (like background color, hover effect, etc.) is left to you.

Check out how you can style labels and their content in [this example](https://demo.mobiscroll.com/eventcalendar/customize-label-look-and-feel#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="1256" height="547" src={require('@site/static/img/normal-label-content-calendar.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="1256" height="547" src={require('@site/static/img/label-content-calendar.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

### The event in popover and their content
The events can be customized in two ways:
- Customize the event content that appears on the popover - by using the [renderPopoverEventContent](#renderer-renderPopoverEventContent) option. The Event Calendar will take care of styling and you can focus on what you show inside of the event.
- Customize the events that appear on the popover - with the [renderPopoverEvent](#renderer-renderPopoverEvent) option. It should return the markup of the event. The Event Calendar will take care of the positioning, but everything else (like background color, hover effect, etc.) is left to you.

Check out how you can style events and their content in [this example](https://demo.mobiscroll.com/eventcalendar/customize-event-popover#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="1256" height="373" src={require('@site/static/img/normal-event-content-calendar.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="1256" height="373" src={require('@site/static/img/event-content-calendar.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

### The event calendar header
Customize how the header of the Event Calendar looks and how the components are arranged with the [renderHeader](#renderer-renderHeader) option. It takes a function that should return the desired markup. In the returned markup, you can use custom html as well as the built in header components of the calendar.

While fully customizing the header is very usefull, sometimes it's desireable to customize only parts of it. In this case you can take advantage of the default header's [building blocks](/jquery/eventcalendar/templating#header-templating). These components let you put toghether the header you want, while you don't have to worry about the functionality behind them.

Check out how you can style the header in [this example](https://demo.mobiscroll.com/eventcalendar/customizing-header#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="1256" height="547" src={require('@site/static/img/normal-header-calendar.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="1256" height="547" src={require('@site/static/img/header-calendar.png').default} />
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
 2. If two or more events overlap in their start/end times, the later event is placed in the next event track, positioned below to the previous event.
 3. If a subsequent event does not overlap with any already added events, it is placed back in the first event track.
 4. This process continues until all events are positioned within their respective rows.

<div className="option-list">

## API
Here is a comprehensive list of all the specific options, events and methods of the Event Calendar view.

<div className="calendar-api-header">

### Options
</div>
Explore the following API options that help you easily configure the Event Calendar.

<Options />

<div className="calendar-api-header">

### Events
</div>
The Event Calendar ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

<div className="calendar-api-header">

### Localization
</div>
The Event Calendar is fully localized. This covers date and time format, button copy, rtl and more.

<Localizations />

<div className="calendar-api-header">

### Renderers
</div>
The display of the Event Calendar can be customized with different render functions.

<Slots />

### Types

<Types />

</div>
