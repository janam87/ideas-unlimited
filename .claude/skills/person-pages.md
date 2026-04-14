---
name: person-pages
description: Use when building or modifying /people directory or /people/[slug] profile pages
---

# Person Pages
## `/people` directory + `/people/[slug]` profile
## Read for every person-related page, component, or data change

---

## What These Pages Are

The People pages are the IMDb-style wiki system for the entire company ensemble:

- `/people` is the directory — filterable grid of all cast and crew
- `/people/[slug]` is one record — every person gets a full profile, auto-generated from data

Adding a new person = adding an entry to `data/people.json` + their `cast_crew` entries in productions. No code needed.

---

## `/people` — Directory Page

### Layout
- Page header: title "The People" + count + "35 years", same layout as Productions page
- Uses `max-w-6xl` container directly (no Container/SectionHeading)
- No editorial rules/hr elements

### Filters (`'use client'`)
- Role filter: All / Actor / Director / Writer / etc. (derived from data)
- Sort: Name A–Z / Most Productions
- State in URL search params
- Custom select styling: `pl-4 pr-10 py-2.5`, custom chevron via CSS

### People Grid
- 3 cols desktop → 2 tablet → 1 mobile, `gap-8` (matches productions grid)
- `<PersonCard>`: landscape image `aspect-[4/3]`, name only (no roles, no production count on card)
- Hover: scale image, name turns gold

---

## `/people/[slug]` — Profile Page

### Layout — Single Grid with Sticky Photo

The entire page is one `grid grid-cols-1 lg:grid-cols-12` — photo on left (sticky), all content sections stacked on right. This ensures the photo stays visible while scrolling through all content.

### Left Column (col-span-5)
- Photo: `aspect-[3/4]`, sticky (`lg:sticky lg:top-24 lg:max-w-[320px]`)
- Social links below photo (conditional): Instagram, Twitter, Website — gold mono links

### Right Column (col-span-7) — All content stacked

**1. Bio + Share Button**
- Roles in gold mono label
- Name in `text-4xl md:text-5xl lg:text-6xl` inside a flex container with `ShareButton` top-right
- Bio text in `text-grey-200 text-lg`
- `ShareButton` (from `components/shared/ShareButton.tsx`) uses Web Share API / clipboard fallback

**2. ~~Details~~ (HIDDEN)**
- MetaRow section (Productions count, Roles) is currently hidden — may be re-enabled later
- The `MetaRow` component definition remains in the file

**3. Filmography** (separated by `mt-16 pt-16 border-t`)
- Heading: "With Ideas Unlimited"
- List: year in mono, title linked to `/productions/[slug]`, roles in mono on right

**4. Other Notable Work — IMDB-style** (conditional, same separator pattern)
- Heading: "Beyond IU"
- Uses `NotableWorkRow` component (`components/people/NotableWorkRow.tsx`, `'use client'`)
- Each row: 44x60px poster thumbnail (left) + title/category/year/role (center) + source badge (right)
- Poster thumbnails stored in `public/images/works/{slug}.jpg` — shared across all people
- When no thumbnail: styled first-letter fallback in serif font
- When `sourceUrl` present: entire row is an external link
- Source badge: mono uppercase bordered pill (e.g. "IMDb", "Wikipedia", "YouTube")
- Supports both legacy `string` entries and structured `NotableWork` objects via `typeof item === 'string'` check

**5. Press & Interviews** (conditional, same separator pattern)
- Heading: "Press & Media"
- 2-column grid of interview cards + PressCards

