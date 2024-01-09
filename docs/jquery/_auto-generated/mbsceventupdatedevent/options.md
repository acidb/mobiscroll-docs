### event {#opt-event}

MbscCalendarEvent

The updated event object.
### events {#opt-events}

Array&lt;MbscCalendarEvent&gt;

The updated events. This property is present on recurring event delete,
when [selectMultipleEvents](#selectMultipleEvents) is set to true.
### inst {#opt-inst}

EventcalendarBase


### oldEvent {#opt-oldEvent}

MbscCalendarEvent

The original event object before the update.
### oldEvents {#opt-oldEvents}

Array&lt;MbscCalendarEvent&gt;

The original events before the update. This property is present on recurring event delete,
when [selectMultipleEvents](#selectMultipleEvents) is set to true.
### source {#opt-source}

"calendar" &#124; "schedule" &#124; "timeline"

The view where the event is being updated
### target {#opt-target}

HTMLElement

The DOM element of the created event.
### type {#opt-type}

string

