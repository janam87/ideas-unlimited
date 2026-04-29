import type { MetadataRoute } from "next";
import { getAllProductions, getAllPeople, getAllReviewSlugs, isPersonComplete, getPressForProduction } from "@/lib/data";
import { getAllPosts } from "@/lib/blog";
import { SITE } from "@/lib/constants";
import { getUpcomingShows } from "@/lib/shows";

// Derive a stable lastmod for productions.
// Priority: next upcoming show > production year (if recent) > site-launch fallback.
// Old productions (pre-2024) use the site-launch date — they're "republished" on this site,
// not stuck in 2004. Avoids new Date() on every build (Google distrusts always-fresh as spam).
const SITE_LAUNCH = "2026-01-01";
function productionLastMod(slug: string, year: number): Date {
  const prod = getAllProductions().find((p) => p.slug === slug);
  const upcoming = prod ? getUpcomingShows(prod) : [];
  if (upcoming.length > 0) return new Date(upcoming[0].date);
  // Production year if it's recent; otherwise site-launch date so old plays still get reasonable crawl priority.
  if (year >= 2024) return new Date(`${year}-06-01`);
  return new Date(SITE_LAUNCH);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const productions = getAllProductions().map((p) => ({
    url: `${SITE.url}/productions/${p.slug}`,
    lastModified: productionLastMod(p.slug, p.year),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Only index people with substantive content. Skip those with a customLink (e.g. Manoj Shah → /manoj-shah).
  const people = getAllPeople()
    .filter((p) => !p.customLink && isPersonComplete(p))
    .map((p) => {
      // Person lastmod: latest production they appear in, or 2024-01-01 fallback.
      const prods = getAllProductions().filter((prod) =>
        prod.cast_crew.some((c) => c.person_id === p.id)
      );
      const lastProductionYear = prods.length > 0
        ? Math.max(...prods.map((prod) => prod.year))
        : 2024;
      // Cap at 2026 (site-launch year) so an actor's old credits don't make their profile look stale.
      const personLastMod = lastProductionYear >= 2024
        ? new Date(`${lastProductionYear}-06-01`)
        : new Date(SITE_LAUNCH);
      return {
        url: `${SITE.url}/people/${p.slug}`,
        lastModified: personLastMod,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    });

  const reviews = getAllReviewSlugs().map((slug) => {
    // Find the press item to get its date
    const prods = getAllProductions();
    let date: Date | undefined;
    for (const p of prods) {
      const press = getPressForProduction(p.slug);
      const review = press.find((r) => r.reviewSlug === slug);
      if (review?.date) {
        date = new Date(review.date);
        break;
      }
    }
    return {
      url: `${SITE.url}/reviews/${slug}`,
      lastModified: date ?? new Date(SITE_LAUNCH),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    };
  });

  const posts = getAllPosts().map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Freshest content date — used for index pages so lastmod reflects real activity, not build time.
  const allDates = [
    ...productions.map((p) => p.lastModified),
    ...posts.map((p) => p.lastModified),
  ].filter((d): d is Date => d instanceof Date);
  const freshest = allDates.length > 0
    ? new Date(Math.max(...allDates.map((d) => d.getTime())))
    : new Date("2026-04-01");
  const blogFreshest = posts.length > 0
    ? new Date(Math.max(...posts.map((p) => (p.lastModified as Date).getTime())))
    : freshest;

  return [
    {
      url: SITE.url,
      lastModified: freshest,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE.url}/productions`,
      lastModified: freshest,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/people`,
      lastModified: freshest,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/upcoming-shows`,
      lastModified: freshest,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/manoj-shah`,
      lastModified: new Date(SITE_LAUNCH),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/about`,
      lastModified: new Date(SITE_LAUNCH),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/blog`,
      lastModified: blogFreshest,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/contact`,
      lastModified: new Date(SITE_LAUNCH),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...productions,
    ...people,
    ...reviews,
    ...posts,
  ];
}
