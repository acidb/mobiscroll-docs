---
sidebar_position: 4
sidebar_label: AI Integration
title: AI Integration
description: 'Set up AI coding assistants — Claude Code, Cursor, and GitHub Copilot — with Mobiscroll Connect docs, behavior rules, and the live Connect MCP server to generate accurate Connect API calls, SDK code, OAuth flows, and webhook integrations.'
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

export const useMcpBase = () => 'https://mcp-connect.mobiscroll.com/';

export const McpUrl = () => {
  const base = useMcpBase();
  return <code>{base}</code>;
};

export const McpConfigBlock = ({tool}) => {
  const url = useMcpBase();
  const configs = {
    claude: { mcpServers: { 'mobiscroll-connect': { type: 'http', url } } },
    cursor: { mcpServers: { 'mobiscroll-connect': { url } } },
    vscode: { servers:    { 'mobiscroll-connect': { type: 'http', url } } },
  };
  const json = JSON.stringify(configs[tool], null, 2);
  return (
    <pre style={{overflow: 'auto', background: 'var(--ifm-code-background)', padding: '1rem', borderRadius: 'var(--ifm-code-border-radius)', fontSize: '0.85em'}}>
      <code>{json}</code>
    </pre>
  );
};

export const McpCliBlock = ({scope}) => {
  const url = useMcpBase();
  const scopeFlag = scope ? ` --scope ${scope}` : '';
  const cmd = `claude mcp add --transport http${scopeFlag} mobiscroll-connect ${url}`;
  return (
    <pre style={{overflow: 'auto', background: 'var(--ifm-code-background)', padding: '1rem', borderRadius: 'var(--ifm-code-border-radius)', fontSize: '0.85em'}}>
      <code>{cmd}</code>
    </pre>
  );
};

# AI Integration

Mobiscroll provides a set of machine-readable documentation files, AI behavior rules, and a live **MCP server** that enable coding assistants to generate accurate Connect API code. These prevent common AI issues like hallucinated endpoints, mixing Connect API calls with UI component code, and outdated authentication patterns.

## Why AI integration?

AI coding assistants work best when they have access to structured, authoritative documentation. Without it, they often:

- **Hallucinate APIs** — invent endpoint paths, request parameters, response shapes, or SDK method signatures that don't exist
- **Mix UI with backend** — generate JSX component code when asked about the Connect REST API, or vice versa
- **Reference outdated versions** — generate API calls or SDK code that no longer match the current Connect schema
- **Ignore authentication requirements** — skip OAuth flows or use incorrect scopes for calendar access

The Mobiscroll AI integration solves these problems by providing Connect-specific documentation optimized for AI consumption, combined with behavior rules that enforce domain isolation, and an optional MCP server that serves live, version-stamped endpoint and SDK schemas on demand.

## Two approaches

- **Option A** — file-based context. Behavior rules (`mobiscroll-connect.mdc` for Cursor/Copilot, `CLAUDE.md` for Claude Code) point the AI at the Connect documentation. No MCP server required.
- **Option B** — live schema fetching via the Connect MCP server. The AI calls the Mobiscroll Connect MCP server for live endpoint and SDK lookups on each generation — so it always uses the current REST API and SDK signatures instead of guessing from memory. Suited for interactive coding agents that need per-query precision.

Choose based on your preference and setup. Option B requires the MCP server to be configured (steps below).

## Architecture overview

The integration consists of four layers:

### Data layer — llms files

Machine-readable documentation files containing the complete Mobiscroll Connect API reference and guides. These are the source of truth that AI tools read to answer questions.

| File | Description |
|:---|:---|
| `llms-connect-full.txt` | Complete Mobiscroll Connect documentation |
| `llms-connect.txt` | Connect table of contents (links to individual pages) |
| `llms-icons.txt` | Icon names (IcoMoon, Font Awesome, Ionicons) — all frameworks |

:::info
You don't need to download or host these files — the rules and routing layers reference them directly and fetch their content automatically.
:::

### Rules layer — .mdc files

Behavior rule files that tell AI assistants which package to use, which APIs are available, and what to avoid.

| File | Domain |
|:---|:---|
| <DocsLink path="mobiscroll-connect.mdc" download /> | Mobiscroll Connect (backend / API) |

### Routing layer — CLAUDE.md

