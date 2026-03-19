---
sidebar_position: 2
sidebar_label: Data binding
displayed_sidebar: angularSidebar
---

import DataOptionContent from '../../_shared/select/data-option.mdx';
import GroupOptionContent from '../../_shared/select/group-options.mdx';

# Data binding

## Data option

<DataOptionContent />

#### Example with numbers as values

```html title="Department selection example"
<mbsc-select [data]="myData" [(ngModel)]="selectedValue"></mbsc-select>
```
```ts
import { MbscSelectData } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  myData: MbscSelectData = [
    { text: 'Marketing', value: 1 },
    { text: 'Sales', value: 2 },
    { text: 'Support', value: 3 },
    { text: 'Development', value: 4 },
  ];

  selectedValue: number = 2;
}
```

#### Example with complex objects as values

```html title="Department selection example"
<mbsc-select [data]="myData" [(ngModel)]="mySelectedUser"></mbsc-select>
```
```ts
import { MbscSelectData } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  myData: MbscSelectData = [
    { text: 'Alice', value: { id: 123, fullName: 'Alice Cooper' }},
    { text: 'Brandon', value: { id: 456, fullName: 'Brandon Lee' }},
    { text: 'Louisa', value: { id: 789, fullName: 'Louisa Crawford'}},
  ];

  mySelectedUser: MyUser | null = null;
}
```

### Dynamic or async data

The select component supports dynamic data binding. For cases when the data is not immediately available or when the data changes with time (new options are added, or others removed) this feature is the most usefull.

## Group options {#grouping}

<GroupOptionContent />

```html
<mbsc-select [data]="myCountries" [showGroupWheel]="true" [(ngModel)]="selected"></mbsc-select>
```
```ts
import { MbscSelectData } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  myCountries: MbscSelectData = [{
    text: 'France',
    value: 'FR',
    group: 'Europe'
  }, {
    text: 'Hungary',
    value: 'HU',
    group: 'Europe'
  } // ...
  ];

  selected: string = 'HU';
}
```

## Data through templates

Just like the native `<select>` element has `<option>` elements as children, that define selection options, the Mobiscroll Select component has `<mbsc-select-option>` components.

This can come in handy, when there are only a few number of options that are always the same to choose from.

```html
<mbsc-select [(ngModel)]="gender" label="Gender">
    <mbsc-select-option value="female">Female</mbsc-select-option>
    <mbsc-select-option value="male">Male</mbsc-select-option>
</mbsc-select>
```

## Native elements

The Mobiscroll Select can also be used as a directive. This can be usefull when using the select with custom components, or custom styled native elements.

The select directive can be used on native elements: `<input />` or `<select>`.

When using the select directive on an `<input />`, the [`data`](./api#opt-data) option must be provided.

```html title="Using with an input"
<label>My Input
    <input [(ngModel)]="selected" mbsc-select [data]="myData" />
</label>
```

When using the select directive with `<select>` elements, the options will be read from the `<option>` elements.

```html title="Using with a select"
<label>My Select
    <select [(ngModel)]="gender" mbsc-select>
        <option value="female">Female</option>
        <option value="male">Male</option>
    </select>
</label>
```

### Working with Ionic

Ionic is a good example for custom components usage. For instance, the select directive can be used on an `<ion-input>` component, thus one can have the selection handled by the select and at the same time maintain the style of an ionic form.

```html
<ion-item>
    <ion-label>My Label</ion-label>
    <ion-input [(ngModel)]="selected" mbsc-select [data]="myData"></ion-input>
</ion-item>
```
