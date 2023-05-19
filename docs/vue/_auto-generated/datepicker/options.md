### anchor {#opt-anchor}

HTMLElement

Specifies the anchor element for positioning, if [display](#opt-display) is set to &#039;anchored&#039;.
### animation {#opt-animation}

boolean &#124; "pop" &#124; "slide-down" &#124; "slide-up"

Animation to use for opening/closing of the control (if [display](#opt-display) is not inline).
Possible values:
 - &#039;pop&#039;
 - &#039;slide-down&#039;
 - &#039;slide-up&#039;
If false, turns the animation off.
### buttons {#opt-buttons}

Array&lt;string &#124; MbscPopupButton&gt;

Buttons to display. Each item in the array will be a button. A button can be specified as a string, or as a button object.

If a string, it must be one of the predefined buttons:
 - &#039;ok&#039; - Approve action (if applicable). It&#039;s the same as the &#039;set&#039; button, but will display the caption specified by the
[okText option](#localization-okText). Just like the &#039;set&#039; button, it will trigger the [onSet event](#event-onSet), when pressed.
 - &#039;cancel&#039; - Dismisses the popup.

:::note
To modify the text of the predefined buttons, you can use the [okText](#localization-okText),
[cancelText](#localization-cancelText) options.
:::

Every passed object can have the following properties:
 - text - String - Text of the button.
 - handler - String, Function - The function which will run when the button is pressed. If a string, it must be one of the predefined
button handlers:
   - &#039;set&#039; - Approve action (if applicable).
   - &#039;cancel&#039; - Dismisses the popup.
 - icon - String (Optional) - Icon of the button.
 - cssClass - String (Optional) - Css class of the button.
 - disabled - Boolean (Optional) - Sets the disabled state of the button.
 - keyCode - Number, String, Array (Optional) - The key code associated with the button to activate it from keyboard.
Can be a single value or multiple value passed as an array. Predifine string values are:
   - &#039;enter&#039;
   - &#039;esc&#039;
   - &#039;space&#039;

```js title="Predefined and custom buttons"
buttons: [
  'set',
  {
    text: 'Custom',
    icon: 'checkmark',
    cssClass: 'my-btn',
    handler: function (event) {
      alert('Custom button clicked!');
    }
  },
  'cancel'
]
```
```js title="Using a predefined handler"
buttons: [
  'set',
  {
    text: 'Hide',
    handler: 'cancel',
    icon: 'close',
    cssClass: 'my-btn'
  }
]
```
### calendarScroll {#opt-calendarScroll}

"horizontal" &#124; "vertical"

Controls the direction the calendar can be navigated in. You can navigate by scrolling, swiping or by clicking the arrow
buttons in the header.
Possible values:
 - &#039;horizontal&#039; - enables navigating the view horizontally.
 - &#039;vertical&#039; - enables navigating the view vertically.
When navigation is &#039;vertical&#039; the outer days (days from previous and next months) are hidden. You can explicitly override
it with the [showOuterDays option](#opt-showOuterDays).

**Default value**: 'horizontal'
### calendarSize {#opt-calendarSize}

number

Number of months/weeks to display.

The months/weeks start from a reference date, that can be set using the [refDate](#opt-refDate) option.

**Default value**: 1
### calendarSystem {#opt-calendarSystem}

MbscCalendarSystem

Specify the calendar system to be used. Supported calendar systems:
- Gregorian - This is the default calendar system, no setting needs to be passed.
- Jalali - Default system of the Persian calendar. The Farsi language needs to be included to the package.
- Hijri - Arabic language needs to be included to the package

**Default value**: undefined
### calendarType {#opt-calendarType}

"month" &#124; "year" &#124; "week"

Sets the calendar type. Possible values: &#039;year&#039;, &#039;month&#039;, &#039;week&#039;.

In case of &#039;month&#039; set the number of displayed months using the [pages option](#opt-pages) (swipeable month view) or
the [calendarSize option](#opt-calendarSize) (grid month view).

In case of &#039;week&#039; set the number of displayed weeks using the [calendarSize option](#opt-calendarSize).

**Default value**: 'month'
### circular {#opt-circular}

boolean &#124; Array&lt;boolean&gt;


### closeOnEsc {#opt-closeOnEsc}

boolean

If true, the popup is closed on ESC keypress.
### closeOnOverlayClick {#opt-closeOnOverlayClick}

boolean

If true, the popup is closed on overlay tap/click.
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
### context {#opt-context}

any

Specify the DOM element in which the component is appended and positioned (if not inline).
Can be a selector string or a DOM element.

**Default value**: 'body'
### controls {#opt-controls}

Array&lt;TDatepickerControl&gt;

List of controls to show. Possible values:
- [&#039;calendar&#039;]
- [&#039;calendar&#039;, &#039;time&#039;]
- [&#039;date&#039;]
- [&#039;datetime&#039;]
- [&#039;date&#039;, &#039;time&#039;]
- [&#039;time&#039;]
- [&#039;timegrid&#039;]

**Default value**: ['calendar']
### cssClass {#opt-cssClass}

string

Applies custom css class to the top level element.

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
### defaultSelection {#opt-defaultSelection}

any

Default selection which appears on the picker. The provided value will not be set as picker value, it&#039;s only a pre-selection.

If not provided, the default selection will be the current date and/or time.

If null is passed, in case of the calendar control there will be no selected value, in case of scroller controls the current date
and time will still be displayed on the selected line, as an empty value cannot be displayed on the scroller.

**Default value**: undefined
### disabled {#opt-disabled}

boolean

Initial disabled state of the component. This will take no effect in inline display mode.

**Default value**: false
### display {#opt-display}

MbscPopupDisplay

Controls the positioning of the component. Possible options:
 - &#039;center&#039; - The component appears as a popup at the center of the viewport.
 - &#039;inline&#039; - If called on div element, the component is placed inside the div (overwriting existing content), otherwise
is placed after the original element.
 - &#039;anchored&#039; - The component appears positioned to the element defined by the [anchor option](#opt-anchor). By default the anchor
is the original element.
 - &#039;top&#039; - The component appears docked to the top of the viewport.
 - &#039;bottom&#039; - The component appears docked to the bottom of the viewport.
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
### endIcon {#opt-endIcon}

string

Specify the icon name for the form components which will be displayed on the end of the component.
Use [startIcon option](#opt-startIcon) for specifying icon to the opposite side.
### endIconSvg {#opt-endIconSvg}

string

Specify the icon svg for the form components which will be displayed on the end of the component.
Use [startIconSvg option](#opt-startIconSvg) for specifying icon to the opposite side.
### endInput {#opt-endInput}

any

Sets the Input for the end date.

When using the datepicker to select a range, it can be used with one, two or no inputs. When the endInput is passed to the datepicker,
it will put the range end part of the selection to that input. Similarly the input for the beginning part can be specified by the
[startInput option](#opt-startInput).

**Default value**: undefined
### error {#opt-error}

boolean

Controls the error state of the component. If true error styles will be displayed.
### errorMessage {#opt-errorMessage}

string

Controls the error message of the component. If [error option](#opt-error) is set to true the error message will be displayed.
### exclusiveEndDates {#opt-exclusiveEndDates}

boolean

If true, the Datepicker will work in exclusive end dates mode,
meaning that the last moment of the range (event, invalid, colors, etc.) is not part of the range.

For example, when selecting a date range without the time part,
selecting &#039;2021-07-20&#039; for the range end will return &#039;2021-07-21&#039; instead.
Because the range ends on the 21st, not including the 21st.

:::info
When using timezones the exclusiveEndDates option defaults to true.
:::
### firstSelectDay {#opt-firstSelectDay}

number

Sets the first day of the selection, when preset-range selection is used. It takes a number representing the day of the week.
Ex. Sunday is 0, Monday is 1, etc.

The length of the selection can be controlled with the [selectSize](#opt-selectSize) option.

**Default value**: [firstDay](#localization-firstDay). It defaults to the first day of the week, which depends
on the localization used.
### focusOnClose {#opt-focusOnClose}

boolean

Element to focus after the popup is closed. If undefined, the original element will be focused. If false, no focusing will occur.
### focusTrap {#opt-focusTrap}

boolean

If not in inline mode, focus won&#039;t be allowed to leave the popup.
### fromText {#opt-fromText}

string


### fullScreen {#opt-fullScreen}

boolean

If true, the popup will appear in full screen, but, by default, its width and height won&#039;t exceed 600px.
You can change that using the [maxWidth](#opt-maxWidth) and [maxHeight](#opt-maxHeight) options.
### headerText {#opt-headerText}

string

Text to display in the header.
### height {#opt-height}

string &#124; number

Sets the height of the component.
### inRangeInvalid {#opt-inRangeInvalid}

boolean

In case of [range selection](#opt-select), determines if the invalid dates are allowed between the start and the end date.

When inRangeInvalid is set to false, the end selection will be limited to the next invalid date from the selected start date.

When designing a booking system, a possible solution for already booked dates is to set those dates to invalid.
When considering &quot;check-in&quot; and &quot;check-out&quot; selections with the datepicker, in some cases it is desireable to be able to check out
on dates that already have a check-in. In this case, those dates would be disabled. Using the
[rangeEndInvalid option](#opt-rangeEndInvalid) it can be allowed that the first invalid day after the start date can be selected
as end date.

**Default value**: false
### inputStyle {#opt-inputStyle}

"outline" &#124; "underline" &#124; "box"

Defines the input rendering mode. By default the input has the underline styling. Possible values:
 - &#039;underline&#039;
 - &#039;box&#039;
 - &#039;outline&#039;
### inputTyping {#opt-inputTyping}

boolean

Allow the typing into the input field in desktop mode.

**Default value**: true
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
### isOpen {#opt-isOpen}

boolean

Specifies wether the popup is opened or not. Use it together with the [onClose event](#event-onClose), by setting it
to false when the popup closes.
### itemHeight {#opt-itemHeight}

number

Height of the wheel items in pixels.
### itemTemplate {#opt-itemTemplate}

any


### label {#opt-label}

string

Sets the label of component.
### labelStyle {#opt-labelStyle}

"inline" &#124; "floating" &#124; "stacked"

Defines the position of the label. The default label style depends on the [theme option](#opt-theme).

Possible values:
 - &#039;stacked&#039;
 - &#039;inline&#039;
 - &#039;floating&#039;
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
### maxHeight {#opt-maxHeight}

string &#124; number

Sets the maximum height of the component. If not specified, on larger screens (>=768px width) it defaults to 600px.
### maxRange {#opt-maxRange}

number

Sets the maximum range that can be selected. When selecting a date without the time part, it sets the maximum number of days the
selected range can contain. When there is a time part in the selection, it sets the maximum range in milliseconds.

**Default value**: undefined
### maxTime {#opt-maxTime}

DateType

It sets the maximum time that is selectable on [the time or the timegrid control](#opt-controls).

When there is a date part of the selection, the maximum is applied to each day. For example
```js
maxTime: '18:00'
```
will limit the time part of the selection to at most 18 o&#039;clock each day.

In contrast to the [max option](#opt-max), which will limit the date part of the selection as well. For example:
```js
max: '2021-08-22T18:00
```
will limit the selection to August 22nd 18 o&#039;clock, but will allow selection of times past 18 o&#039;clock on dates before Aug. 22nd.
:::caution
This option can&#039;t be used with the [[&#039;datetime&#039;] control](#opt-controls).
:::

**Default value**: undefined
### maxWheelWidth {#opt-maxWheelWidth}

number &#124; Array&lt;number&gt;


### maxWidth {#opt-maxWidth}

string &#124; number

Sets the maximum width of the component.
### min {#opt-min}

DateType

Minimum date and time. The calendar cannot be navigated beyond the specified minimum date.
If navigation is needed, but event creation should not be allowed before a specific date,
use the [invalid](#opt-invalid) option with daily recurrence until the specific date.

**Default value**: undefined
### minRange {#opt-minRange}

number

It sets the minimum range that can be selected. When selecting a date range without the time part, it sets the minimum number of days
the selected range can contain. When there is a time part in the selection, it sets the minimum range in milliseconds.

**Default value**: undefined
### minTime {#opt-minTime}

DateType

It sets the minimum time that is selectable on [the time or the timegrid control](#opt-controls).

When there is a date part of the selection, the minimum is applied to each day. For example
```js
minTime: '08:00'
```
will limit the time part of the selection to at least 8 o&#039;clock each day.

In contrast to the [min option](#opt-min), which will limit the date part of the selection as well. For example:
```js
min: '2021-08-22T08:00
```
will limit the selection to August 22nd 8 o&#039;clock, but will allow selection of times earlier than 8 o&#039;clock on dates after Aug. 22nd.
:::caution
This option can&#039;t be used with the [[&#039;datetime&#039;] control](#opt-controls).
:::

**Default value**: undefined
### minWheelWidth {#opt-minWheelWidth}

number &#124; Array&lt;number&gt;


### moment {#opt-moment}

any

Reference to the Moment.js library. When using Moment objects as [return values](#opt-returnFormat),
this setting should be passed the reference to the Moment.js library.

Check out our example on how to pass moment to the datepicker!

**Default value**: undefined
### onWheelMove {#opt-onWheelMove}

(args: IWheelMoveArgs) => undefined &#124; Array&lt;any&gt;



### pages {#opt-pages}

number &#124; "auto"

Number of calendar pages (month or week) to display. If &#039;auto&#039;, the displayed number of pages will be decided based on the
viewport size.

**Default value**: 1
### rangeEndInvalid {#opt-rangeEndInvalid}

boolean

When true, it enables the end date to be selected on the first invalid date that comes after the selected start date.

For example, when designing a booking system, a possible solution for already booked dates is to set those dates to invalid.
When considering &quot;check-in&quot; and &quot;check-out&quot; selections with the datepicker, in some cases it is desireable to be able to
check out on dates that already have a check-in. In this example those dates would be disabled. With the rangeEndInvalid
option it can be enabled, so the selection&#039;s end can be on the same day the first invalid is.

:::caution
When the [inRangeInvalid](#opt-inRangeInvalid) option is set to true (default), this option is ignored, so be sure to turn
that off too if you want to use this one.
:::

**Default value**: false
### rangeHighlight {#opt-rangeHighlight}

boolean

When selecting a range on the calendar control, it is optional to highlight the dates between the start and end date.

By default, the dates are highlighted between the start and end values. When the highlight is turned off, only the start
and end dates are shown as selected on the calendar.

On desktop devices where a cursor is available, hovering the calendar days also help to visualize the selecting range.
The hover styling is also turned off, when the range is not highlighted.

**Default value**: true
### refDate {#opt-refDate}

DateType

Specifies the reference date of the component, which represents when to start to calculate the view you want to display.

For example, if you want to display 2 months from the current month, you must specify the first day of the current month as
the reference date. Then you can use the [calendarSize](#opt-calendarSize) option to show 2 months.

**Default value**: 1970/01/01
### renderItem {#opt-renderItem}

any


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
### returnFormat {#opt-returnFormat}

"locale" &#124; "moment" &#124; "jsdate" &#124; "iso8601"

Specifies the format in which the selected date(s) is returned in the [onChange](#onChange) event.
- &#039;jsdate&#039; - Javascript date object
- &#039;iso8601&#039; - ISO 8601 date string.
- &#039;locale&#039; - Formatted date string based on the lang setting, or the
[dateFormat](#opt-dateFormat) and [timeFormat](#opt-timeFormat) settings, if they are specified.
- &#039;moment&#039; - moment object. Ensure that [moment.js](https://momentjs.com/) is loaded.

:::info
When using Moment.js, the reference to the moment library must be passed to the component via the moment option.
Check out our example on [how to pass moment to the datepicker](https://docs.mobiscroll.com/datepicker#return-values)!
:::
:::caution
When using a [timezone plugin](#opt-timezonePlugin),
the returned values are always in &#039;iso8601&#039; format and this option is not taken into account.
:::

**Default value**: &#039;pm&#039;
### rows {#opt-rows}

number

Number of visible rows on the wheel.
### scroll3d {#opt-scroll3d}

boolean


### scrollLock {#opt-scrollLock}

boolean

Disables page scrolling on touchmove (if not in inline mode, and popup height is less than window height).
### select {#opt-select}

"date" &#124; "range" &#124; "preset-range"

In terms of value selection, the datepicker can be used to select a single date/time or multiple dates/times, as well as a date range
or a time range. It is also possible to select a week or a part of the week as a range, called preset-range.

The select setting defines if the picker is used for selecting independent dates or a range.

Possible values are:
- &#039;date&#039; - it is used for single or multiple date/time selection
- &#039;range&#039; - it is used for date range or time range selection
- &#039;preset-range&#039; - it is used for a week range selection

**Default value**: 'date'
### selectCounter {#opt-selectCounter}

boolean

If true and [multiple selection](#opt-selectMultiple) is enabled, the number of selected items will be displayed in the header.

**Default value**: false
### selectMax {#opt-selectMax}

number

The maximum number of selected items in case of multiple selection.

**Default value**: undefined
### selectMultiple {#opt-selectMultiple}

boolean

If true, multiple selection will be enabled.

**Default value**: false
### selectOnScroll {#opt-selectOnScroll}

boolean


### selectSize {#opt-selectSize}

number

Sets the length of the selection in days when the [preset-range selection](#opt-select) is used.

It defaults to the whole week (7 days).

The selection will start depending on the [firstSelectDay option](#opt-firstSelectDay) and will have the number of days specified
by the selectSize.

**Default value**: 7
### shouldValidate {#opt-shouldValidate}

(s: any, prevS: any) => boolean



### showArrow {#opt-showArrow}

boolean

Show or hide the popup arrow, when [display mode](#opt-display) is &#039;anchored&#039;.
### showControls {#opt-showControls}

boolean

Shows or hides the calendar header controls: the previous and next buttons,
and the current view button together with the year and month picker.

**Default value**: true
### showEventTooltip {#opt-showEventTooltip}

boolean


### showInput {#opt-showInput}

boolean

If true, it will render an input field for the component.

**Default value**: true
### showLabelCount {#opt-showLabelCount}

boolean


### showOnClick {#opt-showOnClick}

boolean

Opens the component on element click/tap.

**Default value**: true
### showOnFocus {#opt-showOnFocus}

boolean

Pops up the component on element focus.

**Default value**: false on desktop, true on mobile
### showOuterDays {#opt-showOuterDays}

boolean

Show or hide days from previous and next months.
:::info
Hiding outer days only works in case of month view, and not supported for week view.
:::
:::info
Outer days are automatically hidden if [calendarScroll](#opt-calendarScroll) is set to &#039;vertical&#039;.
:::

**Default value**: true
### showOverlay {#opt-showOverlay}

boolean

Show or hide overlay.
### showRangeLabels {#opt-showRangeLabels}

boolean

Show or hide the range labels.

When [selecting a range](#opt-select), a start and end label is shown on the Datepicker. These labels indicate which part of the range
are we selecting (start or end). The labels can also be used to switch the active selection from start to end or vice versa.

The [start label text](#localization-rangeStartLabel) and [end label text](#localization-rangeEndLabel) as well as the
[start value placeholder](#localization-rangeStartHelp) and the [end value placeholder](#localization-rangeEndHelp) can be localized
and/or customized.

**Default value**: true
### showToday {#opt-showToday}

boolean


### showWeekNumbers {#opt-showWeekNumbers}

boolean

Show week numbers on the calendar view. Enumeration starts with the first week of the year.

**Default value**: false
### startIcon {#opt-startIcon}

string

Specify the icon name for the form component which will be displayed on the start of the component. Use [endIcon option](#opt-endIcon)
for specifying icon to the opposite side.
### startIconSvg {#opt-startIconSvg}

string

Specify the icon svg for the form component which will be displayed on the start of the component. Use
[endIconSvg option](#opt-endIconSvg) for specifying icon to the opposite side.
### startInput {#opt-startInput}

any

Sets the Input for the start date.

When using the datepicker to select a range, it can be used with one, two or no inputs. When a startInput is passed to the datepicker,
it will put the range beginning part of the selection to that input. Similarly the input for the end part can be specified by the
[endInput option](#opt-endInput).

**Default value**: undefined
### stepHour {#opt-stepHour}

number

Step for the hours scroll wheel. Also, sets the hours step for the timegrid.

**Default value**: 1
### stepMinute {#opt-stepMinute}

number

Step for the minutes scroll wheel. Also, sets the minutes step for the timegrid.

**Default value**: 1
### stepSecond {#opt-stepSecond}

number

Step for the seconds scroll wheel. Also, sets the seconds step for the timegrid.

**Default value**: 1
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
### toText {#opt-toText}

string


### touchUi {#opt-touchUi}

boolean &#124; "auto"

Use true to render a touch optimized user interface, or false for a user interface optimized for pointer devices (mouse, touchpad).

Can be used with the responsive option to change the user interface based on viewport width.

If set to &#039;auto&#039;, the touch UI will be automatically enabled based on the platform.

**Default value**: 'auto'
### valid {#opt-valid}

Array&lt;DateType&gt; &#124; Array&lt;IValidateProps&gt;


### validate {#opt-validate}

(args: IScrollerValidateArgs) => {disabled: Array&lt;any&gt;, indexes: Array&lt;number&gt;, init: boolean, valid: Array&lt;any&gt;}



### valueEquality {#opt-valueEquality}

(v1: any, v2: any) => boolean



### wheelWidth {#opt-wheelWidth}

number &#124; Array&lt;number&gt;


### width {#opt-width}

string &#124; number

Sets the width of the popup container. This will take no effect in inline display mode.
### yearSuffix {#opt-yearSuffix}

string

