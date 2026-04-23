### onActiveDateChange {#event-onActiveDateChange}

(args: MbscDatepickerActiveDateChangeEvent, inst: DatepickerBase) => void


Triggered when the active date changes from start to end or vice versa, in case of range selection mode.

Parameters:
 - args - The event argument with the following properties:
   - `active`: *string* - The activated part of the range, `'start'` or `'end'`.

 - inst - The component instance.


### onCancel {#event-onCancel}

(args: MbscDatepickerCancelEvent, inst: DatepickerBase) => void


Triggered when the picker is canceled.

Parameters:
 - args - The event argument with the following properties:
   - `value`: *MbscDateType | MbscDateType[]* - The selected value.
   - `valueText`: *string* - The selected value as text.

 - inst - The component instance.


### onCellClick {#event-onCellClick}

(args: MbscDatepickerCellClickEvent, inst: DatepickerBase) => void


Triggered when a cell is clicked on the calendar.

Parameters:
 - args - The event argument with the following properties:
   - `date`: *Date* - The date of the clicked cell.
   - `domEvent`: *Event* - The DOM event of the click.
   - `selected`: *boolean* - Specifies if the day is currently selected or not (before it was clicked).
   - `target`: *HTMLElement* - The DOM element of the clicked cell.

 - inst - The component instance.


### onCellHoverIn {#event-onCellHoverIn}

(args: MbscDatepickerCellHoverEvent, inst: DatepickerBase) => void


Triggered when the mouse pointer hovers a day on the calendar.

Parameters:
 - args - The event argument with the following properties:
   - `date`: *Date* - The date of the hovered day.
   - `labels`: *Array&lt;MbscCalendarLabel&gt;* - If the day has labels, contains the label objects for the hovered day.
   - `marked`: *Array&lt;MbscCalendarMarked&gt;* - If the day is marked, contains the marked objects for the hovered day.
   - `selected`: *boolean* - Specifies if the day is currently selected or not.
   - `target`: *HTMLElement* - The DOM element of the cell.

 - inst - The component instance.


### onCellHoverOut {#event-onCellHoverOut}

(args: MbscDatepickerCellHoverEvent, inst: DatepickerBase) => void


Triggered when the mouse pointer leaves a day on the calendar view (does not apply for agenda, schedule and timeline views).

Parameters:
 - args - The event argument with the following properties:
   - `date`: *Date* - The date of the hovered day.
   - `labels`: *Array&lt;MbscCalendarLabel&gt;* - If the day has labels, contains the label objects for the hovered day.
   - `marked`: *Array&lt;MbscCalendarMarked&gt;* - If the day is marked, contains the marked objects for the hovered day.
   - `selected`: *boolean* - Specifies if the day is currently selected or not.
   - `target`: *HTMLElement* - The DOM element of the cell.

 - inst - The component instance.


### onChange {#event-onChange}

(args: MbscDatepickerChangeEvent, inst: DatepickerBase) => void


Triggered when the value is changed.

Parameters:
 - args - The event argument with the following properties:
   - `value`: *MbscDateType | MbscDateType[]* - The selected value.
   - `valueText`: *string* - The selected value as text.

 - inst - The component instance.


### onClose {#event-onClose}

(args: MbscDatepickerCloseEvent, inst: DatepickerBase) => void


Triggered when the picker is closed.

Parameters:
 - args - The event argument with the following properties:
   - `value`: *MbscDateType | MbscDateType[]* - The selected value.
   - `valueText`: *string* - The selected value as text.

 - inst - The component instance.


### onDestroy {#event-onDestroy}

(args: any, inst: any) => void


Triggered when the component is destroyed.

Parameters:
 - args - The event argument object.

 - inst - The component instance.


### onInit {#event-onInit}

(args: any, inst: any) => void


Triggered when the component is initialized.

Parameters:
 - args - The event argument object.

 - inst - The component instance.


### onLabelClick {#event-onLabelClick}

(args: MbscDatepickerLabelClickEvent, inst: DatepickerBase) => void


Triggered when a label is clicked on the calendar.

Parameters:
 - args - The event argument with the following properties:
   - `date`: *Date* - The date of the day on which the label was clicked.
   - `domEvent`: *Event* - The DOM event of the click.
   - `label`: *MbscCalendarLabel* - The original object of the label which was clicked, `undefined` in case of the &quot;more&quot; label.
   - `labels`: *Array&lt;MbscCalendarLabel&gt;* - An array containing each label object for the given day.
   - `target`: *HTMLElement* - The DOM element of the label.

 - inst - The component instance.


### onOpen {#event-onOpen}

(args: MbscDatepickerOpenEvent, inst: DatepickerBase) => void


Triggered when the picker is opened.

Parameters:
 - args - The event argument with the following properties:
   - `target`: *HTMLElement* - The DOM element of the popup.
   - `value`: *MbscDateType | MbscDateType[]* - The selected value.
   - `valueText`: *string* - The selected value as text.

 - inst - The component instance.


### onPageChange {#event-onPageChange}

(args: MbscDatepickerPageChangeEvent, inst: DatepickerBase) => void


Triggered when the calendar page is changed (with buttons or swipe).

Parameters:
 - args - The event argument with the following properties:
   - `firstDay`: *Date* - The first day of the displayed page.
   - `lastDay`: *Date* - The last day of the displayed page.
   - `month`: *Date* - The first day of the visible month in case of month view.

 - inst - The component instance.


### onPageLoaded {#event-onPageLoaded}

(args: MbscDatepickerPageLoadedEvent, inst: DatepickerBase) => void


Triggered when the calendar page is changed (with buttons or swipe) and the view finished rendering.

Parameters:
 - args - The event argument with the following properties:
   - `firstDay`: *Date* - The first day of the displayed page.
   - `lastDay`: *Date* - The last day of the displayed page.
   - `month`: *Date* - The first day of the visible month in case of month view.

 - inst - The component instance.


### onPageLoading {#event-onPageLoading}

(args: MbscDatepickerPageLoadingEvent, inst: DatepickerBase) => void


Triggered before the markup of a calendar page is starting to render.

Parameters:
 - args - The event argument with the following properties:
   - `firstDay`: *Date* - The first day of the displayed page.
   - `lastDay`: *Date* - The last day of the displayed page.
   - `month`: *Date* - The first day of the visible month in case of month view.

 - inst - The component instance.


### onTempChange {#event-onTempChange}

(args: MbscDatepickerTempChangeEvent, inst: DatepickerBase) => void


Triggered when the temporary value is changed.

Parameters:
 - args - The event argument with the following properties:
   - `value`: *MbscDateType | MbscDateType[]* - The selected value.

 - inst - The component instance.

