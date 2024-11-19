### actionableEvents {#opt-actionableEvents}

boolean

Specifies if the events on the agenda and inside the calendar popover are actionable or not.
If actionable, the event items will have hover and active states, and pointer cursor.
Set to `false` when custom event rendering is used and the event list items contain other actionable elements, e.g. buttons.

**Default value**: `true`
### context {#opt-context}

string &#124; HTMLElement

The DOM element in which the popups (event popover, year and month picker) are rendered. Can be a selector string or a DOM element.

**Default value**: `'body'`
### cssClass {#opt-cssClass}

string

Specifies a custom CSS class for the component.

**Default value**: `undefined`
### data {#opt-data}

Array&lt;[MbscCalendarEvent](#type-MbscCalendarEvent)&gt;

The events for the Eventcalendar.

The [`MbscCalendarEvent`](#type-MbscCalendarEvent) type has the following properties:
 - `allDay`: *boolean* - Specifies if the event is all day or not.
 - `bufferAfter`: *number* - Defines a buffer time in minutes that will be displayed after the end of the event.
 - `bufferBefore`: *number* - Defines a buffer time in minutes that will be displayed before the start of the event.
 - `cellCssClass`: *string* - CSS class for the day cell. Only applicable for the calendar view.
 - `color`: *string* - Background color of the event
 - `cssClass`: *string* - Specifies a custom CSS class that is applied to the event. Useful when customization is needed on the event level.
For example: setting the width for specific events.
 - `date`: *string &#124; object &#124; Date* - Specifies a single date for the event
 - `dragBetweenResources`: *boolean* - Specifies whether the event is movable across resources.
 - `dragBetweenSlots`: *boolean* - Specifies whether the event is movable across across slots.
 - `dragInTime`: *boolean* - Specifies whether the event is movable in time.
 - `editable`: *boolean* - Specifies if an event is editable or not. If false, drag & drop and resize is not allowed.
 - `end`: *string &#124; object &#124; Date* - Specifies the end date/time of a date/time range for the event
 - `id`: *string &#124; number* - A unique id for the event. If not specified, the event will get a generated id.
 - `order`: *number* - Specifies the order of the event in the array. Has precedence over the default ordering rules.
 - `overlap`: *boolean* - Specifies whether the event can be overlapped. Has precedence over the `eventOverlap`
property of the resource and the [eventOverlap](#opt-eventOverlap) option.
 - `recurring`: *string &#124; [MbscRecurrenceRule](#type-MbscRecurrenceRule)* - Specifies a recurrence rule for handling recurring events.
 - `recurringException`: *string &#124; object &#124; Date &#124; Array&lt;string &#124; object &#124; Date&gt;* - Exception dates of the recurring rule.
Useful when specific dates need to be skipped from the rule.
 - `recurringExceptionRule`: *string &#124; [MbscRecurrenceRule](#type-MbscRecurrenceRule)* - Exception rule of the recurring rule.
Useful when recurring dates need to be skipped from the rule.
 - `resize`: *boolean* - Specifies whether the event is resizable.
Has precedence over the `eventResize` property of the resource and
the [dragToResize](#opt-dragToResize) option.
 - `resource`: *string &#124; number &#124; Array&lt;string &#124; number&gt;* - In case of the timeline and scheduler view of the Eventcalendar, specifies the [resource](#opt-resources) ids
for the event.
The event will be displayed only on the specified resource.
If there is no resource defined, it will be displayed on every resource.
 - `slot`: *string &#124; number* - In case of the timeline view of the Eventcalendar, specifies the [slot](#opt-slot) id
for the event.
The event will be displayed only on the specified slot.
If there is no slot defined, it will be displayed on every slot.
 - `start`: *string &#124; object &#124; Date* - Specifies the start date/time of a date/time range for the event
 - `textColor`: *string* - A color applied on the text.
 - `timezone`: *string* - Timezone of the event
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

[MbscDateType](#type-MbscDateType)

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
### eventOrder {#opt-eventOrder}

(event1: [MbscCalendarEvent](#type-MbscCalendarEvent), event2: [MbscCalendarEvent](#type-MbscCalendarEvent)) => number


Determines the ordering of the events within the same day.
Can be a function that accepts two event objects as arguments and should return -1 or 1.

If not specified, the default order is:
- all day events
- rest of events, sorted by start time; events with identical start times,
will be ordered alphabetically based on their title

**Default value**: `undefined`
### exclusiveEndDates {#opt-exclusiveEndDates}

boolean

If `true`, the Eventcalendar will work in exclusive end dates mode,
meaning that the last moment of the range (event, invalid, colors, etc.) is not part of the range.

E.g. `end: '2021-07-03T00:00'` means that the event ends on 2nd of July and will not be displayed on 3rd of July.

:::info
When using timezones, the `exclusiveEndDates` option will default to `true`.
:::
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
### max {#opt-max}

[MbscDateType](#type-MbscDateType)

Maximum date and time. The calendar cannot be navigated beyond the specified maximum date.
If navigation is needed, but event creation should not be allowed after a specific date,
use the [invalid](#opt-invalid) option with daily recurrence starting from the specific date.

**Default value**: `undefined`
### min {#opt-min}

[MbscDateType](#type-MbscDateType)

Minimum date and time. The calendar cannot be navigated beyond the specified minimum date.
If navigation is needed, but event creation should not be allowed before a specific date,
use the [invalid](#opt-invalid) option with daily recurrence until the specific date.

**Default value**: `undefined`
### modules {#opt-modules}

Array&lt;IModule&gt;

Additional modules can be added to the eventcalendar. The option receives an array of module objects.
For example, the print module can be added through this option.

```js
// import the print module
import { print } from '@mobiscroll/print';

// later on, add it to the modules array:
modules: [print]
```
### refDate {#opt-refDate}

[MbscDateType](#type-MbscDateType)

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
### responsive {#opt-responsive}

[MbscResponsiveOptions&lt;MbscEventcalendarOptions&gt;](#type-MbscResponsiveOptions)

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

[MbscDateType](#type-MbscDateType)

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

Array&lt;[MbscCalendarEvent](#type-MbscCalendarEvent)&gt;

Specifies the selected events on the calendar. The [onSelectedEventsChange](#event-onSelectedEventsChange) event will be
fired when the selected events change from the calendar.

The [`MbscCalendarEvent`](#type-MbscCalendarEvent) type has the following properties:
 - `allDay`: *boolean* - Specifies if the event is all day or not.
 - `bufferAfter`: *number* - Defines a buffer time in minutes that will be displayed after the end of the event.
 - `bufferBefore`: *number* - Defines a buffer time in minutes that will be displayed before the start of the event.
 - `cellCssClass`: *string* - CSS class for the day cell. Only applicable for the calendar view.
 - `color`: *string* - Background color of the event
 - `cssClass`: *string* - Specifies a custom CSS class that is applied to the event. Useful when customization is needed on the event level.
For example: setting the width for specific events.
 - `date`: *string &#124; object &#124; Date* - Specifies a single date for the event
 - `dragBetweenResources`: *boolean* - Specifies whether the event is movable across resources.
 - `dragBetweenSlots`: *boolean* - Specifies whether the event is movable across across slots.
 - `dragInTime`: *boolean* - Specifies whether the event is movable in time.
 - `editable`: *boolean* - Specifies if an event is editable or not. If false, drag & drop and resize is not allowed.
 - `end`: *string &#124; object &#124; Date* - Specifies the end date/time of a date/time range for the event
 - `id`: *string &#124; number* - A unique id for the event. If not specified, the event will get a generated id.
 - `order`: *number* - Specifies the order of the event in the array. Has precedence over the default ordering rules.
 - `overlap`: *boolean* - Specifies whether the event can be overlapped. Has precedence over the `eventOverlap`
property of the resource and the [eventOverlap](#opt-eventOverlap) option.
 - `recurring`: *string &#124; [MbscRecurrenceRule](#type-MbscRecurrenceRule)* - Specifies a recurrence rule for handling recurring events.
 - `recurringException`: *string &#124; object &#124; Date &#124; Array&lt;string &#124; object &#124; Date&gt;* - Exception dates of the recurring rule.
Useful when specific dates need to be skipped from the rule.
 - `recurringExceptionRule`: *string &#124; [MbscRecurrenceRule](#type-MbscRecurrenceRule)* - Exception rule of the recurring rule.
Useful when recurring dates need to be skipped from the rule.
 - `resize`: *boolean* - Specifies whether the event is resizable.
Has precedence over the `eventResize` property of the resource and
the [dragToResize](#opt-dragToResize) option.
 - `resource`: *string &#124; number &#124; Array&lt;string &#124; number&gt;* - In case of the timeline and scheduler view of the Eventcalendar, specifies the [resource](#opt-resources) ids
for the event.
The event will be displayed only on the specified resource.
If there is no resource defined, it will be displayed on every resource.
 - `slot`: *string &#124; number* - In case of the timeline view of the Eventcalendar, specifies the [slot](#opt-slot) id
for the event.
The event will be displayed only on the specified slot.
If there is no slot defined, it will be displayed on every slot.
 - `start`: *string &#124; object &#124; Date* - Specifies the start date/time of a date/time range for the event
 - `textColor`: *string* - A color applied on the text.
 - `timezone`: *string* - Timezone of the event
 - `title`: *string* - The title of the event.
 - `tooltip`: *string* - The tooltip text of the event.





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

[MbscTimezonePlugin](#type-MbscTimezonePlugin)

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

The [`MbscTimezonePlugin`](#type-MbscTimezonePlugin) type has the following properties:
 - `createDate`: *(s: any, year: string &#124; number &#124; Date &#124; MbscTimezonedDate, month: number, date: number, h: number, min: number, sec: number, ms: number) => MbscTimezonedDate* - 
 - `parse`: *(date: string &#124; number, s: any) => MbscTimezonedDate* - 



### width {#opt-width}

string &#124; number

Sets the width of the component.

**Default value**: `undefined`
### zoomLevel {#opt-zoomLevel}

string &#124; number

zomLevel desc

**Default value**: `undefined`