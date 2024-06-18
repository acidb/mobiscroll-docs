---
sidebar_position: 12
sidebar_label: Timezones
displayed_sidebar: reactSidebar
title: Timezones
---

import LibraryInstall from '../../_shared/timezones/library_install.mdx';
import MomentInstall from '../../_shared/timezones/moment_install.mdx';
import LuxonInstall from '../../_shared/timezones/luxon_install.mdx';
import ExclusiveEndDatesContent from '../../_shared/eventcalendar/exclusive-ends.mdx';

## Overview

By default the Eventcalendar uses the local timezone of the browser to show event data. If you want to show the data or interpret it in a different timezone, you will need an external library to handle the timezone conversions. There are two libraries that Mobiscroll supports: **moment-timezone** and **luxon**.

When using a timezone plugin with the Eventcalendar, the [`exclusiveEndDates`](api#opt-exclusiveEndDates) option defaults to `true`. Learn more about [exclusive end dates](#exclusive-end-dates)!

## Library Install

<LibraryInstall />

### The Moment-Timezone library

<MomentInstall framework="react" />

**4.** After that, you can pass the `momentTimezone` object to the Eventcalendar's [`timezonePlugin`](./api#opt-timezonePlugin) option.

```jsx
import { Eventcalendar, momentTimezone } from '@mobiscroll/react';
import moment from 'moment-timezone';

momentTimezone.moment = moment;

function App() {
  return <Eventcalendar
    // highlight-next-line
    timezonePlugin={momentTimezone}
    dataTimezone="utc"
    displayTimezone="Europe/Berlin"
  />
}
```

### The Luxon library

<LuxonInstall framework="react" />

**4.** After that, you can pass the `luxonTimezone` object to the Eventcalendar's `timezonePlugin` option.

```jsx
import { Eventcalendar, luxonTimezone } from '@mobiscroll/react';
import * as luxon from 'luxon';

luxonTimezone.luxon = luxon;

function App() {
  return <Eventcalendar
    // highlight-next-line
    timezonePlugin={luxonTimezone}
    dataTimezone="utc"
    displayTimezone="Europe/Berlin"
  />
}
```


## Using timezones

When working with timezones, you usually have your data stored in one timezone, and display it in a different timezone. A common scenario is storing the data in UTC, and displaying it in the user's local timezone. You can set this using the [`dataTimezone`](api#opt-dataTimezone) and [`displayTimezone`](api#opt-displayTimezone) options.

You can also store the timezone inside the event data, using the `timezone` property. If an event has the timezone specified, this will take precedence over the timezone set by `dataTimezone`. This is particularly useful for recurring events. Storing recurring events in UTC is not useful in most of the cases, since the occurrences will be generated in UTC time, which does not have daylight saving times. When converted to a displayTimezone which uses DST, the event times will be shifted with an hour when DST changes. Storing the timezone on the event makes it unambiguous, and will be correctly converted to `displayTimezone`.

```jsx title="Example"
import { useState } from "react";
import { Eventcalendar, momentTimezone } from "@mobiscroll/react";
// highlight-next-line
import moment from 'moment-timezone';

// setup the reference to moment
// highlight-next-line
momentTimezone.moment = moment;

function App() {
  const [myEvents] = useState([]);

  return <Eventcalendar
    data={myEvents}
    // highlight-start
    timezonePlugin={momentTimezone}
    dataTimezone="utc"
    displayTimezone="Europe/Berlin"
    // highlight-end
  />
}
```

:::info Note
The `allDay` events by definition are tied to a day, and they don't respect timezones intentionally. 

For example: you can think of them as an event that happens on a specific day, like a birthday. If you have your birthday on the 5th of October, that means in every timezone on the 5th of October you can party! 
:::

## Exclusive end dates

<ExclusiveEndDatesContent />