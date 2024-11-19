---
sidebar_position: 4
sidebar_label: Controls
displayed_sidebar: reactSidebar
---

# Controls

The Datepicker component can render different kinds of controls on the screen. These controls are referred to as the **Calendar view**, the **Date scroller**, the **Time scroller**, the **Date & time scroller** and the **Timegrid**. Each of these controls are suitable in different scenarios, depending on the use-case.

For example, the Date scroller can be used for selecting a single date, as well as the Calendar view. But only the Calendar view can be used for [selecting multiple dates](./value-selection#multiple).

The [`controls`](./api#opt-controls) option specifies which control is rendered on the UI and it can use the following values:


* The **Calendar view** can be used for single or multiple date selection as well as date range selection. It is represented by the `'calendar'` string. It is the **default** of the controls option.
  ```jsx
  const MY_CALENDAR_CTRL = ['calendar'];

  function App() {
    return <Datepicker controls={MY_CALENDAR_CTRL} />
  }
  ```

* The **Date scroller** can be used for single date selection or date range selection. It is represented by the `'date'` string.
  ```jsx
  const MY_DATE_CTRL = ['date'];

  function App() {
    return <Datepicker controls={MY_DATE_CTRL} />
  }
  ```

* The **Time scroller** can be used for single time selection or time range selection. It can also be combined with other controls. It is represented by the `'time'` string.
  ```jsx
  const MY_TIME_CTRL = ['time'];

  function App() {
    return <Datepicker controls={MY_TIME_CTRL} />
  }
  ```

* The **Date & Time scroller** can be used for single date & time selection as well as date & time range selection. It is represented by the `'datetime'` string.
  ```jsx
  const MY_DATETIME_CTRL = ['datetime'];

  function App() {
    return <Datepicker controls={MY_DATETIME_CTRL} />
  }
  ```

* The **Timegrid** can be used for single time selection or time range selection. It can also be combined with the `'calendar'` or the `'date'` control. It is represented by the `'timegrid'` string.
  ```jsx
  const MY_TIMEGRID_CTRL = ['timegrid'];

  function App() {
    return <Datepicker controls={MY_TIMEGRID_CTRL} />
  }
  ```

## Control combinations

Some controls can't be used in all situations. To have a better user experience, controls can be combined. The [`controls`](./api#opt-controls) option takes an array of strings, with the above predefined values.

The Time scroller and the Timegrid controls can be combined with either the Calendar view or the Date scroller for extending the selection precision.

```jsx title="Combining controls"
const MY_CALENDAR_TIMEGRID = ['calendar', 'timegrid'];
const MY_CALENDAR_TIME = ['calendar', 'time'];
const MY_DATE_TIME = ['date', 'time'];
const MY_DATE_TIMEGRID = ['date', 'timegrid'];

// ...

<Datepicker controls={MY_CALENDAR_TIMEGRID} />
<Datepicker controls={MY_CALENDAR_TIME} />
<Datepicker controls={MY_DATE_TIME} />
<Datepicker controls={MY_DATE_TIMEGRID} />
```
