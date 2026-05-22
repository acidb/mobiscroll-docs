### addEvent {#method-google-addEvent}

(calendarId: string, event: [MbscCalendarEvent](#type-MbscCalendarEvent), callback: (addedEvent: [MbscCalendarEvent](#type-MbscCalendarEvent)) => void
) => Promise


Adds an event to the specified calendar.
```js title="Example usage"
googleCalendarSync.addEvent(
  'MY_CALENDAR_ID',
  {
    start: new Date(2022, 1, 15, 12),
    end: new Date(2022, 1, 16, 14),
    title: 'My new event',
    googleEvent: {
      description: 'My new event description'
    }
  });
```

Parameters:
 - calendarId - The ID of the calendar

 - event - The event to add. You can pass Google specific event properties through the `googleEvent` property.
The rest of custom properties will be passed to the `extendedProperties` field.

 - callback - Callback function which is executed when the request is complete. Receives the added event.


### deleteEvent {#method-google-deleteEvent}

(calendarId: string, event: [MbscCalendarEvent](#type-MbscCalendarEvent), callback: (deletedEvent: [MbscCalendarEvent](#type-MbscCalendarEvent)) => void
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

(calendarIds: string &#124; Array&lt;string&gt;, start: Date, end: Date, callback: (events: Array&lt;[MbscCalendarEvent](#type-MbscCalendarEvent)&gt;) => void
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

(calendarId: string, event: [MbscCalendarEvent](#type-MbscCalendarEvent), callback: (updatedEvent: [MbscCalendarEvent](#type-MbscCalendarEvent)) => void
) => Promise


Updates an event in the specified calendar.
```js title="Example usage"
googleCalendarSync.updateEvent(
  'MY_CALENDAR_ID',
  {
    start: new Date(2022, 1, 20, 10),
    end: new Date(2022, 1, 11, 15),
    title: 'My updated event',
    id: 1,
    googleEvent: {
      description: 'My updated event description'
    }
  });
```

Parameters:
 - calendarId - The ID of the calendar

 - event - The event to update. You can pass Google specific event properties through the `googleEvent` property.
The rest of custom properties will be passed to the `extendedProperties` field.

 - callback - Callback function which is executed then the request is complete. Receives the updated event.

