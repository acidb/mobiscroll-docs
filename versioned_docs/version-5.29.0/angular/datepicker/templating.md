---
sidebar_position: 9
sidebar_label: Templating
displayed_sidebar: angularSidebar
---

# Templating

## Calendar header template

The header of the calendar can be fully customized to one's needs with the use of the [`calendarHeaderTemplate`](api#template-calendarHeaderTemplate) option.

```html
<mbsc-datepicker [calendarHeaderTemplate]="myTemplate">
  <ng-template #myTemplate>
    <p>Any <strong>Title</strong> you want here or</p>
    <your-custom-component yourProp="yourPropValue"></your-custom-component>
  </ng-template>
</mbsc-datepicker>
```

While fully customizing the header is very usefull, sometimes it's desireable to customize only parts of it. In this case you can take advantage of the default header's building blocks. These components let you put toghether the header you want, while you don't have to worry about the functionality behind them.

For example you can leave out parts from the default header, change the order of the default buttons appearance or add custom components between them.

Here's the list of the built in components of the default header:

- `<mbsc-calendar-prev></mbsc-calendar-prev>` - Previous button component, that navigates to the previous month.
- `<mbsc-calendar-next></mbsc-calendar-next>` - Next button component, that navigates to the next month.
- `<mbsc-calendar-today></mbsc-calendar-today>` - Today button component, that navigates to the current date.
- `<mbsc-calendar-nav></mbsc-calendar-nav>` - The title navigation button component, that opens the year/month navigation.

The above components can be used inside of the custom header. The following example will render the prev and next buttons and then a custom title that is set from a custom variable (myTitle variable).

```html title="Custom header with default buttons"
<mbsc-datepicker [calendarHeaderTemplate]="myHeader">
  <ng-template #myHeader>
    <mbsc-calendar-prev></mbsc-calendar-prev>
    <mbsc-calendar-next></mbsc-calendar-next>
    <div class="my-custom-title">{{myTitle}}</div>
  </ng-template>
</mbsc-datepicker>
```

```ts
@Component(...)
export class YourComponent {
  myTitle = 'My Custom Title';
}
```
![Calendar header template](/img/calendar-header-template.png)

## Calendar cell template

There are two options that enable the customization of calendar cells: the [`dayContentTemplate`](./api#template-dayContentTemplate) and the [`dayTemplate`](./api#template-dayTemplate) option.

The difference between the two is that the Datepicker will style the cells by default (background, hover, etc.) in the case of the `dayContentTemplate` option and will render the dates as usual. The custom content will be rendered after the dates in each cell.

In the case of the `dayTemplate` option however, both the styling and the content (the dates too) will come from the custom template.

```html title="Example of custom cells"
<mbsc-datepicker [dayTemplate]="myTemplate">
  <ng-template #myTemplate #let-day>
    **{{day.date.getDate()}}**
  </ng-template>
</mbsc-datepicker>
```
![Calendar cell template](/img/calendar-cell-template.png)