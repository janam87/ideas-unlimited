# Person Detail Page Enhancements

**Date:** 2026-04-13
**Status:** Approved
**Scope:** `/people/[slug]` detail page — 4 changes

---

## 1. Hide MetaRow Section

Remove the "Productions" count and "Roles" MetaRow section from all person detail pages. This section sits between the bio and the "With Ideas Unlimited" filmography.

**What to change:**
- Comment out or remove the MetaRow section in `app/people/[slug]/page.tsx` (lines ~100-104)
- Keep the `MetaRow` component definition in the file — it may be re-enabled later
- No data model changes needed

---

## 2. Beyond IU — Thumbnails + Source Links

Transform the "Beyond IU" section from a plain text list into an IMDB-style filmography with poster thumbnails and source links.

### Data Model Change

`otherNotableWork` changes from `string[]` to `NotableWork[]` on the `Person` type:

```typescript
interface NotableWork {
  title: string;           // e.g. "Neeli Chatri Waale"
  category?: string;       // e.g. "TV Series", "Film", "Theatre"
  year?: string;           // e.g. "2014", "2014-2016"
  role?: string;           // e.g. "Bobby Chaubey (Lead)"
  thumbnail?: string;      // local path e.g. "/images/works/neeli-chatri-waale.jpg"
  sourceUrl?: string;      // external link e.g. IMDB, YouTube, Wikipedia
  sourceLabel?: string;    // e.g. "IMDb", "YouTube", "Wikipedia"
}
```

### Layout

Each work item renders as a row:
- **Left:** 44x60px poster thumbnail (aspect ~3:4). When no `thumbnail` is provided, show a dark placeholder with the first letter of the title in serif font.
- **Center:** Title in serif, category/year in grey-400 mono below, role in purple-light below that (conditional).
- **Right:** Source badge — mono uppercase label (e.g. "IMDb") styled as a subtle bordered pill. The entire row is a link when `sourceUrl` is present; otherwise it's a static div.
- External links: `target="_blank" rel="noopener noreferrer"`

### Migration

Existing `otherNotableWork: string[]` entries need to be migrated to the new object format. The migration parses existing strings like `"TV: Neeli Chatri Waale (Zee TV, 2014-2016) — Lead role as Bobby Chaubey"` into structured fields. Update Disha Savla's data as the first example.

---

## 3. Media Gallery — Photos & Videos

A full-width gallery section for photos and videos of the person's work, placed after all right-column content and spanning both grid columns.

### Data Model Addition

Add a `media` field to the `Person` type:

```typescript
interface PersonMedia {
  photos?: string[];   // local paths e.g. "/images/people/disha-savla/gallery-1.jpg"
  videos?: {
    url: string;       // YouTube URL
    thumbnail?: string; // local thumbnail path (optional — show play icon overlay on placeholder if missing)
    title?: string;     // e.g. "Char Fera Nu Chakdol — Official Trailer"
  }[];
}
```

Add to Person interface:
```typescript
media?: PersonMedia;
```

### Layout

- Sits outside the 2-column grid, full-width within `max-w-6xl` container
- Section heading: "Photos & Videos" in serif, with counts in mono (e.g. "4 Photos", "2 Videos") aligned right
- Grid: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1`
- Photos: `aspect-[4/3]`, click opens existing Lightbox
- Videos: same grid cell, play icon overlay (triangle in a semi-transparent pill, top-right corner). Click opens YouTube URL in new tab.
- Section is completely hidden when `media` is undefined or both `photos` and `videos` are empty
- Reuses existing `Gallery` component pattern for photos. Videos render separately within the same grid.

---

## 4. Share Button — Inline with Name

Add the existing `ShareButton` component next to the person's name.

### Placement

- Inside the right column, on the same line as the h1 name
- Flex container: name on left, share button on right, `items-start` alignment
- The ShareButton uses Web Share API (mobile) with clipboard fallback (desktop)
- Already exists at `components/shared/ShareButton.tsx` — no new component needed

### Props

```tsx
<ShareButton title={person.name} text={`${person.name} — Actor profile on Ideas Unlimited Productions`} />
```

---

## Files Changed

| File | Change |
|------|--------|
| `lib/types.ts` | Add `NotableWork` interface, `PersonMedia` interface. Change `otherNotableWork` from `string[]` to `NotableWork[]`. Add `media?: PersonMedia` to `Person`. |
| `app/people/[slug]/page.tsx` | Remove MetaRow section. Update Beyond IU rendering for new data shape. Add media gallery section. Add ShareButton next to name. |
| `data/people.json` | Migrate Disha Savla's `otherNotableWork` to new object format. Other people keep their current `string[]` format. The rendering component checks `typeof item === 'string'` and renders plain text rows (no thumbnail, no link) for legacy entries. This avoids a bulk data migration — people are upgraded one at a time as their profiles are enriched. |

## Out of Scope

- PDF profile download (parked in ROADMAP.md)
- Fetching thumbnails from external APIs at build time
- Changes to `/people` directory listing page
- Changes to other person data beyond Disha Savla (migration happens incrementally)
