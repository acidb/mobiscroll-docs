

#### actionableEvents
boolean

Specifies if the events on the agenda and inside the calendar popover are actionable or not.
If actionable, the event items will have hover and active states, and pointer cursor.
Set to false when custom event rendering is used and the event list items contain other actionable elements, e.g. buttons.

**Default value**: 

<hr />



#### calendarSystem
MbscCalendarSystem

Specify the calendar system to be used. Supported calendar systems:
- 

<hr />



#### clickToCreate
boolean &#124; double &#124; single

Specifies if the events on the agenda and inside the calendar popover are actionable or not.
If actionable, the event items will have hover and active states, and pointer cursor.
Set to 

<hr />



#### colors
Array< MbscCalendarColor >

Change the color of certain dates/date rages on the calendar, timeline and schedule views.
Must be an array of objects with the following:

- 

<hr />



#### connections
Array< MbscEventConnection >

Specifies connections between events. On the ui events will be linked with lines
and additionally arrows can be displayed to illustrate the direction of the connection.
Events can have multiple connections simultaneously.

Define connections between events. On the ui events will be linked with lines
and additionally arrows can be displayed to illustrate the direction of the connection.
Events can have multiple connections simultaneously.

An array of connection object can be passed to this option.The connection object has the following properties:
- 

<hr />



#### context
any

Specify the DOM element in which the component is appended and positioned (if not inline).
Can be a selector string or a DOM element.

**Default value**: 

<hr />



#### cssClass
string



<hr />



#### data
Array< MbscCalendarEvent >

Specifies events for the calendar, as an array of event objects. The event object supports the following properties:
- 

<hr />



#### dataTimezone
string

The timezone in which the data is interpreted. If the data contain timezone information
(when the ISO string has a timezone offset ex. "2021-03-28T01:00:00Z" or "2021-03-28T03:00:00+03:00")
then the data's timezone is used instead of the dataTimezone option.

