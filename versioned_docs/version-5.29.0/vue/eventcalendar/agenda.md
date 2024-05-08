---
sidebar_position: 3
sidebar_label: Agenda
displayed_sidebar: vueSidebar
---

import Options from '../\_auto-generated/eventcalendar/options_agenda.md';
import Events from '../\_auto-generated/eventcalendar/events_agenda.md';
import Localizations from '../\_auto-generated/eventcalendar/localizations_agenda.md';
import Slots from '../_auto-generated/eventcalendar/renderers_agenda.md';
import { ImgComparisonSlider } from '@img-comparison-slider/react';

# Agenda

The agenda calendar displays a list of events for a given period of time (year, month, week or day). It can be used as a standalone component or in combination with the calendar.

![Desktop agenda](https://docs.mobiscroll.com/Content/img/docs/desktop-agenda.png)

## Templating
The display of Agenda can be customized with different [solts](#slots) functions.

### Event
The events can be customized by using the [event](#slot-event) option.

Check out how you can style events in [this example](https://demo.mobiscroll.com/vue/agenda/full-event-customization#) or just play with the slider below to see the differences.

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
For content-only customization you can use the [eventContent](#slot-eventContent) option.  

Check out how you can style event content in [this example](https://demo.mobiscroll.com/vue/agenda/event-content-customization#) or just play with the slider below to see the differences.

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
Use the [header](#slot-header) option for passing a custom header layout. 

Check out how you can style the header in [this example](https://demo.mobiscroll.com/vue/agenda/customizing-header#) or just play with the slider below to see the differences.

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
Use the [agendaEmpty](#slot-agendaEmpty) function for putting your custom content together. 

Check out how you can style the empty state in [this example](https://demo.mobiscroll.com/vue/agenda/empty-state#) or just play with the slider below to see the differences.

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

### Options

<Options />

### Events

<Events />

### Localization

<Localizations />

### Slots

<Slots />

</div>
