"use client";

import Link from "next/link";
import type { Production, Show } from "@/lib/types";

interface UpcomingTickerProps {
  shows: { production: Production; show: Show }[];
}

function formatTickerDate(date: string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function formatTickerTime(time: string): string {
  const [hours, minutes] = time.split(":");
  const h = parseInt(hours);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${minutes} ${ampm}`;
}

export function UpcomingTicker({ shows }: UpcomingTickerProps) {
  if (shows.length === 0) return null;

  // Double the items for seamless loop
  const items = [...shows, ...shows];

  return (
    <div className="fixed top-0 left-0 right-0 bg-pink text-white overflow-hidden h-9 flex items-center z-[60]">
      <div className="animate-marquee flex whitespace-nowrap">
        {items.map((item, i) => (
          <Link
            key={i}
            href={`/productions/${item.production.slug}`}
            className="inline-flex items-center gap-3 mx-8 text-sm hover:text-white/80 transition-colors"
          >
            <span className="font-bold">{item.production.title}</span>
            <span className="text-white/70">&middot;</span>
            <span>{formatTickerDate(item.show.date)}</span>
            <span className="text-white/70">&middot;</span>
            <span>{formatTickerTime(item.show.time)}</span>
            <span className="text-white/70">&middot;</span>
            <span>{item.show.venue}, {item.show.city}</span>
            {item.show.status === "almost-full" && (
              <span className="bg-white/20 px-2 py-0.5 text-xs font-bold uppercase tracking-wider">
                Almost Full
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
