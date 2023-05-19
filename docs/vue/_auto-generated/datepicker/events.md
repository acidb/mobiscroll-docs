### @active-date-change {#event-onActiveDateChange}

(event: {active: "start" &#124; "end"}, inst: any) => void


In range selection mode, the onActiveDateChange event is triggered when the active date changes from start to end or vice versa.

Parameters:
 - event - The event object has the following properties:
   - active: string - The activated part of the range: either &#039;start&#039; or &#039;end&#039;.

 - inst - The instance object of the datepicker.


### @cancel {#event-onCancel}

(args: any, inst: any) => void


Allows you to define your own event when cancel is pressed.

Parameters:
 - args - The args object has the following properties:
   - valueText: String - The selected value as text.

 - inst - The instance object of the picker


### @cell-click {#event-onCellClick}

(event: any, inst: any) => void


Triggered when a cell is clicked on the calendar.

Parameters:
 - event - Object - The event object has the following properties:
   - date: Date - The date of the clicked cell.
   - domEvent: Event The DOM event of the click.
   - selected: Boolean - Specifies if the day is currently selected or not (before it was clicked).
   - target: HTMLElement - The DOM element of the clicked cell.

 - inst - Object - The instance object of the datepicker.


### @change {#event-onChange}

(args: any, inst: any) => void


Triggered when the value is changed.

Parameters:
 - args - Object - The args object has the following properties:
   - value - The selected value
   - valueText: String - The selected value as text (if any).

 - inst - The instance object of the picker


### @close {#event-onClose}

(args: any, inst: any) => void


Triggered when the component is closed.

Parameters:
 - args - Object - The args object has the following properties:
   - source: String - Determines what triggered the close event. Can be one of &#039;set&#039;, &#039;cancel&#039;, &#039;ok&#039;, &#039;close&#039;,
&#039;overlay&#039;, &#039;esc&#039;, &#039;scroll&#039;.

 - inst - Object - The instance object of the component


### @destroy {#event-onDestroy}

(args: any, inst: BaseComponent) => void


Triggered when the component is destroyed.

Parameters:
 - args - The argument object passed to the handler.

 - inst - The instance of the component.


### @init {#event-onInit}

(args: any, inst: BaseComponent) => void


Triggered when the component is initialized.

Parameters:
 - args - The argument object passed to the handler.

 - inst - The instance of the component.


### @label-click {#event-onLabelClick}

(event: any, inst: any) => void


Triggered when a label on the calendar is clicked.

Parameters:
 - event - event: Object - The event object has the following properties:
   - date: Date - The date of the day on which the label was clicked.
   - domEvent: Event - The DOM event of the click.
   - label: Object - The original object of the label which was clicked, undefined in case of the &quot;more&quot; label.
   - labels: Array - An array containing each label object for the given day.
   - target: HTMLElement - The DOM element of the label.

 - inst - Object - The instance object of the datepicker.


### @open {#event-onOpen}

(args: any, inst: any) => void


Triggered when the component is opened.

Parameters:
 - args - Object - The args object has the following properties:
   - target: Object - The DOM element containing the generated html.

 - inst - Object - The instance object of the popup.


### @page-change {#event-onPageChange}

(event: any, inst: any) => void


Triggered when the calendar page is changed (month or week, with buttons or swipe).

Parameters:
 - event - Object - The event object has the following property:
   - firstDay: Date - The first day of the displayed page.
   - lastDay: Date - The last day of the displayed page.
   - month: Date - The first day of the visible month in case of month view.

 - inst - Object - The instance object of the datepicker.


### @page-loaded {#event-onPageLoaded}

(args: any, inst: any) => void


Triggered when the calendar page is changed (month or week, with buttons or swipe) and the animation has finished.

Parameters:
 - args - Object - The event object has the following property:
   - firstDay: Date - The first day of the displayed page.
   - lastDay: Date - The last day of the displayed page.
   - month: Date - The first day of the visible month in case of month view.

 - inst - Object - The instance object of the datepicker.


### @page-loading {#event-onPageLoading}

(event: any, inst: any) => void


Triggered before the markup of a calendar page (month or week) is starting to render.

Parameters:
 - event - Object - The event object has the following property:
   - firstDay: Date - The first day of the displayed page.
   - lastDay: Date - The last day of the displayed page.
   - month: Date - The first day of the visible month in case of month view.

 - inst - Object - The instance object of the datepicker.


### @temp-change {#event-onTempChange}

(event: {value: DateType &#124; Array&lt;DateType&gt;}, inst: any) => void


Triggered when the temporary value is changed.

Parameters:
 - event - The event object has the following properties:
   - value: DateType - The selected value.

 - inst - The instance object of the datepicker.

