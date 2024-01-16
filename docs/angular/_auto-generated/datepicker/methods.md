### close {#method-close}

() => void


Closes the component.

### isVisible {#method-isVisible}

() => boolean


Returns a boolean indicating whether the component is visible or not.
### navigate {#method-navigate}

(date: MbscDateType) => void


Display a specific month on the calendar without setting the date.
### open {#method-open}

() => void


Opens the component.
### position {#method-position}

() => void


Recalculates the position of the component (if not inline).
### setActiveDate {#method-setActiveDate}

(active: "end" &#124; "start") => void


Sets which date or time is currently selected (start or end).
### setTempVal {#method-setTempVal}

(value: MbscDatepickerValue) => void


Sets the Datepicker temporary value. This temp value is shown on the picker until the selection.
In the case of inline mode or when the touchUi setting is false the value will be set to the Model as well,
since in these cases there&#039;s no temporary value.