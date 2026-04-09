---
sidebar_position: 7
sidebar_label: Using with Typescript
displayed_sidebar: jquerySidebar
title: Using with Typescript
description: 'Use Mobiscroll with TypeScript in jQuery projects — type definitions, typed options, and event handler type safety.'
---

## Overview

Mobiscroll for JQuery comes with type definitions files, that allow better usage in typescript environments.

## Installing types

Type definition files come with the extension `*.d.ts` and are included in every Mobiscroll package. Installing and importing the mobiscroll package makes the types available as well.

## Example installing and using the types with npm

```jsx
$ mobiscroll config jquery
```

After installation the package needs to be imported into the app with the needed types:

```jsx
import { Datepicker, MbscDatepickerOptions, registerComponent } from '@mobiscroll/jquery';
import '@mobiscroll/jquery/dist/css/mobiscroll.min.css';
```

## Usage

```jsx
import $ from 'jquery';
import * as mobiscroll from '@mobiscroll/jquery';
import { MbscDatepickerOptions } from '@mobiscroll/jquery';
import '@mobiscroll/jquery/dist/css/mobiscroll.min.css';

registerComponent(Datepicker);

// Declaring the options with the type gives auto-suggest for the available options
const options: MbscDatepickerOptions = {
    theme: 'ios',
    calendarScroll: 'vertical'
};

// Initializing the calendar
const myInput = $('#myID').mobiscroll().datepicker(options);

// Getting the reference of the instance
const inst: Calendar = myInput.mobiscroll('getInst') as Datepicker;

// Calling instance methods
inst.setVal(new Date());
inst.open();
```