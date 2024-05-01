---
sidebar_label: Segmented
displayed_sidebar: jquerySidebar
---

import Options from '../\_auto-generated/segmented/options.md';
import Events from '../\_auto-generated/segmented/events.md';
import Localizations from '../\_auto-generated/segmented/localizations.md';
import Types from '../\_auto-generated/segmented/types.md';

# Segmented

The Segmented component is a horizontal control made of multiple segments, each segment functioning as a button.

## Usage

Inputs with `type="radio"` and `mbsc-segmented` attributes will be transformed into a segmented control.

The segments are grouped by a container with the mbsc-segmented-group attribute.

In single selection mode the functionality is similar to the [radio buttons](./radio), where selecting one will deselect all others.

```html title="With icon"
<div mbsc-segmented-group>
    <label>
        <input type="radio" mbsc-segmented data-icon="plus" name="group1" checked>
    </label>
    <label>
        <input type="radio" mbsc-segmented data-icon="minus" name="group1">
    </label>
    <label>
        <input type="radio" mbsc-segmented data-icon="key2" name="group1">
    </label>
</div>
```

```html title="With text"
<div mbsc-segmented-group>
    <label>
        Option 1
        <input type="radio" mbsc-segmented name="group2">
    </label>
    <label>
        Option 2
        <input type="radio" mbsc-segmented name="group2" checked>
    </label>
    <label>
        Option 3
        <input type="radio" mbsc-segmented name="group2">
    </label>
    <label>
        Option 4
        <input type="radio" mbsc-segmented name="group2">
    </label>
</div>
```

## Color presets

Mobiscroll includes several predefined color presets, each serving its own semantic purpose.

```html
// highlight-next-line
<div mbsc-segmented-group data-color="danger">
    <label>
        Desktop
        <input type="radio" mbsc-segmented data-icon="home" name="group-danger">
    </label>
    <label>
        Mobile
        <input type="radio" mbsc-segmented data-icon="mobile" name="group-danger" checked>
    </label>
    <label>
        Cloud
        <input type="radio" mbsc-segmented data-icon="cloud-upload" name="group-danger">
    </label>
</div>

// highlight-next-line
<div mbsc-segmented-group data-color="warning">
    <label>
        Desktop
        <input type="radio" mbsc-segmented data-icon="home" name="group-warning">
    </label>
    <label>
        Mobile
        <input type="radio" mbsc-segmented data-icon="mobile" name="group-warning" checked>
    </label>
    <label>
        Cloud
        <input type="radio" mbsc-segmented data-icon="cloud-upload" name="group-warning">
    </label>
</div>

// highlight-next-line
<div mbsc-segmented-group data-color="info">
    <label>
        Desktop
        <input type="radio" mbsc-segmented data-icon="home" name="group-info">
    </label>
    <label>
        Mobile
        <input type="radio" mbsc-segmented data-icon="mobile" name="group-info" checked>
    </label>
    <label>
        Cloud
        <input type="radio" mbsc-segmented data-icon="cloud-upload" name="group-info">
    </label>
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

<Options />

## Events

<Events />

## Localization

<Localizations />

## Types

<Types />

</div>
