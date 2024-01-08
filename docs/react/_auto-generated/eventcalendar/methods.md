### getEvents {#method-getEvents}

(start: MbscDateType, end: MbscDateType) => Array&lt;MbscCalendarEvent&gt;


Returns the [events](#opt-data) between two dates. If `start` and `end` are not specified,
it defaults to the start and end days of the current view.
If `end` is not specified, it defaults to start date + 1 day.
### getInvalids {#method-getInvalids}

(start: MbscDateType, end: MbscDateType) => Array&lt;MbscCalendarEvent&gt;


Returns the [invalids](#opt-invalid) between two dates. If `start` and `end` are not specified,
it defaults to the start and end days of the current view.
If `end` is not specified, it defaults to start date + 1 day.
### navigate {#method-navigate}

(date: MbscDateType, animate: boolean) => void


Navigates to the specified date on the calendar.
### navigateToEvent {#method-navigateToEvent}

(event: MbscCalendarEvent) => void


Navigates to the specified event on the calendar.