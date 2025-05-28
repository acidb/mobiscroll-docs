### renderCalendarDay {#renderer-renderCalendarDay}

(args: MbscCalendarDayData) => any


Customize the day cells of the calendar view.

If you are looking to customize only the day cells content and don&#039;t want to bother with the styling of the cells,
use the [renderCalendarDayContent](#renderer-renderCalendarDayContent) option.

The following day specific details are available:
- `date`: _Date_ - The date of the rendered day.
- `selected`: _boolean_ - True if the date is selected.
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the day.

**Default value**: `undefined`

### renderCalendarDayContent {#renderer-renderCalendarDayContent}

(args: MbscCalendarDayData) => any


Customize the day cells content of the calendar view. The Eventcalendar will take care of the styling and you can focus on
what you show beside the day number.

If you are looking to fully customize the day (e.g. add custom hover effects) you will need to use the
[renderCalendarDay](#renderer-renderCalendarDay) option.

The following properties are available:
 - `date`: _Date_ - The date of the rendered day.
 - `selected`: _boolean_ - True if the date is selected.
 - `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the day.

**Default value**: `undefined`

### renderCalendarEvent {#renderer-renderCalendarEvent}

(event: MbscCalendarEventData) => any


Customize the events that appear on the calendar view.
The Eventcalendar will take care of the positioning, but everything else (like background color, hover effect, etc.) is left to you.

If you are looking to customize only the content (e.g. add custom elements) and
don&#039;t want to bother with the styling of the event, you can use the [renderCalendarEventContent](#renderer-renderCalendarEventContent)
option.

Some of the event specific details are computed, but there is also a reference to the **original** event they come from.
The following event specific properties are available:
- `end`: _string_ - The formatted end time, if the event is not all day.
- `id`: _string_ -  The id of the event.
- `isMultiDay`: _boolean_ - True if the event spans across multiple days.
- `original`: _MbscCalendarEvent_ - The original event object. Any custom property on the event can be accessed through this property.
- `start`: _string_ - The formatted start time, if the event is not all day.

**Default value**: `undefined`

### renderCalendarEventContent {#renderer-renderCalendarEventContent}

(event: MbscCalendarEventData) => any


Customize the event contents, that appears on the calendar.
The Eventcalendar will take care of styling and you can focus on what you show inside of the event.

If you are looking to fully customize the label (ex. add custom hover effects) you will need to use the
[renderCalendarEvent](#renderer-renderCalendarEvent) option.
In that case you will only get the positioning done by the Eventcalendar and everything else is up to you.

Some of the event specific details are computed, but there is also a reference to the **original** event they come from.
The following event specific properties are available:
- `end`: _string_ - The formatted end time, if the event is not all day.
- `id`: _string_ -  The id of the event.
- `isMultiDay`: _boolean_ - True if the event spans across multiple days.
- `original`: _MbscCalendarEvent_ - The original event object. Any custom property on the event can be accessed through this property.
- `start`: _string_ - The formatted start time, if the event is not all day.

**Default value**: `undefined`

### renderHeader {#renderer-renderHeader}

() => any


Customize the header of the event calendar.
You can use custom markup and the built in header components of the calendar.

**Default value**: `undefined`

### renderPopoverEvent {#renderer-renderPopoverEvent}

(data: MbscCalendarEventData) => any


Customize the events that appear on the popover.

If you are looking to customize only the content (e.g. add custom elements) and don&#039;t want to bother with the styling of the event,
you can use the [renderPopoverEventContent](#renderer-renderPopoverEventContent) option.

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

**Default value**: `undefined`

### renderPopoverEventContent {#renderer-renderPopoverEventContent}

(data: MbscCalendarEventData) => any


Customize the event content that appears on the popover.
The Eventcalendar will take care of styling and you can focus on what you show inside of the event.

If you are looking to fully customize the event (e.g. add custom hover effects) you will need to use the
[renderPopoverEvent](#renderer-renderPopoverEvent) option.

Some of the event specific details are computed, but there is also a reference to the **original** event they come from.
The following event specific properties are available:
- `allDay`: _string_ - The localized all-day text in case of all day events.
- `end`: _string_ - The formatted end time, if the event is not all day.
- `id`: _string_ - The id of the event.
- `isMultiDay`: _boolean_ - True if the event spans across multiple days.
- `lastDay`: _boolean_ - True if it&#039;s rendered on the last day of a multiple event.
- `original`: _MbscCalendarEvent_ - The original event object. Any custom property on the event can be accessed through this property.
- `start`: _string_ - The formatted start time, if the event is not all day.
- `title`: _string_ - The title of the event.

**Default value**: `undefined`
