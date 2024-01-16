### _safeHtml {#method-_safeHtml}

(html: string) => any




### _setEl {#method-_setEl}

(el: any) => void




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

() => Select




### getSnapshotBeforeUpdate {#method-getSnapshotBeforeUpdate}

(oldProps: Readonly, oldState: Readonly) => any




### getTempVal {#method-getTempVal}

() => any


Returns the temporary value selected on the picker.

### render {#method-render}

() => any




### setOptions {#method-setOptions}

(opt: MbscSelectOptions) => void




### setState {#method-setState}

(state: Partial &#124; Pick &#124; (prevState: Readonly, props: Readonly) => Partial &#124; Pick
, callback: () => void
) => void




### setTempVal {#method-setTempVal}

(value: any) => void


Sets the temporary value to be selected on the picker.
The value will be committed when the user hits the set button.

Parameters:
 - value - The value to set.


### shouldComponentUpdate {#method-shouldComponentUpdate}

(props: any, state: any) => boolean




### getDerivedStateFromError {#method-getDerivedStateFromError}

(error: any) => object




### getDerivedStateFromProps {#method-getDerivedStateFromProps}

(props: object, state: object) => object



