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
### resourceFooterTemplate {#template-resourceFooterTemplate}

Template to customize the cell content below the resource column on the timeline view.

**Default value**: `undefined`
### resourceHeaderTemplate {#template-resourceHeaderTemplate}

Template to customize the cell content above the resource column on the timeline view.

**Default value**: `undefined`
### resourceTemplate {#template-resourceTemplate}

Template to customize the resource template of the scheduler and timeline views.
The object of the rendered resource is available for use in the template.

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