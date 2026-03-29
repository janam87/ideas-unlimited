import { getAllFestivals } from "@/lib/data";
import { Container } from "@/components/ui/Container";

export function FestivalsStrip() {
  const festivals = getAllFestivals();
  const uniqueNames = [...new Set(festivals.map((f) => f.name))];

  return (
    <section className="border-t border-grey-700">
      <Container>
        <div className="py-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold shrink-0">
            Performed At
          </p>
          <hr className="editorial-rule flex-1 hidden md:block" />
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {uniqueNames.map((name) => (
              <span
                key={name}
                className="font-serif text-lg text-grey-400 hover:text-cream transition-colors whitespace-nowrap"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
