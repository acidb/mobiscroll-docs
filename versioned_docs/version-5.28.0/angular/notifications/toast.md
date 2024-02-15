---
sidebar_label: Toast
displayed_sidebar: angularSidebar
---

import Options from '../\_auto-generated/toast/options.md';
import Events from '../\_auto-generated/toast/events.md';

# Toast

Toasts are simple text only notifications informing the user.
They should be primarly used to display messages not necessarily related to a user action, such as background synchronization or similar.
Toasts don't lock the app's main interface and are automatically dismissed after a while.

## Usage

The following example displays a toast message:

```ts
import { Notifications } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  constructor(public notify: Notifications) {}

  showToast() {
    this.notify.toast({
      message: "Message sent"
    });
  }
}
```

<div className="option-list">

## Options

<Options />

## Events

<Events />

</div>
