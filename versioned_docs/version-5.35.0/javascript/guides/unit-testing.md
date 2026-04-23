---
sidebar_position: 7
sidebar_label: Unit testing
displayed_sidebar: javascriptSidebar
title: Unit testing Mobiscroll in JavaScript
---

## Overview

Unit testing is an essential part of Test Driven Development. Usually the "units" are the smallest testable parts of an application. In the context of the Mobiscroll library however, we consider these units the Mobiscroll Components, because these cannot be broken up further by our users.

The purpose of this guide is to give examples of how the Mobiscroll Components can be tested autonomously in plain JavaScript apps, to achieve high confidence that they work as intended.

We are using the [@testing-library/dom](https://testing-library.com/docs/dom-testing-library/intro/) because it helps test UI components in a user-centric way without depending on a specific framework.

## Setup

In the following examples we are using [Vite](https://vite.dev/) (version 8.0.1 at the time of writing) as a starting project, along with [Vitest](https://vitest.dev/) as the testing environment.

:::info
For instructions on how to install the DOM testing library please check the official site of the [@testing-library/dom](https://testing-library.com/docs/dom-testing-library/intro/).
:::

### Requirements

The only requirement for the Mobiscroll Components to be testable is to install the [vitest-canvas-mock](https://www.npmjs.com/package/vitest-canvas-mock) package. The following command should install it:

```bash
npm install vitest-canvas-mock --save-dev
```

After the package is installed, it has to be imported in the setup file (e.g. `src/setupTests.ts`):

```ts title="src/setupTests.ts"
import "@testing-library/jest-dom/vitest";
import "vitest-canvas-mock"; // required for Mobiscroll Components
```

After the import above, the components can be tested without errors using:

```bash
npm test
```

## Helper function

In our examples we will use a helper function to create and destroy Mobiscroll instances during tests:

```ts title="test-utils.ts"
import {
  eventcalendar,
  Eventcalendar,
  MbscEventcalendarOptions,
  datepicker,
  Datepicker,
  MbscDatepickerOptions,
} from "@mobiscroll/javascript";

export function createEventcalendar(
  options?: MbscEventcalendarOptions,
): [Eventcalendar, HTMLDivElement] {
  const div = document.createElement("div");
  document.body.appendChild(div);
  const inst = eventcalendar(div, options) as Eventcalendar;
  return [inst, div];
}

function createDatepicker(
  options?: MbscDatepickerOptions,
  element?: HTMLElement,
): [Datepicker, HTMLElement] {
  const input = element
    ? element
    : (document.createElement("input") as HTMLInputElement);
  document.body.appendChild(input);
  const inst = datepicker(input, options || {}) as Datepicker;
  return [inst, input];
}
```

## Targeting elements

### Smoke tests

Smoke tests or sanity tests are used to determine if the code compiles and the component runs, without doing any further fine-grained tests. A simple test like this would consist of initializing the Eventcalendar and then querying the DOM if the elements are there.

Querying a particular DOM element with the @testing-library is not encouraged, because it is considered an implementation detail. For example, the Eventcalendar renders a div element with the css class `.mbsc-eventcalendar`. This is indeed an implementation detail, and this class could be changed later in the code which would make our test useless. But for a simple smoke test in the case of the Eventcalendar it is the easiest way to assert that the component actually works.

#### Eventcalendar

```ts title="eventcalendar.spec.ts"
import { describe, it, expect } from "vitest";
import { createEventcalendar } from "./test-utils";

describe("Mobiscroll Eventcalendar", () => {
  it("renders without error", () => {
    const [inst, elm] = createEventcalendar();
    expect(inst).toBeTruthy();
    inst.destroy();
    elm.remove();
  });
});
```

#### Datepicker

The Datepicker renders an input element with a label, which makes it possible to test using accessible queries.

```ts title="datepicker.spec.ts"
import { screen } from "@testing-library/dom";
import { describe, it, expect } from "vitest";
import { createDatepicker } from "./test-utils";

describe("Mobiscroll Datepicker", () => {
  it("renders the Datepicker", () => {
    const [inst, input] = createDatepicker({ label: "My Date picker" });
    const label = screen.getByLabelText("My Date picker");
    expect(label).toBeInTheDocument();
    inst.destroy();
    input.remove();
  });
});
```

## Targeting event elements

Here is an example of how to test if an event is rendered on the Eventcalendar timeline view for today.

```ts title="eventcalendar-event.spec.ts"
import { screen } from "@testing-library/dom";
import { describe, it, expect } from "vitest";
import { createEventcalendar } from "./test-utils";

describe("Mobiscroll Eventcalendar with events", () => {
  it("renders an event for today", () => {
    const today = new Date(2023, 0, 31);
    const [inst, elm] = createEventcalendar({
      data: [
        {
          start: new Date(2023, 0, 31, 10),
          end: new Date(2023, 0, 31, 11, 30),
          title: "My Today Event",
        },
      ],
      view: { timeline: { type: "week" } },
      selectedDate: today,
    });

    const eventElement = screen.getByText(/^My Today Event$/i;
    expect(eventElement).toBeInTheDocument();

    inst.destroy();
    elm.remove();
  });
});
```

A few notes worth mentioning here:

1. The Eventcalendar uses in some cases defaults that are calculated at run time. For example the selected date that defaults to today. These defaults can easily fail the test if not provided explicitly.
2. In the `getByText()` function we used a regular expression that queries elements with the exact same content. The eventcalendar might render elements that contain the event title and other information for screen readers. The test need to be specific for the event text, otherwise it might fail due to multiple elements with the same content.

#### Targeting elements that are not in the DOM

The following is a more complex example, where the event passed to the Eventcalendar is not rendered due to the Eventcalendar's virtual scrolling feature. The event is only expected to be in the DOM when the selected date is close to the event date. How close it should be is an implementation detail of the component and cannot be configured externally.

In the example below we use two different selected dates to illustrate this behavior. First, the Eventcalendar is rendered with the selected date set to January 17th, 2023, while the event itself is on January 19th. In this case, due to virtual scrolling, the event is not yet present in the DOM. After re-rendering the component with the selected date updated to January 19th, the event becomes visible and can be queried.

```ts title="Eventcalendar navigation and rendering event"
import { screen, waitFor } from "@testing-library/dom";
import { describe, it, expect } from "vitest";
import { createEventcalendar } from "./test-utils";

describe("Mobiscroll Eventcalendar navigation", () => {
  it("renders an event for the day after tomorrow only when navigated there", () => {
    const viewOption = { timeline: { type: "day" } };
    const eventData = [
      {
        start: new Date(2023, 0, 19, 10),
        end: new Date(2023, 0, 19, 11, 30),
        title: "My Dayaftertomorrow Event",
      },
    ];
    const dayAfterTomorrow = new Date(2023, 0, 19);
    const today = new Date(2023, 0, 17);

    const [inst, elm] = createEventcalendar({
      view: viewOption,
      selectedDate: today,
      data: eventData,
    });

    // event not in DOM yet
    expect(screen.queryByText(/^My Dayaftertomorrow Event$/i).toBeNull();

    // navigate to dayAfterTomorrow
    inst.setOptions({ selectedDate: dayAfterTomorrow });

    // now the event should appear
    expect(
      screen.queryByText(/^My Dayaftertomorrow Event$/i"),
    ).toBeInTheDocument();

    inst.destroy();
    elm.remove();
  });
});
```

In this example, the Eventcalendar’s selected date is initially set to the 17th, which is in the same week as the 19th. However, because of virtual scrolling, the events on the 19th are not included in the DOM yet. After updating the selected date to the 19th, the event is rendered and can be queried successfully.
:::info
When querying an element that is not expected to be in the DOM, always use the `queryBy`... methods instead of the `getBy`... methods, otherwise the test will fail immediately.

:::

## Firing events

The `@testing-library/dom` provides functions to simulate events. In the following example we use a click event to interact with the Datepicker and check whether the picker elements are in the DOM.

```ts title="eventcalendar-interactions.spec.ts"
import { fireEvent, waitFor } from "@testing-library/dom";
import { describe, it, expect, vi } from "vitest";
import { createEventcalendar } from "./test-utils";

describe("Mobiscroll Datepicker interactions", () => {
  it("opens the Datepicker when clicking the input", () => {
    const [inst, input] = createDatepicker({ label: "Date picker" });

    fireEvent.click(input);

    waitFor(() => {
      const popup = document.querySelector(".mbsc-datepicker");
      expect(popup).toBeInTheDocument();
    });

    inst.destroy();
    input.remove();
  });
});
```

### Events fired by the Mobiscroll components

The Mobiscroll components have lifecycle events that are fired during various phases. For example, the Datepicker fires an `onOpen` event when opened.

```ts title="datepicker-onopen.spec.ts"
import { fireEvent, waitFor } from "@testing-library/dom";
import { describe, it, expect, vi } from "vitest";
import { createDatepicker } from "./test-utils";

describe("Mobiscroll Datepicker events", () => {
  it("fires onOpen when the Datepicker is opened", () => {
    const onOpen = vi.fn();

    const [inst, input] = createDatepicker({
      label: "Date picker",
      onOpen,
    });

    expect(onOpen).not.toHaveBeenCalled();

    fireEvent.click(input);

    waitFor(() => {
      expect(onOpen).toHaveBeenCalled();
    });

    inst.destroy();
    input.remove();
  });
});
```

:::info
Here we are using Vitest’s `vi.fn()` to create mock functions and assert that they were called at the right time.
:::
