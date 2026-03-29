---
name: production-pages
description: Use when building or modifying /productions archive or /productions/[slug] detail pages
---

# Production Pages
## `/productions` archive + `/productions/[slug]` detail
## Read for every new production-related page, component, or data change

---

## What These Pages Are

The production pages are the heart of the site — they are both the archive and the individual record for each of 90+ plays:

- `/productions` is the catalogue view — filterable grid of all productions
- `/productions/[slug]` is one record — every play gets its own full page, auto-generated from data

Adding a new production = adding an entry to `data/productions.json`. No code needed.

---

## `/productions` — Archive Page

### SEO
```typescript
export const metadata: Metadata = {
  title: 'Productions Archive',
  description: 'Browse 90+ theatre productions by Ideas Unlimited Productions — Hindi, English and Gujarati plays staged across India since 1990. Directed by Manoj Shah.',
}
```
Schema.org: All production titles must be in server-rendered HTML — never JS-only.
Target keywords: "theatre productions India", "Hindi plays India", "Gujarati theatre", "Indian theatre archive"

### Data
```typescript
const productions = getAllProductions()
const filterOptions = getFilterOptions() // derived from data, never hardcoded
```

### Page Structure

**1. Page Header** — `<SectionHeading label="Archive" title="Productions" />`

**2. Filter Bar** (`'use client'` — filters update URL search params)
- Filters: Type | Language | Genre | Year
- Active state in URL: `?language=Hindi&genre=Drama`
- Client-side filtering, full dataset passed as props

**3. Productions Grid**
- 3 cols desktop → 2 cols tablet → 1 col mobile
- `<ProductionCard>` with image, badges, title, hover effects
- Now Performing badge on cards with upcoming shows

**4. Empty State** (zero filter results)
- "No productions match your filters" + Clear Filters button

### Animations
- Framer Motion stagger on initial load
- Hover scale on card images

---

## `/productions/[slug]` — Detail Page

### SEO
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const p = getProductionBySlug(params.slug)
  return {
    title: p.title,
    description: p.synopsis.slice(0, 160),
    openGraph: { images: [p.image] }
  }
}
```

**generateStaticParams:** Pre-build all published slugs.

**Schema.org:** Two JSON-LD blocks:
1. `CreativeWork` for the production
2. One `TheaterEvent` per active upcoming show date — critical for Google Events rich results

### Page Structure (sections in order)

**1. Hero** — Background image with gradient, badges, title, subtitle, duration, cast count

**2. Now Performing Block** (conditional: upcoming shows exist)
- Gold/amber border, show dates with venue/city/time
- BookMyShow ticket buttons
- "Almost Full" / "Sold Out" status badges

**3. Synopsis** — Max-width prose, body-lg

**4. Commissioned Context** (conditional) — Gold left border block with commissioner info

**5. Cast & Crew** — Grid of person cards linked to `/people/[slug]`, circular portraits, role labels

**6. Gallery** (conditional) — Grid with lightbox (`yet-another-react-lightbox`)

**7. Video** (conditional) — YouTube embed

**8. Festival Appearances** (conditional) — List of festival name, year, city

**9. Press & Coverage** (conditional) — PressCard grid with external links

**10. Related Productions** (conditional) — 3 ProductionCards

### Key Rules
- All cast/crew names MUST link to `/people/[slug]`
- BookMyShow links: `target="_blank" rel="noopener noreferrer"`
- All conditional sections hidden when data is empty (no empty state headings)
- Video: lazy-loaded, no autoplay

---

## Adding a New Production (workflow)

1. Add entry to `data/productions.json`
2. Add `cast_crew` entries linking `person_id` + roles
3. Add `shows` array if scheduled performances exist
4. Add `festivals` array with festival IDs
5. Add press entries to `data/press.json` with `productionSlug`
6. Page auto-generates at `/productions/[slug]` on next build

---

## Component Checklist

**Archive:**
- [ ] Filter options derived from data — never hardcoded arrays
- [ ] Filter state in URL search params (shareable links)
- [ ] Now Performing badge on active cards
- [ ] Empty state with clear filters button
- [ ] All production titles in SSG HTML

**Detail:**
- [ ] `generateStaticParams` for all slugs
- [ ] `generateMetadata` with title + synopsis + OG image
- [ ] `TheaterEvent` JSON-LD for each upcoming show date
- [ ] `CreativeWork` JSON-LD for the production
- [ ] Now Performing block: conditional, full-width CTA
- [ ] Commissioned Context block: conditional
- [ ] All cast/crew names link to `/people/[slug]`
- [ ] Gallery lightbox works on mobile
- [ ] All conditional sections hidden when data is empty
