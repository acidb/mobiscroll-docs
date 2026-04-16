---
sidebar_position: 3
sidebar_label: AI Integration
title: AI Integration
---

import { useState, useEffect } from 'react';
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

export const FileBlock = ({src}) => {
  const {siteConfig} = useDocusaurusContext();
  const base = useDocsBase().replace(/\/$/, '');
  const fetchPath = siteConfig.baseUrl.replace(/\/?$/, '') + '/' + src;
  const [content, setContent] = useState('Loading...');
  useEffect(() => {
    fetch(fetchPath)
      .then(r => r.text())
      .then(text => setContent(text.replace(/\{\{DOCS_BASE_URL\}\}/g, base)))
      .catch(() => setContent('Failed to load file.'));
  }, [src, base, fetchPath]);
  return <pre style={{overflow: 'auto', maxHeight: '600px', background: 'var(--ifm-code-background)', padding: '1rem', borderRadius: 'var(--ifm-code-border-radius)', fontSize: '0.85em'}}><code>{content}</code></pre>;
};

# AI Integration

Mobiscroll provides a set of machine-readable documentation files and AI behavior rules that enable coding assistants to generate accurate Connect API code. These files prevent common AI issues like hallucinated endpoints, mixing Connect API calls with UI component code, and outdated authentication patterns.

## Why AI integration?

AI coding assistants work best when they have access to structured, authoritative documentation. Without it, they often:

- **Hallucinate APIs** — invent endpoint paths, request parameters, or response shapes that don't exist
- **Mix UI with backend** — generate JSX component code when asked about the Connect REST API, or vice versa
- **Reference outdated versions** — generate API calls that no longer match the current Connect schema
- **Ignore authentication requirements** — skip OAuth flows or use incorrect scopes for calendar access

The Mobiscroll AI integration solves these problems by providing Connect-specific documentation optimized for AI consumption, combined with behavior rules that enforce domain isolation and prevent the AI from conflating the Connect API with Mobiscroll's UI components.

## Architecture overview

The integration consists of three layers:

### Data layer — llms files

Machine-readable documentation files containing the complete Mobiscroll Connect API reference and guides. These are the source of truth that AI tools read to answer questions.

| File | Description |
|:---|:---|
| `llms-connect-full.txt` | Complete Mobiscroll Connect documentation |
| `llms-connect.txt` | Connect table of contents (links to individual pages) |

### Rules layer — .mdc files

Behavior rule files that tell AI assistants which package to use, which APIs are available, and what to avoid.

| File | Domain |
|:---|:---|
| `mobiscroll-connect.mdc` | Mobiscroll Connect (backend / API) |

### Routing layer — CLAUDE.md

A context file specifically for Claude Code that provides domain detection signals, deterministic routing rules, API intent mapping, and anti-pattern examples. It ensures Claude selects the Connect documentation and never conflates Connect API calls with UI component code.

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

Open **Cursor Settings → Indexing & Docs** and add the documentation source for Connect:

| Framework | Name | URL |
|:---|:---|:---|
| Connect | Mobiscroll Connect | <DocsUrl path="llms-connect-full.txt" /> |

Only register the source matching your use case. Do not register multiple sources — this prevents cross-domain contamination.

### Step 2: Add the rules file

Download the <DocsLink path="mobiscroll-connect.mdc" download><code>mobiscroll-connect.mdc</code></DocsLink> file and place it in your project's `.cursor/rules/` directory:

```
your-project/
├── .cursor/
│   └── rules/
│       └── mobiscroll-connect.mdc
├── src/
├── package.json
└── ...
```

### Step 3: Use @docs in queries

When asking Cursor about Mobiscroll Connect, include `@docs` to ensure it reads the registered documentation:

```
@docs How do I authenticate a user with the Mobiscroll Connect OAuth flow?
```

```
@docs How do I list all calendars for a connected Google account?
```

## GitHub Copilot setup

### Step 1: Add the rules file

Download the <DocsLink path="mobiscroll-connect.mdc" download><code>mobiscroll-connect.mdc</code></DocsLink> file and place it at the root of your project or alternatively copy it's content to the rules files under the `.github/` directory:

```
your-project/
├── mobiscroll-connect.mdc
├── .github/
|   ├── copilot-instructions.md       <-- Global repo rules
|   └── instructions/
|       └── connect-logic.instructions.md <-- Specific rules
├── src/
├── package.json
└── ...
```

The `.mdc` file will automatically influence Copilot responses when you work on files in that project. It tells Copilot which APIs are available and how to use them correctly.

