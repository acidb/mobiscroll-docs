---
sidebar_label: Java SDK
sidebar_position: 6
slug: /java-sdk
description: Use the com.mobiscroll:connect-sdk Maven package to interact with Mobiscroll Connect — setup, authentication, and API method reference.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocCardList from '@theme/DocCardList';
import { Parameter } from '@site/src/components/Connect';

# Java SDK

The Mobiscroll Connect Java SDK provides a convenient way to integrate Mobiscroll Connect in Java backend applications. It targets Java 11 and is built on top of OkHttp 4 and Jackson, so it works in any modern JVM application (plain Java, Spring Boot, Quarkus, etc.).

## Setup

Add the dependency using your build tool of choice:

<Tabs>
<TabItem value="maven" label="Maven">

```xml
<dependency>
  <groupId>com.mobiscroll</groupId>
  <artifactId>connect-sdk</artifactId>
  <version>1.0.0</version>
</dependency>
```

</TabItem>
<TabItem value="gradle-kotlin" label="Gradle (Kotlin)">

```kotlin
implementation("com.mobiscroll:connect-sdk:1.0.0")
```

</TabItem>
<TabItem value="gradle-groovy" label="Gradle (Groovy)">

```groovy
implementation 'com.mobiscroll:connect-sdk:1.0.0'
```

</TabItem>
</Tabs>

## Client Initialization {#client-initialization}

To use the SDK, initialize `MobiscrollConnectClient` with your client credentials.

**Class:** `com.mobiscroll.connect.MobiscrollConnectClient`

<Parameter name="constructor" type="MobiscrollConnectClient" id="client-config" isObject>
Constructor arguments.

<Parameter name="clientId" type="String">
Your Client ID obtained from the Mobiscroll Connect dashboard.
</Parameter>

<Parameter name="clientSecret" type="String">
Your Client Secret obtained from the Mobiscroll Connect dashboard.
</Parameter>

<Parameter name="redirectUri" type="String">
Your application's redirect URI that matches the one configured in the Mobiscroll Connect dashboard.
</Parameter>

</Parameter>

**Usage:**

```java
import com.mobiscroll.connect.MobiscrollConnectClient;

MobiscrollConnectClient client = new MobiscrollConnectClient(
    "YOUR_CLIENT_ID",
    "YOUR_CLIENT_SECRET",
    "YOUR_REDIRECT_URI"
);
```

For a custom base URL, HTTP timeout, OkHttp client, or a token-refresh callback for persistence, use the configuration builder:

```java
import com.mobiscroll.connect.MobiscrollConnectClient;
import com.mobiscroll.connect.MobiscrollConnectConfig;
import java.time.Duration;

MobiscrollConnectClient client = new MobiscrollConnectClient(
    MobiscrollConnectConfig.builder()
        .clientId("YOUR_CLIENT_ID")
        .clientSecret("YOUR_CLIENT_SECRET")
        .redirectUri("YOUR_REDIRECT_URI")
        .baseUrl("https://connect.mobiscroll.com/api")
        .timeout(Duration.ofSeconds(60))
        .onTokensRefreshed(updatedTokens -> {
            // Persist updatedTokens.getAccessToken() / getRefreshToken()
        })
        .build()
);
```

## Methods

### setCredentials {#client-set-credentials}

Sets the access token for the client. This is required before making any API calls that require authentication.

**Method:** `client.setCredentials(tokens)`

<Parameter name="tokens" type="TokenResponse" isObject>
The token response object returned by `client.auth().getToken(code)`.
</Parameter>

### onTokensRefreshed {#client-on-tokens-refreshed}

Registers a callback to be invoked whenever the SDK automatically refreshes the access token. Use this to persist the updated tokens so they survive future requests.

**Method:** `client.onTokensRefreshed(callback)`

<Parameter name="callback" type="Consumer&lt;TokenResponse&gt;">
A consumer that receives the updated `TokenResponse` after a successful automatic token refresh.
</Parameter>

## Token Refresh

The Java SDK handles token refresh automatically. When any API call returns a `401 Unauthorized` response and the client has a `refresh_token` stored, the SDK silently exchanges it for a new access token and retries the original request — with no action required from your application. Concurrent calls that hit the same expired token share a single refresh attempt.

When the refresh succeeds, the SDK invokes your `onTokensRefreshed` callback with the updated `TokenResponse`. You must register this callback and persist the new tokens, otherwise they will be lost between requests.

```java
client.onTokensRefreshed(updatedTokens -> {
    // Persist updatedTokens in your database or session store
    // so the new access_token and refresh_token survive future requests
    httpSession.setAttribute("access_token", updatedTokens.getAccessToken());
    httpSession.setAttribute("refresh_token", updatedTokens.getRefreshToken());
});
```

If the refresh token itself is invalid or has been revoked, the SDK throws an `AuthenticationException` and the user must re-authorize.

## Error Handling

All SDK methods throw exceptions that extend `com.mobiscroll.connect.exceptions.MobiscrollConnectException`. You can catch the base class or any specific subclass.

| Exception | HTTP Status | Extra |
|---|---|---|
| `AuthenticationException` | 401, 403 | — (raised after refresh + retry has been exhausted) |
| `ValidationException` | 400, 422 | `getDetails()` (`JsonNode`) |
| `NotFoundException` | 404 | — |
| `RateLimitException` | 429 | `getRetryAfter()` (`Integer`, seconds) |
| `ServerException` | 5xx | `getStatusCode()` (`int`) |
| `NetworkException` | — | wraps the underlying `IOException` cause |

```java
import com.mobiscroll.connect.exceptions.*;
import com.mobiscroll.connect.models.EventListParams;
import java.time.OffsetDateTime;

try {
    var response = client.events().list(EventListParams.builder()
        .start(OffsetDateTime.parse("2026-01-01T00:00:00Z"))
        .end(OffsetDateTime.parse("2026-02-01T00:00:00Z"))
        .build());
} catch (AuthenticationException e) {
    // Token expired and refresh failed — re-authorize the user
} catch (ValidationException e) {
    // Invalid request parameters
    var details = e.getDetails();
} catch (RateLimitException e) {
    Integer retryAfter = e.getRetryAfter(); // seconds
} catch (MobiscrollConnectException e) {
    // Catch-all for any other SDK error
}
```

## API

The client exposes resources that map directly to the API endpoints.

### Auth

The `client.auth()` resource handles the OAuth authorization flow, including generating authorization URLs, exchanging codes for tokens, managing connection status, and disconnecting providers.

<DocCardList items={[
  {
    type: 'link',
    label: 'OAuth API Reference',
    href: '/connect/oauth',
    icon: '🔐'
  },
]} />

### Calendars

The `client.calendars()` resource allows you to list available calendars from all connected providers (Google, Outlook, etc.). It corresponds to the `/calendars` endpoints.

<DocCardList items={[
  {
    type: 'link',
    label: 'Calendars API Reference',
    href: '/connect/calendars',
    icon: '📅'
  },
]} />

### Events

The `client.events()` resource provides methods to create, read, update, and delete calendar events across all connected accounts. It corresponds to the `/events` endpoints.

<DocCardList items={[
  {
    type: 'link',
    label: 'Events API Reference',
    href: '/connect/events',
    icon: '📅'
  },
]} />
