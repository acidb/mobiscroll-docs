### close {#method-close}

() => void


Closes the component.

### getTempVal {#method-getTempVal}

() => any


Returns the temporary value selected on the picker.

### getVal {#method-getVal}

() => any


Returns the selected value of the picker.

### open {#method-open}

() => void


Opens the component.

### reloadOptionElements {#method-reloadOptionElements}

() => void


Reloads option elements from the DOM, when
the Select component is initialized on a html select element.

When changing the option elements dynamically in the DOM, this method should be called after the change,
so the Select is updated properly with the new data.

### setOptions {#method-setOptions}

(opt: MbscSelectOptions) => void


Sets or updates options of the component

### setTempVal {#method-setTempVal}

(value: any) => void


Sets the temporary value to be selected on the picker.
The value will be committed when the user hits the set button.

Parameters:
 - value - The value to set.


### setVal {#method-setVal}

(value: any) => void


Sets the picker value and also writes it to the input.

Parameters:
 - value - The value to set.

