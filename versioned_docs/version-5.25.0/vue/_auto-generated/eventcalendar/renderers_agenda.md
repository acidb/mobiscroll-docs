### renderAgenda {#renderer-renderAgenda}

(events: Array&lt;MbscEventList&gt;, options: MbscEventcalendarOptions, dayRefs: missing) => any


A render function to customize the agenda template. Should return the markup of an event list, to be used in the agenda listing.
It receives the following parameters:

 - events: Array - The events of the current view, grouped by day. A day object has the following properties:
    - date: String - The formatted date of the day.
    - events: Array - The list of events for the day. An event object has the following properties:
       - allDay: String - The localized all-day text in case of all day events.
       - end: String - The formatted end time, if the event is not all day.
       - id: String - The id of the event.
       - isMultiDay: Boolean - True if the event spans across multiple days.
       - lastDay: Boolean - True if it&#039;s rendered on the last day of a multiple event.
       - original: Object - The original event object.
       - start: String - The formatted start time, if the event is not all day.
       - title: String - The title of the event.
    - timestamp: Number - The timestamp of the day
 - options: Object - The current settings of the component.
 - dayRefs: Object - An object holding the references to the DOM elements of the days containing the event listings.
Needed for the scroll functionality: clicking on a calendar date scrolls to the date on the list as well,
and scrolling the list updates the selected date on the calendar.

**Default value**: `undefined`

Parameters:
 - events - 

 - options - 

 - dayRefs - 


### renderEvent {#renderer-renderEvent}

(data: MbscCalendarEventData) => any


A render function to customize the events that appear on the agenda and the popover. It should return the markup of the event.
The event calendar will take care of the positioning, but everything else (like background color, hover effect, etc.) is left to you.

If you are looking to customize only the content (ex. add custom elements) and don&#039;t want to bother with the styling of the event,
 you can use the [renderEventContent](#renderer-renderEventContent) option.

The render function will receive an event object as parameter.
This data can be used to show event specific things on the agenda and popover.
The object passed to the function has computed properties, as well as a reference to the **original** event it comes from:
- allDay: String - The localized all-day text in case of all day events.
- end: String - The formatted end time, if the event is not all day.
- id: String - The id of the event.
- isMultiDay: Boolean - True if the event spans across multiple days.
- lastDay: Boolean - True if it&#039;s rendered on the last day of a multiple event.
- original: Object - The original event object.
- start: String - The formatted start time, if the event is not all day.
- title: String - The title of the event.

**Default value**: `undefined`

Parameters:
 - data - 


### renderEventContent {#renderer-renderEventContent}

(data: MbscCalendarEventData) => any


A render function to customize the event content that appears on the agenda and the popover.
It should return the markup that is added to the event. The event calendar will take care of styling
and you can focus on what you show inside of the event a.k.a the content.

If you are looking to fully customize the event (ex. add custom hover effects) you will need to use the
[renderEvent](#renderer-renderEvent) option. In that case you will only get the positioning done
by the event calendar and everything else is up to you.

The render function will receive an event object as parameter.
This data can be used to show event specific things on the agenda and popover.
The object passed to the function has computed properties, as well as a reference to the **original** event it comes from:
- allDay: String - The localized all-day text in case of all day events.
- end: String - The formatted end time, if the event is not all day.
- id: String - The id of the event.
- isMultiDay: Boolean - True if the event spans across multiple days.
- lastDay: Boolean - True if it&#039;s rendered on the last day of a multiple event.
- original: Object - The original event object.
- start: String - The formatted start time, if the event is not all day.
- title: String - The title of the event.

**Default value**: `undefined`

Parameters:
 - data - 


### renderHeader {#renderer-renderHeader}

() => any


A render function to customize the header of the event calendar. It takes a function that should return the desired markup.
In the returned markup, you can use custom html as well as the built in header components of the calendar.

**Default value**: `undefined`
