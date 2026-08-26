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
