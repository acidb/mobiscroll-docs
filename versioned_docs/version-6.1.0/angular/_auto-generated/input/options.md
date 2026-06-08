### cssClass {#opt-cssClass}

string

Specifies a custom CSS class for the component.

**Default value**: `undefined`
### disabled {#opt-disabled}

boolean

Specifies the disabled state of the input.

**Default value**: `false`
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
### passwordToggle {#opt-passwordToggle}

boolean

Specifies the password toggle visibility on a password field.

**Default value**: `false`
### placeholder {#opt-placeholder}

string

Specifies the placeholder text for the input.

**Default value**: `undefined`
### startIcon {#opt-startIcon}

string

Specifies the icon which will be displayed at the start of the input.
Use the [endIcon](#opt-endIcon) option for specifying an icon at the end.

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

It&#039;s possible to [modify theme colors](../theming/sass-variables) or
[create custom themes](../theming/sass-themes).

:::info
Make sure that the theme you set is included in the downloaded package.
:::

**Default value**: `undefined`
### themeVariant {#opt-themeVariant}

"auto" &#124; "light" &#124; "dark"

Controls which variant of the [theme](#opt-theme) will be used (light or dark).

Possible values:
- `'light'` - Use the light variant of the theme.
- `'dark'` - Use the dark variant of the theme.
- `'auto'` or `undefined` - Detect the preferred system theme on devices where this is supported.

To use the option with custom themes, make sure to create two custom themes, where the dark version has the same name as the light one,
suffixed with `'-dark'`, e.g.: `'my-theme'` and `'my-theme-dark'`.

**Default value**: `undefined`