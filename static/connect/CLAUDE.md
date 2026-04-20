# Mobiscroll Documentation — AI Context (Connect)

- **Product:** Mobiscroll Connect (server-side calendar integration API)
- **Version:** current
- **Base URL:** `{{DOCS_BASE_URL}}`
- **Domain:** Backend / server-side integration (OAuth 2.0, REST API, webhooks, calendar sync)
- **Package (Node.js SDK):** `@mobiscroll/connect-sdk`

---

## 1. Documentation Sources

### Primary: Full Connect docs (single file, all content inline)

- **Connect:** {{DOCS_BASE_URL}}/llms-connect-full.txt

### Secondary: Connect table of contents (links to individual .md pages)

- **Connect:** {{DOCS_BASE_URL}}/llms-connect.txt

### Individual .md pages

Pattern: `{{DOCS_BASE_URL}}/connect/{section}/{page}.md`
Example: `{{DOCS_BASE_URL}}/connect/api/events.md`

### Hub

- **Overview:** {{DOCS_BASE_URL}}/llms.txt

---

## 2. Content Selection Priority

1. `llms-connect-full.txt` — complete docs in one file (best for full context)
2. Individual `.md` pages — for targeted lookups
3. `llms-connect.txt` — table of contents with links to .md pages
4. HTML pages — **last resort only**

NEVER use HTML when `.md` is available. The `.md` files are optimized for AI consumption.

---

## 3. Routing — CRITICAL

**This project uses Mobiscroll Connect. Always fetch `llms-connect-full.txt`. Do not load UI framework docs.**

**RULE: Mobiscroll Connect is a backend/server-side REST API. It has no UI components.**

### Always route to Connect docs when the query is about:

- REST API endpoints, HTTP requests, response formats
- OAuth 2.0 authorization flows, access tokens, refresh tokens
- Calendar provider integration: Google Calendar, Outlook, Apple Calendar, CalDAV
- Server-side event synchronization, push/pull sync
- Webhooks, real-time change notifications
- `@mobiscroll/connect-sdk` usage
- Scopes, permissions, credentials management on the server
- Application setup, Postman collection, Connect API overview

### Out-of-scope queries — UI framework questions

→ If the query is about **displaying** data in a frontend UI component (Eventcalendar, Datepicker, etc.) — that is a UI framework question, not a Connect question. Detect the framework from project context (package.json, file extensions, import patterns). If identifiable, fetch `llms-{framework}-full.txt` for the UI part of the answer. If the framework cannot be determined, ask: "Which frontend framework are you using? (React, Angular, Vue, JavaScript, or jQuery)"

**Re-fetch rule:** If the user shifts from Connect questions to UI component questions (or vice versa) during a session, re-fetch the appropriate docs before answering. Do not answer UI questions from Connect docs, or Connect questions from UI docs.

→ If the query explicitly mixes BOTH domains (Connect + UI component in the same request) → **respond with clarification:**

> "This request mixes Mobiscroll UI components with Mobiscroll Connect. These are separate systems. Please clarify: do you need help with the **frontend UI** (Eventcalendar, Datepicker, etc.) or the **backend integration** (Connect REST API, sync, OAuth)?"

**Exception — Connect-to-Eventcalendar data pipeline:**
If the query is specifically about fetching event data from Mobiscroll Connect and displaying it in a frontend Eventcalendar (e.g. "fetch Connect events and show in Eventcalendar"), answer with a split response:

1. Briefly explain the roles: Connect fetches/syncs event data (backend); Eventcalendar renders it (frontend).
2. Show a minimal Connect API fetch example (backend/Node.js).
3. Ask which UI framework the user is using if not already known, then show a minimal Eventcalendar example passing the fetched data via the `data` prop/option.

Keep the two parts clearly separated. Do NOT blend Connect APIs with UI component APIs in a single code block.

### NEVER:

- Generate JSX, Angular templates, Vue SFCs, or DOM manipulation code
- Reference Eventcalendar, Datepicker, Select, Popup, or any other Mobiscroll UI component as if they are part of Connect
- Import from `@mobiscroll/react`, `@mobiscroll/angular`, `@mobiscroll/vue`, `@mobiscroll/javascript`, or `@mobiscroll/jquery`
- **Treat Connect as a UI framework or a set of frontend components**

---

## 4. When to Consult Connect Docs

