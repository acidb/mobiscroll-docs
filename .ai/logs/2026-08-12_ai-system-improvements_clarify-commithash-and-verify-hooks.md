# Agent Log — 2026-08-12 — ai-system-improvements — clarify commitHash rule, verify hooks live

---
timestamp: 2026-08-12T13:46:00Z
action: relaxed the commitHash-fill rule in SYSTEM.md
context: user pointed out that requiring a dedicated commit just to fill manifest.json's
  commitHash after every commit would double the commit count — a real friction point, not
  a hypothetical one
outcome: added a note to .ai/SYSTEM.md § 2 clarifying commitHash is best-effort, filled in
  whenever convenient (typically riding along with the next commit that touches .ai/logs/
  anyway), and is never itself a reason to create a commit. The commit-message footer
  remains the durable link; commitHash is only a convenience backlink.
learnings: this SYSTEM.md edit itself triggered the PostToolUse hook to open a fresh log
  (the prior one had just finalized against e9c67ecb, so none was open) — a live,
  unstaged demonstration of the new-log-creation path, not a planned test.
---
timestamp: 2026-08-12T13:50:00Z
action: verified undocumented-change detection live
context: needed to confirm the UserPromptSubmit/Stop hooks actually catch a file changed
  outside any Claude tool call (the exact 70ab9676/7478e2df scenario from real history)
outcome: appended a throwaway blank line to writing-docs.md via a raw shell command (no
  Edit/Write tool call, so PostToolUse never saw it), then ran user-prompt-submit.js — it
  correctly flagged writing-docs.md by name as undocumented. Reverted the throwaway edit
  with git checkout afterward; no real content change there.
---
