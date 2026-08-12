# Agent Log — 2026-08-12 — ai-system-improvements — redesign AI logging/hooks system per audit

---
timestamp: 2026-08-12T13:05:00Z
action: audit — mapped current .ai/ logging system and hook config against 4 known problems
context: user requested an audit-and-propose pass on the AI session-logging system (date-only
  log filenames causing git conflicts, weak 7-day session-start context loading, hooks not
  reliably logging/proposing commits, no detection of undocumented uncommitted changes)
outcome: found both configured hooks (UserPromptSubmit, Stop) were static printf reminder
  strings with no file I/O, git awareness, or PostToolUse hook at all — 100% honor-system.
  Verified against real git log: two recent commits (70ab9676, 7478e2df) already show the
  undocumented-change gap in practice, not just in theory.
learnings: Claude Code PostToolUse hooks cannot inject additionalContext into the model —
  the only channel back to Claude is exit code 2 + stderr, shown as a warning on that tool's
  result. Stop hooks can't reach Claude at all (systemMessage is user-visible only). This
  shaped the whole redesign: mechanical file/manifest writes happen inside the hook scripts
  themselves (no model involvement needed), and UserPromptSubmit remains the one hook whose
  plain stdout Claude actually reads every turn.
---
timestamp: 2026-08-12T13:10:00Z
action: implemented new log filename convention, manifest, and hook automation
context: approved plan — YYYY-MM-DD_<branch>_<topic-slug>.md filenames, one-commit-one-log-file
  lifecycle (open until commit, finalize+rename at commit time), .ai/logs/manifest.json for
  branch-scoped session-start context loading, Node PostToolUse/UserPromptSubmit/Stop hooks
  replacing the inert printf one-liners
outcome: added .claude/hooks/lib.js (shared git/manifest helpers), post-tool-use-log.js
  (creates/appends the open log + manifest entry on Edit|Write|MultiEdit, exit 2 to nudge
  Claude when a new log opens), user-prompt-submit.js and stop.js (undocumented-change
  detection via git status vs. the open log's filesTouched). Rewired .claude/settings.json
  to invoke these via node (exec form) instead of shell printf/date, avoiding the Windows
  Git-Bash/POSIX-date fragility the old hooks implicitly depended on. Updated .ai/SYSTEM.md
  (v1.4) and CLAUDE.md to document the new convention, manifest schema, split/bundled-commit
  handling, and removed the "detection only" exemption for auto-generated/skill-sync
  workflows (B, C) — those now get full logging + commit proposal per user decision.
  Historical YYYY-MM-DD.md logs (28 files, pre-2026-08-12) left untouched, no backfill.
learnings: the hooks' own file-creation edits (lib.js, post-tool-use-log.js, etc.) predated
  .claude/settings.json's rewrite taking effect, so they weren't captured in filesTouched —
  exactly the undocumented-change scenario Problem 4 targets. Confirmed the new
  user-prompt-submit.js/stop.js hooks correctly flagged this gap live (`.claude/settings.json`,
  `.claude/hooks/` reported as uncommitted + unlogged) before this entry backfilled it.
---
timestamp: 2026-08-12T13:25:00Z
action: finalized this log ahead of commit proposal
context: closing out this unit of work per the new open/finalized lifecycle (§2) before
  proposing its commit
outcome: fixed one more bug found during manual verification — git status --porcelain
  collapses new untracked directories into a single "dir/" line, so lib.js's
  gitChangedFiles() now passes --untracked-files=all to expand them, or per-file
  filesTouched coverage checks against a whole directory never match. Manifest entry's
  finalizedAt set now; commitHash to be filled in once the commit actually lands.
---
