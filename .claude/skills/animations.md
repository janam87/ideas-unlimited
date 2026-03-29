---
name: animations
description: Use when adding or modifying any animation — Framer Motion wrappers, scroll reveals, transitions
---

# Animations
## Read for every animation task

---

## Library

**Framer Motion** via the `motion` package. Import from `motion/react`.

All animation components are `'use client'` and live in `components/motion/`.

---

## Available Wrappers

### `FadeIn`
Fade + slide on mount. Use for hero elements, page headers.

```tsx
import { FadeIn } from "@/components/motion/FadeIn";

<FadeIn direction="up" delay={0.2}>
  <h1>Title</h1>
</FadeIn>
```

Props: `direction` (up/down/left/right/none), `delay`, `duration`, `className`

### `ScrollReveal`
Fade-in triggered by `useInView` (once, 20% threshold). Use for sections below the fold.

```tsx
import { ScrollReveal } from "@/components/motion/ScrollReveal";

<ScrollReveal>
  <SectionContent />
</ScrollReveal>
```

Props: `direction` (up/down/left/right/none), `delay`, `className`

### `CurtainReveal`
Two panels slide apart like stage curtains. Use sparingly — hero headlines, dramatic moments.

```tsx
import { CurtainReveal } from "@/components/motion/CurtainReveal";

<CurtainReveal delay={0.2}>
  <h1>Dramatic Title</h1>
</CurtainReveal>
```

Props: `delay`, `className`

### `StaggerChildren` + `StaggerItem`
Container that staggers children entrance on scroll. Use for card grids, lists.

```tsx
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";

<StaggerChildren stagger={0.1}>
  {items.map(item => (
    <StaggerItem key={item.id}>
      <Card item={item} />
    </StaggerItem>
  ))}
</StaggerChildren>
```

Props (container): `stagger`, `delay`, `className`

---

## Animation Guidelines

### When to Animate
- Hero sections: CurtainReveal on headline, FadeIn on supporting text/CTAs
- Section entries: ScrollReveal (once per section, not every element)
- Card grids: StaggerChildren on first load
- Numbers: Count-up on scroll (see `LegacyNumbers` component)
- Navigation: AnimatePresence for mobile drawer, search overlay

### When NOT to Animate
- Blog post body content — reading experience only
- Form fields — don't delay interaction
- Already-visible content on page load (below fold is fine)
- Data that updates frequently (Now Performing dates)

### Performance Rules
1. Animate `opacity` and `transform` only — never `width`, `height`, `top`, `left`
2. Use `once: true` on scroll triggers — don't re-animate on scroll-back
3. Keep durations under 0.8s for UI elements, up to 1.2s for dramatic reveals
4. Stagger delay: 0.05–0.15s between items, never more
5. Use `[0.25, 0.1, 0.25, 1]` ease curve (default) — smooth, not bouncy

### Easing
```typescript
// Default ease — smooth deceleration
ease: [0.25, 0.1, 0.25, 1]

// Dramatic ease — for curtain reveals
ease: [0.76, 0, 0.24, 1]

// Spring — for bouncy elements (use sparingly)
type: "spring", stiffness: 300, damping: 30
```

---

## Common Patterns

### Parallax-like scroll indicator
```tsx
<motion.div
  animate={{ y: [0, 8, 0] }}
  transition={{ duration: 2, repeat: Infinity }}
  className="w-px h-12 bg-gradient-to-b from-gold to-transparent"
/>
```

### Count-up number
```tsx
// See components/home/LegacyNumbers.tsx for full implementation
// Uses useInView + setInterval to count from 0 to target
```

### Page transitions
```tsx
// Use AnimatePresence in layout components for:
// - Mobile nav drawer (slide from right)
// - Search overlay (fade)
// - Now Performing bar (slide down)
```
