### agenda {#slot-agenda}

```html
<template #agenda="{ events, options, dayRefs }">...</template>
```

Customize the agenda listing

Available parameters:
 - `events`: _Array&lt;MbscEventList&gt;_ - The events of the current view, grouped by day. A day object has the following properties:
    - `date`: _string_ - The formatted date of the day.
    - `events`: _Array&lt;MbscCalendarEventData&gt;_ - The list of events for the day. An event object has the following properties:
       - `allDay`: _string_ - The localized all-day text in case of all day events.
       - `end`: _string_ - The formatted end time, if the event is not all day.
       - `id`: _string_ - The id of the event.
       - `isMultiDay`: _boolean_ - True if the event spans across multiple days.
       - `lastDay`: _boolean_ - True if it&#039;s rendered on the last day of a multiple event.
       - `original`: _object_ - The original event object.
       - `start`: _string_ - The formatted start time, if the event is not all day.
       - `title`: _string_ - The title of the event.
    - `timestamp`: _number_ - The timestamp of the day
 - `options`: _object_ - The current settings of the component.
 - `dayRefs`: _object_ - An object holding the references to the DOM elements of the days containing the event listings.
Needed for the scroll functionality: clicking on a calendar date scrolls to the date on the list as well,
and scrolling the list updates the selected date on the calendar.

### agendaEmpty {#slot-agendaEmpty}

```html
<template #agendaEmpty>...</template>
```

Customize the agenda listing when the events list is empty.

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
