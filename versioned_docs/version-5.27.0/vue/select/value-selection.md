---
sidebar_label: Value Selection
displayed_sidebar: vueSidebar
sidebar_position: 3
---

# Value Selection

The Mobiscroll Select component by default operates in single value selection mode. Multiselection can be enabled using the [`selectMultiple`](./api#opt-selectMultiple) option.

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