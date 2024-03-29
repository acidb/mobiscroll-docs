---
sidebar_position: 5
sidebar_label: Timeline
displayed_sidebar: vueSidebar
---

import Options from '../\_auto-generated/eventcalendar/options_timeline.md';
import Events from '../\_auto-generated/eventcalendar/events_timeline.md';
import Localizations from '../\_auto-generated/eventcalendar/localizations_timeline.md';

# Timeline

The timeline view displays a timeline with its related events. It can be configured as a daily, weekly, monthly or yearly timeline.
Work hours and work days along with disabled time-spans, breaks can be added. Use it to for advanced scheduling tasks with built-in drag & drop.

The displayed week days can be modified with the `startDay` and `endDay` properties of the [view](./api#opt-view) option.

The displayed hours can be modified with the `startTime` and `endTime` properties of the [view](./api#opt-view) option.
With these properties both hours and minutes can be specified.

![Desktop monthly timeline](https://docs.mobiscroll.com/Content/img/docs/desktop-timeline.png)

<div className="option-list">

## Options

<Options />

## Events

<Events />

## Localization

<Localizations />

</div>
