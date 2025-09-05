---
sidebar_position: 3
sidebar_label: Using with Ionic
displayed_sidebar: angularSidebar
---

import InstallNpm from '../../_shared/getting-started/install_npm.mdx';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Using Mobiscroll with Ionic

Installing Mobiscroll in your Ionic app takes a couple of minutes. Let's see how you can start with a simple app. Follow this guide for Ionic 2+, including Ionic 8. If interested in usage with Ionic 1, continue [reading here](https://docs.mobiscroll.com/5-25-0/angularjs/with-ionic1).


## Using the Mobiscroll CLI and NPM

### Step 1: Create an app

Assuming you have node and ionic already installed (if not, you can read about it in [the Ionic docs](https://ionicframework.com/#cli)), use the CLI to create a new app.
If you already have an app at hand, you can skip this step.

:::info
Note that it could take a couple of minutes until the app is created (depending on your internet connection and machine performance).
:::

```bash
ionic start my-starter-app tabs
```
```bash
cd my-starter-app
```

### Step 2: Install the Mobiscroll CLI

Install Mobiscroll CLI from NPM. You'll only have to do this step once on a single development machine. You won't need to repeat this on other machines or production servers.

```bash
$ npm install -g @mobiscroll/cli
```

### Step 3: Configure the project using the CLI

<InstallNpm framework="ionic" />

The command will ask for your credentials (email and password). If you already have a mobiscroll account but you are unsure about the details, you find them on your [account page](https://mobiscroll.com/account). If you don't have an account yet, you can start a trial in no time following [these steps](./installation.md#starting-with-the-trial).

:::info
If you already have a license, it is recommended to set up and use [team NPM accounts](http://help.mobiscroll.com/en/articles/8095168-team-npm-accounts) instead of individual developer credentials for installing Mobiscroll.
:::

### Step 4: Importing Mobiscroll to other modules (Optional)

When you have only one module (the `app.module.ts`), the previous configuration process will add an import for the Mobiscroll module there, otherwise it will ask you to choose the Modules you want to use Mobiscroll in.
If you add more modules later, or decide that you need the mobiscroll components in a module you didn't add in the configuration phase, you can add the imports manually like this:

```ts title="new-module.module.ts"
// ...other imports of your module

import { MbscModule } from '@mobiscroll/angular';

@NgModule({
  declarations: [YourNewPage]
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // highlight-next-line
    MbscModule, // <-- added the Mobiscroll Module to the imports
    RouterModule.forChild([{ path: '', component: YourNewPage }])
  ],
})
export class YourNewPageModule {}
```

### Step 5: Let's see if Mobiscroll was installed correctly

To test it let's add a simple input to the Tab1 component in the starter app. In case of an older ionic app (for example Ionic 4 or Ionic 5) you can use the home page found at: `src/app/home/home.page.html`

### Using modules

<Tabs>
<TabItem value="html" label="src/app/tab1/tab1.page.html">

```html
<ion-header [translucent]="true">
  <ion-toolbar>
    <ion-title>
      Tab 1
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content [fullscreen]="true">
  <ion-header collapse="condense">
    <ion-toolbar>
      <ion-title size="large">Tab 1</ion-title>
    </ion-toolbar>
  </ion-header>

  // highlight-start
  <ion-item>
      <ion-input label="Birthday" [(ngModel)]="myBirthday" mbsc-datepicker></ion-input>
  </ion-item>
  // highlight-end
</ion-content>
```

</TabItem>
<TabItem value="ts" label="src/app/tab1/tab1.page.ts">

```ts
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  // highlight-next-line
  public myBirthday: Date | null = null;

  constructor() {}

}
```

</TabItem>
<TabItem value="module" label="src/app/tab1/tab1.module.ts">

```ts
// highlight-next-line
import { MbscModule } from '@mobiscroll/angular';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    // highlight-next-line
    MbscModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
```

</TabItem>
</Tabs>

### Using standalone components

<Tabs>
<TabItem value="html" label="src/app/tab1/tab1.page.html">

```html
<ion-header [translucent]="true">
  <ion-toolbar>
    <ion-title>
      Tab 1
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content [fullscreen]="true">
  <ion-header collapse="condense">
    <ion-toolbar>
      <ion-title size="large">Tab 1</ion-title>
    </ion-toolbar>
  </ion-header>

  // highlight-start
  <ion-item>
      <ion-input label="Birthday" [(ngModel)]="myBirthday" mbsc-datepicker></ion-input>
  </ion-item>
  // highlight-end
</ion-content>
```

</TabItem>
<TabItem value="ts" label="src/app/tab1/tab1.page.ts">

```ts
// highlight-next-line
import { MbscModule } from '@mobiscroll/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    // highlight-next-line
    MbscModule
  ]
})
export class Tab1Page {

  // highlight-next-line
  public myBirthday: Date | null = null;

  constructor() {}

}
```

</TabItem>
</Tabs>

To build the app just run the serve command in the CLI:

```bash
ionic serve
```

At this point you have completed the setup. Go build great things!

:::info One more thing

**Setting up for CI/CD**

The config command in [step 3](#step-3-configure-the-project-using-the-cli) will create a file named `.npmrc` in the project root, containing the access tokens to the Mobiscroll NPM registry. Commit this file into the repository to ensure the package will install for other team members and in CI/CD environments.

If you are using Yarn or Docker, check out the [setup instructions here](./installation.md#setting-up-for-cicd).
:::