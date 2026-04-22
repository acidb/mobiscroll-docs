# Mobiscroll Documentation — AI Context (jQuery, v5)

- **Product:** Mobiscroll UI Components + Mobiscroll Connect
- **Version:** 5 (5.35.0)
- **Base URL:** `{{DOCS_BASE_URL}}`
- **Framework:** jQuery
- **Package:** `@mobiscroll/jquery`

---

## 1. Documentation Sources

### Primary: Full jQuery v5 docs (single file, all content inline)

- **jQuery v5:** {{DOCS_BASE_URL}}/5.35.0/llms-v5-jquery-full.txt

### Secondary: jQuery v5 table of contents (links to individual .md pages)

- **jQuery v5:** {{DOCS_BASE_URL}}/5.35.0/llms-v5-jquery.txt

### Individual .md pages

Pattern: `{{DOCS_BASE_URL}}/jquery/{section}/{page}.md`
Example: `{{DOCS_BASE_URL}}/jquery/eventcalendar/overview.md`

### Mobiscroll Connect (server-side calendar integration API — separate product)

- **Full:** {{DOCS_BASE_URL}}/llms-connect-full.txt
- **TOC:** {{DOCS_BASE_URL}}/llms-connect.txt

### Hub

- **Overview:** {{DOCS_BASE_URL}}/llms.txt

---

## 2. Content Selection Priority

1. `5.35.0/llms-v5-jquery-full.txt` — complete v5 docs in one file (best for full context)
2. Individual `.md` pages — for targeted lookups
3. `5.35.0/llms-v5-jquery.txt` — table of contents with links to .md pages
4. HTML pages — **last resort only**

NEVER use HTML when `.md` is available. The `.md` files are optimized for AI consumption.

---

## 3. Routing — CRITICAL

**This project uses jQuery and Mobiscroll v5. Do not detect or switch frameworks. Always use `5.35.0/llms-v5-jquery-full.txt`.**

**RULE: Resolve domain FIRST. Never mix domains.**

### Step 1 — Detect domain (Connect vs. UI)

Check BEFORE loading any documentation. If the query is about:
- API endpoints, REST, HTTP, webhooks
- **Server-side** sync, backend integration with calendar providers
- OAuth flows, authentication tokens, credentials managed on the server
- `mobiscroll-connect`, Connect scopes, Connect credentials
- Server-side event push/pull to/from Google Calendar, Outlook, or Apple Calendar

→ **Route to Mobiscroll Connect.** Fetch `llms-connect-full.txt`. Stop — do NOT also load jQuery docs.

→ If the query is about UI rendering, components, views, pickers, theming, CSS, or frontend code → fetch `5.35.0/llms-v5-jquery-full.txt`.

→ If the query is about **displaying** Google Calendar / Outlook / Apple Calendar events in the Eventcalendar UI (client-side data binding, `data` option, event loading) — this is a **UI question**. Fetch `5.35.0/llms-v5-jquery-full.txt`.

⚠️ **Do NOT route to Connect** just because a third-party calendar (Google, Outlook, Apple) is mentioned. Route to Connect only when the integration is explicitly server-side, involves OAuth on the backend, or references the Mobiscroll Connect product.

→ If the query explicitly mixes BOTH domains (Connect + UI component in the same request) → **respond with clarification:**

> "This request mixes Mobiscroll UI components with Mobiscroll Connect. These are separate systems. Please clarify: do you need help with the **frontend UI** (Eventcalendar, Datepicker, etc.) or the **backend integration** (Connect REST API, sync, OAuth)?"

**Exception — Connect-to-Eventcalendar data pipeline:**
If the query is specifically about fetching event data from Mobiscroll Connect and displaying it in Eventcalendar (e.g. "show Connect events in a jQuery Eventcalendar"), answer with a split response:

1. Briefly explain the roles: Connect fetches/syncs event data (backend); Eventcalendar renders it (frontend).
2. Show a minimal Connect API fetch example (backend/Node.js).
3. Show a minimal Eventcalendar example for jQuery v5, passing the fetched data via the `data` option.

