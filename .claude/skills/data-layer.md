---
name: data-layer
description: Use when modifying data files, types, data-fetching functions, or the relationship model between productions, people, festivals, and press
---

# Data Layer
## Read for every data fetching, types, or data model task

---

## Data Source

All data lives in JSON files under `/data/`. No CMS, no database, no API.

| File | Contents |
|---|---|
| `data/productions.json` | All productions with cast_crew, shows, festivals |
| `data/people.json` | All people with bios, roles, other work |
| `data/festivals.json` | Festival names, years, cities |
| `data/press.json` | Press items linked to productions/people |

Long-form content (Manoj Shah bio, future blog posts) lives in `/content/` as MDX.

---

## Type Definitions (`lib/types.ts`)

```typescript
interface Production {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  type: "play" | "musical" | "reading" | "workshop" | "festival-production";
  language: string;
  genre: string[];
  year: number;
  synopsis: string;
  image: string;
  gallery?: string[];
  videoUrl?: string;
  duration?: string;
  shows?: Show[];
  cast_crew: CastCrewEntry[];
  festivals?: string[];       // festival IDs
  press?: string[];            // press item IDs
  commissionedBy?: string;
  commissionContext?: string;
  relatedProductionSlugs?: string[];
  featured?: boolean;
}

interface Person {
  id: string;
  slug: string;
  name: string;
  portrait: string;
  bio: string;
  roles: string[];             // e.g. ["Actor", "Director"]
  otherNotableWork?: string[];
  interviews?: { title: string; url: string; source: string }[];
  socialLinks?: { instagram?: string; twitter?: string; website?: string };
  featured?: boolean;
}

interface Show {
  date: string;                // ISO date "2026-03-20"
  time: string;                // "19:30"
  venue: string;
  city: string;
  ticketUrl?: string;
  status?: "confirmed" | "almost-full" | "sold-out";
}

interface CastCrewEntry {
  person_id: string;           // matches Person.id
  roles: string[];
}

interface Festival { id: string; name: string; year: number; city: string; description?: string; }
interface PressItem { id: string; title: string; source: string; date: string; url?: string; excerpt?: string; productionSlug?: string; personSlug?: string; }
```

---

## Key Relationship: Productions ↔ People

**Productions own the relationship.** Each production has a `cast_crew` array:
```json
{ "person_id": "manoj-shah", "roles": ["Director", "Producer"] }
```

**A person's production history is ALWAYS derived** from the productions data at build time:
```typescript
function getProductionsForPerson(personId: string): Production[] {
  return productions.filter(p => p.cast_crew.some(c => c.person_id === personId));
}
```

**Never store production history on the person record.** This ensures data consistency — add a cast_crew entry to a production, and the person's profile updates automatically.

---

## Data Access Functions (`lib/data.ts`)

All data access goes through `lib/data.ts`. Never import JSON directly in components.

### Productions
- `getAllProductions()` — sorted by year desc
- `getProductionBySlug(slug)` — single production
- `getFeaturedProductions()` — featured flag = true
- `getProductionSlugs()` — for generateStaticParams

### People
- `getAllPeople()` — sorted by name
- `getPersonBySlug(slug)` — single person
- `getFeaturedPeople()` — featured flag = true
- `getPersonSlugs()` — for generateStaticParams

### Relations
- `getProductionsForPerson(personId)` — derived from cast_crew
- `getRolesForPerson(personId, production)` — roles in specific production
- `getProductionCount(personId)` — number of productions

### Festivals & Press
- `getAllFestivals()`, `getFestivalById(id)`
- `getAllPress()`, `getPressForProduction(slug)`, `getPressForPerson(slug)`

### Filters
- `getFilterOptions()` — derives types, languages, genres, years, cities from data

---

## "Now Performing" Logic (`lib/shows.ts`)

Client-side date checking — always accurate without rebuilds:
- `isNowPerforming(production)` — show happening right now
- `hasUpcomingShows(production)` — any future show dates
- `getUpcomingShows(production)` — sorted future shows
- `getNowPerformingProductions(productions)` — all with upcoming/current shows
- `formatShowDate(date)`, `formatShowTime(time)` — display helpers

---

## Adding Data (workflows)

### New Production (full workflow — see Production Pages skill for details)
1. **Research** the production online — find external mentions, reviews, backlink sources
2. **Copy photos** to `public/images/productions/{slug}/`
3. **Add people** to `data/people.json` for all new cast/crew (see Person Pages skill for research workflow)
4. **Add festival** to `data/festivals.json` if applicable
5. **Add press** to `data/press.json` with `productionSlug`
6. **Add production** to `data/productions.json` with cast_crew, shows, gallery, festivals, press
7. **Add blog post** to `lib/blog.ts` for SEO (optional but recommended)
8. **Validate** all JSON files: `node -e "JSON.parse(require('fs').readFileSync('data/productions.json','utf8'))"`

### New Person (full workflow — see Person Pages skill for details)
1. Add entry to `data/people.json`
2. Add their `cast_crew` entries in relevant productions
3. **Research** the person: IMDB, Instagram, MumbaiTheatreGuide, Wikipedia, casting platforms
4. **Enrich bio** with confirmed facts, add `otherNotableWork` and `socialLinks`
5. **Source photo** from public sites (Wikipedia, personal websites, casting platforms), save to `public/images/people/{slug}.jpg`
6. Profile auto-derives production history

### New Festival
1. Add entry to `data/festivals.json`
2. Reference its ID in production `festivals` arrays

---

## Rules

1. **Never hardcode filter options** — always derive from data
2. **Never store derived data** — compute at build/render time
3. **All data access through `lib/data.ts`** — single source of truth
4. **Types in `lib/types.ts`** — never define interfaces inline
5. **JSON files are the database** — keep them well-formatted and consistent
