---
sidebar_position: 10
sidebar_label: Customizing the input
displayed_sidebar: vueSidebar
title: Customizing the input
---

By default the Mobsicroll Select component renders a Mobiscroll Input component. To customize this Input component, you can pass props to it using the `inputProps` [option](/vue/select/api#opt-inputProps). Or you can change the rendered component using the `inputComponent` [option](/vue/select/api#opt-inputComponent).

```html
<script setup>
  import { MbscSelect, MbscInput } from '@mobiscroll/vue';

  const inputPrs = {
    theme: "ios",
    label: "Select City",
    labelStyle: "stacked",
    inputStyle: "box",
    placeholder: "Click to select",
  };
</script>

<template>
  <MbscSelect
    :inputComponent="MbscInput"
    :inputProps="inputPrs"
  />
</template>
```