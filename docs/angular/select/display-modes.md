---
sidebar_position: 6
sidebar_label: Display modes
displayed_sidebar: angularSidebar
description: 'Control where the Mobiscroll Select picker renders in Angular — centered modal, top or bottom sheet, anchored popover relative to the input, or inline within the page.'
---

import Content from '../../_shared/display_modes.mdx';

# Display modes

<Content />

```html title="Setting a display option"
<mbsc-select display="anchored"></mbsc-select>
```

```ts
import { Component } from '@angular/core';
import { MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [MbscModule],
})
export class AppComponent {}
```
