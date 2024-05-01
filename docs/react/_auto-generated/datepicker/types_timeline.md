### MbscCalendarColor {#type-MbscCalendarColor}

Interface

Properties:
 - `background`: *string*  - Background of the cell.
 - `cellCssClass`: *string*  - CSS class for the cell.
 - `cssClass`: *string*  - CSS class for custom CSS.
 - `date`: *string &#124; object &#124; Date*  - Specifies the date of the calendar day.
 - `end`: *string &#124; object &#124; Date*  - Specifies the end date/time of the calendar days/cells.
 - `highlight`: *string*  - Background of the circle.
 - `nr`: *number*  - Occurrence number in case of recurrence.
 - `occurrenceId`: *string*  - Occurrence id in case of recurrence.
 - `original`: *ICalendarData*  - Origin of the occurrence.
 - `recurring`: *string &#124; [MbscRecurrenceRule](#type-MbscRecurrenceRule)*  - Specifies a recurrence rule for handling recurring days.
 - `recurringException`: *string &#124; object &#124; Date &#124; Array&lt;string &#124; object &#124; Date&gt;*  - Specifies recurring exceptions.
 - `recurringExceptionRule`: *string &#124; [MbscRecurrenceRule](#type-MbscRecurrenceRule)*  - Specifies a recurrence exception rule.
 - `start`: *string &#124; object &#124; Date*  - Specifies the start date/time of the calendar days/cells.

### MbscDateType {#type-MbscDateType}

string &#124; Date &#124; object


### MbscDatepickerControl {#type-MbscDatepickerControl}

"calendar" &#124; "date" &#124; "time" &#124; "datetime" &#124; "timegrid"


### MbscLocale {#type-MbscLocale}

Interface

Properties:
 - `allDayText`: *string* 
 - `amText`: *string* 
 - `calendarSystem`: *MbscCalendarSystem* 
 - `cancelText`: *string* 
 - `clearText`: *string* 
 - `closeText`: *string* 
 - `dateFormat`: *string* 
 - `dateFormatFull`: *string* 
 - `dateFormatLong`: *string* 
 - `dateText`: *string* 
 - `dateWheelFormat`: *string* 
 - `dayNames`: *Array&lt;string&gt;* 
 - `dayNamesMin`: *Array&lt;string&gt;* 
 - `dayNamesShort`: *Array&lt;string&gt;* 
 - `daySuffix`: *string* 
 - `dayText`: *string* 
 - `eventText`: *string* 
 - `eventsText`: *string* 
 - `filterEmptyText`: *string* 
 - `filterPlaceholderText`: *string* 
 - `firstDay`: *number* 
 - `fromText`: *string* 
 - `hourText`: *string* 
 - `minuteText`: *string* 
 - `monthNames`: *Array&lt;string&gt;* 
 - `monthNamesShort`: *Array&lt;string&gt;* 
 - `monthSuffix`: *string* 
 - `monthText`: *string* 
 - `moreEventsPluralText`: *string* 
 - `moreEventsText`: *string* 
 - `nextMonthText`: *string* 
 - `nextYearText`: *string* 
 - `noEventsText`: *string* 
 - `nowText`: *string* 
 - `pmText`: *string* 
 - `prevMonthText`: *string* 
 - `prevYearText`: *string* 
 - `rangeEndHelp`: *string* 
 - `rangeEndLabel`: *string* 
 - `rangeStartHelp`: *string* 
 - `rangeStartLabel`: *string* 
 - `rtl`: *boolean* 
 - `secondText`: *string* 
 - `selectedPluralText`: *string* 
 - `selectedText`: *string* 
 - `setText`: *string* 
 - `timeFormat`: *string* 
 - `timeText`: *string* 
 - `timeWheels`: *string* 
 - `toText`: *string* 
 - `todayText`: *string* 
 - `weekText`: *string* 
 - `yearSuffix`: *string* 
 - `yearText`: *string* 

### MbscPopupButton {#type-MbscPopupButton}

Interface

Properties:
 - `color`: *"success" &#124; "dark" &#124; "light" &#124; "primary" &#124; "secondary" &#124; "danger" &#124; "warning" &#124; "info"* 
 - `cssClass`: *string* 
 - `disabled`: *boolean* 
 - `handler`: *[MbscPopupPredefinedButton](#type-MbscPopupPredefinedButton) &#124; (event: any) => void*  - The handler of the button, which will run when the button is pressed.
 - `icon`: *string* 
 - `keyCode`: *number &#124; "enter" &#124; "space" &#124; "esc" &#124; Array&lt;number &#124; "enter" &#124; "space" &#124; "esc"&gt;* 
 - `name`: *[MbscPopupPredefinedButton](#type-MbscPopupPredefinedButton)* 
 - `text`: *string* 
 - `variant`: *"outline" &#124; "standard" &#124; "flat"* 

### MbscPopupDisplay {#type-MbscPopupDisplay}

"center" &#124; "bottom" &#124; "top" &#124; "anchored" &#124; "inline" &#124; "bubble"


### MbscPopupPredefinedButton {#type-MbscPopupPredefinedButton}

"set" &#124; "cancel" &#124; "ok" &#124; "close"


### MbscRecurrenceRule {#type-MbscRecurrenceRule}

Interface

Properties:
 - `count`: *number* 
 - `day`: *number &#124; Array&lt;number&gt;* 
 - `from`: *[MbscDateType](#type-MbscDateType)* 
 - `interval`: *number* 
 - `month`: *number &#124; Array&lt;number&gt;* 
 - `pos`: *number* 
 - `repeat`: *"daily" &#124; "weekly" &#124; "monthly" &#124; "yearly"* 
 - `until`: *[MbscDateType](#type-MbscDateType)* 
 - `weekDays`: *string* 
 - `weekStart`: *string* 

### MbscTimezonePlugin {#type-MbscTimezonePlugin}

Interface

Properties:
 - `createDate`: *(s: any, year: string &#124; number &#124; Date &#124; MbscTimezonedDate, month: number, date: number, h: number, min: number, sec: number, ms: number) => MbscTimezonedDate* 
 - `parse`: *(date: string &#124; number, s: any) => MbscTimezonedDate* 

