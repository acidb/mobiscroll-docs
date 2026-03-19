---
sidebar_position: 14
sidebar_label: Print
displayed_sidebar: angularSidebar
title: Print
---

import InstallImport from '../../_shared/eventcalendar/print-install-import.mdx';
import { toc as instTOC } from '../../_shared/eventcalendar/print-install-import.mdx';

export const toc = [...instTOC,
{ value: 'Printing', level: 2, id: 'printing'}];

<InstallImport />

```ts
import { print } from '@mobiscroll/print';

@Component({...})
export class MyComponent {
  myModules = [print];
}
```
```html
<mbsc-eventcalendar [modules]="myModules"></mbsc-eventcalendar>
```

<h2 id="printing">Printing</h2>

Printing the Eventcalendar contents can be done using the print method of the Eventcalendar [instance](../core-concepts/instance). Calling this method will create a new window containing only the Eventcalendar and will invoke the print function of the browser. After the printing is done, the window should close automatically.

:::info
When you want to include more than just the Eventcalendar in your print, you can invoke the print screen of your browser. You don't have to worry about the printing styles for the eventcalendar, they will be applied in this case as well.
:::

The new window created by the print method will include all the styles and links to stylesheets from the original page. These styles will be copied over automatically, but in case you are using relative urls, the base url of the new window might not match yours. In this case, the print method can be passed a config object, with your custom `baseUrl`, to make the relative paths work. By default, the `baseUrl` will be the original pages origin.

:::caution
Popup blockers might block the created window, so you need to disable the blocker for this method to work.
:::

```ts
import { print } from '@mobiscroll/print';

@Component({...})
export class MyComponent {
  myModules = [print];
}
```
```html
<mbsc-button (click)="cal.print()">Print it!</mbsc-button>
<mbsc-eventcalendar [modules]="myModules" #cal></mbsc-eventcalendar>
```

:::info
If you want to learn more about calling instance methods check out the [instance](../core-concepts/instance) section!
:::