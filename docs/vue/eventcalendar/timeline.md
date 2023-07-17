---
sidebar_position: 5
sidebar_label: Timeline
displayed_sidebar: vueSidebar
---

import Options from '../\_auto-generated/eventcalendar/options_timeline.md';
import Events from '../\_auto-generated/eventcalendar/events_timeline.md';
import Localizations from '../\_auto-generated/eventcalendar/localizations_timeline.md';

# Timeline

The timeline view displays a timeline with its related events. It can be configured as a daily, weekly, monthly or yearly timeline.
Work hours and work days along with disabled time-spans, breaks can be added. Use it to for advanced scheduling tasks with built-in drag & drop.

The displayed week days can be modified with the `startDay` and `endDay` properties of the [view](./api#opt-view) option.

The displayed hours can be modified with the `startTime` and `endTime` properties of the [view](./api#opt-view) option.
With these properties both hours and minutes can be specified.

![Desktop monthly timeline](https://mobiscroll.com/Content/img/docs/desktop-timeline.png)

## Resource grouping and hierarchy

The timeline view supports resource hierarchy. Hierarchy groups can be defined with the `children` property of the resource object. Child objects are also resources and have the same properties, thus they can also have children.

```javascript title="Multi-level hierarchy groups"
resources: [{
    name: 'Site 1',
    children: [{
        name: 'Building 1'
        children: [{
            name: 'Room 1'
        }, {
            name: 'Room 2'
        }]
    }, {
        name: 'Building 2'
    }]
}, {
    name: 'Site 2',
    children: [{
        name: 'Building A'
    }]
}]
```

By default every resource group will be displayed and this can be modified with the `collapsed` attribute of the parent objects.

```javascript title="Collapsed groups"
resources: [{
    name: 'Main Building',
    id: 'main',
    description: 'Used the most for scheduling'
    collapsed: true,
    children: [{
        name: 'Big conf. room'
        id: 'bfg',
    }, {
        name: 'Smaller conf. room'
        id: 'sfg',
    }]
}, {
    name: 'Secondary Building',
    id: 'sec',
    description: 'For smaller, less important meetings'
    collapsed: false,
    children: [...]
}, {
    name: 'Long forgotten Cave',
    id: 'cave',
    description: 'Where developers used to work'
    collapsed: false,
}],
```

Both parent and child rows can contain events and events can be moved between any rows.

```javascript title="Resources & events"
resources: [{
    name: 'Main Building',
    id: 'main',
    children: [{
        name: 'Big conf. room'
        id: 'bfg',
    }]
}, {
    name: 'Secondary Building',
    id: 'sec',
}],
data: [
    { title: 'Open day celebration', resource: 'main', date: '2023-08-24'},
    { title: 'Monthly staff meeting', resource: 'bfg', start: '2023-08-01T11:00', end: '2023-08-01T11:00' },
    { title: 'Weekly chit-chat', resource: 'sec', start: '2023-08-02T09:00', end: '2023-08-02T09:40' },
    ...
]
```


Child or parent rows can be disabled by creating an [invalid rule](#opt-invalid) which repeats daily and it is tied to the specific resources. Example:

```javascript title="Disable parent and/or child resources"
invalid: [
    { recurring: { repeat: 'daily' }, resource: [/* resource id(s) */] }
]
```

## Slots

Besides the [resources](#opt-resources) which are grouping data for the whole date range, [slots](#opt-slots) introduce a horizontal daily grouping in case of the timeline view. Slots can be used alongside resources.

When slots are used the timeline view will display in daily listing mode and only the [dragToMove](#opt-dragToMove) event iteraction will be available. The [dragToCreate](#opt-dragToCreate) and [dragToResize](#opt-dragToResize) interactions will be truned off.

```javascript title="Slots used for work shift management"
slots: [{
    id: 1,
    name: 'Morning shift',
}, {
    id: 2,
    name: 'Afternoon shift',
}]
```


![Timeline slots](https://mobiscroll.com/Content/img/docs/timeline-slots.png)

<!-- The [renderSlot](#renderer-renderSlot) option can be used to customize the slot template of the timeline view. -->

<div className="option-list">

## Options

<Options />

## Events

<Events />

## Localization

<Localizations />

</div>
