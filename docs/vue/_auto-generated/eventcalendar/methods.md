### getEvents {#method-getEvents}

(start: MbscDateType, end: MbscDateType) => Array&lt;MbscCalendarEvent&gt;


Returns the [events](#opt-data) between two dates. If `start` and `end` are not specified,
it defaults to the start and end days of the current view.
If `end` is not specified, it defaults to start date + 1 day.

Parameters:
 - start - Start date of the specified interval.

 - end - End date of the specified interval.


### getInvalids {#method-getInvalids}

(start: MbscDateType, end: MbscDateType) => Array&lt;MbscCalendarEvent&gt;


Returns the [invalids](#opt-invalid) between two dates. If `start` and `end` are not specified,
it defaults to the start and end days of the current view.
If `end` is not specified, it defaults to start date + 1 day.

Parameters:
 - start - Start date of the specified interval.

 - end - End date of the specified interval.


### navigate {#method-navigate}

(date: MbscDateType, animate: boolean) => void


Navigates to the specified date on the calendar.

Parameters:
 - date - Date to navigate to.


### navigateToEvent {#method-navigateToEvent}

(event: MbscCalendarEvent) => void


Navigates to the specified event on the calendar.

Parameters:
 - event - The event object. The `id`, `start` and `resource`
(in case if resources are used in timeline or schedule views) properties must be present in the object.

