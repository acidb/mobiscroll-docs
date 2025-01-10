---
sidebar_position: 3
sidebar_label: Using with Ionic
displayed_sidebar: reactSidebar
---

import InstallNpm from '../../_shared/getting-started/install_npm.mdx';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Using Mobiscroll with Ionic

Installing Mobiscroll in your Ionic app takes a couple of minutes. Let's see how you can start with the tabs starter app.


## Using the Mobiscroll CLI and NPM

### Step 1: Create an app

Assuming you have node and ionic already installed (if not, you can read about it in [the Ionic docs](https://ionicframework.com/#cli)), use the CLI to create a new app.
If you already have an app at hand, you can skip this step.

:::info
Note that it could take a couple of minutes until the app is created (depending on your internet connection and machine performance).
:::

```bash
ionic start myStarterApp tabs type=react
```
```bash
cd myStarterApp
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

### Step 4: Importing Mobiscroll to your page

You will need to import the component you want to use and the css from the mobiscroll package:

```tsx
import { Datepicker } from '@mobiscroll/react'; /* or import any other component */
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
```

### Step 5: Let's see if Mobiscroll was installed correctly

To test it let's add a Datepicker to the `src/pages/Tab1.tsx` page. We will use the `IonInput` component as the base component for the datepicker. When the input is focused, the picker will open.

```tsx
import {
  IonContent,
  IonHeader,
  // highlight-start
  IonInput,
  IonItem,
  // highlight-end
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

// highlight-start
import { Datepicker } from '@mobiscroll/react'; /* or import any other component */
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
// highlight-end

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        // highlight-start
        <IonItem>
          <Datepicker inputComponent={IonInput} inputProps={{ label: 'My Date'}} />
        </IonItem>
        // highlight-end
      </IonContent>
    </IonPage>
  );
};
```

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