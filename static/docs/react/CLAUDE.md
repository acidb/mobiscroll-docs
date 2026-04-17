# Mobiscroll Documentation — AI Context (React)

- **Product:** Mobiscroll UI Components + Mobiscroll Connect
- **Version:** 6 (current)
- **Base URL:** `{{DOCS_BASE_URL}}`
- **Framework:** React
- **Package:** `@mobiscroll/react`

---

## 1. Documentation Sources

### Primary: Full React docs (single file, all content inline)

- **React:** {{DOCS_BASE_URL}}/llms-react-full.txt

### Secondary: React table of contents (links to individual .md pages)

- **React:** {{DOCS_BASE_URL}}/llms-react.txt

### Individual .md pages

Pattern: `{{DOCS_BASE_URL}}/docs/react/{section}/{page}.md`
Example: `{{DOCS_BASE_URL}}/docs/react/eventcalendar/overview.md`

### Mobiscroll Connect (server-side calendar integration API — separate product)

- **Full:** {{DOCS_BASE_URL}}/llms-connect-full.txt
- **TOC:** {{DOCS_BASE_URL}}/llms-connect.txt

### Hub

- **Overview:** {{DOCS_BASE_URL}}/llms.txt

---

## 2. Content Selection Priority

1. `llms-react-full.txt` — complete docs in one file (best for full context)
2. Individual `.md` pages — for targeted lookups
3. `llms-react.txt` — table of contents with links to .md pages
4. HTML pages — **last resort only**

NEVER use HTML when `.md` is available. The `.md` files are optimized for AI consumption.

---

## 3. Routing — CRITICAL

**This project uses React. Do not detect or switch frameworks. Always use `llms-react-full.txt`.**

**RULE: Resolve domain FIRST. Never mix domains.**

### Step 1 — Detect domain (Connect vs. UI)

Check BEFORE loading any documentation. If the query is about:
- API endpoints, REST, HTTP, webhooks
- **Server-side** sync, backend integration with calendar providers
- OAuth flows, authentication tokens, credentials managed on the server
- `mobiscroll-connect`, Connect scopes, Connect credentials
- Server-side event push/pull to/from Google Calendar, Outlook, or Apple Calendar

→ **Route to Mobiscroll Connect.** Fetch `llms-connect-full.txt`. Stop — do NOT also load React docs.

→ If the query is about UI rendering, components, views, pickers, theming, CSS, or frontend code → fetch `llms-react-full.txt`.

→ If the query is about **displaying** Google Calendar / Outlook / Apple Calendar events in the Eventcalendar UI (client-side data binding, `data` prop, event loading) — this is a **UI question**. Fetch `llms-react-full.txt`.

⚠️ **Do NOT route to Connect** just because a third-party calendar (Google, Outlook, Apple) is mentioned. Route to Connect only when the integration is explicitly server-side, involves OAuth on the backend, or references the Mobiscroll Connect product.

→ If the query explicitly mixes BOTH domains (Connect + UI component in the same request) → **respond with clarification:**

> "This request mixes Mobiscroll UI components with Mobiscroll Connect. These are separate systems. Please clarify: do you need help with the **frontend UI** (Eventcalendar, Datepicker, etc.) or the **backend integration** (Connect REST API, sync, OAuth)?"

**Exception — Connect-to-Eventcalendar data pipeline:**
If the query is specifically about fetching event data from Mobiscroll Connect and displaying it in Eventcalendar (e.g. "show Connect events in React Eventcalendar"), answer with a split response:

1. Briefly explain the roles: Connect fetches/syncs event data (backend); Eventcalendar renders it (frontend).
2. Show a minimal Connect API fetch example (backend/Node.js).
3. Show a minimal Eventcalendar example for React, passing the fetched data via the `data` prop.

Keep the two parts clearly separated. Do NOT blend Connect APIs with UI component APIs in a single code block.

### NEVER:

- Use Angular decorators, Vue composition API, or jQuery patterns in React code
- Show non-React Mobiscroll imports (`@mobiscroll/angular`, `@mobiscroll/vue`, etc.)
- **Mix UI component APIs with Connect APIs in a single response**
- **Treat Connect as a frontend framework or as a Mobiscroll UI component**
- If the user explicitly asks about a different Mobiscroll framework, respond: "This context is configured for React (`@mobiscroll/react`). For [other framework], use `CLAUDE-[other].md` instead."

---

## 4. When to Consult Mobiscroll Docs

- User mentions `mobiscroll`, `@mobiscroll/react`, or `<Eventcalendar />`/`<Datepicker />` JSX components
- Building scheduling, calendar, booking, or appointment UIs
- Working with event calendars, date/time pickers, select dropdowns, popups
- **Server-side** sync with Google Calendar, Outlook, or Apple Calendar, **server-side** OAuth flows, or **backend** webhook/API integration in a Mobiscroll context → **Mobiscroll Connect** (`llms-connect-full.txt`)
- Displaying Google Calendar / Outlook / Apple Calendar events inside the Eventcalendar UI component (client-side) → React docs (`llms-react-full.txt`)
- Theming or styling Mobiscroll components

