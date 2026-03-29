---
name: blog-pages
description: Use when building /blog listing or /blog/[slug] post pages — editorial content, writing rules, category system
---

# Blog Pages
## `/blog` listing + `/blog/[slug]` post
## Read for every blog-related page, component, or content task

**Status: Phase 2** — Currently a "Coming Soon" stub on the home page.

---

## What These Pages Are

The Blog is the editorial and SEO engine of the site:
- `/blog` is the editorial listing — filterable archive of all posts
- `/blog/[slug]` is one article — clean reading page, auto-generated from data

Adding a new post = adding an entry to `data/blog-posts.json` with MDX body in `content/blog/`. No code needed.

---

## Brand Voice

35 years of theatre earns confidence. Write like an editorial magazine — intelligent, warm, authoritative.

- **Is:** Economical. Emotionally present. Proud without being boastful.
- **Is not:** Startup casual. Corporate PR. Generic.
- **Never use:** "passionate", "dedicated", "revolutionise", "game-changing", "leverage", exclamation marks
- Manoj Shah's name + role must appear correctly: directed and produced every production

---

## Blog Categories

| Category | Slug | Who writes | SEO angle |
|---|---|---|---|
| Director's Notes | `directors-notes` | Manoj Shah (1st person) | Manoj Shah + production name |
| Behind the Scenes | `behind-the-scenes` | Any company member | Production name + process keywords |
| Production Insights | `production-insights` | Director / writer | Play title + source / adaptation |
| Theatre Essays | `theatre-essays` | Any (3rd person) | Indian theatre + topic |
| Festival Diaries | `festival-diaries` | Manoj Shah or team | Festival name + theatre |
| School Stories | `school-stories` | Outreach team | Theatre education India |

---

## Writing Rules

**Title:** Specific, keyword-first. Never clever at expense of clarity.
- Good: "How Manoj Shah Adapted Vijay Tendulkar's Ghashiram Kotwal for a New Generation"
- Bad: "When Old Stories Find New Voices"

**Structure:**
- Hook in first 2 sentences
- 800–1,500 words target
- H2 subheading every 300–400 words
- One pull quote per post
- Specific closing — a moment, an image, a question
- Always include one internal link to the relevant production detail page

**Voice by category:**
- Director's Notes + Festival Diaries: first person
- All other categories: third person. Never "we at Ideas Unlimited"

---

## `/blog` — Listing Page

### Structure
1. **Featured Post Hero** — Full-width, large thumbnail + metadata
2. **Category Filter Bar** — Pills with URL param state
3. **Post Grid** — 3 cols desktop → 2 tablet → 1 mobile
4. Each card: thumbnail, category tag, title, author + date + read time, excerpt

### SEO
Title: "Essays & Stories — Ideas Unlimited Productions"
Schema.org: `CollectionPage`

---

## `/blog/[slug]` — Post Page

A reading experience. The article is the product. **Zero scroll animations.**

### Structure
1. **Article Header** — Category tag, title (serif display), author with headshot, date, read time, hero image
2. **Article Body** — Max-width 720px, centered, generous margins. Serif headings, sans body, gold pull quotes
3. **Related Posts** — 3 cards at bottom

### SEO
- `generateStaticParams` for all published slugs
- Article JSON-LD schema
- OG image = post's featured image
- Author linked to `/people/[slug]` when person exists

### Animation Rules
- Page transition fade only
- **No stagger, no scroll triggers on blog post pages**
- The reading experience is the only experience
