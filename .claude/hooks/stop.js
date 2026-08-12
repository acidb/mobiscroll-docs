#!/usr/bin/env node
'use strict';
const path = require('path');
const lib = require(path.join(__dirname, 'lib.js'));

// Stop cannot inject context back into Claude (only a user-visible
// systemMessage), so this is the human-facing backstop: a visible nudge if a
// turn ends with uncommitted changes the open log doesn't cover.
function main() {
  const payload = lib.readStdinJson();
  const root = payload.cwd || process.cwd();

  try {
    const branch = lib.getBranch(root);
    const manifest = lib.loadManifest(root);
    const openEntry = lib.findOpenEntry(manifest, branch);
    const changed = lib.gitChangedFiles(root);
    const covered = new Set(openEntry ? openEntry.filesTouched || [] : []);
    const undocumented = changed.filter(f => f && !covered.has(f) && !lib.isExcludedPath(f));

    if (undocumented.length > 0) {
      process.stdout.write(JSON.stringify({
        systemMessage: `Uncommitted changes with no session-log coverage: ${undocumented.join(', ')}. Ask Claude to log or explain these before committing.`
      }));
    }
  } catch (err) {
    lib.logError(root, 'stop', 'main', err);
  }

  process.exit(0);
}

main();
