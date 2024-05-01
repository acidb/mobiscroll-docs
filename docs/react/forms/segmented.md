---
sidebar_label: Segmented
displayed_sidebar: reactSidebar
---

import Options from '../\_auto-generated/segmented/options.md';
import Events from '../\_auto-generated/segmented/events.md';
import Localizations from '../\_auto-generated/segmented/localizations.md';
import Types from '../\_auto-generated/segmented/types.md';

# Segmented

The Segmented component is a horizontal control made of multiple segments, each segment functioning as a button.

## Usage

In single selection mode the functionality is similar to the [radio buttons](./radio), where selecting one will deselect all others.

```jsx
import { SegmentedGroup, Segmented } from '@mobiscroll/react';

function App() {
  return <SegmentedGroup name="settings">
    <Segmented value="1" startIcon="remove">Delete</Segmented>
    <Segmented value="2" startIcon="pencil">Edit</Segmented>
    <Segmented value="3" startIcon="plus">Add</Segmented>
  </SegmentedGroup>
}
```

## Value binding

#### Single selection

Use the value and onChange props to set a value to the whole segmented group.

```jsx
import { useState } from 'react';
import { SegmentedGroup, Segmented } from '@mobiscroll/react';

function App() {
  const [myRange, setMyRange] = useState(null);
  const myRangeChange = (ev) => {
    setMyRange(ev.target.value);
  }

  return <SegmentedGroup name="controlled" value={myRange} onChange={myRangeChange}>
    <Segmented value="day">Day</Segmented>
    <Segmented value="week">Week</Segmented>
    <Segmented value="month">Month</Segmented>
    <Segmented value="year">Year</Segmented>
</SegmentedGroup>
}
```

#### Multiple selection

In multiple selection mode segments can be selected and de-selected independently from each other.

```jsx
import { useState } from 'react';
import { SegmentedGroup, Segmented } from '@mobiscroll/react';

function App() {
  const [mySelectedList, setList] = useState([]);
  const mySelectionChange = (ev) => {
    if (ev.target.checked) { // selected
      setList([...mySelectedList, ev.target.value]);
    } else { // remove from list
      setList(mySelectedList.filter(item => item !== ev.target.value));
    }
  }

  return <SegmentedGroup select="multiple" value={mySelectedList} onChange={mySelectionChange}>
    <Segmented value="one">One</Segmented>
    <Segmented value="two">Two</Segmented>
    <Segmented value="three">Three</Segmented>
  </SegmentedGroup>
}
```

The Segmented component's `checked` prop can also be used individually in a multi-selection case like this:

```jsx
import { useState } from 'react';
import { SegmentedGroup, Segmented } from '@mobiscroll/react';

function App() {
  const [users, setUsers] = useState([
    { name: 'Harry', selected: false },
    { name: 'Ron', selected: false },
    { name: 'Hermione', selected: false },
  ]);

  const toggleUser = (ev) => {
    const user = users.find(u => u.name === ev.target.value);
    user.selected = ev.target.checked;
    setUsers([...users]);
  }

  return <SegmentedGroup select='multiple'>
    {users.map(u => {
      return <Segmented key={u.name} value={u.name} checked={u.selected} onChange={toggleUser}>{u.name}</Segmented>
    })}
  </SegmentedGroup>
}
```

<div className="option-list">

## Options

<Options />

## Events

<Events />

## Localization

<Localizations />

## Types

<Types />

</div>
