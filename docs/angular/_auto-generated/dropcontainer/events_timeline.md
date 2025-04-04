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


### onItemDragEnter {#event-onItemDragEnter}

(args: MbscItemDragEvent) => void


Triggered when an event is dragged into the calendar/timeline/schedule view.

Parameters:
 - args - The event argument with the following properties:
   - `domEvent`: *Event* - The DOM event of the drag.
   - `data`: *MbscCalendarEvent | MbscResource * - The dragged data.
   - `dataType`: *&#039;event&#039; | &#039;resource&#039;* - The type of the dragged item.


### onItemDragLeave {#event-onItemDragLeave}

(args: MbscItemDragEvent) => void


Triggered when an event is dragged into the calendar/timeline/schedule view.

Parameters:
 - args - The event argument with the following properties:
   - `domEvent`: *Event* - The DOM event of the drag.
   - `data`: *MbscCalendarEvent | MbscResource * - The dragged data.
   - `dataType`: *&#039;event&#039; | &#039;resource&#039;* - The type of the dragged item.


### onItemDrop {#event-onItemDrop}

(args: MbscItemDragEvent) => void


Triggered when an event is dropped inside the drop container.

Parameters:
 - args - The event argument with the following properties:
   - `domEvent`: *Event* - The DOM event of the drag.
   - `data`: *MbscCalendarEvent | MbscResource * - The dragged data.
   - `dataType`: *&#039;event&#039; | &#039;resource&#039;* - The type of the dragged item.

