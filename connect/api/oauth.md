---
sidebar_position: 2
sidebar_label: OAuth API
slug: /oauth
description: OAuth 2.0 endpoints for Mobiscroll Connect — authorize users, exchange codes for tokens, check connection status, and revoke access.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Parameter } from '@site/src/components/Connect';

# OAuth API

## Authorize {#endpoint-authorize}

Entry point for the OAuth2 authorization flow. Creates or retrieves the user in the database, loads any existing tokens, stores the OAuth request in a cookie, and redirects to the provider selection page where users can connect their calendar accounts.

:::info
This endpoint does not require authentication. It initiates the OAuth2 authorization flow.

**Endpoint:** `GET /authorize`
:::

### Request Parameters


<Parameter name="client_id" type="string" required id="authorize-client_id">
Project/application identifier. This uniquely identifies your application in the Mobiscroll Connect system.
</Parameter>

<Parameter name="user_id" type="string" required id="authorize-user_id">
Your own unique identifier for the user in your system who is being authorized.
</Parameter>

<Parameter name="scope" type="string" defaultValue={<code>read-write</code>} id="authorize-scope">
The scope of access requested from the user. Can be one of `free-busy`, `read`, or `read-write`. If not specified, defaults to `read-write`.
</Parameter>

<Parameter name="redirect_uri" type="string" defaultValue="Retrieved from database" id="authorize-redirect_uri">
Callback URL after authorization completes. **Note:** This parameter is retrieved from the database based on the `client_id`, not from the query parameter. The user will be redirected to this URL with the authorization code.
</Parameter>

<Parameter name="state" type="string" defaultValue={<code>undefined</code>} id="authorize-state">
Optional state parameter to maintain across the OAuth flow. This is passed back to your redirect_uri and can be used to prevent CSRF attacks and maintain application state.
</Parameter>

<Parameter name="response_type" type="string" defaultValue={<code>undefined</code>} id="authorize-response_type">
OAuth2 response type. Typically set to `"code"` for the authorization code flow.
</Parameter>

### Response


<Parameter name="Redirect" type="302 - Redirect" id="authorize-redirect">
Redirects to the provider selection page (`/authorize`) with all query parameters preserved (including the resolved `redirect_uri` from the database). The provider selection page allows the user to:

1. Choose which calendar provider(s) to connect (Google Calendar, Microsoft Outlook, Apple Calendar, CalDAV)
2. Authenticate with each selected provider
3. Review and approve the OAuth consent screen
4. Complete the OAuth authorization flow

After the user successfully authenticates and approves the authorization, they will be redirected back to your application's `redirect_uri` with:
- `code`: The authorization code that can be exchanged for an access token (this is the `user_id` value)
- `state`: The state parameter you provided (if any), for CSRF protection

**Example redirect to your application:**
```
https://app.example.com/callback?code=user-456&state=xyz789
```
</Parameter>

<Parameter name="Cookie" type="httpOnly" id="authorize-cookie">
Sets `oauth_req` cookie containing the complete OAuth request for later retrieval. The cookie has the following properties:

- **httpOnly**: true
- **path**: /
- **maxAge**: 30 minutes
- **sameSite**: lax

</Parameter>

### Error Responses

- **400** - Bad Request. Error creating or retrieving user
- **401** - Unauthorized. Invalid or unrecognized `client_id`
- **500** - Internal Server Error. Database or unexpected error

### Examples

<Tabs>
<TabItem value="api" label="REST">

```bash title="Initiate OAuth authorization"
GET /authorize?client_id=proj-123&user_id=user-456&redirect_uri=https://app.example.com/callback&response_type=code&state=xyz789&scope=read-write
```

```bash title="Redirects to authorization page"
302 Redirect
Location: /authorize?client_id=proj-123&user_id=user-456&redirect_uri=https://app.example.com/callback&response_type=code&state=xyz789&scope=read-write

Set-Cookie: oauth_req={"client_id":"proj-123","user_id":"user-456",...}; HttpOnly; Path=/; Max-Age=1800; SameSite=Lax
```

