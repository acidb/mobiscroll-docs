### view {#view}

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