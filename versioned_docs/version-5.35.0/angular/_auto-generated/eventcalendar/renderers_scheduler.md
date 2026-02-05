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
### cellTemplate {#template-cellTemplate}

Customize the cells of the Eventcalendar in scheduler and timeline views.

The template will receive an object as context, which can be used to display custom content in the cells.
Keep the cell template simple, as it will be called and rendered **very frequently** during scroll and view changes.

The object passed to the template contains the following properties:
- `colors`: _Array&lt;MbscCalendarColor&gt;_ - The list of colors for the current cell.
- `date`: _Date_ – The current cell&#039;s date.
- `events`: _Array&lt;MbscCalendarEvent&gt;_ List of events for the current cell.
- `invalids`: _Array&lt;MbscCalendarInvalid&gt;_ - The list of invalids for the current cell.
- `resource`: _MbscResource_ - The resource object of the current cell.
- `slot`: _MbscSlot_ - The slot object of the rendered cell.

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