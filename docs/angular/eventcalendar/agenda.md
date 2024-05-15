---
sidebar_position: 3
sidebar_label: Agenda
displayed_sidebar: angularSidebar
---

import Options from '../\_auto-generated/eventcalendar/options_agenda.md';
import Events from '../\_auto-generated/eventcalendar/events_agenda.md';
import Localizations from '../\_auto-generated/eventcalendar/localizations_agenda.md';
import Slots from '../_auto-generated/eventcalendar/renderers_agenda.md';
import { ImgComparisonSlider } from '@img-comparison-slider/react';

# Agenda

The agenda calendar displays a list of events for a given period of time (year, month, week or day). It can be used as a standalone component or in combination with the calendar.

![Desktop agenda](https://docs.mobiscroll.com/Content/img/docs/desktop-agenda.png)

## Configuring the view option
Below are listed the Agenda view option's properties.

```html title='Example'
<mbsc-eventcalendar
    [view]="{ agenda: { type: 'day', size: 2 } }">
</mbsc-eventcalendar>
```

<div className="option-list no-padding">

### view {#opt-view}
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

## Templating
The display of Agenda can be customized with different [templating](#templates) functions.

### Event
The events can be customized by using the [eventTemplate](#template-eventTemplate) option.

Check out how you can style events in [this example](https://demo.mobiscroll.com/angular/agenda/full-event-customization#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
    <figure slot="first" className="before">
        <img width="100%" src={require('@site/static/img/normal-event-templating-agenda.png').default} />
        <figcaption>Default</figcaption>
    </figure>
    <figure slot="second" className="after">
        <img width="100%" src={require('@site/static/img/event-templating-agenda.png').default} />
        <figcaption>Custom</figcaption>
    </figure>
    <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
        <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" stroke-width="1" fill="#011742" vector-effect="non-scaling-stroke"></path>
    </svg>
</ImgComparisonSlider>

### Event content
For content-only customization you can use the [eventContentTemplate](#template-eventContentTemplate) option.  

Check out how you can style event content in [this example](https://demo.mobiscroll.com/angular/agenda/event-content-customization#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
    <figure slot="first" className="before">
        <img width="100%" src={require('@site/static/img/normal-event-content-template-agenda.png').default} />
        <figcaption>Default</figcaption>
    </figure>
    <figure slot="second" className="after">
        <img width="100%" src={require('@site/static/img/event-content-templating-agenda.png').default} />
        <figcaption>Custom</figcaption>
    </figure>
    <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
        <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" stroke-width="1" fill="#011742" vector-effect="non-scaling-stroke"></path>
    </svg>
</ImgComparisonSlider>

### Header
Use the [headerTemplate](#template-headerTemplate) option for passing a custom header layout. 

Check out how you can style the header in [this example](https://demo.mobiscroll.com/angular/agenda/customizing-header#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
    <figure slot="first" className="before">
        <img width="100%" src={require('@site/static/img/normal-header-templating-agenda.png').default} />
        <figcaption>Default</figcaption>
    </figure>
    <figure slot="second" className="after">
        <img width="100%" src={require('@site/static/img/header-templating-agenda.png').default} />
        <figcaption>Custom</figcaption>
    </figure>
    <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
        <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" stroke-width="1" fill="#011742" vector-effect="non-scaling-stroke"></path>
    </svg>
</ImgComparisonSlider>

### Empty state
Use the [agendaEmptyTemplate](#template-agendaEmptyTemplate) function for putting your custom content together. 

Check out how you can style the empty state in [this example](https://demo.mobiscroll.com/angular/agenda/empty-state#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
    <figure slot="first" className="before">
        <img width="100%" src={require('@site/static/img/normal-empty-state-agenda.png').default} />
        <figcaption>Default</figcaption>
    </figure>
    <figure slot="second" className="after">
        <img width="100%" src={require('@site/static/img/empty-state-agenda.png').default} />
        <figcaption>Custom</figcaption>
    </figure>
    <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
        <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" stroke-width="1" fill="#011742" vector-effect="non-scaling-stroke"></path>
    </svg>
</ImgComparisonSlider>

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
The display of Event Calendar can be customized with different templating functions.

<Slots />

</div>
