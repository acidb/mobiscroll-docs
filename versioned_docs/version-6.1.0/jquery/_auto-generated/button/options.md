### ariaLabel {#opt-ariaLabel}

string

Specifies the accessible name of the button. Recommended for icon-only buttons.

**Default value**: `undefined`
### color {#opt-color}

"success" &#124; "light" &#124; "dark" &#124; "primary" &#124; "secondary" &#124; "danger" &#124; "warning" &#124; "info"

Specifies the predefined color of the button.

**Default value**: `undefined`
### cssClass {#opt-cssClass}

string

Specifies a custom CSS class for the component.

**Default value**: `undefined`
### disabled {#opt-disabled}

boolean

Specifies the disabled state of the button.

**Default value**: `false`
### endIcon {#opt-endIcon}

any

Specifies the icon which will be displayed at the end of the button.
Use the [startIcon](#opt-startIcon) option for specifying an icon at the start.

**Default value**: `undefined`
### icon {#opt-icon}

any

Specifies the icon for an icon-only button.

**Default value**: `undefined`
### startIcon {#opt-startIcon}

any

Specifies the icon which will be displayed at the start of the button.
Use the [endIcon](#opt-endIcon) option for specifying an icon at the end.

**Default value**: `undefined`
### tabIndex {#opt-tabIndex}

number

Specifies the `tabindex` attribute of the button.

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
### variant {#opt-variant}

"outline" &#124; "standard" &#124; "flat"

Specifies the style of the button.

**Default value**: `'standard'`