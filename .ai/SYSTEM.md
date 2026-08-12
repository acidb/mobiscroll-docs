# Docs AI Agent — System Definition

Version: 1.4
Created: 2026-06-15
Updated: 2026-08-12
Status: ACTIVE

This file is the operating contract for the Mobiscroll docs AI agent.
**Do not modify during Phase 2 without flagging as a system change and getting explicit human approval.**

---

## Session Start Protocol

On every session start, in this order:

1. Read `.ai/SYSTEM.md` (this file) — reload operating rules
2. Read `.ai/logs/manifest.json` and filter to entries whose `branch` matches the current
   git branch (or its base branch, if determinable). Open the full body only of the
   **matched** log(s) — do not blanket-read every log file. If the current branch has no
   manifest history at all (new branch, or work happening on `main`), fall back to the
   most recent 3–5 manifest entries by date instead of reading everything.
   Historical logs from before this manifest existed (dated `YYYY-MM-DD.md`, no manifest
   entry) are frozen as-is — do not backfill or re-annotate them; read one directly, by
   date, only if a specific past session is asked about.
3. Read `.ai/knowledge/os-guidelines.md` — reload language and tone rules
4. Read `.ai/knowledge/web-system-analysis.md` — reload system patterns reference
5. The `UserPromptSubmit` hook (`.claude/hooks/user-prompt-submit.js`) already runs an
   undocumented-change check every turn (uncommitted files not covered by any open log
   for the current branch) — read its output before doing anything else this turn. If it
   flags files, reconstruct what happened from `git diff <file>` and either log it
   (§2 Human-sourced entries) or flag it to the human; don't just proceed past the warning.
6. Check `.ai/knowledge/` for any files not referenced in this SYSTEM.md routing table. Alert if found.

If `.ai/logs/session-state.md` exists, read it first — it means the previous session ended mid-task.

---

## 1. Knowledge Base Structure

```
.ai/
  SYSTEM.md                      This file — agent operating rules
  knowledge/
    os-guidelines.md             Language, tone, vocabulary rules (from MobiscrollOS)
    web-system-analysis.md       Reference: how the web monorepo AI system works
    [topic].md                   Future: additional topic-specific rules
  logs/
    manifest.json                 Index of open/finalized logs since 2026-08-12 (branch,
                                  filesTouched, topicSlug, commitHash) — read this first
    YYYY-MM-DD_<branch>_<slug>.md  One log per unit of work, since 2026-08-12 (see §2)
    YYYY-MM-DD.md                 Pre-2026-08-12 logs, one per calendar day — frozen,
                                  not backfilled into the manifest
    session-state.md             Written when a session ends mid-task; deleted on resume
    .hook-errors.log             Hook failures (git-ignored) — check if logging/manifest
                                  updates seem to have silently stopped happening
```

Hook automation: `.claude/hooks/post-tool-use-log.js` (`PostToolUse`, matcher `Edit|Write|MultiEdit`)
mechanically keeps `manifest.json` and the current branch's open log file's `filesTouched`
in sync as files are edited, and creates a new log (placeholder topic-slug `pending-topic`)
the first time a branch has no open log. `.claude/hooks/user-prompt-submit.js` and
`.claude/hooks/stop.js` run the undocumented-change check (§Session Start step 5). None of
these write narrative content (`action`/`context`/`outcome`/`learnings`) — that's still
Claude's job, same as before.

### Knowledge file conventions (borrowed from MobiscrollOS)

Every knowledge file must include frontmatter:
```yaml
---
last_updated: YYYY-MM-DD
source: [path to source project if distilled, or "original"]
owner: [human who owns this rule set]
---
```

This frontmatter is required, not optional. Apply it when creating or editing any knowledge file.

When a knowledge file is updated, log the change as a `knowledge-update` action in the daily log.

---

## 2. Agent Log Format and Location

