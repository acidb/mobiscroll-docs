---
sidebar_label: Value Selection
displayed_sidebar: reactSidebar
sidebar_position: 4
---

# Value Selection

The Select component can be used to select one or multiple values from a list. The values can be of any type, for example `number`, `string` or `object` as described in the [data binding](./data-binding) section.


## Single value selection

By default the Select operates in single value selection mode, but can be used to select multiple values from a list as well.

```jsx title="Selecting a single value"
import { useState } from 'react';
import { Select } from '@mobiscroll/react';

function App() {
  const [drinks] = useState([
    { text: 'Mohito', value: 'mohito'},
    { text: 'Long Island', value: 'longisland'},
    { text: 'Margarita', value: 'margarita'}
  ]);

  const [selectedValue, setSelectedValue] = useState(null);
  const myChange = (ev) => setSelectedValue(ev.value);

  return <Select data={drinks} value={selectedValue} onChange={myChange} />
}
```

## Multiple value selection

Multiselection can be enabled using the [`selectMultiple`](./api#opt-selectMultiple) option.

```jsx title="Selecting multiple items from a list"
import { useState } from 'react';
import { Select } from '@mobiscroll/react';

function App() {
  const [bonuses] = useState(['Free ticket', 'Free Drink', 'Free Hug']);

  const [selectedValues, setSelectedValues] = useState(null);
  const myChange = (ev) => setSelectedValues(ev.value);

  return <Select selectMultiple={true} data={bonuses} value={selectedValues} onChange={myChange} />
}
```
