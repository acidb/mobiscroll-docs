### actionableEvents {#opt-actionableEvents}

boolean

Specifies if the events on the agenda and inside the calendar popover are actionable or not.
If actionable, the event items will have hover and active states, and pointer cursor.
Set to `false` when custom event rendering is used and the event list items contain other actionable elements, e.g. buttons.

**Default value**: `true`
### clickToCreate {#opt-clickToCreate}

boolean &#124; "double" &#124; "single"

Enable new event creation on click. If `true` or `'double'`, a new event will be created only with a double click
and with the `'single'` value the event will be created instantly with a single click.

This option will only work on desktop environment where mouse events are fired.
It will also allow deleting of the focused events using the Delete or Backspace key.

In touch environment a long tap should be used to create a new event
and it is controlled by the [dragToCreate](#opt-dragToCreate) option.

Using the [extendDefaultEvent](#opt-extendDefaultEvent) option extra properties can be set for the created event.

The event deletion functionality can be overwritten using the [eventDelete](#opt-eventDelete) option.

**Default value**: `undefined`
### colors {#opt-colors}

Array&lt;MbscCalendarColor&gt;

Specifies the color for certain dates or date ranges on the calendar.
The color object has the following properties:
- `allDay`: *boolean* - Specifies whether the date you want to color is all day or not.
- `background`: *string* - Background color of the cell, can be any valid CSS color (`'red'`, `'#ff0000'`, `'rgb(255, 0, 0)'`, etc.).
- `cellCssClass`: *string* - CSS class for the day cell. Only applicable for the calendar view.
- `cssClass` *string* - Specifies a custom CSS class for the color.
Useful when customization is needed for the background of cells and time ranges.
Only applicable for the timeline and scheduler views.
- `date`: *Date | string | object* - Date of the calendar day which should be colored.
- `start`: *Date | string | object* - Start of the colored range.
- `end`: *Date, string | object* - End of the colored range.
- `highlight`: *string* - Highlight color of the day, can be any valid CSS color (`'red'`, `'#ff0000'`, `'rgb(255, 0, 0)'`, etc.).
- `recurring`: *string | object* - Recurrence rule for coloring recurring days.
- `recurringException`: *string | object | Array&lt;string | object&gt;* - Exception dates of the recurring rule.
Useful when specific dates need to be skipped from the rule.
- `recurringExceptionRule`: *string | object* - Exception rule of the recurring rule.
Useful when recurring dates need to be skipped from the rule.
- `resource`: *string | number | Array&lt;string | number&gt;* - Specifies the [resource](#opt-resources) ids for the color.
The color will be displayed only in the specified resource.
If there is no resource defined, the color will be displayed in every resource.
- `slot`: *string | number* - Specifies the [slot](#opt-slots) id for the color.
The color will be displayed only in the specified slot.
If there is no slot defined, the color will be displayed in every slot.
- `textColor`: *string* - Specifies the text color of the colored range title.
- `title`: *string* - Text which will be displayed for the colored range. Only applicable for the timeline and scheduler views.

:::info
The colored range will be considered all-day if:
- the `allDay` property is explicitly set.
- the `start` / `end` properties are not specified, only the `date`.
:::
:::info
The dates can be specified as JavaScript Date objects, ISO 8601 strings, or moment objects.
:::
:::info
The colors can be combined with the [labels](#opt-labels) or [marked](#opt-marked) options.
:::

```js
[
  { date: new Date(2020, 2, 23), background: 'pink' },
  { date: new Date(2020, 2, 24), background: 'green' },
  { background: '#ff0000', recurring: { repeat: 'weekly', weekDays: 'SU' } },
  { background: 'yellow', recurring: { repeat: 'weekly', weekDays: 'SA' } }
]
```

**Default value**: `undefined`
### connections {#opt-connections}

Array&lt;MbscEventConnection&gt;

Specifies connections between events. On the UI events will be linked with lines
and additionally arrows can be displayed to illustrate the direction of the connection.
Events can have multiple connections simultaneously.

An array of connection objects can be passed.
The connection object has the following properties:
- `arrow`: *boolean | &#039;from&#039; | &#039;to&#039; | &#039;bidirectional&#039;* - Specify where to display arrows.
If `true`, the arrow will display only at the end side of the connection.
- `color`: *string* - The color of the connection.
- `cssClass`: *string* - Custom CSS class for the connection line for further customization.
- `from`: *string* - The id of the event where the connection will begin.
- `to`: *string* - The id of the event where the connection will end.
- `type`: *&#039;fs&#039; | &#039;sf&#039; | &#039;ss&#039; | &#039;ff&#039;* - The type of the connection.
Defaults to &#039;fs&#039;
Meaning of abbreviations:
fs - finish-to-start, sf - start-to-finish, ss - start-to-start, ff - finish-to-finish.

**Default value**: `undefined`
### cssClass {#opt-cssClass}

string

Specifies a custom CSS class for the component.

**Default value**: `undefined`
### data {#opt-data}

Array&lt;MbscCalendarEvent&gt;

The events for the calendar, as an array of event objects. The event object supports the following properties:
- `allDay`: *boolean* - Specifies if the event is all day or not.
- `bufferBefore`: *number* - Specifies a buffer time in minutes that will be displayed before the start of the event.
- `bufferAfter`: *number* - Specifies a buffer time in minutes that will be displayed after the end of the event.
- `color`: *string* - The color of the event.
- `cssClass` *string* - Custom CSS class for the event.
Useful when customization is needed on the event level.
For example: setting the width for specific events.
- `dragBetweenResources`: *boolean* - Specifies whether the event is movable across resources.
It applies for scheduler and timeline views.
Has precedence over the `eventDragBetweenResources` property of the resource
and the [dragBetweenResources](#opt-dragBetweenResources) option.
- `dragInTime`: *boolean* - Specifies whether the event is movable in time.
Has precedence over the `eventDragInTime` property of the resource and the [dragInTime](#opt-dragInTime) option.
- `editable`: *boolean* - Specifies if an event is editable or not. Setting it to `false` disables drag &amp; drop, resize and delete,
- `end`: *Date | string | object* - The end of the event.
- `order`: *number* - Specifies the order of the event in the event array.
Has precedence over the default ordering rules.
- `overlap`: *boolean* - Specifies whether any overlap is allowed for the event.
Has precedence over the `eventOverlap` property of the resource and the [eventOverlap](#opt-eventOverlap) option.
- `id`: *string | number*, Number - A unique id for the event. If not specified, the event will get a generated id.
and the event will have the `mbsc-readonly-event` CSS class. With this class, the fixed events will be easily customizable,
for example: add opacity or disable the cursor on the fixed events.
- `recurring`: *string | object* - Recurrence rule for the event.
- `recurringException`: *string | object | Array&lt;string | object&gt;* - Exception dates of the recurring rule.
Useful when specific dates need to be skipped from the rule.
- `recurringExceptionRule`: *string | object* - Exception rule of the recurring rule.
Useful when recurring dates need to be skipped from the rule.
- `resize`: *boolean* - Specifies whether the event is resizable.
Has precedence over the `eventResize` property of the resource and the [dragToResize](#opt-dragToResize) option.
- `resource`: *string | number | Array&lt;string | number&gt;* - Specifies the [resource](#opt-resources) ids for the event.
The event will be displayed only in the specified resources.
If there is no resource defined, the event will be displayed in every resource.
- `slot`: *string | number* - Specifies the [slot](#opt-slots) id for the event.
- `start`: *Date | string | object* - The start of the event.
The event will be displayed only in the specified slot.
If there is no slot defined, the event will be displayed in every slot.
- `title`: *string* - The title of the event.
- `tooltip`: *string* - The tooltip text of the event.

:::info
The dates can be specified as JavaScript Date objects, ISO 8601 strings, or moment objects.
:::
:::info
The event objects may have additional custom properties as well.
The custom properties are not used by the event calendar, but they are kept and will be available anywhere the event objects are used.
E.g. the [onEventClick](#event-onEventClick) event will receive the event object as argument, containing the custom properties as well.
:::
:::info
Use the [getEvents](#method-getEvents) method to get the events between two dates.
:::

```js
data: [
  {
    start: new Date(2021, 5, 23),
    end: new Date(2021, 5, 30),
    title: 'Conference',
    allDay: true,
    color: 'red'
  },
  {
    title: 'Work project',
    recurring: {
      repeat: 'daily',
      until: '2021-04-01'
    },
    recurringException: ['2021-03-15', '2021-03-25'],
    recurringExceptionRule: {
      repeat: 'weekly',
      weekDays: 'SA,SU'
    }
  }
]
```

**Default value**: `undefined`
### dataTimezone {#opt-dataTimezone}

string

The timezone in which the data is interpreted. If the data contains timezone information
(when the ISO string has a timezone offset, e.g. `"2021-03-28T01:00:00Z"` or `"2021-03-28T03:00:00+03:00"`)
then the data&#039;s timezone is used instead.

:::info
When using timezones, the [exclusiveEndDates](#opt-exclusiveEndDates) option is also turned on by default.
:::
:::info
When using anything other than the default (`'local'`), a [timezone plugin](#opt-timezonePlugin)
must be also passed to the component.
:::

Possible values:
- `'local'` - The system&#039;s local timezone.
- `'utc'` - UTC (Universal Coordinated Time) timezone.
- Timezone name - The timezone name from the
[IANA time zone database](https://gist.github.com/aviflax/a4093965be1cd008f172), e.g. `"America/New_York"`.

If not specified, it defaults to the [displayTimezone](#opt-displayTimezone).

**Default value**: `undefined`
### defaultSelectedDate {#opt-defaultSelectedDate}

MbscDateType

Specifies the initial selected date on the calendar.

For views, where time is also displayed, the view will be scrolled to the specified time.
If the time part is not explicitly specified, it defaults to the start of the day.

**Default value**: `undefined`
### displayTimezone {#opt-displayTimezone}

string

The timezone in which the data is displayed.

:::info
When using timezones, the [exclusiveEndDates](#opt-exclusiveEndDates) option is also turned on by default.
:::
:::info
When using anything other than the default (`'local'`), a [timezone plugin](#opt-timezonePlugin)
must be also passed to the component.
:::

Possible values:
- `'local'` - The system&#039;s local timezone.
- `'utc'` - UTC (Universal Coordinated Time) timezone.
- Timezone name - The timezone name from the
[IANA time zone database](https://gist.github.com/aviflax/a4093965be1cd008f172), e.g. `"America/New_York"`.

**Default value**: `'local'`
### dragBetweenResources {#opt-dragBetweenResources}

boolean

If `false`, the events will not be moveable across resources, only in time.
To control movement in time, use the [dragInTime](#opt-dragInTime) option.

Consider that [dragToMove](#opt-dragToMove) has to be enabled.

**Default value**: `true`
### dragBetweenSlots {#opt-dragBetweenSlots}

boolean

If `false`, the events will not be moveable across slots, only in time and resource.
To control movement in time, use the [dragInTime](#opt-dragInTime) option.

Consider that [dragToMove](#opt-dragToMove) has to be enabled.

**Default value**: `true`
### dragInTime {#opt-dragInTime}

boolean

If `false`, the events will not be moveable in time.
In case of the scheduler and timeline views events events can still be moved between resources.
To control movement between resources, use the [dragBetweenResources](#opt-dragBetweenResources) option.

Consider that [dragToMove](#opt-dragToMove) has to be enabled.

**Default value**: `true`
### dragTimeStep {#opt-dragTimeStep}

number

Specifies the steps in minutes for the scheduler and timeline events during drag.

**Default value**: `15`
### dragToCreate {#opt-dragToCreate}

boolean

If `true`, dragging on an empty cell will create a new event.
It will also allow deleting of the focused events using the Delete or Backspace key.

The title of the new event can be specified with the [newEventText](#opt-newEventText) option.

Using the [extendDefaultEvent](#opt-extendDefaultEvent) option extra properties can be set for the created event.

The event deletion functionality can be overwritten using the [eventDelete](#opt-eventDelete) option.

**Default value**: `undefined`
### dragToMove {#opt-dragToMove}

boolean

If `true`, the events will be moveable.

**Default value**: `undefined`
### dragToResize {#opt-dragToResize}

boolean

If `true`, the events will be resizable.

**Default value**: `undefined`
### eventDelete {#opt-eventDelete}

boolean

Enables or disables event deletion. When `true`, the focused event will be deleted on pressing the Delete or Backspace
keys on the keyboard.

By default the event deletion depends on the [clickToCreate](#opt-clickToCreate) and [dragToCreate](#opt-dragToCreate) options.
If either of those are `true`, and no `eventDelete` option is set, then event deletion is also enabled, otherwise not.

**Default value**: `undefined`
### eventOrder {#opt-eventOrder}

(event1: MbscCalendarEvent, event2: MbscCalendarEvent) => number


Determines the ordering of the events within the same day.
Can be a function that accepts two event objects as arguments and should return -1 or 1.

If not specified, the default order is:
- all day events
- rest of events, sorted by start time; events with identical start times,
will be ordered alphabetically based on their title

**Default value**: `undefined`

### eventOverlap {#opt-eventOverlap}

boolean

If `false`, the events cannot overlap.

**Default value**: `true`
### exclusiveEndDates {#opt-exclusiveEndDates}

boolean

If `true`, the Eventcalendar will work in exclusive end dates mode,
meaning that the last moment of the range (event, invalid, colors, etc.) is not part of the range.

E.g. `end: '2021-07-03T00:00'` means that the event ends on 2nd of July and will not be displayed on 3rd of July.

:::info
When using timezones, the `exclusiveEndDates` option will default to `true`.
:::
### extendDefaultEvent {#opt-extendDefaultEvent}

(args: MbscNewEventData) => MbscCalendarEvent


Use this option to set properties to the new event created with click or drag.
The event creation is handled by the [clickToCreate](#opt-clickToCreate) and [dragToCreate](#opt-dragToCreate) options.
It takes a function that should return the properties for the new event.
The argument object passed to this function has the following properties:
- `start`: *Date* - The date when the newly created event will start.
- `resource`: *string | number* - The id of the resource where the event creation started.

```js
extendDefaultEvent: (args) => {
  return {
    color: args.resource === 'admin' ? 'green' : 'red',
    title: 'My event',
  };
}
```

**Default value**: `undefined`

### externalDrag {#opt-externalDrag}

boolean

If `true`, external drag &amp; drop is allowed and events can be dragged outside of the component view.

**Default value**: `undefined`
### externalDrop {#opt-externalDrop}

boolean

If `true`, external events can be  dragged into the view.

**Default value**: `undefined`
### groupBy {#opt-groupBy}

"resource" &#124; "date"

Groups the [events](#opt-data) by date or by [resource](#opt-resource).

**Default value**: `'resource'`
### height {#opt-height}

string &#124; number

Sets the height of the component.

The height of the calendar view impacts the number of labels that fit into a table cell.
A &quot;show more&quot; label will be displayed for events that don&#039;t fit.

**Default value**: `undefined`
### immutableData {#opt-immutableData}

boolean

If `true`, the Eventcalendar will work in immutable mode.
In this mode the component won&#039;t update the data directly,
only fire the necessary lifecycle events, where the original data can be updated manually.

**Default value**: `undefined`
### invalid {#opt-invalid}

Array&lt;MbscDateType&gt; &#124; Array&lt;IValidateProps&gt;

An array containing the invalid values. Can contain dates,
or objects with the following properties:
- `allDay`: *boolean* - Specifies whether the invalid range is all day or not.
- `start`: *Date | string | object* - Start of the invalid range.
- `end`: *Date, string | object* - End of the invalid range.
- `recurring`: *string | object* - Recurrence rule for recurring invalid ranges.
- `recurringException`: *string | object | Array&lt;string | object&gt;* - Exception dates of the recurring rule.
Useful when specific dates need to be skipped from the rule.
- `recurringExceptionRule`: *string | object* - Exception rule of the recurring rule.
Useful when recurring dates need to be skipped from the rule.
- `resource`: *string | number | Array&lt;string | number&gt;* - Specifies the [resource](#opt-resources) ids for the invalid range.
The invalid range will be displayed only in the specified resource.
If there is no resource defined, the invalid range will be displayed in every resource.
- `slot`: *string | number* - Specifies the [slot](#opt-slots) id for the invalid range.
The invalid range will be displayed only in the specified slot.
If there is no slot defined, the invalid range will be displayed in every slot.
- `title`: *string* - Text which will be displayed for the invalid range. Only applicable for the timeline and scheduler views.

:::info
The dates can be specified as JavaScript Date objects, ISO 8601 strings, or moment objects.
:::

```js
[
  // Passing exact dates and times
  new Date(2021, 1, 7), // Date object
  '2021-10-15T12:00', // ISO 8601 string
  moment('2020-12-25'), // moment object

  // Passing invalid ranges
  {
    // ISO 8601 strings
    start: '2021-10-15T12:00',
    end: '2021-10-18T13:00',
    title: 'Company 10th anniversary',
  },
  {
    // Date objects
    allDay: true,
    start: new Date(2021, 2, 7),
    end: new Date(2021, 2, 9),
    title: 'Conference for the whole team',
  },
  {
    // Time range with recurrence
    start: '13:00',
    end: '12:00',
    recurring: { repeat: 'weekly', weekDays: 'MO,TU,WE,TH,FR' },
    title: 'Lunch break',
  },
  {
    // Disable weekends
    recurring: {
      repeat: 'weekly',
      weekDays: 'SA,SU'
    }
  }
]
```

**Default value**: `undefined`
### invalidateEvent {#opt-invalidateEvent}

"strict" &#124; "start-end"

Specifies how to validate events against [invalid](#opt-invalid) ranges on create/move/resize:
- `'strict'` - The event cannot intersect with an invalid range at all.
- `&#039;start-end&#039; - The event start and end cannot be inside an invalid range.

**Default value**: `'strict'`
### labels {#opt-labels}

Array&lt;MbscCalendarLabel&gt;

Specifies labels for calendar days.
A label object can have the following properties:
- `cellCssClass`: *string* - CSS class for the day cell. Only applicable for the calendar view.
- `color`: *string* - The color of the label, can be any valid CSS color (`'red'`, `'#ff0000'`, `'rgb(255, 0, 0)'`, etc.).
- `date`: *Date | string | object* - Date of the calendar label for single day labels.
- `start`: *Date | string | object* - Start of the calendar label.
- `end`: *Date, string | object* - End of the calendar label.
- `text`: *string* - The text of the label.
- `recurring`: *string | object* - Recurrence rule for recurring labels.
- `recurringException`: *string | object | Array&lt;string | object&gt;* - Exception dates of the recurring rule.
Useful when specific dates need to be skipped from the rule.
- `recurringExceptionRule`: *string | object* - Exception rule of the recurring rule.
Useful when recurring dates need to be skipped from the rule.

:::info
The dates can be specified as JavaScript Date objects, ISO 8601 strings, or moment objects.
:::
:::info
The labels can be combined with the [colors](#opt-colors) option.
:::

```js
[
  {
    start: new Date(2020, 2, 23),
    end: new Date(2020, 2, 24),
    text: 'Conference',
    color: 'red'
  },
  {
    text: 'Christmas',
    recurring: { repeat: 'yearly', month: 12, day: 24 }
  }
]
```

**Default value**: undefined
### marked {#opt-marked}

Array&lt;MbscCalendarMarked&gt;

Mark certain dates on the calendar. An array containing dates, or objects with the following properties:
- `cellCssClass`: *string* - CSS class for the day cell. Only applicable for the calendar view.
- `color`: *string* - The color of the mark, can be any valid CSS color (`'red'`, `'#ff0000'`, `'rgb(255, 0, 0)'`, etc.).
- `date`: *Date | string | object* - ate of the day to be marked.
- `start`: *Date | string | object* - Start date of the days to be marked.
- `end`: *Date, string | object* - End date of the days to be marked.
- `markCssClass`: *string* - CSS class for the mark.
- `recurring`: *string | object* - Recurrence rule for recurring marked days.
- `recurringException`: *string | object | Array&lt;string | object&gt;* - Exception dates of the recurring rule.
Useful when specific dates need to be skipped from the rule.
- `recurringExceptionRule`: *string | object* - Exception rule of the recurring rule.
Useful when recurring dates need to be skipped from the rule.

:::info
The dates can be specified as JavaScript Date objects, ISO 8601 strings, or moment objects.
:::
:::info
The marked days can be combined with the [colors](#opt-colors) option.
:::

```js
[
  new Date(2020, 2, 15),
  new Date(2020, 2, 22),
  {
    start: new Date(2020, 2, 23),
    end: new Date(2020, 2, 24),
    color: 'red'
  },
  {
    color: 'green',
    recurring: { repeat: 'yearly', month: 12, day: 24 }
  }
]
```

**Default value**: `undefined`
### max {#opt-max}

MbscDateType

Maximum date and time. The calendar cannot be navigated beyond the specified maximum date.
If navigation is needed, but event creation should not be allowed after a specific date,
use the [invalid](#opt-invalid) option with daily recurrence starting from the specific date.

**Default value**: `undefined`
### min {#opt-min}

MbscDateType

Minimum date and time. The calendar cannot be navigated beyond the specified minimum date.
If navigation is needed, but event creation should not be allowed before a specific date,
use the [invalid](#opt-invalid) option with daily recurrence until the specific date.

**Default value**: `undefined`
### refDate {#opt-refDate}

MbscDateType

Specifies the reference date for the view calculation, when multiple days, weeks, months or years are displayed.
If not specified, for the scheduler and timeline views will be today&#039;s date, for the calendar and agenda views will be 1970/01/01.

It denotes the reference point when calculating the pages going in the future and in the past.
For example if the view type is day, the view size is 3, and the current date is `01/16/2024`,
the pages are calculated from this date, so the initial page will contain `[01/16/2024, 01/16/2024, 01/17/2024]`,
the next page `[01/18/2024, 01/19/2024, 01/20/2024]` and so on.

In case of day view, the reference point will be exactly the specified date.
For week, month and year views the reference point will be the start of the week, month or year of the specified day.

Changing the reference date will not navigate the calendar to the specified date,
it only recalculates the pages from the new reference date.
To navigate the view to a specified date and time, use the [selectedDate](#opt-selectedDate) option.

**Default value**: `undefined`
### resources {#opt-resources}

Array&lt;MbscResource&gt;

The scheduler and timeline views can handle multiple resources.
Resource grouping can be modified with the help of the [groupBy](#opt-groupBy) option.

If set to `null` or `undefined`, all events will be displayed, regardless of their `resource` property.
The timeline view will not display the resource column, if the resources option is not set.

If set to an empty array, only those events will be displayed which are not tied to any resource.
The timeline view will display an empty resource column when an empty array is passed.

The timeline view can render multiple levels of hierarchy groups. Levels can be added with the help of the `children` property.

The resource object supports the following properties:
- `background`: *string* - Background color of the resource row or column.
- `children`: *Array&lt;MbscResource&gt;* - Children resources.
- `collapsed`: *boolean* - The displayed state of the children resources.
- `cssClass`: *string* - Css class for the resource row or column.
- `id`: Number, *string* - The id of the resource.
- `name`: *string* - The name of the resource.
- `color`: *string* - The color sets the default color for the events of the resource.
If an event has an explicit color set, the resource color will be overridden.
If the color is not set, the events of the resource will inherit the default calendar color.
- `eventCreation`: *boolean* - Disable event creation on specific resources by setting it to `false`. It&#039;s `true` by default.
- `eventDragBetweenResources`: *boolean* - Specifies whether the events in the specified resource are movable across resources.
It applies for scheduler and timeline views.
Has precedence over the [dragBetweenResources](#opt-dragBetweenResources) option.
- `eventDragInTime`: *boolean* - Specifies whether the events in the specified resource are movable in time.
Has precedence over the [dragInTime](#opt-dragInTime) option.
 - `eventOverlap`: *boolean* - Specifies whether any overlap is allowed for the events in the specified resource.
Has precedence over the [eventOverlap](#opt-eventOverlap) option.
- `eventResize`: *boolean* - Specifies whether the events in the specified resource are resizable.
Has precedence over the [dragToResize](#opt-dragToResize) option.
- `fixed`: *boolean* - Specifies whether the resource is fixed to the top.
It applies for timeline view if `resolutionVertical` in [view](#opt-view) option is not given, or it&#039;s value is set to `none`.
Consider that the fixed resources always have to be the first elements of the array in a sequence
(no non-fixed resources inserted in between) so that the drag&amp;drop and event creation functionalities to work properly.

```js
resources: [
  {
    id: 1,
    name: 'Flatiron Room',
    color: '#f7c4b4'
  },
  {
    id: 2,
    name: 'The Capital City',
    color: '#c6f1c9'
  },
  {
    id: 3,
    name: 'Heroes Square',
    color: '#e8d0ef'
  }
]
```

**Default value**: `undefined`
### responsive {#opt-responsive}

missing

Specifies different options for different container widths, in a form of an object,
where the keys are the name of the breakpoints, and the values are objects containing the options for the given breakpoint.

:::info
The available width is queried from the container element of the component and not the browsers viewport like in css media queries
:::
There are five predefined breakpoints:

- `xsmall` - min-width: 0px
- `small` - min-width: 576px
- `medium` - min-width: 768px
- `large` - min-width: 992px
- `xlarge` - min-width: 1200px

Custom breakpoints can be defined by passing an object containing the `breakpoint` property specifying the min-width in pixels.
Example:

```
responsive: {
  small: {
    display: 'bottom'
  },
  custom: { // Custom breakpoint
    breakpoint: 600,
    display: 'center'
  },
  large: {
    display: 'anchored'
  }
}
```

**Default value**: `undefined`
### selectMultipleEvents {#opt-selectMultipleEvents}

boolean

When `true`, enables multiple event selection on the calendar.

**Default value**: `false`
### selectedDate {#opt-selectedDate}

MbscDateType

Specifies the selected date on the calendar.
This can be changed programmatically and when changed the calendar will automatically navigate to the specified date.

For views, where time is also displayed, the view will be scrolled to the specified time.
If the time part is not explicitly specified, it defaults to the start of the day.

This does not change the reference date that defines the reference point of the navigation pages.
To change the reference point for the navigation (e.g. start the paging from the newly selected date)
use the [refDate](#opt-refDate) option.

You also need to pass a handler for the [onSelectedDateChange](#event-onSelectedDateChange) event
to update the selected date when the date is changed from the calendar.

**Default value**: `undefined`
### selectedEvents {#opt-selectedEvents}

Array&lt;MbscCalendarEvent&gt;

Specifies the selected events on the calendar. The [onSelectedEventsChange](#event-onSelectedEventsChange) event will be
fired when the selected events change from the calendar.

**Default value**: `undefined`
### separator {#opt-separator}

string

Separator between date and time in the formatted date string.

**Default value**: `' '`
### showControls {#opt-showControls}

boolean

Show or hide the calendar header controls: the previous and next buttons,
and the current view button together with the year and month picker.

**Default value**: `true`
### showEventBuffer {#opt-showEventBuffer}

boolean

If `true`, it will display the event buffers defined in the [event data](#opt-data).

**Default value**: `true`
### showEventTooltip {#opt-showEventTooltip}

boolean

If `false`, it will hide the native tooltip that shows up when hovering over an event.

**Default value**: `true`
### slots {#opt-slots}

Array&lt;MbscSlot&gt;

The slots besides the [resources](#opt-resources) introduce a horizontal level of data grouping to the timeline view.

If set to `null` or `undefined`, all events will be displayed, regardless of their slot property.
If set to an empty array, only those events will be displayed which are not tied to any slot.

The slot object supports the following properties:

- `id`: *string | number* - The id of the slot.
- `name`: *string* - The name of the slot.

```js
slots: [
  {
    id: 1,
    name: 'Morning shift',
  },
  {
    id: 2,
    name: 'Afternoon shift',
  }
]
```

**Default value**: `undefined`
### theme {#opt-theme}

string

Specifies the visual appearance of the component.

If it is `'auto'` or `undefined`, the theme will automatically be chosen based on the platform.
If custom themes are also present, they will take precedence over the built in themes, e.g. if there&#039;s an iOS based custom theme,
it will be chosen on the iOS platform instead of the default iOS theme.

Supplied themes:
- `'ios'` - iOS theme
- `'material'` - Material theme
- `'windows'` - Windows theme

It&#039;s possible to [modify theme colors](../theming/sass-variables) or
[create custom themes](../theming/sass-themes).

:::info
Make sure that the theme you set is included in the downloaded package.
:::

**Default value**: `undefined`
### themeVariant {#opt-themeVariant}

"auto" &#124; "dark" &#124; "light"

Controls which variant of the [theme](#opt-theme) will be used (light or dark).

Possible values:
- `'light'` - Use the light variant of the theme.
- `'dark'` - Use the dark variant of the theme.
- `'auto'` or `undefined` - Detect the preferred system theme on devices where this is supported.

To use the option with custom themes, make sure to create two custom themes, where the dark version has the same name as the light one,
suffixed with `'-dark'`, e.g.: `'my-theme'` and `'my-theme-dark'`.

**Default value**: `undefined`
### timezonePlugin {#opt-timezonePlugin}

MbscTimezonePlugin

Specifies the timezone plugin, which can handle the timezone conversions.

By default the component uses the local timezone of the browser to interpret dates.
If you want to interpret dates a different timezone,
you will need an external library to handle the timezone conversions.
There are two supported libraries: [moment-timezone](https://momentjs.com/timezone/)
and [luxon](https://moment.github.io/luxon/#/).

You can specify either the [dataTimezone](#opt-dataTimezone) or the [displayTimezone](#opt-displayTimezone) or both.

Depending on which external library you use you can pass either the `momentTimezone` or `luxonTimezone`
objects. These objects can be imported from the mobiscroll bundle.

**Default value**: `undefined`
### view {#opt-view}

MbscEventcalendarView

Configures the Eventcalendar view. Possible views:

`calendar`: Configures the calendar view. Properties:
- `type`: *&#039;week&#039; | &#039;month&#039; | &#039;year&#039;* (default `'month'`) - Sets the calendar type.
- `size`: *number* (default `1`) - Specifies the number of displayed weeks or months.
- `count`: *boolean* (default `false`) - If `true`, it will display the number of events on the days with events.
- `outerDays`: *boolean* (default `false`) - Show or hide days from previous and next months. Does not apply to week view.
- `labels`: *boolean | number | &#039;all&#039;* (default `true`) - Enable displaying events as labels on calendar days.
  - If set to `true`, events will be displayed in the available space.
  If there are more events for a day, than the available space,
  a label with &quot;more&quot; text will be displayed, which opens a popover showing all the events for the given day.
  To fit more events on a day, set the calendar height to an appropriate value, using the [height](#opt-height) option.
  - If set to `'all'`, all the events will be displayed in the calendar cell and
  the row height will auto-expand based on the displayed events.
  The view will became scrollable if the rows overflow the available height.
  - Specify a number to set how many events will be displayed before the &quot;more&quot; button in a calendar cell.
  The row height will auto expand until the labels count reaches the given number and after that the &quot;x more&quot; button will be displayed.
  In the case when only one event should go in the &quot;more&quot; popup, that event will be displayed in the place of the &quot;x more&quot; button.
- `popover`: *boolean* (default `undefined`) - Enable popover on days containing events. If not explicitly defined,
  the popover will not show up if an agenda view is also displayed. If event labels are displayed,
  the popover will only show up for days where the labels do not fit on the calendar, and a &quot;more&quot; label is present.
- `popoverClass`: *string* (default `undefined`) - A custom CSS class added to the popover element.
  Can be used to customize the styling of the popover.
- `scroll`: *&#039;horizontal&#039; | &#039;vertical&#039;* (default `'horizontal'`) - Specifies the direction of the calendar scroll.
- `weekNumbers`: *boolean* (default `false`) - Show or hide week numbers.

`agenda`: Configures the agenda view. Properties:
- `type`: *&#039;day&#039; | &#039;week&#039; | &#039;month&#039; | &#039;year&#039;* (default `'month'`) - Sets the agenda type.
  If calendar is also displayed, only `'month'`, `'week'` and `'day'` values are supported.
  In case of month and week, the type and size should match the calendar type and size.
  In case of day type events on the selected calendar day will be displayed, so size will always be `1`.
- `size`: *number* (default `1`) - Specifies the number of displayed years, months, weeks or days.
- `scrollable`: *boolean* (default `true`) - Setting this to `true` makes the agenda independently scrollable.
  :::info
  There are two prerequisites for making this work:

  1 - The calendar needs to be to placed inside a container which has a height. This can be either a fixed height,
  a height in percentage, or a flex height. When the calendar is placed directly in a container with a fixed height,
  it will work out of the box. If the height of the container is specified in percentage,
  e.g. you&#039;d like to fill the full page height, you need to make sure that all parent elements also have `'height: 100%'` specified,
  up until the `body` and `html` elements, or until the closest parent which has a fixed height.
  If the container is inside a parent with flex layout, it will also work out of the box.

  2 - The agenda needs a minimum height of 200px - the result of the container height
  minus the height of the calendar header minus the height of the displayed calendar rows.
  If the calculated height is less then 200px, the agenda will not be scrollable.
  :::

`schedule`: Configures the scheduler view. Properties:
- `type`: *&#039;day&#039; | &#039;week&#039; | &#039;month&#039;* (default `'week'`) - Sets the scheduler type.
- `size`: *number* (default: `1`)- Specifies the number of displayed months, weeks or days.
- `allDay`: *boolean* (default `true`) - Show or hide the all day events.
- `currentTimeIndicator`: *boolean* (default `true`) - Show or hide the current time indicator.
- `days`: *boolean* (default `true`) - Show or hide week days above the scheduler grid.
- `startDay`: *number* (default `0`) - Specifies the first visible weekday of the view. Sunday is 0, Monday is 1, etc.
  Days outside of the `startDay` and `endDay` range will not be visible.
  Should not be mistaken for the [firstDay](#localization-firstDay) option,
  which sets the first day of the week, and, if not set, is defined by the [localization](#localization-locale).
- `endDay`: *number* (default `6`) - Specifies the last visible weekday of the view. Sunday is 0, Monday is 1, etc.
- `startTime`: *string* (default `'00:00'`) - Set the start time of scheduler column.
  Hours and minutes can be specified in the same string, example: `'09:30'`.
- `endTime`: *string* (default `'24:00'`) - Set the end time of scheduler column.
  Hours and minutes can be specified in the same string, example: `'18:30'`.
- `maxEventStack`: *&#039;all&#039; | &#039;auto&#039; | number* - Limit the number of displayed events. When the number of overlapping events reaches the
  specified value, a &quot;more&quot; button will be displayed which opens a popover showing the rest of the events.
    - If it is a `number`, it specifies how many events will be displayed before the &quot;more&quot; button appears.
    - If set to `'all'`, all events will be displayed.
    - If set to `'auto'`, the component will decide how many events can be placed inside the column,
  based on the `minEventWidth` view option and the actual column width.
- `minEventWidth`: *number* - Specifies the minimum event width. Will be used when `maxEventStack: 'auto'` is used.
- `timeCellStep`: *number* (default `60`) - Set the step of the grid cells in minutes.
  Supported values: 1, 5, 10, 15, 20, 30, 60, 120, 180, 240, 360, 480, 720, 1440.
- `timeLabelStep`: *number* (default `60`) - Set the step of the time labels in minutes.
  Supported values: 1, 5, 10, 15, 20, 30, 60, 120, 180, 240, 360, 480, 720, 1440.
- `timezones`: *Array&lt;string | object&gt;* - Display times in multiple timezones on the time scale and time indicator.
  The timezones array can contain timezone strings or objects with timezone and label properties.
  Timezone strings must use the name from the [IANA time zone database](https://gist.github.com/aviflax/a4093965be1cd008f172).
  If no label is provided, the time column label will be UTC +/- the timezone offset.
   ```js
   timezones: ['Europe/Berlin','Europe/Bucharest']
   ```

   ```js
   timezones: [
     { timezone: 'America/Chicago', label: 'CHI'},
     { timezone: 'America/New_York', label: 'NY'}
   ]
   ```

`timeline`: Configures the timeline view. Properties:
- `type`: *&#039;day&#039; | &#039;week&#039; | &#039;month&#039; | &#039;year&#039;* (default `'week'`) - Sets the timeline type.
- `size`: *number* (default: `1`)- Specifies the number of displayed years, months, weeks or days.
- `resolutionHorizontal`: *&#039;hour&#039;, &#039;day&#039;, &#039;week&#039;, &#039;month&#039;, &#039;quarter&#039;, &#039;year&#039;* (default &#039;hour&#039;) -
  Sets the horizontal resolution of the timeline.
  In case of hourly resolution, the columns can be split to minutes (1, 5, 15, 20, 30) or merge to multiple
  hours (2, 3, 4, 6, 8, 12) using the `timeCellStep` and `timeLabelStep` properties.
- `currentTimeIndicator`: *boolean* - Show or hide the current time indicator.
  Defaults to `true`, when the horizontal resolution is less than a day.
- `startDay`: *number* (default `0`) - Specifies the first visible weekday of the view. Sunday is 0, Monday is 1, etc.
  Days outside of the `startDay` and `endDay` range will not be visible.
  Should not be mistaken for the [firstDay](#localization-firstDay) option,
  which sets the first day of the week, and, if not set, is defined by the [localization](#localization-locale).
- `endDay`: *number* (default `6`) - Specifies the last visible weekday of the view. Sunday is 0, Monday is 1, etc.
- `maxEventStack`: *&#039;all&#039; | number* - Limit the number of displayed events. When the number of overlapping events reaches
  the specified value, a &quot;more&quot; button will be displayed which opens a popover showing the rest of the events.
    - If it is a `number`, it specifies how many events will be displayed before the &quot;more&quot; button appears.
    - If set to `'all'`, all events will be displayed.
- `startTime`: *string* (default `'00:00'`) - Set the start time of the timeline days.
  Hours and minutes can be specified in the same string, example: `'09:30'`.
- `endTime`: *string* (default `'24:00'`) - Set the end time of the timeline days.
  Hours and minutes can be specified in the same string, example: `'18:30'`.
- `timeCellStep`: *number* (default `60`) - Set the step of the grid cells in minutes.
  Supported values: 1, 5, 10, 15, 20, 30, 60, 120, 180, 240, 360, 480, 720, 1440.
- `timeLabelStep`: *number* (default `60`) - Set the step of the time labels in minutes.
  Supported values: 1, 5, 10, 15, 20, 30, 60, 120, 180, 240, 360, 480, 720, 1440.
- `eventHeight`: *&#039;variable&#039; | &#039;equal&#039;* (default &#039;equal&#039;) - Specifies wether the height of the events is equal or variable.
  :::info
  Experimental feature: [learn more about variable event heights](./timeline#variable-event-height).
  :::
- `eventList`: *boolean* (default `false`) - If `true`, transforms the layout into a summary view.
  The events are listed in the appropriate cell one after the other.
- `rowHeight`: *&#039;variable&#039; | &#039;equal&#039;* (default &#039;variable&#039;) - Controls the height of the timeline rows.
  By default rows will have variable height and will expand to accommodate the displayed events.
  If it is set to `'equal'`, the rows will have equal heights.
- `virtualScroll`: *boolean* (default `true`) - Enable or disable virtual scroll.
- `weekNumbers`: *boolean* (default `false`) - Show or hide week numbers.

```js
view: {
  calendar: {
    type: 'week',
    size: 2
  },
  agenda: {
    type: 'week',
    size: 2
  }
}
```
### width {#opt-width}

string &#124; number

Sets the width of the component.

**Default value**: `undefined`