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
    5. Over-escaped &#123;/&#125; entities that sit inside a fenced code block
       or an inline backtick span, where the escaping was unnecessary (MDX
       doesn't evaluate braces as JSX inside code) and just renders ugly.
    6. Raw <h2/h3/h4 id="..."> HTML heading tags (no other attributes) that
       should be markdown ATX headings with anchor syntax, so they're picked
       up by Docusaurus's auto-generated table of contents.
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


def fix_code_context_entities(path, dry_run=False):
    """
    Unescape &#123;/&#125; back to {/} only where it's safe: inside a fenced
    code block, or inside a single-backtick inline code span on the same
    line. MDX doesn't evaluate braces as JSX inside code, so escaping there
    was unnecessary and just renders as literal "&#123;" in the page.

    Braces escaped in plain prose (e.g. property-list *{...}* type
    annotations) are left untouched — those need to stay escaped or MDX 3's
    acorn parser will try to evaluate them as a JS expression and fail to
    build. `newline=""` on read/write preserves each file's original line
    endings byte-for-byte (this tree is CRLF with no .gitattributes eol rule).
    """
    with open(path, "r", encoding="utf-8", newline="") as f:
        original = f.read()

    lines = original.splitlines(keepends=True)
    in_code = False
    count = 0
    new_lines = []

    for line in lines:
        stripped = line.strip()
        if stripped.startswith("```") or stripped.startswith("~~~"):
            in_code = not in_code
            new_lines.append(line)
            continue

        if in_code:
            new_line = line.replace("&#123;", "{").replace("&#125;", "}")
        else:
            parts = line.split("`")
            if len(parts) > 1 and len(parts) % 2 == 1:
                for i in range(1, len(parts), 2):
                    parts[i] = parts[i].replace("&#123;", "{").replace("&#125;", "}")
                new_line = "`".join(parts)
            else:
                new_line = line

        if new_line != line:
            count += 1
        new_lines.append(new_line)

    content = "".join(new_lines)
    if content != original:
        if not dry_run:
            with open(path, "w", encoding="utf-8", newline="") as f:
                f.write(content)
        return True, count

    return False, 0


HTML_HEADING_RE = re.compile(r'^<h([234]) id="([^"]+)">(.*)</h\1>$')


def fix_html_headings(path, dry_run=False):
    """
    Convert bare <h2/h3/h4 id="..."> tags (no other attributes) to markdown
    ATX headings with anchor syntax, e.g. <h2 id="x">Text</h2> -> ## Text {#x}.
    Only markdown headings feed Docusaurus's auto-generated table of
    contents; raw HTML heading tags are invisible to it.

    The regex requires the closing '>' to immediately follow the id
    attribute, so tags with extra attributes (e.g. className="api-heading",
    used deliberately for font-size styling markdown headings can't express)
    never match and are left untouched.
    """
    with open(path, "r", encoding="utf-8", newline="") as f:
        original = f.read()

    lines = original.splitlines(keepends=True)
    count = 0
    new_lines = []

    for line in lines:
        ending = ""
        body = line
        if body.endswith("\r\n"):
            ending = "\r\n"
            body = body[:-2]
        elif body.endswith("\n"):
            ending = "\n"
            body = body[:-1]

        m = HTML_HEADING_RE.match(body)
        if m:
            level, hid, text = m.groups()
            new_lines.append(f"{'#' * int(level)} {text} {{#{hid}}}{ending}")
            count += 1
        else:
            new_lines.append(line)

    content = "".join(new_lines)
    if content != original:
        if not dry_run:
            with open(path, "w", encoding="utf-8", newline="") as f:
                f.write(content)
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

    # ── Fix 4: unescape &#123;/&#125; when safely inside code context ────────
    for dirpath, _, files in os.walk(root):
        for fname in files:
            if fname.endswith(".md") or fname.endswith(".mdx"):
                fpath = os.path.join(dirpath, fname)
                rel   = os.path.relpath(fpath, BASE)
                changed, count = fix_code_context_entities(fpath, dry_run)
                if changed:
                    report.append((rel, [f"  [code-entity-unescape] {count} line(s)"]))

    # ── Fix 5: raw <h2/h3/h4 id="..."> tags -> markdown headings ─────────────
    for dirpath, _, files in os.walk(root):
        for fname in files:
            if fname.endswith(".md") or fname.endswith(".mdx"):
                fpath = os.path.join(dirpath, fname)
                rel   = os.path.relpath(fpath, BASE)
                changed, count = fix_html_headings(fpath, dry_run)
                if changed:
                    report.append((rel, [f"  [html-heading-to-md] {count} line(s)"]))

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
