---
sidebar_label: Switch
displayed_sidebar: reactSidebar
---

import Options from '../\_auto-generated/switch/options.md';
import Events from '../\_auto-generated/switch/events.md';
import Localizations from '../\_auto-generated/switch/localizations.md';

# Switch

The Switch component is a two value control. It is like a physical toggle switch, it has an on and an off state that is represented as a boolean value.

## Usage

Use the [`label`](#opt-label) option to provide a label to the switch.
The switch can be positioned before or after the label using the [`position`](#opt-position) option.

```jsx
import { Switch } from '@mobiscroll/react';

function App() {
  return <>
    <Switch label="Switch" />
    <Switch label="Switch at the start" position="start" />
    <Switch label="Switch at the end" position="end" />
  </>
}
```

## Value binding

Use the `checked` and the `onChange` props to set the switch on and off state just as you would with a native input element of type checkbox.

```jsx
import { useState } from 'react';
import { Switch } from '@mobiscroll/react';

function App() {
  const [isOn, setSwitch] = useState(false);
  const switchChange = (ev) => setSwitch(ev.target.checked);
  return <>
    <Switch label="Switch" checked={isOn} onChange={switchChange} />
  </>
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
