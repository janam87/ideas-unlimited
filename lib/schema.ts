import { SITE } from "./constants";
import type { Production, Person, Show } from "./types";
import type { BlogPost } from "./blog";

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
    image: person.portrait.startsWith("http") ? person.portrait : `${SITE.url}${person.portrait}`,
    jobTitle: person.roles.join(", "),
    url: `${SITE.url}/people/${person.slug}`,
    memberOf: { "@type": "TheaterGroup", name: SITE.name, url: SITE.url },
    sameAs: person.socialLinks
      ? Object.values(person.socialLinks).filter((u): u is string => !!u)
      : undefined,
  };
}

export function articleSchema(post: BlogPost) {
  const url = `${SITE.url}/blog/${post.slug}`;
  const image = post.image.startsWith("http") ? post.image : `${SITE.url}${post.image}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [image],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/images/iu-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    articleSection: post.category,
  };
}
