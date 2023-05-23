### @cell-click {#event-onCellClick}

(args: MbscCellClickEvent, inst: EventcalendarBase) => void


Triggered when a cell is clicked on the calendar day, scheduler cell, or timeline cell.

Parameters:
 - args - The event object has the following properties:
   - date: Date - The date of the clicked cell.
   - domEvent: Event - The DOM event of the click.
   - events: Array - The events for the clicked date.
   - resource: String, Number - The id of the resource where the cell was clicked, if resources are set.
   - selected: Boolean - Specifies if the day is currently selected or not (before it was clicked).
   - source: String - The view where the cell was clicked, &#039;calendar&#039;, &#039;schedule&#039; or &#039;timeline&#039;.
   - target: HTMLElement - The DOM element of the clicked cell.

 - inst - The instance of the eventcalendar.


### @cell-double-click {#event-onCellDoubleClick}

(args: MbscCellClickEvent, inst: EventcalendarBase) => void


Triggered when a cell is double-clicked on the calendar day, scheduler cell, or timeline cell.

Parameters:
 - args - The event object has the following properties:
   - date: Date - The date of the clicked cell.
   - domEvent: Event - The DOM event of the click.
   - events: Array - The events for the clicked date.
   - resource: String, Number - The id of the resource where the cell was clicked, if resources are set.
   - selected: Boolean - Specifies if the day is currently selected or not (before it was clicked).
   - source: String - The view where the cell was clicked, &#039;calendar&#039;, &#039;schedule&#039; or &#039;timeline&#039;.
   - target: HTMLElement - The DOM element of the clicked cell.

 - inst - The instance of the eventcalendar.


### @cell-right-click {#event-onCellRightClick}

(args: MbscCellClickEvent, inst: EventcalendarBase) => void


Triggered when a cell is right-clicked on the calendar, scheduler, or timeline grid .

Parameters:
 - args - The event object has the following properties:
   - date: Date - The date of the clicked cell.
   - domEvent: Event - The DOM event of the click.
   - events: Array - The events for the clicked date.
   - resource: String, Number - The id of the resource where the cell was clicked, if resources are set.
   - selected: Boolean - Specifies if the day is currently selected or not (before it was clicked).
   - source: String - The view where the cell was clicked, &#039;calendar&#039;, &#039;schedule&#039; or &#039;timeline&#039;.
   - target: HTMLElement - The DOM element of the clicked cell.

 - inst - The instance of the eventcalendar.


### @destroy {#event-onDestroy}

(args: any, inst: any) => void


Triggered when the component is destroyed.

Parameters:
 - args - The event argument object.

 - inst - The component instance.


### @event-click {#event-onEventClick}

(args: MbscEventClickEvent, inst: EventcalendarBase) => void


Triggered when an event is clicked.

