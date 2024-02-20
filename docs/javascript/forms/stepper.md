---
sidebar_label: Stepper
displayed_sidebar: javascriptSidebar
---

import Options from '../\_auto-generated/stepper/options.md';
import Events from '../\_auto-generated/stepper/events.md';
import Localizations from '../\_auto-generated/stepper/localizations.md';

# Stepper

The Stepper component lets the user adjust a value by increasing and decreasing it in small steps.
Steppers are used in situations where a user needs to adjust a value by a small amount.

## Usage

Use the [`label`](#opt-label) option to provide a label to the stepper.

All the options can be passed to the stepper via `data-` attributes with exceptions of the native input supported ones. The attributes that the native html input supports can be passed directly without the data- prefix. For example the `value` or the `disabled` attributes (and so on...).

```html
<label>
    <input mbsc-stepper data-label="The label of the stepper" />
</label>
```

For being more informative a [description](#opt-description) and a [color](#opt-color) can also be passed to the component.

```html
<!-- Label and description for more info -->
<label>
    <input mbsc-stepper data-label="Childrens" data-description="Number of childrens." />
</label>

<!-- Different color steppers -->
<label>
    <input mbsc-stepper data-color="danger" data-label="Danger" />
</label>
<label>
    <input mbsc-stepper color="info" label="Info" />
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

<Options />

## Events

<Events />

## Localization

<Localizations />

</div>
