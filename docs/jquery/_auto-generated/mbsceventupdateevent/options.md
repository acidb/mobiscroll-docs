### domEvent {#opt-domEvent}

any

The DOM event from the end of the gesture (mouseup or touchend).
### event {#opt-event}

MbscCalendarEvent

The updated event object.
### events {#opt-events}

Array&lt;MbscCalendarEvent&gt;

The updated events. This property is present on recurring event delete,
when [selectMultipleEvents](#selectMultipleEvents) is set to true.
### inst {#opt-inst}

EventcalendarBase


### isDelete {#opt-isDelete}

boolean

Update called on event deletion.
### newEvent {#opt-newEvent}

MbscCalendarEvent

The newly created event object. Will be set only if the dragged event was a recurring event occurrence.
### oldEvent {#opt-oldEvent}

MbscCalendarEvent

The original event object before the update.
### oldEventOccurrence {#opt-oldEventOccurrence}

MbscCalendarEvent

The occurrence of the event which was dragged.
Will be set only if the dragged event was a recurring event occurrence.
### oldEvents {#opt-oldEvents}

Array&lt;MbscCalendarEvent&gt;

The original events before the update. This property is present on recurring event delete,
when [selectMultipleEvents](#selectMultipleEvents) is set to true.
### source {#opt-source}

"calendar" &#124; "schedule" &#124; "timeline"

The view where the event is being updated
### type {#opt-type}

string

