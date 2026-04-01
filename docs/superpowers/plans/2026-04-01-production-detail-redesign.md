# Production Detail Page Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign `/productions/[slug]` with a full-bleed video/photo hero, sticky poster + synopsis section, and consistent 5/7 split layout matching the home page.

**Architecture:** The page is a Next.js App Router page. A new `'use client'` `ProductionHero` component handles video/photo hero backgrounds. The main page remains a server component. The Gallery component gets a `fullBleed` variant. All sections use the established `lg:grid-cols-12` with `col-span-5` / `col-span-7` split.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion (`motion/react`), YouTube IFrame API, `yet-another-react-lightbox`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `components/productions/ProductionHero.tsx` | Create | `'use client'` hero with YouTube video or static image background |
| `app/productions/[slug]/page.tsx` | Rewrite | Page layout — hero, synopsis+poster, cast/crew, gallery, press, related |
| `components/shared/Gallery.tsx` | Modify | Add `fullBleed` prop for edge-to-edge layout without heading |

---

### Task 1: Create ProductionHero Component

**Files:**
- Create: `components/productions/ProductionHero.tsx`

This is a `'use client'` component that renders a full-bleed hero. If a `videoUrl` is provided and contains a YouTube URL, it embeds a muted autoplay looping video background (same technique as home `Hero.tsx`). Otherwise it renders a static image via `next/image`. Title, subtitle, and optional "Now Performing" badge overlay at the bottom-left.

- [ ] **Step 1: Create the ProductionHero component**

Create `components/productions/ProductionHero.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface ProductionHeroProps {
  title: string;
  subtitle?: string;
  image: string;
  videoUrl?: string;
  isUpcoming: boolean;
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
  return match ? match[1] : null;
}

export function ProductionHero({ title, subtitle, image, videoUrl, isUpcoming }: ProductionHeroProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const videoId = videoUrl ? extractYouTubeId(videoUrl) : null;

  useEffect(() => {
    if (!videoId) return;

    function createPlayer() {
      if (!playerRef.current) return;
      new window.YT.Player(playerRef.current, {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          playlist: videoId,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event: YT.PlayerEvent) => {
            event.target.mute();
            event.target.playVideo();
          },
          onStateChange: (event: YT.OnStateChangeEvent) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo();
            }
          },
        },
      });
    }

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    }
  }, [videoId]);

  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex flex-col justify-end pb-12 md:pb-16 overflow-hidden">
      {/* Background */}
      {videoId ? (
        <div
          className="absolute inset-0 overflow-hidden [&_iframe]:absolute [&_iframe]:top-1/2 [&_iframe]:left-1/2 [&_iframe]:-translate-x-1/2 [&_iframe]:-translate-y-1/2 [&_iframe]:min-w-[100vw] [&_iframe]:min-h-[100vh] [&_iframe]:w-[177.78vh] [&_iframe]:h-[56.25vw] [&_iframe]:border-none [&_iframe]:pointer-events-none"
          aria-hidden="true"
        >
          <div ref={playerRef} />
        </div>
      ) : (
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {isUpcoming && (
          <Badge variant="amber" className="mb-4">Now Performing</Badge>
        )}
        <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl text-cream leading-[0.9]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gold text-xl md:text-2xl font-serif italic mt-4">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx next build 2>&1 | head -30` — or just check the dev server at `http://localhost:3000` for no errors. The component isn't used yet so this just confirms no syntax issues.

- [ ] **Step 3: Commit**

```bash
git add components/productions/ProductionHero.tsx
git commit -m "feat: add ProductionHero component with video/photo background"
```

---

### Task 2: Update Gallery for Full-Bleed Variant

**Files:**
- Modify: `components/shared/Gallery.tsx`

Add a `fullBleed` prop. When true, uses a 4-col desktop / 3-col tablet / 2-col mobile grid with minimal gap, and no wrapper padding. The existing default layout is preserved for other consumers.

