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


### @open {#event-onOpen}

(args: any, inst: any) => void


Triggered when the component is opened.

Parameters:
 - args - Object - The args object has the following properties:
   - target: Object - The DOM element containing the generated html.

 - inst - Object - The instance object of the popup.


### @position {#event-onPosition}

(args: any, inst: any) => void


Triggered when the component is positioned (on initial show and resize / orientation change).
Useful if dimensions needs to be modified before the positioning happens, e.g. set a custom width or height.
Custom positioning can also be implemented in this handler. In that case, returning false from the handler function will prevent
the built in positioning.

Parameters:
 - args - Object - The args object has the following properties:
   - target: Object - The DOM element containing the generated html.
   - windowWidth: Number - The window width.
   - windowHeight: Number - The window height.

 - inst - Object - The instance object of the popup.

