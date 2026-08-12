# Agent Log — 2026-08-12 — ai-system-improvements — make manifest.json a local, self-pruning cache

---
timestamp: 2026-08-12T14:51:00Z
action: stopped committing manifest.json; made it a self-pruning local cache
context: user raised a real concern — a single shared, committed manifest.json that every
  branch/contributor appends entries to recreates exactly the git-conflict risk Problem 1
  (date-only log filenames) already existed to fix, just moved onto a new file. Also flagged
  unbounded growth: nothing pruned entries for branches that get merged/deleted.
outcome: gitignored .ai/logs/manifest.json and ran `git rm --cached` on it (kept the local
  file, stopped tracking future changes). Added lib.pruneManifest()/isFileCommitted() to
  .claude/hooks/lib.js — every loadManifest() call now drops any entry whose log file is
  already clean in git (committed) or missing (renamed away from), so the cache only ever
  holds genuinely in-flight work. This also eliminates the finalizedAt/commitHash
  bookkeeping entirely: once a log's file is actually committed, git itself is the answer
  to "is this done", so there's nothing left to backfill after the fact. Removed those two
  fields from new entries (post-tool-use-log.js) and rewrote SYSTEM.md/CLAUDE.md's manifest
  sections accordingly. Historical/past-session context lookup no longer depends on the
  manifest at all — documented as a glob over `.ai/logs/*_*_*.md` filenames + header-line
  read, since branch is already encoded in each log's own header line.
learnings: verified live — editing lib.js itself triggered loadManifest() to prune all 5
  pre-existing (already-committed) entries automatically on the very next hook call, with
  zero manual cleanup. Confirms the self-healing behavior works as designed, not just in
  theory.
---
