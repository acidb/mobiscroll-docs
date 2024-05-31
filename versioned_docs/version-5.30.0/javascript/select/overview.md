---
sidebar_position: 1
sidebar_label: Overview
displayed_sidebar: javascriptSidebar
---

# Select

The Select component lets you pick a single value or multiple values from a list of options.

## Usage

The following example will create a Select component with four options to choose from, each of them being a city.

```html
<input id="myInp" />
```

```js
mobiscroll.select('#myInp', {
  data: [
    { text: 'Atlanta', value: 1 },
    { text: 'Berlin', value: 2 },
    { text: 'Chicago', value: 3 },
    { text: 'London', value: 4 },
  ]
});
```