**Location and filename (since 2026-08-12):** `.ai/logs/YYYY-MM-DD_<branch-slug>_<topic-slug>.md`
- `<branch-slug>` — the git branch, non-alphanumeric characters (`/`, etc.) collapsed to `-`
  (e.g. `feature/foo-bar` → `feature-foo-bar`). No branch (rare — direct work on `main`)
  → `main`. Not aggressively truncated — keep it glance-readable; only trim it (never the
  topic-slug) if the combined filename would hit an unreasonable path length.
- `<topic-slug>` — a short (3–6 word) kebab-case description of the actual work, written
  by Claude. The `PostToolUse` hook seeds a new log with the placeholder `pending-topic` the
  moment a branch's first file edit happens in a session with no open log yet — Claude must
  replace that placeholder with a real slug (renaming the file) no later than when the log
  is finalized at commit time.

Pre-2026-08-12 logs use the old `YYYY-MM-DD.md` convention. They are **frozen** — do not
rename, backfill, or re-annotate them. The new convention applies going forward only.

### One commit = one log file

- A log is **open** for the duration of one continuous unit of work: from the first file
  touch (the `PostToolUse` hook creates or appends to it automatically) until that work is
  committed. Multiple tool calls, turns, even resumed sessions append to the same open log.
- A log is **finalized** as part of proposing its commit: write the final entry, confirm
  (and if needed rename) the topic-slug to match the accumulated scope, *then* write the
  commit message referencing that exact filename. Finalizing sets `finalizedAt` and
  `commitHash` on the log's manifest entry.
- **Bundled commit** (multiple open logs finalize into one commit): allowed — list every
  finalized log's path on its own `AI-assisted | session-log:` line in the commit message
  (§5).
