---
sidebar_position: 5
sidebar_label: Upgrade guide v5
displayed_sidebar: jquerySidebar
title: Mobiscroll 5 upgrade guide
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

Introducing Mobiscroll 5 - a complete rewrite and retooling that enables better extensibility and performance. We moved away from the wrapper approach for Angular & React, and so with the new architecture we can ship native components for those frameworks.

Below is the list of the breaking changes introduced with Mobiscroll v4.

## Browser support

Starting from Mobiscroll 5.0 we no longer support Android < 5.0 and iOS < 9.

## Frameworks

AngularJS (Angular 1.x) integration is not maintained anymore. Please use the plain Javascript version instead.

Angular 2 is no longer supported. Please upgrade to Angular 4+ to continue using Mobiscroll.

## Themes

The Mobiscroll theme is no longer available. The available themes are iOS, Material and Windows, in light and dark variants.

## General

### Global options

We removed the `mobiscroll.settings` object, and added the `setOptions` function instead. The `setOptions` function can be called any time, and will update the options for the existing components.

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
// Mobiscroll 4.x
mobiscroll.settings = {
    theme: 'ios'
};
```
  </TabItem>
  <TabItem value="new" label="New code">

```jsx
// Mobiscroll 5.x
mobiscroll.setOptions({
    theme: 'ios'
});
```
  </TabItem>
  <TabItem value="es6" label="ES6 module">

```jsx
// Mobiscroll 5.x
import { setOptions } from './path/to/mobiscroll';

setOptions({
    theme: 'ios'
});
```
  </TabItem>
</Tabs>

### `option` method rename

We renamed the `option` method to `setOptions` for each component.

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
// Mobiscroll 4.x
mobiscrollInst.option({
    theme: 'ios'
});
```
  </TabItem>
  <TabItem value="new" label="New code">

```jsx
// Mobiscroll 5.x
mobiscrollInst.setOptions({
    theme: 'ios'
});
```
  </TabItem>
</Tabs>

### `lang` option rename

We renamed the `lang` option to `locale` for localizing the components. Instead of a string now it accepts an object containing the localization settings.

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
// Mobiscroll 4.x
mobiscroll.settings = {
    lang: 'de'
};
```
  </TabItem>
  <TabItem value="new" label="New code">

```jsx
// Mobiscroll 5.x
mobiscroll.setOptions({
    locale: mobiscroll.localeDe
});
```
  </TabItem>
  <TabItem value="es6" label="ES6 module">

```jsx
// Mobiscroll 5.x
import { localeDe, setOptions } from './path/to/mobiscroll';

setOptions({
    locale: localeDe
});
```
  </TabItem>
</Tabs>

### `getJson` util function location

We moved the `getJson` function to `mobiscroll.util.http.getJson`. In ES6 it can also be `imported directly: import { getJson } from './path/to/mobiscroll';`.

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
// Mobiscroll 4.x
mobiscroll.util.getJson('http://example.com/method', callback);
```
  </TabItem>
  <TabItem value="new" label="New code">

```jsx
// Mobiscroll 5.x
mobiscroll.util.http.getJson('http://example.com/method', callback);
```
  </TabItem>
  <TabItem value="es6" label="ES6 module">

```jsx
// Mobiscroll 5.x
import { getJson } from './path/to/mobiscroll';

getJson('http://example.com/method', callback);
```
  </TabItem>
</Tabs>

## Datepicker

