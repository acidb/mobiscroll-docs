### onCellClick {#event-onCellClick}

(args: MbscCellClickEvent, inst: EventcalendarBase) => void


Triggered when a cell is clicked on the calendar day, scheduler cell, or timeline cell.

Parameters:
 - args - The event object has the following properties:
   - `date`: *Date* - The date of the clicked cell.
   - `domEvent`: *Event* - The DOM event of the click.
   - `events`: *Array&lt;MbscCalendarEvent&gt;* - The events for the clicked date.
   - `resource`: *string | number* - The id of the resource where the cell was clicked, if [resources](#opt-resources) are set.
   - `selected`: *boolean* - Specifies if the day is currently selected or not (before it was clicked).
   - `source`: *&#039;calendar&#039; | &#039;schedule&#039; | &#039;timeline&#039;* - The view where the cell was clicked.
   - `target`: *HTMLElement* - The DOM element of the clicked cell.

 - inst - The component instance.


### onCellDoubleClick {#event-onCellDoubleClick}

(args: MbscCellClickEvent, inst: EventcalendarBase) => void


Triggered when a cell is double-clicked on the calendar day, scheduler cell, or timeline cell.

Parameters:
 - args - The event argument with the following properties:
   - `date`: *Date* - The date of the clicked cell.
   - `domEvent`: *Event* - The DOM event of the click.
   - `events`: *Array&lt;MbscCalendarEvent&gt;* - The events for the clicked date.
   - `resource`: *string | number* - The id of the resource where the cell was clicked, if [resources](#opt-resources) are set.
   - `selected`: *boolean* - Specifies if the day is currently selected or not (before it was clicked).
   - `source`: *&#039;calendar&#039; | &#039;schedule&#039; | &#039;timeline&#039;* - The view where the cell was clicked.
   - `target`: *HTMLElement* - The DOM element of the clicked cell.

 - inst - The component instance.


### onCellHoverIn {#event-onCellHoverIn}

(args: MbscCellHoverEvent, inst: EventcalendarBase) => void


Triggered when the mouse pointer hovers a day on the calendar view (does not apply for agenda, schedule and timeline views).

Parameters:
 - args - The event argument with the following properties:
   - `date`: *Date* - The date of the hovered day.
   - `events`: *Array&lt;MbscCalendarEvent&gt;* - The events for the hovered day.
   - `labels`: *Array&lt;MbscCalendarLabel&gt;* - If the day has labels, contains the label objects for the hovered day.
   - `marked`: *Array&lt;MbscCalendarMarked&gt;* - If the day is marked, contains the marked objects for the hovered day.
   - `selected`: *boolean* - Specifies if the day is currently selected or not.
   - `target`: *HTMLElement* - The DOM element of the cell.

 - inst - The component instance.


### onCellHoverOut {#event-onCellHoverOut}

(args: MbscCellHoverEvent, inst: EventcalendarBase) => void


Triggered when the mouse pointer leaves a day on the calendar view (does not apply for agenda, schedule and timeline views).

Parameters:
 - args - The event argument with the following properties:
   - `date`: *Date* - The date of the hovered day.
   - `events`: *Array&lt;MbscCalendarEvent&gt;* - The events for the hovered day.
   - `labels`: *Array&lt;MbscCalendarLabel&gt;* - If the day has labels, contains the label objects for the hovered day.
   - `marked`: *Array&lt;MbscCalendarMarked&gt;* - If the day is marked, contains the marked objects for the hovered day.
   - `selected`: *boolean* - Specifies if the day is currently selected or not.
   - `target`: *HTMLElement* - The DOM element of the cell.

 - inst - The component instance.


### onCellRightClick {#event-onCellRightClick}

(args: MbscCellClickEvent, inst: EventcalendarBase) => void


Triggered when a cell is right-clicked on the calendar, scheduler, or timeline grid .

Parameters:
 - args - The event argument with the following properties:
   - `date`: *Date* - The date of the clicked cell.
   - `domEvent`: *Event* - The DOM event of the click.
   - `events`: *Array&lt;MbscCalendarEvent&gt;* - The events for the clicked date.
   - `resource`: *string | number* - The id of the resource where the cell was clicked, if [resources](#opt-resources) are set.
   - `selected`: *boolean* - Specifies if the day is currently selected or not (before it was clicked).
   - `source`: *&#039;calendar&#039; | &#039;schedule&#039; | &#039;timeline&#039;* - The view where the cell was clicked.
   - `target`: *HTMLElement* - The DOM element of the clicked cell.

 - inst - The component instance.


### onDestroy {#event-onDestroy}

(args: any, inst: any) => void


Triggered when the component is destroyed.

Parameters:
 - args - The event argument object.

 - inst - The component instance.


### onEventClick {#event-onEventClick}

(args: MbscEventClickEvent, inst: EventcalendarBase) => void


Triggered when an event is clicked.

Parameters:
 - args - The event argument with the following properties:
   - `date`: *Date* - The date on which the event was clicked.
   - `domEvent`: *Event* - The DOM event of the click.
   - `event`: *MbscCalendarEvent* - The clicked calendar event.
   - `resource`: *string | number* - The id of the resource where the event was clicked, if [resources](#opt-resources) are set.
   - `resourceObj`: *MbscResource* - The resource where the event was clicked, if [resources](#opt-resources) are set.
   - `selected`: *boolean* - Specifies if the day is currently selected or not (before it was clicked).
   - `slot`: *string | number* - The id of the slot where the event was clicked, if [slots](#opt-slots) are set.
   - `slotObj`: *MbscSlot* - The slot where the event was clicked, if [slots](#opt-slots) are set.
   - `source`: *&#039;agenda&#039; | &#039;calendar&#039; | &#039;schedule&#039; | &#039;timeline&#039; | &#039;popover&#039;* - The view where the event was clicked.

 - inst - The component instance.


### onEventCreate {#event-onEventCreate}

(args: MbscEventCreateEvent, inst: EventcalendarBase) => void


Triggered when an event is about to create and it is not yet rendered on its final position.
Event creation can be prevented by returning `false` from the handler function.

Parameters:
 - args - The event argument with the following properties:
   - `action`: *&#039;click&#039; | &#039;drag&#039; | &#039;externalDrop&#039;* - The action which created the event.
   - `domEvent`: *Event* - The DOM event from the end of the gesture (mouseup or touchend).
   - `event`: *MbscCalendarEvent* - The newly created event.
   - `originEvent`: *MbscCalendarEvent* - The occurrence of the event which was dragged.
Will be set only if the event was created by dragging a recurring event occurrence.
   - `resourceObj`: *MbscResource* - The resource where the event is being created, if [resources](#opt-resources) are set.
   - `slotObj`: *MbscSlot* - The slot where the event is being created, if [slots](#opt-slots) are set.
   - `source`: *&#039;calendar&#039; | &#039;timeline&#039; | &#039;schedule&#039;* - The view where the event is being created.

 - inst - The component instance.


### onEventCreateFailed {#event-onEventCreateFailed}

(args: MbscEventCreateFailedEvent, inst: EventcalendarBase) => void


Triggered when an event creation failed due to overlapping an invalid range or another event.

Parameters:
 - args - The event argument with the following properties:
   - `action`: *&#039;click&#039; | &#039;drag&#039; | &#039;externalDrop&#039;* - The action which created the event.
   - `event`: *MbscCalendarEvent* - The newly created event.
   - `invalid`: *object* - The invalid object which the event overlapped.
   - `overlap`: *MbscCalendarEvent* - The overlapped event.
   - `originEvent`: *MbscCalendarEvent* - The occurrence of the event which was dragged.
Will be set only if the event was created by dragging a recurring event occurrence.
   - `source`: *&#039;calendar&#039; | &#039;timeline&#039; | &#039;schedule&#039;* - The view where the event was created.

 - inst - The component instance.


### onEventCreated {#event-onEventCreated}

(args: MbscEventCreatedEvent, inst: EventcalendarBase) => void


Triggered when an event is created and it is rendered in its position.

Parameters:
 - args - The event argument with the following properties:
   - `action`: *&#039;click&#039; | &#039;drag&#039; | &#039;externalDrop&#039;* - The action which created the event.
   - `event`: *MbscCalendarEvent* - The newly created event.
   - `source`: *&#039;calendar&#039; | &#039;timeline&#039; | &#039;schedule&#039;* - The view where the event was created.
   - `target`: *HTMLElement* - The DOM element of the created event.
   - `resourceObj`: *MbscResource* - The resource where the event is being created, if [resources](#opt-resources) are set.
   - `slotObj`: *MbscSlot* - The slot where the event is being created, if [slots](#opt-slots) are set.

 - inst - The component instance.


### onEventDelete {#event-onEventDelete}

(args: MbscEventDeleteEvent, inst: EventcalendarBase) => void


Triggered when an event is about to be deleted and it is not yet removed from the view.
Event deletion can be performed with delete and backspace button on an active event.
Deletion can be prevented by returning `false` from the handler function.

Parameters:
 - args - The event argument with the following properties:
   - `domEvent`: *Event* - The DOM event from of the keydown action.
   - `event`: *MbscCalendarEvent* - The event being deleted.
   - `events`: *Array&lt;MbscCalendarEvent&gt;* - The events being deleted in case of multiple event selection.
   - `source`: *&#039;agenda&#039; | &#039;calendar&#039; | &#039;timeline&#039; | &#039;schedule&#039;* - The view where the event is being deleted.

 - inst - The component instance.


### onEventDeleted {#event-onEventDeleted}

(args: MbscEventDeletedEvent, inst: EventcalendarBase) => void


Triggered when an event is deleted and it is removed from the view.

Parameters:
 - args - The event argument with the following properties:
   - `event`: *MbscCalendarEvent* - The deleted event.
   - `events`: *Array&lt;MbscCalendarEvent&gt;* - The deleted events in case of multiple event selection.
   - `source`: *&#039;agenda&#039; | &#039;calendar&#039; | &#039;timeline&#039; | &#039;schedule&#039;* - The view where the event was deleted.

 - inst - The component instance.


### onEventDoubleClick {#event-onEventDoubleClick}

(args: MbscEventClickEvent, inst: EventcalendarBase) => void


Triggered when an event is double-clicked.

Parameters:
 - args - The event argument with the following properties:
   - `date`: *Date* - The date on which the event was clicked.
   - `domEvent`: *Event* - The DOM event of the click.
   - `event`: *MbscCalendarEvent* - The clicked calendar event.
   - `resource`: *string | number* - The id of the resource where the event was clicked, if [resources](#opt-resources) are set.
   - `resourceObj`: *MbscResource* - The resource where the event was clicked, if [resources](#opt-resources) are set.
   - `selected`: *boolean* - Specifies if the day is currently selected or not (before it was clicked).
   - `slot`: *string | number* - The id of the slot where the event was clicker, if [slots](#opt-slots) are set.
   - `slotObj`: *MbscResource* - The resource where the event was clicker, if [slots](#opt-slots) are set.
   - `source`: *&#039;agenda&#039; | &#039;calendar&#039; | &#039;schedule&#039; | &#039;timeline&#039; | &#039;popover&#039;* - The view where the event was clicked.

 - inst - The component instance.


### onEventDragEnd {#event-onEventDragEnd}

(args: MbscEventDragEvent, inst: EventcalendarBase) => void


Triggered when an event drag has ended.

Parameters:
 - args - The event argument with the following properties:
   - `domEvent`: *Event* - The DOM event of the drag.
   - `event`: *MbscCalendarEvent* - The dragged calendar event.
   - `resource`: *string | number* - The id of the resource where the event was dragged, if [resources](#opt-resources) are set.
   - `resourceObj`: *MbscResource* - The resource where the event was dragged, if [resources](#opt-resources) are set.
   - `slot`: *string | number* - The id of the slot where the event was dragged, if [slots](#opt-slots) are set.
   - `slotObj`: *MbscSlot* - The slot where the event was dragged, if [slots](#opt-slots) are set.
   - `source`: *&#039;calendar&#039; | &#039;schedule&#039; | &#039;timeline&#039;* - The view where the event was dragged.

 - inst - The component instance.


### onEventDragEnter {#event-onEventDragEnter}

(args: MbscEventDragEvent) => void


Triggered when an event is dragged into the calendar/timeline/schedule view.

Parameters:
 - args - The event argument with the following properties:
   - `domEvent`: *Event* - The DOM event of the drag.
   - `event`: *MbscCalendarEvent* - The dragged calendar event.
   - `source`: *&#039;calendar&#039; | &#039;schedule&#039; | &#039;timeline&#039;* - The view where the event is dragged.


### onEventDragLeave {#event-onEventDragLeave}

(args: MbscEventDragEvent) => void


Triggered when an event is dragged out form the calendar/timeline/schedule view.

Parameters:
 - args - The event argument with the following properties:
   - `domEvent`: *Event* - The DOM event of the drag.
   - `event`: *MbscCalendarEvent* - The dragged calendar event.
   - `source`: *&#039;calendar&#039; | &#039;schedule&#039; | &#039;timeline&#039;* - The view where the event is dragged.


### onEventDragStart {#event-onEventDragStart}

(args: MbscEventDragEvent, inst: EventcalendarBase) => void


Triggered when an event drag has started.

Parameters:
 - args - The event argument with the following properties:
   - `action`: *&#039;create&#039; | &#039;resize&#039; | &#039;move&#039;* - The user action which triggered the event.
   - `domEvent`: *Event* - The DOM event of the drag.
   - `event`: *MbscCalendarEvent* - The dragged calendar event.
   - `resource`: *string | number* - The id of the resource where the event is dragged, if [resources](#opt-resources) are set.
   - `resourceObj`: *MbscResource* - The resource where the event is dragged, if [resources](#opt-resources) are set.
   - `slot`: *string | number* - The id of the slot where the event is dragged, if [slots](#opt-slots) are set.
   - `slotObj`: *MbscSlot* - The slot where the event is dragged, if [slots](#opt-slots) are set.
   - `source`: *&#039;calendar&#039; | &#039;schedule&#039; | &#039;timeline&#039;* - The view where the event is dragged.

 - inst - The component instance.


### onEventHoverIn {#event-onEventHoverIn}

(args: MbscEventClickEvent, inst: EventcalendarBase) => void


Triggered when the mouse pointer hovers an event on the calendar.

Parameters:
 - args - The event argument with the following properties:
   - `date`: *Date* - The date on which the event is hovered.
   - `domEvent`: *Event* - The DOM event of the hover.
   - `event`: *MbscCalendarEvent* - The hovered calendar event.
   - `resource`: *string | number* - The id of the resource where the event is hovered, if [resources](#opt-resources) are set.
   - `resourceObj`: *MbscResource* - The resource where the event is hovered, if [resources](#opt-resources) are set.
   - `slot`: *string | number* - The id of the slot where the event is hovered, if [slots](#opt-slots) are set.
   - `slotObj`: *MbscSlot* - The slot where the event is hovered, if [slots](#opt-slots) are set.
   - `source`: *&#039;agenda&#039; | &#039;calendar&#039; | &#039;schedule&#039; | &#039;timeline&#039; | &#039;popover&#039;* - The view where the event is hovered.

 - inst - The component instance.


### onEventHoverOut {#event-onEventHoverOut}

(args: MbscEventClickEvent, inst: EventcalendarBase) => void


Triggered when the mouse pointer leaves an event on the calendar.

Parameters:
 - args - The event argument with the following properties:
   - `date`: *Date* - The date on which the event was hovered.
   - `domEvent`: *Event* - The DOM event of the hover.
   - `event`: *MbscCalendarEvent* - The hovered calendar event.
   - `resource`: *string | number* - The id of the resource where the event was hovered, if [resources](#opt-resources) are set.
   - `resourceObj`: *MbscResource* - The resource where the event was hovered, if [resources](#opt-resources) are set.
   - `slot`: *string | number* - The id of the slot where the event was hovered, if [slots](#opt-slots) are set.
   - `slotObj`: *MbscSlot* - The slot where the event was hovered, if [slots](#opt-slots) are set.
   - `source`: *&#039;agenda&#039; | &#039;calendar&#039; | &#039;schedule&#039; | &#039;timeline&#039; | &#039;popover&#039;* - The view where the event was hovered.

 - inst - The component instance.


### onEventRightClick {#event-onEventRightClick}

(args: MbscEventClickEvent, inst: EventcalendarBase) => void


Triggered when an event is right-clicked.

Parameters:
 - args - The event argument with the following properties:
   - `date`: *Date* - The date on which the event was clicked.
   - `domEvent`: *Event* - The DOM event of the click.
   - `event`: *MbscCalendarEvent* - The clicked calendar event.
   - `resource`: *string | number* - The id of the resource where the event was clicked, if [resources](#opt-resources) are set.
   - `resourceObj`: *MbscResource* - The resource where the event was clicked, if [resources](#opt-resources) are set.
   - `selected`: *boolean* - Specifies if the day is currently selected or not (before it was clicked).
   - `slot`: *string | number* - The id of the slot where the event was clicked, if [slots](#opt-slots) are set.
   - `slotObj`: *MbscSlot* - The slot where the event was clicked, if [slots](#opt-slots) are set.
   - `source`: *&#039;agenda&#039; | &#039;calendar&#039; | &#039;schedule&#039; | &#039;timeline&#039; | &#039;popover&#039;* - The view where the event was clicked.

 - inst - The component instance.


### onEventUpdate {#event-onEventUpdate}

(args: MbscEventUpdateEvent, inst: EventcalendarBase) => void


Triggered when an event is about to update. Update can be prevented by returning `false` from the handler function.

Parameters:
 - args - The event argument with the following properties:
   - `domEvent`: *Event* - The DOM event from the end of the gesture (mouseup or touchend).
   - `event`: *MbscCalendarEvent* - The updated event.
   - `events`: *Array&lt;MbscCalendarEvent&gt;* - The updated events.
It is set on recurring event delete, when [multiple event selection](#opt-selectMultipleEvents) is enabled.
   - `newEvent`: *MbscCalendarEvent* - The newly created event.
Will be set only if the dragged event was a recurring event occurrence.
   - `oldEvent`: *MbscCalendarEvent* - The original event before the update.
   - `oldEvents`: *Array&lt;MbscCalendarEvent&gt;* - The original events before the update.
It is set on recurring event delete, when [multiple event selection](#opt-selectMultipleEvents) is enabled.
   - `oldEventOccurrence`: *MbscCalendarEvent* - The occurrence of the event which was dragged.
Will be set only if the dragged event was a recurring event occurrence.
   - `oldResource`: number | string - The id of the resource from which the event was dragged.
   - `oldResourceObj`: *MbscResource* - The resource from which the event was dragged.
   - `oldSlot`: number | string - The id of the slot from which the event was dragged.
   - `oldSlotObj`: *MbscSlot* - The slot from which the event was dragged.
   - `resource`: number | string - The id of the resource where the event was dropped.
   - `resourceObj`: *MbscResource* - The resource where the event was dropped.
   - `slot`: number | string - The id of the slot where the event was dropped.
   - `slotObj`: *MbscSlot* - The slot where the event was dropped.
   - `source`: *&#039;calendar&#039; | &#039;timeline&#039; | &#039;schedule&#039;* - The view where the event is being updated.

 - inst - The component instance.


### onEventUpdateFailed {#event-onEventUpdateFailed}

(args: MbscEventUpdateFailedEvent, inst: EventcalendarBase) => void


Triggered when an event update failed due to overlapping an invalid range or another event.

Parameters:
 - args - The event argument with the following properties:
   - `event`: *MbscCalendarEvent* - The updated event.
   - `invalid`: *object* - The invalid object which the event overlapped.
   - `overlap`: *MbscCalendarEvent* - The overlapped event.
   - `newEvent`: *MbscCalendarEvent* - The newly created event.
Will be set only if the dragged event was a recurring event occurrence.
   - `oldEvent`: *MbscCalendarEvent* - The original event before the update.
   - `oldEventOccurrence`: *MbscCalendarEvent* - The occurrence of the event which was dragged.
Will be set only if the dragged event was a recurring event occurrence.
   - `source`: *&#039;calendar&#039; | &#039;timeline&#039; | &#039;schedule&#039;* - The view where the event was updated.

 - inst - The component instance.


### onEventUpdated {#event-onEventUpdated}

(args: MbscEventUpdatedEvent, inst: EventcalendarBase) => void


Triggered when an event is updated and is rendered in its new position.
This is where you update the event in your database or persistent storage.

Parameters:
 - args - The event argument with the following properties:
   - `event`: *MbscCalendarEvent* - The updated event.
   - `events`: *Array&lt;MbscCalendarEvent&gt;* - The updated events.
It is set on recurring event delete, when [multiple event selection](#opt-selectMultipleEvents) is enabled.
   - `oldEvent`: *MbscCalendarEvent* - The original event before the update.
   - `oldEvents`: *Array&lt;MbscCalendarEvent&gt;* - The original events before the update.
It is set on recurring event delete, when [multiple event selection](#opt-selectMultipleEvents) is enabled.
   - `resourceObj`: *MbscResource* - The resource where the event is updated, if [resources](#opt-resources) are set.
   - `slotObj`: *MbscSlot* - The slot where the event is updated, if [slots](#opt-slots) are set.
   - `source`: *&#039;calendar&#039; | &#039;timeline&#039; | &#039;schedule&#039;* - The view where the event was updated.
   - `target`: *HTMLElement* - The DOM element of the updated event.

 - inst - The component instance.


### onInit {#event-onInit}

(args: any, inst: any) => void


Triggered when the component is initialized.

Parameters:
 - args - The event argument object.

 - inst - The component instance.


### onLabelClick {#event-onLabelClick}

(args: MbscLabelClickEvent, inst: EventcalendarBase) => void


Triggered when a label is clicked on the calendar.

Parameters:
 - args - The event argument with the following properties:
   - `date`: *Date* - The date of the day on which the label was clicked.
   - `domEvent`: *Event* - The DOM event of the click.
   - `label`: *MbscCalendarLabel* - The original object of the label which was clicked, `undefined` in case of the &quot;more&quot; label.
   - `labels`: *Array&lt;MbscCalendarLabel&gt;* - An array containing each label object for the given day.
   - `target`: *HTMLElement* - The DOM element of the label.

 - inst - The component instance.


### onPageChange {#event-onPageChange}

(args: MbscPageChangeEvent, inst: EventcalendarBase) => void


Triggered when the calendar page is changed (with buttons or swipe).

Parameters:
 - args - The event argument with the following properties:
   - `firstDay`: *Date* - The first day of the displayed page.
   - `lastDay`: *Date* - The last day of the displayed page.
   - `month`: *Date* - The first day of the visible month in case of month view.

 - inst - The component instance.


### onPageLoaded {#event-onPageLoaded}

(args: MbscPageLoadedEvent, inst: EventcalendarBase) => void


Triggered when the calendar page is changed (with buttons or swipe) and the view finished rendering.

Parameters:
 - args - The event argument with the following properties:
   - `firstDay`: *Date* - The first day of the displayed page.
   - `lastDay`: *Date* - The last day of the displayed page.
   - `month`: *Date* - The first day of the visible month in case of month view.

 - inst - The component instance.


### onPageLoading {#event-onPageLoading}

(args: MbscPageLoadingEvent, inst: EventcalendarBase) => void


Triggered before the markup of a calendar page is starting to render.

Parameters:
 - args - The event argument with the following properties:
   - `firstDay`: *Date* - The first day of the displayed page.
   - `lastDay`: *Date* - The last day of the displayed page.
   - `month`: *Date* - The first day of the visible month in case of month view.

 - inst - The component instance.


### onSelectedDateChange {#event-onSelectedDateChange}

(args: MbscSelectedDateChangeEvent, inst: EventcalendarBase) => void


Triggered when the selected date is changed, e.g. by clicking on a day on a calendar view, or by using the navigation arrows.
You can use this event in conjunction with the [selectedDate](#opt-selectedDate) option
to customize where the Eventcalendar should navigate.

Parameters:
 - args - The event argument with the following properties:
   - `date`: *Date* - The newly selected date.

 - inst - The component instance.


### onSelectedEventsChange {#event-onSelectedEventsChange}

(args: MbscSelectedEventsChangeEvent, inst: EventcalendarBase) => void


Triggered when an event is selected or deselected on the UI,
when [multiple event selection](#opt-selectMultipleEvents) is enabled.

You can also select events programmatically using the [selectedEvents](#opt-selectedEvents) option.

Parameters:
 - args - The event argument with the following properties:
    - `events`: *Array&lt;MbscCalendarEvent&gt;* - The selected events.

 - inst - The component instance.


### onVirtualLoading {#event-onVirtualLoading}

(args: MbscVirtualLoadEvent, inst: EventcalendarBase) => void


Triggered when a new virtual page is loaded.
You can use this to load events and resources on demand while scrolling the timeline grid.

Parameters:
 - args - The event argument with the following properties:
   - `viewStart`: *Date* - The date where the virtual view starts.
   - `viewEnd`: *Date* - The date where the virtual view end.
   - `resourceStart`: *number|string* - The id of the resource where the virtual view starts.
   - `resourceEnd`:  *number|string* - The id of the resource where the virtual view ends.
   - `oldResourceStart`: *number|string* - The id of the resource where the previous virtual view started.
   - `oldResourceEnd`: *number|string* - The id of the resource where the previous virtual view ended.
   - `oldViewStart`: *Date* - The date where the previous virtual view started.
   - `oldViewEnd`: *Date*- The date where the previous virtual view ended.

 - inst - The component instance.

