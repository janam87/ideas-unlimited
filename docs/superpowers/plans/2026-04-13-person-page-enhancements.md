# Person Detail Page Enhancements — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade `/people/[slug]` with IMDB-style "Beyond IU" thumbnails, a full-width media gallery, a share button, and hide the MetaRow section.

**Architecture:** Update the `Person` type with `NotableWork` objects and `PersonMedia`. The page component renders both legacy `string` entries and new structured entries. A new `MediaGallery` client component handles photos (lightbox) + videos (YouTube links with play overlays). The existing `ShareButton` is added inline with the name.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS v4, Framer Motion (not needed here), `yet-another-react-lightbox`, `lucide-react`

---

### Task 1: Update Type Definitions

**Files:**
- Modify: `lib/types.ts`

- [ ] **Step 1: Add NotableWork and PersonMedia interfaces, update Person**

In `lib/types.ts`, add the two new interfaces and update the `Person` interface:

```typescript
// Add after the PressItem interface (before FilterOptions)

export interface NotableWork {
  title: string;
  category?: string;
  year?: string;
  role?: string;
  thumbnail?: string;
  sourceUrl?: string;
  sourceLabel?: string;
}

export interface PersonMedia {
  photos?: string[];
  videos?: {
    url: string;
    thumbnail?: string;
    title?: string;
  }[];
}
```

Update the `Person` interface — change `otherNotableWork` and add `media`:

```typescript
export interface Person {
  id: string;
  slug: string;
  name: string;
  portrait: string;
  bio: string;
  roles: string[];
  otherNotableWork?: (NotableWork | string)[];  // string for legacy, NotableWork for enriched
  interviews?: { title: string; url: string; source: string }[];
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    website?: string;
  };
  media?: PersonMedia;
  featured?: boolean;
}
```

- [ ] **Step 2: Verify build**

Run: `cd /Users/janamshah_macair/Documents/Claude/ideas-unlimited && npx next build 2>&1 | tail -5`
Expected: Build succeeds (union type is backward-compatible with existing string[] data)

- [ ] **Step 3: Commit**

```bash
git add lib/types.ts
git commit -m "feat(types): add NotableWork and PersonMedia interfaces to Person type"
```

---

### Task 2: Hide MetaRow Section

**Files:**
- Modify: `app/people/[slug]/page.tsx`

- [ ] **Step 1: Remove the MetaRow rendering block**

In `app/people/[slug]/page.tsx`, delete the Details section (the block between the bio `</p>` and the Filmography section). Remove these lines:

```tsx
              {/* Details */}
              <div className="mt-10 pt-10 border-t border-grey-700">
                <MetaRow label="Productions" value={String(productions.length)} />
                <MetaRow label="Roles" value={person.roles.join(", ")} />
              </div>
```

Keep the `MetaRow` component definition at the bottom of the file — it may be re-enabled later.

- [ ] **Step 2: Verify dev server**

Run: `curl -s http://localhost:3002/people/disha-savla-upadhyay | grep -c 'Productions'`
Expected: 0 (or just occurrences in filmography titles, not the MetaRow label)

- [ ] **Step 3: Commit**

```bash
git add app/people/[slug]/page.tsx
git commit -m "feat(people): hide productions/roles MetaRow section"
```

---

### Task 3: Add Share Button Next to Name

**Files:**
- Modify: `app/people/[slug]/page.tsx`

- [ ] **Step 1: Import ShareButton and wrap name in flex container**

At the top of `app/people/[slug]/page.tsx`, add the import:

```tsx
import { ShareButton } from "@/components/shared/ShareButton";
```

Then replace the current name `<h1>` block:

```tsx
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream leading-[0.9] mb-8">
                {person.name}
              </h1>
```

With a flex container holding the name and share button:

```tsx
              <div className="flex items-start justify-between gap-4 mb-8">
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream leading-[0.9]">
                  {person.name}
                </h1>
                <ShareButton
                  title={person.name}
                  text={`${person.name} — ${person.roles.join(", ")} profile on Ideas Unlimited Productions`}
                />
              </div>
```

