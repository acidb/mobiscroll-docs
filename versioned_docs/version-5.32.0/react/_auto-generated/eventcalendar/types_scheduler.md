### MbscCalendarColor {#type-MbscCalendarColor}

Interface

Properties:
 - `allDay`: *boolean*  - Specifies whether the date you want to color is all day or not.
 - `background`: *string*  - Background color of the cell. It can be any valid CSS color (`'red'`, `'#ff0000'`, `'rgb(255, 0, 0)'`, etc.).
 - `cellCssClass`: *string*  - CSS class for the day cell. Only applicable for the calendar view.
 - `cssClass`: *string*  - Specifies a custom CSS class for the color.
Useful when customization is needed for the background of cells and time ranges.
Only applicable for the timeline and scheduler views.
 - `date`: *string &#124; object &#124; Date*  - Specifies a single date for the color
 - `end`: *string &#124; object &#124; Date*  - Specifies the end date/time of a date/time range for the color
 - `highlight`: *string*  - Highlight color of the day, can be any valid CSS color (`'red'`, `'#ff0000'`, `'rgb(255, 0, 0)'`, etc.).
 - `recurring`: *string &#124; [MbscRecurrenceRule](#type-MbscRecurrenceRule)*  - Specifies a recurrence rule for handling recurring days.
 - `recurringException`: *string &#124; object &#124; Date &#124; Array&lt;string &#124; object &#124; Date&gt;*  - Exception dates of the recurring rule.
Useful when specific dates need to be skipped from the rule.
 - `recurringExceptionRule`: *string &#124; [MbscRecurrenceRule](#type-MbscRecurrenceRule)*  - Exception rule of the recurring rule.
Useful when recurring dates need to be skipped from the rule.
 - `resource`: *string &#124; number &#124; Array&lt;string &#124; number&gt;*  - In case of the timeline and scheduler view of the Eventcalendar, specifies the [resource](#opt-resources) ids
for the color.
The color will be displayed only on the specified resource.
If there is no resource defined, it will be applied to every resource.
 - `slot`: *string &#124; number*  - In case of the timeline view of the Eventcalendar, specifies the [slot](#opt-slot) id
for the color.
The color will be displayed only on the specified slot.
If there is no slot defined, it will be applied to every slot.
 - `start`: *string &#124; object &#124; Date*  - Specifies the start date/time of a date/time range for the color
 - `textColor`: *string*  - A color applied on the text.
 - `title`: *string*  - A title that will be displayed on the item.

### MbscCalendarEvent {#type-MbscCalendarEvent}

Interface

Properties:
 - `allDay`: *boolean*  - Specifies if the event is all day or not.
 - `bufferAfter`: *number*  - Defines a buffer time in minutes that will be displayed after the end of the event.
 - `bufferBefore`: *number*  - Defines a buffer time in minutes that will be displayed before the start of the event.
 - `cellCssClass`: *string*  - CSS class for the day cell. Only applicable for the calendar view.
 - `color`: *string*  - Background color of the event
 - `cssClass`: *string*  - Specifies a custom CSS class that is applied to the event. Useful when customization is needed on the event level.
For example: setting the width for specific events.
 - `date`: *string &#124; object &#124; Date*  - Specifies a single date for the event
 - `dragBetweenResources`: *boolean*  - Specifies whether the event is movable across resources.
 - `dragBetweenSlots`: *boolean*  - Specifies whether the event is movable across across slots.
 - `dragInTime`: *boolean*  - Specifies whether the event is movable in time.
 - `editable`: *boolean*  - Specifies if an event is editable or not. If false, drag & drop and resize is not allowed.
 - `end`: *string &#124; object &#124; Date*  - Specifies the end date/time of a date/time range for the event
 - `id`: *string &#124; number*  - A unique id for the event. If not specified, the event will get a generated id.
 - `order`: *number*  - Specifies the order of the event in the array. Has precedence over the default ordering rules.
 - `overlap`: *boolean*  - Specifies whether the event can be overlapped. Has precedence over the `eventOverlap`