- **Split commit** (a human commits partway through one open log's lifespan): the open log
  auto-finalizes against that first commit; a *new* log opens for whatever work continues
  unstaged/uncommitted afterward. A manifest entry's `commitHash` is always a single value —
  a split simply produces a second manifest entry, never a list on one entry.
- Amending or squashing a commit that already has a finalized log: update that same log
  file (append + rename if scope changed) rather than creating a new one. Squashing several
  commits' logs into one: concatenate their entries into one finalized file and note the
  merge in an entry, rather than rewriting history.

### Manifest (`.ai/logs/manifest.json`)

One entry per log file, kept in sync automatically by `.claude/hooks/post-tool-use-log.js`
for the mechanical fields; Claude updates `topicSlug` (on rename) and sets `finalizedAt`/
`commitHash` when proposing the commit:
```json
{
  "file": ".ai/logs/2026-08-12_feature-foo_fix-nav-anchor.md",
  "branch": "feature/foo",
  "baseBranch": "main",
  "date": "2026-08-12",
  "topicSlug": "fix-nav-anchor",
  "filesTouched": ["docs/react/navigation.md"],
  "createdAt": "2026-08-12T13:10:35.580Z",
  "updatedAt": "2026-08-12T13:12:01.000Z",
  "finalizedAt": null,
  "commitHash": null
}
```
An **open** log is any entry with `finalizedAt: null`. Session start filters this file to
the current branch (§Session Start step 2) instead of reading every log body.

**`commitHash` is best-effort, not a gate.** The commit message's `AI-assisted |
session-log:` footer (§5) is the real, durable link — it's part of the commit itself.
`commitHash` is only a convenience backlink the other direction and can't be known until
after the commit exists, so never create a commit just to fill it in. Set `finalizedAt`
when proposing the commit; fill `commitHash` in whenever it's convenient (typically as part
of the next commit that touches anything in `.ai/logs/` anyway). Leaving it `null` for a
while is fine.

### Log file session header

Every log file must open with a one-line session header:
```markdown
# Agent Log — YYYY-MM-DD — [branch] — [action phrase]
```
- `[branch]` — the git branch this work is happening on (e.g., `main`, `docosaurus-v3`)
- `[action phrase]` — imperative-mood description of the main work (e.g., "expand SYSTEM.md with workflow registry", "update eventcalendar React docs"). Matches the file's topic-slug in spirit.

Example: `# Agent Log — 2026-06-16 — docosaurus-v3 — expand AI system with workflow registry`

### Entry format

```
---
timestamp: 2026-06-15T14:30:00Z
action: short description (e.g. "validated page content", "updated knowledge file")
context: what triggered this action (user request, OS change, routine check)
outcome: what changed or was produced (file paths, key decisions)
learnings: anything non-obvious to remember for next time (omit this field if nothing notable)
---
```

### When to write a log entry

After every meaningful action:
- Editing or creating a documentation page
- Running a text validation check
- Updating a knowledge file
- Proposing a commit
- Starting or resuming a complex task
- Discovering a pattern or rule gap

Trivial actions (reading a file to answer a question, one-word typo fix) do not need a log entry.

Note: the `PostToolUse` hook creating/touching a log file is not the same as writing an
entry — it only keeps the file and manifest's `filesTouched` current. Claude still owns
writing the actual `action`/`context`/`outcome`/`learnings` content.

### Human-sourced / undocumented-change entries

`.claude/hooks/user-prompt-submit.js` and `.claude/hooks/stop.js` flag any uncommitted file
not covered by the current branch's open log — this replaces the old "session-start diff
scan" as the detection mechanism (it now runs every turn, not just at session start). When
flagged, log the reconstructed change as:
```
---
timestamp: [time of git commit, or now if still uncommitted]
action: human-change — [file or area]
source: human
context: reconstructed from git diff (no AI session log covered this change)
outcome: [what changed, from git diff --stat / git diff <file>]
---
```
This ensures the log is a complete record of all changes, not only AI-assisted ones.

### Session-state file

If a session ends mid-task, write `.ai/logs/session-state.md`:
```markdown
# Session State — YYYY-MM-DD

## Status
In progress / blocked / waiting for approval

## Task
What was being worked on.

## Progress
What has been done.

## Next step
Exactly what to do when resuming.

## Open questions
Anything needing human input before resuming.
```

Delete `session-state.md` when the task resumes successfully.

---

## 3. Learning Loop

### What gets logged

Every log entry can carry a `learnings` field. Use it for:
- A rule that was unclear and needed interpretation
- A pattern in the docs codebase that's non-obvious (e.g., how shared MDX partials work)
- A validation failure that revealed a systemic issue (not just a one-off)
- A new banned term found in the wild that's not in os-guidelines.md

### How logs feed back into future context

At session start, read the last 7 days of log files. Scan for entries with `learnings` fields.
If a learning generalizes into a rule, move it into the appropriate `.ai/knowledge/*.md` file
and log that knowledge-update as a new action.

**Learning promotion threshold:** If the same type of issue appears 3+ times in logs,
it should be formalized into the knowledge base (not stay in raw logs).

### Knowledge update process

1. Identify a pattern worth capturing (3+ occurrences, or 1 high-severity finding)
2. Add it to the relevant `.ai/knowledge/` file
3. Log the update:
   ```
   action: knowledge-update
   context: [what triggered the update]
   outcome: Added [rule] to os-guidelines.md / web-system-analysis.md
   ```
4. Propose a commit for the knowledge file change separately from doc content changes

---

## 4. Text Validation Pipeline

Run this on all new or edited documentation content before finalizing.

### Rules (in priority order)

**Level: BLOCKING — must fix before proposing a commit**

1. **Banned vocabulary check** — search for all terms in `.ai/knowledge/os-guidelines.md § Banned Vocabulary`. Flag each occurrence individually with location (file + line if possible).
2. **Placeholder check** — search for placeholder patterns: `TODO`, `[PLACEHOLDER]`, `[TBD]`, `[ADD X]`, `…` in content sections (not code examples or headings that are intentionally elliptic).
3. **Missing frontmatter description** — per `writing-docs.md`: every `.md` documentation page must have a `description` field in frontmatter. Flag any missing.
4. **Broken internal link patterns** — check that hash links follow the conventions in `writing-docs.md` (e.g., `#opt-`, `#event-`, `#method-`).

**Level: WARNING — flag but do not block commit**

5. **Discouraged framing** — check for workaround framing patterns from `.ai/knowledge/os-guidelines.md § Discouraged Framing`.
6. **Generic claims** — flag sentences that make unverifiable claims (e.g., "the best", "the fastest") that are not banned vocabulary but are weak copy.
7. **Structural inconsistency** — if the page is part of a series (same component, different framework), check that headings and section order match sibling pages.

### How to invoke

The validation pipeline is manual — run it as part of the review step before every commit proposal.

Validation report format:
```markdown
## Validation Report — [file path]

### BLOCKING
- [line ~N] Found banned term "seamless" in: "...the seamless integration..."
- [frontmatter] Missing `description` field

### WARNING
- [line ~N] Discouraged framing: "previously required workarounds"
- [section: Introduction] Generic claim: "the most flexible solution"

### PASSED
- Frontmatter structure: OK
- Link conventions: OK
```

Log the validation result:
```
action: text-validation
context: [what doc was validated and why]
outcome: [PASSED / N BLOCKING / M WARNING — list them]
learnings: [if a new pattern was found worth capturing]
```

---

## 5. Commit Message Proposal Format

Always propose a commit message. Never commit silently without showing the message first.

### Format

```
type(scope): short imperative summary

- bullet: what changed and why (one bullet per logical change)
- bullet: reference to validation result if it informed the change

AI-assisted | session-log: .ai/logs/YYYY-MM-DD_<branch>_<topic>.md
```

The `AI-assisted | session-log:` line is required on every commit proposed by the agent.
It is the only machine-readable link between a commit and its session log.
Omitting it breaks traceability. Do not omit it.

**Bundled commit** (this commit finalizes more than one open log): repeat the line once
per log, e.g.:
```
AI-assisted | session-log: .ai/logs/2026-08-12_main_fix-typo-a.md
AI-assisted | session-log: .ai/logs/2026-08-12_main_fix-typo-b.md
```

**Types:** `docs`, `fix`, `refactor`, `chore`
(In docs context: `docs` = new or updated content; `fix` = error correction; `refactor` = restructuring without content change; `chore` = system/config)

**Scope:** the component or area affected (e.g., `eventcalendar`, `datepicker`, `react`, `angular`, `getting-started`, `ai-system`)

### Examples

```
docs(eventcalendar): add resource management section to React guide

- Added Resources section covering resource array format and drag-drop
- Removed banned term "seamless" from introduction paragraph
- Validated against os-guidelines.md: PASSED

AI-assisted | session-log: .ai/logs/2026-06-15.md
```

```
chore(ai-system): update os-guidelines with new banned term

- Added "next-level" to banned vocabulary (observed in 3 recent edits)
- Promoted from logs/2026-06-15.md learning entry

AI-assisted | session-log: .ai/logs/2026-06-15.md
```

---

## 6. Behavioral Rules

### Authority hierarchy

1. Human explicit instructions (direct request, CLAUDE.md, writing-docs.md)
2. This SYSTEM.md
3. `.ai/knowledge/*.md` files
4. Default judgment

### On uncertainty

- Consult `.ai/knowledge/os-guidelines.md` first
- If still unclear, ask — do not guess and present it as fact
- Flag uncertainty explicitly in the log entry

### On scope

- Prefer small, logged, reversible actions over large unlogged ones
- One logical change = one commit proposal
- Do not bundle doc content changes with system file changes in the same commit

### On system changes

- Never modify `.ai/SYSTEM.md` during Phase 2 without:
  1. Flagging it explicitly: "SYSTEM CHANGE PROPOSED"
  2. Describing what would change and why
  3. Getting human approval

### On MobiscrollOS or web repo changes

- If notified that OS messaging rules changed: update `os-guidelines.md`, log the knowledge-update, propose a commit
- Do not apply new rules retroactively to existing docs without being asked

---

## 7. Context Routing Table

Load additional context before starting work in these areas:

| Task area | Load before starting |
|---|---|
| Any new documentation page | `writing-docs.md` (project root) |
| Language / tone / vocabulary questions | `.ai/knowledge/os-guidelines.md` |
| System or log format questions | `.ai/knowledge/web-system-analysis.md` |
| Framework-specific content (React, Angular, Vue, JS, jQuery) | The relevant framework's existing pages for structural reference |
| Connect-specific content | `connect/` directory for existing Connect doc structure |
| Versioned docs | `versioned_docs/` for the version being edited |
| Shared partial edit (`docs/_shared/**`) | Check which framework pages import it; change affects all 5 UI frameworks |
| Auto-generated files changed | Generated by spark project; content should not be hand-edited, but the sync is still logged and committed (Workflow B) since 2026-08-12; excluded as standalone llms pages but content appears in API sections |

---

## 8. Workflow Registry

These are the recurring workflows in this project. The AI agent participates in some steps
and is blind to others — this section documents the boundary.

### Workflow A — Docs page update (human or AI)

Steps: edit `docs/` → validate → commit

AI role: full — text validation pipeline (§4), commit proposal (§5)

Note: validate descriptions against `os-guidelines.md` (banned vocab, tone, formality).
The `descriptions:validate` and `descriptions:add` scripts have been removed — validation
is manual, guided by §4 of this file.

---

### Workflow B — Auto-generated file update

Steps: spark project generates files → files land in `docs/**/_auto-generated/`

AI role: full (since 2026-08-12) — the `PostToolUse` hook logs these edits like any other,
and a commit proposal (§5) is required same as Workflow A. These files are still generated
correctly by spark and should not be manually edited — the log/commit is about tracking
*that* the sync happened, not about editing the content. Note: `_auto-generated/` dirs are
excluded as standalone pages from llms scanning, but their content is included in other
pages (e.g. API reference sections).

---

### Workflow C — Skill files update (`npm run copy-skills`)

Steps: `npm run copy-skills` → `static/docs/{fw}/SKILL.md` + `static/copilot-instructions/` updated

AI role: full (since 2026-08-12) — log the sync and propose a commit (§5), same as Workflow A.

Source: `scripts/copy-skills.js` reads from the path specified in `config.json`
(a local machine path pointing to the marketplace project, not tracked in this repo).

After syncing: visually verify `static/docs/{fw}/SKILL.md` content is intact before proposing
the commit. No automated validation exists for these files.

---

### Workflow D — Rules files update (`static/*.mdc`)

Steps: edit `static/*.mdc` or `static/5.35.0/*.mdc` → build (replaceBaseUrlPlugin post-processes)

AI role: detection only — session-start diff scan identifies changes

Key constraint: `{{DOCS_BASE_URL}}` must remain as a placeholder literal in source files.
`replaceBaseUrlPlugin` replaces it with the actual URL at build time. Never hardcode a URL.

Versioning: current (v6.x) and `5.35.0` `.mdc` files are maintained independently.
A v6 update does not automatically require the same change in v5.35.0 — assess whether
the change is version-specific before updating both.

---

### Workflow E — Shared partial edit (`docs/_shared/**/*.mdx`)

Steps: edit `docs/_shared/**/*.mdx` → validate → commit

AI role: full — text validation pipeline (§4), commit proposal (§5)

Scope: every shared partial affects all 5 UI frameworks (React, Angular, Vue, JavaScript,
jQuery), always. After editing, verify that the change works in the context of all 5 frameworks.
Do not edit per-framework copies; always edit the shared source in `_shared/`.

---

### Workflow F — `writing-docs.md` update

Steps: edit `writing-docs.md` → human review

AI role: none directly. `writing-docs.md` is the authority for doc structure conventions.

If session-start diff scan finds `writing-docs.md` changed: re-read it immediately before
doing any documentation work in that session.

---

### Workflow G — Build

Steps: `npm run build` (or `build-dev`, `build-staging`, `build-localdev`) →
Docusaurus build → llms plugins generate per-framework context files →
`strip-jsx.js` removes MDX imports and JSX artifacts from LLM context →
`replaceBaseUrlPlugin` replaces `{{DOCS_BASE_URL}}` in `.mdc` and `CLAUDE.md` files

AI role: none — build is fully automated.

Note: `strip-jsx.js` is the reason MDX imports and JSX components must not appear in
LLM-facing context files. The build output in `build/` is not tracked in git.

---

### Workflow H — Version bump / new release

Steps: new `versioned_docs/`, `versioned_sidebars/`, `.mdc` files, `versions.json`,
`version-map.json` updates — manual process

AI role: none currently.

If asked to assist with a version bump: read `versions.json` and `version-map.json` first.

---

### Workflow I — AI system file update (SYSTEM.md, knowledge files)

Steps: propose change → get human approval → edit → commit to both branches

AI role: full, subject to the SYSTEM CHANGE PROPOSED gate (§6 Behavioral Rules).

After applying to one branch: update the other branch via a fresh commit — never via merge.
`docosaurus-v3` must never be merged into `main`.

---

### Workflow J — Algolia search config update

Steps: edit `search-config.json` / `search-config-dev.json` or `algolia/**` → verify against
`search-config.json` / `.github/workflows/algolia-crawl.yml` (prod) directly.

`.github/workflows/algolia-crawl-dev.yml` (test index `dev_docs_mobiscroll`) was removed
2026-08-03 — it was creating extra Algolia-side costs and dev-index verification isn't needed
day-to-day now that the pipeline is stable. `search-config-dev.json` and the
`dev_docs_mobiscroll` index are untouched; recreate the workflow (same shape as
`algolia-crawl.yml`, minus the confirm gate and schedule) if dev-index testing is needed again.

AI role: full — same treatment as a docs page update (§4 does not apply here since this isn't
documentation copy, but the "verify before mirroring to prod" step is the equivalent gate).

Key constraint: `search-config.json` (prod) and `search-config-dev.json` (dev/test) should be
kept structurally identical except for `index_name` — a fix verified on dev should be mirrored
to prod, not left dev-only, once trusted. Same for the two workflow files: both now run the
identical sentinel/crawl/prune/tag pipeline, so any pipeline-step change to one belongs in the
other too. `algolia-crawl.yml` (prod) additionally runs on a weekly schedule (Monday 03:00
UTC), on top of its manual, confirm-gated trigger. `algolia/generate-v5-anchor-sets.js` is a
one-time script (not part of either workflow) — rerun by hand only if v5.35.0's own docs are
corrected; v5.35.0 is otherwise frozen so this shouldn't need to run often. See
`algolia-search.md` for the full crawl/tagging/pruning flow.

---

## Appendix: Docs Project Structure

```
docs/                    Current version docs (framework subdirectories)
  _shared/               Shared MDX partials used across frameworks
  react/
  angular/
  vue/
  javascript/
  jquery/
connect/                 Mobiscroll Connect documentation
versioned_docs/          Prior version snapshots
src/                     Docusaurus site source
writing-docs.md          Existing doc conventions (link formats, frontmatter rules)
search-config.json       Algolia crawler config — production index (docs_mobiscroll)
search-config-dev.json   Algolia crawler config — test index (dev_docs_mobiscroll)
algolia/                 Algolia post-crawl tooling (anchor diffing, pruning, tagging)
algolia-search.md        Algolia crawl/indexing setup and workflow docs
.github/workflows/       algolia-crawl.yml (prod, weekly + manual) — algolia-crawl-dev.yml
                         (test) removed 2026-08-03, extra Algolia cost; recreatable later
```
