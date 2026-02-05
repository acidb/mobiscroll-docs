### bufferAfter {#slot-bufferAfter}

```html
<template #bufferAfter="event">...</template>
```

Customize the buffer area that is displayed at the end of the scheduler and timeline events.
The buffer can be defined with the help of the `bufferAfter` property of the [event data](#opt-data).

The template will receive an event object as data.
Some of the event specific details are computed, but there is also a reference to the **original** event they come from.
The following event specific properties are available:
- `allDay`: _string_ - The localized all-day text in case of all day events.
- `end`: _string_ - The formatted end time, if the event is not all day.
- `id`: _string_ - The id of the event.
- `isMultiDay`: _boolean_ - True if the event spans across multiple days.
- `lastDay`: _boolean_ - True if it&#039;s rendered on the last day of a multiple event.
- `original`: _MbscCalendarEvent_ - The original event object.
- `start`: _string_ - The formatted start time, if the event is not all day.
- `title`: _string_ - The title of the event.
- `currentResource`: _string | number_ - The resource of the row or column where the event is being rendered.

### bufferBefore {#slot-bufferBefore}

```html
<template #bufferBefore="event">...</template>
```

Customize the buffer area that is displayed at the start of the scheduler and timeline events.
The buffer can be defined with the help of the `bufferBefore` property of the [event data](#opt-data).

The template will receive an event object as data.
Some of the event specific details are computed, but there is also a reference to the **original** event they come from.
The following event specific properties are available:
- `allDay`: _string_ - The localized all-day text in case of all day events.
- `end`: _string_ - The formatted end time, if the event is not all day.
- `id`: _string_ - The id of the event.
- `isMultiDay`: _boolean_ - True if the event spans across multiple days.
- `lastDay`: _boolean_ - True if it&#039;s rendered on the last day of a multiple event.
- `original`: _MbscCalendarEvent_ - The original event object.
- `start`: _string_ - The formatted start time, if the event is not all day.
- `title`: _string_ - The title of the event.
- `currentResource`: _string | number_ - The resource of the row or column where the event is being rendered.

### cell {#slot-cell}

```html
<template #cell="args">...</template>
```

Customize the cells of the Eventcalendar in scheduler and timeline views.

The template will receive an object as context, which can be used to display custom content in the cells.
Keep the cell template simple, as it will be called and rendered **very frequently** during scroll and view changes.

The object passed to the template contains the following properties:
- `colors`: _Array&lt;MbscCalendarColor&gt;_ - The list of colors for the current cell.
- `date`:  _Date_ – The current cell&#039;s date.
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the current cell.
- `invalids`: _Array&lt;MbscCalendarInvalid&gt;_ - The list of invalids for the current cell.
- `resource`: _MbscResource_ – The resource object for the current cell.
- `slot`: _MbscSlot_ - The slot object for the current cell.

### day {#slot-day}

```html
<template #day="args">...</template>
```

Customize the day cells of the calendar view and the date header in case of scheduler and timeline views.

If you are looking to customize only the day cells content and don&#039;t want to bother with the styling of the event,
in case of calendar and scheduler views you can use the [dayContent](#slot-dayContent) option.

The following day specific details are available:
- `date`: _Date_ - The date of the rendered day.
- `selected`: _boolean_ - True if the date is selected (in case of the calendar view).
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the day.
- `resource`: _string | number_ - The id of the resource in case of the scheduler (week and month views)
when the events are grouped by resources.
- `isActive`: _boolean_ - True for the current day (in case of the timeline view).

### dayContent {#slot-dayContent}

```html
<template #dayContent="args">...</template>
```

Customize the day cells content of the event calendar. The Eventcalendar will take care of the styling and you can focus on
what you show beside the day number.

If you are looking to fully customize the day (e.g. add custom hover effects) you will need to use the
[day](#slot-day) option.

The following properties are available:
 - `date`: _Date_ - The date of the rendered day.
 - `selected`: _boolean_ - True if the date is selected (in case of the calendar view).
 - `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the day.
 - `resource`: _string | number_ - The id of the resource in case of the scheduler (week and month views)
when the events are grouped by resources.

### dayFooter {#slot-dayFooter}

```html
<template #dayFooter="args">...</template>
```

Customize the footer of each day for the timeline.

The following day specific details are available:
- `date`: _Date_ - The date of the day.
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the day.

### header {#slot-header}

```html
<template #header>...</template>
```

Customize the header of the event calendar.
You can use custom markup and the built in header components of the calendar.

### hour {#slot-hour}

```html
<template #hour="args">...</template>
```

Customize the header of the hour columns on the timeline view.

The following properties are available:
- `date`: _Date_ - The date and time of the rendered hour.
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the hour.
- `isActive`: _boolean_ - True for the current hour.

### hourFooter {#slot-hourFooter}

```html
<template #hourFooter="args">...</template>
```

Customize the footer of the hour columns on the timeline view.

The following properties are available:
- `date`: _Date_ - The date and time of the rendered hour.
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the hour.
- `isActive`: _boolean_ - True for the current hour.

### month {#slot-month}

```html
<template #month="args">...</template>
```

Customize the header of the month column on the timeline view.

The following properties are available:
 - `date`: _Date_ - First day of the rendered month.
 - `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the month.
 - `isActive`: _boolean_ - True for the current month.

### monthFooter {#slot-monthFooter}

```html
<template #monthFooter="args">...</template>
```

Customize the footer of the month column on the timeline view.

The following properties are available:
 - `date`: _Date_ - First day of the rendered month.
 - `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the month.
 - `isActive`: _boolean_ - True for the current month.

### quarter {#slot-quarter}

```html
<template #quarter="args">...</template>
```

Customize the header of the quarter columns on the timeline view.

The following properties are available:
- `date`: _Date_ - First day of the rendered quarter.
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the quarter.
- `isActive`: _boolean_ - True for the current quarter.

### quarterFooter {#slot-quarterFooter}

```html
<template #quarterFooter="args">...</template>
```

Customize the footer of the quarter column on the timeline view.

The following properties are available:
- `date`: _Date_ - First day of the rendered quarter.
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the quarter.
- `isActive`: _boolean_ - True for the current quarter.

### resource {#slot-resource}

```html
<template #resource="{ resource, day }">...</template>
```

Customize how the resources are rendered on the scheduler and timeline views.

The following properties are available:
 - `resource`: _MbscResource_ - The rendered resource.
 - `day`: _Date_ - The date on which the resource is rendered.
 Available when grouping by date in the scheduler view,
 or when vertical day resolution is used in the timeline view.

### resourceEmpty {#slot-resourceEmpty}

```html
<template #resourceEmpty>...</template>
```

Customize the content of the resource column in case of an empty resource array.

### resourceFooter {#slot-resourceFooter}

```html
<template #resourceFooter>...</template>
```

Customize the cell content below the resource column on the timeline view,
when the [dayFooter](#slot-dayFooter) option is also used.

### resourceHeader {#slot-resourceHeader}

```html
<template #resourceHeader>...</template>
```

Customize the cell content above the resource column on the timeline view.

### scheduleEvent {#slot-scheduleEvent}

```html
<template #scheduleEvent="event">...</template>
```

Customize the events that appear on the scheduler and timeline.
The Eventcalendar will take care of the positioning,
but everything else (like background color, hover effect, etc.) is left to you.

If you are looking to customize only the content (e.g. add custom elements) and don&#039;t want to bother with the styling of the event,
you can use the [scheduleEventContent](#slot-scheduleEventContent) option.

Some of the event specific details are computed, but there is also a reference to the **original** event they come from.
The following event specific properties are available:
- `allDay`: _string_ - The localized all-day text in case of all day events.
- `end`: _string_ - The formatted end time, if the event is not all day.
- `id`: _string_ - The id of the event.
- `isMultiDay`: _boolean_ - True if the event spans across multiple days.
- `lastDay`: _boolean_ - True if it&#039;s rendered on the last day of a multiple event.
- `original`: _MbscCalendarEvent_ - The original event object.
- `start`: _string_ - The formatted start time, if the event is not all day.
- `title`: _string_ - The title of the event.
- `currentResource`: _string | number_ - The resource of the row or column where the event is being rendered.

### scheduleEventContent {#slot-scheduleEventContent}

```html
<template #scheduleEventContent="event">...</template>
```

Customize the event content that appears on the scheduler and timeline.
The Eventcalendar will take care of styling and you can focus on what you show inside of the event.

If you are looking to fully customize the event (e.g. add custom hover effects) you will need to use
the [scheduleEvent](#slot-scheduleEvent) option. In that case you will only get
the positioning done by the Eventcalendar and everything else is up to you.

Some of the event specific details are computed, but there is also a reference to the **original** event they come from.
The following event specific properties are available:
- `allDay`: _string_ - The localized all-day text in case of all day events.
- `end`: _string_ - The formatted end time, if the event is not all day.
- `id`: _string_ - The id of the event.
- `isMultiDay`: _boolean_ - True if the event spans across multiple days.
- `lastDay`: _boolean_ - True if it&#039;s rendered on the last day of a multiple event.
- `original`: _MbscCalendarEvent_ - The original event object.
- `start`: _string_ - The formatted start time, if the event is not all day.
- `title`: _string_ - The title of the event.
- `currentResource`: _string | number_ - The resource of the row or column where the event is being rendered.

### sidebar {#slot-sidebar}

```html
<template #sidebar="resource">...</template>
```

Add a custom sidebar on the right side of the timeline.
The object of the rendered resource is available for use.

### sidebarFooter {#slot-sidebarFooter}

```html
<template #sidebarFooter>...</template>
```

Customize the cell content below the sidebar column on the timeline view,
when the [sidebar](#slot-sidebar) option is also used.

### sidebarHeader {#slot-sidebarHeader}

```html
<template #sidebarHeader>...</template>
```

Customize the cell content above the sidebar column on the timeline view,
when the [sidebar](#slot-sidebar) option is also used.

### slot {#slot-slot}

```html
<template #slot="args">...</template>
```

Customize the [slots](#opt-slots) template of the timeline view.

The following properties are available:
- `date`: _Date_ - The specific date where the slot is rendered.
- `slot`: _MbscSlot_ - The object of the rendered slot.

### week {#slot-week}

```html
<template #week="args">...</template>
```

Customize the header of the week column on the timeline view.

The following properties are available:
 - `date`: _Date_ - First day of the rendered week.
 - `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the week.
 - `isActive`: _boolean_ - True for the current week.
 - `endDate`: _Date_ - The end date of the week.
 - `startDate`: _Date_ - The start date of the week.
 - `weekNr`: _number_ - The week number. Enumeration starts with the first week of the year.

### weekFooter {#slot-weekFooter}

```html
<template #weekFooter="args">...</template>
```

Customize the footer of the week column on the timeline view.

The following properties are available:
 - `date`: _Date_ - First day of the rendered week.
 - `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the week.
 - `isActive`: _boolean_ - True for the current week.
 - `endDate`: _Date_ - The end date of the week.
 - `startDate`: _Date_ - The start date of the week.
 - `weekNr`: _number_ - The week number. Enumeration starts with the first week of the year.

### year {#slot-year}

```html
<template #year="args">...</template>
```

Customize the header of the year column on the timeline view.

The following properties are available:
 - `date`: _Date_ - First day of the rendered year.
 - `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the year.
 - `isActive`: _boolean_ - True for the current year.

### yearFooter {#slot-yearFooter}

```html
<template #yearFooter="args">...</template>
```

Customize the footer of the year column on the timeline view.

The following properties are available:
 - `date`: _Date_ - First day of the rendered year.
 - `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the year.
 - `isActive`: _boolean_ - True for the current year.
