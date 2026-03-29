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
