---
sidebar_label: Confirm
displayed_sidebar: vueSidebar
---

import Options from '../\_auto-generated/confirm/options.md';
import Events from '../\_auto-generated/confirm/events.md';
import Localizations from '../\_auto-generated/confirm/localizations.md';

# Confirm

A confirm dialog is used when it is required to confirm an action.
It has two buttons, one of which confirms the action, and the other one rejects it.

## Usage

The following example displays a confirm dialog on button click.

```html
<script setup>
  import { ref } from 'vue';
  import { MbscConfirm, MbscButton } from '@mobiscroll/vue';

  const isConfirmOpen = ref(false);

  const handleClose = (result) => {
    console.log('Result:', result);
    isConfirmOpen.value = false;
  };
</script>

<template>
  <MbscConfirm
    title="Use location service?"
    message="Help apps determine location. This means sending anonymous location data, even when no apps are running."
    okText="Agree"
    cancelText="Disagree"
    :isOpen="isConfirmOpen"
    @close="handleClose"
  />
  <MbscButton @click="isConfirmOpen = true">Confirm</MbscButton>
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
