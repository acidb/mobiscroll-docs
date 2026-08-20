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

export const useMcpBase = () => {
  const {siteConfig} = useDocusaurusContext();
  return siteConfig.url.replace('://', '://mcp.') + '/';
};

export const McpUrl = () => {
  const base = useMcpBase();
  return <code>{base}</code>;
};

export const McpConfigBlock = ({tool}) => {
  const url = useMcpBase();
  const configs = {
    claude: { mcpServers: { mobiscroll: { type: 'http', url } } },
    cursor: { mcpServers: { mobiscroll: { url } } },
    vscode: { servers:    { mobiscroll: { type: 'http', url } } },
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
  const cmd = `claude mcp add --transport http${scopeFlag} mobiscroll ${url}`;
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

### Rules layer — rules files

Rules files provide Mobiscroll Connect context to **Cursor** and **GitHub Copilot**. Claude Code uses the Mobiscroll plugin instead — see [Claude Code setup](#claude-code-setup).

Two approaches are available:

- **Option A** — file-based context loading. A single rules file (`.mdc` for Cursor, `.instructions.md` for Copilot) contains the Connect documentation URLs and behavior rules. No MCP server required.
- **Option B** — live schema fetching via MCP server. An extended rule file instructs the AI to call the Mobiscroll MCP server for live Connect endpoint and SDK schema lookups on each generation.

Connect uses a **single** rule file per option — there is no framework split, because Connect is one backend domain.

#### Files

**Option A — file-based rules:**

| File | Format | For |
|:---|:---|:---|
| {/* llms:docslink;path=mobiscroll-connect.mdc */}{/* /llms:docslink */}<DocsLink path="mobiscroll-connect.mdc" download /> | Cursor rule file | Cursor |
| {/* llms:docslink;path=copilot-instructions/mobiscroll-connect.instructions.md */}{/* /llms:docslink */}<DocsLink path="copilot-instructions/mobiscroll-connect.instructions.md" download /> | Copilot instruction file | GitHub Copilot |

**Option B — extended rule with MCP:**

| File | Format | For |
|:---|:---|:---|
| {/* llms:docslink;path=connect/SKILL.md;filename=mobiscroll-connect-skill.mdc */}<DocsLink path="connect/SKILL.md" download filename="mobiscroll-connect-skill.mdc">mobiscroll-connect-skill.mdc</DocsLink>{/* /llms:docslink */} | Cursor extended rule | Cursor |
| {/* llms:docslink;path=copilot-instructions/mobiscroll-connect-skill.instructions.md */}<DocsLink path="copilot-instructions/mobiscroll-connect-skill.instructions.md" download>mobiscroll-connect-skill.instructions.md</DocsLink>{/* /llms:docslink */} | Copilot extended instruction | GitHub Copilot |

### Routing layer — CLAUDE.md (manual Claude Code setup)

A context file for Claude Code users who set Connect up manually **without** the plugin. It provides domain detection signals, deterministic routing rules, API intent mapping, and anti-pattern examples so Claude selects the Connect documentation and never conflates Connect API calls with UI component code. With the plugin installed (recommended), this file is not needed.

### Live schema layer — MCP server

The **Mobiscroll MCP server** serves structured, version-stamped knowledge over the Model Context Protocol. It is a single, unified server: the same `mobiscroll` server that serves UI component schemas also exposes the Connect tools, generated directly from the Connect REST source and the 7-language SDK suite. The Connect tools are all prefixed `Connect` so they never collide with the UI component tools. Instead of relying on documentation snapshots, an assistant can call these tools to fetch the exact endpoint schema, SDK method signature, or cross-language equivalent it needs at generation time.

It is a **hosted HTTP server** at {/* llms:mcpurl */}<McpUrl /> — no local install required.

| Tool | What it does |
|:---|:---|
| `resolveConnectEnvironment` | Detects which Connect SDK (language + version) a project uses from its dependency manifest, and echoes the served versions. **Call this first.** |
| `listConnectEndpoints` | Lists every Connect REST endpoint with its method, path, summary, and authentication. |
| `getConnectEndpointSchema` | Returns one endpoint's full schema — query/body params with types, authentication, responses, status codes, and examples. |
| `listConnectSdkMethods` | Lists a language's resources (`auth` / `calendars` / `events`) and the methods on each. |
| `getConnectSdkMethod` | Returns one SDK method's full signature, doc, params, return type, and example, in the language you pick. |
| `searchConnect` | Searches REST endpoints and SDK methods across all languages by keyword, ranked by relevance. |
| `mapConnectEndpointToSdk` | Maps a REST endpoint to its equivalent SDK call in each language — built on the SDKs' shared surface. |
| `getConnectErrorTaxonomy` | Returns the shared error categories and the idiomatic exception type for each language. |

## Which tool uses which files?

| Tool | Approach | Files used |
|:---|:---|:---|
| **Cursor** | Option A | `mobiscroll-connect.mdc` |
| **Cursor** | Option B | `mobiscroll-connect-skill.mdc` |
| **GitHub Copilot** | Option A | `mobiscroll-connect.instructions.md` |
| **GitHub Copilot** | Option B | `mobiscroll-connect-skill.instructions.md` |
| **Claude Code** | Alternative | `CLAUDE.md` — manual routing, no plugin, no MCP |
| **Claude Code** | Plugin | `mobiscroll@mobiscroll` — bundles the `mobiscroll-connect` skill + MCP server |

## Cursor setup

### Step 1: Register documentation sources

Open **Cursor Settings → Indexing & Docs** and add the documentation source for Connect:

| Framework | Name | URL |
|:---|:---|:---|
| Connect | Mobiscroll Connect | {/* llms:docsurl;path=llms-connect-full.txt */}<DocsUrl path="llms-connect-full.txt" /> |

Only register the source matching your use case. Do not register multiple sources — this prevents cross-domain contamination.

### Step 2: Add behavior rules

Choose one approach — Option A works immediately with no additional setup; Option B adds live MCP schema lookups for higher accuracy but requires the MCP server to be configured.

#### Option A — .mdc rules file

Download the {/* llms:docslink;path=mobiscroll-connect.mdc */}<DocsLink path="mobiscroll-connect.mdc" download><code>mobiscroll-connect.mdc</code></DocsLink>{/* /llms:docslink */} file and place it in `.cursor/rules/`:

```
your-project/
├── .cursor/
│   └── rules/
│       └── mobiscroll-connect.mdc
├── src/
└── package.json
```

The `.mdc` file provides text-based API rules — no additional setup required.

#### Option B — Extended rule file + MCP

Download the {/* llms:docslink;path=connect/SKILL.md;filename=mobiscroll-connect-skill.mdc */}<DocsLink path="connect/SKILL.md" download filename="mobiscroll-connect-skill.mdc">mobiscroll-connect-skill.mdc</DocsLink>{/* /llms:docslink */} file and place it in `.cursor/rules/`:

```
your-project/
├── .cursor/
│   └── rules/
│       └── mobiscroll-connect-skill.mdc
├── src/
└── package.json
```

Unlike Option A, this rule file instructs Cursor's AI to call the Mobiscroll MCP server for live Connect endpoint and SDK schema lookups on each generation — so it always uses the current API instead of guessing from memory.

#### Rule activation

The extended `.mdc` file uses `alwaysApply: false` with a `description` in its frontmatter. Cursor reads the description and activates the rule only when the context is relevant — the rule is not included in every message. You can also trigger it manually with `@mobiscroll-connect-skill`. The `.mdc` format works in all Cursor modes including Agent mode.

### Step 3: Configure the MCP server (Optional)

For live endpoint and SDK lookups, configure the Mobiscroll Connect MCP server so Cursor can call it during generation.

Create or edit `.cursor/mcp.json` in your project root:

{/* llms:mcpconfig;tool=cursor */}
<McpConfigBlock tool="cursor" />

:::warning No `type` field
Cursor infers the transport type from the URL. Do **not** add `"type": "http"` to Cursor's config — it causes an error.
:::

```
your-project/
├── .cursor/
│   ├── mcp.json
│   └── rules/
│       └── mobiscroll-connect-skill.mdc
├── src/
└── package.json
```

| Scope | Config file | Shared with team |
|:---|:---|:---|
| project | `.cursor/mcp.json` in project root | Yes, if committed |
| global | `~/.cursor/mcp.json` | No, all your projects |

**Verify the connection:** Open the **Output** panel in Cursor and select **MCP Logs** from the dropdown. A successful connection logs tool discovery messages for the `mobiscroll` server, including the `Connect`-prefixed tools.

### Step 4: Use @docs in queries

When asking Cursor about Mobiscroll Connect, include `@docs` to ensure it reads the registered documentation:

```
@docs How do I authenticate a user with the Mobiscroll Connect OAuth flow?
```

```
@docs How do I list all calendars for a connected Google account?
```

## GitHub Copilot setup

### Step 1: Add behavior rules

Choose one approach — Option A works immediately with no additional setup; Option B adds live MCP schema lookups for higher accuracy but requires the MCP server to be configured.

#### Option A — .instructions.md rules file

Download the {/* llms:docslink;path=copilot-instructions/mobiscroll-connect.instructions.md */}<DocsLink path="copilot-instructions/mobiscroll-connect.instructions.md" download><code>mobiscroll-connect.instructions.md</code></DocsLink>{/* /llms:docslink */} file and place it in `.github/instructions/`:

```
your-project/
├── .github/
|   └── instructions/
|       └── mobiscroll-connect.instructions.md
├── src/
└── package.json
```

The `.instructions.md` file provides text-based API rules — no additional setup required.

#### Option B — Extended instruction file + MCP

Download the {/* llms:docslink;path=copilot-instructions/mobiscroll-connect-skill.instructions.md */}<DocsLink path="copilot-instructions/mobiscroll-connect-skill.instructions.md" download><code>mobiscroll-connect-skill.instructions.md</code></DocsLink>{/* /llms:docslink */} file and place it in `.github/instructions/`:

```
your-project/
├── .github/
|   └── instructions/
|       └── mobiscroll-connect-skill.instructions.md
├── src/
└── package.json
```

Unlike Option A, this instruction file tells Copilot to call the Mobiscroll MCP server for live Connect endpoint and SDK schema lookups on each generation.

### Step 2: Configure the MCP server (Optional)

For live endpoint and SDK lookups, configure the Mobiscroll Connect MCP server so VS Code can call it during generation.

Create or edit `.vscode/mcp.json` in your project root:

{/* llms:mcpconfig;tool=vscode */}
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
│       └── mobiscroll-connect-skill.instructions.md
├── src/
└── package.json
```

| Scope | Config file | Shared with team |
|:---|:---|:---|
| workspace | `.vscode/mcp.json` in project root | Yes, if committed |
| user profile | Opened via **MCP: Open User Configuration** | No, all your workspaces |

**Verify the connection:** Open the **Command Palette** and run **MCP: List Servers**. The `mobiscroll` server should appear with a connected status, exposing the `Connect`-prefixed tools. A trust dialog appears on first use — approve it to allow the server to start.

### How it works

The instruction file contains:

- **Documentation URLs** — points Copilot to the correct Connect docs
- **API mapping** — maps user intents to the correct Mobiscroll Connect APIs
- **Rules** — enforces correct API usage, authentication flows, and webhook handling
- **Constraints** — prevents conflation of Connect REST endpoints with UI component APIs

With the MCP server configured (Option B), Copilot can additionally call the Connect tools for live endpoint and SDK schema lookups instead of relying on the documentation snapshot alone.

## Claude Code setup

Install the Mobiscroll plugin for Claude Code. The plugin bundles the `mobiscroll-connect` skill and the MCP server in a single install — no per-project configuration files needed.

### Step 1: Register the marketplace

Run this once in Claude Code to register the Mobiscroll plugin marketplace:

```
/plugin marketplace add acidb/mobiscroll-marketplace
```

### Step 2: Install the plugin

```
/plugin install mobiscroll@mobiscroll
```

:::info
The `mobiscroll-connect` skill ships inside the same `mobiscroll` plugin as the UI skills. It activates only for backend Connect work (OAuth, REST, SDK, webhooks) and never mixes with UI component code — so installing the full plugin is safe even if you only use Connect.
:::

:::warning Plugin skills don't auto-update
Installing the plugin takes a snapshot of its skills — Claude Code won't pull in newer ones on its own unless you enable auto-update for the marketplace. To get the latest at any time, run `/plugin marketplace update mobiscroll && /plugin update mobiscroll@mobiscroll`, then `/reload-plugins`.
:::

### Step 3: Configure the MCP server (Optional)

The plugin bundles the MCP server — no separate configuration is needed for most setups. To configure it manually or share it with your team:

{/* llms:mcpcli */}
<McpCliBlock />

:::warning VS Code extension
If you are using the Claude Visual Studio Code extension, the server will not appear unless it is added with project scope. See the next command below.
:::

To share the server with your team automatically, use project scope:

{/* llms:mcpcli;scope=project */}
<McpCliBlock scope="project" />

This creates or updates `.mcp.json` in your project root. You can also create that file manually:

{/* llms:mcpconfig;tool=claude */}
<McpConfigBlock tool="claude" />

| Scope | CLI flag | Config location | Shared with team |
|:---|:---|:---|:---|
| local (default) | `--scope local` | `~/.claude.json` | No |
| project | `--scope project` | `.mcp.json` in project root | Yes, via version control |
| user | `--scope user` | `~/.claude.json` | No, all your projects |

:::info
Use `--scope project` for team repos so everyone gets the MCP server automatically when they clone the project.
:::

**Verify the connection:** Run `/mcp` inside Claude Code. The panel lists each connected server and its tool count. A healthy connection shows `mobiscroll` with its tools, including the `Connect`-prefixed ones.

### How it works

Once installed, the plugin provides:

- **Skill** — `mobiscroll-connect` detects backend Connect work from your dependency manifest (`@mobiscroll/connect-sdk` and the other language SDKs) and from Connect REST/OAuth usage, then loads the Connect conventions. It stays isolated from the UI skills.
- **MCP server** — the bundled Mobiscroll MCP server provides live Connect endpoint and SDK schema lookup on demand.

When you ask Claude Code to write Connect code, it:

1. Detects your SDK language and version via `resolveConnectEnvironment`
2. Looks up the endpoint schema (`getConnectEndpointSchema`) or SDK method (`getConnectSdkMethod`) before writing any call
3. Uses `mapConnectEndpointToSdk` when translating a REST endpoint into SDK code, and `getConnectErrorTaxonomy` when writing error handling

So Claude always uses the current Connect API and SDK signatures, never hallucinated or outdated ones.

### Alternative: manual CLAUDE.md routing (no plugin)

If you prefer not to install the plugin, download {/* llms:docslink;path=connect/CLAUDE.md */}<DocsLink path="connect/CLAUDE.md" download><code>CLAUDE.md</code></DocsLink>{/* /llms:docslink */} and place it in your project root — or copy its contents into an existing `CLAUDE.md` (see [File contents](#file-contents) below). Claude Code reads it automatically when it opens your project.

```
your-project/
├── CLAUDE.md
├── src/
├── package.json
└── ...
```

The file provides:

- **Domain detection** — Claude detects Connect usage from `package.json`, import patterns, and API call signatures
- **Routing rules** — deterministic IF/THEN rules that select `llms-connect-full.txt` and never route to UI framework docs
- **API mapping** — translates user intents to the correct Connect REST endpoints and OAuth flows
- **Anti-patterns** — explicit WRONG → RIGHT examples that prevent mixing Connect API calls with UI component code

Pair it with the MCP server (Step 3) for live schema lookups.

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
3. The MCP server is unified — the single `mobiscroll` server serves both UI and Connect tools. Isolation happens at the tool level: the Connect tools are all prefixed `Connect` (`listConnectEndpoints`, `getConnectSdkMethod`, …), so they never collide with the UI component tools. The `.mdc` and `CLAUDE.md` rules keep the AI on the Connect tools for Connect work.
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

**Fix:** Verify that `mobiscroll-connect.mdc` is in place and that the registered @docs source in Cursor points to `llms-connect-full.txt` — not a UI framework file. The `mobiscroll` MCP server exposes both UI and Connect tools, so make sure the AI is using the `Connect`-prefixed tools (e.g. `getConnectEndpointSchema`) rather than the UI component tools. Connect and Eventcalendar are entirely separate products.

### AI invents non-existent endpoints or parameters

**Symptom:** The AI suggests REST endpoints, request parameters, response fields, or SDK methods that don't exist in the Connect API.

**Fix:** The `.mdc` rules instruct the AI to only use APIs found in the Connect docs. If this still happens, explicitly reference `@docs` in Cursor queries, or verify that `CLAUDE.md` is in the project root for Claude Code. For the highest accuracy, enable the Mobiscroll MCP server so the AI fetches live endpoint and SDK schemas via the Connect tools instead of guessing. You can also ask the AI to confirm an endpoint exists in the Mobiscroll Connect docs.

### MCP server does not appear after setup

**Symptom:** The MCP server panel shows no `mobiscroll` entry, or its Connect tools are not available.

**Fix:** Check that the config file is in the correct location and uses the correct root key — `mcpServers` for Claude Code and Cursor, `servers` for VS Code. Validate that the file is well-formed JSON, and that the server name is `mobiscroll`. For Claude Code, run `/mcp` to inspect connected servers; for the VS Code extension, add the server with project scope. If the server connects but the `Connect`-prefixed tools are missing, your deployed server may predate the Connect merge — reconnect after it is updated.

### AI mixes Mobiscroll Connect with UI components

**Symptom:** The AI generates REST API calls when you asked about a frontend calendar component, or generates JSX/component code when you asked about the Connect API.

**Fix:** Mobiscroll Connect is a backend integration layer (OAuth, REST, webhooks) and has no UI components. Eventcalendar is a frontend UI component with no REST API. They use entirely separate `.mdc` files, documentation sources, and MCP servers. Verify that the correct `.mdc` file is active for your project. If you use both in the same codebase, keep separate AI context directories for each.

## File reference

All AI integration files and endpoints are available at the following URLs:

### Documentation files

| File | URL |
|:---|:---|
| Connect | {/* llms:docsurl;path=llms-connect.txt */}<DocsUrl path="llms-connect.txt" /> |
| Connect (full) | {/* llms:docsurl;path=llms-connect-full.txt */}<DocsUrl path="llms-connect-full.txt" /> |

### Rules files

| File | Cursor (`.mdc`) | Copilot (`.instructions.md`) |
|:---|:---|:---|
| Connect rules | {/* llms:docslink;path=mobiscroll-connect.mdc */}{/* /llms:docslink */}<DocsLink path="mobiscroll-connect.mdc" download /> | {/* llms:docslink;path=copilot-instructions/mobiscroll-connect.instructions.md */}{/* /llms:docslink */}<DocsLink path="copilot-instructions/mobiscroll-connect.instructions.md" download /> |

### Extended rule files

| File | Cursor (`.mdc`) | Copilot (`.instructions.md`) |
|:---|:---|:---|
| Connect skill | {/* llms:docslink;path=connect/SKILL.md;filename=mobiscroll-connect-skill.mdc */}<DocsLink path="connect/SKILL.md" download filename="mobiscroll-connect-skill.mdc"><code>mobiscroll-connect-skill.mdc</code></DocsLink>{/* /llms:docslink */} | {/* llms:docslink;path=copilot-instructions/mobiscroll-connect-skill.instructions.md */}{/* /llms:docslink */}<DocsLink path="copilot-instructions/mobiscroll-connect-skill.instructions.md" download /> |

### Routing file

| File | URL |
|:---|:---|
| Claude Code context | {/* llms:docslink;path=connect/CLAUDE.md */}{/* /llms:docslink */}<DocsLink path="connect/CLAUDE.md" download /> |

### MCP server

| Server | URL |
|:---|:---|
| Mobiscroll MCP (UI + Connect) | {/* llms:mcpurl */}<McpUrl /> |

## File contents {#file-contents}

The complete contents of each file are shown below. You can copy directly from these blocks or use the download links above.

### CLAUDE.md

<details>
<summary>View <code>CLAUDE.md</code></summary>
{/* llms:fileblock;src=connect/CLAUDE.md */}
<FileBlock src="connect/CLAUDE.md" />
</details>

### Rules files (.mdc) {#rules-files-mdc}

<details>
<summary>View <code>mobiscroll-connect.mdc</code></summary>
{/* llms:fileblock;src=mobiscroll-connect.mdc */}
<FileBlock src="mobiscroll-connect.mdc" />
</details>

### Extended rule file {#extended-rule-files}

<details>
<summary>View <code>mobiscroll-connect-skill.mdc</code></summary>
{/* llms:fileblock;src=connect/SKILL.md */}
<FileBlock src="connect/SKILL.md" />
</details>
