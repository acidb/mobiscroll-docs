---
sidebar_position: 9
sidebar_label: Textarea
displayed_sidebar: vueSidebar
---

import Options from '../\_auto-generated/textarea/options.md';
import Events from '../\_auto-generated/textarea/events.md';
import Localizations from '../\_auto-generated/textarea/localizations.md';
import Types from '../\_auto-generated/textarea/types.md';

# Textarea

The Textarea component can be used for collecting information from the user in the form of multi-line text.

## Usage

Use the [`label`](#opt-label) option to provide a label to the textarea.

```html
<script setup>
  import { MbscTextarea } from '@mobiscroll/vue';
</script>

<template>
  <MbscTextarea label="Label" />
</template>
```

## Value binding

Use the [v-model](https://vuejs.org/api/built-in-directives.html#v-model) directive to create a two-way binding.

```html
<script setup>
  import { ref } from 'vue';
  import { MbscTextarea } from '@mobiscroll/vue';

  const value = ref('');
</script>

<template>
  <MbscTextarea v-model="value" label="Label" />
  Textarea value:
  <pre>{{ value }}</pre>
</template>
```

<div className="option-list">

## Options
Explore the following API options that help you easily configure the Textarea component.

<Options />

## Events
The Textarea component ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

## Localization
The Textarea component is fully localized. This covers date and time format, button copy, rtl and more.

<Localizations />

</div>
