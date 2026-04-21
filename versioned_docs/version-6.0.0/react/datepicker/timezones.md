---
sidebar_position: 8
sidebar_label: Timezones
displayed_sidebar: reactSidebar
description: 'Handle timezone-aware date and time selection in the Mobiscroll Datepicker for React using moment-timezone, Luxon, or the Intl API.'
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

<MomentInstall framework="react" />

**4.** After that, you can pass the `momentTimezone` object to the Datepicker's [`timezonePlugin`](./api#opt-timezonePlugin) option.

```jsx
import moment from 'moment-timezone';
import { Datepicker, momentTimezone } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

momentTimezone.moment = moment;

function App() {
  return <Datepicker
    // highlight-next-line
    timezonePlugin={momentTimezone}
    dataTimezone="utc"
    displayTimezone="Europe/Berlin"
  />
}
```

### The Luxon library

<LuxonInstall framework="react" />

**4.** After that, you can pass the `luxonTimezone` object to the Datepicker's `timezonePlugin` option.

```jsx
import * as luxon from 'luxon';
import { Datepicker, luxonTimezone } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

luxonTimezone.luxon = luxon;

function App() {
  return <Datepicker
    // highlight-next-line
    timezonePlugin={luxonTimezone}
    dataTimezone="utc"
    displayTimezone="Europe/Berlin"
  />
}
```

### The Day.js library

<DayjsInstall framework="react" />

**4.** After that, you can pass the `dayjsTimezone` object to the Datepicker's `timezonePlugin` option.

```jsx
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { Datepicker, dayjsTimezone } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjsTimezone.dayjs = dayjs;

function App() {
  return <Datepicker
    // highlight-next-line
    timezonePlugin={dayjsTimezone}
    dataTimezone="utc"
    displayTimezone="Europe/Berlin"
  />
}

```