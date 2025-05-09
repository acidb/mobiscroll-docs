---
sidebar_position: 10
sidebar_label: Customizing the input
displayed_sidebar: angularSidebar
title: Customizing the input
---

## Overview

The datepicker, as explained below, can be used with one, two or no inputs.

## Using without inputs

The first choice of input customization is to have no inputs at all. In this case rendering the component in [inline display](/angular/datepicker/display-modes) mode will leave out the use of inputs.

```html title="Inline picker"
<mbsc-datepicker display="inline" [(ngModel)]="myAppointment"></mbsc-datepicker>
```

## Using with one input

The datepicker component will render a Mobiscroll Input by default. This input will hold the formatted value after selection.

Having a custom input can be achived using the datepicker directive on the component you want.

```ts title="Using the datepicker on an IonInput"
@Component({...})
export class AppComponent {
  // highlight-next-line
  myDatepickerOptions = { select: 'date', controls: ['calendar'] };
}
```

```html
<ion-input placeholder="Click to select" mbsc-datepicker [mbscOptions]="myDatepickerOptions"></ion-input>
```

## Using with two inputs

When selecting a range, you have basically two values to display: the start of the range and the end of the range. These can be shown in different inputs using the [`startInput`](/angular/datepicker/api#opt-startInput) and the [`endInput`](/angular/datepicker/api#opt-endInput) options.

```html title="Two inputs for range selection"
<mbsc-input placeholder="Start" label="Start Date" #myStart></mbsc-input>
<mbsc-input placeholder="End" label="End Date" #myEnd></mbsc-input>
<mbsc-datepicker select="range" [(ngModel)]="myRange" [startInput]="myStart" [endInput]="myEnd"></mbsc-datepicker>
```

When the [`startInput`](/angular/datepicker/api#opt-startInput) and the [`endInput`](/angular/datepicker/api#opt-endInput) options are provided, the datepicker will not render any other inputs. It will open when these inputs are focused/clicked instead.