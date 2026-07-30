// One-time script (not part of any recurring workflow). Run by hand whenever the
// v5.35.0-vs-v6 anchor comparison needs refreshing (should be rare: v5.35.0 is frozen,
// so this only needs re-running if v6 removes/renames something that used to overlap).
//
// Usage: node algolia/generate-v5-anchor-sets.js
//
// Scans the auto-generated API reference markdown for both versions, extracts every
// stable anchor id (#opt-, #event-, #method-, #type-, #renderer-, per writing-docs.md's
// link conventions), and writes two artifacts:
//   - v5-anchors.json      every anchor that exists in v5.35.0 (frozen forever)
//   - v5-only-anchors.json v5.35.0 anchors that do NOT exist in v6 (the unique-to-v5 delta)

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');
const V6_ROOT = path.join(REPO_ROOT, 'docs');
const V5_ROOT = path.join(REPO_ROOT, 'versioned_docs', 'version-5.35.0');
const FRAMEWORKS = ['react', 'angular', 'vue', 'javascript', 'jquery'];

const ANCHOR_PATTERN = /\{#((?:opt|event|method|type|renderer)-[^}]+)\}/g;

function walk(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(full);
    }
  }
  return files;
}

function collectAnchors(frameworkRoot) {
  const anchors = new Set();
  for (const framework of FRAMEWORKS) {
    const autoGenDir = path.join(frameworkRoot, framework, '_auto-generated');
    for (const file of walk(autoGenDir)) {
      const content = fs.readFileSync(file, 'utf8');
      let match;
      while ((match = ANCHOR_PATTERN.exec(content)) !== null) {
        anchors.add(match[1]);
      }
    }
  }
  return anchors;
}

const v6Anchors = collectAnchors(V6_ROOT);
const v5Anchors = collectAnchors(V5_ROOT);

const v5AnchorsList = Array.from(v5Anchors).sort();
const v5OnlyAnchorsList = v5AnchorsList.filter((anchor) => !v6Anchors.has(anchor));

fs.writeFileSync(
  path.join(__dirname, 'v5-anchors.json'),
  JSON.stringify(v5AnchorsList, null, 2) + '\n',
);
fs.writeFileSync(
  path.join(__dirname, 'v5-only-anchors.json'),
  JSON.stringify(v5OnlyAnchorsList, null, 2) + '\n',
);

console.log(`v6 anchors found: ${v6Anchors.size}`);
console.log(`v5.35.0 anchors found: ${v5Anchors.size}`);
console.log(`v5.35.0-only anchors (kept in v5 crawl): ${v5OnlyAnchorsList.length}`);
console.log('Wrote algolia/v5-anchors.json and algolia/v5-only-anchors.json');
