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
### _safeHtml {#method-_safeHtml}

(html: string) => any



### _setEl {#method-_setEl}

(el: any) => void



### _setHandle {#method-_setHandle}

(span: any) => void



### _setHandleCont {#method-_setHandleCont}

(span: any) => void



### _setInput {#method-_setInput}

(input: any) => void



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

() => Switch



### getSnapshotBeforeUpdate {#method-getSnapshotBeforeUpdate}

(oldProps: Readonly, oldState: Readonly) => any



### render {#method-render}

() => any



### setOptions {#method-setOptions}

(opt: MbscSwitchOptions) => void



### setState {#method-setState}

(state: Partial &#124; Pick &#124; (prevState: Readonly, props: Readonly) => Partial &#124; Pick
, callback: () => void
) => void



### shouldComponentUpdate {#method-shouldComponentUpdate}

(props: any, state: any) => boolean



### getDerivedStateFromError {#method-getDerivedStateFromError}

(error: any) => object



### getDerivedStateFromProps {#method-getDerivedStateFromProps}

(props: object, state: object) => object


