---
sidebar_position: 4
sidebar_label: Scheduler
displayed_sidebar: vueSidebar
---

import Options from '../\_auto-generated/eventcalendar/options_scheduler.md';
import Events from '../\_auto-generated/eventcalendar/events_scheduler.md';
import Localizations from '../\_auto-generated/eventcalendar/localizations_scheduler.md';

# Scheduler

The scheduler displays a time grid with its related events. It can be configured as a daily or weekly schedule.
Work hours and work days along with disabled time-spans, breaks can be added. Use it for advanced scheduling tasks with built-in drag & drop.

The displayed week days can be modified with the `startDay` and `endDay` properties of the [view](./api#opt-view) option.

The displayed hours can be modified with the `startTime` and `endTime` properties of the [view](./api#opt-view) option.
With these properties both hours and minutes can be specified.

![Desktop weekly schedule](https://docs.mobiscroll.com/Content/img/docs/desktop-schedule.png)

<div className="option-list">

## Options

<Options />

## Events

<Events />

## Localization

<Localizations />

</div>
