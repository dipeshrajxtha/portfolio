---
name: web-design-guidelines
description: >
  Modern web design guidelines for Portfolio 2. Covers responsive design, accessibility,
  semantic HTML, keyboard navigation, focus states, hover/active states, typography
  hierarchy, spacing system, component consistency, and multi-breakpoint layouts.
---

# Web Design Guidelines — Portfolio 2

Reference guide for professional web design and development standards.
Apply these principles to every component and layout change.

---

## Responsive Design

### Breakpoint System

```
Mobile:  < 480px   (iPhone SE, small phones)
Mobile:  480-767px (larger phones)
Tablet:  768-1023px (iPad, small laptops)
Desktop: 1024-1439px (laptops, standard monitors)
Large:   1440px+   (large monitors, ultra-wide)
```

### Writing Mobile-First CSS

```css
/* Default: mobile layout */
.hero__inner {
  display: flex;
  flex-direction: column;
  gap: var(--sp-8);
}

/* Tablet and above: two-column */
@media (min-width: 768px) {
  .hero__inner {
    flex-direction: row;
    align-items: center;
  }
}
```

### Fluid Typography

Use `clamp()` for all headline sizes:
```css
font-size: clamp(1.6rem, 4vw, 3rem);
```

- Min value: smallest acceptable size on mobile
- Preferred: fluid viewport-relative value
- Max: largest acceptable size on wide screens

### Common Layout Patterns

**Single-column on mobile, two-column on desktop:**
```css
.component__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-6);
}
@media (min-width: 768px) {
  .component__grid {
    grid-template-columns: 1fr 1fr;
  }
}
```

**Auto-fit card grid:**
```css
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--sp-6);
}
```

---

## Accessibility

### Keyboard Navigation
- All interactive elements must be reachable via Tab key
- Tab order must follow reading order (top-left to bottom-right)
- Custom interactive elements use `role="button"` and `tabindex="0"` with keyboard event handlers
- Modal/overlay: trap focus inside when open; restore focus when closed

### Focus States
The global focus style is already set:
```css
:focus-visible {
  outline: 2px solid var(--clr-accent);
  outline-offset: 3px;
}
```
**Never override this with `outline: none` unless providing an equally visible custom focus indicator.**

### ARIA Requirements

| Element | Required Attribute |
|---------|-------------------|
| Icon-only button | `aria-label="Description"` |
| Navigation | `aria-label="Main navigation"` |
| Active nav link | `aria-current="page"` |
| Hamburger toggle | `aria-expanded={isOpen}` |
| Loading state | `aria-busy="true"` |
| Decorative image | `alt=""` |
| Informative image | `alt="Clear description"` |

### Color Contrast Minimums
- Normal text on background: 4.5:1 (WCAG AA)
- Large text (18px+ regular, 14px+ bold): 3:1
- Check: use Chrome DevTools > Accessibility > Color contrast

### Skip Links
For a portfolio, add a skip link if the nav is lengthy:
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

---

## Semantic HTML

### Section Structure

```jsx
<section id="about" aria-labelledby="about-heading">
  <h2 id="about-heading">About Me</h2>
  <p>Body text...</p>
</section>
```

### Heading Hierarchy

```
h1 — Page title (ONE per page — hero name)
h2 — Section headings (About, Skills, Experience, Projects, Contact)
h3 — Sub-section headings (individual experience entries, project titles)
h4 — Item headings (rarely needed)
```

Never skip heading levels (h1 → h3 without h2).

### Interactive Elements

- Use `<button>` for actions (scrolling, toggling, submitting)
- Use `<a>` for navigation (external links, downloads, routes)
- Never use `<div onClick>` without `role="button"` and keyboard support

---

## Typography Hierarchy

### Scale Reference

