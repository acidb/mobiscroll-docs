---
sidebar_position: 1
sidebar_label: Overview
displayed_sidebar: angularSidebar
---

# Select

The Select component lets you pick a [single value](https://demo.mobiscroll.com/select/single-select#) or [multiple values](https://demo.mobiscroll.com/select/multiple-select#) from a list of options.

## Usage

The following example will create a Select component with four options to choose from, each of them being a city.

```html
<mbsc-select [data]="myData"></mbsc-select>
```

```ts
import { MbscSelectData } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  myData: MbscSelectData[] = [
    { text: 'Atlanta', value: 1 },
    { text: 'Berlin', value: 2 },
    { text: 'Chicago', value: 3 },
    { text: 'London', value: 4 },
  ];
}
```

For many more examples - simple and complex use-cases - check out the [select demos](https://demo.mobiscroll.com/select).