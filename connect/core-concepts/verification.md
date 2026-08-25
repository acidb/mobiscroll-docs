---
sidebar_position: 4
slug: /verification
title: App Verification
sidebar_label: Verification
description: Get your Mobiscroll Connect application verified - what a reviewer checks, the required details, how the application's status and its latest review are tracked separately, and which changes send a verified app back for review.
---

import { ConnectDashboardLink } from '@site/src/components/Connect';

# App Verification

Verification is a review of your application by Mobiscroll. A reviewer confirms that your app is a real product and that the details your users see on the Connect screens - your display name, your logo, and how to reach you for help - match it.

Verification is separate from the calendar providers' own review processes. Mobiscroll owns the upstream Google and Microsoft OAuth applications, so **you never run Google brand verification or a Microsoft publisher review yourself**. This review is Mobiscroll's, it covers your application only, and it is deliberately short.

Every application starts **unverified**. Submit it for review from the **Verification** menu of your application in the <ConnectDashboardLink>Connect dashboard</ConnectDashboardLink>.

## What verification changes for your users

One thing, on the authorization screen:

| | Unverified | Verified |
|---|---|---|
| Your display name and logo | Shown | Shown |
| Support contact on the error screen | Shown | Shown |
| Unverified notice | **Shown** | Not shown |
| Connected-account limit | Plan limit | Plan limit (unchanged) |
| API access, scopes, rate limits | Unaffected | Unaffected |

The notice is titled **Not verified by Mobiscroll** and reads:

> Mobiscroll hasn't reviewed this application yet. Connect your calendars only if you recognize it and trust who is asking.

Once you set a display name, the notice names your application in place of "this application". A **What this means** link below it explains what a review covers, that the application only receives the access the user approves on that screen, and that accounts can be disconnected at any time.

Two consequences worth being explicit about:

- **Verification does not gate any feature.** An unverified application shows its own branding, keeps its plan's connected-account allowance, and calls the API normally. Nothing is withheld while you wait for a review.
- **There is no "verified" badge.** Verification removes a warning; it does not add a trust mark. Your users see either the notice or nothing.

## What a reviewer checks

These are the details a reviewer confirms. All are required except the logo, and the dashboard blocks submission until the required ones are set.

| Detail | Where to set | Required | Requirement |
|---|---|---|---|
| **Application URL** | Settings | Yes | Your app's public homepage. Must be an absolute `https://` URL. A reviewer checks that it is a real product, that the brand matches your display name, and that a privacy policy is reachable. |
| **Display name** | Settings | Yes | The name your users see on the Connect screens. It should be the name they know your app by. |
| **Redirect URI** | Settings | Yes | Your production callback URL. Must be an absolute `https://` URL, and must not point at `localhost`. |
| **Support contact** | Settings | Yes - either one | A support email **or** a support URL. One of the two is enough; a reachable help page counts. |
| **Logo** | Branding | Optional | Reviewed when set, either way you set it. Without one, your users see the Mobiscroll logo. Requires the Scale plan or higher, so on lower plans there is no logo to review. |

The **Verification** page lists each of these with its current value and lets you edit it in place, so you do not need to move between pages to complete the checklist.

## Statuses

The Verification page tracks two separate things: where the **application** stands, and where the **latest review** stands. They are not the same - an application that was verified once stays verified while you edit it and while a new review runs.

### The application

| Status | Meaning |
|---|---|
| **Unverified** | Nothing on this application has been approved yet. The unverified notice is shown to your users. |
| **Verified** | A reviewer approved this application, and what your users see is what was approved. The notice is gone. The page also shows the date it was verified. |

### The latest review

| Status | Meaning |
|---|---|
| **Not submitted** | Either the application has never been submitted, or you changed a reviewed detail since the last approval and have not submitted it again. |
| **Under review** | Submitted and waiting for a decision. Nothing on your users' screens changes at the moment you submit. |
| **Approved** | The details a reviewer signed off on are the details you have now. |
| **Changes requested** | The reviewer asked for changes. The reason appears under **Verification activity** on the Verification page. Fix what it mentions and submit again. |

Every submission, decision, and reviewer note is recorded under **Verification activity**, so the history of a review is visible on the page.

## Submitting for review

1. Open the **Verification** menu of your application in the <ConnectDashboardLink>Connect dashboard</ConnectDashboardLink>.
2. Complete every required detail in **What we review**. **Submit for review** stays disabled until they all pass.
3. Click **Submit for review**. The latest review becomes **Under review**.
4. Watch **Verification activity** for the decision. If the reviewer requests changes, their note says what to change; fix it and click **Resubmit for review**.

Approving or declining an application is a Mobiscroll action - there is nothing further to do on your side while a review is open.

## Changing details after verification

Reviewed details are not locked. You can change them at any time, but changing one means the reviewed version and the live version no longer match, so the application needs reviewing again: the latest review goes to **Not submitted** until you submit it.

The application itself stays **Verified** throughout. Your users keep seeing the details that were approved, they are not shown the unverified notice again, and there is no deadline or grace period to track while a re-review is open.

### Which changes send an application back for review

| Change | Needs a new review |
|---|---|
| Display name | Yes |
| Application URL | Yes |
| Support email or support URL | Yes |
| Logo or dark-mode logo | Yes |
| Redirect URI | **No** |
| Primary color, theme, footer | No |
| Application name (the internal one) | No |
| Webhook URL | No |

**The redirect URI is the exception.** It is checked when you submit, but changing it afterwards does not affect verification status. It also cannot be held back the way a display name can - a new redirect URI takes effect immediately, because your sign-in flow would break otherwise. Make sure your application handles the new URI before you save it.

Primary color, theme, and the footer toggle are not reviewed at all - a color cannot misrepresent who you are.

The dashboard warns you before you save a change that would call for a new review, on both the **Settings** page and the logo editor.

### Editing while a review is open

Editing a reviewed detail while a review is **Under review** cancels that review. It goes back to **Not submitted**, and you submit it again once you are done editing.

### Where to edit once a review is approved

While the latest review is **Approved**, the Verification page lists the reviewed details without edit buttons. Change them from **Settings**, or from **Branding** for the logo.

## Logos and verification

A logo is optional, but it is reviewed when set, and both ways of setting it get the same review: uploading a file and pasting a URL to your own hosted image.

**Prefer uploading the file.** An uploaded logo is stored by Mobiscroll, so the image a reviewer accepted is the image your users get. A logo referenced by your own URL is fetched from your server, so what your users see depends on what that URL serves.

When you submit for review, Mobiscroll fetches a pasted URL once to check it. The URL must be publicly reachable over `https`, must return a PNG, JPEG, WebP, or SVG, and must be **2 MB or smaller** - stricter than the 5 MB limit that applies to a direct upload. If the fetch fails, the submission is rejected with a message on the logo field, even though the logo itself is optional.

See [Branding](/connect/branding) for the logo formats, sizes, and the rest of the branding fields.

## Verification is a dashboard workflow

There is no public API for verification. Submitting for review, reading the status, and reading reviewer notes all happen in the <ConnectDashboardLink>Connect dashboard</ConnectDashboardLink>.

The endpoints the dashboard uses are internal and are not part of the documented Connect API - they are not covered by the [API reference](/connect/overview), and they can change without notice. Do not build an integration against them. The [public API](/connect/overview) is unaffected by verification status.

## Getting help

If a reviewer declines your application, start with the note under **Verification activity** - it explains what to change.

For anything else - a question about a decision, or a review that looks stuck - contact [support@mobiscroll.com](mailto:support@mobiscroll.com).
