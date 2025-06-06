---
sidebar_position: 7
sidebar_label: Stepper
displayed_sidebar: angularSidebar
---

import Options from '../\_auto-generated/stepper/options.md';
import Events from '../\_auto-generated/stepper/events.md';
import Localizations from '../\_auto-generated/stepper/localizations.md';
import Types from '../\_auto-generated/stepper/types.md';

# Stepper

The Stepper component lets the user adjust a value by increasing and decreasing it in small steps.
Steppers are used in situations where a user needs to adjust a value by a small amount.

## Usage

Use the [`label`](#opt-label) option to provide a label to the stepper.

```html
<mbsc-stepper label="Label"></mbsc-stepper>
```

## Value binding

The stepper can be bound to a number value using either the `[(ngModel)]` or the `formControlName` directives. In this case the stepper will update it's state according to the bound the value.

```html
<mbsc-stepper label="My Age" [(ngModel)]="myAge"></mbsc-stepper>
```
```ts
@Component({...})
export class MyComponent {
  myAge = 24;
}
```

<div className="option-list">

## Options
Explore the following API options that help you easily configure the Stepper component.

<Options />

## Events
The Stepper component ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

## Localization
The Stepper component is fully localized. This covers date and time format, button copy, rtl and more.

<Localizations />

## Types

<Types />

</div>