- User asks about calendar synchronization, OAuth, or external calendar integration
- User references Google Calendar, Outlook, Apple Calendar, or CalDAV integration
- User asks about Mobiscroll Connect API endpoints, webhooks, or authentication
- Project uses `@mobiscroll/connect-sdk` or direct Connect REST API calls
- User asks about scopes, permissions, credentials, or server-side token management
- User asks about application setup in the Mobiscroll Connect dashboard

⚠️ Keywords like **calendar sync**, **API**, **authentication**, or **integration** alone do NOT route to Connect. They must be explicitly server-side or backend in nature. "Integrating event data into Eventcalendar" is a UI question. "Server-side OAuth to sync Google Calendar via Mobiscroll Connect" is a Connect question. When in doubt, check whether the question involves REST endpoints, OAuth flows, or server-managed credentials — if not, it is likely a UI question.

---

## 5. API Mapping

Mobiscroll Connect is a REST API / SDK — not a UI framework. It has no components.

| Intent | API / Resource | Doc Path |
|:---|:---|:---|
| Getting started / setup | Application setup | `connect/getting-started/application-setup` |
| Overview of Connect | Getting started overview | `connect/getting-started/overview` |
| Test endpoints without code | Postman collection | `connect/getting-started/postman-collection` |
| List user calendars | Calendars API | `connect/api/calendars` |
| Read / create / update / delete events | Events API | `connect/api/events` |
| OAuth authorization flow | OAuth API | `connect/api/oauth` |
| API overview, authentication, response format | API overview | `connect/api/overview` |
| Real-time change notifications | Webhooks API | `connect/api/webhooks` |
| Permission levels (free-busy, read, read-write) | Scopes & Permissions | `connect/scopes` |
| Node.js integration | Node.js SDK | `connect/integration/node-sdk` |
| Direct HTTP integration | REST API guide | `connect/integration/rest-api-integration` |

---

## 6. Constraints

1. **Connect only.** This context covers Mobiscroll Connect — a server-side REST API. Never generate UI component code (Eventcalendar, Datepicker, etc.) as part of a Connect answer.
2. **No invented APIs.** Every endpoint, parameter, response field, and method must come from the docs. If not found, say so — do not guess.
3. **Docs are source of truth.** After fetching docs, answer **only** from the fetched content. Do not supplement with prior training knowledge. If the fetched docs contradict training knowledge, the docs win. If the docs do not cover the question, say: "This is not covered in the current documentation."
4. **Fetch failure fallback.** If `llms-connect-full.txt` is unreachable, fall back to individual `.md` pages (Priority 2), then the TOC file (Priority 3). If all sources fail, state that docs are unavailable and ask the user to share relevant doc content.
5. **Version: current.** Do not invent endpoint paths or response shapes.
6. **Authentication:** Bearer token via OAuth 2.0 authorization code flow. Base API URL is environment-specific — always check the API overview doc.
7. **No UI types.** There are no `Mbsc`-prefixed types in Connect. Connect is a backend REST API — it has no TypeScript UI component types.
8. **No frontend framework bindings.** Connect has no JSX, no Angular templates, no Vue SFCs, no DOM manipulation.

---

## 7. Anti-Patterns

| WRONG | RIGHT |
|:---|:---|
| Importing from `@mobiscroll/react` or any UI framework package | Use `@mobiscroll/connect-sdk` for Node.js, or direct HTTP for other environments |
| Generating JSX or `<Eventcalendar />` as part of a Connect answer | Connect is server-side — no UI components. Ask user for their UI framework separately if needed. |
| Using `MbscModule`, `@Component`, or `<script setup>` in Connect context | Connect = Node.js / HTTP. No Angular, Vue, or React patterns. |
| Referring to Eventcalendar `view` options, `data` prop, or CSS imports | Those are UI concerns — load the UI framework docs if needed. |
| Inventing endpoint paths like `/api/sync` that aren't in the docs | Look up exact endpoint in `connect/api/` docs |
| Answering Connect questions from UI framework docs | Always fetch `llms-connect-full.txt` for Connect questions |
| Mixing Connect REST calls with Eventcalendar configuration in one code block | Keep Connect (backend) and Eventcalendar (frontend) in separate, clearly labelled blocks |
| Answering from training knowledge when docs are fetched | Answer only from fetched docs. If not covered, say so. |
