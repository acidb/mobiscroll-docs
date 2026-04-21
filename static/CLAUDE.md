# Mobiscroll Documentation — AI Context

- **Product:** Mobiscroll UI Components + Mobiscroll Connect
- **Version:** 6 (current)
- **Base URL:** `{{DOCS_BASE_URL}}`
- **Frameworks:** React, Angular, Vue, JavaScript, jQuery
- **Packages:** `@mobiscroll/react`, `@mobiscroll/angular`, `@mobiscroll/vue`, `@mobiscroll/javascript`, `@mobiscroll/jquery`

---

## 1. Documentation Sources

### Primary: Full docs per framework (single file, all content inline)

Fetch ONE of these based on the detected framework. Each file contains the complete documentation for that framework.

- **React:** {{DOCS_BASE_URL}}/llms-react-full.txt
- **Angular:** {{DOCS_BASE_URL}}/llms-angular-full.txt
- **Vue:** {{DOCS_BASE_URL}}/llms-vue-full.txt
- **JavaScript:** {{DOCS_BASE_URL}}/llms-javascript-full.txt
- **jQuery:** {{DOCS_BASE_URL}}/llms-jquery-full.txt

### Secondary: Table of contents per framework (links to individual .md pages)

- **React:** {{DOCS_BASE_URL}}/llms-react.txt
- **Angular:** {{DOCS_BASE_URL}}/llms-angular.txt
- **Vue:** {{DOCS_BASE_URL}}/llms-vue.txt
- **JavaScript:** {{DOCS_BASE_URL}}/llms-javascript.txt
- **jQuery:** {{DOCS_BASE_URL}}/llms-jquery.txt

### Mobiscroll Connect (server-side calendar integration API — separate product)

- **Full:** {{DOCS_BASE_URL}}/llms-connect-full.txt
- **TOC:** {{DOCS_BASE_URL}}/llms-connect.txt

### Hub

- **Overview:** {{DOCS_BASE_URL}}/llms.txt
- **All frameworks combined:** {{DOCS_BASE_URL}}/llms-full.txt

### Individual .md pages

Pattern: `{{DOCS_BASE_URL}}/docs/{framework}/{section}/{page}.md`
Example: `{{DOCS_BASE_URL}}/docs/react/eventcalendar/overview.md`

---

## 2. Content Selection Priority

1. `llms-{framework}-full.txt` — complete docs in one file (best for full context)
2. Individual `.md` pages — for targeted lookups
3. `llms-{framework}.txt` — table of contents with links to .md pages
4. HTML pages — **last resort only**

NEVER use HTML when `.md` is available. The `.md` files are optimized for AI consumption.

---

## 3. Routing — CRITICAL

**RULE: Resolve domain FIRST, then framework. Never mix domains or frameworks.**

### Step 1 — Detect domain (Connect vs. UI)

Check BEFORE detecting any framework. If the query is about:
- API endpoints, REST, HTTP, webhooks
- **Server-side** sync, backend integration with calendar providers
- OAuth flows, authentication tokens, credentials managed on the server
- `mobiscroll-connect`, Connect scopes, Connect credentials
- Server-side event push/pull to/from Google Calendar, Outlook, or Apple Calendar

→ **Route to Mobiscroll Connect.** Fetch `llms-connect-full.txt`. Stop — do NOT also load a UI framework file.

→ If the query is about UI rendering, components, views, pickers, theming, CSS, or frontend code → proceed to Step 2.

→ If the query is about **displaying** Google Calendar / Outlook / Apple Calendar events in the Eventcalendar UI (client-side data binding, `data` prop, event loading) — this is a **UI framework question**. Proceed to Step 2.

⚠️ **Do NOT route to Connect** just because a third-party calendar (Google, Outlook, Apple) is mentioned. Route to Connect only when the integration is explicitly server-side, involves OAuth on the backend, or references the Mobiscroll Connect product.

→ If the query explicitly mixes BOTH domains (Connect + UI component in the same request) → **respond with clarification:**

> "This request mixes Mobiscroll UI components with Mobiscroll Connect. These are separate systems. Please clarify: do you need help with the **frontend UI** (Eventcalendar, Datepicker, etc.) or the **backend integration** (Connect REST API, sync, OAuth)?"

**Exception — Connect-to-Eventcalendar data pipeline:**
If the query is specifically about fetching event data from Mobiscroll Connect and displaying it in Eventcalendar (e.g. "show Connect events in React Eventcalendar", "display events from Connect in Eventcalendar"), this is a recognized integration pattern — NOT an ambiguous mixed-domain request. Answer with a split response:

