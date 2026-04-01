---
name: singleton-pages
description: Use when building Home, About, Manoj Shah, Festivals, Upcoming Shows, Press, Contact, or Education pages
---

# Singleton Pages
## Home · About · Manoj Shah · Festivals · Upcoming Shows · Press · Contact · Education

Jump to the section for the page you're building. Each section is self-contained.

---

## PAGE: Home (`/`)

### Purpose
The dramatic first impression. Converts all visitors in 10 seconds. Signals 35 years of legacy.

### SEO
Title: "Ideas Unlimited Productions — 35 Years of Theatre in India"
Schema.org: `TheaterGroup` with founder Manoj Shah.

### Layout Pattern — Onassis-style Split Sections
All content sections below the Hero use a consistent two-column split layout:
- Left column (`lg:col-span-5`): Big serif heading
- Right column (`lg:col-span-7`): Content (cards, images, text, forms)
- CTAs go at BOTTOM of right column, not next to heading
- Each section has `border-t border-grey-700` full-width separator
- Content uses `max-w-6xl` container (narrower than nav/hero/footer which use `max-w-7xl`)

### Sections (in order)
1. **Hero** — Full-bleed YouTube video background, dark gradient overlay, Playfair headline
2. **Now Performing Strip** — Only if active shows exist. Purple accent, show info + BookMyShow link
3. **Legacy Numbers Strip** — Full-width stats bar with `border-t border-b`. 35+ Years · 90+ Productions · 3 Languages · 20+ Cities. Count-up on scroll
4. **Featured Productions** — Split layout. Left: "Featured" heading. Right: 1 lead production (large card) + 6 secondary productions in 2-col grid below + "View All Productions →" at bottom
5. **Manoj Shah / The Founder** — Split layout. Left: "The Founder" heading. Right: Large landscape portrait stacked above bio text (name, quote, description, "Read His Story →")
6. **Performed At** — Split layout. Left: "Performed At" heading. Right: Auto-looping marquee of festival names scrolling left to right
7. **Stories & Reflections** — Split layout. Left: heading + description. Right: 3 blog cards in a row (image + category label + title), Onassis news-card style
8. **Newsletter / Stay Connected** — Split layout. Left: "Stay Connected" heading. Right: description + email signup form

---

## PAGE: Manoj Shah (`/manoj-shah`)

### Purpose
Portrait and tribute to the founder. The soul of the website. Must feel **different** — more intimate, more cinematic.

### SEO
Title: "Manoj Shah — Founder & Artistic Director · Ideas Unlimited Productions"
Schema.org: `Person` with `memberOf` TheaterGroup.
OG image: Best portrait — critical for press sharing.

### Design Rules (unique to this page)
- More generous whitespace than any other page
- Long-form text in serif body — reads like a literary essay
- Purple accent used more generously
- Full-width pull quotes between sections

### Sections
1. **Hero Portrait** — Full viewport height, name in massive serif, role badges
2. **The Story** — MDX editorial content from `content/manoj-shah.mdx`
3. **Directorial Philosophy** — Pull quotes, artistic principles
4. **Complete Filmography** — All IU productions listed with year, language, links
5. **Interviews & Media** — YouTube embeds + article links
6. **Press Quotes** — Quotes from critics/publications
7. **Gallery** — Photographs across decades

---

## PAGE: Contact (`/contact`)

### Purpose
Single contact point. Pre-fillable via `?type=` URL param.

### Form Fields
- Name (required)
- Email (required)
- Phone (optional)
- Enquiry Type dropdown: General, Commission, Festival Invitation, Ticket Booking, Press, Audition/Casting, Workshop/Education, Other
- Message (required)
- Submit → success message (UI only, no backend for V1)

### Additional Content
- Company info sidebar (email, phone, location)
- Social media links
- Response time: "We typically respond within 24-48 hours"

---

## PAGE: About (`/about`) — DONE

Hero section with big display text (vertically centered, full viewport). Then 5/7 split sections: Our Vision, The Travelling Theatre, The Founder (with link to /manoj-shah), The People (with landscape photo and link to /people), Complete Production List (99 productions 1999–2025 with details), Where We've Performed (festivals/international + unconventional venues).

---

## PAGE: Blog (`/blog` + `/blog/[slug]`) — DONE

Listing page with 3-column card grid (image, category, date, title, excerpt). Detail page uses 5/7 split: sticky title/category/date/reading time on left, article body with inline images on right. Related posts section at bottom.

---

## Phase 1 — COMPLETE

All pages below are built and live:
- Home `/` — Hero, legacy numbers, about pull, featured productions, founder, festivals, blog stub, newsletter
- About `/about` — Hero, vision, travelling theatre, founder, people, production list, venues
- Productions `/productions` + `/productions/[slug]` — Archive grid with filters, detail with hero/booking band/sticky poster/synopsis/cast/gallery/press/related
- People `/people` + `/people/[slug]` — 3-col grid, detail with sticky photo and all content right
- Blog `/blog` + `/blog/[slug]` — 3-col listing, detail with inline images and reading time
- Manoj Shah `/manoj-shah` — Sticky photo, editorial content, interviews
- Contact `/contact` — 5/7 split with info + form

---

## Phase 2 — NOT YET BUILT

## PAGE: Festivals (`/festivals`)

Festival profiles, India map with city markers, international performances.

## PAGE: Upcoming Shows (`/upcoming-shows`)

Primary ticket-driving page. City filter, shows grouped by month, BookMyShow links. Schema.org TheaterEvent per show.

## PAGE: Press (`/press`)

Press kit downloads, press contact, coverage grouped by year.

## PAGE: Education (`/education`)

Theatre school (coming soon/waitlist) + school outreach programme.
