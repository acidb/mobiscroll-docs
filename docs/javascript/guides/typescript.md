---
sidebar_position: 7
sidebar_label: Using with Typescript
displayed_sidebar: javascriptSidebar
title: Using with Typescript
description: Use Mobiscroll with TypeScript in JavaScript projects — type definitions, typed options, and event handler type safety.
---

## Overview

Mobiscroll for Javascript comes with type definitions files, that allow better usage in typescript environments.

## Installing types

Type definition files come with the extension `*.d.ts` and are included in every Mobiscroll package. Installing and importing the mobiscroll package makes the types available as well.

## Example installing and using the types with npm

```jsx
$ mobiscroll config javascript 
```

After installation the package needs to be imported into the app with the needed types:

```jsx
import { datepicker, Datepicker } from '@mobiscroll/javascript';
import '@mobiscroll/javascript/dist/css/mobiscroll.min.css';
```

## Usage

```jsx
// Initializing the calendar and saving the instance
const inst = datepicker('#myID', {
    theme: 'ios',
    calendarScroll: 'vertical'
}) as Datepicker;

// Calling instance methods
inst.setVal(new Date());
inst.open();
```