1. Briefly explain the roles: Connect fetches/syncs event data (backend); Eventcalendar renders it (frontend).
2. Show a minimal Connect API fetch example (backend/Node.js).
3. Show a minimal Eventcalendar example for the detected framework, passing the fetched data via the `data` prop.

Keep the two parts clearly separated. Do NOT blend Connect APIs with UI component APIs in a single code block.

### Step 2 — Detect UI framework (only if domain = UI)

**RULE: Select exactly ONE framework. Never mix.**

#### Detection signals (check in order):

1. User explicitly states the framework
2. `package.json` dependencies: `@mobiscroll/react`, `@mobiscroll/angular`, `@mobiscroll/vue`, `@mobiscroll/javascript`, `@mobiscroll/jquery`
3. File extensions: `.tsx`/`.jsx` → React, `.vue` → Vue, `.component.ts` / `@Component` → Angular
4. Import patterns: `from '@mobiscroll/react'` etc.

#### Routing:

- IF React → fetch `llms-react-full.txt` ONLY. Use `@mobiscroll/react` imports ONLY.
- IF Angular → fetch `llms-angular-full.txt` ONLY. Use `@mobiscroll/angular` imports ONLY.
- IF Vue → fetch `llms-vue-full.txt` ONLY. Use `@mobiscroll/vue` imports ONLY.
- IF JavaScript → fetch `llms-javascript-full.txt` ONLY. Use `@mobiscroll/javascript` imports ONLY.
- IF jQuery → fetch `llms-jquery-full.txt` ONLY. Use `@mobiscroll/jquery` imports ONLY.
- IF unknown → **ASK the user.** Do not guess. Do not default.

**Prescribed question when framework is unknown:**
> "Which framework are you using? (React, Angular, Vue, JavaScript, or jQuery)"

**Re-fetch rule:** If the detected framework changes during a session (e.g. user switches from React to Angular), re-fetch the appropriate `llms-{framework}-full.txt` before answering. Do not answer using a previously loaded framework's docs.

### NEVER:

- Combine APIs from different UI frameworks
- Use React hooks in Angular code
- Use Angular decorators in Vue code
- Show `@mobiscroll/react` imports in an Angular project
- Fall back to a different framework's docs if the correct one is unclear
- **Mix UI component APIs with Connect APIs in a single response**
- **Treat Connect as a frontend framework or as a Mobiscroll UI component**

---

## 4. When to Consult Mobiscroll Docs

- User mentions `mobiscroll`, `@mobiscroll/*`, or `mbsc-` prefixed elements
- Building scheduling, calendar, booking, or appointment UIs
- Working with event calendars, date/time pickers, select dropdowns, popups
- **Server-side** sync with Google Calendar, Outlook, or Apple Calendar, **server-side** OAuth flows, or **backend** webhook/API integration in a Mobiscroll context → **Mobiscroll Connect** (`llms-connect-full.txt`)
- Displaying Google Calendar / Outlook / Apple Calendar events inside the Eventcalendar UI component (client-side) → UI framework docs (`llms-{framework}-full.txt`)
- Theming or styling `mbsc-` components

⚠️ Keywords like **sync**, **API**, **integration**, **data source**, **authentication** alone do NOT route to Connect. They must be explicitly server-side or backend in nature. "Integrating my API data into Eventcalendar" is a UI question. "Server-side OAuth to sync Google Calendar" is a Connect question. When in doubt, follow the domain-detection rules in §3 Step 1.

---

## 5. Component Routing

All scheduling views are part of ONE component: **Eventcalendar**. They are configured via the `view` option — not separate components.

| User Intent | Component | Doc Path (append to framework) |
|:---|:---|:---|
| Event calendar / scheduling UI | Eventcalendar | `eventcalendar/overview` |
| Monthly/weekly/daily grid | Eventcalendar (calendar view) | `eventcalendar/calendar` |
| Event list / agenda | Eventcalendar (agenda view) | `eventcalendar/agenda` |
| Resource scheduler | Eventcalendar (scheduler view) | `eventcalendar/scheduler` |
| Horizontal timeline | Eventcalendar (timeline view) | `eventcalendar/timeline` |
| Drag & drop | Eventcalendar | `eventcalendar/drag-and-drop` |
| CRUD operations | Eventcalendar | `eventcalendar/crud` |
| Recurring events | Eventcalendar | `core-concepts/recurrence` |
| Timezones (Eventcalendar) | Eventcalendar | `eventcalendar/timezones` |
| Timezones (Datepicker) | Datepicker | `datepicker/timezones` |
| Date / time picker | Datepicker | `datepicker/overview` |
| Dropdown select | Select | `select/overview` |
| Modal / overlay | Popup | `popup/overview` |
| Input, textarea, button | Forms | `forms/input`, `forms/button` |
| Toast, snackbar, alert | Notifications | `notifications/toast` |
| Theming / CSS | Theming | `theming/sass-themes` |
| API reference | — | `eventcalendar/api`, `datepicker/api`, `select/api`, `popup/api`, `forms/api`, `notifications/api` |

