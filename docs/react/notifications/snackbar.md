---
sidebar_label: Snackbar
displayed_sidebar: reactSidebar
---

import Options from '../\_auto-generated/snackbar/options.md';
import Events from '../\_auto-generated/snackbar/events.md';

# Snackbar

Snackbars provide brief feedback after an action through a message at the bottom of the screen.
A snackbar may contain an action, such as "Undo" or "Retry".
Snackbars don't lock the app's main interface and are automatically dismissed after a while.

## Usage

The following example displays a snackbar message on button click.

```jsx
import { useState, useMemo } from 'react';
import { Snackbar, Button } from '@mobiscroll/react';

function App() {
  const [isSnackOpen, setSnackOpen] = useState(false);
  const closeMessage = () => setSnackOpen(false);
  const showMessage = () => setSnackOpen(true);

  const retryButton = useMemo(() => {
    const actionButton = {
      text: 'Retry',
      action: () => {
        console.log('Retrying...');
      }
    };
    return actionButton;
  });

  return <>
    <Snackbar
      isOpen={isSnackOpen}
      onClose={closeMessage}
      message="Connection timed out. Showing limited messages."
      button={retryButton}
    />
    <Button onClick={showMessage}>Snackbar message!</Button>
  </>
}
```

<div className="option-list">

## Options
Explore the following API options that help you easily configure the Snackbars.

<Options />

## Events
The Snackbars ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

</div>
