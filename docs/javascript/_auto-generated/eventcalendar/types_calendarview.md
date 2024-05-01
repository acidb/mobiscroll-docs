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


### MbscCalendarEvent {#type-MbscCalendarEvent}

Interface

Properties:
 - `allDay`: *boolean*  - Specifies if the event is all day or not.
 - `bufferAfter`: *number*  - Defines a buffer time in minutes that will be displayed after the end of the event.
 - `bufferBefore`: *number*  - Defines a buffer time in minutes that will be displayed before the start of the event.
 - `cellCssClass`: *string*  - CSS class for the cell.
 - `color`: *string*  - Background color of the label.
 - `cssClass`: *string*  - CSS class for custom CSS.
 - `date`: *string &#124; object &#124; Date*  - Specifies the date of the calendar day.
 - `dragBetweenResources`: *boolean*  - Specifies whether the event is movable across resources.
 - `dragBetweenSlots`: *boolean*  - Specifies whether the event is movable across across slots.
 - `dragInTime`: *boolean*  - Specifies whether the event is movable in time.
 - `editable`: *boolean*  - Specifies if an event is editable or not. If false, drag &amp; drop and resize is not allowed.
 - `end`: *string &#124; object &#124; Date*  - Specifies the end date/time of the calendar days/cells.
 - `id`: *string &#124; number*  - A unique id for the event. If not specified, the event will get a generated id.
 - `nr`: *number*  - Occurrence number in case of recurrence.
 - `occurrenceId`: *string*  - Occurrence id in case of recurrence.
 - `original`: *ICalendarData*  - Origin of the occurrence.
 - `overlap`: *boolean*  - Specifies whether the event can be overlapped
 - `recurring`: *string &#124; [MbscRecurrenceRule](#type-MbscRecurrenceRule)*  - Specifies a recurrence rule for handling recurring days.
 - `recurringException`: *string &#124; object &#124; Date &#124; Array&lt;string &#124; object &#124; Date&gt;*  - Specifies recurring exceptions.
 - `recurringExceptionRule`: *string &#124; [MbscRecurrenceRule](#type-MbscRecurrenceRule)*  - Specifies a recurrence exception rule.
 - `resize`: *boolean*  - Specifies whether the event is resizable.
 - `resource`: *string &#124; number &#124; Array&lt;string &#124; number&gt;*  - Resource or resources of the event.
 - `slot`: *string &#124; number*  - Slot of the event
 - `start`: *string &#124; object &#124; Date*  - Specifies the start date/time of the calendar days/cells.
 - `text`: *string*  - Text of the label
 - `textColor`: *string*  - Color of the label text.
 - `timezone`: *string*  - Timezone of the event
 - `title`: *string*  - The title of the event.
 - `tooltip`: *string*  - Tooltip for the event

### MbscCalendarLabel {#type-MbscCalendarLabel}

Interface

Properties:
 - `allDay`: *boolean*  - Specifies if the label is all day or not.
 - `cellCssClass`: *string*  - CSS class for the cell.
 - `color`: *string*  - Background color of the label.
 - `cssClass`: *string*  - CSS class for custom CSS.
 - `date`: *string &#124; object &#124; Date*  - Specifies the date of the calendar day.
 - `dragBetweenResources`: *boolean*  - Specifies whether the event is movable across resources.
 - `dragInTime`: *boolean*  - Specifies whether the event is movable in time.
 - `editable`: *boolean*  - Specifies if an event is editable or not. If false, drag &amp; drop and resize is not allowed.
 - `end`: *string &#124; object &#124; Date*  - Specifies the end date/time of the calendar days/cells.
 - `nr`: *number*  - Occurrence number in case of recurrence.
 - `occurrenceId`: *string*  - Occurrence id in case of recurrence.
 - `original`: *ICalendarData*  - Origin of the occurrence.
 - `overlap`: *boolean*  - Specifies whether the event can be overlapped
 - `recurring`: *string &#124; [MbscRecurrenceRule](#type-MbscRecurrenceRule)*  - Specifies a recurrence rule for handling recurring days.
 - `recurringException`: *string &#124; object &#124; Date &#124; Array&lt;string &#124; object &#124; Date&gt;*  - Specifies recurring exceptions.
 - `recurringExceptionRule`: *string &#124; [MbscRecurrenceRule](#type-MbscRecurrenceRule)*  - Specifies a recurrence exception rule.
 - `resize`: *boolean*  - Specifies whether the event is resizable.
 - `start`: *string &#124; object &#124; Date*  - Specifies the start date/time of the calendar days/cells.
 - `text`: *string*  - Text of the label
 - `textColor`: *string*  - Color of the label text.
 - `title`: *string*  - The title of the label.
 - `tooltip`: *string*  - Tooltip for the label

### MbscCalendarMarked {#type-MbscCalendarMarked}

Interface

Properties:
 - `cellCssClass`: *string*  - CSS class for the cell.
 - `color`: *string*  - Color of the mark.
 - `cssClass`: *string*  - CSS class for custom CSS.
 - `date`: *string &#124; object &#124; Date*  - Specifies the date of the calendar day.
 - `end`: *string &#124; object &#124; Date*  - Specifies the end date/time of the calendar days/cells.
 - `markCssClass`: *string*  - CSS class for the mark.
 - `nr`: *number*  - Occurrence number in case of recurrence.
 - `occurrenceId`: *string*  - Occurrence id in case of recurrence.
 - `original`: *ICalendarData*  - Origin of the occurrence.
 - `recurring`: *string &#124; [MbscRecurrenceRule](#type-MbscRecurrenceRule)*  - Specifies a recurrence rule for handling recurring days.
 - `recurringException`: *string &#124; object &#124; Date &#124; Array&lt;string &#124; object &#124; Date&gt;*  - Specifies recurring exceptions.
 - `recurringExceptionRule`: *string &#124; [MbscRecurrenceRule](#type-MbscRecurrenceRule)*  - Specifies a recurrence exception rule.
 - `start`: *string &#124; object &#124; Date*  - Specifies the start date/time of the calendar days/cells.

### MbscTimezonePlugin {#type-MbscTimezonePlugin}

Interface

Properties:
 - `createDate`: *(s: any, year: string &#124; number &#124; Date &#124; MbscTimezonedDate, month: number, date: number, h: number, min: number, sec: number, ms: number) => MbscTimezonedDate* 
 - `parse`: *(date: string &#124; number, s: any) => MbscTimezonedDate* 

