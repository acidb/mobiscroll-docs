### allDay {#view-scheduler-allDay}

boolean

Show or hide the all day events.

**Default value**: `true`
### currentTimeIndicator {#view-scheduler-currentTimeIndicator}

boolean

Show or hide the current time indicator.
It defaults to `true` when the resolution is less than a day otherwise defaults to `false`.
### days {#view-scheduler-days}

boolean

Show or hide week days above the scheduler grid.

**Default value**: `true`
### endDay {#view-scheduler-endDay}

number

Specifies the last visible weekday of the view. Sunday is 0, Monday is 1, etc.
Days outside of the `startDay` and `endDay` range will not be visible.

**Default value**: `6`
### endTime {#view-scheduler-endTime}

string

Set the end time of scheduler column.
Hours and minutes can be specified in the same string, example: `'18:30'`.

**Default value**: `'24:00'`
### maxEventStack {#view-scheduler-maxEventStack}

number &#124; "auto" &#124; "all"

Limit the number of displayed events. When the number of overlapping events reaches the
specified value, a &quot;more&quot; button will be displayed which opens a popover showing the rest of the events.
  - If it is a `number`, it specifies how many events will be displayed before the &quot;more&quot; button appears.
  - If set to `'all'`, all events will be displayed.
  - If set to `'auto'`, the component will decide how many events can be placed inside the column,
based on the `minEventWidth` view option and the actual column width.

**Default value**: `'all'`
### minEventWidth {#view-scheduler-minEventWidth}

number

Specifies the minimum event width. Will be used when `maxEventStack: 'auto'` is used.
### size {#view-scheduler-size}

number

Specifies the number of displayed months, weeks or days.

**Default value**: `1`
### startDay {#view-scheduler-startDay}

number

Specifies the first visible weekday of the view. Sunday is 0, Monday is 1, etc.
Days outside of the `startDay` and `endDay` range will not be visible.
Should not be mistaken for the [firstDay](#localization-firstDay) option,
which sets the first day of the week, and, if not set, is defined by the [localization](#localization-locale).

**Default value**: `0`
### startTime {#view-scheduler-startTime}

string

Set the start time of scheduler column.
Hours and minutes can be specified in the same string, example: `'09:30'`.

**Default value**: `'00:00'`
### timeCellStep {#view-scheduler-timeCellStep}

number

Specifies the step of the grid cells in minutes.
Supported values: 1, 5, 10, 15, 20, 30, 60, 120, 180, 240, 360, 480, 720, 1440

**Default value**: `60`
### timeLabelStep {#view-scheduler-timeLabelStep}

number

Specifies the step of the time labels in minutes.
Supported values: 1, 5, 10, 15, 20, 30, 60, 120, 180, 240, 360, 480, 720, 1440.

**Default value**: `60`
### timezones {#view-scheduler-timezones}

Array&lt;string &#124; MbscSchedulerTimezone&gt;

Display times in multiple timezones on the time scale and time indicator.
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
### type {#view-scheduler-type}

"month" &#124; "day" &#124; "week"

Sets the scheduler type.

**Default value**: `'week'`