---
sidebar_position: 1
sidebar_label: MCP Server
title: MCP Server
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

# MCP Server

The Mobiscroll MCP server gives AI coding assistants direct, queryable access to live Mobiscroll documentation. Instead of working from static snapshots, tools can ask the server about component inputs, TypeScript types, and configuration options on demand — and always get up-to-date answers.

## Available tools

| Tool | Description |
|:---|:---|
| `resolveEnvironment` | Detects your framework and Mobiscroll version from `package.json` and returns compatible version information. |
| `listComponents` | Lists all available Mobiscroll components for the detected framework and version with short descriptions. |
| `getComponentSchema` | Returns the full option/prop schema for a named Mobiscroll component. |
| `searchExamples` | Searches code examples by keyword with optional component filter. |
| `getExampleById` | Fetches a complete code example by its ID. |
| `validateSnippet` | Validates a code snippet against the component schema and reports errors and deprecation warnings. |

## Quick reference

| | Claude Code | Cursor | GitHub Copilot (VS Code) |
|:---|:---|:---|:---|
| Config file (project) | `.mcp.json` | `.cursor/mcp.json` | `.vscode/mcp.json` |
| Root key | `mcpServers` | `mcpServers` | `servers` |
| `type` field | `"http"` | omit | `"http"` |
| Scope options | local · project · user | project · global | workspace · user |
| Verify | `/mcp` | MCP Logs | `MCP: List Servers` |

## Claude Code

### Step 1: Add the server

The fastest way is the CLI — run:

<McpCliBlock />

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

### Scope options

| Scope | CLI flag | Config location | Shared with team |
|:---|:---|:---|:---|
| local (default) | `--scope local` | `~/.claude.json` | No |
| project | `--scope project` | `.mcp.json` in project root | Yes, via version control |
| user | `--scope user` | `~/.claude.json` | No, all your projects |

:::info
Use `--scope project` for team repos so everyone gets the MCP server automatically when they clone the project.
:::

### Verify the connection

Run `/mcp` inside Claude Code. The panel lists each connected server and its tool count. A healthy connection shows `mobiscroll` with at least one tool.

## Cursor

### Step 1: Add the server config

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

### Scope options

| Scope | Config file | Shared with team |
|:---|:---|:---|
| project | `.cursor/mcp.json` in project root | Yes, if committed |
| global | `~/.cursor/mcp.json` | No, all your projects |

### Verify the connection

Open the **Output** panel in Cursor and select **MCP Logs** from the dropdown. A successful connection logs tool discovery messages for the `mobiscroll` server.

## GitHub Copilot (VS Code)

### Step 1: Add the server config

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

### Scope options

| Scope | Config file | Shared with team |
|:---|:---|:---|
| workspace | `.vscode/mcp.json` in project root | Yes, if committed |
| user profile | Opened via **MCP: Open User Configuration** | No, all your workspaces |

### Verify the connection

Open the **Command Palette** and run **MCP: List Servers**. The `mobiscroll` server should appear with a connected status. A trust dialog appears on first use — approve it to allow the server to start.

## Example queries

These examples show the kind of questions the MCP server is designed to answer correctly.

```
What inputs does mbsc-eventcalendar accept?
How do I configure a monthly calendar view in Angular?
Where do I add the Mobiscroll CSS in angular.json?
```

## Troubleshooting

### Server does not appear after setup

**Symptom:** The tool shows no MCP server or the `mobiscroll` entry is missing.

**Fix:** Check that the config file is in the correct location and uses the correct root key — `mcpServers` for Claude Code and Cursor, `servers` for VS Code. Validate that the file is well-formed JSON.
