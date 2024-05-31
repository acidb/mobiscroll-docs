---
sidebar_label: Input
displayed_sidebar: javascriptSidebar
---

import Options from '../\_auto-generated/input/options.md';
import Events from '../\_auto-generated/input/events.md';
import Localizations from '../\_auto-generated/input/localizations.md';

# Input

The Input component can be used for collecting information from the user.

## Usage

Use the [`label`](#opt-label) option to provide a label to the input field.

All the options can be passed to the input via `data-` attributes with exceptions of the native input supported ones. The attributes that the native html input supports can be passed directly without the data- prefix. For example the `type` or the `disabled` attributes (and so on...).

```html title="Different types of inputs"
<!-- Text input -->
<label>
    <input mbsc-input data-label="Username" type="text" />
</label>

<!-- Password input -->
<label>
    <input mbsc-input data-label="Password" type="password" data-password-toggle="true" />
</label>

<!-- Number input -->
<label>
    <input mbsc-input data-label="Age" type="number" />
</label>
```

## Input style

```html
<!-- Underline input -->
<label>
    <input data-label="Username" mbsc-input id="username" data-input-style="underline" />
</label>
<!-- Box input -->
<label>
    <input data-label="Username" mbsc-input id="username" data-input-style="box" />
</label>
<!-- Outline input -->
<label>
    <input data-label="Username" mbsc-input id="username" data-input-style="outline" />
</label>
```

## Label style

```html
<!-- Stacked label style -->
<label>
    <input data-label="Username" mbsc-input id="username" data-label-style="stacked" />
</label>
<!-- Inline label style -->
<label>
    <input data-label="Username" mbsc-input id="username" data-label-style="inline" />
</label>
<!-- Floating label style -->
<label>
    <input data-label="Username" mbsc-input id="username" data-label-style="floating" />
</label>
```

## Auto vs. manual initialization

If the component is added later to the DOM, e.g. with an AJAX page load, a custom function named `enhance` needs to be called in order to initialize the dynamically added component. When the enhance function is called on a DOM element, all form elements will be initialized inside this element.

```js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        var page = document.getElementById('page');
        page.innerHTML = xhr.responseText;
        // highlight-next-line
        mobiscroll.enhance(page);
    }
}
xhr.open('GET', '/myform', true);
xhr.send();
```

<div className="option-list">

## Options
Explore the following API options that help you easily configure the Input component.

<Options />

## Events
The Input component ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

## Localization
The Input component is fully localized. This covers date and time format, button copy, rtl and more.

<Localizations />

</div>