property of the resource and the [eventOverlap](#opt-eventOverlap) option.
 - `recurring`: *string &#124; [MbscRecurrenceRule](#type-MbscRecurrenceRule)*  - Specifies a recurrence rule for handling recurring events.
 - `recurringException`: *string &#124; object &#124; Date &#124; Array&lt;string &#124; object &#124; Date&gt;*  - Exception dates of the recurring rule.
Useful when specific dates need to be skipped from the rule.
 - `recurringExceptionRule`: *string &#124; [MbscRecurrenceRule](#type-MbscRecurrenceRule)*  - Exception rule of the recurring rule.
Useful when recurring dates need to be skipped from the rule.
 - `resize`: *boolean*  - Specifies whether the event is resizable.
Has precedence over the `eventResize` property of the resource and
the [dragToResize](#opt-dragToResize) option.
 - `resource`: *string &#124; number &#124; Array&lt;string &#124; number&gt;*  - In case of the timeline and scheduler view of the Eventcalendar, specifies the [resource](#opt-resources) ids
for the event.
The event will be displayed only on the specified resource.
If there is no resource defined, it will be displayed on every resource.
 - `slot`: *string &#124; number*  - In case of the timeline view of the Eventcalendar, specifies the [slot](#opt-slot) id
for the event.
The event will be displayed only on the specified slot.
If there is no slot defined, it will be displayed on every slot.
 - `start`: *string &#124; object &#124; Date*  - Specifies the start date/time of a date/time range for the event
 - `textColor`: *string*  - A color applied on the text.
 - `timezone`: *string*  - Timezone of the event
 - `title`: *string*  - The title of the event.
 - `tooltip`: *string*  - The tooltip text of the event.

### MbscDateType {#type-MbscDateType}

string &#124; Date &#124; object


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

### MbscResource {#type-MbscResource}

Interface

Properties:
 - `background`: *string*  - Specifies the background color of the resource row or column.
 - `children`: *Array&lt;[MbscResource](#type-MbscResource)&gt;*  - Child resources.
 - `collapsed`: *boolean*  - Specifies the displayed state of the child resource group.
 - `color`: *string*  - Specifies the default event color of the resource.
If an event has an explicit color set, the resource color will be overridden.
If the color is not set, the events of the resource will inherit the default calendar color.
 - `cssClass`: *string*  - Specifies a css class for the resource row or column.
 - `eventCreation`: *boolean*  - Disables event creation on specific resources by setting it to false. Defaults to true.
 - `eventDragBetweenResources`: *boolean*  - Specifies whether the events in this resource are movable across resources.
It applies for scheduler and timeline views.
Has precedence over the [dragBetweenResources](#opt-dragBetweenResources) option.
 - `eventDragBetweenSlots`: *boolean*  - Specifies whether the events in this slot are movable across slots.
Has precedence over the [dragBetweenSlots](#opt-dragBetweenSlots) option.
 - `eventDragInTime`: *boolean*  - Specifies whether the events in this resource are movable in time.
Has precedence over the [dragInTime](#opt-dragInTime) option.
 - `eventOverlap`: *boolean*  - Specifies whether the events in this resource can be overlapped.
Has precedence over the [eventOverlap](#opt-eventOverlap) option.
 - `eventResize`: *boolean*  - Specifies whether the events in this resource are resizable.
Has precedence over the [dragToResize](#opt-dragToResize) option.
 - `fixed`: *boolean*  - Specifies whether the resource is fixed to the top.
It applies for timeline view if `resolutionVertical` in [view](#opt-view) option is not given, or it&#039;s value is set to `none`.
Consider that the fixed resources always have to be the first elements of the array in a sequence
(no non-fixed resources inserted in between) so that the dra &amp; rop and event creation functionalities to work properly.
 - `id`: *string &#124; number*  - The id of the resource.
 - `name`: *string*  - Specifies the name of the resource.

The `MbscResource` supports custom properties in the form:
```
[x:string]: any
```


### MbscResponsiveOptions&lt;MbscEventcalendarOptions&gt; {#type-MbscResponsiveOptions}

Interface


The `MbscResponsiveOptions<MbscEventcalendarOptions>` supports custom properties in the form:
```
[key:string]: MbscEventcalendarOptions & {breakpoint?: number}
```
The keys are the names of the breakpoints, and the values are objects containing the options for the given breakpoint.
The `breakpoint` property, when present, specifies the min-width in pixels. The options will take into effect from that width.

:::info
The available width is queried from the container element of the component and not the browsers viewport like in css media queries
:::

There are five predefined breakpoints:

- `xsmall` - min-width: 0px
- `small` - min-width: 576px
- `medium` - min-width: 768px
- `large` - min-width: 992px
- `xlarge` - min-width: 1200px

### MbscTimezonePlugin {#type-MbscTimezonePlugin}

Interface

Properties:
 - `createDate`: *(s: any, year: string &#124; number &#124; Date &#124; MbscTimezonedDate, month: number, date: number, h: number, min: number, sec: number, ms: number) => MbscTimezonedDate* 
 - `parse`: *(date: string &#124; number, s: any) => MbscTimezonedDate* 

