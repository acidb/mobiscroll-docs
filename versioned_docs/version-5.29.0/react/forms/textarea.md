---
sidebar_label: Textarea
displayed_sidebar: reactSidebar
---

import Options from '../\_auto-generated/textarea/options.md';
import Events from '../\_auto-generated/textarea/events.md';
import Localizations from '../\_auto-generated/textarea/localizations.md';

# Textarea

The Textarea component can be used for collecting information from the user in the form of multi-line text.

## Usage

Use the [`label`](#opt-label) option to provide a label to the textarea.

```jsx
import { Textarea } from '@mobiscroll/react';

function App() {
  return <Textarea label="Label" />
}
```

## Value binding

Use the `value` and the `onChange` props to set a value just as you would with a native input element.

```jsx
import { useState } from 'react';
import { Textarea } from '@mobiscroll/react';

function App() {
  const [text, setText] = useState('');
  const textChange = (ev) => setText(ev.target.value);
  return <Textarea label="Label" value={text} onChange={textChange} />
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
