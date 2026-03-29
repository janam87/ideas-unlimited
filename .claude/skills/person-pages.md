---
name: person-pages
description: Use when building or modifying /people directory or /people/[slug] profile pages
---

# Person Pages
## `/people` directory + `/people/[slug]` profile
## Read for every person-related page, component, or data change

---

## What These Pages Are

The People pages are the IMDb-style wiki system for the entire company ensemble:

- `/people` is the directory — filterable grid of all cast and crew
- `/people/[slug]` is one record — every person gets a full profile, auto-generated from data

Adding a new person = adding an entry to `data/people.json` + their `cast_crew` entries in productions. No code needed.

**The SEO flywheel:** When a freelancer shares their profile URL (Instagram bio, LinkedIn, WhatsApp), they bring their personal audience to this domain. The profile must be genuinely worth sharing — it covers ALL of the person's work, not just Ideas Unlimited.

---

## `/people` — Directory Page

### SEO
```typescript
export const metadata: Metadata = {
  title: 'People',
  description: 'Complete directory of actors, directors, writers and theatre professionals who have worked with Ideas Unlimited Productions over 35 years.',
}
```
Target keywords: "Indian theatre actors", "theatre professionals India", "[person name] actor"

### Page Structure

**Page Header:** `<SectionHeading label="The Company" title="People" />`

**Filter Bar** (`'use client'`)
- Role filter: All / Actor / Director / Writer / etc. (derived from data)
- Sort: Name A–Z / Most Productions
- State in URL search params

**Person Cards Grid** — 4 cols desktop → 3 tablet → 2 mobile
- Portrait with aspect-[3/4]
- Name, role badges, production count
- Hover: scale image, border-gold

---

## `/people/[slug]` — Profile Page

### SEO
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const person = getPersonBySlug(params.slug)
  return {
    title: person.name,
    description: `${person.bio.slice(0, 120)}. ${count} productions with Ideas Unlimited.`,
    openGraph: { images: [person.portrait] }
    // OG image = portrait — critical for WhatsApp/Instagram preview when shared
  }
}
```

**Schema.org:** `Person` with `memberOf` TheaterGroup.

### Page Structure (sections in order)

**1. Profile Header**
- Portrait image: 1/3 width desktop, full width mobile
- Name in serif display
- Role tag badges
- Bio text
- Production count + Share button

**2. Share Button** — prominent, above fold on mobile
- Copies URL to clipboard, shows confirmation
- This is the most important UX element for the SEO flywheel

**3. IUP Filmography** — Ideas Unlimited work
- `<SectionHeading label="With Ideas Unlimited" title="Productions" />`
- Auto-derived from productions data. Sort: most recent first. Show all.
- Each row: production title (linked), roles, year, language badge

**4. Other Notable Work** (conditional)
- `<SectionHeading label="Beyond IU" title="Other Notable Work" />`
- Film, TV, other theatre, awards
- This makes the profile genuinely worth sharing

**5. Press & Interviews** (conditional)
- External links with publication names

---

## Adding a New Person (workflow)

1. Add entry to `data/people.json`
2. Add their `cast_crew` entries in relevant productions
3. Profile auto-generates at `/people/[slug]`
4. No code changes needed

---

## Component Checklist

**Directory:**
- [ ] Filter options derived from data
- [ ] Filter state in URL search params
- [ ] Person cards: portrait with fallback
- [ ] Production count on every card
- [ ] Stagger animation on grid

**Profile:**
- [ ] `generateStaticParams` for all slugs
- [ ] `generateMetadata` with name, bio, portrait as OG image
- [ ] Person schema JSON-LD
- [ ] Share button: copies URL, shows confirmation, prominent on mobile
- [ ] IUP Filmography: auto-derived, never manually entered
- [ ] Every production links to `/productions/[slug]`
- [ ] Other Work section: conditional
- [ ] Press section: conditional
- [ ] External links: `target="_blank" rel="noopener noreferrer"`
