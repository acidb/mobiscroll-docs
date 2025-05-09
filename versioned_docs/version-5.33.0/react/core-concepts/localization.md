---
sidebar_position: 5
sidebar_label: Localization
displayed_sidebar: reactSidebar
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

- [Date & time picker](/react/datepicker/api#localization)
- [Event Calendar](/react/eventcalendar/api#localization)
- [Select](/react/select/api#localization)
- [Popup](/react/popup/api#localization)
- Forms - check out the localization options under the different Form components - Localization section
  - [Alert](/react/notifications/alert#localization)
  - [Confirm](/react/notifications/confirm#localization)
  - [Prompt](/react/notifications/prompt#localization)
  - [Button](/react/forms/button#localization)
  - [Checkbox](/react/forms/checkbox#localization)
  - [Dropdown](/react/forms/dropdown#localization)
  - [Input](/react/forms/input#localization)
  - [Radio button](/react/forms/radio#localization)
  - [Segmented](/react/forms/segmented#localization)
  - [Stepper](/react/forms/stepper#localization)
  - [Switch](/react/forms/switch#localization)
  - [Textarea](/react/forms/textarea#localization)

## Localization options

Here is a comprehensive list of all the localization options for Mobiscroll components.

<div className="option-list">

<AllLocalizations />

</div>

## Language modules

We offer and support a number of translations for the Mobiscroll library. If you don't find the language you're looking for, no problem. It's easy to create a language module that you can use.

The `locale` option can be used to set the language of a component. It takes an object, that should contain the translations of the texts used in the component. The supported languages can be set directly from the mobiscroll bundle.

```jsx title='Locale option usage'
import { Eventcalendar, localeDe } from '@mobiscroll/react';

export function MyComponent() {
  return <Eventcalendar locale={localeDe} />;
}
```

Creating your own locale object is simple as creating an object in JavaScript. For example, the Cancel button on many Mobiscroll components uses the `cancelText` property. If you want to provide a translation for it, the locale object would look like this:

```jsx title='Creating a locale object'
import { Eventcalendar } from '@mobiscroll/react';

const myLocale = {
  cancelText: 'Mégse'
};

export function MyComponent() {
  return <Eventcalendar locale={myLocale} />;
}
```

The exact properties for each component can be found [above](#localization-options-for-components).

For typescript environments, the `MbscLocale` type can also be used as the base type for the locale object.

```tsx title='Example with types'
import { Eventcalendar, MbscLocale } from '@mobiscroll/react';

const myLocale: MbscLocale = {
  cancelText: 'Mégse'
};

export function MyComponent() {
  return <Eventcalendar locale={myLocale} />;
}
```

Here's a template to use for the locale object:

```jsx title='Template'
const myLocale = {
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