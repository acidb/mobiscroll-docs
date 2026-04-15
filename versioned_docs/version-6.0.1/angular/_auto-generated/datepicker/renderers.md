### calendarHeaderTemplate {#template-calendarHeaderTemplate}

Template reference for custom calendar header rendering.
### dayContentTemplate {#template-dayContentTemplate}

Template reference for customizing the day cells of the Datepicker.

If you are looking to fully customize the day cell (ex. add custom hover effects) you will need to use the
[dayTemplate](#template-dayTemplate) option.

The following day specific details are available:
- `date`: _Date_ - The specific date as a Date object.
- `selected`: _boolean_ - True if the date is selected.
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events of the day.
### dayTemplate {#template-dayTemplate}

Template reference for customizing the day cells of the Datepicker.

If you are looking to customize only the day cell content, you can use the
[dayContentTemplate](#template-dayContentTemplate) option.

The following day specific details are available:
- `date`: _Date_ - The specific date as a Date object.
- `selected`: _boolean_ - True if the date is selected. (In case of calendar view)
- `events`: _Array&lt;MbscCalendarEvent&gt;_ - The list of events of the day.