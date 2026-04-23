### addEvent {#method-addEvent}

(events: [MbscCalendarEvent](#type-MbscCalendarEvent) &#124; Array&lt;[MbscCalendarEvent](#type-MbscCalendarEvent)&gt;) => Array&lt;string&gt;


Adds one or more events to the calendar

Parameters:
 - events - Object or Array containing the events.


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


### getSelectedEvents {#method-getSelectedEvents}

() => Array&lt;[MbscCalendarEvent](#type-MbscCalendarEvent)&gt;


Returns the selected events.

### navigate {#method-navigate}

(date: [MbscDateType](#type-MbscDateType), animate: boolean) => void


Navigates to the specified date on the calendar.
For views, where time is also displayed, the view will be scrolled to the specified time.
If the time part is not explicitly specified, it defaults to the start of the day.

To change the initial date of the calendar, use the [selectedDate](#opt-selectedDate) option instead.

Parameters:
 - date - Date to navigate to.


### navigateToEvent {#method-navigateToEvent}

(event: [MbscCalendarEvent](#type-MbscCalendarEvent)) => void


Navigates to the specified event on the calendar.

Parameters:
 - event - The event object. The `id`, `start` and `resource` properties (in case if resources
are used in timeline or schedule views) must be present in the object.


### removeEvent {#method-removeEvent}

(events: string &#124; number &#124; Array&lt;string&gt; &#124; Array&lt;number&gt; &#124; [MbscCalendarEvent](#type-MbscCalendarEvent) &#124; Array&lt;[MbscCalendarEvent](#type-MbscCalendarEvent)&gt;) => void


Removes one or more events from the event list based on IDs. For events without IDs, the IDs are generated internally.
The generated ids are returned by the [addEvent](#method-addEvent) or [getEvents](#method-getEvents) methods.

Parameters:
 - events - An array containing IDs or the event objects to be deleted.


### setEvents {#method-setEvents}

(events: Array&lt;[MbscCalendarEvent](#type-MbscCalendarEvent)&gt;) => Array&lt;string&gt;


Set the events for the calendar. The previous events will be overwritten.
Returns the list of IDs generated for the events.

Parameters:
 - events - An array containing the events.


### setOptions {#method-setOptions}

(opt: MbscEventcalendarOptions) => void


Sets or updates options of the component. Options can be updated dynamically after the initialization.

It receives an options object as parameter. Calling `setOptions` will overwrite all the options that
have a key in the options object parameter, and it will re-render the component.

```js
inst.setOptions({
  themeVarian: 'dark',
})
```

### setSelectedEvents {#method-setSelectedEvents}

(selectedEvents: Array&lt;[MbscCalendarEvent](#type-MbscCalendarEvent)&gt;) => void


Sets the selected events.

The selected events are returned by the [getSelectedEvents](#method-getSelectedEvents) method.
Multiple event selection can be turned on with the [selectMultipleEvents](#opt-selectMultipleEvents) option.

Parameters:
 - selectedEvents - An array containing the selected event objects.


### updateEvent {#method-updateEvent}

(events: [MbscCalendarEvent](#type-MbscCalendarEvent) &#124; Array&lt;[MbscCalendarEvent](#type-MbscCalendarEvent)&gt;) => void


Updates one or more events in the event calendar.

Parameters:
 - events - The event or events to update.

