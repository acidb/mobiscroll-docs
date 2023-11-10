---
sidebar_position: 7
sidebar_label: Filtering
displayed_sidebar: vueSidebar
---

# Filtering

Filtering can be turned on with the [`filter`](./api#opt-filter) option. It is very usefull when using large datasets and you want to find a particular item.

When filtering is on, a filter input is rendered above the selectable options. The placeholder of the input can be customized and localized with the [`filterPlaceholderText`](./api#localization-filterPlaceholderText) option.
Typing a text in the input filters the options you can choose from. Also, with each change on the filter input text, the [`@filter`](./api#event-onFilter) event is triggered.

When no items match the filter the Mobiscroll Select will show a "No results" message, that can be customized and localized with the [`filterEmptyText`](./api#localization-filterEmptyText) option.


## Remote Filtering

Server side filtering can be implemented using the [`@filter`](./api#event-onFilter) event and the [`data`](./api#opt-data) option dynamically. Returning `false` from the [`@filter`](./api#event-onFilter) event handler will prevent the filtering of the option items locally. Then, a request can be made to the server with the `filterText` and the returned data can be set to the Mobiscroll Select dynamically.

```html
<script setup>
  import { MbscSelect } from '@mobiscroll/select';
  import { myCreateARequestMethod } from 'any-library-i-want';

  const data = ref([]);

  function myFilter(args) {
    const text = args.filterText;
    // create a request here and set the results to the data
    myCreateARequestMethod(text)
      .then((filteredArray) => {
        // highlight-start
        // this is probably an async operation
        data.value = filteredArray;
        // highlight-end
      });

    // highlight-start
    // this is synchronous
    return false;
    // highlight-end
  }
</script>

<template>
  <MbscSelect :data="data" @filter="myFilter" :filter="true" />
</template>
```

:::info
In the above example, we did not specify any library to handle the remote calls on purpose.

If you need a library to handle http requests, check out [Axios](https://github.com/axios/axios). It's a very popular library.
:::