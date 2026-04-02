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

## Writing a Production Blog Post (workflow)

When adding a blog post about a production:

### 1. Research Before Writing
- Search for the original work (author, history, themes, significance)
- Search for "{production name} Ideas Unlimited", "{production name} Manoj Shah" to find external citations
- Check KolkataTheatre.com, MumbaiTheatreGuide, Wikipedia, academic papers, newspaper archives
- Find articles that mention both the production AND Ideas Unlimited/Manoj Shah — these are backlink opportunities

### 2. Structure the Post
- **Opening**: Context about the original work and its significance
- **Middle**: The Ideas Unlimited production story — director's note, adaptation history, what made it distinctive, cast/crew highlights
- **Key citations**: Quote or reference external sources by name (e.g. "As theatre historian Ananda Lal noted in his survey..."). This encourages the cited source to link back.
- **Closing**: The production's enduring relevance, connecting past to present
- Aim for 10-15 paragraphs, ~1500-2000 words

### 3. SEO Considerations
- Title should include the play name + a hook (e.g. "Achalayatan: When Tagore's Most Radical Play Spoke Gujarati")
- Category: "Heritage" for historical productions, "Behind the Scenes" for process stories, "Director's Note" for first-person pieces
- Excerpt: 1-2 sentences that would work as a Google search snippet
- Body should naturally include searchable phrases: playwright name, production name, director name, venue, festival name

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
