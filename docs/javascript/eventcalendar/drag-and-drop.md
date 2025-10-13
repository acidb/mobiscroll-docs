---
sidebar_position: 9
sidebar_label: Drag & drop
displayed_sidebar: javascriptSidebar
title: Drag & drop
---

import DropcontainerEvents from '../_auto-generated/dropcontainer/events.md';
import DraggableOptions from '../_auto-generated/draggable/options.md';

import Content from '../../_shared/eventcalendar/dnd-internal.mdx';
import { toc as intTOC } from '../../_shared/eventcalendar/dnd-internal.mdx';

export const toc = [...intTOC,
  { value: 'Draggable', level: 3, id: 'draggable'},
  { value: 'Draggable options', level: 3, id: 'draggable-options'},
  { value: 'Third party dragging support', level: 3, id: 'third-party-dragging-support'},
  { value: 'The Eventcalendar as source', level: 2, id: 'the-eventcalendar-as-source'},
  { value: 'Dropcontainer', level: 3, id: 'dropcontainer'},
  { value: 'Dropcontainer events', level: 3, id: 'dropcontainer-events'},
  { value: 'Drop to third party drag&drop list', level: 3, id: 'third-party-dropping-support'},
];

<Content />

<h3 id="draggable">Draggable</h3>

You can initialize the draggable containers by using the `draggable()` function on the container element.

```html
<div id="myDraggableCont">
  <div>My Draggable event</div>
</div>

<div id="myDiv"></div>
```
```js
mobiscroll.draggable('#myDraggableCont', {
  dragData: {
    title: "My new 3h long event",
    start: new Date(2023, 10, 10, 12),
    end: new Date(2023, 10, 10, 15),
    color: "green",
  }
});

mobiscroll.eventcalendar('#myDiv', {
  externalDrop: true,
});
```

<h3 id="draggable-options">Draggable options</h3>

<div className="option-list">
  <DraggableOptions />
</div>

<h3 id="third-party-dragging-support">Third party dragging libraries</h3>

