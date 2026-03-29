"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { Person } from "@/lib/types";
import { PersonCard } from "./PersonCard";
import { getProductionCount } from "@/lib/data";

interface PeopleGridProps {
  people: Person[];
}

export function PeopleGrid({ people }: PeopleGridProps) {
  const searchParams = useSearchParams();

  const filtered = useMemo(() => {
    let result = people;
    const role = searchParams.get("role");
    const sort = searchParams.get("sort");

    if (role) result = result.filter((p) => p.roles.includes(role));
    if (sort === "productions") {
      result = [...result].sort((a, b) => getProductionCount(b.id) - getProductionCount(a.id));
    }

    return result;
  }, [people, searchParams]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filtered.map((person) => (
        <PersonCard key={person.slug} person={person} />
      ))}
    </div>
  );
}
