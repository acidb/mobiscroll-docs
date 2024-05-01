### MbscPopupButton {#type-MbscPopupButton}

Interface

Properties:
 - `color`: *"primary" &#124; "secondary" &#124; "success" &#124; "danger" &#124; "warning" &#124; "info" &#124; "dark" &#124; "light"* 
 - `cssClass`: *string* 
 - `disabled`: *boolean* 
 - `handler`: *[MbscPopupPredefinedButton](#type-MbscPopupPredefinedButton) &#124; (event: any) => void*  - The handler of the button, which will run when the button is pressed.
 - `icon`: *string* 
 - `keyCode`: *number &#124; "enter" &#124; "esc" &#124; "space" &#124; Array&lt;number &#124; "enter" &#124; "esc" &#124; "space"&gt;* 
 - `name`: *[MbscPopupPredefinedButton](#type-MbscPopupPredefinedButton)* 
 - `text`: *string* 
 - `variant`: *"standard" &#124; "flat" &#124; "outline"* 

### MbscPopupPredefinedButton {#type-MbscPopupPredefinedButton}

"set" &#124; "cancel" &#124; "ok" &#124; "close"


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

### MbscDateType {#type-MbscDateType}

string &#124; Date &#124; object


### MbscDatepickerControl {#type-MbscDatepickerControl}

"calendar" &#124; "date" &#124; "time" &#124; "datetime" &#124; "timegrid"


### MbscPopupDisplay {#type-MbscPopupDisplay}

"center" &#124; "bottom" &#124; "top" &#124; "anchored" &#124; "inline" &#124; "bubble"


### MbscTimezonePlugin {#type-MbscTimezonePlugin}

Interface

Properties:
 - `createDate`: *(s: any, year: string &#124; number &#124; Date &#124; MbscTimezonedDate, month: number, date: number, h: number, min: number, sec: number, ms: number) => MbscTimezonedDate* 
 - `parse`: *(date: string &#124; number, s: any) => MbscTimezonedDate* 

