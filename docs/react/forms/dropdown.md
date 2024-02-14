---
sidebar_label: Dropdown
displayed_sidebar: reactSidebar
---

import Options from '../\_auto-generated/dropdown/options.md';
import Events from '../\_auto-generated/dropdown/events.md';
import Localizations from '../\_auto-generated/dropdown/localizations.md';

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

Use the value and the onChange props to bind the selected value to dropdown.

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

<Options />

## Events

<Events />

## Localization

<Localizations />

</div>
