---
sidebar_position: 10
sidebar_label: Customizing the input
displayed_sidebar: reactSidebar
title: Customizing the input
---

By default the Mobsicroll Select component renders a Mobiscroll Input component. To customize this Input component, you can pass props to it using the `inputProps` [option](/react/select/api#opt-inputProps). Or you can change the rendered component using the `inputComponent` [option](/react/select/api#opt-inputComponent).

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