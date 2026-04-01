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
| `--purple` | `#7c3aed` | Primary accent (purple), CTAs, labels, links, hovers |
| `--purple-light` | `#a78bfa` | Hover state for accent |
| `--purple-dark` | `#5b21b6` | Active/pressed accent |
| `--pink` | `#be185d` | Upcoming shows ticker ribbon |
| `--pink-dark` | `#9d174d` | Pink pressed state |
| `--amber` | `#f59e0b` | Reserved (legacy token) |
| `--grey-900` | `#111111` | Cards, footer background |
| `--grey-800` | `#1a1a1a` | Input backgrounds, secondary cards |
| `--grey-700` | `#2a2a2a` | Borders, dividers |
| `--grey-600` | `#3a3a3a` | Hover borders |
| `--grey-400` | `#888888` | Secondary text, icons |
| `--grey-300` | `#aaaaaa` | Body text (prose) |
| `--grey-200` | `#cccccc` | Muted labels |

**Rule:** Dark theme only. Background is ALWAYS `#0a0a0a` or darker variants. Never white. Never light.

**Note:** The primary accent is purple (`#7c3aed`), matching the IU logo. Use `text-purple`, `bg-purple`, `border-purple` etc.

---

## Typography

| Role | Font | Variable | Usage |
|---|---|---|---|
| Display/Headings | Playfair Display | `--font-serif` | h1–h4, hero text, titles, pull quotes |
| Body | DM Sans | `--font-sans` | Paragraphs, descriptions, UI text |
| Labels/Mono | JetBrains Mono | `--font-mono` | Section labels, badges, metadata, dates |
| Logo | Trebuchet MS | inline style | Navbar logo text only |

### Type Scale (Tailwind classes)
- Hero: `text-5xl md:text-7xl lg:text-8xl font-serif text-cream`
- Page title: `text-4xl md:text-5xl lg:text-6xl font-serif text-cream` (used in About pull, Featured heading)
- Section title (5/7 split left col): `text-3xl md:text-4xl lg:text-5xl font-serif text-cream leading-tight`
- Card title: `text-lg md:text-xl font-serif text-cream`
- Body: `text-lg text-grey-200 leading-relaxed` (note: `grey-200` not `grey-300` for better readability)
- Section label: `font-mono text-xs uppercase tracking-[0.3em] text-purple`
- Badge: `font-mono text-xs uppercase tracking-widest`

---

## Component Library

### Primitives (in `components/ui/`)

| Component | Purpose | Key Props |
|---|---|---|
| `Button` | CTAs, form submits, links | `variant`: primary/secondary/ghost/outline, `size`: sm/md/lg, `href` |
| `Badge` | Tags, status pills | `variant`: default/gold/amber/outline |
| `SectionHeading` | Section headers (legacy — most pages now use inline headings in 5/7 splits) | `label`, `title`, `description`, `align` |
| `Container` | Max-width wrapper (legacy — most pages now use inline `max-w-6xl` containers) | `className`, `as` |

### Layout Components (in `components/layout/`)

| Component | Purpose |
|---|---|
| `Navbar` | Fixed navbar with IU logo, nav links, search. Offset `top-9` for ticker. |
| `UpcomingTicker` | Fixed pink ribbon at `top-0` with scrolling marquee of upcoming shows |
| `Footer` | Site footer with links, contact, newsletter |
| `ClientShell` | Client wrapper: ticker + navbar + search overlay |
| `SearchOverlay` | Full-screen search |

### Shared Components (in `components/shared/`)

| Component | Purpose |
|---|---|
| `Gallery` | Image grid with lightbox. `fullBleed` prop for edge-to-edge (no heading, 4-col). |
| `VideoEmbed` | YouTube/video iframe embed |
| `PressCard` | External press article card |
| `RelatedProductions` | Simple card grid (no section wrapper — used inside 5/7 splits) |

---

## Spacing & Layout

- Page top padding: `pt-28 md:pt-32` (accounts for fixed navbar + ticker)
- Section vertical padding: `py-16 md:py-24`
- Full-width container (nav, footer, hero, ticker): `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Content sections container: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`
- Card grid gaps: `gap-8` (productions, people grids)
- Section heading margin-bottom: `mb-10` (list pages)

### 5/7 Split Layout (primary section pattern)

All content sections across the site use a consistent two-column split:

```
| Left (lg:col-span-5)  |  Right (lg:col-span-7)              |
| Big serif title        |  Content: cards, text, forms, lists |
```

- Each section: `<section className="border-t border-grey-700">`
- Inner: `max-w-6xl` container → `grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12`
- Left column: Big serif heading (`text-3xl md:text-4xl lg:text-5xl`) or sticky element (poster, photo)
- Right column: All content
- CTAs like "View All →" or "Read more →" go at the BOTTOM of right column content
- On mobile: stacks vertically

### Sticky Left Column Pattern

Used on production detail (poster) and people detail (photo):
- `lg:sticky lg:top-24` on the inner wrapper
- Optional `lg:max-w-[280px]` or `lg:max-w-[320px]` to constrain size
- Photo + optional CTA below it, sticks while right column scrolls

### Onassis-style Booking Band

Used on production detail page immediately after hero:
- `bg-purple` (purple) full-width band
- Date/Time/Location in labeled columns
- White "Book Tickets" button with `text-purple-dark`
- "Almost Full" badge with `bg-white/20`

---

## Interaction Patterns

- **Cards:** `hover:border-grey-600 transition-all duration-500`, image `group-hover:scale-105`
- **Links in text:** `text-purple hover:text-purple-light` or `text-grey-400 hover:text-cream`
- **Buttons:** `transition-all duration-300`, uppercase tracking-wide
- **Selects:** Custom chevron via CSS `background-image`, `appearance: none`, `pl-4 pr-10 py-2.5`
- **Inputs:** `bg-grey-800/900 border-grey-700 focus:border-purple outline-none transition-colors`
- **External links:** Always `target="_blank" rel="noopener noreferrer"`

---

## Global Elements

### Upcoming Ticker
- Fixed at `top-0`, `z-[60]`, `h-9`, `bg-pink`
- Scrolling marquee with production name, date, time, venue
- Links to production detail page

### Navbar
- Fixed at `top-9` (below ticker), `z-50`
- IU logo image (36x36, 40x40 on md) + "Ideas Unlimited" / "Production" in Trebuchet MS
- Frosted glass on scroll: `bg-background/60 backdrop-blur-xl`

---

## Rules

1. Never invent new colour tokens — use the palette above
2. Always use `cn()` from `lib/utils.ts` for conditional classes (clsx + tailwind-merge)
3. Images: `next/image` only, never raw `<img>`
4. Icons: `lucide-react` only, size 14–24
5. No border-radius on cards (sharp editorial aesthetic) — except circular portraits
6. Selection colour: purple (gold) background, dark text (set globally in CSS)
7. The accent is purple — use `text-purple`, `bg-purple`, `border-purple` consistently
