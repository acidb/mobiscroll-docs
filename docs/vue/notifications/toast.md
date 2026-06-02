---
sidebar_position: 5
sidebar_label: Toast
displayed_sidebar: vueSidebar
description: 'Show brief Toast notifications in Mobiscroll Vue — auto-dismiss success, warning, error, and info messages.'
---

import Options from '../\_auto-generated/toast/options.md';
import Events from '../\_auto-generated/toast/events.md';

# Toast

The Toast component is a simple text only notification informing the user.
They should be primarily used to display messages not necessarily related to a user action, such as background synchronization or similar.
The Toast component doesn't lock the app's main interface and is automatically dismissed after a while.

## Usage

The following example displays a toast message on button click.

```html
<script setup>
  import { ref } from 'vue';
  import { MbscToast, MbscButton } from '@mobiscroll/vue';
  import '@mobiscroll/vue/dist/css/mobiscroll.min.css';

  const isToastOpen = ref(false);
</script>

<template>
  <MbscToast message="Message sent" :isOpen="isToastOpen" @close="isToastOpen = false" />
  <MbscButton @click="isToastOpen = true">Toast</MbscButton>
</template>
```

## Custom content

For rich or formatted content, use the default slot instead of the `message` prop.

```html
<script setup>
  import { ref } from 'vue';
  import { MbscToast, MbscButton } from '@mobiscroll/vue';
  import '@mobiscroll/vue/dist/css/mobiscroll.min.css';

  const isToastOpen = ref(false);
</script>

<template>
  <MbscToast :isOpen="isToastOpen" @close="isToastOpen = false">
    Upload complete: <strong>3 files</strong> added
  </MbscToast>
  <MbscButton @click="isToastOpen = true">Toast</MbscButton>
</template>
```

<div className="option-list">

## Options
Explore the following API options that help you easily configure the Toast component.

<Options />

## Events
The Toast component ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

</div>
