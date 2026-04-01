# CLAUDE.md — Ideas Unlimited Productions
## Master Project File

Read this first on every task. Then read the skill file for the specific task before writing a single line.

---

## Project

Ideas Unlimited Productions — public marketing website for a 35-year theatre company founded by Manoj Shah. 90+ productions in Hindi, English, Gujarati. Performed across India and internationally.

**Goals:** Drive ticket sales via BookMyShow. Rank on Google. Impress HNI and corporate visitors who commission performances. Serve as IMDb-style sharable profiles for freelance cast and crew.

---

## Tech Stack

- **Framework:** Next.js 16+ App Router, TypeScript (strict)
- **Styling:** Tailwind CSS v4 with custom design tokens
- **Animations:** Framer Motion (via `motion` package)
- **Data:** JSON files in `/data/` + MDX in `/content/`
- **Images:** Next.js `<Image>` with placeholder SVGs (Cloudinary later)
- **SEO:** Schema.org JSON-LD, dynamic sitemap, robots.txt
- **Ticketing:** BookMyShow external links only — no payments
- **Fonts:** Playfair Display (serif/display), DM Sans (body), JetBrains Mono (labels/mono) — via next/font/google
- **Deployment:** Vercel · **Package manager:** npm

---

## Skill Routing — Read This Before Every Task

| Task | Read this skill |
|---|---|
| Any UI / styling / new component | `.claude/skills/design-system.md` |
| Any TypeScript / component code / file structure | `.claude/skills/code-standards.md` |
| Any animation — Framer Motion | `.claude/skills/animations.md` |
| Any data fetching / types / JSON data changes | `.claude/skills/data-layer.md` |
| `/productions` archive OR `/productions/[slug]` detail | `.claude/skills/production-pages.md` |
| `/people` directory OR `/people/[slug]` profile | `.claude/skills/person-pages.md` |
| `/blog` listing OR `/blog/[slug]` post | `.claude/skills/blog-pages.md` |
| Home, About, Manoj Shah, Festivals, Upcoming Shows, Press, Contact, Education | `.claude/skills/singleton-pages.md` |

**For any task not listed:** Read `design-system` + `code-standards`, find the closest matching page skill, and apply those patterns. Do not invent new tokens or component patterns.

---

## Non-Negotiable Rules

1. Read the skill file before starting. Always.
2. Dark theme only. Background is always #0a0a0a or variants. Never white or light.
3. No hardcoded content in reusable components. All text and data come from JSON/MDX via props.
4. TypeScript strict. No `any`. All function params typed.
5. Server Components by default. `'use client'` only when genuinely needed (event handlers, hooks, browser APIs).
6. Mobile first. 375px minimum.
7. Every page needs meta title, description, OG tags, and Schema.org JSON-LD.
8. BookMyShow links: always `target="_blank" rel="noopener noreferrer"`. Never show a dead link.
9. Images: Next.js `<Image>` only. Never raw `<img>`.
10. Animation: Use Framer Motion (`motion/react`). `'use client'` for all animated components.

---

## Design Tokens

| Token | Value | Note |
|---|---|---|
| Background | `#0a0a0a` (--background) | |
| Foreground | `#ededed` (--foreground) | |
| Cream | `#f5f0e8` (--cream) | Headings |
| Purple | `#7c3aed` (--purple) | Primary accent |
| Purple-light | `#a78bfa` (--purple-light) | Hover state |
| Purple-dark | `#5b21b6` (--purple-dark) | Active/pressed |
| Pink | `#be185d` (--pink) | Upcoming ticker ribbon |
| Grey scale | 900 `#111` → 200 `#ccc` | |

---

## Key Data Relationships

- **Productions → People**: linked via `cast_crew` array on each production
- **Person's production history**: always derived at build time from productions data — never stored on the person record
- **"Now Performing" logic**: client component checks show dates against current date — always accurate without rebuilds
- **Filtering**: URL search params for shareability, client-side filtering

---

## Project Structure

- `app/` — Pages (App Router)
- `components/ui/` — Design system primitives (Button, Badge, Container, SectionHeading, GridLines)
- `components/motion/` — Animation wrappers (FadeIn, ScrollReveal, CurtainReveal, StaggerChildren)
- `components/layout/` — Navbar, Footer, NowPerformingBar, SearchOverlay, ClientShell
- `components/home/` — Home page sections
- `components/productions/` — ProductionCard, ProductionFilters, ProductionGrid
- `components/people/` — PersonCard, PeopleFilters, PeopleGrid
- `components/shared/` — Gallery, VideoEmbed, PressCard, ShareButton, RelatedProductions
- `lib/` — types.ts, data.ts, shows.ts, schema.ts, utils.ts, constants.ts
- `data/` — JSON data files
- `content/` — MDX content files
