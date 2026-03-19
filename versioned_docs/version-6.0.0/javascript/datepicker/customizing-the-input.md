---
sidebar_position: 10
sidebar_label: Customizing the input
displayed_sidebar: javascriptSidebar
title: Customizing the input
---

## Overview

The datepicker, as explained below, can be used with one, two or no inputs.

## Using without inputs

The first choice of input customization is to have no inputs at all. In this case rendering the component in [inline display](/javascript/datepicker/display-modes) mode will leave out the use of inputs.

```jsx title="Inline picker"
<div id="myAppointment"></div>
```

```jsx
mobiscroll.datepicker('#myAppointment', {
    display: 'inline'
});
```

## Using with one input

The datepicker component will render a Mobiscroll Input by default. This input will hold the formatted value after selection.

Having a custom input can be achived using the datepicker directive on the component you want.

```jsx title="Using the datepicker with one input"
<input id="myAppointment" class="any-class-you-want" placeholder="Click to select..." />
```

```jsx
mobiscroll.datepicker('#myAppointment', {
    theme: 'ios',
});
```

## Using with two inputs

When selecting a range, you have basically two values to display: the start of the range and the end of the range. These can be shown in different inputs using the [`startInput`](/javascript/datepicker/api#opt-startInput) and the [`endInput`](/javascript/datepicker/api#opt-endInput) options.

```jsx title="Two inputs for range selection"
<input id="start-input" placeholder="Start date" />
<input id="end-input" placeholder="End date" />
<div id="picker"></div>
```

```jsx
mobiscroll.datepicker('#picker', {
    select: 'range',
    startInput: '#start-input',
    endInput: '#end-input'
});
```