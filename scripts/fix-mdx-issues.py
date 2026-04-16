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
    5. Escaped underscore import paths (../\\_auto-generated, ../../\\_shared).
    6. TypeScript type braces in auto-generated docs (acorn expression error):
       - { [key:TYPE]: VALUE } index signatures
       - ) => {prop: type} return type objects
       - Multiline {prop?: type, ...} standalone type definitions
       - Array<*TypeName*> generic notation (unexpected-character error)
    7. <th>Compatibility<label> pattern in accessibility.mdx (tag mismatch).
    8. Multiline <span> in import_styles.mdx (tag mismatch error).
    9. <CodeBlock> JSX syntax in timezone install files (acorn import error).
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
    and _{...}_ braces to prevent MDX 3 from treating them as JSX expressions.

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
            new_line = re.sub(r"_\{", r"_&#123;", new_line)
            new_line = re.sub(r"\}(_)", r"&#125;\1", new_line)
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


def fix_escaped_underscore_import_paths(path, dry_run=False):
    """
    Normalize escaped underscore paths inside ES module import/export lines.

        Auto-generated docs sometimes contain imports like:
            import X from '../\\_auto-generated/foo.md';
            import Y from '../../\\_shared/bar.mdx';

    Some tooling resolves these literally (with the backslash), causing ENOENT.
    This fix rewrites only import/export-from source strings to unescaped `_`.
    """
    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    module_line = re.compile(
        r'^(\s*(?:import|export)\s+[^\'\"]*from\s+[\'\"])([^\'\"]+)([\'\"]\s*;?\s*)$'
    )

    changed = 0
    new_lines = []
    for line in lines:
        match = module_line.match(line)
        if match:
            prefix, source_path, suffix = match.groups()
            if "\\_" in source_path:
                had_newline = line.endswith("\n")
                source_path = source_path.replace("\\_", "_")
                line = f"{prefix}{source_path}{suffix.rstrip()}"
                if had_newline:
                    line += "\n"
                changed += 1
        new_lines.append(line)

    if changed > 0:
        if not dry_run:
            with open(path, "w", encoding="utf-8") as f:
                f.writelines(new_lines)
        return True, changed

    return False, 0


def fix_auto_generated_type_braces(path, dry_run=False):
    """
    Fix TypeScript-style type expressions in auto-generated .md files that
    MDX/acorn tries to parse as JSX expressions or import statements.

    Handles:
    1. { [key:TYPE]: VALUE } index signatures (inline or standalone line)
    2. ) => {prop: type, ...} return type objects at end of function signatures
    3. Multiline {prop?: type, ...} standalone type objects (e.g. snackbar options)
    4. Array<*TypeName*> generic type notation (invalid JSX tag name)
    """
    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    in_code = False
    new_lines = []
    count = 0
    i = 0

    # Single-line patterns applied outside fenced code blocks
    LINE_PATTERNS = [
        # { [key:TYPE]: VALUE } index signatures
        (
            re.compile(r'\{ \[key:\w+\]: [^}]+ \}'),
            lambda m: "&#123;" + m.group(0)[1:-1] + "&#125;",
        ),
        # ) => {prop: value, ...} return type objects at end of line
        (
            re.compile(r'\) => \{([^}]+)\}'),
            lambda m: ") => &#123;" + m.group(1) + "&#125;",
        ),
        # Array<*TypeName*> generic type notation
        (
            re.compile(r"Array<(\*[^*>]+\*)>"),
            lambda m: "Array&lt;" + m.group(1) + "&gt;",
        ),
    ]

    while i < len(lines):
        line = lines[i]

        # Track fenced code blocks
        if re.match(r"^\s*```", line):
            in_code = not in_code
            new_lines.append(line)
            i += 1
            continue

        if in_code:
            new_lines.append(line)
            i += 1
            continue

        # Detect multiline {prop?: type...} standalone type objects.
        # Pattern: line starts with '{' + word char or '?', and has no closing '}'
        if re.match(r"^\{[\w\?]", line) and "}" not in line:
            block = [line]
            j = i + 1
            found = False
            while j < len(lines) and j < i + 10:
                block.append(lines[j])
                if "}" in lines[j]:
                    found = True
                    break
                # Abort if we hit a code fence or heading — not a type block
                if re.match(r"^\s*```", lines[j]) or re.match(r"^#{1,6}\s", lines[j]):
                    block = None
                    break
                j += 1

            if block is not None and found and "}" in block[-1]:
                # Escape the opening '{' and closing '}'
                block[0] = block[0].replace("{", "&#123;", 1)
                last = block[-1]
                idx = last.rfind("}")
                block[-1] = last[:idx] + "&#125;" + last[idx + 1 :]
                new_lines.extend(block)
                count += 1
                i = j + 1
                continue
            # Fall through to single-line processing if block detection failed

        # Apply single-line patterns
        new_line = line
        for pattern, replacement in LINE_PATTERNS:
            result = pattern.sub(replacement, new_line)
            if result != new_line:
                count += 1
                new_line = result

        new_lines.append(new_line)
        i += 1

    if count > 0:
        if not dry_run:
            with open(path, "w", encoding="utf-8") as f:
                f.writelines(new_lines)
        return True, count
    return False, 0


