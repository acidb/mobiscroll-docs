### anchor {#opt-anchor}

HTMLElement

Specifies the anchor element for positioning, if [display](#opt-display) is set to &#039;anchored&#039;.

**Default value**: It defaults to the element on which the component was initialized.
### animation {#opt-animation}

boolean &#124; "pop" &#124; "slide-down" &#124; "slide-up"

Animation to use for opening/closing of the control (if [display](#opt-display) is not inline).
Possible values:
 - &#039;pop&#039;
 - &#039;slide-down&#039;
 - &#039;slide-up&#039;
If false, turns the animation off.

**Default value**: undefined
### buttons {#opt-buttons}

Array&lt;string &#124; MbscPopupButton&gt;

Buttons to display. Each item in the array will be a button. A button can be specified as a string, or as a button object.

If a string, it must be one of the predefined buttons:
 - &#039;ok&#039; - Approve action (if applicable). It&#039;s the same as the &#039;set&#039; button, but will display the caption specified by the
[okText option](#localization-okText). Just like the &#039;set&#039; button, it will trigger the [onSet event](#event-onSet), when pressed.
 - &#039;cancel&#039; - Dismisses the popup.

:::note
To modify the text of the predefined buttons, you can use the [okText](#localization-okText),
[cancelText](#localization-cancelText) options.
:::

Every passed object can have the following properties:
 - text - String - Text of the button.
 - handler - String, Function - The function which will run when the button is pressed. If a string, it must be one of the predefined
button handlers:
   - &#039;set&#039; - Approve action (if applicable).
   - &#039;cancel&#039; - Dismisses the popup.
 - icon - String (Optional) - Icon of the button.
 - cssClass - String (Optional) - Css class of the button.
 - disabled - Boolean (Optional) - Sets the disabled state of the button.
 - keyCode - Number, String, Array (Optional) - The key code associated with the button to activate it from keyboard.
Can be a single value or multiple value passed as an array. Predifine string values are:
   - &#039;enter&#039;
   - &#039;esc&#039;
   - &#039;space&#039;

```js title="Predefined and custom buttons"
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
```js title="Using a predefined handler"
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

**Default value**: ['ok']
### closeOnEsc {#opt-closeOnEsc}

boolean

If true, the popup is closed on ESC keypress.

**Default value**: true
### closeOnOverlayClick {#opt-closeOnOverlayClick}

boolean

If true, the popup is closed on overlay tap/click.

**Default value**: true
### context {#opt-context}

any

Specify the DOM element in which the component is appended and positioned (if not inline).
Can be a selector string or a DOM element.

**Default value**: 'body'
### cssClass {#opt-cssClass}

string

Applies custom css class to the top level element.

**Default value**: undefined
### display {#opt-display}

MbscPopupDisplay

Controls the positioning of the component. Possible options:
 - &#039;center&#039; - The component appears as a popup at the center of the viewport.
 - &#039;inline&#039; - If called on div element, the component is placed inside the div (overwriting existing content), otherwise
is placed after the original element.
 - &#039;anchored&#039; - The component appears positioned to the element defined by the [anchor option](#opt-anchor). By default the anchor
is the original element.
 - &#039;top&#039; - The component appears docked to the top of the viewport.
 - &#039;bottom&#039; - The component appears docked to the bottom of the viewport.

**Default value**: The default display mode depends on the [theme](#opt-theme), it defaults to 'bottom' for the iOS theme and
to 'center' for all other themes.
### focusOnClose {#opt-focusOnClose}

boolean

Element to focus after the popup is closed. If undefined, the original element will be focused. If false, no focusing will occur.

**Default value**: undefined
### focusTrap {#opt-focusTrap}

boolean

If not in inline mode, focus won&#039;t be allowed to leave the popup.

**Default value**: true
### fullScreen {#opt-fullScreen}

boolean

If true, the popup will appear in full screen, but, by default, its width and height won&#039;t exceed 600px.
You can change that using the [maxWidth](#opt-maxWidth) and [maxHeight](#opt-maxHeight) options.

**Default value**: false
### headerText {#opt-headerText}

string

Text to display in the header.

**Default value**: undefined
### height {#opt-height}

string &#124; number

Sets the height of the component.

**Default value**: undefined
### isOpen {#opt-isOpen}

boolean

Specifies wether the popup is opened or not. Use it together with the [onClose event](#event-onClose), by setting it
to false when the popup closes.

**Default value**: undefined
### maxHeight {#opt-maxHeight}

string &#124; number

Sets the maximum height of the component. If not specified, on larger screens (>=768px width) it defaults to 600px.

**Default value**: undefined
### maxWidth {#opt-maxWidth}

string &#124; number

Sets the maximum width of the component.

**Default value**: undefined
### modules {#opt-modules}

Array&lt;IModule&gt;


### responsive {#opt-responsive}

missing

Specifies different settings for different container widths, in a form of an object,
where the keys are the name of the breakpoints, and the values are objects containing the settings for the given breakpoint.

:::caution
The available width is queried from the container element of the component and not the browsers viewport like in css media queries
:::
There are five predefined breakpoints:

- xsmall - min-width: 0px
- small - min-width: 576px
- medium - min-width: 768px
- large - min-width: 992px
- xlarge - min-width: 1200px

Custom breakpoints can be defined by passing an object containing the breakpoint property specifying the min-width in pixels. Example:

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

**Default value**: undefined
### scrollLock {#opt-scrollLock}

boolean

Disables page scrolling on touchmove (if not in inline mode, and popup height is less than window height).

**Default value**: true
### showArrow {#opt-showArrow}

boolean

Show or hide the popup arrow, when [display mode](#opt-display) is &#039;anchored&#039;.

**Default value**: true
### showOverlay {#opt-showOverlay}

boolean

Show or hide overlay.

**Default value**: true
### theme {#opt-theme}

string

Specifies the visual appearance of the component.

If it is &#039;auto&#039; or undefined, the theme will automatically be chosen based on the platform.
If custom themes are also present, they will take precedence over the built in themes, e.g. if there&#039;s an iOS based custom theme,
it will be chosen on the iOS platform instead of the default iOS theme.

Supplied themes:

- &#039;ios&#039; - iOS theme
- &#039;material&#039; - Material theme
- &#039;windows&#039; - Windows theme

It&#039;s possible to [modify theme colors or create custom themes](https://docs.mobiscroll.com/theming).
:::note
Make sure that the theme you set is included in the downloaded package.
:::

**Default value**: undefined
### themeVariant {#opt-themeVariant}

"dark" &#124; "light" &#124; "auto"

Controls which variant of the theme will be used (light or dark).

Possible values:

- &#039;light&#039; - Use the light variant of the theme.
- &#039;dark&#039; - Use the dark variant of the theme.
- &#039;auto&#039; or undefined - Detect the preferred system theme on devices where this is supported.

To use the option with custom themes, make sure to create two custom themes, where the dark version has the same name as the light one,
suffixed with &#039;-dark&#039;, e.g.: &#039;my-theme&#039; and &#039;my-theme-dark&#039;.

**Default value**: undefined
### touchUi {#opt-touchUi}

boolean &#124; "auto"

Use true to render a touch optimized user interface, or false for a user interface optimized for pointer devices (mouse, touchpad).

Can be used with the responsive option to change the user interface based on viewport width.

If set to &#039;auto&#039;, the touch UI will be automatically enabled based on the platform.

**Default value**: 'auto'
### width {#opt-width}

string &#124; number

Sets the width of the popup container. This will take no effect in inline display mode.

**Default value**: undefined