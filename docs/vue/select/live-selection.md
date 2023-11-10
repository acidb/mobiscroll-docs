---
sidebar_position: 5
sidebar_label: Live selection
displayed_sidebar: vueSidebar
---

# Live selection

The Select can operate in two modes that depends on whether the picker renders a Set button or not. When there is no Set button rendered, the picker operates in a "live" selection mode. What is selected on the UI, gets written into the input element and the model immediately. When there is a Set button rendered, the selection on the UI becomes temporary as long as the Set button is not clicked.

The default of the rendered buttons depend on the [`display`](./api#opt-display) and the [`touchUi`](./api#opt-touchUI) options, but the defaults can be overwritten with the [`buttons`](./api#opt-buttons) option.

When needed, the temporary value mentioned above can be queried using the [`getTempVal`](./api#methods-getTempVal) and set using the [`setTempVal`](./api#methods-setTempVal) methods of the Datepicker [instance](../core-concepts/instance). Furthermore the [`@temp-change`](./api#event-onTempChange) event is raised whenever the temporary value changes.

