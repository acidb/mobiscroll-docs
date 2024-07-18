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