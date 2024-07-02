---
sidebar_position: 2
sidebar_label: Calendar
displayed_sidebar: jquerySidebar
---

import Options from '../\_auto-generated/eventcalendar/options_calendarview.md';
import Events from '../\_auto-generated/eventcalendar/events_calendarview.md';
import Localizations from '../\_auto-generated/eventcalendar/localizations_calendarview.md';
import Slots from '../_auto-generated/eventcalendar/renderers_calendarview.md';

# Calendar

Use the Eventcalendar as a traditional month view or combine it with an agenda as a week view.
The events can be rendered as labels or in a popover that is shown on day click.

![Desktop calendar with labels and popover](https://docs.mobiscroll.com/Content/img/docs/desktop-calendar.png)

![Mobile month view with agenda](https://docs.mobiscroll.com//Content/img/docs/mobile-calendar.png)

## Event order

When rendering events, the following default order is applied:

 - All-day events are placed at the top.
 - Non-all-day events follow, sorted by their start times.
 - Events with the same start time are ordered alphabetically by their titles.

To modify the default event order, you can use the `order` property of the [event data](#opt-data). If the order property does not meet your requirements, the [eventOrder](#opt-eventOrder) option can be used to further customize the ordering, which expects a function that compares two events and returns an order (-1 or 1).

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
