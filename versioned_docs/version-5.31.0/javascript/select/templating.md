---
sidebar_position: 8
sidebar_label: Templating
displayed_sidebar: javascriptSidebar
---

# Templating

The selectable options (items) on the Select UI can be customized using the [`renderItem`](./api#renderer-renderItem) and the [`itemHeight`](./api#opt-itemHeight) options.

The item data is accessible through the `data` property of the function's first parameter.

```js title="Example item renderer function"
function (args) {
  return `<div>
    <div>${ args.data.text }</div>
    <div>${ args.data.value }</div>
    <div>${ args.data.yourCustomProperty }</div>
  </div>`;
}
```

```js title="Example for adding images to items"
const countries = [{
  value: 'US',
  text: 'United States of America',
  flagUrl: '//urlto/usa-flag',
}, {
  value: 'DE',
  text: 'Germany',
  flagUrl: '//urlto/german-flag',
}, {
  value: 'FR',
  text: 'France',
  flagUrl: '//urlto/french-flag',
}];

mobiscroll.select('#myInp', {
  data: countries,
  renderItem: function(i) {
    return `<div class="my-country-container">
      <img src=${i.data.flagUrl} />
      {i.data.text}
    </div>`;
  }
});
```


:::info
Every item on the Select must have the same height. For styles that go beyond the default height, the [`itemHeight`](./api#opt-itemHeight) option can be used to adjust the styling.
:::

