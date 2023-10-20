---
sidebar_position: 4
sidebar_label: Controls
displayed_sidebar: vueSidebar
---

# Controls

The datepicker component can render different kinds of controls on the screen. These controls are referred to as the **Calendar view**, the **Date picker**, the **Time picker**, the **Datetime picker** and the **Timegrid**. Each of these controls are suitable in different scenarios, depending on the use-case.

For example, the Date picker can be used for selecting a single date, as well as the Calendar view. But only the Calendar view can be used for [selecting multiple dates](./value-selection#multiple).

The [`controls`](./api#opt-controls) option specifies which control is rendered on the UI and it can use the following values:


* The **Calendar view** can be used for single or multiple date selection as well as date range selection. It is represented by the `'calendar'` string. It is the **default** of the controls option.
  ```html
  <MbscDatepicker :controls="['calendar']" />
  ```

* The **Date picker** can be used for single date selection or date range selection. It is represented by the `'date'` string.
  ```html
  <MbscDatepicker :controls="['date']" />
  ```

* The **Time picker** can be used for single time selection or time range selection. It can also be combined with other controls. It is represented by the `'time'` string.
  ```html
  <MbscDatepicker :controls="['time']" />
  ```

* The **Datetime picker** can be used for single date & time selection as well as date & time range selection. It is represented by the `'datetime'` string.
  ```html
  <MbscDatepicker :controls="['datetime']" />
  ```

* The **Timegrid** can be used for single time selection or time range selection. It can also be combined with the `'calendar'` or the `'date'` control. It is represented by the `'timegrid'` string.
  ```html
  <MbscDatepicker :controls="['timegrid']" />
  ```

## Control combinations

Some controls can't be used in all situations. To have a better user experience, controls can be combined. The [`controls`](./api#opt-controls) option takes an array of strings, with the above predefined values.

The Time picker and the Timegrid controls can be combined with either the Calendar view or the Date picker for extending the selection precision.

  ```html title="Combining controls"
  <MbscDatepicker :controls="['calendar', 'timegrid']" />
  <MbscDatepicker :controls="['calendar', 'time']" />
  <MbscDatepicker :controls="['date', 'time']" />
  <MbscDatepicker :controls="['date', 'timegrid']" />
  ```