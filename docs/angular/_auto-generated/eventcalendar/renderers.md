### agendaEmptyTemplate {#template-agendaEmptyTemplate}

Template to customize the agenda empty state.
Should contain the desired template to be used in the agenda when the events list is empty.
### agendaTemplate {#template-agendaTemplate}

Template to customize agenda listing.

There is a scrolling functionality of the list: when clicking on a calendar date scrolls to the date on the list as well,
and scrolling the list updates the selected date on the calendar.
For this functionality to work, you need to use the `mbsc-event-list-day` directive on the elements of
the days in your template with the day timestamp as parameter:

```html
<mbsc-eventcalendar [agendaTemplate]="myTemplate">
  <ng-template #myTemplate let-data>
    <ul *ngFor="let day of data; trackBy: getDayKey" mbsc-event-list-day [timestamp]="day.timestamp">
      <li>{{day.date}}</li>
      <li *ngFor="let event of day.events; trackBy: getEventKey">
        {{event.title}}
      </li>
    </ul>
  </ng-template>
</mbsc-eventcalendar>
```

The template data is an array containing the events of the current view, grouped by day. A day object has the following properties:
- `date`: String - The formatted date of the day.
- `events`: Array - The list of events for the day. An event object has the following properties:
   - `allDay`: String - The localized all-day text in case of all day events.
   - `end`: String - The formatted end time, if the event is not all day.
   - `id`: String - The id of the event.
   - `isMultiDay`: Boolean - True if the event spans across multiple days.
   - `lastDay`: Boolean - True if it&#039;s rendered on the last day of a multiple event.
   - `original`: Object - The original event object.
   - `start`: String - The formatted start time, if the event is not all day.
   - `title`: String - The title of the event.
- `timestamp`: Number - The timestamp of the day
### bufferAfterTemplate {#template-bufferAfterTemplate}

