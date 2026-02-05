---
sidebar_position: 3
sidebar_label: Dropdown
displayed_sidebar: javascriptSidebar
---

import Options from '../\_auto-generated/dropdown/options.md';
import Events from '../\_auto-generated/dropdown/events.md';
import Localizations from '../\_auto-generated/dropdown/localizations.md';
import Types from '../\_auto-generated/dropdown/types.md';

# Dropdown

The Dropdown component can be used for collecting user provided information from a set of options. It uses the HTML select element and adds custom styling and additional functionality.

## Usage

Use the [`label`](#opt-label) option to provide a label to the dropdown.

All the options can be passed to the dropdown via `data-` attributes with one exception. The exception is the `disabled` attribute, that don't need the data- prefix, since the native select supports it.

```html
<label>
    <select data-label="Choose one" mbsc-dropdown id="choose">
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
    </select>
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
Explore the following API options that help you easily configure the Dropdown component.

<Options />

## Events
The Dropdown component ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

## Localization
The Dropdown component is fully localized. This covers date and time format, button copy, rtl and more.

<Localizations />

</div>