Mobiscroll comes with built-in support for two widely used reorderable drag-and-drop list libraries: [SortableJS](https://sortablejs.github.io/Sortable/) and [Dragula](https://bevacqua.github.io/dragula/). With the `sortableJsDraggable` and `dragulaDraggable` plugins, you can seamlessly drag items into the Eventcalendar with just a few lines of code.   

<h4 id="sortable-js">SortableJS:</h4>

Integration: call the `sortableJsDraggable` plugin’s `init()` method and pass the SortableJS instance along with the `options` object.
The options object can include the following properties: 
- `cloneSelector` - *string* - the selector of the SortableJS clone element, typically `'.sortable-drag'`
- `dragData` - *(el: HTMLElement) => MbscCalendarEvent | MbscResource* - function to build the resource or event object. Defaults to `data-drag-data` attribute on the element. 
- `type` - *'event' | 'resource'* - Creates an event or resource on the Eventcalendar. Defaults to `'event'`.
- `externalDrop` - *boolean* - Enables drop from Eventcalendar to SortableJS list.
- `onExternalDrop` - *(args: {container: HTMLElement, position: number, dragData: MbscCalendarEvent | MbscResource, afterElement?: HTMLElement}) => void* - function triggered on drop from Eventcalendar to SortableJS list.


```html
<div class="mbsc-form-group-title">Sortable appointments</div>
<div id="sortable-list">
  <div
    class="task"
    data-drag-data='{ "title": "Winfred Lesley - Teeth whitening", "start": "00:00", "end": "01:30" }'
  >
    <div>Winfred Lesley - Teeth whitening</div>
    <div>1.5 hours</div>
  </div>
  <div
    class="task"
    data-drag-data='{ "title": "Rosalin Delice - Crown and bridge", "start": "00:00", "end": "02:00" }'
  >
    <div>Rosalin Delice - Crown and bridge</div>
    <div>2 hours</div>
  </div>
</div>

<div id="myDiv"></div>
```

```ts
mobiscroll.eventcalendar('#myDiv', {
  externalDrop: true,
});

var sortableList = document.getElementById('sortable-list');

var sortableInst = Sortable.create(sortableList, {
  animation: 150,
  forceFallback: true,
});

mobiscroll.sortableJsDraggable.init(sortableInst, {
  cloneSelector: '.sortable-drag',
});
```

:::info
The SortableJS integration works only if fallback mode is used.  
The `cloneSelector` must be set in the `options` object.
:::

<h4 id="dragula">Dragula:</h4>

Integration: call the `dragulaDraggable` plugin’s `init()` method and pass the Dragula instance, optionally providing an `options` object to customize the behavior.
The options object can include the following properties:
- `dragData` - *(el: HTMLElement) => MbscCalendarEvent | MbscResource* - function to build the resource or event object. Defaults to `data-drag-data` attribute on the element.
- `type` - *'event' | 'resource'* - Creates an event or resource on the Eventcalendar. Defaults to `'event'`.
- `externalDrop` - *boolean* - Enables drop from Eventcalendar to Dragula list.
- `onExternalDrop` - *(args: {container: HTMLElement, position: number, dragData: MbscCalendarEvent | MbscResource, afterElement?: HTMLElement}) => void* - function triggered on drop from Eventcalendar to Dragula list.


```html
<div class="mbsc-form-group-title">Dragula appointments</div>
<div id="dragula-list">
  <div
    class="task"
    data-drag-data='{ "title": "Winfred Lesley - Teeth whitening", "start": "00:00", "end": "01:30" }'
  >
    <div>Winfred Lesley - Teeth whitening</div>
    <div>1.5 hours</div>
  </div>
  <div
    class="task"
    data-drag-data='{ "title": "Rosalin Delice - Crown and bridge", "start": "00:00", "end": "02:00" }'
  >
    <div>Rosalin Delice - Crown and bridge</div>
    <div>2 hours</div>
  </div>
</div>

<div id="myDiv"></div>
```

```ts
mobiscroll.eventcalendar('#myDiv', {
  externalDrop: true,
});

var dragulaList = document.getElementById('dragula-list');

var drake = dragula([dragulaList], {
  copy: true,
});

mobiscroll.dragulaDraggable.init(drake);
```

:::info
When using the Dragula integration on touch devices, draggable items require the following CSS rule to ensure proper behavior:
`.task {
  touch-action: none;
}` 
This is a known limitation in Dragula’s touch support that has not been addressed yet.
:::


<h2 id="the-eventcalendar-as-source">The Eventcalendar as source</h2>

The [`externalDrag`](./api#opt-externalDrag) option enables events to be dragged out from the calendar/schedule/timeline views and dropped on another instance of the Eventcalendar or any [Dropcontainer](#dropcontainer).

When an event leaves the Eventcalendar the [`onEventDragLeave`](./api#event-onEventDragLeave) life-cycle event will be fired and a clone of the calendar event will be displayed for a better illustration of the movement. If the [`dragToMove`](./api#opt-dragToMove) option is not enabled the dragged event will instantly leave the calendar container and the [`onEventDragLeave`](./api#event-onEventDragLeave) event will fire and the event clone will be displayed. When an event enters the Eventcalendar the [`onEventDragEnter`](./api#event-onEventDragEnter) life-cycle event will be fired.


<h3 id="dropcontainer">Dropcontainer</h3>

The Dropcontainer defines a container where events can be dragged from or dropped to. The [`onItemDragLeave`](#event-onItemDragLeave) and [`onItemDragEnter`](#event-onItemDragEnter) life-cycle events can be used to track when an event exits or enters the Dropcontainer. When an item is dropped inside the container the [`onItemDrop`](#event-onItemDrop) event is triggered. This can be useful for unscheduling work or appointments that were already scheduled.

```html
<div id="myDropcontainer">
  <div>Unscheduled events:</div>
  <div id="myList">
    <div id="myDrag122" mbsc-draggable data-drag-data='{"id": "122", "title": "My new 3h long event"}'>
      <div>My new 3h long event</div>
    </div>
  </div>
</div>

<div id="myDiv"></div>
```
```js
mobiscroll.dropcontainer('#myDropcontainer', {
  onItemDrop: function(dropEvent) {
    if (dropEvent.data) {
      const ev = dropEvent.data;
      const el = `<div id="myDrag${ev.id}"><div>${ev.title}</div></div>`;
      document.getElementById('myList').insertAdjacentHTML('beforeend', el);
      mobiscroll.draggable('#myDrag' + ev.id, {
        dragData: ev
      });
    }
  }
});

mobiscroll.eventcalendar('#myDiv', {
  externalDrop: true,
  externalDrag: true,
  dragToCreate: true,
  dragToMove: true,
  onEventCreate: function (args) {
    const ev = args.event;
    document.getElementById('myDrag' + ev.id).remove();
  }
});
```

<h3 id="dropcontainer-events">Dropcontainer events</h3>

<div className="option-list">

<DropcontainerEvents />

</div>


<h3 id="third-party-dropping-support">Drop to third party drag&drop list</h3>

Mobiscroll comes with built-in support for dropping events and resources from the Eventcalendar to two of the most popular reordable drag and drop lists: [SortableJS](https://sortablejs.github.io/Sortable/) and [Dragula](https://bevacqua.github.io/dragula/). Unscheduling events or drag out resources can be enabled with the `sortableJsDraggable` and `dragulaDraggable` plugins. 

Integration: enable dropping to third-party lists by setting `externalDrop` to `true` in the `sortableJsDraggable` or/and `dragulaDraggable` plugin’s `options` configuration and use the `onExternalDrop` callback to update the list. This function returns the following arguments:
- `afterElement` - *HTMLElement* - the list element before which the clone is dropped.
- `container` - *HTMLElement* - the list container.
- `dragData` - *MbscCalendarEvent | MbscResource* - the dragged data. 
- `position` - *number* - the index where the clone is dropped.

```ts
  // options object of the sortableJsDraggable or dragulaDraggable
  // enable drop from Eventcalendar to Dragula or SortableJS list 
  externalDrop: true,
  // update the list items after drop event
  onExternalDrop: (args) => {
    var newListItem = document.createElement('li');
    newItem.className = 'my-list-item';
    newItem.setAttribute( 'data-drag-data', JSON.stringify(args.dragData));
    newItem.textContent = args.dragData.title;
    args.container.insertBefore(newItem, args.afterElement || null);
  },
```
