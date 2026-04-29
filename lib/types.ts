export interface Show {
  date: string; // ISO date
  time: string;
  venue: string;
  city: string;
  // Override venue when the booking matters more — e.g. private/institutional show.
  // "TCS Annual Day", "Birla Foundation Gala", etc. Displayed above the production title.
  host?: string;
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
  poster?: string;
  gallery?: string[];
  videoUrl?: string;
  trailerUrl?: string;
  musicUrl?: string;
  duration?: string;
  shows?: Show[];
  cast_crew: CastCrewEntry[];
  festivals?: string[];
  press?: string[]; // press item IDs
  commissionedBy?: string;
  commissionContext?: string;
  relatedProductionSlugs?: string[];
  featured?: boolean;
  tags?: string[];
}

export interface Person {
  id: string;
  slug: string;
  name: string;
  portrait: string;
  bio: string;
  roles: string[]; // e.g. ["Actor", "Director"]
  otherNotableWork?: (NotableWork | string)[];  // string for legacy, NotableWork for enriched
  interviews?: { title: string; url: string; source: string }[];
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    website?: string;
    imdb?: string;
    bookmyshow?: string;
  };
  media?: PersonMedia;
  featured?: boolean;
  // SEO override — true forces index, false forces noindex. Undefined → auto via isPersonComplete().
  seoIndex?: boolean;
  // Override the default /people/[slug] link target. Used for Manoj Shah → /manoj-shah.
  customLink?: string;
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
  reviewSlug?: string;
  fullReview?: string[];
  reviewAuthor?: string;
}

export interface NotableWork {
  title: string;
  category?: string;
  year?: string;
  role?: string;
  thumbnail?: string;
  sourceUrl?: string;
  sourceLabel?: string;
}

export interface PersonMedia {
  photos?: string[];
  videos?: {
    url: string;
    thumbnail?: string;
    title?: string;
  }[];
}

export interface FilterOptions {
  types: string[];
  languages: string[];
  genres: string[];
  years: number[];
  cities: string[];
}
