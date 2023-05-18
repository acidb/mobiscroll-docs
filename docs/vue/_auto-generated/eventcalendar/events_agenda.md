### @destroy {#event-onDestroy}

(args: any, inst: BaseComponent) => void


Triggered when the component is destroyed.

Parameters:
 - args - The argument object passed to the handler.

 - inst - The instance of the component.


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


### @init {#event-onInit}

(args: any, inst: BaseComponent) => void


Triggered when the component is initialized.

Parameters:
 - args - The argument object passed to the handler.

 - inst - The instance of the component.


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