> When using [timezones](https://docs.mobiscroll.com/datepicker#timezones) the
[exclusiveEndDates](#exclusiveEndDates) option option is also turned on by default.

> When using anything other than the default ('local'), a [timezone plugin](#timezonePlugin) must be also passed to the component.

Possible values are:
- '

<hr />



#### defaultSelectedDate
DateType

Specifies the default displayed/selected date.

**Default value**: 

<hr />



#### displayTimezone
string

The timezone in which the data is displayed.

> When using [timezones](https://docs.mobiscroll.com/datepicker#timezones) the
[exclusiveEndDates](#exclusiveEndDates) option option is also turned on by default.

> When using anything other than the default ('local'), a [timezone plugin](#timezonePlugin) must be also passed to the component.

Possible values are:
- '

<hr />



#### dragTimeStep
number

Specifies the steps in minutes for the schedule/timeline events during drag.

**Default value**: 

<hr />



#### dragToCreate
boolean

If 

<hr />



#### dragToMove
boolean

If 

<hr />



#### dragToResize
boolean

If 

<hr />



#### endDay
number



<hr />



#### eventDelete
boolean

Enables or disables event deletion. When 

<hr />



#### eventOrder
whoknows



<hr />



#### exclusiveEndDates
boolean

If 

<hr />



#### extendDefaultEvent
whoknows



<hr />



#### externalDrop
boolean

If 

<hr />



#### groupBy
resource &#124; date

Groups the given schedule [resources](#resources) based on the specified 

<hr />



#### hasPicker
boolean

hidden

<hr />



#### height
string &#124; number

Sets the height of the component. The height of the calendar view impacts the number of labels that fit into a table cell.
A show more label will be displayed for events that don't fit.

**Default value**: `undefined

<hr />



#### invalid
Array< DateType > &#124; Array< IValidateProps >

An array containing the invalid values. Can contain dates (Javascript Date objects, ISO 8601 strings, or moment objects),
or objects with the following properties:
- 

<hr />



#### invalidateEvent
strict &#124; start-end

Specifies how to validate events against [invalid](#invalid) ranges on create/move/resize:
- When set to 

<hr />



#### labels
Array< MbscCalendarLabel >

Specify labels for calendar days. A label object can have the following properties:
- 

<hr />



#### marked
Array< MbscCalendarMarked >

Mark certain dates on the calendar. Must be an array containing dates (Javascript Date objects, ISO 8601 strings, or moment objects),
or objects with the following properties:
- 

<hr />



#### max
DateType

Maximum date and time. The calendar cannot be navigated beyond the specified maximum date.
If navigation is needed, but event creation should not be allowed after a specific date,
use the [invalid](#invalid) option with daily
[recurrence](https://docs.mobiscroll.com/eventcalendar#recurrence) starting from the specific date.

**Default value**: 

<hr />



#### min
DateType

Minimum date and time. The calendar cannot be navigated beyond the specified minimum date.
If navigation is needed, but event creation should not be allowed before a specific date,
use the [invalid](#invalid) option with daily
[recurrence](https://docs.mobiscroll.com/eventcalendar#recurrence) until the specific date.

**Default value**: 

<hr />



#### modules
Array< IModule >



<hr />



#### monthNames
Array< string >

The list of full month names, for use as requested via the [dateFormat](#dateFormat) setting.

**Default value**:


<hr />



#### monthNamesShort
Array< string >

The list of abbreviated month names, for use as requested via the dateFormat setting.

**Default value**: 

<hr />



#### pmText
string

Text for PM.

**Default value**: 

<hr />



#### refDate
DateType

Specifies the reference date of the component, which represents when to start to calculate the view you want to display.
For example, if you want to display 14 days from today, you must specify today as the reference date.

> If undefined, in case of scheduler/timeline is today, in other cases is 1970/01/01.

**Default value**: 

<hr />



#### resources
Array< MbscResource >

The scheduler can handle multiple resources inside a single instance.
Resource grouping can be modified with the help of the [groupBy](#groupBy) option.

If set 

<hr />



#### responsive
whoknows

Specifies different settings for different container widths, in a form of an object,
where the keys are the name of the breakpoints, and the values are objects containing the settings for the given breakpoint.

> The available width is queried from the container element of the component and not the browsers viewport like in css media queries

There are five predefined breakpoints:

- 

<hr />



#### selectMultipleEvents
boolean

When 

<hr />



#### selectedDate
DateType

Specifies the [selected](https://docs.mobiscroll.com/eventcalendar#selected-date) date on the calendar.
You also need to pass [onSelectedDateChange](#onSelectedDateChange) event
for a [controlled usage](https://docs.mobiscroll.com/react/eventcalendar#selected-date-controlled),
otherwise use the [defaultSelectedDate](#defaultSelectedDate) option instead.

**Default value**: 

<hr />



#### selectedEvents
Array< MbscCalendarEvent >

Specifies the selected events on the calendar. You also need to pass o
nSelectedEventsChange(#onSelectedEventsChange) event for a controlled usage.

**Default value**: 

<hr />



#### showEventTooltip
boolean

If 

<hr />



#### slots
Array< MbscSlot >

The slots besides the resources introduce a horizontal(daily) level of data grouping to the Timeline view.

If set null or undefined, all events will be displayed, regardless of their slot property.
If set to an empty array, only those events will be displayed which are not tied to any slot.

The slot object has the following properties:

- 

<hr />



#### theme
string

Specifies the visual appearance of the component.

If it is 

<hr />



#### themeVariant
auto &#124; dark &#124; light

Controls which variant of the theme will be used (light or dark).

Possible values:

 - 

<hr />



#### timezonePlugin
ITimezonePlugin

Specifies the timezone plugin, which can handle the timezone conversions.

By default the Eventcalendar uses the local timezone of the browser to show event data.
If you want to show the data or interpret it in a different timezone,
you will need an external library to handle the timezone conversions.
There are two supported libraries: [moment-timezone](https://momentjs.com/timezone/)
and [luxon](https://moment.github.io/luxon/#/).

You can specify either the [dataTimezone](#dataTimezone) or the (displayTimezone)[#displayTimezone] or both.

Depending on which externa library you use you can pass either the:
- 

<hr />



#### touchUi
boolean &#124; auto

Use 

<hr />



#### view
MbscEventcalendarView

Configures the event calendar view elements.

Example:



<hr />



#### width
string &#124; number

Specifies the width of the popup container. This will take no effect in inline display mode.

**Default value**: 

<hr />
