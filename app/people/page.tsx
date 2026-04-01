import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllPeople } from "@/lib/data";
import { PeopleFilters } from "@/components/people/PeopleFilters";
import { PeopleGrid } from "@/components/people/PeopleGrid";

export const metadata: Metadata = {
  title: "People",
  description:
    "Meet the actors, directors, writers, and designers who have made Ideas Unlimited Productions a force in Indian theatre.",
};

export default function PeoplePage() {
  const people = getAllPeople();
  const roleTypes = [...new Set(people.flatMap((p) => p.roles))].sort();

  return (
    <div className="pt-28 md:pt-32 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-cream leading-[0.9]">
              The People
            </h1>
            <p className="font-mono text-sm text-grey-400 mt-3">
              {people.length} artists &middot; 35 years
            </p>
          </div>
        </div>

        <Suspense>
          <PeopleFilters roleTypes={roleTypes} />
          <PeopleGrid people={people} />
        </Suspense>
      </div>
    </div>
  );
}
