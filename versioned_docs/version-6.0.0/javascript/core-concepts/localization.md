---
sidebar_position: 5
sidebar_label: Localization
displayed_sidebar: javascriptSidebar
title: Localization
toc_max_heading_level: 2
---

import AllLocalizations from '../_auto-generated/localizations.md';

## Overview

The Mobiscroll components offer comprehensive localization features, ensuring they can be seamlessly integrated into any project worldwide.

These features include:
- the ability to format dates and times according to regional preferences
- the components allow for the customization of button labels and other interface text, making it easy to translate these elements into any language
- support for right-to-left (RTL) text direction, which is essential for languages like Arabic and Hebrew

These localization capabilities ensure that Mobiscroll components provide a user-friendly and culturally appropriate experience for users across different regions and languages.

## Localization options for components

- [Date & time picker](/javascript/datepicker/api#localization)
- [Event Calendar](/javascript/eventcalendar/api#localization)
- [Select](/javascript/select/api#localization)
- [Popup](/javascript/popup/api#localization)
- Forms - check out the localization options under the different Form components - Localization section
  - [Alert](/javascript/notifications/alert#localization)
  - [Confirm](/javascript/notifications/confirm#localization)
  - [Prompt](/javascript/notifications/prompt#localization)
  - [Button](/javascript/forms/button#localization)
  - [Checkbox](/javascript/forms/checkbox#localization)
  - [Dropdown](/javascript/forms/dropdown#localization)
  - [Input](/javascript/forms/input#localization)
  - [Radio button](/javascript/forms/radio#localization)
  - [Segmented](/javascript/forms/segmented#localization)
  - [Stepper](/javascript/forms/stepper#localization)
  - [Switch](/javascript/forms/switch#localization)
  - [Textarea](/javascript/forms/textarea#localization)

## Localization options

Here is a comprehensive list of all the localization options for Mobiscroll components.

<div className="option-list">

<AllLocalizations />

</div>

## Language modules

We offer and support a number of translations for the Mobiscroll library. If you don't find the language you're looking for, no problem. It's easy to create a language module that you can use.

The `locale` option can be used to set the language of a component. It takes an object, that should contain the translations of the texts used in the component. The supported languages can be set directly from the mobiscroll bundle.

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

mobiscroll.eventcalendar('#myexample', {
  locale: myLocale
});
```

The exact properties for each component can be found [above](#localization-options-for-components).

For typescript environments, the `MbscLocale` type can also be used as the base type for the locale object.

```ts title='Example with types'
import { MbscLocale } from 'path/to/mobiscroll';

const myLocale: MbscLocale = {
    setText: 'Ok',
    cancelText: 'Mégse'
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