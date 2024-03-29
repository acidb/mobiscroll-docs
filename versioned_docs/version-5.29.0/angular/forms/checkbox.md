---
sidebar_label: Checkbox
displayed_sidebar: angularSidebar
---

import Options from '../\_auto-generated/checkbox/options.md';
import Events from '../\_auto-generated/checkbox/events.md';
import Localizations from '../\_auto-generated/checkbox/localizations.md';

# Checkbox

Checkboxes allow the selection of multiple options from a set. They appear as checked when activated.

## Usage

Use the [`label`](#opt-label) option to provide a label to the checkbox.
The checkbox can be positioned before or after the label using the [`position`](#opt-position) option.

```html
<mbsc-checkbox label="One"></mbsc-checkbox>
```

## Value binding

The checkbox can be bound to a boolean value using either the `[(ngModel)]` or the `formControlName` directives. In this case the checkbox will update it's state according to the bound the value.

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

<Options />

## Events

<Events />

## Localization

<Localizations />

</div>
