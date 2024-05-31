---
sidebar_position: 3
sidebar_label: Agenda
displayed_sidebar: reactSidebar
---

import Options from '../\_auto-generated/eventcalendar/options_agenda.md';
import Events from '../\_auto-generated/eventcalendar/events_agenda.md';
import Localizations from '../\_auto-generated/eventcalendar/localizations_agenda.md';
import Slots from '../_auto-generated/eventcalendar/renderers_agenda.md';

# Agenda

The agenda calendar displays a list of events for a given period of time (year, month, week or day). It can be used as a standalone component or in combination with the calendar.

![Desktop agenda](https://docs.mobiscroll.com/Content/img/docs/desktop-agenda.png)

## Event order

When rendering events, the following default order is applied:

 - All-day events are placed at the top.
 - Non-all-day events follow, sorted by their start times.
 - Events with the same start time are ordered alphabetically by their titles.

To modify the default event order, you can use the `order` property of the [event data](#opt-data). If the order property does not meet your requirements, the [eventOrder](#opt-eventOrder) option can be used to further customize the ordering, which expects a function that compares two events and returns an order (-1 or 1).

<div className="option-list">

## API

### Options

<Options />

### Events

<Events />

### Localization

<Localizations />

### Renderers

<Slots />

</div>
