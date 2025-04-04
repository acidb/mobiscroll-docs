---
sidebar_position: 9
sidebar_label: Drag & drop
displayed_sidebar: angularSidebar
title: Drag & drop
---

import DropcontainerEvents from '../_auto-generated/dropcontainer/events.md';

import Content from '../../_shared/eventcalendar/dnd-internal.mdx';
import { toc as intTOC } from '../../_shared/eventcalendar/dnd-internal.mdx';

export const toc = [...intTOC,
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