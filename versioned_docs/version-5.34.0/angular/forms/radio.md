---
sidebar_position: 5
sidebar_label: Radio button
displayed_sidebar: angularSidebar
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

Radio button component can be used individually or can be grouped logically inside a Radio Group component. The Radio Group component, also helps to specify the group name only once, otherwise it needs to be added to every Radio button.

```html
<mbsc-radio value="1" name="myRadio" label="One"></mbsc-radio>
```

```html
<mbsc-radio-group name="gender">
    <mbsc-radio value="f" label="Female"></mbsc-radio>
    <mbsc-radio value="m" label="Male"></mbsc-radio>
    <mbsc-radio value="o" label="Other"></mbsc-radio>
</mbsc-radio-group>
```

## Value binding

Radio button component can be bound to a string value using either the `[(ngModel)]` or the `formControlName` directives. These directives can be used individually on every Radio button component or can be applied to the radio group.

```html
<div>
  <mbsc-radio [(ngModel)]="myAge" name="age" value="adult" label="Adult (18+)"></mbsc-radio>
  <mbsc-radio [(ngModel)]="myAge" name="age" value="teen" label="Teen (13-18)"></mbsc-radio>
  <mbsc-radio [(ngModel)]="myAge" name="age" value="child" label="Child (4-13)"></mbsc-radio>
  <mbsc-radio [(ngModel)]="myAge" name="age" value="toddler" label="Toddler (1-4)"></mbsc-radio>
  <mbsc-radio [(ngModel)]="myAge" name="age" value="baby" label="Baby (0-1)"></mbsc-radio>
</div>

<mbsc-radio-group name="eye-color" [(ngModel)]="myEye">
  <mbsc-radio value="blue" label="Blue"></mbsc-radio>
  <mbsc-radio value="brown" label="Brown"></mbsc-radio>
  <mbsc-radio value="green" label="Green"></mbsc-radio>
  <mbsc-radio value="grey" label="Grey"></mbsc-radio>
</mbsc-radio-group>
```

```ts
@Component({...})
export class MyComponent {
  myAge = 'adult';
  myEye = 'green';
}
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
