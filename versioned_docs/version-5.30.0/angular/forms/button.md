---
sidebar_label: Button
displayed_sidebar: angularSidebar
---

import Options from '../\_auto-generated/button/options.md';
import Events from '../\_auto-generated/button/events.md';
import Localizations from '../\_auto-generated/button/localizations.md';

# Button

The Button component is an interactive element activated by the user.
Once activated, it performs an action, such as submitting a form or opening a dialog.

## Usage

Buttons can display text, icons, or both. They can be colored and styled with various options.

#### Button styles

```html title="Button variations"
<mbsc-button>Standard button</mbsc-button>
<mbsc-button variant="flat">Flat button</mbsc-button>
<mbsc-button variant="outline">Outline button</mbsc-button>

<mbsc-button startIcon="home">With start icon</mbsc-button>
<mbsc-button endIcon="home">With end icon</mbsc-button>
<mbsc-button icon="pencil" ariaLabel="Icon only"></mbsc-button>

<mbsc-button color="primary">Primary button</mbsc-button>
<mbsc-button color="secondary">Secondary button</mbsc-button>
<mbsc-button color="success">Success button</mbsc-button>
<mbsc-button color="danger">Danger button</mbsc-button>
<mbsc-button color="warning">Warning button</mbsc-button>
<mbsc-button color="info">Info button</mbsc-button>
<mbsc-button color="light">Light button</mbsc-button>
<mbsc-button color="dark">Dark button</mbsc-button>
```

#### Button sizes and groups

```html
<!-- Full width button -->
<mbsc-button class="mbsc-button-block">Full width Button</mbsc-button>

<!-- Button group -->
<div class="mbsc-button-group">
    <mbsc-button>Button 1</mbsc-button>
    <mbsc-button>Button 2</mbsc-button>
    <mbsc-button>Button 3</mbsc-button>
</div>

<!-- Justified group -->
<!-- Buttons are streched to fill the full width of the container -->
<div class="mbsc-button-group-justified">
    <mbsc-button>Button 1</mbsc-button>
    <mbsc-button>Button 2</mbsc-button>
    <mbsc-button>Button 3</mbsc-button>
</div>

<!-- Full width group -->
<!-- Each button fills the whole width of the container -->
<div class="mbsc-button-group-block">
    <mbsc-button>Button 1</mbsc-button>
    <mbsc-button>Button 2</mbsc-button>
    <mbsc-button>Button 3</mbsc-button>
</div>
```

## Handling clicks

Clicks can be handled using the standard `click` event.

```html
<mbsc-button (click)="myClickHandler()">Click me!</mbsc-button>
```

<div className="option-list">

## Options

<Options />

## Localization

<Localizations />

## Events

<Events />

</div>
