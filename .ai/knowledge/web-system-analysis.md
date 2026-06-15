# Web Monorepo AI System Analysis

Source: `C:\projects\mobiscroll-web\`
Analyzed: 2026-06-15

---

## Overview

The mobiscroll-web monorepo uses a four-directory pattern for AI agent infrastructure:

```
agent_changelog/     Per-session change records (one file per unit of work)
agent_insights/      Standalone AI-produced audits, reports, research
agent_operations/    Pre-implementation plans for non-trivial tasks
agent_docs/          Mandatory specs agents must read before touching a domain
```

---

## 1. Agent Changelog (`agent_changelog/`)

### Purpose
Document every AI-assisted work session that modifies files. Writing this is the **last action before suggesting a commit**. It is the primary traceability artifact.

### File naming
```
{YYYY-MM-DD}_{short_description}_{uid}.md
```
- `YYYY-MM-DD` — ISO date of the session
- `short_description` — 2–4 words joined by underscores (e.g. `add_document_type`)
- `uid` — 4-character random alphanumeric ID to prevent same-day collisions (e.g. `b7k2`)

Example: `2026-04-23_add_document_type_b7k2.md`

### File content format
```markdown
# {Date} — {Human-readable description}

## Request
One-sentence summary of what was asked.

## Changes
- `path/to/file` — one-line description of what changed and why
- `path/to/file` — ...

## Notes
Key decisions, trade-offs, or manual steps required.
```

### Rules
- Always create a **new file** — never update an existing entry
- One file per logical unit of work (per commit)
- Multiple changelog entries may be created in a single session

### Volume observed
Over 150 entries from 2026-04-23 to 2026-06-10. The system is actively used on every meaningful change.

---

## 2. Agent Insights (`agent_insights/`)

### Purpose
Standalone analysis, audits, and research documents produced by AI agents — not tied to a specific code change.

### When to write
- Compliance audits (ISO 27001, PCI DSS)
- Security reviews
- Architecture or code quality reviews
- Research summaries and recommendations

### File naming
```
{YYYY-MM-DD}_{short_description}.md
```
No uid (these are reports, not change records).

### Rules
- Always create a new file per distinct report
- Never overwrite an existing insight file — create a new dated file if re-running

---

## 3. Agent Operations (`agent_operations/`)

### Purpose
Pre-implementation plans for non-trivial tasks. Written **before** coding starts. Captures the *why* and *what* before the *how* lands in code.

### File naming
```
{nnnn}_{short_description}.md
```
- `nnnn` — zero-padded sequential number (e.g. `0007`)
- `short_description` — 2–5 words joined by hyphens

### When to write
Before starting any task involving more than one file or a non-obvious architectural choice.

### Note
Plans with companion `.why.md` files also appear — these explain the rationale for a decision.

---

## 4. Agent Docs (`agent_docs/`)

### Purpose
Mandatory rules and specs for specific areas. Agents **must read the relevant spec before starting work** in that domain.

### Organization
Each file covers one domain (e.g., `dialogs.md`, `forms.md`, `unittests.md`, `api-tests.md`, `api-keys.md`). A companion `*.why.md` provides the rationale.

### How it's referenced
CLAUDE.md has a routing table:
> "When task involves… | Read before starting"

This ensures agents load only the context relevant to their task — not the full knowledge base.

---

## 5. Commit Message Convention

From `CLAUDE.md`:
```
<type>(<scope>): <summary under 50 chars, imperative mood>

See agent_changelog/<entry-filename>.md
```

**Types:** `feat`, `fix`, `refactor`, `perf`, `docs`, `test`, `chore`, `style`

**Rule:** Suggest a commit message after every code change, without waiting to be asked. The changelog entry holds the full context — do not duplicate reasoning in the commit body.

---

## 6. Knowledge Base Organization (OS project, for reference)

The mobiscroll-os project uses a more structured KB:
```
knowledge/
  shared/           Company-wide truths (rules, governance, operating model, etc.)
  domains/          Domain-specific knowledge (marketing/strategy, etc.)
  agents/           Per-agent instructions and knowledge scopes
```

Files use YAML frontmatter with `status`, `owner`, `last_reviewed`, `authority` fields.
Status lifecycle: `placeholder → draft → reviewed → approved → deprecated`

This is more infrastructure-heavy than the docs project needs, but the **status + owner + last_reviewed** pattern is worth borrowing for knowledge files in the docs AI system.

---

## 7. Context Loading Pattern (CLAUDE.md)

Both projects use a task-scoped context loading table in CLAUDE.md:
- Not everything is loaded every turn
- CLAUDE.md is the control plane; detailed specs live elsewhere
- "Pointer, not paste" — CLAUDE.md links to docs, doesn't embed them

---

## 8. Learning / Feedback Loop

The web project's learning loop is implicit:
- Change records accumulate in `agent_changelog/`
- Agents are expected to read recent changelog entries at session start to restore context
- There is no automated feedback mechanism — it's human-read history

The OS project has a more formal feedback loop:
- Operators mark runs with `useful` / `not_useful` / `needs_review` quality signals
- Feedback is always manual

**For the docs project:** The learning loop should be explicit in the agent log format — every log entry should include a `learnings` field when something non-obvious was discovered.

---

## Key Patterns to Adapt for Docs

| Web pattern | Docs equivalent |
|---|---|
| `agent_changelog/` | `docs/.ai/logs/YYYY-MM-DD.md` (append-per-session) |
| `agent_insights/` | `docs/.ai/logs/` (same log, flagged as insight) |
| `agent_operations/` | Not needed initially; plans live in conversation unless complex |
| `agent_docs/` | `docs/.ai/knowledge/` (pre-loaded rules) |
| Commit message format | Adapted with AI-assisted footer |
| Context routing table | In `docs/.ai/SYSTEM.md` |

The main adaptation: the web system uses one file per unit of work (high granularity). The docs system will use **daily log files** (append-based) to reduce file proliferation while still maintaining traceability.