### How it works

The `.mdc` file contains:

- **Documentation URLs** — points Copilot to the correct Connect docs
- **Component mapping** — maps user intents to the correct Mobiscroll Connect APIs
- **Rules** — enforces correct API usage, authentication flows, and webhook handling
- **Constraints** — prevents conflation of Connect REST endpoints with UI component APIs

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

- **Domain detection** — Claude detects Connect usage from `package.json`, import patterns, and API call signatures
- **Routing rules** — deterministic IF/THEN rules that select `llms-connect-full.txt` and never route to UI framework docs
- **API mapping** — translates user intents to the correct Connect REST endpoints and OAuth flows
- **Anti-patterns** — explicit WRONG → RIGHT examples that prevent mixing Connect API calls with UI component code

Claude Code will fetch `llms-connect-full.txt` automatically based on the detected domain. No manual registration is needed.

## Domain isolation

:::warning Critical
Mobiscroll Connect is a backend integration layer — OAuth 2.0, REST API, webhooks, backend calendar sync. It has **no UI components**. Never mix Connect docs with UI framework docs.
:::

**Why this matters:**

- Connect uses `mobiscroll-connect.mdc` and `llms-connect-full.txt` — never the UI framework files
- Mixing Connect docs with UI docs causes the AI to conflate REST endpoints with component APIs
- Connect has no JSX, no frontend framework bindings, no CSS

**Rules:**

1. Add only **one** `.mdc` file per project — the one matching your framework or domain
2. Register only **one** documentation source in Cursor
3. If your project uses both a UI framework and Mobiscroll Connect, use separate AI context directories for each
4. If an AI assistant generates UI component code when you asked about Connect, check that `mobiscroll-connect.mdc` is active

## Example queries

These examples show the kind of questions the AI integration is designed to handle correctly.

```
How do I authenticate a user with the Mobiscroll Connect OAuth flow?
How do I list all calendars for a connected Google account?
How do I create an event in an Outlook calendar via the Connect API?
How do I subscribe to webhook notifications for calendar changes?
What scopes are required for read-write calendar access?
```

## Troubleshooting

### AI generates UI component code instead of Connect API calls

**Symptom:** You asked about backend calendar sync or OAuth but the AI generates JSX components like `<Eventcalendar />` instead of Connect REST API calls.

**Fix:** Verify that `mobiscroll-connect.mdc` is in place and that the registered @docs source in Cursor points to `llms-connect-full.txt` — not a UI framework file. Connect and Eventcalendar are entirely separate products.

### AI invents non-existent endpoints or parameters

**Symptom:** The AI suggests REST endpoints, request parameters, or response fields that don't exist in the Connect API.

**Fix:** The `.mdc` rules instruct the AI to only use APIs found in the Connect docs. If this still happens, explicitly reference `@docs` in Cursor queries, or verify that `CLAUDE.md` is in the project root for Claude Code. You can also ask the AI to confirm an endpoint exists in the Mobiscroll Connect docs.

### AI mixes Mobiscroll Connect with UI components

**Symptom:** The AI generates REST API calls when you asked about a frontend calendar component, or generates JSX/component code when you asked about the Connect API.

**Fix:** Mobiscroll Connect is a backend integration layer (OAuth, REST, webhooks) and has no UI components. Eventcalendar is a frontend UI component with no REST API. They use entirely separate `.mdc` files and documentation sources. Verify that the correct `.mdc` file is active for your project. If you use both in the same codebase, keep separate AI context directories for each.

## File reference

All AI integration files are available at the following URLs:

### Documentation files

| File | URL |
|:---|:---|
| Connect | <DocsUrl path="llms-connect.txt" /> |
| Connect (full) | <DocsUrl path="llms-connect-full.txt" /> |

### Rules files

| File | URL |
|:---|:---|
| Connect rules | <DocsUrl path="mobiscroll-connect.mdc" /> |

### Routing file

| File | URL |
|:---|:---|
| Claude Code context | <DocsUrl path="CLAUDE.md" /> |

## File contents

The complete contents of each file are shown below. You can copy directly from these blocks or use the download links above.

### CLAUDE.md

<details>
<summary>View <code>CLAUDE.md</code></summary>
<FileBlock src="CLAUDE.md" />
</details>

### Rules files (.mdc)

<details>
<summary>View <code>mobiscroll-connect.mdc</code></summary>
<FileBlock src="mobiscroll-connect.mdc" />
</details>
