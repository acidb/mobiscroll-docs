---
sidebar_position: 7
sidebar_label: Unit testing
displayed_sidebar: reactSidebar
title: Unit testing and Mobiscroll
---

## Overview

Unit testing is an essential part of Test Driven Development. Usually the "units" are the smallest testable parts of an application. In the context of the Mobiscroll library however, we consider these units the Mobiscroll Components, because these cannot be broken up further by our users.

The purpose of this guide is to give examples of how the Mobiscroll Components can be tested autonomously in apps, to achieve high confidence that they work as intended.

We are using the [@testing-library](https://testing-library.com/) because their family of packages help test UI components in a user-centric way.

## Setup

In the following examples we are using the [Create React App (cra)](https://create-react-app.dev/) as a starting project. At the time of this guide's writing the CRA (version 5.0.1) comes with the react testing library installed.

:::info

For instructions on how to install the testing library please check the official site of the [@testing-library](https://testing-library.com/).

:::

### Requirements

The only requirement for the Mobiscroll Components to be testable is to install the [jest-canvas-mock](https://www.npmjs.com/package/jest-canvas-mock) package. The following command should install it:

```jsx
$ npm install jest-canvas-mock --save
```

After the package is installed, it has to be imported in the setupTests.js file located at the src folder:

```js title="src/setupTests.js"
import '@testing-library/jest-dom';
import 'jest-canvas-mock'; // required for Mobiscroll Components
```

After the import above, the components can be tested without any errors using:

```jsx
$ npm test
```

## Targeting elements

### Smoke tests

Smoke tests or sanity tests are used to determine if the code compiles and the component runs, without doing any further fine grained tests. A simple test like this would consist of rendering the Eventcalendar and then querying the DOM if the elements are there.

Querying a particular DOM element with the @testing-library is not encouraged, because it is considered an implementation detail. For example, the eventcalendar renders a div element with the css class `.mbsc-eventcalendar`. This is indeed an implementation detail, this class could be changed later in the code which would make our test useless. But for a simple smoke test in the case of the Eventcalendar it is the easiest way to assert that the component actually works.

#### Eventcalendar

```js title="App.test.js"
import { Eventcalendar } from '@mobiscroll/react';
import { render } from '@testing-library/react';

test('The Mobiscroll Eventcalendar renders', () => {
    const { baseElement } = render(<Eventcalendar />);

    // eslint-disable-next-line
    const div = baseElement.querySelector('.mbsc-eventcalendar');
    expect(div).toBeInTheDocument();
});
```
:::info

ESLint needs to be disabled on the line above, because avoiding direct Node access is encouraged and expressed in linting rules as well.

:::

#### Datepicker

In the case of the Datepicker, we might not need a workaround like this. By default the Datepicker renders an input element with a label. The `@testing-library` gives us tools that can be used to query elements the User can perceive on the screen.

```js title="App.test.js"
import { Datepicker } from '@mobiscroll/react';
import { render, screen } from '@testing-library/react';

test('The Mobiscroll Datepicker renders', () => {
    render(<Datepicker label="My Date picker" />);

    const label = screen.getByLabelText('My Date picker');
    expect(label).toBeInTheDocument();
});
```

### Targeting event elements

Here is an example, how to test if an event is rendered on the Eventcalendar timeline view for today.

```js title="Eventcalendar rendering an event"
import { Eventcalendar } from '@mobiscroll/react';
import { render } from '@testing-library/react';

test('Eventcalendar renders an event for today', () => {
    // options to pass to the Eventcalendar
    const viewOption = { timeline: { type: 'week' }};
    const today = new Date(2023, 0, 31); // 2023. Jan. 31.  * see Note 1 below
    const eventData = [{
        start: new Date(2023, 0, 31, 10), // 10:00
        end: new Date(2023, 0, 31, 11, 30), // 11:30
        text: 'My Today Event',
    }];
    // rendering
    render(<Eventcalendar view={viewOption} selectedDate={today} data={eventData} />);
    // assertion
    const eventElement = screen.getByText(/^My Today Event$/i); // regex * see Note 2 below
    expect(eventElement).toBeInTheDocument();
});
```

A few notes worth mentioning here:
1. The Eventcalendar uses in some cases defaults that are calculated at run time. For example the selected date that defaults to today. These defaults can easily fail the test if not provided explicitly.
2. In the `getByText()` function we used a regular expression that queries elements with the exact same content. The eventcalendar might render elements that contain the event title and other information for screen readers. The test need to be specific for the event text, otherwise it might fail due to multiple elements with the same content.

#### Targeting elements that are not in the DOM

The following is a more complex example, where the event passed to the Eventcalendar is not rendered due to the Eventcalendar's virtual scrolling feature. The event is only expected to be in the DOM when selected date is "close" to the event date. How close it should be is an implementation detail and can't be set currently from the outside. We use approximately 2 days in this test to feature this:

```js title="Eventcalendar navigation and rendering event"
import { Eventcalendar } from '@mobiscroll/react';
import { render } from '@testing-library/react';

// options passed to the Eventcalendar
const viewOption = { timeline: { type: 'week' } };
const tomorrowData = [{ start: new Date(2023, 0, 19, 10), end: new Date(2023, 0, 19, 11, 30), text: 'My Dayaftertomorrow Event' }];
const dayAfterTomorrow = new Date(2023, 0, 19);
const today = new Date(2023, 0, 17);

test('renders an event for the day after tomorrow on the eventcalendar', () => {
  const { rerender } = render(<Eventcalendar view={viewOption} selectedDate={today} data={tomorrowData} />);

  const eventElement = screen.queryByText(/^My Dayaftertomorrow Event$/i); // we are using the queryByText instead of the getByText
  expect(eventElement).not.toBeInTheDocument();

  // passing the dayAfterTomorrow as selected date, navigates the Eventcalendar to the dayAfterTomorrow
  rerender(<Eventcalendar view={viewOption} selectedDate={dayAfterTomorrow} data={tomorrowData} />);

  const eventElementAgain = screen.queryByText(/^My Dayaftertomorrow Event$/i);
  expect(eventElementAgain).toBeInTheDocument();
});
```

In this example, the eventcalendar's selected date is the 17th, which is on the same week as the 19th, but due to the virtual scrolling feature, the events on the 19th are not in the DOM.

:::info

When querying an element that is not expected to be in the DOM, we must use the `queryBy`... methods instead of the `getBy`... methods, otherwise the test fails.

:::

Re-rendering a component with different props can be done using the returned `rerender` function from the initial render.

## Firing events

The `@testing-library` provides easy to use functions to simulate events. In the following example we use a click event to open a Datepicker and check whether the picker elements are in the DOM.

```js title="Opening a Datepicker by clicking the input label"
import { Datepicker } from '@mobiscroll/react';
import { fireEvent, render } from '@testing-library/react';

test('Opens a Datepicker', () => {
  const { baseElement } = render(<Datepicker label="Date picker" />);
  const label = screen.getByLabelText('Date picker');
  fireEvent.click(label);

  // eslint-disable-next-line
  const datepickerDiv = baseElement.querySelector('.mbsc-datepicker');
  expect(datepickerDiv).toBeInTheDocument();
});
```

Events can be fired using the `fireEvent` object imported from the `@testing-library`.

### Events fired by the Mobiscroll components

The Mobiscroll components have lifecycle events that are fired during various phases of the component. For example in the previous test, the Datepicker was opened. In that case the Datepicker also fires an onOpen event, that can be used to act after the picker was opened.

In the following example we will test if the onOpen event was fired properly. There is are specific methods in the `@testing-library` that allow us to test this. Whether a function was called or not can be tested using the testing framework underneath the `@testing-library` which is Jest.

:::info

While the @testing-library can be used with other testing frameworks, they also recommend using Jest.

:::

```js title="Testing event handlers/function calls"
import { Datepicker } from '@mobiscroll/react';
import { fireEvent, render } from '@testing-library/react';

test('Fires the onOpen event when the Datepicker is opened', () => {
  const openHandler = jest.fn(() => {}); // create a mock function with jest

  render(<Datepicker label="Date picker" onOpen={openHandler} />);

  expect(openHandler).not.toHaveBeenCalled(); // not called before open

  // open the picker
  const label = screen.getByLabelText('Date picker');
  fireEvent.click(label);

  expect(openHandler).toHaveBeenCalled(); // called after open
});
```