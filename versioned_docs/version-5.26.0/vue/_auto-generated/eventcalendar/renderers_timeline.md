### day {#slot-day}

```html
<template #day="args">...</template>
```

Customize the day cells of the calendar view and the header date container in case of schedule and timeline view.
The event calendar will take care of the positioning, but everything else (like background color, hover effect, etc.)
is left to you.

If you are looking to customize only the day cells content and don&#039;t want to bother with the styling of the event,
in case of calendar and schedule view you can use the [dayContent](#slot-dayContent) option.

The following day specific details are available:
- `date`: _Date_ - The specific date as a Date object.
- `selected`: _boolean_ - True if the date is selected. (In case of calendar view)
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events of the day.
- `resource`: _string | number_ - The id of the resource in case of scheduler(week and month views)
when the events are grouped by resources.
- `isActive`: _boolean_ - On the timeline view, this parameter will be true when rendering the current day/week/month/year.

### dayContent {#slot-dayContent}

```html
<template #dayContent="args">...</template>
```

Customize the day cells content of the event calendar. The event calendar will take care of styling and you can focus on
what you show beside the day number a.k.a the content.

If you are looking to fully customize the day (ex. add custom hover effects) you will need to use the
[day](#slot-day) option. In that case you will only get the positioning done by the event calendar and everything
else is up to you.

The following day specific details are available:
 - `date`: _Date_ - The specific date as a Date object.
 - `selected`: _boolean_ - True if the date is selected. (In case of calendar view)
 - `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events of the day.
 - `resource`: _string | number_ - The id of the resource in case of scheduler(week and month views)
when the events are grouped by resources.

### dayFooter {#slot-dayFooter}

```html
<template #dayFooter="args">...</template>
```

Customize the footer of each day for the timeline. This option is only available for the timeline.

The following day specific details are available:
- `date`: _Date_ - The specific date as a Date object.
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events of the day.

### header {#slot-header}

```html
<template #header>...</template>
```

Customize the header of the event calendar.
You can use custom html as well as the built in header components of the calendar.

### hour {#slot-hour}

```html
<template #hour="args">...</template>
```

Customize the header hour container in case of the timeline view.
The event calendar will take care of the positioning, but everything else (like background color, hover effect, etc.)
is left to you.

The following hour specific properties are available:
- `date`: _Date_ object - The specific date as a Date object.
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events of the hour.
- `isActive`: _boolean_ - On the timeline view, this parameter will be true when rendering the current day/week/month/year.

### hourFooter {#slot-hourFooter}

```html
<template #hourFooter="args">...</template>
```

Customize the footer hour container in case of the timeline view.
This options is only available for the timeline view.

The following hour specific properties are available:
- `date`: _Date_ object - The specific date as a Date object.
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events of the hour.

### month {#slot-month}

```html
<template #month="args">...</template>
```

Customize the header month container in case of the timeline view.
This options is only available for the timeline view.

The following month specific properties are available:
- `date`: _Date_ - The specific date as a Date object.
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events of the month.
- `isActive`: _boolean_ - On the timeline view, this parameter will be true when rendering the current day/week/month/year.

### monthFooter {#slot-monthFooter}

```html
<template #monthFooter="args">...</template>
```

Customize the footer month container in case of the timeline view.
This options is only available for the timeline view.

The following month specific properties are available:
- `date`: _Date_ object - The specific date as a Date object.
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events of the month.
- `isActive`: _boolean_ - On the timeline view, this parameter will be true when rendering the current day/week/month/year.

### resource {#slot-resource}

```html
<template #resource="resource">...</template>
```

Customize how the resources are rendered on the Scheduler/Timeline.
The resource object is available to help in the customization.

### resourceFooter {#slot-resourceFooter}

```html
<template #resourceFooter>...</template>
```

Customize the empty cell content below the resource column.
This option is available only for the timeline view, when the [dayFooter](#slot-dayFooter)
option is also used.

### resourceHeader {#slot-resourceHeader}

```html
<template #resourceHeader>...</template>
```

Customize the empty cell content above the resource column.
This options is only available for the timeline view.

### scheduleEvent {#slot-scheduleEvent}

```html
<template #scheduleEvent="event">...</template>
```

Customize the events that appear on the scheduler and timeline. The event calendar will take care of the positioning,
but everything else (like background color, hover effect, etc.) is left to you.

If you are looking to customize only the content (ex. add custom elements) and don&#039;t want to bother with the styling of the event,
you can use the [scheduleEventContent](#slot-scheduleEventContent) option.

Some of the event specific details are computed, but there is also a reference to the **original** event they come from.
The following event specific properties are available:
- `allDay`: _string_ - The localized all-day text in case of all day events.
- `end`: _string_ - The formatted end time, if the event is not all day.
- `id`: _string_ - The id of the event.
- `isMultiDay`: _boolean_ - True if the event spans across multiple days.
- `lastDay`: _boolean_ - True if it&#039;s rendered on the last day of a multiple event.
- `original`: _object_ - The original event object.
- `start`: _string_ - The formatted start time, if the event is not all day.
- `title`: _string_ - The title of the event.
- `currentResource`: _string | number_ - Represents the resource of the row or column where the event is being rendered.

### scheduleEventContent {#slot-scheduleEventContent}

```html
<template #scheduleEventContent="event">...</template>
```

Customize the event content that appears on the scheduler and timeline.
The event calendar will take care of styling and you can focus on what you show inside of the event a.k.a the content.

If you are looking to fully customize the event (ex. add custom hover effects) you will need to use
the [scheduleEvent](#slot-scheduleEvent) option. In that case you will only get
the positioning done by the event calendar and everything else is up to you.

Some of the event specific details are computed, but there is also a reference to the **original** event they come from.
The following event specific properties are available:
- `allDay`: _string_ - The localized all-day text in case of all day events.
- `end`: _string_ - The formatted end time, if the event is not all day.
- `id`: _string_ - The id of the event.
- `isMultiDay`: _boolean_ - True if the event spans across multiple days.
- `lastDay`: _boolean_ - True if it&#039;s rendered on the last day of a multiple event.
- `original`: _object_ - The original event object.
- `start`: _string_ - The formatted start time, if the event is not all day.
- `title`: _string_ - The title of the event.
- `currentResource`: _string | number_ - Represents the resource of the row or column where the event is being rendered.

### sidebar {#slot-sidebar}

```html
<template #sidebar="resource">...</template>
```

Add a custom sidebar on the right side of the timeline.
This options is only available for the timeline view.

The resource object is available to help in resource specific customizations.

### sidebarFooter {#slot-sidebarFooter}

```html
<template #sidebarFooter>...</template>
```

Customize the empty cell content below the sidebar column.
This options is available only for the timeline view, if the [sidebar](#slot-sidebar) option
is also used.

### sidebarHeader {#slot-sidebarHeader}

```html
<template #sidebarHeader>...</template>
```

Customize the empty cell content above the sidebar column.
This options is available only for the timeline view, if the [sidebar](#slot-sidebar) option
is also used.

### slot {#slot-slot}

```html
<template #slot="args">...</template>
```

Customize the [slots](#opt-slots) template of the Timeline view.

The following details are available to help in the customization:
- `date`: _Date_ - The specific date where the slot is rendered.
- `slot`: _object_ - Data of the rendered slot.

### week {#slot-week}

```html
<template #week="args">...</template>
```

Customize the header week container in case of the timeline view.
The event calendar will take care of the positioning,
but everything else (like background color, hover effect, etc.) is left to you.

The following week specific properties are available:
 - `date`: _Date_ - The specific date as a Date object.
 - `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events of the week.
 - `isActive`: _boolean_ - On the timeline view, this parameter will be true when rendering the current day/week/month/year.
 - `endDate`: _Date_ - The end date of the week as a Date object
 - `startDate`: _Date_ - The start date of the week as a Date object
 - `weekNr`: _number_ - The week count. Enumeration starts with the first week of the year.

### weekFooter {#slot-weekFooter}

```html
<template #weekFooter="args">...</template>
```

Customize the footer week container in case of the timeline view.
This options is only available for the timeline view.

The following week specific properties are available:
 - `date`: _Date_ - The specific date as a Date object.
 - `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events of the week.
 - `isActive`: _boolean_ - On the timeline view, this parameter will be true when rendering the current day/week/month/year.
 - `endDate`: _Date_ - The end date of the week as a Date object
 - `startDate`: _Date_ - The start date of the week as a Date object
 - `weekNr`: _number_ - The week count. Enumeration starts with the first week of the year.

### year {#slot-year}

```html
<template #year="args">...</template>
```

Customize the header year container in case of the timeline view.
The event calendar will take care of the positioning, but everything else (like background color, hover effect, etc.)
is left to you.

The following year specific properties are available:
 - `date`: _Date_ - The specific date as a Date object.
 - `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events of the year.
 - `isActive`: _boolean_ - On the timeline view, this parameter will be true when rendering the current day/week/month/year.

### yearFooter {#slot-yearFooter}

```html
<template #yearFooter="args">...</template>
```

Customize the footer year container in case of the timeline view.
The event calendar will take care of the positioning, but everything else (like background color, hover effect, etc.)
is left to you.

The following year specific properties are available:
- `date`: _Date_ - The specific date as a Date object.
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events of the year.
