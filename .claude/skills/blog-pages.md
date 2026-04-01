---
name: blog-pages
description: Use when building /blog listing or /blog/[slug] post pages — editorial content, writing rules, category system
---

# Blog Pages
## `/blog` listing + `/blog/[slug]` post
## Read for every blog-related page, component, or content task

**Status: DONE** — Listing page at `/blog` with 3-col grid, detail page at `/blog/[slug]` with 5/7 split layout, inline images, and reading time.

---

## Data Source

Blog posts are defined in `lib/blog.ts` as a `BLOG_POSTS` array with full body text. Functions: `getAllPosts()`, `getPostBySlug()`.

Each post has: `slug`, `title`, `category`, `excerpt`, `image`, `date`, `body` (string array of paragraphs).

---

## Brand Voice

35 years of theatre earns confidence. Write like an editorial magazine — intelligent, warm, authoritative.

- **Is:** Economical. Emotionally present. Proud without being boastful.
- **Is not:** Startup casual. Corporate PR. Generic.
- **Never use:** "passionate", "dedicated", "revolutionise", "game-changing", "leverage", exclamation marks

---

## `/blog` — Listing Page

### Layout
- Page header: "Stories & Reflections" title + subtitle, same layout as Productions/People pages
- Uses `max-w-6xl` container directly

### Post Grid
- 3 cols desktop → 2 tablet → 1 mobile, `gap-8`
- Each card is a `<Link>` to `/blog/[slug]`
- Card: image `aspect-[4/3]`, category in gold mono, date in grey mono, title in serif, excerpt in grey

---

## `/blog/[slug]` — Detail Page

### Layout — 5/7 Split (no hero image section)

No full-bleed hero image. The article starts directly with the 5/7 split.

**Left Column (col-span-5):** Sticky meta
- Category in gold mono
- Title in `text-3xl md:text-4xl lg:text-5xl`
- Date + reading time (calculated from word count, ~200 words/min)

**Right Column (col-span-7):** Article body
- Paragraphs in `text-grey-200 text-lg leading-relaxed`
- Inline landscape images (`aspect-[16/9]`) inserted after every 3rd paragraph
- No scroll animations

**Related Posts Section** — 5/7 split
- Left: "More Stories" heading
- Right: 3 related post cards (excludes current post)

---

## Home Page Integration

`BlogStub` component on home page shows:
- Left: "Stories & Reflections" heading + subtitle
- Right: 3 blog cards + "Read more →" link at bottom of right column
