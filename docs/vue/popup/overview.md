---
sidebar_position: 1
sidebar_label: Overview
displayed_sidebar: vueSidebar
---

# Popup

The popup provides a frame for all your pop-over needs, able to render custom content, forms or combined views.

Use it for contextual pop-ups, data-entry or to inform users in a consistent way with all other Mobiscroll component.

## Initialization

The following example will create a popup with som static content:

```html title="Popup with content"
<script setup>
import { ref } from 'vue';
import { MbscPopup } from '@mobiscroll/vue';

const isPopupOpen = ref(true)
</script>

<template>
  <MbscPopup :isOpen="isPopupOpen">
    <div>
      <h3>Hi</h3>
      <p>Are you feeling good today?</p>
    </div>
  </MbscPopup>
</template>
```
