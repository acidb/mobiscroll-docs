---
sidebar_position: 11
sidebar_label: Templating
displayed_sidebar: vueSidebar
title: Templating
---

import { ImgComparisonSlider } from '@img-comparison-slider/react';

## Overview

You can customize many parts of the Eventcalendar by writing custom templates. In Vue terms these templates are called named slots. You will find a comprehensive list of all the named slots available for the Eventcalendar in the [API slots](api#slots) section.

## Event templating

When you want to customize how the events look, depending on what your goal is, you have two options:

1. [Customize the event content](#event-content-templating) - Mobiscroll takes care of rendering the events in the correct order and also prints basic fields, like `start`/`end`, whether it is an `allDay` event or not and also takes care of coloring the event appropriately. Everything else comes from the custom template.
2. [Customize the full event](#full-event-templating) - Mobiscroll takes care of rendering the events in the correct order, but everything else comes from the template you write.

To define a template, create a `<template>` tag with the `v-slot` directive or the dedicated shorthand `#` and the name of the template:

```html title="Using the v-slot directive"
<MbscEventcalendar>
  <template v-slot:scheduleEventContent>
    <!-- your content here -->
  </template>
</MbscEventcalendar>
```

```html title="Using the v-slot shorthand"
<MbscEventcalendar>
  <template #scheduleEventContent>
    <!-- your content here -->
  </template>
</MbscEventcalendar>
```

### Event content templating

In most cases you only want to customize the content section of the event. In this case your template will be used as the content of the event. Mobiscroll will position the event to the right place and will render essential information like the color of the event, the time and if it's an all day event or not. The title, description and any other fields you want to show (like participants, an avatar...) will be coming from your custom template.

- For the agenda and popover - use the [`eventContent`](api#slot-eventContent) template for the custom template
- For event labels in the calendar and all-day events in the scheduler - use the [`labelContent`](api#slot-labelContent) template for the custom template
- For the scheduler and timeline - use the [`scheduleEventContent`](api#slot-scheduleEventContent) template for the custom template

```html
<MbscEventcalendar>
  <template #eventContent="data">
    <!-- your content here -->
  </template>
</MbscEventcalendar>
```

Play with the slider below to see the differences.
<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="100%" src={require('@site/static/img/normal-event-content-template-agenda.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="100%" src={require('@site/static/img/event-content-templating-agenda.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

### Full event templating

In case of full event templating, whenever there is an event (in the agenda, scheduler, timeline, labels or popover) your custom template will be used instead of the default template. Mobiscroll will position your component to the right place, but anything else you want to show is up to you... like a title, description, color the background or show any content.

- For the agenda and popover - use the [`event`](api#slot-event) template for the custom template
- For event labels in the calendar and all-day events in the scheduler - use the [`label`](api#slot-label) template for the custom template
- For the scheduler and timeline - use the [`scheduleEvent`](api#slot-scheduleEvent) template for the custom template

Play with the slider below to see the differences.
<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="100%" src={require('@site/static/img/normal-event-templating-scheduler.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="100%" src={require('@site/static/img/event-templating-scheduler.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

## Resource templating

To customize the display of the resources, the [`resource`](api#slot-resource) slot can be used.

```html
<MbscEventcalendar>
  <template #resource="res">
    <div>{res.name} - {res.location}</div>
  </template>
</MbscEventcalendar>
```

:::info
In case of the timeline view there are other parts of the Eventcalendar that can be customized through named slots. Check out the [timeline templating](timeline#templating) section for more details.
:::

Play with the slider below to see the differences.

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

## Header templating

The header of the calendar can be fully customized to one's needs with the use of the [`header`](api#slot-header) slot.

```html
<MbscEventcalendar>
  <template #header>
    <p>Any <strong>Title</strong> you want here or</p>
    <your-custom-component :yourProp="yourPropValue"></your-custom-component>
  </template>
</MbscEventcalendar>
```

While fully customizing the header is very usefull, sometimes it's desireable to customize only parts of it. In this case you can take advantage of the default header's building blocks. These components let you put toghether the header you want, while you don't have to worry about the functionality behind them.

For example you can leave out parts from the default header, change the order of the default buttons appearance or add custom components between them.

Here's the list of the built in components of the default header:

- `<MbscCalendarPrev />` - Previous button component, that navigates to the previous month.
- `<MbscCalendarNext />` - Next button component, that navigates to the next month.
- `<MbscCalendarToday />` - Today button component, that navigates to the current date.
- `<MbscCalendarNav />` - The title navigation button component, that opens the year/month navigation.

The above components can be used inside of the custom header. The following example will render the prev and next buttons and then a custom title that is set from a custom variable (myTitle variable).

```html title="Custom header with default buttons"
<MbscEventcalendar>
  <template #header>
    <MbscCalendarPrev />
    <MbscCalendarNext />
    <div class="my-custom-title">{{myTitle}}</div>
  </template>
</MbscEventcalendar>
```
Play with the slider below to see the differences.
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
