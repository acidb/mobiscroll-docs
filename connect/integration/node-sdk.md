---
sidebar_label: Node.js SDK
sidebar_position: 1
slug: /node-sdk
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocCardList from '@theme/DocCardList';
import { Parameter } from '@site/src/components/Connect';

# Node.js SDK

The Mobiscroll Connect Node.js SDK provides a convenient way to interact with the Mobiscroll Connect API from your Node.js applications.

## Setup

Install the package using your preferred package manager:

<Tabs>
<TabItem value="npm" label="npm">

```bash
npm install @mobiscroll/connect-node
```

</TabItem>
<TabItem value="yarn" label="yarn">

```bash
yarn add @mobiscroll/connect-node
```

</TabItem>
<TabItem value="pnpm" label="pnpm">

```bash
pnpm add @mobiscroll/connect-node
```

</TabItem>
</Tabs>

## Client Initialization {#client-initialization}

To use the SDK, you need to initialize the `MobiscrollConnectClient` with your client credentials.

**Class:** `MobiscrollConnectClient`

<Parameter name="config" type="MobiscrollConnectConfig" id="client-config" isObject>
Configuration object.

<Parameter name="clientId" type="string">
Your Client ID obtained from the Mobiscroll dashboard.
</Parameter>

<Parameter name="clientSecret" type="string">
Your Client Secret obtained from the Mobiscroll dashboard.
</Parameter>

<Parameter name="redirectUri" type="string">
Your application's redirect URI that matches the one configured in the dashboard.
</Parameter>

</Parameter>

**Usage:**

```typescript
import { MobiscrollConnectClient } from "@mobiscroll/connect-node";

const client = new MobiscrollConnectClient({
  clientId: "YOUR_CLIENT_ID",
  clientSecret: "YOUR_CLIENT_SECRET",
  redirectUri: "YOUR_REDIRECT_URI",
});
```

## Methods

### setCredentials {#client-set-credentials}

Sets the access token for the client. This is required before making any API calls that require authentication (which is most of them).

**Method:** `client.setCredentials(tokens)`

<Parameter name="tokens" type="TokenResponse" isObject>
The tokens object received from the `auth.getToken` method.
</Parameter>

### on {#client-on}

Registers an event listener for client events.

**Method:** `client.on(event, listener)`

<Parameter name="event" type="string">
The name of the event to listen for.
</Parameter>

<Parameter name="listener" type="function">
The callback function to execute when the event is triggered.
</Parameter>

### getConfig {#client-get-config}

Returns the current configuration of the client.

**Method:** `client.getConfig()`

**Returns:** `MobiscrollConnectConfig`

## API

The client exposes the following resources that map directly to the API endpoints.

### Auth

The `client.auth` resource handles the OAuth authorization flow, including generating authorization URLs, exchanging codes for tokens, and managing connection status. It corresponds to the `/authorize`, `/token`, and `/connection-status` endpoints.

<DocCardList items={[
  {
    type: 'link',
    label: 'OAuth API Reference',
    href: '/connect/oauth',
    icon: '🔐'
  },
]} />

### Calendars

The `client.calendars` resource allows you to list available calendars from all connected providers (Google, Outlook, etc.). It corresponds to the `/calendars` endpoints.

<DocCardList items={[
  {
    type: 'link',
    label: 'Calendars API Reference',
    href: '/connect/calendars',
    icon: '📅'
  },
]} />

### Events

The `client.events` resource provides methods to create, read, update, and delete calendar events across all connected accounts. It corresponds to the `/events` endpoints.

<DocCardList items={[
  {
    type: 'link',
    label: 'Events API Reference',
    href: '/connect/events',
    icon: '📅'
  },
]} />
