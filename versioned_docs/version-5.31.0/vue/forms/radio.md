---
sidebar_label: Radio button
displayed_sidebar: vueSidebar
---

import Options from '../\_auto-generated/radio/options.md';
import Events from '../\_auto-generated/radio/events.md';
import Localizations from '../\_auto-generated/radio/localizations.md';

# Radio button

Radio button component are used when the user needs to select one option from a set.

This UI component is best used when there is enough space, since all the options are visible at once.
If you need to save space, a better UI choice would be the [Dropdown](./dropdown) component,
which only displays the selected option and the others are only visible on selection.

## Usage

Use the [`label`](#opt-label) option to provide a label to the Radio button.

```html
<script setup>
  import { MbscRadio, MbscRadioGroup } from '@mobiscroll/vue';
</script>

<template>
  <MbscRadioGroup>
    <MbscRadio label="Option 1" value="1" />
    <MbscRadio label="Option 2" value="2" />
    <MbscRadio label="Option 3" value="3" />
  </MbscRadioGroup>
</template>
```

## Value binding

Use the [v-model](https://vuejs.org/api/built-in-directives.html#v-model) directive to create a two-way binding.

```html
<script setup>
  import { ref } from 'vue';
  import { MbscRadio, MbscRadioGroup } from '@mobiscroll/vue';

  const radio = ref('1');
</script>

<template>
  <MbscRadioGroup v-model="radio">
    <MbscRadio label="Option 1" value="1" />
    <MbscRadio label="Option 2" value="2" />
    <MbscRadio label="Option 3" value="3" />
  </MbscRadioGroup>
  Radio value: {{ radio }}
</template>
```

<div className="option-list">

## Options
Explore the following API options that help you easily configure the Radio button component.

<Options />

## Events
The Radio button component ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

## Localization
The Radio button component is fully localized. This covers date and time format, button copy, rtl and more.

<Localizations />

</div>
