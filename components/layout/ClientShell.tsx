"use client";

import { useState, useCallback } from "react";
import { Navbar } from "./Navbar";

import { SearchOverlay } from "./SearchOverlay";
import { UpcomingTicker } from "./UpcomingTicker";
import type { Production, Person, Show } from "@/lib/types";

interface ClientShellProps {
  children: React.ReactNode;
  productions: Production[];
  people: Person[];
  hasNowPerforming: boolean;
  upcomingShows: { production: Production; show: Show }[];
}

export function ClientShell({ children, productions, people, hasNowPerforming, upcomingShows }: ClientShellProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  return (
    <>
      <UpcomingTicker shows={upcomingShows} />
      <Navbar hasNowPerforming={hasNowPerforming} onSearchOpen={openSearch} />
      <SearchOverlay
        open={searchOpen}
        onClose={closeSearch}
        productions={productions}
        people={people}
      />
      {children}
    </>
  );
}
