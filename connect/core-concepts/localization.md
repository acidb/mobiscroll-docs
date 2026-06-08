---
sidebar_position: 2
slug: /localization
title: Localization
sidebar_label: Localization
description: Localize the Mobiscroll Connect pages — set the language with the lng parameter (en, es, fr, ar), with Accept-Language fallback and right-to-left support.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Localization

The Mobiscroll Connect pages — where the user selects a calendar provider, signs in, and approves the consent screen — are localized. You choose the language by passing the `lng` parameter when you start the authorization flow, so the pages render in the same language as the application that sent the user there.

Localization applies to the **user-facing Connect pages only**. API JSON responses and webhook payloads always remain in English.

## Supported languages

| Code | Language | Direction |
| :--- | :--- | :--- |
| **`en`** | English | Left-to-right |
| **`es`** | Spanish | Left-to-right |
| **`fr`** | French | Left-to-right |
| **`ar`** | Arabic | Right-to-left |

## Setting the language

The language is selected with the `lng` query parameter on the authorize URL — the same URL that opens the Connect pages. This is the recommended way for a calling application to pass a locale.

When you use one of the SDKs, pass `lng` to the auth-URL builder instead of constructing the query string by hand.

<Tabs>
<TabItem value="api" label="REST">

```bash
GET /authorize?client_id=proj-123&user_id=user-456&response_type=code&lng=es
```

</TabItem>
<TabItem value="node" label="Node.js SDK">

```typescript
const authUrl = client.auth.generateAuthUrl({ userId: 'user-456', lng: 'es' });
```

</TabItem>
<TabItem value="python" label="Python SDK">

```python
auth_url = client.auth.generate_auth_url(user_id='user-456', lng='es')
```

</TabItem>
<TabItem value="php" label="PHP SDK">

```php
$authUrl = $client->auth()->generateAuthUrl(userId: 'user-456', lng: 'es');
```

</TabItem>
<TabItem value="dotnet" label=".NET SDK">

```csharp
var authUrl = client.Auth.GenerateAuthUrl(new AuthorizeParams { UserId = "user-456", Lng = "es" });
```

</TabItem>
<TabItem value="java" label="Java SDK">

```java
String authUrl = client.auth().generateAuthUrl(
    AuthUrlParams.builder().userId("user-456").lng("es").build());
```

</TabItem>
<TabItem value="go" label="Go SDK">

```go
authURL := client.Auth().GenerateAuthURL(&mobiscroll.AuthURLParams{UserID: "user-456", Lng: "es"})
```

</TabItem>
<TabItem value="ruby" label="Ruby SDK">

```ruby
auth_url = client.auth.generate_auth_url(user_id: 'user-456', lng: 'es')
```

</TabItem>
</Tabs>

See the [`lng` request parameter](../api/oauth.md#authorize-lng) on the [Authorize endpoint](../api/oauth.md#endpoint-authorize) for the full API reference, and your SDK's [integration guide](../integration/node-sdk.md) for the exact syntax.

## Language fallback

If `lng` is not provided, Connect resolves the language in the following order:

1. The `lng` query parameter, when present.
2. The user's browser `Accept-Language` header.
3. English (`en`) as the final default.

Existing integrations that do not pass `lng` continue to work without changes — users whose browser language is supported now see the Connect pages in that language automatically. To force English regardless of the browser, pass `lng=en` explicitly.

## Right-to-left (RTL)

Arabic (`ar`) is the first right-to-left locale. When `ar` is active, the Connect UI direction switches to right-to-left automatically — no extra configuration is required.

:::info What gets localized
The localized pages are the provider selection (`authorize`), consent, Apple and CalDAV login, error, and session-lost pages. Anything your application consumes programmatically — API responses and webhook notifications — stays in English regardless of `lng`.
:::

:::tip Related
- [Authorize API reference](../api/oauth.md#endpoint-authorize) — the `lng` parameter and the full authorization request.
- [Scopes & Permissions](./scopes.md) — the other core concept that shapes the authorization request.
:::
