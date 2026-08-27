---
sidebar_position: 1
slug: /scopes
title: Scopes & Permissions
sidebar_label: Scopes
description: Mobiscroll Connect permission scopes — free-busy, read, and read-write access levels for controlling calendar data visibility.
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
*   **Calendar List:** BLOCKED. Calling [`GET /calendars`](../api/calendars.md#endpoint-get-calendars) returns `403 Forbidden`.
*   **Write Access:** DENIED. Returns `401 Unauthorized` if attempted.

**Endpoint Behavior Example:**
When calling [`GET /calendars`](../api/calendars.md#endpoint-get-calendars) with `free-busy` scope:

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
When attempting to [create an event](../api/events.md#endpoint-create-event) with `read` scope:

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

## Partial Consent {#partial-consent}

The scope you request is not always the access you get. Google's consent screen presents the calendar permission as a **separate checkbox**. If the user leaves it unticked and continues, Google still returns a valid grant — sign-in succeeds, the account appears connected, and only the calendar permission is missing.

Such an account can list no calendars. Rather than returning an empty array — indistinguishable from a user who genuinely has no calendars — `GET /calendars`, `GET /events` and the `/event` write endpoints answer **`403`** when *every* connected account is in this state:

```json
{
  "error": "Forbidden",
  "code": "calendar_permission_required",
  "message": "No connected account has calendar access. The account completed sign-in but the calendar permission was not granted, which cannot be repaired server-side — the user must connect again and allow calendar access.",
  "accounts": [{ "provider": "google", "account": "user@gmail.com" }]
}
```

The `accounts` list is the actionable part: those are the users to prompt for a reconnect.

If *some* accounts still work, the request succeeds and returns what they hold. The accounts left out are named in the **`X-Connect-Calendar-Permission-Missing`** response header as comma-separated `provider:account` pairs, so a partial result is never silently partial.

For writes the check is scoped to the provider you are writing to — a working Outlook connection does not authorize a write to a Google calendar the user never granted access to.

To detect the problem before issuing a call, read the per-account fields on the connection status response:

| Field | Type | Meaning |
| :--- | :--- | :--- |
| `grantedScopes` | `string[]` | The scopes the provider actually granted for this account. |
| `calendarPermissionGranted` | `boolean \| null` | Whether the granted scopes cover calendar access at the scope your project requested. |

```json
{
  "connections": {
    "google": [
      {
        "id": "user@gmail.com",
        "display": "user@gmail.com",
        "grantedScopes": ["openid", "https://www.googleapis.com/auth/userinfo.email"],
        "calendarPermissionGranted": false
      }
    ]
  },
  "limitReached": false
}
```

`calendarPermissionGranted` is evaluated against the scope of the calling request, so a grant that satisfies `free-busy` can still report `false` for `read-write`. It is `null` when the question does not apply — Apple and CalDAV authenticate with a username and app password and have no scopes — or when no scopes were recorded for the account.

A `false` cannot be repaired server-side: providers only issue scopes at consent time. The user has to run the connect flow again and allow calendar access. Connect now detects this at the end of the Google flow and shows the user what is missing with a retry button, so new connections should not reach your application in this state — but accounts connected earlier still can.

:::tip Best Practice
After a user connects, check `calendarPermissionGranted` before showing a calendar picker. If it is `false`, prompt the user to reconnect rather than rendering an empty list — that turns the `403` above into something you never hit.
:::

## Access Escalation

You can upgrade an existing connection to a higher scope (e.g., from `free-busy` to `read-write`) if the user enables features that require more permissions.

### Workflow
1.  **Initiate new Auth Flow:** Redirect the user to the [authorization endpoint](../api/oauth.md#endpoint-authorize) with the new `scope` query parameter.
    *   Example: `?scope=read-write` or `?scope=read`
2.  **User Consent:** The provider (Google, Outlook, etc.) will present the consent screen again, asking the user to approve the additional access.
3.  **Token Update:** Connect handles the incremental authorization internally. The existing user connection is updated with the new permissions.

:::tip Best Practice
Start with `free-busy` or `read` to build trust, and only request `read-write` when the user explicitly enables features that require it (like 'Add to Calendar').
:::
