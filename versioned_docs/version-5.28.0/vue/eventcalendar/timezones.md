---
sidebar_position: 12
sidebar_label: Timezones
displayed_sidebar: vueSidebar
---

# Timezones

By default the Eventcalendar uses the local timezone of the browser to show event data. If you want to show the data or interpret it in a different timezone, you will need an external library to handle the timezone conversions. There are two libraries that Mobiscroll supports: **moment-timezone** and **luxon**.

When using a timezone plugin with the Eventcalendar, the [exclusiveEndDates](api#opt-exclusiveEndDates) options defaults to `true`. Learn more about [exclusive end dates](#exclusive-end-dates)!

## Library Install

To setup the library, first you have to install it on your page. In this guide we'll assume you are using npm to install packages, but you can consult the installation guide on the libraries official pages ([moment-timezone install page](https://momentjs.com/timezone), [luxon install page](https://moment.github.io/luxon)) for more options on how to install them.

### The Moment-Timezone library

To install the moment-timezone library with npm you will need to run the following commands:

```bash
npm install moment-timezone
```

After the library is installed, you will have to import it with the `momentTimezone` object from mobiscroll:

```ts
import moment from 'moment-timezone';
import { momentTimezone } from '@mobiscroll/vue';
```

Then set the mobiscroll's reference to the imported library:

```ts
momentTimezone.moment = moment;
```

After that, you can pass the momentTimezone object to the Eventcalendar's timezonePlugin option.

```html
<MbscEventcalendar :timezonePlugin="momentTimezone" />
```

### The Luxon library

To install the luxon library with npm you will need to run the following commands:

```bash
npm install luxon
```

In case you are using typescript you can also consider installing the types, because they come separately:

```bash
npm install --save-dev @types/luxon
```

After the library is installed, you will have to import it with the `luxonTimezone` object from mobiscroll:

```ts
import * as luxon from 'luxon';
import { luxonTimezone } from '@mobiscroll/react';
```

Then set the mobiscroll's reference to the imported library:

```ts
luxonTimezone.luxon = luxon;
```

After that, you can pass the luxonTimezone object to the Eventcalendar's timezonePlugin option.

```html
<MbscEventcalendar :timezonePlugin="luxonTimezone" />
```

## Using timezones

When working with timezones, you usually have your data stored in one timezone, and display it in a different timezone. A common scenario is storing the data in UTC, and displaying it in the user's local timezone. You can set this using the [`dataTimezone`](api#opt-dataTimezone) and [`displayTimezone`](api#opt-displayTimezone) options.

You can also store the timezone inside the event data, using the `timezone` property. If an event has the timezone specified, this will take precedence over the timezone set by `dataTimezone`. This is particularly useful for recurring events. Storing recurring events in UTC is not useful in most of the cases, since the occurrences will be generated in UTC time, which does not have daylight saving times. When converted to a displayTimezone which uses DST, the event times will be shifted with an hour when DST changes. Storing the timezone on the event makes it unambiguous, and will be correctly converted to `displayTimezone`.

```html title="Example"
<script setup>
  import { ref } from "vue";
  import { MbscEventcalendar, momentTimezone } from "@mobiscroll/vue";
  // highlight-next-line
  import moment from 'moment-timezone';

  // setup the reference to moment
  // highlight-next-line
  momentTimezone.moment = moment;

  const myEvents = ref([]);

  const myView = {
    schedule: { type: "week" },
  };
</script>

<template>
  <MbscEventcalendar
    :data="myEvents"
    // highlight-start
    :timezonePlugin="momentTimezone"
    dataTimezone="utc"
    displayTimezone="Europe/Berlin"
    // highlight-end
  />
</template>
```

## Exclusive end dates

In version 5.7.0 we introduced support for exclusive end dates. This means that the last moment of a given range is not actually part of the range.

Many of existing calendaring solutions (e.g. Google Calendar) and standards (e.g. [iCalendar](https://icalendar.org/)) are working with exclusive end dates, so this makes interoperabiliy with our Eventcalendar UI simpler.

With the introduction of timezone support, this also became a necessity, e.g. if you have an event with start: `'2021-07-09T20:00Z'` and end: `'2021-07-09T21:00Z'`, defined in UTC, when displayed in Europe/Bucharest timezone, the end becomes '2021-07-10T00:00+03:00'. With inclusive end dates the event will show up on 10th of July as well, which is unexpected.

The exclusive end dates mode can be enabled using the [exclusiveEndDates](api#opt-exclusiveEndDates) option. When timezones are used ([displayTimezone](api#opt-displayTimezone) and/or [dataTimezone](api#opt-dataTimezone) is set), exclusive end dates are automatically enabled.


:::caution
Enabling exclusive end dates can cause breaking changes, especially with all-day events with no time specified.

With inclusive end dates an event with start: `'2021-07-09'` and end: `'2021-07-10'` will show as a two day event on the calendar view, expanded over 9th and 10th of July. With exclusive end dates the event will be a single day event, showing up only on 9th of July.
:::
