### item {#slot-item}

```html
<template #item="args">...</template>
```

Customize each selectable item on the wheel.

When the group wheel is also shown using the [`showGroupWheel`](#opt-showGroupWheel) option,
the `data` property and the `isGroup` property of the item will be `undefined` in the case of the group wheel items.
So, you can distinguish from the group wheel and the option wheel by checking if both the `data` and the `isGroup` are undefined.

Available parameters:
- `display`: _string_ - The text of the item.
- `value`: _any_ - The value of the item.
- `isGroup`: _boolean_ - For group headers this property will be true
- `data`: _MbscSelectData_ - The original option item that is passed in the [`data`](#opt-data) array
