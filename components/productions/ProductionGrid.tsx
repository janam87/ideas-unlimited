"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { Production } from "@/lib/types";
import { ProductionCard } from "./ProductionCard";

interface ProductionGridProps {
  productions: Production[];
}

export function ProductionGrid({ productions }: ProductionGridProps) {
  const searchParams = useSearchParams();

  const filtered = useMemo(() => {
    let result = productions;
    const type = searchParams.get("type");
    const language = searchParams.get("language");
    const genre = searchParams.get("genre");
    const year = searchParams.get("year");

    if (type) result = result.filter((p) => p.type === type);
    if (language) result = result.filter((p) => p.language === language);
    if (genre) result = result.filter((p) => p.genre.includes(genre));
    if (year) result = result.filter((p) => p.year === Number(year));

    return result;
  }, [productions, searchParams]);

  if (filtered.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-grey-400 text-lg">No productions match your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filtered.map((production) => (
        <ProductionCard key={production.slug} production={production} />
      ))}
    </div>
  );
}
