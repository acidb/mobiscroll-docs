---
sidebar_position: 7
sidebar_label: Filtering
displayed_sidebar: angularSidebar
---

# Filtering

Filtering can be turned on with the [`filter`](./api#opt-filter) option. It is very usefull when using large datasets and you want to find a particular item.

When filtering is on, a filter input is rendered above the selectable options. The placeholder of the input can be customized and localized with the [`filterPlaceholderText`](./api#localization-filterPlaceholderText) option.
Typing a text in the input filters the options you can choose from. Also, with each change on the filter input text, the [`onFilter`](./api#event-onFilter) event is triggered.

When no items match the filter the Mobiscroll Select will show a "No results" message, that can be customized and localized with the [`filterEmptyText`](./api#localization-filterEmptyText) option.

## Local Filtering

By defaut filtering is done client side on the dataset passed to the Select with the [data](./api#opt-data) option. The filter text is searched in the option items `text` property and if there is a match the item stays in the list - otherwise it's hidden.

```html
<mbsc-select [data]="countries" [filter]="true"></mbsc-select>
```
```ts
import { MbscSelectData } from '@mobiscroll/angular';

@Component({...})
export class MyComponent {
  countries: MbscSelectData[] = [
    { text: 'US - United States', value: 3 },
    { text: 'DE - Germany', value: 19 },
    { text: 'HU - Hungary', value: 93 },
    // ... long list of 195 countries
    { text: 'ZW - Zimbabwe', values: 73 },
  ];
}
```

## Remote Filtering

Server side filtering can be implemented with the help of the [`onFilter`](./api#event-onFilter) event and using the [`data`](./api#opt-data) option dynamically. Returning `false` from the [`onFilter`](./api#event-onFilter) event handler will prevent the filtering of the option items locally. Then, a request can be made to the server with the `filterText` and the returned data can be set to the Select dynamically.

```html
<mbsc-select [data]="countries" [options]="mySelectOptions"></mbsc-select>
```
```ts
import { MbscSelectData, MbscSelectFilterEvent } from '@mobiscroll/angular';
import { myCreateARequestMethod } from 'any-library-i-want';

@Component({...})
export class MyComponent {
  myData: MbscSelectData[] = [];
  mySelectOptions: MbscSelectOptions = {
    filter: true,
    onFilter: (args: MbscSelectFilterEvent) => {
      const text = args.filterText;
      // create a request here and set the results to the data
      myCreateARequestMethod(text)
        .then((filteredArray) => {
          // highlight-start
          // this is probably an async operation
          this.myData = filteredArray;
          // highlight-end
        });

      // highlight-start
      // this is synchronous
      return false;
      // highlight-end
    }
  }
}
```

:::caution
When implementing remote filtering, you have to use the `[options]` attribute instead of subscribing to the `(onFilter)` event emitter. The `(onFilter)` event emitter is asynchronous and returning `false` there is too late to cancel the built in filtering of the select. Event handlers in the `[options]` object are synchronous and makes this implementation possible.
:::

:::info
In the above example, we did not specify any library to handle the remote calls on purpose.

If you need a library to handle http requests, check out [Axios](https://github.com/axios/axios). It's a very popular library.
:::