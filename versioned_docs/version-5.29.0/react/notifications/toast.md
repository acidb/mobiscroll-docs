---
sidebar_label: Toast
displayed_sidebar: reactSidebar
---

import Options from '../\_auto-generated/toast/options.md';
import Events from '../\_auto-generated/toast/events.md';

# Toast

Toasts are simple text only notifications informing the user.
They should be primarly used to display messages not necessarily related to a user action, such as background synchronization or similar.
Toasts don't lock the app's main interface and are automatically dismissed after a while.

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

<Options />

## Events

<Events />

</div>
