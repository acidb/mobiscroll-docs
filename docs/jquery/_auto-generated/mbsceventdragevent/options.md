### action {#opt-action}

"resize" &#124; "move" &#124; "create"

The user action which triggered the event. (In case of drag start)
### domEvent {#opt-domEvent}

any

The DOM event of the dragged event.
### event {#opt-event}

MbscCalendarEvent

The dragged calendar event.
### inst {#opt-inst}

EventcalendarBase


### resource {#opt-resource}

string &#124; number

The id of the resource where the event is dragged, if [resources](#opt-resources) are set.
### slot {#opt-slot}

string &#124; number

The id of the slot where the event is dragged, if [slots](#slots) are set.
### source {#opt-source}

"calendar" &#124; "schedule" &#124; "timeline"

The view where the event is dragged.
### type {#opt-type}

string

