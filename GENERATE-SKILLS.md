# Generating Skill Files

This document explains how skill files in this project are generated and maintained.

## Overview

The skill files used by AI coding assistants (Claude Code, GitHub Copilot) in this project are **not edited here**. They are copied from the [mobiscroll-marketplace](https://github.com/acidb/mobiscroll-marketplace) repository, which is the single source of truth.

The marketplace is the 1.0.0 version of the Claude Code Marketplace. Skill files live under:

```
plugins/mobiscroll/skills/
```

## Local Setup

Clone the marketplace repo locally, then add a `config.json` to the root of this project pointing to it:

```json
{
  "marketplacePath": "local/path/to/mobiscroll-marketplace"
}
```

`config.json` is gitignored — each developer sets their own local path.

## Syncing Skills

Run the copy script to pull the latest skill files from the marketplace into this project:

```bash
npm run copy-skills
```

This runs `scripts/copy-skills.js`, which performs two sets of copies:

### 1. SKILL.md files (Claude Code + Cursor)

The source files are copied to `static/` as `SKILL.md` files with `alwaysApply: false` injected into the frontmatter for Cursor compatibility. These files are also served as `.mdc` downloads for Cursor users via the `filename` prop on `DocsLink` (the rename happens at link time, not on disk).

| Skill (marketplace source) | Destination in docs project |
|---|---|
| `mobiscroll-ui` | `static/mobiscroll-ui/SKILL.md` |
| `mobiscroll-ui-theming` | `static/mobiscroll-ui-theming/SKILL.md` |
| `mobiscroll-ui-react` | `static/docs/react/SKILL.md` |
| `mobiscroll-ui-angular` | `static/docs/angular/SKILL.md` |
| `mobiscroll-ui-vue` | `static/docs/vue/SKILL.md` |
| `mobiscroll-ui-javascript` | `static/docs/javascript/SKILL.md` |
| `mobiscroll-ui-jquery` | `static/docs/jquery/SKILL.md` |

### 2. Copilot instruction files (GitHub Copilot)

The same source files are also copied to `static/copilot-instructions/` as `.instructions.md` files with `applyTo: "**"` injected into the frontmatter for GitHub Copilot compatibility:

| Skill | Destination |
|---|---|
| `mobiscroll-ui` | `static/copilot-instructions/mobiscroll-ui.instructions.md` |
| `mobiscroll-ui-theming` | `static/copilot-instructions/mobiscroll-ui-theming.instructions.md` |
| `mobiscroll-ui-react` | `static/copilot-instructions/mobiscroll-ui-react.instructions.md` |
| `mobiscroll-ui-angular` | `static/copilot-instructions/mobiscroll-ui-angular.instructions.md` |
| `mobiscroll-ui-vue` | `static/copilot-instructions/mobiscroll-ui-vue.instructions.md` |
| `mobiscroll-ui-javascript` | `static/copilot-instructions/mobiscroll-ui-javascript.instructions.md` |
| `mobiscroll-ui-jquery` | `static/copilot-instructions/mobiscroll-ui-jquery.instructions.md` |

## Skill Architecture

The `mobiscroll-ui` skill is the orchestrator: it detects the framework from the user's codebase and delegates to the appropriate framework-specific sub-skill (`mobiscroll-ui-react`, `mobiscroll-ui-angular`, etc.).

## How files surface on the AI integration doc pages

The `docs/{fw}/guides/ai-integration.md` pages (e.g. [docs/react/guides/ai-integration.md](docs/react/guides/ai-integration.md)) expose the copied files as downloadable extended rule files for end users. No extra build step or file duplication is involved — the rename happens at link time via the HTML `download` attribute.

### Cursor `.mdc` downloads

The SKILL.md files are served directly from `static/` and the `DocsLink` component's `filename` prop tells the browser to save them with a `.mdc` extension:

| Served from | Downloaded as |
|---|---|
| `static/mobiscroll-ui/SKILL.md` | `mobiscroll-ui.mdc` |
| `static/docs/react/SKILL.md` | `mobiscroll-ui-react.mdc` |
| `static/docs/angular/SKILL.md` | `mobiscroll-ui-angular.mdc` |
| `static/docs/vue/SKILL.md` | `mobiscroll-ui-vue.mdc` |
| `static/docs/javascript/SKILL.md` | `mobiscroll-ui-javascript.mdc` |
| `static/docs/jquery/SKILL.md` | `mobiscroll-ui-jquery.mdc` |
| `static/mobiscroll-ui-theming/SKILL.md` | `mobiscroll-ui-theming.mdc` |

No file is renamed on disk — only in the browser download dialog.

### Copilot `.instructions.md` downloads

The Copilot files are already named correctly by `copy-skills` and are served directly from `static/copilot-instructions/`:

| Served from | Downloaded as |
|---|---|
| `static/copilot-instructions/mobiscroll-ui.instructions.md` | `mobiscroll-ui.instructions.md` |
| `static/copilot-instructions/mobiscroll-ui-react.instructions.md` | `mobiscroll-ui-react.instructions.md` |
| `static/copilot-instructions/mobiscroll-ui-angular.instructions.md` | `mobiscroll-ui-angular.instructions.md` |
| `static/copilot-instructions/mobiscroll-ui-vue.instructions.md` | `mobiscroll-ui-vue.instructions.md` |
| `static/copilot-instructions/mobiscroll-ui-javascript.instructions.md` | `mobiscroll-ui-javascript.instructions.md` |
| `static/copilot-instructions/mobiscroll-ui-jquery.instructions.md` | `mobiscroll-ui-jquery.instructions.md` |
| `static/copilot-instructions/mobiscroll-ui-theming.instructions.md` | `mobiscroll-ui-theming.instructions.md` |

These files have `applyTo: "**"` injected into their frontmatter by `copy-skills`. They do not get `alwaysApply: false` — that field is Cursor-specific and belongs only in the SKILL.md copies.

## Editing Skills

**Never edit SKILL.md or `.instructions.md` files directly in this project.** They are overwritten on the next `npm run copy-skills` run.

To update a skill:

1. Edit the relevant `SKILL.md` in the marketplace repo under `plugins/mobiscroll/skills/{skill-name}/`
2. Run `npm run copy-skills` in this project to sync the changes
