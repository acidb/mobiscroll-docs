---
sidebar_label: Stepper
displayed_sidebar: vueSidebar
---

import Options from '../\_auto-generated/stepper/options.md';
import Events from '../\_auto-generated/stepper/events.md';
import Localizations from '../\_auto-generated/stepper/localizations.md';
import Types from '../\_auto-generated/stepper/types.md';

# Stepper

The Stepper component lets the user adjust a value by increasing and decreasing it in small steps.
Steppers are used in situations where a user needs to adjust a value by a small amount.

## Usage

Use the [`label`](#opt-label) option to provide a label to the stepper.

```html
<script setup>
  import { MbscStepper } from '@mobiscroll/vue';
</script>

<template>
  <MbscStepper label="Label" />
</template>
```

## Value binding

Use the [v-model](https://vuejs.org/api/built-in-directives.html#v-model) directive to create a two-way binding.

```html
<script setup>
  import { ref } from 'vue';
  import { MbscStepper } from '@mobiscroll/vue';

  const value = ref(0);
</script>

<template>
  <MbscStepper v-model="value" label="Label" />
  Input value: {{ value }}
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
