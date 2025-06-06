---
sidebar_label: Value Selection
displayed_sidebar: vueSidebar
sidebar_position: 4
---

# Value Selection

The Select component can be used to select one or multiple values from a list. The values can be of any type, for example `number`, `string` or `object` as described in the [data binding](./data-binding) section.


## Single value selection

By default the Select operates in single value selection mode, but can be used to select multiple values from a list as well.

```html title="Selecting a single value"
<script setup>
  import { ref } from 'vue';
  import { MbscSelect } from '@mobiscroll/vue';

  const drinks = [
    { text: 'Mohito', value: 'mohito'},
    { text: 'Long Island', value: 'longisland'},
    { text: 'Margarita', value: 'margarita'}
  ];

  const selected = ref();
</script>

<template>
  <MbscSelect :data="drinks" v-model="selected" />
</template>
```

## Multiple value selection

Multiselection can be enabled using the [`selectMultiple`](./api#opt-selectMultiple) option.

```html title="Selecting multiple items from a list"
<script setup>
  import { ref } from 'vue';
  import { MbscSelect } from '@mobiscroll/vue';

  const bonuses = ['Free ticket', 'Free Drink', 'Free Hug'];

  const selected = ref();
</script>

<template>
  <MbscSelect :data="bonuses" v-model="selected" :selectMultiple="true" />
</template>
```