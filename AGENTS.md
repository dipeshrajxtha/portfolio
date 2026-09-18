# Portfolio 2 — Agent Design & Development Rules

> **Always read this file before making any change to Portfolio 2.**
> These rules govern ALL design decisions, code changes, testing, and tooling workflows.

---

## 0. Project Overview

| Item | Value |
|------|-------|
| Owner | Dipeshraj Shrestha |
| Framework | Vite + React 19 + Vanilla CSS |
| State | No global state manager — local React state only |
| Styling | Vanilla CSS (component-scoped `.css` files) + design tokens in `src/index.css` |
| Animation | Framer Motion (v12) |
| 3D | Three.js / React Three Fiber / Spline |
| Icons | lucide-react + react-icons |
| Testing | Playwright (Chromium) |
| Linting | oxlint |
| Path Alias | `@/` → `src/` |
| Build | Vite 8 |

---

## 1. Architecture — DO NOT CHANGE

- Do **not** switch to Tailwind CSS, CSS-in-JS, or any other styling system.
- Do **not** add a global state manager (Redux, Zustand, etc.).
- Do **not** restructure the `src/components/` + paired `.css` file pattern.
- Do **not** rename or re-route existing section IDs (`home`, `about`, `skills`, `experience`, `projects`, `contact`).
- Do **not** add new routing (it is a single-page scroll portfolio).
- Do **not** change the Vite config or `@/` alias unless strictly required.
- Do **not** remove `framer-motion` or switch animation libraries.

---

## 2. Design Direction — Portfolio 2 Aesthetic

### 2.1 Target Feel
- **Professional. Premium. Modern. Clean.**
- Intentionally designed — not auto-generated or template-looking.
- Inspired by: Linear.app, Stripe, Vercel, Craft.do, Rauno Freiberg's work.
- Think: a senior developer or designer made this by hand.

### 2.2 Palette (Locked — from `src/index.css`)

```
Background:  #050816 / #0a0f2e
Surface:     #0f1729 / #111827
Accent:      #6478ff (primary) / #a78bfa (secondary) / #38bdf8 (tertiary)
Neon:        #00f5d4
Text:        #e2e8f8 (primary) / #8892b0 (muted) / #4a5568 (dim)
```

### 2.3 Typography (Locked)

| Role | Font | Usage |
|------|------|-------|
| Headings | Space Grotesk | `--font-primary` |
| Body | Inter | `--font-body` |
| Code / labels | JetBrains Mono | `--font-mono` |

- **Always** use the CSS variables (`var(--font-primary)` etc.), not hardcoded strings.
- Section titles: `clamp(2.2rem, 5vw, 3.8rem)`, `font-weight: 700`, `letter-spacing: -0.02em`.
- Body text: `1rem-1.1rem`, `line-height: 1.65-1.75`.
- Mono labels: `0.72-0.82rem`, `letter-spacing: 0.1em-0.28em`.

### 2.4 Spacing System

Use the 8dp token scale from `src/index.css`:
```
--sp-1: 4px   --sp-2: 8px   --sp-3: 12px  --sp-4: 16px
--sp-5: 20px  --sp-6: 24px  --sp-8: 32px  --sp-10: 40px
--sp-12: 48px --sp-16: 64px --sp-20: 80px
--section-padding: clamp(80px, 10vw, 140px)
```
Never hardcode pixel values where a token exists.

### 2.5 Border Radius (Tokens)

```
--radius-xs: 6px   --radius-sm: 10px  --radius-md: 16px
--radius-lg: 24px  --radius-xl: 32px  --radius-2xl: 40px
```
Use `--radius-sm` for inputs, `--radius-md` for cards, `--radius-lg` for large panels.

---

## 3. TASTE RULES — What Makes This Feel Premium

### 3.1 Visual Hierarchy
- ONE dominant headline per section. Everything else is subordinate.
- Use weight contrast (700 vs 400), size contrast, and color contrast — not just size alone.
- Muted text (`--clr-text-muted`) for secondary info. Dim text (`--clr-text-dim`) for metadata.
- Never have two equally heavy elements competing for attention in the same block.