</TabItem>
<TabItem value="sdk" label="Node.js SDK">

```typescript
// Generate the authorization URL
const authUrl = client.auth.generateAuthUrl({
  userId: 'user-456',
  // Optional parameters
  // state: 'xyz789',
  // scope: 'calendar.readonly'
});

// Redirect the user to authUrl
// res.redirect(authUrl);
```

</TabItem>
<TabItem value="php" label="PHP SDK">

```php
// Generate the authorization URL
$authUrl = $client->auth()->generateAuthUrl(
    userId: 'user-456',
    // Optional parameters:
    // scope: 'read-write',
    // state: 'xyz789',
);

// Redirect the user to $authUrl
header('Location: ' . $authUrl);
```

</TabItem>
</Tabs>

:::info
- The `client_id` is validated against the database before proceeding
- If the `client_id` is invalid, the user is redirected to an error page
- The `redirect_uri` is retrieved from the database based on the `client_id` (not from the query parameter)
- The OAuth request is stored in a cookie to maintain state across the authorization flow
- If the user already exists in the database, their existing information is retrieved
- Any existing provider tokens are loaded and initialized in the token store
- The cookie expires after 30 minutes if the flow is not completed
- All query parameters plus the database `redirect_uri` are preserved and passed to the provider selection page
:::

:::info Re-authorizing an existing user
Calling `/authorize` again for a `user_id` that already has tokens **does not revoke** any existing access or refresh tokens. The existing tokens are loaded and remain valid. The authorization flow simply allows the user to connect additional calendar provider accounts on top of the ones already connected.

To fully invalidate a user's tokens before re-authorization, call [`POST /revoke`](#endpoint-revoke) first.
:::

---

## Token management {#token-management}

### Token Lifetimes {#token-lifetimes}

The following table summarizes the lifetime of every credential issued by Mobiscroll Connect.

| Token / Credential | Lifetime | Notes |
|--------------------|----------|-------|
| **Authorization code** | 10 minutes | Single-use — deleted on first exchange |
| **Access token (JWT)** | 1 hour (`3600 s`) | `exp` claim embedded in the JWT; rejected immediately after expiry even if the signature is valid |
| **Refresh token** | No embedded expiry | The refresh token **does not** expire after a given time. Validity enforced server-side via JTI rotation (rotation happens on refresh call, not by time). Remains valid until used/rotated or explicitly revoked. If refresh returns `invalid_grant` or the newly issued refresh token is lost before persistence, the user must re-authorize. |
| **OAuth session cookie** | 30 minutes | `oauth_req` cookie that carries the in-progress authorization state |

:::info Refresh Token Rotation
Every `POST /token` call with `grant_type=refresh_token` issues a **new** refresh token and immediately invalidates the previous one.
Presenting an already-rotated refresh token returns `invalid_grant`.
Calling `/revoke` invalidates the entire token family (all access tokens and refresh tokens for that user/client pair) at once.
:::

### Handling token expiry on API calls {#handling-401}

All protected API endpoints (`/events`, `/calendars`, `/webhooks/subscribe`, etc.) validate the `Authorization: Bearer <access_token>` header. When the access token is missing, expired, or revoked the server returns **`401 Unauthorized`**.

Recommended handling flow:

```
API call
  └─► 401 Unauthorized
    └─► POST /token  (grant_type=refresh_token)
      ├─► 200 OK  →  persist new tokens, retry original request
      └─► 400 invalid_grant  →  user must re-authorize (redirect to GET /authorize)
```

:::tip
Implement a single request-retry wrapper (or an HTTP interceptor) that catches `401` responses, attempts one token refresh, and only falls back to re-authorization if the refresh itself fails.
:::

---

## Get Access Token {#endpoint-token}

Exchanges an authorization code for an access token. This is the token endpoint of the OAuth2 authorization code flow.

:::info
This endpoint requires client authentication using either HTTP Basic authentication or client credentials in the request body.

**Endpoint:** `POST /token`
:::

### Authentication

This endpoint supports two authentication methods:

