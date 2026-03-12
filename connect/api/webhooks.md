---
sidebar_position: 5
sidebar_label: Webhooks API
slug: /webhooks
---

import { Parameter } from '@site/src/components/Connect';

# Webhooks API

Use webhooks to receive near real-time event change notifications from connected calendar providers.

This API lets you:
- Subscribe a calendar to provider notifications
- Unsubscribe an existing webhook channel
- Receive normalized webhook payloads at your application webhook URL

## Supported providers

- **Google Calendar** (`google`)
- **Microsoft Outlook** (`microsoft`)
- **Apple Calendar** (`apple`)
- **CalDAV** (`caldav`)

:::info
Apple integration is delivered through periodic polling behavior and then forwarded through the same webhook payload format documented below.
:::

## Subscribe webhook {#endpoint-subscribe-webhook}

Creates a webhook subscription for a specific calendar.

**Endpoint:** `POST /subscribe-webhook`

### Authentication

Requires Bearer token authentication:

```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Request parameters

<Parameter name="provider" type="string" required id="subscribe-provider">
Provider name. Supported values: `google`, `microsoft`, `apple`.
</Parameter>

<Parameter name="calendarId" type="string" required id="subscribe-calendarId">
Calendar ID to subscribe.
</Parameter>

<Parameter name="channelId" type="string" defaultValue="Auto-generated" id="subscribe-channelId">
Optional custom subscription channel ID.
</Parameter>

<Parameter name="expiration" type="number" defaultValue="Provider default" id="subscribe-expiration">
Optional Unix timestamp in milliseconds. Provider-specific subscription expiration.
</Parameter>

### Response

<Parameter name="success" type="boolean" id="subscribe-response-success">
`true` when subscription is created.
</Parameter>

<Parameter name="provider" type="string" id="subscribe-response-provider">
Provider associated with this subscription.
</Parameter>

<Parameter name="subscription" type="WebhookSubscription" id="subscribe-response-subscription" isObject>
Provider subscription details.

  <Parameter name="channelId" type="string">
  Unique webhook channel/subscription identifier.
  </Parameter>

  <Parameter name="resourceId" type="string">
  Provider resource identifier when available.
  </Parameter>

  <Parameter name="expiration" type="string">
  ISO 8601 expiration timestamp when available.
  </Parameter>

  <Parameter name="webhookUrl" type="string">
  Provider callback URL used by the subscription.
  </Parameter>
</Parameter>

<Parameter name="serverWebhookUrl" type="string" id="subscribe-response-serverWebhookUrl">
Mobiscroll Connect callback endpoint registered with the provider.
</Parameter>

<Parameter name="channelId" type="string" id="subscribe-response-channelId">
Channel ID used for the subscription.
</Parameter>

### Error responses

- **400** - Missing required parameters, unsupported provider, or project webhook URL not configured
- **401** - Unauthorized (invalid or missing Bearer token)
- **500** - Internal server error

### Example

```bash title="Create subscription"
curl -X POST "https://connect.mobiscroll.com/api/subscribe-webhook" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "google",
    "calendarId": "work@company.com",
    "channelId": "my-channel-123"
  }'
```

```json title="Response"
{
  "success": true,
  "provider": "google",
  "subscription": {
    "channelId": "my-channel-123",
    "resourceId": "resource-abc",
    "expiration": "2026-03-19T10:00:00.000Z",
    "webhookUrl": "https://your-connect-server/api/webhook-receiver/google"
  },
  "serverWebhookUrl": "https://your-connect-server/api/webhook-receiver/google",
  "channelId": "my-channel-123"
}
```

---

## Unsubscribe webhook {#endpoint-unsubscribe-webhook}

Removes an existing webhook subscription channel.

**Endpoint:** `POST /unsubscribe-webhook`

### Authentication

Requires Bearer token authentication.

### Request parameters

<Parameter name="provider" type="string" required id="unsubscribe-provider">
Provider name. Supported values: `google`, `microsoft`, `apple`.
</Parameter>

<Parameter name="channelId" type="string" required id="unsubscribe-channelId">
Channel/subscription ID to remove.
</Parameter>

<Parameter name="resourceId" type="string" defaultValue={<code>undefined</code>} id="unsubscribe-resourceId">
Optional provider resource ID when applicable.
</Parameter>

### Response

<Parameter name="success" type="boolean" id="unsubscribe-response-success">
`true` when request is accepted and local mapping cleanup is completed.
</Parameter>

<Parameter name="message" type="string" id="unsubscribe-response-message">
Additional status detail.
</Parameter>

### Error responses

- **400** - Missing parameters or unsupported provider
- **401** - Unauthorized (invalid or missing Bearer token)
- **500** - Internal server error

### Example

```bash title="Unsubscribe channel"
curl -X POST "https://connect.mobiscroll.com/api/unsubscribe-webhook" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "google",
    "channelId": "my-channel-123",
    "resourceId": "resource-abc"
  }'
