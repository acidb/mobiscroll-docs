---
sidebar_position: 2
sidebar_label: Calendar
displayed_sidebar: jquerySidebar
---

import Options from '../\_auto-generated/eventcalendar/options_calendarview.md';
import Events from '../\_auto-generated/eventcalendar/events_calendarview.md';
import Localizations from '../\_auto-generated/eventcalendar/localizations_calendarview.md';
import Slots from '../_auto-generated/eventcalendar/renderers_calendarview.md';
import { ImgComparisonSlider } from '@img-comparison-slider/react';

# Calendar

Use the Eventcalendar as a traditional month view or combine it with an agenda as a week view.
The events can be rendered as labels or in a popover that is shown on day click.

![Desktop calendar with labels and popover](https://docs.mobiscroll.com/Content/img/docs/desktop-calendar.png)

![Mobile month view with agenda](https://docs.mobiscroll.com//Content/img/docs/mobile-calendar.png)

## Templating
The display of Calendar can be customized with different [renderer](#renderers) functions.

### Label and content
There are two approaches you can take:
- Only customize the content of the labels - for this you will want to use the [renderLabelContent](#renderer-renderLabelContent) option.
- Fully customize how the labels look - use the [renderLabel](#renderer-renderLabel) option.

Check out how you can style labels and their content in [this example](https://demo.mobiscroll.com/eventcalendar/customize-label-look-and-feel#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
    <figure slot="first" className="before">
        <img width="100%" src={require('@site/static/img/normal-label-content-calendar.png').default} />
        <figcaption>Default</figcaption>
    </figure>
    <figure slot="second" className="after">
        <img width="100%" src={require('@site/static/img/label-content-calendar.png').default} />
        <figcaption>Custom</figcaption>
    </figure>
    <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
        <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
    </svg>
</ImgComparisonSlider>

### Event and content
The events can be customized in two ways:
- Full event customization - by using the [renderEventContent](#renderer-renderEventContent) option
- Content customization - with the [renderEvent](#renderer-renderEvent) option

Check out how you can style events and their content in [this example](https://demo.mobiscroll.com/eventcalendar/customize-event-popover#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
    <figure slot="first" className="before">
        <img width="100%" src={require('@site/static/img/normal-event-content-calendar.png').default} />
        <figcaption>Default</figcaption>
    </figure>
    <figure slot="second" className="after">
        <img width="100%" src={require('@site/static/img/event-content-calendar.png').default} />
        <figcaption>Custom</figcaption>
    </figure>
    <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
        <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
    </svg>
</ImgComparisonSlider>

### Header
Use the [renderHeader](#renderer-renderHeader) option for passing a custom header layout.

Check out how you can style the header in [this example](https://demo.mobiscroll.com/eventcalendar/customizing-header#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
    <figure slot="first" className="before">
        <img width="100%" src={require('@site/static/img/normal-header-calendar.png').default} />
        <figcaption>Default</figcaption>
    </figure>
    <figure slot="second" className="after">
        <img width="100%" src={require('@site/static/img/header-calendar.png').default} />
        <figcaption>Custom</figcaption>
    </figure>
    <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
        <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
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

### Renderers

<Slots />

</div>
