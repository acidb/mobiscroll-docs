---
sidebar_position: 2
sidebar_label: AI Integration
displayed_sidebar: homeSidebar
title: AI Integration
slug: /ai-integration
description: Set up AI-powered coding assistants (Cursor, GitHub Copilot, Claude Code) with Mobiscroll documentation for accurate, framework-specific code generation.
---

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const useDocsBase = () => {
  const {siteConfig} = useDocusaurusContext();
  return siteConfig.url + siteConfig.baseUrl.replace(/\/?$/, '/');
};

export const DocsUrl = ({path}) => {
  const base = useDocsBase();
  return <code>{base + path}</code>;
};

export const DocsLink = ({path, children, download: dl}) => {
  const base = useDocsBase();
  const url = base + path;
  return dl
    ? <a href={url} download={path.split('/').pop()}>{children || <code>{path}</code>}</a>
    : <a href={url}>{children || <code>{path}</code>}</a>;
};

# AI Integration

Mobiscroll provides a set of machine-readable documentation files and AI behavior rules that enable coding assistants to generate accurate, framework-specific code. These files prevent common AI issues like hallucinated APIs, mixed framework imports, and outdated patterns.

## Why AI integration?

AI coding assistants work best when they have access to structured, authoritative documentation. Without it, they often:

- **Hallucinate APIs** — invent option names, events, or types that don't exist
- **Mix frameworks** — use React hooks in Angular code, or jQuery patterns in Vue
- **Reference outdated versions** — generate v5 code when the current version is v6
- **Ignore framework conventions** — skip `MbscModule` imports in Angular, or use wrong CSS loading patterns

The Mobiscroll AI integration solves these problems by providing documentation optimized for AI consumption, combined with behavior rules that enforce framework isolation and correct API usage.

## Architecture overview

The integration consists of three layers:

### Data layer — llms files

Machine-readable documentation files containing the complete Mobiscroll API reference and guides, one per framework. These are the source of truth that AI tools read to answer questions.

| File | Description |
|:---|:---|
| `llms-react-full.txt` | Complete React documentation |
| `llms-angular-full.txt` | Complete Angular documentation |
| `llms-vue-full.txt` | Complete Vue documentation |
| `llms-javascript-full.txt` | Complete JavaScript documentation |
| `llms-jquery-full.txt` | Complete jQuery documentation |
| `llms-react.txt` | React table of contents (links to individual pages) |
| `llms-angular.txt` | Angular table of contents |
| `llms-vue.txt` | Vue table of contents |
| `llms-javascript.txt` | JavaScript table of contents |
| `llms-jquery.txt` | jQuery table of contents |
| `llms.txt` | Hub file — links to all framework docs |
| `llms-full.txt` | All frameworks combined in one file |
| `llms-connect-full.txt` | Complete Mobiscroll Connect documentation |
| `llms-connect.txt` | Connect table of contents (links to individual pages) |

### Rules layer — .mdc files

Per-framework behavior rule files that tell AI assistants which package to use, how to import CSS, which APIs are available, and what to avoid. Each `.mdc` file targets exactly one framework.

| File | Framework |
|:---|:---|
| `mobiscroll-react.mdc` | React |
| `mobiscroll-angular.mdc` | Angular |
| `mobiscroll-vue.mdc` | Vue |
| `mobiscroll-javascript.mdc` | JavaScript |
| `mobiscroll-jquery.mdc` | jQuery |
| `mobiscroll-connect.mdc` | Mobiscroll Connect (backend / API) |

### Routing layer — CLAUDE.md

A context file specifically for Claude Code that provides framework detection signals, deterministic routing rules, component mapping, and anti-pattern examples. It ensures Claude selects the correct framework documentation and never mixes APIs across frameworks.

## Which tool uses which files?

| AI Tool | Documentation Source | Behavior Rules | Routing |
|:---|:---|:---|:---|
| **Cursor** (UI frameworks) | `llms-{framework}-full.txt` via @docs | `.mdc` file | — |
| **Cursor** (Connect) | `llms-connect-full.txt` via @docs | `mobiscroll-connect.mdc` | — |
| **GitHub Copilot** | `.mdc` file (contains doc URLs) | `.mdc` file | — |
| **Claude Code** | `llms-{framework}-full.txt` or `llms-connect-full.txt` | `CLAUDE.md` | `CLAUDE.md` |

:::note
Mobiscroll Connect is a backend integration layer (OAuth, REST API, webhooks). It uses its own data source and `.mdc` file, completely separate from UI framework docs.
:::

## Cursor setup

### Step 1: Register documentation sources

Open **Cursor Settings → Features → Docs** and add the documentation source for your framework:

| Framework | Name | URL |
|:---|:---|:---|
| React | Mobiscroll React | <DocsUrl path="llms-react-full.txt" /> |
| Angular | Mobiscroll Angular | <DocsUrl path="llms-angular-full.txt" /> |
| Vue | Mobiscroll Vue | <DocsUrl path="llms-vue-full.txt" /> |
| JavaScript | Mobiscroll JavaScript | <DocsUrl path="llms-javascript-full.txt" /> |
| jQuery | Mobiscroll jQuery | <DocsUrl path="llms-jquery-full.txt" /> |
| Connect | Mobiscroll Connect | <DocsUrl path="llms-connect-full.txt" /> |

