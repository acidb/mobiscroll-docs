---
sidebar_position: 9
sidebar_label: Invalid items
displayed_sidebar: angularSidebar
title: Invalid items
---

Invalid items are items that cannot be selected. They appear disabled on the wheels and when clicked, a selection will not happen.

Invalid items can be set using the `invalid` [option](/angular/select/api#opt-invalid) or the `data` [option](/angular/select/api#opt-data). The `invalid` [option](/angular/select/api#opt-invalid) takes an array of values and disables those values. When using the `data` [option](/angular/select/api#opt-data), each item can take a disables property, that `disables` that item.

```html title="Invalid example"
<mbsc-select [(ngModel)]="selectedExtra" [data]="extras" [invalid]="myInvalid"></mbsc-select>
```

```ts
@Component(...)
export class MyComponent {
    public extras = [
      { value: 'sug', text: 'Sugar'}, 
      { value: 'hon', disabled: true, text: 'Honey'}, 
      { value: 'cre', text: 'Cream' }
    ];
    public myInvalid = ['sug'];
    public selectedExtra: string;
}
```