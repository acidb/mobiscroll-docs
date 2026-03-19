---
sidebar_position: 9
sidebar_label: Invalid items
displayed_sidebar: javascriptSidebar
title: Invalid items
---

Invalid items are items that cannot be selected. They appear disabled on the wheels and when clicked, a selection will not happen.

Invalid items can be set using the `invalid` [option](/javascript/select/api#opt-invalid) or the `data` [option](/javascript/select/api#opt-data). The `invalid` [option](/javascript/select/api#opt-invalid) takes an array of values and disables those values. When using the `data` [option](/javascript/select/api#opt-data), each item can take a disables property, that `disables` that item.

```js title="Invalid example"
mobiscroll.select('#my-input', {
    data: [
      { value: 'sug', text: 'Sugar'}, 
      { value: 'hon', disabled: true, text: 'Honey'}, 
      { value: 'cre', text: 'Cream' }
    ],
    invalid: ['sug'],
    onChange: function(ev, inst) {
        console.log(inst.getVal());
    }
});
```