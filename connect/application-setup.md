---
sidebar_position: 3
sidebar_label: Application Setup Guide
slug: /application-setup
---

# Application Setup Guide

## Prerequisites & Account Setup

Before creating your application, ensure you are logged into your Mobiscroll account.

Head over to the pricing page and choose the plan that suits you the best. After your subscription is started, the Mobiscroll Connect dashboard will become available here https://mobiscroll.com/account/connect.

:::info
This guide assumes your initial Mobiscroll account setup is already complete. If you have not yet set up your Mobiscroll account, please finalize your profile registration before proceeding.
:::

## Creating the First Application

To use Mobiscroll Connect services, you must register your application to generate the necessary API credentials.

1. Navigate to the **Connect** dashboard tab on your account page.
2. Click the **Create new app**.
3. You will be prompted to fill in the project details:

- **Application Name**: A friendly name for your application (e.g., "My Scheduling App").
- **Redirect URI (Callback URL)**: The URL where users will be redirected after successfully authorizing with a provider. This must match the route in your application that handles the OAuth callback.
- **Webhook URL (Optional)**: If you plan to use webhooks for event notifications, provide the endpoint URL where Mobiscroll Connect can send these updates.

4. Click **Create application** to finalize the application setup.

## Retrieving Client Credentials

Once your application is created, you need to retrieve the credentials required to authenticate your client with the Mobiscroll Connect service.

1. Navigate to the **Settings** left menu item of your newly created application.
2. Locate the **API Credentials** section.

3. **Client ID**: Copy the string displayed in the Client ID field. This is your public identifier.
	:::info What is a Client ID?
	The **Client ID** is a unique, public identifier for your application. It is used by Mobiscroll Connect to recognize which app is making a request. You can safely share your Client ID in client-side code or with users.
	:::
4. **Client secret**: Click *Show* to reveal or copy the Client secret.
	:::info What is a Client Secret?
	The **Client secret** is a confidential string used to prove your application's identity to Mobiscroll Connect. It must be kept private and only used in server-side code. Never expose it in public repositories or client-side code.
	:::

:::info
The **Client secret** is vital for the authentication flow. Ensure you copy it now, as you will need it to configure your environment in the next step.
:::

## Configuring the Client Application

With your **Client ID** and **Client Secret** secured, you are ready to configure your application to communicate with Mobiscroll Connect.

Create or update a `.env` file in the root of your project (Node.js, Python, etc.) to store these credentials securely.

```bash title=".env"
# Your Mobiscroll Connect Credentials
MOBISCROLL_CONNECT_CLIENT_ID=proj-123456...
MOBISCROLL_CONNECT_CLIENT_SECRET=secret-xyz789...

# The URL for the Mobiscroll Connect Service
MOBISCROLL_CONNECT_BASE_URL=https://connect.mobiscroll.com
```

:::warning Security Note
**Never** expose your `MOBISCROLL_CONNECT_CLIENT_SECRET` in client-side code (browsers, mobile apps, or public repositories). This secret should only be used in server-side environments to exchange authorization codes for access tokens.
:::

## Verifying the Integration

To validate that your credentials are correct and the connection is established, you can perform a "Hello World" connection test by manually constructing an authorization URL.

**Step 1:** Construct a URL using your Base URL and Client ID:

```
${MOBISCROLL_CONNECT_BASE_URL}/authorize?client_id=${MOBISCROLL_CONNECT_CLIENT_ID}&user_id=test-user-1
```

**Step 2:** Paste this URL into your browser.

**Validation Results:**

- **Success:** If your browser redirects you to the **Provider Selection** page (or a login screen for Google/Outlook), your `client_id` is recognized, and the service is reachable.
- **Failure:** If you receive a JSON response stating `401 Unauthorized` or `Invalid Client`, double-check the credentials in your `.env` file and ensure the `client_id` matches exactly what is in your dashboard.

---

## Setting up the Node.js

To simplify integration, you can use the official Mobiscroll Connect SDK for Node.js.

### Installation

Install the SDK via npm:

```bash
npm install @mobiscroll/connect-sdk
```

### Initialization

Initialize the client with your credentials:

```typescript
import { MobiscrollConnectClient } from '@mobiscroll/connect-sdk';

const client = new MobiscrollConnectClient({
  clientId: process.env.MOBISCROLL_CONNECT_CLIENT_ID,
  clientSecret: process.env.MOBISCROLL_CONNECT_CLIENT_SECRET,
  redirectUri: 'https://your-app.com/callback' // Your configured Redirect URI
});
```

You are now ready to use the SDK to manage authentication and calendar data.

**Next Steps:**
Your environment is now ready. You can proceed to implement the full [Authorization Flow](./api/oauth.md#endpoint-authorize) to start connecting user calendars. The [API Reference](./api.md) includes Node.js examples for each endpoint.
