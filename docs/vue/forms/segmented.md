---
sidebar_label: Segmented
displayed_sidebar: vueSidebar
---

import Options from '../\_auto-generated/segmented/options.md';
import Events from '../\_auto-generated/segmented/events.md';
import Localizations from '../\_auto-generated/segmented/localizations.md';
import Types from '../\_auto-generated/segmented/types.md';

# Segmented

The Segmented component is a horizontal control made of multiple segments, each segment functioning as a button.

## Usage

In single selection mode the functionality is similar to the [radio buttons](./radio), where selecting one will deselect all others.

```html
<script setup>
  import { MbscSegmented, MbscSegmentedGroup } from '@mobiscroll/vue';
</script>

<template>
  <MbscSegmentedGroup>
    <MbscSegmented value="1">Option 1</MbscSegmented>
    <MbscSegmented value="2">Option 2</MbscSegmented>
    <MbscSegmented value="3">Option 3</MbscSegmented>
  </MbscSegmentedGroup>
</template>
```

In multiple selection mode segments can be selected and de-selected independently from each other.

```html
<script setup>
  import { MbscSegmented, MbscSegmentedGroup } from '@mobiscroll/vue';
</script>

<template>
  <MbscSegmentedGroup select="multiple">
    <MbscSegmented value="1">Option 1</MbscSegmented>
    <MbscSegmented value="2">Option 2</MbscSegmented>
    <MbscSegmented value="3">Option 3</MbscSegmented>
  </MbscSegmentedGroup>
</template>
```

## Value binding

Use the [v-model](https://vuejs.org/api/built-in-directives.html#v-model) directive to create a two-way binding.

```html
<script setup>
  import { ref } from 'vue';
  import { MbscSegmented, MbscSegmentedGroup } from '@mobiscroll/vue';

  const single = ref('1');
  const multiple = ref(['2']);
</script>

<template>
  <MbscSegmentedGroup v-model="single">
    <MbscSegmented value="1">Option 1</MbscSegmented>
    <MbscSegmented value="2">Option 2</MbscSegmented>
    <MbscSegmented value="3">Option 3</MbscSegmented>
  </MbscSegmentedGroup>
  Single segmented value: {{ single }}

  <MbscSegmentedGroup v-model="multiple" select="multiple">
    <MbscSegmented value="1">Option 1</MbscSegmented>
    <MbscSegmented value="2">Option 2</MbscSegmented>
    <MbscSegmented value="3">Option 3</MbscSegmented>
  </MbscSegmentedGroup>
  Multiple segmented value: {{ multiple }}
</template>
```

<div className="option-list">

## Options

<Options />

## Events

<Events />

## Localization

<Localizations />

## Types

<Types />

</div>
