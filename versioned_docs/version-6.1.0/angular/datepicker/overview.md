---
sidebar_position: 1
sidebar_label: Overview
displayed_sidebar: angularSidebar
description: 'Mobiscroll Datepicker for Angular — pick single dates, times, multiple dates, or date ranges with calendar and scroller controls.'
---

# Date & Time picker

The Datepicker component is the ultimate tool for selecting a [single date](https://demo.mobiscroll.com/calendar) and/[or time](https://demo.mobiscroll.com/datetime), [multiple dates](https://demo.mobiscroll.com/calendar/multiple-select#) or a [date range](https://demo.mobiscroll.com/range).

## Usage

The following example will create a Datepicker with default options.

```html
<mbsc-datepicker></mbsc-datepicker>
```

```ts
import { Component } from '@angular/core';
import { MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [MbscModule],
})
export class AppComponent {}
```

For many more examples - simple and complex use-cases - check out the [date & time picker demos](https://demo.mobiscroll.com/calendar).