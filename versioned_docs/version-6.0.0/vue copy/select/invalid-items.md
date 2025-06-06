---
sidebar_position: 9
sidebar_label: Invalid items
displayed_sidebar: vueSidebar
title: Invalid items
---

Invalid items are items that cannot be selected. They appear disabled on the wheels and when clicked, a selection will not happen.

Invalid items can be set using the `invalid` [option](/vue/select/api#opt-invalid) or the `data` [option](/vue/select/api#opt-data). The `invalid` [option](/vue/select/api#opt-invalid) takes an array of values and disables those values. When using the `data` [option](/vue/select/api#opt-data), each item can take a disables property, that `disables` that item.

```html title="Invalid example"
<script setup>
const myData = [
  { text: 'Atlanta', value: 'atl' },
  { text: 'Berlin', value: 'ber' },
  { text: 'Boston', value: 'bos' },
  { text: 'Chicago', value: 'chi', disabled: true },
  { text: 'London', value: 'lon', disabled: true },
  { text: 'Los Angeles', value: 'la' },
  { text: 'New York', value: 'ny' },
  { text: 'Paris', value: 'par' },
  { text: 'San Francisco', value: 'sf' }
];

const myInvalid = ['par', 'ny'];
</script>

<template>
  <MbscSelect :data="myData" :invalid="myInvalid" />
</template>
```