import productionsData from "@/data/productions.json";
import peopleData from "@/data/people.json";
import festivalsData from "@/data/festivals.json";
import pressData from "@/data/press.json";
import type { Production, Person, Festival, PressItem, FilterOptions } from "./types";

const productions = productionsData as Production[];
const people = peopleData as Person[];
const festivals = festivalsData as Festival[];
const press = pressData as PressItem[];

// --- Productions ---

export function getAllProductions(): Production[] {
  return productions.sort((a, b) => b.year - a.year);
}

export function getProductionBySlug(slug: string): Production | undefined {
  return productions.find((p) => p.slug === slug);
}

export function getFeaturedProductions(): Production[] {
  return productions.filter((p) => p.featured).sort((a, b) => b.year - a.year);
}

export function getProductionSlugs(): string[] {
  return productions.map((p) => p.slug);
}

// --- People ---

export function getAllPeople(): Person[] {
  return people.sort((a, b) => a.name.localeCompare(b.name));
}

export function getPersonBySlug(slug: string): Person | undefined {
  return people.find((p) => p.slug === slug);
}

export function getPersonSlugs(): string[] {
  return people.map((p) => p.slug);
}

export function getFeaturedPeople(): Person[] {
  return people.filter((p) => p.featured);
}

// SEO: a person profile is indexable if it has substantive content (or is force-flagged).
// Thin profiles get noindex,follow so Google stops wasting crawl budget on them.
// Override per-person via Person.seoIndex (true = always index, false = always noindex).
export function isPersonComplete(p: Person): boolean {
  if (typeof p.seoIndex === "boolean") return p.seoIndex;
  return (
    (p.bio?.length ?? 0) >= 250 ||
    (p.otherNotableWork?.length ?? 0) > 0 ||
    (p.interviews?.length ?? 0) > 0 ||
    !!p.media
  );
}

// --- Relations ---

export function getProductionsForPerson(personId: string): Production[] {
  return productions
    .filter((p) => p.cast_crew.some((c) => c.person_id === personId))
    .sort((a, b) => b.year - a.year);
}

export function getRolesForPerson(personId: string, production: Production): string[] {
  const entry = production.cast_crew.find((c) => c.person_id === personId);
  return entry?.roles ?? [];
}

export function getProductionCount(personId: string): number {
  return productions.filter((p) => p.cast_crew.some((c) => c.person_id === personId)).length;
}

// Cast-mates: other people who appeared alongside this person in any production.
// Used for cross-linking on /people/[slug] — boosts internal link graph for SEO.
export function getCastMatesForPerson(personId: string, limit = 16): Person[] {
  const personProductions = getProductionsForPerson(personId);
  const mateIds = new Set<string>();
  for (const prod of personProductions) {
    for (const entry of prod.cast_crew) {
      if (entry.person_id !== personId) mateIds.add(entry.person_id);
    }
  }
  const mates = Array.from(mateIds)
    .map((id) => people.find((p) => p.id === id))
    .filter((p): p is Person => !!p);
  // Prioritize: complete profiles first, then by name
  mates.sort((a, b) => {
    const aComplete = isPersonComplete(a) ? 0 : 1;
    const bComplete = isPersonComplete(b) ? 0 : 1;
    if (aComplete !== bComplete) return aComplete - bComplete;
    return a.name.localeCompare(b.name);
  });
  return mates.slice(0, limit);
}

// Related productions: same language and/or same era — for cross-linking on /productions/[slug].
// If the production has explicit relatedProductionSlugs, those win.
export function getRelatedProductionsAuto(production: Production, limit = 6): Production[] {
  if (production.relatedProductionSlugs?.length) {
    return production.relatedProductionSlugs
      .map((slug) => productions.find((p) => p.slug === slug))
      .filter((p): p is Production => !!p)
      .slice(0, limit);
  }
  const candidates = productions.filter((p) => p.slug !== production.slug);
  const scored = candidates.map((p) => {
    let score = 0;
    if (p.language === production.language) score += 3;
    const yearDiff = Math.abs(p.year - production.year);
    if (yearDiff <= 2) score += 2;
    else if (yearDiff <= 5) score += 1;
    const sharedGenres = p.genre.filter((g) => production.genre.includes(g)).length;
    score += sharedGenres;
    return { p, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || b.p.year - a.p.year)
    .slice(0, limit)
    .map((s) => s.p);
}

// --- Festivals ---

export function getAllFestivals(): Festival[] {
  return festivals;
}

export function getFestivalById(id: string): Festival | undefined {
  return festivals.find((f) => f.id === id);
}

// --- Press ---

export function getAllPress(): PressItem[] {
  return press.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPressForProduction(slug: string): PressItem[] {
  return press.filter((p) => p.productionSlug === slug);
}

export function getPressForPerson(slug: string): PressItem[] {
  return press.filter((p) => p.personSlug === slug);
}

export function getReviewBySlug(slug: string): PressItem | undefined {
  return press.find((p) => p.reviewSlug === slug);
}

export function getAllReviewSlugs(): string[] {
  return press.filter((p) => p.reviewSlug).map((p) => p.reviewSlug!);
}

// --- Filters ---

export function getFilterOptions(): FilterOptions {
  const allShows = productions.flatMap((p) => p.shows ?? []);
  return {
    types: [...new Set(productions.map((p) => p.type))],
    languages: [...new Set(productions.map((p) => p.language))],
    genres: [...new Set(productions.flatMap((p) => p.genre))],
    years: [...new Set(productions.map((p) => p.year))].sort((a, b) => b - a),
    cities: [...new Set(allShows.map((s) => s.city))],
  };
}
