---
sidebar_label: Global options
displayed_sidebar: reactSidebar
---

import SetOptionsDescription from '../../_shared/core-concepts/global_setoptions.mdx';

# Global options

## The `setOptions` method

<SetOptionsDescription />

```jsx
import {
  Datepicker,
  Eventcalendar,
  // highlight-next-line
  setOptions,
  localeDe
} from '@mobiscroll/react';

// Specify options globally for all components
// highlight-start
setOptions({
  locale: localeDe,
  theme: 'ios',
  themeVariant: 'dark',
});
// highlight-end

export function App() {
  return <>
    <Datepicker />
    <Eventcalendar />
  </>
}
```

## Using context

[Context](https://react.dev/learn/passing-data-deeply-with-context) lets a parent component provide data to the entire tree below it. Context is designed to share data that can be considered "global" for a tree of React components, such as the theme, themeVariant or preferred language.

You can import the `<OptionsProvider options={obj}/>` component from the Mobiscroll bundle. This component provides the options context that Mobiscroll components use. Here's an example:

```jsx
import { OptionsProvider, Datepicker, Eventcalendar, localeDe } from '@mobiscroll/react';

const GLOBAL_OPTIONS = {
  theme: 'ios',
  themeVariant: 'dark',
  locale: localeDe,
}

export function App() {
  return <OptionsProvider options={GLOBAL_OPTIONS}>
    <Datepicker select="range" />
    <Eventcalendar />
  </OptionsProvider>
}
```

In the above example both the Datepicker and the Eventcalendar component will get the same theme automatically from the `GLOBAL_OPTIONS` object through context.
