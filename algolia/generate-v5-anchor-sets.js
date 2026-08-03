// One-time script (not part of any recurring workflow). Run by hand whenever the
// v5.35.0-vs-v6 anchor comparison needs refreshing (should be rare: v5.35.0 is frozen,
// so this only needs re-running if v6 removes/renames something that used to overlap).
//
// Usage: node algolia/generate-v5-anchor-sets.js
//
// Keyed by (page path, anchor), not anchor alone: matching by anchor string alone would
// wrongly treat two pages that happen to reuse the same option/anchor name (e.g. a
// component's base options.md and a per-view options_scheduler.md-style split) as
// interchangeable, which breaks once a page exists on one version's site structure but
// not the other's (confirmed real case: v6 has docs/react/_auto-generated/datepicker/
// options_calendarview.md, currently unused by any real page but with 100% anchor overlap
// against v5.35.0's single datepicker/options.md — matching by anchor alone would have
// let a future v6 page built on that file "present in v5" a page v5.35.0 never had).
//
// For each real page (not the _auto-generated fragment itself) that imports one or more
// _auto-generated partials, resolves those imports and collects the anchors they contain,
// producing a pagePath -> Set<anchor> map per version. Writes two artifacts:
//   - v5-anchors.json      { pagePath: [anchors...] } for every page v5.35.0 has, anchors
//                          restricted to ones v6 ALSO has on that same pagePath (frozen
//                          forever — v5.35.0 never changes)
//   - v5-only-anchors.json { pagePath: [anchors...] } — v5.35.0 (pagePath, anchor) pairs
//                          with no v6 counterpart at that same pagePath (the unique-to-v5
//                          delta, kept when pruning the v5.35.0 crawl)

const fs = require('fs');
const path = require('path');
const { TRACKED_ANCHOR_PREFIXES } = require('./lib');

const REPO_ROOT = path.join(__dirname, '..');
const V6_ROOT = path.join(REPO_ROOT, 'docs');
const V5_ROOT = path.join(REPO_ROOT, 'versioned_docs', 'version-5.35.0');
const FRAMEWORKS = ['react', 'angular', 'vue', 'javascript', 'jquery'];

// Matches every anchor prefix actually used in _auto-generated content (confirmed via a
// full scan, not just the opt/event/method/renderer/slot subset documented in
// writing-docs.md/CLAUDE.md — localization/template/view entries also carry stable anchors).
// Shares its prefix list with lib.js's isTrackedAnchor (used by prune-v5-duplicates.js /
// tag-present-in-v5.js) so the two can't drift apart — this is also why hand-written guide
// headings (e.g. accessibility.md's "1-perceivable") are correctly never extracted here:
// they don't use any of these prefixes, so they're outside this whole comparison entirely.
const ANCHOR_PATTERN = new RegExp(`\\{#((?:${TRACKED_ANCHOR_PREFIXES.join('|')})-[^}]+)\\}`, 'g');
const AUTO_GEN_IMPORT_PATTERN = /from\s+['"]([^'"]*_auto-generated\/[^'"]+\.mdx?)['"]/g;

function walk(dir, extensions) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full, extensions));
    } else if (entry.isFile() && extensions.some((ext) => entry.name.endsWith(ext))) {
      files.push(full);
    }
  }
  return files;
}

function extractAnchors(content) {
  const anchors = new Set();
  let match;
  while ((match = ANCHOR_PATTERN.exec(content)) !== null) {
    anchors.add(match[1]);
  }
  return anchors;
}

function toPagePath(frameworkRoot, framework, pageFile) {
  const relative = path.relative(path.join(frameworkRoot, framework), pageFile);
  return `${framework}/${relative}`.replace(/\\/g, '/').replace(/\.mdx?$/, '');
}

// Builds a pagePath -> Set<anchor> map for one version by resolving each page's
// _auto-generated imports rather than just globbing _auto-generated directly — that's
// what makes this path-aware instead of anchor-only.
function collectPageAnchors(frameworkRoot) {
  const pageAnchors = {};
  for (const framework of FRAMEWORKS) {
    const frameworkDir = path.join(frameworkRoot, framework);
    const pageFiles = walk(frameworkDir, ['.md', '.mdx']).filter(
      (file) => !file.includes(`${path.sep}_auto-generated${path.sep}`) && !file.includes(`${path.sep}_shared${path.sep}`),
    );
    for (const pageFile of pageFiles) {
      const pageContent = fs.readFileSync(pageFile, 'utf8');
      const anchors = new Set();
      let importMatch;
      AUTO_GEN_IMPORT_PATTERN.lastIndex = 0;
      while ((importMatch = AUTO_GEN_IMPORT_PATTERN.exec(pageContent)) !== null) {
        const fragmentPath = path.resolve(path.dirname(pageFile), importMatch[1]);
        if (!fs.existsSync(fragmentPath)) continue;
        const fragmentContent = fs.readFileSync(fragmentPath, 'utf8');
        for (const anchor of extractAnchors(fragmentContent)) {
          anchors.add(anchor);
        }
      }
      if (anchors.size > 0) {
        pageAnchors[toPagePath(frameworkRoot, framework, pageFile)] = anchors;
      }
    }
  }
  return pageAnchors;
}

const v6PageAnchors = collectPageAnchors(V6_ROOT);
const v5PageAnchors = collectPageAnchors(V5_ROOT);

const v5Shared = {};
const v5Only = {};
let v5PairCount = 0;
let sharedPairCount = 0;
let onlyPairCount = 0;

for (const [pagePath, anchors] of Object.entries(v5PageAnchors)) {
  const v6Anchors = v6PageAnchors[pagePath];
  const shared = [];
  const only = [];
  for (const anchor of anchors) {
    v5PairCount++;
    if (v6Anchors && v6Anchors.has(anchor)) {
      shared.push(anchor);
      sharedPairCount++;
    } else {
      only.push(anchor);
      onlyPairCount++;
    }
  }
  if (shared.length > 0) v5Shared[pagePath] = shared.sort();
  if (only.length > 0) v5Only[pagePath] = only.sort();
}

fs.writeFileSync(
  path.join(__dirname, 'v5-anchors.json'),
  JSON.stringify(v5Shared, null, 2) + '\n',
);
fs.writeFileSync(
  path.join(__dirname, 'v5-only-anchors.json'),
  JSON.stringify(v5Only, null, 2) + '\n',
);

console.log(`v5.35.0 (page, anchor) pairs found: ${v5PairCount}`);
console.log(`  shared with v6 at the same page path: ${sharedPairCount}`);
console.log(`  unique to v5.35.0 (kept in v5 crawl): ${onlyPairCount}`);
console.log('Wrote algolia/v5-anchors.json and algolia/v5-only-anchors.json');
