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
- Social links below photo (conditional): Instagram, Twitter, Website, IMDb, BookMyShow — purple mono links

### Right Column (col-span-7) — All content stacked

**1. Bio + Share Button**
- Roles in purple mono label
- Name in `text-4xl md:text-5xl lg:text-6xl` inside a flex container with `ShareButton` top-right
- Bio rendered as a `<div>` of `<p>` blocks split on `\n\n` — see "Bio paragraph rendering" below
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

## ⚠️ Schema Discipline — Field Names That Bite

These mistakes have shipped silently and broken profile pages. Always:

1. **Field is `socialLinks` not `social`** — the page reads `person.socialLinks?.instagram`. Entries that use `"social": {...}` validate as JSON but render nothing on the profile. If you see `"social"` in any new or edited person entry, rename it.
2. **Bio paragraphs use literal `\n\n`** in the JSON string — the renderer does `person.bio.split(/\n\n+/).map(...)`. If you write a 3-paragraph bio as one continuous string with no breaks, it renders as a wall of text.
3. **`otherNotableWork` items are objects, not strings** — legacy string entries still render but lose the thumbnail / source-link / category styling. Always emit structured `NotableWork` objects (see schema below).
4. **`portrait` field is required** even if it's the placeholder. Empty string breaks the `<Image>` component.

### Person object — full schema

```typescript
{
  id: string;                          // kebab-case slug, must match slug
  slug: string;
  name: string;
  portrait: string;                    // /images/people/{slug}.jpg or /images/placeholder-portrait.svg
  bio: string;                         // multi-paragraph: separate with \n\n
  roles: string[];                     // ["Actor", "Director", "Writer", ...]
  otherNotableWork?: NotableWork[];    // see below — always objects, never strings
  interviews?: { title, url, source }[];
  socialLinks?: {                      // NOT "social" — code reads socialLinks
    instagram?: string;
    twitter?: string;
    website?: string;
    imdb?: string;                     // shows as "IMDb" link
    bookmyshow?: string;               // shows as "BookMyShow" link
  };
  media?: { photos?: string[]; videos?: { url, title }[] };
  featured?: boolean;
  seoIndex?: boolean;                  // override auto noindex on thin profiles
  customLink?: string;                 // override default /people/[slug] route
}

NotableWork = {
  title: string;
  category?: "Film" | "TV Series" | "Web Series" | "Short Film" | "Theatre" | "Upcoming";
  year?: string;                       // "2020" or "2014–2016" — string, not number
  role?: string;
  thumbnail?: string;                  // /images/works/{slug}.jpg, ≥230px wide
  sourceUrl?: string;
  sourceLabel?: string;                // "IMDb" | "TMDB" | "Wikipedia" | "YouTube" | "Mumbai Theatre Guide" | etc
}
```

---

## Bio Quality Standard

Thin one-line bios make a profile useless. The standard for a known artist is **3–4 paragraphs**, separated by `\n\n`, covering:

1. **Origin + training** — DOB if confirmed, birthplace, schooling, theatre training (NSD / mentor / classical), academic degrees. Lead with concrete facts, not adjectives.
2. **Career arc** — early Mumbai years, signature roles, the breakout, what they're known for. Mention specific titles + years + roles.
3. **Ideas Unlimited connection** — which IU productions, what role, who they worked with. This is the page's whole reason for existing — never bury it.
4. **Personal / current work** — current touring plays, ongoing TV roles, family if confirmed, awards. Optional.

Rules:
- Only **confirmed** facts. If you cannot verify DOB/marriage/etc from at least one source, omit. Do not invent.
- Specific over generic. "Played the clerk Sumanlal in Master Phoolmani (1999), based on Satish Alekar's Begum Barve" beats "performed in many Manoj Shah productions."
- No superlatives. "Acclaimed", "renowned", "veteran" only when sourced — and even then prefer the concrete fact (e.g. "45 years on stage" instead of "veteran").
- Write in past or present tense, not future. Don't promise upcoming work.
- Names of plays / films / series are **not italicised** in JSON — formatting comes from the page renderer.
- If research returns ambiguous results (common name, multiple people with same name), keep the bio minimal and flag in the response. The Bakul Tailor case stays a placeholder rather than risk a wrong-person bio.

---

## Notable Work Completeness Standard

A working veteran's profile should expose **≥15 entries** in `otherNotableWork`. A new entrant's may have 3–5. Aim for the IMDb-style depth that lets a casting director scroll the page and recognise the person.

Order entries by importance, not chronology — most recognisable role first, then chronological for the rest. Don't bury the breakout role at the bottom.

Categories to include (when confirmed):
- Lead and supporting roles in Films, TV Series, Web Series, Short Films
- Theatre productions outside Ideas Unlimited (Arpana, Ekjute, NSD, Globe Festival, etc.)
- Behind-camera credits if substantial (writer, director, acting coach) — labelled in `role`
- Major upcoming releases (`category: "Upcoming"` or year=future)

