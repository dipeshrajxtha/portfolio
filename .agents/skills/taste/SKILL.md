---
name: taste
description: >
  Professional UI/UX taste skill for Portfolio 2. Defines the design philosophy,
  visual hierarchy rules, color discipline, typography system, spacing principles,
  motion guidelines, and anti-patterns. Read this before any design decision on Port2.
---

# taste — Professional Design Standards for Portfolio 2

This skill defines the "taste" layer — the design judgment and decision-making framework
that separates a professional portfolio from a generic AI-generated website.

---

## The Core Philosophy

> "Design is not decoration. Every visual decision communicates something."

A professional portfolio should feel like it was made by a person with taste, not a generator.
The goal is INTENTIONAL restraint — fewer things, done exceptionally well.

Reference portfolio aesthetics:
- **Linear.app** — surgical precision, minimal decoration, strong information architecture
- **Stripe** — premium dark/light contrast, editorial quality typography, purposeful motion
- **Vercel** — monochromatic depth, technical confidence, perfect spacing
- **Rauno Freiberg** — micro-detail obsession, Swiss grid influence, quiet confidence

---

## Visual Hierarchy Rules

1. **One focal point per screen view.** Every scroll position should have one thing demanding attention.
2. **Use size, weight, AND color** to establish hierarchy — not just one of them.
3. **Headlines are bold, body is regular** — no medium-weight body text unless it is a label.
4. **Secondary information fades.** Use `--clr-text-muted` generously; never over-light secondary text.
5. **Less is more on mobile.** If something feels cluttered on a 390px screen, it IS cluttered.

---

## Color Discipline

### Do
- Use `--clr-accent` (#6478ff) for: active nav link indicator, CTA hover, section labels, icon highlights
- Use `--clr-neon` (#00f5d4) only as an occasional secondary accent (e.g. a badge dot, a specific icon)
- Use `--grad-accent` only on: primary CTA buttons, headline text-gradient spans, loading bar
- Keep 90% of the UI in the neutral background/surface palette

### Do Not
- Paint a card header, section background, or large element with accent color
- Use more than 2 accent colors in a single component
- Add new colors not defined in the `:root` token set
- Use neon colors on body text

---

## Typography Judgments

### Headlines
- `font-family: var(--font-primary)` — Space Grotesk is used ONLY for display/heading text
- `letter-spacing: -0.02em` for large headings (tighter feels more editorial)
- `line-height: 1.1–1.2` for headlines (not 1.5 — that is body rhythm, not headline rhythm)
- Gradient text (`-webkit-background-clip: text`) only on one word/phrase per section, never a full sentence

### Body Text
- `font-family: var(--font-body)` — Inter at `1rem–1.05rem`
- `line-height: 1.65–1.75`
- `color: var(--clr-text-muted)` for paragraphs — never full-white body text (too harsh on dark bg)
- Maximum paragraph width: `60–70ch` (580–680px) — prevents long-line fatigue

### Labels and Metadata
- `font-family: var(--font-mono)` — JetBrains Mono for labels, tags, section eyebrows
- `font-size: 0.72–0.82rem`
- `letter-spacing: 0.1em–0.3em` with `text-transform: uppercase`
- `color: var(--clr-accent)` for section eyebrow labels, `var(--clr-text-muted)` for metadata

---

## Spacing Judgments

- **Sections:** `clamp(80px, 10vw, 140px)` top/bottom. Generous. Never compress sections.
- **Cards:** minimum `24px` internal padding. Prefer `32px` for featured cards.
- **Between items in a list/grid:** `16px–24px` gap. Never less than 12px.
- **Between a label and a headline:** `8px–12px`. The label serves the headline; they are close.
- **Between a headline and body text:** `16px–20px`.
- **Button padding:** `13px–16px` vertical, `28px–36px` horizontal.

---

## Motion Judgments

### What Motion Should Do
- Confirm an interaction occurred (hover, click)
- Guide the user's eye to new content (entry animations)
- Create a sense of physical space (scroll-linked parallax, subtle transforms)

### What Motion Should NOT Do
- Call attention to itself (flashy, excessive)
- Slow the user down (animations > 600ms feel sluggish)
- Repeat indefinitely without purpose (infinite pulse on non-status elements)

### Timing Reference
| Context | Duration | Easing |
|---------|----------|--------|
| Hover state | 180–250ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Entry animation | 500–700ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Page transition | 400–600ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Spring hover | — | stiffness: 300–400, damping: 25–35 |
| Stagger delay | 55–110ms per child | — |

---

## Component Taste Checklist

Before finalizing any component design, ask:

1. **Is there a clear focal point?** (headline, image, or key number)
2. **Is there enough whitespace?** (squint test — if it looks dense, it is dense)
3. **Are more than 2 accent colors used?** (if yes, reduce)
4. **Does any animation last more than 700ms?** (if yes, reduce)
5. **Does the component look generic/template-like?** (if yes, add a distinctive typographic or structural choice)
6. **Does it look worse on mobile?** (if yes, fix the responsive layout before anything else)
7. **Does it feel like it belongs with the other sections?** (visual consistency check)

---

## Anti-Patterns (Never Do These)

| Anti-Pattern | Why It Feels Unprofessional |
|---|---|
| Pill badge on every card | Looks like a component library demo |
| Colored icon backgrounds on every list item | Visual noise, no hierarchy |
| Section with 3+ competing color gradients | Chaotic, template aesthetic |
| Progress bar as primary skill display | Vague, decorative, overused |
| Animated particle background in every section | Distracting, 2018-era aesthetic |
| Box-shadow stacking (3+ shadows) | Muddy, heavy, amateurish |
| Gradient text on full paragraphs | Illegible, overdone |
| Heavy border-radius on everything (48px+) | App-icon aesthetic, not editorial |
| Spinner/loader on non-loading content | Misuse of loading state |
| Neon text on hero section names | Overdesigned, nightclub aesthetic |
