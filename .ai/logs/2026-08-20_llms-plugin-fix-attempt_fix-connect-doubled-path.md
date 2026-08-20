# Agent Log — 2026-08-20 — llms-plugin-fix-attempt — fix doubled connect/connect path in llms-connect output

---
timestamp: 2026-08-20T19:15:00Z
action: fixed a doubled `connect/connect/` path in generated llms-connect.txt links and per-page markdown twins
context: while explaining slug frontmatter's effect on llms output (unrelated question), user spotted `.../docs/connect/connect/api/...`-style links in the connect llms output and asked about them
outcome: |
  Root-caused: llms-connect-plugin.config.js had `pathTransformation: { addPaths: ['connect'] }`,
  but the plugin's own fallback URL-construction branch (lib/processor.js, the same branch
  studied for the v5.35.0 versioning bug) already prepends the section's routeBasePath
  ('connect') once automatically whenever a page's route can't be matched by suffix — which is
  every connect page, since their frontmatter slugs (e.g. connect/api/calendars.md has
  `slug: /calendars`) never end in a suffix matching the source file's own path. The manual
  addPaths doubled that same segment, producing build/connect/connect/... for all 18 connect
  API/guide pages, self-consistent between link and file but not matching the real site route
  (real page for calendars.md is /docs/connect/calendars, not
  /docs/connect/connect/api/calendars). Predates this branch entirely — unrelated to the
  versions-based v5.35.0 work, confirmed via git log (present since the file's initial
  versions).

  Fix: removed the redundant `addPaths: ['connect']`, replaced with a comment explaining why
  it's unnecessary. No pathTransformation needed at all for connect, since it doesn't use the
  `versions` option (no outputSubdir/doubling-risk interaction like v5.35.0 had).

  Verified via rebuild: connect/connect pattern count in build/llms-connect.txt and the
  individual .md twins dropped to 0; files now write to build/connect/api/... (single
  segment) matching the links; build/llms-connect-full.txt was never affected (different code
  path, links to it were already correct); v5.35.0 and main docs/ output confirmed unaffected
  by this unrelated config file's change.
learnings: |
  The same failure shape (a manual pathTransformation/addPaths workaround stacking with the
  plugin's own automatic prefix, producing a self-consistent-but-wrong doubled path) can occur
  independently in more than one plugin config in this repo. Worth a quick sweep of any other
  llms-*.config.js for a similar addPaths entry duplicating an implicit routeBasePath/pathPrefix
  next time one of these is touched, rather than assuming it's fixed everywhere just because one
  instance was addressed.
---
