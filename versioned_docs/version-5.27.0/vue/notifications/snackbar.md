---
sidebar_label: Snackbar
displayed_sidebar: vueSidebar
---

import Options from '../\_auto-generated/snackbar/options.md';
import Events from '../\_auto-generated/snackbar/events.md';

# Snackbar

Snackbars provide brief feedback after an action through a message at the bottom of the screen.
A snackbar may contain an action, such as "Undo" or "Retry".
Snackbars don't lock the app's main interface and are automatically dismissed after a while.

## Usage

The following example displays a snackbar message on button click.

```html
<script setup>
  import { ref } from 'vue';
  import { MbscSnackbar, MbscButton } from '@mobiscroll/vue';

  const isSnackbarOpen = ref(false);

  const actionButton = {
    text: 'Retry',
    action: () => {
      console.log('Retrying...');
    },
  };
</script>

<template>
  <MbscSnackbar
    message="Connection timed out. Showing limited messages."
    :button="actionButton"
    :isOpen="isSnackbarOpen"
    @close="isSnackbarOpen = false"
  />
  <MbscButton @click="isSnackbarOpen = true">Snackbar</MbscButton>
</template>
```

<div className="option-list">

## Options

<Options />

## Events

<Events />

</div>