**6. Media Gallery** (conditional, full-width outside the 2-column grid)
- Uses `MediaGallery` component (`components/people/MediaGallery.tsx`, `'use client'`)
- Heading: "Photos & Videos" with counts in mono (e.g. "4 Photos", "2 Videos")
- Grid: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1`
- Photos: click opens `yet-another-react-lightbox` Lightbox
- Videos: external YouTube links with play badge overlay + optional title bar
- Section hidden when `media` is undefined or both arrays empty
- Photos stored in `public/images/people/{slug}/gallery-{n}.jpg`

### Key Rules
- All production titles link to `/productions/[slug]`
- Photo sticks across ALL sections (not just the first one)
- Portrait uses `object-cover object-top` to crop without stretching, face stays visible
- No Container or SectionHeading components — all inline
- External links: `target="_blank" rel="noopener noreferrer"`
- Conditional sections hidden when data is empty
- Poster thumbnails: `object-cover` only, never stretch — crop to fill

---

## Adding a New Person (full workflow)

### 1. Create Basic Entry
1. Add entry to `data/people.json` with id, slug, name, placeholder portrait, basic bio, roles
2. Add their `cast_crew` entries in relevant productions
3. Profile auto-generates at `/people/[slug]`

### 2. Research Phase (enrichment)
For each person, run web searches to find real biographical information:
- **Search queries**: "{name} actor", "{name} theatre", "{name} Ideas Unlimited", "{name} Manoj Shah"
- **Platforms to check**: IMDB, Instagram, Facebook, LinkedIn, Wikipedia, MumbaiTheatreGuide, casting platforms (Cretso, Castkro)
- **Try spelling variants**: e.g. "Dikshit" / "Dixit", "Upadhaya" / "Upadhyay"
- **Run searches in parallel** using multiple agents for efficiency (one per person or batch smaller names together)

### 3. Update Bio with Confirmed Facts
- Replace generic placeholder bio with real details: training, notable roles, other work, connection to IU
- Add `otherNotableWork` array with confirmed credits — use **structured `NotableWork` objects** (not strings)
- Add `socialLinks` (instagram, twitter, website) where found
- Add `interviews` array with confirmed press/interview links
- Only include information that is **confirmed** — if a common name returns ambiguous results, keep the basic bio

### 4. Source Photos
- **Priority sources for downloadable photos**: Wikipedia/Wikimedia Commons, personal websites, casting platforms (Cretso, Castkro), entertainment bio sites (StarsUnfolded, Alchetron, IndianFilmHistory, nettv4u)
- **Cannot download from**: Instagram, Facebook, IMDB (these block scraping)
- Save portrait to `public/images/people/{slug}.jpg` — aim for at least 600px wide
- Update `portrait` field from placeholder SVG to `/images/people/{slug}.jpg`
- If no photo is found, keep the placeholder — do not use unverified images
- Portrait uses `object-cover object-top` — never stretches

### 5. Source Poster Thumbnails for Notable Works
- **TMDB is the primary source**: search `themoviedb.org` for each show/film
- TMDB image URL pattern: `https://image.tmdb.org/t/p/w500/{file_id}.jpg`
- Fetch via TMDB main page for the title → extract poster `file_path` from page metadata
- Save to `public/images/works/{slug}.jpg` (or `.png`) — these are **shared** across all people
- Before downloading, check if the poster already exists in `public/images/works/` (another person may have the same credit)
- If not on TMDB: check Wikipedia infobox images, Google Image search
- User can also provide poster images directly
- Images must use `object-cover` — never stretch, always crop to fill

### 6. Source Media Gallery Content
- Search for downloadable photos from bio sites, casting platforms
- Search YouTube for trailers, interviews, promos featuring the person
- Save photos to `public/images/people/{slug}/gallery-{n}.jpg`
- Add `media` field with `photos` and `videos` arrays
- Videos need only a YouTube URL and title — thumbnail is optional (play icon shown as fallback)
- Section auto-hides when no media is present

### 7. What Makes a Good Person Bio
- Lead with their training or background (NSD, classical training, etc.)
- Mention their IU connection specifically (which productions, what roles)
- Include notable non-IU work (TV shows, films) that readers might recognise
- Keep it 2-3 sentences, factual, no superlatives
- Example: "A National School of Drama graduate, Shyam Pathak began his career on the Mumbai stage with Ekjute Theatre Group before becoming widely known as Popatlal in Taarak Mehta Ka Ooltah Chashmah. His Gujarati roots and theatre training brought him into the Ideas Unlimited fold."

### 8. NotableWork Data Format
Use structured objects (not plain strings) for `otherNotableWork`:
```json
{
  "title": "Neeli Chatri Waale",
  "category": "TV Series",
  "year": "2014–2016",
  "role": "Bobby Chaubey (Lead)",
  "thumbnail": "/images/works/neeli-chatri-waale.png",
  "sourceUrl": "https://www.imdb.com/title/tt8377874/",
  "sourceLabel": "IMDb"
}
```
- `category`: "TV Series", "Film", "Theatre", "Upcoming", "Web Series"
- `sourceLabel`: "IMDb", "Wikipedia", "YouTube", or any source name
- `thumbnail` and `sourceUrl` are optional — items render fine without them
- Legacy `string` entries still work (rendered as plain text rows) — migrate incrementally
