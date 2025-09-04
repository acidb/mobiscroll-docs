---
sidebar_position: 9
sidebar_label: Drag & drop
displayed_sidebar: angularSidebar
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
];

<Content />

<h3 id="draggable">Draggable</h3>

You can initialize the draggable containers by using the `mbsc-draggable` directive on the element.

```html
<div mbsc-draggable [dragData]="myEvent">
  <div>My Draggable event</div>
</div>

<mbsc-eventcalendar [externalDrop]="true"></mbsc-eventcalendar>
```
```ts
import { MbscCalendarEvent } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  myEvent: MbscCalendarEvent = {
    title: "My new 3h long event",
    start: new Date(2023, 10, 10, 12),
    end: new Date(2023, 10, 10, 15),
    color: "green",
  };
}
```

<h3 id="draggable-options">Draggable options</h3>

<div className="option-list">
  <DraggableOptions />
</div>

<h3 id="third-party-dragging-support">Third party dragging libraries</h3>

Mobiscroll comes with built-in support for two of the most popular dragging libraries: [SortableJS](https://sortablejs.github.io/Sortable/) and [Dragula](https://bevacqua.github.io/dragula/). With the `sortableJsDraggable` and `dragulaDraggable` plugins, you can seamlessly drag items into the Eventcalendar with just a few lines of code.   

<h4 id="sortable-js">SortableJS:</h4>

Integration: call the `sortableJsDraggable` plugin’s `init()` method and pass the SortableJS instance along with the `options` object.
The options object can include the following properties: 
- `cloneSelector` - *string* -  the selector of the SortableJS clone element, typically `'.sortable-drag'`
- `dragData` - *(el: HTMLElement) => MbscCalendarEvent | MbscResource* - function to build the resource or event object. Defaults to `data-drag-data` attribute on the element. 
- `type` - *'event' | 'resource'* - Creates an event or resource on the Eventcalendar. Defaults to `'event'`

```html
<div class="mbsc-form-group-title">Sortable appointments</div>
<div #sortableList>
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

<mbsc-eventcalendar
  [externalDrop]="true"
>
</mbsc-eventcalendar>
```

```ts
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { sortableJsDraggable } from '@mobiscroll/angular';
import Sortable from 'sortablejs';

@Component({...})
export class MyComponent implements AfterViewInit {
  @ViewChild('sortableList', { static: true })
  public sortableList!: ElementRef;

  public ngAfterViewInit() {
    const sortableInst = new Sortable(this.sortableList.nativeElement, {
      animation: 150,
      forceFallback: true,
    });
    sortableJsDraggable.init(sortableInst, {
      cloneSelector: '.sortable-drag',
    });
  }
}
```

:::info
The SortableJS integration works only if fallback mode is used.  
The `cloneSelector` must be set in the `options` object.
:::

<h4 id="dragula">Dragula:</h4>

Integration: call the `dragulaDraggable` plugin’s `init()` method and pass the Dragula instance, optionally providing an `options` object to customize the behavior.
The options object can include the following properties:
- `dragData` - *(el: HTMLElement) => MbscCalendarEvent | MbscResource* - function to build the resource or event object. Defaults to `data-drag-data` attribute on the element.
- `type` - *'event' | 'resource'* - Creates an event or resource on the Eventcalendar. Defaults to `'event'`


```html
<div class="mbsc-form-group-title">Dragula appointments</div>
<div #dragulaList>
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

<mbsc-eventcalendar
  [externalDrop]="true"
>
</mbsc-eventcalendar>
```

```ts
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import dragula from 'dragula';
import { dragulaDraggable } from '@mobiscroll/angular';

@Component({...})
export class MyComponent implements AfterViewInit {
  @ViewChild('dragulaList', { static: true })
  public dragulaList!: ElementRef;

  public ngAfterViewInit() {
     const drake = dragula([dragulaList], {
      copy: true,
    });
    dragulaDraggable.init(drake);
  }
}
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
<mbsc-dropcontainer (onItemDrop)="unscheduleEvent($event)">
  <div>My Unscheduled events:</div>
  <ul>
    <li *ngFor="let event of myUnscheduledEvents" mbsc-draggable [dragData]="event">
      <div>{{event.title}}</div>
    </li>
  </ul>
</mbsc-dropcontainer>

<mbsc-eventcalendar [externalDrop]="true" [externalDrag]="true" [dragToCreate]="true" [dragToMove]="true"
  (onEventCreate)="scheduleEvent($event)"></mbsc-eventcalendar>
```
```ts
import { MbscCalendarEvent, MbscEventCreateEvent, MbscItemDragEvent } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  myUnscheduledEvents: MbscCalendarEvent[] = [{
    id: 1,
    title: "My new 3h long event",
    start: new Date(2023, 10, 10, 12),
    end: new Date(2023, 10, 10, 15),
    color: "green",
  }];

  unscheduleEvent(dropEvent: MbscItemDragEvent) {
    this.myUnscheduledEvents = [...this.myUnscheduledEvents, dropEvent.data]
  }

  scheduleEvent(args: MbscEventCreateEvent) {
    this.myUnscheduledEvents = this.myUnscheduledEvents.filter(item => item.id !== args.event.id);
  }
}
```

<h3 id="dropcontainer-events">Dropcontainer events</h3>

<div className="option-list">

<DropcontainerEvents />

</div>