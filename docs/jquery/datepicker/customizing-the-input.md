---
sidebar_position: 10
sidebar_label: Customizing the input
displayed_sidebar: jquerySidebar
title: Customizing the input
description: 'Customize the input element used by the Mobiscroll Datepicker in jQuery — custom triggers, inline rendering, and anchor elements.'
---

## Overview

The datepicker, as explained below, can be used with one, two or no inputs.

## Using without inputs

The first choice of input customization is to have no inputs at all. In this case rendering the component in [inline display](/jquery/datepicker/display-modes) mode will leave out the use of inputs.

```jsx title="Inline picker"
<div id="myAppointment"></div>
```

```jsx
import $ from 'jquery';
import * as mobiscroll from '@mobiscroll/jquery';
import '@mobiscroll/jquery/dist/css/mobiscroll.min.css';

$('#myAppointment').mobiscroll().datepicker({
    display: 'inline',
});
```

## Using with one input

The datepicker component will render a Mobiscroll Input by default. This input will hold the formatted value after selection.

Having a custom input can be achived using the datepicker directive on the component you want.

```jsx title="Using the datepicker with one input"
<input id="myAppointment" class="any-class-you-want" placeholder="Click to select..." />
```

```jsx
import $ from 'jquery';
import * as mobiscroll from '@mobiscroll/jquery';
import '@mobiscroll/jquery/dist/css/mobiscroll.min.css';

$('#myAppointment').mobiscroll().datepicker({
    theme: 'ios',
});
```

## Using with two inputs

When selecting a range, you have basically two values to display: the start of the range and the end of the range. These can be shown in different inputs using the [`startInput`](/jquery/datepicker/api#opt-startInput) and the [`endInput`](/jquery/datepicker/api#opt-endInput) options.

```jsx title="Two inputs for range selection"
<input id="start-input" placeholder="Start date" />
<input id="end-input" placeholder="End date" />
<div id="picker"></div>
```

```jsx
import $ from 'jquery';
import * as mobiscroll from '@mobiscroll/jquery';
import '@mobiscroll/jquery/dist/css/mobiscroll.min.css';

$('#picker').mobiscroll().datepicker({
    select: 'range',
    startInput: '#start-input',
    endInput: '#end-input'
});
```