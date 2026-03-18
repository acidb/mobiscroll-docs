---
sidebar_label: Postman Collection
sidebar_position: 3
slug: /postman-collection
---

import { PostmanRunButton } from '@site/src/components/Connect/PostmanRunButton';

# Get started with the Postman Collection

Use the Mobiscroll Connect Postman assets to explore the API, validate OAuth flows, and test endpoints against the production server — without writing any code. It is most useful after completing the [Application Setup Guide](/connect/application-setup#verifying-the-integration), before starting SDK or REST integration work.

## Quick start from App Settings (recommended)

If you are starting from the docs, the fastest setup is from your Connect app settings page.

1. Open **Connect → Applications → Your app → Settings**.
2. In the **API credentials** section, click **Download environment**.
3. Click **Run in Postman** to fork the collection.
4. In Postman, import the downloaded `Mobiscroll-Connect-Environment.postman_environment.json` file.
5. Select this environment for the forked collection, then continue with OAuth and endpoint tests below.

This path pre-fills `baseUrl`, `clientId`, and `clientSecret` for the selected app, so setup is faster and less error-prone.

:::info
For Postman OAuth testing, your Connect app must allow `https://oauth.pstmn.io/v1/callback` as a redirect URI.
If this URI is missing from app settings, token exchange/auth flows in Postman can fail with `invalid_grant` or redirect URI mismatch errors.
:::

## Run in Postman

You can also fork the collection directly from this page:

<PostmanRunButton />

## Download assets

If you are not using the app settings page, use these direct files:

- [Mobiscroll Connect API Collection](/connect/postman/mobiscroll-connect-api-collection.json)
- [Mobiscroll Connect API Environment](/connect/postman/mobiscroll-connect-api-environment.json)

## Prerequisites

Before using the collection, make sure:

- `baseUrl` is already set to `https://connect.mobiscroll.com` in the preset environment file — no server setup needed
- You have valid OAuth credentials (`clientId`, `clientSecret`) — see [Retrieving Client Credentials](/connect/application-setup#retrieving-client-credentials)
- You have a valid `userId` for your environment - see [`user_id` request parameter](/connect/oauth#authorize-user_id)
- At least one provider account is connectable (Google, Microsoft, Apple, or CalDAV)

Quick health check:

- Request: `GET /api/health`
- Expected response: `{ "status": "ok" }`

## Step 1: Import or fork the collection

If you used **Run in Postman** from app settings, you can skip this step.

1. Open Postman.
2. Click **Import**.
3. Import `Mobiscroll Connect API Collection`.

## Step 2: Create and configure a Postman environment

If you downloaded environment from app settings, import that file and use it.

Preferred: import the preset environment file.

1. In Postman, click **Import**.
2. Import `Mobiscroll Connect API Environment`.
3. Fill in `clientId`, `clientSecret`, and `userId` (see [Where to get each value](#where-to-get-each-value)).
4. Select this environment before sending requests.

Alternative: create an environment manually and define the variables below.

## Environment variables

The collection expects these variables:

- `baseUrl`
- `clientId`
- `clientSecret`
- `userId`
- `scope` (`read-write`, `read`, or `free-busy`)
- `redirectUri` (must match your OAuth client config)
- `accessToken`
- `refreshToken`

### Where to get each value

- `baseUrl`: The base API server URL used by every request in the collection. See more: [Base URL](/connect/overview#base-url).
- `clientId`: The public identifier for your Mobiscroll Connect application, copied from your app settings. See more: [Retrieving Client Credentials](/connect/application-setup#retrieving-client-credentials).
- `clientSecret`: The private application secret used when exchanging codes and refreshing tokens. See more: [Retrieving Client Credentials](/connect/application-setup#retrieving-client-credentials).
- `userId`: Your own unique identifier for the user in your system who is being authorized. See more: [`user_id` request parameter](/connect/oauth#authorize-user_id).
- `scope`: The permission level requested for the connection, such as `free-busy`, `read`, or `read-write`. See more: [`scope` request parameter](/connect/oauth#authorize-scope) and [Available Scopes](/connect/scopes#available-scopes).
- `redirectUri`: The callback URL registered for your app and used to receive the authorization code after consent. See more: [Creating the First Application](/connect/application-setup#creating-the-first-application) and [`redirect_uri` request parameter](/connect/oauth#authorize-redirect_uri).
- `accessToken`: The short-lived Bearer token used to authenticate protected API requests. See more: [`access_token` response field](/connect/oauth#token-response-access_token) and [Authentication](/connect/overview#authentication).
- `refreshToken`: The rotating token used to obtain a new access token without asking the user to sign in again. See more: [`refresh_token` response field](/connect/oauth#token-response-refresh_token) and [Refresh Access Token](/connect/oauth#endpoint-refresh-token).

If your team already provides preset Postman environments, use those first and only update sensitive values locally.

### Redirect URI

The preset production environment sets `redirectUri` to `https://oauth.pstmn.io/v1/callback`.

Ensure the OAuth client in your [Creating the First Application](/connect/application-setup#creating-the-first-application) setup has this URL registered as an allowed redirect URI.

## Step 3: Understand collection auth behavior

The collection sends OAuth 2.0 Bearer auth globally using `{{accessToken}}`.

- **OAuth** folder: obtain, refresh, and revoke tokens
- **Calendars**, **Events**, **Webhooks** folders: require a valid token

If you get `401 Unauthorized`, refresh or replace `{{accessToken}}`.

### Step 3.1: Get a new token from the Postman Authorization tab

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

## Step 4: Run the OAuth authorization-code flow manually (optional)

### Step 4.1: Open authorization URL in browser

Use **OAuth → Authorize (Browser)**:

- Method: `GET`
- Endpoint: `{{baseUrl}}/api/oauth/authorize`
- Query params: `response_type=code`, `client_id`, `user_id`, `scope`, `redirect_uri`

After redirect to `{{redirectUri}}?code=...`, copy the `code` value. See more: [Authorize](/connect/oauth#endpoint-authorize).

### Step 4.2: Exchange code for tokens

Use **OAuth → Exchange Code for Token**:

See more: [Get Access Token](/connect/oauth#endpoint-token).

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

See more: [Refresh Access Token](/connect/oauth#endpoint-refresh-token).

- Method: `POST`
- Endpoint: `{{baseUrl}}/api/oauth/token`
- Auth: Basic (`{{clientId}}` / `{{clientSecret}}`)
- Body (`x-www-form-urlencoded`):
	- `grant_type=refresh_token`
	- `refresh_token={{refreshToken}}`

Replace `{{accessToken}}` with the new token.

### Step 4.4: Revoke token when done (recommended)

Use **OAuth → Revoke Token**:

See more: [Revoke Token](/connect/oauth#endpoint-revoke).

- Method: `POST`
- Endpoint: `{{baseUrl}}/api/oauth/revoke`
- Body (`application/json`):
	- `token={{accessToken}}`

Use this as a cleanup/security step, especially in shared or production-like environments.

## Step 5: Test core API endpoints

Run these requests in order.

### Step 5.1: Verify service health

- Folder: **Health**
- Request: **Health Check**
- Expected: `200` with `{ "status": "ok" }`

### Step 5.2: List connected calendars

- Folder: **Calendars**
- Request: [**Get Calendars**](/connect/calendars#endpoint-get-calendars) (`GET /api/calendars`)
- Requires: valid Bearer token (`{{accessToken}}`)
- Scope: requires `read-write` or `read` scope; tokens issued with [`free-busy`](/connect/scopes#free-busy-high-privacy) scope return `403`

If result is empty, connect at least one provider account first.

### Step 5.3: Query events

- Folder: **Events**
- Request: [**Get Events**](/connect/events#endpoint-get-events) (`GET /api/events`)
- Required query params: `start`, `end`
- Optional query params: `pageSize`, `singleEvents`, `calendarIds`, `nextPageToken`

Use `nextPageToken` from response for pagination.

### Step 5.4: Create, update, and delete an event

All write operations require `read-write` scope. Tokens issued with `free-busy`, `read`, or other non-write scopes return `403`.

1. [**Create Event**](/connect/events#endpoint-create-event) (`POST /api/event`) with `provider`, `calendarId`, `title`, `start`, `end` — returns `201`
2. [**Update Event**](/connect/events#endpoint-update-event) (`PUT /api/event`) with `provider`, `calendarId`, `eventId` — returns `200`
3. [**Delete Event**](/connect/events#endpoint-delete-event) (`DELETE /api/event`) with `provider`, `calendarId`, `eventId` — returns `204` (no body)

### Step 5.5: Subscribe to webhook notifications

- Folder: **Webhooks**
- Request: [**Subscribe Webhook**](/connect/webhooks#endpoint-subscribe-webhook) (`POST /api/subscribe-webhook`)
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
- Ensure `redirectUri` exactly matches your OAuth client config. See more: [Creating the First Application](/connect/application-setup#creating-the-first-application) and [`redirect_uri` validation](/connect/oauth#token-redirect_uri)
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
