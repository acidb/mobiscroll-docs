---
sidebar_position: 1
sidebar_label: Overview
displayed_sidebar: vueSidebar
---

# Select

The Mobiscroll Select component lets you pick a single or multiple values from a list of options.

## Initialization

The following example will create a select component with four options to choose from, each of them being a city.

```html title="Select with 4 option"
<script setup>
const myData = [
  { text: 'Atlanta', value: 'atl' },
  { text: 'Berlin', value: 'ber'},
  { text: 'Chicago', value: 'chi'},
  { text: 'London', value: 'lon'}
]
</script>

<template>
  <MbscSelect :data="myData" inputComponent="input" />
</template>
```