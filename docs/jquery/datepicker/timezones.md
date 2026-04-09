---
sidebar_position: 8
sidebar_label: Timezones
displayed_sidebar: jquerySidebar
description: 'Handle timezone-aware date and time selection in the Mobiscroll Datepicker for jQuery using moment-timezone, Luxon, or the Intl API.'
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

<MomentInstall framework="jquery" />

**4.** After that, you can pass the `momentTimezone` object to the Datepicker's [`timezonePlugin`](./api#opt-timezonePlugin) option.

```js
import $ from 'jquery';
import moment from 'moment-timezone';
import { momentTimezone } from '@mobiscroll/jquery';
import '@mobiscroll/jquery/dist/css/mobiscroll.min.css';

momentTimezone.moment = moment;

$('#myInput').mobiscroll().datepicker({
  // highlight-next-line
  timezonePlugin: momentTimezone,
  dataTimezone: 'utc',
  displayTimezone: 'Europe/Berlin',
});
```

### The Luxon library

<LuxonInstall framework="jquery" />

**4.** After that, you can pass the `luxonTimezone` object to the Datepicker's `timezonePlugin` option.

```js
import $ from 'jquery';
import * as luxon from 'luxon';
import { luxonTimezone, momentTimezone } from '@mobiscroll/jquery';
import '@mobiscroll/jquery/dist/css/mobiscroll.min.css';

luxonTimezone.luxon = luxon;

$('#myInput').mobiscroll().datepicker({
  // highlight-next-line
  timezonePlugin: momentTimezone,
  dataTimezone: 'utc',
  displayTimezone: 'Europe/Berlin',
});
```

### The Day.js library

<DayjsInstall framework="jquery" />

**4.** After that, you can pass the `dayjsTimezone` object to the Datepicker's `timezonePlugin` option.

```js
import $ from 'jquery';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { dayjsTimezone } from '@mobiscroll/jquery';
import '@mobiscroll/jquery/dist/css/mobiscroll.min.css';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjsTimezone.dayjs = dayjs;

$('#myInput').mobiscroll().datepicker({
  // highlight-next-line
  timezonePlugin: dayjsTimezone,
  dataTimezone: 'utc',
  displayTimezone: 'Europe/Berlin',
});
```