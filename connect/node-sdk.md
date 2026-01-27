---
sidebar_label: SDK API Reference
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Parameter } from '@site/src/components/Connect';

# SDK API Reference

## Node.js SDK

The Mobiscroll Connect Node.js SDK provides a convenient way to interact with the Mobiscroll Connect API from your Node.js applications.

### Installation

Install the package using npm:

```bash
npm install @mobiscroll/connect-node
```

### Client Initialization {#client-initialization}

To use the SDK, you need to initialize the `MobiscrollConnectClient` with your client credentials.

**Class:** `MobiscrollConnectClient`

<Parameter name="config" type="MobiscrollConnectConfig" id="client-config">
Configuration object.

<Parameter name="clientId" type="string">
Your Client ID obtained from the Mobiscroll dashboard.
</Parameter>

<Parameter name="clientSecret" type="string">
Your Client Secret obtained from the Mobiscroll dashboard.
</Parameter>

<Parameter name="redirectUri" type="string">
Your application's redirect URI that matches the one configured in the dashboard.
</Parameter>

</Parameter>

**Usage:**

```typescript
import { MobiscrollConnectClient } from '@mobiscroll/connect-node';

const client = new MobiscrollConnectClient({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'YOUR_REDIRECT_URI',
});
```

#### Methods

##### setCredentials {#client-set-credentials}

Sets the access token for the client. This is required before making any API calls that require authentication (which is most of them).

**Method:** `client.setCredentials(tokens)`

<Parameter name="tokens" type="TokenResponse">
The tokens object received from the `auth.getToken` method.
</Parameter>

##### on {#client-on}

 registers an event listener for client events.

**Method:** `client.on(event, listener)`

<Parameter name="event" type="string">
The name of the event to listen for.
</Parameter>

<Parameter name="listener" type="function">
The callback function to execute when the event is triggered.
</Parameter>

##### getConfig {#client-get-config}

Returns the current configuration of the client.

**Method:** `client.getConfig()`

Returns the `MobiscrollConnectConfig` object.

### Authentication {#authentication}

The `auth` resource handles the OAuth flow and provider connections.

#### Generate Auth URL {#auth-generate-url}

Generates the OAuth2 authorization URL to initiate the authorization flow.

**Method:** `client.auth.generateAuthUrl(params)`

<Parameter name="params" type="AuthorizeParams" id="auth-generate-url-params">
Authorization parameters.

<Parameter name="userId" type="string">
Unique identifier of the user in your system. This is used to link the external account to your user.
</Parameter>

<Parameter name="state" type="string">
Optional state value for CSRF protection and state maintenance.
</Parameter>

<Parameter name="scope" type="string">
Optional scope string specifying requested access levels.
</Parameter>

</Parameter>

**Returns:** `string` - The complete authorization URL to redirect the user to.

#### Get Token {#auth-get-token}

Exchanges the authorization code received in the callback for an access token.

**Method:** `client.auth.getToken(code)`

<Parameter name="code" type="string">
Authorization code from the OAuth callback query parameters.
</Parameter>

**Returns:** `Promise<TokenResponse>` - Resolves to the token response containing the access token.

#### Get Connection Status {#auth-get-connection-status}

Retrieves the connection status for all calendar providers for the authenticated user.

**Method:** `client.auth.getConnectionStatus()`

**Returns:** `Promise<ConnectionStatusResponse>`

<Parameter name="data" type="ConnectionStatusResponse" id="connection-status-response">

<Parameter name="connections" type="object">
Object containing arrays of connected accounts for `google`, `microsoft`, and `apple`.
</Parameter>

<Parameter name="limitReached" type="boolean">
Indicates if the account limit has been reached.
</Parameter>

</Parameter>

#### Disconnect {#auth-disconnect}

Disconnects a calendar provider account or all accounts of a provider.

**Method:** `client.auth.disconnect(params)`

<Parameter name="params" type="DisconnectParams" id="disconnect-params">

<Parameter name="provider" type="string">
The provider to disconnect: `'google'`, `'microsoft'`, or `'apple'`.
</Parameter>

<Parameter name="account" type="string">
Optional specific account identifier (email) to disconnect. If omitted, all accounts for the provider may be disconnected depending on the implementation.
</Parameter>

</Parameter>

**Returns:** `Promise<DisconnectResponse>`

### Calendars {#calendars}

