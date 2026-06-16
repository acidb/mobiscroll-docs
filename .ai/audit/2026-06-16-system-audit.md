# System Audit — 2026-06-16

## Summary

The docs AI agent system was bootstrapped on 2026-06-15 and is structurally sound for a day-one system: the key files exist, the log format is being used, and the knowledge base captures the right rules. However, the system has five meaningful gaps that reduce its reliability in practice. The most critical are: (1) commit messages are missing the required `AI-assisted` footer that links commits back to session logs, breaking traceability; (2) knowledge files are missing the frontmatter their own spec requires; (3) there is no mechanism to catch or validate human-made changes outside an AI session; and (4) the learning loop is fully dependent on the agent voluntarily reading past logs — there is no structural enforcement. None of these gaps are blocking for early operation, but they should be fixed before the system is relied on for production documentation work.

---

## 1. Standards Adherence

### File structure
**SYSTEM.md specifies:**
```
.ai/
  SYSTEM.md
  knowledge/
    os-guidelines.md
    web-system-analysis.md
    [topic].md (future)
  logs/
    YYYY-MM-DD.md
    session-state.md (when mid-task)
```

**Actual structure:**
```
.ai/
  SYSTEM.md               ✓
  knowledge/
    os-guidelines.md      ✓
    web-system-analysis.md ✓
  logs/
    2026-03-20.md         ✓ (retroactive)
    2026-03-31.md         ✓ (retroactive)
    2026-04-15.md         ✓ (retroactive)
    2026-04-21.md         ✓ (retroactive)
    2026-04-22.md         ✓ (retroactive)
    2026-04-23.md         ✓ (retroactive)
    2026-05-06.md         ✓ (retroactive)
    2026-05-08.md         ✓ (retroactive)
    2026-06-08.md         ✓ (retroactive)
    2026-06-12.md         ✓ (retroactive)
    2026-06-15.md         ✓
  audit/                  ⚠ Not in spec (added during this audit)
```

**Verdict:** Structure matches spec. The `audit/` directory is a net addition (acceptable).

---

### Log format

**SYSTEM.md specifies** each entry as:
```
---
timestamp: ISO 8601
action: short description
context: what triggered this
outcome: what changed or was produced
learnings: (omit if none)
---
```

**Actual entries:** All entries in all log files follow this format correctly. ✓

**However — two formatting issues found:**

1. **Chronological order violated in 2026-06-15.md.** The bootstrap entry has timestamp `15:00:00Z` but four retroactive entries with timestamps `11:36:00Z`, `12:05:00Z`, `13:21:00Z`, `15:44:00Z`, `16:00:00Z` were appended after it. The file is not in chronological order, which makes it harder to reconstruct the timeline by reading top-to-bottom.

2. **No session header line.** The in-thread conversation during bootstrap raised the idea of adding a one-line session header (e.g., `# Agent Log — 2026-06-15 — AI system bootstrap`) to make log files scannable from the file listing. This was agreed to be a good idea but never written into SYSTEM.md and never applied to existing logs.

---

### Knowledge file frontmatter

**SYSTEM.md § 1 specifies** that every knowledge file should include:
```yaml
---
last_updated: YYYY-MM-DD
source: [path or "original"]
owner: [human who owns this rule set]
---
```

**Actual knowledge files:** Neither `os-guidelines.md` nor `web-system-analysis.md` has this frontmatter. ✗

This is drift between the spec and reality on day one — the spec was written but not applied to the files created in the same session.

---

### Commit messages

**SYSTEM.md § 5 specifies:**
```
type(scope): short imperative summary

- bullet list of what changed and why
- reference to any log entry or validation

AI-assisted | session-log: .ai/logs/YYYY-MM-DD.md
```

**Actual commits (relevant ones):**
- `5d2bf606 chore(ai-system): bootstrap docs AI agent infrastructure` — has bullet body ✓, missing `AI-assisted` footer ✗
- `d3eceaf6 chore(ai-system): add retroactive branch history logs for docosaurus-v3` — missing footer ✗

