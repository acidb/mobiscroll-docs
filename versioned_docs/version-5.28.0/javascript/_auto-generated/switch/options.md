### color {#opt-color}

"success" &#124; "primary" &#124; "secondary" &#124; "danger" &#124; "warning" &#124; "info" &#124; "dark" &#124; "light"

Specifies the predefined color of the switch.

**Default value**: `undefined`
### cssClass {#opt-cssClass}

string

Specifies a custom CSS class for the component.

**Default value**: `undefined`
### description {#opt-description}

string

Specifies the description text of the switch.

**Default value**: `undefined`
### disabled {#opt-disabled}

boolean

Specifies the disabled state of the switch.

**Default value**: `false`
### label {#opt-label}

string

Specifies the label of the switch.

**Default value**: `undefined`
### position {#opt-position}

"end" &#124; "start"

Sets the position of the switch depending on the [rtl](#localization-rtl) option.
When in left-to-right mode, `'start'` will render the switch to the left, and `'end'` will render it to the right.
In right-to-left mode, `'start'` will render the switch to the right, and `'end'` will render it to the left.

**Default value**: `'end'`
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

"auto" &#124; "dark" &#124; "light"

Controls which variant of the [theme](#opt-theme) will be used (light or dark).

Possible values:
- `'light'` - Use the light variant of the theme.
- `'dark'` - Use the dark variant of the theme.
- `'auto'` or `undefined` - Detect the preferred system theme on devices where this is supported.

To use the option with custom themes, make sure to create two custom themes, where the dark version has the same name as the light one,
suffixed with `'-dark'`, e.g.: `'my-theme'` and `'my-theme-dark'`.

**Default value**: `undefined`