import type { Metadata } from "next";
import { getAllProductions } from "@/lib/data";
import { ProductionCard } from "@/components/productions/ProductionCard";
import { Mandala } from "@/components/shared/Mandala";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Jain Performing Arts",
  description:
    "Plays rooted in Jain philosophy, history, and wisdom — produced by Ideas Unlimited. Stories of Bhamasha, Bhav Prapanch, Apurva Avsar, Apoorav Khela and more.",
  // Work in progress — keep out of search index for now
  robots: { index: false, follow: true },
  openGraph: {
    title: `Jain Performing Arts | ${SITE.name}`,
    description:
      "Theatre rooted in Jain philosophy and history — stories of courage, non-violence and inner awakening.",
  },
};

export default function JainPerformingArtsPage() {
  const productions = getAllProductions().filter((p) => p.tags?.includes("jain"));

  return (
    <div data-theme="jain" className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-24 jain-mandala">
        <Mandala
          size={520}
          className="absolute -top-20 -right-20 text-purple/40 pointer-events-none hidden md:block"
        />
        <Mandala
          size={280}
          className="absolute top-16 -right-20 text-purple/30 pointer-events-none md:hidden"
        />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-purple-dark mb-5">
            A Sacred Collection
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream leading-[0.95] max-w-3xl">
            Jain
            <br />
            Performing Arts
          </h1>
          <hr className="jain-divider my-10 max-w-[240px]" />
          <p className="text-grey-300 text-lg md:text-xl leading-relaxed max-w-2xl">
            Stories drawn from Jain philosophy, history and scripture — staged
            with the reverence they deserve and the craft of thirty-five years.
            Plays of courage, compassion, and the quiet, ceaseless work of the soul.
          </p>
        </div>
      </section>

      {/* Productions grid */}
      <section className="border-t border-grey-700 pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-cream">
              The Productions
            </h2>
            <span className="font-mono text-xs uppercase tracking-widest text-grey-400">
              {productions.length}{" "}
              {productions.length === 1 ? "Play" : "Plays"}
            </span>
          </div>

          {productions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {productions.map((p) => (
                <ProductionCard key={p.slug} production={p} />
              ))}
            </div>
          ) : (
            <p className="text-grey-400">More productions coming soon.</p>
          )}
        </div>
      </section>

      {/* Footer ornament */}
      <section className="relative overflow-hidden border-t border-grey-700 py-20">
        <Mandala
          size={360}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-purple/20 pointer-events-none"
        />
        <div className="mx-auto max-w-3xl px-4 text-center relative">
          <p className="font-serif italic text-2xl md:text-3xl text-cream leading-snug">
            &ldquo;Ahimsa Paramo Dharma&rdquo;
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-grey-400 mt-4">
            Non-violence is the highest virtue
          </p>
        </div>
      </section>
    </div>
  );
}
