---
sidebar_position: 2
sidebar_label: Installation
displayed_sidebar: angularSidebar
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import CliInstall from '../../\_shared/getting-started/cliinstall.mdx';
import TrialStart from '../../\_shared/getting-started/starting_trial.mdx';
import InstallNpm from '../../\_shared/getting-started/install_npm.mdx';
import InstallDownload from '../../\_shared/getting-started/install_download.mdx';
import ImportStyles from '../../\_shared/getting-started/import_styles.mdx';
import CiCdUsage from '../../\_shared/getting-started/cicd_usage.mdx';

# Getting started with Mobiscroll for Angular

## Install the CLI

The first step you need to install the Mobiscroll library into your app is to install the Mobiscroll CLI.

<CliInstall />

## Starting with the trial

<TrialStart framework="angular" />

## Installing from NPM

<InstallNpm framework="angular" />

## Setting up for CI/CD

<CiCdUsage/>

## Installing manually

<InstallDownload framework="angular" />

## Use the components

<ImportStyles framework="angular" />

To test the installation, add the Eventcalendar component to your main component template (for example `app.component.html`).

In case you installed the library from a downloaded package and did not include the Eventcalendar in the package, you can choose a different component as well.

### With standalone components

<Tabs>
<TabItem value="html" label="app.component.html">

```html
{{title}}
<mbsc-eventcalendar [view]="calView"></mbsc-eventcalendar>
```
</TabItem>
<TabItem value="ts" label="app.component.ts">

```ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
// highlight-next-line
import { MbscEventcalendarView, MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'].
  standalone: true,
  // highlight-next-line
  imports: [CommonModule, MbscModule]
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


### With modules

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
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  title = 'My Angular app';

// highlight-start
  calView: MbscEventcalendarView = {
    scheduler: {
      type: 'day'
    }
  };
// highlight-end
}
```

</TabItem>

<TabItem value="module" label="app.module.ts">

```ts
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// highlight-next-line
import { MbscModule } from '@mobiscroll/angular';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    // highlight-next-line
    MbscModule,
    FormsModule,
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

</TabItem>
</Tabs>