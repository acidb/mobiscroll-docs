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


### MbscEventConnection {#type-MbscEventConnection}

Interface

Properties:
 - `arrow`: *boolean &#124; "from" &#124; "to" &#124; "bidirectional"*  - Specifies where to display arrows
 - `color`: *string*  - Specifies the color of the connection.
 - `cssClass`: *string*  - Add a specific css class to the connection for further customization
 - `from`: *string &#124; number*  - The id of the event where the connection will begin
 - `to`: *string &#124; number*  - The id of the event where the connection will end.
 - `type`: *"fs" &#124; "sf" &#124; "ss" &#124; "ff"*  - The type of the connection.
Possible values: &#039;fs&#039; - finish-to-start, &#039;sf&#039; - start-to-finish, &#039;ss&#039; - start-to-start, &#039;ff&#039; - finish-to-finish.

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

### MbscResource {#type-MbscResource}

Interface

Properties:
 - `background`: *string*  - Specifies the background color of the resource row or column.
 - `children`: *Array&lt;[MbscResource](#type-MbscResource)&gt;*  - Child resources.
 - `collapsed`: *boolean*  - Specifies the displayed state of the child resource group.
 - `color`: *string*  - Specifies the default event color of the resource.
 - `cssClass`: *string*  - Specifies a css class for the resource row or column.
 - `depth`: *number*  - Depth of the resource in the resource tree.
 - `eventCreation`: *boolean*  - Disables event creation on specific resources by setting it to false. Defaults to true, if not specified.
 - `eventDragBetweenResources`: *boolean*  - Specifies whether the events in this resource are movable across resources.
 - `eventDragBetweenSlots`: *boolean*  - Specifies whether the events in this slots are movable across slots.
 - `eventDragInTime`: *boolean*  - Specifies whether the events in this resource are movable in time.
 - `eventOverlap`: *boolean*  - Specifies whether the events in this resource can be overlapped
 - `eventResize`: *boolean*  - Specifies whether the events in this resource are resizable.
 - `fixed`: *boolean*  - Specifies whether the resource is fixed to the top.
 - `id`: *string &#124; number* 
 - `isParent`: *boolean*  - Will be true for resources with children.
 - `name`: *string*  - Specifies the name of the resource.
 - `original`: *[MbscResource](#type-MbscResource)*  - The original resource object.

### MbscSlot {#type-MbscSlot}

Interface

Properties:
 - `color`: *string* 
 - `eventDragBetweenSlots`: *boolean*  - Specifies whether the event is movable across slots.
 - `id`: *string &#124; number*  - This is an id that can be referenced in the events/invalids/colors data.
 - `name`: *string*  - The name of the slot that will be displayed at the top of the slot column.

### MbscTimezonePlugin {#type-MbscTimezonePlugin}

Interface

Properties:
 - `createDate`: *(s: any, year: string &#124; number &#124; Date &#124; MbscTimezonedDate, month: number, date: number, h: number, min: number, sec: number, ms: number) => MbscTimezonedDate* 
 - `parse`: *(date: string &#124; number, s: any) => MbscTimezonedDate* 

### MbscEventcalendarView {#type-MbscEventcalendarView}

Interface

Properties:
 - `agenda`: *{scrollable: boolean, size: number, type: "day" &#124; "month" &#124; "year" &#124; "week"}* 
 - `calendar`: *{count: boolean, labels: number &#124; boolean &#124; "all", outerDays: boolean, popover: boolean, popoverClass: string, scroll: "horizontal" &#124; "vertical", size: number, type: "month" &#124; "year" &#124; "week", weekNumbers: boolean}* 
 - `schedule`: *{allDay: boolean, currentTimeIndicator: boolean, days: boolean, endDay: number, endTime: string, maxEventStack: number &#124; "all" &#124; "auto", minEventWidth: number, size: number, startDay: number, startTime: string, timeCellStep: number, timeLabelStep: number, timezones: Array&lt;string &#124; MbscSchedulerTimezone&gt;, type: "day" &#124; "month" &#124; "week"}* 
 - `timeline`: *{allDay: boolean, currentTimeIndicator: boolean, days: boolean, endDay: number, endTime: string, eventList: boolean, maxEventStack: number &#124; "all", resolution: "day" &#124; "hour" &#124; "month" &#124; "year" &#124; "week" &#124; "quarter", resolutionHorizontal: "day" &#124; "hour" &#124; "month" &#124; "year" &#124; "week" &#124; "quarter", resolutionVertical: "day", rowHeight: "variable" &#124; "equal", size: number, startDay: number, startTime: string, timeCellStep: number, timeLabelStep: number, type: "day" &#124; "month" &#124; "year" &#124; "week", virtualScroll: boolean, weekNumbers: boolean}* 

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

