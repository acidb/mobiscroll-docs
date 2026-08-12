# Agent Log — 2026-08-12 — ai-system-improvements — backport settingsp anchor fix to other frameworks/versions

---
timestamp: 2026-08-12T14:09:00Z
action: swept the repo for the same {#settingsp} typo, found and fixed it in scope
context: user asked whether the same anchor typo exists elsewhere (docs/ for other
  frameworks, versioned_docs) and whether fixing it could break anything
outcome: grep found {#settingsp} in all 5 frameworks' docs/guides/utility-functions.md
  (react already fixed separately) and in every versioned_docs snapshot
  (5.34.0/5.35.0/6.0.0/6.1.0). Grepped for any inbound link targeting #settingsp anywhere
  in the repo — none found, so retargeting the anchor id breaks no existing links.
  Also flagged a related, separate pre-existing bug: {#format} is used twice on the same
  page (Format-date and Parse-date sections share the id, so only the first is reachable
  by anchor) — user chose to leave that as-is and just fix the settingsp typo (settingsp ->
  settings) rather than give both duplicated params unique ids; that means the Parse-date
  section's settings anchor now collides with Format-date's settings anchor, mirroring the
  same class of issue #format already has. Not fixed further per explicit decision.
  Fixed {#settingsp} -> {#settings} in: docs/{angular,jquery,vue,javascript}/guides/
  utility-functions.md, and versioned_docs/{version-6.1.0,version-5.35.0}/{react,angular,
  vue,javascript,jquery}/guides/utility-functions.md. version-6.0.0 and version-5.34.0 left
  untouched per user's explicit scope choice (not requested).
learnings: explicit {#id} Docusaurus anchors are never auto-deduped across headings on the
  same page — duplicate ids are a real, silent risk on any page with parameter names shared
  across multiple documented functions (this page has two: format, and now settings).
---
