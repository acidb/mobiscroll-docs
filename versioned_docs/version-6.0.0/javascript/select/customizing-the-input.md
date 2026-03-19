---
sidebar_position: 10
sidebar_label: Customizing the input
displayed_sidebar: javascriptSidebar
title: Customizing the input
---

When initializing the Select component on a native select element, by default that element will be hidden and an input element is rendered that will hold the selection text. Also this input element gets the focus and click handlers that will open the picker.

```jsx
<select id="my-select">
    <option value="lon">London</option>
    <option value="ber">Berlin</option>
    <option value="par">Paris</option>
</select>
```

```jsx
mobiscroll.select('#my-select', { theme: 'ios' });
```

You can use any custom input with the select component using the `inputElement` [option](/javascript/select/api#opt-inputElement). Passing another element to it, the default input won't be rendered. The passed element will get the event handlers to open the picker, and also the selected value's text will be written to it as well. This option will only work with the directive version of the component.

```jsx
<input id="my-custom-input" placeholder="Click to select..." />

<select id="my-select">
    <option value="lon">London</option>
    <option value="ber">Berlin</option>
    <option value="par">Paris</option>
</select>
```

```jsx
mobiscroll.select('#my-select', {
    inputElement: document.getElementById('my-custom-input'),
    theme: 'ios',
});
```