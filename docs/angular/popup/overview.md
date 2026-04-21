---
sidebar_position: 1
sidebar_label: Overview
displayed_sidebar: angularSidebar
description: 'Mobiscroll Popup for Angular — a configurable modal, bottom-sheet, or popover container for custom overlay content.'
---

# Popup

The Popup component provides a frame for all your popover needs, able to render custom content, forms or combined views.

Use it for contextual pop-ups, data-entry or to inform users in a consistent way with all other Mobiscroll components.

## Usage

The following example will create a popup with static content. When clicked or tapped the overlay, the Popup will close:

```html
<mbsc-popup [isOpen]="isPopupOpen" (onClose)="closePopup()">
  <h3>Hi</h3>
  <p>Are you feeling good today?</p>
</mbsc-popup>
```
```ts
import { Component } from '@angular/core';

@Component({...})
export class MyComponent {
  isPopupOpen = true;
  closePopup() {
    this.isPopupOpen = false;
  }
}
```

