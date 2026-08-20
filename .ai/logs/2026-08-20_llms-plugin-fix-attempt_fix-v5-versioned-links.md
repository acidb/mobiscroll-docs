# Agent Log — 2026-08-20 — llms-plugin-fix-attempt — fix unversioned links in v5.35.0 llms output

---
timestamp: 2026-08-20T18:30:00Z
action: investigated and fixed wrong (unversioned) links inside versioned_docs/version-5.35.0's generated llms output
context: previous commit (9a6e8be2) fixed v5's individual per-page markdown twins colliding with the main docs plugin's output, by adopting docusaurus-plugin-llms's native `versions` option. That commit's config comment flagged a known side effect (links inside v5's generated content point at unversioned/v6 pages) and named three suspected root causes, deferring the fix at the user's request. This entry covers picking that work back up.
outcome: |
  Investigated all three suspected root causes precisely (via direct code reads of
  node_modules/docusaurus-plugin-llms/lib/{index,processor,generator}.js and the actual
  authored `path=` marker params in versioned_docs/version-5.35.0/*/guides/ai-integration.md):

  - Confirmed real bug: the plugin builds `routePrefix` as a bare '/5.35.0' (index.js:484)
    but real Docusaurus routes include baseUrl ('/docs/5.35.0/...'), so `scopeRoutesToVersion`
    always returns zero routes for v5, `resolveDocumentUrl` returns undefined for every v5
    doc, and every v5 page falls into a legacy, version-blind fallback URL-construction
    branch (processor.js:85-141). This is why every cross-reference link in v5's output was
    missing its '5.35.0/' segment.
  - Ruled out: strip-jsx.js's hardcoded DOCS_BASE_URL / marker-reconstructed links. The
    inconsistency originally suspected as a bug is actually correct: `path=5.35.0/...` marker
    params point at genuinely version-specific static files (static/5.35.0/...), while
    unprefixed ones point at static assets intentionally shared/unversioned across all
    versions (static/mobiscroll-ui/SKILL.md, static/copilot-instructions/...). Not a bug.
  - Ruled out: the `.../docs/docs/{fw}/SKILL.md` link pattern. static/docs/{fw}/SKILL.md is
    copied verbatim to build/docs/{fw}/SKILL.md, and since baseUrl is '/docs', the real served
    URL genuinely is mobiscroll.com/docs/docs/{fw}/SKILL.md. Not a bug.
  - Confirmed production (still on the old plugin config) has never had clean versioned links
    either — its file-write path and its links were both derived from the same legacy raw-path
    logic, so they happened to agree at an ugly but self-consistent (non-canonical)
    `/docs/versioned_docs/version-5.35.0/...` URL. Adopting `versions` fixed file placement
    (now at the canonical build/5.35.0/...) but exposed the link bug because the two sides no
    longer agree.
  - Evaluated and rejected patching the plugin at index.js:484 to join baseUrl into
    routePrefix: traced generateIndividualMarkdownFiles (generator.js:234-320) and confirmed
    the per-page write path is `path.join(versionedOutDir, relativePath)`, where
    `versionedOutDir` already contains '5.35.0' (via `versions`' outputSubdir) and
    `relativePath` is derived solely from doc.url with no awareness of outputSubdir. Making
    resolveDocumentUrl succeed would make doc.url also contain '5.35.0/...', and the two would
    stack into build/5.35.0/5.35.0/... — the same doubling bug already hit once with a
    pathTransformation.addPaths workaround, this time from the plugin-patch angle. Confirmed
    with the user (who independently proposed the same self-consistency angle that led here)
    to fix this outside the plugin instead.
  - Implemented fix: added `detectVersionPrefix()` and `rewriteVersionedLinks()` to
    scripts/strip-jsx.js (the existing post-build cleanup pass, already walking every file
    under build/ for unrelated MDX/JSX fixes). For files under build/5.35.0/, it finds
    markdown-style links `](https://mobiscroll.com/docs/<path>)` whose `<path>` doesn't already
    start with '5.35.0/', and rewrites them to insert '5.35.0/' ONLY when the resulting target
    actually exists on disk under build/5.35.0/ — existence-checked against the real build
    output rather than guessed from path shape, so it can never accidentally version a link
    that's correctly unversioned. Skips fenced code blocks. Never touches doc.url or any
    file-write logic, so no doubling risk.
  - Corrected the stale header comment in llms-v5-plugin.config.js, which referenced a
    scripts/fix-v5-links.js that was never actually written — replaced with an accurate
    description of the strip-jsx.js fix and the doubling-risk reasoning for why a
    plugin-level patch was rejected.
  - Verified via full rebuild: every cross-reference link in build/5.35.0/llms-*.txt and the
    individual .md twins now correctly reads .../docs/5.35.0/...; shared/unversioned static
    asset links (copilot-instructions/..., mobiscroll-ui/SKILL.md) remain untouched and
    correct; build/llms-react.txt (v6/unversioned) and build/llms-connect.txt are
    byte-identical before/after (zero effect outside v5); no marker leaks; one remaining
    unversioned link (core-concepts/localization#language-modules in eventcalendar/agenda.md,
    missing even its framework segment) traced to a pre-existing bug in the auto-generated
    partial content itself, identical in both v5 and v6 output — out of scope (auto-generated
    content, per project convention) and correctly left untouched by the existence-checked
    rewrite since neither the versioned nor unversioned form of that specific path exists.
  Files changed: scripts/strip-jsx.js, llms-v5-plugin.config.js.
learnings: |
  A plugin-side fix that looks obviously correct (join baseUrl into routePrefix) can still be
  the wrong choice if a *different* part of the same plugin reuses the same value for an
  unrelated purpose (URL text vs. file-write path) without normalizing between the two. Tracing
  the actual write-path computation (not just the URL-resolution function) before committing to
  a patch caught this before implementation. Post-build text rewrites that are existence-checked
  against real build output (rather than pattern-matched by path shape) are a general and safer
  technique for this whole class of "plugin produced the wrong link" problem, since they can't
  misfire on content that already happens to look similar but is legitimately different.
---
