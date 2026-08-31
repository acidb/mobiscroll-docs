---
sidebar_position: 2
slug: /localization
title: Localization
sidebar_label: Localization
description: Localize the Mobiscroll Connect pages — set the language with the lng parameter, with Accept-Language fallback and right-to-left support.
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
| **`en-GB`** | English (British) | Left-to-right |
| **`es`** | Spanish | Left-to-right |
| **`fr`** | French | Left-to-right |
| **`de`** | German | Left-to-right |
| **`it`** | Italian | Left-to-right |
| **`nl`** | Dutch | Left-to-right |
| **`ca`** | Catalan | Left-to-right |
| **`pt-PT`** | Portuguese (European) | Left-to-right |
| **`pt-BR`** | Portuguese (Brazilian) | Left-to-right |
| **`ro`** | Romanian | Left-to-right |
| **`pl`** | Polish | Left-to-right |
| **`cs`** | Czech | Left-to-right |
| **`sk`** | Slovak | Left-to-right |
| **`hu`** | Hungarian | Left-to-right |
| **`hr`** | Croatian | Left-to-right |
| **`sr`** | Serbian | Left-to-right |
| **`bg`** | Bulgarian | Left-to-right |
| **`ru`** | Russian | Left-to-right |
| **`uk`** | Ukrainian | Left-to-right |
| **`lt`** | Lithuanian | Left-to-right |
| **`el`** | Greek | Left-to-right |
| **`tr`** | Turkish | Left-to-right |
| **`sv`** | Swedish | Left-to-right |
| **`da`** | Danish | Left-to-right |
| **`no`** | Norwegian (Bokmål) | Left-to-right |
| **`fi`** | Finnish | Left-to-right |
| **`hi`** | Hindi | Left-to-right |
| **`th`** | Thai | Left-to-right |
| **`vi`** | Vietnamese | Left-to-right |
| **`ja`** | Japanese | Left-to-right |
| **`ko`** | Korean | Left-to-right |
| **`zh-Hans`** | Chinese (Simplified) | Left-to-right |
| **`zh-Hant`** | Chinese (Traditional) | Left-to-right |
| **`ar`** | Arabic | Right-to-left |
| **`he`** | Hebrew | Right-to-left |
| **`fa`** | Persian | Right-to-left |

### Region-qualified codes

`lng` accepts region-qualified codes in the `xx-YY` form. European and Brazilian Portuguese are separate languages here, not one shared Portuguese — they differ in vocabulary, grammar and how the progressive is formed, so pick the one that matches your users.

Codes are written with a hyphen, as in `pt-BR`. Matching is case-insensitive, and an underscore is accepted in place of the hyphen, so `pt-BR`, `pt-br`, `PT-BR` and `pt_BR` all select Brazilian Portuguese.

When a code does not match a language in the table exactly, Connect falls back in this order:

1. **A region or script variant we ship** — `?lng=pt-BR` uses Brazilian Portuguese, `?lng=zh-Hant` Traditional Chinese.
2. **A mapped equivalent** — some languages are commonly requested under a code they do not ship under, and those are matched too:

   | You send | You get | Why |
   | :--- | :--- | :--- |
   | `zh-CN`, `zh-SG`, `zh-MY` | `zh-Hans` | These regions write Simplified Chinese |
   | `zh-TW`, `zh-HK`, `zh-MO` | `zh-Hant` | These regions write Traditional Chinese |
   | `nb`, `nb-NO`, `nn` | `no` | `nb` is Bokmål, which is what browsers send for Norwegian |
   | `iw` | `he` | `iw` is the deprecated code for Hebrew, still sent by older clients |
   | `ua` | `uk` | `uk` is the language code for Ukrainian; `ua` is the country code |
   | `en-AU`, `en-NZ`, `en-IE`, `en-ZA` | `en-GB` | These regions use British spelling |

3. **The bare language, if we ship it** — `?lng=de-CH` and `?lng=es-MX` use German and Spanish; `?lng=ru-UA` uses Russian.
4. **The language's default variant** — a bare `?lng=pt`, or a Portuguese region we do not ship separately such as `pt-AO`, uses European Portuguese. A bare `?lng=zh` uses Simplified Chinese.
5. **English.**

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

`Accept-Language` is matched the same way as `lng`, so a browser sending `pt-BR,pt;q=0.9` gets Brazilian Portuguese and one sending `pt-PT` gets European Portuguese. See [Region-qualified codes](#region-qualified-codes) for the order Connect tries.

Existing integrations that do not pass `lng` continue to work without changes — users whose browser language is supported now see the Connect pages in that language automatically. To force English regardless of the browser, pass `lng=en` explicitly.

## Right-to-left (RTL)

Arabic (`ar`) is the first right-to-left locale. When `ar` is active, the Connect UI direction switches to right-to-left automatically — no extra configuration is required.

:::info What gets localized
The localized pages are the provider selection (`authorize`), the iCloud and CalDAV login pages, and the error page. Anything your application consumes programmatically — API responses and webhook notifications — stays in English regardless of `lng`.
:::

:::tip Related
- [Authorize API reference](../api/oauth.md#endpoint-authorize) — the `lng` parameter and the full authorization request.
- [Scopes & Permissions](./scopes.md) — the other core concept that shapes the authorization request.
:::
