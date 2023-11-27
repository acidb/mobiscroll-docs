---
sidebar_position: 1
sidebar_label: Load or import scripts, es module / non-es module
displayed_sidebar: javascriptSidebar
---

# Loading into your app

Here is how can the npm version of the Mobiscroll resources be imported to a JavaScript application if you app supports es modules:

```jsx
import { Datepicker, Eventcalendar } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
```

If your app is not supporting es modules then include the CSS and JS files before the closing `</head>` tag of your file.

```html
<script src="js/mobiscroll.javascript.min.js"></script>
<link
  href="css/mobiscroll.javascript.min.css"
  rel="stylesheet"
  type="text/css"
/>
```
