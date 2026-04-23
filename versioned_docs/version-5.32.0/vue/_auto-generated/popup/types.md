### MbscLocale {#type-MbscLocale}

Interface

Properties:
 - `allDayText`: *string* 
 - `amText`: *string* 
 - `calendarSystem`: *MbscCalendarSystem* 
 - `cancelText`: *string* 
 - `clearText`: *string* 
 - `closeText`: *string* 
 - `dateFormat`: *string* 
 - `dateFormatFull`: *string* 
 - `dateFormatLong`: *string* 
 - `dateText`: *string* 
 - `dateWheelFormat`: *string* 
 - `dayNames`: *Array&lt;string&gt;* 
 - `dayNamesMin`: *Array&lt;string&gt;* 
 - `dayNamesShort`: *Array&lt;string&gt;* 
 - `daySuffix`: *string* 
 - `dayText`: *string* 
 - `eventText`: *string* 
 - `eventsText`: *string* 
 - `filterEmptyText`: *string* 
 - `filterPlaceholderText`: *string* 
 - `firstDay`: *number* 
 - `fromText`: *string* 
 - `hourText`: *string* 
 - `minuteText`: *string* 
 - `monthNames`: *Array&lt;string&gt;* 
 - `monthNamesShort`: *Array&lt;string&gt;* 
 - `monthSuffix`: *string* 
 - `monthText`: *string* 
 - `moreEventsPluralText`: *string* 
 - `moreEventsText`: *string* 
 - `nextMonthText`: *string* 
 - `nextYearText`: *string* 
 - `noEventsText`: *string* 
 - `nowText`: *string* 
 - `pmText`: *string* 
 - `prevMonthText`: *string* 
 - `prevYearText`: *string* 
 - `rangeEndHelp`: *string* 
 - `rangeEndLabel`: *string* 
 - `rangeStartHelp`: *string* 
 - `rangeStartLabel`: *string* 
 - `rtl`: *boolean* 
 - `secondText`: *string* 
 - `selectedPluralText`: *string* 
 - `selectedText`: *string* 
 - `setText`: *string* 
 - `timeFormat`: *string* 
 - `timeText`: *string* 
 - `timeWheels`: *string* 
 - `toText`: *string* 
 - `todayText`: *string* 
 - `weekText`: *string* 
 - `yearSuffix`: *string* 
 - `yearText`: *string* 

### MbscPopupButton {#type-MbscPopupButton}

Interface

Properties:
 - `color`: *"light" &#124; "dark" &#124; "primary" &#124; "secondary" &#124; "success" &#124; "danger" &#124; "warning" &#124; "info"*  - Specifies the predefined color of the button
 - `cssClass`: *string*  - A custom CSS class that will be applied to the element
 - `disabled`: *boolean*  - Disabled state of the button
 - `handler`: *[MbscPopupPredefinedButton](#type-MbscPopupPredefinedButton) &#124; (event: any) => void*  - Specifies what happens when the button is pressed. It can be a predefined button handler
like `'set'`, `'cancel'` or a custom function.
 - `icon`: *string*  - When specified, it renders an icon on the button. It requires the name of the icon that should be displayed.
 - `keyCode`: *number &#124; "enter" &#124; "esc" &#124; "space" &#124; Array&lt;number &#124; "enter" &#124; "esc" &#124; "space"&gt;*  - The key code associated with the button to activate it from keyboard. Can be a single value or
multiple value passed as an array. Predefined string values are: `'enter'`, `'esc'`, `'space'`.
 - `text`: *string*  - Sets the label of the button
 - `variant`: *"flat" &#124; "standard" &#124; "outline"*  - The style of the button

### MbscPopupDisplay {#type-MbscPopupDisplay}

"center" &#124; "bottom" &#124; "top" &#124; "anchored" &#124; "inline" &#124; "bubble"


### MbscPopupPredefinedButton {#type-MbscPopupPredefinedButton}

"set" &#124; "cancel" &#124; "ok" &#124; "close"


### MbscResponsiveOptions&lt;MbscPopupOptions&gt; {#type-MbscResponsiveOptions}

Interface


The `MbscResponsiveOptions<MbscPopupOptions>` supports custom properties in the form:
```
[key:string]: MbscPopupOptions & {breakpoint?: number}
```
The keys are the names of the breakpoints, and the values are objects containing the options for the given breakpoint.
The `breakpoint` property, when present, specifies the min-width in pixels. The options will take into effect from that width.

:::info
The available width is queried from the container element of the component and not the browsers viewport like in css media queries
:::

There are five predefined breakpoints:

- `xsmall` - min-width: 0px
- `small` - min-width: 576px
- `medium` - min-width: 768px
- `large` - min-width: 992px
- `xlarge` - min-width: 1200px

