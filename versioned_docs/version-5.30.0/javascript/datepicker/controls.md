---
sidebar_position: 4
sidebar_label: Controls
displayed_sidebar: javascriptSidebar
---

# Controls

The Datepicker component can render different kinds of controls on the screen. These controls are referred to as the **Calendar view**, the **Date scroller**, the **Time scroller**, the **Date & time scroller** and the **Timegrid**. Each of these controls are suitable in different scenarios, depending on the use-case.

For example, the Date scroller can be used for selecting a single date, as well as the Calendar view. But only the Calendar view can be used for [selecting multiple dates](./value-selection#multiple).

The [`controls`](./api#opt-controls) option specifies which control is rendered on the UI and it can use the following values:


* The **Calendar view** can be used for single or multiple date selection as well as date range selection. It is represented by the `'calendar'` string. It is the **default** of the controls option.
  ```js
  mobiscroll.datepicker('#myInput', {
    controls: ['calendar'],
  });
  ```

* The **Date scroller** can be used for single date selection or date range selection. It is represented by the `'date'` string.
  ```js
  mobiscroll.datepicker('#myInput', {
    controls: ['date'],
  });
  ```

* The **Time scroller** can be used for single time selection or time range selection. It can also be combined with other controls. It is represented by the `'time'` string.
  ```js
  mobiscroll.datepicker('#myInput', {
    controls: ['time'],
  });
  ```

* The **Date & Time scroller** can be used for single date & time selection as well as date & time range selection. It is represented by the `'datetime'` string.
  ```js
  mobiscroll.datepicker('#myInput', {
    controls: ['datetime'],
  });
  ```

* The **Timegrid** can be used for single time selection or time range selection. It can also be combined with the `'calendar'` or the `'date'` control. It is represented by the `'timegrid'` string.
  ```js
  mobiscroll.datepicker('#myInput', {
    controls: ['timegrid'],
  });
  ```

## Control combinations

Some controls can't be used in all situations. To have a better user experience, controls can be combined. The [`controls`](./api#opt-controls) option takes an array of strings, with the above predefined values.

The Time scroller and the Timegrid controls can be combined with either the Calendar view or the Date scroller for extending the selection precision.

```js title="Combining controls"
mobiscroll.datepicker('#myInput', {
  controls: ['calendar', 'timegrid'],
});
mobiscroll.datepicker('#myInput', {
  controls: ['calendar', 'time'],
});
mobiscroll.datepicker('#myInput', {
  controls: ['date', 'time'],
});
mobiscroll.datepicker('#myInput', {
  controls: ['date', 'timegrid'],
});
```