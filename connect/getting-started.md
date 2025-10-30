---
sidebar_position: 1
sidebar_label: Getting Started
slug: /
---

# Getting Started

## What is Mobiscroll Connect?

Mobiscroll Connect is an API service that acts as a full-fledged OAuth 2.0 provider, enabling seamless integration with multiple calendar providers through a unified interface. It connects to Google Calendar, Microsoft 365/Outlook.com, and Apple Calendar, exposing a standardized API for client applications to access calendar data securely.

The service handles the complexity of working with different calendar providers, offering a single authentication flow and consistent API endpoints. Client applications can retrieve calendars and events from all connected providers without managing multiple OAuth implementations or dealing with provider-specific APIs.

## Key Capabilities

Mobiscroll Connect provides OAuth 2.0-based authentication with JWT access tokens, a modern web interface for provider selection and consent management, and unified API endpoints for accessing calendar data across all connected providers.

## Quick Overview

When users connect their calendar accounts through Mobiscroll Connect, they go through a simple flow: select their calendar provider, authenticate with that provider, grant consent, and receive an access token. This token can then be used to fetch calendars and events through a single, consistent API, regardless of which providers the user has connected.

The service includes a modern, mobile-responsive interface for provider selection and consent, comprehensive error handling, and a complete test application demonstrating the entire OAuth 2.0 authorization code flow.