---
name: code-standards
description: Use when writing any TypeScript, component code, or creating new files — covers file structure, naming, typing, and patterns
---

# Code Standards
## Read for every TypeScript / component code / file structure task

---

## File & Folder Conventions

```
app/                    → Pages only (App Router)
  [route]/page.tsx      → Page component
  layout.tsx            → Root layout
  globals.css           → Global styles + Tailwind
  fonts.ts              → Font definitions

components/
  ui/                   → Primitives: Button, Badge, Container, SectionHeading, GridLines
  motion/               → Animation wrappers: FadeIn, ScrollReveal, CurtainReveal, StaggerChildren
  layout/               → Chrome: Navbar, Footer, NowPerformingBar, SearchOverlay, ClientShell
  home/                 → Home page sections
  productions/          → ProductionCard, ProductionFilters, ProductionGrid
  people/               → PersonCard, PeopleFilters, PeopleGrid
  shared/               → Gallery, VideoEmbed, PressCard, ShareButton, RelatedProductions

lib/
  types.ts              → All TypeScript interfaces
  data.ts               → Data loading & query functions
  shows.ts              → "Now Performing" date logic
  schema.ts             → Schema.org JSON-LD generators
  utils.ts              → cn(), placeholderImage(), slugify()
  constants.ts          → SITE config, NAV_LINKS, LEGACY_NUMBERS, ENQUIRY_TYPES

data/                   → JSON data files
content/                → MDX content files
```

---

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Files (components) | PascalCase | `ProductionCard.tsx` |
| Files (lib) | camelCase | `data.ts`, `shows.ts` |
| Files (data) | kebab-case | `productions.json` |
| Components | PascalCase | `export function ProductionCard()` |
| Functions | camelCase | `getProductionBySlug()` |
| Types/Interfaces | PascalCase | `interface Production` |
| Constants | UPPER_SNAKE | `SITE`, `NAV_LINKS` |
| CSS variables | kebab-case | `--font-serif` |
| URL slugs | kebab-case | `manoj-shah`, `adhe-adhure` |

---

## TypeScript Rules

- **Strict mode.** No `any`. All function params typed.
- All data interfaces live in `lib/types.ts`
- Use `interface` for object shapes, `type` for unions/intersections
- Import types with `import type { X }` when possible
- JSON data is cast to typed arrays in `lib/data.ts`

---

## Component Rules

### Server vs Client

- **Server Components by default.** Pages, data-fetching wrappers, static sections.
- **`'use client'` only when genuinely needed:**
  - Event handlers (onClick, onChange, onSubmit)
  - React hooks (useState, useEffect, useRef)
  - Browser APIs (window, navigator, document)
  - Framer Motion animations
  - URL search params reading (useSearchParams)

### Component Structure
```tsx
// 1. Directive (if client)
"use client";

// 2. Imports — external, then internal, then types
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Production } from "@/lib/types";

// 3. Props interface
interface ProductionCardProps {
  production: Production;
}

// 4. Component
export function ProductionCard({ production }: ProductionCardProps) {
  return ( ... );
}
```

### Patterns

- **Data fetching:** Done in `lib/data.ts` functions, called from Server Components or `generateStaticParams`
- **Filtering:** Full dataset passed as props to client components, filtered with `useMemo` + `useSearchParams`
- **Dynamic routes:** `generateStaticParams` + `generateMetadata` on every `[slug]` page
- **Conditional sections:** `{data.length > 0 && <Section />}` — never show empty headings
- **Derived data:** Person's production history is ALWAYS computed from productions data, never stored on the person

---

## Data Layer

All data access goes through `lib/data.ts`. Never import JSON files directly in components.

```typescript
// Good
import { getProductionBySlug } from "@/lib/data";

// Bad
import productions from "@/data/productions.json";
```

---

## SEO Checklist (every page)

- [ ] `generateMetadata` or `export const metadata` with title + description
- [ ] OpenGraph tags (title, description, image)
- [ ] Schema.org JSON-LD via `<script type="application/ld+json">`
- [ ] Semantic HTML: `<section>`, `<article>`, `<nav>`, `<main>`
- [ ] All images have meaningful `alt` text
- [ ] All `<a>` to external sites: `target="_blank" rel="noopener noreferrer"`
