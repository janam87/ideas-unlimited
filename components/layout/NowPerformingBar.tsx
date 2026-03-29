"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Ticket } from "lucide-react";
import type { Production } from "@/lib/types";
import { getNowPerformingProductions, formatShowDate } from "@/lib/shows";

interface NowPerformingBarProps {
  productions: Production[];
}

export function NowPerformingBar({ productions }: NowPerformingBarProps) {
  const [nowPerforming, setNowPerforming] = useState<Production[]>([]);

  useEffect(() => {
    setNowPerforming(getNowPerformingProductions(productions));
  }, [productions]);

  if (nowPerforming.length === 0) return null;

  const show = nowPerforming[0];
  const nextShow = show.shows?.[0];

  return (
    <div className="fixed top-16 md:top-20 left-0 right-0 z-40 bg-amber/90 text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Ticket size={16} className="shrink-0" />
          <span className="text-sm font-medium truncate">
            <span className="font-bold">Now Performing:</span>{" "}
            <Link href={`/productions/${show.slug}`} className="underline underline-offset-2 hover:no-underline">
              {show.title}
            </Link>
            {nextShow && (
              <span className="hidden sm:inline">
                {" "}— {nextShow.venue}, {formatShowDate(nextShow.date)}
              </span>
            )}
          </span>
        </div>
        {nextShow?.ticketUrl && (
          <a
            href={nextShow.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-xs font-bold uppercase tracking-wider bg-background text-amber px-3 py-1 hover:bg-grey-900 transition-colors"
          >
            Book Tickets
          </a>
        )}
      </div>
    </div>
  );
}
