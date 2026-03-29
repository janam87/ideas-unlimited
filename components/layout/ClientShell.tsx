"use client";

import { useState, useCallback } from "react";
import { Navbar } from "./Navbar";
import { NowPerformingBar } from "./NowPerformingBar";
import { SearchOverlay } from "./SearchOverlay";
import type { Production, Person } from "@/lib/types";

interface ClientShellProps {
  children: React.ReactNode;
  productions: Production[];
  people: Person[];
  hasNowPerforming: boolean;
}

export function ClientShell({ children, productions, people, hasNowPerforming }: ClientShellProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  return (
    <>
      <Navbar hasNowPerforming={hasNowPerforming} onSearchOpen={openSearch} />
      <NowPerformingBar productions={productions} />
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
