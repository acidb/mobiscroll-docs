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

Starting with Mobiscroll 6.0, we updated the minimum supported language versions. Please make sure you're using TypeScript 4 or newer.


## General

### `refDate` option change

We changed the default [refDate](/javascript/eventcalendar/api#opt-refDate) to today.


## Datepicker

### Changed

We changed the default [refDate](/javascript/datepicker/api#opt-refDate) to today.

### Removed

We removed the `weeks` option. Use [calendarSize](/javascript/datepicker/api#opt-calendarSize) instead.

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

We changed the default [refDate](/javascript/eventcalendar/api#opt-refDate) to today.

We renamed the `renderEvent` option to [renderAgendaEvent](/javascript/eventcalendar/api#renderer-renderAgendaEvent).   
We renamed the `renderEventContent` option to [renderAgendaEventContent](/javascript/eventcalendar/api#renderer-renderAgendaEventContent).  
We renamed the `renderDay` option to [renderAgendaDay](/javascript/eventcalendar/api#renderer-renderAgendaDay).  

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
const inst = eventcalendar('#myID', {
  renderEvent: myRender
}) as Eventcalendar;
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
const inst = eventcalendar('#myID', {
  renderAgendaEvent: myRender
}) as Eventcalendar;
```

  </TabItem>
</Tabs>


## Eventcalendar

We performed a cleanup and standardization of renderer option names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

### Changed

We changed the default [refDate](/javascript/eventcalendar/api#opt-refDate) to today.

We renamed the `renderLabel` option to [renderCalendarEvent](/javascript/eventcalendar/api#renderer-renderCalendarEvent).  
We renamed the `renderLabelContent` option to [renderCalendarEventContent](/javascript/eventcalendar/api#renderer-renderCalendarEventContent).  
We renamed the `renderEvent` option to [renderPopoverEvent](/javascript/eventcalendar/api#renderer-renderPopoverEvent).  
We renamed the `renderEventContent` option to [renderPopoverEventContent](/javascript/eventcalendar/api#renderer-renderPopoverEventContent).  
We renamed the `renderDay` option to [renderCalendarDay](/javascript/eventcalendar/api#renderer-renderCalendarDay).  
We renamed the `renderDayContent` option to [renderCalendarDayContent](/javascript/eventcalendar/api#renderer-renderCalendarDayContent).


<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
const inst = eventcalendar('#myID', {
  renderLabel: myRender
}) as Eventcalendar;
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
const inst = eventcalendar('#myID', {
  renderCalendarEvent: myRender
}) as Eventcalendar;
```

  </TabItem>
</Tabs>


## Scheduler

We performed a cleanup and standardization of renderer option names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

### Changed

We changed the default [refDate](/javascript/eventcalendar/api#opt-refDate) to today.  

We renamed the `renderScheduleEvent` option to [renderSchedulerEvent](/javascript/eventcalendar/api#renderer-renderSchedulerEvent).  
We renamed the `renderScheduleEventContent` option to [renderSchedulerEventContent](/javascript/eventcalendar/api#renderer-renderSchedulerEventContent).  
We renamed the `renderDay` option to [renderSchedulerDay](/javascript/eventcalendar/api#renderer-renderSchedulerDay).  
We renamed the `renderDayContent` option to [renderSchedulerDayContent](/javascript/eventcalendar/api#renderer-renderSchedulerDayContent).  


<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
const inst = eventcalendar('#myID', {
  renderScheduleEvent: myRender
}) as Eventcalendar;
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
const inst = eventcalendar('#myID', {
  renderSchedulerEvent: myRender
}) as Eventcalendar;
```

  </TabItem>
</Tabs>

We also renamed the `schedule` [view](/javascript/eventcalendar/api#opt-view) to `scheduler`:

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
const inst = eventcalendar('#myID', {
  view: { schedule: { type: 'day' } }
}) as Eventcalendar;
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
const inst = eventcalendar('#myID', {
  view: { scheduler: { type: 'day' } }
}) as Eventcalendar;
```

  </TabItem>
</Tabs>

## Timeline

We performed a cleanup and standardization of renderer option names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

### Changed

We changed the default [refDate](/javascript/eventcalendar/api#opt-refDate) to today.  

We renamed the `renderScheduleEvent` option to [renderTimelineEvent](/javascript/eventcalendar/api#renderer-renderTimelineEvent).  
We renamed the `renderScheduleEventContent` option to [renderTimelineEventContent](/javascript/eventcalendar/api#renderer-renderTimelineEventContent).  
We renamed the `renderDay` option to [renderTimelineDay](/javascript/eventcalendar/api#renderer-renderTimelineDay).  

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
const inst = eventcalendar('#myID', {
  renderScheduleEvent: myRender
}) as Eventcalendar;
```
  </TabItem>
  <TabItem value="new" label="New code">

```jsx
const inst = eventcalendar('#myID', {
  renderTimelineEvent: myRender
}) as Eventcalendar;
```

  </TabItem>
</Tabs>

We added a new `eventDisplay` prop under [view](/javascript/eventcalendar/api#opt-view) that takes `'exact'` or `'fill'` as values, and deprecated the `eventList` boolean.

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
const inst = eventcalendar('#myID', {
  view: { timeline: { type: 'day', eventList: true } }
}) as Eventcalendar;
```
  </TabItem>
  <TabItem value="new" label="New code">

```jsx
const inst = eventcalendar('#myID', {
  view: { timeline: { type: 'day', eventDisplay: 'fill' } }
}) as Eventcalendar;
```

  </TabItem>
</Tabs>

### Removed

We removed the generic `resolution` prop in favor of `resolutionHorizontal` and `resolutionVertical` under the [view](/javascript/eventcalendar/api#opt-view) configuration.

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
const inst = eventcalendar('#myID', {
  view: { timeline: { type: 'day', resolutiuon: 'hour' } }
}) as Eventcalendar;
```
  </TabItem>
  <TabItem value="new" label="New code">

```jsx
const inst = eventcalendar('#myID', {
  view: { timeline: { type: 'day', resolutiuonHorizontal: 'hour' } }
}) as Eventcalendar;
```

  </TabItem>
</Tabs>
