# How to write documentation

## Conventions

### Links

Prefixes for hash links:
* #opt- for options
* #event- for events
* #method- for methods
* #renderer- for render functions
* #template- for template references in angular
* #slot- for vue slots

When writing **option references** include the option name __only__ to the link text. Always put the option name in code tags.
For example:
```markdown
Use [`view`](#opt-view) option instead of [`view` option](#opt-view)
```

When writing **event references**, the vue text is a bit different than the other frameworks, but the link hash is the same.
For example:
```markdown
In vue the [`@page-loading`](#event-onPageLoading) event is used.

In react the [`onPageLoading`](#event-onPageLoading) event is used.
```

## Overwriting table of contents

The table of contents is not parsed deeply when importing shared sections. The missing table of content items can be imported then exported as `toc` variable.

```js
import EventDataStructure from '../../_shared/eventcalendar/event-data-structure.mdx';
import { toc as dataTOC } from '../../_shared/eventcalendar/event-data-structure.mdx';

export const toc = [...dataTOC,
 { value: 'Local Data', level: 2, id: 'local-data'},
 { value: 'Remote Data', level: 2, id: 'remote-data'},
 { value: 'On demand loading', level: 2, id: 'on-demand-loading'}
];
```

In this case other headers on the page need to be changed to header tags, like `h2` or `h3`. The exported `toc` will take precedence this way.

### Description in frontmatter for llms plugin

Every Markdown file (.md) that is rendered as a documentation page (i.e. not shared partials or auto-generated content) must include a description field in its frontmatter.

This description is required by the llms plugin and is used when generating the llms.txt and related files, helping AI tools understand when the page is relevant.

```js
---
sidebar_position: 6
sidebar_label: Accessibility
displayed_sidebar: javascriptSidebar
title: Accessibility
description: Keyboard navigation, screen reader support, and ARIA conventions shared across all Mobiscroll JavaScript components.
---
```

### Marking up component content the llms plugin would otherwise delete

`docusaurus-plugin-llms` (0.5.1+) strips every custom component tag it finds
in generated `.md`/`.txt` output — both self-closing tags and
opening/closing pairs — deleting the tag and everything that made it
useful (its props, and for a self-closing tag, the whole line). For a
component whose entire real content lives in props rather than static
child text (`<DocsLink path="..." />`, `<Parameter name="..." type="...">`,
etc.), or one that's pure UI chrome with real HTML children the plugin
leaves behind untouched (`<ImgComparisonSlider>`), this means its content
**silently disappears from the llms output with no build error** — nobody
is warned, the page just looks fine in the browser and empty to an AI tool.

`scripts/strip-jsx.js` runs after every build and fixes known cases of this
by looking for an `{/* llms:TYPE;param=value;... */}` (or, for a code
fence, `<!-- llms-fence: lang | title -->`) marker placed in the source
right next to the affected tag, and reconstructing plain-text/markdown
content from it. **These markers are opt-in per usage — the plugin does not
detect them on its own.** If you add a new usage of one of the components
below (or introduce a new component with the same problem), you must add
the matching marker yourself, or that content will vanish from llms output.

Marker types currently implemented (see `scripts/strip-jsx.js` for the
exact regex/reconstruction logic — add a new `case` there for a new
component):

| Component / situation | Marker | Behavior |
|---|---|---|
| `<CodeBlock language="js" title="...">` (only needed when the block uses `{props.framework}` substitution — plain fences don't need this) | `<!-- llms-fence: js \| title -->` ... `<!-- /llms-fence -->` around the tag | Rebuilds a normal ` ```js ` fenced block with the title as a bold line above it |
| `<ImgComparisonSlider>` (or any block whose HTML children should be dropped entirely) | `{/* llms:blockremove */}` ... `{/* /llms:blockremove */}` around the tag | Deletes the whole marked block, including any real HTML left behind by the plugin's own tag strip |
| `<DocsUrl path="...">` | `{/* llms:docsurl;path=... */}` right before the tag | `` `https://mobiscroll.com/docs/{path}` `` |
| `<McpUrl />` | `{/* llms:mcpurl */}` | `` `https://mcp.mobiscroll.com/` `` |
| `<McpConfigBlock tool="claude\|cursor\|vscode">` | `{/* llms:mcpconfig;tool=... */}` | A fenced ` ```json ` MCP config block for that tool |
| `<McpCliBlock scope="...">` | `{/* llms:mcpcli;scope=... */}` | A fenced ` ```bash ` `claude mcp add` command |
| `<FileBlock src="...">` | `{/* llms:fileblock;src=... */}` | Inlines the referenced file's content from `static/` |
| `<PostmanRunButton />` | `{/* llms:postmanrun */}` | A `[Run in Postman](...)` link |
| `<DocsLink path="..." filename="...">label</DocsLink>` (self-closing or with a label) | `{/* llms:docslink;path=...;filename=... */}` ... `{/* /llms:docslink */}` wrapping the tag | `[label](https://mobiscroll.com/docs/{path})` |
| `<Parameter name="..." type="..." required defaultValue="...">description</Parameter>` (Connect API docs) | `{/* llms:param;name=...;type=...;required=1;default=... */}` ... `{/* /llms:param */}` wrapping the tag | A `**name** (`type`, required)` header, the description body, and a `**Default:**` line |

Notes:
- Marker params are `;`-separated, not `|` — these markers often sit inside
  GFM table cells, where an unescaped `|` would split into a new column.
- `docslink`/`param` are paired (open + close) because the plugin's strip
  keeps a tag's children but not its attributes — the marker only needs to
  carry what the tag's *attributes* said; the surviving child text is read
  back from between the marker pair. Every other marker here is a single,
  self-contained tag with no children worth preserving.
- If a page with these markers exists in more than one place (a shared
  partial under `docs/_shared/`, or a page mirrored into
  `versioned_docs/`), the markers must be added to every copy — they are
  not inherited automatically.