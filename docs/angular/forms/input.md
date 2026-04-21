---
sidebar_position: 4
sidebar_label: Input
displayed_sidebar: angularSidebar
description: 'Use the Mobiscroll Input form component in Angular — text inputs with floating labels, validation states, icons, and password toggle.'
---

import Options from '../\_auto-generated/input/options.md';
import Events from '../\_auto-generated/input/events.md';
import Localizations from '../\_auto-generated/input/localizations.md';
import Types from '../\_auto-generated/input/types.md';

# Input

The Input component can be used for collecting information from the user.

## Usage

Use the [`label`](#opt-label) option to provide a label to the input field.

```html
<!-- Textbox -->
<mbsc-input label="Username" type="text"></mbsc-input>

<!-- Password -->
<mbsc-input label="Password" type="password" [passwordToggle]="true"></mbsc-input>
```

```ts
import { Component } from '@angular/core';
import { MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [MbscModule],
})
export class AppComponent {}
```

## Input style

With the [`inputStyle`](#opt-inputStyle) attribute you can customize the look of input. There are three styles to choose from:

```html
<!-- Underline input style -->
<mbsc-input label="Label" inputStyle="underline"></mbsc-input>

<!-- Box input style -->
<mbsc-input label="Label" inputStyle="box"></mbsc-input>

<!-- Outline input style -->
<mbsc-input label="Label" inputStyle="outline"></mbsc-input>
```

```ts
import { Component } from '@angular/core';
import { MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [MbscModule],
})
export class AppComponent {}
```

## Label style

With the [`labelStyle`](#opt-labelStyle) attribute you can define the position of the label.

```html
<!-- Stacked label style -->
<mbsc-input label="Label" labelStyle="stacked"></mbsc-input>

<!-- Inline label style -->
<mbsc-input label="Label" labelStyle="inline"></mbsc-input>

<!-- Floating label style -->
<mbsc-input label="Label" labelStyle="floating"></mbsc-input>
```

```ts
import { Component } from '@angular/core';
import { MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [MbscModule],
})
export class AppComponent {}
```

## Value binding

The input can be bound to a string value using either the `[(ngModel)]` or the `formControlName` directives. In this case the input will update it's state according to the bound value.

```html
<mbsc-input [(ngModel)]="username" label="Username" inputStyle="outline" labelStyle="floating"></mbsc-input>
```

```ts
import { Component } from '@angular/core';
import { MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [MbscModule],
})
export class AppComponent {}
```

<div className="option-list">

## Options
Explore the following API options that help you easily configure the Input component.

<Options />

## Events
The Input component ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

## Localization
The Input component is fully localized. This covers date and time format, button copy, rtl and more.

<Localizations />

</div>

