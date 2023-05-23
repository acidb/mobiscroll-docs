### anchor {#opt-anchor}

HTMLElement

Specifies the anchor element for positioning, if [display](#opt-display) is set to `'anchored'`.

**Default value**: `undefined`
### animation {#opt-animation}

boolean &#124; "pop" &#124; "slide-down" &#124; "slide-up"

Animation to use when the component is opened or closed, if [display](#opt-display) is not set to `'inline'`.
Possible values:
- `'pop'`
- `'slide-down'`
- `'slide-up'`

If `false`, the animation is turned off.

**Default value**: `undefined`
### buttons {#opt-buttons}

Array&lt;string &#124; MbscPopupButton&gt;

Buttons to display. Each item of the array will be a button. A button can be specified as a string, or as a button object.

If a string, it must be one of the predefined buttons:
- `'ok'` - Approve action. Will display the caption specified by the [okText](#localization-okText) option.
- `'cancel'` - Dismisses the popup. Will display the caption specified by the [cancelText](#localization-cancelText) option.
- `'close'` - Closes the popup. Will display the caption specified by the [closeText](#localization-closeText) option.
- `'set'` - Approve action. Will display the caption specified by the [setText](#localization-setText) option.

The button object can have the following properties:
- `text`: *string* - Text of the button.
- `handler`: *string | () => void* - The handler function which will run when the button is pressed.
If a string, it must be one of the predefined button handlers:
  - `'set'` - Approve action.
  - `'cancel'` - Dismiss the popup.
- `icon`: *string* - Icon for the button.
- `cssClass`: *string* - CSS class for the button.
- `disabled`: *boolean* - The disabled state of the button.
- `keyCode`: *number | string | Array&lt;number | string&gt;* - The key code associated with the button to activate it from keyboard.
Can be a single value or multiple value passed as an array. Predifined string values are: `'enter'`, `'esc'`, `'space'`.

```js title="Example for using predefined and custom buttons"
buttons: [
  'set',
  {
    text: 'Custom',
    icon: 'checkmark',
    cssClass: 'my-btn',
    handler: function (event) {
      alert('Custom button clicked!');
    }
  },
  'cancel'
]
```
```js title="Example for using a predefined button handler"
buttons: [
  'set',
  {
    text: 'Hide',
    handler: 'cancel',
    icon: 'close',
    cssClass: 'my-btn'
  }
]
```

**Default value**: `undefined`
### closeOnEsc {#opt-closeOnEsc}

boolean

If `true`, the popup is closed when the ESC key is pressed.

**Default value**: `true`
### closeOnOverlayClick {#opt-closeOnOverlayClick}

boolean

If `true`, the popup is closed on overlay click or tap.

**Default value**: `true`
### context {#opt-context}

string &#124; HTMLElement

Specify the DOM element in which the component is rendered and positioned, if [display](#opt-display) is not `'inline'`.
Can be a selector string or a DOM element.

**Default value**: `'body'`
### cssClass {#opt-cssClass}

string

Specifies a custom CSS class for the component.

:::info
The `mbsc-no-padding` class removes the built in padding of the popup content.
:::
### display {#opt-display}

MbscPopupDisplay

Controls the positioning of the component. Possible options:
- `'center'` - The component appears as a popup at the center of the viewport.
- `'inline'` - The component is rendered inline.
- `'anchored'` - The component appears positioned to the element defined by the [anchor](#opt-anchor) option.
- `'top'` - The component appears docked to the top of the viewport.
- `'bottom'` - The component appears docked to the bottom of the viewport.

The default display mode depends on the [theme](#opt-theme), it defaults to `'bottom'` for the iOS theme and
to `'center'` for all other themes.

**Default value**: `undefined`
### focusOnClose {#opt-focusOnClose}

boolean

If `true`, after closing the popup the focus will be moved to the last focused element
before the popup was opened.

**Default value**: `true`
### focusOnOpen {#opt-focusOnOpen}

boolean

If `true`, the popup will receive the focus when opened.

**Default value**: `true`
### focusTrap {#opt-focusTrap}

boolean

If `true` and [display](#opt-display) is not set to `'inline'`, focus won&#039;t be allowed to leave the popup.

**Default value**: `true`
### fullScreen {#opt-fullScreen}

boolean

If `true`, the popup will appear in full screen, but, by default, its width and height won&#039;t exceed 600px.
You can change that using the [maxWidth](#opt-maxWidth) and [maxHeight](#opt-maxHeight) options.

**Default value**: `false`
### headerText {#opt-headerText}

string

Text to display in the header.

**Default value**: `undefined`
### height {#opt-height}

string &#124; number

Sets the height of the component.

**Default value**: `undefined`
### isOpen {#opt-isOpen}

boolean

Specifies if the popup is opened or not. Use it together with the [onClose](#event-onClose) event, by setting it
to `false` when the popup closes.

**Default value**: `false`
### maxHeight {#opt-maxHeight}

string &#124; number

Sets the maximum height of the component. If not specified, on larger screens (>=768px width) it defaults to 600px.

**Default value**: `undefined`
### maxWidth {#opt-maxWidth}

string &#124; number

Sets the maximum width of the component.

**Default value**: `undefined`
### responsive {#opt-responsive}

missing

Specifies different options for different container widths, in a form of an object,
where the keys are the name of the breakpoints, and the values are objects containing the options for the given breakpoint.

:::info
The available width is queried from the container element of the component and not the browsers viewport like in css media queries
:::
There are five predefined breakpoints:

- `xsmall` - min-width: 0px
- `small` - min-width: 576px
- `medium` - min-width: 768px
- `large` - min-width: 992px
- `xlarge` - min-width: 1200px

Custom breakpoints can be defined by passing an object containing the `breakpoint` property specifying the min-width in pixels.
Example:

```
responsive: {
  small: {
    display: 'bottom'
  },
  custom: { // Custom breakpoint
    breakpoint: 600,
    display: 'center'
  },
  large: {
    display: 'anchored'
  }
}
```

**Default value**: `undefined`
### scrollLock {#opt-scrollLock}

boolean

Disables page scrolling, if the content of the popup is not scrollable.

**Default value**: `true`
### showArrow {#opt-showArrow}

boolean

Show or hide the popup arrow, when [display](#opt-display) is `'anchored'`.

**Default value**: `true`
### showOverlay {#opt-showOverlay}

boolean

Show or hide the popup overlay.

**Default value**: `true`
### theme {#opt-theme}

string

Specifies the visual appearance of the component.

If it is `'auto'` or `undefined`, the theme will automatically be chosen based on the platform.
If custom themes are also present, they will take precedence over the built in themes, e.g. if there&#039;s an iOS based custom theme,
it will be chosen on the iOS platform instead of the default iOS theme.

Supplied themes:
- `'ios'` - iOS theme
- `'material'` - Material theme
- `'windows'` - Windows theme

It&#039;s possible to [modify theme colors or create custom themes](https://docs.mobiscroll.com/theming).

:::note
Make sure that the theme you set is included in the downloaded package.
:::

**Default value**: `undefined`
### themeVariant {#opt-themeVariant}

"dark" &#124; "light" &#124; "auto"

Controls which variant of the [theme](#opt-theme) will be used (light or dark).

Possible values:
- `'light'` - Use the light variant of the theme.
- `'dark'` - Use the dark variant of the theme.
- `'auto'` or `undefined` - Detect the preferred system theme on devices where this is supported.

To use the option with custom themes, make sure to create two custom themes, where the dark version has the same name as the light one,
suffixed with `'-dark'`, e.g.: `'my-theme'` and `'my-theme-dark'`.

**Default value**: `undefined`
### touchUi {#opt-touchUi}

boolean &#124; "auto"

Use `true` to render a touch optimized user interface, or `false` for a user interface optimized for pointer devices (mouse, touchpad).

Can be used with the [responsive](#opt-responsive) option to change the user interface based on viewport width.

If set to `'auto'`, the touch UI will be automatically enabled based on the platform.

**Default value**: `'auto'`
### width {#opt-width}

string &#124; number

Sets the width of the component.

**Default value**: `undefined`