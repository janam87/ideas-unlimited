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

---

## `/people` — Directory Page

### Layout
- Page header: title "The People" + count + "35 years", same layout as Productions page
- Uses `max-w-6xl` container directly (no Container/SectionHeading)
- No editorial rules/hr elements

### Filters (`'use client'`)
- Role filter: All / Actor / Director / Writer / etc. (derived from data)
- Sort: Name A–Z / Most Productions
- State in URL search params
- Custom select styling: `pl-4 pr-10 py-2.5`, custom chevron via CSS

### People Grid
- 3 cols desktop → 2 tablet → 1 mobile, `gap-8` (matches productions grid)
- `<PersonCard>`: landscape image `aspect-[4/3]`, name only (no roles, no production count on card)
- Hover: scale image, name turns gold

---

## `/people/[slug]` — Profile Page

### Layout — Single Grid with Sticky Photo

The entire page is one `grid grid-cols-1 lg:grid-cols-12` — photo on left (sticky), all content sections stacked on right. This ensures the photo stays visible while scrolling through all content.

### Left Column (col-span-5)
- Photo: `aspect-[3/4]`, sticky (`lg:sticky lg:top-24 lg:max-w-[320px]`)
- Social links below photo (conditional): Instagram, Twitter, Website — gold mono links

### Right Column (col-span-7) — All content stacked

**1. Bio**
- Roles in gold mono label
- Name in `text-4xl md:text-5xl lg:text-6xl`
- Bio text in `text-grey-200 text-lg`

**2. Details** (below bio, separated by `border-t`)
- MetaRow: Productions count, Roles

**3. Filmography** (separated by `mt-16 pt-16 border-t`)
- Heading: "With Ideas Unlimited"
- List: year in mono, title linked to `/productions/[slug]`, roles in mono on right

**4. Other Notable Work** (conditional, same separator pattern)
- Heading: "Beyond IU"
- Simple list of work items

**5. Press & Interviews** (conditional, same separator pattern)
- Heading: "Press & Media"
- 2-column grid of interview cards + PressCards

### Key Rules
- All production titles link to `/productions/[slug]`
- Photo sticks across ALL sections (not just the first one)
- No Container or SectionHeading components — all inline
- External links: `target="_blank" rel="noopener noreferrer"`
- Conditional sections hidden when data is empty

---

## Adding a New Person (workflow)

1. Add entry to `data/people.json`
2. Add their `cast_crew` entries in relevant productions
3. Profile auto-generates at `/people/[slug]`
4. No code changes needed