- [ ] **Step 2: Verify dev server**

Run: `curl -s http://localhost:3002/people/disha-savla-upadhyay | grep -c 'Share'`
Expected: At least 1 match

- [ ] **Step 3: Commit**

```bash
git add app/people/[slug]/page.tsx
git commit -m "feat(people): add share button inline with person name"
```

---

### Task 4: Upgrade "Beyond IU" Section with Thumbnails

**Files:**
- Modify: `app/people/[slug]/page.tsx`

- [ ] **Step 1: Create the NotableWorkRow component**

Add a new client component file at `components/people/NotableWorkRow.tsx`:

```tsx
"use client";

import Image from "next/image";
import type { NotableWork } from "@/lib/types";

interface NotableWorkRowProps {
  item: NotableWork | string;
}

export function NotableWorkRow({ item }: NotableWorkRowProps) {
  // Legacy string format — render plain text row
  if (typeof item === "string") {
    return (
      <div className="py-3 border-b border-grey-700 text-grey-300">
        {item}
      </div>
    );
  }

  const firstLetter = item.title.charAt(0).toUpperCase();

  const content = (
    <div className="flex items-center gap-3.5 py-3 border-b border-grey-700 group">
      {/* Thumbnail */}
      <div className="w-11 h-[60px] flex-shrink-0 relative overflow-hidden bg-grey-900 border border-grey-700">
        {item.thumbnail ? (
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-cover"
            sizes="44px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-grey-900 to-grey-800">
            <span className="font-serif text-lg text-grey-600">{firstLetter}</span>
          </div>
        )}
      </div>

      {/* Title + metadata */}
      <div className="flex-1 min-w-0">
        <p className="font-serif text-sm md:text-base text-cream group-hover:text-purple transition-colors truncate">
          {item.title}
        </p>
        {(item.category || item.year) && (
          <p className="font-mono text-xs text-grey-400 mt-0.5">
            {[item.category, item.year].filter(Boolean).join(" · ")}
          </p>
        )}
        {item.role && (
          <p className="text-xs text-purple-light mt-0.5">{item.role}</p>
        )}
      </div>

      {/* Source badge */}
      {item.sourceLabel && (
        <span className="flex-shrink-0 font-mono text-[10px] uppercase tracking-wider text-grey-400 border border-grey-700 px-2 py-0.5">
          {item.sourceLabel}
        </span>
      )}
    </div>
  );

  if (item.sourceUrl) {
    return (
      <a
        href={item.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
}
```

- [ ] **Step 2: Update the Beyond IU section in the page**

In `app/people/[slug]/page.tsx`, add the import at the top:

```tsx
import { NotableWorkRow } from "@/components/people/NotableWorkRow";
```

Replace the existing "Other Notable Work" section:

```tsx
              {/* Other Notable Work */}
              {person.otherNotableWork && person.otherNotableWork.length > 0 && (
                <div className="mt-16 pt-16 border-t border-grey-700">
                  <h2 className="font-serif text-3xl md:text-4xl text-cream mb-8">
                    Beyond IU
                  </h2>
                  <div className="border-t border-grey-700">
                    {person.otherNotableWork.map((work, i) => (
                      <div key={i} className="py-3 border-b border-grey-700 text-grey-300">
                        {work}
                      </div>
                    ))}
                  </div>
                </div>
              )}
```

With:

```tsx
              {/* Other Notable Work */}
              {person.otherNotableWork && person.otherNotableWork.length > 0 && (
                <div className="mt-16 pt-16 border-t border-grey-700">
                  <h2 className="font-serif text-3xl md:text-4xl text-cream mb-8">
                    Beyond IU
                  </h2>
                  <div className="border-t border-grey-700">
                    {person.otherNotableWork.map((work, i) => (
                      <NotableWorkRow key={i} item={work} />
                    ))}
                  </div>
                </div>
              )}
```

- [ ] **Step 3: Verify build**

Run: `cd /Users/janamshah_macair/Documents/Claude/ideas-unlimited && npx next build 2>&1 | tail -5`
Expected: Build succeeds. Existing string[] entries render as plain text rows via the legacy branch.

