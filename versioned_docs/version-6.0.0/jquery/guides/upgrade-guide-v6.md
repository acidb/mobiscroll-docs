---
sidebar_position: 5
sidebar_label: Upgrade guide v6
displayed_sidebar: jquerySidebar
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

Starting with Mobiscroll 6.0, we updated the minimum supported language versions. Please make sure you're using TypeScript 4 or newer.


## General

### `refDate` option change

We changed the default [refDate](/jquery/eventcalendar/api#opt-refDate) to today.


## Datepicker

### Changed

We changed the default [refDate](/jquery/datepicker/api#opt-refDate) to today.

### Removed

We removed the `weeks` option. Use [calendarSize](/jquery/datepicker/api#opt-calendarSize) instead.

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
weeks: 6
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
calendarSize: 6
```

  </TabItem>
</Tabs>

## Agenda

We performed a cleanup and standardization of renderer option names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

### Changed

We changed the default [refDate](/jquery/eventcalendar/api#opt-refDate) to today.

We renamed the `renderEvent` option to [renderAgendaEvent](/jquery/eventcalendar/api#renderer-renderAgendaEvent).   
We renamed the `renderEventContent` option to [renderAgendaEventContent](/jquery/eventcalendar/api#renderer-renderAgendaEventContent).  
We renamed the `renderDay` option to [renderAgendaDay](/jquery/eventcalendar/api#renderer-renderAgendaDay).  

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
$('#myid').mobiscroll().eventcalendar({
  renderEvent: myRender
});
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
$('#myid').mobiscroll().eventcalendar({
  renderAgendaEvent: myRender
});
```

  </TabItem>
</Tabs>


## Eventcalendar

We performed a cleanup and standardization of renderer option names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

### Changed

We changed the default [refDate](/jquery/eventcalendar/api#opt-refDate) to today.

We renamed the `renderLabel` option to [renderCalendarEvent](/jquery/eventcalendar/api#renderer-renderCalendarEvent).  
We renamed the `renderLabelContent` option to [renderCalendarEventContent](/jquery/eventcalendar/api#renderer-renderCalendarEventContent).  
We renamed the `renderEvent` option to [renderPopoverEvent](/jquery/eventcalendar/api#renderer-renderPopoverEvent).  
We renamed the `renderEventContent` option to [renderPopoverEventContent](/jquery/eventcalendar/api#renderer-renderPopoverEventContent).  
We renamed the `renderDay` option to [renderCalendarDay](/jquery/eventcalendar/api#renderer-renderCalendarDay).  
We renamed the `renderDayContent` option to [renderCalendarDayContent](/jquery/eventcalendar/api#renderer-renderCalendarDayContent).


<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
$('#myid').mobiscroll().eventcalendar({
  renderLabel: myRender
});
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
$('#myid').mobiscroll().eventcalendar({
  renderCalendarEvent: myRender
});
```

  </TabItem>
</Tabs>


## Scheduler

We performed a cleanup and standardization of renderer option names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

### Changed

We changed the default [refDate](/jquery/eventcalendar/api#opt-refDate) to today.  

We renamed the `renderScheduleEvent` option to [renderSchedulerEvent](/jquery/eventcalendar/api#renderer-renderSchedulerEvent).  
We renamed the `renderScheduleEventContent` option to [renderSchedulerEventContent](/jquery/eventcalendar/api#renderer-renderSchedulerEventContent).  
We renamed the `renderDay` option to [renderSchedulerDay](/jquery/eventcalendar/api#renderer-renderSchedulerDay).  
We renamed the `renderDayContent` option to [renderSchedulerDayContent](/jquery/eventcalendar/api#renderer-renderSchedulerDayContent).  


<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
$('#myid').mobiscroll().eventcalendar({
  renderScheduleEvent: myRender
});
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
$('#myid').mobiscroll().eventcalendar({
  renderSchedulerEvent: myRender
});
```

  </TabItem>
</Tabs>

We also renamed the `schedule` [view](/jquery/eventcalendar/api#opt-view) to `scheduler`:

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
$('#myid').mobiscroll().eventcalendar({
  view: { schedule: { type: 'day' } }
});
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
$('#myid').mobiscroll().eventcalendar({
  view: { scheduler: { type: 'day' } }
});
```

  </TabItem>
</Tabs>

## Timeline

We performed a cleanup and standardization of renderer option names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

### Changed

We changed the default [refDate](/jquery/eventcalendar/api#opt-refDate) to today.  

We renamed the `renderScheduleEvent` option to [renderTimelineEvent](/jquery/eventcalendar/api#renderer-renderTimelineEvent).  
We renamed the `renderScheduleEventContent` option to [renderTimelineEventContent](/jquery/eventcalendar/api#renderer-renderTimelineEventContent).  
We renamed the `renderDay` option to [renderTimelineDay](/jquery/eventcalendar/api#renderer-renderTimelineDay).  

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
$('#myid').mobiscroll().eventcalendar({
  renderScheduleEvent: myRender
});
```
  </TabItem>
  <TabItem value="new" label="New code">

```jsx
$('#myid').mobiscroll().eventcalendar({
  renderTimelineEvent: myRender
});
```

  </TabItem>
</Tabs>

We added a new `eventDisplay` prop under [view](/jquery/eventcalendar/api#opt-view) that takes `'exact'` or `'fill'` as values, and deprecated the `eventList` boolean.

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
$('#myid').mobiscroll().eventcalendar({
  view: { timeline: { type: 'day', eventList: true } }
});
```
  </TabItem>
  <TabItem value="new" label="New code">

```jsx
$('#myid').mobiscroll().eventcalendar({
  view: { timeline: { type: 'day', eventDisplay: 'fill' } }
});
```

  </TabItem>
</Tabs>

### Removed

We removed the generic `resolution` prop in favor of `resolutionHorizontal` and `resolutionVertical` under the [view](/jquery/eventcalendar/api#opt-view) configuration.

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
$('#myid').mobiscroll().eventcalendar({
  view: { timeline: { type: 'day', resolutiuon: 'hour' } }
});
```
  </TabItem>
  <TabItem value="new" label="New code">

```jsx
$('#myid').mobiscroll().eventcalendar({
  view: { timeline: { type: 'day', resolutiuonHorizontal: 'hour' } }
});
```

  </TabItem>
</Tabs>