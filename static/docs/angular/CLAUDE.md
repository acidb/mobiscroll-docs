# Mobiscroll Documentation — AI Context (Angular)

- **Product:** Mobiscroll UI Components + Mobiscroll Connect
- **Version:** 6 (current)
- **Base URL:** `{{DOCS_BASE_URL}}`
- **Framework:** Angular
- **Package:** `@mobiscroll/angular`

---

## 1. Documentation Sources

### Primary: Full Angular docs (single file, all content inline)

- **Angular:** {{DOCS_BASE_URL}}/llms-angular-full.txt

### Secondary: Angular table of contents (links to individual .md pages)

- **Angular:** {{DOCS_BASE_URL}}/llms-angular.txt

### Individual .md pages

Pattern: `{{DOCS_BASE_URL}}/docs/angular/{section}/{page}.md`
Example: `{{DOCS_BASE_URL}}/docs/angular/eventcalendar/overview.md`

### Mobiscroll Connect (server-side calendar integration API — separate product)

- **Full:** {{DOCS_BASE_URL}}/llms-connect-full.txt
- **TOC:** {{DOCS_BASE_URL}}/llms-connect.txt

### Hub

- **Overview:** {{DOCS_BASE_URL}}/llms.txt

---

## 2. Content Selection Priority

1. `llms-angular-full.txt` — complete docs in one file (best for full context)
2. Individual `.md` pages — for targeted lookups
3. `llms-angular.txt` — table of contents with links to .md pages
4. HTML pages — **last resort only**

NEVER use HTML when `.md` is available. The `.md` files are optimized for AI consumption.

---

## 3. Routing — CRITICAL

**This project uses Angular. Do not detect or switch frameworks. Always use `llms-angular-full.txt`.**

**RULE: Resolve domain FIRST. Never mix domains.**

### Step 1 — Detect domain (Connect vs. UI)

Check BEFORE loading any documentation. If the query is about:
- API endpoints, REST, HTTP, webhooks
- **Server-side** sync, backend integration with calendar providers
- OAuth flows, authentication tokens, credentials managed on the server
- `mobiscroll-connect`, Connect scopes, Connect credentials
- Server-side event push/pull to/from Google Calendar, Outlook, or Apple Calendar

→ **Route to Mobiscroll Connect.** Fetch `llms-connect-full.txt`. Stop — do NOT also load Angular docs.

→ If the query is about UI rendering, components, views, pickers, theming, CSS, or frontend code → fetch `llms-angular-full.txt`.

→ If the query is about **displaying** Google Calendar / Outlook / Apple Calendar events in the Eventcalendar UI (client-side data binding, `data` input, event loading) — this is a **UI question**. Fetch `llms-angular-full.txt`.

⚠️ **Do NOT route to Connect** just because a third-party calendar (Google, Outlook, Apple) is mentioned. Route to Connect only when the integration is explicitly server-side, involves OAuth on the backend, or references the Mobiscroll Connect product.

→ If the query explicitly mixes BOTH domains (Connect + UI component in the same request) → **respond with clarification:**

> "This request mixes Mobiscroll UI components with Mobiscroll Connect. These are separate systems. Please clarify: do you need help with the **frontend UI** (Eventcalendar, Datepicker, etc.) or the **backend integration** (Connect REST API, sync, OAuth)?"

**Exception — Connect-to-Eventcalendar data pipeline:**
If the query is specifically about fetching event data from Mobiscroll Connect and displaying it in Eventcalendar (e.g. "show Connect events in Angular Eventcalendar"), answer with a split response:

1. Briefly explain the roles: Connect fetches/syncs event data (backend); Eventcalendar renders it (frontend).
2. Show a minimal Connect API fetch example (backend/Node.js).
3. Show a minimal Eventcalendar example for Angular, passing the fetched data via the `[data]` input binding.

Keep the two parts clearly separated. Do NOT blend Connect APIs with UI component APIs in a single code block.

### NEVER:

