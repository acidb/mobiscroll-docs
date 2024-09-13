---
sidebar_label: Dropdown
displayed_sidebar: vueSidebar
---

import Options from '../\_auto-generated/dropdown/options.md';
import Events from '../\_auto-generated/dropdown/events.md';
import Localizations from '../\_auto-generated/dropdown/localizations.md';

# Dropdown

The Dropdown component can be used for collecting user provided information from a set of options.

## Usage

Use the [`label`](#opt-label) option to provide a label to the dropdown.

```html
<script setup>
  import { MbscDropdown } from '@mobiscroll/vue';
</script>

<template>
  <MbscDropdown label="Label">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
    <option value="4">Option 4</option>
  </MbscDropdown>
</template>
```

## Value binding

Use the [v-model](https://vuejs.org/api/built-in-directives.html#v-model) directive to create a two-way binding.

```html
<script setup>
  import { ref } from 'vue';
  import { MbscDropdown } from '@mobiscroll/vue';

  const value = ref(3);
</script>

<template>
  <MbscDropdown v-model="value" label="Label">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
    <option value="4">Option 4</option>
  </MbscDropdown>
  Selected value: {{ value }}
</template>
```

<div className="option-list">

## Options
Explore the following API options that help you easily configure the Dropdown component.

<Options />

## Events
The Dropdown component ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

## Localization
The Dropdown component is fully localized. This covers date and time format, button copy, rtl and more.

<Localizations />

</div>
