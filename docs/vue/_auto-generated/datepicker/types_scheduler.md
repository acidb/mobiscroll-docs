### MbscCalendarColor {#type-MbscCalendarColor}

Interface

Properties:
 - `allDay`: *boolean*  - Specifies whether the date you want to color is all day or not.
 - `background`: *string*  - Background color of the cell. It can be any valid CSS color (`'red'`, `'#ff0000'`, `'rgb(255, 0, 0)'`, etc.).
 - `cellCssClass`: *string*  - CSS class for the day cell. Only applicable for the calendar view.
 - `cssClass`: *string*  - Specifies a custom CSS class for the color.
Useful when customization is needed for the background of cells and time ranges.
Only applicable for the timeline and scheduler views.
 - `date`: *string &#124; object &#124; Date*  - Specifies a single date for the color
 - `end`: *string &#124; object &#124; Date*  - Specifies the end date/time of a date/time range for the color
 - `highlight`: *string*  - Highlight color of the day, can be any valid CSS color (`'red'`, `'#ff0000'`, `'rgb(255, 0, 0)'`, etc.).
 - `recurring`: *string &#124; [MbscRecurrenceRule](#type-MbscRecurrenceRule)*  - Specifies a recurrence rule for handling recurring days.
 - `recurringException`: *string &#124; object &#124; Date &#124; Array&lt;string &#124; object &#124; Date&gt;*  - Exception dates of the recurring rule.
Useful when specific dates need to be skipped from the rule.
 - `recurringExceptionRule`: *string &#124; [MbscRecurrenceRule](#type-MbscRecurrenceRule)*  - Exception rule of the recurring rule.
Useful when recurring dates need to be skipped from the rule.
 - `resource`: *string &#124; number &#124; Array&lt;string &#124; number&gt;*  - In case of the timeline and scheduler view of the Eventcalendar, specifies the [resource](#opt-resources) ids
for the color.
The color will be displayed only on the specified resource.
If there is no resource defined, it will be applied to every resource.
 - `slot`: *string &#124; number*  - In case of the timeline view of the Eventcalendar, specifies the [slot](#opt-slot) id
for the color.
The color will be displayed only on the specified slot.
If there is no slot defined, it will be applied to every slot.
 - `start`: *string &#124; object &#124; Date*  - Specifies the start date/time of a date/time range for the color
 - `textColor`: *string*  - A color applied on the text.
 - `title`: *string*  - A title that will be displayed on the item.

### MbscDateType {#type-MbscDateType}

string &#124; Date &#124; object


### MbscDatepickerControl {#type-MbscDatepickerControl}

"calendar" &#124; "date" &#124; "time" &#124; "datetime" &#124; "timegrid"


### MbscPopupButton {#type-MbscPopupButton}

Interface

Properties:
 - `color`: *"primary" &#124; "secondary" &#124; "success" &#124; "danger" &#124; "warning" &#124; "info" &#124; "dark" &#124; "light"*  - Specifies the predefined color of the button
 - `cssClass`: *string*  - A custom CSS class that will be applied to the element
 - `disabled`: *boolean*  - Disabled state of the button
 - `handler`: *[MbscPopupPredefinedButton](#type-MbscPopupPredefinedButton) &#124; (event: any) => void*  - Specifies what happens when the button is pressed. It can be a predefined button handler
like `'set'`, `'cancel'` or a custom function.
 - `icon`: *string*  - When specified, it renders an icon on the button. It requires the name of the icon that should be displayed.
 - `keyCode`: *number &#124; "enter" &#124; "esc" &#124; "space" &#124; Array&lt;number &#124; "enter" &#124; "esc" &#124; "space"&gt;*  - The key code associated with the button to activate it from keyboard. Can be a single value or
multiple value passed as an array. Predefined string values are: `'enter'`, `'esc'`, `'space'`.
 - `text`: *string*  - Sets the label of the button
 - `variant`: *"standard" &#124; "flat" &#124; "outline"*  - The style of the button

### MbscPopupDisplay {#type-MbscPopupDisplay}

"center" &#124; "bottom" &#124; "top" &#124; "anchored" &#124; "inline" &#124; "bubble"


### MbscPopupPredefinedButton {#type-MbscPopupPredefinedButton}

"set" &#124; "cancel" &#124; "ok" &#124; "close"


### MbscRecurrenceRule {#type-MbscRecurrenceRule}

Interface

Properties:
 - `count`: *number* 
 - `day`: *number &#124; Array&lt;number&gt;* 
 - `from`: *[MbscDateType](#type-MbscDateType)* 
 - `interval`: *number* 
 - `month`: *number &#124; Array&lt;number&gt;* 
 - `pos`: *number* 
 - `repeat`: *"daily" &#124; "weekly" &#124; "monthly" &#124; "yearly"* 
 - `until`: *[MbscDateType](#type-MbscDateType)* 
 - `weekDays`: *string* 
 - `weekStart`: *string* 

### MbscResponsiveOptions&lt;MbscDatepickerOptions&gt; {#type-MbscResponsiveOptions}

Interface


The `MbscResponsiveOptions<MbscDatepickerOptions>` supports custom properties in the form:
```
[key:string]: MbscDatepickerOptions & {breakpoint?: number}
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

### MbscTimezonePlugin {#type-MbscTimezonePlugin}

Interface

Properties:
 - `createDate`: *(s: any, year: string &#124; number &#124; Date &#124; MbscTimezonedDate, month: number, date: number, h: number, min: number, sec: number, ms: number) => MbscTimezonedDate* 
 - `parse`: *(date: string &#124; number, s: any) => MbscTimezonedDate* 

