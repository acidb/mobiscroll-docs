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
colors: [
  { date: new Date(2020, 2, 23), background: 'pink' },
  { date: new Date(2020, 2, 24), background: 'green' },
  { background: '#ff0000', recurring: { repeat: 'weekly', weekDays: 'SU' } },
  { background: 'yellow', recurring: { repeat: 'weekly', weekDays: 'SA' } }
]
```

**Default value**: `undefined`
### cssClass {#opt-cssClass}

string

Specifies a custom CSS class for the component.

**Default value**: `undefined`
### data {#opt-data}

Array&lt;MbscCalendarEvent&gt;

The events for the calendar, as an array of event objects. The event object supports the following properties:
- `allDay`: *boolean* - Specifies if the event is all day or not.
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

DateType

Specifies the initial selected date on the calendar.

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
### dragInTime {#opt-dragInTime}

boolean

If `false`, the events will not be moveable in time.
In case of the scheduler and timeline views events events can still be moved between resources.
To control movement between resources, use the [dragBetweenResources](#opt-dragBetweenResources) option.

Consider that [dragToMove](#opt-dragToMove) has to be enabled.

**Default value**: `true`
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
### exclusiveEndDates {#opt-exclusiveEndDates}

boolean

If `true`, the event calendar will work in exclusive end dates mode,
meaning that the last moment of the range (event, invalid, colors, etc.) is not part of the range.

E.g. `end: '2021-07-03T00:00'` means that the event ends on 2nd of July and will not be displayed on 3rd of July.

:::info
When using timezones, the `exclusiveEndDates` option will default to `true`.
:::
### extendDefaultEvent {#opt-extendDefaultEvent}

(args: MbscNewEventData) => MbscCalendarEvent



### externalDrag {#opt-externalDrag}

boolean

If `true`, external drag &amp; drop is allowed and events can be dragged outside of the component view.

**Default value**: `undefined`
### externalDrop {#opt-externalDrop}

boolean

If `true`, external events can be  dragged into the view.

**Default value**: `undefined`
### height {#opt-height}

string &#124; number

Sets the height of the component.

The height of the calendar view impacts the number of labels that fit into a table cell.
A &quot;show more&quot; label will be displayed for events that don&#039;t fit.

**Default value**: `undefined`
### invalid {#opt-invalid}

Array&lt;DateType&gt; &#124; Array&lt;IValidateProps&gt;

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
invalid: [
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
];
```

**Default value**: `undefined`
### invalidateEvent {#opt-invalidateEvent}

"start-end" &#124; "strict"

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
labels: [
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

**Default value**: `undefined`
### max {#opt-max}

DateType

Maximum date and time. The calendar cannot be navigated beyond the specified maximum date.
If navigation is needed, but event creation should not be allowed after a specific date,
use the [invalid](#opt-invalid) option with daily recurrence starting from the specific date.

**Default value**: `undefined`
### min {#opt-min}

DateType

Minimum date and time. The calendar cannot be navigated beyond the specified minimum date.
If navigation is needed, but event creation should not be allowed before a specific date,
use the [invalid](#opt-invalid) option with daily recurrence until the specific date.

**Default value**: `undefined`
### refDate {#opt-refDate}

DateType

Specifies the reference date of the component, which represents when to start to calculate the view you want to display.
For example, if you want to display 14 days from today, you can specify today as the reference date.

:::info
If not defined, in case of scheduler and timeline views it will default to today, in other views it will default to `'1970/01/01'`.
:::

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
  custom: { // Custom breakpoint, you can use multiple if needed, but each must have a unique name.
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

DateType

Specifies the selected date on the calendar. Setting this option will force the calendar to display the passed date
and won&#039;t display anything else unless another selected date is set. This is called a controlled usage, and the
[onSelectedDateChange](#event-onSelectedDateChange) event can be used to get notified and act on navigational changes.

To set the initially displayed date without a controlled usage, use the [defaultSelectedDate](#opt-defaultSelectedDate) option instead.

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
### showEventTooltip {#opt-showEventTooltip}

boolean

If `false`, it will hide the native tooltip that shows up when hovering over an event.

**Default value**: `true`
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

It&#039;s possible to [modify theme colors or create custom themes](https://docs.mobiscroll.com/theming).

:::info
Make sure that the theme you set is included in the downloaded package.
:::

**Default value**: `undefined`
### themeVariant {#opt-themeVariant}

"dark" &#124; "light" &#124; "auto"

Controls which variant of the [theme](#opt-theme) will be used (light or dark).

Possible values:
- `'light'` - Use the light variant of the theme.
- `'dark'` - Use the dark variant of the theme.
- `'auto'` or `undefined` - Detect the preferred system theme on devices where this is supported.

To use the option with custom themes, make sure to create two custom themes, where the dark version has the same name as the light one,
suffixed with `'-dark'`, e.g.: `'my-theme'` and `'my-theme-dark'`.

**Default value**: `undefined`
### timezonePlugin {#opt-timezonePlugin}

ITimezonePlugin

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
### width {#opt-width}

string &#124; number

Sets the width of the component.

**Default value**: `undefined`