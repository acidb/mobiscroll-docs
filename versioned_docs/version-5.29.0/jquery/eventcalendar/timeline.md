---
sidebar_position: 5
sidebar_label: Timeline
displayed_sidebar: jquerySidebar
---

import Options from '../\_auto-generated/eventcalendar/options_timeline.md';
import Events from '../\_auto-generated/eventcalendar/events_timeline.md';
import Localizations from '../\_auto-generated/eventcalendar/localizations_timeline.md';
import Slots from '../_auto-generated/eventcalendar/renderers_timeline.md';
import { ImgComparisonSlider } from '@img-comparison-slider/react';

# Timeline

Use the [Timeline view](https://demo.mobiscroll.com/timeline) which features a horizontally scrollable view with multiple resource support for [day, week, work-week, month and year view](https://demo.mobiscroll.com/timeline/multiple-days-weeks-months-quarters-years-variable-resolution) with built in [templating](#templating), [drag & drop](https://demo.mobiscroll.com/timeline/move-resize-drag-drop-to-create-events) and more.

## Overview

This Timeline view displays a timeline with its related events. You can render the [times/days horizontally and the resources vertically](https://demo.mobiscroll.com/timeline/timeline-time-grid). The Timeline can easily accommodate a [large number of resources](https://demo.mobiscroll.com/timeline/loading-big-data-sets) thanks to the vertical scroll that is easy to understand for users. This plays well on larger screens and in landscape containers. [Work hours and work days](https://demo.mobiscroll.com/timeline/switching-day-week-work-week-timeline) along with [disabled time-spans, breaks](https://demo.mobiscroll.com/timeline/colors-invalids-css-class) can be added. Use it to for [advanced tasks](https://demo.mobiscroll.com/timeline/restaurant-shift-management) with built-in drag & drop.

By default the Timeline rows will have variable height and will expand to accommodate the displayed events. But, this can be changed by the `rowHeight` property of the [Timeline view](##opt-view) option. [If it is set to equal](https://demo.mobiscroll.com/timeline/timeline-resource-height), the rows will have equal heights, and overlapping events will be distributed evenly to fit in the row.

Also, the `eventList` [property](##opt-view) transforms the event display into a [daily listing mode](https://demo.mobiscroll.com/timeline/event-listing). This view represents a daily summary rather than an hour-by-hour layout.

The capabilities like [recurring events](/jquery/core-concepts/recurrence), [all-day, multi-day events](#opt-data), [responsiveness](#responsiveness) are supported by the Timeline.

![Timeline overview](/img/timeline-overview.png)

## Showing the Timeline

### Configuring the view

The Timeline view can be configured through the `view` option. Below are listed the `timeline` object properties which can help you fine-tune this view.

```javascript title='Example'
$('#timeline').mobiscroll().eventcalendar({
  view: {
    timeline: {
      maxEventStack: 2,
      eventList: true,
      resolutionHorizontal: 'day',
      type: 'week'
    }
  }
});
```

<div className="option-list no-padding">

<h3 id="opt-view">view</h3>

MbscEventcalendarView

</div>

`timeline`: Configures the timeline view. Properties:
- `type`: *&#039;day&#039; | &#039;week&#039; | &#039;month&#039; | &#039;year&#039;* (default `'week'`) - Sets the timeline type.
- `size`: *number* (default: `1`)- Specifies the number of displayed years, months, weeks or days.
- `resolutionHorizontal`: *&#039;hour&#039;, &#039;day&#039;, &#039;week&#039;, &#039;month&#039;, &#039;quarter&#039;, &#039;year&#039;* (default &#039;hour&#039;) -
  Sets the horizontal resolution of the timeline.
  In case of hourly resolution, the columns can be split to minutes (1, 5, 15, 20, 30) or merge to multiple
  hours (2, 3, 4, 6, 8, 12) using the `timeCellStep` and `timeLabelStep` properties.
- `currentTimeIndicator`: *boolean* - Show or hide the current time indicator.
  Defaults to `true`, when the horizontal resolution is less than a day.
- `startDay`: *number* (default `0`) - Specifies the first visible weekday of the view. Sunday is 0, Monday is 1, etc.
  Days outside of the `startDay` and `endDay` range will not be visible.
  Should not be mistaken for the [firstDay](#localization-firstDay) option,
  which sets the first day of the week, and, if not set, is defined by the [localization](#localization-locale).
- `endDay`: *number* (default `6`) - Specifies the last visible weekday of the view. Sunday is 0, Monday is 1, etc.
- `maxEventStack`: *&#039;all&#039; | number* - Limit the number of displayed events. When the number of overlapping events reaches
  the specified value, a &quot;more&quot; button will be displayed which opens a popover showing the rest of the events.
    - If it is a `number`, it specifies how many events will be displayed before the &quot;more&quot; button appears.
    - If set to `'all'`, all events will be displayed.
- `startTime`: *string* (default `'00:00'`) - Set the start time of the timeline days.
  Hours and minutes can be specified in the same string, example: `'09:30'`.
- `endTime`: *string* (default `'24:00'`) - Set the end time of the timeline days.
  Hours and minutes can be specified in the same string, example: `'18:30'`.
- `timeCellStep`: *number* (default `60`) - Set the step of the grid cells in minutes.
  Supported values: 1, 5, 10, 15, 20, 30, 60, 120, 180, 240, 360, 480, 720, 1440.
- `timeLabelStep`: *number* (default `60`) - Set the step of the time labels in minutes.
  Supported values: 1, 5, 10, 15, 20, 30, 60, 120, 180, 240, 360, 480, 720, 1440.
- `eventList`: *boolean* (default `false`) - If `true`, transforms the layout into a summary view.
  The events are listed in the appropriate cell one after the other.
- `rowHeight`: *&#039;variable&#039; | &#039;equal&#039;* (default &#039;variable&#039;) - Controls the height of the timeline rows.
  By default rows will have variable height and will expand to accommodate the displayed events.
  If it is set to `'equal'`, the rows will have equal heights.
- `virtualScroll`: *boolean* (default `true`) - Enable or disable virtual scroll.
- `weekNumbers`: *boolean* (default `false`) - Show or hide week numbers.

### Event slots

Besides the [`resources`](#opt-resources) which are grouping data for the whole date range, [`slots`](#opt-slots) introduce a horizontal daily grouping in case of the Timeline view. Slots can be used alongside resources.

The [renderSlot](#renderer-renderSlot) function can be used to customize the slot template of the Timeline view.

When [slots are used](https://demo.mobiscroll.com/timeline/employee-shifts) the Timeline view will display in daily listing mode and only the [`dragToMove`](#opt-dragToMove) event iteraction will be available. The [`dragToCreate`](#opt-dragToCreate) and [`dragToResize`](#opt-dragToResize) interactions will be truned off.

```javascript title="Slots used for work shift management"
$('#timeline').mobiscroll().eventcalendar({
  slots: [
    {
      id: 1,
      name: "Morning shift",
    },
    {
      id: 2,
      name: "Afternoon shift",
    },
  ]
});
```

![Timeline slots](https://mobiscroll.com/Content/img/docs/timeline-slots.png)

### Column width

Setting the Timeline grid column widths can be done with the following css rule:

```css
.mbsc-timeline-header-column,
.mbsc-timeline-column {
  width: 3em;
}
```

:::caution
You need to apply these rules after the mobiscroll default rules, otherwise the default rules will take precedence over them.
:::

## Resources

### Resource grouping and hierarchy

The Timeline view supports resource hierarchy. [Hierarchy groups](https://demo.mobiscroll.com/timeline/resource-grouping-hierarchy) can be defined with the `children` property of the `resource` [object](#opt-resources). Child objects are also resources and have the same properties, thus they can also have children.

```js title="Multi-level hierarchy groups"
$('#timeline').mobiscroll().eventcalendar({
  resources: [{
    name: 'Site 1',
    children: [{
      name: 'Building 1'
      children: [{
        name: 'Room 1'
      }, {
        name: 'Room 2'
      }]
    }, {
        name: 'Building 2'
    }]
  }, {
    name: 'Site 2',
    children: [{
      name: 'Building A'
    }]
  }]
});
```

By default every resource group will be displayed and this can be modified with the `collapsed` attribute of the parent objects.

```js title="Collapsed groups"
$('#timeline').mobiscroll().eventcalendar({
  resources: [{
    name: 'Main Building',
    id: 'main',
    description: 'Used the most for scheduling'
    collapsed: true,
    children: [{
      name: 'Big conf. room'
      id: 'bfg',
    }, {
      name: 'Smaller conf. room'
      id: 'sfg',
    }]
  }, {
    name: 'Secondary Building',
    id: 'sec',
    description: 'For smaller, less important meetings'
    collapsed: false,
    children: [...]
  }, {
    name: 'Long forgotten Cave',
    id: 'cave',
    description: 'Where developers used to work'
    collapsed: false,
  }]
})
```

Both parent and child rows can contain events and events can be moved between any rows.

```js title="Resources & events"
$('#timeline').mobiscroll().eventcalendar({
  resources: [{
      name: 'Main Building',
      id: 'main',
      children: [{
        name: 'Big conf. room'
        id: 'bfg',
      }]
    }, {
      name: 'Secondary Building',
      id: 'sec',
    }],
  data: [
    { title: 'Open day celebration', resource: 'main', date: '2023-08-24'},
    { title: 'Monthly staff meeting', resource: 'bfg', start: '2023-08-01T11:00', end: '2023-08-01T11:00' },
    { title: 'Weekly chit-chat', resource: 'sec', start: '2023-08-02T09:00', end: '2023-08-02T09:40' },
    ...
  ]
});
```

Child or parent rows can be disabled by creating an [invalid rule](#opt-invalid) which repeats daily and it is tied to the specific resources. Example:

```js title="Disable parent and/or child resources"
$('#timeline').mobiscroll().eventcalendar({
  invalid: [
    {
      recurring: { repeat: "daily" },
      resource: [
        /* resource id(s) */
      ],
    },
  ]
});
```

### Resource column width

The width of the resources column on the Timeline view is fixed. It can be overwritten from CSS using the following rules:

```css title="Custom resource column width"
.mbsc-timeline-resource-col {
  width: 200px;
}

/* For sticky event labels */
@supports (overflow: clip) {
  .mbsc-timeline.mbsc-ltr .mbsc-schedule-event-inner {
    left: 200px;
  }

  .mbsc-timeline.mbsc-rtl .mbsc-schedule-event-inner {
    right: 200px;
  }
}
```

### Resource row height

There are three CSS classes which can be used for [changing the height of resource rows](https://demo.mobiscroll.com/timeline/setting-row-height).

1. For setting the resource row heights in general, you can use the `.mbsc-timeline-row` class.

   ```css
   .mbsc-timeline-row {
     height: 80px;
   }
   ```

2. For setting the height of the parent resources, you can use the `.mbsc-timeline-parent` class.

   ```css
   .mbsc-timeline-parent {
     height: 30px;
   }
   ```

   :::info
   There's minimum height of the rows which can only be decreased if the event creation is disabled on the relevant resource. You can prevent event creation by using the `eventCreation` property of the the [`resources`](#opt-resources) option.
   :::

3. For customizing the remaining empty space below the events, you can use the `.mbsc-timeline-row-gutter` class.

   ```css
   .mbsc-timeline-row-gutter {
     height: 6px;
   }
   ```

## Event connections

The Timeline view can [display connections between events](https://demo.mobiscroll.com/timeline/connecting-linking-events-arrows). Events will be linked with lines and additionally arrows can be displayed to illustrate the direction of the connection. Events can have multiple connections simultaneously. Connections can be specified with the [`connections`](#opt-connections) option.

![Timeline event connections](https://mobiscroll.com/Content/img/docs/event-connections.png)

## Responsiveness

The Timeline is fully responsive. It adapts to the available space and fills the screen to look good everywhere. While you don't have to worry about the width the height can be manually adjusted with the [height](#opt-height) option. This specifies different options for different container widths, in a form of an object, where the keys are the name of the breakpoints, and the values are objects containing the options for the given breakpoint.

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
$('#timeline').mobiscroll().eventcalendar({
  responsive: {
    xsmall: {
      view: { timeline: { type: 'day', size: 2 }}
    },
     medium: {
      view: {
        timeline: { type: 'week' }
      }
    },
    custom: { // Custom breakpoint
      breakpoint: 1000,
      view: { timeline: { type: 'month' }}
    }
  }
});
```

![Timeline responsive behavior](/img/timeline-responsive.gif)

## Templating
The display of Timeline can be customized with different [render functions](#renderers).

### The resource, their header and footer
There are three approaches you can take:
- Use the [renderResource](#renderer-renderResource) option to customize the resource template of the Timeline. Customize how the resource headers look and what they show. Utilize properties passed in the [resources](#opt-resources) array. It takes a function that should return the desired markup. In the returned markup, you can use custom html as well.
- Customize the empty cell content above the resource column with the [renderResourceHeader](#renderer-renderResourceHeader) option. It takes a function that should return the desired markup. In the returned markup, you can use custom html as well.
- Or if you want to customize the empty cell content below the resource column you can achieve this with the [renderResourceFooter](#renderer-renderResourceFooter) option. It takes a function that should return the desired markup. In the returned markup, you can use custom html as well. This element only renders for the Timeline view, if the [renderDayFooter](#renderer-renderDayFooter) option is present.

Check out how you can style these resource parts in [this example](https://demo.mobiscroll.com/timeline/timeline-resource-details-side-panel-footer#) or just play with the slider below to see the differences.

 <ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="100%" src={require('@site/static/img/normal-resource-header-footer-timeline.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="100%" src={require('@site/static/img/resource-header-footer-timeline.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

### The sidebar, their header and footer
Besides the resource template, an additional sidebar can be rendered on the opposite end of the row and there are three approaches you can take:
- Use the [renderSidebar](#renderer-renderSidebar) option to render a custom sidebar on the right side of the Timeline. It takes a function that should return the desired markup. In the returned markup, you can use custom html as well. The template will receive the resource object as data. This data can be used to show resource specific things on the sidebar.
- Customize the empty cell content above the sidebar column with the [renderSidebarHeader](#renderer-renderSidebarHeader) option. It takes a function that should return the desired markup. In the returned markup, you can use custom html as well. This element only renders for the Timeline view, if the [renderSidebar](#renderer-renderSidebar) option is present.
- Or if you want to customize the empty cell content below the sidebar column you can achieve this with the [renderSidebarFooter](#renderer-renderSidebarFooter) option. It takes a function that should return the desired markup. In the returned markup, you can use custom html as well. This element only renders for the Timeline view, if the [renderSidebar](#renderer-renderSidebar) option is present.

Check out how you can style the sidebar parts in [this example](https://demo.mobiscroll.com/timeline/timeline-resource-details-side-panel-footer#) or just play with the slider below to see the differences.

 <ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="100%" src={require('@site/static/img/normal-sidebar-header-footer-timeline.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="100%" src={require('@site/static/img/sidebar-header-footer-timeline.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

### The date header and footer

The headers hold key information like the date, day of the week and in some cases it also holds the full date. Whenever you need to show extra information, or if you would like to change the styling or date format, time format you can use the various header templates, depending on the view configuration. You can also show a footer element, for displaying more information.

Depending on the resolution, the first Timeline row under the navigation header can show a line for each of the following:

#### Hourly header/footer template
With an hourly (or sub-hourly) resolution the [renderHour](#renderer-renderHour) and [renderHourFooter](#renderer-renderHourFooter) options can be used for customizing the header and footer.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="100%" src={require('@site/static/img/normal-hourly-header-timeline.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="100%" src={require('@site/static/img/hourly-header-timeline.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

#### Daily header/footer template
With a daily resolution, the [renderDay](#renderer-renderDay) and [renderDayFooter](#renderer-renderDayFooter) options can come in handy for customizing the header and footer.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="100%" src={require('@site/static/img/normal-daily-header-timeline.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="100%" src={require('@site/static/img/daily-header-timeline.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

#### Weekly header/footer template
When the resolution is weekly, the [renderWeek](#renderer-renderWeek) and [renderWeekFooter](#renderer-renderWeekFooter) options can be used.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="100%" src={require('@site/static/img/normal-weekly-header-timeline.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="100%" src={require('@site/static/img/weekly-header-timeline.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

#### Monthly header/footer template
When displaying multiple months, the [renderMonth](#renderer-renderMonth) and [renderMonthFooter](#renderer-renderMonthFooter) options can be used for customizing the header and footer per month.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="100%" src={require('@site/static/img/normal-monthly-header-template.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="100%" src={require('@site/static/img/monthly-header-template.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

#### Quarter header/footer template
When displaying multiple quarters, the [renderQuarter](#renderer-renderQuarter) and [renderQuarterFooter](#renderer-renderQuarterFooter) options can be used for customizing the header and footer per quarter.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="100%" src={require('@site/static/img/normal-quarter-header-timeline.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="100%" src={require('@site/static/img/quarter-header-timeline.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

#### Yearly header/footer template
With a yearly resolution, the [renderYear](#renderer-renderYear) and [renderYearFooter](#renderer-renderYearFooter) options can be used for customizing the header and footer.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="100%" src={require('@site/static/img/normal-yearly-header-timeline.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="100%" src={require('@site/static/img/yearly-header-timeline.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

Check out how you can style the date header and footer in [this example](https://demo.mobiscroll.com/timeline/hour-day-week-month-quarter-year-header-footer-template#) or just play with the sliders above to see the differences.

### The event and buffer areas
You can use the [renderScheduleEvent](#renderer-renderScheduleEvent) option to customize the events that appear on the scheduler. It should return the markup of the event. The Eventcalendar will take care of the positioning, but anything else you want to show is up to you - like a title, description, color the background or show any content.

The buffers can be customized through the [renderBufferBefore](#renderer-renderBufferBefore) and [renderBufferAfter](#renderer-renderBufferAfter) options. These can help you visualise delays or added minutes for tasks. For example travel time for meetings/appointments, check in/check out for flights.

Check out how you can style the events and the buffer areas in [this example](https://demo.mobiscroll.com/timeline/timeline-custom-event-rendering#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
    <figure slot="first" className="before">
        <img width="100%" src={require('@site/static/img/normal-event-buffer-templating-timeline.png').default} />
        <figcaption>Default template</figcaption>
    </figure>
    <figure slot="second" className="after">
        <img width="100%" src={require('@site/static/img/event-buffer-templating-timeline.png').default} />
        <figcaption>Custom template</figcaption>
    </figure>
    <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
        <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
    </svg>
</ImgComparisonSlider>

### The event content
If you are looking to customize only the content and don't want to bother with the styling of the event, you can use the [renderScheduleEventContent](#renderer-renderScheduleEventContent) option. Mobiscroll will position the event to the right place and will render essential information like the color of the event, the time and if it's an all day event or not. The title, description and any other fields you want to show (like participants or an avatar) will be coming from your custom function.

Check out how you can style the event content in [this example](https://demo.mobiscroll.com/timeline/meal-planner#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
    <figure slot="first" className="before">
        <img width="100%" src={require('@site/static/img/normal-event-content-timeline.png').default} />
        <figcaption>Default template</figcaption>
    </figure>
    <figure slot="second" className="after">
        <img width="100%" src={require('@site/static/img/event-content-timeline.png').default} />
        <figcaption>Custom template</figcaption>
    </figure>
    <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
        <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
    </svg>
</ImgComparisonSlider>

### The event slots
Use the [renderSlot](#renderer-renderSlot) option to customize the slot template of the Timeline view. Customize how the time slots look and what they show. Utilize properties passed in the [slots](#opt-slots) array. It takes a function that should return the desired markup. In the returned markup, you can use custom html as well.

Check out how you can style the slots in [this example](https://demo.mobiscroll.com/timeline/shift-template#) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
    <figure slot="first" className="before">
        <img width="100%" src={require('@site/static/img/normal-slot-template-timeline.png').default} />
        <figcaption>Default template</figcaption>
    </figure>
    <figure slot="second" className="after">
        <img width="100%" src={require('@site/static/img/slot-template-timeline.png').default} />
        <figcaption>Custom template</figcaption>
    </figure>
    <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
        <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
    </svg>
</ImgComparisonSlider>

### The timeline header
Customize how the header of the Timeline looks and how the components are arranged with the [renderHeader](#renderer-renderHeader) option. It takes a function that should return the desired markup. In the returned markup, you can use custom html as well as the built in header components of the calendar.

While fully customizing the header is very usefull, sometimes it's desireable to customize only parts of it. In this case you can take advantage of the default header's [building blocks](/jquery/eventcalendar/templating#header-templating). These components let you put toghether the header you want, while you don't have to worry about the functionality behind them.

Check out how you can style the Timeline header in [this example](https://demo.mobiscroll.com/timeline/switching-day-week-work-week-timeline) or just play with the slider below to see the differences.

<ImgComparisonSlider className="slider-example-split-line slider-with-animated-handle">
  <figure slot="first" className="before">
    <img width="100%" src={require('@site/static/img/normal-header-template-timeline.png').default} />
    <figcaption>Default template</figcaption>
  </figure>
  <figure slot="second" className="after">
    <img width="100%" src={require('@site/static/img/header-template-timeline.png').default} />
    <figcaption>Custom template</figcaption>
  </figure>
  <svg slot="handle" className="custom-animated-handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6">
    <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" strokeWidth="1" fill="#011742" vectorEffect="non-scaling-stroke"></path>
  </svg>
</ImgComparisonSlider>

<div className="option-list">

## API
Here is a comprehensive list of all the specific options, events and methods of the Timeline view.

<div className="calendar-api-header">

### Options
</div>
Explore the following API options that help you easily configure the Timeline.

<Options />

<div className="calendar-api-header">

### Events
</div>
The Timeline ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

<div className="calendar-api-header">

### Localization
</div>
The Timeline is fully localized. This covers date and time format, button copy, rtl and more.

<Localizations />

<div className="calendar-api-header">

### Renderers
</div>
The display of the Timeline can be customized with different render functions.

<Slots />

</div>
