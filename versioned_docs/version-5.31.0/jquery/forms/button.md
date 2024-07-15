---
sidebar_label: Button
displayed_sidebar: jquerySidebar
---

import Options from '../\_auto-generated/button/options.md';
import Events from '../\_auto-generated/button/events.md';
import Localizations from '../\_auto-generated/button/localizations.md';

# Button

The Button component is an interactive element activated by the user.
Once activated, it performs an action, such as submitting a form or opening a dialog.

## Usage

Buttons can display text, icons, or both. They can be colored and styled with various options.

All the options can be passed to the button via `data-` attributes with exceptions of the native button supported ones. The attributes that the native html button supports can be passed directly without the data- prefix. For example the `disabled` attribute.

#### Button styles

```html title="Button variations"
<button mbsc-button>Standard button</button>
<button mbsc-button data-variant="flat">Flat button</button>
<button mbsc-button data-variant="outline">Outline button</button>

<button mbsc-button data-start-icon="home">With start icon</button>
<button mbsc-button data-end-icon="home">With end icon</button>
<button mbsc-button data-icon="pencil" data-aria-label="Icon only"></button>

<button mbsc-button data-color="primary">Primary button</button>
<button mbsc-button data-color="secondary">Secondary button</button>
<button mbsc-button data-color="success">Success button</button>
<button mbsc-button data-color="danger">Danger button</button>
<button mbsc-button data-color="warning">Warning button</button>
<button mbsc-button data-color="info">Info button</button>
<button mbsc-button data-color="light">Light button</button>
<button mbsc-button data-color="dark">Dark button</button>
```

#### Button sizes and groups

```html
<!-- Full width button -->
<button mbsc-button class="mbsc-button-block">Full width Button</button>

<!-- Button group -->
<div class="mbsc-button-group">
    <button mbsc-button>Button 1</button>
    <button mbsc-button>Button 2</button>
    <button mbsc-button>Button 3</button>
</div>

<!-- Justified group -->
<!-- Buttons are streched to fill the full width of the container -->
<div class="mbsc-button-group-justified">
    <button mbsc-button>Button 1</button>
    <button mbsc-button>Button 2</button>
    <button mbsc-button>Button 3</button>
</div>

<!-- Full width group -->
<!-- Each button fills the whole width of the container -->
<div class="mbsc-button-group-block">
    <button mbsc-button>Button 1</button>
    <button mbsc-button>Button 2</button>
    <button mbsc-button>Button 3</button>
</div>
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
Explore the following API options that help you easily configure the Button component.

<Options />

## Localization
The Button component is fully localized. This covers date and time format, button copy, rtl and more.

<Localizations />

## Events
The Button component ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

</div>
