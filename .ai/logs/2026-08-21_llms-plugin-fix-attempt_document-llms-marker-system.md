# Agent Log — 2026-08-21 — llms-plugin-fix-attempt — document the llms marker system for developers

---
timestamp: 2026-08-21T09:00:00Z
action: documented the {/* llms:TYPE */} / <!-- llms-fence --> marker system in writing-docs.md and CLAUDE.md
context: user asked whether the marker system added throughout this branch (llms-fence comments, blockremove, docsurl/docslink/param/postmanrun, etc.) was documented anywhere for other developers to find. Checked writing-docs.md, CLAUDE.md, GENERATE-SKILLS.md, and .ai/SYSTEM.md — only the frontmatter `description` requirement was documented; the marker system itself existed only in this branch's session logs and inline strip-jsx.js comments, neither of which a developer writing new content would think to check. User asked for it to be added on this branch (llms-plugin-fix-attempt), to be merged to main later by them.
outcome: |
  Added a new "Marking up component content the llms plugin would otherwise delete" section to
  writing-docs.md, covering: why this matters (0.5.1's blanket tag-strip silently deletes
  props-driven/UI-chrome component content with no build error), the opt-in nature of markers
  (a new component usage needs its own marker or its content vanishes), a full table of every
  marker type currently implemented in scripts/strip-jsx.js (llms-fence, blockremove, docsurl,
  mcpurl, mcpconfig, mcpcli, fileblock, postmanrun, docslink, param) with syntax and behavior for
  each, and notes on the `;`-separated param convention, why docslink/param are paired
  open+close markers vs. single self-contained ones, and that markers must be duplicated across
  every copy of a page (shared partials, versioned_docs mirrors) since they aren't inherited.

  Updated CLAUDE.md: added a Key Conventions bullet pointing at the new writing-docs.md section,
  and expanded the strip-jsx.js line in the Repository Structure listing to mention its marker
  reconstruction role (previously only described as "removes MDX/JSX").
learnings: |
  A multi-session investigation/fix effort can accumulate a lot of load-bearing tribal knowledge
  in session logs and code comments without any of it reaching the developer-facing docs a new
  contributor would actually read. Worth checking writing-docs.md/CLAUDE.md coverage explicitly
  at the end of a branch like this, not just relying on the session log to carry the knowledge
  forward.
---
