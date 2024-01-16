### _safeHtml {#method-_safeHtml}

(html: string) => any




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




### getEvents {#method-getEvents}

(start: MbscDateType, end: MbscDateType) => Array&lt;MbscCalendarEvent&gt;


Returns the [events](#opt-data) between two dates. If `start` and `end` are not specified,
it defaults to the start and end days of the current view.
If `end` is not specified, it defaults to start date + 1 day.

Parameters:
 - start - Start date of the specified interval.

 - end - End date of the specified interval.


### getInst {#method-getInst}

() => Eventcalendar




### getInvalids {#method-getInvalids}

(start: MbscDateType, end: MbscDateType) => Array&lt;MbscCalendarEvent&gt;


Returns the [invalids](#opt-invalid) between two dates. If `start` and `end` are not specified,
it defaults to the start and end days of the current view.
If `end` is not specified, it defaults to start date + 1 day.

Parameters:
 - start - Start date of the specified interval.

 - end - End date of the specified interval.


### getSnapshotBeforeUpdate {#method-getSnapshotBeforeUpdate}

(oldProps: Readonly, oldState: Readonly) => any




### navigate {#method-navigate}

(date: MbscDateType, animate: boolean) => void


Navigates to the specified date on the calendar.

Parameters:
 - date - Date to navigate to.


### navigateToEvent {#method-navigateToEvent}

(event: MbscCalendarEvent) => void


Navigates to the specified event on the calendar.

Parameters:
 - event - The event object. The `id`, `start` and `resource`
(in case if resources are used in timeline or schedule views) properties must be present in the object.


### render {#method-render}

() => any




### setOptions {#method-setOptions}

(opt: MbscEventcalendarOptions) => void




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



