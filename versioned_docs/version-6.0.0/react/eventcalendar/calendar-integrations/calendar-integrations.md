---
sidebar_position: 13
sidebar_label: Calendar integrations
displayed_sidebar: reactSidebar
title: Third party calendar integration
---

import GoogleMethods from '../../_auto-generated/googlecalendar/methods.md';
import GoogleEvents from '../../_auto-generated/googlecalendar/events.md';
import GoogleOptions from '../../_auto-generated/googlecalendar/options.md';
import OutlookMethods from '../../_auto-generated/outlookcalendar/methods.md';
import OutlookEvents from '../../_auto-generated/outlookcalendar/events.md';
import OutlookOptions from '../../_auto-generated/outlookcalendar/options.md';

import CalIntInstall from '../../../_shared/eventcalendar/cal-int-install.mdx';
import CalIntServer from '../../../_shared/eventcalendar/cal-int-server.mdx';

## Overview

The Calendar Integration is an optional plugin, that includes synchronization with your Google and Outlook calendar services. It can be installed and used with the Mobiscroll Event Calendar as described below.

:::info
Currently, the calendar integration plugins cannot be used in Chrome extensions, because the CSP rules do not allow loading scripts from 3rd party domains.
:::

## Installing the Calendar Integration Plugin

<CalIntInstall />

## Google calendar integration

The Google Calendar Integration is a part of the third party calendar integrations plugin that manages the synchronization with your Google calendar services.

### Public google calendars

The public google calendar integration allows you to load events from a public calendar without user authentication.  
Calling the `init` function will do the necessary initializations for the third party. After the init, you can list the events from the public calendar.

```jsx
import { useState, useEffect } from "react";
import { googleCalendarSync } from "@mobiscroll/calendar-integration";
import { Eventcalendar } from "@mobiscroll/react";

function App() {
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    // init google client
    googleCalendarSync.init({
      apiKey: 'YOUR_API_KEY',
      onInit: () => {
        googleCalendarSync.getEvents(
          'PUBLIC_CALENDAR_ID',
          new Date(2022, 1, 1),
          new Date(2022, 3, 0)
        ).then((events) => {
            setMyEvents(events);
        });
      },
    });
  }, []);

  return <Eventcalendar data={myEvents} />
}
```

:::info
The public google calendar integration only supports reading events.
Writing, updating, or deleting events requires the private calendar integration described below.
:::

### Private google calendars

The private google calendar integration allows your app to connect with google calendar services for reading and managing events.
Once initialized, users can sign in with their google account, view their calendars and events, and create, update, or delete events based on their granted permissions.

### Key details

- **User presence required**  
  The user must be in front of the computer and logged in for synchronization to happen. Sync is handled through client-side code.  

- **User-driven updates**  
  Calendar syncing takes place when the user is logged in and interacting with the application. This approach gives users full control over when and how their data is synchronized.

- **Active session required**  
  To update or fetch events, the user needs to be logged in and have the application open. This means that changes made while the user is active — such as adding, editing, or deleting events — will be reflected in their connected calendar.

- **Server-side actions**  
  Server-generated events or background updates won't automatically appear in the connected calendar. To sync those changes, the user must be signed in and running the client-side integration.

### Login and sync flow

Follow these steps to set up and use the calendar integration correctly:

1. **User initiates sign-in**  
   Start the sign-in process from the browser using the Mobiscroll Calendar Integration SDK.

2. **User authenticates and grants permissions**  
   The user logs in and accepts the requested calendar permissions.

3. **Connection established**  
   Once authenticated, Mobiscroll can read and write events between your app and the connected calendar — as long as the user is active in the browser.

4. **Sync while the user is active**  
   Event synchronization happens only while the user is logged in and the client-side code is running.

5. **Next sync also requires presence**  
   Each new synchronization (for example, when fetching updated events or pushing new ones) requires the user to be logged in and active in the app.


Calling the `init` function will do the necessary initializations for the third party. For this step you need to use an API key and a client ID. After the `init`, you can sign in, list your calendars and events and create, update or delete the events on the calendars you have permission to.

```jsx
import { useState, useEffect } from "react";
import { googleCalendarSync } from "@mobiscroll/calendar-integration";
import { Eventcalendar } from "@mobiscroll/react";

function App() {
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    // init google client
    googleCalendarSync.init({
      apiKey: 'YOUR_API_KEY',
      clientId: 'YOUR_CLIENT_ID',
      onSignedIn: () => {
        googleCalendarSync.getEvents(
          ['MY_FIRST_CALENDAR_ID', 'MY_SECOND_CALENDAR_ID'],
            new Date(2022, 1, 1),
            new Date(2022, 3, 0)
        ).then((events) => {
          setMyEvents(events);
        });
      },
      onSignedOut: () => {
        setMyEvents([]);
      },
    });
  }, []);

  return <Eventcalendar data={myEvents} />
}
```

### Server side tokens

<CalIntServer />

### API {#google-api}

<div className="option-list font-size-smaller">

  <h3 id="google-options" className="api-heading">Configuration options</h3>
  <GoogleOptions />

  <h3 id="google-events" className="api-heading">Events</h3>
  <GoogleEvents />

  <h3 id="google-methods" className="api-heading">Methods</h3>
  <GoogleMethods />

</div>

## Outlook calendar integration

The Outlook Calendar Integration is a part of the third party calendar integrations plugin that manages the synchronization with your Outlook calendar services.

### Outlook calendars

Calling the `init` function will do the necessary initializations for the third party. For this step you need to use a [client ID](https://docs.microsoft.com/en-us/graph/auth-v2-user). After the init, you can sign in, list your calendars and events and create, update or delete the events on the calendars you have permission to.

```jsx
import { useState, useEffect } from "react";
import { outlookCalendarSync} from "@mobiscroll/calendar-integration";
import { Eventcalendar } from "@mobiscroll/react";

function App() {
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    // init outlook client
    outlookCalendarSync.init({
      clientId: 'YOUR_CLIENT_ID',
      onSignedIn: () => {
        outlookCalendarSync.getEvents(
          ['MY_FIRST_CALENDAR_ID', 'MY_SECOND_CALENDAR_ID'],
          new Date(2022, 1, 1),
          new Date(2022, 3, 0)
        ).then((events) => {
          setMyEvents(events);
        });
      },
      onSignedOut: () => {
        setMyEvents([]);
      },
    });
  }, []);

  return <Eventcalendar data={myEvents} />
}
```

### API {#outlook-api}

<div className="option-list">

  <h3 id="outlook-options" className="api-heading">Configuration options</h3>
  <OutlookOptions />

  <h3 id="outlook-events" className="api-heading">Events</h3>
  <OutlookEvents />

  <h3 id="outlook-methods" className="api-heading">Methods</h3>
  <OutlookMethods />

</div>