---
sidebar_position: 2
sidebar_label: Checkbox
displayed_sidebar: jquerySidebar
---

import Options from '../\_auto-generated/checkbox/options.md';
import Events from '../\_auto-generated/checkbox/events.md';
import Localizations from '../\_auto-generated/checkbox/localizations.md';
import Types from '../\_auto-generated/checkbox/types.md';

# Checkbox

The Checkbox component allow the selection of multiple options from a set. They appear as checked when activated.

## Usage

Use the [`label`](#opt-label) option to provide a label to the Checkbox.
The Checkbox can be positioned before or after the label using the [`position`](#opt-position) option.

All the options can be passed to the Checkbox via `data-` attributes with exceptions of the native input supported ones. The attributes that the native html input supports can be passed directly without the data- prefix. For example the `checked` or the `disabled` attributes (and so on...).

```html
<label>
    <input type="checkbox" mbsc-checkbox data-label="The label of the Checkbox" />
</label>
```

## Auto vs. manual initialization

If the component is added later to the DOM, e.g. with an AJAX page load, a custom function named `enhance` needs to be called in order to initialize the dynamically added component. When the enhance function is called on a DOM element, all form elements will be initialized inside this element.

```js
$.get('/myform', function (responseHtml) {
    var $page = $('#page');
    $page.html(responseHtml);
    // highlight-next-line
    mobiscroll.enhance($page[0]);
});
```

<div className="option-list">

## Options
Explore the following API options that help you easily configure the Checkbox component.

<Options />

## Events
The Checkbox component ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

## Localization
The Checkbox component is fully localized. This covers date and time format, button copy, rtl and more.

<Localizations />

## Types

<Types />

</div>
