---
sidebar_label: Alert
displayed_sidebar: reactSidebar
---

import Options from '../\_auto-generated/alert/options.md';
import Events from '../\_auto-generated/alert/events.md';
import Localizations from '../\_auto-generated/alert/localizations.md';

# Alert

An alert dialog notifies or warns the user about something. It displays a single button which closes the alert.

## Usage

The following example displays an alert message on button click.

```jsx
import { useState } from 'react';
import { Alert, Button } from '@mobiscroll/react';

function App() {
  const [isAlertOpen, setAlertOpen] = useState(false);
  const closeAlert = () => setAlertOpen(false);
  const alert = () => setAlertOpen(true);
  return <>
    <Alert
      isOpen={isAlertOpen}
      onClose={closeAlert}
      title="Cellular Data is Turned Off for 'Safari'"
      message="You can turn on cellular data for this app in Settings."
    />
    <Button onClick={alert}>Alert!</Button>
  </>
}
```

<div className="option-list">

## Options
Explore the following API options that help you easily configure the Alert.

<Options />

## Localization
The Alert is fully localized. This covers date and time format, button copy, rtl and more.

<Localizations />

## Events
The Alert ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

</div>