def fix_accessibility_th_label(path, dry_run=False):
    """
    Fix <th className="compatibility-colum-width">Compatibility followed by a
    <label> block in accessibility.mdx files.

    In MDX v3, text immediately after a JSX opening tag followed by block-level
    children triggers a 'paragraph' context error. Wrapping with a React fragment
    <> ... </> and using {' '} for the trailing space resolves this.

    Before (broken):
        <th className="compatibility-colum-width">Compatibility
          <label className="table-hide-wrapper">
            <input type="checkbox" className="table-hide-switch" />
            Show only applicable items
          </label>
        </th>

    After (fixed):
        <th className="compatibility-colum-width">
          <>
            Compatibility{' '}
            <label className="table-hide-wrapper">
              <input type="checkbox" className="table-hide-switch" />
              Show only applicable items
            </label>
          </>
        </th>
    """
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    original = content

    TH_PATTERN = re.compile(
        r'( +)(<th className="compatibility-colum-width">)Compatibility\n'
        r" +<label className=\"table-hide-wrapper\">\n"
        r" +<input type=\"checkbox\" className=\"table-hide-switch\" />\n"
        r" +Show only applicable items\n"
        r" +</label>\n"
        r" +</th>",
        re.MULTILINE,
    )

    def replace_th(m):
        indent = m.group(1)  # Base indentation (e.g. 6 spaces)
        return (
            f'{indent}<th className="compatibility-colum-width">\n'
            f"{indent}  <>\n"
            f"{indent}    Compatibility{{' '}}\n"
            f'{indent}    <label className="table-hide-wrapper">\n'
            f'{indent}      <input type="checkbox" className="table-hide-switch" />\n'
            f"{indent}      Show only applicable items\n"
            f"{indent}    </label>\n"
            f"{indent}  </>\n"
            f"{indent}</th>"
        )

    content = TH_PATTERN.sub(replace_th, content)

    if content != original:
        if not dry_run:
            with open(path, "w", encoding="utf-8") as f:
                f.write(content)
        return True, 1
    return False, 0


def fix_import_styles_span(path, dry_run=False):
    """
    Fix the multiline <span> in versioned import_styles.mdx files that causes
    MDX v3 'end-tag-mismatch' errors.

    The current docs use a single-line <p> element, which MDX handles correctly.
    Convert the multiline <span>...</span> to a single-line <p>...</p>.
    """
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    original = content

    SPAN_PATTERN = re.compile(
        r"<span>For the components to work, you will also need to import the css file "
        r"of the installed library\n"
        r" under the <code>node_modules</code> folder\n"
        r" \(at <code>@mobiscroll/\{props\.framework\}/dist/css/mobiscroll\.min\.css</code>\)\.\n"
        r"</span>",
        re.MULTILINE,
    )

    SPAN_REPLACE = (
        "<p>For the components to work, you will also need to import the css file "
        "of the installed library under the <code>node_modules</code> folder "
        "(at <code>@mobiscroll/{props.framework}/dist/css/mobiscroll.min.css</code>).</p>"
    )

    content = SPAN_PATTERN.sub(SPAN_REPLACE, content)

    if content != original:
        if not dry_run:
            with open(path, "w", encoding="utf-8") as f:
                f.write(content)
        return True, 1
    return False, 0


