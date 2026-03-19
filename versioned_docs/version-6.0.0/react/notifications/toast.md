---
sidebar_position: 5
sidebar_label: Toast
displayed_sidebar: reactSidebar
---

import Options from '../\_auto-generated/toast/options.md';
import Events from '../\_auto-generated/toast/events.md';

# Toast

The Toast component is a simple text only notification informing the user.
They should be primarly used to display messages not necessarily related to a user action, such as background synchronization or similar.
The Toast compoennt don't lock the app's main interface and are automatically dismissed after a while.

## Usage

The following example displays a toast message on button click.

```jsx
import { useState } from 'react';
import { Toast, Button } from '@mobiscroll/react';

function App() {
  const [isToastOpen, setToastOpen] = useState(false);
  const closeMessage = () => setToastOpen(false);
  const showMessage = () => setToastOpen(true);

  return <>
    <Toast
      isOpen={isToastOpen}
      onClose={closeMessage}
      message="Message sent"
    />
    <Button onClick={showMessage}>Toast message!</Button>
  </>
}
```

<div className="option-list">

## Options
Explore the following API options that help you easily configure the Toast component.

<Options />

## Events
The Toast component ships with different event hooks for deep customization. Events are triggered through the lifecycle of the component where you can tie in custom functionality and code.

<Events />

</div>
