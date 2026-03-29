import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Calendar, Ticket } from "lucide-react";
import {
  getAllProductions,
  getProductionBySlug,
  getPersonBySlug,
  getPressForProduction,
  getFestivalById,
} from "@/lib/data";
import { getUpcomingShows, formatShowDate, formatShowTime, hasUpcomingShows } from "@/lib/shows";
import { productionSchema, eventSchema } from "@/lib/schema";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Gallery } from "@/components/shared/Gallery";
import { VideoEmbed } from "@/components/shared/VideoEmbed";
import { PressCard } from "@/components/shared/PressCard";
import { RelatedProductions } from "@/components/shared/RelatedProductions";

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
  const festivalEntries = (production.festivals ?? [])
    .map((id) => getFestivalById(id))
    .filter((f): f is NonNullable<typeof f> => f != null);

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

      {/* Hero — full bleed image with title overlay */}
      <section className="relative pt-20">
        <div className="relative aspect-[21/9] md:aspect-[3/1] w-full overflow-hidden">
          <Image
            src={production.image}
            alt={production.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <Container>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl text-cream leading-[0.9]">
                {production.title}
              </h1>
            </Container>
          </div>
        </div>
      </section>

      {/* Two-column info section — like the Animals film reference */}
      <Container className="py-12">
        <hr className="editorial-rule-thick mb-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left: Synopsis — 7 cols */}
          <div className="lg:col-span-7 lg:border-r lg:border-grey-700 lg:pr-12 pb-10 lg:pb-0">
            {production.subtitle && (
              <p className="text-gold text-xl font-serif italic mb-6">{production.subtitle}</p>
            )}
            <p className="text-grey-200 text-lg md:text-xl leading-relaxed">
              {production.synopsis}
            </p>

            {/* Festival laurels — like film festival logos */}
            {festivalEntries.length > 0 && (
              <div className="flex flex-wrap items-center gap-4 mt-8 pt-8 border-t border-grey-700">
                {festivalEntries.map((f) => (
                  <span key={f.id} className="font-mono text-xs text-grey-400 uppercase tracking-wider border border-grey-700 px-3 py-1.5">
                    {f.name} {f.year}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right: Metadata — 5 cols */}
          <div className="lg:col-span-5 lg:pl-12">
            <div className="space-y-0">
              <MetaRow label="Year" value={String(production.year)} />
              <MetaRow label="Language" value={production.language} />
              <MetaRow label="Genre" value={production.genre.join(", ")} />
              <MetaRow label="Type" value={production.type} />
              {production.duration && <MetaRow label="Duration" value={production.duration} />}
              <MetaRow label="Cast & Crew" value={`${production.cast_crew.length} members`} />
              {isUpcoming && <MetaRow label="Status" value="Now Performing" highlight />}
            </div>

            {/* Ticket CTA */}
            {upcomingShows.length > 0 && upcomingShows[0].ticketUrl && (
              <a
                href={upcomingShows[0].ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-8 bg-gold text-background text-center font-bold uppercase tracking-wider text-sm py-4 hover:bg-gold-light transition-colors"
              >
                Book Tickets &rarr;
              </a>
            )}
          </div>
        </div>
      </Container>

      {/* Now Performing — show dates */}
      {upcomingShows.length > 0 && (
        <Container className="pb-12">
          <hr className="editorial-rule mb-8" />
          <h2 className="font-serif text-2xl text-cream mb-6 flex items-center gap-3">
            <Ticket size={20} className="text-amber" />
            Upcoming Shows
          </h2>
          <div className="border border-grey-700">
            {upcomingShows.map((show, i) => (
              <div
                key={i}
                className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 ${
                  i < upcomingShows.length - 1 ? "border-b border-grey-700" : ""
                }`}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-grey-400" />
                    <span className="font-medium text-cream">{formatShowDate(show.date)}</span>
                    <span className="text-grey-400 font-mono text-sm">{formatShowTime(show.time)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-grey-300">
                    <MapPin size={14} className="text-grey-400" />
                    <span>{show.venue}, {show.city}</span>
                  </div>
                  {show.status === "almost-full" && <Badge variant="amber">Almost Full</Badge>}
                  {show.status === "sold-out" && <Badge>Sold Out</Badge>}
                </div>
                {show.ticketUrl && show.status !== "sold-out" && (
                  <a
                    href={show.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs uppercase tracking-wider text-gold hover:text-gold-light transition-colors"
                  >
                    Book &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
        </Container>
      )}

      {/* Commissioned Context */}
      {production.commissionedBy && (
        <Container className="pb-12">
          <div className="border-l-2 border-gold pl-6 py-4">
            <p className="font-mono text-xs uppercase tracking-widest text-gold mb-2">Commissioned By</p>
            <p className="text-cream text-lg">{production.commissionedBy}</p>
            {production.commissionContext && (
              <p className="text-grey-400 mt-2">{production.commissionContext}</p>
            )}
          </div>
        </Container>
      )}

      {/* Cast & Crew — editorial list style */}
      <Container className="pb-12">
        <hr className="editorial-rule mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 mb-8">
          <div className="lg:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold mb-4 lg:mb-0">Cast & Crew</p>
          </div>
          <div className="lg:col-span-9">
            <div className="border-t border-grey-700">
              {production.cast_crew.map((entry) => {
                const person = getPersonBySlug(entry.person_id);
                return (
                  <div key={entry.person_id} className="flex items-center justify-between py-4 border-b border-grey-700">
                    {person ? (
                      <Link href={`/people/${person.slug}`} className="text-cream hover:text-gold transition-colors font-medium">
                        {person.name}
                      </Link>
                    ) : (
                      <span className="text-cream">{entry.person_id}</span>
                    )}
                    <span className="font-mono text-sm text-grey-400">{entry.roles.join(" &middot; ")}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

      {/* Gallery */}
      {production.gallery && production.gallery.length > 0 && (
        <Container className="pb-12">
          <hr className="editorial-rule mb-8" />
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold mb-6">Gallery</p>
          <Gallery images={production.gallery} title={production.title} />
        </Container>
      )}

      {/* Video */}
      {production.videoUrl && (
        <Container className="pb-12">
          <hr className="editorial-rule mb-8" />
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold mb-6">Watch</p>
          <VideoEmbed url={production.videoUrl} title={production.title} />
        </Container>
      )}

      {/* Press */}
      {pressItems.length > 0 && (
        <Container className="pb-12">
          <hr className="editorial-rule mb-8" />
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold mb-6">Press & Reviews</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pressItems.map((item) => (
              <PressCard key={item.id} item={item} />
            ))}
          </div>
        </Container>
      )}

      {/* Related */}
      {production.relatedProductionSlugs && production.relatedProductionSlugs.length > 0 && (
        <Container className="pb-20">
          <hr className="editorial-rule mb-8" />
          <RelatedProductions slugs={production.relatedProductionSlugs} />
        </Container>
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
