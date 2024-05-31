---
sidebar_position: 1
sidebar_label: Overview
displayed_sidebar: reactSidebar
---

# Popup

The Popup component provides a frame for all your popover needs, able to render custom content, forms or combined views.

Use it for contextual pop-ups, data-entry or to inform users in a consistent way with all other Mobiscroll components.

## Usage

The following example will create a popup with static content. When clicked or tapped the overlay, the Popup will close:

```jsx
import { useState } from 'react';
import { Popup } from '@mobiscroll/react';

function App() {
  const [isPopupOpen, setPopupOpen] = useState(true);
  const closeThePopup = () => {
    setPopupOpen(false);
  }

  return <Popup isOpen={isPopupOpen} onClose={closeThePopup}>
    <div>
      <h3>Hi</h3>
      <p>Are you feeling good today?</p>
    </div>
  </Popup>
}
```