```

```json title="Response"
{
  "success": true,
  "message": "Webhook unsubscribed successfully"
}
```

---

## Provider callback endpoint {#endpoint-webhook-receiver}

Mobiscroll Connect exposes this endpoint for provider notifications:

**Endpoint:** `POST /webhook-receiver/:provider`

This endpoint is intended for provider callback traffic and should not be called directly by client applications.

### Microsoft validation flow

During initial Microsoft subscription validation, Microsoft sends a `validationToken` query parameter.
Mobiscroll Connect responds with HTTP `200` and the raw token string.

### Callback processing response codes

- **200** - Notification accepted (Google and Apple flows)
- **202** - Notification accepted (Microsoft notification flow)
- **400** - Invalid callback payload or unsupported provider
- **404** - Unknown subscription/channel mapping
- **500** - Project webhook URL not configured or unexpected processing failure

---

## Client webhook payload {#webhook-delivery-payload}

When a provider notification is processed, Mobiscroll Connect forwards a normalized payload to your configured project webhook URL.

<Parameter name="provider" type="string" id="client-payload-provider">
Notification source provider.
</Parameter>

<Parameter name="userId" type="string" id="client-payload-userId">
User ID in your system.
</Parameter>

<Parameter name="calendarId" type="string" id="client-payload-calendarId">
Calendar ID where changes were detected.
</Parameter>

<Parameter name="events" type="Array&lt;WebhookEvent&gt;" id="client-payload-events" isObject>
Changed events list.

  <Parameter name="id" type="string">
  Event ID.
  </Parameter>

  <Parameter name="provider" type="string">
  Event provider.
  </Parameter>

  <Parameter name="title" type="string">
  Event title.
  </Parameter>

  <Parameter name="start" type="Date">
  Event start date/time.
  </Parameter>

  <Parameter name="end" type="Date">
  Event end date/time.
  </Parameter>

  <Parameter name="allDay" type="boolean">
  Indicates all-day event.
  </Parameter>

  <Parameter name="changeType" type="string">
  One of `created`, `updated`, `deleted`.
  </Parameter>

  <Parameter name="color" type="string">
  Optional event color.
  </Parameter>

  <Parameter name="original" type="object">
  Provider-native event object.
  </Parameter>
</Parameter>

<Parameter name="changeType" type="string" id="client-payload-changeType">
Overall change summary: `created`, `updated`, `deleted`, or `mixed`.
</Parameter>

<Parameter name="timestamp" type="string" id="client-payload-timestamp">
ISO 8601 processing timestamp.
</Parameter>

<Parameter name="metadata" type="object" id="client-payload-metadata" isObject>
Additional webhook metadata.

  <Parameter name="channelId" type="string">
  Subscription channel ID.
  </Parameter>

  <Parameter name="eventCount" type="number">
  Number of events in this delivery.
  </Parameter>

  <Parameter name="isInitialSync" type="boolean">
  Indicates initial/sync-state delivery when applicable.
  </Parameter>
</Parameter>

### Example delivery

```json title="Delivered to your webhook URL"
{
  "provider": "microsoft",
  "userId": "user-123",
  "calendarId": "AAMkAG...",
  "events": [
    {
      "id": "AAMkAGI2...",
      "provider": "microsoft",
      "title": "Product review",
      "start": "2026-03-12T09:00:00.000Z",
      "end": "2026-03-12T10:00:00.000Z",
      "allDay": false,
      "changeType": "updated",
      "original": {}
    }
  ],
  "changeType": "updated",
  "timestamp": "2026-03-12T09:01:12.000Z",
  "metadata": {
    "channelId": "sub-123",
    "eventCount": 1,
    "isInitialSync": false
  }
}
```

---

## Setup requirements

1. Configure **Webhook URL** in your Connect application settings. See [Application setup](/connect/application-setup).
2. Ensure your webhook endpoint is public, reachable, and returns `2xx` quickly.
3. Keep endpoint handling idempotent and tolerant of out-of-order notifications.

---

## Operational notes {#webhook-operational-notes}

- Delivery forwarding to your webhook URL is best-effort and should be handled with idempotent processing on your side.
- Duplicate/loop-prevention filtering is applied for very recent API-originated changes.
- For Apple, event change detection is based on periodic synchronization rather than provider-native push.
- A single delivery may contain multiple event changes and return `changeType: "mixed"`.
- When notifications are filtered out, no events may be delivered in that callback cycle.
