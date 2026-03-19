---
sidebar_position: 9
sidebar_label: Setting the initial view
displayed_sidebar: reactSidebar
---

# Setting the initial view

By default the initial view of the calendar displays the current date. Depending on the view type, this might be the current day, week, month or year. For views, where time is also displayed, the view will be scrolled to the current time as well.

Changing the initial view to another date can be done either in a controlled or uncontrolled way.

## Controlled component

To set the initial date of the event calendar in a [controlled](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components) way (meaning that your component, which renders the calendar controls its selected date), use the [`selectedDate`](./api#opt-selectedDate) option to pass the date and the [`onSelectedDateChange`](./api#event-onSelectedDateChange) handler to update the state when the date is changed from the calendar, e.g. using the navigation arrows.

```jsx
import { Eventcalendar } from '@mobiscroll/react';

const App = () => {
  const [events, setEvents] = useState([/*...*/]);
  const [selectedDate, setSelectedDate] = useState(new Date(2020, 2, 18));

  const onSelectedDateChange = useCallback((args) => {
    setSelectedDate(args.date);
  }, []);

  return <>
    <Eventcalendar data={events} selectedDate={selectedDate} onSelectedDateChange={onSelectedDateChange} />
  </>;
}
```

## Uncontrolled component

To only set the inital selected date, without the need of tracking later changes to the selected date, you can use it in an [uncontrolled](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components) way (meaning that the calendar tracks the selected date in its own internal state) with the help of the [`defaultSelectedDate`](./api#opt-defaultSelectedDate) option.

```jsx
import { Eventcalendar } from '@mobiscroll/react';

const App = () => {
  const [events, setEvents] = useState([/*...*/]);

  const myDate = useMemo(() => new Date(2020, 2, 18), []);

  return <Eventcalendar data={events} defaultSelectedDate={myDate} />;
}
```

For views, where time is also displayed, the view will be scrolled to the specified time. If the time part is not explicitly specified, it defaults to the start of the day.

When multiple days, weeks, months or years are displayed, the position of the specified date on the view (first, second, third, etc. day/week/month/year) is determined by the [`refDate`](./api#opt-refDate) option.
