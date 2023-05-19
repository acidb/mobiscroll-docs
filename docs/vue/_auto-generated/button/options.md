### ariaLabel {#opt-ariaLabel}

string

Specifies the `aria-label` attribute value assigned to the component.

**Default value**: `undefined`
### color {#opt-color}

"primary" &#124; "secondary" &#124; "success" &#124; "danger" &#124; "warning" &#124; "info" &#124; "dark" &#124; "light"

Specifies the predefined color to style the component.
### cssClass {#opt-cssClass}

string

Applies custom css class to the top level element.

**Default value**: undefined
### disabled {#opt-disabled}

boolean

Specifies the initial disabled state of the component.

**Default value**: `undefined`
### endIcon {#opt-endIcon}

any

Specifies the icon name for the form components which will be displayed on the end of the component.
A font-icon name should be passed. Use [startIcon](#startIcon) option for specifying icon to the opposite side.

**Default value**: `false`
### endIconSvg {#opt-endIconSvg}

string

Specifies the svg for the form components which will be displayed on the end of the component.
An svg should be passed. Use [startIconSvg](#startIconSvg) option for specifying svg to the opposite side.

**Default value**: `undefined`
### icon {#opt-icon}

any

Specifies the icon for an icon-only button. An svg should be passed.

**Default value**: `undefined`
### iconSrc {#opt-iconSrc}

string

Specifies the icon for an icon-only button. A font-icon name should be passed.

**Default value**: `undefined`
### iconSvg {#opt-iconSvg}

string

Specifies the svg for an icon-only button. An image path should be passed.

**Default value**: `undefined`
### role {#opt-role}

"button" &#124; "none"

Specifies the aria `role` attribute value assigned to the component.
### startIcon {#opt-startIcon}

any

Specify the font icon for the form components which will be displayed on the start of the component.
A font-icon name should be passed. Use [endIconSvg](#endIconSvg) option for specifying icon to the opposite side.

**Default value**: `'button'`
### startIconSvg {#opt-startIconSvg}

string

Specify the icon svg for the form components which will be displayed on the start of the component.
An svg should be passed. Use [endIconSvg](#endIconSvg) option for specifying svg to the opposite side.

**Default value**: `undefined`
### tabIndex {#opt-tabIndex}

number

Specifies the tabIndex html attribute of the component.

**Default value**: `0`
### tag {#opt-tag}

"a" &#124; "button" &#124; "span"

Specifies which HTML tag will be used to render the component.

**Default value**: `'button'`
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
### type {#opt-type}

"button" &#124; "reset" &#124; "submit"

Specifies the type of the button.

**Default value**: `undefined`
### variant {#opt-variant}

"standard" &#124; "flat" &#124; "outline"

Specifies the rendered style of the button.

**Default value**: `standard`