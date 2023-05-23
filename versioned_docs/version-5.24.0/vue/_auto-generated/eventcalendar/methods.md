### addEvent

(events: MbscCalendarEvent &#124; Array&lt;MbscCalendarEvent&gt;) => Array&lt;string&gt;


Adds one or more events to the calendar
### getEvents

(start: DateType, end: DateType) => Array&lt;MbscCalendarEvent&gt;


Returns the [event data](#data) between two dates. If `start` and `end` are not specified,
it defaults to the start and end days of the current view.
If end date is not specified, it defaults to start date + 1 day.
### getInvalids

(start: DateType, end: DateType) => Array&lt;MbscCalendarEvent&gt;


Returns the [invalids](#invalids) between two dates. If startDate and endDate are not specified,
it defaults to the start and end days/times of the current view. If endDate is not specified, it defaults to startDate + 1 day.
### getSelectedEvents

() => Array&lt;MbscCalendarEvent&gt;


Returns the selected events.
### navigate

(date: DateType, animate: boolean) => void


Navigates to the specified date on the calendar and optionally opens the event popover
(only if popover is enabled and events exists for the specified date).
### navigateToEvent

(event: MbscCalendarEvent) => void


Navigates to the specified event on the agenda/calendar/schedule/timeline views.
### removeEvent

(events: string &#124; number &#124; Array&lt;number&gt; &#124; Array&lt;string&gt; &#124; MbscCalendarEvent &#124; Array&lt;MbscCalendarEvent&gt;) => void


Removes one or more events from the event list based on IDs. For events without IDs, the IDs are generated internally.
The generated ids are returned by the [addEvent](#addEvent) or [getEvents](#getEvents) methods.
### setEvents

(events: Array&lt;MbscCalendarEvent&gt;) => Array&lt;string&gt;


Set the events for the calendar. The actual list will be overwritten. Returns the list of IDs generated for the events.
### setSelectedEvents

(selectedEvents: Array&lt;MbscCalendarEvent&gt;) => void


Sets the selected events.
### updateEvent

(events: MbscCalendarEvent &#124; Array&lt;MbscCalendarEvent&gt;) => void


Updates one or more events in the Eventcalendar.