The `calendars` resource allows you to list calendars from connected providers.

#### List Calendars {#calendars-list}

List all calendars from all connected providers.

**Method:** `client.calendars.list()`

**Returns:** `Promise<Calendar[]>` - Resolves to an array of calendar objects.

<Parameter name="Calendar" type="object" id="calendar-object">

<Parameter name="provider" type="string">
Provider name: `'google'`, `'microsoft'`, or `'apple'`.
</Parameter>

<Parameter name="id" type="string">
Unique calendar identifier.
</Parameter>

<Parameter name="title" type="string">
Calendar display title.
</Parameter>

<Parameter name="timeZone" type="string">
Calendar time zone.
</Parameter>

<Parameter name="color" type="string">
Calendar color code.
</Parameter>

<Parameter name="description" type="string">
Calendar description.
</Parameter>

<Parameter name="original" type="object">
Original provider calendar object.
</Parameter>

</Parameter>

### Events {#events}

The `events` resource manages calendar events.

#### List Events {#events-list}

List calendar events based on criteria.

**Method:** `client.events.list(params)`

<Parameter name="params" type="EventListParams" id="events-list-params">

<Parameter name="start" type="Date | string">
Start date/time (inclusive).
</Parameter>

<Parameter name="end" type="Date | string">
End date/time (exclusive).
</Parameter>

<Parameter name="calendarIds" type="object">
Object mapping provider names to arrays of calendar IDs to filter by.
</Parameter>

<Parameter name="pageSize" type="number">
Maximum number of events to return.
</Parameter>

<Parameter name="nextPageToken" type="string">
Token for retrieving the next page of results.
</Parameter>

<Parameter name="singleEvents" type="boolean">
Whether to expand recurring events into single instances.
</Parameter>

</Parameter>

**Returns:** `Promise<EventsListResponse>`

#### Create Event {#events-create}

Creates a new calendar event.

**Method:** `client.events.create(params)`

<Parameter name="params" type="CreateEventData & { provider: ProviderName }" id="events-create-params">

<Parameter name="provider" type="string">
Target provider: `'google'`, `'microsoft'`, or `'apple'`.
</Parameter>

<Parameter name="calendarId" type="string">
ID of the calendar to create the event in.
</Parameter>

<Parameter name="title" type="string">
Event title.
</Parameter>

<Parameter name="start" type="Date | string">
Start date/time.
</Parameter>

<Parameter name="end" type="Date | string">
End date/time.
</Parameter>

<Parameter name="allDay" type="boolean">
Whether the event is all-day.
</Parameter>

<Parameter name="description" type="string">
Event description/notes.
</Parameter>

<Parameter name="location" type="string">
Event location.
</Parameter>

<Parameter name="attendees" type="string[]">
Array of attendee emails.
</Parameter>

</Parameter>

**Returns:** `Promise<EventResponse>` - The created event object.

#### Update Event {#events-update}

Updates an existing calendar event.

**Method:** `client.events.update(params)`

<Parameter name="params" type="UpdateEventData & { provider: ProviderName }" id="events-update-params">

<Parameter name="provider" type="string">
Target provider.
</Parameter>

<Parameter name="eventId" type="string">
ID of the event to update.
</Parameter>

<Parameter name="calendarId" type="string">
ID of the calendar the event belongs to.
</Parameter>

<Parameter name="recurringEventId" type="string">
(Optional) ID of the recurring event instance if updating a specific instance.
</Parameter>

<Parameter name="updateMode" type="string">
(Optional) For recurring events: `'this'`, `'following'`, or `'all'`.
</Parameter>

...plus any fields from Create Event params to update.

</Parameter>

**Returns:** `Promise<EventResponse>` - The updated event object.

#### Delete Event {#events-delete}

Deletes a calendar event.

**Method:** `client.events.delete(params)`

<Parameter name="params" type="DeleteEventParams" id="events-delete-params">

<Parameter name="provider" type="string">
Target provider.
</Parameter>

<Parameter name="calendarId" type="string">
ID of the calendar the event belongs to.
</Parameter>

<Parameter name="eventId" type="string">
ID of the event to delete.
</Parameter>

<Parameter name="deleteMode" type="string">
(Optional) For recurring events: `'this'`, `'following'`, or `'all'`.
</Parameter>

</Parameter>

**Returns:** `Promise<void>`
