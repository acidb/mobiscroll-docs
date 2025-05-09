---
sidebar_position: 9
sidebar_label: Invalid items
displayed_sidebar: reactSidebar
title: Invalid items
---

Invalid items are items that cannot be selected. They appear disabled on the wheels and when clicked, a selection will not happen.

Invalid items can be set using the `invalid` [option](/react/select/api#opt-invalid) or the `data` [option](/react/select/api#opt-data). The `invalid` [option](/react/select/api#opt-invalid) takes an array of values and disables those values. When using the `data` [option](/react/select/api#opt-data), each item can take a disables property, that `disables` that item.

```jsx title="Invalid example"
function App() {
    // standard react magic...
    const [selectedExtra, setSelectedExtra] = React.useState();
    const selectedChange = (ev) => { setSelectedExtra(ev.value); };

    // the options to choose from
    const extras = React.useState([
      { value: 'sug', text: 'Sugar'}, 
      { value: 'hon', disabled: true, text: 'Honey'}, 
      { value: 'cre', text: 'Cream' }
    ]);
    const invalid = ['sug'];

    return <Select value={selectedExtra} onChange={selectedChange} data={extras} invalid={invalid} />
}
```