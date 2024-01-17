### renderDay {#renderer-renderDay}

(args: MbscCalendarDayData) => any


Customize the day cells of the calendar view and the date header in case of scheduler and timeline views.

If you are looking to customize only the day cells content and don&#039;t want to bother with the styling of the event,
in case of calendar and scheduler views you can use the [renderDayContent](#renderer-renderDayContent) option.

The following day specific details are available:
- `date`: _Date_ - The date of the rendered day.
- `selected`: _boolean_ - True if the date is selected (in case of the calendar view).
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the day.
- `resource`: _string | number_ - The id of the resource in case of the scheduler (week and month views)
when the events are grouped by resources.
- `isActive`: _boolean_ - True for the current day (in case of the timeline view).

**Default value**: `undefined`

### renderDayContent {#renderer-renderDayContent}

(args: MbscCalendarDayData) => any


Customize the day cells content of the event calendar. The Eventcalendar will take care of the styling and you can focus on
what you show beside the day number.

If you are looking to fully customize the day (e.g. add custom hover effects) you will need to use the
[renderDay](#renderer-renderDay) option.

The following properties are available:
 - `date`: _Date_ - The date of the rendered day.
 - `selected`: _boolean_ - True if the date is selected (in case of the calendar view).
 - `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the day.
 - `resource`: _string | number_ - The id of the resource in case of the scheduler (week and month views)
when the events are grouped by resources.

**Default value**: `undefined`

### renderDayFooter {#renderer-renderDayFooter}

(args: MbscCalendarDayData) => any


Customize the footer of each day for the timeline.

The following day specific details are available:
- `date`: _Date_ - The date of the day.
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the day.

**Default value**: `undefined`

### renderHeader {#renderer-renderHeader}

() => any


Customize the header of the event calendar.
You can use custom markup and the built in header components of the calendar.

**Default value**: `undefined`

### renderHour {#renderer-renderHour}

(args: MbscCalendarDayData) => any


Customize the header of the hour columns on the timeline view.

The following properties are available:
- `date`: _Date_ - The date and time of the rendered hour.
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the hour.
- `isActive`: _boolean_ - True for the current hour.

**Default value**: `undefined`

### renderHourFooter {#renderer-renderHourFooter}

(args: MbscCalendarDayData) => any


Customize the footer of the hour columns on the timeline view.

The following properties are available:
- `date`: _Date_ - The date and time of the rendered hour.
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the hour.
- `isActive`: _boolean_ - True for the current hour.

**Default value**: `undefined`

### renderMonth {#renderer-renderMonth}

(args: MbscCalendarDayData) => any


Customize the header of the month column on the timeline view.

The following properties are available:
 - `date`: _Date_ - First day of the rendered month.
 - `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the month.
 - `isActive`: _boolean_ - True for the current month.

**Default value**: `undefined`

### renderMonthFooter {#renderer-renderMonthFooter}

(args: MbscCalendarDayData) => any


Customize the footer of the month column on the timeline view.

The following properties are available:
 - `date`: _Date_ - First day of the rendered month.
 - `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the month.
 - `isActive`: _boolean_ - True for the current month.

**Default value**: `undefined`

### renderQuarter {#renderer-renderQuarter}

(args: MbscCalendarDayData) => any


Customize the header of the quarter columns on the timeline view.

The following properties are available:
- `date`: _Date_ - First day of the rendered quarter.
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the quarter.
- `isActive`: _boolean_ - True for the current quarter.

**Default value**: `undefined`

### renderQuarterFooter {#renderer-renderQuarterFooter}

(args: MbscCalendarDayData) => any


Customize the footer of the quarter column on the timeline view.

The following properties are available:
- `date`: _Date_ - First day of the rendered quarter.
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the quarter.
- `isActive`: _boolean_ - True for the current quarter.

**Default value**: `undefined`

### renderResource {#renderer-renderResource}

(resource: MbscResource) => any


Customize how the resources are rendered on the scheduler and timeline views.
The object of the rendered resource is available for use.

**Default value**: `undefined`

### renderResourceFooter {#renderer-renderResourceFooter}

() => any


Customize the cell content below the resource column on the timeline view,
when the [renderDayFooter](#renderer-renderDayFooter) option is also used.

**Default value**: `undefined`

### renderResourceHeader {#renderer-renderResourceHeader}

() => any


Customize the cell content above the resource column on the timeline view.

**Default value**: `undefined`

### renderScheduleEvent {#renderer-renderScheduleEvent}

(event: MbscCalendarEventData) => any


Customize the events that appear on the scheduler and timeline.
The Eventcalendar will take care of the positioning,
but everything else (like background color, hover effect, etc.) is left to you.

If you are looking to customize only the content (e.g. add custom elements) and don&#039;t want to bother with the styling of the event,
you can use the [renderScheduleEventContent](#renderer-renderScheduleEventContent) option.

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

### renderScheduleEventContent {#renderer-renderScheduleEventContent}

(event: MbscCalendarEventData) => any


Customize the event content that appears on the scheduler and timeline.
The Eventcalendar will take care of styling and you can focus on what you show inside of the event.

If you are looking to fully customize the event (e.g. add custom hover effects) you will need to use
the [renderScheduleEvent](#renderer-renderScheduleEvent) option. In that case you will only get
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

### renderSidebar {#renderer-renderSidebar}

(resource: MbscResource) => any


Add a custom sidebar on the right side of the timeline.
The object of the rendered resource is available for use.

**Default value**: `undefined`

### renderSidebarFooter {#renderer-renderSidebarFooter}

() => any


Customize the cell content below the sidebar column on the timeline view,
when the [renderSidebar](#renderer-renderSidebar) option is also used.

**Default value**: `undefined`

### renderSidebarHeader {#renderer-renderSidebarHeader}

() => any


Customize the cell content above the sidebar column on the timeline view,
when the [renderSidebar](#renderer-renderSidebar) option is also used.

**Default value**: `undefined`

### renderSlot {#renderer-renderSlot}

(args: MbscSlotData) => any


Customize the [slots](#opt-slots) template of the timeline view.

The following properties are available:
- `date`: _Date_ - The specific date where the slot is rendered.
- `slot`: _MbscSlot_ - The object of the rendered slot.

**Default value**: `undefined`

### renderWeek {#renderer-renderWeek}

(args: MbscCalendarDayData) => any


Customize the header of the week column on the timeline view.

The following properties are available:
 - `date`: _Date_ - First day of the rendered week.
 - `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the week.
 - `isActive`: _boolean_ - True for the current week.
 - `endDate`: _Date_ - The end date of the week.
 - `startDate`: _Date_ - The start date of the week.
 - `weekNr`: _number_ - The week number. Enumeration starts with the first week of the year.

**Default value**: `undefined`

### renderWeekFooter {#renderer-renderWeekFooter}

(args: MbscCalendarDayData) => any


Customize the footer of the week column on the timeline view.

The following properties are available:
 - `date`: _Date_ - First day of the rendered week.
 - `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the week.
 - `isActive`: _boolean_ - True for the current week.
 - `endDate`: _Date_ - The end date of the week.
 - `startDate`: _Date_ - The start date of the week.
 - `weekNr`: _number_ - The week number. Enumeration starts with the first week of the year.

**Default value**: `undefined`

### renderYear {#renderer-renderYear}

(args: MbscCalendarDayData) => any


Customize the header of the year column on the timeline view.

The following properties are available:
 - `date`: _Date_ - First day of the rendered year.
 - `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the year.
 - `isActive`: _boolean_ - True for the current year.

**Default value**: `undefined`

### renderYearFooter {#renderer-renderYearFooter}

(args: MbscCalendarDayData) => any


Customize the footer of the year column on the timeline view.

The following properties are available:
 - `date`: _Date_ - First day of the rendered year.
 - `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events for the year.
 - `isActive`: _boolean_ - True for the current year.

**Default value**: `undefined`
