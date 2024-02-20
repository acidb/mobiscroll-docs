### addEvent {#method-google-addEvent}

(calendarId: string, event: MbscCalendarEvent, callback: (addedEvent: MbscCalendarEvent) => void
) => Promise


Adds an event to the specified calendar.

Parameters:
 - calendarId - The ID of the calendar

 - event - The event to add

 - callback - Callback function which is executed then the request is complete. Receives the added event.


### deleteEvent {#method-google-deleteEvent}

(calendarId: string, event: MbscCalendarEvent, callback: (deletedEvent: MbscCalendarEvent) => void
) => Promise


Removes an event in the specified calendar.

Parameters:
 - calendarId - The ID of the calendar

 - event - The event to delete

 - callback - Callback function which is executed then the request is complete. Receives the deleted event.


### getCalendars {#method-google-getCalendars}

(callback: (calendars: Array&lt;any&gt;) => void
) => Promise


Queries the available calendars of the signed in user.
Calls the callback function, if specified.

Parameters:
 - callback - A callback function to call with the calendars as parameters, when the query finished.


### getEvents {#method-google-getEvents}

(calendarIds: string &#124; Array&lt;string&gt;, start: Date, end: Date, callback: (events: Array&lt;MbscCalendarEvent&gt;) => void
) => Promise


Queries the events of the specified calendars between two dates.

Parameters:
 - calendarIds - Array of the calendar IDs.

 - start - Start date of the specified interval.

 - end - End date of the specified interval.

 - callback - Callback function which is executed then the request is complete. Receives the list of events as parameter.


### init {#method-google-init}

(config: MbscGoogleCalendarSyncConfig) => void


Makes the necessary initializations for the 3rd party.
Triggers the `onInit` event when the initialization is ready, if specified.

Parameters:
 - config - The configuration object for the calendar integration


### isSignedIn {#method-google-isSignedIn}

() => boolean


Checks if the user is signed in or not.

### signIn {#method-google-signIn}

() => Promise


If the user is not signed in, starts the sign in flow. On success, triggers the `onSignedIn` event.

### signOut {#method-google-signOut}

() => Promise


If the user is signed in, signs out. On success triggers the `onSignedOut` event.

### updateEvent {#method-google-updateEvent}

(calendarId: string, event: MbscCalendarEvent, callback: (updatedEvent: MbscCalendarEvent) => void
) => Promise


Updates an event in the specified calendar.

Parameters:
 - calendarId - The ID of the calendar

 - event - The event to update

 - callback - Callback function which is executed then the request is complete. Receives the updated event.

