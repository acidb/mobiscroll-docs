---
sidebar_position: 2
sidebar_label: Data binding
displayed_sidebar: reactSidebar
---

import DataOptionContent from '../../_shared/select/data-option.mdx';
import GroupOptionContent from '../../_shared/select/group-options.mdx';

# Data binding

<DataOptionContent />

#### Example with numbers as values

```jsx title="Department selection example"
import { useState } from 'react';
import { Select } from '@mobiscroll/react';

function App() {
  const [myData] =  useState([
    { text: 'Marketing', value: 1 },
    { text: 'Sales', value: 2 },
    { text: 'Support', value: 3 },
    { text: 'Development', value: 4 },
  ]);

  const [selectedDepartmentID, setSelectedDepartmentID] = useState(null);
  const departmentChange = (args) => {
    setSelectedDepartmentID(args.value);
  }

  return <Select data={myData} value={selectedDepartmentID} onChange={departmentChange} />
}
```

#### Example with complex objects as values

```jsx title="User selection example"
import { useState } from 'react';
import { Select } from '@mobiscroll/react';

function App() {
  const [myUsers] =  useState([
    { text: 'Alice', value: { id: 123, fullName: 'Alice Cooper' }},
    { text: 'Brandon', value: { id: 456, fullName: 'Brandon Lee' }},
    { text: 'Louisa', value: { id: 789, fullName: 'Louisa Crawford'}},
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const mySelectChange = (args) => {
    setSelectedUser(args.value);
  }

  return <Select data={myUsers} value={selectedUser} onChange={mySelectChange} />
}
```

## Group options {#grouping}

<GroupOptionContent />

```jsx
import { useState } from 'react';
import { Select } from '@mobiscroll/react';

function App() {
  const [myCountries] =  useState([{
    text: 'France',
    value: 'FR',
    group: 'Europe'
  }, {
    text: 'Hungary',
    value: 'HU',
    group: 'Europe'
  } // ...
  ]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const mySelectChange = (args) => {
    setSelectedCountry(args.value);
  }

  return <Select
    data={myCountries}
    // highlight-next-line
    showGroupWheel={true}
    value={selectedCountry}
    onChange={mySelectChange} />
}
```