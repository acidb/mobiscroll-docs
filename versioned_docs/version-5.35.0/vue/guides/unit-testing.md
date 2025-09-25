---
sidebar_position: 7
sidebar_label: Unit testing
displayed_sidebar: vueSidebar
title: Unit testing Mobiscroll in Vue
---

## Overview

Unit testing is an essential part of Test Driven Development. Usually the "units" are the smallest testable parts of an application. In the context of the Mobiscroll library however, we consider these units the Mobiscroll Components, because these cannot be broken up further by our users.

The purpose of this guide is to give examples of how the Mobiscroll Components can be tested autonomously in Vue apps, to achieve high confidence that they work as intended.

We are using the [@testing-library/vue](https://testing-library.com/docs/vue-testing-library/intro/) because it helps test UI components in a user-centric way.

## Setup

In the following examples we are using [Vite](https://vite.dev/) (version 8.0.1 at the time of writing) as a starting project, along with [Vitest](https://vuejs.org/guide/scaling-up/testing) as the testing environment.

:::info
For instructions on how to install the Vue testing library please check the official site of the [@testing-library/vue](https://testing-library.com/docs/vue-testing-library/intro/).
:::

### Requirements

The only requirement for the Mobiscroll Components to be testable is to install the [vitest-canvas-mock](https://www.npmjs.com/package/vitest-canvas-mock) package. The following command should install it:

```bash
npm install vitest-canvas-mock --save-dev
```

After the package is installed, it has to be imported in the setup file (e.g. `src/setup.ts`):

```ts title="src/setup.ts"
import "@testing-library/jest-dom";
import "vitest-canvas-mock"; // required for Mobiscroll Components
```

After the import above, the components can be tested without errors using:

```bash
npm test
```

## Targeting elements

### Smoke tests

Smoke tests or sanity tests are used to determine if the code compiles and the component runs, without doing any further fine-grained tests. A simple test like this would consist of rendering the Eventcalendar and then querying the DOM if the elements are there.

Querying a particular DOM element with the @testing-library is not encouraged, because it is considered an implementation detail. For example, the Eventcalendar renders a div element with the css class `.mbsc-eventcalendar`. This is indeed an implementation detail, and this class could be changed later in the code which would make our test useless. But for a simple smoke test in the case of the Eventcalendar it is the easiest way to assert that the component actually works.

#### Eventcalendar

```ts title="Eventcalendar.spec.ts"
import { render } from "@testing-library/vue";
import { MbscEventcalendar } from "@mobiscroll/vue";

describe("Mobiscroll Eventcalendar", () => {
  it("renders the Eventcalendar", async () => {
    const { container } = render(MbscEventcalendar);

    const div = container.querySelector(".mbsc-eventcalendar");
    expect(div).toBeInTheDocument();
  });
});
```

#### Datepicker

The Datepicker renders an input element with a label, which makes it possible to test using accessible queries.

```ts title="Datepicker.spec.ts"
import { render, screen } from "@testing-library/vue";
import { MbscDatepicker } from "@mobiscroll/vue";

describe("Mobiscroll Datepicker", () => {
  it("renders the Datepicker", async () => {
    render(MbscDatepicker, { props: { label: "My Date picker" } });

    const label = screen.getByLabelText("My Date picker");
    expect(label).toBeInTheDocument();
  });
});
```

## Targeting event elements

Here is an example of how to test if an event is rendered on the Eventcalendar timeline view for today.

```ts title="EventcalendarEvent.spec.ts"
import { render, screen } from "@testing-library/vue";
import { MbscEventcalendar } from "@mobiscroll/vue";

describe("Mobiscroll Eventcalendar with events", () => {
  it("renders an event for today", async () => {
    const viewOption = { timeline: { type: "week" } };
    const today = new Date(2023, 0, 31);
    const eventData = [
      {
        start: new Date(2023, 0, 31, 10),
        end: new Date(2023, 0, 31, 11, 30),
        title: "My Today Event",
      },
    ];

    render(MbscEventcalendar, {
      props: {
        view: viewOption,
        selectedDate: today,
        data: eventData,
      },
    });

    const eventElement = screen.getByText(/^My Today Event$/i);
    expect(eventElement).toBeInTheDocument();
  });
});
```

A few notes worth mentioning here:

1. The Eventcalendar uses in some cases defaults that are calculated at run time. For example the selected date that defaults to today. These defaults can easily fail the test if not provided explicitly.
2. In the `getByText()` function we used a regular expression that queries elements with the exact same content. The Eventcalendar might render elements that contain the event title and other information for screen readers. The test needs to be specific for the event text, otherwise it might fail due to multiple elements with the same content.

#### Targeting elements that are not in the DOM

The following is a more complex example, where the event passed to the Eventcalendar is not rendered due to the Eventcalendar's virtual scrolling feature. The event is only expected to be in the DOM when the selected date is close to the event date. How close it should be is an implementation detail of the component and cannot be configured externally.

In the example below we use two different selected dates to illustrate this behavior. First, the Eventcalendar is rendered with the selected date set to January 17th, 2023, while the event itself is on January 19th. In this case, due to virtual scrolling, the event is not yet present in the DOM. After re-rendering the component with the selected date updated to January 19th, the event becomes visible and can be queried.

```ts title="EventcalendarNavigation.spec.ts"
import { render, screen, waitFor } from "@testing-library/vue";
import { MbscEventcalendar } from "@mobiscroll/vue";

describe("Mobiscroll Eventcalendar navigation", () => {
  const viewOption = { timeline: { type: "week" } };
  const eventData = [
    {
      start: new Date(2023, 0, 19, 10),
      end: new Date(2023, 0, 19, 11, 30),
      title: "My Dayaftertomorrow Event",
    },
  ];
  const dayAfterTomorrow = new Date(2023, 0, 19);
  const today = new Date(2023, 0, 17);

  it("renders an event for the day after tomorrow only when navigated there", async () => {
    const { rerender } = render(MbscEventcalendar, {
      props: {
        view: viewOption,
        selectedDate: today,
        data: eventData,
      },
    });

    // event not in DOM yet
    expect(screen.queryByText(/^My Dayaftertomorrow Event$/i)).toBeNull();

    // re-render with dayAfterTomorrow as selected date
    await rerender({
      props: {
        view: viewOption,
        selectedDate: dayAfterTomorrow,
        data: eventData,
      },
    });

    await waitFor(() => {
      // now the event should appear
      expect(screen.queryByText(/^My Dayaftertomorrow Event$/i)).toBeTruthy();
    });
  });
});
```

In this example, the Eventcalendar’s selected date is initially set to the 17th, which is in the same week as the 19th. However, because of virtual scrolling, the events on the 19th are not included in the DOM yet. After updating the selected date to the 19th, the event is rendered and can be queried successfully.

:::info
When querying an element that is not expected to be in the DOM, always use the `queryBy`... methods instead of the `getBy`... methods, otherwise the test will fail immediately.
:::

Re-rendering a component with different props can be done using the returned `rerender` function from the initial render.

## Firing events

The `@testing-library/vue` provides functions to simulate events. In the following example we use a click event to open a Datepicker and check whether the picker elements are in the DOM.

```ts title="DatepickerOpen.spec.ts"
import { fireEvent, render, screen, waitFor } from "@testing-library/vue";
import { MbscDatepicker } from "@mobiscroll/vue";

describe("Mobiscroll Datepicker interactions", () => {
  it("opens the Datepicker when clicking the label", async () => {
    const { container } = render(MbscDatepicker, {
      props: { label: "Date picker" },
    });

    const label = screen.getByLabelText("Date picker");
    await fireEvent.click(label);

    wait waitFor(() => {
        const datepickerDiv =  document.body.querySelector(".mbsc-datepicker");
        expect(datepickerDiv).toBeInTheDocument();
    });
  });
});
```

### Events fired by the Mobiscroll components

The Mobiscroll components have lifecycle events that are fired during various phases. For example, the Datepicker fires an `onOpen` event when opened.

```ts title="DatepickerOnOpen.spec.ts"
import { fireEvent, render, screen, waitFor } from "@testing-library/vue";
import { MbscDatepicker } from "@mobiscroll/vue";

describe("Mobiscroll Datepicker events", () => {
  it("fires onOpen when the Datepicker is opened", async () => {
    const openHandler = vi.fn();

    render(MbscDatepicker, {
      props: {
        label: "Date picker",
        onOpen: openHandler,
      },
    });

    expect(openHandler).not.toHaveBeenCalled();

    const label = screen.getByLabelText("Date picker");
    await fireEvent.click(label);
    await waitFor(() => {
      expect(openHandler).toHaveBeenCalled();
    });
  });
});
```

:::info
Here we are using Vitest’s `vi.fn()` to create a mock function and assert that it was called after the Datepicker was opened.
:::
