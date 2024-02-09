---
sidebar_position: 13
sidebar_label: Calendar integrations
displayed_sidebar: reactSidebar
---

import GoogleMethods from '../_auto-generated/googlecalendar/methods.md';
import GoogleEvents from '../_auto-generated/googlecalendar/events.md';
import GoogleOptions from '../_auto-generated/googlecalendar/options.md';
import OutlookMethods from '../_auto-generated/outlookcalendar/methods.md';
import OutlookEvents from '../_auto-generated/outlookcalendar/events.md';
import OutlookOptions from '../_auto-generated/outlookcalendar/options.md';

import CalIntInstall from '../../_shared/eventcalendar/cal-int-install.mdx';
import CalIntServer from '../../_shared/eventcalendar/cal-int-server.mdx';

# Third party calendar integration

The Calendar Integration is an optional plugin, that includes synchronization with your Google and Outlook calendar services. It can be installed and used with the Mobiscroll Event Calendar as described below.

## Installing the Calendar Integration Plugin

<CalIntInstall />

## Google calendar integration

The Google Calendar Integration is a part of the third party calendar integrations plugin that manages the synchronization with your Google calendar services.

### Public google calendars

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
      apiKey: 'YOUR_APY_KEY',
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

### Private google calendars

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
      apiKey: 'YOUR_APY_KEY',
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