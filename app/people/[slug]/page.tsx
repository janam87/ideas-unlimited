import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPersonBySlug, getAllPeople, getProductionsForPerson, getRolesForPerson, getPressForPerson } from "@/lib/data";
import { personSchema } from "@/lib/schema";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { PressCard } from "@/components/shared/PressCard";
import { ShareButton } from "@/components/shared/ShareButton";

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

      <div className="pt-28 md:pt-32 pb-20">
        <Container>
          <hr className="editorial-rule-thick mb-10" />

          {/* Two-column profile header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 mb-12">
            {/* Portrait — 4 cols */}
            <div className="lg:col-span-4 lg:border-r lg:border-grey-700 lg:pr-10 mb-8 lg:mb-0">
              <div className="relative aspect-[3/4] max-w-sm">
                <Image
                  src={person.portrait}
                  alt={person.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Info — 8 cols */}
            <div className="lg:col-span-8 lg:pl-10">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold mb-3">
                {person.roles.join(" &middot; ")}
              </p>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-cream leading-[0.9] mb-6">
                {person.name}
              </h1>
              <hr className="editorial-rule mb-6" />
              <p className="text-grey-300 text-lg leading-relaxed mb-8 max-w-2xl">
                {person.bio}
              </p>

              {/* Stats row */}
              <div className="flex items-center gap-8 mb-6">
                <div>
                  <span className="font-serif text-3xl text-cream">{productions.length}</span>
                  <span className="font-mono text-xs text-grey-400 uppercase tracking-wider ml-2">Productions</span>
                </div>
                <div className="w-px h-8 bg-grey-700" />
                <ShareButton title={person.name} text={person.bio.slice(0, 100)} />
              </div>
            </div>
          </div>

          {/* Filmography — editorial list like 13 Little Pictures reference */}
          {productions.length > 0 && (
            <section className="mb-12">
              <hr className="editorial-rule mb-8" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-3 mb-4 lg:mb-0">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">With Ideas Unlimited</p>
                </div>
                <div className="lg:col-span-9">
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
                            <span className="font-serif text-xl text-cream group-hover:text-gold transition-colors">
                              {prod.title}
                            </span>
                          </div>
                          <span className="font-mono text-xs text-grey-400 uppercase tracking-wider hidden md:block">
                            {roles.join(" &middot; ")}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Other Notable Work */}
          {person.otherNotableWork && person.otherNotableWork.length > 0 && (
            <section className="mb-12">
              <hr className="editorial-rule mb-8" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-3 mb-4 lg:mb-0">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">Beyond IU</p>
                </div>
                <div className="lg:col-span-9">
                  <div className="border-t border-grey-700">
                    {person.otherNotableWork.map((work, i) => (
                      <div key={i} className="py-3 border-b border-grey-700 text-grey-300">
                        {work}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Press & Interviews */}
          {(person.interviews?.length || pressItems.length > 0) && (
            <section className="mb-12">
              <hr className="editorial-rule mb-8" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-3 mb-4 lg:mb-0">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">Press & Media</p>
                </div>
                <div className="lg:col-span-9">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {person.interviews?.map((interview, i) => (
                      <a
                        key={i}
                        href={interview.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="editorial-card p-5 group block"
                      >
                        <p className="font-mono text-xs uppercase tracking-widest text-gold mb-2">
                          {interview.source}
                        </p>
                        <p className="text-cream group-hover:text-gold transition-colors">
                          {interview.title}
                        </p>
                      </a>
                    ))}
                    {pressItems.map((item) => (
                      <PressCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </Container>
      </div>
    </>
  );
}
