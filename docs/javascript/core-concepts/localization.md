---
sidebar_position: 5
sidebar_label: Localization
displayed_sidebar: javascriptSidebar
title: Localization
---

import LocalizationsEventcalendar from '../_auto-generated/eventcalendar/localizations.md';
import LocalizationsDatepicker from '../\_auto-generated/datepicker/localizations.md';

## Overview

The Mobiscroll components are fully localized:
- [Date & time picker](/javascript/datepicker/api#localization)
- [Event Calendar](/javascript/eventcalendar/api#localization)
- [Select](/javascript/select/api#localization)
- [Popup](/javascript/popup/api#localization)
- Forms

This covers date and time format, button copy, rtl and more.

## Localization options

Here is a comprehensive list of all the localization options for Mobiscroll components.



## Language modules

We offer and support a number of translations for the Mobiscroll library. If you don't find the language you're looking for, no problem. It's easy to create a language module that you can use.

The `locale` [option](https://demo.mobiscroll.com/eventcalendar/localization) can be used to set the language of a component. It takes an object, that should contain the translations of the texts used in the component. The supported languages can be set directly from the mobiscroll bundle.

```javascript title='Locale option usage'
mobiscroll.eventcalendar('#myexample', {
  locale: mobiscroll.localeDe
});
```

Creating your own locale object is simple as creating an object in JavaScript. For example, the Cancel button on many Mobiscroll components uses the `cancelText` property. If you want to provide a translation for it, the locale object would look like this:

```javascript title='Creating a locale object'
var myLocale = {
    cancelText: 'Mégse'
}
```

The exact properties for each component can be found in the localization section on the component's documentation.

For typescript environments, the `MbscLocale` type can also be used as the base type for the locale object.

```javascript title='Example with types'
import { MbscLocale } from 'path/to/mobiscroll';

const myLocale: MbscLocale = {
    setText: 'Ok',
    cancelText: 'Mégse',
};
```

Here's a template to use for the locale object:

```javascript title='Template'
var myLocale = {
    // Core
    setText: 'OK',
    cancelText: 'Mégse',
    clearText: 'Törlés',
    selectedText: '{count} kiválasztva',
    // Datetime component
    dateFormat: 'YYYY.MM.DD.',
    dateFormatLong: 'YYYY. MMM. D., DDD',
    dayNames: ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'],
    dayNamesShort: ['Va', 'Hé', 'Ke', 'Sze', 'Csü', 'Pé', 'Szo'],
    dayNamesMin: ['V', 'H', 'K', 'Sz', 'Cs', 'P', 'Sz'],
    dayText: 'Nap',
    delimiter: '.',
    hourText: 'Óra',
    minuteText: 'Perc',
    monthNames: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'],
    monthNamesShort: ['Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún', 'Júl', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'],
    monthText: 'Hónap',
    secText: 'Másodperc',
    timeFormat: 'H:mm',
    yearText: 'Év',
    nowText: 'Most',
    pmText: 'pm',
    amText: 'am',
    // Calendar component
    firstDay: 1,
    dateText: 'Dátum',
    timeText: 'Idő',
    todayText: 'Ma',
    prevMonthText: 'Előző hónap',
    nextMonthText: 'Következő hónap',
    prevYearText: 'Előző év',
    nextYearText: 'Következő év',
    closeText: 'Bezár',
    eventText: 'esemény',
    eventsText: 'esemény',
    allDayText: 'Egész nap',
    noEventsText: 'Nincs esemény',
    moreEventsText: '{count} további',
}
```