'use strict';
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function readStdinJson() {
  try {
    const data = fs.readFileSync(0, 'utf8');
    if (!data) return {};
    return JSON.parse(data);
  } catch (_) {
    return {};
  }
}

function paths(root) {
  const logDir = path.join(root, '.ai', 'logs');
  return {
    logDir,
    manifestPath: path.join(logDir, 'manifest.json'),
    errorLog: path.join(logDir, '.hook-errors.log')
  };
}

function logError(root, source, context, err) {
  try {
    const { logDir, errorLog } = paths(root);
    fs.mkdirSync(logDir, { recursive: true });
    fs.appendFileSync(errorLog, `[${new Date().toISOString()}] ${source} ${context}: ${err && err.stack ? err.stack : err}\n`);
  } catch (_) {
    // best-effort only — never let error logging itself crash a hook
  }
}

function getBranch(root) {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { cwd: root, encoding: 'utf8' }).trim();
  } catch (_) {
    return null;
  }
}

function slugifyBranch(branch) {
  const slug = branch.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return (slug || 'no-branch').slice(0, 80);
}

function todayISODate() {
  return new Date().toISOString().slice(0, 10);
}

// manifest.json is a LOCAL, gitignored cache, not a shared/committed index — see
// .ai/SYSTEM.md § 2. It only ever needs to describe currently in-flight (uncommitted)
// work, so every load prunes any entry whose log file is already committed (clean in
// git) or missing (renamed/removed). This means entries never need explicit
// finalizedAt/commitHash bookkeeping — once a log's file is actually committed, git
// itself is the source of truth and the entry just disappears on the next load.
function isFileCommitted(root, relPath) {
  try {
    const out = execSync(`git status --porcelain -- "${relPath}"`, { cwd: root, encoding: 'utf8' });
    return out.trim().length === 0;
  } catch (_) {
    return false;
  }
}

function pruneManifest(root, manifest) {
  const { logDir } = paths(root);
  const kept = manifest.logs.filter(l => {
    const abs = path.join(root, l.file);
    if (!fs.existsSync(abs)) return false;
    return !isFileCommitted(root, l.file);
  });
  return { logs: kept };
}

function loadManifest(root) {
  const { manifestPath } = paths(root);
  let manifest;
  try {
    if (!fs.existsSync(manifestPath)) manifest = { logs: [] };
    else {
      const parsed = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      manifest = Array.isArray(parsed.logs) ? parsed : { logs: [] };
    }
  } catch (err) {
    logError(root, 'lib', 'load-manifest', err);
    manifest = { logs: [] };
  }

  try {
    const pruned = pruneManifest(root, manifest);
    if (pruned.logs.length !== manifest.logs.length) saveManifest(root, pruned);
    return pruned;
  } catch (err) {
    logError(root, 'lib', 'prune-manifest', err);
    return manifest;
  }
}

function saveManifest(root, manifest) {
  const { logDir, manifestPath } = paths(root);
  fs.mkdirSync(logDir, { recursive: true });
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
}

function findOpenEntry(manifest, branch) {
  if (!branch) return null;
  return manifest.logs.find(l => l.branch === branch) || null;
}

// Every remaining entry (post-prune) is by definition uncommitted, so coverage is just
// the union of filesTouched across all of this branch's entries — normally just one.
function coveredFiles(manifest, branch) {
  if (!branch) return new Set();
  const files = new Set();
  manifest.logs
    .filter(l => l.branch === branch)
    .forEach(l => (l.filesTouched || []).forEach(f => files.add(f)));
  return files;
}

function toRelative(root, p) {
  if (!p) return p;
  const rel = path.isAbsolute(p) ? path.relative(root, p) : p;
  return rel.split(path.sep).join('/');
}

function isExcludedPath(relPath) {
  return relPath.startsWith('.ai/logs/') || relPath.startsWith('.git/') || relPath.startsWith('build/');
}

function gitChangedFiles(root) {
  try {
    // --untracked-files=all expands new directories into individual file
    // paths instead of one collapsed "dir/" line, so per-file coverage
    // checks against manifest filesTouched work correctly.
    const out = execSync('git status --porcelain --untracked-files=all', { cwd: root, encoding: 'utf8' });
    return out.split('\n').filter(Boolean).map(line => {
      // porcelain short format: 2 status chars + 1 space + path (renames use "old -> new")
      let p = line.slice(3);
      if (p.includes(' -> ')) p = p.split(' -> ').pop();
      p = p.replace(/^"(.*)"$/, '$1');
      return p.split(path.sep).join('/');
    });
  } catch (err) {
    logError(root, 'lib', 'git-status', err);
    return [];
  }
}

module.exports = {
  readStdinJson,
  paths,
  logError,
  getBranch,
  slugifyBranch,
  todayISODate,
  loadManifest,
  saveManifest,
  findOpenEntry,
  coveredFiles,
  toRelative,
  isExcludedPath,
  gitChangedFiles
};
