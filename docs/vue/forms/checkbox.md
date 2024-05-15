---
sidebar_label: Checkbox
displayed_sidebar: vueSidebar
---

import Options from '../\_auto-generated/checkbox/options.md';
import Events from '../\_auto-generated/checkbox/events.md';
import Localizations from '../\_auto-generated/checkbox/localizations.md';

# Checkbox

Checkboxes allow the selection of multiple options from a set. They appear as checked when activated.

## Usage

Use the [`label`](#opt-label) option to provide a label to the checkbox.
The checkbox can be positioned before or after the label using the [`position`](#opt-position) option.

```html
<script setup>
  import { MbscCheckbox } from '@mobiscroll/vue';
</script>

<template>
  <MbscCheckbox label="Checkbox" />
  <MbscCheckbox label="Checkbox at the start" position="start" />
  <MbscCheckbox label="Checkbox at the end" position="end" />
</template>
```

## Value binding

Use the [v-model](https://vuejs.org/api/built-in-directives.html#v-model) directive to create a two-way binding.

```html
<script setup>
  import { ref } from 'vue';
  import { MbscCheckbox } from '@mobiscroll/vue';

  const checked = ref(false);
</script>

<template>
  <MbscCheckbox v-model="checked" label="Checkbox" />
  Checked: {{ checked }}
</template>
```

<div className="option-list">

## Options
Explore the following API options that help you easily configure the Checkboxes.

<Options />

## Events
The Checkboxes ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

## Localization
The Checkboxes is fully localized. This covers date and time format, button copy, rtl and more.

<Localizations />

</div>
