---
sidebar_position: 4
sidebar_label: Events API
slug: /events
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Parameter } from '@site/src/components/Connect';

# Events API

## List Events {#endpoint-get-events}

Retrieves calendar events from all connected providers (Google Calendar, Microsoft Outlook, Apple Calendar) for the authenticated user.

Fetches events from multiple calendar providers simultaneously with support for pagination, filtering by date range and specific calendars, and handling of recurring events. Returns chronologically sorted events across all providers with "load more" functionality using nextPageToken tokens.

**Endpoint:** `GET /events`

### Request Parameters

<Parameter name="pageSize" type="number" defaultValue={<code>250</code>} id="param-pageSize">
Number of events to fetch per request. Maximum value is capped at 1000.
</Parameter>

<Parameter name="start" type="string" defaultValue="First day of the current month at 00:00:00 UTC" id="param-start">
ISO date string to filter events starting from this date. Date strings are automatically normalized to handle malformed ISO 8601 formats.
</Parameter>

<Parameter name="end" type="string" defaultValue="Last day of the current month at 23:59:59 UTC" id="param-end">
ISO date string to filter events ending before this date. Date strings are automatically normalized to handle malformed ISO 8601 formats.
</Parameter>

<Parameter name="calendarIds" type="string" defaultValue={<code>undefined</code>} id="param-calendarIds">
JSON stringified array of calendar IDs to fetch events from. If not provided, events from all calendars will be fetched.

Calendar IDs that are not associated with the authenticated user's connected accounts will be silently ignored.

```js title="Example"
'["personal@gmail.com", "work@company.com"]'
```

</Parameter>

<Parameter name="nextPageToken" type="string" defaultValue={<code>undefined</code>} id="param-nextPageToken">
Base64 encoded JSON pagination state object containing token information for each provider (Google, Microsoft, Apple). This parameter should be passed as-is from the previous response when loading more events.
</Parameter>

<Parameter name="singleEvents" type="boolean" defaultValue={<code>true</code>} id="param-singleEvents">
Controls how recurring events are returned:

- `true` - Expands recurring events into individual instances within the specified time range
- `false` - Returns only the master recurring event (series definition) without individual occurrences

</Parameter>

### Response

<Parameter name="events" type="Array&lt;CalendarEvent&gt;" id="response-events" isObject>
Array of calendar events from all providers, sorted chronologically by start time. Each CalendarEvent object contains:

  <Parameter name="provider" type="string">
  Provider name: `'google'`, `'microsoft'`, or `'apple'`
  </Parameter>

  <Parameter name="id" type="string">
  Event ID
  </Parameter>

  <Parameter name="title" type="string">
  Event title/summary
  </Parameter>

  <Parameter name="start" type="Date">
  Event start date/time
  </Parameter>

  <Parameter name="end" type="Date">
  Event end date/time
  </Parameter>

  <Parameter name="allDay" type="boolean">
  True if all-day event
  </Parameter>

  <Parameter name="recurringEventId" type="string">
  ID of the recurring event series (if this is an instance of a recurring event) (optional)
  </Parameter>

  <Parameter name="color" type="string">
  Event background color (optional)
  </Parameter>

  <Parameter name="location" type="string">
  Event location (optional)
  </Parameter>

  <Parameter name="attendees" type="Array of objects">
  Array of event attendees (optional). Each object contains:

  <Parameter name="email" type="string">
  Attendee email address
  </Parameter>

  <Parameter name="status" type="string">
  Response status: `'accepted'`, `'declined'`, `'tentative'`, or `'none'`
  </Parameter>

  <Parameter name="organizer" type="boolean">
  True if this attendee is the event organizer (optional)
  </Parameter>

</Parameter>

<Parameter name="custom" type="object">
Custom key-value pairs for additional event data (optional)
</Parameter>

<Parameter name="conference" type="string">
Conference meeting link or identifier (optional)
</Parameter>

<Parameter name="availability" type="string">
Event availability: `'busy'` or `'free'` (optional)
</Parameter>

<Parameter name="privacy" type="string">
Event privacy: `'public'`, `'private'`, or `'confidential'` (optional)
</Parameter>

<Parameter name="status" type="string">
Event status: `'confirmed'`, `'tentative'`, or `'cancelled'` (optional)
</Parameter>

