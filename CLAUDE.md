# CLAUDE.md — mobiscroll-docs

## Project

Docusaurus 2.4 documentation site for the Mobiscroll UI component library.
Serves docs for five frameworks: React, Angular, Vue, JavaScript, jQuery.
Also includes a separate Connect docs section (`connect/`).

Deployed at `mobiscroll.com/docs`.

---

## AI Agent — Session Protocol

**This project has an AI agent system. Follow this protocol at the start of every session:**

1. Read `.ai/SYSTEM.md` — loads operating rules, log format, validation pipeline
2. Read `.ai/logs/` for the last 3 days — restores learning context
3. Read `.ai/knowledge/os-guidelines.md` — loads language and tone rules
4. If `.ai/logs/session-state.md` exists, read it first — mid-task resume

**Before finalizing any new or edited documentation content**, run the
text validation pipeline defined in `.ai/SYSTEM.md § 4`.

**After every meaningful action**, append a log entry to `.ai/logs/YYYY-MM-DD.md`.

**Before every commit**, propose a message in the format defined in `.ai/SYSTEM.md § 5`.
Never commit silently.

---

## Context Routing

| Task | Read before starting |
|---|---|
| Any new or edited documentation page | `writing-docs.md` |
| Language, tone, or vocabulary question | `.ai/knowledge/os-guidelines.md` |
| AI system or log format question | `.ai/SYSTEM.md` |
| Connect-specific content | `connect/` for existing structure reference |
| Versioned docs | `versioned_docs/` for the target version |
| Descriptions validation or generation | `scripts/validate-descriptions.js`, `scripts/add-descriptions.js` |

---

## Running the Project

```bash
npm install                    # install dependencies
npm run dev                    # local dev server (localhost config)
npm start                      # standard dev server
npm run build                  # production build + strip-jsx postprocess
npm run build-dev              # dev environment build
npm run descriptions:validate  # check all pages have frontmatter descriptions
npm run typecheck              # TypeScript check
```

---

## Repository Structure

```
docs/                  Current version — framework subdirectories
  _shared/             MDX partials shared across frameworks
  react/
  angular/
  vue/
  javascript/
  jquery/
connect/               Mobiscroll Connect documentation (separate plugin)
versioned_docs/        Snapshots of prior doc versions
versioned_sidebars/    Sidebar configs for prior versions
src/                   Docusaurus site source (theme, components, pages)
static/                Static assets
scripts/               Build utilities (strip-jsx, add/validate descriptions)
.ai/                   AI agent infrastructure
  SYSTEM.md            Agent operating rules (read this every session)
  knowledge/           Language rules, system analysis
  logs/                Per-day agent action logs
writing-docs.md        Doc authoring conventions (links, frontmatter, TOC)
navbar.config.js       Navigation configuration
sidebars.js            Sidebar config for current docs
sidebarsConnect.js     Sidebar config for Connect docs
versions.json          Tracked doc versions
```

---

## Key Conventions

- Every `.md` documentation page must have a `description` in frontmatter (required by the llms plugin)
- Link hash prefixes: `#opt-` options, `#event-` events, `#method-` methods, `#renderer-` render functions, `#slot-` Vue slots
- Shared content lives in `docs/_shared/` — edit there, not in per-framework copies
- Full authoring rules: `writing-docs.md`
