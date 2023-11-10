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
to the DOM element it is placed on. In the case of [components](https://vuejs.org/guide/essentials/template-refs.html#ref-on-component), the `ref` attribute will return the vue component. The public methods that are callable for Mobiscroll components are accessible under a property called `instance`. The `instance` property is the only public property of the Mobiscroll Vue components and every component methods must be called through it.

:::info
Usually for vue components the public methods and properties are on the vue component itself, returned by the `ref` attribute. In the case of the Mobiscroll Vue components, this is **different**. The `instance` property is the only accessible property and all the methods must be accessed through it.
:::

```html title="Getting the instance of a Mobiscroll Eventcalendar"
<script setup>
  import { ref } from "vue";
  import { MbscEventcalendar } from "@mobiscroll/vue";

  const instRef = ref(null);

  function log() {
    // highlight-next-line
    const inst = instRef.value.instance;
    console.log('The Eventcalendar instance:', inst);
  }
</script>

<template>
  <button @click="log">Log the instance</button>
  // highlight-next-line
  <MbscEventcalendar ref="instRef" />
</template>
```

## Calling methods

:::caution
Calling the instance methods should be necessary only in a few selected cases. Almost every case can be solved with passing props to the component and using it's events rather than calling instance methods. Before implementing a solution, please take into consideration using props and events first.
:::

All the component methods are documented on each components API section. The methods can be called on the component instances through the `instance` property as described in the previous section.

#### Example: Getting invalid dates for a date range

One such a case when you might need to call an instance method would be to get the invalid data for a time period from the eventcalendar. Since the invalid data you pass to the Eventcalendar can contain recurring rules, you need a way to calculate the actual occurences. Luckily the Eventcalendar has a method that will return the actual occurences for a time period.

```javascript title="Invalid rule that repeats on specific days"
const invalidsArray = [
  {
    start: '2023-10-18',
    allDay: true,
    recurring: {
      repeat: 'weekly',
      weekDays: 'MO,FR,SA',
      interval: 1
    }
  }
]
```

To get the actual invalid days for the month of November, you can call the the [`getInvalids()`](../eventcalendar/api.md#getinvalids) method of the Eventcalendar instance.

```html title="The invalids array needs to be passed to the eventcalendar"
<MbscEventcalendar ref="instRef" :invalid="invalidsArray" />
```

```javascript
function getOccurences() {
  const occurences = instRef.value.instance.getInvalids('2023-11-01', '2023-12-01');
}
```

The result in this case will be an array of objects, each of them being an occurence of an invalid day in November.