- [ ] **Step 1: Add fullBleed prop to Gallery**

Edit `components/shared/Gallery.tsx` — update the interface and the grid classes:

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface GalleryProps {
  images: string[];
  title: string;
  fullBleed?: boolean;
}

export function Gallery({ images, title, fullBleed = false }: GalleryProps) {
  const [index, setIndex] = useState(-1);

  if (images.length === 0) return null;

  return (
    <div>
      <div
        className={
          fullBleed
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1"
            : "grid grid-cols-2 md:grid-cols-3 gap-3"
        }
      >
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="relative aspect-[4/3] overflow-hidden group cursor-pointer"
          >
            <Image
              src={src}
              alt={`${title} gallery image ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-background/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={images.map((src) => ({ src }))}
      />
    </div>
  );
}
```

- [ ] **Step 2: Verify dev server shows no errors**

Check `http://localhost:3000` — existing gallery usage should still work since `fullBleed` defaults to `false`.

- [ ] **Step 3: Commit**

```bash
git add components/shared/Gallery.tsx
git commit -m "feat: add fullBleed variant to Gallery component"
```

---

### Task 3: Rewrite the Production Detail Page

**Files:**
- Modify: `app/productions/[slug]/page.tsx`

This is the main rewrite. The page structure becomes:

1. Hero (ProductionHero)
2. Synopsis section — 5/7 split: sticky poster left, synopsis + details + CTA right
3. Upcoming Shows (conditional) — 5/7 split (kept as-is)
4. Commissioned By (conditional) — 5/7 split (kept as-is)
5. Cast & Crew — 5/7 split: serif heading left, linked list right
6. Gallery — full-bleed, no heading
7. Press & Reviews — 5/7 split (kept, with more cards)
8. Related Productions — 5/7 split

The standalone "Video" / "Watch" section is removed (video is now in the hero).
The "Festival Appearances" standalone section is removed (festivals shown as badges in details if needed).

- [ ] **Step 1: Rewrite page.tsx**

Replace the full contents of `app/productions/[slug]/page.tsx` with:

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Calendar, Ticket } from "lucide-react";
import {
  getAllProductions,
  getProductionBySlug,
  getPersonBySlug,
  getPressForProduction,
} from "@/lib/data";
import { getUpcomingShows, formatShowDate, formatShowTime, hasUpcomingShows } from "@/lib/shows";
import { productionSchema, eventSchema } from "@/lib/schema";
import { Badge } from "@/components/ui/Badge";
import { Gallery } from "@/components/shared/Gallery";
import { PressCard } from "@/components/shared/PressCard";
import { RelatedProductions } from "@/components/shared/RelatedProductions";
import { ProductionHero } from "@/components/productions/ProductionHero";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProductions().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const production = getProductionBySlug(slug);
  if (!production) return { title: "Not Found" };
  return {
    title: production.title,
    description: production.synopsis,
    openGraph: {
      title: production.title,
      description: production.synopsis,
      images: [production.image],
    },
  };
}

export default async function ProductionDetailPage({ params }: Props) {
  const { slug } = await params;
  const production = getProductionBySlug(slug);
  if (!production) notFound();

  const upcomingShows = getUpcomingShows(production);
  const isUpcoming = hasUpcomingShows(production);
  const pressItems = getPressForProduction(production.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productionSchema(production)) }}
      />
      {upcomingShows.map((show, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema(production, show)) }}
        />
      ))}

      {/* Hero */}
      <ProductionHero
        title={production.title}
        subtitle={production.subtitle}
        image={production.image}
        videoUrl={production.videoUrl}
        isUpcoming={isUpcoming}
      />

      {/* Synopsis + Poster — 5/7 split, poster sticky on left */}
      <section className="border-t border-grey-700">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left — Poster (sticky) */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <div className="relative aspect-[2/3] w-full overflow-hidden">
                  <Image
                    src={production.image}
                    alt={`${production.title} poster`}
                    fill
                    className="object-cover"
                  />
                </div>
                {upcomingShows.length > 0 && upcomingShows[0].ticketUrl && (
                  <a
                    href={upcomingShows[0].ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-6 bg-gold text-background text-center font-bold uppercase tracking-wider text-sm py-4 hover:bg-gold-light transition-colors"
                  >
                    Book Tickets &rarr;
                  </a>
                )}
              </div>
            </div>

            {/* Right — Synopsis + Details */}
            <div className="lg:col-span-7">
              <p className="text-grey-200 text-lg md:text-xl leading-relaxed">
                {production.synopsis}
              </p>

              {/* Details */}
              <div className="mt-10 pt-10 border-t border-grey-700">
                <MetaRow label="Year" value={String(production.year)} />
                <MetaRow label="Language" value={production.language} />
                <MetaRow label="Genre" value={production.genre.join(", ")} />
                <MetaRow label="Type" value={production.type} />
                {production.duration && <MetaRow label="Duration" value={production.duration} />}
                {isUpcoming && <MetaRow label="Status" value="Now Performing" highlight />}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Shows */}
      {upcomingShows.length > 0 && (
        <section className="border-t border-grey-700">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream">
                  Upcoming Shows
                </h2>
              </div>
              <div className="lg:col-span-7">
                <div className="border border-grey-700">
                  {upcomingShows.map((show, i) => (
                    <div
                      key={i}
                      className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 ${
                        i < upcomingShows.length - 1 ? "border-b border-grey-700" : ""
                      }`}
                    >
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-grey-400" />
                          <span className="font-medium text-cream">{formatShowDate(show.date)}</span>
                          <span className="text-grey-400 font-mono text-sm">{formatShowTime(show.time)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-grey-300">
                          <MapPin size={14} className="text-grey-400" />
                          <span>{show.venue}, {show.city}</span>
                        </div>
                        {show.status === "almost-full" && <Badge variant="amber">Almost Full</Badge>}
                        {show.status === "sold-out" && <Badge>Sold Out</Badge>}
                      </div>
                      {show.ticketUrl && show.status !== "sold-out" && (
                        <a
                          href={show.ticketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs uppercase tracking-wider text-gold hover:text-gold-light transition-colors"
                        >
                          Book &rarr;
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Commissioned Context */}
      {production.commissionedBy && (
        <section className="border-t border-grey-700">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream">
                  Commissioned By
                </h2>
              </div>
              <div className="lg:col-span-7">
                <div className="border-l-2 border-gold pl-6 py-4">
                  <p className="text-cream text-lg">{production.commissionedBy}</p>
                  {production.commissionContext && (
                    <p className="text-grey-400 mt-2">{production.commissionContext}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Cast & Crew */}
      <section className="border-t border-grey-700">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream leading-tight">
                The People<br className="hidden lg:block" /> Behind<br className="hidden lg:block" /> the Play
              </h2>
            </div>
            <div className="lg:col-span-7">
              <div className="border-t border-grey-700">
                {production.cast_crew.map((entry) => {
                  const person = getPersonBySlug(entry.person_id);
                  return (
                    <div key={entry.person_id} className="flex items-center justify-between py-4 border-b border-grey-700">
                      {person ? (
                        <Link href={`/people/${person.slug}`} className="text-gold hover:text-gold-light transition-colors font-medium">
                          {person.name}
                        </Link>
                      ) : (
                        <span className="text-cream">{entry.person_id}</span>
                      )}
                      <span className="font-mono text-sm text-grey-400">{entry.roles.join(" · ")}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery — full bleed, no heading */}
      {production.gallery && production.gallery.length > 0 && (
        <section className="border-t border-grey-700">
          <Gallery images={production.gallery} title={production.title} fullBleed />
        </section>
      )}

      {/* Press & Reviews */}
      {pressItems.length > 0 && (
        <section className="border-t border-grey-700">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream leading-tight">
                  Press &amp;<br className="hidden lg:block" /> Reviews
                </h2>
              </div>
              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pressItems.map((item) => (
                    <PressCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {production.relatedProductionSlugs && production.relatedProductionSlugs.length > 0 && (
        <section className="border-t border-grey-700">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream leading-tight">
                  Also Worth<br className="hidden lg:block" /> Seeing
                </h2>
              </div>
              <div className="lg:col-span-7">
                <RelatedProductions slugs={production.relatedProductionSlugs} />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function MetaRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-baseline justify-between py-3 border-b border-grey-700">
      <span className="font-mono text-xs text-grey-400 uppercase tracking-wider">{label}</span>
      <span className={`text-right font-medium ${highlight ? "text-amber" : "text-cream"}`}>{value}</span>
    </div>
  );
}
```

- [ ] **Step 2: Verify the page renders**

Open `http://localhost:3000/productions/saptapadi` in the browser. Check:
- Hero shows with title "Saptapadi" and subtitle
- Poster visible on the left with sticky behavior on scroll
- Synopsis text and details on the right
- Cast & crew names are gold links
- No console errors

- [ ] **Step 3: Test mobile layout**

Use browser dev tools to check 375px width:
- Hero stacks properly
- Poster is full-width and not sticky
- All sections stack to single column
- Cast & crew list is readable

- [ ] **Step 4: Commit**

```bash
git add app/productions/[slug]/page.tsx
git commit -m "feat: redesign production detail page with hero and 5/7 split layout"
```

---

### Task 4: Update RelatedProductions to Work Inside 5/7 Split

**Files:**
- Modify: `components/shared/RelatedProductions.tsx`

The current `RelatedProductions` component wraps itself in a `<section>` with its own `SectionHeading`. Since the production detail page now provides its own heading in the left column, the component should just render the card grid without the section wrapper.

- [ ] **Step 1: Simplify RelatedProductions for use inside split layout**

Edit `components/shared/RelatedProductions.tsx`:

```tsx
import { getProductionBySlug } from "@/lib/data";
import { ProductionCard } from "@/components/productions/ProductionCard";

interface RelatedProductionsProps {
  slugs: string[];
}

export function RelatedProductions({ slugs }: RelatedProductionsProps) {
  const productions = slugs
    .map((s) => getProductionBySlug(s))
    .filter((p): p is NonNullable<typeof p> => p != null);

  if (productions.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {productions.map((p) => (
        <ProductionCard key={p.slug} production={p} />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Check no other pages import RelatedProductions**

Run: `grep -r "RelatedProductions" --include="*.tsx" --include="*.ts"` to check if any other page uses this component. If so, ensure the removal of `SectionHeading` doesn't break those pages. (Currently only used in `productions/[slug]/page.tsx`.)

- [ ] **Step 3: Verify and commit**

Check `http://localhost:3000/productions/saptapadi` — related section should render cards inside the 5/7 split.

```bash
git add components/shared/RelatedProductions.tsx
git commit -m "refactor: simplify RelatedProductions to work inside split layout"
```

---

### Task 5: Final Verification

- [ ] **Step 1: Check all production pages build**

Run: `npx next build 2>&1 | tail -20`

Confirm no build errors and all `/productions/[slug]` pages are statically generated.

- [ ] **Step 2: Spot-check multiple productions**

Open in browser:
- `http://localhost:3000/productions/saptapadi` (has shows, cast, press)
- `http://localhost:3000/productions/adhe-adhure` (no shows, no gallery)
- `http://localhost:3000/productions/kaumudi` (different cast)

Verify:
- Conditional sections (shows, gallery, commissioned, press, related) hide when data is empty
- No empty headings or blank sections
- Hero falls back to image when no videoUrl
- Poster sticky behavior works on desktop
- Cast names link to `/people/[slug]`

- [ ] **Step 3: Commit any fixes if needed**
