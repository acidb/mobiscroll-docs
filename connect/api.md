---
sidebar_position: 2
sidebar_label: API Reference
slug: /api
---

# API Reference

Welcome to the Mobiscroll Connect API documentation. This API enables you to integrate with multiple calendar providers (Google Calendar, Microsoft Outlook, and Apple Calendar) through a unified interface.

## Authentication

Most API endpoints require authentication using a Bearer token (JWT). Include the token in the `Authorization` header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Exception:** The OAuth authorization endpoint (`GET /authorize`) does not require authentication as it initiates the OAuth flow.

To obtain an access token:

1. Direct users to the **GET /authorize** endpoint to initiate the OAuth2 flow
2. Users will authenticate with their calendar provider(s)
3. After successful authentication, they'll be redirected to your `redirect_uri` with an authorization code
4. Exchange the authorization code for an access token using **POST /token**
5. Use the access token in the `Authorization` header for all subsequent API requests

## Available Endpoints

### [OAuth API](api/oauth)

Initiate and complete the OAuth2 authorization flow to connect user calendar accounts.

- **[GET /authorize](api/oauth#endpoint-authorize)** - Initiate OAuth2 authorization flow
- **[POST /token](api/oauth#endpoint-token)** - Exchange authorization code for access token

### [Events API](api/events)

Retrieve, create, update, and delete calendar events from connected providers with support for pagination, filtering, and recurring events.

- **[GET /events](api/events#endpoint-get-events)** - Fetch calendar events with advanced filtering and pagination
- **[POST /event](api/events#endpoint-create-event)** - Create a new calendar event
- **[PUT /event](api/events#endpoint-update-event)** - Update an existing calendar event
- **[DELETE /event](api/events#endpoint-delete-event)** - Delete a calendar event

### [Calendars API](api/calendars)

Manage calendar lists across all connected providers.

- **[GET /calendars](api/calendars#endpoint-get-calendars)** - Retrieve all calendars from connected providers

## Supported Providers

Mobiscroll Connect supports the following calendar providers:

- **Google Calendar** (`'google'`)
- **Microsoft Outlook** (`'microsoft'`)
- **Apple Calendar** (`'apple'`)

## Base URL

All API requests should be made to:

```
https://connect.mobiscroll.com/api
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