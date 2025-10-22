# Calendars API

## GET /calendars {#endpoint-get-calendars}

Retrieves all calendar lists from all connected providers (Google Calendar, Microsoft Outlook, Apple Calendar) for the authenticated user.

Fetches the list of calendars from all connected calendar providers and returns a unified array of calendars across all providers with provider-specific metadata including timezone, color, and access role information.

## Response

### calendars {#calendars-response}

*Array&lt;Calendar&gt;*

Array of calendar objects from all providers. Each Calendar object contains:

- `provider`: _string_ - Provider name: `'google'`, `'microsoft'`, or `'apple'`
- `id`: _string_ - Unique calendar identifier from the provider
- `title`: _string_ - Display name of the calendar
- `timeZone`: _string_ - Calendar timezone (e.g., "America/New_York")
- `color`: _string_ - Calendar color code
- `description`: _string_ - Calendar description
- `original`: _object_ - Original calendar object from the provider

## Error Responses

- **401** - Unauthorized. Invalid or missing bearer token
- **500** - Internal Server Error. Provider error or unexpected failure

## Examples

```bash title="Fetch all calendars for authenticated user"
GET /calendars
```

```json title="Response"
[
  {
    "id": "work@company.com",
    "name": "My Calendar",
    "provider": "google",
    "timezone": "America/Los_Angeles",
    "color": "#9fc6e7",
    "accessRole": "owner"
  },
  {
    "id": "AAMkAGI2T...",
    "name": "Work Calendar",
    "provider": "microsoft",
    "timezone": "UTC",
    "accessRole": "owner"
  },
  {
    "id": "E2857962-EE43-4E90-829C-A826D534C0D9",
    "name": "Personal",
    "provider": "apple",
    "timezone": "America/New_York"
  }
]
```

:::info
- No query parameters are required for this endpoint
- The endpoint returns calendars from all connected providers in a single response
- Each calendar includes provider-specific metadata where available
- The `projectId` is automatically retrieved from the user's session cookies
:::
