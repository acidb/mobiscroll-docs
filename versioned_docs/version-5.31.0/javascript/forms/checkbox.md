---
sidebar_label: Checkbox
displayed_sidebar: javascriptSidebar
---

import Options from '../\_auto-generated/checkbox/options.md';
import Events from '../\_auto-generated/checkbox/events.md';
import Localizations from '../\_auto-generated/checkbox/localizations.md';

# Checkbox

Checkboxes allow the selection of multiple options from a set. They appear as checked when activated.

## Usage

Use the [`label`](#opt-label) option to provide a label to the checkbox.
The checkbox can be positioned before or after the label using the [`position`](#opt-position) option.

All the options can be passed to the checkbox via `data-` attributes with exceptions of the native input supported ones. The attributes that the native html input supports can be passed directly without the data- prefix. For example the `checked` or the `disabled` attributes (and so on...).

```html
<label>
    <input type="checkbox" mbsc-checkbox data-label="The label of the Checkbox" />
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
