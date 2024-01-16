### _change {#method-_change}

(checked: boolean) => void




### _onChange {#method-_onChange}

(ev: any) => void




### _onLabelClick {#method-_onLabelClick}

(ev: any) => void


The click events default behavior on labels are to also trigger a change event.
We need to disable this behavior because we trigger the change events manually to be consistent.

The main reason for this is that on touch devices when there is a drag, there is no click triggered,
but when there&#039;s only a tap, there&#039;s also a click, so that would result in multiple change events
that would cancel out each other.

### _setHandle {#method-_setHandle}

(span: any) => void




### _setHandleCont {#method-_setHandleCont}

(span: any) => void




### _setInput {#method-_setInput}

(input: any) => void




### setOptions {#method-setOptions}

(opt: MbscSwitchOptions) => void


Sets or updates options of the component
