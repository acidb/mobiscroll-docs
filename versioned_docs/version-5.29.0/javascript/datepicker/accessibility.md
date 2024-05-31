---
sidebar_position: 10
sidebar_label: Accessibility
displayed_sidebar: javascriptSidebar
---

# Accessibility

## Keyboard Support

The Datepicker can render different kinds of [controls](./controls) on the screen depending on the use-case. Each of these controls can be operated by keyboard.

When focusing the input component one can open the picker using the `Space` or `Enter` keys.

The `Esc` key acts as the cancel button and closes the picker.

The `Tab` and `Shift + Tab` keys can be used to navigate between the major parts of the Datepicker:
* the month and year navigation button
* the previous, next and today buttons
* the currently rendered control
* the set and cancel buttons if they are rendered

Buttons can be activated using the `Space` key.

### Calendar

When focusing the calendar control or the month and year navigation, the focus can be moved using the `Left`, `Right`, `Up` and `Down` arrow keys.

The focused day (or month or year depending on the selection) can be marked as selected with the `Space` key or the `Enter` key. The later also confirms the selection and closes the Datepicker.

### Date & Time Scroller

When using the date and time scrollers, the `Tab` and `Shift + Tab` keys can be used to move the focus between the rendered wheels. The `Up` and `Down` arrow keys are used to rotate the wheel and change the selected value.

The selection can be confirmed with the `Enter` key, which also closes the picker.

### Timegrid

The selectable times can be navigated using the `Tab` and `Shift + Tab` keys. The focused item can be marked as selected with the `Space` key or the `Enter` key. The later also confirms the selection and closes the Datepicker.