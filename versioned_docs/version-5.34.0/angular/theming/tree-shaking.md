---
sidebar_position: 2
sidebar_label: Tree shaking for styles
displayed_sidebar: angularSidebar
title: Tree shaking for styles
---

## Overview

Tree shaking is a term commonly used in web development and particularly in JavaScript for unused code removal. Since websites are served (mostly) over the network, loading times depend on content size, so minification and unused content elimination plays a major role in making webapps fluid.

For the JavaScript part, popular frameworks already have the treeshaking built in, so the components that are not used will be left out from the built project.

## Eliminating unused styles

In case of the styles, leaving out the unused rules is not as straight forward.

The overarching idea is that CSS selectors match elements in the DOM, and those elements in the DOM come from all sorts of places: your static templates, dynamic templates based on server-side state, and of course, JavaScript, which can manipulate the DOM in any way at all, including pull things from APIs and third parties. 

## Sass variables to the rescue

The Mobiscroll Library comes with a modular [SASS](https://sass-lang.com/) bundle, that can be configured which component styles and which themes to leave in and out for the compiled css file.

Every component and theme has a SASS variable that can be turned on or off. If the variable is falsy the styles that it needs will not be added to the bundle.

```jsx title="Example on configuring the styles"
// include the ios theme
$mbsc-ios-theme: true;

// include the components:
$mbsc-datepicker: true;
$mbsc-eventcalendar: true;
        
@import "@mobiscroll/angular/dist/css/mobiscroll.modular.scss"
```

In the above example the styles needed for the eventcalendar and datepicker will be included and only for the ios theme. All other components (like select or grid-layout) and all other themes will be left out from the bundle.

:::info

It's important that you override the variables BEFORE the scss file import, otherwise it won't make any difference.

:::

Here's the complete list of the components and themes that can be used:
* `$mbsc-datepicker`
* `$mbsc-eventcalendar`
* `$mbsc-grid-layout`
* `$mbsc-popup`
* `$mbsc-select`
* `$mbsc-ios-theme`
* `$mbsc-material-theme`
* `$mbsc-windows-theme`

:::info

Some components use others internally, so it might happen that even though you don't want to include some styles, they will still end up in your bundle.
For example if you don't want to include the form components (input, button, segmented, etc...), but you are using the select component, the styles for the mobiscroll buttons, will still be in, because of the dependency.

:::