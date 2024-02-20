---
sidebar_label: Value Selection
displayed_sidebar: angularSidebar
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Value Selection

The Datepicker can be used for 4 major date and time selection tasks:

1. [Single value selection](#single) - a single date, a single time or a single date-time - use the [date & time](https://demo.mobiscroll.com/angular/datetime) or [calendar](https://demo.mobiscroll.com/angular/calendar)
2. [Multiple value selection](#multiple) - one or more dates - use the [calendar](https://demo.mobiscroll.com/angular/calendar)
3. [Range selection](#range) - a pair of start/end date, a pair of start/end time or a pair of start/end date-times - use the [range picker](https://demo.mobiscroll.com/angular/range)
4. [Preset range selection](#preset-range) - for selecting a week or a predefined part of the week as a start/end date pair

The [`select`](./api#opt-select) and [`selectMultiple`](./api#opt-selectMultiple) options control how the selection works. Also with the [`firstSelectDay`](./api#opt-firstSelectDay) and [`selectSize`](./api#opt-selectSize) options the selection can be tailored further, when using the `preset-range` selection.

## Single Value Selection {#single}

This is the default behavior, and it can also be initialized with the `select="date"` option. Depending on the [controls](./controls) option, the Datepicker will select either a single date or a single time or both (a single datetime).

```html
<mbsc-datepicker select="date" [(ngModel)]="myValue"></mbsc-datepicker>
<mbsc-datepicker [(ngModel)]="myValue"></mbsc-datepicker>
```

The `myValue` in the above example will hold the selected value.

:::info
The type of the selected value depends on the [`returnFormat`](./api#opt-returnFormat) option. Learn more about the [returned value](./return-value)!
:::

## Multiple Value Selection {#multiple}

The [`selectMultiple`](./api#opt-selectMultiple) option will enable the selection of multiple dates. It can be used with the calendar control only. The selected value in this case will be an array of dates instead of just a single date.

```html
<mbsc-datepicker [selectMultiple]="true" [(ngModel)]="myDates"></mbsc-datepicker>
```

## Range Selection {#range}

The Datepicker can be used to select a date or a time range. The range selection feature can be activated with the `select="range"` option. The selected value in this case will be an array of dates with two values: the start and the end.

```javascript title="Range value examples"
const dateRangeExample1 = ['2023-10-19', '2023-10-24'];
const dateRangeExample2 = [new Date(2023, 9, 19), new Date(2023, 9, 24)];

const timeRangeExample1 = ['10:00', '13:30'];
const timeRangeExample2 = [new Date(2023, 9, 19, 10, 0), new Date(2023, 9, 19, 13, 30)];
```

Depending on the [controls](./controls) passed to the datepicker, it will select a date range, a time range or a datetime range.
Both the start and end value of the returned array will respect the [`returnFormat`](./api#opt-returnFormat) option. Learn more on how to work with ISO strings or date objects in the [Return value](./return-value) section.

<Tabs label="Example for time range selection with ISO8601 strings">
<TabItem value="html" label="app.component.html">

```html
<mbsc-datepicker select="range" returnFormat="iso8601" [controls]="myTimeControl"></mbsc-datepicker>
```

</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { MbscDatepickerControl } from '@mobiscroll/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // highlight-next-line
  myTimeControl: Array<MbscDatepickerControl> = ['time'];
}
```

</TabItem>
</Tabs>

The returned value after the selection in the above example will be an array with two ISO8601 strings:
```javascript title="Example value"
['14:50', '20:45']
```

## Preset-Range Selection {#preset-range}

The Datepicker can be used to select a week or predefined part of the week. The preset-range selection feature can be activated with the `select="preset-range"` option. The selected value in this case will be an array of dates with two values just like with range selection: the start and the end of the range. The difference in this case is that you don't have to select the start and end values separately. You can click any day on the week and the start and end values will be calculated accordingly.

When the preset-range selection mode is on, the start date will be fixed to a specific day of the week (for example: Monday). This can be achieved with the [`firstSelectDay`](./api#opt-firstSelectDay) option, which defaults to the [`firstDay`](./api#localization-firstDay) of the week.

The length of the selection will be a set number of days (for example: 5 days) and can be controlled with the [`selectSize`](./api#opt-selectSize) option. By default it is set to 7 (will select the whole week), but can be reduced to even a single day.

```html title="Example for selecting a work week (Monday to Friday)"
<mbsc-datepicker
  select="preset-range"
  [firstSelectDay]="1"
  [selectSize]="5"
  [(ngModel)]="myWeek">
</mbsc-datepicer>
```
