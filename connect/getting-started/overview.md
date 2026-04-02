---
sidebar_position: 1
sidebar_label: Overview
slug: /
---

# Getting Started

## What is Mobiscroll Connect?

Mobiscroll Connect is an API service that acts as a full-fledged OAuth 2.0 provider, enabling seamless integration with multiple calendar providers through a unified interface. It connects to Google Calendar, Microsoft 365/Outlook.com, Apple Calendar, and CalDAV, exposing a standardized API for client applications to access calendar data securely.

The service handles the complexity of working with different calendar providers, offering a single authentication flow and consistent API endpoints. Client applications can retrieve calendars and events from all connected providers without managing multiple OAuth implementations or dealing with provider-specific APIs.

## Key Capabilities

Mobiscroll Connect provides secure OAuth 2.0 authentication with JWT-based access tokens, a streamlined authorization flow with provider selection UI, and a unified way to work with calendar data across providers.

Beyond authentication, Connect acts as the infrastructure layer for calendar integrations, handling connectivity, normalization, and real-time updates.

- **Calendar connectivity & account linking**
  Connect multiple calendars per user across Google Calendar, Microsoft Outlook (Office 365), Apple Calendar, and any CalDAV-compatible service.
- **Unified API & data normalization**
  Work with a single, consistent data model while Connect handles provider differences (events, availability, time zones, recurrence).
- **Real-time sync & webhooks**
  Stay in sync with external calendars and react to changes (create, update, delete) through webhook notifications.
- **Permissions & secure access**
  Scoped access with OAuth ensures your app only interacts with data users explicitly authorize.
- **Conferencing integrations**
  Add meeting links from providers like Google Meet, Zoom, and Microsoft Teams directly to scheduled events.

## Quick Overview

When users connect their calendar accounts through Mobiscroll Connect, they go through a simple flow: select their calendar provider, authenticate with that provider, grant consent, and receive an access token. This token can then be used to fetch calendars and events through a single, consistent API, regardless of which providers the user has connected.

The service includes a modern, mobile-responsive interface for provider selection and consent, comprehensive error handling, and a complete test application demonstrating the entire OAuth 2.0 authorization code flow.

## Set up your developer account

Get started with Mobiscroll Connect using a free developer account. Create your application, obtain your API credentials, and start integrating calendar connectivity in minutes.

<form action="https://mobiscroll.com/connectsubscribe" method="POST" target="_blank">
  <input type="hidden" name="tier" value="1" />
  <input type="hidden" name="billingPeriod" value="1" />
  <input type="hidden" name="prepaid" value="10" />
  <button type="submit" class="button button--primary button--lg">Create a free developer account</button>
</form>