**Pre-system commits** (before the AI system existed) are not held to this standard.

---

## 2. Traceability & Rollback Readiness

| Scenario | Score (1–5) | Gap / Notes |
|---|---|---|
| What changed on a given date, and why? | 4 | Log files exist per day. Retroactive logs are clearly labeled. Readable. Gap: entries within a day are not guaranteed chronological. |
| Which AI session produced a specific doc change? | 2 | Commits don't carry the `AI-assisted \| session-log:` footer, so there is no machine-readable or human-scannable link from a commit back to its log entry. Must manually cross-reference commit date with log file. |
| Roll back a single doc change without reverting unrelated work? | 3 | Standard git (`git revert <sha>`) works fine if commits are granular. The system recommends one commit per logical change, but doesn't enforce it. No AI-specific tooling needed. Gap: if the agent bundled multiple doc changes in one commit, rollback would be coarser than desired. |
| Roll back an AI knowledge base update without losing subsequent logs? | 2 | Knowledge files are version-controlled ✓. But logs are also version-controlled, so reverting a knowledge commit would not revert the logs that followed it — those remain correct. However, there is no documented procedure for this scenario, and an agent reading the logs after a rollback could be confused by the now-inconsistent history (logs reference a rule that was rolled back). |

---

## 3. Learning Loop

**Pros:**
- `learnings` field is present in the spec and used in practice — both the bootstrap entry and all retroactive entries include substantive learnings (not empty)
- Retroactive logs carry genuinely useful project-specific knowledge (v3 migration patterns, strip-jsx fragility, config-variant update rule) that would directly inform future sessions
- The session start protocol in both `CLAUDE.md` and `SYSTEM.md` explicitly requires reading the last 3 days of logs

**Cons:**
- The learning loop is entirely honor-system. Nothing structurally enforces that the agent reads past logs. If a future session skips the protocol (e.g., user jumps straight to a task), all accumulated learnings are invisible.
- Reading "last 3 days" is too narrow for a project with sporadic activity. The retroactive logs contain the most valuable learnings (v3 migration patterns from March–June) but they fall outside any 3-day window.
- There is no mechanism for the agent to promote a learning from a log entry into a knowledge file without being explicitly told to. The spec says "if the same issue appears 3+ times, formalize it" — but counting occurrences across log files requires deliberate cross-file scanning, which is not in the session protocol.

**Missing:**
- **Validation results are not being logged.** SYSTEM.md § 4 specifies: "Log the validation result" after every text validation run. No validation runs have been logged yet (none have been performed, but the spec should be enforced from the first doc task).
- **The session header** agreed to in conversation is not in the spec and not in the logs.
- **A "last read" marker** — there is no way to know which past logs an agent has already incorporated into its behavior vs. which are new since last session. The agent re-reads the same entries every session.
- **Learning promotion is passive.** There is no scheduled or triggered review to move accumulated log learnings into the knowledge base.

---

## 4. Human Contribution Scenarios

### A. A human adds a new doc page without telling the AI

**Current behavior:** Nothing. The file is committed, deployed, and the AI has no awareness it exists. If the page is missing a frontmatter `description`, no validation catches it. If it uses banned vocabulary, no check flags it.

**Ideal behavior:** The next AI session should be able to scan for new or recently modified files since the last session log, optionally validate them, and log the findings.

**Gap:** High — this is the most common real-world scenario and the system is completely blind to it.

**Proposed solution:** Add a session-start step: run `git log --since="date of last log entry" --name-only` to identify files changed outside AI sessions. Flag them for optional validation. This is low-effort to add to the protocol.

---

### B. A human edits an existing AI-written page

**Current behavior:** Same as A — the edit is invisible to the AI system. If the human introduces a banned term or removes a required frontmatter field, nothing catches it.

**Ideal behavior:** Same as A — the session-start diff scan would surface the change. The agent could optionally re-validate the modified page.

**Gap:** High — same root cause as A.