**HTTP Basic Authentication:**
```
Authorization: Basic base64(client_id:client_secret)
```

**Request Body Authentication:**
- Include `client_id` and `client_secret` in the request body

### Request Parameters


<Parameter name="grant_type" type="string" required id="token-grant_type">
The OAuth2 grant type. Must be set to `"authorization_code"` for the authorization code flow.
</Parameter>

<Parameter name="code" type="string" required id="token-code">
The authorization code received from the authorization endpoint. This code is the `user_id` and is returned to your `redirect_uri` after the user completes the authorization flow.
</Parameter>

<Parameter name="redirect_uri" type="string" required id="token-redirect_uri">
The redirect URI used in the authorization request. This must match exactly with the redirect URI used when obtaining the authorization code.
</Parameter>

<Parameter name="client_id" type="string" defaultValue={<code>undefined</code>} id="token-client_id">
Your application's client identifier. Required if not using HTTP Basic authentication.
</Parameter>

<Parameter name="client_secret" type="string" defaultValue={<code>undefined</code>} id="token-client_secret">
Your application's client secret. Required if not using HTTP Basic authentication.
</Parameter>

### Response



<Parameter name="access_token" type="string" id="token-response-access_token">
The access token (JWT) that can be used to authenticate API requests. This token contains the user ID, client ID, and project ID in the payload.

:::info What is an Access Token?
An **access token** is a credential (usually a string) that your application receives after a successful authentication. It is used to authorize API requests on behalf of a user. In Mobiscroll Connect, the access token is a JWT (JSON Web Token).
:::

:::info What is a JWT (JSON Web Token)?
A **JWT** is a secure, compact, URL-safe token format that encodes claims about the user and the application. Mobiscroll Connect uses JWTs as access tokens, which include information such as the user ID, client ID, and expiration time. The server verifies the JWT to ensure requests are authentic and authorized.
:::
</Parameter>

<Parameter name="token_type" type="string" id="token-response-token_type">
The type of token returned. Always `"Bearer"`.
</Parameter>

<Parameter name="expires_in" type="number" id="token-response-expires_in">
The lifetime in seconds of the access token. `3600` (1 hour).
</Parameter>

<Parameter name="refresh_token" type="string" id="token-response-refresh_token">
A refresh token that can be used to obtain a new access token when the current one expires. Refresh tokens do not expire on their own — they remain valid until used or explicitly revoked. Each use of a refresh token issues a new access token **and** a new refresh token (token rotation), and the previous refresh token is invalidated. Store this token securely on the server side.

:::info What is a Refresh Token?
An **access token** is short-lived (1 hour). Rather than forcing the user to log in again every hour, the server issues a **refresh token** alongside the access token. Your application stores the refresh token securely (server-side, never in the browser) and uses it — silently, without user interaction — to obtain a fresh access token whenever the current one expires.

If you lose the refresh token (e.g. it was never persisted, or was overwritten before the new one was saved), the user must complete the full OAuth authorization flow again to restore access.
:::

:::info Refresh Token Rotation
Mobiscroll Connect implements **refresh token rotation**: every time you exchange a refresh token for a new access token, the server issues a brand-new refresh token and invalidates the old one. If an already-used (revoked) refresh token is presented again, the request is rejected with `invalid_grant`.
:::
</Parameter>

### Error Responses

- **400** - Bad Request
  - `invalid_grant` - Invalid authorization code, code expired, client mismatch, or redirect URI mismatch
  - `invalid_client` - Client authentication failed
  - `invalid_request` - Missing required parameters
  - `session_expired` - OAuth session expired (transaction lost)
- **401** - Unauthorized. Client authentication failed

### Token Validation

The endpoint performs the following validations:

1. **Authorization code exists** - The code must be valid and found in the database
2. **Client match** - The client_id must match the one used to obtain the code
3. **Redirect URI match** - The redirect_uri must exactly match the original request
4. **Code expiration** - The authorization code expires after 10 minutes
5. **Single use** - The authorization code is deleted after successful exchange

