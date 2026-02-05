---
sidebar_position: 8
sidebar_label: Switch
displayed_sidebar: angularSidebar
---

import Options from '../\_auto-generated/switch/options.md';
import Events from '../\_auto-generated/switch/events.md';
import Localizations from '../\_auto-generated/switch/localizations.md';
import Types from '../\_auto-generated/switch/types.md';

# Switch

The Switch component is a two value control. It is like a physical toggle switch, it has an on and an off state that is represented as a boolean value.

## Usage

Use the [`label`](#opt-label) option to provide a label to the switch.
The switch can be positioned before or after the label using the [`position`](#opt-position) option.

```html
<mbsc-switch label="The label of the switch"></mbsc-switch>
```

For being more informative a [`description`](#opt-description) and a [`color`](#opt-color) can also be passed to the switch.

```html
<!-- Label and description for more info -->
<mbsc-switch label="Front door" description="Controls the lock of the front door." [(ngModel)]="myFrontLock"></mbsc-switch>

<!-- Different color switches -->
<mbsc-switch color="danger" label="Sync on mobile data"></mbsc-switch>
<mbsc-switch color="info" label="Email notification"></mbsc-switch>
```
## Value binding

The switch can be bound to a boolean value using either the `[(ngModel)]` or the `formControlName` directives. In this case the switch will update it's state according to the bound the value.

```html
<mbsc-switch label="Bedroom lights" [(ngModel)]="bedroomLight"></mbsc-switch>
```

```ts
@Component({...})
export class MyComponent {
  bedroomLight = false;
}
```

<div className="option-list">

## Options
Explore the following API options that help you easily configure the Switch component.

<Options />

## Events
The Switch component ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

## Localization
The Switch component is fully localized. This covers date and time format, button copy, rtl and more.

<Localizations />

</div>