Parameters:
 - args - The event object has the following properties:
   - date: Date - The date of the day on which the event was clicked.
   - domEvent: Event - The DOM event of the click.
   - event: Object - The clicked calendar event.
   - resource: String, Number - The id of the resource where the cell was clicked, if [resources](#resources) are set.
   - selected: Boolean - Specifies if the day is currently selected or not (before it was clicked).
   - source: String - The view where the cell was clicked, &#039;agenda&#039;, &#039;calendar&#039;, &#039;schedule&#039; or &#039;timeline&#039; or &#039;popover&#039;.

 - inst - The instance object of the eventcalendar.


### @event-create {#event-onEventCreate}

(args: MbscEventCreateEvent, inst: EventcalendarBase) => void


Triggered when an event is about to create and it is not rendered on its final position.
Event creation can be prevented by returning false from the handler function.

Parameters:
 - args - The event object has the following properties:
   - action: String - The action which created the event (&#039;click&#039;, &#039;drag&#039; or &#039;externalDrop&#039;).
   - domEvent: Event - The DOM event from the end of the gesture (mouseup or touchend).
   - event: Object - The newly created event object.
   - originEvent: Object - The occurrence of the event which was dragged.
Will be set only if the event was created by dragging a recurring event occurrence.
   - source: String - The view where the event is being created, &#039;calendar&#039;, &#039;timeline&#039; or &#039;schedule&#039;.

 - inst - The instance object of the eventcalendar.


### @event-create-failed {#event-onEventCreateFailed}

(args: MbscEventCreateFailedEvent, inst: EventcalendarBase) => void


Triggered when an event is interacted with a blocked out date during the creation.

Parameters:
 - args - The event object has the following properties:
   - action: String - The action which created the event (&#039;click&#039;, &#039;drag&#039; or &#039;externalDrop&#039;).
   - event: Object - The newly created event object.
   - invalid: Object - The invalid object which the event interacted with.
   - originEvent: Object - The occurrence of the event which was dragged.
Will be set only if the event was created by dragging a recurring event occurrence.
   - source: String - The view where the event is being created, &#039;calendar&#039;, &#039;timeline&#039; or &#039;schedule&#039;.

 - inst - The instance object of the eventcalendar.


### @event-created {#event-onEventCreated}

(args: MbscEventCreatedEvent, inst: EventcalendarBase) => void


Triggered when an event is created and it is rendered in its position.

Parameters:
 - args - The event object has the following properties:
   - action: String - The action which created the event (&#039;click&#039;, &#039;drag&#039; or &#039;externalDrop&#039;).
   - event: Object - The newly created event object.
   - source: String - The view where the event is being created, &#039;calendar&#039;, &#039;timeline&#039; or &#039;schedule&#039;.
   - target: HTMLElement - The DOM element of the created event.

 - inst - The instance object of the eventcalendar.


### @event-delete {#event-onEventDelete}

(args: MbscEventDeleteEvent, inst: EventcalendarBase) => void


Triggered when an event is about to be deleted and it is not yet removed from it&#039;s position.
Event deletion can be performed with delete and backspace button on an active event.
Deletion can be prevented by returning false from the handler function.

Parameters:
 - args - The event object has the following properties:
   - domEvent: Event - The DOM event from the onKeyDown action.
   - event: Object - The deleted event&#039;s data object.
   - events: Array - The deleted events in case of multiple select.
   - source: String - The view where the event is being created &#039;calendar&#039;, &#039;timeline&#039; or &#039;schedule&#039;.

 - inst - The instance object of the eventcalendar.


### @event-deleted {#event-onEventDeleted}

(args: MbscEventDeletedEvent, inst: EventcalendarBase) => void


Triggered when an event is deleted and it is removed from it&#039;s position.

Parameters:
 - args - The event object has the following properties:
   - event: Object - The deleted event&#039;s data object.
   - events: Array - The deleted events in case of multiple select.
   - source: String - The view where the event is being created &#039;agenda&#039;, &#039;calendar&#039;, &#039;timeline&#039; or &#039;schedule&#039;.

 - inst - The instance object of the eventcalendar.


### @event-double-click {#event-onEventDoubleClick}

(args: MbscEventClickEvent, inst: EventcalendarBase) => void


Triggered when an event is double-clicked.

Parameters:
 - args - 

 - inst - 


### @event-drag-end {#event-onEventDragEnd}

(args: MbscEventDragEvent, inst: EventcalendarBase) => void


Triggered when an event drag has ended.

Parameters:
 - args - 

 - inst - 


### @event-drag-start {#event-onEventDragStart}

(args: MbscEventDragEvent, inst: EventcalendarBase) => void


Triggered when an event drag has started.

Parameters:
 - args - 

 - inst - 


### @event-hover-in {#event-onEventHoverIn}

(args: MbscEventClickEvent, inst: EventcalendarBase) => void


Triggered when the mouse pointer hovers an event on the calendar.

Parameters:
 - args - 

 - inst - 


### @event-hover-out {#event-onEventHoverOut}

(args: MbscEventClickEvent, inst: EventcalendarBase) => void


Triggered when the mouse pointer leaves an event on the calendar.

Parameters:
 - args - 

 - inst - 


### @event-right-click {#event-onEventRightClick}

(args: MbscEventClickEvent, inst: EventcalendarBase) => void


Triggered when an event is right-clicked.

Parameters:
 - args - 

 - inst - 


### @event-update {#event-onEventUpdate}

(args: MbscEventUpdateEvent, inst: EventcalendarBase) => void


Triggered when an event is about to update. Update can be prevented by returning false from the handler function.

Parameters:
 - args - 

 - inst - 


### @event-update-failed {#event-onEventUpdateFailed}

(args: MbscEventUpdateFailedEvent, inst: EventcalendarBase) => void


Triggered when an event is interacted with a blocked out date at drop or resize.

Parameters:
 - args - 

 - inst - 


### @event-updated {#event-onEventUpdated}

(args: MbscEventUpdatedEvent, inst: EventcalendarBase) => void


Triggered when an event is updated and is rendered in its new position.
This is where you update the event in your database or persistent storage.

Parameters:
 - args - 

 - inst - 


### @init {#event-onInit}

(args: any, inst: any) => void


Triggered when the component is initialized.

Parameters:
 - args - The event argument object.

 - inst - The component instance.


### @page-change {#event-onPageChange}

(args: MbscPageChangeEvent, inst: EventcalendarBase) => void


Triggered when the calendar page is changed (month or week, with buttons or swipe).

Parameters:
 - args - 

 - inst - 


### @page-loaded {#event-onPageLoaded}

(args: MbscPageLoadedEvent, inst: EventcalendarBase) => void


Triggered when the calendar page is changed (month or week, with buttons or swipe) and the animation has finished.

Parameters:
 - args - 

 - inst - 


### @page-loading {#event-onPageLoading}

(args: MbscPageLoadingEvent, inst: EventcalendarBase) => void


Triggered before the markup of a calendar page (month or week) is starting to render.

Parameters:
 - args - 

 - inst - 


### @selected-date-change {#event-onSelectedDateChange}

(args: MbscSelectedDateChangeEvent, inst: EventcalendarBase) => void


Triggered when the selected date is changed from the UI. You can use this event in conjunction with the
[selectedDate](#opt-selectedDate) option to customize where the eventcalendar should navigate.

Parameters:
 - args - 

 - inst - 


### @selected-events-change {#event-onSelectedEventsChange}

(args: MbscSelectedEventsChangeEvent, inst: EventcalendarBase) => void


Triggered when an event is selected or deselected, or when everything is deselected,
when [selectMultipleEvents option](#opt-selectMultipleEvents) is set to true.

You can force the eventcalendar to select events using the [selectedEvents](#opt-selectedEvents) option.

Parameters:
 - args - 

 - inst - 

