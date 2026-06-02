---
sidebar_position: 4
sidebar_label: Snackbar
displayed_sidebar: reactSidebar
description: 'Display transient Snackbar notifications with the Mobiscroll Snackbar in React — auto-dismiss messages with optional action buttons.'
---

import Options from '../\_auto-generated/snackbar/options.md';
import Events from '../\_auto-generated/snackbar/events.md';

# Snackbar

The Snackbar component provides brief feedback after an action through a message at the bottom of the screen.
A Snackbar may contain an action, such as "Undo" or "Retry".
Snackbars don't lock the app's main interface and are automatically dismissed after a while.

## Usage

The following example displays a Snackbar message on button click.

```jsx
import { useState, useMemo } from 'react';
import { Snackbar, Button } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

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

## Custom content

For rich or formatted content, pass JSX children directly to the Snackbar component instead of the `message` prop.

```jsx
import { useState } from 'react';
import { Snackbar, Button } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

function App() {
  const [isSnackOpen, setSnackOpen] = useState(false);
  const closeMessage = () => setSnackOpen(false);
  const showMessage = () => setSnackOpen(true);

  return <>
    <Snackbar isOpen={isSnackOpen} onClose={closeMessage}>
      Connection failed: <strong>check your network</strong>
    </Snackbar>
    <Button onClick={showMessage}>Snackbar message!</Button>
  </>
}
```

<div className="option-list">

## Options
Explore the following API options that help you easily configure the Snackbar component.

<Options />

## Events
The Snackbar component ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

</div>
