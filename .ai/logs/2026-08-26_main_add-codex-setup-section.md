# Agent Log — 2026-08-26 — main — add Codex setup section to AI integration docs

---
timestamp: 2026-08-26T00:00:00Z
action: read context files — CLAUDE.md, .ai/SYSTEM.md, .ai/knowledge/os-guidelines.md, writing-docs.md, and all 6 target ai-integration.md pages (5 UI frameworks + Connect)
context: human request to add an OpenAI Codex setup section (plugin + MCP) to the AI integration pages, matching the structure and warnings of the existing Claude Code section
outcome: confirmed the 5 UI-framework ai-integration.md pages are structurally identical (same section order/line numbers, same inline React helper components — DocsUrl, DocsLink, FileBlock, McpUrl, McpConfigBlock, McpCliBlock) and that the Claude Code section text itself is framework-agnostic, so the same Codex section text applies verbatim to all 5. Connect's ai-integration.md has an extra "Routing layer — CLAUDE.md" concept and a "Which tool uses which files?" table with Claude Code rows that needed Codex-specific handling.
learnings: Codex's plugin slash commands are `/plugins ...` (plural), not `/plugin` like Claude Code — confirmed live: `/plugins marketplace add`, `/plugins install`, `/plugins marketplace update` all work; `/plugins update <plugin>@<marketplace>` does not exist ("unrecognized subcommand"); `/reload-plugins` does not exist on Codex (it is a Claude Code command, mistakenly conflated with Codex in some indexed web content). No confirmed single command refreshes an already-installed plugin after a marketplace update — the documented path is `/plugins marketplace update <name>` followed by re-running `/plugins install <plugin>@<marketplace>`. Used this instead of guessing at an unconfirmed update verb.
---

---
timestamp: 2026-08-26T00:05:00Z
action: added "## Codex setup" section (plugin marketplace registration, plugin install, optional manual MCP config via config.toml, verification, how-it-works) to all 5 UI-framework ai-integration.md pages and to connect/getting-started/ai-integration.md
context: human request — same structure and warnings as the Claude Code section, title chosen critically rather than following the suggested "OpenAI Codex" (see outcome)
outcome: |
  Title decision: used "Codex setup" (not "OpenAI Codex setup") for consistency with the sibling headings "Cursor setup" and "Claude Code setup" — neither of those includes the vendor name (Anysphere, Anthropic), so "OpenAI Codex setup" would have been the only heading naming a vendor.
  Files changed:
  - docs/react/guides/ai-integration.md
  - docs/angular/guides/ai-integration.md
  - docs/vue/guides/ai-integration.md
  - docs/javascript/guides/ai-integration.md
  - docs/jquery/guides/ai-integration.md
  - connect/getting-started/ai-integration.md
  Per-file changes (all 6): frontmatter `description` now lists Codex alongside Claude Code/Cursor/Copilot; the "rules layer" paragraph and the data-layer info box now note that Codex, like Claude Code, uses the plugin instead of manual rules files; both Troubleshooting fixes ("AI invents non-existent APIs/endpoints" and "MCP server does not appear") now mention Codex (`codex plugin list`, `/mcp`).
  Connect-only changes: "Which tool uses which files?" table gained two Codex rows (Alternative/AGENTS.md, Plugin); the "Routing layer — CLAUDE.md" heading and paragraph were generalized to "CLAUDE.md / AGENTS.md" covering both tools; the new Codex section includes a Connect-specific "Alternative: manual AGENTS.md routing (no plugin)" subsection that points to the existing downloadable CLAUDE.md as a starting point (no new downloadable AGENTS.md file was authored — flagged as a possible follow-up, not committed to).
  Deliberately did not extend the shared `McpConfigBlock`/`McpCliBlock` React components or the llms marker/strip-jsx system for Codex — the optional manual-MCP-config step is rendered as a plain static markdown/`toml` block using the confirmed production MCP URL `https://mcp.mobiscroll.com/`, avoiding any change to code that is shared across all tool sections and untestable in this session.
  New content required one llms marker: the "Alternative" subsection in the Connect page reuses `<DocsLink path="connect/CLAUDE.md" download>` and was wrapped with `{/* llms:docslink;path=connect/CLAUDE.md */}` / `{/* /llms:docslink */}`, matching the existing usage pattern elsewhere in the same file. No other new component usages were introduced (Codex sections in the 5 UI pages contain plain markdown/code fences only).