### Mobiscroll Connect (separate product — server-side API)

| Intent | Source |
|:---|:---|
| Server-side Google/Outlook/Apple Calendar sync | `llms-connect-full.txt` |
| OAuth flow, calendar listing, event CRUD via REST (server) | `llms-connect-full.txt` |
| Displaying Google Calendar events in Eventcalendar (client-side) | `llms-{framework}-full.txt` |
| Webhooks, push/pull sync, backend data sources | `llms-connect-full.txt` |
| Authentication, tokens, credentials, scopes | `llms-connect-full.txt` |
| Any server-side or API-first integration question | `llms-connect-full.txt` |

Connect is a **server-side** REST API. Eventcalendar is a **frontend** UI component. They complement each other but are documented separately and must NEVER be served together in a single routing decision.

---

## 6. Constraints

1. **No cross-framework mixing.** One framework per response. Period.
2. **No invented APIs.** Every option, event, method, and type name must come from the docs. If a symbol is not found, say so — do not guess.
3. **Docs are source of truth.** After fetching docs, answer **only** from the fetched content. Do not supplement with prior training knowledge. If your training knowledge contradicts the fetched docs, the docs win. If the docs do not cover the question, say: "This is not covered in the current documentation."
4. **Fetch failure fallback.** If `llms-{framework}-full.txt` is unreachable, do NOT answer from memory. Fall back to individual `.md` pages (Priority 2), then the TOC file (Priority 3). If all sources fail, state that docs are unavailable and ask the user to share relevant doc content.
5. **Version: 6.** Do not reference deprecated v5 APIs unless the user explicitly targets an older version.
6. **Type prefix: `Mbsc` (UI frameworks only).** All Mobiscroll TypeScript types in UI frameworks start with `Mbsc` (e.g., `MbscEventcalendarView`, `MbscCalendarEvent`). Verify exact names in the API docs. This does not apply to Mobiscroll Connect (server-side REST API — no `Mbsc` types).
7. **One component, many views.** Calendar, scheduler, timeline, agenda are all views of **Eventcalendar**, configured via the `view` option. They are NOT separate components.
8. **Vue: use Vue 3 only.** Use the Composition API with `<script setup>`. Do not use Vue 2 Options API or `Vue.component()` registration patterns.

---

## 7. Anti-Patterns

| WRONG | RIGHT |
|:---|:---|
| `import { Eventcalendar } from '@mobiscroll/react'` in Angular | `import { MbscModule } from '@mobiscroll/angular'` |
| `import '@mobiscroll/angular/dist/css/mobiscroll.min.css'` in TS | Angular uses `angular.json` `styles` array for CSS |
| Treating Scheduler as a separate component | Scheduler is a **view** of Eventcalendar: `view: { scheduler: { type: 'week' } }` |
| Using Mobiscroll Connect docs for frontend UI | Connect = server REST API. Use Eventcalendar docs for UI. |
| Using UI component docs to answer a Connect API question | Connect = server REST API. Fetch `llms-connect-full.txt`. |
| Answering "Sync Eventcalendar using Connect in React" in one response | Mixed domain — ask the user to clarify: frontend UI or backend integration. |
| Listing Connect as a UI component or framework | Connect is a separate backend product, not a framework. |
| Guessing `MbscCalendarEventData` type name | Look up exact type in `eventcalendar/api` docs |
| Mixing `useState` (React) with `@ViewChild` (Angular) | Use only the patterns from the detected framework's docs |
| Defaulting to React when framework is unknown | ASK the user. Do not default. |
| Adding `MbscModule` to both `@Component` imports and `@NgModule` at once | Standalone component: add to `@Component({ imports: [MbscModule] })`. NgModule app: add to `@NgModule({ imports: [MbscModule] })`. Not both. |
| Using Vue 2 Options API or `Vue.component()` with Mobiscroll | Use Vue 3 Composition API with `<script setup>` only |
| Answering from training knowledge when docs are fetched | Answer only from fetched docs. If not covered, say so. |
