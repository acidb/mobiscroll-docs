---
sidebar_position: 11
sidebar_label: Templating
displayed_sidebar: reactSidebar
title: Templating
---

import { ImgComparisonSlider } from '@img-comparison-slider/react';

## Overview

You can customize many parts of the Eventcalendar by writing custom templates. In React terms these templates are render functions or functional components. You will find a comprehensive list of all the available render functions for the Eventcalendar in the [API renderers](api#renderers) section.

## Event templating

When you want to customize how the events look, depending on what your goal is, you have two options:

1. [Customize the event content](#event-content-templating) - Mobiscroll takes care of rendering the events in the correct order and also prints basic fields, like `start`/`end`, whether it is an `allDay` event or not and also takes care of coloring the event appropriately. Everything else comes from the custom template.
2. [Customize the full event](#full-event-templating) - Mobiscroll takes care of rendering the events in the correct order, but everything else comes form the template you write.

To define a custom template, pass a functional component to the apropriate option:

```jsx title="Customizing the scheduler event contents"
const myScheduleEventContent = (theEvent) => {
  return <div>
      {theEvent.title}
      {/* or any content you want */}
    </div>
}

<Eventcalendar renderSchedulerEventContent={myScheduleEventContent} />
```

### Event content templating

In most cases you only want to customize the content section of the event. In this case your template will be used as the content of the event. Mobiscroll will position the event to the right place and will render essential information like the color of the event, the time and if it's an all day event or not. The title, description and any other fields you want to show (like participants, an avatar...) will be coming from your custom template.

- For the agenda - use the [`renderAgendaEventContent`](api#renderer-renderAgendaEventContent) option for the custom template
- For the popover - use the [`renderPopoverEventContent`](api#renderer-renderPopoverEventContent) option for the custom template
- For event labels in the calendar - use the [`renderCalendarEventContent`](api#renderer-renderCalendarEventContent) option for the custom template
- For the scheduler - use the [`renderSchedulerEventContent`](api#renderer-renderSchedulerEventContent) option for the custom template
- For the timeline - use the [`renderTimelineEventContent`](api#renderer-renderTimelineEventContent) option for the custom template

```jsx
const myContent = (theEvent) => {
  // your content here
}

<Eventcalendar renderAgendaEventContent={myContent} />
```

Play with the slider below to see the differences.
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

### Full event templating

In case of full event templating, whenever there is an event (in the agenda, scheduler, timeline, labels or popover) your custom template will be used instead of the default template. Mobiscroll will position your component to the right place, but anything else you want to show is up to you... like a title, description, color the background or show any content.

- For the agenda - use the [`renderAgendaEvent`](api#renderer-renderAgendaEvent) option for the custom template
- For the popover - use the [`renderPopoverEvent`](api#renderer-renderPopoverEvent) option for the custom template
- For event labels in the calendar - use the [`renderCalendarEvent`](api#renderer-renderCalendarEvent) option for the custom template
- For the scheduler - use the [`renderSchedulerEvent`](api#renderer-renderSchedulerEvent) option for the custom template
- For the timeline - use the [`renderTimelineEvent`](api#renderer-renderTimelineEvent) option for the custom template

Play with the slider below to see the differences.
<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="1920" height="950" src={require('@site/static/img/normal-event-templating-scheduler.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="1920" height="950" src={require('@site/static/img/event-templating-scheduler.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

## Resource templating

To customize the display of the resources, the [`renderResource`](api#renderer-renderResource) option can be used.

```jsx
const myResourceRenderer = (resource) => (<div>{resource.name} - {resource.location}</div>);

<Eventcalendar renderResource={myResourceRenderer} />
```

:::info
In case of the timeline view there are other parts of the Eventcalendar that can be customized through templates. Check out the [timeline templating](timeline#templating) section for more details.
:::

Play with the slider below to see the differences.

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

## Header templating

The header of the calendar can be fully customized to one's needs with the use of the [`renderHeader`](api#renderer-renderHeader) option.

```jsx
const myHeader = () => {
  return <>
    <p>Any <strong>Title</strong> you want here or</p>
    <your-custom-component yourProp="yourPropValue"></your-custom-component>
  </>
}

<Eventcalendar renderHeader={myHeader} />
```

While fully customizing the header is very usefull, sometimes it's desireable to customize only parts of it. In this case you can take advantage of the default header's building blocks. These components let you put toghether the header you want, while you don't have to worry about the functionality behind them.

For example you can leave out parts from the default header, change the order of the default buttons appearance or add custom components between them.

Here's the list of the built in components of the default header:

- `<CalendarPrev />` - Previous button component, that navigates to the previous month.
- `<CalendarNext />` - Next button component, that navigates to the next month.
- `<CalendarToday />` - Today button component, that navigates to the current date.
- `<CalendarNav />` - The title navigation button component, that opens the year/month navigation.

The above components can be used inside of the custom header. The following example will render the prev and next buttons and then a custom title that is set from a custom variable (myTitle variable).

```jsx title="Custom header with default buttons"
const myTitle = 'Awesome title';
const myHeader = () => {
  return <>
    <CalendarPrev />
    <CalendarNext />
    <div class="my-custom-title">{myTitle}</div>
  </>
}

<Eventcalendar renderHeader={myHeader} />
```
Play with the slider below to see the differences.
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