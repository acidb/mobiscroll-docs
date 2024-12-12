---
sidebar_position: 10
sidebar_label: Customizing the input
displayed_sidebar: reactSidebar
title: Customizing the input
---

When initializing the Select component on a native select element, by default that element will be hidden and an input element is rendered that will hold the selection text. Also this input element gets the focus and click handlers that will open the picker.

```jsx
function (props) {
    const data = [{ value: 'lon', text: 'London'}, { value: 'par', text: 'Paris'}, { value: 'ber', text: 'Berlin'}];

    return <Select data={selectData} />
}
```

To customize this Input component, you can pass props to it using the `inputProps` [option](/react/select/api#opt-inputProps). Or you can change the rendered component using the `inputComponent` [option](/react/select/api#opt-inputComponent).

```jsx
function (props) {
    const data = [{ value: 'lon', text: 'London'}, { value: 'par', text: 'Paris'}, { value: 'ber', text: 'Berlin'}];

    const propsForInput = {
        className: 'my-custom-css-class1 my-custom-css-class2',
        placeholder: 'Click to select...'
    };

    return <Select data={selectData} inputProps={propsForInput} />
}
```