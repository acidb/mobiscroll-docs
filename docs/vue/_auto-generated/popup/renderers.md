export const toc = []

### header {#slot-header}

<span className="badge badge--secondary margin-bottom--sm">From: 6.1.0</span>

```html
<template #header>...</template>
```

A render function to customize the header of the popup.
It should return the desired markup for the header.
Takes priority over the [headerText](#opt-headerText) option.
