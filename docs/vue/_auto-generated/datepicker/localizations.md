### allDayText {#localization-allDayText}

string

Title text for the newly created event with the [dragToCreate](#opt-dragToCreate) action.

**Default value**: &#039;New event&#039;
### amText {#localization-amText}

string

Text for AM.

**Default value**: &#039;am&#039;
### dateFormat {#localization-dateFormat}

string

The format for parsed and displayed dates:
- M - month of year (no leading zero)
- MM - month of year (two digit)
- MMM - month name short
- MMMM - month name long
- D - day of month (no leading zero)
- DD - day of month (two digit)
- DDD - day of week (short)
- DDDD - day of week (long)
- YY - year (two digit)
- YYYY - year (four digit)
- &#039;...&#039; - literal text
- &#039;&#039; - single quote
- anything else - literal text

**Default value**: &#039;MM/DD/YYYY&#039;
### dateFormatLong {#localization-dateFormatLong}

string

Long date format, used by the agenda view day headers. Characters have the same meaning as in the [dateFormat](#opt-dateFormat) option.

**Default value**: &#039;D DDD MMM YYYY&#039;
### dateText {#localization-dateText}

string

Text for the date word.

**Default value**: &#039;Date&#039;
### dateWheels {#localization-dateWheels}

string

Display order and formating for month/day/year wheels. Characters have the same meaning as in the
[dateFormat option](#localization-dateFormat). The options also controls if a specific wheel should appear or not,
e.g. use &#039;mmyy&#039; to display month and year wheels only, &#039;mmD ddy&#039; to display both day of week and date on the day wheel.

If not specified, the order of the wheels will be taken from the [dateFormat option](#localization-dateFormat), and the
formating will be defined by the theme.

Starting for 3.0.0-beta5 an experimental feature was introduced to display the whole date on one wheel. To activate this mode,
the format of the date should be specified between | charchters:
```js
dateWheels: '|D M d|' // Will produce 'Sun Sep 9'
```

**Default value**: undefined
### dayNames {#localization-dayNames}

Array&lt;string&gt;

The list of long day names, starting from Sunday, for use as requested via the [dateFormat](#dateFormat) setting.

**Default value**: [&#039;Sunday&#039;, &#039;Monday&#039;, &#039;Tuesday&#039;, &#039;Wednesday&#039;, &#039;Thursday&#039;, &#039;Friday&#039;, &#039;Saturday&#039;]
### dayNamesMin {#localization-dayNamesMin}

Array&lt;string&gt;

The list of minimal day names, starting from Sunday, for use as requested via the [dateFormat](#dateFormat) setting.

**Default value**: [&#039;S&#039;, &#039;M&#039;, &#039;T&#039;, &#039;W&#039;, &#039;T&#039;, &#039;F&#039;, &#039;S&#039;]
### dayNamesShort {#localization-dayNamesShort}

Array&lt;string&gt;

The list of abbreviated day names, starting from Sunday, for use as requested via the [dateFormat](#dateFormat) setting.

**Default value**: [&#039;Sun&#039;, &#039;Mon&#039;, &#039;Tue&#039;, &#039;Wed&#039;, &#039;Thu&#039;, &#039;Fri&#039;, &#039;Sat&#039;]
### daySuffix {#localization-daySuffix}

string

Additional string to display after the day on the wheel.

**Default value**: undefined
### eventText {#localization-eventText}

string

Text for the event word.

**Default value**: &#039;event&#039;
### eventsText {#localization-eventsText}

string

Text for the events word (plural).

**Default value**: &#039;events&#039;
### firstDay {#localization-firstDay}

number

Set the first day of the week: Sunday is 0, Monday is 1, etc.

:::info
In case of the Datepicker component when [preset-range selection](#opt-select)
is used the range start day can be specified with the [firstSelectDay](#opt-firstSelectDay) option.
:::

**Default value**: 0
### locale {#localization-locale}

string &#124; object

Sets the language of the component. The locale option is an object containing all the translations for a given language.
Mobiscroll supports a number of languages listed below. If a language is missing from the list, it can also be provided by the user.
[Here&#039;s a guide on how to write language modules](https://docs.mobiscroll.com/languages).

Supported values:
- Arabic: localeAr, &#039;ar&#039;
- Bulgarian: localeBg, &#039;bg&#039;
- Catalan: localeCa, &#039;ca&#039;
- Czech: localeCs, &#039;cs&#039;
- Chinese: localeZh, &#039;zh&#039;
- Croatian: localeHr, &#039;hr&#039;
- Danish: localeDa, &#039;da&#039;
- Dutch: localeNl, &#039;nl&#039;
- English: localeEn or undefined, &#039;en&#039;
- English (UK): localeEnGB, &#039;en-GB&#039;
- Farsi: localeFa, &#039;fa&#039;
- German: localeDe, &#039;de&#039;
- Greek: localeEl, &#039;el&#039;
- Spanish: localeEs, &#039;es&#039;
- Finnish: localeFi, &#039;fi&#039;
- French: localeFr, &#039;fr&#039;
- Hebrew: localeHe, &#039;he&#039;
- Hindi: localeHi, &#039;hi&#039;
- Hungarian: localeHu, &#039;hu&#039;
- Italian: localeIt, &#039;it&#039;
- Japanese: localeJa, &#039;ja&#039;
- Korean: localeKo, &#039;ko&#039;
- Lithuanian: localeLt, &#039;lt&#039;
- Norwegian: localeNo, &#039;no&#039;
- Polish: localePl, &#039;pl&#039;
- Portuguese (Brazilian): localePtBR, &#039;pt-BR&#039;
- Portuguese (European): localePtPT, &#039;pt-PT&#039;
- Romanian: localeRo, &#039;ro&#039;
- Russian: localeRu, &#039;ru&#039;
- Russian (UA): localeRuUA, &#039;ru-UA&#039;
- Slovak: localeSk, &#039;sk&#039;
- Serbian: localeSr, &#039;sr&#039;
- Swedish: localeSv, &#039;sv&#039;
- Thai: localeTh, &#039;th&#039;
- Turkish: localeTr, &#039;tr&#039;
- Ukrainian: localeUa, &#039;ua&#039;

**Default value**: undefined
### monthNames {#localization-monthNames}

Array&lt;string&gt;

The list of full month names, for use as requested via the [dateFormat](#opt-dateFormat) setting.

**Default value**:
[&#039;January&#039;, &#039;February&#039;, &#039;March&#039;, &#039;April&#039;, &#039;May&#039;, &#039;June&#039;, &#039;July&#039;, &#039;August&#039;, &#039;September&#039;, &#039;October&#039;, &#039;November&#039;, &#039;December&#039;]
### monthNamesShort {#localization-monthNamesShort}

Array&lt;string&gt;

The list of abbreviated month names, for use as requested via the [dateFormat](#opt-dateFormat) setting.

**Default value**: [&#039;Jan&#039;, &#039;Feb&#039;, &#039;Mar&#039;, &#039;Apr&#039;, &#039;May&#039;, &#039;Jun&#039;, &#039;Jul&#039;, &#039;Aug&#039;, &#039;Sep&#039;, &#039;Oct&#039;, &#039;Nov&#039;, &#039;Dec&#039;]
### monthSuffix {#localization-monthSuffix}

string

Additional string to display after the month on the wheel.

**Default value**: undefined
### moreEventsPluralText {#localization-moreEventsPluralText}

string

Text for the &quot;more&quot; label on the calendar, when there&#039;s not enough space to display all the labels for the day,
and there are more than one extra labels. The {count} inside the string will be replaced with the number of extra labels.
When not specified, the [moreEventsText](#localization-moreEventsText) setting is used for both plural and singular form.

**Default value**: undefined
### moreEventsText {#localization-moreEventsText}

string

Text for the &quot;more&quot; label on the calendar, when there&#039;s not enough space to display all the labels for the day.
The {count} inside the string will be replaced with the number of extra labels.
Use the [moreEventsPluralText](#localization-moreEventsPluralText) as well, if the plural form is different.

**Default value**: &#039;{count} more&#039;
### nextPageText {#localization-nextPageText}

string

Text for the next page button in the calendar header, used as accessibility label.

**Default value**: &#039;Next page&#039;
### nowText {#localization-nowText}

string

Label for the [&#039;Now&#039; button](#opt-buttons).

**Default value**: 'Now'
### pmText {#localization-pmText}

string

Text for PM.

**Default value**: &#039;pm&#039;
### prevPageText {#localization-prevPageText}

string

Text for the previous page button in the calendar header, used as accessibility label.

**Default value**: &#039;Previous page&#039;
### rangeEndHelp {#localization-rangeEndHelp}

string

When selecting a range, it specifies the placeholder text for the end value under the [end label](#opt-showRangeLabels).

**Default value**: 'Please select'
### rangeEndLabel {#localization-rangeEndLabel}

string

When selecting a range, it specifies the text of the [end label](#opt-showRangeLabels).

**Default value**: 'End'
### rangeStartHelp {#localization-rangeStartHelp}

string

When selecting a range, it specifies the placeholder text for the start value under the [start label](#opt-showRangeLabels).

**Default value**: 'Please select'
### rangeStartLabel {#localization-rangeStartLabel}

string

When selecting a range, it specifies the text of the [start label](#opt-showRangeLabels).

**Default value**: 'Start'
### rtl {#localization-rtl}

boolean

Changes the component direction to left display.

**Default value**: undefined
### selectedPluralText {#localization-selectedPluralText}

string

Specifies the plural form of the amount of selected items according to the rules of particular language. The &#039;{count}&#039; substring will
be replaced with the number of selected items.

**Default value**: '{count} selected'
### selectedText {#localization-selectedText}

string

Specifies the amount of selected items according to the rules of particular language. The &#039;{count}&#039; substring will be replaced with
the number of selected items.

**Default value**: '{count} selected'
### timeFormat {#localization-timeFormat}

string

The format for parsed and displayed dates:
- h - 12 hour format (no leading zero)
- hh - 12 hour format (leading zero)
- H - 24 hour format (no leading zero)
- HH - 24 hour format (leading zero)
- m - minutes (no leading zero)
- mm - minutes (leading zero)
- s - seconds (no leading zero)
- ss - seconds (leading zero)
- a - lowercase am/pm
- A - uppercase AM/PM
- &#039;...&#039; - literal text
- &#039;&#039; - single quote
- anything else - literal text

**Default value**: &#039;hh:mm A&#039;
### timeText {#localization-timeText}

string

Text for the time word.

**Default value**: &#039;Time&#039;
### timeWheels {#localization-timeWheels}

string

Display order and formating of the time wheels on the Datepicker. Characters have the same meaning as in the
[timeFormat option](#localization-timeFormat).

If not specified, the order of the wheels will be taken from the [timeFormat option](#localization-timeFormat),
and the formating will be defined by the theme.

Starting for 3.0.0-beta5 an experimental feature was introduced to display the whole time on one wheel. To activate this mode,
the format of the time should be specified between | charchters:
```js
timeWheels: '|h:mm A|' // Will produce '9:12 AM'
```

**Default value**: undefined
### todayText {#localization-todayText}

string

Text for the &quot;Today&quot; button.

**Default value**: &#039;Today&#039;
### weekText {#localization-weekText}

string

Text for week numbers in the timeline header. The {count} inside the string will be replaced with the number of the current week.

**Default value**: &#039;Today&#039;