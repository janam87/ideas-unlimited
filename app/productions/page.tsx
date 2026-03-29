import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProductions, getFilterOptions } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { ProductionFilters } from "@/components/productions/ProductionFilters";
import { ProductionGrid } from "@/components/productions/ProductionGrid";

export const metadata: Metadata = {
  title: "Productions Archive",
  description:
    "Explore 90+ productions spanning Hindi, Gujarati, and English theatre — from intimate dramas to grand musicals.",
};

export default function ProductionsPage() {
  const productions = getAllProductions();
  const filterOptions = getFilterOptions();

  return (
    <div className="pt-28 md:pt-32 pb-20">
      <Container>
        {/* Newspaper-style page header */}
        <hr className="editorial-rule-thick mb-6" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold mb-2">Archive</p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-cream leading-[0.9]">
              Productions
            </h1>
          </div>
          <p className="font-mono text-sm text-grey-400">
            {productions.length} productions &middot; 1990&ndash;Present
          </p>
        </div>
        <hr className="editorial-rule mb-8" />

        <Suspense>
          <ProductionFilters options={filterOptions} />
          <ProductionGrid productions={productions} />
        </Suspense>
      </Container>
    </div>
  );
}