- [ ] **Step 4: Commit**

```bash
git add components/people/NotableWorkRow.tsx app/people/[slug]/page.tsx
git commit -m "feat(people): add IMDB-style Beyond IU section with thumbnail support"
```

---

### Task 5: Migrate Disha Savla's Data to New Format

**Files:**
- Modify: `data/people.json`

- [ ] **Step 1: Replace Disha Savla's otherNotableWork with structured objects**

In `data/people.json`, replace the `otherNotableWork` array for `disha-savla-upadhyay` (currently lines ~1129-1143). Replace the existing string array:

```json
    "otherNotableWork": [
      "TV: Neeli Chatri Waale (Zee TV, 2014–2016) — Lead role as Bobby Chaubey",
      "TV: Narsinh Mehta — Best Actress",
      "TV: Madam Sir (Sony SAB)",
      "TV: Meri Bhavya Life (Colors, 2025) — Rama Agarwal",
      "TV: Crime Patrol (Sony TV) — 20+ episodes",
      "TV: Savdhaan India (Life OK)",
      "TV: Alakshmi: Hamari Super Bahu",
      "Film: Hasee Toh Phasee (2014)",
      "Film: Char Fera Nu Chakdol (2023, Gujarati)",
      "Film: Halkee Fulkee (Gujarati)",
      "Film: Swagatam (2021, Gujarati)",
      "Upcoming: Gandhi (dir. Hansal Mehta) — as Putalibai",
      "Upcoming: Lakhpat Nu Bhoot (Gujarati)"
    ],
```

With:

```json
    "otherNotableWork": [
      {
        "title": "Neeli Chatri Waale",
        "category": "TV Series",
        "year": "2014–2016",
        "role": "Bobby Chaubey (Lead) — Nominated Best Actress, Comic Role",
        "sourceUrl": "https://www.imdb.com/title/tt8377874/",
        "sourceLabel": "IMDb"
      },
      {
        "title": "Narsinh Mehta",
        "category": "TV Series",
        "role": "Best Actress"
      },
      {
        "title": "Madam Sir",
        "category": "TV Series",
        "sourceUrl": "https://en.wikipedia.org/wiki/Maddam_Sir",
        "sourceLabel": "Wikipedia"
      },
      {
        "title": "Meri Bhavya Life",
        "category": "TV Series",
        "year": "2025",
        "role": "Rama Agarwal",
        "sourceUrl": "https://www.imdb.com/title/tt37536479/",
        "sourceLabel": "IMDb"
      },
      {
        "title": "Crime Patrol",
        "category": "TV Series",
        "role": "20+ episodes",
        "sourceUrl": "https://www.imdb.com/name/nm7457340/",
        "sourceLabel": "IMDb"
      },
      {
        "title": "Savdhaan India",
        "category": "TV Series"
      },
      {
        "title": "Alakshmi: Hamari Super Bahu",
        "category": "TV Series"
      },
      {
        "title": "Hasee Toh Phasee",
        "category": "Film",
        "year": "2014",
        "sourceUrl": "https://www.imdb.com/title/tt3173910/",
        "sourceLabel": "IMDb"
      },
      {
        "title": "Char Fera Nu Chakdol",
        "category": "Film",
        "year": "2023",
        "sourceUrl": "https://www.imdb.com/title/tt27957058/",
        "sourceLabel": "IMDb"
      },
      {
        "title": "Halkee Fulkee",
        "category": "Film"
      },
      {
        "title": "Swagatam",
        "category": "Film",
        "year": "2021",
        "role": "Sheela",
        "sourceUrl": "https://www.imdb.com/title/tt14606120/",
        "sourceLabel": "IMDb"
      },
      {
        "title": "Gandhi",
        "category": "Upcoming",
        "role": "Putalibai",
        "sourceUrl": "https://www.imdb.com/title/tt20317334/",
        "sourceLabel": "IMDb"
      },
      {
        "title": "Lakhpat Nu Bhoot",
        "category": "Upcoming"
      }
    ],
```

