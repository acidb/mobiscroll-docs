---
sidebar_position: 11
sidebar_label: Templating
displayed_sidebar: javascriptSidebar
---

import { ImgComparisonSlider } from '@img-comparison-slider/react';

# Templating

You can customize many parts of the Eventcalendar by writing custom templates. In the context of plain javascript these templates are functions that return a string containing the html markup. You will find a comprehensive list of all the available render functions for the Eventcalendar in the [API templates](api#renderers) section.

## Event templating

When you want to customize how the events look, depending on what your goal is, you have two options:

1. [Customize the event content](#event-content-templating) - Mobiscroll takes care of rendering the events in the correct order and also prints basic fields, like `start`/`end`, whether it is an `allDay` event or not and also takes care of coloring the event appropriately. Everything else comes from the custom template.
2. [Customize the full event](#full-event-templating) - Mobiscroll takes care of rendering the events in the correct order, but everything else comes form the template you write.

To define a custom template, pass a functional to the apropriate option that returns the desired html:

```js title="Customizing the scheduler event contents"
mobiscroll.eventcalendar('#myDiv', {
  renderScheduleEventContent: function (theEvent) {
    return `<div>
        ${theEvent.title}
        <!-- or any content you want -->
      </div>`;
  }
});
```

### Event content templating

In most cases you only want to customize the content section of the event. In this case your template will be used as the content of the event. Mobiscroll will position the event to the right place and will render essential information like the color of the event, the time and if it's an all day event or not. The title, description and any other fields you want to show (like participants, an avatar...) will be coming from your custom template.

- For the agenda and popover - use the [`renderEventContent`](api#renderer-renderEventContent) option for the custom template
- For event labels in the calendar and all-day events in the scheduler - use the [`renderLabelContent`](api#renderer-renderLabelContent) option for the custom template
- For the scheduler and timeline - use the [`renderScheduleEventContent`](api#renderer-renderScheduleEventContent) option for the custom template

```js
mobiscroll.eventcalendar('#myDiv', {
  renderEventContent: function (theEvent) {
    // return your content here
  },
});
```
Play with the slider below to see the differences.
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

### Full event templating

In case of full event templating, whenever there is an event (in the agenda, scheduler, timeline, labels or popover) your custom template will be used instead of the default template. Mobiscroll will position your component to the right place, but anything else you want to show is up to you... like a title, description, color the background or show any content.

- For the agenda and popover - use the [`renderEvent`](api#renderer-renderEvent) option for the custom template
- For event labels in the calendar and all-day events in the scheduler - use the [`renderLabel`](api#renderer-renderLabel) option for the custom template
- For the scheduler and timeline - use the [`renderScheduleEvent`](api#renderer-renderScheduleEvent) option for the custom template

Play with the slider below to see the differences.
<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="100%" src={require('@site/static/img/normal-event-templating-scheduler.png').default} />
    <figcaption>Default</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="100%" src={require('@site/static/img/event-templating-scheduler.png').default} />
    <figcaption>Custom</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" stroke-width="1" fill="#011742" vector-effect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

## Resource templating

To customize the display of the resources, the [`renderResource`](api#renderer-renderResource) option can be used.

```js
mobiscroll.eventcalendar('#myDiv', {
  renderResource: function (resource) {
    return "<div>" + resource.name + " - " + resource.location + "</div>";
  },
});
```

:::info
In case of the timeline view there are other parts of the Eventcalendar that can be customized through templates. Check out the [timeline templating](timeline#templating) section for more details.
:::

Play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="100%" src={require('@site/static/img/normal-resource-template-scheduler.png').default} />
    <figcaption>Default</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="100%" src={require('@site/static/img/resource-template-scheduler.png').default} />
    <figcaption>Custom</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" stroke-width="1" fill="#011742" vector-effect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

## Header templating

The header of the calendar can be fully customized to one's needs with the use of the [`renderHeader`](api#renderer-renderHeader) option.

```js
mobiscroll.eventcalendar('#myDiv', {
  renderHeader: function () {
    return "<p>Any <strong>Title</strong> you want here</p>";
  },
});
```

While fully customizing the header is very usefull, sometimes it's desireable to customize only parts of it. In this case you can take advantage of the default header's building blocks. These components let you put toghether the header you want, while you don't have to worry about the functionality behind them.

For example you can leave out parts from the default header, change the order of the default buttons appearance or add custom components between them.

Here's the list of the built in components of the default header. You can initialize these by putting the attributes on the elements:

- `mbsc-calendar-prev` - Previous button component, that navigates to the previous month.
- `mbsc-calendar-next` - Next button component, that navigates to the next month.
- `mbsc-calendar-today` - Today button component, that navigates to the current date.
- `mbsc-calendar-nav` - The title navigation button component, that opens the year/month navigation.

The above components can be used inside of the custom header. The following example will render the prev and next buttons and then a custom title that is set from a custom variable (myTitle variable).

```js title="Custom header with default buttons"
mobiscroll.eventcalendar('#myDiv', {
  renderHeader: function () {
    const myTitle = 'Awesome Title';
    return `
    <div mbsc-calendar-prev></div>
    <div mbsc-calendar-next></div>
    <div class="my-custom-title">${myTitle}</div>`;
  },
});
```
Play with the slider below to see the differences.
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
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" stroke-width="1" fill="#011742" vector-effect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>
