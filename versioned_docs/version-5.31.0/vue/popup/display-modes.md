---
sidebar_position: 2
sidebar_label: Display modes
displayed_sidebar: vueSidebar
---

# Display modes

The Popup component supports five display modes that specify where on the screen is it going to render itself:

1. `'center'` - will render the popup on the center of the screen
2. `'top'` - will render the popup on the top of the screen sliding down
3. `'bottom'` - will render the popup on the bottom of the screen sliding up
4. `'anchored'` - will render the popup above or below the element it is anchored to. The [`anchor`](./api#opt-anchor) option will specify the element to which the popup is positioned. By default it is the input element rendered by the popup.
5. `'inline'` - will render the popup into the page embedded.

```html
<MbscPopup display="anchored" :isOpen="myOpenState">
  <p>Some content inside the popup!</p>
</MbscPopup>
```

