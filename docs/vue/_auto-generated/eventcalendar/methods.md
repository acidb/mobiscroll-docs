
### getEvents {#method-getEvents}

(start: [MbscDateType](#type-MbscDateType), end: [MbscDateType](#type-MbscDateType)) => Array&lt;[MbscCalendarEvent](#type-MbscCalendarEvent)&gt;


Returns the [events](#opt-data) between two dates. If `start` and `end` are not specified,
it defaults to the start and end days of the current view.
If `end` is not specified, it defaults to start date + 1 day.

Parameters:
 - start - Start date of the specified interval.

 - end - End date of the specified interval.


### getInvalids {#method-getInvalids}

(start: [MbscDateType](#type-MbscDateType), end: [MbscDateType](#type-MbscDateType)) => Array&lt;[MbscCalendarEvent](#type-MbscCalendarEvent)&gt;


Returns the [invalids](#opt-invalid) between two dates. If `start` and `end` are not specified,
it defaults to the start and end days of the current view.
If `end` is not specified, it defaults to start date + 1 day.

Parameters:
 - start - Start date of the specified interval.

 - end - End date of the specified interval.




### navigateToEvent {#method-navigateToEvent}

(event: [MbscCalendarEvent](#type-MbscCalendarEvent)) => void


Navigates to the specified event on the calendar.

Parameters:
 - event - The event object. The `id`, `start` and `resource` properties (in case if resources
are used in timeline or schedule views) must be present in the object.