### 3.2 Whitespace and Breathing Room
- Sections need room to breathe. Do not compress padding to fit more content.
- Cards must have internal padding of at least `--sp-6` (24px).
- Prefer fewer, more impactful elements over many small ones.
- Items in a grid: minimum `--sp-4` gap, prefer `--sp-6`.

### 3.3 Color Discipline
- Accent (`#6478ff`) is used SPARINGLY — for key highlights, active states, labels.
- Do not paint large areas with accent color. Use it on small elements (dots, lines, icons, underlines).
- Gradients: only use the pre-defined tokens (`--grad-accent`, `--grad-neon`, etc.).
- Never invent new neon colors or random glow colors.
- Background elements (orbs, grid, noise) should be INVISIBLE — felt, not seen.

### 3.4 Motion Principles
- Animations exist to COMMUNICATE, not to impress.
- Entry animations: `duration: 0.5-0.7s`, `ease: [0.4, 0, 0.2, 1]`.
- Hover states: `duration: 0.18-0.25s`, subtle — `translateY(-4px)` max.
- Spring animations: `stiffness: 260-380`, `damping: 22-32`.
- No bouncing, no spinning, no flipping elements.
- Stagger children: `0.05-0.11s` apart, never more.
- Always respect `prefers-reduced-motion` (already in `index.css`).

### 3.5 Card Design
- Use `.glass-card` utility as the base for all cards.
- Cards should have a subtle border (`--clr-border`), never thick or colorful borders.
- Hover: lift `translateY(-4px)` + border brightens to `--clr-border-glow`. That is all.
- No shadow stacking. Use `--shadow-card` and `--shadow-glow` — not both plus extra shadows.
- Think panel, not widget.

### 3.6 Things to AVOID
- Excessive glassmorphism (heavy blur on multiple overlapping layers)
- Rainbow or multi-color gradients on text
- Neon glow on large text
- Random floating particles or sparkle effects
- Section backgrounds with busy patterns
- Icon + label combos with colored icon backgrounds on every single item
- Progress bars as a primary skill visualization (they are decorative only)
- Typing-cursor effects outside the hero
- Anything that looks like a Bootstrap or template design

---

## 4. WEB DESIGN GUIDELINES

### 4.1 Responsive Design
- Mobile-first approach when writing new CSS.
- Use `clamp()` for fluid typography and spacing.
- Breakpoints: `480px` (mobile), `768px` (tablet), `1024px` (desktop), `1440px` (large).
- Never rely on JavaScript for layout shifts at breakpoints.
- Test all 3 Playwright projects: Desktop Chrome, iPad, iPhone 14.

