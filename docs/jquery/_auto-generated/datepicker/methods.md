### _safeHtml {#method-_safeHtml}

(html: string) => any



### _setEl {#method-_setEl}

(el: any) => void



### close {#method-close}

() => void


Closes the component.
### componentDidCatch {#method-componentDidCatch}

(error: any, errorInfo: any) => void



### componentDidMount {#method-componentDidMount}

() => void



### componentDidUpdate {#method-componentDidUpdate}

() => void



### componentWillMount {#method-componentWillMount}

() => void



### componentWillReceiveProps {#method-componentWillReceiveProps}

(nextProps: Readonly, nextContext: any) => void



### componentWillUnmount {#method-componentWillUnmount}

() => void



### componentWillUpdate {#method-componentWillUpdate}

(nextProps: Readonly, nextState: Readonly, nextContext: any) => void



### forceUpdate {#method-forceUpdate}

(callback: () => void
) => void



### getChildContext {#method-getChildContext}

() => object



### getInst {#method-getInst}

() => Datepicker



### getSnapshotBeforeUpdate {#method-getSnapshotBeforeUpdate}

(oldProps: Readonly, oldState: Readonly) => any



### getTempVal {#method-getTempVal}

() => MbscDatepickerValue


Returns the temporary value selected on the datepicker.
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
### render {#method-render}

() => any



### setActiveDate {#method-setActiveDate}

(active: "end" &#124; "start") => void


Sets which date or time is currently selected (start or end).
### setOptions {#method-setOptions}

(opt: MbscDatepickerOptions) => void



### setState {#method-setState}

(state: Partial &#124; Pick &#124; (prevState: Readonly, props: Readonly) => Partial &#124; Pick
, callback: () => void
) => void



### setTempVal {#method-setTempVal}

(value: MbscDatepickerValue) => void


Sets the Datepicker temporary value. This temp value is shown on the picker until the selection.
In the case of inline mode or when the touchUi setting is false the value will be set to the Model as well,
since in these cases there&#039;s no temporary value.
### shouldComponentUpdate {#method-shouldComponentUpdate}

(props: any, state: any) => boolean



### getDerivedStateFromError {#method-getDerivedStateFromError}

(error: any) => object



### getDerivedStateFromProps {#method-getDerivedStateFromProps}

(props: object, state: object) => object