- [ ] **Step 2: Verify build and page**

Run: `cd /Users/janamshah_macair/Documents/Claude/ideas-unlimited && npx next build 2>&1 | tail -5`
Expected: Build succeeds. Disha's Beyond IU now renders structured rows with source badges.

- [ ] **Step 3: Commit**

```bash
git add data/people.json
git commit -m "feat(data): migrate Disha Savla otherNotableWork to structured NotableWork format"
```

---

### Task 6: Add MediaGallery Component

**Files:**
- Create: `components/people/MediaGallery.tsx`

- [ ] **Step 1: Create the MediaGallery client component**

Create `components/people/MediaGallery.tsx`:

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { PersonMedia } from "@/lib/types";

interface MediaGalleryProps {
  media: PersonMedia;
  name: string;
}

export function MediaGallery({ media, name }: MediaGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const photos = media.photos ?? [];
  const videos = media.videos ?? [];

  if (photos.length === 0 && videos.length === 0) return null;

  return (
    <div className="mt-16 pt-16 border-t border-grey-700">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="font-serif text-3xl md:text-4xl text-cream">
          Photos &amp; Videos
        </h2>
        <div className="flex gap-4">
          {photos.length > 0 && (
            <span className="font-mono text-xs text-grey-400 uppercase tracking-wider">
              {photos.length} {photos.length === 1 ? "Photo" : "Photos"}
            </span>
          )}
          {videos.length > 0 && (
            <span className="font-mono text-xs text-grey-400 uppercase tracking-wider">
              {videos.length} {videos.length === 1 ? "Video" : "Videos"}
            </span>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        {/* Photos */}
        {photos.map((src, i) => (
          <button
            key={`photo-${i}`}
            onClick={() => setLightboxIndex(i)}
            className="relative aspect-[4/3] overflow-hidden group cursor-pointer"
          >
            <Image
              src={src}
              alt={`${name} photo ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-background/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}

        {/* Videos */}
        {videos.map((video, i) => (
          <a
            key={`video-${i}`}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-[4/3] overflow-hidden group cursor-pointer bg-grey-900"
          >
            {video.thumbnail ? (
              <Image
                src={video.thumbnail}
                alt={video.title ?? `${name} video ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-grey-900 to-grey-800">
                <Play size={32} className="text-grey-600" />
              </div>
            )}
            {/* Play badge */}
            <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 flex items-center gap-1">
              <Play size={10} className="text-white fill-white" />
              <span className="font-mono text-[10px] text-white uppercase tracking-wider">Video</span>
            </div>
            {video.title && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2 pt-6">
                <p className="text-xs text-white truncate">{video.title}</p>
              </div>
            )}
            <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>

      {/* Lightbox for photos only */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={photos.map((src) => ({ src }))}
      />
    </div>
  );
}
```

- [ ] **Step 2: Verify the component compiles**

Run: `cd /Users/janamshah_macair/Documents/Claude/ideas-unlimited && npx next build 2>&1 | tail -5`
Expected: Build succeeds (component is created but not yet imported in the page)

- [ ] **Step 3: Commit**

```bash
git add components/people/MediaGallery.tsx
git commit -m "feat(people): add MediaGallery component with photo lightbox and video support"
```

---

### Task 7: Wire MediaGallery into Person Detail Page

**Files:**
- Modify: `app/people/[slug]/page.tsx`

- [ ] **Step 1: Import and render MediaGallery**

In `app/people/[slug]/page.tsx`, add the import at the top:

```tsx
import { MediaGallery } from "@/components/people/MediaGallery";
```

Add the media gallery section after the closing `</div>` of the right column (`lg:col-span-7`) but still inside the outer `max-w-6xl` container. Place it after the grid's closing `</div>` and before the container's closing `</div>`:

Find this closing structure (after the Press & Media section):

```tsx
            </div>
          </div>
        </div>
      </div>
```

Insert the MediaGallery between the grid close and the container close — after the second `</div>` (closing the grid) and before the third `</div>` (closing the container padding div):

```tsx
            </div>
          </div>

          {/* Media Gallery — full width, outside the 2-column grid */}
          {person.media && <MediaGallery media={person.media} name={person.name} />}

        </div>
      </div>
```

- [ ] **Step 2: Verify build**

Run: `cd /Users/janamshah_macair/Documents/Claude/ideas-unlimited && npx next build 2>&1 | tail -5`
Expected: Build succeeds. Gallery section hidden on all pages since no person has `media` data yet.

- [ ] **Step 3: Commit**

```bash
git add app/people/[slug]/page.tsx
git commit -m "feat(people): wire MediaGallery into person detail page"
```

---

### Task 8: Search and Add Media for Disha Savla

**Files:**
- Modify: `data/people.json`
- Create: downloaded images in `public/images/people/disha-savla-upadhyay/`

- [ ] **Step 1: Create the gallery directory**

```bash
mkdir -p /Users/janamshah_macair/Documents/Claude/ideas-unlimited/public/images/people/disha-savla-upadhyay
```

- [ ] **Step 2: Search for photos and videos**

Use WebSearch to find:
- Downloadable photos from Wikipedia, Wikimedia Commons, casting platforms, entertainment bio sites (NOT Instagram/Facebook/IMDB)
- YouTube video URLs: search for trailers of "Char Fera Nu Chakdol", "Neeli Chatri Waale", "Swagatam", "Hasee Toh Phasee", and "Meri Bhavya Life" that feature Disha Savla

Download any found photos to `public/images/people/disha-savla-upadhyay/` using WebFetch.

- [ ] **Step 3: Add media field to Disha Savla's data**

In `data/people.json`, add the `media` field to Disha Savla's entry (after the `socialLinks` block). Populate with whatever photos and videos were found. Example structure:

```json
    "media": {
      "photos": [
        "/images/people/disha-savla-upadhyay/gallery-1.jpg"
      ],
      "videos": [
        {
          "url": "https://www.youtube.com/watch?v=EXAMPLE",
          "title": "Char Fera Nu Chakdol — Official Trailer"
        }
      ]
    }
```

If no photos or videos are found, skip this field — the section will remain hidden.

- [ ] **Step 4: Verify build and page**

Run: `cd /Users/janamshah_macair/Documents/Claude/ideas-unlimited && npx next build 2>&1 | tail -5`
Expected: Build succeeds. If media was added, the Photos & Videos section appears on Disha's profile.

- [ ] **Step 5: Commit**

```bash
git add public/images/people/disha-savla-upadhyay/ data/people.json
git commit -m "feat(data): add media gallery content for Disha Savla"
```

---

### Task 9: Final Verification

- [ ] **Step 1: Full build**

Run: `cd /Users/janamshah_macair/Documents/Claude/ideas-unlimited && npx next build 2>&1 | tail -10`
Expected: Clean build, no errors, no warnings.

- [ ] **Step 2: Verify Disha Savla's page has all 4 changes**

Start dev server and check:
1. No MetaRow (Productions/Roles) section
2. Share button next to name
3. Beyond IU section with structured rows, source badges, and initial-letter fallbacks
4. Media gallery (if content was found)

Run:
```bash
curl -s http://localhost:3002/people/disha-savla-upadhyay | grep -c 'MetaRow\|Productions.*Roles'
# Expected: 0

curl -s http://localhost:3002/people/disha-savla-upadhyay | grep -c 'Share'
# Expected: >= 1

curl -s http://localhost:3002/people/disha-savla-upadhyay | grep -c 'IMDb'
# Expected: >= 1

curl -s http://localhost:3002/people/disha-savla-upadhyay | grep -c 'Photos'
# Expected: >= 1 (if media added) or 0 (if no media found)
```

- [ ] **Step 3: Verify a legacy person page still works**

Run: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3002/people/shyam-pathak`
Expected: 200 — Shyam Pathak's `otherNotableWork: string[]` renders as plain text rows via the legacy branch.

- [ ] **Step 4: Verify a person without otherNotableWork still works**

Run: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3002/people/bhargav-purohit`
Expected: 200 — Page loads fine with no Beyond IU section.
