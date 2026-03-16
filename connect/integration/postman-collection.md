---
sidebar_label: Postman
sidebar_position: 2
slug: /postman-collection
---

# Get started with the Postman Collection

Use the Mobiscroll Connect Postman assets to validate OAuth flows and API endpoints in both local and production environments.

## Download assets

- [Mobiscroll Connect Public API collection](/connect/postman/mobiscroll-connect-public-api.postman_collection.json)
- [Local environment](/connect/postman/mobiscroll-connect-public-local.postman_environment.json)
- [Production environment](/connect/postman/mobiscroll-connect-public-prod.postman_environment.json)

## Prerequisites

Before using the collection, make sure:

- You have a reachable Mobiscroll Connect API base URL (for example local `http://localhost:3000` or your production API URL)
- You have valid OAuth credentials (`clientId`, `clientSecret`) for the target environment
- You have a valid `userId` for the same environment
- At least one provider account is connectable (Google, Microsoft, Apple, or CalDAV)

Quick health check:

- Request: `GET /api/health`
- Expected response: `{ "status": "ok" }`

## 1) Import the collection

1. Open Postman.
2. Click **Import**.
3. Import `Mobiscroll Connect Public API collection`.

## 2) Create and configure a Postman environment

Preferred: import one of the preset environment files.

1. In Postman, click **Import**.
2. Import one of:

- `Local environment`
- `Production environment`

