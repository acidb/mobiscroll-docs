---
sidebar_position: 4
sidebar_label: Input
displayed_sidebar: vueSidebar
---

import Options from '../\_auto-generated/input/options.md';
import Events from '../\_auto-generated/input/events.md';
import Localizations from '../\_auto-generated/input/localizations.md';
import Types from '../\_auto-generated/input/types.md';

# Input

The Input component can be used for collecting information from the user.

## Usage

Use the [`label`](#opt-label) option to provide a label to the input field.

```html
<script setup>
  import { MbscInput } from '@mobiscroll/vue';
</script>

<template>
  <MbscInput label="Label" />
</template>
```

## Value binding

Use the [v-model](https://vuejs.org/api/built-in-directives.html#v-model) directive to create a two-way binding.

```html
<script setup>
  import { ref } from 'vue';
  import { MbscInput } from '@mobiscroll/vue';

  const value = ref('');
</script>

<template>
  <MbscInput v-model="value" label="Label" />
  Input value: {{ value }}
</template>
```

<div className="option-list">

## Options
Explore the following API options that help you easily configure the Input component.

<Options />

## Events
The Input component ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

## Localization
The Input component is fully localized. This covers date and time format, button copy, rtl and more.

<Localizations />

</div>
