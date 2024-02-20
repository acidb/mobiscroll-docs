---
sidebar_position: 3
sidebar_label: Return value
displayed_sidebar: angularSidebar
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import Content from '../../_shared/datepicker/return_value.mdx';

# Return value

<Content />

Example on how to pass Moment.js to the Datepicker:

<Tabs defaultValue="ts">
<TabItem value="html" label="app.component.html">

```html
<mbsc-datepicker returnFormat="moment" [moment]="theMomentLib"></mbsc-datepicker>
```

</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
// highlight-next-line
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // highlight-next-line
  theMomentLib = moment;
}
```

</TabItem>
</Tabs>