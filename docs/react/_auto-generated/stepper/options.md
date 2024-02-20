### color {#opt-color}

"success" &#124; "dark" &#124; "light" &#124; "primary" &#124; "secondary" &#124; "danger" &#124; "warning" &#124; "info"

Specifies the predefined color of the stepper.

**Default value**: `undefined`
### cssClass {#opt-cssClass}

string

Specifies a custom CSS class for the component.

**Default value**: `undefined`
### description {#opt-description}

string

Specifies the description text of the stepper.

**Default value**: `undefined`
### disabled {#opt-disabled}

boolean

Specifies the disabled state of the stepper.

**Default value**: `false`
### inputPosition {#opt-inputPosition}

"center" &#124; "end" &#124; "start"

Specifies the input field position compared to the +/- stepper buttons.

**Default value**: `'center'`
### label {#opt-label}

string

Specifies the label of the stepper.

**Default value**: `undefined`
### max {#opt-max}

number

Specifies the minimum value that can be selected.

**Default value**: `0`
### min {#opt-min}

number

Specifies the maximum value that can be selected.

**Default value**: `100`
### step {#opt-step}

number

Specifies the step between values.

**Default value**: `1`
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