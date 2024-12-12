---
sidebar_position: 10
sidebar_label: Customizing the input
displayed_sidebar: vueSidebar
title: Customizing the input
---

When initializing the Select component on a native select element, by default that element will be hidden and an input element is rendered that will hold the selection text. Also this input element gets the focus and click handlers that will open the picker.

To customize this Input component, you can pass props to it using the `inputProps` [option](/vue/select/api#opt-inputProps). Or you can change the rendered component using the `inputComponent` [option](/vue/select/api#opt-inputComponent).