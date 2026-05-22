---
sidebar_position: 0
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

export const DocsLink = ({path, children, download: dl, filename}) => {
  const base = useDocsBase();
  const url = base + path;
  const dlName = filename || path.split('/').pop();
  return dl
    ? <a href={url} download={dlName}>{children || <code>{path}</code>}</a>
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
| `llms-icons.txt` | Icon names (IcoMoon, Font Awesome, Ionicons) — all frameworks |

:::info
You don't need to download or host these files — the rules files and the Claude Code plugin reference them directly and fetch their content automatically.
:::

### Rules layer — rules files

Per-framework behavior files that tell AI assistants which package to use, how to import CSS, which APIs are available, and what to avoid. Two formats are available — use one or the other:

| File | Format | For |
|:---|:---|:---|
| <DocsLink path="mobiscroll-angular.mdc" download /> | Cursor rule file | Cursor |
| <DocsLink path="copilot-instructions/mobiscroll-angular.instructions.md" download /> | Copilot instruction file | GitHub Copilot |
| 3 extended rule files | Extended rules + MCP calls | Cursor, GitHub Copilot, Claude Code |


## Which tool uses which files?

| AI Tool | Documentation Source | Behavior Rules |
|:---|:---|:---|
| **Cursor** | `llms-angular-full.txt` via @docs | Option A: `.mdc` rules file — Option B: extended rule files + MCP |
| **GitHub Copilot** | `.instructions.md` file or extended instruction files (contain doc URLs) | Option A: `.instructions.md` rules file — Option B: extended instruction files + MCP |
| **Claude Code** | MCP server (live schema lookup) | Plugin skills |

## Cursor setup

### Step 1: Register documentation sources

Open **Cursor Settings → Indexing & Docs** and add the documentation source for your framework:

| Framework | Name | URL |
|:---|:---|:---|
| Angular | Mobiscroll Angular | <DocsUrl path="llms-angular-full.txt" /> |

Only register the source matching your use case. Do not register multiple sources — this prevents cross-domain contamination.

### Step 2: Add behavior rules

Choose one approach — Option A works immediately with no additional setup; Option B adds live MCP schema lookups for higher accuracy but requires the MCP server to be configured.

#### Option A — .mdc rules file

Download the <DocsLink path="mobiscroll-angular.mdc" download><code>mobiscroll-angular.mdc</code></DocsLink> file and place it in `.cursor/rules/`:

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

- <DocsLink path="mobiscroll-ui/SKILL.md" download filename="mobiscroll-ui.mdc">mobiscroll-ui.mdc (orchestrator)</DocsLink>
- <DocsLink path="docs/angular/SKILL.md" download filename="mobiscroll-ui-angular.mdc">mobiscroll-ui-angular.mdc (Angular conventions)</DocsLink>
- <DocsLink path="mobiscroll-ui-theming/SKILL.md" download filename="mobiscroll-ui-theming.mdc">mobiscroll-ui-theming.mdc (theming)</DocsLink>

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

Unlike Option A, these rule files also instruct Cursor's AI to call the Mobiscroll MCP server for live component schema lookups on every generation — so it always uses the current API instead of guessing from memory. You must [configure the MCP server](#mcp-server) to get the full benefit.

### Step 3: Use @docs in queries

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

Download the <DocsLink path="copilot-instructions/mobiscroll-angular.instructions.md" download><code>mobiscroll-angular.instructions.md</code></DocsLink> file and place it in `.github/instructions/`:

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

- <DocsLink path="copilot-instructions/mobiscroll-ui.instructions.md" download>mobiscroll-ui.instructions.md (orchestrator)</DocsLink>
- <DocsLink path="copilot-instructions/mobiscroll-ui-angular.instructions.md" download>mobiscroll-ui-angular.instructions.md (Angular conventions)</DocsLink>
- <DocsLink path="copilot-instructions/mobiscroll-ui-theming.instructions.md" download>mobiscroll-ui-theming.instructions.md (theming)</DocsLink>

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

### How it works

Both Option A (`.instructions.md` file) and Option B (extended instruction files) contain:

- **Documentation URLs** — point the AI to the correct framework docs
- **Component mapping** — map user intents (e.g., "scheduler") to the correct Mobiscroll APIs
- **Rules** — enforce correct package imports, CSS loading, and API usage
- **Constraints** — prevent cross-framework mixing and API hallucination

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

### How it works

Once installed, the plugin provides:

- **Skills** — `mobiscroll-ui` is the orchestrator skill that detects your framework (React, Angular, Vue, JavaScript, or jQuery) and loads the matching framework sub-skill. Theming questions are handled by `mobiscroll-ui-theming`. All skills are installed together.
- **MCP server** — The bundled Mobiscroll MCP server provides live component schema lookup, code validation, and example search on demand — so Claude always uses the current API, never hallucinated or outdated options.

When you ask Claude Code to write Mobiscroll code, it:

1. Detects your framework and Mobiscroll version via `resolveEnvironment`
2. Loads the matching framework skill with idiomatic conventions
3. Looks up the component schema before writing any props or events
4. Validates generated code before returning it to you

## Framework isolation

:::warning Critical
Each rules file and documentation source targets exactly **one** framework or domain. Never combine files from different frameworks, or mix UI framework files with Connect files.
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

1. Add only **one** rules file per project — the one matching your framework or domain (`.mdc` for Cursor, `.instructions.md` for Copilot)
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

**Fix:** Verify that you have the correct rules file in place. For Angular in Cursor, use `mobiscroll-angular.mdc`; for Copilot, use `mobiscroll-angular.instructions.md`. In Cursor, check that the registered @docs source points to `llms-angular-full.txt`.

### AI invents non-existent APIs

**Symptom:** The AI suggests options, events, or types that don't exist in the Mobiscroll documentation.

**Fix:** The `.mdc` rules instruct the AI to only use APIs found in the docs. If this still happens, explicitly reference `@docs` in Cursor queries, or verify that the Mobiscroll plugin is installed in Claude Code (`/plugin list`). You can also ask the AI to verify an option exists in the Mobiscroll docs.

### AI mixes Mobiscroll Connect with UI components

**Symptom:** The AI generates REST API calls when you asked about a frontend calendar component, or generates JSX/component code when you asked about the Connect API.

**Fix:** Mobiscroll Connect is a backend integration layer (OAuth, REST, webhooks) and has no UI components. Eventcalendar is a frontend UI component with no REST API. They use entirely separate `.mdc` files and documentation sources. Verify that the correct `.mdc` file is active for your project. If you use both in the same codebase, keep separate AI context directories for each.

## File reference

All AI integration files are available at the following URLs:

### Documentation files

| File | URL |
|:---|:---|
| Angular | <DocsUrl path="llms-angular-full.txt" /> |

### Rules files

| File | Cursor (`.mdc`) | Copilot (`.instructions.md`) |
|:---|:---|:---|
| Angular rules | <DocsLink path="mobiscroll-angular.mdc" download /> | <DocsLink path="copilot-instructions/mobiscroll-angular.instructions.md" download /> |

### Extended rule files

| File | Cursor (`.mdc`) | Copilot (`.instructions.md`) |
|:---|:---|:---|
| Orchestrator | <DocsLink path="mobiscroll-ui/SKILL.md" download filename="mobiscroll-ui.mdc" /> | <DocsLink path="copilot-instructions/mobiscroll-ui.instructions.md" download /> |
| Angular conventions | <DocsLink path="docs/angular/SKILL.md" download filename="mobiscroll-ui-angular.mdc" /> | <DocsLink path="copilot-instructions/mobiscroll-ui-angular.instructions.md" download /> |
| Theming | <DocsLink path="mobiscroll-ui-theming/SKILL.md" download filename="mobiscroll-ui-theming.mdc" /> | <DocsLink path="copilot-instructions/mobiscroll-ui-theming.instructions.md" download /> |

## File contents {#file-contents}

The complete contents of each file are shown below. You can copy directly from these blocks or use the download links above.

### Extended rule files {#extended-rule-files}

<details>
<summary>View <code>SKILL.md</code> (mobiscroll-ui — orchestrator)</summary>
<FileBlock src="mobiscroll-ui/SKILL.md" />
</details>

<details>
<summary>View <code>SKILL.md</code> (mobiscroll-ui-angular — Angular conventions)</summary>
<FileBlock src="docs/angular/SKILL.md" />
</details>

<details>
<summary>View <code>SKILL.md</code> (mobiscroll-ui-theming — theming)</summary>
<FileBlock src="mobiscroll-ui-theming/SKILL.md" />
</details>

### Rules files (.mdc) {#rules-files-mdc}

<details>
<summary>View <code>mobiscroll-angular.mdc</code></summary>
<FileBlock src="mobiscroll-angular.mdc" />
</details>

## MCP Server

The Mobiscroll MCP server gives AI coding assistants direct, queryable access to live Mobiscroll documentation. Instead of working from static snapshots, tools can ask the server about component inputs, TypeScript types, and configuration options on demand — and always get up-to-date answers.

### Claude Code

#### Add the server

The fastest way is the CLI — run:

<McpCliBlock />

:::warning VS Code extension
If you are using the Claude Visual Studio Code extension, the server will not appear unless it is added with project scope. See the next command below.
:::

To share the server with your team automatically, use project scope:

<McpCliBlock scope="project" />

This creates or updates `.mcp.json` in your project root. You can also create that file manually:

<McpConfigBlock tool="claude" />

```
your-project/
├── .mcp.json
├── src/
└── package.json
```

#### Scope options

| Scope | CLI flag | Config location | Shared with team |
|:---|:---|:---|:---|
| local (default) | `--scope local` | `~/.claude.json` | No |
| project | `--scope project` | `.mcp.json` in project root | Yes, via version control |
| user | `--scope user` | `~/.claude.json` | No, all your projects |

:::info
Use `--scope project` for team repos so everyone gets the MCP server automatically when they clone the project.
:::

#### Verify the connection

Run `/mcp` inside Claude Code. The panel lists each connected server and its tool count. A healthy connection shows `mobiscroll` with at least one tool.

### Cursor

#### Add the server config

Create or edit `.cursor/mcp.json` in your project root:

<McpConfigBlock tool="cursor" />

:::warning No `type` field
Cursor infers the transport type from the URL. Do **not** add `"type": "http"` to Cursor's config — it causes an error.
:::

```
your-project/
├── .cursor/
│   └── mcp.json
├── src/
└── package.json
```

#### Scope options

| Scope | Config file | Shared with team |
|:---|:---|:---|
| project | `.cursor/mcp.json` in project root | Yes, if committed |
| global | `~/.cursor/mcp.json` | No, all your projects |

#### Verify the connection

Open the **Output** panel in Cursor and select **MCP Logs** from the dropdown. A successful connection logs tool discovery messages for the `mobiscroll` server.

### GitHub Copilot (VS Code)

#### Add the server config

Create or edit `.vscode/mcp.json` in your project root:

<McpConfigBlock tool="vscode" />

:::warning `"servers"` not `"mcpServers"`
VS Code uses `"servers"` as the root key — not `"mcpServers"` like Claude Code and Cursor. Using the wrong key silently breaks the config with no error message.
:::

```
your-project/
├── .vscode/
│   └── mcp.json
├── src/
└── package.json
```

Alternatively, open the **Command Palette** and run **MCP: Add Server** for a guided setup that generates the config automatically.

#### Scope options

| Scope | Config file | Shared with team |
|:---|:---|:---|
| workspace | `.vscode/mcp.json` in project root | Yes, if committed |
| user profile | Opened via **MCP: Open User Configuration** | No, all your workspaces |

#### Verify the connection

Open the **Command Palette** and run **MCP: List Servers**. The `mobiscroll` server should appear with a connected status. A trust dialog appears on first use — approve it to allow the server to start.

### Example queries

These examples show the kind of questions the MCP server is designed to answer correctly.

```
What inputs does mbsc-eventcalendar accept?
How do I configure a monthly calendar view in Angular?
Where do I add the Mobiscroll CSS in angular.json?
```

### Troubleshooting

#### Server does not appear after setup

**Symptom:** The tool shows no MCP server or the `mobiscroll` entry is missing.

**Fix:** Check that the config file is in the correct location and uses the correct root key — `mcpServers` for Claude Code and Cursor, `servers` for VS Code. Validate that the file is well-formed JSON.
