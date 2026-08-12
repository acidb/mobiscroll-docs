#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const lib = require(path.join(__dirname, 'lib.js'));

// PostToolUse: mechanically keeps .ai/logs/manifest.json and the current
// branch's open log file in sync with edited files. Cannot write narrative
// (context/outcome) — that still comes from Claude. Signals Claude only when
// a new log was just opened, via exit 2 (the one channel PostToolUse has to
// surface text back to the model).
function main() {
  const payload = lib.readStdinJson();
  const root = payload.cwd || process.cwd();

  const toolName = payload.tool_name;
  if (!['Edit', 'Write', 'MultiEdit'].includes(toolName)) process.exit(0);

  const toolInput = payload.tool_input || {};
  const rawPath = toolInput.file_path;
  if (!rawPath) process.exit(0);

  const relPath = lib.toRelative(root, rawPath);
  if (!relPath || lib.isExcludedPath(relPath)) process.exit(0);

  const branch = lib.getBranch(root);
  if (!branch) process.exit(0);

  let manifest;
  try {
    manifest = lib.loadManifest(root);
  } catch (err) {
    lib.logError(root, 'post-tool-use-log', 'load-manifest', err);
    process.exit(0);
  }

  const nowIso = new Date().toISOString();
  let entry = lib.findOpenEntry(manifest, branch);
  let createdNew = false;

  try {
    if (entry) {
      const files = new Set(entry.filesTouched || []);
      files.add(relPath);
      entry.filesTouched = Array.from(files);
      entry.updatedAt = nowIso;
    } else {
      const date = lib.todayISODate();
      const branchSlug = lib.slugifyBranch(branch);
      const topicSlug = 'pending-topic';
      const fileName = `${date}_${branchSlug}_${topicSlug}.md`;
      const { logDir } = lib.paths(root);
      const filePath = path.join(logDir, fileName);
      const header = `# Agent Log — ${date} — ${branch} — (topic pending, fill in before commit)\n`;
      fs.mkdirSync(logDir, { recursive: true });
      if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, header + '\n');

      entry = {
        file: `.ai/logs/${fileName}`,
        branch,
        baseBranch: null,
        date,
        topicSlug,
        filesTouched: [relPath],
        createdAt: nowIso,
        updatedAt: nowIso
      };
      manifest.logs.push(entry);
      createdNew = true;
    }
    lib.saveManifest(root, manifest);
  } catch (err) {
    lib.logError(root, 'post-tool-use-log', 'write', err);
    process.exit(0);
  }

  if (createdNew) {
    process.stderr.write(
      `Opened a new session log at ${entry.file} for branch "${branch}" (placeholder topic "pending-topic"). ` +
      `Append a real action/context/outcome entry, and rename the file to a descriptive topic-slug when you finalize this log at commit time.\n`
    );
    process.exit(2);
  }

  process.exit(0);
}

main();
