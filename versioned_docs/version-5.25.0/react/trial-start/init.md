---
sidebar_position: 1
sidebar_label: Init component
displayed_sidebar: reactSidebar
---

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
