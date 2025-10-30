# Events API

## List Events {#endpoint-get-events}

Retrieves calendar events from all connected providers (Google Calendar, Microsoft Outlook, Apple Calendar) for the authenticated user.

Fetches events from multiple calendar providers simultaneously with support for pagination, filtering by date range and specific calendars, and handling of recurring events. Returns chronologically sorted events across all providers with "load more" functionality using paging tokens.

**Endpoint:** `GET /events`

### Request Parameters

#### pageSize {#param-pageSize}

*number*

Number of events to fetch per request. Maximum value is capped at 1000.

**Default value**: `250`

#### start {#param-start}

*string*

ISO date string to filter events starting from this date. Date strings are automatically normalized to handle malformed ISO 8601 formats.

**Default value**: `undefined`

#### end {#param-end}

*string*

ISO date string to filter events ending before this date. Date strings are automatically normalized to handle malformed ISO 8601 formats.

**Default value**: `undefined`

#### calendarIds {#param-calendarIds}

*string*

JSON stringified array of calendar IDs to fetch events from. If not provided, events from all calendars will be fetched.

```js title="Example"
'["personal@gmail.com", "work@company.com"]'
```

**Default value**: `undefined`

#### paging {#param-paging}

*string*

Base64 encoded JSON pagination state object containing token information for each provider (Google, Microsoft, Apple). This parameter should be passed as-is from the previous response when loading more events.

**Default value**: `undefined`

#### singleEvents {#param-singleEvents}

*boolean*

Controls how recurring events are returned:

- `true` - Expands recurring events into individual instances within the specified time range
- `false` - Returns only the master recurring event (series definition) without individual occurrences

**Default value**: `true`

### Response

#### events {#response-events}

_Array&lt;CalendarEvent&gt;_

Array of calendar events from all providers, sorted chronologically by start time. Each CalendarEvent object contains:

- `provider`: *string* - Provider name: `'google'`, `'microsoft'`, or `'apple'`
- `id`: *string* - Event ID
- `title`: *string* - Event title/summary
- `start`: *Date* - Event start date/time
- `end`: *Date* - Event end date/time
- `allDay`: *boolean* - True if all-day event
- `recurringEventId`: *string* - ID of the recurring event series (if this is an instance of a recurring event) (optional)
- `color`: *object* - Event color information (optional)
  - `background`: *string* - Background color
  - `foreground`: *string* - Foreground/text color
- `original`: *object* - Original event object from the provider

#### pageSize {#response-pageSize}

*number*

Number of events per page.

#### paging {#response-paging}

*string*

