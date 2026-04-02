import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Calendar } from "lucide-react";
import {
  getAllProductions,
  getProductionBySlug,
  getPersonBySlug,
  getPressForProduction,
} from "@/lib/data";
import { getUpcomingShows, formatShowDate, formatShowTime, hasUpcomingShows } from "@/lib/shows";
import { productionSchema, eventSchema } from "@/lib/schema";
import { Badge } from "@/components/ui/Badge";
import { Gallery } from "@/components/shared/Gallery";
import { PressCard } from "@/components/shared/PressCard";
import { RelatedProductions } from "@/components/shared/RelatedProductions";
import { ProductionHero } from "@/components/productions/ProductionHero";
import { AmbientMusic } from "@/components/shared/AmbientMusic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProductions().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const production = getProductionBySlug(slug);
  if (!production) return { title: "Not Found" };
  return {
    title: production.title,
    description: production.synopsis,
    openGraph: {
      title: production.title,
      description: production.synopsis,
      images: [production.image],
    },
  };
}

export default async function ProductionDetailPage({ params }: Props) {
  const { slug } = await params;
  const production = getProductionBySlug(slug);
  if (!production) notFound();

  const upcomingShows = getUpcomingShows(production);
  const isUpcoming = hasUpcomingShows(production);
  const pressItems = getPressForProduction(production.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productionSchema(production)) }}
      />
      {upcomingShows.map((show, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema(production, show)) }}
        />
      ))}

      {/* Ambient Music */}
      {production.musicUrl && (
        <AmbientMusic src={production.musicUrl} />
      )}

      {/* Hero */}
      <ProductionHero
        title={production.title}
        subtitle={production.subtitle}
        image={production.image}
        videoUrl={production.videoUrl}
        isUpcoming={isUpcoming}
      />

      {/* Book Tickets — Onassis-style band right after hero */}
      {upcomingShows.length > 0 && (
        <section className="bg-purple">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-10">
            <div className="flex flex-col gap-6">
              {upcomingShows.map((show, i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">Dates</span>
                      <p className="text-white font-medium text-lg mt-1">{formatShowDate(show.date)}</p>
                    </div>
                    <div>
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">Time</span>
                      <p className="text-white font-medium text-lg mt-1">{formatShowTime(show.time)}</p>
                    </div>
                    <div>
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">Location</span>
                      <p className="text-white font-medium text-lg mt-1">{show.venue}, {show.city}</p>
                    </div>
                    {show.status === "almost-full" && (
                      <span className="bg-white/20 text-white font-mono text-xs uppercase tracking-wider px-3 py-1.5">
                        Almost Full
                      </span>
                    )}
                  </div>
                  {show.ticketUrl && show.status !== "sold-out" && (
                    <a
                      href={show.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 bg-white text-purple-dark text-center font-bold uppercase tracking-wider text-sm px-8 py-4 hover:bg-white/90 transition-colors"
                    >
                      Book Tickets &rarr;
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Synopsis + Poster — 5/7 split, poster sticky on left */}
      <section className="border-t border-grey-700">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left — Poster (sticky) */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24 lg:max-w-[280px]">
                <div className="relative aspect-[2/3] w-full overflow-hidden">
                  <Image
                    src={production.image}
                    alt={`${production.title} poster`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right — Synopsis + Details */}
            <div className="lg:col-span-7">
              <p className="text-grey-200 text-lg md:text-xl leading-relaxed">
                {production.synopsis}
              </p>

              {/* Details */}
              <div className="mt-10 pt-10 border-t border-grey-700">
                <MetaRow label="Year" value={String(production.year)} />
                <MetaRow label="Language" value={production.language} />
                <MetaRow label="Genre" value={production.genre.join(", ")} />
                <MetaRow label="Type" value={production.type} />
                {production.duration && <MetaRow label="Duration" value={production.duration} />}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commissioned Context */}
      {production.commissionedBy && (
        <section className="border-t border-grey-700">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream">
                  Commissioned By
                </h2>
              </div>
              <div className="lg:col-span-7">
                <div className="border-l-2 border-purple pl-6 py-4">
                  <p className="text-cream text-lg">{production.commissionedBy}</p>
                  {production.commissionContext && (
                    <p className="text-grey-400 mt-2">{production.commissionContext}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Cast & Crew */}
      <section className="border-t border-grey-700">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream leading-tight">
                The People<br className="hidden lg:block" /> Behind<br className="hidden lg:block" /> the Play
              </h2>
            </div>
            <div className="lg:col-span-7">
              <div className="border-t border-grey-700">
                {production.cast_crew.map((entry) => {
                  const person = getPersonBySlug(entry.person_id);
                  return (
                    <div key={entry.person_id} className="flex items-center justify-between py-4 border-b border-grey-700">
                      {person ? (
                        <Link href={`/people/${person.slug}`} className="text-purple hover:text-purple-light transition-colors font-medium">
                          {person.name}
                        </Link>
                      ) : (
                        <span className="text-cream">{entry.person_id}</span>
                      )}
                      <span className="font-mono text-sm text-grey-400">{entry.roles.join(" · ")}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery — full bleed, no heading */}
      {production.gallery && production.gallery.length > 0 && (
        <section className="border-t border-grey-700">
          <Gallery images={production.gallery} title={production.title} fullBleed />
        </section>
      )}

      {/* Press & Reviews */}
      {pressItems.length > 0 && (
        <section className="border-t border-grey-700">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream leading-tight">
                  Press &amp;<br className="hidden lg:block" /> Reviews
                </h2>
              </div>
              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pressItems.map((item) => (
                    <PressCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {production.relatedProductionSlugs && production.relatedProductionSlugs.length > 0 && (
        <section className="border-t border-grey-700">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream leading-tight">
                  Also Worth<br className="hidden lg:block" /> Seeing
                </h2>
              </div>
              <div className="lg:col-span-7">
                <RelatedProductions slugs={production.relatedProductionSlugs} />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function MetaRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-baseline justify-between py-3 border-b border-grey-700">
      <span className="font-mono text-xs text-grey-400 uppercase tracking-wider">{label}</span>
      <span className={`text-right font-medium ${highlight ? "text-amber" : "text-cream"}`}>{value}</span>
    </div>
  );
}
