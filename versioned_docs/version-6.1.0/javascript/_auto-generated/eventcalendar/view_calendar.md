### count {#view-calendar-count}

boolean

If `true`, it will display the number of events on the days with events.

**Default value**: `false`
### eventDisplay {#view-calendar-eventDisplay}

"fill" &#124; "exact"

Specifies how events are displayed.
  - If set to `'exact'`, events are displayed according to their start and end times.
  - If set to `'fill'`, events cover the entire day.

**Default value**: `'fill'`
### labels {#view-calendar-labels}

number &#124; boolean &#124; "all"

Enable displaying events as labels on calendar days.
  - If set to `true`, events will be displayed in the available space.
    If there are more events for a day, than the available space,
    a label with &quot;more&quot; text will be displayed, which opens a popover showing all the events for the given day.
    To fit more events on a day, set the calendar height to an appropriate value, using the [height](#opt-height) option.
  - If set to `'all'`, all the events will be displayed in the calendar cell and
    the row height will auto-expand based on the displayed events.
    The view will become scrollable if the rows overflow the available height.
  - Specify a number to set how many events will be displayed before the &quot;more&quot; button in a calendar cell.
    The row height will auto expand until the labels count reaches the given number and after that the &quot;x more&quot; button
    will be displayed.
    In the case when only one event should go in the &quot;more&quot; popup, that event will be displayed in the place of the &quot;x more&quot; button.

**Default value**: `true`
### outerDays {#view-calendar-outerDays}

boolean

Show or hide days from previous and next months. Hiding only works for type: &#039;month&#039;.

**Default value**: `false`
### popover {#view-calendar-popover}

boolean

Enable popover on days containing events. If not explicitly defined,
the popover will not show up if an agenda view is also displayed. If event labels are displayed,
the popover will only show up for days where the labels do not fit on the calendar, and a &quot;more&quot; label is present.

**Default value**: `undefined`
### popoverClass {#view-calendar-popoverClass}

string

A CSS class that&#039;s added to the popover element.
Can be used to customize the styling of the popover on a calendar basis.
### scroll {#view-calendar-scroll}

"horizontal" &#124; "vertical"

Specifies the direction of the calendar scroll. Can be &#039;horizontal&#039; or &#039;vertical&#039;

**Default value**: `'horizontal'`
### size {#view-calendar-size}

number

Specifies the number of displayed weeks/months.

**Default value**: `1`
### type {#view-calendar-type}

"month" &#124; "year" &#124; "week"

Specifies the calendar type

**Default value**: `'month'`
### weekNumbers {#view-calendar-weekNumbers}

boolean

Show or hide week numbers.

**Default value**: `false`