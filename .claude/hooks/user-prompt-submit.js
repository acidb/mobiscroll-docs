#!/usr/bin/env node
'use strict';
const path = require('path');
const lib = require(path.join(__dirname, 'lib.js'));

// UserPromptSubmit is the one hook whose stdout Claude actually sees on every
// turn. Used to: (a) point at the branch's currently open log, and (b) flag
// uncommitted changes not covered by any open log (undocumented-change check).
function main() {
  const payload = lib.readStdinJson();
  const root = payload.cwd || process.cwd();

  const date = lib.todayISODate();
  const branch = lib.getBranch(root);
  const manifest = lib.loadManifest(root);
  const openEntry = lib.findOpenEntry(manifest, branch);

  const lines = [];
  lines.push(`[AI SYSTEM] Date: ${date} | Branch: ${branch || 'unknown'} | Open log: ${openEntry ? openEntry.file : 'none yet'}`);
  lines.push('If this is your first response this session: follow the session-start protocol in CLAUDE.md before doing anything else.');

  try {
    const changed = lib.gitChangedFiles(root);
    const covered = new Set(openEntry ? openEntry.filesTouched || [] : []);
    const undocumented = changed.filter(f => f && !covered.has(f) && !lib.isExcludedPath(f));
    if (undocumented.length > 0) {
      lines.push(
        `[AI SYSTEM] Undocumented changes (no open session log covers these): ${undocumented.join(', ')}. ` +
        'Reconstruct what happened from the diff and log or flag it to the human before continuing.'
      );
    }
  } catch (err) {
    lib.logError(root, 'user-prompt-submit', 'undocumented-check', err);
  }

  process.stdout.write(lines.join('\n'));
  process.exit(0);
}

main();
