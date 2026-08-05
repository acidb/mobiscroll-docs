#!/usr/bin/env node
// Post-build script: removes stray NUL bytes from generated HTML.
//
// Docusaurus's static-site generation occasionally emits a NUL byte immediately
// before the zero-width space in a heading's hash-link anchor. Root cause not
// isolated to a specific plugin/heading/class — reproduces identically on both
// Windows local builds and the live production site, at a consistent offset
// relative to the start of each page's <article> content, which points to a
// build-toolchain chunk/buffer-boundary artifact rather than anything content-
// specific. See .ai/logs/2026-08-05.md for the full investigation.
//
// A NUL byte has no legitimate place in HTML output, and it silently derails
// lxml-based HTML parsers (notably Algolia's docsearch-scraper: once it hits a
// NUL byte, it drops every element parsed afterward for the rest of that page),
// so any occurrence found here is unconditionally stripped.

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', 'build');

function collectHtmlFiles(dir, result = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectHtmlFiles(full, result);
    } else if (entry.name.endsWith('.html')) {
      result.push(full);
    }
  }
  return result;
}

function stripNulBytes(buffer) {
  let nulCount = 0;
  for (let i = 0; i < buffer.length; i++) {
    if (buffer[i] === 0) nulCount++;
  }
  if (nulCount === 0) return null;

  const cleaned = Buffer.alloc(buffer.length - nulCount);
  let writeIndex = 0;
  for (let i = 0; i < buffer.length; i++) {
    if (buffer[i] !== 0) {
      cleaned[writeIndex++] = buffer[i];
    }
  }
  return { cleaned, nulCount };
}

const files = collectHtmlFiles(BUILD_DIR);
let cleanedFileCount = 0;
let totalNulBytesRemoved = 0;

for (const file of files) {
  const buffer = fs.readFileSync(file);
  const result = stripNulBytes(buffer);
  if (result) {
    fs.writeFileSync(file, result.cleaned);
    cleanedFileCount++;
    totalNulBytesRemoved += result.nulCount;
    console.log(`strip-nul-bytes: removed ${result.nulCount} NUL byte(s) from ${path.relative(BUILD_DIR, file)}`);
  }
}

console.log(`NUL bytes cleaned up in ${cleanedFileCount} file(s) for Algolia search (${totalNulBytesRemoved} byte(s) removed, ${files.length} HTML files scanned).`);
