---
sidebar_position: 3
sidebar_label: Dropdown
displayed_sidebar: reactSidebar
---

import Options from '../\_auto-generated/dropdown/options.md';
import Events from '../\_auto-generated/dropdown/events.md';
import Localizations from '../\_auto-generated/dropdown/localizations.md';
import Types from '../\_auto-generated/dropdown/types.md';

# Dropdown

The Dropdown component can be used for collecting user provided information from a set of options.

## Usage

Use the [`label`](#opt-label) option to provide a label to the dropdown.

```jsx
import { Dropdown } from '@mobiscroll/react';

function App() {
  return <Dropdown label="Label">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
    <option value="4">Option 4</option>
  </Dropdown>
}
```

## Value binding

Use the `value` and the `onChange` props to bind the selected value to dropdown.

```jsx
import { useState } from 'react';
import { Dropdown } from '@mobiscroll/react';

function App() {
  const [selectedValue, setSelectedValue] = useState('3');
  const dropChange = (ev) => setSelectedValue(ev.target.value);

  return <Dropdown label="Label" value={selectedValue} onChange={setSelectedValue}>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
    <option value="4">Option 4</option>
  </Dropdown>
}
```

<div className="option-list">

## Options
Explore the following API options that help you easily configure the Dropdown component.

<Options />

## Events
The Dropdown component ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

## Localization
The Dropdown component is fully localized. This covers date and time format, button copy, rtl and more.

<Localizations />

## Types

<Types />

</div>
