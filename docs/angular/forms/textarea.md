---
sidebar_label: Textarea
displayed_sidebar: angularSidebar
---

import Options from '../\_auto-generated/textarea/options.md';
import Events from '../\_auto-generated/textarea/events.md';
import Localizations from '../\_auto-generated/textarea/localizations.md';

# Textarea

The Textarea component can be used for collecting information from the user in the form of multi-line text.

## Usage

Use the [`label`](#opt-label) option to provide a label to the textarea.

```html
<mbsc-textarea label="About"></mbsc-textarea>
```

## Input style

With the [`inputStyle`](#opt-inputStyle) attribute you can customize the look of textarea. There are three styles to choose from:

```html
<!-- Underline input style -->
<mbsc-textarea label="Label" inputStyle="underline"></mbsc-textarea>

<!-- Box input style -->
<mbsc-textarea label="Label" inputStyle="box"></mbsc-textarea>

<!-- Outline input style -->
<mbsc-textarea label="Label" inputStyle="outline"></mbsc-textarea>
```

## Label style

With the [`labelStyle`](#opt-labelStyle) attribute you can define the position of the label.

```html
<!-- Stacked label style -->
<mbsc-textarea label="Label" labelStyle="stacked"></mbsc-textarea>

<!-- Inline label style -->
<mbsc-textarea label="Label" labelStyle="inline"></mbsc-textarea>

<!-- Floating label style -->
<mbsc-textarea label="Label" labelStyle="floating"></mbsc-textarea>
```

## Value binding

The textarea can be bound to a string value using either the `[(ngModel)]` or the `formControlName` directives. In this case the textarea will update it's state according to the bound value.

```html
<mbsc-textarea [(ngModel)]="myBio" label="Bio" inputStyle="outline" labelStyle="floating"></mbsc-textarea>
```

<div className="option-list">

## Options

<Options />

## Events

<Events />

## Localization

<Localizations />

</div>
