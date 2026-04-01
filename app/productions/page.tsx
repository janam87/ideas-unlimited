import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProductions, getFilterOptions } from "@/lib/data";
import { ProductionFilters } from "@/components/productions/ProductionFilters";
import { ProductionGrid } from "@/components/productions/ProductionGrid";

export const metadata: Metadata = {
  title: "Productions",
  description:
    "Explore 90+ productions spanning Hindi, Gujarati, and English theatre — from intimate dramas to grand musicals.",
};

export default function ProductionsPage() {
  const productions = getAllProductions();
  const filterOptions = getFilterOptions();

  return (
    <div className="pt-28 md:pt-32 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-cream leading-[0.9]">
              Productions
            </h1>
            <p className="font-mono text-sm text-grey-400 mt-3">
              {productions.length} productions &middot; 1990&ndash;Present
            </p>
          </div>
        </div>

        <Suspense>
          <ProductionFilters options={filterOptions} />
          <ProductionGrid productions={productions} />
        </Suspense>
      </div>
    </div>
  );
}
