---
sidebar_label: Textarea
displayed_sidebar: javascriptSidebar
---

import Options from '../\_auto-generated/textarea/options.md';
import Events from '../\_auto-generated/textarea/events.md';
import Localizations from '../\_auto-generated/textarea/localizations.md';

# Textarea

The Textarea component can be used for collecting information from the user in the form of multi-line text.

## Usage

Use the [`label`](#opt-label) option to provide a label to the textarea.

All the options can be passed to the textarea via `data-` attributes with exceptions of the native textarea element supported ones. The attributes that the native html textarea supports can be passed directly without the data- prefix. For example the `placeholder` or the `disabled` attributes (and so on...).

```html
<label>
    <textarea mbsc-textarea data-label="About"></textarea>
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
Explore the following API options that help you easily configure the Textarea component.

<Options />

## Events
The Textarea component ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

## Localization
The Textarea component is fully localized. This covers date and time format, button copy, rtl and more.

<Localizations />

</div>
