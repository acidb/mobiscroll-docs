---
sidebar_position: 7
sidebar_label: Icons
displayed_sidebar: vueSidebar
title: Icons
---

import Icons from '../../_shared/core-concepts/all_icons.mdx';
import { toc as recTOC } from '../../_shared/core-concepts/all_icons.mdx';

export const toc = [{ value: 'Overview', level: 2, id: 'overview'}, { value: 'Use external icons in Mobiscroll components', level: 2, id: 'use-external-icons-in-mobiscroll-components'}, ...recTOC];

<h2 id="overview">Overview</h2>

Some of the components are using icons to enhance the user interface, providing an API to easily specify which icons to use.
It is also possible to use the icons outside of Mobiscroll components using the provided css classes: `mbsc-font-icon mbsc-icon-{icon_name}`

```jsx title="Example"
<span class="mbsc-font-icon mbsc-icon-home"></span>
<span class="mbsc-font-icon mbsc-icon-pencil"></span>
```

The downloaded Mobiscroll package contains a default icon set containing some frequently used icons and the icons used in our demos and examples. The [download builder](https://download.mobiscroll.com/) provides the possibility to create custom icon packs, which can be selected to include in the downloaded package instead of the default set.

<h2 id="use-external-icons-in-mobiscroll-components">Use external icons in Mobiscroll components</h2>

If your project or framework already uses an icon set you can easily use those icons in the Mobiscroll components. There are built in options to pass svg directly as an option such as the `iconSvg` option in case of the Button compoenent.

<Icons />