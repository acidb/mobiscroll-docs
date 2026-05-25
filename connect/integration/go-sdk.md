---
sidebar_label: Go SDK
sidebar_position: 7
slug: /go-sdk
description: Use the github.com/acidb/mobiscroll-connect-sdks/sdks/go module to interact with Mobiscroll Connect — setup, authentication, and API method reference.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocCardList from '@theme/DocCardList';
import { Parameter } from '@site/src/components/Connect';

# Go SDK

The Mobiscroll Connect Go SDK provides a convenient way to integrate Mobiscroll Connect in Go backend applications. It requires Go 1.22 or higher and is built on the standard library `net/http`, so it works in any Go service (plain HTTP servers, Gin, Echo, Fiber, gRPC gateways, etc.).

## Setup

Add the module using `go get`:

```bash
go get github.com/acidb/mobiscroll-connect-sdks/sdks/go@latest
```

Then import it under the short package name `mobiscroll`:

```go
import mobiscroll "github.com/acidb/mobiscroll-connect-sdks/sdks/go"
```

## Client Initialization {#client-initialization}

To use the SDK, initialize `Client` with your client credentials.

**Constructor:** `mobiscroll.NewClient(clientID, clientSecret, redirectURI string, opts ...ClientOption) *Client`

<Parameter name="clientID" type="string">
Your Client ID obtained from the Mobiscroll Connect dashboard.
</Parameter>

<Parameter name="clientSecret" type="string">
Your Client Secret obtained from the Mobiscroll Connect dashboard.
</Parameter>

<Parameter name="redirectURI" type="string">
Your application's redirect URI that matches the one configured in the Mobiscroll Connect dashboard.
</Parameter>

<Parameter name="opts" type="...ClientOption">
Optional functional options: `WithBaseURL`, `WithTimeout`, `WithHTTPClient`, `WithTokensRefreshedCallback`.
</Parameter>

**Usage:**

```go
import (
    "time"

    mobiscroll "github.com/acidb/mobiscroll-connect-sdks/sdks/go"
)

client := mobiscroll.NewClient(
    "YOUR_CLIENT_ID",
    "YOUR_CLIENT_SECRET",
    "YOUR_REDIRECT_URI",
)
```

For a custom base URL, HTTP timeout, custom `*http.Client`, or a token-refresh callback for persistence, pass options to the constructor:

```go
client := mobiscroll.NewClient(
    "YOUR_CLIENT_ID",
    "YOUR_CLIENT_SECRET",
    "YOUR_REDIRECT_URI",
    mobiscroll.WithBaseURL("https://connect.mobiscroll.com/api"),
    mobiscroll.WithTimeout(60*time.Second),
    mobiscroll.WithTokensRefreshedCallback(func(updated *mobiscroll.TokenResponse) {
        // Persist updated.AccessToken / updated.RefreshToken
    }),
)
```

## Methods

### SetCredentials {#client-set-credentials}

Stores a token pair the SDK will use on subsequent requests. Typically called after `Auth().GetToken` or when restoring credentials from persistent storage.

**Method:** `client.SetCredentials(tokens *TokenResponse)`

<Parameter name="tokens" type="*TokenResponse" isObject>
The token response returned by `client.Auth().GetToken(ctx, code)`.
</Parameter>

### OnTokensRefreshed {#client-on-tokens-refreshed}

Registers a callback to be invoked whenever the SDK automatically refreshes the access token. Use this to persist the updated tokens so they survive future requests. Overrides any callback supplied via `WithTokensRefreshedCallback`.

**Method:** `client.OnTokensRefreshed(cb func(*TokenResponse))`

<Parameter name="cb" type="func(*TokenResponse)">
A function that receives the updated `TokenResponse` after a successful automatic token refresh. Pass `nil` to clear the callback.
</Parameter>

### Credentials {#client-credentials}

Returns the currently stored credentials, or `nil` if none.

**Method:** `client.Credentials() *TokenResponse`

**Returns:** `*TokenResponse`

## Token Refresh

The Go SDK handles token refresh automatically. When any API call returns a `401 Unauthorized` response and the client has a `refresh_token` stored, the SDK silently exchanges it for a new access token and retries the original request — with no action required from your application. Concurrent calls that hit the same expired token deduplicate into a single refresh via `golang.org/x/sync/singleflight`.

When the refresh succeeds, the SDK invokes your `OnTokensRefreshed` callback with the updated `*TokenResponse`. You must register this callback and persist the new tokens, otherwise they will be lost between process restarts.

```go
client.OnTokensRefreshed(func(updated *mobiscroll.TokenResponse) {
    // Persist updated in your database or session store
    // so the new access_token and refresh_token survive future requests
    session.Set("access_token", updated.AccessToken)
    session.Set("refresh_token", updated.RefreshToken)
})
```

If the refresh token itself is invalid or has been revoked, the SDK returns an `*AuthenticationError` and the user must re-authorize.

## Error Handling

All SDK errors satisfy the `mobiscroll.MobiscrollError` interface. Use `errors.As` to extract the concrete type.

| Error type | HTTP Status | Extra field |
|---|---|---|
| `*AuthenticationError` | 401, 403 | — (returned after refresh + retry has been exhausted) |
| `*ValidationError` | 400, 422 | `Details` (`json.RawMessage`) |
| `*NotFoundError` | 404 | — |
| `*RateLimitError` | 429 | `RetryAfter` (`int`, seconds) |
| `*ServerError` | 5xx | `StatusCode` (`int`) |
| `*NetworkError` | — | wraps the underlying transport error (`Unwrap`) |

```go
import (
    "context"
    "errors"
    "log"
    "time"

    mobiscroll "github.com/acidb/mobiscroll-connect-sdks/sdks/go"
)

ctx := context.Background()
start := time.Now()
end := start.AddDate(0, 1, 0)

_, err := client.Events().List(ctx, &mobiscroll.EventListParams{
    Start: &start,
    End:   &end,
})
if err != nil {
    var authErr *mobiscroll.AuthenticationError
    var valErr *mobiscroll.ValidationError
    var rlErr *mobiscroll.RateLimitError
    var mErr mobiscroll.MobiscrollError

    switch {
    case errors.As(err, &authErr):
        // Token expired and refresh failed — re-authorize the user
    case errors.As(err, &valErr):
        log.Printf("validation: %s", valErr.Details)
    case errors.As(err, &rlErr):
        time.Sleep(time.Duration(rlErr.RetryAfter) * time.Second)
    case errors.As(err, &mErr):
        // Catch-all for any other SDK error
    }
}
```

## API

The client exposes resources that map directly to the API endpoints.

### Auth

The `client.Auth()` resource handles the OAuth authorization flow, including generating authorization URLs, exchanging codes for tokens, managing connection status, and disconnecting providers.

<DocCardList items={[
  {
    type: 'link',
    label: 'OAuth API Reference',
    href: '/connect/oauth',
    icon: '🔐'
  },
]} />

### Calendars

The `client.Calendars()` resource allows you to list available calendars from all connected providers (Google, Outlook, etc.). It corresponds to the `/calendars` endpoints.

<DocCardList items={[
  {
    type: 'link',
    label: 'Calendars API Reference',
    href: '/connect/calendars',
    icon: '📅'
  },
]} />

### Events

The `client.Events()` resource provides methods to create, read, update, and delete calendar events across all connected accounts. It corresponds to the `/events` endpoints.

<DocCardList items={[
  {
    type: 'link',
    label: 'Events API Reference',
    href: '/connect/events',
    icon: '📅'
  },
]} />
