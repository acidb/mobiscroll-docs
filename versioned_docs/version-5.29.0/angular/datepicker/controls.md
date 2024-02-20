---
sidebar_position: 4
sidebar_label: Controls
displayed_sidebar: angularSidebar
---

# Controls

The Datepicker component can render different kinds of controls on the screen. These controls are referred to as the **Calendar view**, the **Date scroller**, the **Time scroller**, the **Date & time scroller** and the **Timegrid**. Each of these controls are suitable in different scenarios, depending on the use-case.

For example, the Date scroller can be used for selecting a single date, as well as the Calendar view. But only the Calendar view can be used for [selecting multiple dates](./value-selection#multiple).

The [`controls`](./api#opt-controls) option specifies which control is rendered on the UI and it can use the following values:


* The **Calendar view** can be used for single or multiple date selection as well as date range selection. It is represented by the `'calendar'` string. It is the **default** of the controls option.
  ```ts
  // highlight-next-line
  import { MbscDatepickerControl } from '@mobiscroll/angular';

  @Component({...})
  export class AppComponent {
    // highlight-next-line
    myControl: MbscDatepickerControl[] = ['calendar'],
  }
  ```
  ```html
  <mbsc-datepicker [controls]="myControl"></mbsc-datepicker>
  ```

* The **Date scroller** can be used for single date selection or date range selection. It is represented by the `'date'` string.
  ```ts
  // highlight-next-line
  import { MbscDatepickerControl } from '@mobiscroll/angular';

  @Component({...})
  export class AppComponent {
    // highlight-next-line
    myControl: MbscDatepickerControl[] = ['date'],
  }
  ```
  ```html
  <mbsc-datepicker [controls]="myControl"></mbsc-datepicker>
  ```

* The **Time scroller** can be used for single time selection or time range selection. It can also be combined with other controls. It is represented by the `'time'` string.
  ```ts
  // highlight-next-line
  import { MbscDatepickerControl } from '@mobiscroll/angular';

  @Component({...})
  export class AppComponent {
    // highlight-next-line
    myControl: MbscDatepickerControl[] = ['time'],
  }
  ```
  ```html
  <mbsc-datepicker [controls]="myControl"></mbsc-datepicker>
  ```

* The **Date & Time scroller** can be used for single date & time selection as well as date & time range selection. It is represented by the `'datetime'` string.
  ```ts
  // highlight-next-line
  import { MbscDatepickerControl } from '@mobiscroll/angular';

  @Component({...})
  export class AppComponent {
    // highlight-next-line
    myControl: MbscDatepickerControl[] = ['datetime'],
  }
  ```
  ```html
  <mbsc-datepicker [controls]="myControl"></mbsc-datepicker>
  ```

* The **Timegrid** can be used for single time selection or time range selection. It can also be combined with the `'calendar'` or the `'date'` control. It is represented by the `'timegrid'` string.
  ```ts
  // highlight-next-line
  import { MbscDatepickerControl } from '@mobiscroll/angular';

  @Component({...})
  export class AppComponent {
    // highlight-next-line
    myControl: MbscDatepickerControl[] = ['timegrid'],
  }
  ```
  ```html
  <mbsc-datepicker [controls]="myControl"></mbsc-datepicker>
  ```

## Control combinations

Some controls can't be used in all situations. To have a better user experience, controls can be combined. The [`controls`](./api#opt-controls) option takes an array of strings, with the above predefined values.

The Time scroller and the Timegrid controls can be combined with either the Calendar view or the Date scroller for extending the selection precision.

```js title="Combining controls"
import { MbscDatepickerControl } from '@mobiscroll/angular';

@Component({...})
export class AppComponent {
  myControlCombo1: MbscDatepickerControl[] = ['calendar', 'timegrid'];
  myControlCombo2: MbscDatepickerControl[] = ['calendar', 'time'];
  myControlCombo3: MbscDatepickerControl[] = ['date', 'time'];
  myControlCombo4: MbscDatepickerControl[] = ['date', 'timegrid'];
}
```
