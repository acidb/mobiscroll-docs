# Agent Log — 2026-08-13 — main — add plugin auto-update warning to AI Integration pages

---
timestamp: 2026-08-13T00:00:00Z
action: added ":::warning Plugin skills don't auto-update" admonition to every ai-integration.md Claude Code setup section, right after "Step 2: Install the plugin" and before "Step 3"
context: user request — clarify that installing the mobiscroll plugin snapshots its skills and won't auto-update without enabling marketplace auto-update or running the manual update commands
outcome: edited 16 files — docs/{react,angular,vue,javascript,jquery}/guides/ai-integration.md, versioned_docs/version-6.1.0/{same 5 frameworks}, versioned_docs/version-5.35.0/{same 5 frameworks}, and connect/getting-started/ai-integration.md (inserted after the existing mobiscroll-connect info box, still before Step 3). versioned_docs/version-6.0.0 was intentionally left untouched — not in scope per user request.
learnings: text validation pipeline run — no banned vocabulary, no placeholders, no frontmatter/link changes; all PASSED
---

