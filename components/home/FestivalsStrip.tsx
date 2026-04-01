"use client";

import { getAllFestivals } from "@/lib/data";

export function FestivalsStrip() {
  const festivals = getAllFestivals();
  const uniqueNames = [...new Set(festivals.map((f) => f.name))];
  // Double the list for seamless loop
  const items = [...uniqueNames, ...uniqueNames];

  return (
    <section className="border-t border-grey-700">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Left — section title */}
          <div className="lg:col-span-5">
            <h2 className="font-serif text-3xl md:text-4xl text-cream leading-[0.95]">
              Performed At
            </h2>
          </div>

          {/* Right — scrolling marquee */}
          <div className="lg:col-span-7 overflow-hidden">
            <div className="flex animate-marquee gap-x-10 whitespace-nowrap">
              {items.map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="font-serif text-lg text-grey-400 shrink-0"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
