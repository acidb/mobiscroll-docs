# Agent Log — 2026-08-20 — llms-plugin-fix-attempt — give PostmanRunButton a real link in llms output

---
timestamp: 2026-08-20T20:00:00Z
action: added a llms:postmanrun marker so <PostmanRunButton /> resolves to a real link instead of being silently deleted
context: user noticed the button is currently stripped from llms content with nothing left behind, and asked for the URL to be shown instead
outcome: |
  PostmanRunButton (src/components/Connect/PostmanRunButton.tsx) takes no props — it renders
  a <div> with data-postman-* attributes that Postman's injected button.js turns into a real
  button client-side. It's used in exactly one place, connect/getting-started/postman-collection.md:35,
  as a bare self-closing tag. scripts/strip-jsx.js already listed it in SELF_CLOSING_MDX /
  MULTI_LINE_SELF_CLOSING_START, so the tag was deleted outright with no replacement.

  Applied the same {/* llms:TYPE */} marker pattern already used for docsurl/mcpurl/etc.:
  - connect/getting-started/postman-collection.md: added `{/* llms:postmanrun */}` immediately
    before the tag.
  - scripts/strip-jsx.js: added `postmanrun` to the resolveInlineMarkers switch, plus
    POSTMAN_COLLECTION_UID / POSTMAN_WORKSPACE_ID constants mirroring the component's own,
    returning a markdown link using Postman's own documented "Run in Postman" share-link
    scheme (https://god.gw.postman.com/run-collection/{uid}?action=collection%2Ffork&...) —
    the same URL Postman's site generates for an embeddable button with this UID/workspace
    combination, not a guessed endpoint.

  Verified via rebuild: build/connect/getting-started/postman-collection.md and
  build/llms-connect-full.txt now contain a real, correctly-formed [Run in
  Postman](https://god.gw.postman.com/run-collection/...) link at that spot; no stray marker
  or bare tag remains anywhere in build/; llms-connect.txt (links-only variant, unaffected
  since it doesn't include inline body content) and the main docs/ output are unchanged.
learnings: |
  When a component takes no props and has exactly one call site, there's no constants file to
  read from — the fix has to duplicate the component's own hardcoded values into strip-jsx.js
  directly (with a comment pointing back at the source component so the two don't drift silently
  if the collection/workspace ever changes).
---
