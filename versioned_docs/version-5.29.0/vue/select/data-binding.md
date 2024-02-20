---
sidebar_position: 2
sidebar_label: Data binding
displayed_sidebar: vueSidebar
---

import DataOptionContent from '../../_shared/select/data-option.mdx';
import GroupOptionContent from '../../_shared/select/group-options.mdx';

# Data binding

<DataOptionContent />

#### Example with numbers as values

```html title="Department selection example"
<script setup>
  import { ref } from 'vue';
  import { MbscSelect } from '@mobiscroll/vue';

  const myData = [
    { text: 'Marketing', value: 1 },
    { text: 'Sales', value: 2 },
    { text: 'Support', value: 3 },
    { text: 'Development', value: 4 },
  ];

  const selection = ref();
</script>

<template>
  <MbscSelect :data="myData" v-model="selection" />
</template>
```

#### Example with complex objects as values

```html title="User selection example"
<script setup>
  import { ref } from 'vue';
  import { MbscSelect } from '@mobiscroll/vue';

  const myData = [
    { text: 'Alice', value: { id: 123, fullName: 'Alice Cooper' }},
    { text: 'Brandon', value: { id: 456, fullName: 'Brandon Lee' }},
    { text: 'Louisa', value: { id: 789, fullName: 'Louisa Crawford'}},
  ];

  const selection = ref();
</script>

<template>
  <MbscSelect :data="myData" v-model="selection" />
</template>
```

## Group options {#grouping}

<GroupOptionContent />

```html
<template>
  <MbscSelect
    :data="myCountries"
    // highlight-next-line
    :showGroupWheel="true"
    v-model="selectedCountryAlpha2Code"
  />
</template>
```