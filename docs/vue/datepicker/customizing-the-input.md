---
sidebar_position: 10
sidebar_label: Customizing the input
displayed_sidebar: vueSidebar
title: Customizing the input
---

## Overview

The datepicker, as explained below, can be used with one, two or no inputs.

## Using without inputs

The first choice of input customization is to have no inputs at all. In this case rendering the component in [inline display](/vue/datepicker/display-modes) mode will leave out the use of inputs.

```html title="Inline picker"
<template>
  <MbscDatepicker
    display="inline"
    :controls="['calendar']"
    :touchUi="true"
  />
</template>
```

## Using with one input

The datepicker component will render a Mobiscroll Input by default. This input will hold the formatted value after selection.

Using a custom input can be done with the `inputComponent` [prop](/vue/datepicker/api#opt-inputComponent). In this case the datepicker will render the component provided and pass the formatted value to it.

To pass props to the custom component, you can use the `inputProps` [prop](/vue/datepicker/api#opt-inputProps).

```html title="Using with one input"
<script setup>
const isPickerOpen = ref(false)
function openPicker() {
  isPickerOpen.value = true
}
function handleClose() {
  isPickerOpen.value = false
}
</script>

<template>
  <MbscDatepicker
    inputComponent="input"
    :controls="['calendar']"
    :touchUi="true"
    :showOnClick="false"
    :showOnFocus="false"
    :isOpen="isPickerOpen"
    @close="handleClose"/>
  <MbscButton @click="openPicker">Show picker</MbscButton>
</template>
```

## Using with two inputs

When selecting a range, you have basically two values to display: the start of the range and the end of the range. These can be shown in different inputs using the [`startInput`](/vue/datepicker/api#opt-startInput) and the [`endInput`](/vue/datepicker/api#opt-endInput) options.

```html title="Two inputs for range selection"
<script setup>
const startInput = ref(null)
const endInput = ref(null)
</script>
<template>
  <MbscInput
    ref="startInput"
    label="Start"
    placeholder="Please Select..." />
  <MbscInput
    ref="endInput"
    label="End"
    placeholder="Please Select..." />
  <MbscDatepicker
    select="range"
    :startInput="startInput"
    :endInput="endInput" />
</template>
```

When the [`startInput`](/vue/datepicker/api#opt-startInput) and the [`endInput`](/vue/datepicker/api#opt-endInput) options are provided, the datepicker will not render any other inputs. It will open when these inputs are focused/clicked instead.