"use client";

import { useState, useCallback } from "react";
import { Navbar } from "./Navbar";

import { SearchOverlay } from "./SearchOverlay";
import { UpcomingTicker } from "./UpcomingTicker";
import type { Production, Person, Show } from "@/lib/types";
import type { BlogPost } from "@/lib/blog";

interface ClientShellProps {
  children: React.ReactNode;
  productions: Production[];
  people: Person[];
  hasNowPerforming: boolean;
  upcomingShows: { production: Production; show: Show }[];
  navFeatured?: { production: Production; show?: Show };
  featuredPost?: BlogPost;
}

export function ClientShell({ children, productions, people, hasNowPerforming, upcomingShows, navFeatured, featuredPost }: ClientShellProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  return (
    <>
      <UpcomingTicker shows={upcomingShows} />
      <Navbar
        hasNowPerforming={hasNowPerforming}
        onSearchOpen={openSearch}
        featured={navFeatured}
        featuredPost={featuredPost}
      />
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
