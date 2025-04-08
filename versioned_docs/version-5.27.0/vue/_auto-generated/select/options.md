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
### ariaLabel {#opt-ariaLabel}

string

Specifies the accessible name of the picker input.

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
Can be a single value or multiple value passed as an array. Predefined string values are: `'enter'`, `'esc'`, `'space'`.

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

**Default value**: `['set', 'cancel']`
### circular {#opt-circular}

boolean &#124; Array&lt;boolean&gt;

If `true`, the scroll wheels are circular. If an array, it can be specified as a per wheel configuration, e.g. for 3 wheels:
`[true, false, false]` sets the first wheel circular.
If not specified, if a wheel has more values than the number of the displayed rows, the scroll wheel becomes circular.

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

**Default value**: `undefined`
### data {#opt-data}

Array&lt;any&gt;

Specifies the selectable options for the component.

When it&#039;s an array of strings, the selectable options will be the items of the array.
The strings will appear on the picker, and the selected values will be the strings themselves.

When it&#039;s an array of objects, the objects can have the following properties:
- `text`: *string* - The text of the option.
- `value`: *any* - The value of the option.
- `group`: *string* - The group name in case of grouped options.
- `disabled`: *boolean* - The disabled state of the option. Disabled options cannot be selected.

**Default value**: `undefined`
### defaultSelection {#opt-defaultSelection}

any

Default selection which appears on the picker. The provided value will not be set as picker value, it&#039;s only a pre-selection.

**Default value**: `undefined`
### disabled {#opt-disabled}

boolean

Specifies the disabled state of the input.

**Default value**: `false`
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
### dropdown {#opt-dropdown}

boolean

If `false`, the down arrow icon is hidden.

**Default value**: `true`
### endIcon {#opt-endIcon}

string

Specifies the icon which will be displayed at the end of the input.
Use the [startIcon](#opt-startIcon) option for specifying an icon at the start.

**Default value**: `undefined`
### error {#opt-error}

boolean

If `true`, the input will be displayed with error styles.

**Default value**: `false`
### errorMessage {#opt-errorMessage}

string

Error message for the input. If the [error](#opt-error) option is set to `true`, the message will be displayed.

**Default value**: `undefined`
### filter {#opt-filter}

boolean

If `true`, it turns filtering on. A filter input will be rendered above the selectable options.
Typing in the input will filter the selectable options and will also trigger the [onFilter](#event-onFilter) event.

The default behavior is based on the presence of the search term in the option text.
The [onFilter](#event-onFilter) event can be used to prevent the default filtering and customize the experience.

**Default value**: `false`
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
### headerText {#opt-headerText}

string

Specifies a custom string which appears in the picker header.
If it contains the `'{value}'` string, it will be replaced with the selected value of the picker.

**Default value**: `undefined`
### inputStyle {#opt-inputStyle}

"outline" &#124; "box" &#124; "underline"

Specifies the style of the input. Possible values:
- `'underline'`
- `'box'`
- `'outline'`

The default value depends on the [theme](#opt-theme):
- iOS: `'underline'`
- Material: `'box'`
- Windows: `'outline'`

**Default value**: `undefined`
### invalid {#opt-invalid}

Array&lt;any&gt;

An array of values that are invalid. Invalid options cannot be selected, and show up as disabled on the Select.

**Default value**: `undefined`
### isOpen {#opt-isOpen}

boolean

Specifies if the component is opened or not. Use it together with the [onClose](#event-onClose) event, by setting it
to `false` when the component closes.

**Default value**: `false`
### itemHeight {#opt-itemHeight}

number

Height in pixels of one item on the wheel. The default value depends on the [theme](#opt-theme):
- iOS: 34
- Material: 40
- Windows: 44
### label {#opt-label}

string

Specifies the label of the input.

**Default value**: `undefined`
### labelStyle {#opt-labelStyle}

"inline" &#124; "floating" &#124; "stacked"

Specifies the position of the input label. Possible values:
- `'stacked'`
- `'inline'`
- `'floating'`

The default value depends on the [theme](#opt-theme):
- iOS: `'inline'`
- Material: `'floating'`
- Windows: `'stacked'`

**Default value**: `undefined`
### maxWheelWidth {#opt-maxWheelWidth}

number &#124; Array&lt;number&gt;

Maximum width of the scroller wheels in pixels.
If a number, it is applied to all wheels, if an array, it is applied to each wheel separately.

**Default value**: `undefined`
### minWheelWidth {#opt-minWheelWidth}

number &#124; Array&lt;number&gt;

Minimum width of the scroller wheels in pixels.
If a number, it is applied to all wheels, if an array, it is applied to each wheel separately.

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
  custom: { // Custom breakpoint, you can use multiple if needed, but each must have a unique name.
    breakpoint: 600,
    display: 'center'
  },
  large: {
    display: 'anchored'
  }
}
```

**Default value**: `undefined`
### rows {#opt-rows}

number

Number of visible rows on the wheel. The default value depends on the [theme](#opt-theme):
- iOS: 5
- Material: 3
- Windows: 6
### selectMultiple {#opt-selectMultiple}

boolean

If `true`, multiple selection will be enabled.

**Default value**: `false`
### showArrow {#opt-showArrow}

boolean

Show or hide the popup arrow, when [display](#opt-display) is `'anchored'`.

**Default value**: `true`
### showGroupWheel {#opt-showGroupWheel}

boolean

If `true` and the Select has groups, two columns will be rendered on the picker,
the first containing the group labels, and the second one the options.
Groups can be specified either by `optgroup` elements, when the data comes from the html markup,
or by using the `group` property of the option objects, when the [data](#opt-data) option is used.

**Default value**: `false`
### showInput {#opt-showInput}

boolean

If `true`, it will render an input field for the component.

**Default value**: `true`
### showOnClick {#opt-showOnClick}

boolean

Opens the component on element click/tap.

**Default value**: `true`
### showOnFocus {#opt-showOnFocus}

boolean

Opens the component on element focus.

**Default value**: `false on desktop, true on mobile`
### showOverlay {#opt-showOverlay}

boolean

Show or hide the popup overlay.

**Default value**: `true`
### startIcon {#opt-startIcon}

string

Specifies the icon which will be displayed at the start of the input.
Use the [endIcon](#opt-endIcon) option for specifying an icon at the end.

**Default value**: `undefined`
### tagInput {#opt-tagInput}

boolean

If `true` and used with [multiple selection](#opt-selectMultiple),
it will display the selected values inside the input as tags (chips).

**Default value**: `false`
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

:::info
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
### wheelWidth {#opt-wheelWidth}

number &#124; Array&lt;number&gt;

Width of the scroller wheels, in pixels. Wheel content will be truncated, if it exceeds the width.
If a number, it is applied to all wheels, if an array, it is applied to each wheel separately.

**Default value**: `undefined`