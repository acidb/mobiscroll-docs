---
sidebar_position: 11
sidebar_label: Templating
displayed_sidebar: angularSidebar
---

# Templating

You can customize many parts of the Eventcalendar by writing custom templates. In Angular these templates are defined using the `<ng-template>` component and then passed to the eventcalendar as references. You will find a comprehensive list of all the templates available for the Eventcalendar in the [API templates](api#templates) section.

## Event templating

When you want to customize how the events look, depending on what your goal is, you have two options:

1. [Customize the event content](#event-content-templating) - Mobiscroll takes care of rendering the events in the correct order and also prints basic fields, like `start`/`end`, whether it is an `allDay` event or not and also takes care of coloring the event appropriately. Everything else comes from the custom template.
2. [Customize the full event](#full-event-templating) - Mobiscroll takes care of rendering the events in the correct order, but everything else comes from the template you write.

To define a template, create an `<ng-template>` tag with a variable reference and pass it to the apropriate eventcalendar option:

```html title="Using the v-slot directive"
<mbsc-eventcalendar [scheduleEventContentTemplate]="myTemplate">
  <ng-template #myTemplate>
    <!-- your content here -->
  </ng-template>
</mbsc-eventcalendar>
```

### Event content templating

In most cases you only want to customize the content section of the event. In this case your template will be used as the content of the event. Mobiscroll will position the event to the right place and will render essential information like the color of the event, the time and if it's an all day event or not. The title, description and any other fields you want to show (like participants, an avatar...) will be coming from your custom template.

- For the agenda and popover - use the [`eventContentTemplate`](api#template-eventContentTemplate) for the custom template
- For event labels in the calendar and all-day events in the scheduler - use the [`labelContentTemplate`](api#template-labelContentTemplate) for the custom template
- For the scheduler and timeline - use the [`scheduleEventContentTemplate`](api#template-scheduleEventContentTemplate) for the custom template

```html
<mbsc-eventcalendar [eventContentTemplate]="myAwesomeTemplate">
  <ng-template #myAwesomeTemplate let-data>
    <!-- your content here -->
  </ng-template>
</mbsc-eventcalendar>
```

![Agenda content customization](https://docs.mobiscroll.com/Content/img/docs/customize-the-event-content.png)

### Full event templating

In case of full event templating, whenever there is an event (in the agenda, scheduler, timeline, labels or popover) your custom template will be used instead of the default template. Mobiscroll will position your component to the right place, but anything else you want to show is up to you... like a title, description, color the background or show any content.

- For the agenda and popover - use the [`eventTemplate`](api#template-eventTemplate) for the custom template
- For event labels in the calendar and all-day events in the scheduler - use the [`labelTemplate`](api#template-labelTemplate) for the custom template
- For the scheduler and timeline - use the [`scheduleEventTemplate`](api#template-scheduleEventTemplate) for the custom template

![Event calendar event customization](https://docs.mobiscroll.com/Content/img/docs/customize-the-full-event.png)

## Resource templating

To customize the display of the resources, the [`resourceTemplate`](api#template-resourceTemplate) can be used.

```html
<mbsc-eventcalendar [resourceTemplate]="myResTemplate">
  <ng-template #myResTemplate let-resource>
    <div>{resource.name} - {resource.location}</div>
  </ng-template>
</mbsc-eventcalendar>
```

:::info
In case of the timeline view there are other parts of the Eventcalendar that can be customized through templates. Check out the [timeline templating](timeline#templating) section for more details.
:::

## Header templating

The header of the calendar can be fully customized to one's needs with the use of the [`headerTemplate`](api#template-headerTemplate) option.

```html
<mbsc-eventcalendar [headerTemplate]="header">
  <ng-template #header>
    <p>Any <strong>Title</strong> you want here or</p>
    <your-custom-component [yourProp]="yourPropValue"></your-custom-component>
  </ng-template>
</mbsc-eventcalendar>
```

While fully customizing the header is very usefull, sometimes it's desireable to customize only parts of it. In this case you can take advantage of the default header's building blocks. These components let you put toghether the header you want, while you don't have to worry about the functionality behind them.

For example you can leave out parts from the default header, change the order of the default buttons appearance or add custom components between them.

Here's the list of the built in components of the default header:

- `<mbsc-calendar-prev>` - Previous button component, that navigates to the previous month.
- `<mbsc-calendar-next>` - Next button component, that navigates to the next month.
- `<mbsc-calendar-today>` - Today button component, that navigates to the current date.
- `<mbsc-calendar-nav>` - The title navigation button component, that opens the year/month navigation.

The above components can be used inside of the custom header. The following example will render the prev and next buttons and then a custom title that is set from a custom variable (myTitle variable).

```html title="Custom header with default buttons"
<mbsc-eventcalendar [headerTemplate]="header">
  <ng-template #header>
    <mbsc-calendar-prev></mbsc-calendar-prev>
    <mbsc-calendar-next></mbsc-calendar-next>
    <div class="my-custom-title">{{myTitle}}</div>
  </ng-template>
</mbsc-eventcalendar>
```
