---
sidebar_position: 8
sidebar_label: Timezones
displayed_sidebar: reactSidebar
---

import LibraryInstall from '../../_shared/timezones/library_install.mdx';
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
import { Datepicker, momentTimezone } from '@mobiscroll/react';
import moment from 'moment-timezone';

momentTimezone.moment = moment;

function App() {
  return <>
    <Datepicker
      // highlight-next-line
      timezonePlugin={momentTimezone}
      dataTimezone="utc"
      displayTimezone="Europe/Berlin" />
  </>
}
```

### The Luxon library

<LuxonInstall framework="react" />

**4.** After that, you can pass the `luxonTimezone` object to the Datepicker's `timezonePlugin` option.

```jsx
import { Datepicker, luxonTimezone } from '@mobiscroll/react';
import * as luxon from 'luxon';
luxonTimezone.luxon = luxon;

function App() {
  return <>
    <Datepicker
      // highlight-next-line
      timezonePlugin={luxonTimezone}
      dataTimezone="utc"
      displayTimezone="Europe/Berlin" />
  </>
}
```