⚠️ Keywords like **sync**, **API**, **integration**, **data source**, **authentication** alone do NOT route to Connect. They must be explicitly server-side or backend in nature.

---

## 5. Component Routing

All scheduling views are part of ONE component: **Eventcalendar**. They are configured via the `view` option — not separate components.

| User Intent | Component | Doc Path |
|:---|:---|:---|
| Event calendar / scheduling UI | Eventcalendar | `react/eventcalendar/overview` |
| Monthly/weekly/daily grid | Eventcalendar (calendar view) | `react/eventcalendar/calendar` |
| Event list / agenda | Eventcalendar (agenda view) | `react/eventcalendar/agenda` |
| Resource scheduler | Eventcalendar (scheduler view) | `react/eventcalendar/scheduler` |
| Horizontal timeline | Eventcalendar (timeline view) | `react/eventcalendar/timeline` |
| Drag & drop | Eventcalendar | `react/eventcalendar/drag-and-drop` |
| CRUD operations | Eventcalendar | `react/eventcalendar/crud` |
| Recurring events | Eventcalendar | `react/core-concepts/recurrence` |
| Timezones (Eventcalendar) | Eventcalendar | `react/eventcalendar/timezones` |
| Timezones (Datepicker) | Datepicker | `react/datepicker/timezones` |
| Date / time picker | Datepicker | `react/datepicker/overview` |
| Dropdown select | Select | `react/select/overview` |
| Modal / overlay | Popup | `react/popup/overview` |
| Input, textarea, button | Forms | `react/forms/input`, `react/forms/button` |
| Toast, snackbar, alert | Notifications | `react/notifications/toast` |
| Theming / CSS | Theming | `react/theming/sass-themes` |
| API reference | — | `react/eventcalendar/api`, `react/datepicker/api`, `react/select/api`, `react/popup/api`, `react/forms/api`, `react/notifications/api` |

### Mobiscroll Connect (separate product — server-side API)

| Intent | Source |
|:---|:---|
| Server-side Google/Outlook/Apple Calendar sync | `llms-connect-full.txt` |
| OAuth flow, calendar listing, event CRUD via REST (server) | `llms-connect-full.txt` |
| Displaying Google Calendar events in Eventcalendar (client-side) | `llms-react-full.txt` |
| Webhooks, push/pull sync, backend data sources | `llms-connect-full.txt` |
| Authentication, tokens, credentials, scopes | `llms-connect-full.txt` |
| Any server-side or API-first integration question | `llms-connect-full.txt` |

Connect is a **server-side** REST API. Eventcalendar is a **frontend** UI component. They complement each other but are documented separately and must NEVER be served together in a single routing decision.

---

## 6. Constraints

1. **React only.** This project uses `@mobiscroll/react`. Never generate code for Angular, Vue, JavaScript, or jQuery.
2. **No invented APIs.** Every option, event, method, and type name must come from the docs. If a symbol is not found, say so — do not guess.
3. **Docs are source of truth.** After fetching docs, answer **only** from the fetched content. Do not supplement with prior training knowledge. If the fetched docs contradict training knowledge, the docs win. If the docs do not cover the question, say: "This is not covered in the current documentation."
4. **Fetch failure fallback.** If `llms-react-full.txt` is unreachable, fall back to individual `.md` pages (Priority 2), then the TOC file (Priority 3). If all sources fail, state that docs are unavailable and ask the user to share relevant doc content.
5. **Version: 6.** Do not reference deprecated v5 APIs unless the user explicitly targets an older version.
6. **Type prefix: `Mbsc`.** All Mobiscroll TypeScript types start with `Mbsc` (e.g., `MbscEventcalendarView`, `MbscCalendarEvent`). Verify exact names in the API docs.
7. **One component, many views.** Calendar, scheduler, timeline, agenda are all views of **Eventcalendar**, configured via the `view` option. They are NOT separate components.
8. **Package:** `@mobiscroll/react`. CSS: `import '@mobiscroll/react/dist/css/mobiscroll.min.css'`.

---

## 7. Anti-Patterns

| WRONG | RIGHT |
|:---|:---|
| `import { Eventcalendar } from '@mobiscroll/angular'` | `import { Eventcalendar } from '@mobiscroll/react'` |
| Using Angular decorators or `MbscModule` in React code | React uses named imports — no module registration |
| Using Vue composition API or `<script setup>` in React code | React uses hooks and JSX components |
| Using jQuery `$()` plugin pattern in React code | React uses JSX: `<Eventcalendar ... />` |
| Treating Scheduler as a separate component | Scheduler is a **view** of Eventcalendar: `view: { scheduler: { type: 'week' } }` |
| Using Mobiscroll Connect docs for frontend UI | Connect = server REST API. Use `llms-react-full.txt` for UI. |
| Using UI component docs to answer a Connect API question | Connect = server REST API. Fetch `llms-connect-full.txt`. |
| Guessing `MbscCalendarEventData` type name | Look up exact type in `react/eventcalendar/api` docs |
| Answering from training knowledge when docs are fetched | Answer only from fetched docs. If not covered, say so. |
