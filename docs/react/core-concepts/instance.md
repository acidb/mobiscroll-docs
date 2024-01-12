---
sidebar_label: Instance
displayed_sidebar: reactSidebar
---

# Instance

In object-oriented programming (OOP), an instance is a specific realization of a class. Similarly, in the scope
of the Mobiscroll library, a component instance is a realization of the component class.

The instantiation (the creation of objects from a class) in case of the Mobiscroll components is done by the React framework,
and accessing the component instances are only needed in a few specific cases.

## Getting the instance

### Inside events

A reference to the component instance is available in every Mobiscroll event as the second argument of the event handler.

```jsx
function App() {
  const myHandler = (args, inst) => {
    console.log('The Eventcalendar instance:', inst);
  }
  return <Eventcalendar onEventCreate={myHandler} />
}
```

### Using refs

To get the instance of a component there is a special prop called `ref` and a hook `useRef`. These two are usually used toghether to obtain a reference to a DOM element, but it can also be used to obtain a reference to the Mobiscroll component instances.

```jsx title="Getting the instance of a Mobiscroll Eventcalendar"
import { useRef } from "react";
import { Eventcalendar } from "@mobiscroll/react";

function App() {
  const myRef = useRef(null);
  return <Eventcalendar ref={myRef} />
}
```

The `useRef` hook returns an object with a "current" property that holds the actual value of the ref after it is available.

## Calling methods

:::caution
Calling the instance methods should be necessary only in a few selected cases. Almost every case can be solved with passing props to the component and using it's events rather than calling instance methods. Before implementing a solution, please take into consideration using props and events first.
:::

All the component methods are documented on each components API section. The methods can be called on the component instances as described in the previous section.

#### Example: Getting invalid dates for a date range

One such a case when you might need to call an instance method would be to get the invalid data for a time period from the eventcalendar. Since the invalid data you pass to the Eventcalendar can contain recurring rules, you need a way to calculate the actual occurences. Luckily the Eventcalendar has a method that will return the actual occurences for a time period.

```javascript title="Invalid rule that repeats on specific days"
const invalidsArray = [
  {
    start: '2023-10-18',
    allDay: true,
    recurring: {
      repeat: 'weekly',
      weekDays: 'MO,FR,SA',
      interval: 1
    }
  }
]
```

To get the actual invalid days for the month of November, you can call the [`getInvalids`](../eventcalendar/api.md#method-getInvalids) method of the Eventcalendar instance.

```jsx title="The invalids array needs to be passed to the eventcalendar"
<Eventcalendar ref={myCalRef} invalid={invalidsArray} />
```

```javascript
const getOccurences = () => {
  const occurences = myCalRef.current.getInvalids('2023-11-01', '2023-12-01');
  return occurences;
}
```

The result in this case will be an array of objects, each of them being an occurence of an invalid day in November.

Here's the example as a whole:

```jsx
import { useRef, useState } from 'react';
import { Button, Eventcalendar  } from '@mobiscroll/react';

function App() {
  const myCalRef = useRef(null);
  const [invalidsArray] = useState([{
    start: '2023-10-18',
    allDay: true,
    recurring: {
      repeat: 'weekly',
      weekDays: 'MO,FR,SA',
      interval: 1
    }
  }]);

  const getOccurences = () => {
    const occurences = myCalRef.current.getInvalids('2023-11-01', '2023-12-01');
    return occurences;
  }

  const logOccurences = () => {
    console.log(getOccurences());
  }

  return <>
    <Button onClick={logOccurences}>Log</Button>
    <Eventcalendar ref={myCalRef} invalid={invalidsArray} />
  </>
}
```