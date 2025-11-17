### context {#opt-context}

string &#124; HTMLElement

Specify where the dragged element will be appended in the DOM.
### dragData {#opt-dragData}

string &#124; [MbscCalendarEvent](#type-MbscCalendarEvent) &#124; [MbscResource](#type-MbscResource)

The data of the dragged element.

The [`MbscCalendarEvent`](#type-MbscCalendarEvent) type has the following properties:
 - `allDay`: *boolean* - Specifies if the event is all day or not.
 - `bufferAfter`: *number* - Defines a buffer time in minutes that will be displayed after the end of the event.
 - `bufferBefore`: *number* - Defines a buffer time in minutes that will be displayed before the start of the event.
 - `cellCssClass`: *string* - CSS class for the day cell. Only applicable for the calendar view.
 - `color`: *string* - Background color of the event
 - `cssClass`: *string* - Specifies a custom CSS class that is applied to the event. Useful when customization is needed on the event level.
For example: setting the width for specific events.
 - `date`: *string &#124; object &#124; Date* - Specifies a single date for the event
 - `dragBetweenResources`: *boolean* - Specifies whether the event is movable across resources.
 - `dragBetweenSlots`: *boolean* - Specifies whether the event is movable across across slots.
 - `dragInTime`: *boolean* - Specifies whether the event is movable in time.
 - `editable`: *boolean* - Specifies if an event is editable or not. If false, drag & drop and resize is not allowed.
 - `end`: *string &#124; object &#124; Date* - Specifies the end date/time of a date/time range for the event
 - `id`: *string &#124; number* - A unique id for the event. If not specified, the event will get a generated id.
 - `order`: *number* - Specifies the order of the event in the array. Has precedence over the default ordering rules.
 - `overlap`: *boolean* - Specifies whether the event can be overlapped. Has precedence over the `eventOverlap`
property of the resource and the [eventOverlap](#opt-eventOverlap) option.
 - `recurring`: *string &#124; [MbscRecurrenceRule](#type-MbscRecurrenceRule)* - Specifies a recurrence rule for handling recurring events.
 - `recurringException`: *string &#124; object &#124; Date &#124; Array&lt;string &#124; object &#124; Date&gt;* - Exception dates of the recurring rule.
Useful when specific dates need to be skipped from the rule.
 - `recurringExceptionRule`: *string &#124; [MbscRecurrenceRule](#type-MbscRecurrenceRule)* - Exception rule of the recurring rule.
Useful when recurring dates need to be skipped from the rule.
 - `resize`: *boolean* - Specifies whether the event is resizable.
Has precedence over the `eventResize` property of the resource and
the [dragToResize](#opt-dragToResize) option.
 - `resource`: *string &#124; number &#124; Array&lt;string &#124; number&gt;* - In case of the timeline and scheduler view of the Eventcalendar, specifies the [resource](#opt-resources) ids
for the event.
The event will be displayed only on the specified resource.
If there is no resource defined, it will be displayed on every resource.
 - `slot`: *string &#124; number* - In case of the timeline view of the Eventcalendar, specifies the [slot](#opt-slot) id
for the event.
The event will be displayed only on the specified slot.
If there is no slot defined, it will be displayed on every slot.
 - `start`: *string &#124; object &#124; Date* - Specifies the start date/time of a date/time range for the event
 - `textColor`: *string* - A color applied on the text.
 - `timezone`: *string* - Timezone of the event
 - `title`: *string* - The title of the event.
 - `tooltip`: *string* - The tooltip text of the event.

The [`MbscResource`](#type-MbscResource) type has the following properties:
 - `background`: *string* - Specifies the background color of the resource row or column.
 - `children`: *Array&lt;[MbscResource](#type-MbscResource)&gt;* - Child resources.
 - `collapsed`: *boolean* - Specifies the displayed state of the child resource group.
 - `color`: *string* - Specifies the default event color of the resource.
If an event has an explicit color set, the resource color will be overridden.
If the color is not set, the events of the resource will inherit the default calendar color.
 - `cssClass`: *string* - Specifies a css class for the resource row or column.
 - `eventCreation`: *boolean* - Disables event creation on specific resources by setting it to false. Defaults to true.
 - `eventDragBetweenResources`: *boolean* - Specifies whether the events in this resource are movable across resources.
It applies for scheduler and timeline views.
Has precedence over the [dragBetweenResources](#opt-dragBetweenResources) option.
 - `eventDragBetweenSlots`: *boolean* - Specifies whether the events in this slot are movable across slots.
Has precedence over the [dragBetweenSlots](#opt-dragBetweenSlots) option.
 - `eventDragInTime`: *boolean* - Specifies whether the events in this resource are movable in time.
Has precedence over the [dragInTime](#opt-dragInTime) option.
 - `eventOverlap`: *boolean* - Specifies whether the events in this resource can be overlapped.
Has precedence over the [eventOverlap](#opt-eventOverlap) option.
 - `eventResize`: *boolean* - Specifies whether the events in this resource are resizable.
Has precedence over the [dragToResize](#opt-dragToResize) option.
 - `fixed`: *boolean* - Specifies whether the resource is fixed to the top.
It applies for timeline view if `resolutionVertical` in [view](#opt-view) option is not given, or it&#039;s value is set to `none`.
Consider that the fixed resources always have to be the first elements of the array in a sequence
(no non-fixed resources inserted in between) so that the dra &amp; rop and event creation functionalities to work properly.
 - `id`: *string &#124; number* - The id of the resource.
 - `name`: *string* - Specifies the name of the resource.
 - `reorder`: *boolean* - Specifies whether the resource can be dragged and reordered.
It applies for timeline view if `resourceReorder` in [view](#opt-view) option is enabled.




### element {#opt-element}

HTMLElement

The HTML element of the dragged item.
### type {#opt-type}

"event" &#124; "resource"

The type of the draggable element.