---
sidebar_position: 7
sidebar_label: Unit testing
displayed_sidebar: angularSidebar
title: Unit testing Mobiscroll in Angular
---

## Overview

Unit testing is an essential part of Test Driven Development. Usually the "units" are the smallest testable parts of an application. In the context of the Mobiscroll library however, we consider these units the Mobiscroll Components, because these cannot be broken up further by our users.

The purpose of this guide is to give examples of how the Mobiscroll Components can be tested autonomously in Angular apps, to achieve high confidence that they work as intended.

We are using the [@testing-library/angular](https://testing-library.com/docs/angular-testing-library/intro/) because it helps test UI components in a user-centric way.

## Setup

In the following examples, we are using [Analog + Vitest](https://analogjs.org/docs/features/testing/vitest) as the testing environment. This provides a modern Angular setup with built-in Vitest support.

:::info
To use the examples below, make sure you have the Angular Testing Library installed.  
For installation instructions, see the official [@testing-library/angular](https://testing-library.com/docs/angular-testing-library/intro/) docs.

If you're setting up a new project with **Analog + Vitest**, follow the [Analog testing guide](https://analogjs.org/docs/features/testing/vitest) to get started.
:::

### Why Vitest + Testing Library?

By default, Angular projects use Jasmine with Karma as the testing framework and runner. While this works, many teams prefer using **Vitest** together with **Testing Library** because it offers several advantages:

- **Faster feedback loop** – Vitest is built on Vite, which provides lightning-fast test runs and near-instant watch mode compared to Karma.
- **Modern developer experience** – Vitest supports TypeScript, ESM, and modern tooling out of the box, reducing configuration overhead.
- **Improved DX in the editor** – Vitest integrates seamlessly with IDEs, giving instant inline results and better debugging.
- **Closer to user behavior** – Testing Library encourages writing tests that interact with components the way users do (via queries like `getByRole` or `getByText`), making tests more reliable and less coupled to implementation details.
- **Lightweight & simpler setup** – No browser-based test runner (like Karma) is required, reducing complexity.
- **Rich ecosystem** – Shared ecosystem with tools like Playwright, Vite, and modern CI/CD pipelines.

### Requirements

The only requirement for the Mobiscroll Components to be testable is to install the [vitest-canvas-mock](https://www.npmjs.com/package/vitest-canvas-mock) package. The following command should install it:

```bash
npm install vitest-canvas-mock --save-dev
```

After the package is installed, it has to be imported in the setup file (e.g. `src/setup.ts`):

```ts title="src/setup.ts"
import "@angular/compiler";
import "@analogjs/vitest-angular/setup-zone";
import "vitest-canvas-mock"; // required for Mobiscroll Components

import {
  BrowserTestingModule,
  platformBrowserTesting,
} from "@angular/platform-browser/testing";
import { getTestBed } from "@angular/core/testing";

getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting(),
);
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

```ts title="eventcalendar.spec.ts"
import { render } from "@testing-library/angular";
import { MbscEventcalendarModule } from "@mobiscroll/angular";

describe("Mobiscroll Eventcalendar", () => {
  it("renders an empty calendar", async () => {
    const { container } = await render(
      "<mbsc-eventcalendar></mbsc-eventcalendar>",
      {
        imports: [MbscEventcalendarModule],
      },
    );

    expect(container.querySelector(".mbsc-eventcalendar")).toBeInTheDocument();
  });
});
```

#### Datepicker

The Datepicker renders an input element with a label, which makes it possible to test using accessible queries.

```ts title="datepicker.spec.ts"
import { render, screen } from "@testing-library/angular";
import { MbscDatepickerModule } from "@mobiscroll/angular";

describe("Mobiscroll Datepicker", () => {
  it("renders the Datepicker", async () => {
    await render('<mbsc-datepicker label="My Date picker"></mbsc-datepicker>', {
      imports: [MbscDatepickerModule],
    });

    const label = screen.getByLabelText("My Date picker");
    expect(label).toBeInTheDocument();
  });
});
```

## Targeting event elements

Here is an example of how to test if an event is rendered on the Eventcalendar timeline view for today.

```ts title="eventcalendar-event.spec.ts"
import { render, screen } from "@testing-library/angular";
import { MbscEventcalendarModule } from "@mobiscroll/angular";

describe("Mobiscroll Eventcalendar with events", () => {
  it("renders an event for today", async () => {
    const viewOption = { timeline: { type: "day" } };
    const today = new Date(2023, 0, 31);
    const eventData = [
      {
        start: new Date(2023, 0, 31, 10),
        end: new Date(2023, 0, 31, 11, 30),
        text: "My Today Event",
      },
    ];

    await render(
      '<mbsc-eventcalendar [view]="view" [selectedDate]="date" [data]="data"></mbsc-eventcalendar>',
      {
        imports: [MbscEventcalendarModule],
        componentProperties: {
          view: viewOption,
          date: today,
          data: eventData,
        },
      },
    );

    const eventElement = screen.getByText(/^My Today Event$/i);
    expect(eventElement).toBeInTheDocument();
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
import { render, screen } from "@testing-library/angular";
import { EventcalendarModule } from "@mobiscroll/angular";

describe("Eventcalendar with navigation", () => {
  const viewOption = { timeline: { type: "day" } };
  const eventData = [
    {
      start: new Date(2023, 0, 19, 10),
      end: new Date(2023, 0, 19, 11, 30),
      text: "My Dayaftertomorrow Event",
    },
  ];
  const dayAfterTomorrow = new Date(2023, 0, 19);
  const today = new Date(2023, 0, 17);

  it("renders an event for the day after tomorrow only when navigated there", async () => {
    const { rerender } = await render(
      `<mbsc-eventcalendar
        [view]="view"
        [selectedDate]="selectedDate"
        [data]="data">
      </mbsc-eventcalendar>`,
      {
        imports: [MbscEventcalendarModule],
        componentProperties: {
          view: viewOption,
          selectedDate: today,
          data: eventData,
        },
      },
    );

    // event not in DOM yet
    expect(
      screen.queryByText(/^My Dayaftertomorrow Event$/i),
    ).not.toBeInTheDocument();

    // re-render with dayAfterTomorrow as selected date
    await rerender({
      componentProperties: {
        view: viewOption,
        selectedDate: dayAfterTomorrow,
        data: eventData,
      },
    });

    // now the event should appear
    expect(
      screen.queryByText(/^My Dayaftertomorrow Event$/i),
    ).toBeInTheDocument();
  });
});
```

In this example, the Eventcalendar’s selected date is initially set to the 17th, which is in the same week as the 19th. However, because of virtual scrolling, the events on the 19th are not included in the DOM yet. After updating the selected date to the 19th, the event is rendered and can be queried successfully.
:::info
When querying an element that is not expected to be in the DOM, always use the `queryBy`... methods instead of the `getBy`... methods, otherwise the test will fail immediately.

:::

Re-rendering a component with different props can be done using the returned `rerender` function from the initial render.

## Firing events

The `@testing-library/angular` provides functions to simulate events. In the following example we use a click event to open a Datepicker and check whether the picker elements are in the DOM.

```ts title="datepicker-open.spec.ts"
import { fireEvent, render, screen } from "@testing-library/angular";
import { MbscDatepickerModule } from "@mobiscroll/angular";

describe("Mobiscroll Datepicker interactions", () => {
  it("opens the Datepicker when clicking the label", async () => {
    const { container } = await render(
      '<mbsc-datepicker label="Date picker"></mbsc-datepicker>',
      {
        imports: [MbscDatepickerModule],
      },
    );

    const label = screen.getByLabelText("Date picker");
    fireEvent.click(label);

    waitFor(() => {
      const datepickerDiv = container.querySelector(".mbsc-datepicker");
      expect(datepickerDiv).toBeInTheDocument();
    });
  });
});
```

### Events fired by the Mobiscroll components

The Mobiscroll components have lifecycle events that are fired during various phases. For example, the Datepicker fires an `onOpen` event when opened.

```ts title="datepicker-onopen.spec.ts"
import { fireEvent, render, screen } from "@testing-library/angular";
import { MbscDatepickerModule } from "@mobiscroll/angular";

describe("Mobiscroll Datepicker events", () => {
  it("fires onOpen when the Datepicker is opened", async () => {
    const openHandler = vi.fn(); // create a mock function with jest

    await render(
      '<mbsc-datepicker label="Date picker" (onOpen)="onOpen($event)"></mbsc-datepicker>',
      {
        imports: [MbscDatepickerModule],
        componentProperties: { onOpen: openHandler },
      },
    );

    expect(openHandler).not.toHaveBeenCalled(); // not called before open

    const label = screen.getByLabelText("Date picker");
    fireEvent.click(label);

    expect(openHandler).toHaveBeenCalled(); // called after open
  });
});
```

:::info
Here we are using Vitest’s `vi.fn()` to create a mock function and assert that it was called after the Datepicker was opened.
:::
