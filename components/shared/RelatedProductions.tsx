import { getProductionBySlug } from "@/lib/data";
import { ProductionCard } from "@/components/productions/ProductionCard";

interface RelatedProductionsProps {
  slugs: string[];
}

export function RelatedProductions({ slugs }: RelatedProductionsProps) {
  const productions = slugs
    .map((s) => getProductionBySlug(s))
    .filter((p): p is NonNullable<typeof p> => p != null);

  if (productions.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {productions.map((p) => (
        <ProductionCard key={p.slug} production={p} />
      ))}
    </div>
  );
}
