### columnWidth {#view-timeline-columnWidth}

MbscTimelineColumnWidth

Sets the width of grid columns in the timeline to one of the predefined column widths.
Possible values and their corresponding widths:
  - `xxsmall`: 1.5em
  - `xsmall`: 3em
  - `small`: 4.5em
  - `medium`: 6em
  - `large`: 7.5em
  - `xlarge`: 9em
  - `xxlarge`: 10.5em
  - `xxxlarge`: 12em;

When not defined, the column width will be set automatically based on the view type and size.

:::info
You can [customize the predefined column widths using CSS](./timeline#column-width) to fit your layout needs.
:::

**Default value**: `undefined`
### currentTimeIndicator {#view-timeline-currentTimeIndicator}

boolean

Show or hide the current time indicator.
Defaults to `true`, when the horizontal resolution is less than a day.
### endDay {#view-timeline-endDay}

number

Specifies the last visible weekday of the view. Sunday is 0, Monday is 1, etc.
Days outside of the `startDay` and `endDay` range will not be visible.

**Default value**: `6`
### endTime {#view-timeline-endTime}

string

Specifies the end time of scheduler column.
Hours and minutes can be specified in the same string, example: &#039;18:30&#039;.

**Default value**: `'24:00'`
### eventDisplay {#view-timeline-eventDisplay}

"fill" &#124; "exact"

Specifies how events are displayed.
  - If set to `'exact'`, events are displayed according to their start and end times.
  - If set to `'fill'`, events cover the entire cell.

**Default value**: `'exact'`
### eventHeight {#view-timeline-eventHeight}

"variable" &#124; "equal"

Specifies wether the height of the events is equal or variable.
:::info
[Learn more about variable event heights](https://mobiscroll.com/docs/eventcalendar/timeline#variable-event-height).
:::

**Default value**: `'equal'`
### ~~eventList~~ (deprecated) {#view-timeline-eventList}

boolean

DEPRECATED: Use the `eventDisplay` property instead.

If `true`, transforms the layout into a summary view.
The events are listed in the appropriate cell one after the other.

**Default value**: `false`
### hideEmptyRows {#view-timeline-hideEmptyRows}

boolean

Hide the empty rows.
:::info
Parent resources will always be displayed, even when empty.
:::

**Default value**: `false.`
### hideInvalidRows {#view-timeline-hideInvalidRows}

boolean

Hide the fully invalid rows.
:::info
Parent resources will always be displayed, even when fully invalid, unless `resolutionVertical: 'day'` is used.
:::

**Default value**: `false.`
### maxEventStack {#view-timeline-maxEventStack}

number &#124; "all"

Limit the number of displayed events. When the number of overlapping events reaches the
specified value, a &quot;more&quot; button will be displayed which opens a popover showing the rest of the events.
  - If it is a `number`, it specifies how many events will be displayed before the &quot;more&quot; button appears.
  - If set to `'all'`, all events will be displayed.

**Default value**: `'all'`
### resolutionHorizontal {#view-timeline-resolutionHorizontal}

"month" &#124; "day" &#124; "year" &#124; "week" &#124; "hour" &#124; "quarter"

Sets the horizontal resolution of the timeline.
In case of hourly resolution, the columns can be split to minutes (1, 5, 15, 20, 30) or merge to multiple
hours (2, 3, 4, 6, 8, 12) using the `timeCellStep` and `timeLabelStep` properties.

**Default value**: `'hour'`
### resolutionVertical {#view-timeline-resolutionVertical}

"day"

Sets the vertical time unit of the timeline to days.
When set to &#039;day&#039;, the days will be rendered on the vertical axis,
while the hours of the day will be displayed on the horizontal axis.

**Default value**: `undefined`
### resourceReorder {#view-timeline-resourceReorder}

boolean

Specifies whether the resource can be dragged and reordered.
A drag handle icon will appear in front of the resource name,
serving as the point of interaction to drag and reposition the resource.

**Default value**: `false`
### rowHeight {#view-timeline-rowHeight}

"variable" &#124; "equal"

Controls the height of the timeline rows.
By default rows will have variable height and will expand to accommodate the displayed events.
If it is set to `'equal'`, the rows will have equal heights.

**Default value**: `'variable'`
### size {#view-timeline-size}

number

Specifies the number of displayed years, months, weeks or days.

**Default value**: `1`
### startDay {#view-timeline-startDay}

number

Specifies the first visible weekday of the view. Sunday is 0, Monday is 1, etc.
Days outside of the `startDay` and `endDay` range will not be visible.
Should not be mistaken for the [firstDay](#localization-firstDay) option,
which sets the first day of the week, and, if not set, is defined by the [localization](#localization-locale).

**Default value**: `0`
### startTime {#view-timeline-startTime}

string

Specifies the start time of scheduler column.
Hours and minutes can be specified in the string, example: &#039;09:30&#039;.

**Default value**: `'00:00'`
### timeCellStep {#view-timeline-timeCellStep}

number

Specifies the step of the grid cells in minutes.
Supported values: 1, 5, 10, 15, 20, 30, 60, 120, 180, 240, 360, 480, 720, 1440

**Default value**: `60`
### timeLabelStep {#view-timeline-timeLabelStep}

number

Specifies the step of the time labels in minutes.
Supported values: 1, 5, 10, 15, 20, 30, 60, 120, 180, 240, 360, 480, 720, 1440.

**Default value**: `60`
### type {#view-timeline-type}

"month" &#124; "day" &#124; "year" &#124; "week"

Specifies the timeline type.

**Default value**: `'week'`
### virtualScroll {#view-timeline-virtualScroll}

boolean

Enable or disable virtual scroll.

**Default value**: `true`
### weekNumbers {#view-timeline-weekNumbers}

boolean

Show or hide week numbers.

**Default value**: `false`
### zoomLevels {#view-timeline-zoomLevels}

{ [key:string]: MbscTimelineZoomLevel }

Defines configuration options for multiple zoom levels for the timeline view.
Each zoom level can specify its own properties for displaying a custom layout.

Use the [zoomLevel](#opt-zoomLevel) option to select the current zoom level.

Available properties:
 - `size`
 - `resolutionHorizontal`
 - `resolutionVertical`
 - `columnWidth`
 - `currentTimeIndicator`
 - `endDay`
 - `endTime`
 - `eventList`
 - `startDay`
 - `startTime`
 - `timeCellStep`
 - `timeLabelStep`
 - `weekNumbers`
 - `type`

**Default value**: `undefined`