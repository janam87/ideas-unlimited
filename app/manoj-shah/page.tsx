import type { Metadata } from "next";
import Image from "next/image";
import { getPersonBySlug, getPressForPerson } from "@/lib/data";
import { personSchema } from "@/lib/schema";
import { PressCard } from "@/components/shared/PressCard";

export const metadata: Metadata = {
  title: "Manoj Shah — Founder & Artistic Director",
  description:
    "The story of Manoj Shah — director, actor, producer, and the visionary behind 35 years of Ideas Unlimited Productions.",
  openGraph: {
    title: "Manoj Shah — Founder & Artistic Director",
    description:
      "The story of Manoj Shah — director, actor, producer, and the visionary behind 35 years of Ideas Unlimited Productions.",
    images: ["/images/placeholder-portrait.svg"],
  },
};

export default function ManojShahPage() {
  const person = getPersonBySlug("manoj-shah");
  const pressItems = getPressForPerson("manoj-shah");

  return (
    <>
      {person && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema(person)) }}
        />
      )}

      {/* Main layout — sticky photo left, all content right */}
      <div className="pt-28 md:pt-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left — Photo (sticky across all content) */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24 lg:max-w-[320px]">
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src="/images/placeholder-portrait.svg"
                    alt="Manoj Shah"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right — All content */}
            <div className="lg:col-span-7">
              {/* Name block */}
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream leading-[0.85]">
                Manoj
                <br />
                Shah
              </h1>
              <div className="mt-6 space-y-1">
                <p className="font-mono text-sm uppercase tracking-[0.3em] text-purple">Director</p>
                <p className="font-mono text-sm uppercase tracking-[0.3em] text-purple">Actor</p>
                <p className="font-mono text-sm uppercase tracking-[0.3em] text-purple">Producer</p>
              </div>

              {/* The Beginning */}
              <div className="mt-16 pt-16 border-t border-grey-700">
                <h2 className="font-serif text-3xl md:text-4xl text-cream mb-6">The Beginning</h2>
                <p className="text-grey-200 text-lg leading-relaxed mb-6">
                  In 1990, in a small rehearsal room in Mumbai, a young director made a promise to himself: he would create theatre that refused to look away. Theatre that held a mirror to society with unflinching honesty, that moved audiences not through spectacle alone but through the raw power of human truth.
                </p>
                <p className="text-grey-200 text-lg leading-relaxed">
                  That director was Manoj Shah, and the company he founded — Ideas Unlimited Productions — would go on to become one of the most important forces in Indian theatre over the next three and a half decades.
                </p>
              </div>

              {/* A Director's Philosophy */}
              <div className="mt-16 pt-16 border-t border-grey-700">
                <h2 className="font-serif text-3xl md:text-4xl text-cream mb-6">A Director&apos;s Philosophy</h2>
                <blockquote className="border-l-2 border-purple pl-6 my-8 text-xl md:text-2xl font-serif italic text-cream/80">
                  I don&apos;t make theatre for audiences who want to be comfortable. I make theatre for audiences who want to be alive.
                </blockquote>
                <p className="text-grey-200 text-lg leading-relaxed mb-6">
                  Manoj Shah&apos;s directorial vision is built on three pillars: emotional truth, visual poetry, and social conscience. Whether directing a sweeping historical epic or an intimate two-character drama, he insists on the same uncompromising standard — every moment on stage must earn its place.
                </p>
                <p className="text-grey-200 text-lg leading-relaxed">
                  His productions are known for their meticulous visual design, often featuring lighting and set work that transforms the stage into something between a painting and a dream. But beneath the visual grandeur, there is always a human story — often uncomfortable, always honest.
                </p>
              </div>

              {/* The Multilingual Vision */}
              <div className="mt-16 pt-16 border-t border-grey-700">
                <h2 className="font-serif text-3xl md:text-4xl text-cream mb-6">The Multilingual Vision</h2>
                <p className="text-grey-200 text-lg leading-relaxed mb-6">
                  Unlike many Indian theatre companies that operate within a single linguistic tradition, Shah has always insisted on working across languages. Ideas Unlimited produces work in Hindi, Gujarati, and English — not as a commercial strategy, but as a reflection of India itself.
                </p>
                <blockquote className="border-l-2 border-purple pl-6 my-8 text-xl md:text-2xl font-serif italic text-cream/80">
                  India doesn&apos;t speak one language. Why should Indian theatre?
                </blockquote>
                <p className="text-grey-200 text-lg leading-relaxed">
                  This multilingual approach has allowed the company to reach audiences across the country and to draw from the rich dramatic traditions of multiple Indian literary cultures.
                </p>
              </div>

              {/* Landmark Productions */}
              <div className="mt-16 pt-16 border-t border-grey-700">
                <h2 className="font-serif text-3xl md:text-4xl text-cream mb-6">Landmark Productions</h2>
                <p className="text-grey-200 text-lg leading-relaxed mb-6">
                  Over 90 productions have been staged under the Ideas Unlimited banner. A few landmarks:
                </p>
                <div className="border-t border-grey-700">
                  <LandmarkRow title="Saptapadi" year="2023" description="A searing exploration of gender, identity, and justice" />
                  <LandmarkRow title="Adhe Adhure" year="2022" description="A definitive revival of Mohan Rakesh's masterpiece" />
                  <LandmarkRow title="Kaumudi" year="2021" description="A sweeping Gujarati historical epic" />
                  <LandmarkRow title="Chanakya" year="2020" description="Political power through the lens of ancient India" />
                  <LandmarkRow title="Mughal-e-Azam: The Musical" year="2019" description="A Broadway-scale Indian musical" />
                </div>
              </div>

              {/* Beyond the Stage */}
              <div className="mt-16 pt-16 border-t border-grey-700">
                <h2 className="font-serif text-3xl md:text-4xl text-cream mb-6">Beyond the Stage</h2>
                <p className="text-grey-200 text-lg leading-relaxed mb-6">
                  Shah&apos;s influence extends beyond his own productions. As a mentor, he has shaped the careers of dozens of actors, directors, and designers who have gone on to significant work in theatre, film, and television.
                </p>
                <p className="text-grey-200 text-lg leading-relaxed">
                  He has served as a jury member for major theatre awards, conducted workshops across India, and been a vocal advocate for greater institutional support for the performing arts.
                </p>
              </div>

              {/* The Legacy Continues */}
              <div className="mt-16 pt-16 border-t border-grey-700">
                <h2 className="font-serif text-3xl md:text-4xl text-cream mb-6">The Legacy Continues</h2>
                <p className="text-grey-200 text-lg leading-relaxed mb-6">
                  At 35 years and counting, Ideas Unlimited Productions shows no signs of slowing down. New productions are in development, new voices are being brought into the fold, and the company&apos;s commitment to fearless storytelling remains as strong as ever.
                </p>
                <blockquote className="border-l-2 border-purple pl-6 my-8 text-xl md:text-2xl font-serif italic text-cream/80">
                  Theatre is the last space where human beings truly encounter each other — no screens, no filters, no escape. That&apos;s why it matters. That&apos;s why it will always matter.
                </blockquote>
                <p className="text-grey-200 text-lg leading-relaxed">
                  The curtain rises. The story continues.
                </p>
              </div>

              {/* Press & Interviews */}
              {pressItems.length > 0 && (
                <div className="mt-16 pt-16 border-t border-grey-700">
                  <h2 className="font-serif text-3xl md:text-4xl text-cream mb-8">
                    Interviews &amp; Coverage
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

function LandmarkRow({ title, year, description }: { title: string; year: string; description: string }) {
  return (
    <div className="flex items-baseline justify-between py-4 border-b border-grey-700">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm text-grey-400 w-12 shrink-0">({year})</span>
        <div>
          <span className="font-serif text-lg text-cream">{title}</span>
          <span className="text-grey-400 text-sm ml-2 hidden md:inline">— {description}</span>
        </div>
      </div>
    </div>
  );
}
