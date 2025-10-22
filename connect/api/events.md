# Events API

## GET /events {#endpoint-get-events}

Retrieves calendar events from all connected providers (Google Calendar, Microsoft Outlook, Apple Calendar) for the authenticated user.

Fetches events from multiple calendar providers simultaneously with support for pagination, filtering by date range and specific calendars, and handling of recurring events. Returns chronologically sorted events across all providers with "load more" functionality using paging tokens.

### pageSize {#param-pageSize}

*number*

Number of events to fetch per request.

**Default value**: `250`

### page {#param-page}

*number*

Page number for pagination.

**Default value**: `1`

### filters {#param-filters}

*string*

JSON stringified filter object with the following properties:

- `start`: *string* - ISO date string. Events starting from this date
- `end`: *string* - ISO date string. Events ending before this date
- `calendarIds`: _string[]_ - Array of calendar IDs to fetch from (_default_: all calendars)

```js title="Example filter"
{
  "start": "2025-10-01T00:00:00Z",
  "end": "2025-10-31T23:59:59Z",
  "calendarIds": ["personal@gmail.com", "work@company.com"]
}
```

**Default value**: `undefined`

### paging {#param-paging}

*string*

Base64 encoded JSON pagination state object.
This parameter should be passed as-is from the previous response when loading more events.

**Default value**: `undefined`

### isLoadMore {#param-isLoadMore}

*boolean*

Set to `true` when loading more events. Requires the [paging](#param-paging) parameter to be provided.

**Default value**: `false`

### singleEvents {#param-singleEvents}

*boolean*

Controls how recurring events are returned:

- `true` - Expands recurring events into individual instances within the specified time range
- `false` - Returns only the master recurring event (series definition) without individual occurrences

**Default value**: `true`

## Response

### events {#response-events}

_Array&lt;CalendarEvent&gt;_

Array of calendar events from all providers, sorted by start time. Each CalendarEvent object contains:

- `provider`: *string* - Provider name: `'google'`, `'microsoft'`, or `'apple'`
- `id`: *string* - Event ID
- `title`: *string* - Event title/summary
- `start`: _Date_ - Event start date/time
- `end`: _Date_ - Event end date/time
- `allDay`: *boolean* - True if all-day event
- `recurringEventId`: *string* - ID of the recurring event series (if this is an instance of a recurring event) (optional)
- `color`: _object_ - Event color information (optional)
  - `background`: *string* - Background color
  - `foreground`: *string* - Foreground/text color
- `original`: _object_ - Original event object from the provider

### page {#response-page}

*number*

Current page number.

### pageSize {#response-pageSize}

*number*

Number of events per page.

### paging {#response-paging}

*string*

Base64 encoded pagination state for the next request. Pass this value as the [paging](#param-paging) parameter when loading more events.

### isMore {#response-isMore}

*boolean*

True if more events are available to load.

## Error Responses

- **400** - Bad Request. Invalid paging parameters or `isLoadMore` without paging
- **401** - Unauthorized. Invalid or missing bearer token
- **500** - Internal Server Error. Provider error or unexpected failure

## Examples

```bash title="Fetch initial events with date range filter"
GET /events?pageSize=50&filters={"start":"2025-10-01T00:00:00Z","end":"2025-10-31T23:59:59Z"}
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
      "provider": "google"
    }
  ],
  "page": 1,
  "pageSize": 50,
  "paging": "eyJnb29nbGUiOnsidG9rZW4iOnsiY2FsMTIzIjp7Im5leHRQYWdlVG9rZW4iOiJhYmMifX0sImlzRGVwbGV0ZWQiOmZhbHNlfX0=",
  "isMore": true
}
```

```bash title="Load more events using paging token"
GET /events?pageSize=50&isLoadMore=true&paging=eyJnb29nbGUiOnsidG9rZW4iOnsiY2FsMTIzIjp7Im5leHRQYWdlVG9rZW4iOiJhYmMifX0sImlzRGVwbGV0ZWQiOmZhbHNlfX0=
```

```bash title="Filter by specific calendars"
GET /events?pageSize=25&filters={"calendarIds":["personal@gmail.com","work@company.com"]}
```

```bash title="Get recurring event series masters (not expanded)"
GET /events?pageSize=50&singleEvents=false
```

:::info
- Events are sorted chronologically by start time across all providers
- The `pageSize` is distributed across all active providers (not per provider)
- Maximum `pageSize` is capped at 1000 events
- The `paging` token is Base64 encoded and should be passed as-is to subsequent requests
- Each provider tracks its own pagination state independently
:::
