---
sidebar_position: 5
sidebar_label: Upgrade guide v6
displayed_sidebar: angularSidebar
title: Mobiscroll 6 upgrade guide
description: 'Upgrade from Mobiscroll 5 to version 6 in Angular — breaking changes, removed features, renamed options, and migration examples.'
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

Starting with Mobiscroll 6.0 we updated the minimum supported framework and language versions. Please upgrade to Angular 9+ to continue using Mobiscroll. Additionally, TypeScript 4+ is now required.

## Packages

To align with current ecosystem standards, we renamed the packages as follows:

* We renamed `angular-ivy` to `angular` to reflect compatibility with Angular 13 and newer.
* We renamed the original `angular` package to `angular-legacy`, now targeting Angular 9–12.

To automatically handle the package updates and apply these changes, the simplest method is to re-run the [configuration command](/angular/getting-started/installation#installing-from-npm) in your project. Navigate to your project's root folder and run:

```bash
mobiscroll config angular
```

## General

### Theme updates

Mobiscroll 6.0 introduces redesigned themes based on the latest Fluent, Material, and iOS design systems. These updated themes are used by default and are exposed primarily through **CSS variables**.  
For a complete list of theme-level variables and guidance on how to override them, see the [CSS variables overview](/angular/theming/css-variables).

If you prefer the previous (v5) appearance, you can continue using the legacy themes. Legacy themes are not part of the default styles. To use them, also load the legacy stylesheet bundle, which includes:

- `mobiscroll-legacy.min.css`
- `mobiscroll-legacy.scss`

#### Using legacy themes

Regardless of whether Mobiscroll was installed from NPM or from a downloaded package, import the legacy styles from the Angular package:

Using CSS:

```ts
import '@mobiscroll/angular/dist/css/mobiscroll-legacy.min.css';
```

Using SCSS:

```scss
@import '@mobiscroll/angular/dist/css/mobiscroll-legacy.scss';
```

**Then set the legacy theme:**

After loading the styles, reference one of the legacy themes:

```ts
mobiscroll.setOptions({
  theme: 'ios-legacy',
  // theme: 'material-legacy'
  // theme: 'windows-legacy'
});
```

### Sass updates

Starting with Mobiscroll 6.0, we updated our `Sass` code to remove deprecated functions. The minimum supported `Sass` version is now [1.80.0.](https://www.npmjs.com/package/sass), and we no longer support [node-sass](https://www.npmjs.com/package/node-sass). If you're currently using `node-sass`, we recommend switching to the [sass](https://www.npmjs.com/package/sass) package, which is now the primary implementation. For help with the migration, refer to the official [Sass upgrade guide](https://sass-lang.com/blog/libsass-is-deprecated/#how-do-i-migrate).

### HTML support in strings 

We dropped support for HTML markup in strings for improved security. It is only supported in jQuery and JavaScript render functions.


## Datepicker

### Changed

We changed the default [refDate](/angular/datepicker/api#opt-refDate) from 1970/01/01 to today.

### Removed

We removed the `weeks` option. Use [calendarSize](/angular/datepicker/api#opt-calendarSize) instead.

<Tabs>
  <TabItem value="old" label="Old code" default>

```html
<mbsc-datepicker [weeks]="6"></mbsc-datepicker>
```
  </TabItem>
  <TabItem value="new" label="New code">

```html
<mbsc-datepicker [calendarSize]="6"></mbsc-datepicker>
```

  </TabItem>
</Tabs>

## Agenda

We performed a cleanup and standardization of template option names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

### Changed

We changed the default [refDate](/angular/eventcalendar/api#opt-refDate) from 1970/01/01 to today. 

We renamed the `eventTemplate` template to [agendaEventTemplate](/angular/eventcalendar/api#template-agendaEventTemplate).  
We renamed the `eventContentTemplate` template to [agendaEventContentTemplate](/angular/eventcalendar/api#template-agendaEventContentTemplate).   
We renamed the `dayTemplate` template to [agendaDayTemplate](/angular/eventcalendar/api#template-agendaDayTemplate).  

<Tabs>
  <TabItem value="old" label="Old code" default>

```html
<mbsc-eventcalendar [eventTemplate]="myTemplate"></mbsc-eventcalendar>
```

  </TabItem>
  <TabItem value="new" label="New code">

```html
<mbsc-eventcalendar [agendaEventTemplate]="myTemplate"></mbsc-eventcalendar>
```

  </TabItem>
</Tabs>


## Eventcalendar

We performed a cleanup and standardization of template option names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

### Changed

We changed the default [refDate](/angular/eventcalendar/api#opt-refDate) from 1970/01/01 to today.  

We renamed the `labelTemplate` template to [calendarEventTemplate](/angular/eventcalendar/api#template-calendarEventTemplate).  
We renamed the `labelContentTemplate` template to [calendarEventContentTemplate](/angular/eventcalendar/api#template-calendarEventContentTemplate).  
We renamed the `eventTemplate` template to [popoverEventTemplate](/angular/eventcalendar/api#template-popoverEventTemplate).  
We renamed the `eventContentTemplate` template to [popoverEventContentTemplate](/angular/eventcalendar/api#template-popoverEventContentTemplate).  
We renamed the `dayTemplate` template to [calendarDayTemplate](/angular/eventcalendar/api#template-calendarDayTemplate).  
We renamed the `dayContentTemplate` template to [calendarDayContentTemplate](/angular/eventcalendar/api#template-calendarDayContentTemplate).  


<Tabs>
  <TabItem value="old" label="Old code" default>

```html
<mbsc-eventcalendar [labelTemplate]="myTemplate"></mbsc-eventcalendar>
```

  </TabItem>
  <TabItem value="new" label="New code">

```html
<mbsc-eventcalendar [calendarEventTemplate]="myTemplate"></mbsc-eventcalendar>
```

  </TabItem>
</Tabs>


## Scheduler

### Header consistency

We unified the Scheduler header layout across different view configurations. The single-day view with resources now uses the same header structure as multi-day (e.g., weekly, monthly or daily) views. This ensures a consistent look and feel regardless of the selected view type.


### Changed

We performed a cleanup and standardization of template option names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

We renamed the `scheduleEventTemplate` template to [schedulerEventTemplate](/angular/eventcalendar/api#template-schedulerEventTemplate).    
We renamed the `scheduleEventContentTemplate` template to [schedulerEventContentTemplate](/angular/eventcalendar/api#template-schedulerEventContentTemplate).   
We renamed the `dayTemplate` template to [schedulerDayTemplate](/angular/eventcalendar/api#template-schedulerDayTemplate).  
We renamed the `dayContentTemplate` template to [schedulerDayContentTemplate](/angular/eventcalendar/api#template-schedulerDayContentTemplate).    

<Tabs>
  <TabItem value="old" label="Old code" default>

```html
<mbsc-eventcalendar [scheduleEventTemplate]="myTemplate"></mbsc-eventcalendar>
```

  </TabItem>
  <TabItem value="new" label="New code">

```html
<mbsc-eventcalendar [schedulerEventTemplate]="myTemplate"></mbsc-eventcalendar>
```

  </TabItem>
</Tabs>

We also renamed the `schedule` [view](/angular/eventcalendar/api#opt-view) to `scheduler`:

<Tabs>
  <TabItem value="old" label="Old code" default>

```html
<mbsc-eventcalendar [view]="{ schedule: { type: 'day' }}"></mbsc-eventcalendar>
```

  </TabItem>
  <TabItem value="new" label="New code">

```html
<mbsc-eventcalendar [view]="{ scheduler: { type: 'day' }}"></mbsc-eventcalendar>
```

  </TabItem>
</Tabs>

## Timeline

We performed a cleanup and standardization of template option names. This improves consistency across components. Deprecated names are still supported for now but will be removed in a future release.

### Changed

We renamed the `scheduleEventTemplate` template to [timelineEventTemplate](/angular/eventcalendar/api#template-timelineEventTemplate).  
We renamed the `scheduleEventContentTemplate` template to [timelineEventContentTemplate](/angular/eventcalendar/api#template-timelineEventContentTemplate).  
We renamed the `dayTemplate` template to [timelineDayTemplate](/angular/eventcalendar/api#template-timelineDayTemplate).  

<Tabs>
  <TabItem value="old" label="Old code" default>

```html
<mbsc-eventcalendar [scheduleEventTemplate]="myTemplate"></mbsc-eventcalendar>
```

  </TabItem>
  <TabItem value="new" label="New code">

```html
<mbsc-eventcalendar [timelineEventTemplate]="myTemplate"></mbsc-eventcalendar>
```

  </TabItem>
</Tabs>

We added a new `eventDisplay` property to the [view](/angular/eventcalendar/api#opt-view) option that takes `'exact'` or `'fill'` as values, and deprecated the `eventList` boolean property.

<Tabs>
  <TabItem value="old" label="Old code" default>

```html
<mbsc-eventcalendar [view]="{ timeline: { type: 'day', eventList: true }}"></mbsc-eventcalendar>
```

  </TabItem>
  <TabItem value="new" label="New code">

```html
<mbsc-eventcalendar [view]="{ timeline: { type: 'day', eventDisplay: 'fill' }}"></mbsc-eventcalendar>
```

  </TabItem>
</Tabs>


### Removed

We removed the deprecated `resolution` property from the [view](/angular/eventcalendar/api#opt-view) option. Use the `resolutionHorizontal` property instead.

<Tabs>
  <TabItem value="old" label="Old code" default>

```html
<mbsc-eventcalendar [view]="{ timeline: { type: 'day', resolution: 'hour' }}"></mbsc-eventcalendar>
```

  </TabItem>
  <TabItem value="new" label="New code">

```html
<mbsc-eventcalendar [view]="{ timeline: { type: 'day', resolutionHorizontal: 'hour' }}"></mbsc-eventcalendar>
```

  </TabItem>
</Tabs>


