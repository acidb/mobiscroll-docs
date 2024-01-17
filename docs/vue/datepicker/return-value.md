---
sidebar_position: 3
sidebar_label: Return value
displayed_sidebar: vueSidebar
---

import Content from '../../_shared/datepicker/return_value.mdx';

# Return value

<Content />

```html title="Passing Moment.js to the Datepicker"
<script setup>
  import { MbscDatepicker } from '@mobiscroll/vue';
  import * as moment from 'moment';
</script>

<template>
  <MbscDatepicker
    :moment="moment"
    returnFormat="moment"
  />
</template>
```
