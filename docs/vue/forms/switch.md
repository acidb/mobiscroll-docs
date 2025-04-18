---
sidebar_position: 8
sidebar_label: Switch
displayed_sidebar: vueSidebar
---

import Options from '../\_auto-generated/switch/options.md';
import Events from '../\_auto-generated/switch/events.md';
import Localizations from '../\_auto-generated/switch/localizations.md';
import Types from '../\_auto-generated/switch/types.md';

# Switch

The Switch component is a two value control. It is like a physical toggle switch, it has an on and an off state that is represented as a boolean value.

## Usage

Use the [`label`](#opt-label) option to provide a label to the switch.
The switch can be positioned before or after the label using the [`position`](#opt-position) option.

```html
<script setup>
  import { MbscSwitch } from '@mobiscroll/vue';
</script>

<template>
  <MbscSwitch label="Switch" />
  <MbscSwitch label="Switch at the start" position="start" />
  <MbscSwitch label="Switch at the end" position="end" />
</template>
```

## Value binding

Use the [v-model](https://vuejs.org/api/built-in-directives.html#v-model) directive to create a two-way binding.

```html
<script setup>
  import { ref } from 'vue';
  import { MbscSwitch } from '@mobiscroll/vue';

  const checked = ref(false);
</script>

<template>
  <MbscSwitch v-model="checked" label="Switch" />
  On: {{ checked }}
</template>
```

<div className="option-list">

## Options
Explore the following API options that help you easily configure the Switch component.

<Options />

## Events
The Switch component ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

## Localization
The Switch component is fully localized. This covers date and time format, button copy, rtl and more.

<Localizations />

## Types

<Types />

</div>
