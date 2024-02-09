### onCancel {#event-onCancel}

(args: MbscSelectCancelEvent, inst: SelectBase) => void


Triggered when the picker is canceled.

Parameters:
 - args - The event argument with the following properties:
   - `value`: *any* - The selected value.
   - `valueText`: *string* - The selected value as text.

 - inst - The component instance.


### onChange {#event-onChange}

(args: MbscSelectChangeEvent, inst: SelectBase) => void


Triggered when the value is changed.

Parameters:
 - args - The event argument with the following properties:
   - `value`: *any* - The selected value.
   - `valueText`: *string* - The selected value as text.

 - inst - The component instance.


### onClose {#event-onClose}

(args: MbscSelectCloseEvent, inst: SelectBase) => void


Triggered when the picker is closed.

Parameters:
 - args - The event argument with the following properties:
   - `value`: *any* - The selected value.
   - `valueText`: *string* - The selected value as text.

 - inst - The component instance.


### onDestroy {#event-onDestroy}

(args: any, inst: any) => void


Triggered when the component is destroyed.

Parameters:
 - args - The event argument object.

 - inst - The component instance.


### onFilter {#event-onFilter}

(args: MbscSelectFilterEvent, inst: SelectBase) => boolean


Triggered when the value of the filter input changes.
Filtering can be turned on with the [filter](#opt-filter) option.

To fully customize the filtering, the default behavior can be prevented by returning `false` from the handler function.

Parameters:
 - args - The event argument with the following properties:
   - `filterText`: *string* - The value of the filter input.

 - inst - The component instance.


### onInit {#event-onInit}

(args: any, inst: any) => void


Triggered when the component is initialized.

Parameters:
 - args - The event argument object.

 - inst - The component instance.


### onOpen {#event-onOpen}

(args: MbscSelectOpenEvent, inst: SelectBase) => void


Triggered when the picker is opened.

Parameters:
 - args - The event argument with the following properties:
   - `target`: *HTMLElement* - The DOM element of the popup.
   - `value`: *any* - The selected value.
   - `valueText`: *string* - The selected value as text.

 - inst - The component instance.


### onTempChange {#event-onTempChange}

(args: MbscSelectTempChangeEvent, inst: SelectBase) => void


Triggered when the temporary value is changed.

Parameters:
 - args - The event argument with the following properties:
   - `value`: *any* - The selected value.

 - inst - The component instance.

