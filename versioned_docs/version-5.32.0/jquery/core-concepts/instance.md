---
sidebar_position: 3
sidebar_label: Instance
displayed_sidebar: jquerySidebar
title: Instance
---

## Overview

In object-oriented programming (OOP), an instance is a specific realization of a class. Similarly, in the scope
of the Mobiscroll library, a component instance is a realization of the component class.

The instantiation (the creation of objects from a class) in case of the Mobiscroll components is done when the intialization function is called.

## Getting the instance

### Inside events

A reference to the component instance is available in every Mobiscroll event as the second argument of the event handler.

```javascript
$('#my-div').mobiscroll().eventcalendar({
  onEventCreate: (args, inst) => {
    console.log('The Eventcalendar instance:', inst);
  },
});
```

### The `getInst` method

A reference to the component instance is returned by the `getInst` function:

```js
$('#my-div').mobiscroll().eventcalendar({ theme: 'ios' });

const inst = $('#my-div').mobiscroll('getInst');

console.log('The Eventcalendar instance:', inst);
```

## Calling methods

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
];
```

To get the actual invalid days for the month of November, you can call the [`getInvalids`](../eventcalendar/api#method-getInvalids) method of the Eventcalendar instance.

```javascript
// initialize the eventcalendar with the invalid rule
$('#my-div').mobiscroll().eventcalendar({
    invalid: invalidsArray
});

// get the instance
const inst = $('#my-div').mobiscroll('getInst');
// query the invalid occurences
const occurences = inst.getInvalids('2023-11-01', '2023-12-01');
```

The result in this case will be an array of objects, each of them being an occurence of an invalid day in November.