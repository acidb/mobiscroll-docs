# OAuth API

## Authorize {#endpoint-authorize}

Entry point for the OAuth2 authorization flow. Creates or retrieves the user in the database, loads any existing tokens, stores the OAuth request in a cookie, and redirects to the provider selection page where users can connect their calendar accounts.

:::info
This endpoint does not require authentication. It initiates the OAuth2 authorization flow.

**Endpoint:** `GET /authorize`
:::

### Request Parameters

#### client_id {#authorize-client_id}

*string*

Project/application identifier. This uniquely identifies your application in the Mobiscroll Connect system.

**Required**

#### user_id {#authorize-user_id}

*string*

External user identifier from the client application. This is your application's unique identifier for the user.

**Required**

#### user_name {#authorize-user_name}

*string*

User's display name. Used for identification and display purposes.

**Default value**: `undefined`

#### user_email {#authorize-user_email}

*string*

User's email address. May be used for provider authentication and identification.

**Default value**: `undefined`

#### redirect_uri {#authorize-redirect_uri}

*string*

Callback URL after authorization completes. **Note:** This parameter is retrieved from the database based on the `client_id`, not from the query parameter. The user will be redirected to this URL with the authorization code.

**Default value**: Retrieved from database

#### state {#authorize-state}

*string*

Optional state parameter to maintain across the OAuth flow. This is passed back to your redirect_uri and can be used to prevent CSRF attacks and maintain application state.

**Default value**: `undefined`

#### response_type {#authorize-response_type}

*string*

OAuth2 response type. Typically set to `"code"` for the authorization code flow.

**Default value**: `undefined`

### Response

#### Redirect {#authorize-redirect}

*302 - Redirect*

Redirects to the provider selection page (`/provider-select.html`) with all query parameters preserved (including the resolved `redirect_uri` from the database). The provider selection page allows the user to:

1. Choose which calendar provider(s) to connect (Google Calendar, Microsoft Outlook, Apple Calendar)
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

#### Cookie {#authorize-cookie}

Sets `oauth_req` cookie containing the complete OAuth request for later retrieval. The cookie has the following properties:
- **httpOnly**: true
- **path**: /
- **maxAge**: 30 minutes
- **sameSite**: lax

### Error Responses

- **400** - Bad Request. Error creating or retrieving user
- **401** - Unauthorized. Invalid or unrecognized `client_id`
- **500** - Internal Server Error. Database or unexpected error

### Examples

```bash title="Initiate OAuth authorization"
GET /authorize?client_id=proj-123&user_id=user-456&user_name=John&user_email=john@example.com&redirect_uri=https://app.example.com/callback&response_type=code&state=xyz789
```

```bash title="Redirects to provider selection page"
302 Redirect
Location: /provider-select.html?client_id=proj-123&user_id=user-456&user_name=John&user_email=john@example.com&redirect_uri=https://app.example.com/callback&response_type=code&state=xyz789

Set-Cookie: oauth_req={"client_id":"proj-123","user_id":"user-456",...}; HttpOnly; Path=/; Max-Age=1800; SameSite=Lax
```

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

#### grant_type {#token-grant_type}

*string*

The OAuth2 grant type. Must be set to `"authorization_code"` for the authorization code flow.

**Required**

#### code {#token-code}

*string*

The authorization code received from the authorization endpoint. This code is the `user_id` and is returned to your `redirect_uri` after the user completes the authorization flow.

**Required**

#### redirect_uri {#token-redirect_uri}

*string*

The redirect URI used in the authorization request. This must match exactly with the redirect URI used when obtaining the authorization code.

**Required**

#### client_id {#token-client_id}

*string*

Your application's client identifier. Required if not using HTTP Basic authentication.

**Default value**: `undefined`

#### client_secret {#token-client_secret}

*string*

Your application's client secret. Required if not using HTTP Basic authentication.

**Default value**: `undefined`

### Response

#### access_token {#token-response-access_token}

*string*

The access token (JWT) that can be used to authenticate API requests. This token contains the user ID, client ID, and project ID in the payload.

#### token_type {#token-response-token_type}

*string*

The type of token returned. Always `"Bearer"`.

#### expires_in {#token-response-expires_in}

*number*

The lifetime in seconds of the access token. Typically `3600` (1 hour).

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
