---
sidebar_position: 3
sidebar_label: Agenda
displayed_sidebar: angularSidebar
---

import Options from '../\_auto-generated/eventcalendar/options_agenda.md';
import Events from '../\_auto-generated/eventcalendar/events_agenda.md';
import Localizations from '../\_auto-generated/eventcalendar/localizations_agenda.md';
import Slots from '../_auto-generated/eventcalendar/renderers_agenda.md';
import Types from '../_auto-generated/eventcalendar/types_agenda.md';
import { ImgComparisonSlider } from '@img-comparison-slider/react';

# Agenda

The [Agenda](https://demo.mobiscroll.com/agenda) displays a [list of events for a given period of time](https://demo.mobiscroll.com/agenda/daily-weekly-monthly-annual-agenda#) (year, month, week or day). It can be used as a [standalone component](https://demo.mobiscroll.com/agenda/full-event-customization#) or in [combination with the calendar](https://demo.mobiscroll.com/agenda/navigate-from-external-calendar#).

## Overview

The agenda supports a [configurable range listing](https://demo.mobiscroll.com/agenda/daily-weekly-monthly-annual-agenda#) along with daily, monthly and yearly presets.

The capabilities like [recurring events](/angular/core-concepts/recurrence), [all-day, multi-day events](#opt-data), [responsiveness](#responsiveness) are supported by agenda.

![Agenda overview](/img/agenda-overview.png)

## Showing the Agenda

### View combination

The four views - [scheduler](./scheduler), [calendar](./calendar), [timeline](./timeline), [agenda](./agenda) - can be used alone or combined with each-other to create the perfect user experience on mobile, desktop and on everything in-between.

For example, you can combine [a daily agenda with a weekly calendar](https://demo.mobiscroll.com/agenda/daily-agenda-with-week-calendar#) for listing the events for the selected day. The view option will look like the following:

```html title='Daily Agenda combined with Weekly Calendar'
<mbsc-eventcalendar [view]="myView"></mbsc-eventcalendar>
```
```ts
import { MbscEventcalendarView } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  myView: MbscEventcalendarView = {
    calendar: { type: 'week' },
    agenda: { type: 'day' }
  };
}
```

### Configuring the view

The Agenda view can be configured through the `view` option. Below are listed the `agenda` object properties which can help you fine-tune this view.

```html title="Example"
<mbsc-eventcalendar [view]="myView"></mbsc-eventcalendar>
```
```ts
import { MbscEventcalendarView } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  myView: MbscEventcalendarView = {
    agenda: { type: 'day', size: 2 }
  };
}
```

<div className="option-list no-padding">

<h3 id="opt-view">view</h3>

MbscEventcalendarView

</div>

`agenda`: Configures the agenda view. Properties:
- `type`: *&#039;day&#039; | &#039;week&#039; | &#039;month&#039; | &#039;year&#039;* (default `'month'`) - Sets the agenda type.
  If calendar is also displayed, only `'month'`, `'week'` and `'day'` values are supported.
  In case of month and week, the type and size should match the calendar type and size.
  In case of day type events on the selected calendar day will be displayed, so size will always be `1`.
- `size`: *number* (default `1`) - Specifies the number of displayed years, months, weeks or days.
- `scrollable`: *boolean* (default `true`) - Setting this to `true` makes the agenda independently scrollable.
  :::info
  There are two prerequisites for making this work:

  1 - The calendar needs to be to placed inside a container which has a height. This can be either a fixed height,
  a height in percentage, or a flex height. When the calendar is placed directly in a container with a fixed height,
  it will work out of the box. If the height of the container is specified in percentage,
  e.g. you&#039;d like to fill the full page height, you need to make sure that all parent elements also have `'height: 100%'` specified,
  up until the `body` and `html` elements, or until the closest parent which has a fixed height.
  If the container is inside a parent with flex layout, it will also work out of the box.

  2 - The agenda needs a minimum height of 200px - the result of the container height
  minus the height of the calendar header minus the height of the displayed calendar rows.
  If the calculated height is less then 200px, the agenda will not be scrollable.
  :::

## Responsiveness

The agenda is [fully responsive](https://demo.mobiscroll.com/eventcalendar/responsive-month-view). It adapts to the available space and fills the screen to look good everywhere. While you don't have to worry about the width the height can be manually adjusted with the [height](#opt-height) option. This specifies different options for different container widths, in a form of an object, where the keys are the name of the breakpoints, and the values are objects containing the options for the given breakpoint.

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
<mbsc-eventcalendar [responsive]="responsiveSettings"></mbsc-eventcalendar>
```

```ts
import { MbscEventcalendarOptions } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  responsiveSettings: MbscEventcalendarOptions = {
    xsmall: {
      view: {
        agenda: { type: 'week' }
      }
    },
    medium: {
      view: {
        calendar: { type: 'week' },
        agenda: { type: 'day' }
      }
    },
    custom: { // Custom breakpoint
      breakpoint: 1000,
      view: {
        calendar: { type: 'month' },
        agenda: { type: 'month' }
      }
    }
  }
}
```

![Agenda responsive behavior](/img/agenda-responsive.gif)

## Templating
The display of Agenda can be customized with different [templating functions](#templates).

### The event
Customize the events that appear on the agenda with the[eventTemplate](#template-eventTemplate) option. It should return the markup of the event. The event calendar will take care of the positioning, but everything else (like background color, hover effect, etc.) is left to you.

Check out how you can style events in [this example](https://demo.mobiscroll.com/angular/agenda/full-event-customization#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="1256" height="891" src={require('@site/static/img/normal-event-templating-agenda.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="1256" height="891" src={require('@site/static/img/event-templating-agenda.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

### The event content
Customize the event content that appears on the agenda by using the [eventContentTemplate](#template-eventContentTemplate) option. The event calendar will take care of styling and you can focus on what you show inside of the event.

Check out how you can style event content in [this example](https://demo.mobiscroll.com/angular/agenda/event-content-customization#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="1256" height="528" src={require('@site/static/img/normal-event-content-template-agenda.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="1256" height="528" src={require('@site/static/img/event-content-templating-agenda.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

### The agenda header
Customize how the header of the event calendar looks and how the components are arranged with the [headerTemplate](#template-headerTemplate) option. It takes a function that should return the desired markup. In the returned markup, you can use custom html as well as the built in header components of the calendar.

While fully customizing the header is very usefull, sometimes it's desireable to customize only parts of it. In this case you can take advantage of the default header's [building blocks](/angular/eventcalendar/templating#header-templating). These components let you put toghether the header you want, while you don't have to worry about the functionality behind them.

Check out how you can style the header in [this example](https://demo.mobiscroll.com/angular/agenda/customizing-header#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="1241" height="622" src={require('@site/static/img/normal-header-templating-agenda.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="1241" height="622" src={require('@site/static/img/header-templating-agenda.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

### The agenda empty state
Customize the look of the empty state through [agendaEmptyTemplate](#template-agendaEmptyTemplate) function. Give a more purposeful feedback to the user and optionally add further actions to it. The template can be totally custom or dynamic based on any criteria.

Check out how you can style the empty state in [this example](https://demo.mobiscroll.com/angular/agenda/empty-state#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="1256" height="605" src={require('@site/static/img/normal-empty-state-agenda.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="1256" height="605" src={require('@site/static/img/empty-state-agenda.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

## Event order

When rendering events, the following default order is applied:

 - All-day events are placed at the top.
 - Non-all-day events follow, sorted by their start times.
 - Events with the same start time are ordered alphabetically by their titles.

To modify the default event order, you can use the `order` property of the [event data](#opt-data). If the order property does not meet your requirements, the [eventOrder](#opt-eventOrder) option can be used to further customize the ordering, which expects a function that compares two events and returns an order (-1 or 1).

<div className="option-list">

## API
Here is a comprehensive list of all the specific options, events and methods of the Agenda view.

<div className="calendar-api-header">

### Options
</div>
Explore the following API options that help you easily configure the Agenda.

<Options />

<div className="calendar-api-header">

### Events
</div>
The Agenda ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

<div className="calendar-api-header">

### Localization
</div>
The Agenda is fully localized. This covers date and time format, button copy, rtl and more.

<Localizations />

<div className="calendar-api-header">

### Templates
</div>
The display of the Agenda can be customized with different templating functions.

<div className="option-list-templates">

<Slots />

</div>

### Types

<Types />

</div>