---
name: design-system
description: Use when creating or modifying any UI component, styling, layout, or visual element
---

# Design System
## Read for every UI / styling / new component task

---

## Colour Palette

| Token | Value | Usage |
|---|---|---|
| `--background` | `#0a0a0a` | Page background, overlays |
| `--foreground` | `#ededed` | Default body text |
| `--cream` | `#f5f0e8` | Headings, high-emphasis text |
| `--gold` | `#d4a843` | Primary accent, CTAs, labels, links |
| `--gold-light` | `#e8c36a` | Hover state for gold |
| `--gold-dark` | `#b8922e` | Active/pressed gold |
| `--amber` | `#f59e0b` | "Now Performing" badge/bar |
| `--grey-900` | `#111111` | Cards, footer background |
| `--grey-800` | `#1a1a1a` | Input backgrounds, secondary cards |
| `--grey-700` | `#2a2a2a` | Borders, dividers |
| `--grey-600` | `#3a3a3a` | Hover borders |
| `--grey-400` | `#888888` | Secondary text, icons |
| `--grey-300` | `#aaaaaa` | Body text (prose) |
| `--grey-200` | `#cccccc` | Muted labels |

**Rule:** Dark theme only. Background is ALWAYS `#0a0a0a` or darker variants. Never white. Never light.

---

## Typography

| Role | Font | Variable | Usage |
|---|---|---|---|
| Display/Headings | Playfair Display | `--font-serif` | h1–h4, hero text, titles, pull quotes |
| Body | DM Sans | `--font-sans` | Paragraphs, descriptions, UI text |
| Labels/Mono | JetBrains Mono | `--font-mono` | Section labels, badges, metadata, dates |

### Type Scale (Tailwind classes)
- Hero: `text-5xl md:text-7xl lg:text-8xl font-serif text-cream`
- Page title: `text-4xl md:text-5xl lg:text-6xl font-serif text-cream`
- Section title: `text-3xl md:text-4xl lg:text-5xl font-serif text-cream`
- Card title: `text-lg md:text-xl font-serif text-cream`
- Body: `text-lg text-grey-300 leading-relaxed`
- Section label: `font-mono text-xs uppercase tracking-[0.3em] text-gold`
- Badge: `font-mono text-xs uppercase tracking-widest`

---

## Component Library

### Primitives (in `components/ui/`)

| Component | Purpose | Key Props |
|---|---|---|
| `Button` | CTAs, form submits, links | `variant`: primary/secondary/ghost/outline, `size`: sm/md/lg, `href` |
| `Badge` | Tags, status pills | `variant`: default/gold/amber/outline |
| `SectionHeading` | Section headers | `label` (gold mono), `title` (serif), `description`, `align` |
| `Container` | Max-width wrapper | `className`, `as` (element type) |
| `GridLines` | Decorative background lines | No props — place once in root layout |

### Shared Components (in `components/shared/`)

| Component | Purpose |
|---|---|
| `Gallery` | Image grid with lightbox (yet-another-react-lightbox) |
| `VideoEmbed` | YouTube/video iframe embed |
| `PressCard` | External press article card |
| `ShareButton` | Copy URL / native share |
| `RelatedProductions` | 3-card grid of related productions |

---

## Spacing & Layout

- Page top padding: `pt-32` (accounts for fixed navbar)
- Section vertical padding: `py-20 md:py-28`
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Card grid gaps: `gap-6`
- Section heading margin-bottom: `mb-12`

---

## Interaction Patterns

- **Cards:** `hover:border-grey-600 transition-all duration-500`, image `group-hover:scale-105`
- **Links in text:** `text-gold hover:text-gold-light` or `text-grey-400 hover:text-cream`
- **Buttons:** `transition-all duration-300`, uppercase tracking-wide
- **Inputs:** `bg-grey-800/900 border-grey-700 focus:border-gold outline-none transition-colors`
- **External links:** Always `target="_blank" rel="noopener noreferrer"`

---

## Rules

1. Never invent new colour tokens — use the palette above
2. Always use `cn()` from `lib/utils.ts` for conditional classes (clsx + tailwind-merge)
3. Images: `next/image` only, never raw `<img>`
4. Icons: `lucide-react` only, size 14–24
5. No border-radius on cards (sharp editorial aesthetic) — except circular portraits
6. Selection colour: gold background, dark text (set globally in CSS)
