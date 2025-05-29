---
sidebar_position: 5
sidebar_label: Localization
displayed_sidebar: vueSidebar
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

- [Date & time picker](/vue/datepicker/api#localization)
- [Event Calendar](/vue/eventcalendar/api#localization)
- [Select](/vue/select/api#localization)
- [Popup](/vue/popup/api#localization)
- Forms - check out the localization options under the different Form components - Localization section
  - [Alert](/vue/notifications/alert#localization)
  - [Confirm](/vue/notifications/confirm#localization)
  - [Prompt](/vue/notifications/prompt#localization)
  - [Button](/vue/forms/button#localization)
  - [Checkbox](/vue/forms/checkbox#localization)
  - [Dropdown](/vue/forms/dropdown#localization)
  - [Input](/vue/forms/input#localization)
  - [Radio button](/vue/forms/radio#localization)
  - [Segmented](/vue/forms/segmented#localization)
  - [Stepper](/vue/forms/stepper#localization)
  - [Switch](/vue/forms/switch#localization)
  - [Textarea](/vue/forms/textarea#localization)

## Localization options

Here is a comprehensive list of all the localization options for Mobiscroll components.

<div className="option-list">

<AllLocalizations />

</div>

## Language modules

We offer and support a number of translations for the Mobiscroll library. If you don't find the language you're looking for, no problem. It's easy to create a language module that you can use.

The `locale` option can be used to set the language of a component. It takes an object, that should contain the translations of the texts used in the component. The supported languages can be set directly from the mobiscroll bundle.

```html title='Locale option usage'
<script setup>
import { MbscEventcalendar, localeDe } from '@mobiscroll/vue'
</script>

<template>
  <MbscEventcalendar :locale="localeDe" />
</template>
```

Creating your own locale object is simple as creating an object in JavaScript. For example, the Cancel button on many Mobiscroll components uses the `cancelText` property. If you want to provide a translation for it, the locale object would look like this:

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

The exact properties for each component can be found [above](#localization-options-for-components).

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