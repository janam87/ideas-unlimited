"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface PeopleFiltersProps {
  roleTypes: string[];
}

export function PeopleFilters({ roleTypes }: PeopleFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <div className="flex flex-wrap gap-3 mb-10">
      <select
        value={searchParams.get("role") || ""}
        onChange={(e) => setFilter("role", e.target.value)}
        className="bg-grey-800 border border-grey-700 text-grey-300 text-sm pl-4 pr-10 py-2.5 outline-none focus:border-purple transition-colors cursor-pointer"
      >
        <option value="">All Roles</option>
        {roleTypes.map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>

      <select
        value={searchParams.get("sort") || ""}
        onChange={(e) => setFilter("sort", e.target.value)}
        className="bg-grey-800 border border-grey-700 text-grey-300 text-sm pl-4 pr-10 py-2.5 outline-none focus:border-purple transition-colors cursor-pointer"
      >
        <option value="">Sort: Name</option>
        <option value="productions">Sort: Most Productions</option>
      </select>

      {searchParams.get("role") && (
        <button
          onClick={() => router.push("/people", { scroll: false })}
          className="text-purple text-sm hover:text-purple-light transition-colors px-3 py-2"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
