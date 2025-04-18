---
sidebar_position: 7
sidebar_label: Stepper
displayed_sidebar: reactSidebar
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

```jsx
import { Stepper } from '@mobiscroll/react';

function App() {
  return <Stepper label="Label" />;
}
```

## Value binding

Use the `value` and the `onChange` props to set a value just as you would with a native input element.

```jsx
import { useState } from 'react';
import { Stepper } from '@mobiscroll/react';

function App() {
  const [myStep, setMyStep] = useState(0);
  const stepsChange = (ev) => setMyStep(ev.target.value);

  return <Stepper label="My Steps" value={myStep} onChange={stepsChange}  />;
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
