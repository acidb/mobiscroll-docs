---
sidebar_position: 1
sidebar_label: Overview
displayed_sidebar: vueSidebar
---

# Select

The Select component lets you pick a single value or multiple values from a list of options.

## Initialization

The following example will create a select component with four options to choose from, each of them being a city.

```html
<script setup>
  const myData = [
    { text: 'Atlanta', value: 1 },
    { text: 'Berlin', value: 2 },
    { text: 'Chicago', value: 3 },
    { text: 'London', value: 4 },
  ];
</script>

<template>
  <MbscSelect :data="myData" />
</template>
```
