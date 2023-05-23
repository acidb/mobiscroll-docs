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

**Default value**: undefined

Parameters:
 - events - 

 - options - 

 - dayRefs - 


### renderDay {#renderer-renderDay}

(args: MbscCalendarDayData) => any


A render function to customize the day cells of the calendar view and the header date container in case of schedule and timeline view.
It takes a function that should return the desired markup. The Eventcalendar will take care of the positioning,
but everything else (like background color, hover effect, etc.) is left to you.

If you are looking to customize only the content and don&#039;t want to bother with the styling of the event,
in case of calendar and schedule view you can use the [renderDayContent](#renderer-renderDayContent) option.

The render function will receive an object as parameter. This data can be used to show day specific things on the Eventcalendar.
The object passed to the function has the following properties:
 - date: Date object - The specific date as a Date object.
 - selected: Boolean - True if the date is selected. (In case of calendar view)
- events: Array - The list of events of the day.
- resource: String, Number - The id of the resource in case of scheduler(week and month views)
when the events are grouped by resources.
- isActive: Boolean - On the timeline view, this parameter will be true when rendering the current day/week/month/year.

Example:
```
const myCustomDay = (day: any) => {
   const date = day.date;

   return <>
     <div>{formatDate('DDDD', date)}</div>
     <p>{formatDate('MMMM DD', date)}</p>
   </>;
}
```
**Default value**: undefined

Parameters:
 - args - 


### renderDayContent {#renderer-renderDayContent}

(args: MbscCalendarDayData) => any


A render function to customize the day content of the Eventcalendar. It takes a function that should return the desired markup.
The Eventcalendar will take care of styling and you can focus on what you show beside the day number a.k.a the content.

If you are looking to fully customize the day (ex. add custom hover effects) you will need to use the
[renderDay](#renderer-renderDay) option. In that case you will only get the positioning done by the Eventcalendar and everything
else is up to you.

The render function will receive an object as parameter. This data can be used to show day specific things on the Eventcalendar.
The object passed to the function has the following properties:
 - date: Date object - The specific date as a Date object.
 - selected: Boolean - True if the date is selected. (In case of calendar view)
 - events: Array - The list of events of the day.
 - resource: String, Number - The id of the resource in case of scheduler(week and month views)
when the events are grouped by resources.

Example:
```
const myCustomDay = (day: any) => {
   const date = day.date;

   return <>
     <div>{formatDate('DDDD', date)}</div>
     <p>{formatDate('MMMM DD', date)}</p>
   </>;
}
```
**Default value**: undefined

Parameters:
 - args - 


### renderDayFooter {#renderer-renderDayFooter}

(args: MbscCalendarDayData) => any


A render function to add a custom footer for the timeline. It takes a function that should return the desired markup.
In the returned markup, you can use custom html as well. This element only renders for the timeline view.

The template will receive an object as data. This data can be used to show day specific things on the day footer.
The object passed to the template has the following properties:
- date: Date object - The specific date as a Date object.
- events: Array - The list of events of the day.

**Default value**: undefined

Parameters:
 - args - 


### renderEvent {#renderer-renderEvent}

(data: MbscCalendarEventData) => any


A render function to customize the events that appear on the agenda and the popover. It should return the markup of the event.
The Eventcalendar will take care of the positioning, but everything else (like background color, hover effect, etc.) is left to you.

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

**Default value**: undefined

Parameters:
 - data - 


### renderEventContent {#renderer-renderEventContent}

(data: MbscCalendarEventData) => any


A render function to customize the event content that appears on the agenda and the popover.
It should return the markup that is added to the event. The Eventcalendar will take care of styling
and you can focus on what you show inside of the event a.k.a the content.

If you are looking to fully customize the event (ex. add custom hover effects) you will need to use the
[renderEvent](#renderer-renderEvent) option. In that case you will only get the positioning done
by the Eventcalendar and everything else is up to you.

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

**Default value**: undefined

Parameters:
 - data - 


### renderHeader {#renderer-renderHeader}

() => any


A render function to customize the header of the Eventcalendar. It takes a function that should return the desired markup.
In the returned markup, you can use custom html as well as the built in header components of the calendar.

**Default value**: undefined

### renderLabel {#renderer-renderLabel}

(event: MbscCalendarEventData) => any


A render function to to fully customize the labels that appear on the calendar. It should return the markup of the event.
The Eventcalendar will take care of the positioning, but everything else (like background color, hover effect, etc.) is left to you.

If you are looking to customize only the content (ex. add custom elements) and
don&#039;t want to bother with the styling of the label, you can use the [renderLabelContent](#renderer-renderLabelContent) option.

The render function will receive an event object as parameter. This data can be used to show event specific things on the calendar.
The object passed to the function has computed properties, as well as a reference to the **original** event it comes from:
- end: String - Computed property. It holds the formatted end time, if the event is not all day.
- id: String -  It holds the id of the event. If there&#039;s no id on the event object, this property is generated.
- isMultiDay: Boolean - Computed property. It&#039;s true if the event spans across multiple days.
- original: Object -  Reference to the original event object. Any custom property on the event can be access through this property.
- start: String - Computed property. It holds the formatted start time, if the event is not all day.

**Default value**: undefined

Parameters:
 - event - 


### renderLabelContent {#renderer-renderLabelContent}

(event: MbscCalendarEventData) => any


A render function to customize the label contents, that appears on the calendar.
It should return the markup that is added to the label.
The Eventcalendar will take care of styling and you can focus on what you show inside of the label a.k.a the content.

If you are looking to fully customize the label (ex. add custom hover effects) you will need to use the
[renderLabel](#renderer-renderLabel) option.
In that case you will only get the positioning done by the Eventcalendar and everything else is up to you.

The render function will receive an event object as parameter. This data can be used to show event specific things on the calendar.
The object passed to the function has computed properties, as well as a reference to the **original** event it comes from:
- end: String - Computed property. It holds the formatted end time, if the event is not all day.
- id: String -  It holds the id of the event. If there&#039;s no id on the event object, this property is generated.
- isMultiDay: Boolean - Computed property. It&#039;s true if the event spans across multiple days.
- original: Object -  Reference to the original event object. Any custom property on the event can be access through this property.
- start: String - Computed property. It holds the formatted start time, if the event is not all day.

**Default value**: undefined

Parameters:
 - event - 


### renderResource {#renderer-renderResource}

(resource: MbscResource) => any


A render function to customize the resource template of the Scheduler/Timeline.
It takes a function that should return the desired markup. In the returned markup, you can use custom html as well.

Example:
```
const myCustomResourceTemplate = (resource: MbscResource) => {
 return <>
   <div>{resource.name}</div>
   <p>{resource.description}</p>
   <img src={resource.img} />
 </>
}
```

**Default value**: undefined

Parameters:
 - resource - 


### renderResourceFooter {#renderer-renderResourceFooter}

() => any


A render function to customize the empty cell content below the resource column.
It takes a function that should return the desired markup.
In the returned markup, you can use custom html as well. This element only renders for the timeline view,
if the [renderDayFooter](#renderer-renderDayFooter) option is present.

**Default value**: undefined

### renderResourceHeader {#renderer-renderResourceHeader}

() => any


A render function to customize the empty cell content above the resource column.
It takes a function that should return the desired markup.
In the returned markup, you can use custom html as well.

**Default value**: undefined

### renderScheduleEvent {#renderer-renderScheduleEvent}

(event: MbscCalendarEventData) => any


A render function to customize the events that appear on the scheduler and timeline. It should return the markup of the event.
The Eventcalendar will take care of the positioning, but everything else (like background color, hover effect, etc.) is left to you.

If you are looking to customize only the content (ex. add custom elements) and don&#039;t want to bother with the styling of the event,
you can use the [renderScheduleEventContent](#renderer-renderScheduleEventContent) option.

The render function will receive an event object as parameter. This data can be used to show event specific things on the scheduler.
The object passed to the function has computed properties, as well as a reference to the **original** event it comes from:
- allDay: String - The localized all-day text in case of all day events.
- end: String - The formatted end time, if the event is not all day.
- id: String - The id of the event.
- isMultiDay: Boolean - True if the event spans across multiple days.
- lastDay: Boolean - True if it&#039;s rendered on the last day of a multiple event.
- original: Object - The original event object.
- start: String - The formatted start time, if the event is not all day.
- title: String - The title of the event.
- currentResource: String, Number - Represents the resource of the row or column where the event is being rendered.

**Default value**: undefined

Parameters:
 - event - 


### renderScheduleEventContent {#renderer-renderScheduleEventContent}

(event: MbscCalendarEventData) => any


A render function to customize the event content that appears on the scheduler and timeline.
It should return the markup that is added to the event. The Eventcalendar will take care of styling
and you can focus on what you show inside of the event a.k.a the content.

If you are looking to fully customize the event (ex. add custom hover effects) you will need to use
the [renderScheduleEvent](#renderer-renderScheduleEvent) option. In that case you will only get
the positioning done by the Eventcalendar and everything else is up to you.

The render function will receive an event object as parameter. This data can be used to show event specific things on the scheduler.
The object passed to the function has computed properties, as well as a reference to the **original** event it comes from:
- allDay: String - The localized all-day text in case of all day events.
- end: String - The formatted end time, if the event is not all day.
- id: String - The id of the event.
- isMultiDay: Boolean - True if the event spans across multiple days.
- lastDay: Boolean - True if it&#039;s rendered on the last day of a multiple event.
- original: Object - The original event object.
- start: String - The formatted start time, if the event is not all day.
- title: String - The title of the event.
- currentResource: String, Number - Represents the resource of the row or column where the event is being rendered.

**Default value**: undefined

Parameters:
 - event - 


### renderSidebar {#renderer-renderSidebar}

(resource: MbscResource) => any


A render function to add a custom sidebar on the right side of the timeline. It takes a function that should return the desired markup.
In the returned markup, you can use custom html as well. This element only renders for the timeline view.

The template will receive the [resource](#opt-resources) object as data.
This data can be used to show resource specific things on the sidebar.

**Default value**: undefined

Parameters:
 - resource - 


### renderSidebarFooter {#renderer-renderSidebarFooter}

() => any


A render function to customize the empty cell content below the sidebar column.
It takes a function that should return the desired markup.
In the returned markup, you can use custom html as well.
This element only renders for the timeline view, if the [renderSidebar](#renderer-renderSidebar) option is present.

**Default value**: undefined

### renderSidebarHeader {#renderer-renderSidebarHeader}

() => any


A render function to customize the empty cell content above the sidebar column.
It takes a function that should return the desired markup.
In the returned markup, you can use custom html as well.
This element only renders for the timeline view, if the [renderSidebar](#renderer-renderSidebar) option is present.

**Default value**: undefined

### renderSlot {#renderer-renderSlot}

(args: MbscSlotData) => any


A render function to customize the slot template of the Timeline view.
It takes a function that should return the desired markup.
In the returned markup, you can use custom html as well.

It will recieve an object as parameter and has the following properties:
- date: Date object - The specific date where the slot is rendered.
- slot: Object - Data of the rendered slot.

**Default value**: undefined

Parameters:
 - args - 

