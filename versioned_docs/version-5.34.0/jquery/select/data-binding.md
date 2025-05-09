---
sidebar_position: 2
sidebar_label: Data binding
displayed_sidebar: jquerySidebar
---

import DataOptionContent from '../../_shared/select/data-option.mdx';
import GroupOptionContent from '../../_shared/select/group-options.mdx';

# Data binding

The Select component can be initialized on an input or a select html element.

* [Using a select](#select) element can be beneficial when having only a small amount of options the user can choose from. Also when initializing on a select element, the displayed text and value are limited to strings.

* [Using an input](#input) element is easier when the data must be loaded dynamically or if you have large data sets. The selection list can hold any data, not just strings.

## Using a select {#select}

```html
<select id="mySelect">
  <option value="1">Marketing</option>
  <option value="2">Sales</option>
  <option value="3">Support</option>
  <option value="4">Development</option>
</select>
```
```js
$('#mySelect').mobiscroll().select();
```

## Using an input {#input}

<DataOptionContent />

#### Example with numbers as values

```html
<input id="myInput" />
```
```js title="Department selection example"
$('#myInput').mobiscroll().select({
  data: [
    { text: 'Marketing', value: 1 },
    { text: 'Sales', value: 2 },
    { text: 'Support', value: 3 },
    { text: 'Development', value: 4 },
  ],
});
```

#### Example with complex objects as values

```html
<input id="myInput" />
```
```js title="User selection example"
$('#myInput').mobiscroll().select({
  data: [
    { text: 'Alice', value: { id: 123, fullName: 'Alice Cooper' }},
    { text: 'Brandon', value: { id: 456, fullName: 'Brandon Lee' }},
    { text: 'Louisa', value: { id: 789, fullName: 'Louisa Crawford'}},
  ],
});
```

## Group options {#grouping}

<GroupOptionContent />

```html
<input id="myInput" />
```
```js
$('#myInput').mobiscroll().select({
  // highlight-next-line
  showGroupWheel: true,
  data: [{
    text: 'France',
    value: 'FR',
    group: 'Europe'
  }, {
    text: 'Hungary',
    value: 'HU',
    group: 'Europe'
  } // ...
  ],
});
```

## Data through markup

The Mobiscroll Select component can be initialized on a `<select>` element, in which case it does not require the data option to be passed. The data will be read from the `<option>` elements.

```jsx title="Initializing on select element"
<label>Gender
    <select id="gender">
        <option value="female">Female</option>
        <option value="male">Male</option>
    </select>
</label>
```

```jsx
$('#gender').mobiscroll().select();
```

```jsx title="Group select"
<label>Country
    <select id="countries">
        <optgroup label="Europe">
            <option value="fr">France</option>
            <option value="hu">Hungary</option>
        </optgroup>
        <optgroup label="Asia">
            <option value="ch">China</option>
            <option value="ja">Japan</option>
        </optgroup>
    </select>
</label>
```

```jsx
$('#countries').mobiscroll().select();
```