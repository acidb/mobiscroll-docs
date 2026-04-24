# Mobiscroll Documentation — AI Context (JavaScript)

- **Product:** Mobiscroll UI Components + Mobiscroll Connect
- **Version:** 6 (current)
- **Base URL:** `{{DOCS_BASE_URL}}`
- **Framework:** JavaScript (vanilla / plain JS)
- **Package:** `@mobiscroll/javascript`

---

## 1. Documentation Sources

### Primary: Full JavaScript docs (single file, all content inline)

- **JavaScript:** {{DOCS_BASE_URL}}/llms-javascript-full.txt

### Secondary: JavaScript table of contents (links to individual .md pages)

- **JavaScript:** {{DOCS_BASE_URL}}/llms-javascript.txt

### Individual .md pages

Pattern: `{{DOCS_BASE_URL}}/docs/javascript/{section}/{page}.md`
Example: `{{DOCS_BASE_URL}}/docs/javascript/eventcalendar/overview.md`

### Mobiscroll Connect (server-side calendar integration API — separate product)

- **Full:** {{DOCS_BASE_URL}}/llms-connect-full.txt
- **TOC:** {{DOCS_BASE_URL}}/llms-connect.txt

### Hub

- **Overview:** {{DOCS_BASE_URL}}/llms.txt

---

## 2. Content Selection Priority

1. `llms-javascript-full.txt` — complete docs in one file (best for full context)
2. Individual `.md` pages — for targeted lookups
3. `llms-javascript.txt` — table of contents with links to .md pages
4. HTML pages — **last resort only**

NEVER use HTML when `.md` is available. The `.md` files are optimized for AI consumption.

---

## 3. Routing — CRITICAL

**This project uses plain JavaScript. Do not detect or switch frameworks. Always use `llms-javascript-full.txt`.**

**RULE: Resolve domain FIRST. Never mix domains.**

### Step 1 — Detect domain (Connect vs. UI)

Check BEFORE loading any documentation. If the query is about:
- API endpoints, REST, HTTP, webhooks
- **Server-side** sync, backend integration with calendar providers
- OAuth flows, authentication tokens, credentials managed on the server
- `mobiscroll-connect`, Connect scopes, Connect credentials
- Server-side event push/pull to/from Google Calendar, Outlook, or Apple Calendar

→ **Route to Mobiscroll Connect.** Fetch `llms-connect-full.txt`. Stop — do NOT also load JavaScript docs.

→ If the query is about UI rendering, components, views, pickers, theming, CSS, or frontend code → fetch `llms-javascript-full.txt`.

→ If the query is about **displaying** Google Calendar / Outlook / Apple Calendar events in the Eventcalendar UI (client-side data binding, `data` option, event loading) — this is a **UI question**. Fetch `llms-javascript-full.txt`.

⚠️ **Do NOT route to Connect** just because a third-party calendar (Google, Outlook, Apple) is mentioned. Route to Connect only when the integration is explicitly server-side, involves OAuth on the backend, or references the Mobiscroll Connect product.

→ If the query explicitly mixes BOTH domains (Connect + UI component in the same request) → **respond with clarification:**

> "This request mixes Mobiscroll UI components with Mobiscroll Connect. These are separate systems. Please clarify: do you need help with the **frontend UI** (Eventcalendar, Datepicker, etc.) or the **backend integration** (Connect REST API, sync, OAuth)?"

**Exception — Connect-to-Eventcalendar data pipeline:**
If the query is specifically about fetching event data from Mobiscroll Connect and displaying it in Eventcalendar (e.g. "show Connect events in a JavaScript Eventcalendar"), answer with a split response:

1. Briefly explain the roles: Connect fetches/syncs event data (backend); Eventcalendar renders it (frontend).
2. Show a minimal Connect API fetch example (backend/Node.js).
3. Show a minimal Eventcalendar example for JavaScript, passing the fetched data via the `data` option.

Keep the two parts clearly separated. Do NOT blend Connect APIs with UI component APIs in a single code block.

