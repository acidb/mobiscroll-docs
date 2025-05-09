---
sidebar_position: 2
sidebar_label: Confirm
displayed_sidebar: reactSidebar
---

import Options from '../\_auto-generated/confirm/options.md';
import Events from '../\_auto-generated/confirm/events.md';
import Localizations from '../\_auto-generated/confirm/localizations.md';

# Confirm

A confirm dialog is used when it is required to confirm an action.
It has two buttons, one of which confirms the action, and the other one rejects it.

## Usage

The following example displays a confirm dialog on button click.

```jsx
import { useState } from 'react';
import { Confirm, Button } from '@mobiscroll/react';

function App() {
  const [isOpen, setOpen] = useState(false);
  const closeConfirm = (result) => {
    console.log('Result: ', result);
    setOpen(false);
  }
  const openConfirm = () => setOpen(true);
  return <>
    <Confirm
      isOpen={isOpen}
      onClose={closeConfirm}
      title="Use location service?"
      message="Help apps determine location. This means sending anonymous location data, even when no apps are running."
      okText="Agree"
      cancelText="Disagree"
    />
    <Button onClick={openConfirm}>Please confirm!</Button>
  </>
}
```

<div className="option-list">

## Options
Explore the following API options that help you easily configure the Confirm component.

<Options />

## Localization
The Confirm component is fully localized. This covers date and time format, button copy, rtl and more.

<Localizations />

## Events
The Confirm component ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

</div>
