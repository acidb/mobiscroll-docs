---
sidebar_position: 6
sidebar_label: Display modes
displayed_sidebar: angularSidebar
description: "Control how the Mobiscroll Datepicker appears in Angular — inline, floating popover, bottom sheet, or full-screen modal display modes."
---

import Content from '../../_shared/display_modes.mdx';

# Display modes

<Content />

```html title="Setting a display option"
<mbsc-datepicker display="anchored"></mbsc-datepicker>
```

```ts
import { Component } from "@angular/core";
import { MbscModule } from "@mobiscroll/angular";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  standalone: true,
  imports: [MbscModule],
})
export class AppComponent {}
```