Skip:
- Per-episode TV reality writer entries (these inflate IMDb counts but make the profile noisy — bundle in bio prose)
- Uncredited / cameo / blink-and-miss roles unless that's all there is
- Duplicate entries that aggregator sites confused

For each entry verify the credit on **at least 2 independent sources** before adding. Single-source claims go in with `confidence: medium` flagged in the chat response, not silently into the data.

---

## Adding a New Person (full workflow)

### 1. Create Basic Entry
1. Add entry to `data/people.json` with id, slug, name, placeholder portrait, basic bio, roles, **`socialLinks` (not `social`)**.
2. Add their `cast_crew` entries in relevant productions.
3. Profile auto-generates at `/people/[slug]`.

### 2. Research Phase (enrichment) — Deep Protocol

For each person, run **multiple search waves** before stopping. The first wave often misses half the career.

**Wave 1 — Primary aggregators (run in parallel):**
- IMDb: `imdb.com/name/{nm-id}/` — usually blocked to bots; try Wayback Machine `web.archive.org/web/*/imdb.com/name/{nm-id}/` and mobile `m.imdb.com/name/{nm-id}/`
- TMDB: `themoviedb.org/person/{tmdb-id}` — exposes credits + posters in one call
- Wikipedia: `en.wikipedia.org/wiki/{Name}` — bio + filmography section
- BookMyShow: `in.bookmyshow.com/person/{slug}/{id}` — usually blocked to bots; live touring plays only

**Wave 2 — Secondary aggregators (when Wave 1 thin):**
- BollywoodMDB, Cinestaan, NETTV4U, Filmibeat, WikiBio, StarsUnfolded, Tring, Grokipedia
- Rotten Tomatoes celebrity pages
- Each often has 5–10 credits the others miss

**Wave 3 — Theatre / regional (Indian theatre artists):**
- Mumbai Theatre Guide (interviews + reviews)
- NCPA Mumbai event archive
- Forbes Gujarati Sabha records (Gujarati artists)
- Junoon Theatre archives
- Creative Yatra, DeshGujarat (regional)
- Shakespeare's Globe-to-Globe archive (international)
- Mahindra Excellence in Theatre Awards (META) listings

**Wave 4 — News / press:**
- Bollywood Hungama, Times of India entertainment, Mid-day, Mumbai Mirror, Indian Express, DNA, National Herald
- Tellychakkar, India-Forums (TV)
- DNP India, Filmibeat (regional / wedding / event coverage)
- Koimoi, SpotboyE (interviews)

**Wave 5 — Direct video:**
- YouTube interviews — durable thumbnails (`i.ytimg.com/vi/{id}/maxresdefault.jpg`)
- Podcast clips (Coconut Theatre, eNatya Chaupal)

**Cross-check rule:** every `NotableWork` entry must appear in **at least 2 independent sources**. Single-source entries go in with a flag, not silently. Aggregator sites often share data — TMDB + IMDb count as related, not independent.

**Spelling variants:** always try "Mazumdar / Majumdar / Mazoomdaar", "Dikshit / Dixit", "Tailor / Darji", and Gujarati-script equivalents (બકુલ ટેલર) for regional artists.

**Disambiguation:** common names (Bakul, Hemant, Rohit) often hit multiple people. Cross-check that the person you're researching is the **Mumbai Gujarati theatre / Manoj Shah collaborator**, not a same-name actor in another industry. If the IMDb page disagrees with Wikipedia about hometown or training, surface the conflict — don't blend.

### 3. Update Bio with Confirmed Facts
- Replace generic placeholder bio with 3–4 paragraph bio per the **Bio Quality Standard** above.
- Use `\n\n` between paragraphs.
- Add `otherNotableWork` per the **Notable Work Completeness Standard** above — full structured `NotableWork` objects.
- Add `socialLinks` (instagram, twitter, website, imdb, bookmyshow) where found.
- Add `interviews` array with confirmed press / interview links — not the same as press reviews of productions.
- Confirmation rule: every claim must be sourced. If the only source is a fan-aggregator (StarsUnfolded etc.) and Wikipedia disagrees, prefer Wikipedia.

### 4. Source Portrait Photos
- **Allowed sources** (downloadable, hotlink-tolerant): Wikipedia/Wikimedia Commons, Gaatha/Somaiya cultural-archive sites, BollywoodMDB, Cinestaan, NETTV4U, StarsUnfolded, news photo galleries (Indian Express, Times of India), YouTube interview maxres thumbnails (last resort).
- **Blocked sources**: Instagram, Facebook, IMDb (Amazon CDN tokens rotate), Twitter — these block scraping or expire.
- Save to `public/images/people/{slug}.jpg` — aim for ≥600px wide. 500px acceptable for thumbnails.
- Update `portrait` field from placeholder SVG to the saved path.
- Verify the file is actually a JPEG/PNG (`file -b` check) — some servers return HTML on bot detection.
- If no photo confidently identifies the right person, keep the placeholder. Do not use a same-name actor's photo.
- Portrait uses `object-cover object-top` — never stretches.

