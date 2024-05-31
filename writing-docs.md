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
