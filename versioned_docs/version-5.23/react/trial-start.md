---
sidebar_position: 1
sidebar_label: Getting started with trial
displayed_sidebar: reactSidebar
---

import CliInstall from '../\_shared/cliinstall.mdx';

# Getting started with trial

## Installing from NPM with using the Mobiscroll CLI

### Install the Mobiscroll CLI

<CliInstall />

### Run the mobiscroll config command

Run `mobiscroll config react` in the root folder of you app in a terminal window.

```
mobiscroll config javascript
```

:::tip
If you're working from behind a proxy, additional configuration might be needed. Please check the [proxy configuration options](https://docs.mobiscroll.com/cli#proxy) in the documentation.
:::

:::tip
The package will be installed from a private npm registry, which requires authentication. If your project uses a CI/CD workflow, [read this guide](http://help.mobiscroll.com/en/articles/1195431-installing-mobiscroll-with-npm#setting-up-for-cicd) on how to make it work.
:::

## Let's see if Mobiscroll was installed correctly

Here is how can the Mobiscroll resources be imported to a React component:

```jsx
import { Datepicker, Eventcalendar } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
```

## Load the necessary scripts

# Initialize a component

To test it let's import the Datepicker component and add it to the App function. If you just created a new app, you can modify the `src/App.js` file:

```jsx
import React from "react";
import { Datepicker } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

export function App() {
  const [birthday, setBirthday] = React.useState(null);
  const onBirthdayChange = (ev) => {
    setBirthday(ev.value);
  };
  return (
    <Datepicker
      value={birthday}
      onChange={onBirthdayChange}
      label="When were you born?"
    />
  );
}
```
