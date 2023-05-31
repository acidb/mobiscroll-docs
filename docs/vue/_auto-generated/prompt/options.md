### animation {#opt-animation}

boolean &#124; "pop" &#124; "slide-down" &#124; "slide-up"

Animation to use when the component is opened or closed.

**Default value**: `undefined`
### cssClass {#opt-cssClass}

string

Specifies a custom CSS class for the component.

**Default value**: `undefined`
### display {#opt-display}

"top" &#124; "bottom" &#124; "center"

Controls the positioning of the component.

**Default value**: `undefined`
### inputType {#opt-inputType}

string

Initial value of the displayed input.

**Default value**: `undefined`
### isOpen {#opt-isOpen}

boolean

Specifies if the component is opened or not. Use it together with the [onClose](#event-onClose) event, by setting it
to `false` when the component closes.

**Default value**: `undefined`
### label {#opt-label}

string

Label for the displayed input.

**Default value**: `undefined`
### message {#opt-message}

string

Message to present.
### placeholder {#opt-placeholder}

string

Placeholder text for the displayed input.

**Default value**: `undefined`
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
### title {#opt-title}

string

Title for the dialog.

**Default value**: `undefined`
### value {#opt-value}

string

Initial value of the displayed input.

**Default value**: `undefined`