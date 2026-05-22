### scrollable {#view-agenda-scrollable}

boolean

When set to `true`, makes the event listing independently scrollable.

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
### showEmptyDays {#view-agenda-showEmptyDays}

boolean

Display the day headers for every day in the list, even for those without events.

**Default value**: `false`
### size {#view-agenda-size}

number

Specifies the number of years, months, weeks or days included in the list (depending on the specified type).

**Default value**: `1`
### type {#view-agenda-type}

"month" &#124; "day" &#124; "year" &#124; "week"

Sets the agenda type.
If calendar is also displayed, only `'month'`, `'week'` and `'day'` values are supported.
In case of month and week, the type and size should match the calendar type and size.
In case of day type events on the selected calendar day will be displayed, so size will always be `1`.

**Default value**: `'month'`