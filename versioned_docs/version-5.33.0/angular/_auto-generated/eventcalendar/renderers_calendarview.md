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