A context file specifically for Claude Code that provides domain detection signals, deterministic routing rules, API intent mapping, and anti-pattern examples. It ensures Claude selects the Connect documentation and never conflates Connect API calls with UI component code.

### Live schema layer — MCP server

The **Mobiscroll Connect MCP server** serves structured, version-stamped Connect knowledge over the Model Context Protocol, generated directly from the Connect REST source and the 7-language SDK suite. Instead of relying on documentation snapshots, an assistant can call the server's tools to fetch the exact endpoint schema, SDK operation signature, or cross-language equivalent it needs at generation time.

It is a **hosted HTTP server** at <McpUrl /> — no local install required.

| Tool | What it does |
|:---|:---|
| `resolveConnectEnvironment` | Detects which Connect SDK (language + version) a project uses from its dependency manifest, and echoes the served versions. Call first. |
| `listEndpoints` | Lists all Connect REST endpoints (method, path, summary, auth). |
| `getEndpointSchema` | Full endpoint schema — query/body params with types, auth, responses, status codes, and examples. |
| `listSdkOperations` | Lists a language's resources (`auth` / `calendars` / `events`) and their operations. |
| `getSdkOperation` | Full signature, doc, params, return type, and example of one SDK operation in one language. |
| `searchConnect` | Keyword search across REST endpoints and SDK operations in all languages at once. |
| `mapEndpointToSdk` | Given a REST endpoint, returns the equivalent SDK call in each language — built on the SDKs' shared surface. |
| `getErrorTaxonomy` | The shared error categories and the idiomatic exception type for each language. |

## Which tool uses which files?

| AI Tool | Documentation Source | Behavior Rules | Routing | Live lookups (MCP) |
|:---|:---|:---|:---|:---|
| **Cursor** | `llms-connect-full.txt` via @docs | `mobiscroll-connect.mdc` | — | `mobiscroll-connect` server (Option B) |
| **GitHub Copilot** | `.mdc` file (contains doc URLs) | `.mdc` file | — | `mobiscroll-connect` server (Option B) |
| **Claude Code** | `llms-connect-full.txt` | `CLAUDE.md` | `CLAUDE.md` | `mobiscroll-connect` server (manual config) |

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

### Step 3: Configure the MCP server (Optional)

For live endpoint and SDK lookups (Option B), configure the Mobiscroll Connect MCP server so Cursor can call it during generation.

Create or edit `.cursor/mcp.json` in your project root:

<McpConfigBlock tool="cursor" />

:::warning No `type` field
Cursor infers the transport type from the URL. Do **not** add `"type": "http"` to Cursor's config — it causes an error.
:::

```
your-project/
├── .cursor/
│   ├── mcp.json
│   └── rules/
│       └── mobiscroll-connect.mdc
├── src/
└── package.json
```

| Scope | Config file | Shared with team |
|:---|:---|:---|
| project | `.cursor/mcp.json` in project root | Yes, if committed |
| global | `~/.cursor/mcp.json` | No, all your projects |

**Verify the connection:** Open the **Output** panel in Cursor and select **MCP Logs** from the dropdown. A successful connection logs tool discovery messages for the `mobiscroll-connect` server.

### Step 4: Use @docs in queries

When asking Cursor about Mobiscroll Connect, include `@docs` to ensure it reads the registered documentation:

```
@docs How do I authenticate a user with the Mobiscroll Connect OAuth flow?
```

```
@docs How do I list all calendars for a connected Google account?
```

## GitHub Copilot setup

### Step 1: Add the rules file

