# Agent Log — 2026-08-12 — ai-system-improvements — fix undocumented-change false positive on finalized logs

---
timestamp: 2026-08-12T14:13:00Z
action: fixed a false-positive in the undocumented-change detection
context: after finalizing the react-anchor-fix and backport logs (both still uncommitted,
  waiting on the human to commit), the UserPromptSubmit/Stop hooks started flagging all 15
  of those files as "undocumented" — the coverage check only looked at the currently open
  (non-finalized) manifest entry, so finalizing a log ahead of its commit (the designed,
  normal order of operations) always produced a false alarm in the gap before the commit
  actually happens
outcome: added lib.coveredFiles(manifest, branch) — unions filesTouched across every
  manifest entry for the branch that doesn't yet have a commitHash (open or finalized,
  doesn't matter), instead of just the single open entry. Once a log's commitHash is set,
  its files are actually committed and git status won't show them dirty anyway, so they
  drop out of the check naturally at that point. Updated user-prompt-submit.js and stop.js
  to use it; verified the previously-flagged 15 files no longer appear.
learnings: "open" (finalizedAt null) and "needs coverage" (commitHash null) turned out to
  be two different concepts that the first implementation conflated — worth remembering if
  more coverage-consuming logic gets added later.
---
