---
sidebar_position: 2
sidebar_label: Global options
displayed_sidebar: angularSidebar
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import SetOptionsDescription from '../../_shared/core-concepts/global_setoptions.mdx';

# Global options

## The `setOptions` function

<SetOptionsDescription />

```ts title="app.module.ts"
import {
  // highlight-next-line
  setOptions,
  localeDe
} from '@mobiscroll/angular';

// Specify options globally for all components
// highlight-start
setOptions({
  locale: localeDe,
  theme: 'ios',
  themeVariant: 'dark',
});
// highlight-end
```

## The options service

The `MbscOptionsService` is an angular service that provides options to all Mobiscroll components down the component hierarchy.

### Using modules

The Mobiscroll options service can be provided from the root module to pass the options to all of the compoents.

<Tabs label="Somelabel">
  <TabItem value="app.module" label="app.module.ts">

```ts
// ...
// highlight-next-line
import { MbscModule, MbscOptionsService } from '@mobiscroll/angular';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MbscModule,
    FormsModule,
    BrowserModule
  ],
  // highlight-next-line
  providers: [MbscOptionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

  </TabItem>
  <TabItem value="app.component.ts" label="app.component.ts">

```ts
import { Component } from '@angular/core';
// highlight-next-line
import { MbscOptionsService } from '@mobiscroll/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // highlight-next-line
  constructor(protected options: MbscOptionsService) {}

  SwitchToIosLight() {
    // highlight-start
    this.options.setOptions({
      theme: 'ios',
      themeVariant: 'light',
    });
    // highlight-end
  }
  SwitchToIosDark() {
    // highlight-start
    this.options.setOptions({
      theme: 'ios',
      themeVariant: 'dark',
    });
    // highlight-end
  }
}

```

  </TabItem>
  <TabItem value="app.component.html" label="app.component.html">

```html
<mbsc-button (click)="SwitchToIosLight()">Light theme</mbsc-button>
<mbsc-button (click)="SwitchToIosDark()">Dark theme</mbsc-button>

<mbsc-eventcalendar></mbsc-eventcalendar>
```

  </TabItem>
</Tabs>

In the above example clicking the buttons will set the theme and themeVariant and will automatically be passed on to the components, since the service is provided in the app root module.


### Using standalone components

When using the (relatively) new standalone components, there are no modules defined, you can still use the `MbscOptionsService`. Here's an example on how to use it:

```ts title="app.component.ts"
// ...
import { MbscModule, MbscOptionsService } from '@mobiscroll/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, MbscModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // highlight-next-line
  providers: [MbscOptionsService],
})
export class AppComponent {
  // highlight-next-line
  constructor(protected options: MbscOptionsService) { }

  SwitchToIosLight() {
    // highlight-start
    this.options.setOptions({
      theme: 'ios',
      themeVariant: 'light',
    });
    // highlight-end
  }
  SwitchToIosDark() {
    // highlight-start
    this.options.setOptions({
      theme: 'ios',
      themeVariant: 'dark',
    });
    // highlight-end
  }
}
```