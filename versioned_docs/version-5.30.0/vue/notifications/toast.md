---
sidebar_label: Toast
displayed_sidebar: vueSidebar
---

import Options from '../\_auto-generated/toast/options.md';
import Events from '../\_auto-generated/toast/events.md';

# Toast

Toasts are simple text only notifications informing the user.
They should be primarly used to display messages not necessarily related to a user action, such as background synchronization or similar.
Toasts don't lock the app's main interface and are automatically dismissed after a while.

## Usage

The following example displays a toast message on button click.

```html
<script setup>
  import { ref } from 'vue';
  import { MbscToast, MbscButton } from '@mobiscroll/vue';

  const isToastOpen = ref(false);
</script>

<template>
  <MbscToast message="Message sent" :isOpen="isToastOpen" @close="isToastOpen = false" />
  <MbscButton @click="isToastOpen = true">Toast</MbscButton>
</template>
```

<div className="option-list">

## Options

<Options />

## Events

<Events />

</div>
