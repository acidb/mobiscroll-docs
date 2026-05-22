---
sidebar_position: 5
sidebar_label: Best Practices
slug: /best-practices
description: Recommended practices for building, testing, and operating your Mobiscroll Connect integration.
---

# Best Practices

This page collects recommended practices for building, testing, and operating your Mobiscroll Connect integration.

## Testing Across Multiple Environments

Each Connect application currently supports a single **Redirect URI** and a single **Webhook URL**. If you need to run your integration in multiple environments (for example, local development, staging, and production), create a separate Connect application for each environment and configure its Redirect URI and Webhook URL accordingly.

Use a distinct **Client ID** and **Client Secret** per environment in your `.env` files so each deployment authenticates against its own app:

- **Local development**: Redirect URI pointing to `http://localhost:3000/...`, Webhook URL pointing to your tunneling service (e.g. ngrok).
- **Staging**: Redirect URI and Webhook URL pointing to your staging domain.
- **Production**: Redirect URI and Webhook URL pointing to your production domain.
