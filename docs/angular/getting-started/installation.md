---
sidebar_position: 2
sidebar_label: Installation
displayed_sidebar: angularSidebar
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import CliInstall from '../../\_shared/cliinstall.mdx';
import TrialStart from '../../\_shared/\_starting_trial.mdx';
import InstallNpm from '../../\_shared/\_install_npm.mdx';
import InstallDownload from '../../\_shared/\_install_download.mdx';
import ImportStyles from '../../\_shared/\_import_styles.mdx';

# Getting started with Mobiscroll for Angular

## Install the CLI

The first step you need to install the Mobiscroll library into your app is to install the Mobiscroll CLI.

<CliInstall />

## Starting with the trial

<TrialStart framework="angular" />

## Installing from NPM

<InstallNpm framework="angular" />

## Installing a downloaded package

<InstallDownload framework="angular" />

## Use the components

<ImportStyles framework="angular" />

To test the installation, add the Eventcalendar component to your main component template (for example `app.component.html`).

In case you installed the library from a downloaded package and did not include the Eventcalendar in the package, you can choose a different component as well.

<Tabs>
<TabItem value="html" label="app.component.html">

```html
{{title}}
<mbsc-eventcalendar [view]="calView"></mbsc-eventcalendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { Component } from '@angular/core';
// highlight-next-line
import { MbscEventcalendarView } from '@mobiscroll/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'My Angular app';

// highlight-start
  calView: MbscEventcalendarView = {
    schedule: {
      type: 'day'
    }
  };
// highlight-end
}
```

</TabItem>
</Tabs>