---

---
timestamp: 2026-08-26T00:10:00Z
action: text-validation
context: validated all 6 edited ai-integration.md pages against .ai/SYSTEM.md §4 before proposing a commit
outcome: |
  BLOCKING checks — PASSED on all 6 files:
  - Banned vocabulary (os-guidelines.md § Banned Vocabulary): no matches in any file.
  - Placeholder check (TODO / [PLACEHOLDER] / [TBD] / [ADD ...]): no matches.
  - Frontmatter `description`: present in all 6 (pre-existing, edited in place — not removed).
  - Broken internal link patterns: no new #opt-/#event-/#method- style links introduced; new section anchors (#codex-setup) are plain heading anchors, same convention already used for #claude-code-setup.
  WARNING checks:
  - Discouraged framing (workaround language): none found in new content.
  - Generic/unverifiable claims: none found.
  - Structural inconsistency: confirmed via diff that all 5 UI-framework pages have identical `##`/`###` heading structure and order after the edit.
learnings: none new this pass
---

---
timestamp: 2026-08-26T00:12:00Z
action: propose commit
context: human asked for a commit message for this change; edits were written to the working tree via the device bridge (not via git commit — per established session practice, changes are left uncommitted for the human to review and commit)
outcome: commit message drafted and handed to the human as text (see chat), not executed
---