We merged the date, datetime, time, calendar and range components into a single datepicker component. Use this instead of the v4 standalone components. You can specify the appearance using the [controls](/jquery/datepicker/api#opt-controls) option, and the select mode (date or range) using the [select](/jquery/datepicker/api#opt-select) option.

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
// Mobiscroll 4.x

// Date scroller
$('#mydate').mobiscroll().date();

// Time scroller
$('#mytime').mobiscroll().time();

// Date & time scroller expanded
$('#mydatetime').mobiscroll().datetime();

// Date & time scroller compact
$('#mydatetime').mobiscroll().datetime({
    dateWheels: '|D M d|'
});

// Calendar
$('#mycalendar').mobiscroll().calendar();

// Calendar & time
$('#mycalendar').mobiscroll().calendar({
    controls: ['calendar', 'time']
});

// Range
$('#myrange').mobiscroll().range();
```
  </TabItem>
  <TabItem value="new" label="New code">

```jsx
// Mobiscroll 5.x

// Date scroller
$('#mydate').mobiscroll().datepicker({
    controls: ['date']
});

// Time scroller
$('#mytime').mobiscroll().datepicker({
    controls: ['time']
});

// Date & time scroller expanded
$('#mydatetime').mobiscroll().datepicker({
    controls: ['date', 'time']
});

// Date & time scroller compact
$('#mydatetime').mobiscroll().datepicker({
    controls: ['datetime']
});

// Calendar
$('#mycalendar').mobiscroll().datepicker({
    controls: ['calendar']
});

// Calendar & time
$('#mycalendar').mobiscroll().datepicker({
    controls: ['calendar', 'time']
});

// Range
$('#myrange').mobiscroll().datepicker({
    select: 'range'
});
```
  </TabItem>
</Tabs>

### Removed

We removed the `calendarHeight` option, use the [maxHeigth](/jquery/datepicker/api#opt-maxHeight) option instead.

We removed the `calendarWidth` option, use the [maxWidth](/jquery/datepicker/api#opt-maxWidth) option instead.

We removed the `layout` option, use the [maxWidth](/jquery/datepicker/api#opt-maxWidth) and [maxHeigth](/jquery/datepicker/api#opt-maxHeight) options instead.

We removed the `outerMonthChanged` option, this is now handled automatically.

We removed the `selectType` option, week selection is currently not supported in v5.

We removed the `showLabel` option, wheel labels are currently not supported in v5.

We removed the `showScrollArrows` option, wheel scroll arrows are currently not supported in v5.

We removed the `yearChange` option, now the calendar has a re-designed navigation.

We removed the `weekDays` option, this is now handled automatically.

We removed the `onBeforeClose` event.

We removed the `onBeforeShow` event.

We removed the `tap` method, which was a utility function used to attach the tap event to arbitrary elements, handling the 300ms click delay on older devices. On today's devices this is no longer needed, simply use the native `click` event.

### Changed 

We renamed the `animate` option to [animation](/jquery/datepicker/api#opt-animation) to specify the show / hide animation of the picker.

We renamed the `counter` option to [selectCounter](/jquery/datepicker/api#opt-selectCounter) to specify the show / hide number of selected dates in the header.

We renamed the `defaultValue` option to [defaultSelection](/jquery/datepicker/api#opt-defaultSelection) to specify the initial selection, for better compatibility with React, where `defaultValue` refers to the actual value instead of a pre-selection in case of uncontrolled usage.

We renamed the `height` option to [itemHeight](/jquery/datepicker/api#opt-itemHeight) for setting the height of the wheel items.

We renamed the `width` option to [wheelWidth](/jquery/datepicker/api#opt-wheelWidth) for setting the exact width of the wheels.

We renamed the `maxWidth` option to [maxWheelWidth](/jquery/datepicker/api#opt-maxWheelWidth) for setting the maximum width of the wheels.

We renamed the `minWidth` option to [minWheelWidth](/jquery/datepicker/api#opt-minWheelWidth) for setting the minimum width of the wheels.

We renamed the `months` option to [pages](/jquery/datepicker/api#opt-pages), because it sets the number of displayed pages in case of week view as well, not just month view.

We've broken up the `select` option into [selectMultiple](/jquery/datepicker/api#opt-selectMultiple) and [selectMax](/jquery/datepicker/api#opt-selectMax).

We renamed the `showOnTap` option to [showOnClick](/jquery/datepicker/api#opt-showOnClick) and the `showOnOverlayTap` option to `showOnOverlayClick` for the sake of simplicity and to make it more obvious.

We've broken up the `steps` option into [stepHour](/jquery/datepicker/api#opt-stepHour), [stepMinute](/jquery/datepicker/api#opt-stepMinute) and stepSecond.

We renamed the `weekCounter` option to [showWeekNumbers](/jquery/datepicker/api#opt-showWeekNumbers) for showing the week numbers on the calendar.

We changed the behavior of the `weeks` option, `weeks: 6` no longer means month view automatically. Month or week view needs to be set with the [calendarType](/jquery/datepicker/api#opt-calendarType) option.

We updated the format of the [dateFormat](/jquery/datepicker/api#localization-dateFormat) and [timeFormat](/jquery/datepicker/api#localization-timeFormat) options to avoid some common confusions we met. See the API docs for the new formatting tokens.

We renamed the `onChange` event to [onTempChange](/jquery/datepicker/api#event-onTempChange). This was part of the lifecycle event cleanup we performed.

We renamed the `onDayChange` event to [onCellClick](/jquery/datepicker/api#event-onCellClick). This was part of the lifecycle event cleanup we performed.

We renamed the `onLabelTap` event to [onLabelClick](/jquery/datepicker/api#event-onLabelClick). This was part of the lifecycle event cleanup we performed.

We renamed the `onSet` event to [onChange](/jquery/datepicker/api#event-onChange) for more clarity. This was part of the lifecycle event cleanup we performed.

We renamed the `onShow` event to [onOpen](/jquery/datepicker/api#event-onOpen) This was part of the lifecycle event cleanup we performed.

We renamed the `show` method to `open` and the `hide` method to `close`.

## Event calendar

### Removed

We removed the following options: `anchor`, `animate`, `buttons`, `closeOnOverlayTap`, `display`, `focusOnClose`, `focusTrap`, `formatDuration`, `headerText`, `showOnFocus`, `showOnTap`, `yearChange`.

We removed the following events: `onBeforeClose`, `onBeforeShow`, `onClose`, `onPosition`, `onShow`.

We removed the following methods: `hide`, `isVisible`, `position`, `redraw`, `refresh`, `show`, `tap`.

### Changed

We improved our recurring event support. More complex [recurrence rules](/jquery/core-concepts/recurrence) can be passed through the `recurring` property of an event as an object or as a string in RRULE format. Currently daily, weekly, monthly and yearly repeats are supported.

We slightly changed the structure of [event objects](/jquery/eventcalendar/api#opt-data). Instead of `text`, `title` should be used, and instead of the `d` property use the `recurring` property to create recurring events.

We slightly changed the structure of the [marked](/jquery/eventcalendar/api#opt-marked), [label](/jquery/eventcalendar/api#opt-label) and [color](/jquery/eventcalendar/api#opt-color) objects. To specify the date, use the `date` property, or the `start` and `end` properties for multiple days, and use the `recurring` property to specify multiple occurrences.

We updated the format of the [dateFormat](/jquery/eventcalendar/api#localization-dateFormat) and [timeFormat](/jquery/eventcalendar/api#localization-timeFormat) options to avoid some common confusions we met. See the API docs for the new formatting tokens.

As part of the the lifecycle event cleanup, we renamed the `onEventSelect` event to [onEventClick](/jquery/eventcalendar/api#event-onEventClick), the `onDayChange` event to [onCellClick](/jquery/eventcalendar/api#event-onCellClick) and the `onSetDate` event to [onSelectedDateChange](/jquery/eventcalendar/api#event-onSelectedDateChange).

We renamed the `calendarHeight` option to [height](/jquery/eventcalendar/calendar#opt-height) and changed its scope to the full calendar with header and everything.

We renamed the `calendarWidth` option to [width](/jquery/eventcalendar/calendar#opt-width).

We moved the `calendarScroll` option into the [view](/jquery/eventcalendar/api#opt-view) option under `view.calendar.scroll`.

We moved the `eventBubble` option into the [view](/jquery/eventcalendar/api#opt-view) option under `view.calendar.popover`.

We moved the `showEventCount` option into the [view](/jquery/eventcalendar/api#opt-view) option under `view.calendar.count`.

We moved the `showOuterDays` option into the [view](/jquery/eventcalendar/api#opt-view) option under `view.calendar.outerDays`.

We moved the `weeks` option into the [view](/jquery/eventcalendar/api#opt-view) option under `view.calendar.size`.

We moved the `weekCounter` option into the [view](/jquery/eventcalendar/api#opt-view) option under `view.calendar.weekNumbers`.

We renamed the `eventList` property of the [view](/jquery/eventcalendar/api#opt-view) option to `agenda`.

## Scheduler

We added the brand new scheduler to the Event Calendar product line for displaying the events on a 24-hour grid. Can be enabled using the [view](/jquery/eventcalendar/scheduler#configuring-the-view) option.

## Timeline

We added the brand new timeline to the Event Calendar product line for displaying a timeline with its related events. Can be enabled using the [view](/jquery/eventcalendar/timeline#configuring-the-view) option.

## Select

### Removed

We removed the `counter` option. This is currently not supported in v5.

We removed the `dataGroup`, `dataHtml`, `dataValue` and `dataText` options. These are currently not supported in v5.

We removed the `inputClass` option. The rendered element can be entirely customized with the `inputElement` option.

We removed the `layout` option, use the [maxWidth](/jquery/select/api#opt-maxWidth) and [maxHeigth](/jquery/select/api#opt-maxHeight) options instead.

We removed the `multiline` option. This is currently not supported in v5.

We removed the `showScrollArrows` option, wheel scroll arrows are currently not supported in v5.

### Changed

We renamed the `animate` option to [animation](/jquery/select/api#opt-animation) to specify the show / hide animation of the picker.

The `data` option only supports an array of items with the `text`, `value`, `group` and `disabled` properties. HTML content for options is supported from version 5.12.0 using the [itemTemplate](/jquery/select/api#template-itemTemplate) option. Read the [Templating](/jquery/select/templating) section for more details.
Remote data source is not supported out of the box in v5. You will have to manually get the remote data and pass that to the select.
For remote filtering the [onFilter](/jquery/select/api#event-onFilter) event can be used to get the filter text. By returning false in the onFilter handler, the filtering is left for the developer to be carried out. Then the text can be used to query the filtered data in any way you see fit and update the select.

We changed the `group` option to [showGroupWheel](/jquery/select/api#opt-showGroupWheel). It no longer accepts an object, but only a boolean, which controls if the group wheel is shown or not. When available, the group headers are always shown and the `clustered` property is not longer supported.

We renamed the `height` option to [itemHeight](/jquery/select/api#opt-itemHeight) for setting the height of the wheel items.

We renamed the `width` option to [wheelWidth](/jquery/select/api#opt-wheelWidth) for setting the exact width of the wheels.

We renamed the `maxWidth` option to [maxWheelWidth](/jquery/select/api#opt-maxWheelWidth) for setting the maximum width of the wheels.

We renamed the `minWidth` option to [minWheelWidth](/jquery/select/api#opt-minWheelWidth) for setting the minimum width of the wheels.

We changed the `input` option to `inputElement` option, which accepts a HTMLElement. Selectors are not supported, but can be used to query the element and pass the element to the option.

We renamed the `select` option to [selectMultiple](/jquery/select/api#opt-selectMultiple), which became a boolean indicating multiple select when true. We no longer support a fix number of selected items.

We renamed the `showOnTap` option to [showOnClick](/jquery/select/api#opt-showOnClick) and the `showOnOverlayTap` option to [showOnOverlayClick](/jquery/select/api#opt-showOnOverlayClick) for the sake of simplicity and to make it more obvious.

## Popup

### Removed

We removed the `tap` method, which was a utility function used to attach the tap event to arbitrary elements, handling the 300ms click delay on older devices. On today's devices this is no longer needed, simply use the native `click` event.

We removed the `layout` option, giving better control with the [width](/jquery/popup/api#opt-width), [height](/jquery/popup/api#opt-height), [maxWidth](/jquery/popup/api#opt-maxWidth), [maxHeight](/jquery/popup/api#opt-maxHeight) and [fullScreen](/jquery/popup/api#opt-fullScreen) options options.

We removed the `onBeforeClose` event.

We removed the `onBeforeShow` event.

### Changed

We renamed the `animate` option to [animation](/jquery/popup/api#opt-animation) to specify the show / hide animation of the popup.

For the sake of clarity we renamed the `showOnOverlayTap` option to `showOnOverlayClick`, and the onShow event to [onOpen](/jquery/popup/api#event-onOpen).

We renamed the `show` method to [onOpen](/jquery/popup/api#event-onOpen) and the `hide` method to [onClose](/jquery/popup/api#event-onClose).

## Forms

In version 5 the Form component is no longer present, you need to use the individual form components instead.

When form components are added dynamically to the markup, you can use the `enhance` function, which will initialize the newly added form comonents inside the given container.

```jsx title="Example"
mobiscroll.enhance('#my-container');
```

## Button

### Changed

Instead of the `flat` and `outline` attributes we added the `variant` option to the button, which can be `'standard'`, `'flat'`, or `'outline'`.

## Checkbox

### Changed

Instead of specifying the label text as the component content, it can be passed using the `data-label` option.

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
// Mobiscroll 4.x
<label>
    Label text
    <input mbsc-checkbox type="checkbox" />
</label>
```
  </TabItem>
  <TabItem value="new" label="New code">

```jsx
// Mobiscroll 5.x
<label>
    <input mbsc-checkbox type="checkbox" data-label="Label text" />
</label>
```
  </TabItem>
</Tabs>

## Dropdown

We removed the `iconAlign` option, and added the [startIcon](/jquery/forms/dropdown#opt-startIcon) and [endIcon](/jquery/forms/dropdown#opt-endIcon) options instead to specify the input icons.

## Image

There is no Image component in v5, instead the functionality can be achieved with the select component by customizing the select items. Starting from version 5.12.0 the select component items can be customized to any custom markup using the [itemTemplate](/jquery/select/api#template-itemTemplate) option. Please refer to the [Templating](/jquery/select/templating) section for more details.

## Input

### Changed

Instead of specifying the label text as the component content, it can be passed using the `data-label` option.

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
// Mobiscroll 4.x
<label>
    Label text
    <input mbsc-input />
</label>
```
  </TabItem>
  <TabItem value="new" label="New code">

```jsx
// Mobiscroll 5.x
<label>
    <input mbsc-input data-label="Label text" />
</label>
```
  </TabItem>
</Tabs>

We removed the `iconAlign` option, and added the [startIcon](/jquery/forms/input#opt-startIcon) and [endIcon](/jquery/forms/input#opt-endIcon) options instead to specify the input icons.

## Radio

### Changed

Instead of specifying the label text as the component content, it can be passed using the `data-label` option.

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
// Mobiscroll 4.x
<label>
    Label text
    <input mbsc-radio type="radio" />
</label>
```
  </TabItem>
  <TabItem value="new" label="New code">

```jsx
// Mobiscroll 5.x
<label>
    <input mbsc-radio type="radio" data-label="Label text" />
</label>
```
  </TabItem>
</Tabs>

## Switch

### Changed

Instead of specifying the label text as the component content, it can be passed using the `data-label` option.

<Tabs>
  <TabItem value="old" label="Old code" default>

```jsx
// Mobiscroll 4.x
<label>
    Label text
    <input mbsc-switch type="checkbox" />
</label>
```
  </TabItem>
  <TabItem value="new" label="New code">

```jsx
// Mobiscroll 5.x
<label>
    <input mbsc-switch type="checkbox" data-label="Label text" />
</label>
```
  </TabItem>
</Tabs>