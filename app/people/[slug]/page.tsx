import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPersonBySlug, getAllPeople, getProductionsForPerson, getRolesForPerson, getPressForPerson } from "@/lib/data";
import { personSchema } from "@/lib/schema";
import { PressCard } from "@/components/shared/PressCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPeople().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const person = getPersonBySlug(slug);
  if (!person) return { title: "Not Found" };
  return {
    title: person.name,
    description: person.bio.slice(0, 160),
    openGraph: {
      title: person.name,
      description: person.bio.slice(0, 160),
      images: [person.portrait],
    },
  };
}

export default async function PersonDetailPage({ params }: Props) {
  const { slug } = await params;
  const person = getPersonBySlug(slug);
  if (!person) notFound();

  const productions = getProductionsForPerson(person.id);
  const pressItems = getPressForPerson(person.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema(person)) }}
      />

      {/* Main layout — sticky photo on left, all content sections on right */}
      <div className="pt-28 md:pt-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left — Photo (sticky across all sections) */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24 lg:max-w-[320px]">
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={person.portrait}
                    alt={person.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Social Links */}
                {person.socialLinks && (
                  <div className="flex items-center gap-6 mt-6">
                    {person.socialLinks.instagram && (
                      <a href={person.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-wider text-purple hover:text-purple-light transition-colors">
                        Instagram
                      </a>
                    )}
                    {person.socialLinks.twitter && (
                      <a href={person.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-wider text-purple hover:text-purple-light transition-colors">
                        Twitter
                      </a>
                    )}
                    {person.socialLinks.website && (
                      <a href={person.socialLinks.website} target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-wider text-purple hover:text-purple-light transition-colors">
                        Website
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right — All content sections stacked */}
            <div className="lg:col-span-7">
              {/* Bio */}
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-purple mb-3">
                {person.roles.join(" · ")}
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream leading-[0.9] mb-8">
                {person.name}
              </h1>
              <p className="text-grey-200 text-lg md:text-xl leading-relaxed">
                {person.bio}
              </p>

              {/* Details */}
              <div className="mt-10 pt-10 border-t border-grey-700">
                <MetaRow label="Productions" value={String(productions.length)} />
                <MetaRow label="Roles" value={person.roles.join(", ")} />
              </div>

              {/* Filmography */}
              {productions.length > 0 && (
                <div className="mt-16 pt-16 border-t border-grey-700">
                  <h2 className="font-serif text-3xl md:text-4xl text-cream mb-8">
                    With Ideas Unlimited
                  </h2>
                  <div className="border-t border-grey-700">
                    {productions.map((prod) => {
                      const roles = getRolesForPerson(person.id, prod);
                      return (
                        <Link
                          key={prod.slug}
                          href={`/productions/${prod.slug}`}
                          className="flex items-center justify-between py-4 border-b border-grey-700 group"
                        >
                          <div className="flex items-baseline gap-4">
                            <span className="font-mono text-sm text-grey-400 w-12 shrink-0">({prod.year})</span>
                            <span className="font-serif text-xl text-cream group-hover:text-purple transition-colors">
                              {prod.title}
                            </span>
                          </div>
                          <span className="font-mono text-xs text-grey-400 uppercase tracking-wider hidden md:block">
                            {roles.join(" · ")}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Other Notable Work */}
              {person.otherNotableWork && person.otherNotableWork.length > 0 && (
                <div className="mt-16 pt-16 border-t border-grey-700">
                  <h2 className="font-serif text-3xl md:text-4xl text-cream mb-8">
                    Beyond IU
                  </h2>
                  <div className="border-t border-grey-700">
                    {person.otherNotableWork.map((work, i) => (
                      <div key={i} className="py-3 border-b border-grey-700 text-grey-300">
                        {typeof work === "string" ? work : work.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Press & Interviews */}
              {(person.interviews?.length || pressItems.length > 0) && (
                <div className="mt-16 pt-16 border-t border-grey-700">
                  <h2 className="font-serif text-3xl md:text-4xl text-cream mb-8">
                    Press &amp; Media
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {person.interviews?.map((interview, i) => (
                      <a
                        key={i}
                        href={interview.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-5 bg-grey-900 border border-grey-800 hover:border-grey-600 transition-all group"
                      >
                        <p className="font-mono text-xs uppercase tracking-widest text-purple mb-2">
                          {interview.source}
                        </p>
                        <p className="text-cream group-hover:text-purple transition-colors">
                          {interview.title}
                        </p>
                      </a>
                    ))}
                    {pressItems.map((item) => (
                      <PressCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between py-3 border-b border-grey-700">
      <span className="font-mono text-xs text-grey-400 uppercase tracking-wider">{label}</span>
      <span className="text-right font-medium text-cream">{value}</span>
    </div>
  );
}