3. Fill in `clientId`, `clientSecret`, and `userId` (see [Where to get each value](#where-to-get-each-value)).
4. Select this environment before sending requests.

Alternative: create an environment manually and define the variables below.

## Environment variables

The collection expects these variables:

- `baseUrl`
- `clientId`
- `clientSecret`
- `userId`
- `scope` (`read-write` or `free-busy`)
- `redirectUri` (must match your OAuth client config)
- `accessToken`
- `refreshToken`

### Where to get each value

- `clientId`, `clientSecret`, and app `redirectUri`: see [Application Setup Guide](/connect/application-setup)
- `userId` meaning and requirements: see [`user_id` in OAuth API](/connect/oauth#authorize-user_id)
- `scope` values and behavior: see [Scopes](/connect/scopes) and [`scope` in OAuth API](/connect/oauth#authorize-scope)
- `accessToken` and `refreshToken` generation: see [OAuth API](/connect/oauth#endpoint-token)
- Base API endpoints and auth overview: see [API Overview](/connect/overview)

If your team already provides Local/Staging/Prod Postman environments, use those first and only update sensitive values locally.

### Redirect URI rules by environment

- Local/dev explicit OAuth requests: `redirectUri` can be your local callback (for example `http://localhost:4000/callback`)
- Postman Authorization-tab flow: use `https://oauth.pstmn.io/v1/callback`
- Production Postman testing: ensure the production OAuth client allows Postman callback and set `redirectUri` to the Postman callback value

For Postman Authorization-tab token flow:

- `redirectUri=https://oauth.pstmn.io/v1/callback`

## 3) Understand collection auth behavior

The collection sends OAuth 2.0 Bearer auth globally using `{{accessToken}}`.

- **OAuth** folder: obtain, refresh, and revoke tokens
- **Calendars**, **Events**, **Webhooks** folders: require a valid token

If you get `401 Unauthorized`, refresh or replace `{{accessToken}}`.

## 3.1) Get a new token from the Postman Authorization tab

You can fetch a token directly from Postman without manually running token requests.

:::info
If you successfully get and apply a token from the Postman **Authorization** tab, you do **not** need to run the manual OAuth API flow in the next section.

The manual flow is included for clarity, debugging, and cases where you want to run each OAuth step explicitly.
:::

1. Open the collection and go to the **Authorization** tab.
2. Confirm **Type** is **OAuth 2.0**.
3. Click **Get New Access Token**.
4. In the token dialog, verify:

- Auth URL: `{{baseUrl}}/api/oauth/authorize?user_id={{userId}}&scope={{scope}}`
- Access Token URL: `{{baseUrl}}/api/oauth/token`
- Client ID: `{{clientId}}`
- Client Secret: `{{clientSecret}}`
- Callback URL: `https://oauth.pstmn.io/v1/callback`
- Scope: `{{scope}}`
- Client Authentication: `Send client credentials in body`

5. Complete login/consent flow.
6. Click **Use Token**.

Optionally copy the token to `{{accessToken}}` to keep environment variables in sync.

## 4) (Optional) Run the OAuth authorization-code flow manually

### Step 4.1: Open authorization URL in browser

Use **OAuth → Authorize (Browser)**:

- Method: `GET`
- Endpoint: `{{baseUrl}}/api/oauth/authorize`
- Query params: `response_type=code`, `client_id`, `user_id`, `scope`, `redirect_uri`

After redirect to `{{redirectUri}}?code=...`, copy the `code` value.

### Step 4.2: Exchange code for tokens

Use **OAuth → Exchange Code for Token**:

- Method: `POST`
- Endpoint: `{{baseUrl}}/api/oauth/token`
- Auth: Basic (`{{clientId}}` / `{{clientSecret}}`)
- Body (`x-www-form-urlencoded`):
	- `grant_type=authorization_code`
	- `code=<copied_code>`
	- `redirect_uri={{redirectUri}}`

Save values from response:

- `accessToken = access_token`
- `refreshToken = refresh_token`

### Step 4.3: Refresh access token

Use **OAuth → Refresh Token**:

- Method: `POST`
- Endpoint: `{{baseUrl}}/api/oauth/token`
- Auth: Basic (`{{clientId}}` / `{{clientSecret}}`)
- Body (`x-www-form-urlencoded`):
	- `grant_type=refresh_token`
	- `refresh_token={{refreshToken}}`

Replace `{{accessToken}}` with the new token.

### Step 4.4: Revoke token when done (recommended)

Use **OAuth → Revoke Token**:

- Method: `POST`
- Endpoint: `{{baseUrl}}/api/oauth/revoke`
- Body (`application/json`):
	- `token={{accessToken}}`

Use this as a cleanup/security step, especially in shared or production-like environments.

## 5) Test core API endpoints

Run these requests in order.

### Step 5.1: Verify service health

- Folder: **Health**
- Request: **Health Check**
- Expected: `200` with `{ "status": "ok" }`

### Step 5.2: List connected calendars

- Folder: **Calendars**
- Request: **Get Calendars** (`GET /api/calendars`)
- Requires: valid Bearer token (`{{accessToken}}`)
- Scope: requires `read-write` or `read` scope; tokens issued with `free-busy` scope return `403`

If result is empty, connect at least one provider account first.

### Step 5.3: Query events

- Folder: **Events**
- Request: **Get Events** (`GET /api/events`)
- Required query params: `start`, `end`
- Optional query params: `pageSize`, `singleEvents`, `calendarIds`, `nextPageToken`

Use `nextPageToken` from response for pagination.

### Step 5.4: Create, update, and delete an event

All write operations require `read-write` scope. Tokens issued with `free-busy` or other non-write scopes return `401`.

1. **Create Event** (`POST /api/event`) with `provider`, `calendarId`, `title`, `start`, `end` — returns `201`
2. **Update Event** (`PUT /api/event`) with `provider`, `calendarId`, `eventId` — returns `200`
3. **Delete Event** (`DELETE /api/event`) with `provider`, `calendarId`, `eventId` — returns `204` (no body)

### Step 5.5: Subscribe to webhook notifications

- Folder: **Webhooks**
- Request: **Subscribe Webhook** (`POST /api/subscribe-webhook`)
- Body fields: `provider`, `calendarId`, `expiration` (future timestamp in ms)

## Recommended test sequence

1. `Health Check`
2. `Authorize (Browser)`
3. `Exchange Code for Token`
4. `Get Calendars`
5. `Get Events`
6. `Create Event`
7. `Update Event`
8. `Delete Event`
9. `Refresh Token`
10. `Subscribe Webhook`
11. `Revoke Token`

## Troubleshooting

### 401 Unauthorized

- Confirm `{{accessToken}}` is set and current
- Run **Refresh Token**
- Verify OAuth client credentials for the current environment

### `invalid_client` or `invalid_grant`

- Verify `clientId` and `clientSecret`
- Ensure `redirectUri` exactly matches your OAuth client config
- Ensure the auth code is unused and not expired

### Empty calendars/events

- Complete provider connection flow first
- Verify the token belongs to the correct user/project
- Verify your query date range includes data

### 400 on event create/update

- Validate `provider` and `calendarId`
- Ensure `start` and `end` are valid ISO timestamps
- Ensure required fields are present

## Security notes

- Access tokens are short-lived; use refresh flow for renewals
- Keep `clientSecret` private
- Do not share exported environments that contain secrets
