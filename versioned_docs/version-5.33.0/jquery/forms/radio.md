---
sidebar_label: Radio button
displayed_sidebar: jquerySidebar
---

import Options from '../\_auto-generated/radio/options.md';
import Events from '../\_auto-generated/radio/events.md';
import Localizations from '../\_auto-generated/radio/localizations.md';
import Types from '../\_auto-generated/radio/types.md';

# Radio button

Radio button component is used when the user needs to select one option from a set.

This UI component is best used when there is enough space, since all the options are visible at once.
If you need to save space, a better UI choice would be the [Dropdown](./dropdown) component,
which only displays the selected option and the others are only visible on selection.

## Usage

Use the [`label`](#opt-label) option to provide a label to the Radio button.

All the options can be passed to the radio via `data-` attributes with exceptions of the native input supported ones. The attributes that the native html input supports can be passed directly without the data- prefix. For example the `checked`, the `disabled` or the `value` attributes (and so on...).

```html
<label>
    <input type="radio" mbsc-radio data-label="The label of the Radio button" />
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
Explore the following API options that help you easily configure the Radio button component.

<Options />

## Events
The Radio button component ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

## Localization
The Radio button component is fully localized. This covers date and time format, button copy, rtl and more.

<Localizations />

## Types

<Types />

</div>
