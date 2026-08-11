---
sidebar_position: 8
sidebar_label: Templating
displayed_sidebar: vueSidebar
description: 'Customize Select option rendering in Mobiscroll Vue — render custom HTML per option, group headers, and footer content.'
---

# Templating

The selectable options (items) on the Select UI can be customized using the [`item`](./api#slot-item) slot and the [`itemHeight`](./api#opt-itemHeight) options.

The item data is accessible through the slot parameter `data` property.
```html
<template #item="args">
  <div>{{ args.data.text}}</div>
  <div>{{ args.data.value}}</div>
  <div>{{ args.data.yourCustomProperty}}</div>
</template>
```


```html title="Example for adding images to items"
<script setup>
  import { MbscSelect } from '@mobiscroll/select';
  import '@mobiscroll/vue/dist/css/mobiscroll.min.css';

  const countries = [{
        value: 'US',
        text: 'United States of America',
        flagUrl: '//urlto/usa-flag',
    }, {
        value: 'DE',
        text: 'Germany',
        flagUrl: '//urlto/german-flag',
    }, {
        value: 'FR',
        text: 'France',
        flagUrl: '//urlto/french-flag',
    }];
</script>

<template>
  <MbscSelect :data="countries">
    <template #item="i">
      <div class="my-country-container">
        <img :src="i.data.flagUrl" />
        {{data.text}}
      </div>;
    </template>
  </MbscSelect>
</template>
```


:::info
Every item on the Select must have the same height. For styles that go beyond the default height, the [`itemHeight`](./api#opt-itemHeight) option can be used to adjust the styling.
:::


