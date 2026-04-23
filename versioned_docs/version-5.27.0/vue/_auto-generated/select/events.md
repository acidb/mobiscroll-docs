### @cancel {#event-onCancel}

(args: any, inst: any) => void


Triggered when the picker is canceled.

Parameters:
 - args - The event argument with the following properties:
   - `value`: *any* - The selected value.
   - `valueText`: *string* - The selected value as text.

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


### @filter {#event-onFilter}

(args: MbscSelectOnFilterEvent, inst: any) => boolean


Triggered when the value of the filter input changes.
Filtering can be turned on with the [filter](#opt-filter) option.

To fully customize the filtering, the default behavior can be prevented by returning `false` from the handler function.

Parameters:
 - args - The event argument with the following properties:
   - `filterText`: *string* - The value of the filter input.

 - inst - The component instance.


### @init {#event-onInit}

(args: any, inst: any) => void


Triggered when the component is initialized.

Parameters:
 - args - The event argument object.

 - inst - The component instance.


### @open {#event-onOpen}

(args: any, inst: any) => void


Triggered when the component is opened.

Parameters:
 - args - The event argument with the following properties:
   - `target`: *HTMLElement* - The DOM element of the popup.

 - inst - The component instance.


### @temp-change {#event-onTempChange}

(args: any, inst: any) => void


Triggered when the temporary value is changed.

Parameters:
 - args - The event argument with the following properties:
   - `value`: *any* - The selected value.

 - inst - The component instance.

