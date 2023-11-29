### renderCalendarHeader {#renderer-renderCalendarHeader}

() => any


Use this option to customize the header of the Datepicker. It takes a function that should return the desired markup. In the
returned markup, you can use custom html as well as the built in header components of the calendar.

Check out the customizing the header section for a more detailed description on built in components.

### renderDay {#renderer-renderDay}

(args: MbscCalendarDayData) => any


You can use the renderDay option to customize the day cells of the Datepicker. It takes a function that should return the desired
markup. The Datepicker will take care of the positioning, but everything else (like background color, hover effect, etc.) is left
to you.

If you are looking to customize only the content and don&#039;t want to bother with the styling of the event, you can use the
[renderDayContent](#renderer-renderDayContent) option.

The render function will receive an object as parameter. This data can be used to show day specific things on the Datepicker.

Parameters:
 - args - The object passed to the function has the following properties:
- date: Date object - The specific date as a Date object.
- selected: Boolean - True if the date is selected. (In case of calendar view)
- events: Array - The list of events of the day.


### renderDayContent {#renderer-renderDayContent}

(args: MbscCalendarDayData) => any


You can use the renderDayContent option to customize the day content of the Datepicker. It takes a function that should return the
desired markup. The Datepicker will take care of styling and you can focus on what you show beside the day number a.k.a the content.

If you are looking to fully customize the day (ex. add custom hover effects) you will need to use the
[renderDay](#renderer-renderDay) option. In that case you will only get the positioning done by the Datepicker and everything else
is up to you.

The render function will receive an object as parameter. This data can be used to show day specific things on the Datepicker.

Parameters:
 - args - The object passed to the template has the following properties:
- date: Date object - The specific date as a Date object.
- selected: Boolean - True if the date is selected.
- events: Array - The list of events of the day.

