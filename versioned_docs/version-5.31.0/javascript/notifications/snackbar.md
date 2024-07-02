---
sidebar_label: Snackbar
displayed_sidebar: javascriptSidebar
---

import Options from '../\_auto-generated/snackbar/options.md';
import Events from '../\_auto-generated/snackbar/events.md';

# Snackbar

The Snackbar component provide brief feedback after an action through a message at the bottom of the screen.
A Snackbar may contain an action, such as "Undo" or "Retry".
Snackbars don't lock the app's main interface and are automatically dismissed after a while.

## Usage

The following example displays a Snackbar message with a "Retry" button:

```js
mobiscroll.snackbar({
  message: "Connection timed out. Showing limited messages.",
  button: {
    text: 'Retry',
    action: () => {
      console.log('Retrying...');
    }
  }
});
```

<div className="option-list">

## Options
Explore the following API options that help you easily configure the Snackbar component.

<Options />

## Events
The Snackbar component ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

</div>
