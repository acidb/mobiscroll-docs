---
sidebar_position: 3
sidebar_label: Instance
displayed_sidebar: javascriptSidebar
title: Instance
---

## Overview

In object-oriented programming (OOP), an instance is a specific realization of a class. Similarly, in the scope
of the Mobiscroll library, a component instance is a realization of the component class.

The instantiation (the creation of objects from a class) in case of the Mobiscroll components is done when the intialization function is called.

## Getting the instance

### Initialization

A reference to the component instance is returned by the initialization function:

```javascript
const inst = mobiscroll.eventcalendar('#my-div', { theme: 'ios' });

console.log('The Eventcalendar instance:', inst);
```

### Inside events

A reference to the component instance is available in every Mobiscroll event as the second argument of the event handler.

```javascript
mobiscroll.eventcalendar('#my-div', {
  onEventCreate: (args, inst) => {
    console.log('The Eventcalendar instance:', inst);
  },
});
```

### The `getInst` method

A reference to the component instance is also returned by the `getInst` function:

```js
mobiscroll.eventcalendar('#my-div', { theme: 'ios' });

const inst = mobiscroll.getInst('#my-div');

console.log('The Eventcalendar instance:', inst);
```

The `getInst` function also receives a second parameter. When `true` is passed to the parameter the form control instance will be returned. This is usefull when two components are initialized on the same element, for example: a mobiscroll input and a datepicker.

```html
<label>
  Mobiscroll Input
  <input id="my-inp" mbsc-input />
</label>
```
```js
mobiscroll.datepicker('#my-inp');

const instDatepicker = mobiscroll.getInst('#my-inp'); // the main component instance
const instInput = mobiscroll.getInst('#my-inp', true); // the form component instance
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
// and get the instance
const inst = mobiscroll.eventcalendar('#my-div', {
    invalid: invalidsArray
});

// query the invalid occurences
const occurences = inst.getInvalids('2023-11-01', '2023-12-01');
```

The result in this case will be an array of objects, each of them being an occurence of an invalid day in November.
