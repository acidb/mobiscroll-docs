---
sidebar_position: 2
sidebar_label: Calendar
displayed_sidebar: vueSidebar
---

import Options from '../\_auto-generated/eventcalendar/options_calendarview.md';
import Events from '../\_auto-generated/eventcalendar/events_calendarview.md';
import Localizations from '../\_auto-generated/eventcalendar/localizations_calendarview.md';
import Slots from '../_auto-generated/eventcalendar/renderers_calendarview.md';
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

```html title='Weekly Calendar combined with Daily Agenda'
<script setup>
const myView = {
  calendar: {
    type: 'week'
  },
  agenda: {
    type: 'day'
  }

}
</script>

<template>
  <MbscEventcalendar :view="myView" />
</template>
```

### Configuring the view

The Calendar view can be configured through the `view` option. Below are listed the `calendar` object properties which can help you fine-tune this view.

```html title='Example'
<script setup>
const myView = {
  calendar: {
    labels: true,
    type: 'week',
    size: 2
  }
}
</script>

<template>
  <MbscEventcalendar :view="myView" />
</template>
```

<div className="option-list no-padding">

<h3 id="opt-view">view</h3>

MbscEventcalendarView

</div>

`calendar`: Configures the calendar view. Properties:
- `type`: *&#039;week&#039; | &#039;month&#039; | &#039;year&#039;* (default `'month'`) - Sets the calendar type.
- `size`: *number* (default `1`) - Specifies the number of displayed weeks or months.
- `count`: *boolean* (default `false`) - If `true`, it will display the number of events on the days with events.
- `outerDays`: *boolean* (default `false`) - Show or hide days from previous and next months. Does not apply to week view.
- `labels`: *boolean | number | &#039;all&#039;* (default `true`) - Enable displaying events as labels on calendar days.
  - If set to `true`, events will be displayed in the available space.
  If there are more events for a day, than the available space,
  a label with &quot;more&quot; text will be displayed, which opens a popover showing all the events for the given day.
  To fit more events on a day, set the calendar height to an appropriate value, using the [height](#opt-height) option.
  - If set to `'all'`, all the events will be displayed in the calendar cell and
  the row height will auto-expand based on the displayed events.
  The view will became scrollable if the rows overflow the available height.
  - Specify a number to set how many events will be displayed before the &quot;more&quot; button in a calendar cell.
  The row height will auto expand until the labels count reaches the given number and after that the &quot;x more&quot; button will be displayed.
  In the case when only one event should go in the &quot;more&quot; popup, that event will be displayed in the place of the &quot;x more&quot; button.
- `popover`: *boolean* (default `undefined`) - Enable popover on days containing events. If not explicitly defined,
  the popover will not show up if an agenda view is also displayed. If event labels are displayed,
  the popover will only show up for days where the labels do not fit on the calendar, and a &quot;more&quot; label is present.
- `popoverClass`: *string* (default `undefined`) - A custom CSS class added to the popover element.
  Can be used to customize the styling of the popover.
- `scroll`: *&#039;horizontal&#039; | &#039;vertical&#039;* (default `'horizontal'`) - Specifies the direction of the calendar scroll.
- `weekNumbers`: *boolean* (default `false`) - Show or hide week numbers.

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

```html title='Responsive configuration with the view option'
<script setup>
const myResponsive = {
  xsmall: {
    view: {
      schedule: { type: 'day' }
    }
  },
  custom: { // Custom breakpoint
    breakpoint: 600,
    view: {
      schedule: { type: 'week' }
    }
  }
}
</script>

<template>
  <MbscEventcalendar
    :responsive="myResponsive"
  />
</template>
```

![Event Calendar responsive behavior](/img/event-calendar-responsive.gif)

## Templating
The display of Calendar can be customized with different [solt functions](#slots).

### The event label and their content
There are two approaches you can take:
- Customize the label contents, that appears on the calendar - for this you will want to use the [labelContent](#slot-labelContent) option. The Event Calendar will take care of styling and you can focus on what you show inside of the label.
- Customize the labels that appear on the calendar view - use the [label](#slot-label) option. The Event Calendar will take care of the positioning, but everything else (like background color, hover effect, etc.) is left to you.

Check out how you can style labels and their content in [this example](https://demo.mobiscroll.com/vue/eventcalendar/customize-label-look-and-feel#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="100%" src={require('@site/static/img/normal-label-content-calendar.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="100%" src={require('@site/static/img/label-content-calendar.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

### The event in popover and their content
The events can be customized in two ways:
- Customize the event content that appears on the popover - by using the [eventContent](#slot-eventContent) option. The Event Calendar will take care of styling and you can focus on what you show inside of the event.
- Customize the events that appear on the popover - with the [event](#slot-event) option. It should return the markup of the event. The Event Calendar will take care of the positioning, but everything else (like background color, hover effect, etc.) is left to you.

Check out how you can style events and their content in [this example](https://demo.mobiscroll.com/vue/eventcalendar/customize-event-popover#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="100%" src={require('@site/static/img/normal-event-content-calendar.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="100%" src={require('@site/static/img/event-content-calendar.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

### The event calendar header
Customize how the header of the Event Calendar looks and how the components are arranged with the [header](#slot-header) option. It takes a function that should return the desired markup. In the returned markup, you can use custom html as well as the built in header components of the calendar.

While fully customizing the header is very usefull, sometimes it's desireable to customize only parts of it. In this case you can take advantage of the default header's [building blocks](/vue/eventcalendar/templating#header-templating). These components let you put toghether the header you want, while you don't have to worry about the functionality behind them.

Check out how you can style the header in [this example](https://demo.mobiscroll.com/vue/eventcalendar/customizing-header#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="100%" src={require('@site/static/img/normal-header-calendar.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="100%" src={require('@site/static/img/header-calendar.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

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

### Slots
</div>
The display of the Event Calendar can be customized with different slot functions.

<Slots />

</div>