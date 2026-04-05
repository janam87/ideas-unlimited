import Link from "next/link";
import Image from "next/image";
import { getProductionBySlug } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { hasUpcomingShows } from "@/lib/shows";

const FEATURED_ORDER = [
  "mohan-no-masalo",
  "mareez",
  "hu-chandrakant-bakshi",
  "adbhut",
  "bombay-flower",
  "karl-marx-in-kalbadevi",
  "whats-up",
];

export function FeaturedProductions() {
  const productions = FEATURED_ORDER
    .map((slug) => getProductionBySlug(slug))
    .filter(Boolean);

  const first = productions[0];
  const rest = productions.slice(1, 7);

  return (
    <section className="border-t border-grey-700">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left — section title */}
          <div className="lg:col-span-5">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream leading-[0.95]">
              Featured
            </h2>
          </div>

          {/* Right — lead production + secondary grid + View All */}
          <div className="lg:col-span-7">
            {first && (
              <Link
                href={`/productions/${first.slug}`}
                className="block group"
              >
                <div className="relative aspect-[16/10] overflow-hidden mb-5">
                  <Image
                    src={first.image}
                    alt={first.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {hasUpcomingShows(first) && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="amber">Now Performing</Badge>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs text-grey-400 uppercase tracking-widest">{first.language}</span>
                  <span className="text-grey-600">&middot;</span>
                  <span className="font-mono text-xs text-grey-400">{first.year}</span>
                  <span className="text-grey-600">&middot;</span>
                  <Badge variant="outline">{first.type}</Badge>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl text-cream group-hover:text-purple transition-colors leading-tight">
                  {first.title}
                </h3>
                {first.subtitle && (
                  <p className="text-purple text-lg font-serif italic mt-1">{first.subtitle}</p>
                )}
                <p className="text-grey-300 mt-4 leading-relaxed line-clamp-3 max-w-2xl">
                  {first.synopsis}
                </p>
              </Link>
            )}

            {/* 6 secondary productions in 2-col grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 pt-10 border-t border-grey-700">
                {rest.map((prod) => (
                  <Link
                    key={prod!.slug}
                    href={`/productions/${prod!.slug}`}
                    className="group"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden mb-4">
                      <Image
                        src={prod!.image}
                        alt={prod!.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-xs text-grey-400">{prod!.year}</span>
                      <Badge variant="outline">{prod!.language}</Badge>
                    </div>
                    <h3 className="font-serif text-2xl text-cream group-hover:text-purple transition-colors leading-snug">
                      {prod!.title}
                    </h3>
                    <p className="text-grey-400 text-sm mt-2 line-clamp-2">
                      {prod!.synopsis}
                    </p>
                  </Link>
                ))}
              </div>
            )}

            {/* View All — at the bottom */}
            <div className="mt-10 pt-10 border-t border-grey-700">
              <Link
                href="/productions"
                className="font-mono text-sm uppercase tracking-widest text-purple hover:text-purple-light transition-colors"
              >
                View All Productions &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
