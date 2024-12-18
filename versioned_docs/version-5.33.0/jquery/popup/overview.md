---
sidebar_position: 1
sidebar_label: Overview
displayed_sidebar: jquerySidebar
---

# Popup

The Popup component provides a frame for all your popover needs, able to render custom content, forms or combined views.

Use it for contextual pop-ups, data-entry or to inform users in a consistent way with all other Mobiscroll components.

## Usage

The following example will create a popup with static content. When clicked or tapped the overlay, the Popup will close:

```html
<div id="myDiv">
  <h3>Hi</h3>
  <p>Are you feeling good today?</p>
</div>
```
```js
const inst = $('#myDiv').mobiscroll().popup().mobiscroll('getInst');
inst.open();
```
