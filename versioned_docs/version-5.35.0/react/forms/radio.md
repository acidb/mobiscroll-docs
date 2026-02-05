---
sidebar_position: 5
sidebar_label: Radio button
displayed_sidebar: reactSidebar
---

import Options from '../\_auto-generated/radio/options.md';
import Events from '../\_auto-generated/radio/events.md';
import Localizations from '../\_auto-generated/radio/localizations.md';
import Types from '../\_auto-generated/radio/types.md';

# Radio button

Radio button component are used when the user needs to select one option from a set.

This UI component is best used when there is enough space, since all the options are visible at once.
If you need to save space, a better UI choice would be the [Dropdown](./dropdown) component,
which only displays the selected option and the others are only visible on selection.

## Usage

Use the [`label`](#opt-label) option to provide a label to the Radio button.

```jsx
import { Radio, RadioGroup } from '@mobiscroll/react';

function App() {
  return <RadioGroup name="gender">
      <Radio value="f" label="Female" />
      <Radio value="m" label="Male" />
      <Radio value="o" label="Other" />
  </RadioGroup>
}
```

## Value binding

Use the `checked` and the `onChange` props to set a value to the radio component.

```jsx
import { useState } from 'react';
import { Radio, RadioGroup } from '@mobiscroll/react';

function App() {
  const [gender, setGender] = useState('f');
  const genderChange = (ev) => {
      setGender(ev.target.value);
  }

  return <RadioGroup name="genderGroup">
      <Radio value="f" checked={gender === 'f'} onChange={genderChange} label="Female" />
      <Radio value="m" checked={gender === 'm'} onChange={genderChange} label="Male" />
      <Radio value="o" checked={gender === 'o'} onChange={genderChange} label="Other" />
  </RadioGroup>
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

</div>
