import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllPeople } from "@/lib/data";
import { PeopleFilters } from "@/components/people/PeopleFilters";
import { PeopleGrid } from "@/components/people/PeopleGrid";

export const metadata: Metadata = {
  title: "People",
  description:
    "Meet the actors, directors, writers, and designers who have made Ideas Unlimited Productions a force in Indian theatre.",
  alternates: { canonical: "/people" },
};

export default function PeoplePage() {
  const people = getAllPeople();
  const roleTypes = [...new Set(people.flatMap((p) => p.roles))].sort();

  return (
    <div className="pt-28 md:pt-32 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          <div className="lg:col-span-5">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-cream leading-[0.9]">
              The People
            </h1>
            <p className="font-mono text-sm text-grey-400 mt-3">
              {people.length} artists &middot; 35 years
            </p>
          </div>
          <div className="lg:col-span-7">
            <p className="text-grey-200 text-lg md:text-xl leading-relaxed">
              Ideas Unlimited has always been a collaborative endeavour. Over thirty-five years, the company has gathered actors who inhabit characters with startling truth, writers who find the extraordinary in the everyday, and designers who turn bare stages into worlds.
            </p>
            <p className="text-grey-300 text-base md:text-lg leading-relaxed mt-4">
              Many return production after production — drawn by the creative freedom and the uncompromising standard that defines the company. From seasoned veterans to emerging voices, the Ideas Unlimited family continues to grow.
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
