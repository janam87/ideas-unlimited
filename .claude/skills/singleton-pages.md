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

### Sections (in order)
1. **Hero** — Full-bleed, dark overlay, Playfair headline, curtain-reveal, 2 CTAs
2. **Now Performing Strip** — Only if active shows exist. Gold accent, show info + BookMyShow link
3. **Legacy Numbers Strip** — 35+ Years · 90+ Productions · 3 Languages · 20+ Cities. Count-up on scroll
4. **Featured Productions** — 3-column grid of curated ProductionCards
5. **Manoj Shah Pull** — Portrait + quote + CTA to his page. Cinematic feel.
6. **Festival Strip** — Horizontal list of festival names
7. **Blog Stub** — "Coming Soon" placeholder (Phase 2)
8. **Newsletter** — Email signup (UI only for now)

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
- Gold accent used more generously
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

## PAGE: About (`/about`) — Phase 2

Company story, legacy numbers, work types (repertoire/commissioned/festival/educational), commission CTA, social proof.

## PAGE: Festivals (`/festivals`) — Phase 2

Festival profiles, India map with city markers, international performances.

## PAGE: Upcoming Shows (`/upcoming-shows`) — Phase 2

Primary ticket-driving page. City filter, shows grouped by month, BookMyShow links. Schema.org TheaterEvent per show.

## PAGE: Press (`/press`) — Phase 2

Press kit downloads, press contact, coverage grouped by year.

## PAGE: Education (`/education`) — Phase 2

Theatre school (coming soon/waitlist) + school outreach programme.
