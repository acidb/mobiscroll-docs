---
sidebar_position: 2
sidebar_label: API Reference
slug: /api
---

# API Reference

Welcome to the Mobiscroll Connect API documentation. This API enables you to integrate with multiple calendar providers (Google Calendar, Microsoft Outlook, and Apple Calendar) through a unified interface.

## Authentication

:::info
All API endpoints require authentication using a Bearer token (JWT). Include the token in the `Authorization` header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```
:::

## Available Endpoints

### [Events API](api/events)

Retrieve calendar events from all connected providers with support for pagination, filtering, and recurring events.

- **GET /events** - Fetch calendar events with advanced filtering and pagination

### [Calendars API](api/calendars)

Manage calendar lists across all connected providers.

- **GET /calendars** - Retrieve all calendars from connected providers

### [Webhooks API](api/webhooks)

Subscribe to real-time calendar event notifications from providers.

- **POST /subscribe-webhook** - Create a webhook subscription
- **POST /unsubscribe-webhook** - Remove a webhook subscription
- **POST /webhook-receiver/:provider** - Receive provider notifications (internal endpoint)

## Supported Providers

Mobiscroll Connect supports the following calendar providers:

- **Google Calendar** (`'google'`)
- **Microsoft Outlook** (`'microsoft'`)
- **Apple Calendar** (`'apple'`)

## Base URL

All API requests should be made to:

```
https://connect.mobiscroll.com
```

## Response Format

All API responses are returned in JSON format. Successful responses include the requested data, while error responses include an `error` field with a descriptive message.

## Error Handling

Standard HTTP status codes are used to indicate the success or failure of requests:

- **200** - Success
- **202** - Accepted (async operations)
- **400** - Bad Request (invalid parameters)
- **401** - Unauthorized (invalid or missing token)
- **404** - Not Found (resource doesn't exist)
- **500** - Internal Server Error (unexpected failure)