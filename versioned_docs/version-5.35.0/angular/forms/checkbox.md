---
sidebar_position: 2
sidebar_label: Checkbox
displayed_sidebar: angularSidebar
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

```html
<mbsc-checkbox label="One"></mbsc-checkbox>
```

## Value binding

The Checkbox can be bound to a boolean value using either the `[(ngModel)]` or the `formControlName` directives. In this case the Checkbox will update it's state according to the bound the value.

```html
<mbsc-checkbox label="Bedroom lights" [(ngModel)]="bedroomLight"></mbsc-checkbox>
```
```ts
@Component({...})
export class MyComponent {
  bedroomLight = false;
}
```

<div className="option-list">

## Options
Explore the following API options that help you easily configure the Checkbox compoennt.

<Options />

## Events
The Checkbox component ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

## Localization
The Checkbox component is fully localized. This covers date and time format, button copy, rtl and more.

<Localizations />

</div>
