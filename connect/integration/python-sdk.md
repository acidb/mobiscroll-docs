---
sidebar_label: Python SDK
sidebar_position: 3
slug: /python-sdk
description: Use the mobiscroll-connect-sdk PyPI package to interact with Mobiscroll Connect — setup, authentication, and API method reference.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocCardList from '@theme/DocCardList';
import { Parameter } from '@site/src/components/Connect';

# Python SDK

The Mobiscroll Connect Python SDK provides a convenient way to integrate Mobiscroll Connect in Python backend applications. It supports both synchronous and asynchronous usage and requires Python 3.9 or higher.

## Setup

Install the package using pip:

<Tabs>
<TabItem value="pip" label="pip">

```bash
pip install mobiscroll-connect-sdk
```

</TabItem>
<TabItem value="poetry" label="Poetry">

```bash
poetry add mobiscroll-connect-sdk
```

</TabItem>
<TabItem value="uv" label="uv">

```bash
uv add mobiscroll-connect-sdk
```

</TabItem>
</Tabs>

## Client Initialization {#client-initialization}

To use the SDK, initialize `MobiscrollConnectClient` with your client credentials.

**Class:** `mobiscroll_connect.MobiscrollConnectClient`

<Parameter name="constructor" type="MobiscrollConnectClient" id="client-config" isObject>
Constructor arguments.

<Parameter name="client_id" type="str">
Your Client ID obtained from the Mobiscroll Connect dashboard.
</Parameter>

<Parameter name="client_secret" type="str">
Your Client Secret obtained from the Mobiscroll Connect dashboard.
</Parameter>

<Parameter name="redirect_uri" type="str">
Your application's redirect URI that matches the one configured in the Mobiscroll Connect dashboard.
</Parameter>

</Parameter>

**Usage:**

```python
from mobiscroll_connect import MobiscrollConnectClient

client = MobiscrollConnectClient(
    client_id="YOUR_CLIENT_ID",
    client_secret="YOUR_CLIENT_SECRET",
    redirect_uri="YOUR_REDIRECT_URI",
)
```

Use the client as a context manager to ensure the HTTP connection pool is released when done:

```python
with MobiscrollConnectClient(
    client_id="YOUR_CLIENT_ID",
    client_secret="YOUR_CLIENT_SECRET",
    redirect_uri="YOUR_REDIRECT_URI",
) as client:
    calendars = client.calendars.list()
```

## Methods

### set_credentials {#client-set-credentials}

Sets the access token for the client. This is required before making any API calls that require authentication.

**Method:** `client.set_credentials(tokens)`

<Parameter name="tokens" type="TokenResponse" isObject>
The token response object returned by `client.auth.get_token(code)`.
</Parameter>

### on_tokens_refreshed {#client-on-tokens-refreshed}

Registers a callback to be invoked whenever the SDK automatically refreshes the access token. Use this to persist the updated tokens so they survive future requests.

**Method:** `client.on_tokens_refreshed(callback)`

<Parameter name="callback" type="Callable[[TokenResponse], None]">
A callable that receives the updated `TokenResponse` after a successful automatic token refresh. The async client also accepts an async callable.
</Parameter>

## Token Refresh

The Python SDK handles token refresh automatically. When any API call returns a `401 Unauthorized` response and the client has a `refresh_token` stored, the SDK will silently exchange it for a new access token and retry the original request — with no action required from your application.

When the refresh succeeds, the SDK invokes your `on_tokens_refreshed` callback with the updated `TokenResponse`. You must register this callback and persist the new tokens, otherwise they will be lost between requests.

```python
from mobiscroll_connect import TokenResponse

def persist_tokens(tokens: TokenResponse) -> None:
    # Persist tokens in your database or session store
    # so the new access_token and refresh_token survive future requests
    session["access_token"] = tokens.access_token
    session["refresh_token"] = tokens.refresh_token

client.on_tokens_refreshed(persist_tokens)
```

If the refresh token itself is invalid or has been revoked, the SDK raises an `AuthenticationError` and the user must re-authorize.

## Async Usage

The SDK ships an async client with an identical API surface. Import it from the `aio` subpackage and use `async with` to manage the connection pool:

```python
from mobiscroll_connect.aio import AsyncMobiscrollConnectClient

async with AsyncMobiscrollConnectClient(
    client_id="YOUR_CLIENT_ID",
    client_secret="YOUR_CLIENT_SECRET",
    redirect_uri="YOUR_REDIRECT_URI",
) as client:
    client.auth.set_credentials(tokens)
    calendars = await client.calendars.list()
```

All resource methods on the async client are coroutines. The `on_tokens_refreshed` callback may be sync or async — both are supported.

## Error Handling

All SDK methods raise exceptions that extend `MobiscrollConnectError`. You can catch the base class or any specific subclass.

| Exception | HTTP Status | `error.code` |
|---|---|---|
| `AuthenticationError` | 401, 403 | `AUTHENTICATION_ERROR` |
| `ValidationError` | 400, 422 | `VALIDATION_ERROR` |
| `NotFoundError` | 404 | `NOT_FOUND_ERROR` |
| `RateLimitError` | 429 | `RATE_LIMIT_ERROR` |
| `ServerError` | 5xx | `SERVER_ERROR` |
| `NetworkError` | — | `NETWORK_ERROR` |

`ValidationError` exposes a `details` property with field-level validation errors. `RateLimitError` exposes `retry_after` (seconds) and `ServerError` exposes `status_code`.

```python
from mobiscroll_connect.exceptions import (
    AuthenticationError,
    ValidationError,
    RateLimitError,
    MobiscrollConnectError,
)

try:
    response = client.events.list(start="2024-01-01")
except AuthenticationError:
    # Token expired and refresh failed — re-authorize the user
    pass
except ValidationError as e:
    print(e.details)
except RateLimitError as e:
    print(f"Retry after {e.retry_after}s")
except MobiscrollConnectError as e:
    # Catch-all for any other SDK error
    pass
```

## API

The client exposes resources that map directly to the API endpoints.

### Auth

The `client.auth` resource handles the OAuth authorization flow, including generating authorization URLs, exchanging codes for tokens, managing connection status, and disconnecting providers.

<DocCardList items={[
  {
    type: 'link',
    label: 'OAuth API Reference',
    href: '/connect/oauth',
    icon: '🔐'
  },
]} />

### Calendars

The `client.calendars` resource allows you to list available calendars from all connected providers (Google, Outlook, etc.). It corresponds to the `/calendars` endpoints.

<DocCardList items={[
  {
    type: 'link',
    label: 'Calendars API Reference',
    href: '/connect/calendars',
    icon: '📅'
  },
]} />

### Events

The `client.events` resource provides methods to create, read, update, and delete calendar events across all connected accounts. It corresponds to the `/events` endpoints.

<DocCardList items={[
  {
    type: 'link',
    label: 'Events API Reference',
    href: '/connect/events',
    icon: '📅'
  },
]} />