Template reference to fully customize the buffer area that is displayed at the end of the scheduler and timeline events.
The buffer can be defined with the help of the `bufferAfter` property of the [event data](#opt-data).

The template will receive an event object as data.
Some of the event specific details are computed, but there is also a reference to the **original** event they come from.
The following event specific properties are available:
- `allDay`: _string_ - The localized all-day text in case of all day events.
- `end`: _string_ - The formatted end time, if the event is not all day.
- `id`: _string_ - The id of the event.
- `isMultiDay`: _boolean_ - True if the event spans across multiple days.
- `lastDay`: _boolean_ - True if it&#039;s rendered on the last day of a multiple event.
- `original`: _MbscCalendarEvent_ - The original event object.
- `start`: _string_ - The formatted start time, if the event is not all day.
- `title`: _string_ - The title of the event.
- `currentResource`: _string | number_ - The resource of the row or column where the event is being rendered.

**Default value**: `undefined`
### bufferBeforeTemplate {#template-bufferBeforeTemplate}

Template reference to fully customize the buffer area that is displayed at the start of the scheduler and timeline events.
The buffer can be defined with the help of the `bufferBefore` property of the [event data](#opt-data).

The template will receive an event object as data.
Some of the event specific details are computed, but there is also a reference to the **original** event they come from.
The following event specific properties are available:
- `allDay`: _string_ - The localized all-day text in case of all day events.
- `end`: _string_ - The formatted end time, if the event is not all day.
- `id`: _string_ - The id of the event.
- `isMultiDay`: _boolean_ - True if the event spans across multiple days.
- `lastDay`: _boolean_ - True if it&#039;s rendered on the last day of a multiple event.
- `original`: _MbscCalendarEvent_ - The original event object.
- `start`: _string_ - The formatted start time, if the event is not all day.
- `title`: _string_ - The title of the event.
- `currentResource`: _string | number_ - The resource of the row or column where the event is being rendered.

**Default value**: `undefined`
### dayContentTemplate {#template-dayContentTemplate}

Customize the day cells content of the event calendar. The Eventcalendar will take care of the styling and you can focus on
what you show beside the day number.

If you are looking to fully customize the day (e.g. add custom hover effects) you will need to use the
[dayTemplate](#template-dayTemplate) option.

The template will receive an object as data. This data can be used to show day specific things on the Eventcalendar.
The object passed to the template has the following properties:
- `date`: Date object - The specific date as a Date object.
- `selected`: Boolean - True if the date is selected. (In case of calendar view)
- `events`: Array - The list of events of the day.
- `resource`: String, Number - The id of the resource in case of scheduler(week and month views)
when the events are grouped by resources.

**Default value**: `undefined`
### dayFooterTemplate {#template-dayFooterTemplate}

Template to customize the footer of each day for the timeline.

The following day specific details are available:
- `date`: _Date_ - The date of the day.
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the day.

**Default value**: `undefined`
### dayTemplate {#template-dayTemplate}

Customize the day cells of the calendar view and the date header in case of scheduler and timeline views.

If you are looking to customize only the day cells content and don&#039;t want to bother with the styling of the event,
in case of calendar and scheduler views you can use the [dayContentTemplate](#template-dayContentTemplate) option.

The template will receive an object as data. This data can be used to show day specific things on the Eventcalendar.
The object passed to the template has the following properties:
- `date`: Date object - The specific date as a Date object.
- `selected`: Boolean - True if the date is selected. (In case of calendar view)
- `events`: Array - The list of events of the day.
- `resource`: String, Number - The id of the resource in case of scheduler(week and month views)
when the events are grouped by resources.
- `isActive`: Boolean - On the timeline view, this parameter will be true when rendering the current day/week/month/year

**Default value**: `undefined`
### eventContentTemplate {#template-eventContentTemplate}

Template to customize the event content that appears on the agenda and the popover.
The Eventcalendar will take care of styling and you can focus on what you show inside of the event.

If you are looking to fully customize the event (e.g. add custom hover effects) you will need to use the
[eventTemplate](#template-eventTemplate) option.

Some of the event specific details are computed, but there is also a reference to the **original** event they come from.
The following event specific properties are available:
- `allDay`: _string_ - The localized all-day text in case of all day events.
- `end`: _string_ - The formatted end time, if the event is not all day.
- `id`: _string_ - The id of the event.
- `isMultiDay`: _boolean_ - True if the event spans across multiple days.
- `lastDay`: _boolean_ - True if it&#039;s rendered on the last day of a multiple event.
- `original`: _MbscCalendarEvent_ - The original event object. Any custom property on the event can be accessed through this property.
- `start`: _string_ - The formatted start time, if the event is not all day.
- `title`: _string_ - The title of the event.

**Default value**: `undefined`
### eventTemplate {#template-eventTemplate}

Template to customize the events that appear on the agenda and the popover.

If you are looking to customize only the content (e.g. add custom elements) and don&#039;t want to bother with the styling of the event,
you can use the [eventContentTemplate](#template-eventContentTemplate) option.

Some of the event specific details are computed, but there is also a reference to the **original** event they come from.
The following event specific properties are available:
- `allDay`: _string_ - The localized all-day text in case of all day events.
- `end`: _string_ - The formatted end time, if the event is not all day.
- `id`: _string_ - The id of the event.
- `isMultiDay`: _boolean_ - True if the event spans across multiple days.
- `lastDay`: _boolean_ - True if it&#039;s rendered on the last day of a multiple event.
- `original`: _MbscCalendarEvent_ - The original event object.
- `start`: _string_ - The formatted start time, if the event is not all day.
- `title`: _string_ - The title of the event.

**Default value**: `undefined`
### headerTemplate {#template-headerTemplate}

Template to customize the header of the event calendar.
You can use custom markup or components as well as the built in header
components of the calendar.

**Default value**: `undefined`
### hourFooterTemplate {#template-hourFooterTemplate}

Template to customize the footer of the hour columns on the timeline view.

The following properties are available:
- `date`: _Date_ - The date and time of the rendered hour.
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the hour.
- `isActive`: _boolean_ - True for the current hour.

**Default value**: `undefined`
### hourTemplate {#template-hourTemplate}

Template to customize the header of the hour columns on the timeline view.

The following properties are available:
- `date`: _Date_ - The date and time of the rendered hour.
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the hour.
- `isActive`: _boolean_ - True for the current hour.

**Default value**: `undefined`
### labelContentTemplate {#template-labelContentTemplate}

Template to customize the label contents, that appears on the calendar.
The Eventcalendar will take care of styling and you can focus on what you show inside of the label.

If you are looking to fully customize the label (ex. add custom hover effects) you will need to use the
[labelTemplate](#template-labelTemplate) option.
In that case you will only get the positioning done by the Eventcalendar and everything else is up to you.

Some of the event specific details are computed, but there is also a reference to the **original** event they come from.
The following event specific properties are available:
- `end`: _string_ - The formatted end time, if the event is not all day.
- `id`: _string_ -  The id of the event.
- `isMultiDay`: _boolean_ - True if the event spans across multiple days.
- `original`: _MbscCalendarEvent_ - The original event object. Any custom property on the event can be accessed through this property.
- `start`: _string_ - The formatted start time, if the event is not all day.

**Default value**: `undefined`
### labelTemplate {#template-labelTemplate}

Customize the labels that appear on the calendar view.
The Eventcalendar will take care of the positioning, but everything else (like background color, hover effect, etc.) is left to you.

If you are looking to customize only the content (e.g. add custom elements) and
don&#039;t want to bother with the styling of the label, you can use the [labelContentTemplate](#template-labelContentTemplate) option.

Some of the event specific details are computed, but there is also a reference to the **original** event they come from.
The following event specific properties are available:
- `end`: _string_ - The formatted end time, if the event is not all day.
- `id`: _string_ -  The id of the event.
- `isMultiDay`: _boolean_ - True if the event spans across multiple days.
- `original`: _MbscCalendarEvent_ - The original event object. Any custom property on the event can be accessed through this property.
- `start`: _string_ - The formatted start time, if the event is not all day.

**Default value**: `undefined`
### monthFooterTemplate {#template-monthFooterTemplate}

Template to customize the footer of the month column on the timeline view.

The following properties are available:
 - `date`: _Date_ - First day of the rendered month.
 - `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the month.
 - `isActive`: _boolean_ - True for the current month.

**Default value**: `undefined`
### monthTemplate {#template-monthTemplate}

Template to customize the header of the month column on the timeline view.

The following properties are available:
 - `date`: _Date_ - First day of the rendered month.
 - `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the month.
 - `isActive`: _boolean_ - True for the current month.

**Default value**: `undefined`
### quarterFooterTemplate {#template-quarterFooterTemplate}

Template to customize the footer of the quarter column on the timeline view.

The following properties are available:
- `date`: _Date_ - First day of the rendered quarter.
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the quarter.
- `isActive`: _boolean_ - True for the current quarter.

**Default value**: `undefined`
### quarterTemplate {#template-quarterTemplate}

Template to customize the header of the quarter columns on the timeline view.

The following properties are available:
- `date`: _Date_ - First day of the rendered quarter.
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the quarter.
- `isActive`: _boolean_ - True for the current quarter.

**Default value**: `undefined`
### resourceEmptyTemplate {#template-resourceEmptyTemplate}

Template to customize the content of the resource column in case of an empty resource array.

```html
<mbsc-eventcalendar [resourceEmptyTemplate]="myEmptyTemplate">
  <ng-template #myEmptyTemplate>
    <!-- content -->
  </ng-template>
</mbsc-eventcalendar>
```

**Default value**: `undefined`
### resourceFooterTemplate {#template-resourceFooterTemplate}

Template to customize the cell content below the resource column on the timeline view.

**Default value**: `undefined`
### resourceHeaderTemplate {#template-resourceHeaderTemplate}

Template to customize the cell content above the resource column on the timeline view.

**Default value**: `undefined`
### resourceTemplate {#template-resourceTemplate}

Template to customize the resource template of the scheduler and timeline views.

The following properties are available:
 - `resource`: _MbscResource_ - The rendered resource.
 - `day`: _Date_ - The date on which the resource is rendered.
 Available when grouping by date in the scheduler view,
 or when vertical day resolution is used in the timeline view.

```html
<mbsc-eventcalendar [resourceTemplate]="myTemplate">
  <ng-template #myTemplate let-resource>
    <div>{{resource.name}}</div>
    <p>{{resource.description}}</p>
    <img [src]="resource.img" />
  </ng-template>
</mbsc-eventcalendar>
```

**Default value**: `undefined`
### scheduleEventContentTemplate {#template-scheduleEventContentTemplate}

Template to customize the event content that appears on the scheduler and timeline.
The Eventcalendar will take care of styling and you can focus on what you show inside of the event.

If you are looking to fully customize the event (e.g. add custom hover effects) you will need to use
the [scheduleEventTemplate](#template-scheduleEventTemplate) option. In that case you will only get
the positioning done by the Eventcalendar and everything else is up to you.

Some of the event specific details are computed, but there is also a reference to the **original** event they come from.
The following event specific properties are available:
- `allDay`: _string_ - The localized all-day text in case of all day events.
- `end`: _string_ - The formatted end time, if the event is not all day.
- `id`: _string_ - The id of the event.
- `isMultiDay`: _boolean_ - True if the event spans across multiple days.
- `lastDay`: _boolean_ - True if it&#039;s rendered on the last day of a multiple event.
- `original`: _MbscCalendarEvent_ - The original event object.
- `start`: _string_ - The formatted start time, if the event is not all day.
- `title`: _string_ - The title of the event.
- `currentResource`: _string | number_ - The resource of the row or column where the event is being rendered.

**Default value**: `undefined`
### scheduleEventTemplate {#template-scheduleEventTemplate}

Template to customize the events that appear on the scheduler and timeline.
The Eventcalendar will take care of the positioning,
but everything else (like background color, hover effect, etc.) is left to you.

If you are looking to customize only the content (e.g. add custom elements) and don&#039;t want to bother with the styling of the event,
you can use the [scheduleEventContentTemplate](#template-scheduleEventContentTemplate) option.

Some of the event specific details are computed, but there is also a reference to the **original** event they come from.
The following event specific properties are available:
- `allDay`: _string_ - The localized all-day text in case of all day events.
- `end`: _string_ - The formatted end time, if the event is not all day.
- `id`: _string_ - The id of the event.
- `isMultiDay`: _boolean_ - True if the event spans across multiple days.
- `lastDay`: _boolean_ - True if it&#039;s rendered on the last day of a multiple event.
- `original`: _MbscCalendarEvent_ - The original event object.
- `start`: _string_ - The formatted start time, if the event is not all day.
- `title`: _string_ - The title of the event.
- `currentResource`: _string | number_ - The resource of the row or column where the event is being rendered.

**Default value**: `undefined`
### sidebarFooterTemplate {#template-sidebarFooterTemplate}

Template to customize the empty cell content below the sidebar column.
This template is only rendered for the timeline view, if the [sidebarTemplate](#template-sidebarTemplate) is present.

**Default value**: `undefined`
### sidebarHeaderTemplate {#template-sidebarHeaderTemplate}

Template to customize the empty cell content above the sidebar column.
This template is only rendered for the timeline view, if the [sidebarTemplate](#template-sidebarTemplate) is present.

**Default value**: `undefined`
### sidebarTemplate {#template-sidebarTemplate}

Template to customize and add a sidebar on the right side of the timeline.

The template will receive the resource object as data. This data can be used to show resource specific things on the sidebar.

**Default value**: `undefined`
### slotTemplate {#template-slotTemplate}

Template to customize the slot template of the timeline view.

It will receive an object as parameter that has the following properties:
- `date`: _Date_ - The specific date where the slot is rendered.
- `slot`: _MbscSlot_ - Data of the rendered slot.

```
<mbsc-eventcalendar [slotTemplate]="myTemplate">
  <ng-template #myTemplate let-slotdata>
    <div>{{slotdata.slot.name}}</div>
    <p>{{slotdata.slot.description}}</p>
    <img [src]="slotdata.slot.img" />
  </ng-template>
</mbsc-eventcalendar>
```

**Default value**: `undefined`
### weekFooterTemplate {#template-weekFooterTemplate}

Template to customize the footer of the week column on the timeline view.

The following properties are available:
 - `date`: _Date_ - First day of the rendered week.
 - `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the week.
 - `isActive`: _boolean_ - True for the current week.
 - `endDate`: _Date_ - The end date of the week.
 - `startDate`: _Date_ - The start date of the week.
 - `weekNr`: _number_ - The week number. Enumeration starts with the first week of the year.

**Default value**: `undefined`
### weekTemplate {#template-weekTemplate}

Template to customize the header of the week column on the timeline view.

The following properties are available:
 - `date`: _Date_ - First day of the rendered week.
 - `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the week.
 - `isActive`: _boolean_ - True for the current week.
 - `endDate`: _Date_ - The end date of the week.
 - `startDate`: _Date_ - The start date of the week.
 - `weekNr`: _number_ - The week number. Enumeration starts with the first week of the year.

**Default value**: `undefined`
### yearFooterTemplate {#template-yearFooterTemplate}

Template to customize the footer of the year column on the timeline view.

The following properties are available:
 - `date`: _Date_ - First day of the rendered year.
 - `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the year.
 - `isActive`: _boolean_ - True for the current year.

**Default value**: `undefined`
### yearTemplate {#template-yearTemplate}

Template to customize the header of the year column on the timeline view.

The following properties are available:
 - `date`: _Date_ - First day of the rendered year.
 - `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the year.
 - `isActive`: _boolean_ - True for the current year.

**Default value**: `undefined`