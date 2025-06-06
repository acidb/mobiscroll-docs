---
sidebar_position: 5
sidebar_label: Upgrade guide v6
displayed_sidebar: javascriptSidebar
title: Mobiscroll 6 upgrade guide
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

This guide outlines all the major changes, deprecations, and removals introduced in Mobiscroll version 6. It includes detailed explanations and practical migration examples to help you upgrade from v5.

## Browser Support

Starting with Mobiscroll 6.0, we dropped support for IE11. Additionally, we updated the minimum supported browser versions:

* Chrome 56
* Firefox 32
* iOS/Safari 13
* Edge 79

## Frameworks

Starting with Mobiscroll 6.0, we updated the minimum supported language versions. If you're using TypeScript, please make sure you're on version 4 or newer.

## General

### Sass updates

Starting with Mobiscroll 6.0, we updated our `Sass` code to remove deprecated functions. The minimum supported `Sass` version is now [1.80.0.](https://www.npmjs.com/package/sass), and we no longer support [node-sass](https://www.npmjs.com/package/node-sass). If you're currently using `node-sass`, we recommend switching to the [sass](https://www.npmjs.com/package/sass) package, which is now the primary implementation. For help with the migration, refer to the official [Sass upgrade guide](https://sass-lang.com/blog/libsass-is-deprecated/#how-do-i-migrate).

## Datepicker

### Changed

We changed the default [refDate](/javascript/datepicker/api#opt-refDate) from 1970/01/01 to today.

### Removed

We removed the `weeks` option. Use [calendarSize](/javascript/datepicker/api#opt-calendarSize) instead.

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
mobiscroll.datepicker('#myID', {
  weeks: 6
}
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
mobiscroll.datepicker('#myID', {
  calendarSize: 6
}
```

  </TabItem>
</Tabs>

## Agenda

We performed a cleanup and standardization of renderer option names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

### Changed

We changed the default [refDate](/javascript/eventcalendar/api#opt-refDate) from 1970/01/01 to today.

We renamed the `renderEvent` option to [renderAgendaEvent](/javascript/eventcalendar/api#renderer-renderAgendaEvent).   
We renamed the `renderEventContent` option to [renderAgendaEventContent](/javascript/eventcalendar/api#renderer-renderAgendaEventContent).  
We renamed the `renderDay` option to [renderAgendaDay](/javascript/eventcalendar/api#renderer-renderAgendaDay).  

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
mobiscroll.eventcalendar('#myID', {
  renderEvent: myRender
});
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
mobiscroll.eventcalendar('#myID', {
  renderAgendaEvent: myRender
});
```

  </TabItem>
</Tabs>


## Eventcalendar

We performed a cleanup and standardization of renderer option names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

### Changed

We changed the default [refDate](/javascript/eventcalendar/api#opt-refDate) from 1970/01/01 to today.

We renamed the `renderLabel` option to [renderCalendarEvent](/javascript/eventcalendar/api#renderer-renderCalendarEvent).  
We renamed the `renderLabelContent` option to [renderCalendarEventContent](/javascript/eventcalendar/api#renderer-renderCalendarEventContent).  
We renamed the `renderEvent` option to [renderPopoverEvent](/javascript/eventcalendar/api#renderer-renderPopoverEvent).  
We renamed the `renderEventContent` option to [renderPopoverEventContent](/javascript/eventcalendar/api#renderer-renderPopoverEventContent).  
We renamed the `renderDay` option to [renderCalendarDay](/javascript/eventcalendar/api#renderer-renderCalendarDay).  
We renamed the `renderDayContent` option to [renderCalendarDayContent](/javascript/eventcalendar/api#renderer-renderCalendarDayContent).


<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
mobiscroll.eventcalendar('#myID', {
  renderLabel: myRender
});
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
mobiscroll.eventcalendar('#myID', {
  renderCalendarEvent: myRender
});
```

  </TabItem>
</Tabs>


## Scheduler

### Header consistency

We unified the Scheduler header layout across different view configurations. The single-day view with resources now uses the same header structure as multi-day (e.g., weekly, monthly or daily) views. This ensures a consistent look and feel regardless of the selected view type.


### Changed

We performed a cleanup and standardization of renderer option names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

We renamed the `renderScheduleEvent` option to [renderSchedulerEvent](/javascript/eventcalendar/api#renderer-renderSchedulerEvent).  
We renamed the `renderScheduleEventContent` option to [renderSchedulerEventContent](/javascript/eventcalendar/api#renderer-renderSchedulerEventContent).  
We renamed the `renderDay` option to [renderSchedulerDay](/javascript/eventcalendar/api#renderer-renderSchedulerDay).  
We renamed the `renderDayContent` option to [renderSchedulerDayContent](/javascript/eventcalendar/api#renderer-renderSchedulerDayContent).  


<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
mobiscroll.eventcalendar('#myID', {
  renderScheduleEvent: myRender
});
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
mobiscroll.eventcalendar('#myID', {
  renderSchedulerEvent: myRender
});
```

  </TabItem>
</Tabs>

We also renamed the `schedule` [view](/javascript/eventcalendar/api#opt-view) to `scheduler`:

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
mobiscroll.eventcalendar('#myID', {
  view: { schedule: { type: 'day' } }
});
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
mobiscroll.eventcalendar('#myID', {
  view: { scheduler: { type: 'day' } }
});
```

  </TabItem>
</Tabs>

## Timeline

We performed a cleanup and standardization of renderer option names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

### Changed

We renamed the `renderScheduleEvent` option to [renderTimelineEvent](/javascript/eventcalendar/api#renderer-renderTimelineEvent).  
We renamed the `renderScheduleEventContent` option to [renderTimelineEventContent](/javascript/eventcalendar/api#renderer-renderTimelineEventContent).  
We renamed the `renderDay` option to [renderTimelineDay](/javascript/eventcalendar/api#renderer-renderTimelineDay).  

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
mobiscroll.eventcalendar('#myID', {
  renderScheduleEvent: myRender
});
```
  </TabItem>
  <TabItem value="new" label="New code">

```jsx
mobiscroll.eventcalendar('#myID', {
  renderTimelineEvent: myRender
});
```

  </TabItem>
</Tabs>

We added a new `eventDisplay` property to the [view](/javascript/eventcalendar/api#opt-view) option that takes `'exact'` or `'fill'` as values, and deprecated the `eventList` boolean property.

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
mobiscroll.eventcalendar('#myID', {
  view: { timeline: { type: 'day', eventList: true } }
});
```
  </TabItem>
  <TabItem value="new" label="New code">

```jsx
mobiscroll.eventcalendar('#myID', {
  view: { timeline: { type: 'day', eventDisplay: 'fill' } }
});
```

  </TabItem>
</Tabs>

### Removed

We removed the deprecated `resolution` property from the [view](/javascript/eventcalendar/api#opt-view) option. Use the `resolutionHorizontal` property instead.

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
mobiscroll.eventcalendar('#myID', {
  view: { timeline: { type: 'day', resolutiuon: 'hour' } }
});
```
  </TabItem>
  <TabItem value="new" label="New code">

```jsx
mobiscroll.eventcalendar('#myID', {
  view: { timeline: { type: 'day', resolutiuonHorizontal: 'hour' } }
});
```

  </TabItem>
</Tabs>