def fix_codeblock_jsx_to_fenced(path, dry_run=False):
    """
    Convert <CodeBlock language="X" title="Y">...</CodeBlock> JSX syntax to
    standard MDX fenced code blocks (```X title="Y" ... ```).

    This is needed for versioned timezone install files that use an older
    CodeBlock JSX pattern. MDX v3 tries to parse 'import' lines inside JSX
    children as ESM module statements, causing acorn errors when the import
    contains JSX escape sequences like {"\\{"}.

    Also removes 'import CodeBlock from @theme/CodeBlock' import lines.

    Content transformations applied inside the CodeBlock body:
    - {"\\n"} → removed  (newlines are natural in fenced code blocks)
    - {"\\{"} → {        (JSX-escaped opening brace → literal brace)
    - {"\\}"} → }        (JSX-escaped closing brace → literal brace)
    """
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    original = content

    # Remove the CodeBlock theme import line
    content = re.sub(
        r"^import CodeBlock from '@theme/CodeBlock';\n",
        "",
        content,
        flags=re.MULTILINE,
    )

    def convert_codeblock(m):
        lang = m.group(1) or ""
        title = m.group(2)
        body = m.group(3)

        # Replace JSX escape sequences used in the old CodeBlock pattern.
        # Use raw strings so Python doesn't interpret \n, \{, \} as escapes.
        body = body.replace(r"{'\n'}", "")
        body = body.replace(r"{'\{'}", "{")
        body = body.replace(r"{'\}'}", "}")

        body = body.strip()

        fence_header = f"```{lang}"
        if title:
            fence_header += f' title="{title}"'

        return f"{fence_header}\n{body}\n```"

    content = re.sub(
        r'<CodeBlock\s+language="([^"]*)"(?:\s+title="([^"]*)")?>\n([\s\S]*?)\n</CodeBlock>',
        convert_codeblock,
        content,
    )

    if content != original:
        if not dry_run:
            with open(path, "w", encoding="utf-8") as f:
                f.write(content)
        return True
    return False