Base64 encoded pagination state for the next request. Pass this value as the [paging](#param-paging) parameter when loading more events. Only included in the response if more events are available.

#### isMore {#response-isMore}

*boolean*

True if more events are available to load from any provider.

### Error Responses

- **400** - Bad Request. Invalid paging parameters
- **401** - Unauthorized. Invalid or missing bearer token
- **500** - Internal Server Error. Provider error or unexpected failure

### Examples

```bash title="Fetch initial events with date range filter"
GET /events?pageSize=50&start=2025-10-01T00:00:00Z&end=2025-10-31T23:59:59Z
```

```json title="Response"
{
  "events": [
    {
      "id": "event123",
      "calendarId": "primary",
      "title": "Team Meeting",
      "start": "2025-10-15T10:00:00Z",
      "end": "2025-10-15T11:00:00Z",
      "provider": "google",
      "allDay": false
    }
  ],
  "pageSize": 50,
  "paging": "eyJnb29nbGUiOnsidG9rZW4iOnsiY2FsMTIzIjp7Im5leHRQYWdlVG9rZW4iOiJhYmMifX0sImlzRGVwbGV0ZWQiOmZhbHNlfX0=",
  "isMore": true
}
```

```bash title="Load more events using paging token"
GET /events?pageSize=50&paging=eyJnb29nbGUiOnsidG9rZW4iOnsiY2FsMTIzIjp7Im5leHRQYWdlVG9rZW4iOiJhYmMifX0sImlzRGVwbGV0ZWQiOmZhbHNlfX0=
```

```bash title="Filter by specific calendars"
GET /events?pageSize=25&calendarIds=["personal@gmail.com","work@company.com"]
```

```bash title="Get recurring event series masters (not expanded)"
GET /events?pageSize=50&singleEvents=false
```

:::info
- Events are sorted chronologically by start time across all providers
- The `pageSize` is distributed across all active providers (not per provider)
- Maximum `pageSize` is capped at 1000 events
- The `paging` token is Base64 encoded and should be passed as-is to subsequent requests
- Each provider (Google, Microsoft, Apple) tracks its own pagination state independently
- The `paging` parameter is only included in the response when `isMore` is `true`
- Date strings are automatically normalized to handle malformed ISO 8601 formats before parsing
:::

---

## Create Event {#endpoint-create-event}

Creates a new calendar event in the specified calendar for the authenticated user.

Supports creating single events or recurring events with recurrence rules. The event is created in the provider's calendar system (Google Calendar, Microsoft Outlook, or Apple Calendar) based on the calendar ID.

**Endpoint:** `POST /{provider}-event`

**Path Parameters:**
- `provider`: *string* - One of: `google`, `microsoft`, or `apple`

### Request Body

#### calendarId {#create-calendarId}

*string*

The calendar identifier where the event will be created. **Required**

#### title {#create-title}

*string*

The event title/summary. **Required**

#### start {#create-start}

*string*

ISO date string for the event start time. **Required**

#### end {#create-end}

*string*

ISO date string for the event end time. **Required**

#### description {#create-description}

*string*

Event description or notes.

**Default value**: `undefined`

#### location {#create-location}

*string*

Event location (address, meeting room, etc.).

**Default value**: `undefined`

#### allDay {#create-allDay}

*boolean*

Whether this is an all-day event.

**Default value**: `false`

#### recurrence {#create-recurrence}

*object*

Recurrence rule for creating a recurring event series. Object with the following properties:

- `frequency`: *string* - Recurrence frequency: `'DAILY'`, `'WEEKLY'`, `'MONTHLY'`, or `'YEARLY'` **Required**
- `interval`: *number* - Interval between occurrences (e.g., 2 for every 2 weeks)
- `count`: *number* - Number of occurrences (mutually exclusive with `until`)
- `until`: *string* - End date in format `YYYYMMDDTHHMMSSZ` (mutually exclusive with `count`)
- `byDay`: *string[]* - Array of weekday codes: `['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']`

**Default value**: `undefined`

### Response

#### success {#create-response-success}

*boolean*

Indicates whether the event was created successfully.

#### event {#create-response-event}

*object*

The created event object from the provider (Google, Microsoft, or Apple format).

#### message {#create-response-message}

*string*

Error or status message (included on failure).

### Error Responses

- **400** - Bad Request. Invalid event data or missing required fields
- **401** - Unauthorized. Invalid or missing bearer token
- **404** - Not Found. Calendar not found
- **500** - Internal Server Error. Provider error or unexpected failure

### Examples

```bash title="Create a simple event"
POST /google-event
Content-Type: application/json
```

```json
{
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
  "event": {
    "id": "event123abc",
    "summary": "Team Meeting",
    "start": { "dateTime": "2025-11-01T10:00:00Z" },
    "end": { "dateTime": "2025-11-01T11:00:00Z" }
  }
}
```

```bash title="Create a recurring event"
POST /microsoft-event
Content-Type: application/json
```

```json
{
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
POST /apple-event
Content-Type: application/json
```

```json
{
  "calendarId": "https://caldav.icloud.com/.../calendars/...",
  "title": "Conference",
  "start": "2025-11-15T00:00:00Z",
  "end": "2025-11-16T00:00:00Z",
  "allDay": true,
  "description": "Annual tech conference"
}
```

:::info
- The `provider` in the URL path must match the calendar provider of the `calendarId`
- For recurring events, either `count` or `until` can be specified, but not both
- The `byDay` property is typically used with `WEEKLY` frequency
- All-day events should have start and end times at midnight (00:00:00)
- The response `event` object format varies by provider (Google, Microsoft, Apple)
:::

---

## Update Event {#endpoint-update-event}

Updates an existing calendar event.

Supports updating single events, recurring event series, or individual instances of recurring events. For recurring events, you can specify whether to update only the current instance, all following instances, or the entire series.

**Endpoint:** `PUT /{provider}-event`

**Path Parameters:**
- `provider`: *string* - One of: `google`, `microsoft`, or `apple`

### Request Body

#### eventId {#update-eventId}

*string*

The event identifier to update. **Required**

#### calendarId {#update-calendarId}

*string*

The calendar identifier containing the event. **Required**

#### recurringEventId {#update-recurringEventId}

*string*

The ID of the recurring event series. Required when updating an instance of a recurring event.

**Default value**: `undefined`

#### updateMode {#update-updateMode}

*string*

Controls which events in a recurring series are updated:

- `'this'` - Update only this specific instance
- `'following'` - Update this and all following instances
- `'all'` - Update all instances in the series

Only applicable for recurring events. If not specified, updates the single event or series master.

**Default value**: `undefined`

#### title {#update-title}

*string*

The event title/summary.

#### start {#update-start}

*string*

ISO date string for the event start time.

#### end {#update-end}

*string*

ISO date string for the event end time.

#### description {#update-description}

*string*

Event description or notes.

#### location {#update-location}

*string*

Event location.

#### allDay {#update-allDay}

*boolean*

Whether this is an all-day event.

#### recurrence {#update-recurrence}

*object*

Recurrence rule for updating recurring event properties. Same structure as [create recurrence](#create-recurrence).

### Response

Same structure as [Create Event response](#create-response-success).

#### success {#update-response-success}

*boolean*

Indicates whether the event was updated successfully.

#### event {#update-response-event}

*object*

The updated event object from the provider.

#### message {#update-response-message}

*string*

Error or status message (included on failure).

### Error Responses

- **400** - Bad Request. Invalid event data or missing required fields
- **401** - Unauthorized. Invalid or missing bearer token
- **404** - Not Found. Event or calendar not found
- **500** - Internal Server Error. Provider error or unexpected failure

### Examples

```bash title="Update a simple event"
PUT /google-event
Content-Type: application/json
```

```json
{
  "eventId": "event123abc",
  "calendarId": "primary",
  "title": "Updated Team Meeting",
  "start": "2025-11-01T14:00:00Z",
  "end": "2025-11-01T15:00:00Z"
}
```

```bash title="Update a single instance of a recurring event"
PUT /microsoft-event
Content-Type: application/json
```

```json
{
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
PUT /apple-event
Content-Type: application/json
```

```json
{
  "eventId": "recurring-event-id",
  "calendarId": "https://caldav.icloud.com/.../calendars/...",
  "updateMode": "following",
  "location": "New Conference Room B"
}
```

:::info
- The `eventId` is required to identify which event to update
- For recurring events, use `recurringEventId` and `updateMode` to control update scope
- Only include fields you want to update; omitted fields remain unchanged
- When using `updateMode: 'this'` on a recurring event, a new exception instance may be created
- The `updateMode` parameter behavior may vary slightly between providers
:::

---

## Delete Event {#endpoint-delete-event}

Deletes a calendar event.

Supports deleting single events, recurring event series, or individual instances of recurring events. For recurring events, you can specify whether to delete only the current instance, all following instances, or the entire series.

**Endpoint:** `DELETE /{provider}-event`

**Path Parameters:**
- `provider`: *string* - One of: `google`, `microsoft`, or `apple`

### Request Body

#### eventId {#delete-eventId}

*string*

The event identifier to delete. **Required**

#### calendarId {#delete-calendarId}

*string*

The calendar identifier containing the event. **Required**

#### recurringEventId {#delete-recurringEventId}

*string*

The ID of the recurring event series. Required when deleting an instance of a recurring event.

**Default value**: `undefined`

#### deleteMode {#delete-deleteMode}

*string*

Controls which events in a recurring series are deleted:

- `'this'` - Delete only this specific instance
- `'following'` - Delete this and all following instances
- `'all'` - Delete all instances in the series

Only applicable for recurring events. If not specified, deletes the single event or entire series.

**Default value**: `undefined`

### Response

#### success {#delete-response-success}

*boolean*

Indicates whether the event was deleted successfully.

#### message {#delete-response-message}

*string*

Confirmation or error message.

### Error Responses

- **400** - Bad Request. Invalid request data or missing required fields
- **401** - Unauthorized. Invalid or missing bearer token
- **404** - Not Found. Event or calendar not found
- **500** - Internal Server Error. Provider error or unexpected failure

### Examples

```bash title="Delete a simple event"
DELETE /google-event
Content-Type: application/json
```

```json
{
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
DELETE /microsoft-event
Content-Type: application/json
```

```json
{
  "eventId": "instance456",
  "recurringEventId": "series123",
  "calendarId": "AAMkAGVmMDEz...",
  "deleteMode": "this"
}
```

```bash title="Delete entire recurring series"
DELETE /apple-event
Content-Type: application/json
```

```json
{
  "eventId": "recurring-event-id",
  "calendarId": "https://caldav.icloud.com/.../calendars/...",
  "deleteMode": "all"
}
```

:::info
- Both `eventId` and `calendarId` are required for deletion
- For recurring events, use `recurringEventId` and `deleteMode` to control deletion scope
- Deleting with `deleteMode: 'this'` creates an exception (cancelled instance) in the series
- Deleting with `deleteMode: 'all'` removes the entire recurring series
- Deleted events cannot be recovered through the API
- The `deleteMode` parameter behavior may vary slightly between providers
:::
