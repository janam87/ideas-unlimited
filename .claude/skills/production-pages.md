---
name: production-pages
description: Use when building or modifying /productions archive or /productions/[slug] detail pages
---

# Production Pages
## `/productions` archive + `/productions/[slug]` detail
## Read for every new production-related page, component, or data change

---

## What These Pages Are

The production pages are the heart of the site — both the archive and the individual record for each of 113+ plays:

- `/productions` is the catalogue view — filterable grid of all productions
- `/productions/[slug]` is one record — every play gets its own full page, auto-generated from data

Adding a new production = adding an entry to `data/productions.json`. No code needed.

---

## `/productions` — Archive Page

### Layout
- Page header: title "Productions" + count + date range, same layout as People page
- Uses `max-w-6xl` container directly (no Container component)
- Custom styled select dropdowns with `appearance: none` and SVG chevron

### Filters (`'use client'`)
- Type | Language | Genre | Year
- Active state in URL: `?language=Hindi&genre=Drama`
- Client-side filtering, full dataset passed as props
- Custom select styling: `pl-4 pr-10 py-2.5`, custom chevron via CSS

### Productions Grid
- 3 cols desktop → 2 cols tablet → 1 col mobile, `gap-8`
- `<ProductionCard>` with image, badges, title, hover effects

### Empty State
- "No productions match your filters" + Clear Filters button

---

## `/productions/[slug]` — Detail Page

### Page Structure (sections in order)

**1. Hero** (`ProductionHero` — `'use client'`)
- Full viewport height (`min-h-screen`), content at bottom
- If `videoUrl` exists with YouTube URL: muted autoplay looping video background (same technique as home Hero)
- Otherwise: `production.image` as full-bleed background via `next/image`
- Gradient overlay: `from-background/80 via-background/40 to-background/90`
- Title (`text-5xl md:text-7xl lg:text-8xl`), subtitle in purple italic, optional "Now Performing" badge

**Ambient Music** (`AmbientMusic` — `'use client'`, conditional)
- If `production.musicUrl` exists: floating bottom-right toggle button with Volume2/VolumeX icon
- Auto-plays on page load at 15% volume, loops
- Fade in/out on toggle (volume ramp over 500ms)
- `components/shared/AmbientMusic.tsx`
- Music files stored in `public/audio/{slug}.mp3`

**2. Book Tickets Band** (conditional: upcoming shows exist)
- Onassis-style `bg-purple` (purple) full-width band immediately after hero
- Labeled columns: Dates, Time, Location
- White "Book Tickets" button with `text-purple-dark`
- "Almost Full" badge with `bg-white/20`
- No separate booking section elsewhere on the page

**3. Synopsis + Poster** — 5/7 split
- Left (col-span-5): Poster image, sticky (`lg:sticky lg:top-24 lg:max-w-[280px]`), aspect-[2/3]
- Right (col-span-7): Synopsis text, then details below with border divider
- Details: Year, Language, Genre, Type, Duration (no "Status" row)

**4. Commissioned Context** (conditional) — 5/7 split
- Left: "Commissioned By" heading
- Right: Purple left border block with commissioner info

**5. Cast & Crew** — 5/7 split
- Left: "The People Behind the Play" (with `<br>` breaks for multi-line on desktop)
- Right: List of cast/crew, name in purple linked to `/people/[slug]`, roles in mono on right

**6. Gallery** (conditional) — Full bleed, NO heading
- `<Gallery fullBleed />` — edge-to-edge grid, 4 cols desktop / 3 tablet / 2 mobile, gap-1
- Lightbox on click
- Only renders if gallery has items

**7. Press & Reviews** (conditional) — 5/7 split
- Left: "Press & Reviews" heading
- Right: 2-column grid of `<PressCard>`
- PressCard has 3 states:
  - External URL → `<a>` with ExternalLink icon
  - Internal review (`reviewSlug`) → `<Link>` to `/reviews/[slug]` with FileText icon
  - No URL → static `<div>`, no icon
- Review pages at `/reviews/[slug]` display fullReview paragraphs, reviewer attribution, link back to production

**8. Related Productions** (conditional) — 5/7 split
- Left: "Also Worth Seeing" heading
- Right: `<RelatedProductions>` (simple card grid, no section wrapper)

### Key Rules
- All cast/crew names MUST link to `/people/[slug]`
- BookMyShow links: `target="_blank" rel="noopener noreferrer"`
- All conditional sections hidden when data is empty (no empty state headings)
- Video section removed — video lives in hero now
- Festival appearances section removed

---

## Adding a New Production (full workflow)

### 1. Research Phase
- **Web research the production**: Search for the play title + "Ideas Unlimited" + "Manoj Shah" to find external mentions, reviews, articles. These become press entries and blog post citations.
- **Search for the original work**: If it's an adaptation (e.g. Tagore, Manto), research the original author, the work's history, themes, and significance. This enriches the synopsis and blog post.
- **Find backlink-worthy sources**: Look for articles on KolkataTheatre.com, MumbaiTheatreGuide, Wikipedia, academic papers, newspaper archives that mention the production. These are SEO gold.
- **Extract info from provided materials**: Posters, brochures, newspaper clippings — extract cast, crew, venue, date, director's notes, reviewer quotes.

### 2. Data Entry
1. **Copy production photos** to `public/images/productions/{slug}/` — pick the most dramatic photo as the hero image
2. **Add people entries** to `data/people.json` for all cast and crew not already in the file (see Person Pages skill for the full person research workflow)
3. **Add festival entry** to `data/festivals.json` if the production appeared at a festival
4. **Add press entries** to `data/press.json` with `productionSlug`
5. **Add production entry** to `data/productions.json` with:
   - Full `cast_crew` array linking `person_id` + roles
   - `shows` array if scheduled performances exist
   - `gallery` array with all photo paths
   - `festivals` and `press` arrays referencing IDs
   - `musicUrl` path to ambient audio file if available (e.g. `/audio/achalayatan.mp3`)
   - Rich `synopsis` that weaves in the director's note, adaptation history, and performance context — not just a plot summary
6. **Page auto-generates** at `/productions/[slug]` on next build

### 3. Blog Post (REQUIRED for every new production)
- Add a blog post to `lib/blog.ts` about the production — this is not optional
- Follow the Brand Voice rules from the Blog Pages skill
- Use research from step 1: original author/work history, director's approach, cast highlights, external citations
- Include citable facts (original author, adaptation history, festival context, reviewer quotes)
- Reference external sources that mention Ideas Unlimited — this creates backlink opportunities
- See Blog Pages skill for full editorial guidelines

### 4. Press Reviews (for newspaper clippings without URLs)
- If provided materials include newspaper reviews/clippings without web URLs:
  - Add to `data/press.json` with `reviewSlug`, `fullReview` (array of paragraphs), and `reviewAuthor`
  - The review page auto-generates at `/reviews/[slug]`
  - Translate non-English reviews to English for the fullReview text
  - Keep original source, date, and attribution accurate

### 5. Validate
- Run `node -e "JSON.parse(require('fs').readFileSync('data/productions.json','utf8'))"` to validate JSON
- Check the page at `/productions/[slug]` in dev server
- Verify cast/crew names link correctly to `/people/[slug]`
- Check `/reviews/[slug]` for any review pages
