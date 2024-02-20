---
sidebar_label: Segmented
displayed_sidebar: angularSidebar
---

import Options from '../\_auto-generated/segmented/options.md';
import Events from '../\_auto-generated/segmented/events.md';
import Localizations from '../\_auto-generated/segmented/localizations.md';

# Segmented

The Segmented component is a horizontal control made of multiple segments, each segment functioning as a button.

## Usage

In single selection mode the functionality is similar to the [radio buttons](./radio), where selecting one will deselect all others.

```html
<!-- Icon only -->
<mbsc-segmented-group name="my-group" [(ngModel)]="myChoice">
    <mbsc-segmented value="1" icon="remove"></mbsc-segmented>
    <mbsc-segmented value="2" icon="pencil"></mbsc-segmented>
    <mbsc-segmented value="3" icon="plus"></mbsc-segmented>
</mbsc-segmented-group>

<!-- Icon and text -->
<mbsc-segmented-group name="my-group" [(ngModel)]="myChoice">
    <mbsc-segmented value="1" startIcon="remove">Option 1</mbsc-segmented>
    <mbsc-segmented value="2" startIcon="pencil">Option 2</mbsc-segmented>
    <mbsc-segmented value="3" startIcon="plus">Option 3</mbsc-segmented>
</mbsc-segmented-group>
```

## Value binding

Segmetned components can be bound to a string value using either the `[(ngModel)]` or the `formControlName` directives. These directives can be used individually on every segmented component or can be applied to the segmented group.

#### Single selection

Use the value and onChange props to set a value to the whole segmented group.

```html
<mbsc-segmented-group name="my-range" [(ngModel)]="myRange">
    <mbsc-segmented value="day">Day</mbsc-segmented>
    <mbsc-segmented value="week">Week</mbsc-segmented>
    <mbsc-segmented value="month">Month</mbsc-segmented>
    <mbsc-segmented value="year">Year</mbsc-segmented>
</mbsc-segmented-group>
```

#### Multiple selection

In multiple selection mode segments can be selected and de-selected independently from each other.

```html
<mbsc-segmented-group select="multiple" name="multi">
    <mbsc-segmented *ngFor="let item of myGroupItems" [(ngModel)]="item.checked">{{item.text}}</mbsc-segmented>
</mbsc-segmented-group>
```

```ts
@Component({...})
export class MyComponent {
  myGroupItems: Array<{ checked: boolean, text: string, value: string }> = [
    { checked: false, text: 'S', value: 'sunday' },
    { checked: true, text: 'M', value: 'monday' },
    { checked: false, text: 'T', value: 'tuesday' },
    { checked: false, text: 'W', value: 'wednesday' },
    { checked: true, text: 'T', value: 'thursday' },
    { checked: false, text: 'F', value: 'friday' },
    { checked: false, text: 'S',value: 'saturday' }
  ];
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
