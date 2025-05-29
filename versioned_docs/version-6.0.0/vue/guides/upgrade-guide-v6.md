---
sidebar_position: 5
sidebar_label: Upgrade guide v6
displayed_sidebar: vueSidebar
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

Starting with Mobiscroll 6.0 we updated the minimum supported framework and language versions. Please upgrade to Vue 3+ to continue using Mobiscroll. Additionally, TypeScript 4+ is now required.


## General

### `refDate` option change

We changed the default [refDate](/vue/eventcalendar/api#opt-refDate) to today.

### HTML support in data strings 

We removed support for HTML in data strings. These are no longer supported outside of jQuery and JavaScript implementations.


## Datepicker

### Changed

We changed the default [refDate](/vue/datepicker/api#opt-refDate) to today.

### Removed

We removed the `weeks` option. Use [calendarSize](/vue/datepicker/api#opt-calendarSize) instead.

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
:weeks="2"
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
:calendarSize="2"
```

  </TabItem>
</Tabs>

## Agenda

We performed a cleanup and standardization of slot names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

### Changed

We changed the default [refDate](/vue/eventcalendar/api#opt-refDate) to today.

We renamed the `#event` slot to [#agendaEvent](/vue/eventcalendar/api#slot-agendaEvent).  
We renamed the `#eventContent` slot to [#agendaEventContent](/vue/eventcalendar/api#slot-agendaEventContent).  
We renamed the `#day` slot to [#agendaDay](/vue/eventcalendar/api#slot-agendaDay).  


<Tabs>
  <TabItem value="old" label="Old code" default>

```html
<template>
  <MbscEventcalendar>
    <template #event="data">
      <!-- Template content -->
    </template>
  </ MbscEventcalendar>
</template>
```

  </TabItem>
  <TabItem value="new" label="New code">

```html
<template>
  <MbscEventcalendar>
    <template #agendaEvent="data">
      <!-- Template content -->
    </template>
  </ MbscEventcalendar>
</template>
```

  </TabItem>
</Tabs>


## Eventcalendar

We performed a cleanup and standardization of slot names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

### Changed

We changed the default [refDate](/vue/eventcalendar/api#opt-refDate) to today.

We renamed the `#label` slot to [#calendarEvent](/vue/eventcalendar/api#slot-calendarEvent).  
We renamed the `#labelContent` slot to [#calendarEventContent](/vue/eventcalendar/api#slot-calendarEventContent).  
We renamed the `#event` slot to [#popoverEvent](/vue/eventcalendar/api#slot-popoverEvent).  
We renamed the `#eventContent` slot to [#popoverEventContent](/vue/eventcalendar/api#slot-popoverEventContent).  
We renamed the `#day` slot to [#calendarDay](/vue/eventcalendar/api#slot-calendarDay).  
We renamed the `#dayContent` slot to [#calendarDayContent](/vue/eventcalendar/api#slot-calendarDayContent).  


<Tabs>
  <TabItem value="old" label="Old code" default>

```html
<template>
  <MbscEventcalendar>
    <template #label="data">
      <!-- Template content -->
    </template>
  </ MbscEventcalendar>
</template>
```

  </TabItem>
  <TabItem value="new" label="New code">

```html
<template>
  <MbscEventcalendar>
    <template #calendarEvent="data">
      <!-- Template content -->
    </template>
  </ MbscEventcalendar>
</template>
```

  </TabItem>
</Tabs>


## Scheduler

We performed a cleanup and standardization of slot names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

### Changed

We changed the default [refDate](/vue/eventcalendar/api#opt-refDate) to today.

We renamed the `#event` slot to [#schedulerEvent](/vue/eventcalendar/api#slot-schedulerEvent).  
We renamed the `#eventContent` slot to [#schedulerEventContent](/vue/eventcalendar/api#slot-schedulerEventContent).  
We renamed the `#day` slot to [#schedulerDay](/vue/eventcalendar/api#slot-schedulerDay).  
We renamed the `#dayContent` slot to [#schedulerDayContent](/vue/eventcalendar/api#slot-schedulerDayContent).  


<Tabs>
  <TabItem value="old" label="Old code" default>

```html
<template>
  <MbscEventcalendar>
    <template #scheduleEvent="data">
      <!-- Template content -->
    </template>
  </ MbscEventcalendar>
</template>
```

  </TabItem>
  <TabItem value="new" label="New code">

```html
<template>
  <MbscEventcalendar>
    <template #schedulerEvent="data">
      <!-- Template content -->
    </template>
  </ MbscEventcalendar>
</template>
```

  </TabItem>
</Tabs>

We also renamed the `schedule` [view](/vue/eventcalendar/api#opt-view) to `scheduler`:

<Tabs>
  <TabItem value="old" label="Old code" default>


```html
<template>
  <MbscEventcalendar :view="{ schedule: { type: 'day' } }" />
</template>
```

  </TabItem>
  <TabItem value="new" label="New code">

```html
<template>
  <MbscEventcalendar :view="{ scheduler: { type: 'day' } }" />
</template>
```

  </TabItem>
</Tabs>

## Timeline

We performed a cleanup and standardization of slot names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

### Changed

We changed the default [refDate](/vue/eventcalendar/api#opt-refDate) to today.

We renamed the `#event` slot to [#timelineEvent](/vue/eventcalendar/api#slot-timelineEvent).  
We renamed the `#eventContent` slot to [#timelineEventContent](/vue/eventcalendar/api#slot-timelineEventContent).  
We renamed the `#day` slot to [#timelineDay](/vue/eventcalendar/api#slot-timelineDay).  


<Tabs>
  <TabItem value="old" label="Old code" default>

```html
<template>
  <MbscEventcalendar>
    <template #scheduleEvent="data">
      <!-- Template content -->
    </template>
  </ MbscEventcalendar>
</template>
```

  </TabItem>
  <TabItem value="new" label="New code">

```html
<template>
  <MbscEventcalendar>
    <template #timelineEvent="data">
      <!-- Template content -->
    </template>
  </ MbscEventcalendar>
</template>
```

  </TabItem>
</Tabs>

We added a new `eventDisplay` prop under [view](/vue/eventcalendar/api#opt-view) that takes `'exact'` or `'fill'` as values, and deprecated the `eventList` boolean.

<Tabs>
  <TabItem value="old" label="Old code" default>

```html
<template>
  <MbscEventcalendar :view="{ timeline: { type: 'day', eventList: true } }" />
</template>
```

  </TabItem>
  <TabItem value="new" label="New code">

```html
<template>
  <MbscEventcalendar :view="{ timeline: { type: 'day', eventDisplay: 'fill' } }" />
</template>
```

  </TabItem>
</Tabs>

### Removed

We removed the generic `resolution` prop in favor of `resolutionHorizontal` and `resolutionVertical` under the [view](/vue/eventcalendar/api#opt-view) configuration.

<Tabs>
  <TabItem value="old" label="Old code" default>

```html
<template>
  <MbscEventcalendar :view="{ timeline: { type: 'day', resolutiuon: 'hour' } }" />
</template>
```

  </TabItem>
  <TabItem value="new" label="New code">

```html
<template>
  <MbscEventcalendar :view="{ timeline: { type: 'day', resolutiuonHorizontal: 'hour' } }" />
</template>
```

  </TabItem>
</Tabs>
