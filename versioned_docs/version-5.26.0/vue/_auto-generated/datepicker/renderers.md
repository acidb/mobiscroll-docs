### calendarHeader {#slot-calendarHeader}

```html
<template #calendarHeader>...</template>
```

Customize the header of the Datepicker.
You can use custom html as well as the built in header components of the calendar.

Check out the customizing the header section for a more detailed description on built in components.

### day {#slot-day}

```html
<template #day="args">...</template>
```

Customize the day cells of the Datepicker.
The Datepicker will take care of the positioning, but everything else (like background color, hover effect, etc.) is left
to you.

If you are looking to customize only the day cell content and don&#039;t want to bother with the styling of the event, you can use the
[dayContent](#slot-dayContent) option.

The following day specific details are available:

### dayContent {#slot-dayContent}

```html
<template #dayContent="args">...</template>
```

Customize the day cells content of the Datepicker.
The Datepicker will take care of styling and you can focus on what you show beside the day number a.k.a the content.

If you are looking to fully customize the day cell (ex. add custom hover effects) you will need to use the
[day](#slot-day) option. In that case you will only get the positioning done by the Datepicker and everything else
is up to you.

The following day specific details are available:
