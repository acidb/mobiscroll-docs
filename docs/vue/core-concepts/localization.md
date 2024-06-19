---
sidebar_position: 5
sidebar_label: Localization
displayed_sidebar: vueSidebar
title: Localization
---

import LocalizationOverview from '../../_shared/core-concepts/localization_overview.mdx';

import LocalizationAlloptions from '../../_shared/core-concepts/localization_alloptions.mdx';

import LocalizationAllcomponentsList from '../../_shared/core-concepts/localization_allcomponents_list.mdx';

import { toc as dataTOC } from '../../_shared/core-concepts/localization_overview.mdx';

export const toc = [...dataTOC, 
  { value: 'Language modules', level: 2, id: 'language-modules'},
  { value: 'Using the locale option', level: 3, id: 'using-the-locale-option'},
  { value: 'Creating custom locale option', level: 3, id: 'creating-custom-locale-option'},
  { value: 'Creating custom language module', level: 3, id: 'creating-custom-language-module'},
  { value: 'Localization options', level: 3, id: 'localization-options'},
  { value: 'Localization options for components', level: 2, id: 'localization-options-for-components'}
];

<LocalizationOverview />

<h2 id="language-modules">Language modules</h2>

We offer and [support a number of translations](../core-concepts/localization#localization-locale) for the Mobiscroll library. If you don't find the language you're looking for, no problem. It's easy to [create a language module](../core-concepts/localization#creating-custom-language-module) that you can use.

<h3 id="using-the-locale-option">Using the locale option</h3>

The `locale` [option](../core-concepts/localization#localization-locale) can be used to set the language of a component. It takes an object, that should contain the translations of the texts used in the component. The supported languages can be set directly from the mobiscroll bundle.

```html title='Locale option usage'
<script setup>
import { MbscEventcalendar, localeDe } from '@mobiscroll/vue'
</script>

<template>
  <MbscEventcalendar :locale="localeDe" />
</template>
```

<h3 id="creating-custom-locale-option">Creating custom locale option</h3>

Creating your own locale object is simple as creating an object in JavaScript. For example, the Cancel button on many Mobiscroll components uses the `cancelText` [property](../core-concepts/localization#localization-cancelText). If you want to provide a translation for it, the locale object would look like this:

```html title='Creating a locale object'
<script setup>
import { MbscEventcalendar } from '@mobiscroll/vue'

const myLocale = {
  cancelText: 'Mégse'
}
</script>

<template>
  <MbscEventcalendar :locale="myLocale" />
</template>
```

The exact properties for each component can be found [below](#localization-options-for-components).

For typescript environments, the `MbscLocale` type can also be used as the base type for the locale object.

```html title='Example with types'
<script setup lang="ts">
import { MbscEventcalendar } from '@mobiscroll/vue'
import type { MbscLocale } from '@mobiscroll/vue'

const myLocale: MbscLocale = {
  cancelText: 'Mégse'
}
</script>

<template>
  <MbscEventcalendar :locale="myLocale" />
</template>
```

<h3 id="creating-custom-language-module">Creating custom language module</h3>

Here's a template to use for the locale object:

```javascript title='Template'
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

<h3 id="localization-options">Localization options</h3>

<LocalizationAlloptions />

<h2 id="localization-options-for-components">Localization options for components</h2>

<LocalizationAllcomponentsList />