<Parameter name="link" type="string">
Public event link (optional)
</Parameter>

<Parameter name="original" type="object">
Original event object from the provider
</Parameter>

</Parameter>

<Parameter name="pageSize" type="number" id="response-pageSize">
Number of events per page.
</Parameter>

<Parameter name="nextPageToken" type="string" id="response-nextPageToken">
Base64 encoded pagination state for the next request. Pass this value as the [nextPageToken](#param-nextPageToken) parameter when loading more events. Only included in the response if more events are available.
</Parameter>

### Error Responses

- **400** - Bad Request. Invalid nextPageToken parameters
- **401** - Unauthorized. Invalid or missing bearer token
- **500** - Internal Server Error. Provider error or unexpected failure

### Examples

<Tabs>
<TabItem value="api" label="REST">

```bash title="Fetch initial events with date range filter"
GET /events?pageSize=50&start=2025-10-01T00:00:00Z&end=2025-10-31T23:59:59Z
```

```json title="Response"
{
  "events": [
    {
      "id": "event123",
      "title": "Team Meeting",
      "start": "2025-10-15T10:00:00Z",
      "end": "2025-10-15T11:00:00Z",
      "provider": "google",
      "allDay": false,
      "location": "Conference Room A",
      "color": "#9fc6e7"
    }
  ],
  "pageSize": 50,
  "nextPageToken": "eyJnb29nbGUiOnsidG9rZW4iOnsiY2FsMTIzIjp7Im5leHRQYWdlVG9rZW4iOiJhYmMifX0sImlzRGVwbGV0ZWQiOmZhbHNlfX0="
}
```

```bash title="Load more events using nextPageToken"
GET /events?pageSize=50&nextPageToken=eyJnb29nbGUiOnsidG9rZW4iOnsiY2FsMTIzIjp7Im5leHRQYWdlVG9rZW4iOiJhYmMifX0sImlzRGVwbGV0ZWQiOmZhbHNlfX0=
```

```bash title="Filter by specific calendars"
GET /events?pageSize=25&calendarIds=["personal@gmail.com","work@company.com"]
```

```bash title="Get recurring event series masters (not expanded)"
GET /events?pageSize=50&singleEvents=false
```

</TabItem>
<TabItem value="sdk" label="Node.js SDK">

```typescript
// Fetch initial events with date range filter
const response = await client.events.list({
  pageSize: 50,
  start: '2025-10-01T00:00:00Z',
  end: '2025-10-31T23:59:59Z'
});
console.log(response.events);

// Load more events using nextPageToken
const nextResponse = await client.events.list({
  pageSize: 50,
  nextPageToken: response.nextPageToken
});

// Filter by specific calendars
const filteredEvents = await client.events.list({
  pageSize: 25,
  calendarIds: ['personal@gmail.com', 'work@company.com']
});

// Get recurring event series masters (not expanded)
const masters = await client.events.list({
  pageSize: 50,
  singleEvents: false
});
```

</TabItem>
</Tabs>

:::info
- Events are sorted chronologically by start time across all providers
- The `pageSize` is distributed across all active providers (not per provider)
- Maximum `pageSize` is capped at 1000 events
- The `nextPageToken` token is Base64 encoded and should be passed as-is to subsequent requests
- Each provider (Google, Microsoft, Apple) tracks its own pagination state independently
- The `nextPageToken` parameter is only included in the response when more events are available
- Date strings are automatically normalized to handle malformed ISO 8601 formats before parsing
- The `color` property contains the background color value directly (not an object)
- All event endpoints return events in the **unified CalendarEvent format** across all providers
:::

---

## Create Event {#endpoint-create-event}

Creates a new calendar event in the specified calendar for the authenticated user.

Supports creating single events or recurring events with recurrence rules. The event is created in the provider's calendar system (Google Calendar, Microsoft Outlook, or Apple Calendar) based on the calendar ID.

**Endpoint:** `POST /event`

### Request Body

<Parameter name="provider" type="string" required id="create-provider">
Calendar provider where the event will be created. One of: `'google'`, `'microsoft'`, or `'apple'`.
</Parameter>

<Parameter name="calendarId" type="string" required id="create-calendarId">
The calendar identifier where the event will be created.
</Parameter>

<Parameter name="title" type="string" required id="create-title">
The event title/summary.
</Parameter>

<Parameter name="start" type="string" required id="create-start">
ISO date string for the event start time.
</Parameter>

<Parameter name="end" type="string" required id="create-end">
ISO date string for the event end time.
</Parameter>

<Parameter name="description" type="string" defaultValue={<code>undefined</code>} id="create-description">
Event description or notes.
</Parameter>

<Parameter name="location" type="string" defaultValue={<code>undefined</code>} id="create-location">
Event location (address, meeting room, etc.).
</Parameter>

<Parameter name="allDay" type="boolean" defaultValue={<code>false</code>} id="create-allDay">
Whether this is an all-day event.
</Parameter>

<Parameter name="attendees" type="string[]" defaultValue={<code>undefined</code>} id="create-attendees">
Array of attendee email addresses.
</Parameter>

<Parameter name="recurrence" type="object" defaultValue={<code>undefined</code>} id="create-recurrence">
Recurrence rule for creating a recurring event series. Object with the following properties:

<Parameter name="frequency" type="string" required>
Recurrence frequency: `'DAILY'`, `'WEEKLY'`, `'MONTHLY'`, or `'YEARLY'`
</Parameter>

<Parameter name="interval" type="number">
Interval between occurrences (e.g., 2 for every 2 weeks)
</Parameter>

<Parameter name="count" type="number">
Number of occurrences (mutually exclusive with `until`)
</Parameter>

<Parameter name="until" type="string">
End date in format `YYYYMMDDTHHMMSSZ` (mutually exclusive with `count`)
</Parameter>

<Parameter name="byDay" type="string[]">
Array of weekday codes: `['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']`
</Parameter>

<Parameter name="byMonthDay" type="number[]">
Array of days of the month (1-31)
</Parameter>

<Parameter name="byMonth" type="number[]">
Array of months (1-12)
</Parameter>

</Parameter>

<Parameter name="custom" type="object" defaultValue={<code>undefined</code>} id="create-custom">
Custom key-value pairs for additional event data.
</Parameter>

<Parameter name="availability" type="string" defaultValue={<code>undefined</code>} id="create-availability">
Event availability: `'free'` or `'busy'`.
</Parameter>

<Parameter name="privacy" type="string" defaultValue={<code>undefined</code>} id="create-privacy">
Event privacy: `'public'`, `'private'`, or `'confidential'`.
</Parameter>

<Parameter name="status" type="string" defaultValue={<code>undefined</code>} id="create-status">
Event status: `'confirmed'`, `'tentative'`, or `'cancelled'`.
</Parameter>

### Response

<Parameter name="success" type="boolean" id="create-response-success">
Indicates whether the event was created successfully.
</Parameter>

<Parameter name="id" type="string" id="create-response-id">
The event ID.
</Parameter>

<Parameter name="title" type="string" id="create-response-title">
The event title.
</Parameter>

<Parameter name="start" type="Date" id="create-response-start">
The event start date/time.
</Parameter>

<Parameter name="end" type="Date" id="create-response-end">
The event end date/time.
</Parameter>

<Parameter name="message" type="string" id="create-response-message">
Error or status message (included on failure).
</Parameter>

:::info
The response includes all properties of the created [CalendarEvent](#response-events) object merged at the root level.
:::

### Error Responses

- **400** - Bad Request. Invalid event data or missing required fields
- **401** - Unauthorized. Invalid or missing bearer token
- **404** - Not Found. Calendar not found
- **500** - Internal Server Error. Provider error or unexpected failure

### Examples

<Tabs>
<TabItem value="api" label="REST">

```bash title="Create a simple event"
POST /event
Content-Type: application/json
```

```json
{
  "provider": "google",
  "calendarId": "primary",
  "title": "Team Meeting",
  "description": "Discuss project updates",
  "start": "2025-11-01T10:00:00Z",
  "end": "2025-11-01T11:00:00Z",
  "location": "Conference Room A"
}
```

```json title="Response"
{
  "success": true,
  "provider": "google",
  "id": "event123abc",
  "title": "Team Meeting",
  "start": "2025-11-01T10:00:00.000Z",
  "end": "2025-11-01T11:00:00.000Z",
  "allDay": false,
  "location": "Conference Room A",
  "attendees": [],
  "color": "#9fc6e7",
  "availability": "busy",
  "privacy": "public",
  "status": "confirmed",
  "link": "https://calendar.google.com/calendar/event?eid=...",
  "original": {
    "kind": "calendar#event",
    "etag": "\"3366428166344000\"",
    "id": "event123abc",
    "summary": "Team Meeting"
    ...
  }
}
```

```bash title="Create a recurring event"
POST /event
Content-Type: application/json
```

```json
{
  "provider": "microsoft",
  "calendarId": "AAMkAGVmMDEz...",
  "title": "Weekly Standup",
  "start": "2025-11-01T09:00:00Z",
  "end": "2025-11-01T09:30:00Z",
  "allDay": false,
  "recurrence": {
    "frequency": "WEEKLY",
    "interval": 1,
    "count": 10,
    "byDay": ["MO", "WE", "FR"]
  }
}
```

```bash title="Create an all-day event"
POST /event
Content-Type: application/json
```

```json
{
  "provider": "apple",
  "calendarId": "https://caldav.icloud.com/.../calendars/...",
  "title": "Conference",
  "start": "2025-11-15T00:00:00Z",
  "end": "2025-11-16T00:00:00Z",
  "allDay": true,
  "description": "Annual tech conference"
}
```

</TabItem>
<TabItem value="sdk" label="Node.js SDK">

```typescript
// Create a simple event
const event = await client.events.create({
  provider: 'google',
  calendarId: 'primary',
  title: 'Team Meeting',
  description: 'Discuss project updates',
  start: '2025-11-01T10:00:00Z',
  end: '2025-11-01T11:00:00Z',
  location: 'Conference Room A'
});

// Create a recurring event
const recurringEvent = await client.events.create({
  provider: 'microsoft',
  calendarId: 'AAMkAGVmMDEz...',
  title: 'Weekly Standup',
  start: '2025-11-01T09:00:00Z',
  end: '2025-11-01T09:30:00Z',
  allDay: false,
  recurrence: {
    frequency: 'WEEKLY',
    interval: 1,
    count: 10,
    byDay: ['MO', 'WE', 'FR']
  }
});

// Create an all-day event
const allDayEvent = await client.events.create({
  provider: 'apple',
  calendarId: 'https://caldav.icloud.com/.../calendars/...',
  title: 'Conference',
  start: '2025-11-15T00:00:00Z',
  end: '2025-11-16T00:00:00Z',
  allDay: true,
  description: 'Annual tech conference'
});
```

</TabItem>
</Tabs>

:::info
- The `provider` parameter must match the calendar provider of the `calendarId`
- For recurring events, either `count` or `until` can be specified, but not both
- The `byDay` property is typically used with `WEEKLY` frequency
- All-day events should have start and end times at midnight (00:00:00)
- The response `event` object format varies by provider (Google, Microsoft, Apple)
:::

---

## Update Event {#endpoint-update-event}

Updates an existing calendar event.

Supports updating single events, recurring event series, or individual instances of recurring events. For recurring events, you can specify whether to update only the current instance, all following instances, or the entire series.

**Endpoint:** `PUT /event`

### Request Body

<Parameter name="provider" type="string" required id="update-provider">
Calendar provider where the event exists. One of: `'google'`, `'microsoft'`, or `'apple'`.
</Parameter>

<Parameter name="eventId" type="string" required id="update-eventId">
The event identifier to update.
</Parameter>

<Parameter name="calendarId" type="string" required id="update-calendarId">
The calendar identifier containing the event.
</Parameter>

<Parameter name="recurringEventId" type="string" defaultValue={<code>undefined</code>} id="update-recurringEventId">
The ID of the recurring event series. Required when updating an instance of a recurring event.
</Parameter>

<Parameter name="updateMode" type="string" defaultValue={<code>undefined</code>} id="update-updateMode">
Controls which events in a recurring series are updated:

- `'this'` - Update only this specific instance
- `'following'` - Update this and all following instances
- `'all'` - Update all instances in the series

Only applicable for recurring events. If not specified, updates the single event or series master.
</Parameter>

<Parameter name="title" type="string" id="update-title">
The event title/summary.
</Parameter>

<Parameter name="start" type="string" id="update-start">
ISO date string for the event start time.
</Parameter>

<Parameter name="end" type="string" id="update-end">
ISO date string for the event end time.
</Parameter>

<Parameter name="description" type="string" id="update-description">
Event description or notes.
</Parameter>

<Parameter name="location" type="string" id="update-location">
Event location.
</Parameter>

<Parameter name="allDay" type="boolean" id="update-allDay">
Whether this is an all-day event.
</Parameter>

<Parameter name="attendees" type="string[]" id="update-attendees">
Array of attendee email addresses.
</Parameter>

<Parameter name="custom" type="object" id="update-custom">
Custom key-value pairs for additional event data.
</Parameter>

<Parameter name="availability" type="string" id="update-availability">
Event availability: `'free'` or `'busy'`.
</Parameter>

<Parameter name="privacy" type="string" id="update-privacy">
Event privacy: `'public'`, `'private'`, or `'confidential'`.
</Parameter>

<Parameter name="status" type="string" id="update-status">
Event status: `'confirmed'`, `'tentative'`, or `'cancelled'`.
</Parameter>

<Parameter name="recurrence" type="object" id="update-recurrence">
Recurrence rule for updating recurring event properties. Same structure as [create recurrence](#create-recurrence).
</Parameter>

### Response

Same structure as [Create Event response](#create-response-success).

<Parameter name="success" type="boolean" id="update-response-success">
Indicates whether the event was updated successfully.
</Parameter>

<Parameter name="message" type="string" id="update-response-message">
Error or status message (included on failure).
</Parameter>

:::info
The response includes all properties of the updated [CalendarEvent](#response-events) object merged at the root level.
:::

### Error Responses

- **400** - Bad Request. Invalid event data or missing required fields
- **401** - Unauthorized. Invalid or missing bearer token
- **404** - Not Found. Event or calendar not found
- **500** - Internal Server Error. Provider error or unexpected failure

### Examples

<Tabs>
<TabItem value="api" label="REST">

```bash title="Update a simple event"
PUT /event
Content-Type: application/json
```

```json
{
  "provider": "google",
  "eventId": "event123abc",
  "calendarId": "primary",
  "title": "Updated Team Meeting",
  "start": "2025-11-01T14:00:00Z",
  "end": "2025-11-01T15:00:00Z"
}
```

```bash title="Update a single instance of a recurring event"
PUT /event
Content-Type: application/json
```

```json
{
  "provider": "microsoft",
  "eventId": "instance456",
  "recurringEventId": "series123",
  "calendarId": "AAMkAGVmMDEz...",
  "updateMode": "this",
  "title": "Standup - Special Topic Today",
  "start": "2025-11-01T09:00:00Z",
  "end": "2025-11-01T10:00:00Z"
}
```

```bash title="Update all future occurrences"
PUT /event
Content-Type: application/json
```

```json
{
  "provider": "apple",
  "eventId": "recurring-event-id",
  "calendarId": "https://caldav.icloud.com/.../calendars/...",
  "updateMode": "following",
  "location": "New Conference Room B"
}
```

</TabItem>
<TabItem value="sdk" label="Node.js SDK">

```typescript
// Update a simple event
const updatedEvent = await client.events.update({
  provider: 'google',
  calendarId: 'primary',
  eventId: 'event123abc',
  title: 'Updated Team Meeting',
  start: '2025-11-01T14:00:00Z',
  end: '2025-11-01T15:00:00Z'
});

// Update a single instance of a recurring event
const updatedInstance = await client.events.update({
  provider: 'microsoft',
  eventId: 'instance456',
  recurringEventId: 'series123',
  calendarId: 'AAMkAGVmMDEz...',
  updateMode: 'this',
  title: 'Standup - Special Topic Today',
  start: '2025-11-01T09:00:00Z',
  end: '2025-11-01T10:00:00Z'
});

// Update all future occurrences
const updatedFuture = await client.events.update({
  provider: 'apple',
  eventId: 'recurring-event-id',
  calendarId: 'https://caldav.icloud.com/.../calendars/...',
  updateMode: 'following',
  location: 'New Conference Room B'
});
```

</TabItem>
</Tabs>

:::info
- The `provider` parameter must match the calendar provider where the event exists
- For recurring events, use `recurringEventId` and `updateMode` to control update scope
- Only include fields you want to update; omitted fields remain unchanged
- When using `updateMode: 'this'` on a recurring event, a new exception instance may be created
- The `updateMode` parameter behavior may vary slightly between providers
:::

---

## Delete Event {#endpoint-delete-event}

Deletes a calendar event.

Supports deleting single events, recurring event series, or individual instances of recurring events. For recurring events, you can specify whether to delete only the current instance, all following instances, or the entire series.

**Endpoint:** `DELETE /event`

### Request Body

<Parameter name="provider" type="string" required id="delete-provider">
Calendar provider where the event exists. One of: `'google'`, `'microsoft'`, or `'apple'`.
</Parameter>

<Parameter name="eventId" type="string" required id="delete-eventId">
The event identifier to delete.
</Parameter>

<Parameter name="calendarId" type="string" required id="delete-calendarId">
The calendar identifier containing the event.
</Parameter>

<Parameter name="recurringEventId" type="string" defaultValue={<code>undefined</code>} id="delete-recurringEventId">
The ID of the recurring event series. Required when deleting an instance of a recurring event.
</Parameter>

<Parameter name="deleteMode" type="string" defaultValue={<code>undefined</code>} id="delete-deleteMode">
Controls which events in a recurring series are deleted:

- `'this'` - Delete only this specific instance
- `'following'` - Delete this and all following instances
- `'all'` - Delete all instances in the series

Only applicable for recurring events. If not specified, deletes the single event or entire series.
</Parameter>

### Response

<Parameter name="success" type="boolean" id="delete-response-success">
Indicates whether the event was deleted successfully.
</Parameter>

<Parameter name="message" type="string" id="delete-response-message">
Confirmation or error message.
</Parameter>

### Error Responses

- **400** - Bad Request. Invalid request data or missing required fields
- **401** - Unauthorized. Invalid or missing bearer token
- **404** - Not Found. Event or calendar not found
- **500** - Internal Server Error. Provider error or unexpected failure

### Examples

<Tabs>
<TabItem value="api" label="REST">

```bash title="Delete a simple event"
DELETE /event
Content-Type: application/json
```

```json
{
  "provider": "google",
  "eventId": "event123abc",
  "calendarId": "primary"
}
```

```json title="Response"
{
  "success": true,
  "message": "Event deleted successfully"
}
```

```bash title="Delete a single instance of a recurring event"
DELETE /event
Content-Type: application/json
```

```json
{
  "provider": "microsoft",
  "eventId": "instance456",
  "recurringEventId": "series123",
  "calendarId": "AAMkAGVmMDEz...",
  "deleteMode": "this"
}
```

```bash title="Delete entire recurring series"
DELETE /event
Content-Type: application/json
```

```json
{
  "provider": "apple",
  "eventId": "recurring-event-id",
  "calendarId": "https://caldav.icloud.com/.../calendars/...",
  "deleteMode": "all"
}
```

</TabItem>
<TabItem value="sdk" label="Node.js SDK">

```typescript
// Delete a simple event
await client.events.delete({
  provider: 'google',
  calendarId: 'primary',
  eventId: 'event123abc'
});

// Delete a single instance of a recurring event
await client.events.delete({
  provider: 'microsoft',
  calendarId: 'AAMkAGVmMDEz...',
  eventId: 'instance456',
  recurringEventId: 'series123',
  deleteMode: 'this'
});

// Delete entire recurring series
await client.events.delete({
  provider: 'apple',
  calendarId: 'https://caldav.icloud.com/.../calendars/...',
  eventId: 'recurring-event-id',
  deleteMode: 'all'
});
```

</TabItem>
</Tabs>

:::info
- The `provider` parameter must match the calendar provider where the event exists
- For recurring events, use `recurringEventId` and `deleteMode` to control deletion scope
- Deleting with `deleteMode: 'this'` creates an exception (cancelled instance) in the series
- Deleting with `deleteMode: 'all'` removes the entire recurring series
- Deleted events cannot be recovered through the API
- The `deleteMode` parameter behavior may vary slightly between providers
:::