Only register the source matching your use case. Do not register multiple sources — this prevents cross-domain contamination.

### Step 2: Add the rules file

Download the `.mdc` file for your framework and place it in your project's `.cursor/rules/` directory:

- React: <DocsLink path="mobiscroll-react.mdc"><code>mobiscroll-react.mdc</code></DocsLink>
- Angular: <DocsLink path="mobiscroll-angular.mdc"><code>mobiscroll-angular.mdc</code></DocsLink>
- Vue: <DocsLink path="mobiscroll-vue.mdc"><code>mobiscroll-vue.mdc</code></DocsLink>
- JavaScript: <DocsLink path="mobiscroll-javascript.mdc"><code>mobiscroll-javascript.mdc</code></DocsLink>
- jQuery: <DocsLink path="mobiscroll-jquery.mdc"><code>mobiscroll-jquery.mdc</code></DocsLink>
- Connect: <DocsLink path="mobiscroll-connect.mdc"><code>mobiscroll-connect.mdc</code></DocsLink>

```
your-project/
├── .cursor/
│   └── rules/
│       └── mobiscroll-react.mdc
├── src/
├── package.json
└── ...
```

### Step 3: Use @docs in queries

When asking Cursor about Mobiscroll, include `@docs` to ensure it reads the registered documentation:

```
@docs How do I set up a weekly scheduler with Mobiscroll?
```

```
@docs What options does the Eventcalendar timeline view accept?
```

## GitHub Copilot setup

### Step 1: Add the rules file

Download the `.mdc` file for your framework and place it in your project's `.github/copilot/` directory:

- React: <DocsLink path="mobiscroll-react.mdc"><code>mobiscroll-react.mdc</code></DocsLink>
- Angular: <DocsLink path="mobiscroll-angular.mdc"><code>mobiscroll-angular.mdc</code></DocsLink>
- Vue: <DocsLink path="mobiscroll-vue.mdc"><code>mobiscroll-vue.mdc</code></DocsLink>
- JavaScript: <DocsLink path="mobiscroll-javascript.mdc"><code>mobiscroll-javascript.mdc</code></DocsLink>
- jQuery: <DocsLink path="mobiscroll-jquery.mdc"><code>mobiscroll-jquery.mdc</code></DocsLink>
- Connect: <DocsLink path="mobiscroll-connect.mdc"><code>mobiscroll-connect.mdc</code></DocsLink>

```
your-project/
├── .github/
│   └── copilot/
│       └── mobiscroll-react.mdc
├── src/
├── package.json
└── ...
```

The `.mdc` file will automatically influence Copilot responses when you work on files in that project. It tells Copilot which package to use, how to import CSS, and which APIs are available.

### How it works

The `.mdc` file contains:

- **Documentation URLs** — points Copilot to the correct framework docs
- **Component mapping** — maps user intents (e.g., "scheduler") to the correct Mobiscroll APIs
- **Rules** — enforces correct package imports, CSS loading, and API usage
- **Constraints** — prevents cross-framework mixing and API hallucination

## Claude Code setup

### Step 1: Add CLAUDE.md

Download <DocsLink path="CLAUDE.md" download><code>CLAUDE.md</code></DocsLink> and place it in your project root:

```
your-project/
├── CLAUDE.md
├── src/
├── package.json
└── ...
```

### How it works

When Claude Code opens your project, it automatically reads `CLAUDE.md` from the project root. The file provides:

- **Framework detection** — Claude detects your framework from `package.json`, file extensions, and import patterns
- **Routing rules** — deterministic IF/THEN rules that select the correct documentation source
- **Component mapping** — translates user intents like "scheduler" or "timeline" to the correct Eventcalendar view configuration
- **Anti-patterns** — explicit WRONG → RIGHT examples that prevent common mistakes

Claude Code will fetch the correct `llms-{framework}-full.txt` file automatically based on the detected framework. No manual registration is needed.

## Framework isolation

:::warning Critical
Each `.mdc` file and documentation source targets exactly **one** framework or domain. Never combine files from different frameworks, or mix UI framework files with Connect files.
:::

**Why this matters:**

- `@mobiscroll/react` and `@mobiscroll/angular` have completely different APIs
- React uses JSX components (`<Eventcalendar />`), Angular uses template elements (`<mbsc-eventcalendar>`)
- CSS loading differs: React/Vue/JavaScript/jQuery use JS imports, Angular uses `angular.json` styles array
- Mixing frameworks causes broken code that is difficult to debug

**Mobiscroll Connect is a separate domain:**

- Connect is a backend integration layer — OAuth 2.0, REST API, webhooks, calendar sync
- It has no UI components, no JSX, no frontend framework bindings
- Connect uses `mobiscroll-connect.mdc` and `llms-connect-full.txt` — never the UI framework files
- Mixing Connect docs with UI docs causes the AI to conflate REST endpoints with component APIs

