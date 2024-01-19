---
sidebar_position: 4
sidebar_label: Scheduler
displayed_sidebar: jquerySidebar
---

import Options from '../\_auto-generated/eventcalendar/options_scheduler.md';
import Events from '../\_auto-generated/eventcalendar/events_scheduler.md';
import Localizations from '../\_auto-generated/eventcalendar/localizations_scheduler.md';
import Slots from '../_auto-generated/eventcalendar/renderers_scheduler.md';

# Scheduler

The scheduler displays a time grid with its related events. It can be configured as a daily or weekly schedule.
Work hours and work days along with disabled time-spans, breaks can be added. Use it for advanced scheduling tasks with built-in drag & drop.

The displayed week days can be modified with the `startDay` and `endDay` properties of the [view](./api#opt-view) option.

The displayed hours and minutes can be modified with the `startTime` and `endTime` properties of the [view](./api#opt-view) option.

```javascript title="Work-week configuration example"
$('#myDiv').mboiscroll().eventcalendar({
  view: {
    schedule: {
      type: 'week',
      startDay: 1, // Monday
      endDay: 5, // Friday
      startTime: '07:30',
      endTime: '18:30',
    }
  }
});
```

<div className="img-row">
    <img className="w70 pdg-img" src="https://docs.mobiscroll.com/Content/img/docs/desktop-schedule.png" width="759" height="375" />
    <img className="w30 pdg-img" src="https://docs.mobiscroll.com/Content/img/docs/mobile-schedule.png" width="410" height="205" />
</div>

## View Combination

The daily scheduler can also be combined with the calendar week view. The view option will look like the following:

```javascript title="Daily Scheduler combined with Weekly Calendar"
$('#myDiv').mboiscroll().eventcalendar({
  view: {
    calendar: {
      type: 'week'
    },
    schedule: {
      type: 'day'
    }
  }
});
```

## Resource grouping

The scheduler view can display multiple [resources](resources) inside a single instance. By default the displayed resources will be grouped by the given resources and the grouping can be changed with the [`groupBy`](#opt-groupBy) option, which also supports grouping by date.

<div className="img-row">
    <div className="pdg-img">
        <img src="https://docs.mobiscroll.com/Content/img/docs/groupbydate.png" />
        <label className="img-label">Resources grouped by date</label>
    </div>
    <div className="pdg-img">
        <img src="https://docs.mobiscroll.com/Content/img/docs/groupbyresource.png" />
        <label className="img-label">Resources grouped by resource</label>
    </div>
    <div className="pdg-img">
        <img src="https://docs.mobiscroll.com/Content/img/docs/groupbydayview.png" />
        <label className="img-label">Resources grouped by day view</label>
    </div>
</div>

```javascript title="Grouping resources by date"
$('#myDiv').mboiscroll().eventcalendar({
  // highlight-next-line
  groupBy: 'date',
  resources: [{
    id: 1,
    name: 'Ryan',
    color: '#f7c4b4'
  }, {
    id: 2,
    name: 'Kate',
    color: '#c6f1c9'
  }, {
    id: 3,
    name: 'John',
    color: '#e8d0ef'
  }]
});
```

The color property controls the default event color of the resource. If an event doesn't have a specified color it will inherit from the resource. The [agenda](agenda) and [calendar view](calendar) events and labels will also inherit the resource color.

[Events](#opt-data), [colors](#opt-colors), [invalids](#opt-invalids) can be tied to a single or multiple resources. This can be done with the `resource` property of the objects, where the id of the resource should be passed. It can be a single value where the element would be linked to a single resource or in case of an array the element will show up at all of the specified resources. If no resource property is specified to the color/event/invalid object then the element will show up in every resource group.

```javascript title="Invalid rule tied to a single resource"
$('#myDiv').mboiscroll().eventcalendar({
  invalid: [{
    // highlight-next-line
    resource: 1, // this invalid will be displayed only in resource group where id is 1
    start: '13:00',
    end: '12:00',
    recurring: { repeat: 'weekly', weekDays: 'MO,TU,WE,TH,FR' },
    title: 'Lunch break'
  }]
});
```

```javascript title="Event tied to multiple resources"
$('#myDiv').mboiscroll().eventcalendar({
  data: [{
    // highlight-next-line
    resource: [2, 3] // this event will be displayed in resource groups where id is 2 and 3
    start: new Date(2021, 5, 23),
    end: new Date(2021, 5, 30),
    title: 'Conference',
    allDay: true,
  }]
});
```

```javascript title="Color rule for all the resources (resource not specified)"
$('#myDiv').mboiscroll().eventcalendar({
  colors: [{
    // highlight-next-line
    // this color will display at every resource group
    start: new Date(2021, 5, 12, 16),
    end: new Date(2021, 5, 12, 17),
    color: "green",
  }]
});
```

## Row height

There might be cases when you would like to change the height of the schedule cell. You can use the following CSS classes for this purpose:

```css
.mbsc-schedule-time-wrapper,
.mbsc-schedule-item {
  height: 20px;
}
```

## Column width

You can use the following CSS classes for changing column widths of the scheduler:

```css
.mbsc-schedule-col-width {
  width: 100px;
}
```


<div className="option-list">

## API

### Options

<Options />

### Events

<Events />

### Localization

<Localizations />

### Renderers

<Slots />

</div>
