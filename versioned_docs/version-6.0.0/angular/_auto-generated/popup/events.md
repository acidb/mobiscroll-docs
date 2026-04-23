### onClose {#event-onClose}

(args: MbscPopupCloseEvent, inst: PopupBase) => void


Triggered when the component is closed.

Parameters:
 - args - The event argument with the following properties:
   - `source`: *string* - Determines what triggered the close event. Can be one of `'set'`, `'cancel'`, `'ok'`, `'close'`,
`'overlay'`, `'esc'`, `'scroll'`.

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


### onOpen {#event-onOpen}

(args: MbscPopupOpenEvent, inst: PopupBase) => void


Triggered when the component is opened.

Parameters:
 - args - The event argument with the following properties:
   - `target`: *HTMLElement* - The DOM element of the popup.

 - inst - The component instance.


### onPosition {#event-onPosition}

(args: MbscPopupPositionEvent, inst: PopupBase) => void


Triggered when the component is positioned (on initial show and resize / orientation change).
Useful if dimensions needs to be modified before the positioning happens, e.g. set a custom width or height.
Custom positioning can also be implemented in this handler. In that case, returning `false` from the handler function will prevent
the built in positioning.

Parameters:
 - args - The event argument with the following properties:
   - `target`: *HTMLElement* - The DOM element of the popup.
   - `windowWidth`: *number* - The window width.
   - `windowHeight`: *number* - The window height.

 - inst - The component instance.