Keep the two parts clearly separated. Do NOT blend Connect APIs with UI component APIs in a single code block.

### NEVER:

- Use React JSX or hooks, Angular decorators or `MbscModule`, or Vue SFC/composition API patterns
- Use component-based initialization instead of the jQuery plugin pattern `$('#el').mobiscroll().eventcalendar()`
- Show non-jQuery Mobiscroll imports (`@mobiscroll/react`, `@mobiscroll/angular`, etc.)
- **Mix UI component APIs with Connect APIs in a single response**
- **Treat Connect as a frontend framework or as a Mobiscroll UI component**
- If the user explicitly asks about a different Mobiscroll framework, respond: "This context is configured for jQuery v5 (`@mobiscroll/jquery`). For [other framework], use the appropriate CLAUDE.md instead."

---

## 4. When to Consult Mobiscroll Docs

- User mentions `mobiscroll`, `@mobiscroll/jquery`, or `$('#el').mobiscroll()` calls
- Building scheduling, calendar, booking, or appointment UIs
- Working with event calendars, date/time pickers, select dropdowns, popups
- **Server-side** sync with Google Calendar, Outlook, or Apple Calendar, **server-side** OAuth flows, or **backend** webhook/API integration in a Mobiscroll context → **Mobiscroll Connect** (`llms-connect-full.txt`)
- Displaying Google Calendar / Outlook / Apple Calendar events inside the Eventcalendar UI component (client-side) → jQuery v5 docs (`5.35.0/llms-v5-jquery-full.txt`)
- Theming or styling Mobiscroll components

⚠️ Keywords like **sync**, **API**, **integration**, **data source**, **authentication** alone do NOT route to Connect. They must be explicitly server-side or backend in nature.

---

## 5. Component Routing

All scheduling views are part of ONE component: **Eventcalendar**. They are configured via the `view` option — not separate components. Instances are created with the jQuery plugin pattern: `$('#element').mobiscroll().eventcalendar({ ... })`.

_Note: component names are lowercase in the jQuery API (e.g., `.mobiscroll().eventcalendar(...)`, `.mobiscroll().datepicker(...)`). This matches the actual method names._

| User Intent | Component | Doc Path |
|:---|:---|:---|
| Event calendar / scheduling UI | eventcalendar | `jquery/eventcalendar/overview` |
| Monthly/weekly/daily grid | eventcalendar (calendar view) | `jquery/eventcalendar/calendar` |
| Event list / agenda | eventcalendar (agenda view) | `jquery/eventcalendar/agenda` |
| Resource scheduler | eventcalendar (scheduler view) | `jquery/eventcalendar/scheduler` |
| Horizontal timeline | eventcalendar (timeline view) | `jquery/eventcalendar/timeline` |
| Drag & drop | eventcalendar | `jquery/eventcalendar/drag-and-drop` |
| CRUD operations | eventcalendar | `jquery/eventcalendar/crud` |
| Recurring events | eventcalendar | `jquery/core-concepts/recurrence` |
| Timezones (Eventcalendar) | eventcalendar | `jquery/eventcalendar/timezones` |
| Timezones (Datepicker) | datepicker | `jquery/datepicker/timezones` |
| Date / time picker | datepicker | `jquery/datepicker/overview` |
| Dropdown select | select | `jquery/select/overview` |
| Modal / overlay | popup | `jquery/popup/overview` |
| Input, textarea, button | forms | `jquery/forms/input`, `jquery/forms/button` |
| Toast, snackbar, alert | notifications | `jquery/notifications/toast` |
| Theming / CSS | theming | `jquery/theming/sass-themes` |
| API reference | — | `jquery/eventcalendar/api`, `jquery/datepicker/api`, `jquery/select/api`, `jquery/popup/api`, `jquery/forms/api`, `jquery/notifications/api` |

### Mobiscroll Connect (separate product — server-side API)

