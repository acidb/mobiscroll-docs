---
sidebar_position: 5
sidebar_label: Localization
displayed_sidebar: reactSidebar
title: Localization
---

import Localization from '../../_shared/core-concepts/localization.mdx';
import { toc as dataTOC } from '../../_shared/core-concepts/localization.mdx';

export const toc = [...dataTOC, { value: 'Language modules', level: 2, id: 'language-modules'}];

<Localization />

<h2 id="language-modules">Language modules</h2>

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