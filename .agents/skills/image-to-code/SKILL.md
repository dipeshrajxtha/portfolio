---
name: image-to-code
description: >
  Workflow for analyzing screenshots and design references and reproducing them
  accurately in Portfolio 2. Covers analysis methodology, token mapping, CSS
  implementation, and Playwright verification. Use whenever given a visual reference
  to implement in the existing codebase.
---

# image-to-code — Visual Reference to Portfolio 2 Code

This skill defines the exact workflow for receiving a screenshot, mockup, or
design reference image and reproducing it accurately within the Port2 codebase.

---

## Workflow Overview

```
1. RECEIVE IMAGE → 2. ANALYZE → 3. MAP TO TOKENS → 4. IMPLEMENT → 5. VERIFY
```

---

## Step 1: Receive the Image

The image can be:
- A screenshot of a reference website
- A Figma/design tool export
- A hand-drawn wireframe photo
- A screenshot of a previous Port2 version
- Any visual reference the user provides

Accept via: `generate_image` artifacts, user-uploaded images, or URLs.

---

## Step 2: Analyze the Image (What to Look For)

### Layout Analysis
- Is it a single column, two column, or grid?
- What is the approximate column ratio? (e.g. 5/7 split, 1:1, 3-column)
- Are elements aligned left, center, or right?
- What is the approximate max-width of the content area?
- Are there overlapping elements or z-layering?

### Spacing Analysis
- Estimate the padding inside cards/containers (tight = 16px, normal = 24px, generous = 32px+)
- Estimate the gap between grid items
- Estimate the margin between a headline and its body text
- Estimate the section top/bottom padding

### Typography Analysis
- Which text is the largest? (headline)
- Are there multiple font weight levels? (heavy headline, regular body)
- Is there a monospaced element? (code, label, tag)
- What is the approximate font size ratio between headline and body?
- Is any text gradient-colored or accent-colored?
- What is the text color level? (pure white, muted, dim)

### Color Analysis
- What is the background color? Map to: `--clr-bg`, `--clr-surface`, `--clr-card`
- Are there accent elements? Map to: `--clr-accent`, `--clr-accent-2`, `--clr-neon`
- What are the border colors? Map to: `--clr-border`, `--clr-border-glow`
- Are there glow/shadow effects? Map to: `--shadow-glow`, `--shadow-card`

### Component Analysis
- Are there cards? → Use `.glass-card` base
- Are there tags/pills? → Use `.tag` base
- Are there buttons? → Use `.btn-glow` or `.btn-outline`
- Are there icon+label combos? → Check existing pattern in Skills/Experience
- Is there a horizontal line/divider? → Use `.divider`

### Animation/Interaction Analysis
- Is anything animating in the reference? What is it doing?
- What happens on hover? (color change, lift, glow?)
- Is there a stagger effect visible?

---

## Step 3: Map Visual Observations to Port2 Tokens

| Observed Visual | Port2 CSS Token or Class |
|-----------------|--------------------------|
| Near-black bg | `var(--clr-bg)` #050816 |
| Dark blue surface | `var(--clr-surface)` #0f1729 |
| Semi-transparent dark card | `var(--clr-card)` + `.glass-card` |
| Purple-blue accent | `var(--clr-accent)` #6478ff |
| Soft purple accent | `var(--clr-accent-2)` #a78bfa |
| Light blue accent | `var(--clr-accent-3)` #38bdf8 |
| Teal/mint highlight | `var(--clr-neon)` #00f5d4 |
| Near-white text | `var(--clr-text)` #e2e8f8 |
| Gray muted text | `var(--clr-text-muted)` #8892b0 |
| Very dim text | `var(--clr-text-dim)` #4a5568 |
| Subtle border | `var(--clr-border)` rgba(100,120,255,0.14) |
| Glowing border | `var(--clr-border-glow)` rgba(100,120,255,0.42) |
| Purple-blue gradient | `var(--grad-accent)` |
| Teal-blue gradient | `var(--grad-neon)` |
| Card shadow | `var(--shadow-card)` |
| Glow shadow | `var(--shadow-glow)` |
| 8px spacing | `var(--sp-2)` |
| 16px spacing | `var(--sp-4)` |
| 24px spacing | `var(--sp-6)` |
| 32px spacing | `var(--sp-8)` |
| 6px radius | `var(--radius-xs)` |
| 10px radius | `var(--radius-sm)` |
| 16px radius | `var(--radius-md)` |
| 24px radius | `var(--radius-lg)` |

---

## Step 4: Implement in Port2

### Rules

1. **Write CSS in the component's paired `.css` file** — never use inline styles for layout.
2. **Use BEM naming** consistent with the existing codebase:
   ```
   .component { }           /* Block */
   .component__element { }  /* Element */
   .component__element--modifier { }  /* Modifier (rare) */
   ```
3. **Map grid/layout to CSS Grid or Flexbox** (no Bootstrap, no third-party grid).
4. **Use CSS custom properties from `:root`** — never hardcode colors, sizes, or fonts.
5. **Add responsive overrides** using the breakpoints: 480px, 768px, 1024px.
6. **Write Framer Motion animations** following the existing pattern (entry animation, hover states).

### Implementation Checklist

- [ ] Layout matches reference at the same viewport width
- [ ] Spacing matches (use DevTools ruler to estimate pixels if needed)
- [ ] Typography weights and sizes match
- [ ] Colors are mapped to tokens (not hardcoded)
- [ ] Hover interactions work as expected
- [ ] Mobile layout is tested (the reference may only show desktop)
- [ ] BEM class names are consistent with existing components
- [ ] No unused CSS rules added
- [ ] No `!important` unless overriding a third-party style

---

## Step 5: Verify with Playwright

After implementation, always run:

```bash
# Take screenshots at all breakpoints
npm run test:screenshot

# Or run full test suite
npm test

# Open visual report
npm run test:report
```

Compare the Playwright screenshots against the original reference image.
Pay attention to:
- Spacing/padding differences
- Font size and weight differences
- Color drift (the dark bg can shift on different monitors)
- Mobile layout breakage

---

## Common Patterns in Port2

### Adding a New Card Component

```jsx
// In Component.jsx
<motion.div
  className="component__card glass-card"
  whileHover={{ y: -4, transition: { duration: 0.2 } }}
>
  <div className="component__card-header">
    {/* icon or label */}
  </div>
  <h3 className="component__card-title">Title</h3>
  <p className="component__card-body">...</p>
</motion.div>
```

```css
/* In Component.css */
.component__card {
  /* glass-card handles the base — add overrides only */
  padding: var(--sp-8);
}

.component__card-title {
  font-family: var(--font-primary);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--clr-text);
  margin-bottom: var(--sp-3);
}

.component__card-body {
  font-size: 0.9rem;
  color: var(--clr-text-muted);
  line-height: 1.7;
}
```

### Adding a New Section Row

```css
.component__row {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-6);
}

@media (min-width: 768px) {
  .component__row {
    grid-template-columns: 5fr 7fr; /* or 1fr 1fr */
    align-items: center;
  }
}
```