- Use React hooks or JSX, Vue composition API, or jQuery patterns in Angular code
- Use JS/TS `import` for Mobiscroll CSS — Angular loads CSS via `angular.json` styles array
- Show non-Angular Mobiscroll imports (`@mobiscroll/react`, `@mobiscroll/vue`, etc.)
- **Mix UI component APIs with Connect APIs in a single response**
- **Treat Connect as a frontend framework or as a Mobiscroll UI component**
- If the user explicitly asks about a different Mobiscroll framework, respond: "This context is configured for Angular (`@mobiscroll/angular`). For [other framework], use `CLAUDE-[other].md` instead."

---

## 4. When to Consult Mobiscroll Docs

- User mentions `mobiscroll`, `@mobiscroll/angular`, or `mbsc-` prefixed elements
- Building scheduling, calendar, booking, or appointment UIs
- Working with event calendars, date/time pickers, select dropdowns, popups
- **Server-side** sync with Google Calendar, Outlook, or Apple Calendar, **server-side** OAuth flows, or **backend** webhook/API integration in a Mobiscroll context → **Mobiscroll Connect** (`llms-connect-full.txt`)
- Displaying Google Calendar / Outlook / Apple Calendar events inside the Eventcalendar UI component (client-side) → Angular docs (`llms-angular-full.txt`)
- Theming or styling `mbsc-` components

⚠️ Keywords like **sync**, **API**, **integration**, **data source**, **authentication** alone do NOT route to Connect. They must be explicitly server-side or backend in nature.

---

## 5. Component Routing

All scheduling views are part of ONE component: **Eventcalendar**. They are configured via the `view` option — not separate components. Angular templates use `mbsc-` prefix elements (e.g., `<mbsc-eventcalendar>`).

| User Intent | Component | Doc Path |
|:---|:---|:---|
| Event calendar / scheduling UI | Eventcalendar | `angular/eventcalendar/overview` |
| Monthly/weekly/daily grid | Eventcalendar (calendar view) | `angular/eventcalendar/calendar` |
| Event list / agenda | Eventcalendar (agenda view) | `angular/eventcalendar/agenda` |
| Resource scheduler | Eventcalendar (scheduler view) | `angular/eventcalendar/scheduler` |
| Horizontal timeline | Eventcalendar (timeline view) | `angular/eventcalendar/timeline` |
| Drag & drop | Eventcalendar | `angular/eventcalendar/drag-and-drop` |
| CRUD operations | Eventcalendar | `angular/eventcalendar/crud` |
| Recurring events | Eventcalendar | `angular/core-concepts/recurrence` |
| Timezones (Eventcalendar) | Eventcalendar | `angular/eventcalendar/timezones` |
| Timezones (Datepicker) | Datepicker | `angular/datepicker/timezones` |
| Date / time picker | Datepicker | `angular/datepicker/overview` |
| Dropdown select | Select | `angular/select/overview` |
| Modal / overlay | Popup | `angular/popup/overview` |
| Input, textarea, button | Forms | `angular/forms/input`, `angular/forms/button` |
| Toast, snackbar, alert | Notifications | `angular/notifications/toast` |
| Theming / CSS | Theming | `angular/theming/sass-themes` |
| API reference | — | `angular/eventcalendar/api`, `angular/datepicker/api`, `angular/select/api`, `angular/popup/api`, `angular/forms/api`, `angular/notifications/api` |

### Mobiscroll Connect (separate product — server-side API)

| Intent | Source |
|:---|:---|
| Server-side Google/Outlook/Apple Calendar sync | `llms-connect-full.txt` |
| OAuth flow, calendar listing, event CRUD via REST (server) | `llms-connect-full.txt` |
| Displaying Google Calendar events in Eventcalendar (client-side) | `llms-angular-full.txt` |
| Webhooks, push/pull sync, backend data sources | `llms-connect-full.txt` |
| Authentication, tokens, credentials, scopes | `llms-connect-full.txt` |
| Any server-side or API-first integration question | `llms-connect-full.txt` |

