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

Starting with Mobiscroll 6.0, we updated the minimum supported language versions. If you're using TypeScript, please make sure you're on version 4 or newer.

## General

### Sass updates

Starting with Mobiscroll 6.0, we updated our `Sass` code to remove deprecated functions. The minimum supported `Sass` version is now [1.80.0.](https://www.npmjs.com/package/sass), and we no longer support [node-sass](https://www.npmjs.com/package/node-sass). If you're currently using `node-sass`, we recommend switching to the [sass](https://www.npmjs.com/package/sass) package, which is now the primary implementation. For help with the migration, refer to the official [Sass upgrade guide](https://sass-lang.com/blog/libsass-is-deprecated/#how-do-i-migrate).

## Datepicker

### Changed

We changed the default [refDate](/jquery/datepicker/api#opt-refDate) from 1970/01/01 to today.

### Removed

We removed the `weeks` option. Use [calendarSize](/jquery/datepicker/api#opt-calendarSize) instead.

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
$('#myID').mobiscroll().datepicker({
  weeks: 6
}
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
$('#myID').mobiscroll().datepicker({
  calendarSize: 6
}
```

  </TabItem>
</Tabs>

## Agenda

We performed a cleanup and standardization of renderer option names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

### Changed

We changed the default [refDate](/jquery/eventcalendar/api#opt-refDate) from 1970/01/01 to today.

We renamed the `renderEvent` option to [renderAgendaEvent](/jquery/eventcalendar/api#renderer-renderAgendaEvent).   
We renamed the `renderEventContent` option to [renderAgendaEventContent](/jquery/eventcalendar/api#renderer-renderAgendaEventContent).  
We renamed the `renderDay` option to [renderAgendaDay](/jquery/eventcalendar/api#renderer-renderAgendaDay).  

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
$('#myID').mobiscroll().eventcalendar({
  renderEvent: myRender
});
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
$('#myID').mobiscroll().eventcalendar({
  renderAgendaEvent: myRender
});
```

  </TabItem>
</Tabs>


## Eventcalendar

We performed a cleanup and standardization of renderer option names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

### Changed

We changed the default [refDate](/jquery/eventcalendar/api#opt-refDate) from 1970/01/01 to today.

We renamed the `renderLabel` option to [renderCalendarEvent](/jquery/eventcalendar/api#renderer-renderCalendarEvent).  
We renamed the `renderLabelContent` option to [renderCalendarEventContent](/jquery/eventcalendar/api#renderer-renderCalendarEventContent).  
We renamed the `renderEvent` option to [renderPopoverEvent](/jquery/eventcalendar/api#renderer-renderPopoverEvent).  
We renamed the `renderEventContent` option to [renderPopoverEventContent](/jquery/eventcalendar/api#renderer-renderPopoverEventContent).  
We renamed the `renderDay` option to [renderCalendarDay](/jquery/eventcalendar/api#renderer-renderCalendarDay).  
We renamed the `renderDayContent` option to [renderCalendarDayContent](/jquery/eventcalendar/api#renderer-renderCalendarDayContent).


<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
$('#myID').mobiscroll().eventcalendar({
  renderLabel: myRender
});
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
$('#myID').mobiscroll().eventcalendar({
  renderCalendarEvent: myRender
});
```

  </TabItem>
</Tabs>


## Scheduler

### Header consistency

We unified the Scheduler header layout across different view configurations. The single-day view with resources now uses the same header structure as multi-day (e.g., weekly, monthly or daily) views. This ensures a consistent look and feel regardless of the selected view type.


### Changed

We performed a cleanup and standardization of slot names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

We renamed the `renderScheduleEvent` option to [renderSchedulerEvent](/jquery/eventcalendar/api#renderer-renderSchedulerEvent).  
We renamed the `renderScheduleEventContent` option to [renderSchedulerEventContent](/jquery/eventcalendar/api#renderer-renderSchedulerEventContent).  
We renamed the `renderDay` option to [renderSchedulerDay](/jquery/eventcalendar/api#renderer-renderSchedulerDay).  
We renamed the `renderDayContent` option to [renderSchedulerDayContent](/jquery/eventcalendar/api#renderer-renderSchedulerDayContent).  


<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
$('#myID').mobiscroll().eventcalendar({
  renderScheduleEvent: myRender
});
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
$('#myID').mobiscroll().eventcalendar({
  renderSchedulerEvent: myRender
});
```

  </TabItem>
</Tabs>

We also renamed the `schedule` [view](/jquery/eventcalendar/api#opt-view) to `scheduler`:

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
$('#myID').mobiscroll().eventcalendar({
  view: { schedule: { type: 'day' } }
});
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
$('#myID').mobiscroll().eventcalendar({
  view: { scheduler: { type: 'day' } }
});
```

  </TabItem>
</Tabs>

## Timeline

We performed a cleanup and standardization of renderer option names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

### Changed

We renamed the `renderScheduleEvent` option to [renderTimelineEvent](/jquery/eventcalendar/api#renderer-renderTimelineEvent).  
We renamed the `renderScheduleEventContent` option to [renderTimelineEventContent](/jquery/eventcalendar/api#renderer-renderTimelineEventContent).  
We renamed the `renderDay` option to [renderTimelineDay](/jquery/eventcalendar/api#renderer-renderTimelineDay).  

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
$('#myID').mobiscroll().eventcalendar({
  renderScheduleEvent: myRender
});
```
  </TabItem>
  <TabItem value="new" label="New code">

```jsx
$('#myID').mobiscroll().eventcalendar({
  renderTimelineEvent: myRender
});
```

  </TabItem>
</Tabs>

We added a new `eventDisplay` property to the [view](/jquery/eventcalendar/api#opt-view) option that takes `'exact'` or `'fill'` as values, and deprecated the `eventList` boolean property.

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
$('#myID').mobiscroll().eventcalendar({
  view: { timeline: { type: 'day', eventList: true } }
});
```
  </TabItem>
  <TabItem value="new" label="New code">

```jsx
$('#myID').mobiscroll().eventcalendar({
  view: { timeline: { type: 'day', eventDisplay: 'fill' } }
});
```

  </TabItem>
</Tabs>

### Removed

We removed the deprecated `resolution` property from the [view](/jquery/eventcalendar/api#opt-view) option. Use the `resolutionHorizontal` property instead.

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
$('#myID').mobiscroll().eventcalendar({
  view: { timeline: { type: 'day', resolutiuon: 'hour' } }
});
```
  </TabItem>
  <TabItem value="new" label="New code">

```jsx
$('#myID').mobiscroll().eventcalendar({
  view: { timeline: { type: 'day', resolutiuonHorizontal: 'hour' } }
});
```

  </TabItem>
</Tabs>