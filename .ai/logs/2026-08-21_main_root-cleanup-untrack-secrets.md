# Agent Log — 2026-08-21 — main — clean up stray root files, untrack committed secrets

---
timestamp: 2026-08-21T15:30:00Z
action: root-directory audit
context: user asked to check the repo root for files that shouldn't be there
outcome: found .env/.env-dev tracked in git with a live Algolia APPLICATION_ID/API_KEY,
  a stray search-config-min.txt, two undocumented one-off reports
  (docusaurus-migration-report.md, llms-plugin-fixes-report.md), an undocumented but
  real Server/ deploy-scripts directory, and an undocumented GENERATE-SKILLS.md
learnings: .gitignore only excluded .env.local-style variants, not plain .env/.env-dev —
  worth double-checking new env file conventions against actual filenames used, not just
  the *.local pattern
---

---
timestamp: 2026-08-21T15:45:00Z
action: git rm --cached .env .env-dev search-config-min.txt
context: these were tracked in git; .env carries a live Algolia key that should never have
  been committed
outcome: files remain on disk (confirmed via git status showing them as untracked, not
  deleted-from-disk), removed from the index; added .env, .env-dev, search-config-min.txt
  to .gitignore
learnings: user opted not to rewrite git history for the exposed key — rotating the key on
  Algolia's side is a separate manual step for the user, out of scope for this repo change
---

---
timestamp: 2026-08-21T15:50:00Z
action: archived stray reports
context: docusaurus-migration-report.md and llms-plugin-fixes-report.md had no live code
  references (only mentions in frozen pre-2026-08-12 .ai/logs/*.md entries, which were left
  untouched per the frozen-logs rule)
outcome: git mv'd both into new .ai/logs/archive/ directory
---

---
timestamp: 2026-08-21T15:55:00Z
action: updated CLAUDE.md repository structure
context: Server/ and GENERATE-SKILLS.md existed but weren't documented; .ai/logs/archive/
  is new
outcome: added entries for Server/, GENERATE-SKILLS.md, and .ai/logs/archive/ to the
  Repository Structure tree in CLAUDE.md
---
