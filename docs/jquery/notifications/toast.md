---
sidebar_position: 5
sidebar_label: Toast
displayed_sidebar: jquerySidebar
---

import Options from '../\_auto-generated/toast/options.md';
import Events from '../\_auto-generated/toast/events.md';

# Toast

The Toast component is a simple text only notification informing the user.
They should be primarly used to display messages not necessarily related to a user action, such as background synchronization or similar.
The Toast component don't lock the app's main interface and are automatically dismissed after a while.

## Usage

The following example displays a toast message:

```js
mobiscroll.toast({
  message: "Message sent"
});
```

<div className="option-list">

## Options
Explore the following API options that help you easily configure the Toast component.

<Options />

## Events
The Toast component ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

</div>
