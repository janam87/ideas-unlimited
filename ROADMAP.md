# Roadmap — Ideas Unlimited Productions Website

## Pages Planned

### Upcoming Shows — `/upcoming-shows`
- Dedicated calendar page listing all upcoming dates across productions
- Sort by date; filter by language/city
- BookMyShow CTA on each row; venue + show time + status (confirmed / almost-full / sold-out)
- Linked from menu's "View All Upcoming Shows"

### Festivals — `/festivals`, `/festivals/[id]`
- Listing of festival appearances (Prithvi, NCPA, Adishakti, internationals)
- Per-festival page: which IU productions performed, year, photos, press coverage
- Drives credibility for HNI and corporate visitors

### Press / Media — `/press`
- Press coverage hub: newspaper clippings, TV interviews, podcasts, online features
- Filter by year and source
- Currently only individual `/reviews/[slug]` pages exist — this is the listing layer

### Reviews Index — `/reviews`
- Listing page for all `/reviews/[slug]` items
- Currently no index, only individual review pages

### Education / Workshops — `/education`
- Workshops, masterclasses, school programs
- Different audience (students, schools, corporate L&D) than ticket buyers
- Enquiry form for workshop bookings

### Archive / 35-Year Timeline — `/archive` (or `/35-years`)
- Visual timeline: productions by year, milestones, longest runs
- For HNI/corporate pitch decks and the "we've been around" credibility play

---

## Parked Ideas (Future)

### Fill thin production synopses
- `/productions/ischool` (53 chars) — corporate-event commission, full 90-min play with 25 actors. Need writer, director, year, plot, cast, venue, commissioning context.
- `/productions/huto-and-huto-oh-yaa` (77 chars, year 2003) — early Manoj Shah production featuring Chirag Vohra. Need writer, plot, original source if adaptation.
- Soft-404 risk: Google may de-index thin pages. Fill before requesting indexing for these specific URLs.

### Profile PDF Download
- "Download as PDF" button on `/people/[slug]` pages
- Generates a well-designed PDF with all profile information (bio, filmography, notable work, press)
- Recommended approach: Print-optimized CSS with `@media print` stylesheet + `window.print()` — zero-dependency, pixel-perfect output
- Use case: Artists can share their profiles offline, casting directors get a clean one-pager

---

## Completed

- **Jain Performing Arts** — `/jain-performing-arts/` (light theme, currently noindex / WIP)
- **Full-screen mega-menu** — Modulus-inspired 3-col with grid lines, featured cards, scalable nav
- **Internal linking + cast-mates cross-links** — boosts SEO crawl graph
- **SEO: noindex thin person profiles** — sitemap focused on rich pages
- **Meta Pixel** — Facebook conversion tracking