**Proposed solution:** Same as A (shared solution: git diff scan at session start).

---

### C. A human adds a new section to the knowledge base (.ai/knowledge/)

**Current behavior:** The file is committed. On next session, the agent will not load it unless it's specifically listed in SYSTEM.md or the session routing table. The new knowledge is effectively invisible.

**Ideal behavior:** The session-start protocol should scan `.ai/knowledge/` for files not listed in the routing table and alert the agent (and human) to the gap.

**Gap:** Medium — knowledge files are infrequent, but an unregistered file is a silent no-op.

**Proposed solution:** Add to session protocol: "Check `.ai/knowledge/` for files not referenced in this SYSTEM.md. If found, load them and propose adding them to the routing table."

---

### D. A human reverts an AI commit directly via git

**Current behavior:** The commit is reverted. The AI log entry for the original commit remains unchanged — it correctly records what happened at the time. However, there is no log entry for the revert, so the log history now shows an action whose outcome no longer exists in the codebase. A future agent reading the log will think the change is live when it isn't.

**Ideal behavior:** The log should note that a prior action was reverted. Ideally the agent detects this at session start (via the git diff scan) and appends a revert-acknowledgment entry.

**Gap:** Medium — already observed in practice (the IIS web.config revert on 2026-06-15 is logged because the AI was active in that session, but a human-only revert would not be).

**Proposed solution:** The git diff scan at session start should compare HEAD against the last logged commit hash. If the diff shows a revert of a previously logged change, append a log entry noting the discrepancy.

---

### E. A human and the AI work on the same file in the same day

