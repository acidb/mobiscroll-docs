---
sidebar_position: 5
sidebar_label: Timeline
displayed_sidebar: angularSidebar
---

import Options from '../\_auto-generated/eventcalendar/options_timeline.md';
import Events from '../\_auto-generated/eventcalendar/events_timeline.md';
import Localizations from '../\_auto-generated/eventcalendar/localizations_timeline.md';
import Templates from '../_auto-generated/eventcalendar/renderers_timeline.md';
import Types from '../_auto-generated/eventcalendar/types_timeline.md';

# Timeline

The timeline view displays a timeline with its related events. It can be configured as a daily, weekly, monthly or yearly timeline.
Work hours and work days along with disabled time-spans, breaks can be added. Use it to for advanced scheduling tasks with built-in drag & drop.

The displayed week days can be modified with the `startDay` and `endDay` properties of the [view](./api#opt-view) option.

The displayed hours can be modified with the `startTime` and `endTime` properties of the [view](./api#opt-view) option.
With these properties both hours and minutes can be specified.

![Desktop monthly timeline](https://mobiscroll.com/Content/img/docs/desktop-timeline.png)

## Resource grouping and hierarchy

The timeline view supports resource hierarchy. Hierarchy groups can be defined with the `children` property of the resource object. Child objects are also resources and have the same properties, thus they can also have children.

```ts title="Multi-level hierarchy groups"
import { MbscResource } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  myResources: MbscResource[] = [{
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
  }];
}
```
```html
<mbsc-eventcalendar [resources]="myResources"></mbsc-eventcalendar>
```

By default every resource group will be displayed and this can be modified with the `collapsed` attribute of the parent objects.

```ts title="Collapsed groups"
import { MbscResource } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  myResources: MbscResource[] = [{
    name: 'Main Building',
    id: 'main',
    description: 'Used the most for scheduling'
    // highlight-next-line
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
    // highlight-next-line
    collapsed: false,
    children: [...]
  }, {
    name: 'Long forgotten Cave',
    id: 'cave',
    description: 'Where developers used to work'
    // highlight-next-line
    collapsed: false,
  }];
}
```
```html
<mbsc-eventcalendar [resources]="myResources"></mbsc-eventcalendar>
```

Both parent and child rows can contain events and events can be moved between any rows.

```ts title="Resources & events"
import { MbscResource, MbscCalendarEvent } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  myResources: MbscResource[] = [{
    name: 'Main Building',
    id: 'main',
    children: [{
      name: 'Big conf. room'
      id: 'bfg',
    }]
  }, {
    name: 'Secondary Building',
    id: 'sec',
  }];

  myEvents: MbscCalendarEvent[] = [
    { title: 'Open day celebration', resource: 'main', date: '2023-08-24'},
    { title: 'Monthly staff meeting', resource: 'bfg', start: '2023-08-01T11:00', end: '2023-08-01T11:00' },
    { title: 'Weekly chit-chat', resource: 'sec', start: '2023-08-02T09:00', end: '2023-08-02T09:40' },
    // ...
  ];
}
```
```html
<mbsc-eventcalendar [resources]="myResources" [data]="myEvents"></mbsc-eventcalendar>
```

Child or parent rows can be disabled by creating an [invalid rule](#opt-invalid) which repeats daily and it is tied to the specific resources. Example:

```jsx title="Disable parent and/or child resources"
import { MbscDateType } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  myInvalid: MbscDateType[] = [
    {
      recurring: { repeat: "daily" },
      resource: [
        /* resource id(s) */
      ],
    },
  ];
}
```
```html
<mbsc-eventcalendar [invalid]="myInvalid"></mbsc-eventcalendar>
```

## Event slots

Besides the [`resources`](#opt-resources) which are grouping data for the whole date range, [`slots`](#opt-slots) introduce a horizontal daily grouping in case of the timeline view. Slots can be used alongside resources.

When slots are used the timeline view will display in daily listing mode and only the [`dragToMove`](#opt-dragToMove) event iteraction will be available. The [`dragToCreate`](#opt-dragToCreate) and [`dragToResize`](#opt-dragToResize) interactions will be truned off.

```ts title="Slots used for work shift management"
import { MbscSlot } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  myShifts: MbscSlot[] = [
    {
      id: 1,
      name: "Morning shift",
    },
    {
      id: 2,
      name: "Afternoon shift",
    },
  ];
}
```
```html
<mbsc-eventcalendar [slots]="myShifts"></mbsc-eventcalendar>
```

![Timeline slots](https://mobiscroll.com/Content/img/docs/timeline-slots.png)

The [slotTemplate](#template-slotTemplate) can be used to customize the slot template of the timeline view.

## Event connections

The timeline view can display connections between events. Events will be linked with lines and additionally arrows can be displayed to illustrate the direction of the connection. Events can have multiple connections simultaneously. Connections can be specified with the [`connections`](#opt-connections) option.

![Timeline event connections](https://mobiscroll.com/Content/img/docs/event-connections.png)

## Row height

There are three CSS classes which can be used for changing the height of resource rows.

1. For setting the resource row heights in general, you can use the `.mbsc-timeline-row` class.

   ```css
   .mbsc-timeline-row {
     height: 80px;
   }
   ```

2. For setting the height of the parent resources, you can use the `.mbsc-timeline-parent` class.

   ```css
   .mbsc-timeline-parent {
     height: 30px;
   }
   ```

   :::info
   There's minimum height of the rows which can only be decreased if the event creation is disabled on the relevant resource. You can prevent event creation by using the `eventCreation` property of the the [`resources`](#opt-resources) option.
   :::

3. For customizing the remaining empty space below the events, you can use the `.mbsc-timeline-row-gutter` class.

   ```css
   .mbsc-timeline-row-gutter {
     height: 6px;
   }
   ```

## Column width

Setting the timeline grid column widths can be done with the following css rule:

```css
.mbsc-timeline-header-column,
.mbsc-timeline-column {
  width: 3em;
}
```

:::caution
You need to apply these rules after the mobiscroll default rules, otherwise the default rules will take precedence over them.
:::

## Resource column width

The width of the resources column on the timeline view is fixed. It can be overwritten from CSS using the following rules:

```css title="Custom resource column width"
.mbsc-timeline-resource-col {
  width: 200px;
}

/* For sticky event labels */
@supports (overflow: clip) {
  .mbsc-timeline.mbsc-ltr .mbsc-schedule-event-inner {
    left: 200px;
  }

  .mbsc-timeline.mbsc-rtl .mbsc-schedule-event-inner {
    right: 200px;
  }
}
```

## Templating

### Resources, Sidebar, Footer
The display of timeline resources can be customized with angular templates. The [resourceTemplate](#template-resourceTemplate)
and [resourceHeaderTemplate](#template-resourceHeaderTemplate) can be used to customize the resources.

Besides the resources, an additional sidebar can be rendered on the opposite end of the row through the [sidebarTemplate](#template-sidebarTemplate) option, and a header for it, using the [sidebarHeaderTemplate](#template-sidebarHeaderTemplate) option.

A footer can be rendered as well for each day using the [dayFooterTemplate](#template-dayFooterTemplate) option. When a footer is used, the [resourceFooterTemplate](#template-resourceFooterTemplate) and [sidebarFooterTemplate](#template-sidebarFooterTemplate) can be defined as well.

![Timeline resource, sidebar and footer templating](https://mobiscroll.com/Content/img/docs/resource-sidebar-footer.png)

### Header

The header of the timeline can also be customized with templates. Depending on the resolution, the first timeline row under the navigation header can show a line for each of the following:

 * [hour](#template-hourTemplate)
 * [day](#template-dayTemplate)
 * [week](#template-weekTemplate)
 * [month](#template-monthTemplate)
 * [quarter](#template-quarterTemplate)
 * [year](#template-yearTemplate)

Each of these resolution has its own template for the header and the footer. For example there is the  [`hourTemplate`](#template-hourTemplate) for the header and [`hourFooterTemplate`](#template-hourFooterTemplate) for the footer. In similar fashion, each item in the list above has a footer pair as well.

<div className="option-list">

## API

### Options

<Options />

### Events

<Events />

### Localization

<Localizations />

<div className="option-list-templates">

### Templates

<Templates />

</div>

### Types

<Types />

</div>
