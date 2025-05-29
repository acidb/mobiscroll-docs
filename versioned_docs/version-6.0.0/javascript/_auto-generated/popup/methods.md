### close {#method-close}

() => void


Closes the component.

### isVisible {#method-isVisible}

() => boolean


Returns if the component is opened or not.

### open {#method-open}

() => void


Opens the component.

### position {#method-position}

() => void


Recalculates the position of the component.

### setOptions {#method-setOptions}

(opt: MbscPopupOptions) => void


Sets or updates options of the component. Options can be updated dynamically after the initialization.

It receives an options object as parameter. Calling `setOptions` will overwrite all the options that
have a key in the options object parameter, and it will re-render the component.

```js
inst.setOptions({
  themeVarian: 'dark',
})
```
