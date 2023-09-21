### view {#view}

MbscEventcalendarView

Configures the event calendar view. Possible views:

`calendar`: Configures the calendar view. Properties:
- `type`: *&#039;week&#039; | &#039;month&#039; | &#039;year&#039;* (default `'month'`) - Sets the calendar type.
- `size`: *number* (default `1`) - Specifies the number of displayed weeks or months.
- `count`: *boolean* (default `false`) - If `true`, it will display the number of events on the days with events.
- `outerDays`: *boolean* (default `false`) - Show or hide days from previous and next months. Does not apply to week view.
- `labels`: *boolean | number | &#039;all&#039;* (default `true`) - Enable displaying events as labels on calendar days.
  - If set to `true`, events will be displayed in the available space.
  If there are more events for a day, than the available space,
  a label with &quot;more&quot; text will be displayed, which opens a popover showing all the events for the given day.
  To fit more events on a day, set the calendar height to an appropriate value, using the [height](#height) option.
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
- `startDay`: *number* (default `0`) - Set the first week day of the view: Friday is 5, Saturday is 6, etc.
- `endDay`: *number* (default `6`) - Set the last week day of the view: Sunday is 0, Monday is 1, etc.
- `startTime`: *string* (default `'00:00'`) - Set the start time of scheduler column.
  Hours and minutes can be specified in the same string, example: `'09:30'`.
- `endTime`: *string* (default `'24:00'`) - Set the end time of scheduler column.
  Hours and minutes can be specified in the same string, example: `'18:30'`.
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
- `startDay`: *number* (default `0`) - Set the first week day of the view: Friday is 5, Saturday is 6, etc.
- `endDay`: *number* (default `6`) - Set the last week day of the view: Sunday is 0, Monday is 1, etc.
- `startTime`: *string* (default `'00:00'`) - Set the start time of the timeline days.
  Hours and minutes can be specified in the same string, example: `'09:30'`.
- `endTime`: *string* (default `'24:00'`) - Set the end time of the timeline days.
  Hours and minutes can be specified in the same string, example: `'18:30'`.
- `timeCellStep`: *number* (default `60`) - Set the step of the grid cells in minutes.
  Supported values: 1, 5, 10, 15, 20, 30, 60, 120, 180, 240, 360, 480, 720, 1440.
- `timeLabelStep`: *number* (default `60`) - Set the step of the time labels in minutes.
  Supported values: 1, 5, 10, 15, 20, 30, 60, 120, 180, 240, 360, 480, 720, 1440.
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