### NEVER:

- Use React JSX or hooks, Angular decorators or `MbscModule`, Vue SFC or composition API, or jQuery `$()` patterns
- Use component-based initialization instead of the imperative `mobiscroll.eventcalendar(element, options)` API
- Show non-JavaScript Mobiscroll imports (`@mobiscroll/react`, `@mobiscroll/angular`, etc.)
- **Mix UI component APIs with Connect APIs in a single response**
- **Treat Connect as a frontend framework or as a Mobiscroll UI component**
- If the user explicitly asks about a different Mobiscroll framework, respond: "This context is configured for JavaScript (`@mobiscroll/javascript`). For [other framework], use `CLAUDE-[other].md` instead."

---

## 4. When to Consult Mobiscroll Docs

- User mentions `mobiscroll`, `@mobiscroll/javascript`, or `mobiscroll.eventcalendar()` / `mobiscroll.datepicker()` calls
- Building scheduling, calendar, booking, or appointment UIs
- Working with event calendars, date/time pickers, select dropdowns, popups
- **Server-side** sync with Google Calendar, Outlook, or Apple Calendar, **server-side** OAuth flows, or **backend** webhook/API integration in a Mobiscroll context → **Mobiscroll Connect** (`llms-connect-full.txt`)
- Displaying Google Calendar / Outlook / Apple Calendar events inside the Eventcalendar UI component (client-side) → JavaScript docs (`llms-javascript-full.txt`)
- Theming or styling Mobiscroll components

⚠️ Keywords like **sync**, **API**, **integration**, **data source**, **authentication** alone do NOT route to Connect. They must be explicitly server-side or backend in nature.

---

## 5. Component Routing

All scheduling views are part of ONE component: **Eventcalendar**. They are configured via the `view` option — not separate components. Instances are created imperatively: `mobiscroll.eventcalendar('#element', { ... })`.

_Note: component names are lowercase in the JavaScript API (e.g., `mobiscroll.eventcalendar(...)`, `mobiscroll.datepicker(...)`). This matches the actual function names._

| User Intent | Component | Doc Path |
|:---|:---|:---|
| Event calendar / scheduling UI | eventcalendar | `javascript/eventcalendar/overview` |
| Monthly/weekly/daily grid | eventcalendar (calendar view) | `javascript/eventcalendar/calendar` |
| Event list / agenda | eventcalendar (agenda view) | `javascript/eventcalendar/agenda` |
| Resource scheduler | eventcalendar (scheduler view) | `javascript/eventcalendar/scheduler` |
| Horizontal timeline | eventcalendar (timeline view) | `javascript/eventcalendar/timeline` |
| Drag & drop | eventcalendar | `javascript/eventcalendar/drag-and-drop` |
| CRUD operations | eventcalendar | `javascript/eventcalendar/crud` |
| Recurring events | eventcalendar | `javascript/core-concepts/recurrence` |
| Timezones (Eventcalendar) | eventcalendar | `javascript/eventcalendar/timezones` |
| Timezones (Datepicker) | datepicker | `javascript/datepicker/timezones` |
| Date / time picker | datepicker | `javascript/datepicker/overview` |
| Dropdown select | select | `javascript/select/overview` |
| Modal / overlay | popup | `javascript/popup/overview` |
| Input, textarea, button | forms | `javascript/forms/input`, `javascript/forms/button` |
| Toast, snackbar, alert | notifications | `javascript/notifications/toast` |
| Theming / CSS | theming | `javascript/theming/sass-themes` |
| API reference | — | `javascript/eventcalendar/api`, `javascript/datepicker/api`, `javascript/select/api`, `javascript/popup/api`, `javascript/forms/api`, `javascript/notifications/api` |

### Mobiscroll Connect (separate product — server-side API)

