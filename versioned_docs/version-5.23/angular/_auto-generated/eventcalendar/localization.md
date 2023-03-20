allDayText
string
Text for all day events.

**Default value**: 

amText
string
Text for AM.

**Default value**: 

dateFormat
string
The format for parsed and displayed dates:
- 

dateFormatLong
string
Long date format, used by the agenda view day headers. Characters have the same meaning as in the [dateFormat](#dateFormat) option.

**Default value**: 

dateText
string
Text for the date word.

**Default value**: 

dayNames
Array< string >
The list of long day names, starting from Sunday, for use as requested via the [dateFormat](#dateFormat) setting.

**Default value**: 

dayNamesMin
Array< string >
The list of minimal day names, starting from Sunday, for use as requested via the [dateFormat](#dateFormat) setting.

**Default value**: 

dayNamesShort
Array< string >
The list of abbreviated day names, starting from Sunday, for use as requested via the [dateFormat](#dateFormat) setting.

**Default value**: 

eventText
string
Text for the event word.

**Default value**: 

eventsText
string
Text for the events word (plural).

**Default value**: 

firstDay
number
Set the first day of the week: Sunday is 0, Monday is 1, etc.

> In case of the Datepicker component when [preset-range selection](#presetRangeSelection)
is used the range start day can be specified with the [firstSelectDay](#firstSelectDay) option.

**Default value**: 

locale
string &#124; object
Sets the language of the component. The locale option is an object containing all the translations for a given language.
Mobiscroll supports a number of languages listed below. If a language is missing from the list, it can also be provided by the user.
[Here's a guide on how to write language modules](https://docs.mobiscroll.com/languages).

Supported values:
- Arabic: 

moreEventsPluralText
string
Text for the 

moreEventsText
string
Text for the 

newEventText
string
Title text for the newly created event with the [dragToCreate](#dragToCreate) action.

**Default value**: 

nextPageText
string
Text for the next page button in the calendar header, used as accessibility label.

**Default value**: 

noEventsText
string
Text for empty event list.

**Default value**: 

prevPageText
string
Text for the previous page button in the calendar header, used as accessibility label.

**Default value**: 

rtl
boolean
Changes the component direction to left display.

**Default value**: 

timeFormat
string
The format for parsed and displayed dates:
- 

timeText
string
Text for the time word.

**Default value**: 

todayText
string
Text for the "Today" button.

**Default value**: 

weekText
string
Text for week numbers in the timeline header. The {count} inside the string will be replaced with the number of the current week.

**Default value**: 
