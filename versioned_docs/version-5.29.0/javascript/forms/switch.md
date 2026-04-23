---
sidebar_label: Switch
displayed_sidebar: javascriptSidebar
---

import Options from '../\_auto-generated/switch/options.md';
import Events from '../\_auto-generated/switch/events.md';
import Localizations from '../\_auto-generated/switch/localizations.md';

# Switch

The Switch component is a two value control. It is like a physical toggle switch, it has an on and an off state that is represented as a boolean value.

## Usage

Use the [`label`](#opt-label) option to provide a label to the switch.
The switch can be positioned before or after the label using the [`position`](#opt-position) option.

All the options can be passed to the switch via `data-` attributes with two exceptions. The exceptions are the `checked` and the `disabled` attributes, that don't need the data- prefix, since the native input supports them.

```html
<label>
    <input type="checkbox" mbsc-switch data-label="The label of the switch" />
</label>

<label>
    <input type="checkbox" mbsc-switch data-label="Switch at the start" data-position="start" />
</label>

<label>
    <input type="checkbox" mbsc-switch data-label="Switch at the end" data-position="end" />
</label>
```

For being more informative a [description](#opt-description) and a [color](#opt-color) can also be passed to the switch.

```html
<!-- Label and description for more info -->
<label>
    <input type="checkbox" mbsc-switch data-label="Front door" data-description="Controls the lock of the front door." />
</label>

<!-- Different color switches -->
<label>
    <input type="checkbox" mbsc-switch data-color="danger" data-label="Sync on mobile data" />
</label>
<label>
    <input type="checkbox" mbsc-switch data-color="info" label="Email notification" />
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
Explore the following API options that help you easily configure the Switch component.

<Options />

## Events
The Switch component ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

## Localization
The Switch component is fully localized. This covers date and time format, button copy, rtl and more.

<Localizations />

</div>