Download the <DocsLink path="mobiscroll-connect.mdc" download><code>mobiscroll-connect.mdc</code></DocsLink> file and place it at the root of your project or alternatively [copy it's content](#rules-files-mdc) to the rules files under the `.github/` directory:

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

### Step 2: Configure the MCP server (Optional)

For live endpoint and SDK lookups (Option B), configure the Mobiscroll Connect MCP server so VS Code can call it during generation.

Create or edit `.vscode/mcp.json` in your project root:

<McpConfigBlock tool="vscode" />

:::warning `"servers"` not `"mcpServers"`
VS Code uses `"servers"` as the root key — not `"mcpServers"` like Claude Code and Cursor. Using the wrong key silently breaks the config with no error message.
:::

```
your-project/
├── .vscode/
│   └── mcp.json
├── .github/
│   └── instructions/
│       └── connect-logic.instructions.md
├── src/
└── package.json
```

| Scope | Config file | Shared with team |
|:---|:---|:---|
| workspace | `.vscode/mcp.json` in project root | Yes, if committed |
| user profile | Opened via **MCP: Open User Configuration** | No, all your workspaces |

**Verify the connection:** Open the **Command Palette** and run **MCP: List Servers**. The `mobiscroll-connect` server should appear with a connected status. A trust dialog appears on first use — approve it to allow the server to start.

### How it works

The `.mdc` file contains:

- **Documentation URLs** — points Copilot to the correct Connect docs
- **Component mapping** — maps user intents to the correct Mobiscroll Connect APIs
- **Rules** — enforces correct API usage, authentication flows, and webhook handling
- **Constraints** — prevents conflation of Connect REST endpoints with UI component APIs

With the MCP server configured, Copilot can additionally call the Connect tools for live endpoint and SDK schema lookups instead of relying on the documentation snapshot alone.

## Claude Code setup

There is no dedicated Claude Code plugin for Connect. The `mobiscroll@mobiscroll` plugin covers the Mobiscroll **UI** library and bundles the UI MCP server only — it does not apply to Connect. Set Connect up with config files instead: a `CLAUDE.md` routing context (Option A) and/or the Connect MCP server (Option B).

### Step 1: Add CLAUDE.md (Option A)

If you don't already have a `CLAUDE.md` in your project root, download <DocsLink path="connect/CLAUDE.md" download><code>CLAUDE.md</code></DocsLink> and place it there. If you already have one, copy the contents into your existing file instead — see [File contents](#file-contents) below.

```
your-project/
├── CLAUDE.md
├── src/
├── package.json
└── ...
```

When Claude Code opens your project, it automatically reads `CLAUDE.md` from the project root. The file provides:

- **Domain detection** — Claude detects Connect usage from `package.json`, import patterns, and API call signatures
- **Routing rules** — deterministic IF/THEN rules that select `llms-connect-full.txt` and never route to UI framework docs
- **API mapping** — translates user intents to the correct Connect REST endpoints and OAuth flows
- **Anti-patterns** — explicit WRONG → RIGHT examples that prevent mixing Connect API calls with UI component code

### Step 2: Configure the MCP server (Option B, recommended)

For live endpoint and SDK lookups, add the Connect MCP server:

<McpCliBlock />

:::warning VS Code extension
If you are using the Claude Visual Studio Code extension, the server will not appear unless it is added with project scope. See the next command below.
:::

To share the server with your team automatically, use project scope:

<McpCliBlock scope="project" />

This creates or updates `.mcp.json` in your project root. You can also create that file manually:

<McpConfigBlock tool="claude" />

| Scope | CLI flag | Config location | Shared with team |
|:---|:---|:---|:---|
| local (default) | `--scope local` | `~/.claude.json` | No |
| project | `--scope project` | `.mcp.json` in project root | Yes, via version control |
| user | `--scope user` | `~/.claude.json` | No, all your projects |

:::info
Use `--scope project` for team repos so everyone gets the MCP server automatically when they clone the project.
:::

**Verify the connection:** Run `/mcp` inside Claude Code. The panel lists each connected server and its tool count. A healthy connection shows `mobiscroll-connect` with its tools.

### How it works

With `CLAUDE.md` in place and the MCP server configured, when you ask Claude Code to write Connect code it:

1. Detects your SDK language and version via `resolveConnectEnvironment`
2. Looks up the endpoint schema (`getEndpointSchema`) or SDK operation (`getSdkOperation`) before writing any call
3. Uses `mapEndpointToSdk` when translating a REST endpoint into SDK code, and `getErrorTaxonomy` when writing error handling

So Claude always uses the current Connect API and SDK signatures, never hallucinated or outdated ones.

## Domain isolation

:::warning Critical
Mobiscroll Connect is a backend integration layer — OAuth 2.0, REST API, webhooks, backend calendar sync. It has **no UI components**. Never mix Connect docs with UI framework docs.
:::

**Why this matters:**

- Connect uses `mobiscroll-connect.mdc`, `llms-connect-full.txt`, and the `mobiscroll-connect` MCP server — never the UI framework files or the UI `mobiscroll` MCP server
- Mixing Connect docs with UI docs causes the AI to conflate REST endpoints with component APIs
- Connect has no JSX, no frontend framework bindings, no CSS

**Rules:**

1. Add only **one** `.mdc` file per project — the one matching your framework or domain
2. Register only **one** documentation source in Cursor
3. Keep the MCP servers separate — the Connect server (`mobiscroll-connect`) serves REST/SDK schemas; the UI server (`mobiscroll`) serves component schemas. Configure only the one your task needs.
4. If your project uses both a UI framework and Mobiscroll Connect, use separate AI context directories for each
5. If an AI assistant generates UI component code when you asked about Connect, check that `mobiscroll-connect.mdc` is active

## Example queries

These examples show the kind of questions the AI integration is designed to handle correctly.

```
How do I authenticate a user with the Mobiscroll Connect OAuth flow?
How do I list all calendars for a connected Google account?
How do I create an event in an Outlook calendar via the Connect API?
What's the Python SDK call equivalent to POST /event?
How do I subscribe to webhook notifications for calendar changes?
What scopes are required for read-write calendar access?
```

## Troubleshooting

### AI generates UI component code instead of Connect API calls

**Symptom:** You asked about backend calendar sync or OAuth but the AI generates JSX components like `<Eventcalendar />` instead of Connect REST API calls.

**Fix:** Verify that `mobiscroll-connect.mdc` is in place and that the registered @docs source in Cursor points to `llms-connect-full.txt` — not a UI framework file. If you configured an MCP server, confirm it is the `mobiscroll-connect` server, not the UI `mobiscroll` server. Connect and Eventcalendar are entirely separate products.

### AI invents non-existent endpoints or parameters

**Symptom:** The AI suggests REST endpoints, request parameters, response fields, or SDK methods that don't exist in the Connect API.

**Fix:** The `.mdc` rules instruct the AI to only use APIs found in the Connect docs. If this still happens, explicitly reference `@docs` in Cursor queries, or verify that `CLAUDE.md` is in the project root for Claude Code. For the highest accuracy, enable the Connect MCP server (Option B) so the AI fetches live endpoint and SDK schemas instead of guessing. You can also ask the AI to confirm an endpoint exists in the Mobiscroll Connect docs.

### MCP server does not appear after setup

**Symptom:** The MCP server panel shows no `mobiscroll-connect` entry, or its tools are not available.

**Fix:** Check that the config file is in the correct location and uses the correct root key — `mcpServers` for Claude Code and Cursor, `servers` for VS Code. Validate that the file is well-formed JSON, and that the server name is `mobiscroll-connect`. For Claude Code, run `/mcp` to inspect connected servers; for the VS Code extension, add the server with project scope.

### AI mixes Mobiscroll Connect with UI components

**Symptom:** The AI generates REST API calls when you asked about a frontend calendar component, or generates JSX/component code when you asked about the Connect API.

**Fix:** Mobiscroll Connect is a backend integration layer (OAuth, REST, webhooks) and has no UI components. Eventcalendar is a frontend UI component with no REST API. They use entirely separate `.mdc` files, documentation sources, and MCP servers. Verify that the correct `.mdc` file is active for your project. If you use both in the same codebase, keep separate AI context directories for each.

## File reference

All AI integration files and endpoints are available at the following URLs:

### Documentation files

| File | URL |
|:---|:---|
| Connect | <DocsUrl path="llms-connect.txt" /> |
| Connect (full) | <DocsUrl path="llms-connect-full.txt" /> |

### Rules files

| File | URL |
|:---|:---|
| Connect rules | <DocsLink path="mobiscroll-connect.mdc" download /> |

### Routing file

| File | URL |
|:---|:---|
| Claude Code context | <DocsLink path="connect/CLAUDE.md" download /> |

### MCP server

| Server | URL |
|:---|:---|
| Mobiscroll Connect MCP | <McpUrl /> |

## File contents {#file-contents}

The complete contents of each file are shown below. You can copy directly from these blocks or use the download links above.

### CLAUDE.md

<details>
<summary>View <code>CLAUDE.md</code></summary>
<FileBlock src="connect/CLAUDE.md" />
</details>

### Rules files (.mdc) {#rules-files-mdc}

<details>
<summary>View <code>mobiscroll-connect.mdc</code></summary>
<FileBlock src="mobiscroll-connect.mdc" />
</details>
