---
sidebar_position: 3
sidebar_label: Using the source code
displayed_sidebar: angularSidebar
title: Using Mobiscroll with the source code
---

## Overview

The following guide will help in using the development packages (a.k.a. source code) of Mobiscroll.

:::info

To have access to the source code you will need a Complete License or a License with the Source Code Addon.
You can find more details on licenses on the [pricing page](https://mobiscroll.com/pricing).

:::

The source code can be downloaded from the [download page](https://download.mobiscroll.com/). If you have access to the development packages, a dropdown will be there with the compression level label. Select the development level if it's not selected already from the dropdown. After selecting the components, themes, languages and icon packs you want to include hit the download button. You will get a zip file with the source code in it.

:::info

Before you can use the development package inside an angular app, the Mobiscroll library must be built from the downloaded package.

:::

## Building the library

The development package contains the scripts and dependencies it requires to build it to an NPM package. After the library is built, it can be installed as an npm package to an Angular project.

After unzipping the downloaded package, running the following command will install the dependencies and builds the library:

```jsx
$ npm start
```

After the library is built, a file called `mobiscroll-angular-5.25.1.tgz` fill be created in the `dist` directory.

This file is the NPM package containing the library. Copy this file to your angular project and install with the following command:

```jsx
$ npm install .\mobiscroll-angular-5.25.1.tgz
```

The installed package is a production ready package. After installing it, you can import and use the individual modules from it:

### Using standalone components

```ts title="app.component.ts"
import { MbscEventcalendarModule, MbscDatepickerModule } from '@mobiscroll/angular';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [ 
    MbscEventcalendarModule,
    MbscDatepickerModule,
    FormsModule,  
    BrowserModule
  ],
})
export class AppComponent { }
```

```html title="app.component.html"
<mbsc-eventcalendar></mbsc-eventcalendar>
<mbsc-datepicker [(ngModel)]="myDate" label="My Date"></mbsc-datepicker>
<mbsc-datepicker [(ngModel)]="myRange" select="range" label="My Range"></mbsc-datepicker>
```

### Using modules

```ts title="app.module.ts"
import { MbscEventcalendarModule, MbscDatepickerModule } from '@mobiscroll/angular';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [ 
    MbscEventcalendarModule,
    MbscDatepickerModule,
    FormsModule,  
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```html title="app.component.html"
<mbsc-eventcalendar></mbsc-eventcalendar>
<mbsc-datepicker [(ngModel)]="myDate" label="My Date"></mbsc-datepicker>
<mbsc-datepicker [(ngModel)]="myRange" select="range" label="My Range"></mbsc-datepicker>
```