| Intent | Source |
|:---|:---|
| Server-side Google/Outlook/Apple Calendar sync | `llms-connect-full.txt` |
| OAuth flow, calendar listing, event CRUD via REST (server) | `llms-connect-full.txt` |
| Displaying Google Calendar events in Eventcalendar (client-side) | `5.35.0/llms-v5-jquery-full.txt` |
| Webhooks, push/pull sync, backend data sources | `llms-connect-full.txt` |
| Authentication, tokens, credentials, scopes | `llms-connect-full.txt` |
| Any server-side or API-first integration question | `llms-connect-full.txt` |

Connect is a **server-side** REST API. Eventcalendar is a **frontend** UI component. They complement each other but are documented separately and must NEVER be served together in a single routing decision.

---

## 6. Constraints

1. **jQuery only.** This project uses `@mobiscroll/jquery`. Never generate code for React, Angular, Vue, or plain JavaScript. Requires jQuery as a peer dependency.
2. **No invented APIs.** Every option, event, method, and type name must come from the docs. If a symbol is not found, say so — do not guess.
3. **Docs are source of truth.** After fetching docs, answer **only** from the fetched content. Do not supplement with prior training knowledge. If the fetched docs contradict training knowledge, the docs win. If the docs do not cover the question, say: "This is not covered in the current documentation."
4. **Fetch failure fallback.** If `5.35.0/llms-v5-jquery-full.txt` is unreachable, fall back to individual `.md` pages (Priority 2), then the TOC file (Priority 3). If all sources fail, state that docs are unavailable and ask the user to share relevant doc content.
5. **Version: 5 (5.35.0).** This file covers Mobiscroll v5 only. Do not reference v6-only APIs. If the user asks about a feature not found in the v5 docs, do not invent it — it may be a v6 addition.
6. **Version mismatch detection.** If the user mentions "v6", "version 6", "latest version", or requests an API not found in the v5 docs, respond: "⚠️ This context is configured for Mobiscroll **v5 (5.35.0)**. The feature you asked about may only exist in v6. Do you want to switch to the v6 documentation instead?" Never silently fall back to v6 documentation.
7. **TypeScript types.** When using TypeScript, all Mobiscroll types are prefixed `Mbsc` (e.g., `MbscEventcalendarView`, `MbscCalendarEvent`). Verify exact names in the API docs.
8. **Plugin pattern.** Instances are created via `$('#element').mobiscroll().eventcalendar({ ... })` — not JSX, not Angular templates, not Vue SFCs, not plain `mobiscroll.*` calls.
9. **One component, many views.** Calendar, scheduler, timeline, agenda are all views of **eventcalendar**, configured via the `view` option. They are NOT separate components.
10. **Package:** `@mobiscroll/jquery`. CSS: `import '@mobiscroll/jquery/dist/css/mobiscroll.min.css'`.

---

## 7. Anti-Patterns

| WRONG | RIGHT |
|:---|:---|
| `import { Eventcalendar } from '@mobiscroll/react'` | `import * as $ from '@mobiscroll/jquery'` (or the jQuery plugin import) |
| `<Eventcalendar />` JSX component | `$('#element').mobiscroll().eventcalendar({ ... })` |
| Using React hooks (`useState`, `useEffect`) in jQuery code | jQuery event handlers and callbacks |
| Using Angular `@Component` decorators | jQuery plugin initialization |
| Using Vue `<script setup>` or `ref()` | Plain jQuery and callbacks |
| Using `mobiscroll.eventcalendar('#el', {...})` plain JS pattern | `$('#el').mobiscroll().eventcalendar({ ... })` jQuery plugin pattern |
| Treating Scheduler as a separate component | Scheduler is a **view** of eventcalendar: `view: { scheduler: { type: 'week' } }` |
| Using Mobiscroll Connect docs for frontend UI | Connect = server REST API. Use `5.35.0/llms-v5-jquery-full.txt` for UI. |
| Using UI component docs to answer a Connect API question | Connect = server REST API. Fetch `llms-connect-full.txt`. |
| Answering from training knowledge when docs are fetched | Answer only from fetched docs. If not covered, say so. |
| Answering a v6 API question without warning | Respond: "⚠️ This context is v5. That API may be v6-only. Switch to v6 docs?" |
