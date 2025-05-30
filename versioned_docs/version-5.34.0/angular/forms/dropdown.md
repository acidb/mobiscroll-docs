---
sidebar_position: 3
sidebar_label: Dropdown
displayed_sidebar: angularSidebar
---

import Options from '../\_auto-generated/dropdown/options.md';
import Events from '../\_auto-generated/dropdown/events.md';
import Localizations from '../\_auto-generated/dropdown/localizations.md';
import Types from '../\_auto-generated/dropdown/types.md';

# Dropdown

The Dropdown component can be used for collecting user provided information from a set of options.

## Usage

Use the [`label`](#opt-label) option to provide a label to the dropdown.

```html
<mbsc-dropdown label="Choose one">
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
</mbsc-dropdown>
```

```html title="Dynamic options"
<mbsc-dropdown label="Choose one">
    <option *ngFor="let opt of myOptions" [value]="opt.value" >{{opt.text}}</option>
</mbsc-dropdown>
```

## Value binding

The dropdown can be bound to a string value using either the `[(ngModel)]` or the `formControlName` directives. In this case the dropdown will update it's state according to the bound value.

```html
<mbsc-dropdown [(ngModel)]="myValue" label="Choose one">
  <option value="opt1">Option 1</option>
  <option value="opt2">Option 2</option>
  <option value="opt3">Option 3</option>
</mbsc-dropdown>
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

## Types

<Types />

</div>
