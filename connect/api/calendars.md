import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Calendars API

## List Calendars {#endpoint-get-calendars}

Retrieves all calendar lists from all connected providers (Google Calendar, Microsoft Outlook, Apple Calendar) for the authenticated user.

Fetches the list of calendars from all connected calendar providers and returns a unified array of calendars across all providers with provider-specific metadata including timezone, color, and access role information.

**Endpoint:** `GET /calendars`

### Response

#### calendars {#calendars-response}

*Array&lt;Calendar&gt;*

Array of calendar objects from all connected providers. Each Calendar object contains:

- `provider`: *string* - Provider name: `'google'`, `'microsoft'`, or `'apple'`
- `id`: *string* - Unique calendar identifier from the provider
- `title`: *string* - Display name of the calendar
- `timeZone`: *string* - Calendar timezone (e.g., "America/New_York")
- `color`: *string* - Calendar color code
- `description`: *string* - Calendar description
- `original`: *object* - Original calendar object from the provider

### Error Responses

- **401** - Unauthorized. Invalid or missing bearer token
- **500** - Internal Server Error. Provider error or unexpected failure

### Examples

<Tabs>
<TabItem value="api" label="API">

```bash title="Fetch all calendars for authenticated user"
GET /calendars
```

</TabItem>
<TabItem value="sdk" label="Node.js SDK">

```typescript
const calendars = await client.calendars.list();
```

</TabItem>
</Tabs>

```json title="Response"
[
  {
    "id": "work@company.com",
    "title": "My Calendar",
    "provider": "google",
    "timeZone": "America/Los_Angeles",
    "color": "#9fc6e7",
    "description": "Work calendar"
  },
  {
    "id": "AAMkAGI2T...",
    "title": "Work Calendar",
    "provider": "microsoft",
    "timeZone": "UTC",
    "description": ""
  },
  {
    "id": "E2857962-EE43-4E90-829C-A826D534C0D9",
    "title": "Personal",
    "provider": "apple",
    "timeZone": "America/New_York",
    "description": "Personal events"
  }
]
```

:::info
- No query parameters are required for this endpoint
- The endpoint returns calendars from all connected providers in a single response
- Each calendar includes provider-specific metadata where available
- The `projectId` is automatically retrieved from the user's session cookies
:::
