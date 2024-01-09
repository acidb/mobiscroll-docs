### action {#opt-action}

"click" &#124; "drag" &#124; "externalDrop"

The action which created the event.
### domEvent {#opt-domEvent}

any

The DOM event from the end of the gesture (mouseup or touchend).
### event {#opt-event}

MbscCalendarEvent

The newly created event object.
### inst {#opt-inst}

EventcalendarBase


### originEvent {#opt-originEvent}

MbscCalendarEvent

The occurrence of the event which was dragged. Will be set only if the event was
created by dragging a recurring event occurrence.
### source {#opt-source}

"calendar" &#124; "schedule" &#124; "timeline"

The view where the event is being created.
### type {#opt-type}

string

