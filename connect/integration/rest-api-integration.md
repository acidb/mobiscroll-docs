---
sidebar_label: REST API
sidebar_position: 3
slug: /rest-api-integration
---

import DocCardList from '@theme/DocCardList';

# REST API Integration Guide

This guide demonstrates how to integrate Mobiscroll Connect using direct HTTP requests to the REST API endpoints. If you prefer a more streamlined approach, consider using the [Node.js SDK](/connect/node-sdk).

## Base URL

All API requests should be made to:

```
https://connect.mobiscroll.com/api
```

## Authentication

Most API requests require an access token in the `Authorization` header:

```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

To obtain an access token, follow the OAuth flow described in the [Auth API section](#auth) below.

## API

The REST API exposes the following endpoints for integrating with Mobiscroll Connect.

### Auth

The OAuth endpoints handle the authorization flow, including initiating user authorization, exchanging codes for access tokens, and managing connection status. Start here to authenticate users and obtain access tokens.

**Example: Initiate Authorization**

```javascript
const params = new URLSearchParams({
  response_type: 'code',
  client_id: 'YOUR_CLIENT_ID',
  user_id: 'user-123',
  scope: 'read-write'
});

const authUrl = `https://connect.mobiscroll.com/api/oauth/authorize?${params.toString()}`;
window.location.href = authUrl;
```

**Example: Exchange Code for Token**

```javascript
const response = await fetch('https://connect.mobiscroll.com/api/oauth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    grant_type: 'authorization_code',
    code: 'AUTH_CODE_FROM_CALLBACK',
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_CLIENT_SECRET'
  })
});

const { access_token, refresh_token } = await response.json();
// Store both tokens securely on the server side
```

**Example: Refresh Access Token**

```javascript
const response = await fetch('https://connect.mobiscroll.com/api/oauth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: 'STORED_REFRESH_TOKEN',
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_CLIENT_SECRET'
  }).toString()
});

const { access_token, refresh_token: newRefreshToken } = await response.json();
// Replace the stored refresh token with newRefreshToken
```

**Example: Revoke Tokens**

```javascript
await fetch('https://connect.mobiscroll.com/api/oauth/revoke', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ token: access_token })
});
```

<DocCardList items={[
  {
    type: 'link',
    label: 'OAuth API Reference',
    href: '/connect/oauth',
    icon: '🔐'
  },
]} />

### Calendars

The Calendars endpoints allow you to retrieve calendar lists from all connected providers (Google, Outlook, Apple, CalDAV). Use these to display available calendars to users.

**Example: List Calendars**

```javascript
const response = await fetch('https://connect.mobiscroll.com/api/calendars', {
  headers: { 'Authorization': `Bearer ${accessToken}` }
});

const calendars = await response.json();
```

<DocCardList items={[
  {
    type: 'link',
    label: 'Calendars API Reference',
    href: '/connect/calendars',
    icon: '📅'
  },
]} />

### Events

The Events endpoints provide full CRUD operations for calendar events across all connected accounts. Create, read, update, and delete events with support for pagination, filtering, and recurring events.

**Example: List Events**

```javascript
const params = new URLSearchParams({
  start: '2024-01-01T00:00:00Z',
  end: '2024-01-31T23:59:59Z',
  pageSize: '50'
});

const response = await fetch(
  `https://connect.mobiscroll.com/api/events?${params.toString()}`,
  { headers: { 'Authorization': `Bearer ${accessToken}` } }
);

const { events } = await response.json();
```

**Example: Create Event**

```javascript
const response = await fetch('https://connect.mobiscroll.com/api/event', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    provider: 'google',
    calendarId: 'primary',
    title: 'Team Meeting',
    start: '2024-02-15T10:00:00Z',
    end: '2024-02-15T11:00:00Z'
  })
});

const event = await response.json();
```

<DocCardList items={[
  {
    type: 'link',
    label: 'Events API Reference',
    href: '/connect/events',
    icon: '📅'
  },
]} />

## Best Practices

1. **Store tokens securely** - Keep access tokens and refresh tokens in secure, server-side storage; never expose them in client-side code
2. **Handle token expiration** - Access tokens expire after 1 hour; use the `POST /token` refresh flow to get a new one automatically before making API calls
3. **Rotate refresh tokens** - Always replace the stored refresh token with the new one returned after each refresh; the old token is immediately invalidated
4. **Revoke on logout** - Call `POST /revoke` when a user logs out to invalidate all active tokens
5. **Validate state parameter** - Always validate the `state` parameter in OAuth callbacks to prevent CSRF attacks
6. **Use HTTPS** - Always use HTTPS for API requests and callbacks
7. **Handle rate limits** - Implement exponential backoff for rate-limited requests
