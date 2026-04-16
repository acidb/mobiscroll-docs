---
sidebar_position: 1
sidebar_label: Overview
displayed_sidebar: angularSidebar
description: 'Mobiscroll Eventcalendar for Angular — Calendar, Scheduler, Timeline, and Agenda views for building scheduling UIs.'
---

# Eventcalendar

The Eventcalendar component supports four highly configurable views: a [Calendar view](/angular/eventcalendar/calendar), a [Scheduler with time grid](/angular/eventcalendar/scheduler), a [Timeline](/angular/eventcalendar/timeline) and an [Agenda view](/angular/eventcalendar/agenda).

## Usage

The following example will create an Eventcalendar with the default options.

```html
<mbsc-eventcalendar></mbsc-eventcalendar>
```

```ts
import { Component } from '@angular/core';
import { MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [MbscModule],
})
export class AppComponent {}
```

For many more examples - simple and complex use-cases - check out the [Eventcalendar demos](https://demo.mobiscroll.com/eventcalendar).