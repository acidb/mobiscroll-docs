---
sidebar_label: PHP SDK
sidebar_position: 2
slug: /php-sdk
description: Use the mobiscroll/connect-php Composer package to interact with Mobiscroll Connect — setup, authentication, and API method reference.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocCardList from '@theme/DocCardList';
import { Parameter } from '@site/src/components/Connect';

# PHP SDK

The Mobiscroll Connect PHP SDK provides a convenient way to integrate Mobiscroll Connect in PHP backends.

## Setup

Install the package using Composer:

<Tabs>
<TabItem value="composer" label="Composer">

```bash
composer require mobiscroll/connect-php
```

</TabItem>
</Tabs>

## Client Initialization {#client-initialization}

To use the SDK, initialize `MobiscrollConnectClient` with your client credentials.

**Class:** `Mobiscroll\Connect\MobiscrollConnectClient`

<Parameter name="constructor" type="MobiscrollConnectClient::__construct" id="client-config" isObject>
Constructor arguments.

<Parameter name="clientId" type="string">
Your Client ID obtained from the Mobiscroll Connect dashboard.
</Parameter>

<Parameter name="clientSecret" type="string">
Your Client Secret obtained from the Mobiscroll Connect dashboard.
</Parameter>

<Parameter name="redirectUri" type="string">
Your application's redirect URI that matches the one configured in the Mobiscroll Connect dashboard.
</Parameter>

</Parameter>

**Usage:**

```php
<?php

use Mobiscroll\Connect\MobiscrollConnectClient;

$client = new MobiscrollConnectClient(
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    redirectUri: 'YOUR_REDIRECT_URI'
);
```

## Methods

### setCredentials {#auth-set-credentials}

Sets the access token for the client. This is required before making any API calls that require authentication.

**Method:** `client->auth()->setCredentials(tokens)`

<Parameter name="tokens" type="TokenResponse" isObject>
The token response object returned by `client->auth()->getToken(code)`.
</Parameter>

### onTokensRefreshed {#client-on-tokens-refreshed}

Registers a callback to be invoked whenever the SDK automatically refreshes the access token. Use this to persist the updated tokens so they survive future requests.

**Method:** `client->onTokensRefreshed(callback)`

<Parameter name="callback" type="callable(TokenResponse): void">
A callable that receives the updated `TokenResponse` after a successful automatic token refresh.
</Parameter>

## API

The client exposes resources that map directly to the API endpoints.

### Auth

The `client->auth()` resource handles the OAuth authorization flow, including generating authorization URLs, exchanging codes for tokens, managing connection status, and disconnecting providers.

<DocCardList items={[
  {
    type: 'link',
    label: 'OAuth API Reference',
    href: '/connect/oauth',
    icon: '🔐'
  },
]} />

### Calendars

The `client->calendars()` resource allows you to list available calendars from all connected providers (Google, Outlook, etc.). It corresponds to the `/calendars` endpoints.

<DocCardList items={[
  {
    type: 'link',
    label: 'Calendars API Reference',
    href: '/connect/calendars',
    icon: '📅'
  },
]} />

### Events

The `client->events()` resource provides methods to create, read, update, and delete calendar events across all connected accounts. It corresponds to the `/events` endpoints.

<DocCardList items={[
  {
    type: 'link',
    label: 'Events API Reference',
    href: '/connect/events',
    icon: '📅'
  },
]} />

## Token Refresh

The PHP SDK handles token refresh automatically. When any API call returns a `401 Unauthorized` response and the client has a `refresh_token` stored, the SDK will silently exchange it for a new access token and retry the original request — with no action required from your application.

When the refresh succeeds, the SDK invokes your `onTokensRefreshed` callback with the updated `TokenResponse`. You must register this callback and persist the new tokens, otherwise they will be lost between requests.

```php
$client->onTokensRefreshed(function (TokenResponse $updatedTokens) {
    // Persist $updatedTokens in your database or session store
    // so the new access_token and refresh_token survive future requests
    $_SESSION['tokens'] = $updatedTokens->toArray();
});
```

If the refresh token itself is invalid or has been revoked, the SDK throws an `AuthenticationError` and the user must re-authorize.

## Error Handling

All SDK methods throw exceptions that extend `Mobiscroll\Connect\Exceptions\MobiscrollConnectException`. You can catch the base exception or any of the specific subclasses.

| Exception | HTTP Status | `getCodeString()` |
|---|---|---|
| `AuthenticationError` | 401, 403 | `AUTHENTICATION_ERROR` |
| `ValidationError` | 400, 422 | `VALIDATION_ERROR` |
| `NotFoundError` | 404 | `NOT_FOUND_ERROR` |
| `RateLimitError` | 429 | `RATE_LIMIT_ERROR` |
| `ServerError` | 5xx | `SERVER_ERROR` |
| `NetworkError` | — | `NETWORK_ERROR` |

`ValidationError` exposes a `getDetails()` method that returns field-level validation errors. `RateLimitError` exposes `getRetryAfter()` (seconds) and `ServerError` exposes `getStatusCode()`.

```php
use Mobiscroll\Connect\Exceptions\{
    AuthenticationError,
    ValidationError,
    RateLimitError,
    MobiscrollConnectException,
};

try {
    $events = $client->events()->list(['start' => new DateTime('2024-01-01')]);
} catch (AuthenticationError $e) {
    // Token expired or invalid — refresh manually or re-authorize the user
} catch (ValidationError $e) {
    // Invalid request parameters
    $details = $e->getDetails();
} catch (RateLimitError $e) {
    $retryAfter = $e->getRetryAfter(); // seconds
} catch (MobiscrollConnectException $e) {
    // Catch-all for any other SDK error
}
```
