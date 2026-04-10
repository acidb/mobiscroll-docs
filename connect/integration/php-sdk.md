---
sidebar_label: PHP SDK
sidebar_position: 2
slug: /php-sdk
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocCardList from '@theme/DocCardList';
import { Parameter } from '@site/src/components/Connect';

# PHP SDK

The Mobiscroll Connect PHP SDK provides a convenient way to integrate Mobiscroll Connect in PHP backends.

## Setup

Install the package using Composer:

<Tabs>
<TabItem value="composer" label="Composer">

```bash
composer require mobiscroll/connect-php
```

</TabItem>
</Tabs>

## Client Initialization {#client-initialization}

To use the SDK, initialize `MobiscrollConnectClient` with your client credentials.

**Class:** `Mobiscroll\Connect\MobiscrollConnectClient`

<Parameter name="constructor" type="MobiscrollConnectClient::__construct" id="client-config" isObject>
Constructor arguments.

<Parameter name="clientId" type="string">
Your Client ID from the Mobiscroll Connect dashboard.
</Parameter>

<Parameter name="clientSecret" type="string">
Your Client Secret from the Mobiscroll Connect dashboard.
</Parameter>

<Parameter name="redirectUri" type="string">
Your application's redirect URI that matches the dashboard configuration.
</Parameter>

</Parameter>

**Usage:**

```php
<?php

use Mobiscroll\Connect\MobiscrollConnectClient;

$client = new MobiscrollConnectClient(
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    redirectUri: 'YOUR_REDIRECT_URI'
);
```

## Methods

### auth {#client-auth}

Returns the Auth resource used for OAuth operations.

**Method:** `client->auth()`

**Returns:** `Mobiscroll\Connect\Resources\Auth`

### calendars {#client-calendars}

Returns the Calendars resource used for calendar endpoints.

**Method:** `client->calendars()`

**Returns:** `Mobiscroll\Connect\Resources\Calendars`

### events {#client-events}

Returns the Events resource used for event endpoints.

**Method:** `client->events()`

**Returns:** `Mobiscroll\Connect\Resources\Events`

### setCredentials {#auth-set-credentials}

Sets the access token for the client. This is required before making authenticated API calls.

**Method:** `client->auth()->setCredentials(tokens)`

<Parameter name="tokens" type="TokenResponse" isObject>
The token response object returned by `client->auth()->getToken(code)`.
</Parameter>

## API

The client exposes resources that map directly to the API endpoints.

### Auth

The `client->auth()` resource handles the OAuth authorization flow, including generating authorization URLs, exchanging codes for tokens, and managing connection status.

<DocCardList items={[
  {
    type: 'link',
    label: 'OAuth API Reference',
    href: '/connect/oauth',
    icon: '🔐'
  },
]} />

### Calendars

The `client->calendars()` resource lists calendars from connected providers.

<DocCardList items={[
  {
    type: 'link',
    label: 'Calendars API Reference',
    href: '/connect/calendars',
    icon: '📅'
  },
]} />

### Events

The `client->events()` resource provides methods to create, read, update, and delete calendar events across all connected accounts.

<DocCardList items={[
  {
    type: 'link',
    label: 'Events API Reference',
    href: '/connect/events',
    icon: '📅'
  },
]} />
