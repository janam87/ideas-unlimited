import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllProductions } from "@/lib/data";
import { getUpcomingShows, getPastShows, formatShowTime } from "@/lib/shows";
import { eventSchema } from "@/lib/schema";
import { SITE } from "@/lib/constants";
import type { Production, Show } from "@/lib/types";

// Auto-regenerate every 5 min so shows archive automatically once they're 2hr past start.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Upcoming Shows",
  description:
    "Catch the next live performances by Ideas Unlimited Productions across India. See dates, venues, times and book tickets.",
  openGraph: {
    title: `Upcoming Shows | ${SITE.name}`,
    description:
      "Live theatre dates across Mumbai, Ahmedabad, and beyond — from Manoj Shah's Ideas Unlimited.",
    images: ["/images/og-default.jpg"],
  },
  alternates: { canonical: "/upcoming-shows" },
};

interface ShowEntry {
  production: Production;
  show: Show;
}

interface MonthGroup {
  monthKey: string;
  monthLabel: string;
  days: DayGroup[];
}

interface DayGroup {
  dateKey: string;
  date: Date;
  weekday: string;
  day: string;
  monthShort: string;
  venueLabel: string | null;
  shows: ShowEntry[];
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function buildMonthGroups(entries: ShowEntry[]): MonthGroup[] {
  const months = new Map<string, MonthGroup>();
  for (const entry of entries) {
    const date = new Date(entry.show.date);
    const monthKey = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
    const monthLabel = `${MONTH_NAMES[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
    const dateKey = entry.show.date;

    let month = months.get(monthKey);
    if (!month) {
      month = { monthKey, monthLabel, days: [] };
      months.set(monthKey, month);
    }

    let day = month.days.find((d) => d.dateKey === dateKey);
    if (!day) {
      day = {
        dateKey,
        date,
        weekday: WEEKDAY_NAMES[date.getUTCDay()],
        day: String(date.getUTCDate()).padStart(2, "0"),
        monthShort: MONTH_NAMES[date.getUTCMonth()].slice(0, 3),
        venueLabel: null,
        shows: [],
      };
      month.days.push(day);
    }

    day.shows.push(entry);
  }

  // Set a venueLabel when every show that day shares the same venue/city/host (e.g. Prithvi 13 Jun).
  for (const month of months.values()) {
    month.days.sort((a, b) => a.date.getTime() - b.date.getTime());
    for (const day of month.days) {
      day.shows.sort(
        (a, b) => a.show.time.localeCompare(b.show.time)
      );
      if (day.shows.length > 1) {
        const first = day.shows[0].show;
        const sameContext = day.shows.every(
          (s) => s.show.venue === first.venue && s.show.city === first.city && (s.show.host ?? "") === (first.host ?? "")
        );
        if (sameContext) {
          const headline = first.host ?? first.venue;
          day.venueLabel = `${headline} · ${first.city}`;
        }
      }
    }
  }

  return Array.from(months.values()).sort((a, b) => a.monthKey.localeCompare(b.monthKey));
}

export default function UpcomingShowsPage() {
  const productions = getAllProductions();

  const allEntries: ShowEntry[] = productions.flatMap((production) =>
    getUpcomingShows(production).map((show) => ({ production, show }))
  );
  allEntries.sort(
    (a, b) =>
      new Date(`${a.show.date}T${a.show.time}`).getTime() -
      new Date(`${b.show.date}T${b.show.time}`).getTime()
  );

  const next = allEntries[0];
  const months = buildMonthGroups(allEntries);

  // Past shows — most recent first, capped to last 12
  const pastEntries: ShowEntry[] = productions
    .flatMap((production) =>
      getPastShows(production).map((show) => ({ production, show }))
    )
    .sort(
      (a, b) =>
        new Date(`${b.show.date}T${b.show.time}`).getTime() -
        new Date(`${a.show.date}T${a.show.time}`).getTime()
    )
    .slice(0, 12);

  return (
    <>
      {allEntries.map((entry, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(eventSchema(entry.production, entry.show)),
          }}
        />
      ))}

      {/* Hero */}
      <section className="pt-28 md:pt-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-purple mb-4">
            On Stage
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-cream leading-[0.95]">
            Upcoming Shows
          </h1>
        </div>
      </section>

      {/* Featured next show */}
      {next && (
        <section className="mt-16 border-y border-grey-700 bg-grey-900/40">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber mb-5 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber" />
              </span>
              Next Show
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
              <Link
                href={`/productions/${next.production.slug}`}
                className="group block relative aspect-[16/10] overflow-hidden"
              >
                <Image
                  src={next.production.image}
                  alt={next.production.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </Link>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-grey-400 mb-2">
                  {next.production.language} · {next.production.type === "play" ? "Play" : next.production.type}
                </p>
                <h2 className="font-serif text-4xl md:text-5xl text-cream leading-tight">
                  <Link href={`/productions/${next.production.slug}`} className="hover:text-purple transition-colors">
                    {next.production.title}
                  </Link>
                </h2>
                {next.production.subtitle && (
                  <p className="font-serif italic text-grey-300 text-lg md:text-xl mt-2">
                    {next.production.subtitle}
                  </p>
                )}
                <div className="mt-6 grid grid-cols-2 gap-4 max-w-md">
                  <MetaCell label="Date" value={`${WEEKDAY_NAMES[new Date(next.show.date).getUTCDay()]}, ${new Date(next.show.date).getUTCDate()} ${MONTH_NAMES[new Date(next.show.date).getUTCMonth()].slice(0, 3)}`} />
                  <MetaCell label="Time" value={formatShowTime(next.show.time)} />
                  <MetaCell label="Venue" value={next.show.venue} />
                  <MetaCell label="City" value={next.show.city} />
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-8">
                  {next.show.ticketUrl ? (
                    <a
                      href={next.show.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-purple text-white font-bold uppercase tracking-wider text-sm px-6 py-3.5 hover:bg-purple-light transition-colors"
                    >
                      Book Tickets
                      <ArrowUpRight size={16} />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 bg-grey-800 text-grey-300 font-mono uppercase tracking-wider text-xs px-5 py-3">
                      Tickets soon
                    </span>
                  )}
                  <Link
                    href={`/productions/${next.production.slug}`}
                    className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-purple hover:text-purple-light transition-colors"
                  >
                    Production details
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Schedule grouped by month */}
      <section className="mt-16 md:mt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-24">
          {months.length === 0 && (
            <p className="text-grey-300 text-lg">
              No upcoming shows announced yet. Check back soon.
            </p>
          )}

          {months.map((month) => (
            <div key={month.monthKey} className="mb-16 md:mb-20">
              <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-purple mb-6">
                {month.monthLabel}
              </h2>

              <div className="border-t border-grey-700">
                {month.days.map((day) => (
                  <div key={day.dateKey} className="border-b border-grey-700 py-6 md:py-8">
                    <div className="grid grid-cols-12 gap-4 md:gap-8">
                      {/* Date column */}
                      <div className="col-span-3 md:col-span-2">
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-grey-400">
                          {day.weekday}
                        </p>
                        <p className="font-serif text-4xl md:text-5xl text-cream leading-none mt-1">
                          {day.day}
                        </p>
                        <p className="font-mono text-[11px] uppercase tracking-widest text-grey-400 mt-1">
                          {day.monthShort}
                        </p>
                      </div>

                      {/* Shows column */}
                      <div className="col-span-9 md:col-span-10">
                        {day.venueLabel && (
                          <div className="mb-5 pb-4 border-b border-grey-700/60">
                            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-purple mb-1">
                              At
                            </p>
                            <p className="font-serif text-2xl md:text-3xl text-cream leading-tight">
                              {day.venueLabel}
                            </p>
                          </div>
                        )}
                        <ul className="divide-y divide-grey-700/60">
                          {day.shows.map(({ production, show }) => {
                            const venueHeadline = show.host ?? show.venue;
                            return (
                              <li
                                key={`${production.slug}-${show.time}`}
                                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 py-4 md:py-5"
                              >
                                {/* Thumbnail */}
                                <Link
                                  href={`/productions/${production.slug}`}
                                  className="group/thumb relative aspect-[16/10] w-full sm:w-36 md:w-44 lg:w-52 shrink-0 overflow-hidden"
                                >
                                  <Image
                                    src={production.image}
                                    alt={production.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, 208px"
                                    className="object-cover transition-transform duration-700 group-hover/thumb:scale-105"
                                  />
                                </Link>

                                {/* Venue (when not grouped) + Title + meta */}
                                <div className="flex-1 min-w-0">
                                  {!day.venueLabel && (
                                    <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.25em] text-amber mb-1.5">
                                      {venueHeadline} · {show.city}
                                      {show.host && (
                                        <span className="text-grey-400 normal-case tracking-wide ml-2">
                                          ({show.venue})
                                        </span>
                                      )}
                                    </p>
                                  )}
                                  <Link
                                    href={`/productions/${production.slug}`}
                                    className="font-serif text-xl md:text-2xl text-cream hover:text-purple transition-colors leading-tight"
                                  >
                                    {production.title}
                                  </Link>
                                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-grey-400">
                                    <span className="text-grey-200">{formatShowTime(show.time)}</span>
                                    <span className="mx-2 text-grey-600" aria-hidden>·</span>
                                    <span>{production.language}</span>
                                  </p>
                                </div>

                                {/* Book button */}
                                <div className="shrink-0">
                                  {show.ticketUrl ? (
                                    <a
                                      href={show.ticketUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 bg-purple text-white font-mono text-xs uppercase tracking-widest px-4 py-2.5 hover:bg-purple-light transition-colors"
                                    >
                                      Book
                                      <ArrowUpRight size={13} />
                                    </a>
                                  ) : (
                                    <span className="inline-flex items-center gap-1.5 border border-grey-700 text-grey-400 font-mono text-xs uppercase tracking-widest px-4 py-2.5">
                                      Tickets soon
                                    </span>
                                  )}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Past Shows — auto-archived from upcoming list once 2hrs after start */}
      {pastEntries.length > 0 && (
        <section className="border-t border-grey-700">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="font-serif text-3xl md:text-4xl text-cream">
                Recently Performed
              </h2>
              <span className="font-mono text-[11px] uppercase tracking-widest text-grey-400">
                {pastEntries.length} {pastEntries.length === 1 ? "show" : "shows"}
              </span>
            </div>
            <ul className="border-t border-grey-700/60">
              {pastEntries.map(({ production, show }, i) => {
                const date = new Date(show.date);
                const venueHeadline = show.host ?? show.venue;
                return (
                  <li
                    key={`past-${production.slug}-${show.date}-${show.time}-${i}`}
                    className="border-b border-grey-700/60 py-4 md:py-5"
                  >
                    <Link
                      href={`/productions/${production.slug}`}
                      className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-6"
                    >
                      <span className="font-mono text-[11px] uppercase tracking-widest text-grey-500 md:w-32 shrink-0">
                        {WEEKDAY_NAMES[date.getUTCDay()]}, {date.getUTCDate()} {MONTH_NAMES[date.getUTCMonth()].slice(0, 3)} {date.getUTCFullYear()}
                      </span>
                      <span className="font-serif text-lg md:text-xl text-grey-300 group-hover:text-purple transition-colors flex-1 min-w-0">
                        {production.title}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-grey-500 md:text-right">
                        {venueHeadline}, {show.city}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-grey-400 mb-1">
        {label}
      </p>
      <p className="text-cream text-base md:text-lg">{value}</p>
    </div>
  );
}
