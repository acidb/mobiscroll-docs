---
sidebar_position: 2
sidebar_label: OAuth API
slug: /oauth
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
External user identifier from the client application. This is your application's unique identifier for the user.
</Parameter>

<Parameter name="scope" type="string" defaultValue={<code>undefined</code>} id="authorize-scope">
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
The lifetime in seconds of the access token. Typically `3600` (1 hour).
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

The access token is a JWT containing:

```json
{
  "sub": "user_id",            // User identifier
  "aud": "client_id",          // Client/Project identifier
  "projectId": "client_id",    // Project identifier
  "exp": 1234567890            // Expiration timestamp
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
  "expires_in": 3600
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
- The access token is a JWT that must be included as a Bearer token in all subsequent API requests
- Client credentials can be provided via HTTP Basic authentication or in the request body
- The redirect_uri must exactly match the one used in the authorization request
:::
