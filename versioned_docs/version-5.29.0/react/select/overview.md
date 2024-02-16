---
sidebar_position: 1
sidebar_label: Overview
displayed_sidebar: reactSidebar
---

# Select

The Select component lets you pick a single value or multiple values from a list of options.

## Usage

The following example will create a Select component with four options to choose from, each of them being a city.

```jsx
import { Select } from '@mobiscroll/react';

function App() {
  const myData = [
    { text: 'Atlanta', value: 1 },
    { text: 'Berlin', value: 2 },
    { text: 'Chicago', value: 3 },
    { text: 'London', value: 4 },
  ];

  return <Select data={myData} />
}
```