**Rules:**

1. Add only **one** `.mdc` file per project — the one matching your framework or domain
2. Register only **one** documentation source in Cursor
3. If your project uses multiple frameworks (e.g., micro-frontends), set up separate directories with separate `.mdc` files
4. If your project uses both a UI framework and Mobiscroll Connect, use separate AI context directories for each
5. If an AI assistant generates code with wrong framework imports, check that the correct `.mdc` file is in place

## Example queries

These examples show the kind of questions the AI integration is designed to handle correctly.

### React

```
How do I create an Eventcalendar with a weekly scheduler view?
Add drag and drop support to my Mobiscroll timeline.
What is the type for calendar events in Mobiscroll React?
```

### Angular

```
How do I import MbscModule into my standalone component?
Set up a monthly calendar view with mbsc-eventcalendar.
Where do I add the Mobiscroll CSS in angular.json?
```

### Vue

```
How do I use MbscEventcalendar in a script setup component?
Create a timeline view with resource grouping.
What props does the Datepicker component accept?
```

### JavaScript

```
How do I initialize a Mobiscroll eventcalendar on a DOM element?
Set up an agenda view with mobiscroll.eventcalendar().
How do I load events from a remote URL?
```

### jQuery

```
How do I create an eventcalendar with the jQuery plugin pattern?
Set up recurring events with $('#calendar').mobiscroll().eventcalendar().
What options are available for the scheduler view?
```

### Mobiscroll Connect

```
How do I authenticate a user with the Mobiscroll Connect OAuth flow?
How do I list all calendars for a connected Google account?
How do I create an event in an Outlook calendar via the Connect API?
How do I subscribe to webhook notifications for calendar changes?
What scopes are required for read-write calendar access?
```

## Troubleshooting

### AI generates code with the wrong framework

**Symptom:** You are using Angular but the AI generates React code with `import { Eventcalendar } from '@mobiscroll/react'`.

**Fix:** Verify that you have the correct `.mdc` file in place. For Angular, use `mobiscroll-angular.mdc`, not `mobiscroll-react.mdc`. In Cursor, check that the registered @docs source points to `llms-angular-full.txt`.

### AI invents non-existent APIs

**Symptom:** The AI suggests options, events, or types that don't exist in the Mobiscroll documentation.

**Fix:** The `.mdc` rules instruct the AI to only use APIs found in the docs. If this still happens, explicitly reference `@docs` in Cursor queries, or verify that `CLAUDE.md` is in the project root for Claude Code. You can also ask the AI to verify an option exists in the Mobiscroll docs.

### AI mixes Mobiscroll Connect with UI components

**Symptom:** The AI generates REST API calls when you asked about a frontend calendar component, or generates JSX/component code when you asked about the Connect API.

**Fix:** Mobiscroll Connect is a backend integration layer (OAuth, REST, webhooks) and has no UI components. Eventcalendar is a frontend UI component with no REST API. They use entirely separate `.mdc` files and documentation sources. Verify that the correct `.mdc` file is active for your project. If you use both in the same codebase, keep separate AI context directories for each.

## File reference

All AI integration files are available at the following URLs:

### Documentation files

| File | URL |
|:---|:---|
| Hub (overview) | <DocsUrl path="llms.txt" /> |
| React | <DocsUrl path="llms-react.txt" /> |
| Angular | <DocsUrl path="llms-angular.txt" /> |
| Vue | <DocsUrl path="llms-vue.txt" /> |
| JavaScript | <DocsUrl path="llms-javascript.txt" /> |
| jQuery | <DocsUrl path="llms-jquery.txt" /> |
| Hub (overview) | <DocsUrl path="llms-full.txt" /> |
| React (full) | <DocsUrl path="llms-react-full.txt" /> |
| Angular (full) | <DocsUrl path="llms-angular-full.txt" /> |
| Vue (full) | <DocsUrl path="llms-vue-full.txt" /> |
| JavaScript (full) | <DocsUrl path="llms-javascript-full.txt" /> |
| jQuery (full) | <DocsUrl path="llms-jquery-full.txt" /> |
| Connect | <DocsUrl path="llms-connect.txt" /> |
| Connect (full) | <DocsUrl path="llms-connect-full.txt" /> |

### Rules files

| File | URL |
|:---|:---|
| React rules | <DocsUrl path="mobiscroll-react.mdc" /> |
| Angular rules | <DocsUrl path="mobiscroll-angular.mdc" /> |
| Vue rules | <DocsUrl path="mobiscroll-vue.mdc" /> |
| JavaScript rules | <DocsUrl path="mobiscroll-javascript.mdc" /> |
| jQuery rules | <DocsUrl path="mobiscroll-jquery.mdc" /> |
| Connect rules | <DocsUrl path="mobiscroll-connect.mdc" /> |

### Routing file

| File | URL |
|:---|:---|
| Claude Code context | <DocsUrl path="CLAUDE.md" /> |
