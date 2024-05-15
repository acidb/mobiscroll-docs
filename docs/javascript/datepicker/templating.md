---
sidebar_position: 9
sidebar_label: Templating
displayed_sidebar: javascriptSidebar
---

# Templating
The display of the Date & time picker component can be customized with different [renderer](api#renderers) functions.

## Calendar header template

The header of the calendar can be fully customized to one's needs with the use of the [`renderCalendarHeader`](api#renderer-renderCalendarHeader) option.

```js
mobiscroll.datepicker('#myInput', {
  renderCalendarHeader: function() {
    return `<p>Any <strong>Title</strong> you want here</p>`;
  }
});
```

While fully customizing the header is very usefull, sometimes it's desireable to customize only parts of it. In this case you can take advantage of the default header's building blocks. These components let you put toghether the header you want, while you don't have to worry about the functionality behind them.

For example you can leave out parts from the default header, change the order of the default buttons appearance or add custom components between them.

The built in header components can be initialized with their respective attributes as follows:

- `<button mbsc-calendar-prev></button>` - Previous button, that navigates to the previous month.
- `<button mbsc-calendar-next></button>` - Next button, that navigates to the next month.
- `<button mbsc-calendar-today></button>` - Today button, that navigates to the current date.
- `<div mbsc-calendar-nav></div>` - The title navigation button, that opens the year/month navigation.

The above components can be used inside of the custom header. The following example will render the prev and next buttons and then a custom title that is set from a custom variable (myTitle variable).

```js title="Custom header with default buttons"
var myTitle = 'My Awesome title';
mobiscroll.datepicker('#myInput', {
  renderCalendarHeader: function () {
    return `<button mbsc-calendar-prev></button>
            <button mbsc-calendar-next></button>
            <div className="my-custom-title">${myTitle}</div>`;
  }
});
```
![Calendar header template](/img/calendar-header-template.png)

## Calendar cell template

There are two options that enable the customization of calendar cells: the [`renderDayContent`](./api#renderer-renderDayContent) and the [`renderDay`](./api#renderer-renderDay) option.

The difference between the two is that the Datepicker will style the cells by default (background, hover, etc.) in the case of the `renderDayContent` option and will render the dates as usual. The custom content will be rendered after the dates in each cell.

In the case of the `renderDay` option however, both the styling and the content (the dates too) will come from the custom template.

```js title="Example of custom cells"
mobiscroll.datepicker('#myInput', {
  renderDay: function (args) {
    return '**' + args.date.getDate() + '**';
  }
});
```
![Calendar cell template](/img/calendar-cell-template.png)
