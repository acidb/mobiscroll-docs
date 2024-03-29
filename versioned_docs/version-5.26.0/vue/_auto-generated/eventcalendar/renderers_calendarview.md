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

### event {#slot-event}

```html
<template #event="data">...</template>
```

Customize the events that appear on the agenda and the popover.
The event calendar will take care of the positioning, but everything else (like background color, hover effect, etc.) is left to you.

If you are looking to customize only the content (ex. add custom elements) and don&#039;t want to bother with the styling of the event,
you can use the [eventContent](#slot-eventContent) option.

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

### eventContent {#slot-eventContent}

```html
<template #eventContent="data">...</template>
```

Customize the event content that appears on the agenda and the popover.
The event calendar will take care of styling and you can focus on what you show inside of the event a.k.a the content.

If you are looking to fully customize the event (ex. add custom hover effects) you will need to use the
[event](#slot-event) option. In that case you will only get the positioning done
by the event calendar and everything else is up to you.

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

### header {#slot-header}

```html
<template #header>...</template>
```

Customize the header of the event calendar.
You can use custom html as well as the built in header components of the calendar.

### hourFooter {#slot-hourFooter}

```html
<template #hourFooter="args">...</template>
```

Customize the footer hour container in case of the timeline view.
This options is only available for the timeline view.

The following hour specific properties are available:
- `date`: _Date_ object - The specific date as a Date object.
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events of the hour.

### label {#slot-label}

```html
<template #label="event">...</template>
```

Customize the labels that appear on the calendar.
The event calendar will take care of the positioning, but everything else (like background color, hover effect, etc.) is left to you.

If you are looking to customize only the content (ex. add custom elements) and
don&#039;t want to bother with the styling of the label, you can use the [labelContent](#slot-labelContent) option.

Some of the event specific details are computed, but there is also a reference to the **original** event they come from.
The following event specific properties are available:
- `end`: _string_ - Computed property. It holds the formatted end time, if the event is not all day.
- `id`: _string_ -  It holds the id of the event. If there&#039;s no id on the event object, this property is generated.
- `isMultiDay`: _boolean_ - Computed property. It&#039;s true if the event spans across multiple days.
- `original`: _object_ -  Reference to the original event object. Any custom property on the event can be access through this property.
- `start`: _string_ - Computed property. It holds the formatted start time, if the event is not all day.

### labelContent {#slot-labelContent}

```html
<template #labelContent="event">...</template>
```

Customize the label contents, that appears on the calendar.
The event calendar will take care of styling and you can focus on what you show inside of the label a.k.a the content.

If you are looking to fully customize the label (ex. add custom hover effects) you will need to use the
[label](#slot-label) option.
In that case you will only get the positioning done by the event calendar and everything else is up to you.

Some of the event specific details are computed, but there is also a reference to the **original** event they come from.
The following event specific properties are available:
- `end`: _string_ - Computed property. It holds the formatted end time, if the event is not all day.
- `id`: _string_ -  It holds the id of the event. If there&#039;s no id on the event object, this property is generated.
- `isMultiDay`: _boolean_ - Computed property. It&#039;s true if the event spans across multiple days.
- `original`: _object_ -  Reference to the original event object. Any custom property on the event can be access through this property.
- `start`: _string_ - Computed property. It holds the formatted start time, if the event is not all day.
