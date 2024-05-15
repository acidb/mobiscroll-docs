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

## Configuring the view option
Below are listed the Calendar view option's properties.

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

<div className="option-list no-padding">

### view {#opt-view}
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
        <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" stroke-width="1" fill="#011742" vector-effect="non-scaling-stroke"></path>
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
        <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" stroke-width="1" fill="#011742" vector-effect="non-scaling-stroke"></path>
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
        <path stroke="#011742" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" stroke-width="1" fill="#011742" vector-effect="non-scaling-stroke"></path>
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

### Renderers
</div>
The display of Event Calendar can be customized with different renderer functions.

<Slots />

</div>
