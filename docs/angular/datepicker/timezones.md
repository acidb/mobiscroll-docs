---
sidebar_position: 8
sidebar_label: Timezones
displayed_sidebar: angularSidebar
---

import LibraryInstall from '../../_shared/timezones/library_install.mdx';
import DayjsInstall from '../../_shared/timezones/dayjs_install.mdx';
import MomentInstall from '../../_shared/timezones/moment_install.mdx';
import LuxonInstall from '../../_shared/timezones/luxon_install.mdx';
import General from '../../_shared/datepicker/timezones_general.mdx';

# Timezones

<General />

## Library Install

<LibraryInstall />

### The Moment-Timezone library

<MomentInstall framework="angular" />

**4.** After that, you can pass the `momentTimezone` object to the Datepicker's [`timezonePlugin`](./api#opt-timezonePlugin) option.


```html
<mbsc-datepicker [timezonePlugin]="myPlugin" [dataTimezone]="myDataTz" [displayTimezone]="myDisplayTz"></mbsc-datepicker>
```

```ts
import { momentTimezone, MbscTimezonePlugin } from '@mobiscroll/angular';
import moment from 'moment-timezone';

momentTimezone.moment = moment;

@Component({...})
export class AppComponent {
  // highlight-next-line
  myPlugin: MbscTimezonePlugin = momentTimezone;
  myDataTz = 'utc';
  myDisplayTz = 'Europe/Berlin';
}
```

### The Luxon library

<LuxonInstall framework="angular" />

**4.** After that, you can pass the `luxonTimezone` object to the Datepicker's `timezonePlugin` option.

```html
<mbsc-datepicker [timezonePlugin]="myPlugin" [dataTimezone]="myDataTz" [displayTimezone]="myDisplayTz"></mbsc-datepicker>
```

```js
import { luxonTimezone, MbscTimezonePlugin } from '@mobiscroll/angular';
import * as luxon from 'luxon';
luxonTimezone.luxon = luxon;

@Component({...})
export class AppComponent {
  // highlight-next-line
  myPlugin: MbscTimezonePlugin = luxonTimezone;
  myDataTz = 'utc';
  myDisplayTz = 'Europe/Berlin';
}
```

### The Day.js library

<DayjsInstall framework="angular" />

**4.** After that, you can pass the `dayjsTimezone` object to the Datepicker's `timezonePlugin` option.

```html
<mbsc-datepicker [timezonePlugin]="myPlugin" [dataTimezone]="myDataTz" [displayTimezone]="myDisplayTz"></mbsc-datepicker>
```

```js
import { dayjsTimezone, MbscTimezonePlugin } from '@mobiscroll/javascript';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjsTimezone.dayjs = dayjs;

@Component({...})
export class AppComponent {
  // highlight-next-line
  myPlugin: MbscTimezonePlugin = dayjsTimezone;
  myDataTz = 'utc';
  myDisplayTz = 'Europe/Berlin';
}
```