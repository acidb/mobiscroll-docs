---
sidebar_position: 9
sidebar_label: Drag & drop
displayed_sidebar: jquerySidebar
title: Drag & drop
---

import DropcontainerEvents from '../_auto-generated/dropcontainer/events.md';
import DraggableOptions from '../_auto-generated/draggable/options.md';
import SortableOptions from '../_auto-generated/sortablejsdraggable/options.md';
import DragulaOptions from '../_auto-generated/draguladraggable/options.md';

import Content from '../../_shared/eventcalendar/dnd-internal.mdx';
import { toc as intTOC } from '../../_shared/eventcalendar/dnd-internal.mdx';

export const toc = [...intTOC,
  { value: 'Draggable', level: 3, id: 'draggable'},
  { value: 'Draggable options', level: 3, id: 'draggable-options'},
  { value: 'Third party dragging support', level: 3, id: 'third-party-dragging-support'},
  { value: 'SortableJs draggable options', level: 3, id: 'sortable-draggable-options'},
  { value: 'Dragula draggable options', level: 3, id: 'dragula-draggable-options'},
  { value: 'The Eventcalendar as source', level: 2, id: 'the-eventcalendar-as-source'},
  { value: 'Dropcontainer', level: 3, id: 'dropcontainer'},
  { value: 'Dropcontainer events', level: 3, id: 'dropcontainer-events'},
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
$('#myDraggableCont').mobiscroll().draggable({
  dragData: {
    title: "My new 3h long event",
    start: new Date(2023, 10, 10, 12),
    end: new Date(2023, 10, 10, 15),
    color: "green",
  }
});

$('#myDiv').mobiscroll().eventcalendar({
  externalDrop: true,
});
```

<h3 id="draggable-options">Draggable options</h3>

<div className="option-list">
  <DraggableOptions />
</div>

<h3 id="third-party-dragging-support">Third party dragging libraries</h3>

Mobiscroll comes with built-in support for two of the most popular dragging libraries: [SortableJS](https://sortablejs.github.io/Sortable/) and [Dragula](https://bevacqua.github.io/dragula/). With the `sortableJsDraggable` and `dragulaDraggable` plugins, you can seamlessly drag items into the Eventcalendar with just a few lines of code.   

<h4 id="sortable-js">SortableJS:</h4>

Integration: call the `sortableJsDraggable` plugin’s `init()` method and pass the SortableJS instance along with the `options:`[`MbscSortableJsDraggableOptions`](#sortable-draggable-options) object.

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
The `cloneSelector` must be set in the `options:`[MbscSortableJsDraggableOptions](#sortable-draggable-options) object.
:::

<h4 id="dragula">Dragula:</h4>

Integration: call the `dragulaDraggable` plugin’s `init()` method and pass the Dragula instance, optionally providing an `options:`[MbscDragulaDraggableOptions](#dragula-draggable-options) object to customize the behavior.


```html
<div class="mbsc-form-group-title">Sortable appointments</div>
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

<h3 id="sortable-draggable-options">SortableJS draggable options</h3>

<div className="option-list">
  <SortableOptions />
</div>

<h3 id="dragula-draggable-options">Dragula draggable options</h3>

<div className="option-list">
  <DragulaOptions />
</div>

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
$('#myDropcontainer').mobiscroll().dropcontainer({
  onItemDrop: function(dropEvent) {
    if (dropEvent.data) {
      const ev = dropEvent.data;
      const el = $(`<div id="myDrag${ev.id}"><div>${ev.title}</div></div>`);
      $('#myList').append(el);
      el.mobiscroll().draggable({
        dragData: ev
      });
    }
  }
});

$('#myDiv').mobiscroll().eventcalendar({
  externalDrop: true,
  externalDrag: true,
  dragToCreate: true,
  dragToMove: true,
  onEventCreate: function (args) {
    const ev = args.event;
    $('#myDrag' + ev.id).remove();
  }
});
```

<h3 id="dropcontainer-events">Dropcontainer events</h3>

<div className="option-list">

<DropcontainerEvents />

</div>