---
sidebar_label: Confirm
displayed_sidebar: angularSidebar
---

import Options from '../\_auto-generated/confirm/options.md';
import Events from '../\_auto-generated/confirm/events.md';
import Localizations from '../\_auto-generated/confirm/localizations.md';

# Confirm

A confirm dialog is used when it is required to confirm an action.
It has two buttons, one of which confirms the action, and the other one rejects it.

## Usage

The following example displays a confirm dialog:

```ts
import { Notifications } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  constructor(public notify: Notifications) {}

  showConfirm() {
    this.notify.confirm({
      title: "Use location service?",
      message: "Help apps determine location. This means sending anonymous location data, even when no apps are running.",
      okText: "Agree",
      cancelText: "Disagree",
      onClose: (result) => {
        console.log('Result: ', result);
      }
    });
  }
}
```

<div className="option-list">

## Options

<Options />

## Localization

<Localizations />

## Events

<Events />

</div>