### JWT Token Payload

The **access token** is a JWT containing:

```json
{
  "sub": "user_id",            // User identifier
  "aud": "client_id",          // Client/Project identifier
  "projectId": "client_id",    // Project identifier
  "exp": 1234567890            // Expiration timestamp (1 hour from issuance)
}
```

The **refresh token** is a JWT containing:

```json
{
  "sub": "user_id",            // User identifier
  "aud": "client_id",          // Client/Project identifier
  "projectId": "client_id",    // Project identifier
  "type": "refresh",           // Token type discriminator
  "jti": "uuid",               // Unique token ID (used for rotation tracking)
  // No "exp" — validity is managed server-side via the database
}
```

### Examples

<Tabs>
<TabItem value="api" label="REST">

```bash title="Exchange authorization code for access token (HTTP Basic Auth)"
POST /token
Authorization: Basic YmFzZTY0X2VuY29kZWRfY3JlZGVudGlhbHM=
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&code=user-456&redirect_uri=https://app.example.com/callback
```

```bash title="Exchange authorization code for access token (Body Auth)"
POST /token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&code=user-456&redirect_uri=https://app.example.com/callback&client_id=proj-123&client_secret=secret-xyz
```

```json title="Success Response"
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

```json title="Error Response - Invalid Code"
{
  "error": "invalid_grant",
  "error_description": "Invalid authorization code"
}
```

```json title="Error Response - Code Expired"
{
  "error": "invalid_grant",
  "error_description": "Authorization code expired"
}
```

</TabItem>
<TabItem value="sdk" label="Node.js SDK">

```typescript
// Exchange authorization code for access token
// The client uses the configured clientId and clientSecret
const tokenResponse = await client.auth.getToken(code);

// The client is automatically authenticated with the new token
// You can also access it later via tokenResponse.access_token or client.getConfig() credentials
```

</TabItem>
<TabItem value="php" label="PHP SDK">

```php
// Exchange authorization code for access token
$code = $_GET['code'];
$tokenResponse = $client->auth()->getToken($code);

// Store the token and authenticate the client
$client->auth()->setCredentials($tokenResponse);
```

</TabItem>
</Tabs>

```json title="Error Response - Client Mismatch"
{
  "error": "invalid_grant",
  "error_description": "Client mismatch"
}
```

:::info
- Authorization codes expire after 10 minutes
- Authorization codes are single-use and deleted after successful exchange
- Access tokens expire after 1 hour
- A refresh token is always returned alongside the access token; store it securely server-side
- The access token is a JWT that must be included as a Bearer token in all subsequent API requests
- Client credentials can be provided via HTTP Basic authentication or in the request body
- The redirect_uri must exactly match the one used in the authorization request
- Revoked access tokens are rejected immediately even if the JWT signature is still valid
:::

---

## Refresh Access Token {#endpoint-refresh-token}

Obtains a new access token using a refresh token. Each call also issues a new refresh token and invalidates the previously used one (refresh token rotation).

:::info
This endpoint requires client authentication using either HTTP Basic authentication or client credentials in the request body.

**Endpoint:** `POST /token`
:::

### Authentication

Same as [Get Access Token](#endpoint-token) — HTTP Basic or request body credentials.

### Request Parameters

<Parameter name="grant_type" type="string" required id="refresh-grant_type">
Must be `"refresh_token"`.
</Parameter>

<Parameter name="refresh_token" type="string" required id="refresh-refresh_token">
The refresh token obtained from a previous token exchange.
</Parameter>

<Parameter name="client_id" type="string" defaultValue={<code>undefined</code>} id="refresh-client_id">
Your application's client identifier. Required if not using HTTP Basic authentication.
</Parameter>

<Parameter name="client_secret" type="string" defaultValue={<code>undefined</code>} id="refresh-client_secret">
Your application's client secret. Required if not using HTTP Basic authentication.
</Parameter>

### Response

<Parameter name="access_token" type="string" id="refresh-response-access_token">
A new access token (JWT) valid for 1 hour.
</Parameter>

<Parameter name="token_type" type="string" id="refresh-response-token_type">
Always `"Bearer"`.
</Parameter>

<Parameter name="expires_in" type="number" id="refresh-response-expires_in">
The lifetime in seconds of the new access token. `3600` (1 hour).
</Parameter>

<Parameter name="refresh_token" type="string" id="refresh-response-refresh_token">
A new refresh token. The previously used refresh token is immediately invalidated. Store this new token in place of the old one.

:::info Scope inheritance
The new access token carries the **same scope** as the original authorization. Scope cannot be upgraded through token refresh — the user must re-authorize (via [`GET /authorize`](#endpoint-authorize)) to request a different scope.
:::

:::warning Persist the new refresh token before using it
The moment this endpoint responds successfully, the **old** refresh token is gone. You must durably persist the new refresh token **before** discarding the old one. If your application crashes, loses the response, or fails to save the token to your database:
- The old token is already invalidated — it cannot be reused.
- The new token is lost — it was only ever returned in this response.
- **The user must re-authorize** (complete the full OAuth flow again) to restore access.

To mitigate this, persist the new token atomically (e.g. in a database transaction) before acknowledging success, and avoid concurrent refresh calls for the same user.
:::
</Parameter>

### Error Responses

- **400** - Bad Request
  - `invalid_grant` - Refresh token not found, already revoked, client mismatch, or wrong token type
  - `invalid_client` - Client authentication failed

### Examples

<Tabs>
<TabItem value="api" label="REST">

```bash title="Refresh access token (HTTP Basic Auth)"
POST /token
Authorization: Basic YmFzZTY0X2VuY29kZWRfY3JlZGVudGlhbHM=
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token&refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

