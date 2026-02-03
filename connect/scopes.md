---
sidebar_position: 3
title: Scopes & Permissions
sidebar_label: Scopes
---

# Scopes & Permissions

Mobiscroll Connect uses a tiered scope system to manage access levels and protect user privacy. When authenticating a user, you define the level of access your application needs.

## Available Scopes

There are three main scopes available, ranging from restricted availability-only access to full read-write capabilities.

| Scope | Read Access | Calendar List | Write Access | Description |
| :--- | :--- | :--- | :--- | :--- |
| **`free-busy`** | ⚠️ Availability Only | ❌ Forbidden (403) | ❌ Denied | **High Privacy.** Only retrieves free/busy slots. Event details are sanitized. |
| **`read`** | ✅ Full Details | ✅ Allowed | ❌ Denied (401) | **Read-Only.** Full access to view events and calendars, but cannot make changes. |
| **`read-write`** | ✅ Full Details | ✅ Allowed | ✅ Allowed | **Full Access.** Can view details, list calendars, and create/update/delete events. *Default* |

### Scope Details

#### `free-busy` (High Privacy)
This scope is designed for privacy-first use cases where you only need to know *when* a user is busy, but not *what* they are doing.

*   **Read Access:** RESTRICTED. You can retrieve availability (free/busy slots).
*   **Event Details:** SANITIZED. Titles, descriptions, and attendees are hidden. Events appear as opaque "Busy" blocks.
*   **Calendar List:** BLOCKED. Calling [`GET /calendars`](./api/calendars.md#endpoint-get-calendars) returns `403 Forbidden`.
*   **Write Access:** DENIED. Returns `401 Unauthorized` if attempted.

**Endpoint Behavior Example:**
When calling [`GET /calendars`](./api/calendars.md#endpoint-get-calendars) with `free-busy` scope:

```json
// GET /calendars -> 403 Forbidden
{
  "error": "Calendar list access is forbidden for free-busy scope"
}
```

:::warning Developer Action
The user interface must handle this restriction by skipping the calendar list fetch or hiding calendar selection when the user connects with `free-busy` scope.
:::

#### `read` (Read-Only)
This scope allows full visibility into the user's schedule without the risk of accidental modification.

*   **Read Access:** FULL. Can read all event details (titles, descriptions, attendees, etc.).
*   **Calendar List:** ALLOWED. Can list all available calendars.
*   **Write Access:** DENIED. Returns `401 Unauthorized` if attempted.

**Endpoint Behavior Example:**
When attempting to [create an event](./api/events.md#endpoint-create-event) with `read` scope:

```json
// POST /event -> 401 Unauthorized
{
  "error": "Unauthorized",
  "message": "Write access denied for current scope"
}
```

#### `read-write` (Full Access)
This is the default scope if none is specified. It provides complete control over the user's calendar.

*   **Read Access:** FULL.
*   **Calendar List:** ALLOWED.
*   **Write Access:** ALLOWED. Can create, update, and delete events.

## Access Escalation

You can upgrade an existing connection to a higher scope (e.g., from `free-busy` to `read-write`) if the user enables features that require more permissions.

### Workflow
1.  **Initiate new Auth Flow:** Redirect the user to the [authorization endpoint](./api/oauth.md#endpoint-authorize) with the new `scope` query parameter.
    *   Example: `?scope=read-write` or `?scope=read`
2.  **User Consent:** The provider (Google, Outlook, etc.) will present the consent screen again, asking the user to approve the additional access.
3.  **Token Update:** Connect handles the incremental authorization internally. The existing user connection is updated with the new permissions.

:::tip Best Practice
Start with `free-busy` or `read` to build trust, and only request `read-write` when the user explicitly enables features that require it (like 'Add to Calendar').
:::
