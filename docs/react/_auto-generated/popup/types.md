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

### MbscPopupPredefinedButton {#type-MbscPopupPredefinedButton}

"set" &#124; "cancel" &#124; "ok" &#124; "close"


### MbscPopupDisplay {#type-MbscPopupDisplay}

"center" &#124; "bottom" &#124; "top" &#124; "anchored" &#124; "inline" &#124; "bubble"


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

