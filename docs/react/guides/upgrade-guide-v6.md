---
sidebar_position: 5
sidebar_label: Upgrade guide v6
displayed_sidebar: reactSidebar
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

Starting with Mobiscroll 6.0 we updated the minimum supported framework and language versions. Please upgrade to React 17+ to continue using Mobiscroll. Additionally, if you're using TypeScript, please make sure you're on version 4 or newer.

## Packages

To align with current ecosystem standards, we renamed several packages:

* We renamed `react` to `react-legacy` (for React versions before 18).
* We renamed `react-next` to `react`, now the default React package.

## General

### `SASS` updates

Starting with Mobiscroll 6.0, we updated our `SASS` code to remove deprecated functions. The minimum supported `SASS` version is now x.x.x, and we no longer support `node-sass`.

### HTML support in data strings 

We removed support for HTML in data strings. These are no longer supported outside of jQuery and JavaScript implementations.


## Datepicker

### Changed

We changed the default [refDate](/react/datepicker/api#opt-refDate) from 1970/01/01 to today.

### Removed

We removed the `weeks` option. Use [calendarSize](/react/datepicker/api#opt-calendarSize) instead.

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
<Datepicker
  weeks={6}
/>
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
<Datepicker
  calendarSize={2}
/>
```

  </TabItem>
</Tabs>

## Agenda

We performed a cleanup and standardization of renderer option names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

### Changed

We changed the default [refDate](/react/eventcalendar/api#opt-refDate) from 1970/01/01 to today.  

We renamed the `renderEvent` option to [renderAgendaEvent](/react/eventcalendar/api#renderer-renderAgendaEvent).    
We renamed the `renderEventContent` option to [renderAgendaEventContent](/react/eventcalendar/api#renderer-renderAgendaEventContent).   
We renamed the `renderDay` option to [renderAgendaDay](/react/eventcalendar/api#renderer-renderAgendaDay).    

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
<Eventcalendar renderEvent={myRender} />
```
  </TabItem>
  <TabItem value="new" label="New code">

```jsx
<Eventcalendar renderAgendaEvent={myRender} />
```
  </TabItem>
</Tabs>


## Eventcalendar

We performed a cleanup and standardization of renderer option names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

### Changed

We changed the default [refDate](/react/eventcalendar/api#opt-refDate) from 1970/01/01 to today.  

We renamed the `renderLabel` option to [renderCalendarEvent](/react/eventcalendar/api#renderer-renderCalendarEvent).  
We renamed the `renderLabelContent` option to [renderCalendarEventContent](/react/eventcalendar/api#renderer-renderCalendarEventContent).  
We renamed the `renderEvent` option to [renderPopoverEvent](/react/eventcalendar/api#renderer-renderPopoverEvent).  
We renamed the `renderEventContent` option to [renderPopoverEventContent](/react/eventcalendar/api#renderer-renderPopoverEventContent).  
We renamed the `renderDay` option to [renderCalendarDay](/react/eventcalendar/api#renderer-renderCalendarDay).  
We renamed the `renderDayContent` option to [renderCalendarDayContent](/react/eventcalendar/api#renderer-renderCalendarDayContent).  


<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
<Eventcalendar renderLabel={myRender} />
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
<Eventcalendar renderCalendarEvent={myRender} />
```

  </TabItem>
</Tabs>


## Scheduler

### Header consistency

We unified the Scheduler header layout across different view configurations. The single-day view with resources now uses the same header structure as multi-day (e.g., weekly, monthly or daily) views. This ensures a consistent look and feel regardless of the selected view type.


### Changed

We performed a cleanup and standardization of renderer option names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

We renamed the `renderScheduleEvent` option to [renderSchedulerEvent](/react/eventcalendar/api#renderer-renderSchedulerEvent).  
We renamed the `renderScheduleEventContent` option to [renderSchedulerEventContent](/react/eventcalendar/api#renderer-renderSchedulerEventContent).  
We renamed the `renderDay` option to [renderSchedulerDay](/react/eventcalendar/api#renderer-renderSchedulerDay).  
We renamed the `renderDayContent` option to [renderSchedulerDayContent](/react/eventcalendar/api#renderer-renderSchedulerDayContent).  


<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
<Eventcalendar renderScheduleEvent={myRender} />
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
<Eventcalendar renderSchedulerEvent={myRender} />
```

  </TabItem>
</Tabs>

We also renamed the `schedule` [view](/react/eventcalendar/api#opt-view) to `scheduler`:

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
<Eventcalendar view={{ schedule: { type: 'day' } }} />
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
<Eventcalendar view={{ scheduler: { type: 'day' } }} />
```

  </TabItem>
</Tabs>

## Timeline

We performed a cleanup and standardization of renderer option names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

### Changed

We renamed the `renderScheduleEvent` option to [renderTimelineEvent](/react/eventcalendar/api#renderer-renderTimelineEvent).  
We renamed the `renderScheduleEventContent` option to [renderTimelineEventContent](/react/eventcalendar/api#renderer-renderTimelineEventContent).  
We renamed the `renderDay` option to [renderTimelineDay](/react/eventcalendar/api#renderer-renderTimelineDay).  


<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
<Eventcalendar renderScheduleEvent={myRender} />
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
<Eventcalendar renderTimelineEvent={myRender} />
```

  </TabItem>
</Tabs>

We added a new `eventDisplay` property to the [view](/react/eventcalendar/api#opt-view) option that takes `'exact'` or `'fill'` as values, and deprecated the `eventList` boolean.

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
<Eventcalendar view={{ timeline: { type: 'day', eventList: true } }} />
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
<Eventcalendar view={{ timeline: { type: 'day', eventDisplay: 'fill' } }} />
```

  </TabItem>
</Tabs>

### Removed

We removed the deprecated `resolution` property from the [view](/react/eventcalendar/api#opt-view) option. Use the `resolutionHorizontal` property instead.

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
<Eventcalendar view={{ timeline: { type: 'day', resolutiuon: 'hour' } }} />
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
<Eventcalendar view={{ timeline: { type: 'day', resolutiuonHorizontal: 'hour' } }} />
```

  </TabItem>
</Tabs>


## Forms

### Removed

We removed the legacy notification functions from React. From now on, only React components are supported for displaying notifications.

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
mobiscroll.toast({message: "Saved"})
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
<MobiscrollToast message="Saved" />
```

  </TabItem>
</Tabs>
