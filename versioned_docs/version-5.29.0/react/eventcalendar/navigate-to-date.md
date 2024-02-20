---
sidebar_position: 10
sidebar_label: Navigation
displayed_sidebar: reactSidebar
---

# Navigating to a date and time

You can navigate to another view programatically any time, by changing the [`selectedDate`](./api#opt-selectedDate) option.

This will navigate the calendar to the view containing the specified date. For views, where time is also displayed, the view will be scrolled to the specified time. If the time part is not explicitly specified, it defaults to the start of the day.

When multiple days, weeks, months or years are displayed, the position of the specified date on the view (first, second, third, etc. day/week/month/year) is determined by the [`refDate`](./api#opt-refDate) option.

```jsx
import { Eventcalendar } from '@mobiscroll/react';

const App = () => {
  const [events, setEvents] = useState([/*...*/]);
  const [selectedDate, setSelectedDate] = useState(new Date(2020, 2, 18));

  const onSelectedDateChange = useCallback((args) => {
    setSelectedDate(args.date);
  }, []);

  const setDate = useCallback(() => {
    // Set a specific date
    setSelectedDate(new Date(2020, 3, 19));
  }, []);

  return <>
    <Eventcalendar data={events} selectedDate={selectedDate} onSelectedDateChange={onSelectedDateChange} />
    <button onClick={setDate}>Set date</button>
  </>;
}
```
