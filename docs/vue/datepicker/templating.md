---
sidebar_position: 9
sidebar_label: Templating
displayed_sidebar: vueSidebar
---

# Templating

## Header templating

The header of the calendar can be fully customized to one's needs with the use of the [calendarHeader](api#slot-calendarHeader) slot.

```html
<MbscDatepicker>
  <template #calendarHeader>
    <p>Any <strong>Title</strong> you want here or</p>
    <your-custom-component :yourProp="yourPropValue"></your-custom-component>
  </template>
</MbscDatepicker>
```

While fully customizing the header is very usefull, sometimes it's desireable to customize only parts of it. In this case you can take advantage of the default header's building blocks. These components let you put toghether the header you want, while you don't have to worry about the functionality behind them.

For example you can leave out parts from the default header, change the order of the default buttons appearance or add custom components between them.

Here's the list of the built in components of the default header:

- `<MbscCalendarPrev />` - Previous button component, that navigates to the previous month.
- `<MbscCalendarNext />` - Next button component, that navigates to the next month.
- `<MbscCalendarToday />` - Today button component, that navigates to the current date.
- `<MbscCalendarNav />` - The title navigation button component, that opens the year/month navigation.

The above components can be used inside of the custom header. The following example will render the prev and next buttons and then a custom title that is set from a custom variable (myTitle variable).

```html title="Custom header with default buttons"
<MbscDatepicker>
  <template #calendarHeader>
    <MbscCalendarPrev />
    <MbscCalendarNext />
    <div class="my-custom-title">{{myTitle}}</div>
  </template>
</MbscDatepicker>
```

## Calendar cell templating

There are two slots that enable the customization of calendar cells: the [`dayContent`](./api#slot-dayContent) and the [`day`](./api#slot-day) slot.

The difference between the two is that the Datepicker will style the cells by default (background, hover, etc.) in the case of the `dayContent` slot and will render the dates as usual. The custom content will be rendered after the dates in each cell.

In the case of the `day` slot however, the Datepicker will only position the elements. Both the styling and the content (the dates too) will come from the custom template.

```html title="Example of custom cells"
<MbscDatepicker>
  <template #day="args">
    **{{args.date.getDate()}}**
  </template>
</MbscDatepicker>
```
