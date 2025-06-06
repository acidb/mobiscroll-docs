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

Starting with Mobiscroll 6.0 we updated the minimum supported framework and language versions. Please upgrade to Vue 3+ to continue using Mobiscroll. Additionally, if you're using TypeScript, please make sure you're on version 4 or newer.


## General

### Sass updates

Starting with Mobiscroll 6.0, we updated our `Sass` code to remove deprecated functions. The minimum supported `Sass` version is now [1.80.0.](https://www.npmjs.com/package/sass), and we no longer support [node-sass](https://www.npmjs.com/package/node-sass). If you're currently using `node-sass`, we recommend switching to the [sass](https://www.npmjs.com/package/sass) package, which is now the primary implementation. For help with the migration, refer to the official [Sass upgrade guide](https://sass-lang.com/blog/libsass-is-deprecated/#how-do-i-migrate).

### HTML support in data strings 

We removed support for HTML in data strings. These are no longer supported outside of jQuery and JavaScript implementations.


## Datepicker

### Changed

We changed the default [refDate](/vue/datepicker/api#opt-refDate) from 1970/01/01 to today.

### Removed

We removed the `weeks` option. Use [calendarSize](/vue/datepicker/api#opt-calendarSize) instead.

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
<template>
  <MbscDatepicker
    :weeks="6"
  />
</template>
```

  </TabItem>
  <TabItem value="new" label="New code">

```jsx
<template>
  <MbscDatepicker
    :calendarSize="6"
  />
</template>
```

  </TabItem>
</Tabs>

## Agenda

We performed a cleanup and standardization of slot names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

### Changed

We changed the default [refDate](/vue/eventcalendar/api#opt-refDate) from 1970/01/01 to today.

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

We changed the default [refDate](/vue/eventcalendar/api#opt-refDate) from 1970/01/01 to today.

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

### Header consistency

We unified the Scheduler header layout across different view configurations. The single-day view with resources now uses the same header structure as multi-day (e.g., weekly, monthly or daily) views. This ensures a consistent look and feel regardless of the selected view type.


### Changed

We performed a cleanup and standardization of slot names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

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

We added a new `eventDisplay` property to the [view](/vue/eventcalendar/api#opt-view) option that takes `'exact'` or `'fill'` as values, and deprecated the `eventList` boolean property.

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

We removed the deprecated `resolution` property from the [view](/vue/eventcalendar/api#opt-view) option. Use the `resolutionHorizontal` property instead.

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
