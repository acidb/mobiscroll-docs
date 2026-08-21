# Agent Log — 2026-08-21 — llms-plugin-fix-attempt — auto-enforce the llms marker system via a new hook

---
timestamp: 2026-08-21T11:00:00Z
action: added a PostToolUse hook that auto-inserts or flags missing llms markers on documentation edits
context: user asked for the llms marker system (documented in writing-docs.md this same day) to be enforced automatically going forward, rather than relying on someone remembering it. Investigated the AI agent system first — .ai/SYSTEM.md § 4's text validation pipeline is pure LLM instruction (no script), and every existing hook in .claude/hooks/ only does session-log/manifest bookkeeping keyed on file paths, never inspects content. This is the repo's first content-inspecting hook. User confirmed (after asking about token/performance cost) a split design: auto-insert for mechanically unambiguous components, flag-only for ones needing structural judgment.
outcome: |
  Added:
  - scripts/llms-marker-rules.js — canonical component list (name, marker type, `simple`/
    `blockremove`/`complex` classification), the single source of truth both the new hook and
    (via a pointer comment) strip-jsx.js reference, to prevent drift between detection and
    reconstruction.
  - .claude/hooks/post-tool-use-marker-check.js — new hook, wired onto the existing
    PostToolUse/Edit|Write|MultiEdit matcher in .claude/settings.json. For `simple`
    (DocsUrl, McpUrl, McpConfigBlock, McpCliBlock, FileBlock, PostmanRunButton) and
    `blockremove` (ImgComparisonSlider) components, auto-inserts the exact marker mechanically
    derived from the tag's own attributes. For `complex` components (CodeBlock fence wrapping,
    DocsLink, Parameter), only flags them via exit 2 — never edits. Idempotent (checks for an
    already-present marker either inline before the tag or standalone on the line above it,
    both real conventions already in use, before inserting).
  - .ai/SYSTEM.md § 4 — new "llms marker check (hook-enforced, not manual)" subsection
    documenting the hook as the authoritative rule description, distinct from the manual
    numbered checklist.
  - CLAUDE.md — hooks listing updated to mention the new hook.
  - scripts/strip-jsx.js — one-line comment pointing at the new shared rules file.

  Caught and fixed two real bugs during verification, both before they reached a real commit:
  1. Initial `alreadyMarkedRe` only recognized the marker sitting inline on the *same* line as
     the tag (e.g. postman-collection.md's convention). Running the hook against real,
     already-marked files (connect/getting-started/ai-integration.md,
     docs/react/guides/ai-integration.md) revealed the *other* real convention — marker alone
     on the line *above* the tag — wasn't recognized, so the hook inserted a duplicate marker
     inline right next to the existing one. Caught via `git diff` before staging anything;
     reverted the two files with `git checkout --`, fixed the detection to recognize both forms.
  2. `processComplexRule`'s "already marked" check only recognized `{/* llms:TYPE */}`-style
     markers, not CodeBlock's `<!-- llms-fence -->` HTML-comment form, so it falsely flagged
     already-fenced CodeBlock usages (docs/_shared/timezones/moment_install.mdx) as needing
     attention. Fixed by recognizing both marker families.
  3. A verification sweep across the whole versioned_docs/ tree (meant to be read-only)
     actually mutated 150 real tracked files under frozen, out-of-scope legacy version
     directories (5.29.0, 5.31.0, etc. — not part of the active `onlyIncludeVersions` build),
     auto-inserting blockremove wraps that, while functionally harmless, weren't requested.
     Caught immediately via `git status`, reverted in full with `git checkout -- versioned_docs/`,
     confirmed clean, then re-verified using scratch copies instead of live tracked files for
     the remainder of testing.
  4. After wiring the hook live into .claude/settings.json, editing CLAUDE.md itself triggered
     a false-positive flag: CLAUDE.md's own prose *mentions* component names like
     `<DocsLink>`/`<Parameter>` (documenting the marker system, not using the components), and
     the hook had no directory scope — it ran on every .md/.mdx in the repo. Fixed by
     restricting it to `docs/`, `connect/`, `versioned_docs/` (the only trees where these
     components are ever really used as JSX; confirmed via grep that no prose mentions exist
     inside real doc content).

  Final verification: syntax-checked the hook and rules file; confirmed idempotency (no
  duplicate insertion on re-run); confirmed correct behavior for all three `kind`s
  (auto-insert simple, auto-wrap blockremove, flag-only complex) via scratch test files; swept
  the entire docs/ + connect/ tree (551 files, via scratch copies) and the in-scope
  versioned_docs/version-5.35.0 tree with zero false positives and zero unintended mutations;
  confirmed CLAUDE.md/writing-docs.md/.ai/SYSTEM.md now silently skip.
learnings: |
  This session's own earlier commits used two different, both-legitimate conventions for
  marker placement (inline-before-tag vs. standalone-line-above) without documenting that
  variation explicitly — a detection regex assuming only one of them silently corrupts the
  other. When building a checker/auto-fixer against an existing convention, grep real examples
  across the *whole* codebase first, not just the most recently written one.
  A "verification sweep" that runs a mutating tool against real tracked files isn't read-only
  just because the intent was to only look — test destructive/mutating logic against a scratch
  copy, never the live tree, even during ad-hoc verification.
  A content-inspecting hook needs an explicit directory allowlist scoped to where its target
  patterns actually mean what they're assumed to mean — matching by file extension alone
  (.md/.mdx) is not enough when unrelated repo docs use the same extension and can innocently
  contain the same substrings in prose.
---