**Current behavior:** Both changes land in the same log file (if the AI session occurs after the human change). The AI's log entry will describe its own changes correctly. The human's changes are not in the log unless the agent notices them via the git diff scan (which doesn't currently exist).

**Ideal behavior:** The session log should clearly distinguish AI-authored changes from human-authored changes found in the same day.

**Gap:** Low-medium — the risk is a log that implies the AI was responsible for a human change, or misses the human change entirely. Mitigated if the git diff scan is implemented.

**Proposed solution:** Same git diff scan as A/B/D. Flag human-made changes with `source: human` in the log entry.

---

## 5. Prioritized Recommendations

### 1. Add the `AI-assisted | session-log:` footer to all AI commits
**Problem:** Commits cannot be traced back to log entries. The spec requires the footer but it was omitted from the two commits already made.
**Proposed fix:** Apply it going forward. For the two existing commits, add a note in the log that they were made without the footer (no rewriting git history).
**Effort:** Low — one line added to every commit message.
**Risk if not fixed:** Traceability score stays at 2. After dozens of commits, auditing which sessions produced which changes becomes manual and unreliable.

---

### 2. Add frontmatter to knowledge files
**Problem:** `os-guidelines.md` and `web-system-analysis.md` don't have the `last_updated / source / owner` frontmatter specified in SYSTEM.md § 1.
**Proposed fix:** Add frontmatter to both files. Document the convention more explicitly in SYSTEM.md.
**Effort:** Low — 5-minute edit to two files.
**Risk if not fixed:** When OS guidelines are updated (they will be), there's no `last_updated` field to indicate staleness. An agent has no way to know how old the distilled rules are.

---

### 3. Add a session-start git diff scan
**Problem:** Human-made changes (new pages, edits, reverts) are invisible to the AI system. This is the biggest real-world gap.
**Proposed fix:** Add to SYSTEM.md session protocol: "Run `git log --since=<last-log-date> --name-only` and identify files changed outside AI sessions. Log them with `source: human`. Offer to validate any new or modified doc files."
**Effort:** Low (protocol addition) — the agent can run this with existing tools.
**Risk if not fixed:** The system gives false confidence. The log appears comprehensive but silently omits all human contributions.

---

### 4. Expand log-reading window beyond 3 days
**Problem:** "Read the last 3 days of logs" misses the most valuable learnings, which are in older retroactive logs (March–June v3 migration patterns).
**Proposed fix:** Change session protocol to: "Read the last 7 days of logs. Additionally, on first session of a week, scan all logs for entries with `learnings` fields." Or: maintain a separate `learnings-index.md` that aggregates promoted learnings.
**Effort:** Low (protocol change) to medium (if building a learnings index).
**Risk if not fixed:** Accumulated knowledge in older logs is never read and the learning loop is effectively broken for anything older than 3 days.

---

### 5. Add session header to log files
**Problem:** Log files have no one-line description of the session's focus. Scanning the `logs/` directory by filename gives only dates, not content.
**Proposed fix:** Require every log file to open with `# Agent Log — YYYY-MM-DD — [session focus]`. Apply to existing files.
**Effort:** Low.
**Risk if not fixed:** Minor usability issue only — doesn't affect correctness.

---

### 6. Add an unregistered-knowledge-file check to session protocol
**Problem:** A human-added knowledge file is not automatically loaded — it's invisible until registered.
**Proposed fix:** Add to session protocol: "List `.ai/knowledge/` and verify all files are referenced in this SYSTEM.md context routing table. Alert if any are not."
**Effort:** Low.
**Risk if not fixed:** New knowledge contributed by humans is silently ignored.

---

## 6. Proposed System Changes

The following changes to `.ai/SYSTEM.md` are proposed. **Not applied — awaiting approval.**

```diff
 ## Session Start Protocol
 
 On every session start, in this order:
 
 1. Read `.ai/SYSTEM.md` (this file) — reload operating rules
-2. Read `.ai/logs/YYYY-MM-DD.md` for the last 3 days — restore learning context
+2. Read `.ai/logs/YYYY-MM-DD.md` for the last 7 days — restore learning context
+   On the first session of a week, also scan all older log files for entries with a `learnings` field
 3. Read `.ai/knowledge/os-guidelines.md` — reload language and tone rules
 4. Read `.ai/knowledge/web-system-analysis.md` — reload system patterns reference
+5. Run session-start diff scan: `git log --since=<date-of-last-log-entry> --name-only`
+   Identify any files changed outside AI sessions. Log them as `source: human` entries.
+   Offer to validate any new or modified documentation files found.
+6. Check `.ai/knowledge/` for any files not referenced in this SYSTEM.md routing table. Alert if found.
 
 If `.ai/logs/session-state.md` exists, read it first — it means the previous session ended mid-task.

 ## 1. Knowledge Base Structure

 ### Knowledge file conventions (borrowed from MobiscrollOS)
 
 Every knowledge file should include frontmatter:
 ```yaml
 ---
 last_updated: YYYY-MM-DD
 source: [path to source project if distilled, or "original"]
 owner: [human who owns this rule set]
 ---
 ```
+This frontmatter is required, not optional. Apply it when creating or editing any knowledge file.

+### Log file session header
+
+Every log file must open with a one-line session header:
+```markdown
+# Agent Log — YYYY-MM-DD — [one-line session focus]
+```
+The session focus is a short phrase describing the main work of the day (e.g., "AI system bootstrap", "eventcalendar React docs update").

 ## 2. Agent Log Format and Location

+### Human-sourced entries
+
+When the session-start diff scan finds changes made outside an AI session, log them as:
+```
+---
+timestamp: [time of git commit]
+action: human-change — [file or area]
+source: human
+context: reconstructed from git log
+outcome: [what changed, from git diff --stat]
+---
+```
+This ensures the log is a complete record of all changes, not only AI-assisted ones.

 ## 5. Commit Message Proposal Format

 ### Format
 
 ```
 type(scope): short imperative summary
 
 - bullet: what changed and why (one bullet per logical change)
 - bullet: reference to validation result if it informed the change
 
 AI-assisted | session-log: .ai/logs/YYYY-MM-DD.md
 ```
+
+The `AI-assisted | session-log:` line is required on every commit proposed by the agent.
+It is the only machine-readable link between a commit and its session log.
+Omitting it breaks traceability. Do not omit it.
```
