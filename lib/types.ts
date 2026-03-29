export interface Show {
  date: string; // ISO date
  time: string;
  venue: string;
  city: string;
  ticketUrl?: string;
  status?: "confirmed" | "almost-full" | "sold-out";
}

export interface CastCrewEntry {
  person_id: string;
  roles: string[];
}

export interface Production {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  type: "play" | "musical" | "reading" | "workshop" | "festival-production";
  language: string;
  genre: string[];
  year: number;
  synopsis: string;
  description?: string;
  image: string;
  gallery?: string[];
  videoUrl?: string;
  duration?: string;
  shows?: Show[];
  cast_crew: CastCrewEntry[];
  festivals?: string[];
  press?: string[]; // press item IDs
  commissionedBy?: string;
  commissionContext?: string;
  relatedProductionSlugs?: string[];
  featured?: boolean;
}

export interface Person {
  id: string;
  slug: string;
  name: string;
  portrait: string;
  bio: string;
  roles: string[]; // e.g. ["Actor", "Director"]
  otherNotableWork?: string[];
  interviews?: { title: string; url: string; source: string }[];
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    website?: string;
  };
  featured?: boolean;
}

export interface Festival {
  id: string;
  name: string;
  year: number;
  city: string;
  description?: string;
}

export interface PressItem {
  id: string;
  title: string;
  source: string;
  date: string;
  url?: string;
  excerpt?: string;
  productionSlug?: string;
  personSlug?: string;
}

export interface FilterOptions {
  types: string[];
  languages: string[];
  genres: string[];
  years: number[];
  cities: string[];
}
