# Production Detail Page Redesign

## Overview

Redesign `/productions/[slug]` to match the home page's editorial style — full-bleed hero with video/photo, consistent 5/7 split layout for all content sections, sticky poster alongside synopsis, full-width gallery, and expanded press/reviews.

## Sections (top to bottom)

### 1. Hero — Full Bleed Video or Photo

- If `production.videoUrl` exists: YouTube embed background (same technique as home Hero — muted, autoplay, looping, no controls)
- Otherwise: `production.image` as full-bleed background with `next/image`
- Gradient overlay from transparent to `--background`
- Title, subtitle, and "Now Performing" badge at bottom-left
- Aspect ratio: `21/9` on desktop, taller on mobile
- This is a `'use client'` component (YouTube API needs browser)

### 2. Synopsis Section — 5/7 Split with Sticky Poster

**Left column (lg:col-span-5):** Production poster image, `position: sticky; top: 80px` so it stays visible while the user scrolls through synopsis and details. Below the poster: "Book Tickets" CTA button (conditional on upcoming shows with ticket URL).

**Right column (lg:col-span-7):**
- Synopsis text (can be long)
- Divider
- Details metadata rows:
  - Year
  - Language
  - Genre (joined with comma)
  - Type
  - Duration (conditional)
  - Status: "Now Performing" in amber (conditional on upcoming shows)

**Mobile:** Poster on top, synopsis + details below. Poster is not sticky on mobile.

### 3. Upcoming Shows (conditional) — 5/7 Split

Keeps existing layout. Left: heading. Right: show list with date, venue, ticket links. Only renders if upcoming shows exist.

### 4. Commissioned By (conditional) — 5/7 Split

Keeps existing layout. Only renders if `commissionedBy` exists.

### 5. Cast & Crew — 5/7 Split

**Left:** Big serif heading "The People Behind the Play"

**Right:** List of cast/crew members. Each row:
- Name on left — hyperlinked in gold to `/people/[slug]`
- Roles on right — mono font, joined with " · "

All names must link to their people page. If person not found in data, render name as plain text.

### 6. Gallery — Full Bleed, No Heading

- No section heading — the images speak for themselves
- Full-width edge-to-edge grid (breaks out of `max-w-6xl` container)
- 4 columns on desktop, 3 on tablet, 2 on mobile
- Supports both photos and videos in the grid
- Lightbox on click (existing `yet-another-react-lightbox`)
- Small gap between items (3-4px)
- Only renders if gallery has items

### 7. Press & Reviews — 5/7 Split

**Left:** Big serif heading "Press & Reviews"

**Right:** 2-column grid of press/review cards. Card types:
- Press article: source name, excerpt quote, date, external link
- Newspaper cutout: image scan (future — uses existing PressCard for now)
- Audience review: star rating, quote, reviewer name (future data extension)

For now, uses existing `PressCard` component and `PressItem` data. Only renders if press items exist.

### 8. Related Productions (conditional) — 5/7 Split

Keeps existing layout. Left: heading. Right: 3 production cards.

## Data Model Changes

**No changes needed.** The existing `Production` type has all required fields:
- `image` — poster/hero fallback
- `videoUrl` — hero video (reused, removes standalone "Watch" section)
- `gallery` — gallery images
- `cast_crew` — linked via `person_id`
- All metadata fields already exist

The standalone "Watch" / "Video" section is removed since the video now lives in the hero.

## Mobile Behavior

- Hero: taller aspect ratio, title smaller
- Synopsis section: poster stacks on top (not sticky), synopsis + details below
- Gallery: 2 columns
- All 5/7 splits stack to single column
- Cast & crew: full-width list

## Components Affected

- `app/productions/[slug]/page.tsx` — main page, major rewrite
- New: `components/productions/ProductionHero.tsx` — `'use client'` component for video/photo hero
- `components/shared/Gallery.tsx` — update to support full-bleed layout variant

## Removed Sections

- Standalone "Video" / "Watch" section (video moves to hero)
- Festival Appearances standalone section (can be shown as badges in hero or details if needed)
