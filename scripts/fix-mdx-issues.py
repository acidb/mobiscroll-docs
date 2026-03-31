#!/usr/bin/env python3
"""
fix-mdx-issues.py
-----------------
Fixes common Docusaurus 3.x / MDX 3 compatibility issues in auto-generated
and versioned Mobiscroll documentation files.

Usage:
    python3 scripts/fix-mdx-issues.py [--dry-run] [--path PATH]

Options:
    --dry-run   Show what would be changed without writing files.
    --path PATH Scope fixes to a specific directory (default: entire repo).

Common issues fixed:
    1. Outer *{...}* braces in property type descriptions (acorn error).
    2. Nested { [key:string]: Type } braces inside inline type strings.
    3. Unescaped {args: {...}} callback signatures in prose.
    4. Duplicate `export const toc = [...TOC]` (identifier already declared).
"""

import argparse
import os
import re
import sys

# ── Configuration ─────────────────────────────────────────────────────────────

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ── Helpers ───────────────────────────────────────────────────────────────────

def fix_file(path, transforms, dry_run=False):
    """
    Apply a list of (label, pattern, replacement) transforms to a file.
    Returns (changed: bool, changes: list[str]).
    """
    with open(path, "r", encoding="utf-8") as f:
        original = f.read()

    content = original
    changes = []
    for label, pattern, replacement in transforms:
        new_content = re.sub(pattern, replacement, content)
        if new_content != content:
            count = len(re.findall(pattern, content))
            changes.append(f"  [{label}] {count} occurrence(s)")
            content = new_content

    if content != original:
        if not dry_run:
            with open(path, "w", encoding="utf-8") as f:
                f.write(content)
        return True, changes

    return False, []


def fix_property_brace_lines(path, dry_run=False):
    """
    For lines starting with ' - ' (property list items), escape outer *{...}*
    braces to prevent MDX 3 from treating them as JSX expressions.

    Only targets property description lines — heading anchors like
    {#type-MbscFoo} are left untouched.
    """
    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    in_code = False
    new_lines = []
    count = 0

    for line in lines:
        if line.strip().startswith("```"):
            in_code = not in_code

        if not in_code and line.startswith(" - "):
            new_line = re.sub(r"\*\{", r"*&#123;", line)
            new_line = re.sub(r"\}(\*)", r"&#125;\1", new_line)
            if new_line != line:
                count += 1
                line = new_line

        new_lines.append(line)

    if count > 0:
        if not dry_run:
            with open(path, "w", encoding="utf-8") as f:
                f.writelines(new_lines)
        return True, count

    return False, 0


# ── Fix runners ───────────────────────────────────────────────────────────────

def run_fixes(root, dry_run):
    report = []

    # ── Fix 1 & 1b: eventcalendar/types.md ────────────────────────────────────
    # Fix 1 : nested  { [key:string]: MbscTimelineZoomLevel }  inside values
    # Fix 1b: outer   *{property: type}*  on property list lines
    ZOOM_PATTERN = r"\{ \[key:string\]: MbscTimelineZoomLevel \}"
    ZOOM_REPLACE  = r"&#123; [key:string]: MbscTimelineZoomLevel &#125;"

    types_re = re.compile(r"eventcalendar[/\\]types.*\.md$")

    for dirpath, _, files in os.walk(root):
        for fname in files:
            fpath = os.path.join(dirpath, fname)
            rel   = os.path.relpath(fpath, BASE)

            if types_re.search(fpath) and (
                "docs" + os.sep in rel or "versioned_docs" + os.sep in rel
            ):
                changed1, changes1 = fix_file(
                    fpath,
                    [("zoom-braces", ZOOM_PATTERN, ZOOM_REPLACE)],
                    dry_run,
                )
                changed2, count2 = fix_property_brace_lines(fpath, dry_run)

                if changed1 or changed2:
                    entry_changes = changes1[:]
                    if changed2:
                        entry_changes.append(
                            f"  [outer-property-braces] {count2} line(s)"
                        )
                    report.append((rel, entry_changes))

    # ── Fix 2: unescaped {args: {...}} in drag-and-drop.md ────────────────────
    ARGS_PATTERN = (
        r"\*\(args: \{(container: HTMLElement, position: number, "
        r"dragData: MbscCalendarEvent \| MbscResource, "
        r"afterElement\?: HTMLElement)\}\) => void\*"
    )
    ARGS_REPLACE = r"*(args: &#123;\1&#125;) => void*"

    for dirpath, _, files in os.walk(root):
        for fname in files:
            if fname == "drag-and-drop.md":
                fpath = os.path.join(dirpath, fname)
                rel   = os.path.relpath(fpath, BASE)
                changed, changes = fix_file(
                    fpath,
                    [("args-braces", ARGS_PATTERN, ARGS_REPLACE)],
                    dry_run,
                )
                if changed:
                    report.append((rel, changes))

    # ── Fix 3: duplicate `export const toc = [...TOC]` ────────────────────────
    TOC_EXPORT_PATTERN = r"(?m)^export const toc = \[\.\.\.TOC\];\n"

    for dirpath, _, files in os.walk(root):
        for fname in files:
            if fname.endswith(".md") or fname.endswith(".mdx"):
                fpath = os.path.join(dirpath, fname)
                rel   = os.path.relpath(fpath, BASE)
                changed, changes = fix_file(
                    fpath,
                    [("toc-export", TOC_EXPORT_PATTERN, "")],
                    dry_run,
                )
                if changed:
                    report.append((rel, changes))

    return report


# ── Entry point ───────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Fix Docusaurus 3.x / MDX 3 issues in Mobiscroll docs."
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print what would be changed without modifying files.",
    )
    parser.add_argument(
        "--path",
        default=BASE,
        help="Directory to scan (default: repo root).",
    )
    args = parser.parse_args()

    scan_root = os.path.abspath(args.path)
    mode = "[DRY RUN] " if args.dry_run else ""

    print(f"{mode}Scanning: {scan_root}\n")

    report = run_fixes(scan_root, args.dry_run)

    if not report:
        print("No issues found — nothing to fix.")
        sys.exit(0)

    print(f"{'Would modify' if args.dry_run else 'Modified'} {len(report)} file(s):\n")
    for rel, changes in report:
        print(f"  {rel}")
        for c in changes:
            print(c)

    if args.dry_run:
        print("\nRe-run without --dry-run to apply fixes.")
    else:
        print("\nDone. Run `npm run build` to verify.")


if __name__ == "__main__":
    main()
