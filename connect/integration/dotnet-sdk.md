---
sidebar_label: .NET SDK
sidebar_position: 5
slug: /dotnet-sdk
description: Use the Mobiscroll.Connect NuGet package to interact with Mobiscroll Connect — setup, authentication, and API method reference.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocCardList from '@theme/DocCardList';
import { Parameter } from '@site/src/components/Connect';

# .NET SDK

The Mobiscroll Connect .NET SDK provides a convenient way to integrate Mobiscroll Connect in .NET backend applications. It targets .NET 8 and runs on .NET Core, making it compatible with Linux, macOS, and Windows.

## Setup

Install the package using NuGet:

<Tabs>
<TabItem value="dotnet-cli" label=".NET CLI">

```bash
dotnet add package Mobiscroll.Connect
```

</TabItem>
<TabItem value="nuget" label="NuGet Package Manager">

```bash
NuGet\Install-Package Mobiscroll.Connect
```

</TabItem>
<TabItem value="packageref" label="PackageReference">

```xml
<PackageReference Include="Mobiscroll.Connect" Version="*" />
```

</TabItem>
</Tabs>

## Client Initialization {#client-initialization}

To use the SDK, initialize `MobiscrollConnectClient` with your client credentials.

**Class:** `Mobiscroll.Connect.MobiscrollConnectClient`

<Parameter name="constructor" type="MobiscrollConnectClient" id="client-config" isObject>
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

```csharp
using Mobiscroll.Connect;

var client = new MobiscrollConnectClient(
    clientId: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_CLIENT_SECRET",
    redirectUri: "YOUR_REDIRECT_URI"
);
```

## Methods

### SetCredentials {#client-set-credentials}

Sets the access token for the client. This is required before making any API calls that require authentication.

**Method:** `client.Auth.SetCredentials(tokens)`

<Parameter name="tokens" type="TokenResponse" isObject>
The token response object returned by `client.Auth.GetTokenAsync(code)`.
</Parameter>

### OnTokensRefreshed {#client-on-tokens-refreshed}

Registers a callback to be invoked whenever the SDK automatically refreshes the access token. Use this to persist the updated tokens so they survive future requests.

**Method:** `client.OnTokensRefreshed(callback)`

<Parameter name="callback" type="Action&lt;TokenResponse&gt;">
An action that receives the updated `TokenResponse` after a successful automatic token refresh.
</Parameter>

## Token Refresh

The .NET SDK handles token refresh automatically. When any API call returns a `401 Unauthorized` response and the client has a `refresh_token` stored, the SDK will silently exchange it for a new access token and retry the original request — with no action required from your application.

When the refresh succeeds, the SDK invokes your `OnTokensRefreshed` callback with the updated `TokenResponse`. You must register this callback and persist the new tokens, otherwise they will be lost between requests.

```csharp
client.OnTokensRefreshed(updatedTokens =>
{
    // Persist updatedTokens in your database or session store
    // so the new access_token and refresh_token survive future requests
    HttpContext.Session.SetString("access_token", updatedTokens.AccessToken);
    HttpContext.Session.SetString("refresh_token", updatedTokens.RefreshToken ?? "");
});
```

If the refresh token itself is invalid or has been revoked, the SDK throws an `AuthenticationException` and the user must re-authorize.

## Error Handling

All SDK methods throw exceptions that extend `Mobiscroll.Connect.Exceptions.MobiscrollConnectException`. You can catch the base exception or any of the specific subclasses.

| Exception | HTTP Status | `ErrorCode` |
|---|---|---|
| `AuthenticationException` | 401, 403 | `AUTHENTICATION_ERROR` |
| `ValidationException` | 400, 422 | `VALIDATION_ERROR` |
| `NotFoundException` | 404 | `NOT_FOUND_ERROR` |
| `RateLimitException` | 429 | `RATE_LIMIT_ERROR` |
| `ServerException` | 5xx | `SERVER_ERROR` |
| `NetworkException` | — | `NETWORK_ERROR` |

`ValidationException` exposes a `Details` property with field-level validation errors. `RateLimitException` exposes `RetryAfter` (seconds) and `ServerException` exposes `StatusCode`.

```csharp
using Mobiscroll.Connect.Exceptions;

try
{
    var response = await client.Events.ListAsync(new EventListParams
    {
        Start = DateTime.UtcNow,
        End = DateTime.UtcNow.AddMonths(1)
    });
}
catch (AuthenticationException)
{
    // Token expired and refresh failed — re-authorize the user
}
catch (ValidationException ex)
{
    // Invalid request parameters
    var details = ex.Details;
}
catch (RateLimitException ex)
{
    var retryAfter = ex.RetryAfter; // seconds
}
catch (MobiscrollConnectException)
{
    // Catch-all for any other SDK error
}
```

## API

The client exposes resources that map directly to the API endpoints.

### Auth

The `client.Auth` resource handles the OAuth authorization flow, including generating authorization URLs, exchanging codes for tokens, managing connection status, and disconnecting providers.

<DocCardList items={[
  {
    type: 'link',
    label: 'OAuth API Reference',
    href: '/connect/oauth',
    icon: '🔐'
  },
]} />

### Calendars

The `client.Calendars` resource allows you to list available calendars from all connected providers (Google, Outlook, etc.). It corresponds to the `/calendars` endpoints.

<DocCardList items={[
  {
    type: 'link',
    label: 'Calendars API Reference',
    href: '/connect/calendars',
    icon: '📅'
  },
]} />

### Events

The `client.Events` resource provides methods to create, read, update, and delete calendar events across all connected accounts. It corresponds to the `/events` endpoints.

<DocCardList items={[
  {
    type: 'link',
    label: 'Events API Reference',
    href: '/connect/events',
    icon: '📅'
  },
]} />
