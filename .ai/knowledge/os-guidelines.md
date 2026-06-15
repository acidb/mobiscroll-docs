# OS Guidelines — Distilled from MobiscrollOS

Source: `C:\projects\mobiscroll-os\knowledge\`
Last synced: 2026-06-15

---

## 1. Language & Tone Policy

The canonical source is `mobiscroll-os/knowledge/domains/marketing/strategy/messaging.md`.
Do not maintain a forked copy here — this file distills it for docs use. On conflict, the OS file wins.

### What language to write in

All public-facing documentation is written in **English** (no language spec in OS files; treat as English-only unless told otherwise).

### Formality level

- Clear and direct — no filler, no vague language
- Technical precision over marketing warmth
- Specific claims over generic ones
- Outcomes over feature lists

### Tone principles (from `rules.md`)

- **Clarity over ambiguity**
- **Evidence over assumption**
- Avoid presenting guesses as facts
- Adapt to context — docs are developer-facing; keep them precise and actionable

---

## 2. Banned Vocabulary

These terms are **[BLOCKING]** — flag every occurrence individually. Do not aggregate.

| Banned term | Why |
|---|---|
| seamless / seamlessly | Empty claim; says nothing specific |
| innovative / innovation | Vague superlative |
| cutting-edge | Generic marketing filler |
| best-in-class | Unverifiable superlative |
| empower / empowers / empowering | Cliché; obscures what the product does |
| robust | Overused filler; replace with a specific claim |
| game-changing / game-changer | Hyperbole |
| time-based functionality | Too abstract; use scheduling, planning, calendar, resource management |
| time-based features | Too abstract; name the actual capability |
| temporal systems | Abstract; name the actual domain |
| synergy / synergies | Corporate filler |
| revolutionary / revolutionize | Hyperbole |
| state-of-the-art | Vague and unverifiable |
| world-class | Unverifiable superlative |
| industry-leading | Unverifiable claim |
| next-level | Vague and informal |
| future-proof | Unverifiable promise |
| leverage (as buzzword) | Use "use", "apply", or describe the mechanism |

**Note:** `time-based functionality` is permitted in internal knowledge files as a category label. Never in documentation copy.

---

## 3. Discouraged Framing

These are **[WARNING]** — flag but do not block.

### Workaround framing

Avoid phrases that imply prior Mobiscroll architecture forced bad practices:
- "previously difficult to achieve without workarounds"
- "previously required fragile workarounds"
- "no longer need workarounds"
- "eliminates the need for workarounds"

**Preferred framing — focus on what the capability enables:**
- "makes this pattern easier to implement"
- "brings this capability into the supported API surface"
- "reduces application-side wiring"
- "makes the pattern more ergonomic"
- "common patterns become simpler to compose"

Exception: workaround language is acceptable only when a human has explicitly approved keeping it from source material (e.g., engineering notes, release summaries).

---

## 4. Required Vocabulary / Approved Domain Terms

Use these specific terms for Mobiscroll capability domains (not the banned abstract equivalents):

- **scheduling** (not "time-based functionality")
- **planning**
- **resource management**
- **appointment booking**
- **calendar synchronization**
- **workforce management**
- **event calendar**

---

## 5. Product Positioning Guardrails

From `positioning.md` and `product-philosophy.md`:

- Mobiscroll is a **toolset**, not a rigid opinionated library
- Do NOT position Mobiscroll as SaaS, HR software, booking software, or workforce management software
- Emphasis: flexibility, composability, control for developers, long-term scalability
- Target: engineering-driven teams building complex scheduling/planning experiences
- Not optimized for: simple use cases, plug-and-play expectations

In documentation copy, this means:
- Options and APIs should be described in terms of **what they enable**, not in superlatives
- Configuration flexibility is a feature; describe it specifically
- Avoid suggesting "just use X" — Mobiscroll requires real engineering decisions

---

## 6. Communication Principles (applies to all docs content)

From `messaging.md`:
- Be specific — real examples, not generic patterns
- Focus on outcomes, not features alone
- Adapt to context (the reader is a developer evaluating or integrating Mobiscroll)
- Structured, clear, usable outputs — docs should enable action

From `rules.md`:
- Avoid fabricating capabilities or behavior
- State uncertainty explicitly (e.g., "behavior may vary by framework")
- Produce near-final, actionable content — minimize the number of back-and-forth iterations

---

## 7. Governance Rules (relevant to docs)

From `governance.md`:
- Changes to documentation are **Restricted Actions** — require human approval before publishing
- Agents (this agent) draft and suggest; humans decide
- Any structural change to the docs system must be flagged and approved
- No publishing to public-facing docs without the human having approved the content

---

## 8. Output Quality Self-Check

Before finalizing any documentation content, check:
1. Is this complete? (no placeholder text, no unresolved references)
2. Is this aligned with the defined outcome? (does it match the ticket/task intent?)
3. Is this actionable? (can a developer use this to do something?)
4. Does it pass the banned vocabulary check?
5. Does it match the formality and specificity standard?