| Intent | Source |
|:---|:---|
| Server-side Google/Outlook/Apple Calendar sync | `llms-connect-full.txt` |
| OAuth flow, calendar listing, event CRUD via REST (server) | `llms-connect-full.txt` |
| Displaying Google Calendar events in Eventcalendar (client-side) | `llms-javascript-full.txt` |
| Webhooks, push/pull sync, backend data sources | `llms-connect-full.txt` |
| Authentication, tokens, credentials, scopes | `llms-connect-full.txt` |
| Any server-side or API-first integration question | `llms-connect-full.txt` |

Connect is a **server-side** REST API. Eventcalendar is a **frontend** UI component. They complement each other but are documented separately and must NEVER be served together in a single routing decision.

---

## 6. Constraints

1. **JavaScript (plain/vanilla) only.** This project uses `@mobiscroll/javascript`. Never generate code for React, Angular, Vue, or jQuery. No framework bindings — this is pure DOM API.
2. **No invented APIs.** Every option, event, method, and type name must come from the docs. If a symbol is not found, say so — do not guess.
3. **Docs are source of truth.** After fetching docs, answer **only** from the fetched content. Do not supplement with prior training knowledge. If the fetched docs contradict training knowledge, the docs win. If the docs do not cover the question, say: "This is not covered in the current documentation."
4. **Fetch failure fallback.** If `llms-javascript-full.txt` is unreachable, fall back to individual `.md` pages (Priority 2), then the TOC file (Priority 3). If all sources fail, state that docs are unavailable and ask the user to share relevant doc content.
5. **Version: 6 (latest).** This context is for Mobiscroll v6. If the user explicitly mentions "v5", "version 5", uses a v5-only pattern, or asks about an API not found in the v6 docs, respond:
   > "⚠️ This looks like Mobiscroll v5 syntax or API usage. This context is configured for Mobiscroll **v6 (latest)**. Would you like: 1) the v6 equivalent of what you're asking about, or 2) guidance using the [v5 documentation]({{DOCS_BASE_URL}}/5.35.0/javascript/guides/ai-integration) instead?"
   Do not silently translate v5 patterns to v6 — always ask first. Do not reference removed v5 APIs in v6 answers.
6. **TypeScript types.** When using TypeScript, all Mobiscroll types are prefixed `Mbsc` (e.g., `MbscEventcalendarView`, `MbscCalendarEvent`). Verify exact names in the API docs.
7. **Imperative initialization.** Instances are created via `mobiscroll.eventcalendar('#element', { ... })` — not JSX, not Angular templates, not Vue SFCs, not jQuery plugin chains.
8. **One component, many views.** Calendar, scheduler, timeline, agenda are all views of **eventcalendar**, configured via the `view` option. They are NOT separate components.
9. **Package:** `@mobiscroll/javascript`. CSS: `import '@mobiscroll/javascript/dist/css/mobiscroll.min.css'`.

---

## 7. Anti-Patterns

| WRONG | RIGHT |
|:---|:---|
| `import { Eventcalendar } from '@mobiscroll/react'` | `import * as mobiscroll from '@mobiscroll/javascript'` |
| `<Eventcalendar />` JSX component | `mobiscroll.eventcalendar('#element', { ... })` |
| Using React hooks (`useState`, `useEffect`) in JS code | Vanilla DOM events and callbacks |
| Using Angular `@Component` decorators | Imperative initialization on DOM elements |
| Using Vue `<script setup>` or `ref()` | Plain JS variables and event handlers |
| Using jQuery `$('#el').mobiscroll()` plugin pattern | `mobiscroll.eventcalendar('#el', { ... })` |
| Treating Scheduler as a separate component | Scheduler is a **view** of eventcalendar: `view: { scheduler: { type: 'week' } }` |
| Using Mobiscroll Connect docs for frontend UI | Connect = server REST API. Use `llms-javascript-full.txt` for UI. |
| Using UI component docs to answer a Connect API question | Connect = server REST API. Fetch `llms-connect-full.txt`. |
| Answering from training knowledge when docs are fetched | Answer only from fetched docs. If not covered, say so. |
| Silently translating v5 syntax to v6 without informing the user | Detect v5 signal → ask if user wants the v6 equivalent or v5 docs guidance |