Connect is a **server-side** REST API. Eventcalendar is a **frontend** UI component. They complement each other but are documented separately and must NEVER be served together in a single routing decision.

---

## 6. Constraints

1. **Angular only.** This project uses `@mobiscroll/angular`. Never generate code for React, Vue, JavaScript, or jQuery.
2. **No invented APIs.** Every option, event, method, and type name must come from the docs. If a symbol is not found, say so — do not guess.
3. **Docs are source of truth.** After fetching docs, answer **only** from the fetched content. Do not supplement with prior training knowledge. If the fetched docs contradict training knowledge, the docs win. If the docs do not cover the question, say: "This is not covered in the current documentation."
4. **Fetch failure fallback.** If `llms-angular-full.txt` is unreachable, fall back to individual `.md` pages (Priority 2), then the TOC file (Priority 3). If all sources fail, state that docs are unavailable and ask the user to share relevant doc content.
5. **Version: 6 (latest).** This context is for Mobiscroll v6. If the user explicitly mentions "v5", "version 5", uses a v5-only pattern (e.g. `mobiscroll.settings`, `mobiscroll.theme`, `data-role` attributes), or asks about an API not found in the v6 docs, respond:
   > "⚠️ This looks like Mobiscroll v5 syntax or API usage. This context is configured for Mobiscroll **v6 (latest)**. Would you like: 1) the v6 equivalent of what you're asking about, or 2) guidance using the [v5 documentation]({{DOCS_BASE_URL}}/5.35.0/angular/guides/ai-integration) instead?"
   Do not silently translate v5 patterns to v6 — always ask first. Do not reference removed v5 APIs in v6 answers.
6. **Type prefix: `Mbsc`.** All Mobiscroll TypeScript types start with `Mbsc` (e.g., `MbscEventcalendarView`, `MbscCalendarEvent`). Verify exact names in the API docs.
7. **One component, many views.** Calendar, scheduler, timeline, agenda are all views of **Eventcalendar**, configured via the `view` option. They are NOT separate components.
8. **CSS loading:** Use `angular.json` `styles` array — NEVER `import '...'` in TypeScript/component files. **MbscModule placement:** Standalone component → add to `@Component({ imports: [MbscModule] })`. NgModule app → add to `@NgModule({ imports: [MbscModule] })`. Not both at once.

---

## 7. Anti-Patterns

| WRONG | RIGHT |
|:---|:---|
| `import { Eventcalendar } from '@mobiscroll/react'` in Angular | `import { MbscModule } from '@mobiscroll/angular'` |
| `import '@mobiscroll/angular/dist/css/mobiscroll.min.css'` in TS | Angular uses `angular.json` `styles` array for CSS |
| Adding `MbscModule` to both `@Component` imports and `@NgModule` at once | Standalone: `@Component({ imports: [MbscModule] })`. NgModule: `@NgModule({ imports: [MbscModule] })`. Not both. |
| Using React JSX (`<Eventcalendar />`) in Angular templates | Angular uses `<mbsc-eventcalendar>` elements |
| Using Vue `<script setup>` or `ref()` in Angular code | Angular uses `@Component`, `@Input`, `@Output` decorators |
| Using jQuery `$()` plugin pattern in Angular code | Angular uses template binding and `@Component` |
| Treating Scheduler as a separate component | Scheduler is a **view** of Eventcalendar: `view: { scheduler: { type: 'week' } }` |
| Using Mobiscroll Connect docs for frontend UI | Connect = server REST API. Use `llms-angular-full.txt` for UI. |
| Using UI component docs to answer a Connect API question | Connect = server REST API. Fetch `llms-connect-full.txt`. |
| Guessing `MbscCalendarEventData` type name | Look up exact type in `angular/eventcalendar/api` docs |
| Answering from training knowledge when docs are fetched | Answer only from fetched docs. If not covered, say so. |
| Silently translating v5 syntax to v6 without informing the user | Detect v5 signal → ask if user wants the v6 equivalent or v5 docs guidance |
