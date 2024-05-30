---
sidebar_position: 5
sidebar_label: Localization
displayed_sidebar: vueSidebar
title: Localization
toc_max_heading_level: 2
---

## Overview

The Mobiscroll components offer comprehensive localization features, ensuring they can be seamlessly integrated into any project worldwide. 

These features include:
- the ability to format dates and times according to regional preferences 
- the components allow for the customization of button labels and other interface text, making it easy to translate these elements into any language 
- support for right-to-left (RTL) text direction, which is essential for languages like Arabic and Hebrew

These localization capabilities ensure that Mobiscroll components provide a user-friendly and culturally appropriate experience for users across different regions and languages.

## Localization options per components

- [Date & time picker](/vue/datepicker/api#localization)
- [Event Calendar](/vue/eventcalendar/api#localization)
- [Select](/vue/select/api#localization)
- [Popup](/vue/popup/api#localization)
- Forms - check out the localization options under the different Form components - Localization section

## Localization options

Here is a comprehensive list of all the localization options for Mobiscroll components.

<div className="option-list">

### allDayText {#localization-allDayText}

string

Text for all day events.

**Default value**: `'All-day'`

### amText {#localization-amText}

string

Text for AM.

**Default value**: `'am'`

### calendarSystem {#localization-calendarSystem}

MbscCalendarSystem

Specifies the calendar system to be used. Supported calendars:
- Gregorian - Gregorian calendar. This is the default calendar system.
- Jalali - Persian calendar. The Farsi language needs to be included to the package.
- Hijri - Hijri calendar. The Arabic language needs to be included to the package

**Default value**: `undefined`

### cancelText {#localization-cancelText}

string

Text for the &quot;Cancel&quot; button.

**Default value**: `'Cancel'`

### closeText {#localization-closeText}

string

Text for the &quot;Close&quot; button.

**Default value**: `'Close'`

### dateFormat {#localization-dateFormat}

string

The format for parsed and displayed dates:
- `M` - month of year (no leading zero)
- `MM` - month of year (two digit)
- `MMM` - month name short
- `MMMM` - month name long
- `D` - day of month (no leading zero)
- `DD` - day of month (two digit)
- `DDD` - day of week (short)
- `DDDD` - day of week (long)
- `YY` - year (two digit)
- `YYYY` - year (four digit)
- `'...'` - literal text
- `''` - single quote
- anything else - literal text

**Default value**: `'MM/DD/YYYY'`

### dateFormatFull {#localization-dateFormatFull}

string

Human readable date format, used by screen readers to read out full dates.
Characters have the same meaning as in the [dateFormat](#localization-dateFormat) option.

**Default value**: `'DDDD, MMMM D, YYYY'`

### dateFormatLong {#localization-dateFormatLong}

string

Long date format, used by the agenda view and timeline day headers.
Characters have the same meaning as in the [dateFormat](#localization-dateFormat) option.

**Default value**: `'D DDD MMM YYYY'`

### dateWheels {#localization-dateWheels}

string

Display order and formatting for month/day/year wheels. Characters have the same meaning as in the
[dateFormat](#localization-dateFormat) option. The options also controls if a specific wheel should appear or not,
e.g. use `'MMMMYYYY'` to display month and year wheels only, `'MMDDD DDYYYY'` to display both day of week and date on the day wheel.

If not specified, the order of the wheels will be taken from the [dateFormat](#localization-dateFormat) option, and the
formatting will be defined by the [theme](#opt-theme).

To display the whole date on one wheel, the format of the date should be specified between `|` characters:

```js
dateWheels: '|DDD MMM D|' // Will produce 'Sun Sep 9'
```

**Default value**: `undefined`

### dayNames {#localization-dayNames}

Array&lt;string&gt;

The list of long day names, starting from Sunday.

**Default value**: `['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']`

### dayNamesMin {#localization-dayNamesMin}

Array&lt;string&gt;

The list of minimal day names, starting from Sunday.

**Default value**: `['S', 'M', 'T', 'W', 'T', 'F', 'S']`

### dayNamesShort {#localization-dayNamesShort}

Array&lt;string&gt;

The list of abbreviated day names, starting from Sunday.

**Default value**: `['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']`

### daySuffix {#localization-daySuffix}

string

Additional string to display after the day on the wheel.

**Default value**: `undefined`

### eventText {#localization-eventText}

string

Text for the event word.

**Default value**: `'event'`

### eventsText {#localization-eventsText}

string

Text for the events word (plural).

**Default value**: `'events'`

### filterEmptyText {#localization-filterEmptyText}

string

Text for the empty state of the Select. The Select will show this message,
when [filtering](#opt-filter) is turned on and there are no results for the searched text.

**Default value**: `'No results'`

### filterPlaceholderText {#localization-filterPlaceholderText}

string

Placeholder text for the filter input, when [filtering](#opt-filter) is turned on.

**Default value**: `'Search'`

### firstDay {#localization-firstDay}

number

Set the first day of the week: Sunday is 0, Monday is 1, etc.

**Default value**: `0`

### locale {#localization-locale}

string &#124; MbscLocale

Sets the language of the component. The locale object contains all the translations for a given language.
The built in language modules are listed below. If a language is not listed, it can be provided as a
[custom language module](https://docs.mobiscroll.com/languages).

Supported values:
- Arabic: `localeAr`, `'ar'`
- Bulgarian: `localeBg`, `'bg'`
- Catalan: `localeCa`, `'ca'`
- Czech: `localeCs`, `'cs'`
- Chinese: `localeZh`, `'zh'`
- Croatian: `localeHr`, `'hr'`
- Danish: `localeDa`, `'da'`
- Dutch: `localeNl`, `'nl'`
- English: `localeEn` or `undefined`, `'en'`
- English (UK): `localeEnGB`, `'en-GB'`
- Farsi: `localeFa`, `'fa'`
- German: `localeDe`, `'de'`
- Greek: `localeEl`, `'el'`
- Spanish: `localeEs`, `'es'`
- Finnish: `localeFi`, `'fi'`
- French: `localeFr`, `'fr'`
- Hebrew: `localeHe`, `'he'`
- Hindi: `localeHi`, `'hi'`
- Hungarian: `localeHu`, `'hu'`
- Italian: `localeIt`, `'it'`
- Japanese: `localeJa`, `'ja'`
- Korean: `localeKo`, `'ko'`
- Lithuanian: `localeLt`, `'lt'`
- Norwegian: `localeNo`, `'no'`
- Polish: `localePl`, `'pl'`
- Portuguese (Brazilian): `localePtBR`, `'pt-BR'`
- Portuguese (European): `localePtPT`, `'pt-PT'`
- Romanian: `localeRo`, `'ro'`
- Russian: `localeRu`, `'ru'`
- Russian (UA): `localeRuUA`, `'ru-UA'`
- Slovak: `localeSk`, `'sk'`
- Serbian: `localeSr`, `'sr'`
- Swedish: `localeSv`, `'sv'`
- Thai: `localeTh`, `'th'`
- Turkish: `localeTr`, `'tr'`
- Ukrainian: `localeUa`, `'ua'`

**Default value**: `undefined`

### monthNames {#localization-monthNames}

Array&lt;string&gt;

The list of full month names.

**Default value**: `['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']`

### monthNamesShort {#localization-monthNamesShort}

Array&lt;string&gt;

The list of abbreviated month names.

**Default value**: `['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']`

### monthSuffix {#localization-monthSuffix}

string

Additional string to display after the month on the wheel.

**Default value**: `undefined`

### moreEventsPluralText {#localization-moreEventsPluralText}

string

Text for the &quot;more&quot; label on the calendar, when there&#039;s not enough space to display all the labels for the day,
and there are more than one extra labels.
The `{count}` inside the string will be replaced with the number of extra labels.
When not specified, the [moreEventsText](#localization-moreEventsText) option will be used for both plural and singular form.

**Default value**: `undefined`

### moreEventsText {#localization-moreEventsText}

string

Text for the &quot;more&quot; label on the calendar, when there&#039;s not enough space to display all the labels for the day.
The `{count}` inside the string will be replaced with the number of extra labels.
Use the [moreEventsPluralText](#localization-moreEventsPluralText) as well, if the plural form is different.

**Default value**: `'{count} more'`

### nextPageText {#localization-nextPageText}

string

Text for the next button in the calendar header, used as accessibility label.

**Default value**: `'Next page'`

### newEventText {#localization-newEventText}

string

Title for the newly created event with the [dragToCreate](#opt-dragToCreate) and the
[clickToCreate](#opt-clickToCreate) action.

**Default value**: `'New event'`

### noEventsText {#localization-noEventsText}

string

Text for empty event list.

**Default value**: `'No events'`

### okText {#localization-okText}

string

Text for the &quot;Ok&quot; button.

**Default value**: `'Ok'`

### pmText {#localization-pmText}

string

Text for PM.

**Default value**: `'pm'`

### prevPageText {#localization-prevPageText}

string

Text for the previous button in the calendar header, used as accessibility label.

**Default value**: `'Previous page'`

### quarterText {#localization-quarterText}

string

Text for quarter numbers in the timeline header. The {count} inside the string will be replaced with the number of the current quarter.

**Default value**: `'Q {count}'`

### rangeEndHelp {#localization-rangeEndHelp}

string

When selecting a range, it specifies the placeholder text for the end value under the [end label](#opt-showRangeLabels).

**Default value**: `'Please select'`

### rangeEndLabel {#localization-rangeEndLabel}

string

When selecting a range, it specifies the text of the [end label](#opt-showRangeLabels).

**Default value**: `'End'`

### rangeStartHelp {#localization-rangeStartHelp}

string

When selecting a range, it specifies the placeholder text for the start value under the [start label](#opt-showRangeLabels).

**Default value**: `'Please select'`

### rangeStartLabel {#localization-rangeStartLabel}

string

When selecting a range, it specifies the text of the [start label](#opt-showRangeLabels).

**Default value**: `'Start'`

### rtl {#localization-rtl}

boolean

Enables right-to-left display.

**Default value**: `false`

### selectedPluralText {#localization-selectedPluralText}

string

Specifies the plural form of the amount of selected items according to the rules of particular language. The &#039;{count}&#039; substring will
be replaced with the number of selected items.

**Default value**: `'{count} selected'`

### selectedText {#localization-selectedText}

string

Specifies the amount of selected items according to the rules of particular language. The &#039;{count}&#039; substring will be replaced with
the number of selected items.

**Default value**: `'{count} selected'`

### setText {#localization-setText}

string

Text for the &quot;Set&quot; button.

**Default value**: `'Set'`

### timeFormat {#localization-timeFormat}

string

The format for parsed and displayed times:
- `h` - 12 hour format (no leading zero)
- `hh` - 12 hour format (leading zero)
- `H` - 24 hour format (no leading zero)
- `HH` - 24 hour format (leading zero)
- `m` - minutes (no leading zero)
- `mm` - minutes (leading zero)
- `s` - seconds (no leading zero)
- `ss` - seconds (leading zero)
- `a` - lowercase am/pm
- `A` - uppercase AM/PM
- `'...'` - literal text
- `''` - single quote
- anything else - literal text

**Default value**: `'hh:mm A'`

### timeWheels {#localization-timeWheels}

string

Display order and formatting of the time wheels. Characters have the same meaning as in the
[timeFormat](#localization-timeFormat) option.

If not specified, the order of the wheels will be taken from the [timeFormat](#localization-timeFormat) option,
and the formatting will be defined by the theme.

To display the whole time on one wheel, the format of the time should be specified between `|` characters:

```js
timeWheels: '|h:mm A|' // Will produce '9:12 AM'
```

**Default value**: `undefined`

### todayText {#localization-todayText}

string

Text for the &quot;Today&quot; button.

**Default value**: `'Today'`

### weekText {#localization-weekText}

string

Text for week numbers in the timeline header. The {count} inside the string will be replaced with the number of the current week.

**Default value**: `'Week {count}'`

### yearSuffix {#localization-yearSuffix}

string

Additional string to display after the year on the wheel.

**Default value**: `undefined`

</div>

## Language modules

We offer and support a number of translations for the Mobiscroll library. If you don't find the language you're looking for, no problem. It's easy to create a language module that you can use.

The `locale` [option](https://demo.mobiscroll.com/eventcalendar/localization) can be used to set the language of a component. It takes an object, that should contain the translations of the texts used in the component. The supported languages can be set directly from the mobiscroll bundle.

```html title='Locale option usage'
<template>
  <MbscEventcalendar :locale="localeDe" />
</template>
```

Creating your own locale object is simple as creating an object in JavaScript. For example, the Cancel button on many Mobiscroll components uses the `cancelText` property. If you want to provide a translation for it, the locale object would look like this:

```html title='Creating a locale object'
<script setup>
const myLocale = {
    cancelText: 'Mégse'
}
</script>

<template>
  <MbscEventcalendar :locale="myLocale" />
</template>
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