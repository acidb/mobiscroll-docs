---
sidebar_label: Value Selection
displayed_sidebar: jquerySidebar
sidebar_position: 4
---

# Value Selection

The Select component can be used to select one or multiple values from a list. The values can be of any type, for example `number`, `string` or `object` as described in the [data binding](./data-binding) section.


## Single value selection

By default the Select operates in single value selection mode, but can be used to select multiple values from a list as well.

```js title="Selecting a single value"
$('#myInput').mobiscroll().select({
  data: [
    { text: 'Mohito', value: 'mohito'},
    { text: 'Long Island', value: 'longisland'},
    { text: 'Margarita', value: 'margarita'}
  ],
});
```

## Multiple value selection

Multiselection can be enabled using the [`selectMultiple`](./api#opt-selectMultiple) option.

```js title="Selecting multiple items from a list"
$('#myInput').mobiscroll().select({
  data: ['Free ticket', 'Free Drink', 'Free Hug'],
  selectMultiple: true,
});
```
