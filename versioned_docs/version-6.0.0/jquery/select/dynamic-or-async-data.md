---
sidebar_position: 3
sidebar_label: Dynamic or async data
displayed_sidebar: jquerySidebar
title: Dynamic or async data
---

## Overview

The select component supports dynamic data binding. For cases when the data is not immediately available or when the data changes with time (new options are added, or others removed) this feature is the most usefull.

## Dynamic Markup

As mentioned earlier in the [data binding section](/jquery/select/data-binding), the selection data can be passed to the select via [markup](/jquery/select/data-binding#data-through-markup): using a select and option HTML elements.

When updating the markup dynamically after the select component was initialized, the `reloadOptionElements` [method](/jquery/select/api#method-reloadOptionElements) has to be called on the select instance so it learns about the new options.

## Data option

When using the select with the `data` [option](/jquery/select/api#opt-data), updating the data can be done, with the `setOptions` [function](/jquery/select/api#method-setOptions) of the select instance.

```jsx
$('#my-input').mobiscroll().select({
    data: [],
});
const inst = $('#my-input').mobiscroll('getInst'); // get the instance of the select component
inst.setOptions({ data: ['Item 1', 'Item 2', 'Item 3']}); // update the component with new data
```