### anchor {#opt-anchor}

HTMLElement

Specifies the anchor element for positioning, if [display](#opt-display) is set to `'anchored'`.

**Default value**: `undefined`
### animation {#opt-animation}

boolean &#124; "pop" &#124; "slide-down" &#124; "slide-up"

Animation to use when the component is opened or closed, if [display](#opt-display) is not set to `'inline'`.
Possible values:
- `'pop'`
- `'slide-down'`
- `'slide-up'`

If `false`, the animation is turned off.

**Default value**: `undefined`
### ariaLabel {#opt-ariaLabel}

string

Specifies the accessible name of the picker input.

**Default value**: `undefined`
### buttons {#opt-buttons}

Array&lt;string &#124; [MbscPopupButton](#type-MbscPopupButton)&gt;

Buttons to display on the component. Each item of the array will be a button.
A button can be specified as a string, or as a button object.

If a string, it must be one of the predefined buttons:
- `'ok'` - Approve action. Will display the caption specified by the [okText](#localization-okText) option.
- `'cancel'` - Dismisses the popup. Will display the caption specified by the [cancelText](#localization-cancelText) option.
- `'close'` - Closes the popup. Will display the caption specified by the [closeText](#localization-closeText) option.
- `'set'` - Approve action. Will display the caption specified by the [setText](#localization-setText) option.

The [`MbscPopupButton`](#type-MbscPopupButton) type has the following properties:
 - `color`: *"light" &#124; "dark" &#124; "primary" &#124; "secondary" &#124; "success" &#124; "danger" &#124; "warning" &#124; "info"* - Specifies the predefined color of the button
 - `cssClass`: *string* - A custom CSS class that will be applied to the element
 - `disabled`: *boolean* - Disabled state of the button
 - `handler`: *[MbscPopupPredefinedButton](#type-MbscPopupPredefinedButton) &#124; (event: any) => void* - Specifies what happens when the button is pressed. It can be a predefined button handler
like `'set'`, `'cancel'` or a custom function.
 - `icon`: *string* - When specified, it renders an icon on the button. It requires the name of the icon that should be displayed.
 - `keyCode`: *number &#124; "enter" &#124; "esc" &#124; "space" &#124; Array&lt;number &#124; "enter" &#124; "esc" &#124; "space"&gt;* - The key code associated with the button to activate it from keyboard. Can be a single value or
multiple value passed as an array. Predefined string values are: `'enter'`, `'esc'`, `'space'`.
 - `text`: *string* - Sets the label of the button
 - `variant`: *"flat" &#124; "standard" &#124; "outline"* - The style of the button






```js title="Example for using predefined and custom buttons"
[
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
```js title="Example for using a predefined button handler"
[
  'set',
  {
    text: 'Hide',
    handler: 'cancel',
    icon: 'close',
    cssClass: 'my-btn'
  }
]
```

**Default value**: `['set', 'cancel']`
### calendarScroll {#opt-calendarScroll}

"horizontal" &#124; "vertical"

Controls the direction of the calendar navigation. You can navigate by scrolling, swiping or by clicking the arrow
buttons in the header.
Possible values:
- `'horizontal'` - Enables navigating the view horizontally.
- `'vertical'` - Enables navigating the view vertically.
When navigation is `'vertical'`, the outer days (days from previous and next months) are hidden. You can explicitly override
it with the [showOuterDays](#opt-showOuterDays) option.

**Default value**: `'horizontal'`
### calendarSize {#opt-calendarSize}

number

Number of months or weeks to display.
The view starts from a reference date defined by [refDate](#opt-refDate) option.

**Default value**: `1`
### calendarType {#opt-calendarType}

"month" &#124; "year" &#124; "week"

Specifies the type of the calendar.

In case of `'month'` set the number of displayed months using the [pages](#opt-pages) option (swipeable month view) or
the [calendarSize](#opt-calendarSize) option (grid month view).

In case of `'week'` set the number of displayed weeks using the [calendarSize](#opt-calendarSize) option.

**Default value**: `'month'`
### circular {#opt-circular}

boolean &#124; Array&lt;boolean&gt;

If `true`, the scroll wheels are circular. If an array, it can be specified as a per wheel configuration, e.g. for 3 wheels:
`[true, false, false]` sets the first wheel circular.
If not specified, if a wheel has more values than the number of the displayed rows, the scroll wheel becomes circular.

**Default value**: `undefined`
### closeOnEsc {#opt-closeOnEsc}

boolean

If `true`, the popup is closed when the ESC key is pressed.

**Default value**: `true`
### closeOnOverlayClick {#opt-closeOnOverlayClick}

boolean

If `true`, the popup is closed on overlay click or tap.

**Default value**: `true`
### colors {#opt-colors}

Array&lt;[MbscCalendarColor](#type-MbscCalendarColor)&gt;

Specifies the color for certain dates or date ranges on the calendar.

The [`MbscCalendarColor`](#type-MbscCalendarColor) type has the following properties:
 - `allDay`: *boolean* - Specifies whether the date you want to color is all day or not.
 - `background`: *string* - Background color of the cell. It can be any valid CSS color (`'red'`, `'#ff0000'`, `'rgb(255, 0, 0)'`, etc.).
 - `cellCssClass`: *string* - CSS class for the day cell. Only applicable for the calendar view.
 - `cssClass`: *string* - Specifies a custom CSS class for the color.
Useful when customization is needed for the background of cells and time ranges.
Only applicable for the timeline and scheduler views.
 - `date`: *string &#124; object &#124; Date* - Specifies a single date for the color
 - `end`: *string &#124; object &#124; Date* - Specifies the end date/time of a date/time range for the color
 - `highlight`: *string* - Highlight color of the day, can be any valid CSS color (`'red'`, `'#ff0000'`, `'rgb(255, 0, 0)'`, etc.).
 - `recurring`: *string &#124; [MbscRecurrenceRule](#type-MbscRecurrenceRule)* - Specifies a recurrence rule for handling recurring days.
 - `recurringException`: *string &#124; object &#124; Date &#124; Array&lt;string &#124; object &#124; Date&gt;* - Exception dates of the recurring rule.
Useful when specific dates need to be skipped from the rule.
 - `recurringExceptionRule`: *string &#124; [MbscRecurrenceRule](#type-MbscRecurrenceRule)* - Exception rule of the recurring rule.
Useful when recurring dates need to be skipped from the rule.
 - `resource`: *string &#124; number &#124; Array&lt;string &#124; number&gt;* - In case of the timeline and scheduler view of the Eventcalendar, specifies the [resource](#opt-resources) ids
for the color.
The color will be displayed only on the specified resource.
If there is no resource defined, it will be applied to every resource.
 - `slot`: *string &#124; number* - In case of the timeline view of the Eventcalendar, specifies the [slot](#opt-slot) id
for the color.
The color will be displayed only on the specified slot.
If there is no slot defined, it will be applied to every slot.
 - `start`: *string &#124; object &#124; Date* - Specifies the start date/time of a date/time range for the color
 - `textColor`: *string* - A color applied on the text.
 - `title`: *string* - A title that will be displayed on the item.





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
### controls {#opt-controls}

Array&lt;[MbscDatepickerControl](#type-MbscDatepickerControl)&gt;

List of controls to display on the picker. Possible values:
- `['calendar']`
- `['calendar', 'time']`
- `['date']`
- `['datetime']`
- `['date', 'time']`
- `['time']`
- `['timegrid']`

**Default value**: `['calendar']`
### cssClass {#opt-cssClass}

string

Specifies a custom CSS class for the component.

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
### defaultSelection {#opt-defaultSelection}

any

Default selection which appears on the picker. The provided value will not be set as picker value, it&#039;s only a pre-selection.

If not provided, the default selection will be the current date and/or time.

If `null` is passed, in case of the calendar control there will be no selected value, in case of scroller controls the current date
and time will still be displayed on the selected line, as an empty value cannot be displayed on the scroller.

**Default value**: `undefined`
### disabled {#opt-disabled}

boolean

Specifies the disabled state of the input.

**Default value**: `false`
### display {#opt-display}

[MbscPopupDisplay](#type-MbscPopupDisplay)

Controls the positioning of the component. Possible values are:
- `'center'` - The component appears as a popup at the center of the viewport.
- `'inline'` - The component is rendered inline.
- `'anchored'` - The component appears positioned to the element defined by the [anchor](#opt-anchor) option.
- `'top'` - The component appears docked to the top of the viewport.
- `'bottom'` - The component appears docked to the bottom of the viewport.

The default display mode depends on the [theme](#opt-theme), it defaults to `'bottom'` for the iOS theme and
to `'center'` for all other themes.

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
### endIcon {#opt-endIcon}

string

Specifies the icon which will be displayed at the end of the input.
Use the [startIcon](#opt-startIcon) option for specifying an icon at the start.

**Default value**: `undefined`
### endInput {#opt-endInput}

any

Sets the input for the end date.

When using the Datepicker to [select a range](#opt-select), it can be used with one, two or no inputs.
When the `endInput` is specified, it will put the range end part of the selection to that input.
Similarly the input for the range start can be specified using the [startInput](#opt-startInput) option.

**Default value**: `undefined`
### error {#opt-error}

boolean

If `true`, the input will be displayed with error styles.

**Default value**: `false`
### errorMessage {#opt-errorMessage}

string

Error message for the input. If the [error](#opt-error) option is set to `true`, the message will be displayed.

**Default value**: `undefined`
### exclusiveEndDates {#opt-exclusiveEndDates}

boolean

If `true`, the picker will work in exclusive end dates mode,
meaning that the last moment of the range (selected value, colors, invalids, marked days etc.)
is not part of the range.

For example, when selecting a date range without the time part,
selecting `'2021-07-20'` for the range end, the underlying value will return `'2021-07-21'` instead,
because the range ends on the 21st, not including the 21st.

:::info
When using timezones, the `exclusiveEndDates` option will default to `true`.
:::

**Default value**: `false`
### firstSelectDay {#opt-firstSelectDay}

number

Sets the first day of the selection, when `'preset-range'` [selection](#opt-select) is used.
It takes a number representing the day of the week, * Sunday is 0, Monday is 1, etc.

If not specified, it defaults to the first day of the week defined by the [localization](#localization-locale).

The length of the selection can be controlled with the [selectSize](#opt-selectSize) option.

**Default value**: `undefined`
### focusOnClose {#opt-focusOnClose}

boolean

If `true`, after closing the popup the focus will be moved to the last focused element
before the popup was opened.

**Default value**: `true`
### focusOnOpen {#opt-focusOnOpen}

boolean

If `true`, the popup will receive the focus when opened.

**Default value**: `true`
### focusTrap {#opt-focusTrap}

boolean

If `true` and [display](#opt-display) is not set to `'inline'`, focus won&#039;t be allowed to leave the popup.

**Default value**: `true`
### headerText {#opt-headerText}

string

Specifies a custom string which appears in the picker header.
If it contains the `'{value}'` string, it will be replaced with the selected value of the picker.

**Default value**: `undefined`
### inRangeInvalid {#opt-inRangeInvalid}

boolean

In case of [range selection](#opt-select), specifies if invalid dates are allowed between the start and end dates.

When set to `false`, the end selection will be limited to the next invalid date from the selected start date.

For example, when designing a booking system, a possible solution for already booked dates is to set those dates to invalid.
When considering check-in and check-out selections with the datepicker, in some cases it is desireable to be able to check out
on dates that already have a check-in. In this case, those dates would be disabled. Using the
[rangeEndInvalid](#opt-rangeEndInvalid) option it can be allowed that the first invalid day after the start date can be selected
as end date.

**Default value**: `false`
### inputComponent {#opt-inputComponent}

any

The input component to render if the picker is modal
If not specified, it will render a [Mobiscroll Input](../forms/input) component.

Props can be specified using the [inputProps](#opt-inputProps) option.

**Default value**: `undefined`
### inputProps {#opt-inputProps}

any

Props for the rendered input, specified by the [inputComponent](#opt-inputComponent) option.

**Default value**: `undefined`
### inputStyle {#opt-inputStyle}

"outline" &#124; "box" &#124; "underline"

Specifies the style of the input. Possible values:
- `'underline'`
- `'box'`
- `'outline'`

The default value depends on the [theme](#opt-theme):
- iOS: `'underline'`
- Material: `'box'`
- Windows: `'outline'`

**Default value**: `undefined`
### inputTyping {#opt-inputTyping}

boolean

Allow the typing into the input field in desktop mode.

**Default value**: `true`
### invalid {#opt-invalid}

Array&lt;[MbscDateType](#type-MbscDateType)&gt; &#124; Array&lt;IValidateProps&gt;

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
### isOpen {#opt-isOpen}

boolean

Specifies if the component is opened or not. Use it together with the [onClose](#event-onClose) event, by setting it
to `false` when the component closes.

**Default value**: `false`
### itemHeight {#opt-itemHeight}

number

Height in pixels of one item on the wheel. The default value depends on the [theme](#opt-theme):
- iOS: 34
- Material: 40
- Windows: 44
### label {#opt-label}

string

Specifies the label of the input.

**Default value**: `undefined`
### labelStyle {#opt-labelStyle}

"inline" &#124; "floating" &#124; "stacked"

Specifies the position of the input label. Possible values:
- `'stacked'`
- `'inline'`
- `'floating'`

The default value depends on the [theme](#opt-theme):
- iOS: `'inline'`
- Material: `'floating'`
- Windows: `'stacked'`

**Default value**: `undefined`
### labels {#opt-labels}

Array&lt;[MbscCalendarLabel](#type-MbscCalendarLabel)&gt;

Specifies labels for calendar days.

The [`MbscCalendarLabel`](#type-MbscCalendarLabel) type has the following properties:
 - `cellCssClass`: *string* - CSS class for the day cell. Only applicable for the calendar view.
 - `color`: *string* - Background color of the label.
 - `cssClass`: *string* - Specifies a custom CSS class that is applied to the label.
 - `date`: *string &#124; object &#124; Date* - Specifies a single date for the label
 - `end`: *string &#124; object &#124; Date* - Specifies the end date/time of a date/time range for the label
 - `order`: *number* - Specifies the order of the label in the array. Has precedence over the default ordering rules.
 - `recurring`: *string &#124; [MbscRecurrenceRule](#type-MbscRecurrenceRule)* - Specifies a recurrence rule for handling recurring days.
 - `recurringException`: *string &#124; object &#124; Date &#124; Array&lt;string &#124; object &#124; Date&gt;* - Exception dates of the recurring rule.
Useful when specific dates need to be skipped from the rule.
 - `recurringExceptionRule`: *string &#124; [MbscRecurrenceRule](#type-MbscRecurrenceRule)* - Exception rule of the recurring rule.
Useful when recurring dates need to be skipped from the rule.
 - `start`: *string &#124; object &#124; Date* - Specifies the start date/time of a date/time range for the label
 - `textColor`: *string* - A color applied on the text.
 - `title`: *string* - The title of the label.
 - `tooltip`: *string* - Tooltip for the label





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

Array&lt;[MbscCalendarMarked](#type-MbscCalendarMarked)&gt;

Mark certain dates on the calendar. An array containing dates, or objects with the following properties:

The [`MbscCalendarMarked`](#type-MbscCalendarMarked) type has the following properties:
 - `cellCssClass`: *string* - CSS class for the day cell. Only applicable for the calendar view.
 - `color`: *string* - Color of the mark.
 - `date`: *string &#124; object &#124; Date* - Specifies a single date when this is applicable
 - `end`: *string &#124; object &#124; Date* - Specifies the end date/time of a date/time range when this is applicable
 - `markCssClass`: *string* - CSS class for the mark.
 - `recurring`: *string &#124; [MbscRecurrenceRule](#type-MbscRecurrenceRule)* - Specifies a recurrence rule for handling recurring days.
 - `recurringException`: *string &#124; object &#124; Date &#124; Array&lt;string &#124; object &#124; Date&gt;* - Exception dates of the recurring rule.
Useful when specific dates need to be skipped from the rule.
 - `recurringExceptionRule`: *string &#124; [MbscRecurrenceRule](#type-MbscRecurrenceRule)* - Exception rule of the recurring rule.
Useful when recurring dates need to be skipped from the rule.
 - `start`: *string &#124; object &#124; Date* - Specifies the start date/time of a date/time range when this is applicable
 - `textColor`: *string* - A color applied on the text.
 - `title`: *string* - A title that will be displayed on the item.





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

[MbscDateType](#type-MbscDateType)

Maximum value that can be selected.

**Default value**: `undefined`
### maxHeight {#opt-maxHeight}

string &#124; number

Sets the maximum height of the component. If not specified, on larger screens (>=768px width) it defaults to 600px.

**Default value**: `undefined`
### maxRange {#opt-maxRange}

number

Sets the maximum range that can be selected. When selecting a date range without the time part, it sets the maximum number of days
the selected range can contain. When there is a time part in the selection, it sets the maximum range in milliseconds.

**Default value**: `undefined`
### maxTime {#opt-maxTime}

[MbscDateType](#type-MbscDateType)

It sets the maximum time that is selectable on the time or the timegrid [control](#opt-controls).

When there is a date part of the selection, the maximum is applied to each day. For example `maxTime: '18:00'`
will limit the time part of the selection to at most 18 o&#039;clock each day,
in contrast to the [max](#opt-max) option, which will limit the date part of the selection as well.
For example: `max: '2021-08-22T18:00` will limit the selection to August 22nd 18 o&#039;clock,
but will allow selection of times past 18 o&#039;clock on dates before August 22nd.

:::info
This option can&#039;t be used with the `'datetime'` [control](#opt-controls).
:::

**Default value**: `undefined`
### maxWheelWidth {#opt-maxWheelWidth}

number &#124; Array&lt;number&gt;

Maximum width of the scroller wheels in pixels.
If a number, it is applied to all wheels, if an array, it is applied to each wheel separately.

**Default value**: `undefined`
### maxWidth {#opt-maxWidth}

string &#124; number

Sets the maximum width of the component.

**Default value**: `undefined`
### min {#opt-min}

[MbscDateType](#type-MbscDateType)

Minimum value that can be selected.

**Default value**: `undefined`
### minRange {#opt-minRange}

number

Sets the minimum range that can be selected. When selecting a date range without the time part, it sets the minimum number of days
the selected range can contain. When there is a time part in the selection, it sets the minimum range in milliseconds.

**Default value**: `undefined`
### minTime {#opt-minTime}

[MbscDateType](#type-MbscDateType)

It sets the minimum time that is selectable on the time or the timegrid [control](#opt-controls).

When there is a date part of the selection, the minimum is applied to each day. For example `minTime: '08:00'`
will limit the time part of the selection to at least 8 o&#039;clock each day.
in contrast to the [min](#opt-min) option, which will limit the date part of the selection as well.
For example: `min: '2021-08-22T08:00` will limit the selection to August 22nd 8 o&#039;clock,
but will allow selection of times earlier than 8 o&#039;clock on dates after August 22nd.

:::info
This option can&#039;t be used with the `'datetime'` [control](#opt-controls).
:::

**Default value**: `undefined`
### minWheelWidth {#opt-minWheelWidth}

number &#124; Array&lt;number&gt;

Minimum width of the scroller wheels in pixels.
If a number, it is applied to all wheels, if an array, it is applied to each wheel separately.

**Default value**: `undefined`
### moment {#opt-moment}

any

Reference to the Moment.js library. Needed when using Moment objects as [return values](#opt-returnFormat).

**Default value**: `undefined`
### pages {#opt-pages}

number &#124; "auto"

Number of calendar pages (month or week) to display.
If `'auto'`, the displayed number of pages will be decided based on the viewport size.

**Default value**: `1`
### rangeEndInvalid {#opt-rangeEndInvalid}

boolean

When `true`, it enables the end date to be selected on the first invalid date that comes after the selected start date.

For example, When designing a booking system, a possible solution for already booked dates is to set those dates to invalid.
When considering check-in and check-out selections with the datepicker, in some cases it is desireable to be able to check out
on dates that already have a check-in. In this case, those dates would be disabled.
With this option it can be enabled, so the selection&#039;s end can be on the same day the first invalid is.

:::info
When the [inRangeInvalid](#opt-inRangeInvalid) option is set to `true` (default), this option is ignored, so make sure to turn
that off too if you want to use this one.
:::

**Default value**: `false`
### rangeHighlight {#opt-rangeHighlight}

boolean

When selecting a range on the calendar control, it is optional to highlight the dates between the start and end date.

By default, the dates are highlighted between the start and end values. When the highlight is turned off, only the start
and end dates are shown as selected on the calendar.

On desktop devices where a cursor is available, hovering the calendar days also help to visualize the selecting range.
The hover styling is also turned off, when the range is not highlighted.

**Default value**: `true`
### refDate {#opt-refDate}

[MbscDateType](#type-MbscDateType)

Specifies the reference date of the component, which represents when to start to calculate the view you want to display.

For example, if you want to display 2 months from the current month, you must specify the first day of the current month as
the reference date. Then you can use the [calendarSize](#opt-calendarSize) option to show 2 months.

**Default value**: `'1970/01/01'`
### responsive {#opt-responsive}

[MbscResponsiveOptions&lt;MbscDatepickerOptions&gt;](#type-MbscResponsiveOptions)

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
### returnFormat {#opt-returnFormat}

"locale" &#124; "jsdate" &#124; "iso8601" &#124; "moment"

Specifies the format in which the selected dates are returned.
- `'jsdate'` - JavaScript date object.
- `'iso8601'` - ISO 8601 date string.
- `'locale'` - Formatted date string based on the locale option,
or the [dateFormat](#localization-dateFormat) and [timeFormat](#localization-timeFormat) options, if they are specified.
- `'moment'` - Moment object.
Ensure that [moment.js](https://momentjs.com/) is loaded and passed through the [moment](#opt-moment) option.

:::info
When using a [timezone plugin](#opt-timezonePlugin),
the returned values are always in &#039;iso8601&#039; format and this option is not taken into account.
:::

**Default value**: `'jsdate'`
### rows {#opt-rows}

number

Number of visible rows on the wheel. The default value depends on the [theme](#opt-theme):
- iOS: 5
- Material: 3
- Windows: 6
### select {#opt-select}

"date" &#124; "range" &#124; "preset-range"

In terms of value selection, the Datepicker can be used to select a single date/time or multiple dates/times, as well as a date range
or a time range. It is also possible to select a week or a part of the week as a range.

The select option defines if the picker is used for selecting independent dates or a range.

Possible values are:
- `'date'` - Used for single or multiple date/time selection.
- `'range'` - Used for date range or time range selection.
- `'preset-range'` - Used for a week range selection.

**Default value**: `'date'`
### selectCounter {#opt-selectCounter}

boolean

If `true` and [multiple selection](#opt-selectMultiple) is enabled, the number of selected items will be displayed in the header.

**Default value**: `false`
### selectMax {#opt-selectMax}

number

The maximum number of selected items in case of [multiple selection](#opt-selectMultiple).

**Default value**: `undefined`
### selectMultiple {#opt-selectMultiple}

boolean

If `true`, multiple selection will be enabled.

**Default value**: `false`
### selectSize {#opt-selectSize}

number

Sets the length of the selection in days when [preset-range selection](#opt-select) is used.

The start of the selection can be set using the [firstSelectDay](#opt-firstSelectDay) option
and will have the specified length.

It defaults to a full week (7 days).

**Default value**: `7`
### separator {#opt-separator}

string

Separator between date and time in the formatted date string.

**Default value**: `' '`
### showArrow {#opt-showArrow}

boolean

Show or hide the popup arrow, when [display](#opt-display) is `'anchored'`.

**Default value**: `true`
### showInput {#opt-showInput}

boolean

If `true`, it will render an input field for the component.

**Default value**: `true`
### showOnClick {#opt-showOnClick}

boolean

Opens the component on element click/tap.

**Default value**: `true`
### showOnFocus {#opt-showOnFocus}

boolean

Opens the component on element focus.

**Default value**: `false on desktop, true on mobile`
### showOuterDays {#opt-showOuterDays}

boolean

Show or hide days from previous and next months.

:::info
Hiding outer days only works in case of month view, and not supported for week view.
:::

:::info
Outer days are automatically hidden if [calendarScroll](#opt-calendarScroll) is set to `'vertical'`.
:::

**Default value**: `true`
### showOverlay {#opt-showOverlay}

boolean

Show or hide the popup overlay.

**Default value**: `true`
### showRangeLabels {#opt-showRangeLabels}

boolean

Show or hide the range labels.

When [selecting a range](#opt-select), a start and end label is displayed on the picker.
These labels indicate which part of the range are we selecting (start or end).
The labels can also be used to switch the active selection from start to end or vice versa.

The [start label text](#localization-rangeStartLabel) and [end label text](#localization-rangeEndLabel) as well as the
[start value placeholder](#localization-rangeStartHelp) and the [end value placeholder](#localization-rangeEndHelp)
can be customized.

**Default value**: `true`
### showWeekNumbers {#opt-showWeekNumbers}

boolean

Show week numbers on the calendar view. Enumeration starts with the first week of the year.

**Default value**: `false`
### startIcon {#opt-startIcon}

string

Specifies the icon which will be displayed at the start of the input.
Use the [endIcon](#opt-endIcon) option for specifying an icon at the end.

**Default value**: `undefined`
### startInput {#opt-startInput}

any

Sets the input for the start date.

When using the Datepicker to [select a range](#opt-select), it can be used with one, two or no inputs.
When the `startInput` is specified, it will put the range start part of the selection to that input.
Similarly the input for the range end can be specified using the [endInput](#opt-endInput) option.

**Default value**: `undefined`
### stepHour {#opt-stepHour}

number

Step for the hours scroll wheel. Also, sets the hours step for the timegrid.

**Default value**: `1`
### stepMinute {#opt-stepMinute}

number

Step for the minutes scroll wheel. Also, sets the minutes step for the timegrid.

**Default value**: `1`
### stepSecond {#opt-stepSecond}

number

Step for the seconds scroll wheel. Also, sets the seconds step for the timegrid.

**Default value**: `1`
### tagInput {#opt-tagInput}

boolean

If `true` and used with [multiple selection](#opt-selectMultiple),
it will display the selected values inside the input as tags (chips).

**Default value**: `false`
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

"light" &#124; "dark" &#124; "auto"

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



### valid {#opt-valid}

Array&lt;[MbscDateType](#type-MbscDateType)&gt; &#124; Array&lt;IValidateProps&gt;

An array containing the valid values. Use it when it&#039;s more convenient to specify valid values instead of the invalid ones.
If specified, everything else is considered to be invalid, and the [invalid](#opt-invalid) option will be ignored.

Can contain dates, or objects with the following properties:
- `allDay`: *boolean* - Specifies whether the valid range is all day or not.
- `start`: *Date | string | object* - Start of the valid range.
- `end`: *Date, string | object* - End of the valid range.
- `recurring`: *string | object* - Recurrence rule for recurring valid ranges.
- `recurringException`: *string | object | Array&lt;string | object&gt;* - Exception dates of the recurring rule.
Useful when specific dates need to be skipped from the rule.
- `recurringExceptionRule`: *string | object* - Exception rule of the recurring rule.
Useful when recurring dates need to be skipped from the rule.

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
### wheelWidth {#opt-wheelWidth}

number &#124; Array&lt;number&gt;

Width of the scroller wheels, in pixels. Wheel content will be truncated, if it exceeds the width.
If a number, it is applied to all wheels, if an array, it is applied to each wheel separately.

**Default value**: `undefined`