### 4.2 Accessibility
- All interactive elements need `aria-label` or visible text label.
- Buttons that only contain icons MUST have `aria-label`.
- Focus states: `outline: 2px solid var(--clr-accent); outline-offset: 3px` (already global).
- Color contrast: text on dark background must meet WCAG AA (4.5:1 ratio).
- Never remove outline styles.
- Use semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`.
- Section elements must have unique `id` attributes.

### 4.3 Performance
- Lazy-load Spline 3D scenes (already using dynamic imports).
- Avoid inline `style` objects in render for properties that can be in CSS.
- Use `will-change: transform` only on elements that genuinely animate.
- Image elements: always set `width`, `height`, and `alt`.

### 4.4 Component Consistency
- Section structure: `section__label` then `section__title` then `section__subtitle` then content.
- All section-level animation: use `useInView` with `once: true, margin: '-80px'`.
- Stagger children using Framer Motion `containerVariants` + `itemVariants` pattern.
- Never mix inline Framer Motion `animate={}` props with CSS transitions for the same property.

---

## 5. IMAGE-TO-CODE WORKFLOW

When given a screenshot or design reference to implement:

1. **Analyze carefully**: study the layout grid, spacing ratios, font weights, color values, border presence, shadow depth, and component hierarchy.
2. **Map to tokens**: translate observed colors/sizes to the existing CSS tokens in `index.css`.
3. **Do not copy code** — write clean, maintainable CSS in the component's paired `.css` file.
4. **Preserve class naming**: use BEM-style naming consistent with existing components (e.g. `skills__card`, `hero__name`, `about__float-card`).
5. **Build in the existing pattern**: add to the component's `.jsx` + `.css` pair. Never create new CSS files for existing components.
6. **Verify with Playwright**: after implementation, run `npm test` or `npx playwright test` to take screenshots and validate.

---

## 6. SKILLS CATALOGUE (Project-Level)

These skills are installed in `.agents/skills/` and must be used for design decisions:

| Skill | Purpose | When to Use |
|-------|---------|-------------|
| `ui-ux-pro-max` | 67 styles, 161 color palettes, 57 font pairings, 99 UX guidelines | Choosing new design style, color, font, or UX pattern |
| `design` | Logo, tokens, UI styling, banner design | Creating assets, icons, or brand elements |
| `design-system` | Token architecture, spacing scale, component specs | Defining or extending the design token system |
| `ui-styling` | shadcn/ui patterns, accessible components | Reference for accessible component patterns |
| `brand` | Voice, identity, messaging | Ensuring copy and brand consistency |
| `banner-design` | Social media and web banners | Creating marketing assets |
| `slides` | HTML presentations | Creating pitch decks or slides |

---

## 7. PLAYWRIGHT TESTING WORKFLOW

### Configuration
- Config: `playwright.config.js`
- Tests: `tests/e2e/portfolio.spec.js`
- Screenshots: `tests/screenshots/`
- Reports: `tests/playwright-report/`

### Commands
```bash
npm test                       # Run all tests (auto-starts dev server)
npm run test:ui                # Open Playwright interactive UI
npm run test:screenshot        # Run only screenshot tests
npm run test:report            # Open HTML test report
npx playwright test --headed   # Run in visible browser
```

### Testing Checklist (before any design change is called done)
- npm test passes on Desktop Chrome
- npm test passes on iPhone 14 (mobile)
- No console errors on page load
- Screenshot taken and visually reviewed
- All sections scroll-navigate correctly
- Hamburger menu works on mobile
- Focus states are visible on tab
- Resume link is accessible

---

## 8. MODIFICATION RULES

### Safe to change
- CSS values inside component `.css` files
- Content/copy inside `.jsx` component data arrays
- Framer Motion animation values (duration, ease, delay)
- Adding new sections (must add matching section ID and navbar link)

### Requires careful review
- `src/index.css` design tokens (changes cascade everywhere)
- `src/App.jsx` app structure
- `index.html` metadata
- Any Spline scene URLs

### DO NOT change without explicit user approval
- Package dependencies (add/remove)
- Project architecture or file structure
- The existing design token palette
- Font families
- Section IDs used for navigation

---

## 9. COMMIT MESSAGE FORMAT

```
type(scope): description

Types: feat | fix | style | refactor | test | docs | chore
Scope: hero | about | skills | experience | projects | contact | navbar | footer | global

Examples:
  style(hero): improve type scale and spacing on mobile
  feat(projects): add filterable project grid
  fix(navbar): correct scroll-spy threshold for experience section
  test(e2e): add accessibility checks to Playwright suite
```

---

## 10. FINAL QUALITY CHECK

Run through this checklist every time before a submission or PR:

- npm run lint — no lint errors
- npm run build — production build succeeds
- npm test — all Playwright tests pass
- Mobile viewport (390px) looks correct
- Tablet viewport (768px) looks correct
- Desktop viewport (1440px) looks correct
- Loading screen animates correctly
- Scroll progress bar works
- Custom cursor glow works on desktop
- All section nav links scroll correctly
- Resume PDF link opens
- Contact form displays correctly
- No broken images (avatar.png/jpg)
- No console errors or warnings
- Spline 3D scenes load (Hero + About)
- Accessibility: all buttons have labels
- prefers-reduced-motion respected
