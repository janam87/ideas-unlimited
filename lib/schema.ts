import { SITE } from "./constants";
import type { Production, Person, Show } from "./types";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TheaterGroup",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    foundingDate: `${SITE.foundedYear}`,
    founder: {
      "@type": "Person",
      name: SITE.founder,
    },
    sameAs: Object.values(SITE.social),
  };
}

export function productionSchema(production: Production) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: production.title,
    description: production.synopsis,
    dateCreated: `${production.year}`,
    inLanguage: production.language,
    genre: production.genre,
    creator: {
      "@type": "TheaterGroup",
      name: SITE.name,
    },
  };
}

export function eventSchema(production: Production, show: Show) {
  return {
    "@context": "https://schema.org",
    "@type": "TheaterEvent",
    name: production.title,
    description: production.synopsis,
    startDate: `${show.date}T${show.time}`,
    location: {
      "@type": "PerformingArtsTheater",
      name: show.venue,
      address: { "@type": "PostalAddress", addressLocality: show.city },
    },
    offers: show.ticketUrl
      ? {
          "@type": "Offer",
          url: show.ticketUrl,
          availability:
            show.status === "sold-out"
              ? "https://schema.org/SoldOut"
              : "https://schema.org/InStock",
        }
      : undefined,
    organizer: { "@type": "TheaterGroup", name: SITE.name },
  };
}

export function personSchema(person: Person) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    description: person.bio,
    image: person.portrait,
    jobTitle: person.roles.join(", "),
    memberOf: { "@type": "TheaterGroup", name: SITE.name },
  };
}
