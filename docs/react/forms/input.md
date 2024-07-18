---
sidebar_label: Input
displayed_sidebar: reactSidebar
---

import Options from '../\_auto-generated/input/options.md';
import Events from '../\_auto-generated/input/events.md';
import Localizations from '../\_auto-generated/input/localizations.md';
import Types from '../\_auto-generated/input/types.md';

# Input

The Input component can be used for collecting information from the user.

## Usage

Use the [`label`](#opt-label) option to provide a label to the input field.

```jsx
import { Input } from '@mobiscroll/react';

function App() {
  return <Input label="Label" />;
}
```

## Value binding

Use the `value` and the `onChange` props to set a value just as you would with a native input element.

```jsx
import { useState } from 'react';
import { Input } from '@mobiscroll/react';

function App() {
  const [text, setText] = useState('');
  const myTextChange = (ev) => setText(ev.target.value);

  return <Input label="Label" value={text} onChange={myTextChange} />;
}
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

## Types

<Types />

</div>
