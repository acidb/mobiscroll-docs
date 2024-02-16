---
sidebar_position: 2
sidebar_label: Data binding
displayed_sidebar: vueSidebar
---

# Data binding

The Mobiscroll Select component has a [`data`](./api#opt-data) option (or data prop), that is used to define the selection options.

The `data` option receives an array of strings or an array of objects containing a `text`, a `value` and optionally a `group` property.

The text must be a string, which will show up on the wheels. The value can be any kind of object (string, number, object, etc.), that will be the selected value when selecting it on the select.

The group property must be a string, that is used to group together a number of options. The options that have the same string specified by the group property will be grouped together. When groups are specified in the data, a header will be shown at the top of each group with the text specified in the group property. Additionally, when using the [`showGroupWheel`](./api#opt-showGroupWheel) option, an additional wheel will be shown, with the groups to help navigation. More on that in the [Grouping section](#grouping) below.

When an array of string is passed to the data option, it is treated as both the `text` and the `value` would be the particular array item.

```javascript
const strArray = ['USA', 'Canada', 'Mexico'];
// is the same as:
const objArray = [{ text: 'USA', value: 'USA'}, { text: 'Canada', value: 'Canada'}, { text: 'Mexico', value: 'Mexico' }];
```

In the above example the two arrays will show the same 3 countries to select from, and the selected value will also be the country's name as string.

#### Example with numbers as values

```html title="Department selection example"
<script setup>
  import { ref } from 'vue';
  import { MbscSelect } from '@mobiscroll/vue';

  const myData = [
    { text: 'Marketing', value: 1 },
    { text: 'Sales', value: 2 },
    { text: 'Support', value: 3 },
    { text: 'Development', value: 4 },
  ];

  const selection = ref();
</script>

<template>
  <MbscSelect :data="myData" v-model="selection" />
</template>
```

#### Example with complex objects as values

```html title="User selection example"
<script setup>
  import { ref } from 'vue';
  import { MbscSelect } from '@mobiscroll/vue';

  const myData = [
    { text: 'Alice', value: { id: 123, fullName: 'Alice Cooper' }},
    { text: 'Brandon', value: { id: 456, fullName: 'Brandon Lee' }},
    { text: 'Louisa', value: { id: 789, fullName: 'Louisa Crawford'}},
  ];

  const selection = ref();
</script>

<template>
  <MbscSelect :data="myData" v-model="selection" />
</template>
```

## Group options {#grouping}

Through the [`data`](./api#opt-data) option, with each item can be passed an optional `group` property. This `group` property is a string, that defines the group of the item. When the group is passed to any of the items, the whole data is treated as grouped and a header will be rendered above each group on the Select wheels. The header will contain the group name as specified in the group property.

```javascript title="Assigning groups to items"
const myCountries = [{
    text: 'United Kingdom',
    value: 'GB',
}, {
    text: 'France',
    value: 'FR',
    group: 'Europe'
}, {
    text: 'Hungary',
    value: 'HU',
    group: 'Europe'
}, {
    text: 'United States of America',
    value: 'US',
    group: 'America'
}];
```

Furthermore an additional "group wheel" can be also rendered with the [`showGroupWheel`](./api#opt-showGroupWheel) option set to `true`. The group wheel items will be the group property values or the optgroup label attributes, and will help in navigating the option wheel.

```html
<template>
  <MbscSelect
    :data="myCountries"
    // highlight-next-line
    :showGroupWheel="true"
    v-model="selectedCountryAlpha2Code"
  />
</template>
```