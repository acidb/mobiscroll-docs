---
sidebar_position: 1
sidebar_label: Getting started with trial
displayed_sidebar: vueSidebar
---

import CliInstall from '../\_shared/cliinstall.mdx';

# Getting started with trial

### Install the Mobiscroll CLI and configure the app

<CliInstall />

### Run the mobiscroll config command

Run `mobiscroll config vue` in the root folder of you app in a terminal window.

```
mobiscroll config vue
```

:::tip
If you're working from behind a proxy, additional configuration might be needed. Please check the [proxy configuration options](https://docs.mobiscroll.com/cli#proxy) in the documentation.
:::

:::tip
The package will be installed from a private npm registry, which requires authentication. If your project uses a CI/CD workflow, [read this guide](http://help.mobiscroll.com/en/articles/1195431-installing-mobiscroll-with-npm#setting-up-for-cicd) on how to make it work.
:::

## Let's see if Mobiscroll was installed correctly

Here is how can the Mobiscroll resources be imported to a Vue component:

```jsx
import { Datepicker, Eventcalendar } from "@mobiscroll/vue";
import "@mobiscroll/vue/dist/css/mobiscroll.min.css";
```

To test it let's import the Datepicker component and add it to your component.

```tsx
<script lang="ts">
import { defineComponent } from "vue";
import { Datepicker } from "../lib/mobiscroll/vue/bundle";

export default defineComponent({
  components: { Datepicker },
  data() {
    return {
      birthDay: undefined
    };
  },
});
</script>
<template>
    <Datepicker  placeholder="Please select..." v-model="birthDay"></Datepicker>
</template>

```