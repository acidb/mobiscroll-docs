### renderDay {#renderer-renderDay}

(args: MbscCalendarDayData) => any


Customize the day cells of the calendar view and the date header in case of scheduler and timeline views.

If you are looking to customize only the day cells content and don&#039;t want to bother with the styling of the event,
in case of calendar and scheduler views you can use the [renderDayContent](#renderer-renderDayContent) option.

The following day specific details are available:
- `date`: _Date_ - The date of the rendered day.
- `selected`: _boolean_ - True if the date is selected (in case of the calendar view).
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the day.
- `resource`: _string | number_ - The id of the resource in case of the scheduler (week and month views)
when the events are grouped by resources.
- `isActive`: _boolean_ - True for the current day (in case of the timeline view).

**Default value**: `undefined`

Parameters:
 - args - 


### renderDayContent {#renderer-renderDayContent}

(args: MbscCalendarDayData) => any


Customize the day cells content of the event calendar. The Eventcalendar will take care of the styling and you can focus on
what you show beside the day number.

If you are looking to fully customize the day (e.g. add custom hover effects) you will need to use the
[renderDay](#renderer-renderDay) option.

The following properties are available:
 - `date`: _Date_ - The date of the rendered day.
 - `selected`: _boolean_ - True if the date is selected (in case of the calendar view).
 - `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the day.
 - `resource`: _string | number_ - The id of the resource in case of the scheduler (week and month views)
when the events are grouped by resources.

**Default value**: `undefined`

Parameters:
 - args - 


### renderEvent {#renderer-renderEvent}

(data: MbscCalendarEventData) => any


Customize the events that appear on the agenda and the popover.

If you are looking to customize only the content (e.g. add custom elements) and don&#039;t want to bother with the styling of the event,
you can use the [renderEventContent](#renderer-renderEventContent) option.

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

Parameters:
 - data - 


### renderEventContent {#renderer-renderEventContent}

(data: MbscCalendarEventData) => any


Customize the event content that appears on the agenda and the popover.
The Eventcalendar will take care of styling and you can focus on what you show inside of the event.

If you are looking to fully customize the event (e.g. add custom hover effects) you will need to use the
[renderEvent](#renderer-renderEvent) option.

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

Parameters:
 - data - 


### renderHeader {#renderer-renderHeader}

() => any


Customize the header of the event calendar.
You can use custom markup and the built in header components of the calendar.

**Default value**: `undefined`

### renderHourFooter {#renderer-renderHourFooter}

(args: MbscCalendarDayData) => any


Customize the footer of the hour columns on the timeline view.

The following properties are available:
- `date`: _Date_ - The date and time of the rendered hour.
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the hour.

**Default value**: `undefined`

Parameters:
 - args - 


### renderLabel {#renderer-renderLabel}

(event: MbscCalendarEventData) => any


Customize the labels that appear on the calendar view.
The Eventcalendar will take care of the positioning, but everything else (like background color, hover effect, etc.) is left to you.

If you are looking to customize only the content (e.g. add custom elements) and
don&#039;t want to bother with the styling of the label, you can use the [renderLabelContent](#renderer-renderLabelContent) option.

Some of the event specific details are computed, but there is also a reference to the **original** event they come from.
The following event specific properties are available:
- `end`: _string_ - The formatted end time, if the event is not all day.
- `id`: _string_ -  The id of the event.
- `isMultiDay`: _boolean_ - True if the event spans across multiple days.
- `original`: _MbscCalendarEvent_ - The original event object. Any custom property on the event can be accessed through this property.
- `start`: _string_ - The formatted start time, if the event is not all day.

**Default value**: `undefined`

Parameters:
 - event - 


### renderLabelContent {#renderer-renderLabelContent}

(event: MbscCalendarEventData) => any


Customize the label contents, that appears on the calendar.
The Eventcalendar will take care of styling and you can focus on what you show inside of the label a.k.a the content.

If you are looking to fully customize the label (ex. add custom hover effects) you will need to use the
[renderLabel](#renderer-renderLabel) option.
In that case you will only get the positioning done by the Eventcalendar and everything else is up to you.

Some of the event specific details are computed, but there is also a reference to the **original** event they come from.
The following event specific properties are available:
- `end`: _string_ - The formatted end time, if the event is not all day.
- `id`: _string_ -  The id of the event.
- `isMultiDay`: _boolean_ - True if the event spans across multiple days.
- `original`: _MbscCalendarEvent_ - The original event object. Any custom property on the event can be accessed through this property.
- `start`: _string_ - The formatted start time, if the event is not all day.

**Default value**: `undefined`

Parameters:
 - event - 