```json title="Success Response"
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

```json title="Error Response - Revoked or Invalid Token"
{
  "error": "invalid_grant",
  "error_description": "Invalid refresh token"
}
```

</TabItem>
<TabItem value="php" label="PHP SDK">

```php
// Token refresh is handled automatically by the SDK.
// Register a callback to persist the new tokens whenever a refresh occurs.
$client->onTokensRefreshed(function (TokenResponse $updatedTokens) {
    // Persist in your database or session store
    $_SESSION['tokens'] = $updatedTokens->toArray();
});
```

</TabItem>
</Tabs>

:::info
- Always replace the stored refresh token with the new one returned in the response
- Presenting a refresh token that has already been used (rotated out) is rejected with `invalid_grant`
- Repeated or concurrent refresh attempts with the same token can fail once rotation has already occurred
- Refresh tokens are managed server-side; they have no embedded expiry date
:::

---

## Revoke Token {#endpoint-revoke}

Revokes all active access tokens and refresh tokens for a given user/client pair. Use this endpoint when the user logs out or explicitly disconnects from Mobiscroll Connect.

:::info
This endpoint does not require authentication. The token itself is used to identify the user and client.

**Endpoint:** `POST /revoke`
:::

### Request Body

<Parameter name="token" type="string" required id="revoke-token">
Either an access token or a refresh token. The server decodes it to extract the user and client identifiers, then revokes all active tokens for that user/client combination.
</Parameter>

### Response

Returns `200 OK` even if the token was already invalid or expired — this prevents leaking information about token state.

```json title="Success Response"
{
  "success": true
}
```

### Error Responses

- **400** - Bad Request. `token` field is missing or not a string.

### Examples

<Tabs>
<TabItem value="api" label="REST">

```bash title="Revoke tokens"
POST /revoke
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

```json title="Success Response"
{
  "success": true
}
```

</TabItem>
<TabItem value="php" label="PHP SDK">

The PHP SDK does not include a built-in revoke method. Use the REST endpoint directly to revoke tokens.

</TabItem>
</Tabs>

:::info
- Both access tokens and refresh tokens are accepted — the endpoint revokes the entire token family regardless of which token type is provided
- The response is always `200` with `{ "success": true }` to avoid leaking information about token validity
- After revocation, the user must complete the OAuth authorization flow again to obtain new tokens
:::
