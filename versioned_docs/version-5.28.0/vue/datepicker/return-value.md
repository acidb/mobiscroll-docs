---
sidebar_position: 3
sidebar_label: Return value
displayed_sidebar: vueSidebar
---

# Return value

The default type of return values is the JavaScript Date object, but Mobiscroll supports more types than that. The Datepicker will choose the type depending on the [`returnFormat`](./api#opt-returnFormat) option.

:::caution
When using a timezone plugin, the Datepicker will return the selected values in **ISO8601** strings, regardless of the returnFormat option.
:::

Here's a list on supported formats and some hints on where are they really usefull:

- `'jsdate'` - JavaScript date object - For example if you need to manipulate programmatically the selected value further, the Date object is a good starting point, since it has most of the functions for date & time manipulation

- `'iso8601'` - ISO 8601 date string - For example if you need to send the selected value to a server, or need to serialize it, the ISO8601 string is the way to go.



- `'locale'` - Formatted date string based on the [`locale`](./api#localization-locale) option, or the [`dateFormat`](./api#localization-dateFormat) and [`timeFormat`](./api#localization-timeFormat) options, if they are specified. It gives the most flexible formatting options.

- `'moment'` - moment object - The [Moment.js](https://momentjs.com/) library helps in manipulating the date & time values. It has many functions the built in JavaScript Date object doesn't. It is very convenient when working a lot with dates.

When working with 'moment', you need to ensure that your project [includes the Moment.js library](https://momentjs.com/docs/#/use-it/) and also you will need to pass the moment libary reference to the Datepicker. Here's an example how:

```html title="Passing Moment.js to the Datepicker"
<script setup>
  import { MbscDatepicker } from '@mobiscroll/vue';
  import * as moment from 'moment';
</script>

<template>
  <MbscDatepicker
    :moment="moment"
    returnFormat="moment"
  />
</template>
```
