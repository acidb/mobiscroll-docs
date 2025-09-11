---
sidebar_position: 2
sidebar_label: Checkbox
displayed_sidebar: reactSidebar
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

```jsx
import { Checkbox } from '@mobiscroll/react';

function App() {
  return <>
    <Checkbox label="Checkbox" />
    <Checkbox label="Checkbox at the start" position="start" />
    <Checkbox label="Checkbox at the end" position="end" />
  </>
}
```

## Value binding

Use the [`checked`](#opt-checked) and the [`onChange`](#events-onChange) props to work with the Checkbox in a controlled way or the [`defaultChecked`](#opt-defaultChecked) prop in an uncontrolled way.

```jsx
import { useState } from 'react';
import { Checkbox } from '@mobiscroll/react';

function App() {
  const [myIsChecked, setChecked] = useState(false);
  const myChange = (ev) => {
    setChecked(ev.target.checked);
  }
  return <>
    <Checkbox label="Checkbox" checked={myIsChecked} onChange={myChange} />
  </>
}
```

<div className="option-list">

## Options
Explore the following API options that help you easily configure the Checkbox component.

<Options />

## Events
The Checkbox component ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

## Localization
The Checkbox component is fully localized. This covers date and time format, button copy, rtl and more.

<Localizations />

## Types

<Types />

</div>