def fix_indented_fence_unindented_imports(path, dry_run=False):
    """
    Fix code blocks that are inside list items (fence indented by N spaces) but
    whose content lines starting with 'import' or 'export' are at column 1.

    MDX v3's ESM preprocessor scans for import/export at the start of lines
    before markdown parsing. When content inside an indented list-item code fence
    is at column 1, MDX mistakes those lines for top-level ESM imports, causing
    'identifier already declared' or 'acorn' errors.

    Fix: indent those content lines to match the fence's indentation level.

    Example (broken):
      ```jsx           ← fence at 2-space indent
    import { Foo } from 'bar';   ← col 1 — looks like top-level ESM import!
      const x = 1;
      ```

    Example (fixed):
      ```jsx
      import { Foo } from 'bar';   ← now at 2-space indent, safe
      const x = 1;
      ```
    """
    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    in_fence = False
    fence_indent = 0
    new_lines = []
    count = 0

    for line in lines:
        stripped = line.rstrip("\n")

        if not in_fence:
            # Detect an indented opening fence: 1+ spaces then ```
            m = re.match(r"^( {1,})(```+)", stripped)
            if m:
                in_fence = True
                fence_indent = len(m.group(1))
            new_lines.append(line)
        else:
            # Detect closing fence (same or more indentation, same fence chars)
            if re.match(r"^ {0,}" + r"`{3,}", stripped):
                in_fence = False
                fence_indent = 0
                new_lines.append(line)
            else:
                # Content line: if it starts with import/export at col 1
                # and the fence is indented, add the missing indentation.
                if re.match(r"^(import|export) ", stripped) and fence_indent > 0:
                    new_line = " " * fence_indent + line
                    new_lines.append(new_line)
                    count += 1
                else:
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

    # ── Fix 1c: general property brace escaping in docs/versioned docs ────────
    # Covers patterns like _{ ... }_ that can appear in auto-generated renderers
    # and cause MDX/acorn parse errors.
    for dirpath, _, files in os.walk(root):
        for fname in files:
            if not (fname.endswith(".md") or fname.endswith(".mdx")):
                continue

            fpath = os.path.join(dirpath, fname)
            rel = os.path.relpath(fpath, BASE)

            in_docs_scope = rel.startswith("docs" + os.sep) or rel.startswith(
                "versioned_docs" + os.sep
            )
            if not in_docs_scope:
                continue

            changed, count = fix_property_brace_lines(fpath, dry_run)
            if changed:
                report.append((rel, [f"  [outer-property-braces] {count} line(s)"]))

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

    # ── Fix 4: escaped underscore import/export paths ────────────────────────
    for dirpath, _, files in os.walk(root):
        for fname in files:
            if not (fname.endswith(".md") or fname.endswith(".mdx")):
                continue

            fpath = os.path.join(dirpath, fname)
            rel = os.path.relpath(fpath, BASE)

            # Keep scope to docs content, including versioned docs.
            in_docs_scope = rel.startswith("docs" + os.sep) or rel.startswith(
                "versioned_docs" + os.sep
            )
            if not in_docs_scope:
                continue

            changed, count = fix_escaped_underscore_import_paths(fpath, dry_run)
            if changed:
                report.append((rel, [f"  [escaped-underscore-imports] {count} line(s)"]))

    # ── Fix 5: TypeScript type braces in auto-generated docs ─────────────────
    # Handles index signatures { [key:TYPE]: VALUE }, return type objects
    # ) => {prop: type}, multiline type definitions, and Array<*TypeName*>.
    auto_gen_re = re.compile(r"[/\\]_auto-generated[/\\]")

    for dirpath, _, files in os.walk(root):
        for fname in files:
            if not (fname.endswith(".md") or fname.endswith(".mdx")):
                continue

            fpath = os.path.join(dirpath, fname)
            rel = os.path.relpath(fpath, BASE)

            in_docs_scope = rel.startswith("docs" + os.sep) or rel.startswith(
                "versioned_docs" + os.sep
            )
            if not in_docs_scope:
                continue

            if auto_gen_re.search(rel):
                changed, count = fix_auto_generated_type_braces(fpath, dry_run)
                if changed:
                    report.append(
                        (rel, [f"  [auto-gen-type-braces] {count} occurrence(s)"])
                    )

    # ── Fix 6: <th>Compatibility<label> in accessibility.mdx ─────────────────
    # Wraps the text+label pattern in a React fragment to avoid MDX paragraph
    # context errors in versioned accessibility docs.
    for dirpath, _, files in os.walk(root):
        for fname in files:
            if fname != "accessibility.mdx":
                continue

            fpath = os.path.join(dirpath, fname)
            rel = os.path.relpath(fpath, BASE)

            if rel.startswith("versioned_docs" + os.sep):
                changed, _ = fix_accessibility_th_label(fpath, dry_run)
                if changed:
                    report.append((rel, ["  [accessibility-th-label] 1 occurrence(s)"]))

    # ── Fix 7: multiline <span> → single-line <p> in import_styles.mdx ───────
    for dirpath, _, files in os.walk(root):
        for fname in files:
            if fname != "import_styles.mdx":
                continue

            fpath = os.path.join(dirpath, fname)
            rel = os.path.relpath(fpath, BASE)

            if rel.startswith("versioned_docs" + os.sep):
                changed, _ = fix_import_styles_span(fpath, dry_run)
                if changed:
                    report.append((rel, ["  [import-styles-span] 1 occurrence(s)"]))

    # ── Fix 8: <CodeBlock> JSX → fenced code blocks in timezone files ─────────
    # Versioned timezone install files use an older <CodeBlock> JSX pattern
    # with {'\n'}, {'\{'}, {'\}'} escape sequences that cause MDX v3 to
    # misparse 'import' lines as ESM module statements.
    TIMEZONE_FILES = {"dayjs_install.mdx", "luxon_install.mdx", "moment_install.mdx"}

    for dirpath, _, files in os.walk(root):
        for fname in files:
            if fname not in TIMEZONE_FILES:
                continue

            fpath = os.path.join(dirpath, fname)
            rel = os.path.relpath(fpath, BASE)

            if rel.startswith("versioned_docs" + os.sep):
                changed = fix_codeblock_jsx_to_fenced(fpath, dry_run)
                if changed:
                    report.append((rel, ["  [codeblock-to-fenced] converted"]))

    # ── Fix 9: indented fence with unindented import/export lines ─────────────
    # In versioned React docs, some list-item code blocks (indented fence) have
    # import/export lines at column 1. MDX's ESM scanner treats these as
    # top-level module imports, causing duplicate-identifier compile errors.
    for dirpath, _, files in os.walk(root):
        for fname in files:
            if not (fname.endswith(".md") or fname.endswith(".mdx")):
                continue

            fpath = os.path.join(dirpath, fname)
            rel = os.path.relpath(fpath, BASE)

            in_docs_scope = rel.startswith("docs" + os.sep) or rel.startswith(
                "versioned_docs" + os.sep
            )
            if not in_docs_scope:
                continue

            changed, count = fix_indented_fence_unindented_imports(fpath, dry_run)
            if changed:
                report.append(
                    (rel, [f"  [indented-fence-imports] {count} line(s)"])
                )

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
