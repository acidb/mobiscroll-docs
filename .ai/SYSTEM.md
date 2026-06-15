# Docs AI Agent — System Definition

Version: 1.0
Created: 2026-06-15
Status: PENDING APPROVAL

This file is the operating contract for the Mobiscroll docs AI agent.
**Do not modify during Phase 2 without flagging as a system change and getting explicit human approval.**

---

## Session Start Protocol

On every session start, in this order:

1. Read `.ai/SYSTEM.md` (this file) — reload operating rules
2. Read `.ai/logs/YYYY-MM-DD.md` for the last 3 days — restore learning context
3. Read `.ai/knowledge/os-guidelines.md` — reload language and tone rules
4. Read `.ai/knowledge/web-system-analysis.md` — reload system patterns reference

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
    YYYY-MM-DD.md                Daily append-log of all agent actions
    session-state.md             Written when a session ends mid-task; deleted on resume
```

### Knowledge file conventions (borrowed from MobiscrollOS)

Every knowledge file should include frontmatter:
```yaml
---
last_updated: YYYY-MM-DD
source: [path to source project if distilled, or "original"]
owner: [human who owns this rule set]
---
```

When a knowledge file is updated, log the change as a `knowledge-update` action in the daily log.

---

## 2. Agent Log Format and Location

**Location:** `.ai/logs/YYYY-MM-DD.md`
One file per calendar day. Entries are appended chronologically within the file.

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

At session start, read the last 3 days of log files. Scan for entries with `learnings` fields.
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

AI-assisted | session-log: .ai/logs/YYYY-MM-DD.md
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
```
