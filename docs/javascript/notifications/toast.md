---
sidebar_label: Toast
displayed_sidebar: javascriptSidebar
---

import Options from '../\_auto-generated/toast/options.md';
import Events from '../\_auto-generated/toast/events.md';

# Toast

Toasts are simple text only notifications informing the user.
They should be primarly used to display messages not necessarily related to a user action, such as background synchronization or similar.
Toasts don't lock the app's main interface and are automatically dismissed after a while.

## Usage

The following example displays a toast message:

```js
mobiscroll.toast({
  message: "Message sent"
});
```

<div className="option-list">

## Options
Explore the following API options that help you easily configure the Toasts.

<Options />

## Events
The Toasts ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

</div>
