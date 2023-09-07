---
sidebar_position: 7
sidebar_label: Templating
displayed_sidebar: vueSidebar
---

# Templating

You can customize many parts of the Eventcalendar by writing custom templates. In vue terms these templates are called named slots.

## Event Templating

You can customize the events by writing custom templates. In vue terms these templates are called named slots. Depending on what your goal is, you have two options:

1. [Customize the event content](#event-content-templating) - Mobiscroll takes care of rendering the events in the correct order and also prints basic fields, like `start`/`end`, whether it is an `allDay` event or not and also takes care of coloring the event appropriately. Everything else comes from the custom template.
2. [Customize the full event](#full-event-templating) - Mobiscroll takes care of rendering the events in the correct order, but everything else comes form the template you write.

To define a template, create a `<template>` tag with the `v-slot` directive or the dedicated shorthand `#` and the name of the template:

```html title="Using the v-slot directive"
<mbsc-eventcalendar>
  <template v-slot:scheduleEventContent>
    <!-- your content here -->
  </template>
</mbsc-eventcalendar>
```

```html title="Using the v-slot shorthand"
<mbsc-eventcalendar>
  <template #scheduleEventContent>
    <!-- your content here -->
  </template>
</mbsc-eventcalendar>
```

### Event content templating

In most cases you only want to customize the content section of the event. In this case your template will be used as the content of the event. Mobiscroll will position the event to the right place and will render essential information like the color of the event, the time and if it's an all day event or not. The title, description and any other fields you want to show (like participants, an avatar...) will be coming from your custom template.

- For the agenda and popover - use the [`eventContent`](api#slot-eventContent) template for the custom template
- For event labels in the calendar and all-day events in the scheduler - use the [`labelContent`](api#slot-labelContent) template for the custom template
- For the scheduler and timeline - use the [`scheduleEventContent`](api#slot-scheduleEventContent) template for the custom template

```html
<mbsc-eventcalendar>
  <template #eventContent="data">
    <!-- your content here -->
  </template>
</mbsc-eventcalendar>
```

![Agenda content customization](https://docs.mobiscroll.com/Content/img/docs/customize-the-event-content.png)

### Full event templating

In case of full event templating, whenever there is an event (in the agenda, scheduler, timeline, labels or popover) your custom template will be used instead of the default template. Mobiscroll will position your component to the right place, but anything else you want to show is up to you... like a title, description, color the background or show any content.

- For the agenda and popover - use the [`event`](api#slot-event) template for the custom template
- For event labels in the calendar and all-day events in the scheduler - use the [`label`](api#slot-label) template for the custom template
- For the scheduler and timeline - use the [`scheduleEvent`](api#slot-scheduleEvent) template for the custom template

![Event calendar event customization](https://docs.mobiscroll.com/Content/img/docs/customize-the-full-event.png)
