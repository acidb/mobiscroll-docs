### actionableEvents {#opt-actionableEvents}

boolean

Specifies if the events on the agenda and inside the calendar popover are actionable or not.
If actionable, the event items will have hover and active states, and pointer cursor.
Set to false when custom event rendering is used and the event list items contain other actionable elements, e.g. buttons.

**Default value**: true
### calendarSystem {#opt-calendarSystem}

MbscCalendarSystem

Specify the calendar system to be used. Supported calendar systems:
- Gregorian - This is the default calendar system, no setting needs to be passed.
- Jalali - Default system of the Persian calendar. The Farsi language needs to be included to the package.
- Hijri - Arabic language needs to be included to the package

**Default value**: undefined
### clickToCreate {#opt-clickToCreate}

boolean &#124; "double" &#124; "single"

Specifies if the events on the agenda and inside the calendar popover are actionable or not.
If actionable, the event items will have hover and active states, and pointer cursor.
Set to false when custom event rendering is used and the event list items contain other
actionable elements, e.g. buttons.

**Default value**: undefined
### colors {#opt-colors}

Array&lt;MbscCalendarColor&gt;

Change the color of certain dates/date rages on the calendar, timeline and schedule views.
Must be an array of objects with the following:

- allDay: Boolean - Specifies whether the date you want to color is all day or not.
- date: Date, String, Object - Date of the calendar day which should be colored.
- start: Date, String, Object - Start date/time of the calendar days/cells which should be colored.
- end: Date, String, Object - End date/time of the calendar days/cells which should be colored.
- background: String - Background color of the cell, can be any valid CSS color (&#039;red&#039;, &#039;#ff0000&#039;, &#039;rgb(255,0,0)&#039;, etc.).
- highlight: String - Highlight color of the day, can be any valid CSS color (&#039;red&#039;, &#039;#ff0000&#039;, &#039;rgb(255,0,0)&#039;, etc.).
- recurring: String, Object - Recurrence rule for coloring recurring days.
- recurringException: String, Object, Array - Represents the exceptions of a recurring color.
Useful when specific dates need to be skipped from the rule.
- recurringExceptionRule: String, Object - Represents the exception rule of a recurring color.
Useful when recurring dates need to be skipped from the rule.
- cellCssClass: String - CSS class for the day cell. This property is only applicable in the case of the calendar view.
- resource: String, Number, Array of String | Number - specify [resource](#opt-resources) ids for the color.
The color will display only in the specified resource group.
If there is no resource id defined the color will be displayed at every resource group.
- slot: String, Number - specify [slot](#opt-slots) ids for the color. The color will display only in the specified slot group.
If there is no slot id defined the color will be displayed at every slot group.
- textColor: String - Specifies the color of the colored range title.
- title: String - Text which will be displayed on the schedule/timeline view for the colored range.
- cssClass String - Specifies the custom CSS class name of the color.
Useful when customization is needed for the background of cells and time ranges.
This property is only applicable in the case of the scheduler and timeline view.

:::info
The colored range will be considered all-day if:
- allDay is explicitly set.
- start/end is not specified, only the date.
:::
:::info
The dates can be specified as Javascript Date objects, ISO 8601 strings, or moment objects.
:::
:::info
The colors can be combined with the [labels](#opt-labels) or [marked](#opt-marked) options.
:::
```js title="Example"
colors: [
   { date: new Date(2020,2,23), background: 'pink' },
   { date: new Date(2020,2,24), background: 'green' },
   { background: '#ff0000', recurring: { repeat: 'weekly', weekDays: 'SU' } },
   { background: 'yellow', recurring: { repeat: 'weekly', weekDays: 'SA' } }
]
```

**Default value**: undefined
### connections {#opt-connections}

Array&lt;MbscEventConnection&gt;

Specifies connections between events. On the ui events will be linked with lines
and additionally arrows can be displayed to illustrate the direction of the connection.
Events can have multiple connections simultaneously.

Define connections between events. On the ui events will be linked with lines
and additionally arrows can be displayed to illustrate the direction of the connection.
Events can have multiple connections simultaneously.

An array of connection object can be passed to this option.The connection object has the following properties:
- arrow: String, Boolean - define and specify where to display arrows.
The following string values are supported &#039;from&#039; | &#039;to&#039; | &#039;bidirectional&#039;.
If true arrow will display only at the end side of the connection.
- color: String - define the color of the connection.
- cssClass: String - add a specific css class to the connection for further customization.
- from: String - the id of the event where the connection will begin.
- to: String - the id of the event where the connection will end.

**Default value**: undefined
### context {#opt-context}

any

Specify the DOM element in which the component is appended and positioned (if not inline).
Can be a selector string or a DOM element.

**Default value**: 'body'
### cssClass {#opt-cssClass}

string

Applies custom css class to the top level element.

**Default value**: undefined
### data {#opt-data}

Array&lt;MbscCalendarEvent&gt;

Specifies events for the calendar, as an array of event objects. The event object supports the following properties:
- id: String, Number - A unique id for the event. If not specifed, the event will get a generated id.
- startDate: String, Object - Specifies the start of the event.
- endDate: String, Object - Specifies the end of the event.
- title: String - The title of the event.
- color: String - The color of the event.
- allDay: Boolean - Specifies if the event is all day or not.
- editable: Boolean - specify if an event is editable or not. Setting it to false disables drag &amp; drop, resize and delete,
and the event will have mbsc-readonly-event css class. With this class, the fixed events will be easily customizable,
for example: add opacity or disable the cursor on the fixed events.
- resource: String, Number, Array - specify [resource](#opt-resources) ids for the events.
The event will display only in the specified resource group.
If there is no resource id defined the event will be displayed at every resource group.
- slot: String, Number - specify [slot](#opt-slots) ids for the events. The event will display only in the specified slot group.
If there is no slot id defined the event will be displayed at every slot group.
- recurring: String, Object - Recurrence rule for the event.
- recurringException: String, Object, Array - Represents the exceptions of a recurring event. Useful when specific dates need
to be skipped from the rule.
- recurringExceptionRule: String, Object - Represents the exception rule of a recurring event. Useful when recurring dates need
to be skipped from the rule.
- tooltip: String - Specifies the tooltip text of the event.
- cssClass String - Can be used to pass custom CSS classes on an event to event basis. Useful when customization is needed
on the event level. For example: setting the width for specific events.

:::info
The dates can be specified as Javascript Date objects, ISO 8601 strings, or moment objects.
:::
:::info
The event objects may have additional custom properties as well.
The custom properties are not used by the eventcalendar, but they are kept and will be available anywhere the event objects are used.
E.g. the [onEventClick](#event-onEventClick) event will receive the event object as argument, containing the custom properties as well.
:::
:::info
Use the [getEvents](#method-getEvents) method to get the events between two dates.
:::
```js title="Example"
data: [{
  start: new Date(2021, 5, 23),
  end: new Date(2021, 5, 30),
  title: 'Conference',
  allDay: true,
  color: 'red'
}, {
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
}]
```

**Default value**: undefined
### dataTimezone {#opt-dataTimezone}

string

The timezone in which the data is interpreted. If the data contain timezone information
(when the ISO string has a timezone offset ex. &quot;2021-03-28T01:00:00Z&quot; or &quot;2021-03-28T03:00:00+03:00&quot;)
then the data&#039;s timezone is used instead of the dataTimezone option.

:::info
When using timezones the [exclusiveEndDates](#opt-exclusiveEndDates) option is also turned on by default.
:::
:::info
When using anything other than the default (&#039;local&#039;), a [timezone plugin](#opt-timezonePlugin) must be also passed to the component.
:::

Possible values are:
- &#039;local&#039; - Default. Uses the systems local timezone
- &#039;utc&#039; - Displays data in UTC (Universal Coordinated Time)
- Timezone name - The timezone name from the
[IANA time zone database](https://gist.github.com/aviflax/a4093965be1cd008f172) ex. &quot;America/New_York

Defaults to [displayTimezone](#displayTimezone)
### defaultSelectedDate {#opt-defaultSelectedDate}

DateType

Specifies the default displayed/selected date.

**Default value**: undefined
### displayTimezone {#opt-displayTimezone}

string

The timezone in which the data is displayed.

:::info
When using timezones the [exclusiveEndDates](#opt-exclusiveEndDates) option is also turned on by default.
:::
:::info
When using anything other than the default (&#039;local&#039;), a [timezone plugin](#opt-timezonePlugin) must be also passed
to the component.
:::

Possible values are:
- &#039;local&#039; - Default. Uses the systems local timezone
- &#039;utc&#039; - Displays data in UTC (Universal Coordinated Time)
- Timezone name - The timezone name from the
[IANA time zone database](https://gist.github.com/aviflax/a4093965be1cd008f172) ex. &quot;America/New_York

**Default value**: &#039;local&#039;
### dragTimeStep {#opt-dragTimeStep}

number

Specifies the steps in minutes for the schedule/timeline events during drag.

**Default value**: 15
### dragToCreate {#opt-dragToCreate}

boolean

If true, dragging on an empty cell will create a new event.
It will also allow deleting of the focused events using the Delete or Backspace key.
The title of the new event can be specified with the [newEventText option](#opt-newEventText).
Using the [extendDefaultEvent option](#opt-extendDefaultEvent) extra properties can be set for the created event.

The event deletion functionality can be overwritten using the [eventDelete option](#opt-eventDelete).

**Default value**: undefined
### dragToMove {#opt-dragToMove}

boolean

If true, the events will be move-able.

**Default value**: undefined
### dragToResize {#opt-dragToResize}

boolean

If true, the events will be resize-able.

**Default value**: undefined
### endDay {#opt-endDay}

number


### eventDelete {#opt-eventDelete}

boolean

Enables or disables event deletion. When true, the focused event will be deleted on pressing the Delete or Backspace
keys on the keyboard.

By default the event deletion depends on the [clickToCreate](#opt-clickToCreate) and [dragToCreate](#opt-dragToCreate) options.
If either of those are true, and no eventDelete option is set, then event deletion is also enabled, otherwise not.

**Default value**: undefined
### eventOrder {#opt-eventOrder}

(event1: MbscCalendarEvent, event2: MbscCalendarEvent) => number



### exclusiveEndDates {#opt-exclusiveEndDates}

boolean

If true, the Eventcalendar will work in &quot;exclusive end dates mode&quot;,
meaning that the last moment of the range (event, invalid, colors, etc.) is not part of the range.

E.g. end: &#039;2021-07-03T00:00&#039; means that the event ends on 2nd of July and will not be shown on 3rd of July.

:::caution
When using timezones the [exclusiveEndDates option](#opt-exclusiveEndDates) defaults to true.
:::
### extendDefaultEvent {#opt-extendDefaultEvent}

(args: MbscNewEventData) => MbscCalendarEvent



### externalDrop {#opt-externalDrop}

boolean

If true, external drag &amp; drop is allowed.

**Default value**: undefined
### groupBy {#opt-groupBy}

"date" &#124; "resource"

Groups the given schedule [resources](#opt-resources) based on the specified &#039;date&#039; or &#039;resource&#039;.

**Default value**: &#039;resource&#039;
### height {#opt-height}

string &#124; number

Sets the height of the component.

The height of the calendar view impacts the number of labels that fit into a table cell.
A show more label will be displayed for events that don&#039;t fit.

**Default value**: undefined
### invalid {#opt-invalid}

Array&lt;DateType&gt; &#124; Array&lt;IValidateProps&gt;

An array containing the invalid values. Can contain dates (Javascript Date objects, ISO 8601 strings, or moment objects),
or objects with the following properties:
- allDay: Boolean - If true the specified date will cover the whole day.
- start: Date, String, Object - Start of the invalid range.
- end: Date, String, Object - End of the invalid range.
- recurring: String, Object - Recurrence rule for recurring invalid ranges.
- recurringException: String, Object, Array - Represents the exception rule of a recurring invalid.
Useful when specific dates need to be skipped from the rule.
- recurringExceptionRule: String, Object - Represents the exception rule of a recurring invalid.
Useful when recurring dates need to be skipped from the rule.
- title: String - Text which will be displayed on the schedule view for the invalid range.
- resource: String, Number, Array - specify [resource](#opt-resources) ids for the invalid range.
The invalid range will be displayed only for the specified resources.
If there is no resource defined, the invalid range will be displayed for every resource.
- slot: String, Number - specify [slot](#opt-slots) ids for the invalid range.
The invalid range will be displayed only for the specified slot.
If there is no slot defined, the invalid range will be displayed for every slot.
- cssClass: String - Specifies the custom CSS class name of the invalid.
Useful when customization is needed for specific invalids.
This property is only applicable in the case of the scheduler and timeline view.

:::info
Use the [getInvalids](#method-getInvalids) method to get the invalids between two dates.
:::

```js title="Example"
invalid: [
  // Passing exact dates and times
   new Date(2021, 1, 7), // Date object
  '2021-10-15T12:00', // ISO 8601 string
   moment("2020-12-25"), // moment object

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
];
```

**Default value**: undefined
### invalidateEvent {#opt-invalidateEvent}

"start-end" &#124; "strict"

Specifies how to validate events against [invalid](#opt-invalid) ranges on create/move/resize:
- When set to &#039;strict&#039;, event cannot intersect with an invalid range at all.
- When set to &#039;start-end&#039;, event start and end cannot be inside an invalid range.

**Default value**: &#039;strict&#039;
### labels {#opt-labels}

Array&lt;MbscCalendarLabel&gt;

Specify labels for calendar days. A label object can have the following properties:
- date Date, String, Object - Date of the calendar label.
- start Date, String, Object - Start date of the calendar label.
- end Date, String, Object - End date of the calendar label.
- color String - The color of the label, can be any valid CSS color (&#039;red&#039;, &#039;#ff0000&#039;, &#039;rgb(255,0,0)&#039;, etc.).
- text String - The text of the label.
- recurring: String, Object - Recurrence rule for recurring labels.
- recurringException: String, Object, Array - Represents the exceptions of a recurring label.
Useful when specific dates need to be skipped from the rule.
- recurringExceptionRule: String, Object - Represents the exception rule of a recurring label.
Useful when recurring dates need to be skipped from the rule.
- cellCssClass: String - CSS class for the day cell. This property is only applicable in the case of the calendar view.

:::info
The dates can be specified as Javascript Date objects, ISO 8601 strings, or moment objects.
:::
:::info
The labels can be combined with the [colors](#opt-colors) option.
:::

```js title="Example"
labels: [{
  start: new Date(2020, 2, 23),
  end: new Date(2020, 2, 24),
  text: 'Conference',
  color: 'red'
}, {
  text: 'Christmas',
  recurring: { repeat: 'yearly', month: 12, day: 24 }
}]
```

**Default value**: undefined
### marked {#opt-marked}

Array&lt;MbscCalendarMarked&gt;

Mark certain dates on the calendar. Must be an array containing dates (Javascript Date objects, ISO 8601 strings, or moment objects),
or objects with the following properties:
- date: Date, String, Object - Date of the day to be marked.
- start: Date, String, Object - Start date of the days to be marked.
- end: Date, String, Object - End date of the days to be marked.
- color: String - The color of the mark, can be any valid CSS color (&#039;red&#039;, &#039;#ff0000&#039;, &#039;rgb(255,0,0)&#039;, etc.).
- recurring: String, Object - Recurrence rule for recurring marked days.
- recurringException: String, Object, Array - Represents the exceptions of a recurring marked rule.
 Useful when specific dates need to be skipped from the rule.
- recurringExceptionRule: String, Object - Represents the exception rule of a recurring marked rule.
Useful when recurring dates need to be skipped from the rule.
- cellCssClass: String - CSS class for the day cell. This property is only applicable in the case of the calendar view.
- markCssClass: String - CSS class for the mark.

:::info
The dates can be specified as Javascript Date objects, ISO 8601 strings, or moment objects.
:::
:::info
The [marked](#opt-marked) option can be combined with the [colors](#opt-colors) option.
:::

```js title="Example"
marked: [
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

**Default value**: undefined
### max {#opt-max}

DateType

Maximum date and time. The calendar cannot be navigated beyond the specified maximum date.
If navigation is needed, but event creation should not be allowed after a specific date,
use the [invalid](#opt-invalid) option with daily recurrence starting from the specific date.

**Default value**: undefined
### min {#opt-min}

DateType

Minimum date and time. The calendar cannot be navigated beyond the specified minimum date.
If navigation is needed, but event creation should not be allowed before a specific date,
use the [invalid](#opt-invalid) option with daily recurrence until the specific date.

**Default value**: undefined
### modules {#opt-modules}

Array&lt;IModule&gt;


### refDate {#opt-refDate}

DateType

Specifies the reference date of the component, which represents when to start to calculate the view you want to display.
For example, if you want to display 14 days from today, you must specify today as the reference date.

:::info
If undefined, in case of scheduler/timeline will default to today, in other views it will default to 1970/01/01.
:::
**Default value**: undefined
### resources {#opt-resources}

null &#124; Array&lt;MbscResource&gt;

The scheduler can handle multiple resources inside a single instance.
Resource grouping can be modified with the help of the [groupBy option](#opt-groupBy).

If set to null or undefined, all events will be displayed, regardless of their &#039;resource&#039; property. If set to an empty array,
only those events will be displayed which are not tied to any resource.

The timeline view can render multiple levels of hierarchy groups. Levels can be added with the help of the &#039;children&#039; property.

The resource object has the following properties:
- children: Array of object - Array of resource objects which will render as a child of the specified resource.
- collapsed: Boolean - Defines the displayed state of the child resource group.
- id: Number, String - This is an id that can be referenced in the events/invalids/colors data.
- name: String - The name of the resource that will be displayed at the top of the resource column.
- color: String - The color controls the default event color of the resource. Event colors can be specific above this.
If the color is omitted the events of the resource will inherit the default calendar color.
- eventCreation: Boolean - Disables event creation on specific resources by setting it to false. It&#039;s true by default.

```js title="Example of a resource array"
resources: [{
  id: 1,
  name: 'Flatiron Room',
  color: '#f7c4b4'
 }, {
  id: 2,
  name: 'The Capital City',
  color: '#c6f1c9'
}, {
  id: 3,
  name: 'Heroes Square',
  color: '#e8d0ef'
}]
```

**Default value**: undefined
### responsive {#opt-responsive}

missing

Specifies different settings for different container widths, in a form of an object,
where the keys are the name of the breakpoints, and the values are objects containing the settings for the given breakpoint.

:::caution
The available width is queried from the container element of the component and not the browsers viewport like in css media queries
:::
There are five predefined breakpoints:

- xsmall - min-width: 0px
- small - min-width: 576px
- medium - min-width: 768px
- large - min-width: 992px
- xlarge - min-width: 1200px

Custom breakpoints can be defined by passing an object containing the breakpoint property specifying the min-width in pixels. Example:

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

**Default value**: undefined
### selectMultipleEvents {#opt-selectMultipleEvents}

boolean

When true, enables multiple event selection on the calendar.

**Default value**: false
### selectedDate {#opt-selectedDate}

DateType

Specifies the selected date on the calendar. Setting this option will force the calendar to display the passed date
and won&#039;t display anything else unless another selected date is set. This is called a controlled usage, and the
[onSelectedDateChange event](#event-onSelectedDateChange) can be used to get notified and act on navigational changes.

To set the initially displayed date without a controlled usage, use the [defaultSelectedDate option](#opt-defaultSelectedDate) instead.

**Default value**: undefined
### selectedEvents {#opt-selectedEvents}

Array&lt;MbscCalendarEvent&gt;

Specifies the selected events on the calendar. The [onSelectedEventsChange event](#event-onSelectedEventsChange) will be
fired when the selected events change from the calendar.

**Default value**: undefined
### showEventTooltip {#opt-showEventTooltip}

boolean

If false, it will hide the native tooltip that shows up when hovering over the event.

**Default value**: true
### slots {#opt-slots}

null &#124; Array&lt;MbscSlot&gt;

The slots besides the [resources](#opt-resources) introduce a horizontal (daily) level of data grouping to the Timeline view.

If set to null or undefined, all events will be displayed, regardless of their slot property.
If set to an empty array, only those events will be displayed which are not tied to any slot.

The slot object has the following properties:

- id: Number, String - This is an id that can be referenced in the events/invalids/colors data.
- name: String - The name of the slot that will be displayed at the top of the slot column.

Example:
```
slots: [{
  id: 1,
  name: 'Morning shift',
}, {
  id: 2,
  name: 'Afternoon shift',
}]
```

**Default value**: undefined
### theme {#opt-theme}

string

Specifies the visual appearance of the component.

If it is &#039;auto&#039; or undefined, the theme will automatically be chosen based on the platform.
If custom themes are also present, they will take precedence over the built in themes, e.g. if there&#039;s an iOS based custom theme,
it will be chosen on the iOS platform instead of the default iOS theme.

Supplied themes:

- &#039;ios&#039; - iOS theme
- &#039;material&#039; - Material theme
- &#039;windows&#039; - Windows theme

It&#039;s possible to [modify theme colors or create custom themes](https://docs.mobiscroll.com/theming).
:::note
Make sure that the theme you set is included in the downloaded package.
:::

**Default value**: undefined
### themeVariant {#opt-themeVariant}

"dark" &#124; "light" &#124; "auto"

Controls which variant of the theme will be used (light or dark).

Possible values:

- &#039;light&#039; - Use the light variant of the theme.
- &#039;dark&#039; - Use the dark variant of the theme.
- &#039;auto&#039; or undefined - Detect the preferred system theme on devices where this is supported.

To use the option with custom themes, make sure to create two custom themes, where the dark version has the same name as the light one,
suffixed with &#039;-dark&#039;, e.g.: &#039;my-theme&#039; and &#039;my-theme-dark&#039;.

**Default value**: undefined
### timezonePlugin {#opt-timezonePlugin}

ITimezonePlugin

Specifies the timezone plugin, which can handle the timezone conversions.

By default the Eventcalendar uses the local timezone of the browser to show event data.
If you want to show the data or interpret it in a different timezone,
you will need an external library to handle the timezone conversions.
There are two supported libraries: [moment-timezone](https://momentjs.com/timezone/)
and [luxon](https://moment.github.io/luxon/#/).

You can specify either the [dataTimezone](#dataTimezone) or the (displayTimezone)[#displayTimezone] or both.

Depending on which externa library you use you can pass either the:
- momentTimezone
- luxonTimezone
objects to the timezonePlugin option. These objects can be imported from the mobiscroll bundle:

**Default value**: undefined
### touchUi {#opt-touchUi}

boolean &#124; "auto"

Use true to render a touch optimized user interface, or false for a user interface optimized for pointer devices (mouse, touchpad).

Can be used with the responsive option to change the user interface based on viewport width.

If set to &#039;auto&#039;, the touch UI will be automatically enabled based on the platform.

**Default value**: 'auto'
### view {#opt-view}

MbscEventcalendarView

Configures the event calendar view elements.

Example:

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

Properties:

calendar: Object - Configures the calendar view. If omitted, no calendar will be displayed.Properties:
- type: String (default &#039;month&#039;) - Sets the calendar type. Possible values: &#039;year&#039;, &#039;month&#039;, &#039;week&#039;.
- size: Number - Specifies the number of displayed weeks/months.
- count: Boolean (default false) - If true, it will display the number of events on days with events.
- outerDays: Boolean (default false) - Show or hide days from previous and next months. Hiding only works for type: &#039;month&#039;.
- labels: Boolean, String, Number (default false) Enable displaying events as labels on calendar days. Supported values:
  * boolean - If is set to true events will be displayed in the available space.
If there are more events for a day, than the available space,
a label with &quot;x more&quot; text will be displayed, which opens the popover showing all the events for the given day.
In this mode to display multiple events on a day, set the calendar height to an appropriate value, using the [height](#height) setting.
  * &#039;all&#039; - In this mode all the event labels will be displayed in the calendar cell and
the row height will auto-expand based on the displayed events.
The row container will became scrollable if the rows overflow the available height.
  * number - Specify how many events will be displayed before the &quot;more&quot; button in a calendar cell.
 The row height will auto expand until the labels count reaches the given number and after that the &quot;x more&quot; button will be displayed.
In the case when only one event should go in the &quot;more&quot; popup, that event will be displayed in the place of the &quot;x more&quot; button.
- popover: Boolean (default undefined) - Enable popover for event listing on days containing events. If not explicitly defined,
the popover will not show up if event listing is used. If event labels are used,
popover will only show up for days where all labels do not fit on the calendar, and a &quot;more&quot; label is present.
- popoverClass: String (default undefined) - A CSS class that&#039;s added to the popover element.
Can be used to customize the styling of the popover on a calendar basis.
- scroll: String (default &#039;horizontal&#039;) - Specifies the direction of the calendar scroll. Can be &#039;horizontal&#039; or &#039;vertical&#039;.
- weekNumbers: Boolean (default false) - Show or hide week numbers.

agenda: Object - Configures the event list. If omitted, no event list will be displayed. Properties:
   - type: String (default undefined) - Sets the list type. Possible values: &#039;year&#039;, &#039;month&#039;, &#039;week&#039;, &#039;day&#039;.
     :::info
     If calendar is also displayed, only &#039;month&#039;, &#039;week&#039; and &#039;day values are supported.
     :::
     :::info
     In case of month and week, the type and size should match the calendar type and size.
     :::
     :::info
     In case of day type events on the selected calendar day will be displayed, so size will always be 1.
     :::
   - size: Number (default 1) - Specifies the number of years, months, weeks or days
included in the list (depending on the specified type).
   - scrollable: Boolean (default false) - Setting this to true makes the event listing independently scrollable.
     :::caution
     There are two prerequisites for making this work:

     1 - The calendar needs to be to placed inside a container which has a height. This can be either a fixed height,
     a height in percentage, or a flex height. When the calendar is placed directly in a container with a fixed height,
     it will work out of the box. If the height of the container is specified in percentage,
     e.g. you&#039;d like to fill the full page height,
     you need to make sure that all parent elements also have &#039;height: 100%&#039; specified, up until the body and html elements,
     or until the closest parent which has a fixed height.
     If the container is inside a parent with flex layout, it will also work out of the box.

     2 - The event list has a minimum calculated height of 200px - the result of the container height
     minus the height of the calendar header minus the height of the displayed calendar rows.
     If the calculated height is less then 200px, the event list will not be scrollable.
     :::

schedule: Object - Configures the schedule view. If omitted, no schedule will be displayed.
Properties:

   - type: String (default &#039;week&#039;) - Sets the schedule type. Possible values: &#039;day&#039;, &#039;week&#039; ,&#039;month&#039;.
   - size: Number (default: 1)- Specifies the number of displayed days/weeks.
   - allDay: Boolean (default true) - Show or hide the all day events.
   - currentTimeIndicator: Boolean (default true when the resolution is less than a day) - Show or hide the current time indicator
   - days: Boolean (default true) - Show or hide week days above the schedule grid.
   - startDay: Number (default 0) - Set the first day of the view: Friday is 5, Saturday is 6, etc.
   - endDay: Number (default 6) - Set the last day of the view: Sunday is 0, Monday is 1, etc.
   - startTime: String (default &#039;00:00&#039;) - Set the start time of schedule column.
Hours and minutes can be specified in the string, example: &#039;09:30&#039;.
   - endTime: String (default &#039;24:00&#039;) - Set the end time of schedule column.
Hours and minutes can be specified in the same string, example: &#039;18:30&#039;.
   - timeCellStep: Number (default 60) - Set the step of the grid cells in minutes.
Supported values: 1, 5, 10, 15, 20, 30, 60, 120, 180, 240, 360, 480, 720, 1440.
   - timeLabelStep: Number (default 60) - Set the step of the time labels in minutes.
Supported values: 1, 5, 10, 15, 20, 30, 60, 120, 180, 240, 360, 480, 720, 1440.
   - timezones: Array - Use this to display times in multiple timezones on the time scale and time indicator.
The timezones array can contain timezone strings or objects with timezone and label properties.
Timezone strings must use the name from the [IANA time zone database](https://gist.github.com/aviflax/a4093965be1cd008f172).
If no label is provided, the time column label will be UTC +/- the timezone offset.
   ```js
   timezones: ['Europe/Berlin','Europe/Bucharest']
   ```

   ```js
   timezones: [{
      timezone: 'America/Chicago',
      label: 'CHI'
   }, {
      timezone: 'America/New_York',
      label: 'NY'
   }]
   ```

timeline: Object - Configures the timeline view. If omitted, no timeline will be displayed. Properties:
  - type: String (default &#039;week&#039;) - Sets the timeline type. Possible values: &#039;day&#039;, &#039;week&#039; , &#039;month&#039;, &#039;year&#039;.
  - resolution: String (default &#039;hour&#039;) - Sets the resolution of the timeline column.
Possible values: &#039;hour&#039;, &#039;day&#039;, &#039;week&#039;, &#039;month&#039;, &#039;year&#039;. In case of hourly resolution,
the columns can be split to minutes (1, 5, 15, 20, 30) or merge to multiple
hours (2, 3, 4, 6, 8, 12) using the timeCellStep and timeLabelStep properties.
  - size: Number - Specifies the number of displayed days/weeks/months.
  - currentTimeIndicator: Boolean (default true when the resolution is less than a day) - Show or hide the current time indicator
  - eventList: Boolean (default false) - If true, transforms the hour-by-hour layout into a daily summary view.
The events are listed under the appropriate day one after the other.
  - startDay: Number (default 0) - Set the first day of the view: Friday is 5, Saturday is 6, etc.
  - endDay: Number (default 6) - Set the last day of the view: Sunday is 0, Monday is 1, etc.
  - rowHeight: String (default &#039;variable&#039;) - Controls the height of the timeline view rows.
By default timeline rows will have &#039;variable&#039; height and will expand to accommodate the displayed events.
If it is set to &#039;equal&#039;, the rows will have equal heights.
  - startTime: String (default &#039;00:00&#039;) - Set the start time of timeline days.
Hours and minutes can be specified in the string, example: &#039;09:30&#039;.
  - endTime: String (default &#039;24:00&#039;) - Set the end time of timeline days.
Hours and minutes can be specified in the same string, example: &#039;18:30&#039;.
  - timeCellStep: Number (default 60) - Set the step of the grid cells in minutes.
Supported values: 1, 5, 10, 15, 20, 30, 60, 120, 180, 240, 360, 480, 720, 1440.
  - timeLabelStep: Number (default 60) - Set the step of the time labels in minutes.
Supported values: 1, 5, 10, 15, 20, 30, 60, 120, 180, 240, 360, 480, 720, 1440.
  - weekNumbers: Boolean (default false) - Show or hide week numbers.
### width {#opt-width}

string &#124; number

Sets the width of the component.

**Default value**: undefined