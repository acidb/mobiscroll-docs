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
### firstDay {#localization-firstDay}

number

Set the first day of the week: Sunday is 0, Monday is 1, etc.

**Default value**: `0`
### locale {#localization-locale}

[MbscLocale](#type-MbscLocale)

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
### monthNames {#localization-monthNames}

Array&lt;string&gt;

The list of full month names.

**Default value**: `['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']`
### monthNamesShort {#localization-monthNamesShort}

Array&lt;string&gt;

The list of abbreviated month names.

**Default value**: `['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']`
### newEventText {#localization-newEventText}

string

Title for the newly created event with the [dragToCreate](#opt-dragToCreate) and the
[clickToCreate](#opt-clickToCreate) action.

**Default value**: `'New event'`
### nextPageText {#localization-nextPageText}

string

Text for the next button in the calendar header, used as accessibility label.

**Default value**: `'Next page'`
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
### rtl {#localization-rtl}

boolean

Enables right-to-left display.

**Default value**: `false`
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
### todayText {#localization-todayText}

string

Text for the &quot;Today&quot; button.

**Default value**: `'Today'`
### weekText {#localization-weekText}

string

Text for week numbers in the timeline header. The {count} inside the string will be replaced with the number of the current week.

**Default value**: `'Week {count}'`