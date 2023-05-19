### context {#opt-context}

any

Specify the DOM element in which the component is appended and positioned (if not inline).
Can be a selector string or a DOM element.

**Default value**: 'body'
### cssClass {#opt-cssClass}

string

Applies custom css class to the top level element.

**Default value**: undefined
### disabled {#opt-disabled}

boolean

Initial disabled state of the component. This will take no effect in inline display mode.

**Default value**: false
### endIcon {#opt-endIcon}

string

Specify the icon name for the form components which will be displayed on the end of the component.
Use [startIcon option](#opt-startIcon) for specifying icon to the opposite side.

**Default value**: undefined
### endIconSvg {#opt-endIconSvg}

string

Specify the icon svg for the form components which will be displayed on the end of the component.
Use [startIconSvg option](#opt-startIconSvg) for specifying icon to the opposite side.

**Default value**: undefined
### error {#opt-error}

boolean

Controls the error state of the component. If true error styles will be displayed.

**Default value**: false
### errorMessage {#opt-errorMessage}

string

Controls the error message of the component. If [error option](#opt-error) is set to true the error message will be displayed.

**Default value**: undefined
### inputStyle {#opt-inputStyle}

"outline" &#124; "underline" &#124; "box"

Defines the input rendering mode. By default the input has the underline styling. Possible values:
 - &#039;underline&#039;
 - &#039;box&#039;
 - &#039;outline&#039;

**Default value**: 'underline'
### label {#opt-label}

string

Sets the label of component.

**Default value**: undefined
### labelStyle {#opt-labelStyle}

"inline" &#124; "floating" &#124; "stacked"

Defines the position of the label. The default label style depends on the [theme option](#opt-theme).

Possible values:
 - &#039;stacked&#039;
 - &#039;inline&#039;
 - &#039;floating&#039;

**Default value**: Depends on the theme. With the 'ios' theme the inputs have 'inline' labels,
with 'material' and 'windows' themes the default label position is 'stacked'.
### passwordToggle {#opt-passwordToggle}

boolean

Defines the password toggle visibility on a password field.

**Default value**: false
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
### startIcon {#opt-startIcon}

string

Specify the icon name for the form component which will be displayed on the start of the component. Use [endIcon option](#opt-endIcon)
for specifying icon to the opposite side.

**Default value**: undefined
### startIconSvg {#opt-startIconSvg}

string

Specify the icon svg for the form component which will be displayed on the start of the component. Use
[endIconSvg option](#opt-endIconSvg) for specifying icon to the opposite side.

**Default value**: undefined
### tags {#opt-tags}

boolean

If true and used with multiple selection, it will display multiple values as &quot;chips/tags&quot;.

**Default value**: false
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