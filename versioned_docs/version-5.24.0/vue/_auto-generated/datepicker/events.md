### @active-date-change {#event-onActiveDateChange}

(event: {active: "start" &#124; "end"}, inst: any) => void


In range selection mode, the onActiveDateChange event is triggered when the active date changes from start to end or vice versa.

Parameters:
 - event - The event object has the following properties:
   - active: string - The activated part of the range: either &#039;start&#039; or &#039;end&#039;.

 - inst - The instance object of the datepicker.


### @cancel {#event-onCancel}

(args: any, inst: any) => void


Triggered when the picker is canceled.

Parameters:
 - args - The event argument with the following properties:
   - `value`: *any* - The selected value.
   - `valueText`: *string* - The selected value as text.

 - inst - The component instance.


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
 - args - The event argument with the following properties:
   - `value`: *any* - The selected value.
   - `valueText`: *string* - The selected value as text.

 - inst - The component instance.


### @close {#event-onClose}

(args: any, inst: any) => void


Triggered when the component is closed.

Parameters:
 - args - The event argument with the following properties:
   - `value`: *any* - The selected value.
   - `valueText`: *string* - The selected value as text.

 - inst - The component instance.


### @destroy {#event-onDestroy}

(args: any, inst: any) => void


Triggered when the component is destroyed.

Parameters:
 - args - The event argument object.

 - inst - The component instance.


### @init {#event-onInit}

(args: any, inst: any) => void


Triggered when the component is initialized.

Parameters:
 - args - The event argument object.

 - inst - The component instance.


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
 - args - The event argument with the following properties:
   - `target`: *HTMLElement* - The DOM element of the popup.

 - inst - The component instance.


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