### 5. Source Poster Thumbnails for Notable Works
- **Primary source: TMDB** — search `themoviedb.org` for each show/film, get the page, extract poster `poster_path` from `og:image` meta or page metadata. URL pattern: `https://image.tmdb.org/t/p/w500/{file_path}`. The `w500` is the size; `original` for full-res.
- **Fallback: Wikipedia infobox** — `https://en.wikipedia.org/wiki/{Title}` → page right-sidebar image. Direct Wikimedia URL is `upload.wikimedia.org/wikipedia/en/{a}/{ab}/{Filename}.jpg` (NOT the `/thumb/...` variant — that's a small crop).
- **Last resort: YouTube trailer thumbnail** — `https://i.ytimg.com/vi/{video_id}/maxresdefault.jpg`. Note these are 1280×720 landscape — they crop oddly in the 44×60 thumbnail slot. Mark `confidence: low` and prefer leaving the entry without a thumbnail (letter-glyph fallback) over a poor crop.
- Save to `public/images/works/{slug}.jpg` (or `.png`) — these are **shared** across all people who share the credit. Always check `ls public/images/works/` before downloading to avoid duplicates.
- Verify each download is actually an image (`file -b "$f"` returns "JPEG image data" or "PNG image data") and has a sensible width (`sips --getProperty pixelWidth`). Reject HTML responses, error pages, 0-byte files.
- Aim for ≥230px width; the rendered slot is 44×60px so even small posters work, but very small images (<150px) look pixelated.
- Set `thumbnail` field on the matching `NotableWork` entry. Items must use `object-cover` — never stretch, always crop to fill.
- For thumbnails that absolutely cannot be sourced, omit the field — the page falls back to a styled first-letter glyph in serif. Never invent a URL.

### 6. Source Media Gallery Content
- Search for downloadable photos from bio sites, casting platforms.
- Search YouTube for trailers, interviews, promos featuring the person.
- Save photos to `public/images/people/{slug}/gallery-{n}.jpg`.
- Add `media` field with `photos` and `videos` arrays.
- Videos need only a YouTube URL and title — thumbnail is optional (play icon shown as fallback).
- Section auto-hides when no media is present.

### 7. Validate
- `node -e "JSON.parse(require('fs').readFileSync('data/people.json','utf8'))"` — JSON parse
- `npx tsc --noEmit` — TypeScript check (catches bad NotableWork shape)
- `npm run build` — build runs all SSG; if `/people/{slug}` page generates, the data is rendering. Check the generated HTML at `.next/server/app/people/{slug}.html` contains the expected facts.
- Live check: `npx next start` and curl `http://localhost:3000/people/{slug}` — verify HTTP 200, then grep the HTML for the bio's distinctive phrases, the IMDb link, and at least one poster thumbnail path.

---

## Profile Completeness Checklist

For a known working artist, before marking the profile done:

- [ ] Real portrait at `/images/people/{slug}.jpg` (≥500px), not the placeholder SVG
- [ ] 3–4 paragraph bio with `\n\n` separators, covering origin/training/career/IU/personal
- [ ] DOB or birthplace if publicly known
- [ ] **`socialLinks`** (not `social`) field with at minimum Instagram, plus IMDb / BookMyShow / website where they exist
- [ ] ≥15 `NotableWork` entries for veterans (3+ for new entrants)
- [ ] Poster thumbnail on every major film/TV/web entry — ≥80% should have one
- [ ] At least one theatre credit other than IU (if they do theatre elsewhere)
- [ ] `interviews` array with 3+ press / video links
- [ ] `cast_crew` entries added in each IU production they appear in
- [ ] JSON validates, TS compiles, build succeeds, live page renders all the above

If the profile fails the checklist with the available research, say so explicitly — do not paper over gaps with generic prose.

---

## What Makes a Good Person Bio (worked example)

❌ Bad — generic, no facts:
> "A versatile Gujarati actor who has worked extensively in theatre. Known for his command of language and literary readings, he is a frequent collaborator on Gujarati theatre productions in Mumbai."

✅ Good — concrete, sourced, layered:
> "A veteran of Indian theatre with more than 45 years on stage across Gujarati, Hindi, and English, Utkarsh Mazumdar belongs to the Nagar community. He studied English Literature at St. Xavier's College, Mumbai, holds a Kovid in Sanskrit, and trained as a classical vocalist; his theatre apprenticeship was under Satyadev Dubey, Laxmikant Karpe, and Arvind Thakkar.\n\nIn 1985 he co-founded the theatre group Arpana with Sunil Shanbag, Akash Khurana, and Shishir Sharma, directing its debut production Uljulool…"

The good version names the community, the college, the mentor, the year, the co-founders, the debut production. Each fact is a hook a reader can verify or remember.
