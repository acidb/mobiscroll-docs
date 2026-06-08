---
sidebar_label: Ruby SDK
sidebar_position: 8
slug: /ruby-sdk
description: Use the mobiscroll-connect RubyGems package to interact with Mobiscroll Connect — setup, authentication, and API method reference.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocCardList from '@theme/DocCardList';
import { Parameter } from '@site/src/components/Connect';

# Ruby SDK

The Mobiscroll Connect Ruby SDK provides a convenient way to integrate Mobiscroll Connect in Ruby backend applications. It requires Ruby 3.1 or higher and is built on Faraday, so it works in any Ruby application (plain Rack, Sinatra, Rails, Hanami, etc.).

## Setup

Install the gem with Bundler:

<Tabs>
<TabItem value="bundler" label="Bundler">

Add to your `Gemfile`:

```ruby
gem 'mobiscroll-connect', '~> 1.0'
```

Then run:

```bash
bundle install
```

</TabItem>
<TabItem value="gem" label="gem">

```bash
gem install mobiscroll-connect
```

</TabItem>
</Tabs>

Then require it:

```ruby
require 'mobiscroll-connect'
```

## Client Initialization {#client-initialization}

To use the SDK, initialize `Mobiscroll::Connect::Client` with your client credentials.

**Class:** `Mobiscroll::Connect::Client`

<Parameter name="constructor" type="Client" id="client-config" isObject>
Constructor keyword arguments.

<Parameter name="client_id" type="String">
Your Client ID obtained from the Mobiscroll Connect dashboard.
</Parameter>

<Parameter name="client_secret" type="String">
Your Client Secret obtained from the Mobiscroll Connect dashboard.
</Parameter>

<Parameter name="redirect_uri" type="String">
Your application's redirect URI that matches the one configured in the Mobiscroll Connect dashboard.
</Parameter>

<Parameter name="base_url" type="String" isOptional>
Override the API base URL. Defaults to `https://connect.mobiscroll.com/api`.
</Parameter>

<Parameter name="timeout" type="Integer" isOptional>
HTTP timeout in seconds. Defaults to `30`.
</Parameter>

</Parameter>

**Usage:**

```ruby
require 'mobiscroll-connect'

client = Mobiscroll::Connect::Client.new(
  client_id:     ENV['MOBISCROLL_CLIENT_ID'],
  client_secret: ENV['MOBISCROLL_CLIENT_SECRET'],
  redirect_uri:  'https://yourapp.com/oauth/callback'
)
```

For a custom base URL or HTTP timeout:

```ruby
client = Mobiscroll::Connect::Client.new(
  client_id:     ENV['MOBISCROLL_CLIENT_ID'],
  client_secret: ENV['MOBISCROLL_CLIENT_SECRET'],
  redirect_uri:  'https://yourapp.com/oauth/callback',
  base_url:      'https://connect.mobiscroll.com/api',
  timeout:       60
)
```

## Methods

### set_credentials {#client-set-credentials}

Stores a token pair the SDK will use on subsequent requests. Typically called after `client.auth.get_token` or when restoring credentials from persistent storage.

**Method:** `client.set_credentials(tokens)`

<Parameter name="tokens" type="TokenResponse" isObject>
The token response returned by `client.auth.get_token(code)`.
</Parameter>

### on_tokens_refreshed {#client-on-tokens-refreshed}

Registers a callback to be invoked whenever the SDK automatically refreshes the access token. Use this to persist the updated tokens so they survive future requests.

**Method:** `client.on_tokens_refreshed { |tokens| ... }`

<Parameter name="block" type="Proc">
A block that receives the updated `TokenResponse` after a successful automatic token refresh.
</Parameter>

### credentials {#client-credentials}

Returns the currently stored credentials, or `nil` if none.

**Method:** `client.credentials`

**Returns:** `TokenResponse` or `nil`

## Token Refresh

The Ruby SDK handles token refresh automatically. When any API call returns a `401 Unauthorized` response and the client has a `refresh_token` stored, the SDK silently exchanges it for a new access token and retries the original request — with no action required from your application. Concurrent calls that hit the same expired token deduplicate into a single refresh via a `Monitor` and condition variable.

When the refresh succeeds, the SDK invokes your `on_tokens_refreshed` callback with the updated `TokenResponse`. You must register this callback and persist the new tokens, otherwise they will be lost between process restarts.

```ruby
client.on_tokens_refreshed do |tokens|
  # Persist tokens in your database or session store
  # so the new access_token and refresh_token survive future requests
  session[:access_token]  = tokens.access_token
  session[:refresh_token] = tokens.refresh_token if tokens.refresh_token
end
```

If the refresh token itself is invalid or has been revoked, the SDK raises `Mobiscroll::Connect::AuthenticationError` and the user must re-authorize.

## Error Handling

All SDK errors are subclasses of `Mobiscroll::Connect::Error`. Rescue the specific subclass to handle each case:

| Error class | HTTP Status | Extra attribute |
|---|---|---|
| `AuthenticationError` | 401, 403 | — (raised after refresh + retry has been exhausted) |
| `ValidationError` | 400, 422 | `details` |
| `NotFoundError` | 404 | — |
| `RateLimitError` | 429 | `retry_after` (seconds) |
| `ServerError` | 5xx | `status_code` |
| `NetworkError` | — | `cause` (wraps the underlying Faraday error) |

```ruby
begin
  client.events.list(
    start: '2025-10-01T00:00:00Z',
    end:   '2025-10-31T23:59:59Z'
  )
rescue Mobiscroll::Connect::AuthenticationError
  # Token expired and refresh failed — re-authorize the user
rescue Mobiscroll::Connect::ValidationError => e
  puts "Validation failed: #{e.details}"
rescue Mobiscroll::Connect::RateLimitError => e
  sleep(e.retry_after)
rescue Mobiscroll::Connect::Error => e
  # Catch-all for any other SDK error
  puts "SDK error: #{e.message} (#{e.code})"
end
```

## API

The client exposes resources that map directly to the API endpoints.

### Auth

The `client.auth` resource handles the OAuth authorization flow, including generating authorization URLs, exchanging codes for tokens, managing connection status, and disconnecting providers.

To localize the Connect pages, pass an optional `lng` (`en`, `es`, `fr`, `ar`) to `generate_auth_url`, e.g. `generate_auth_url(user_id: ..., lng: 'es')`. When omitted, the UI falls back to the browser's `Accept-Language` header, then English; Arabic renders right-to-left.

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
