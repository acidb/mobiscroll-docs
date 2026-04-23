---
sidebar_label: Alert
displayed_sidebar: vueSidebar
---

import Options from '../\_auto-generated/alert/options.md';
import Events from '../\_auto-generated/alert/events.md';
import Localizations from '../\_auto-generated/alert/localizations.md';

# Alert

An alert dialog notifies or warns the user about something. It displays a single button which closes the alert.

## Usage

The following example displays an alert message on button click.

```html
<script setup>
  import { ref } from 'vue';
  import { MbscAlert, MbscButton } from '@mobiscroll/vue';

  const isAlertOpen = ref(false);
</script>

<template>
  <MbscAlert
    title="Cellular Data is Turned Off for 'Safari'"
    message="You can turn on cellular data for this app in Settings."
    :isOpen="isAlertOpen"
    @close="isAlertOpen = false"
  />
  <MbscButton @click="isAlertOpen = true">Alert</MbscButton>
</template>
```

<div className="option-list">

## Options

<Options />

## Localization

<Localizations />

## Events

<Events />

</div>
