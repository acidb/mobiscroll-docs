---
sidebar_label: Snackbar
displayed_sidebar: vueSidebar
---

import Options from '../\_auto-generated/snackbar/options.md';
import Events from '../\_auto-generated/snackbar/events.md';

# Snackbar

Tge Snackbar component provide brief feedback after an action through a message at the bottom of the screen.
A Snackbar may contain an action, such as "Undo" or "Retry".
Snackbars don't lock the app's main interface and are automatically dismissed after a while.

## Usage

The following example displays a Snackbar message on button click.

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
Explore the following API options that help you easily configure the Snackbar component.

<Options />

## Events
The Snackbar component ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

</div>
