---
sidebar_label: Instance
displayed_sidebar: vueSidebar
---

# Instance

In object-oriented programming (OOP), an instance is a specific realization of a class. Similarly, in the scope
of the Mobiscroll library, a component instance is a realization of the component class.

The instantiation (the creation of objects from a class) in case of the mobiscroll components is done by the Vue framework,
and accessing the component instances are only needed in a few specific cases.

## Getting the instance

To get the instance of a component there is a special attribute called `ref`. The `ref` attribute is used to obtain a direct reference
to the DOM element it is placed on. In the [case of components](https://vuejs.org/guide/essentials/template-refs.html#ref-on-component), the `ref` attribute will return the vue component. The public methods that are meant to be callable for Mobiscroll components are under the `instance` property of the vue component.

:::info
Usually the public methods are on the vue component itself returned by the `ref` attribute. The `instance` property is specific to Mobiscroll components only all the methods listed in the documentation are accessible from there.
:::

```html title="Getting the instance of a Mobiscroll Eventcalendar"
<script setup>
  import { ref } from "vue";
  import { MbscEventcalendar } from "@mobiscroll/vue";

  const instRef = ref(null);

  function log() {
    // highlight-next-line
    const inst = instRef.value.instance;
    console.log('The eventcalendar instance:', inst);
  }
</script>

<template>
  <button @click="log">Log the instance</button>
  // highlight-next-line
  <MbscEventcalendar ref="instRef" />
</template>
```