---
timestamp: 2026-08-27T00:00:00Z
action: audit — reviewed docs/vue/guides/ai-integration.md in full (representative of all 5 structurally-identical UI pages, confirmed earlier) for any remaining spots that should mention Codex but don't
context: human asked for a full re-check of one UI page, having flagged a sentence they believed was still Claude-Code-only; that sentence was already fixed (confirmed via fresh device re-stage), so treated as a request for a broader audit
outcome: |
  No edits made this pass (recommendation-only, per human instruction "do not touch the files").
  Confirmed correct as-is (no change needed): the "Which tool uses which files?" table (Cursor/Copilot only — Claude Code and Codex both use the plugin, not files, so no row needed for either); the VS Code `"servers"` vs `"mcpServers"` warning (does not name Codex — correctly so, since Codex's actual config format is TOML `[mcp_servers.name]`, not the JSON key this warning is about); File reference / File contents tables (no Claude Code row, so no Codex row either, same reasoning).
  Two findings recommended but not applied:
  1. Troubleshooting → "AI generates code with the wrong framework" only gives a fix for Cursor/Copilot rule files; Claude Code and Codex users get no guidance for this symptom, even though skill/framework misdetection is equally plausible for them. Pre-existing gap for Claude Code, now doubly relevant with Codex. Recommended addition: point users to verify `resolveEnvironment` detected the right framework and that the matching framework sub-skill (e.g. `mobiscroll-ui-vue`) actually loaded.
  2. "## Architecture overview" intro says "The integration consists of three layers" but only two `###` subsections existed (Data layer, Rules layer) — a pre-existing mismatch unrelated to Codex. Human confirmed the missing third layer is the MCP server and asked for a recommendation on how to add it (see next entry).
learnings: when auditing, always re-fetch and re-read the live file from the device rather than trusting memory of earlier edits — the human's report of stale-looking content matched the deployed site, not the local (already-corrected) file. Confirming state directly avoided a redundant/conflicting re-edit.
---

---
timestamp: 2026-08-27T00:05:00Z
action: added "### Live schema layer — MCP server" section to all 5 UI-framework ai-integration.md pages
context: human approved exact title + content for a new third Architecture-overview layer (resolving the "three layers" / two-heading mismatch from the prior audit), explicitly asked to omit a tool-name table for now, and to add the section without touching anything else
outcome: |
  Files changed:
  - docs/react/guides/ai-integration.md
  - docs/angular/guides/ai-integration.md
  - docs/vue/guides/ai-integration.md
  - docs/javascript/guides/ai-integration.md
  - docs/jquery/guides/ai-integration.md
  (connect/getting-started/ai-integration.md was not touched — it already has an equivalent "Live schema layer — MCP server" section.)
  Inserted `### Live schema layer — MCP server` immediately after the "Which tool uses which files?" table and before `## Cursor setup`, in all 5 files at the identical anchor (confirmed unique per file before editing). Content: unified-server description (same `mobiscroll` server, `Connect`-prefixed tools kept separate), the hosted URL via the existing `<McpUrl />` component, and a line noting it's optional for Cursor/Copilot (Option B only) but bundled/always-on for Claude Code and Codex.
  This is the first use of `<McpUrl />` on any of the 5 UI pages (previously only used on the Connect page) — added its required `{/* llms:mcpurl */}` marker per writing-docs.md's marker table; no new marker type needed, reused the existing `mcpurl` case.
  The Architecture-overview intro sentence ("three layers") is now literally accurate — no wording change needed there, only the missing heading.
learnings: none new this pass
---

---
timestamp: 2026-08-27T00:10:00Z
action: text-validation
context: validated all 5 edited ai-integration.md pages against .ai/SYSTEM.md §4 before proposing a commit
outcome: |
  BLOCKING checks — PASSED on all 5 files: no banned vocabulary, no placeholders, frontmatter `description` intact (unchanged this pass), no new #opt-/#event-/#method- style links.
  WARNING checks — PASSED: no discouraged framing, no generic/unverifiable claims; confirmed via diff that all 5 UI-framework pages still have identical `##`/`###` heading structure and order after the edit.
  llms marker check: one new component usage (`<McpUrl />`), correctly wrapped with `{/* llms:mcpurl */}` in all 5 files — verified by grep, not just assumed from the hook (no hook ran in this session; edits were applied via the device bridge, not local git-tracked Edit).
learnings: none new this pass
---

---
timestamp: 2026-08-27T00:12:00Z
action: propose commit
context: human asked for a commit message for the MCP-layer-section addition
outcome: commit message drafted and handed to the human as text (see chat), not executed
---

---
timestamp: 2026-08-27T00:20:00Z
action: backported both prior changes (Codex setup section + Live schema layer/MCP server section) into versioned_docs/version-5.35.0 and versioned_docs/version-6.1.0, all 5 UI-framework ai-integration.md pages in each
context: human request — bring the last two main-branch commits' worth of changes into both versioned doc snapshots. Connect's ai-integration.md is not versioned (no `connect/` directory exists under versioned_docs) so no versioned Connect changes were needed.
outcome: |
  Files changed (10 total):
  - versioned_docs/version-5.35.0/{react,angular,vue,javascript,jquery}/guides/ai-integration.md
  - versioned_docs/version-6.1.0/{react,angular,vue,javascript,jquery}/guides/ai-integration.md
  Before editing, confirmed version-6.1.0's 5 files were byte-identical copies of main's pre-Codex-edit content (exact size match against the originals read at the start of this session), and version-5.35.0's 5 files differ only in version-specific file paths (`5.35.0/` prefixes on llms/rules-file URLs) and framework-specific prose — none of which overlaps the Codex/MCP-layer edit anchors. Verified this empirically: the same exact-match strings used for the main-branch edits were each found exactly once in all 10 versioned files before any edit was applied (the edit script asserts this and aborts on any mismatch), so the same edit content was applied unchanged across both versions and all 5 frameworks.
  Applied, per file: the "## Codex setup" section (identical to main's), all Codex-related wording additions (frontmatter description, data-layer info box, rules-layer paragraph, two troubleshooting fixes), and the "### Live schema layer — MCP server" section (identical to main's, including its `<McpUrl />` usage and `{/* llms:mcpurl */}` marker).
learnings: when a doc family has version snapshots, check whether pre-edit content is byte-identical to the current version before assuming version-specific wording differences — here it meant one shared edit script could safely target all 10 files instead of hand-adapting content per version.
---

---
timestamp: 2026-08-27T00:25:00Z
action: text-validation
context: validated all 10 versioned ai-integration.md pages against .ai/SYSTEM.md §4 before proposing a commit
outcome: |
  BLOCKING checks — PASSED on all 10 files: no banned vocabulary, no placeholders, frontmatter `description` intact, no new #opt-/#event-/#method- style links.
  WARNING checks — PASSED: no discouraged framing, no generic/unverifiable claims; confirmed via diff that all 5 UI-framework pages within each version set have identical `##` heading structure and order.
  llms marker check: `{/* llms:mcpurl */}` present in all 10 files (grep count = 10, expected 10).
learnings: none new this pass
---

---
timestamp: 2026-08-27T00:27:00Z
action: propose commit
context: human asked for a commit message covering the versioned_docs backport
outcome: commit message drafted and handed to the human as text (see chat), not executed
---
