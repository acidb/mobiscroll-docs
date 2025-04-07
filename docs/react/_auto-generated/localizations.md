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

Text for the button which cancels the dialog.

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
### dateText {#localization-dateText}

string

Specifies the accessibility label for the date wheel.

**Default value**: `'Date'`
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
### dayText {#localization-dayText}

string

Specifies the accessibility label for the day wheel.

**Default value**: `'Day'`
### eventsText {#localization-eventsText}

string

Text for the events word (plural).

**Default value**: `'events'`
### eventText {#localization-eventText}

string

Text for the event word.

**Default value**: `'event'`
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
### groupText {#localization-groupText}

string

Specifies the accessibility label for the group wheel, when present.

**Default value**: `'Group'`
### hourText {#localization-hourText}

string

Specifies the accessibility label for the hour wheel.

**Default value**: `'Hour'`
### locale {#localization-locale}

MbscLocale

Sets the language of the component. The locale object contains all the translations for a given language.
The built in language modules are listed below. If a language is not listed, it can be provided as a
[custom language module](https://mobiscroll.com/docs/core-concepts/localization#language-modules).

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
### minuteText {#localization-minuteText}

string

Specifies the accessibility label for the minute wheel.

**Default value**: `'Minute'`
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
### monthText {#localization-monthText}

string

Specifies the accessibility label for the month wheel.

**Default value**: `'Month'`
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
### newEventText {#localization-newEventText}

string

Title for the newly created event with the [dragToCreate](#opt-dragToCreate) and the
[clickToCreate](#opt-clickToCreate) action.

**Default value**: `'New event'`
### nextPageText {#localization-nextPageText}

string

Text for the next button in the calendar header, used as accessibility label.

**Default value**: `'Next page'`
### noEventsText {#localization-noEventsText}

string

Text for empty event list.

**Default value**: `'No events'`
### okText {#localization-okText}

string

Text for the button which closes the dialog.

**Default value**: `'OK'`
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
### secondText {#localization-secondText}

string

Specifies the accessibility label for the second wheel.

**Default value**: `'Second'`
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
### timeText {#localization-timeText}

string

Specifies the accessibility label for the time wheel.

**Default value**: `'Time'`
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
### yearText {#localization-yearText}

string

Specifies the accessibility label for the year wheel.

**Default value**: `'Year'`