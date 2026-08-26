---
sidebar_position: 5
sidebar_label: Webhooks API
slug: /webhooks
description: Subscribe to real-time calendar change notifications from Google, Outlook, and Apple via Mobiscroll Connect webhook channels.
---

import { Parameter } from '@site/src/components/Connect';

# Webhooks API

Use webhooks to receive near real-time event change notifications from connected calendar providers.

When a user modifies an event in Google, Microsoft, Apple, or CalDAV, Connect can forward the normalized change payload to your configured project webhook URL after you subscribe the calendar via `POST /subscribe-webhook`.

This API lets you:
- Subscribe a calendar to provider notifications
- Unsubscribe an existing webhook channel
- Receive normalized webhook payloads at your application webhook URL

## Supported providers

- **Google Calendar** (`google`)
- **Microsoft Outlook** (`microsoft`)
- **Apple Calendar** (`apple`)
- **CalDAV** (`caldav`)

## Subscribe webhook {#endpoint-subscribe-webhook}

Creates a webhook subscription for a specific calendar.

**Endpoint:** `POST /subscribe-webhook`

### Authentication

Requires Bearer token authentication:

```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Request parameters

{/* llms:param;name=provider;type=string;required=1 */}
<Parameter name="provider" type="string" required id="subscribe-provider">
Provider name. Supported values: `google`, `microsoft`, `apple`, `caldav`.
</Parameter>
{/* /llms:param */}

{/* llms:param;name=calendarId;type=string;required=1 */}
<Parameter name="calendarId" type="string" required id="subscribe-calendarId">
Calendar ID to subscribe.
</Parameter>
{/* /llms:param */}

{/* llms:param;name=channelId;type=string;default=Auto-generated */}
<Parameter name="channelId" type="string" defaultValue="Auto-generated" id="subscribe-channelId">
Optional custom subscription channel ID.
</Parameter>
{/* /llms:param */}

{/* llms:param;name=expiration;type=number;default=Provider default */}
<Parameter name="expiration" type="number" defaultValue="Provider default" id="subscribe-expiration">
Optional Unix timestamp in milliseconds. Provider-specific subscription expiration.
</Parameter>
{/* /llms:param */}

### Response

{/* llms:param;name=success;type=boolean */}
<Parameter name="success" type="boolean" id="subscribe-response-success">
`true` when subscription is created.
</Parameter>
{/* /llms:param */}

{/* llms:param;name=provider;type=string */}
<Parameter name="provider" type="string" id="subscribe-response-provider">
Provider associated with this subscription.
</Parameter>
{/* /llms:param */}

{/* llms:param;name=subscription;type=WebhookSubscription */}
<Parameter name="subscription" type="WebhookSubscription" id="subscribe-response-subscription" isObject>
Provider subscription details.

  {/* llms:param;name=channelId;type=string */}
  <Parameter name="channelId" type="string">
  Unique webhook channel/subscription identifier.
  </Parameter>
  {/* /llms:param */}

  {/* llms:param;name=resourceId;type=string */}
  <Parameter name="resourceId" type="string">
  Provider resource identifier when available.
  </Parameter>
  {/* /llms:param */}

  {/* llms:param;name=expiration;type=string */}
  <Parameter name="expiration" type="string">
  ISO 8601 expiration timestamp when available.
  </Parameter>
  {/* /llms:param */}

  {/* llms:param;name=webhookUrl;type=string */}
  <Parameter name="webhookUrl" type="string">
  Provider callback URL used by the subscription.
  </Parameter>
  {/* /llms:param */}
</Parameter>
{/* /llms:param */}

{/* llms:param;name=serverWebhookUrl;type=string */}
<Parameter name="serverWebhookUrl" type="string" id="subscribe-response-serverWebhookUrl">
Mobiscroll Connect callback endpoint registered with the provider.
</Parameter>
{/* /llms:param */}

{/* llms:param;name=channelId;type=string */}
<Parameter name="channelId" type="string" id="subscribe-response-channelId">
Channel ID used for the subscription.
</Parameter>
{/* /llms:param */}

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

{/* llms:param;name=provider;type=string;required=1 */}
<Parameter name="provider" type="string" required id="unsubscribe-provider">
Provider name. Supported values: `google`, `microsoft`, `apple`, `caldav`.
</Parameter>
{/* /llms:param */}

{/* llms:param;name=channelId;type=string;required=1 */}
<Parameter name="channelId" type="string" required id="unsubscribe-channelId">
Channel/subscription ID to remove.
</Parameter>
{/* /llms:param */}

{/* llms:param;name=resourceId;type=string;default=undefined */}
<Parameter name="resourceId" type="string" defaultValue={<code>undefined</code>} id="unsubscribe-resourceId">
Optional provider resource ID when applicable.
</Parameter>
{/* /llms:param */}

### Response

{/* llms:param;name=success;type=boolean */}
<Parameter name="success" type="boolean" id="unsubscribe-response-success">
`true` when request is accepted and local mapping cleanup is completed.
</Parameter>
{/* /llms:param */}

{/* llms:param;name=message;type=string */}
<Parameter name="message" type="string" id="unsubscribe-response-message">
Additional status detail.
</Parameter>
{/* /llms:param */}

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

## Client webhook payload {#webhook-delivery-payload}

When a provider notification is processed, Mobiscroll Connect forwards a normalized payload to your configured project webhook URL.

{/* llms:param;name=provider;type=string */}
<Parameter name="provider" type="string" id="client-payload-provider">
Notification source provider.
</Parameter>
{/* /llms:param */}

{/* llms:param;name=userId;type=string */}
<Parameter name="userId" type="string" id="client-payload-userId">
User ID in your system.
</Parameter>
{/* /llms:param */}

{/* llms:param;name=calendarId;type=string */}
<Parameter name="calendarId" type="string" id="client-payload-calendarId">
Calendar ID where changes were detected.
</Parameter>
{/* /llms:param */}

{/* llms:param;name=events;type=Array&lt;WebhookEvent&gt; */}
<Parameter name="events" type="Array&lt;WebhookEvent&gt;" id="client-payload-events" isObject>
Changed events list.

  {/* llms:param;name=calendarId;type=string */}
  <Parameter name="calendarId" type="string">
  Calendar ID where the event belongs.
  </Parameter>
  {/* /llms:param */}

  {/* llms:param;name=id;type=string */}
  <Parameter name="id" type="string">
  Event ID.
  </Parameter>
  {/* /llms:param */}

  {/* llms:param;name=provider;type=string */}
  <Parameter name="provider" type="string">
  Event provider.
  </Parameter>
  {/* /llms:param */}

  {/* llms:param;name=title;type=string */}
  <Parameter name="title" type="string">
  Event title.
  </Parameter>
  {/* /llms:param */}

  {/* llms:param;name=description;type=string */}
  <Parameter name="description" type="string">
  Event description/notes (optional).
  </Parameter>
  {/* /llms:param */}

  {/* llms:param;name=lastModified;type=string */}
  <Parameter name="lastModified" type="string">
  ISO 8601 timestamp of the last provider-side modification (optional).
  </Parameter>
  {/* /llms:param */}

  {/* llms:param;name=start;type=Date */}
  <Parameter name="start" type="Date">
  Event start date/time.
  </Parameter>
  {/* /llms:param */}

  {/* llms:param;name=end;type=Date */}
  <Parameter name="end" type="Date">
  Event end date/time.
  </Parameter>
  {/* /llms:param */}

  {/* llms:param;name=allDay;type=boolean */}
  <Parameter name="allDay" type="boolean">
  Indicates all-day event.
  </Parameter>
  {/* /llms:param */}

  {/* llms:param;name=recurringEventId;type=string */}
  <Parameter name="recurringEventId" type="string">
  Recurring series master ID when this event is an instance (optional).
  </Parameter>
  {/* /llms:param */}

  {/* llms:param;name=changeType;type=string */}
  <Parameter name="changeType" type="string">
  One of `created`, `updated`, `deleted`.
  </Parameter>
  {/* /llms:param */}

  {/* llms:param;name=color;type=string */}
  <Parameter name="color" type="string">
  Optional event color.
  </Parameter>
  {/* /llms:param */}

  {/* llms:param;name=location;type=string */}
  <Parameter name="location" type="string">
  Optional event location.
  </Parameter>
  {/* /llms:param */}

  {/* llms:param;name=attendees;type=Array&lt;EventAttendee&gt; */}
  <Parameter name="attendees" type="Array&lt;EventAttendee&gt;" isObject>
  Optional attendee list.

    {/* llms:param;name=email;type=string */}
    <Parameter name="email" type="string">
    Attendee email.
    </Parameter>
    {/* /llms:param */}

    {/* llms:param;name=status;type=string */}
    <Parameter name="status" type="string">
    Response status: `accepted`, `declined`, `tentative`, or `none`.
    </Parameter>
    {/* /llms:param */}

    {/* llms:param;name=organizer;type=boolean */}
    <Parameter name="organizer" type="boolean">
    Indicates if attendee is organizer. For Google, the organizer appears in this list only when Google lists them as a guest — see [attendees](./events.md#endpoint-get-events) in the events reference.
    </Parameter>
    {/* /llms:param */}
  </Parameter>
  {/* /llms:param */}

  {/* llms:param;name=custom;type=object */}
  <Parameter name="custom" type="object">
  Optional custom key-value pairs.
  </Parameter>
  {/* /llms:param */}

  {/* llms:param;name=conference;type=object */}
  <Parameter name="conference" type="object" isObject>
  Optional conference metadata.

    {/* llms:param;name=url;type=string */}
    <Parameter name="url" type="string">
    Conference meeting URL.
    </Parameter>
    {/* /llms:param */}

    {/* llms:param;name=autoGenerate;type=boolean */}
    <Parameter name="autoGenerate" type="boolean">
    If `true`, provider may auto-generate an online meeting link.
    </Parameter>
    {/* /llms:param */}

    {/* llms:param;name=provider;type=string */}
    <Parameter name="provider" type="string">
    Conference provider identifier.
    </Parameter>
    {/* /llms:param */}

    {/* llms:param;name=data;type=object */}
    <Parameter name="data" type="object">
    Provider-specific conference payload.
    </Parameter>
    {/* /llms:param */}
  </Parameter>
  {/* /llms:param */}

  {/* llms:param;name=availability;type=string */}
  <Parameter name="availability" type="string">
  Optional availability: `busy` or `free`.
  </Parameter>
  {/* /llms:param */}

  {/* llms:param;name=privacy;type=string */}
  <Parameter name="privacy" type="string">
  Optional privacy: `public`, `private`, or `confidential`.
  </Parameter>
  {/* /llms:param */}

  {/* llms:param;name=status;type=string */}
  <Parameter name="status" type="string">
  Optional event status: `confirmed`, `tentative`, or `cancelled`.
  </Parameter>
  {/* /llms:param */}

  {/* llms:param;name=link;type=string */}
  <Parameter name="link" type="string">
  Optional provider event link.
  </Parameter>
  {/* /llms:param */}

  {/* llms:param;name=original;type=object */}
  <Parameter name="original" type="object">
  Provider-native event object.
  </Parameter>
  {/* /llms:param */}
</Parameter>
{/* /llms:param */}

{/* llms:param;name=changeType;type=string */}
<Parameter name="changeType" type="string" id="client-payload-changeType">
Overall change summary: `created`, `updated`, `deleted`, or `mixed`.
</Parameter>
{/* /llms:param */}

{/* llms:param;name=timestamp;type=string */}
<Parameter name="timestamp" type="string" id="client-payload-timestamp">
ISO 8601 processing timestamp.
</Parameter>
{/* /llms:param */}

{/* llms:param;name=metadata;type=object */}
<Parameter name="metadata" type="object" id="client-payload-metadata" isObject>
Additional webhook metadata.

  {/* llms:param;name=channelId;type=string */}
  <Parameter name="channelId" type="string">
  Subscription channel ID.
  </Parameter>
  {/* /llms:param */}

  {/* llms:param;name=eventCount;type=number */}
  <Parameter name="eventCount" type="number">
  Number of events in this delivery.
  </Parameter>
  {/* /llms:param */}

  {/* llms:param;name=isInitialSync;type=boolean */}
  <Parameter name="isInitialSync" type="boolean">
  `true` only for a provider initial-sync delivery (when a channel is first established). Ordinary changes are always `false`, even large ones such as editing many occurrences of a recurring series.
  </Parameter>
  {/* /llms:param */}
</Parameter>
{/* /llms:param */}

### Example delivery

```json title="Delivered to your webhook URL"
{
  "provider": "google",
  "userId": "user-123",
  "calendarId": "work@company.com",
  "events": [
    {
      "id": "event-abc",
      "provider": "google",
      "calendarId": "work@company.com",
      "title": "Product review",
      "description": "Quarterly review",
      "lastModified": "2026-03-10T09:00:00.000Z",
      "start": "2026-03-12T09:00:00.000Z",
      "end": "2026-03-12T10:00:00.000Z",
      "allDay": false,
      "recurringEventId": "series-master-id",
      "color": "#9fc6e7",
      "location": "Office / Meeting room",
      "attendees": [
        {
          "email": "user@example.com",
          "status": "accepted",
          "organizer": true
        }
      ],
      "custom": {
        "yourCustomKey": "yourCustomValue"
      },
      "conference": {
        "url": "https://meet.example.com/abc",
        "provider": "google-meet"
      },
      "availability": "busy",
      "privacy": "private",
      "status": "confirmed",
      "link": "https://provider-event-link",
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
- Provider-side notifications may be emitted for changes regardless of where the change originated.
- A single change can produce more than one provider notification — Microsoft may write the event several times for one user action, and providers deliver at least once — so expect the same event to arrive more than once.
- Changes you make through the Connect API do not come back to you as deliveries. Every provider notification caused by your own `POST /event`, `PUT /event` or `DELETE /event` call is filtered for 30 seconds after the write (short-lived in-memory dedup window), including notifications that arrive before the API call returns.
- In distributed or multi-instance setups, add an application-level origin marker in `custom` (for example `custom.source = "my-system"`) and ignore matching webhook events as an additional loop-prevention safeguard.
- For Apple, event change detection is based on periodic synchronization (polled every 5 minutes) rather than provider-native push.
- For CalDAV, event change detection is based on periodic synchronization rather than provider-native push.
- A single delivery may contain multiple event changes and return `changeType: "mixed"`.
- When notifications are filtered out, no events may be delivered in that callback cycle.
