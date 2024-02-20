---
sidebar_label: Instance
displayed_sidebar: angularSidebar
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Instance

In object-oriented programming (OOP), an instance is a specific realization of a class. Similarly, in the scope
of the Mobiscroll library, a component instance is a realization of the component class.

The instantiation (the creation of objects from a class) in case of the Mobiscroll components is done by the Angular framework,
and accessing the component instances are only needed in a few specific cases.

## Getting the instance

### Inside events

A reference to the component instance is available in every Mobiscroll event through the `inst` property of the first argument.

<Tabs>
<TabItem value="html" label="component.html">

```html
<mbsc-eventcalendar (onEventCreate)="myHandler($event)"></mbsc-eventcalendar>
```

</TabItem>
<TabItem value="ts" label="component.ts">

```ts
@Component({
  selector: 'component',
  templateUrl: './component.html',
})
export class AppComponent {
  myHandler(args: MbscEventCreateEvent) {
    // highlight-next-line
    console.log('The Eventcalendar instance:', args.inst);
  }
}
```

</TabItem>
</Tabs>

### Template references

The mobiscroll directives and components are exported as 'mobiscroll' for template variables.

```html
<mbsc-datepicker #myRef></mbsc-datepicker>
<input mbsc-datepicker #myRef="mobiscroll" />
```

## Calling methods

:::caution
Calling the instance methods should be necessary only in a few selected cases. Almost every case can be solved with passing props to the component and using it's events rather than calling instance methods. Before implementing a solution, please take into consideration using props and events first.
:::

All the component methods are documented on each components API section. The methods can be called on the component instances directly in the templates or inside component classes using `@ViewChild` decorators.

### Inside templates

```html title="Calling methods in the template"
<mbsc-popup #myPopup>
  <p>Popup content</p>
</mbsc-popup>

<mbsc-button (click)="myPopup.open()">Open</mbsc-button
```

### Inside classes

```ts
@Component({
  selector: 'component',
  templateUrl: './component.html',
})
export class AppComponent {
  // highlight-start
  @ViewChild('myPopup')
  popupInst: MbscPopup | null = null;
  // highlight-end

  openPopup() {
    if (this.popupInst) {
      // highlight-next-line
      this.popupInst.open();
    }
  }
}
```

### Example: Getting invalid dates for a date range

One such a case when you might need to call an instance method would be to get the invalid data for a time period from the eventcalendar. Since the invalid data you pass to the Eventcalendar can contain recurring rules, you need a way to calculate the actual occurences. Luckily the Eventcalendar has a method that will return the actual occurences for a time period.

```ts title="Invalid rule that repeats on specific days"
@Component({
  selector: 'component',
  templateUrl: './component.html',
})
export class AppComponent {
  invalidsArray: MbscDateType[] = [{
      start: '2023-10-18',
      allDay: true,
      recurring: {
        repeat: 'weekly',
        weekDays: 'MO,FR,SA',
        interval: 1
      }
  }];
}
```

To get the actual invalid days for the month of November, you can call the [`getInvalids`](../eventcalendar/api#method-getInvalids) method of the Eventcalendar instance.

```html title="The invalids array needs to be passed to the eventcalendar"
<mbsc-eventcalendar [invalid]="invalidsArray" #myCalendar />
```

Then you can query the invalid days through the instance:

```ts
@Component({
  selector: 'component',
  templateUrl: './component.html',
})
// highlight-next-line
export class AppComponent implements AfterViewInit {
  invalidsArray: MbscDateType[] = [{
      start: '2023-10-18',
      allDay: true,
      recurring: {
        repeat: 'weekly',
        weekDays: 'MO,FR,SA',
        interval: 1
      }
  }];

  // highlight-start
  @ViewChild('myCalendar')
  inst: Eventcalendar | null = null;

  ngAfterViewInit(): void {
    const occurences = this.inst!.getInvalids('2023-11-01', '2023-12-01');
  }
  // highlight-end
}
```

The result in this case will be an array of objects, each of them being an occurence of an invalid day in November. The `AfterViewInit` interface is required, because the `ViewChild` references will only get a value after the view was initialized.