| Level | Size | Weight | Font | Usage |
|-------|------|--------|------|-------|
| Hero name | `clamp(3.5rem, 8vw, 6rem)` | 800 | Space Grotesk | h1 |
| Section title | `clamp(2.2rem, 5vw, 3.8rem)` | 700 | Space Grotesk | h2 |
| Card title | `1.2–1.5rem` | 600 | Space Grotesk | h3 |
| Body large | `1.05–1.1rem` | 400 | Inter | Lead paragraph |
| Body | `1rem` | 400 | Inter | Regular text |
| Body small | `0.875–0.9rem` | 400 | Inter | Secondary text |
| Label | `0.78–0.82rem` | 500 | JetBrains Mono | Section eyebrow, tag |
| Micro | `0.7–0.75rem` | 400 | JetBrains Mono | Meta, date, count |

---

## Hover & Active States

Every interactive element needs three states:

| State | Transform | Color | Shadow |
|-------|-----------|-------|--------|
| Default | none | `--clr-text` or defined | minimal |
| Hover | `translateY(-2px)` to `translateY(-4px)` | brighten or accent | subtle glow |
| Active/Press | `translateY(0) scale(0.98)` | slightly dimmed | reduced |
| Focus | no transform | accent outline | outline only |

### Button States (already defined as `.btn-glow` and `.btn-outline`)
Use these utilities instead of creating custom button styles unless necessary.

---

## Spacing System Application

### Intra-component (within a card or section block)
```
label → headline:     8–12px (--sp-2 to --sp-3)
headline → subtitle:  16–20px (--sp-4 to --sp-5)
subtitle → content:   24–32px (--sp-6 to --sp-8)
between content items: 16px (--sp-4)
```

### Section-level
```
Section top/bottom padding: clamp(80px, 10vw, 140px)
Horizontal content padding: clamp(20px, 6vw, 100px)
Between sections: handled by dividers
```

### Card Internal Padding
```
Standard card:  var(--sp-8) = 32px
Compact card:   var(--sp-6) = 24px
Hero/featured:  var(--sp-10) to var(--sp-12) = 40–48px
```

---

## Component Consistency

Every component in Portfolio 2 follows this pattern:

### JSX Structure
```jsx
<section className="section [component-name]" id="[id]" ref={ref}>
  {/* Optional orb decoration */}
  <div className="orb [component]__orb-1" />

  {/* Header */}
  <div className="[component]__header">
    <motion.p className="section__label">...</motion.p>
    <motion.h2 className="section__title">...</motion.h2>
    <motion.p className="section__subtitle">...</motion.p>
  </div>

  {/* Content */}
  {/* ... */}
</section>
```

### CSS BEM Naming
```css
.skills { }              /* Block */
.skills__header { }      /* Element */
.skills__tab { }         /* Element */
.skills__tab.active { }  /* Modifier via class */
```

### Animation Entry Pattern
```jsx
const ref = useRef(null);
const inView = useInView(ref, { once: true, margin: '-80px' });

<motion.div
  initial={{ opacity: 0, y: 28 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
>
```

---

## Performance-Conscious Design

1. **Avoid layout shift**: set explicit `width` and `height` on images and iframes.
2. **Avoid repaints**: prefer `transform` and `opacity` for animations (not `top`, `left`, `width`).
3. **Use `will-change: transform`** only on elements with ongoing animations (not statically).
4. **Debounce scroll handlers** — already done via `{ passive: true }` in event listeners.
5. **Lazy load heavy components**: Spline scenes, large images.
6. **CSS custom properties** for repeated values — already implemented in `:root`.

---

## Design Review Checklist

Before finalizing any component, verify:

- [ ] Renders correctly at 390px (iPhone 14)
- [ ] Renders correctly at 768px (iPad)
- [ ] Renders correctly at 1440px (Desktop large)
- [ ] All interactive elements are keyboard-accessible
- [ ] Color contrast passes WCAG AA
- [ ] No layout overflow (check with DevTools)
- [ ] Hover states are visible but not jarring
- [ ] Animations are within timing budget (<700ms)
- [ ] No `console.error` or `console.warn` in browser DevTools
- [ ] Playwright screenshots taken for review
