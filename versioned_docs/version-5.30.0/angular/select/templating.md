---
sidebar_position: 8
sidebar_label: Templating
displayed_sidebar: angularSidebar
---

# Templating

The selectable options (items) on the Select UI can be customized using the [`itemTemplate`](./api#template-itemTemplate) and the [`itemHeight`](./api#opt-itemHeight) options.

The item data is accessible through the `data` property of the template parameter.

```html
<ng-template let-item>
  <div>
    <div>{{item.data.text}}</div>
    <div>{{item.data.value}}</div>
    <div>{{item.data.yourCustomProperty}}</div>
  </div>
</ng-template>
```

#### Example for adding images to items

```html
<mbsc-select [data]="countries" [itemTemplate]="flagTemplate">
  <ng-template #flagTemplate let-item>
    <div class="my-country-container">
      <img [src]="item.data.flagUrl" />
      {{item.data.text}}
    </div>
  </ng-template>
</mbsc-select>
```

```ts
import { MbscSelectData } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  countries: MbscSelectData[] = [{
      value: 'US',
      text: 'United States of America',
      flagUrl: '//urlto/usa-flag',
  }, {
      value: 'DE',
      text: 'Germany',
      flagUrl: '//urlto/german-flag',
  }, {
      value: 'FR',
      text: 'France',
      flagUrl: '//urlto/french-flag',
  }];
}
```

:::info
Every item on the Select must have the same height. For styles that go beyond the default height, the [`itemHeight`](./api#opt-itemHeight) option can be used to adjust the styling.
:::
