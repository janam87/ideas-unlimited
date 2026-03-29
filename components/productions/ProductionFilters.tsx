"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { FilterOptions } from "@/lib/types";

interface ProductionFiltersProps {
  options: FilterOptions;
}

export function ProductionFilters({ options }: ProductionFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const current = (key: string) => searchParams.get(key) || "";

  return (
    <div className="flex flex-wrap gap-3 mb-10">
      <select
        value={current("type")}
        onChange={(e) => setFilter("type", e.target.value)}
        className="bg-grey-800 border border-grey-700 text-grey-300 text-sm px-3 py-2 outline-none focus:border-gold transition-colors"
      >
        <option value="">All Types</option>
        {options.types.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <select
        value={current("language")}
        onChange={(e) => setFilter("language", e.target.value)}
        className="bg-grey-800 border border-grey-700 text-grey-300 text-sm px-3 py-2 outline-none focus:border-gold transition-colors"
      >
        <option value="">All Languages</option>
        {options.languages.map((l) => (
          <option key={l} value={l}>{l}</option>
        ))}
      </select>

      <select
        value={current("genre")}
        onChange={(e) => setFilter("genre", e.target.value)}
        className="bg-grey-800 border border-grey-700 text-grey-300 text-sm px-3 py-2 outline-none focus:border-gold transition-colors"
      >
        <option value="">All Genres</option>
        {options.genres.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>

      <select
        value={current("year")}
        onChange={(e) => setFilter("year", e.target.value)}
        className="bg-grey-800 border border-grey-700 text-grey-300 text-sm px-3 py-2 outline-none focus:border-gold transition-colors"
      >
        <option value="">All Years</option>
        {options.years.map((y) => (
          <option key={y} value={String(y)}>{y}</option>
        ))}
      </select>

      {current("type") || current("language") || current("genre") || current("year") ? (
        <button
          onClick={() => router.push("/productions", { scroll: false })}
          className="text-gold text-sm hover:text-gold-light transition-colors px-3 py-2"
        >
          Clear Filters
        </button>
      ) : null}
    </div>
  );
}
