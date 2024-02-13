---
sidebar_label: Value Selection
displayed_sidebar: angularSidebar
sidebar_position: 3
---

# Value Selection

The Select component can be used to select one or multiple values from a list. The values can be of any type, for example `number`, `string` or `object` as described in the [data binding](./data-binding) section.


## Single value selection

By default the Select operates in single value selection mode, but can be used to select multiple values from a list as well.

```html
<mbsc-select [data]="drinks" [(ngModel)]="selected"></mbsc-select>
```
```ts
import { MbscSelectData } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  drinks: MbscSelectData[] = [
    { text: 'Mohito', value: 'mohito'},
    { text: 'Long Island', value: 'longisland'},
    { text: 'Margarita', value: 'margarita'}
  ];

  selected: string | null = null;
}
```

## Multiple value selection

Multiselection can be enabled using the [`selectMultiple`](./api#opt-selectMultiple) option.

```html
<mbsc-select [data]="bonuses" [selectMultiple]="true" [(ngModel)]="selected"></mbsc-select>
```
```ts
import { MbscSelectData } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  bonuses: MbscSelectData[] = ['Free ticket', 'Free Drink', 'Free Hug'];

  selected: string[] = [];
}
```
