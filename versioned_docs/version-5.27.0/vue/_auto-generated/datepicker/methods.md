### close {#method-close}

() => void


Closes the component.
### getTempVal {#method-getTempVal}

() => null &#124; DateType &#124; Array&lt;DateType&gt; &#124; [null &#124; DateType, null &#124; DateType]


Returns the temporary value selected on the datepicker.
### isVisible {#method-isVisible}

() => boolean


Returns a boolean indicating whether the component is visible or not.
### navigate {#method-navigate}

(date: DateType) => void


Display a specific month on the calendar without setting the date.
### open {#method-open}

() => void


Opens the component.
### position {#method-position}

() => void


Recalculates the position of the component (if not inline).
### setActiveDate {#method-setActiveDate}

(active: "start" &#124; "end") => void


Sets which date or time is currently selected (start or end).
### setTempVal {#method-setTempVal}

(value: null &#124; DateType &#124; Array&lt;null &#124; DateType&gt;) => void


Sets the Datepicker temporary value. This temp value is shown on the picker until the selection.
In the case of inline mode or when the touchUi setting is false the value will be set to the Model as well,
since in these cases there&#039;s no temporary value.