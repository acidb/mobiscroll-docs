---
sidebar_position: 5
sidebar_label: Upgrade guide v6
displayed_sidebar: angularSidebar
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

Starting with Mobiscroll 6.0 we updated the minimum framework and Typescript versions:

* Angular 9+
* React 18+
* Vue 3+
* TypeScript 4+

## Packages

To align with current ecosystem standards, we renamed several packages:

* We renamed `angular-ivy` to `angular` to reflect compatibility with Angular 13 and newer.
* We renamed the original `angular` package to `angular-legacy`, now targeting Angular 9–12.
* We renamed `react` to `react-legacy` (for React versions before 17).
* We renamed `react-next` to `react`, now the default React package.

## General

### `refDate` option change

We changed the default [refDate](/angular/eventcalendar/api#opt-refDate) to today.

### HTML support in data strings 

We removed support for HTML in `data` strings. These are no longer supported outside of jQuery and JavaScript implementations.


## Datepicker

### Changed

We changed the default [refDate](/angular/datepicker/api#opt-refDate) to today.

### Removed

We removed the `weeks` option. Use [calendarSize](/angular/datepicker/api#opt-calendarSize) instead.

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

We changed the default [refDate](/angular/eventcalendar/api#opt-refDate) to today.

We renamed the `renderEvent` option to [renderAgendaEvent](/react/eventcalendar/api#renderer-renderAgendaEvent)  
We renamed the `eventTemplate` template to [agendaEventTemplate](/angular/eventcalendar/api#template-agendaEventTemplate)  
We renamed the `#event` slot to [#agendaEvent](/vue/eventcalendar/api#slot-agendaEvent)

We renamed the `renderEventContent` option to [renderAgendaEventContent](/react/eventcalendar/api#renderer-renderAgendaEventContent)  
We renamed the `eventContentTemplate` template to [agendaEventContentTemplate](/angular/eventcalendar/api#template-agendaEventContentTemplate)  
We renamed the `#eventContent` slot to [#agendaEventContent](/vue/eventcalendar/api#slot-agendaEventContent)

We renamed the `renderDay` option to [renderAgendaDay](/react/eventcalendar/api#renderer-renderAgendaDay)  
We renamed the `dayTemplate` template to [agendaDayTemplate](/angular/eventcalendar/api#template-agendaDayTemplate)  
We renamed the `#day` slot to [#agendaDay](/vue/eventcalendar/api#slot-agendaDay)

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

We renamed the `renderLabel` option to [renderCalendarEvent](/react/eventcalendar/api#renderer-renderCalendarEvent)
We renamed the `labelTemplate` template to [calendarEventTemplate](/angular/eventcalendar/api#template-calendarEventTemplate)
We renamed the `#label` slot to [#calendarEvent](/vue/eventcalendar/api#slot-calendarEvent)

We renamed the `renderLabelContent` option to [renderCalendarEventContent](/react/eventcalendar/api#renderer-renderCalendarEventContent)
We renamed the `labelContentTemplate` template to [calendarEventContentTemplate](/angular/eventcalendar/api#template-calendarEventContentTemplate)
We renamed the `#labelContent` slot to [#calendarEventContent](/vue/eventcalendar/api#slot-calendarEventContent)

We renamed the `renderEvent` option to [renderPopoverEvent](/react/eventcalendar/api#renderer-renderPopoverEvent)
We renamed the `eventTemplate` template to [popoverEventTemplate](/angular/eventcalendar/api#template-popoverEventTemplate)
We renamed the `#event` slot to [#popoverEvent](/vue/eventcalendar/api#slot-popoverEvent)

We renamed the `renderEventContent` option to [renderPopoverEventContent](/react/eventcalendar/api#renderer-renderPopoverEventContent)
We renamed the `eventContentTemplate` template to [popoverEventContentTemplate](/angular/eventcalendar/api#template-popoverEventContentTemplate)
We renamed the `#eventContent` slot to [#popoverEventContent](/vue/eventcalendar/api#slot-popoverEventContent)

We renamed the `renderDay` option to [renderCalendarDay](/react/eventcalendar/api#renderer-renderCalendarDay)
We renamed the `dayTemplate` template to [calendarDayTemplate](/angular/eventcalendar/api#template-calendarDayTemplate)
We renamed the `#day` slot to [#calendarDay](/vue/eventcalendar/api#slot-calendarDay)

We renamed the `renderDayContent` option to [renderCalendarDayContent](/react/eventcalendar/api#renderer-renderCalendarDayContent)
We renamed the `dayContentTemplate` template to [calendarDayContentTemplate](/angular/eventcalendar/api#template-calendarDayContentTemplate)
We renamed the `#dayContent` slot to [#calendarDayContent](/vue/eventcalendar/api#slot-calendarDayContent)

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

We performed a cleanup and standardization of renderer option names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

### Changed

We changed the default [refDate](/angular/eventcalendar/api#opt-refDate) to today.

We renamed the `renderScheduleEvent` option to [renderSchedulerEvent](/react/eventcalendar/api#renderer-renderSchedulerEvent)  
We renamed the `eventTemplate` template to [schedulerEventTemplate](/angular/eventcalendar/api#template-schedulerEventTemplate)  
We renamed the `#event` slot to [#schedulerEvent](/vue/eventcalendar/api#slot-schedulerEvent)

We renamed the `renderScheduleEventContent` option to [renderSchedulerEventContent](/react/eventcalendar/api#renderer-renderSchedulerEventContent)  
We renamed the `eventContentTemplate` template to [schedulerEventContentTemplate](/angular/eventcalendar/api#template-schedulerEventContentTemplate)  
We renamed the `#eventContent` slot to [#schedulerEventContent](/vue/eventcalendar/api#slot-schedulerEventContent)

We renamed the `renderDay` option to [renderSchedulerDay](/react/eventcalendar/api#renderer-renderSchedulerDay)  
We renamed the `dayTemplate` template to [schedulerDayTemplate](/angular/eventcalendar/api#template-schedulerDayTemplate)  
We renamed the `#day` slot to [#schedulerDay](/vue/eventcalendar/api#slot-schedulerDay)

We renamed the `renderDayContent` option to [renderSchedulerDayContent](/react/eventcalendar/api#renderer-renderSchedulerDayContent)  
We renamed the `dayContentTemplate` template to [schedulerDayContentTemplate](/angular/eventcalendar/api#template-schedulerDayContentTemplate)  
We renamed the `#dayContent` slot to [#schedulerDayContent](/vue/eventcalendar/api#slot-schedulerDayContent)

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

We also renamed the `schedule` [view](/angular/eventcalendar/api#opt-view) to `scheduler`:

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

We changed the default [refDate](/angular/eventcalendar/api#opt-refDate) to today.

We renamed the `renderScheduleEvent` option to [renderTimelineEvent](/react/eventcalendar/api#renderer-renderTimelineEvent)  
We renamed the `eventTemplate` template to [timelineEventTemplate](/angular/eventcalendar/api#template-timelineEventTemplate)  
We renamed the `#event` slot to [#timelineEvent](/vue/eventcalendar/api#slot-timelineEvent)

We renamed the `renderScheduleEventContent` option to [renderTimelineEventContent](/react/eventcalendar/api#renderer-renderTimelineEventContent)  
We renamed the `eventContentTemplate` template to [timelineEventContentTemplate](/angular/eventcalendar/api#template-timelineEventContentTemplate)  
We renamed the `#eventContent` slot to [#timelineEventContent](/vue/eventcalendar/api#slot-timelineEventContent)

We renamed the `renderDay` option to [renderTimelineDay](/react/eventcalendar/api#renderer-renderTimelineDay)  
We renamed the `dayTemplate` template to [timelineDayTemplate](/angular/eventcalendar/api#template-timelineDayTemplate)  
We renamed the `#day` slot to [#timelineDay](/vue/eventcalendar/api#slot-timelineDay)

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

We added a new `eventDisplay` prop under [view](/angular/eventcalendar/api#opt-view) that takes `'exact'` or `'fill'` as values, and deprecated the `eventList` boolean.

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

We removed the generic `resolution` prop in favor of `resolutionHorizontal` and `resolutionVertical` under the [view](/angular/eventcalendar/api#opt-view) configuration.

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
    mobiscroll.toast({ message: 'Saved' });
  ```
  </TabItem>
  <TabItem value="new" label="New code">
  ```jsx
    <MobiscrollToast message="Saved" />
  ```
  </TabItem>
</Tabs>
