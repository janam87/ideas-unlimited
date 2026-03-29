import Link from "next/link";
import Image from "next/image";
import { getFeaturedProductions } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { hasUpcomingShows } from "@/lib/shows";

export function FeaturedProductions() {
  const featured = getFeaturedProductions().slice(0, 3);
  const first = featured[0];
  const rest = featured.slice(1);

  return (
    <section className="py-16 md:py-24">
      <Container>
        {/* Section header — newspaper style */}
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <hr className="editorial-rule-thick w-16 mb-4" />
            <h2 className="font-serif text-4xl md:text-5xl text-cream">Featured</h2>
          </div>
          <Link
            href="/productions"
            className="font-mono text-xs uppercase tracking-widest text-gold hover:text-gold-light transition-colors"
          >
            View All &rarr;
          </Link>
        </div>
        <hr className="editorial-rule mb-8" />

        {/* Editorial grid: first item large, rest in side column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Lead story — spans 7 cols */}
          {first && (
            <Link
              href={`/productions/${first.slug}`}
              className="lg:col-span-7 lg:border-r lg:border-grey-700 lg:pr-8 pb-8 lg:pb-0 group"
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
              <h3 className="font-serif text-3xl md:text-4xl text-cream group-hover:text-gold transition-colors leading-tight">
                {first.title}
              </h3>
              {first.subtitle && (
                <p className="text-gold text-lg font-serif italic mt-1">{first.subtitle}</p>
              )}
              <p className="text-grey-300 mt-4 leading-relaxed line-clamp-3">
                {first.synopsis}
              </p>
            </Link>
          )}

          {/* Secondary stories — spans 5 cols */}
          <div className="lg:col-span-5 lg:pl-8 space-y-0">
            {rest.map((prod, i) => (
              <Link
                key={prod.slug}
                href={`/productions/${prod.slug}`}
                className={`block py-6 group ${
                  i < rest.length - 1 ? "border-b border-grey-700" : ""
                }`}
              >
                <div className="grid grid-cols-3 gap-5">
                  <div className="relative aspect-[4/3] overflow-hidden col-span-1">
                    <Image
                      src={prod.image}
                      alt={prod.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-xs text-grey-400">{prod.year}</span>
                      <Badge variant="outline">{prod.language}</Badge>
                    </div>
                    <h3 className="font-serif text-xl text-cream group-hover:text-gold transition-colors leading-snug">
                      {prod.title}
                    </h3>
                    <p className="text-grey-400 text-sm mt-2 line-clamp-2">
                      {prod.synopsis}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
