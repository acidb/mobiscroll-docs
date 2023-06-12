### @active-date-change {#event-onActiveDateChange}

(args: {active: "start" &#124; "end"}, inst: any) => void


Triggered when the active date changes from start to end or vice versa, in case of range selection mode.

Parameters:
 - args - The event argument with the following properties:
   - `active`: *string* - The activated part of the range, `'start'` or `'end'`.

 - inst - The component instance.


### @cancel {#event-onCancel}

(args: any, inst: any) => void


Triggered when the picker is canceled.

Parameters:
 - args - The event argument with the following properties:
   - `value`: *any* - The selected value.
   - `valueText`: *string* - The selected value as text.

 - inst - The component instance.


### @cell-click {#event-onCellClick}

(args: any, inst: any) => void


Triggered when a cell is clicked on the calendar.

Parameters:
 - args - The event argument with the following properties:
   - `date`: *Date* - The date of the clicked cell.
   - `domEvent`: *Event* - The DOM event of the click.
   - `selected`: *boolean* - Specifies if the day is currently selected or not (before it was clicked).
   - `target`: *HTMLElement* - The DOM element of the clicked cell.

 - inst - The component instance.


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

(args: any, inst: any) => void


Triggered when a label is clicked on the calendar.

Parameters:
 - args - The event argument with the following properties:
   - `date`: *Date* - The date of the day on which the label was clicked.
   - `domEvent`: *Event* - The DOM event of the click.
   - `label`: *MbscCalendarLabel* - The original object of the label which was clicked, `undefined` in case of the &quot;more&quot; label.
   - `labels`: *Array&lt;MbscCalendarLabel&gt;* - An array containing each label object for the given day.
   - `target`: *HTMLElement* - The DOM element of the label.

 - inst - The component instance.


### @open {#event-onOpen}

(args: any, inst: any) => void


Triggered when the component is opened.

Parameters:
 - args - The event argument with the following properties:
   - `target`: *HTMLElement* - The DOM element of the popup.

 - inst - The component instance.


### @page-change {#event-onPageChange}

(args: any, inst: any) => void


Triggered when the calendar page is changed (with buttons or swipe).

Parameters:
 - args - The event argument with the following properties:
   - `firstDay`: *Date* - The first day of the displayed page.
   - `lastDay`: *Date* - The last day of the displayed page.
   - `month`: *Date* - The first day of the visible month in case of month view.

 - inst - The component instance.


### @page-loaded {#event-onPageLoaded}

(args: any, inst: any) => void


Triggered when the calendar page is changed (with buttons or swipe) and the view finished rendering.

Parameters:
 - args - The event argument with the following properties:
   - `firstDay`: *Date* - The first day of the displayed page.
   - `lastDay`: *Date* - The last day of the displayed page.
   - `month`: *Date* - The first day of the visible month in case of month view.

 - inst - The component instance.


### @page-loading {#event-onPageLoading}

(args: any, inst: any) => void


Triggered before the markup of a calendar page is starting to render.

Parameters:
 - args - The event argument with the following properties:
   - `firstDay`: *Date* - The first day of the displayed page.
   - `lastDay`: *Date* - The last day of the displayed page.
   - `month`: *Date* - The first day of the visible month in case of month view.

 - inst - The component instance.


### @temp-change {#event-onTempChange}

(args: {value: DateType &#124; Array&lt;DateType&gt;}, inst: any) => void


Triggered when the temporary value is changed.

Parameters:
 - args - The event argument with the following properties:
   - `value`: *DateType | DateType[]* - The selected value.

 - inst - The component instance.

