---
sidebar_position: 0
sidebar_label: AI Integration
title: AI Integration
description: 'Set up AI coding assistants — Claude Code, Codex, Cursor, and GitHub Copilot — with Mobiscroll Angular docs and behavior rules to generate accurate, framework-specific component code.'
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

export const DocsLink = ({path, children, download: dl, filename}) => {
  const base = useDocsBase();
  const url = base + path;
  const dlName = filename || path.split('/').pop();
  const handleDownload = async (e) => {
    e.preventDefault();
    const text = await fetch(url).then(r => r.text());
    const replaced = text.replace(/\{\{DOCS_BASE_URL\}\}/g, base.replace(/\/$/, ''));
    const blob = new Blob([replaced], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = dlName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  return dl
    ? <a href={url} onClick={handleDownload}>{children || <code>{path}</code>}</a>
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
| `llms-angular-full.txt` | Complete Angular documentation |
| `llms-angular.txt` | Angular table of contents (links to individual pages) |
| `5.35.0/llms-icons.txt` | Icon names for Mobiscroll v5 — all frameworks |

:::info
You don't need to download or host these files — the rules files and the Claude Code and Codex plugins reference them directly and fetch their content automatically.
:::

### Rules layer — rules files

Rules files provide Mobiscroll context to **Cursor** and **GitHub Copilot** only. Claude Code and Codex use the Mobiscroll plugin instead — no manual file setup needed.

Two approaches are available:

- **Option A** — file-based context loading. A rules file (`.mdc` for Cursor, `.instructions.md` for Copilot) contains API documentation and behavior rules. No MCP server required.
- **Option B** — live schema fetching via MCP server. Extended rule files instruct the AI to call the Mobiscroll MCP server for live component schema lookups on each generation. Suited for interactive coding agents that need per-query precision.

Choose based on your preference and setup.

#### Files

**Option A — file-based rules:**

| File | Format | For |
|:---|:---|:---|
| {/* llms:docslink;path=5.35.0/mobiscroll-angular.mdc */}{/* /llms:docslink */}<DocsLink path="5.35.0/mobiscroll-angular.mdc" download /> | Cursor rule file | Cursor |
| {/* llms:docslink;path=5.35.0/copilot-instructions/mobiscroll-angular.instructions.md */}{/* /llms:docslink */}<DocsLink path="5.35.0/copilot-instructions/mobiscroll-angular.instructions.md" download /> | Copilot instruction file | GitHub Copilot |

**Option B — extended rules with MCP:**

| File | Format | For |
|:---|:---|:---|
| {/* llms:docslink;path=mobiscroll-ui/SKILL.md;filename=mobiscroll-ui.mdc */}<DocsLink path="mobiscroll-ui/SKILL.md" download filename="mobiscroll-ui.mdc">mobiscroll-ui.mdc</DocsLink>{/* /llms:docslink */} | Cursor extended rule (orchestrator) | Cursor |
| {/* llms:docslink;path=docs/angular/SKILL.md;filename=mobiscroll-ui-angular.mdc */}<DocsLink path="docs/angular/SKILL.md" download filename="mobiscroll-ui-angular.mdc">mobiscroll-ui-angular.mdc</DocsLink>{/* /llms:docslink */} | Cursor extended rule (Angular) | Cursor |
| {/* llms:docslink;path=mobiscroll-ui-theming/SKILL.md;filename=mobiscroll-ui-theming.mdc */}<DocsLink path="mobiscroll-ui-theming/SKILL.md" download filename="mobiscroll-ui-theming.mdc">mobiscroll-ui-theming.mdc</DocsLink>{/* /llms:docslink */} | Cursor extended rule (theming) | Cursor |
| {/* llms:docslink;path=copilot-instructions/mobiscroll-ui.instructions.md */}<DocsLink path="copilot-instructions/mobiscroll-ui.instructions.md" download>mobiscroll-ui.instructions.md</DocsLink>{/* /llms:docslink */} | Copilot extended instruction (orchestrator) | GitHub Copilot |
| {/* llms:docslink;path=copilot-instructions/mobiscroll-ui-angular.instructions.md */}<DocsLink path="copilot-instructions/mobiscroll-ui-angular.instructions.md" download>mobiscroll-ui-angular.instructions.md</DocsLink>{/* /llms:docslink */} | Copilot extended instruction (Angular) | GitHub Copilot |
| {/* llms:docslink;path=copilot-instructions/mobiscroll-ui-theming.instructions.md */}<DocsLink path="copilot-instructions/mobiscroll-ui-theming.instructions.md" download>mobiscroll-ui-theming.instructions.md</DocsLink>{/* /llms:docslink */} | Copilot extended instruction (theming) | GitHub Copilot |

#### Which tool uses which files?

| Tool | Approach | Files used |
|:---|:---|:---|
| **Cursor** | Option A | `mobiscroll-angular.mdc` |
| **Cursor** | Option B | `mobiscroll-ui.mdc`, `mobiscroll-ui-angular.mdc`, `mobiscroll-ui-theming.mdc` |
| **GitHub Copilot** | Option A | `mobiscroll-angular.instructions.md` |
| **GitHub Copilot** | Option B | `mobiscroll-ui.instructions.md`, `mobiscroll-ui-angular.instructions.md`, `mobiscroll-ui-theming.instructions.md` |

### Live schema layer — MCP server

The **Mobiscroll MCP server** serves structured, version-stamped API knowledge over the Model Context Protocol. It is a single, unified server: the same `mobiscroll` server that exposes these UI component tools also serves the Mobiscroll Connect tools, prefixed `Connect` so they never collide. Instead of relying on documentation snapshots, an assistant can call these tools to fetch the exact component schema, valid props/events, or a working example at generation time — so it never hallucinates or drifts from the current API.

It is a **hosted HTTP server** at {/* llms:mcpurl */}<McpUrl /> — no local install required. It's optional for Cursor and GitHub Copilot (only used if you choose Option B), and bundled/always-on for Claude Code and Codex via the plugin.

## Cursor setup

### Step 1: Register documentation sources

Open **Cursor Settings → Indexing & Docs** and add the documentation source for your framework:

| Framework | Name | URL |
|:---|:---|:---|
| Angular | Mobiscroll Angular | {/* llms:docsurl;path=5.35.0/llms-angular-full.txt */}<DocsUrl path="5.35.0/llms-angular-full.txt" /> |

Only register the source matching your use case. Do not register multiple sources — this prevents cross-domain contamination.

### Step 2: Add behavior rules

Choose one approach — Option A works immediately with no additional setup; Option B adds live MCP schema lookups for higher accuracy but requires the MCP server to be configured.

#### Option A — .mdc rules file

Download the {/* llms:docslink;path=5.35.0/mobiscroll-angular.mdc */}<DocsLink path="5.35.0/mobiscroll-angular.mdc" download><code>mobiscroll-angular.mdc</code></DocsLink>{/* /llms:docslink */} file and place it in `.cursor/rules/`:

```
your-project/
├── .cursor/
│   └── rules/
│       └── mobiscroll-angular.mdc
├── src/
└── package.json
```

The `.mdc` file provides text-based API rules — no additional setup required.

#### Option B — Extended rule files + MCP (3 files)

Download the three extended rule files and place them in `.cursor/rules/`:

- {/* llms:docslink;path=mobiscroll-ui/SKILL.md;filename=mobiscroll-ui.mdc */}<DocsLink path="mobiscroll-ui/SKILL.md" download filename="mobiscroll-ui.mdc">mobiscroll-ui.mdc (orchestrator)</DocsLink>{/* /llms:docslink */}
- {/* llms:docslink;path=docs/angular/SKILL.md;filename=mobiscroll-ui-angular.mdc */}<DocsLink path="docs/angular/SKILL.md" download filename="mobiscroll-ui-angular.mdc">mobiscroll-ui-angular.mdc (Angular conventions)</DocsLink>{/* /llms:docslink */}
- {/* llms:docslink;path=mobiscroll-ui-theming/SKILL.md;filename=mobiscroll-ui-theming.mdc */}<DocsLink path="mobiscroll-ui-theming/SKILL.md" download filename="mobiscroll-ui-theming.mdc">mobiscroll-ui-theming.mdc (theming)</DocsLink>{/* /llms:docslink */}

```
your-project/
├── .cursor/
│   └── rules/
│       ├── mobiscroll-ui.mdc
│       ├── mobiscroll-ui-angular.mdc
│       └── mobiscroll-ui-theming.mdc
├── src/
└── package.json
```

Unlike Option A, these rule files instruct Cursor's AI to call the Mobiscroll MCP server for live component schema lookups on each generation — so it always uses the current API instead of guessing from memory.

#### Rule activation

The extended `.mdc` files use `alwaysApply: false` with a `description` in their frontmatter. Cursor reads the description and activates the rule only when the context is relevant — the rule is not included in every message. You can also trigger it manually with `@rule-name` (e.g. `@mobiscroll-ui`). The `.mdc` format works in all Cursor modes including Agent mode.

### Step 3: Configure MCP server (Optional)

Configure the Mobiscroll MCP server so the extended rules can call it for live schema lookups.

Create or edit `.cursor/mcp.json` in your project root:

{/* llms:mcpconfig;tool=cursor */}<McpConfigBlock tool="cursor" />

:::warning No `type` field
Cursor infers the transport type from the URL. Do **not** add `"type": "http"` to Cursor's config — it causes an error.
:::

```
your-project/
├── .cursor/
│   ├── mcp.json
│   └── rules/
│       ├── mobiscroll-ui.mdc
│       ├── mobiscroll-ui-angular.mdc
│       └── mobiscroll-ui-theming.mdc
├── src/
└── package.json
```

| Scope | Config file | Shared with team |
|:---|:---|:---|
| project | `.cursor/mcp.json` in project root | Yes, if committed |
| global | `~/.cursor/mcp.json` | No, all your projects |

**Verify the connection:** Open the **Output** panel in Cursor and select **MCP Logs** from the dropdown. A successful connection logs tool discovery messages for the `mobiscroll` server.

### How it works

When asking Cursor about Mobiscroll, include `@docs` to ensure it reads the registered documentation:

```
@docs How do I set up a weekly scheduler with Mobiscroll?
```

```
@docs What options does the Eventcalendar timeline view accept?
```

## GitHub Copilot setup

### Step 1: Add behavior rules

Choose one approach — Option A works immediately with no additional setup; Option B adds live MCP schema lookups for higher accuracy but requires the MCP server to be configured.

#### Option A — .instructions.md rules file

Download the {/* llms:docslink;path=5.35.0/copilot-instructions/mobiscroll-angular.instructions.md */}<DocsLink path="5.35.0/copilot-instructions/mobiscroll-angular.instructions.md" download><code>mobiscroll-angular.instructions.md</code></DocsLink>{/* /llms:docslink */} file and place it in `.github/instructions/`:

```
your-project/
├── .github/
|   └── instructions/
|       └── mobiscroll-angular.instructions.md
├── src/
└── package.json
```

The `.instructions.md` file provides text-based API rules — no additional setup required.

#### Option B — Extended instruction files + MCP (3 files)

Download the three extended instruction files and place them in `.github/instructions/`:

- {/* llms:docslink;path=copilot-instructions/mobiscroll-ui.instructions.md */}<DocsLink path="copilot-instructions/mobiscroll-ui.instructions.md" download>mobiscroll-ui.instructions.md (orchestrator)</DocsLink>{/* /llms:docslink */}
- {/* llms:docslink;path=copilot-instructions/mobiscroll-ui-angular.instructions.md */}<DocsLink path="copilot-instructions/mobiscroll-ui-angular.instructions.md" download>mobiscroll-ui-angular.instructions.md (Angular conventions)</DocsLink>{/* /llms:docslink */}
- {/* llms:docslink;path=copilot-instructions/mobiscroll-ui-theming.instructions.md */}<DocsLink path="copilot-instructions/mobiscroll-ui-theming.instructions.md" download>mobiscroll-ui-theming.instructions.md (theming)</DocsLink>{/* /llms:docslink */}

```
your-project/
├── .github/
|   └── instructions/
|       ├── mobiscroll-ui.instructions.md
|       ├── mobiscroll-ui-angular.instructions.md
|       └── mobiscroll-ui-theming.instructions.md
├── src/
└── package.json
```

### Step 2: Configure MCP server (Optional)

Configure the Mobiscroll MCP server so the extended instruction files can call it for live schema lookups.

Create or edit `.vscode/mcp.json` in your project root:

{/* llms:mcpconfig;tool=vscode */}<McpConfigBlock tool="vscode" />

:::warning `"servers"` not `"mcpServers"`
VS Code uses `"servers"` as the root key — not `"mcpServers"` like Claude Code and Cursor. Using the wrong key silently breaks the config with no error message.
:::

```
your-project/
├── .vscode/
│   └── mcp.json
├── .github/
│   └── instructions/
│       ├── mobiscroll-ui.instructions.md
│       ├── mobiscroll-ui-angular.instructions.md
│       └── mobiscroll-ui-theming.instructions.md
├── src/
└── package.json
```

| Scope | Config file | Shared with team |
|:---|:---|:---|
| workspace | `.vscode/mcp.json` in project root | Yes, if committed |
| user profile | Opened via **MCP: Open User Configuration** | No, all your workspaces |

**Verify the connection:** Open the **Command Palette** and run **MCP: List Servers**. The `mobiscroll` server should appear with a connected status. A trust dialog appears on first use — approve it to allow the server to start.

Alternatively, open the **Command Palette** and run **MCP: Add Server** for a guided setup.

### How it works

The instruction files with `applyTo: "**"` apply automatically to all Copilot Chat queries — no manual reference needed. Both options contain:

- **Documentation URLs** — point the AI to the correct framework docs
- **Component mapping** — map user intents (e.g., "scheduler") to the correct Mobiscroll APIs
- **Rules** — enforce correct package imports, CSS loading, and API usage
- **Constraints** — prevent cross-framework mixing and API hallucination

Ask Mobiscroll questions directly:

```
How do I set up a weekly scheduler with Mobiscroll?
```

```
What options does the Eventcalendar timeline view accept?
```

## Claude Code setup

Install the Mobiscroll plugin for Claude Code. The plugin bundles framework coding skills and the MCP server in a single install — no per-project configuration files needed.

### Step 1: Register the marketplace

Run this once in Claude Code to register the Mobiscroll plugin marketplace:

```
/plugin marketplace add acidb/mobiscroll-marketplace
```

### Step 2: Install the plugin

```
/plugin install mobiscroll@mobiscroll
```

:::warning Plugin skills don't auto-update
Installing the plugin takes a snapshot of its skills — Claude Code won't pull in newer ones on its own unless you enable auto-update for the marketplace. To get the latest at any time, run `/plugin marketplace update mobiscroll && /plugin update mobiscroll@mobiscroll`, then `/reload-plugins`.
:::

### Step 3: Configure MCP server (Optional)

The plugin bundles the MCP server — no separate configuration is needed for most setups. To configure it manually or share it with your team:

{/* llms:mcpcli */}<McpCliBlock />

:::warning VS Code extension
If you are using the Claude Visual Studio Code extension, the server will not appear unless it is added with project scope. See the next command below.
:::

To share the server with your team automatically, use project scope:

{/* llms:mcpcli;scope=project */}<McpCliBlock scope="project" />

This creates or updates `.mcp.json` in your project root. You can also create that file manually:

{/* llms:mcpconfig;tool=claude */}<McpConfigBlock tool="claude" />

| Scope | CLI flag | Config location | Shared with team |
|:---|:---|:---|:---|
| local (default) | `--scope local` | `~/.claude.json` | No |
| project | `--scope project` | `.mcp.json` in project root | Yes, via version control |
| user | `--scope user` | `~/.claude.json` | No, all your projects |

:::info
Use `--scope project` for team repos so everyone gets the MCP server automatically when they clone the project.
:::

**Verify the connection:** Run `/mcp` inside Claude Code. The panel lists each connected server and its tool count. A healthy connection shows `mobiscroll` with at least one tool.

### How it works

Once installed, the plugin provides:

- **Skills** — `mobiscroll-ui` is the orchestrator skill that detects your framework (React, Angular, Vue, JavaScript, or jQuery) and loads the matching framework sub-skill. Theming questions are handled by `mobiscroll-ui-theming`. All skills are installed together.
- **MCP server** — The bundled Mobiscroll MCP server provides live component schema lookup, code validation, and example search on demand — so Claude always uses the current API, never hallucinated or outdated options.

When you ask Claude Code to write Mobiscroll code, it:

1. Detects your framework and Mobiscroll version via `resolveEnvironment`
2. Loads the matching framework skill with idiomatic conventions
3. Looks up the component schema before writing any props or events
4. Validates generated code before returning it to you

## Codex setup

Install the Mobiscroll plugin for OpenAI Codex. The plugin bundles framework coding skills and the MCP server in a single install — no per-project configuration files needed.

### Step 1: Register the marketplace

Run this once in Codex to register the Mobiscroll plugin marketplace:

```
/plugins marketplace add acidb/mobiscroll-marketplace
```

### Step 2: Install the plugin

```
/plugins install mobiscroll@mobiscroll
```

:::warning Plugin skills don't auto-update
Installing the plugin takes a snapshot of its skills — Codex won't pull in newer ones on its own. To get the latest at any time, update the marketplace catalog and reinstall the plugin: `/plugins marketplace update mobiscroll`, then `/plugins install mobiscroll@mobiscroll`.
:::

### Step 3: Configure MCP server (Optional)

The plugin bundles the MCP server — no separate configuration is needed for most setups. To configure it manually or share it with your team, add it to `~/.codex/config.toml` (global) or `.codex/config.toml` (project):

```toml
[mcp_servers.mobiscroll]
url = "https://mcp.mobiscroll.com/"
```

You can also register it from the command line:

```
codex mcp add mobiscroll --url https://mcp.mobiscroll.com/
```

| Scope | Config location | Shared with team |
|:---|:---|:---|
| global | `~/.codex/config.toml` | No, all your projects |
| project | `.codex/config.toml` in project root (trusted projects only) | Yes, via version control |

:::info
Use the project-level `.codex/config.toml` for team repos so everyone gets the MCP server automatically when they clone the project.
:::

**Verify the connection:** Run `/mcp` inside Codex. The panel lists each connected server and its tool count. A healthy connection shows `mobiscroll` with its tools listed.

### How it works

Once installed, the plugin provides:

- **Skills** — `mobiscroll-ui` is the orchestrator skill that detects your framework (React, Angular, Vue, JavaScript, or jQuery) and loads the matching framework sub-skill. Theming questions are handled by `mobiscroll-ui-theming`. All skills are installed together.
- **MCP server** — The bundled Mobiscroll MCP server provides live component schema lookup, code validation, and example search on demand — so Codex always uses the current API, never hallucinated or outdated options.

When you ask Codex to write Mobiscroll code, it:

1. Detects your framework and Mobiscroll version via `resolveEnvironment`
2. Loads the matching framework skill with idiomatic conventions
3. Looks up the component schema before writing any props or events
4. Validates generated code before returning it to you

## Framework isolation

:::warning Critical
Each rules file and documentation source targets exactly **one** framework or domain. Never combine files from different frameworks, or mix UI framework files with Connect files.
:::

**Why this matters:**

- Most API options are shared across frameworks, but component usage and templating differs for each — mixing them produces broken code

**Mobiscroll Connect is a separate domain:**

- Connect is a backend integration layer — OAuth 2.0, REST API, webhooks, calendar sync
- It has no UI components, no JSX, no frontend framework bindings
- Connect uses `mobiscroll-connect.mdc` and `llms-connect-full.txt` — never the UI framework files
- Mixing Connect docs with UI docs causes the AI to conflate REST endpoints with component APIs

:::info
The `mobiscroll@mobiscroll` plugin also bundles a `mobiscroll-connect` skill for server-side Connect (OAuth, REST, calendar sync). It activates only for backend Connect work and never mixes with UI component code. See the [Connect AI Integration guide](/connect/getting-started/ai-integration).
:::

**Rules:**

1. Use only rules files that match **one** framework or domain — never mix files from different frameworks
2. Register only **one** documentation source in Cursor
3. If your project uses multiple frameworks (e.g., micro-frontends), set up separate directories with separate `.mdc` files
4. If your project uses both a UI framework and Mobiscroll Connect, use separate AI context directories for each
5. If an AI assistant generates code with wrong framework imports, check that the correct rules file is in place

## Example queries

These examples show the kind of questions the AI integration is designed to handle correctly.

```
How do I import MbscModule into my standalone component?
Set up a monthly calendar view with mbsc-eventcalendar.
Where do I add the Mobiscroll CSS in angular.json?
```

## Troubleshooting

### AI generates code with the wrong framework

**Symptom:** You are using Angular but the AI generates React code with `import { Eventcalendar } from '@mobiscroll/react'`.

**Fix:** Verify that you have the correct rules file in place. For Angular in Cursor, use `mobiscroll-angular.mdc`; for Copilot, use `mobiscroll-angular.instructions.md`. In Cursor, check that the registered @docs source points to `5.35.0/llms-angular-full.txt`.

### AI invents non-existent APIs

**Symptom:** The AI suggests options, events, or types that don't exist in the Mobiscroll documentation.

**Fix:** The `.mdc` rules instruct the AI to only use APIs found in the docs. If this still happens, explicitly reference `@docs` in Cursor queries, or verify that the Mobiscroll plugin is installed in Claude Code (`/plugin list`) or Codex (`codex plugin list`). You can also ask the AI to verify an option exists in the Mobiscroll docs.

### AI mixes Mobiscroll Connect with UI components

**Symptom:** The AI generates REST API calls when you asked about a frontend calendar component, or generates JSX/component code when you asked about the Connect API.

**Fix:** Mobiscroll Connect is a backend integration layer (OAuth, REST, webhooks) and has no UI components. Eventcalendar is a frontend UI component with no REST API. They use entirely separate `.mdc` files and documentation sources. Verify that the correct `.mdc` file is active for your project. If you use both in the same codebase, keep separate AI context directories for each.

### MCP server does not appear after setup

**Symptom:** The MCP server panel shows no `mobiscroll` entry, or tools are not available.

**Fix:** Check that the config file is in the correct location and uses the correct root key — `mcpServers` for Claude Code, Codex, and Cursor, `servers` for VS Code. Validate that the file is well-formed JSON. For Claude Code or Codex, run `/mcp` to inspect connected servers.

## File reference

All AI integration files are available at the following URLs:

### Documentation files

| File | URL |
|:---|:---|
| Angular | {/* llms:docsurl;path=5.35.0/llms-angular-full.txt */}<DocsUrl path="5.35.0/llms-angular-full.txt" /> |

### Rules files

| File | Cursor (`.mdc`) | Copilot (`.instructions.md`) |
|:---|:---|:---|
| Angular rules | {/* llms:docslink;path=5.35.0/mobiscroll-angular.mdc */}{/* /llms:docslink */}<DocsLink path="5.35.0/mobiscroll-angular.mdc" download /> | {/* llms:docslink;path=5.35.0/copilot-instructions/mobiscroll-angular.instructions.md */}{/* /llms:docslink */}<DocsLink path="5.35.0/copilot-instructions/mobiscroll-angular.instructions.md" download /> |

### Extended rule files

| File | Cursor (`.mdc`) | Copilot (`.instructions.md`) |
|:---|:---|:---|
| Orchestrator | {/* llms:docslink;path=mobiscroll-ui/SKILL.md;filename=mobiscroll-ui.mdc */}<DocsLink path="mobiscroll-ui/SKILL.md" download filename="mobiscroll-ui.mdc"><code>mobiscroll-ui.mdc</code></DocsLink>{/* /llms:docslink */} | {/* llms:docslink;path=copilot-instructions/mobiscroll-ui.instructions.md */}{/* /llms:docslink */}<DocsLink path="copilot-instructions/mobiscroll-ui.instructions.md" download /> |
| Angular conventions | {/* llms:docslink;path=docs/angular/SKILL.md;filename=mobiscroll-ui-angular.mdc */}<DocsLink path="docs/angular/SKILL.md" download filename="mobiscroll-ui-angular.mdc"><code>mobiscroll-ui-angular.mdc</code></DocsLink>{/* /llms:docslink */} | {/* llms:docslink;path=copilot-instructions/mobiscroll-ui-angular.instructions.md */}{/* /llms:docslink */}<DocsLink path="copilot-instructions/mobiscroll-ui-angular.instructions.md" download /> |
| Theming | {/* llms:docslink;path=mobiscroll-ui-theming/SKILL.md;filename=mobiscroll-ui-theming.mdc */}<DocsLink path="mobiscroll-ui-theming/SKILL.md" download filename="mobiscroll-ui-theming.mdc"><code>mobiscroll-ui-theming.mdc</code></DocsLink>{/* /llms:docslink */} | {/* llms:docslink;path=copilot-instructions/mobiscroll-ui-theming.instructions.md */}{/* /llms:docslink */}<DocsLink path="copilot-instructions/mobiscroll-ui-theming.instructions.md" download /> |

## File contents {#file-contents}

The complete contents of each file are shown below. You can copy directly from these blocks or use the download links above.

### Extended rule files {#extended-rule-files}

<details>
<summary>View <code>mobiscroll-ui.mdc</code> (orchestrator)</summary>
{/* llms:fileblock;src=mobiscroll-ui/SKILL.md */}<FileBlock src="mobiscroll-ui/SKILL.md" />
</details>

<details>
<summary>View <code>mobiscroll-ui-angular.mdc</code> (Angular conventions)</summary>
{/* llms:fileblock;src=docs/angular/SKILL.md */}<FileBlock src="docs/angular/SKILL.md" />
</details>

<details>
<summary>View <code>mobiscroll-ui-theming.mdc</code> (theming)</summary>
{/* llms:fileblock;src=mobiscroll-ui-theming/SKILL.md */}<FileBlock src="mobiscroll-ui-theming/SKILL.md" />
</details>

### Rules files (.mdc) {#rules-files-mdc}

<details>
<summary>View <code>mobiscroll-angular.mdc</code></summary>
{/* llms:fileblock;src=5.35.0/mobiscroll-angular.mdc */}<FileBlock src="5.35.0/mobiscroll-angular.mdc" />
</details>


