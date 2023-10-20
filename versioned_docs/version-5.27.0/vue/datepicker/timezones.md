---
sidebar_position: 8
sidebar_label: Timezones
displayed_sidebar: vueSidebar
---

# Timezones

By default the Datepicker uses the local timezone of the browser for value selection. If you want to select a date-time in a different timezone, you will need an external library to handle the timezone conversions. There are two libraries that Mobiscroll supports: [moment-timezone](https://momentjs.com/timezone/) and [luxon](https://moment.github.io/luxon/).

:::info
When using a timezone plugin with the Datepicker, the returned values are always ISO 8601 date strings, no matter what [`returnFormat`](./api#opt-returnFormat) option is used.
:::

:::info
When using a timezone plugin with the Datepicker, the [`exclusiveEndDates`](./api#opt-exclusiveEndDates) options defaults to `true`. Learn more about [exclusive end dates](./exclusive-end-dates)!
:::

## Library Install

To setup the library, first you have to install it on your page. In this guide we'll assume you are using npm to install packages, but you can consult the installation guide on the libraries official pages ([moment-timezone install page](https://momentjs.com/timezone/), [luxon install page](https://moment.github.io/luxon/)) for more options on how to install them.

### The Moment-Timezone library

To install the moment-timezone library with npm you will need to run the following commands:

```bash
npm install moment-timezone
```

After the library is installed, you will have to import it with the `momentTimezone` object from mobiscroll:

```javascript title="Moment library import"
import moment from 'moment-timezone';
import { momentTimezone } from '@mobiscroll/react';
```

Then set the mobiscroll's reference to the imported library:

```javascript title="Moment library setup"
import moment from 'moment-timezone';
import { momentTimezone } from '@mobiscroll/react';
// highlight-next-line
momentTimezone.moment = moment;
```

After that, you can pass the `momentTimezone` object to the Datepicker's [`timezonePlugin`](./api#opt-timezonePlugin) option.

```html
<script setup>
  import { MbscDatepicker } from '@mobiscroll/vue';
  import moment from 'moment-timezone';
  import { momentTimezone } from '@mobiscroll/react';

  momentTimezone.moment = moment;
</script>

<template>
  <MbscDatepicker
    // highlight-next-line
    :timezonePlugin="momentTimezone"
    dataTimezone="utc"
    displayTimezone="Europe/Berlin"
  />
</template>
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

```javascript title="Luxon library import"
import * as luxon from 'luxon';
import { luxonTimezone } from '@mobiscroll/react';
```

Then set the mobiscroll's reference to the imported library:

```javascript title="Luxon library setup"
import * as luxon from 'luxon';
import { luxonTimezone } from '@mobiscroll/react';
// highlight-next-line
luxonTimezone.luxon = luxon;
```

After that, you can pass the luxonTimezone object to the Datepicker's timezonePlugin option.

```html
<script setup>
  import { MbscDatepicker } from '@mobiscroll/vue';
  import * as luxon from 'luxon';
  import { luxonTimezone } from '@mobiscroll/react';
  luxonTimezone.luxon = luxon;
</script>

<template>
  <MbscDatepicker
    // highlight-next-line
    :timezonePlugin="luxonTimezone"
    dataTimezone="utc"
    displayTimezone="Europe/Berlin"
  />
</template>
```