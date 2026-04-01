"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { X, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { Production, Person } from "@/lib/types";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
  productions: Production[];
  people: Person[];
}

export function SearchOverlay({ open, onClose, productions, people }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) onClose();
      }
      if (e.key === "Escape" && open) onClose();
    },
    [open, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const q = query.toLowerCase().trim();
  const filteredProductions = q
    ? productions.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.language.toLowerCase().includes(q) ||
          p.genre.some((g) => g.toLowerCase().includes(q))
      )
    : [];
  const filteredPeople = q
    ? people.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.roles.some((r) => r.toLowerCase().includes(q))
      )
    : [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl flex flex-col"
        >
          <div className="flex justify-end p-6">
            <button onClick={onClose} className="text-grey-400 hover:text-cream p-2" aria-label="Close search">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center px-4 pt-8 md:pt-20">
            <div className="w-full max-w-2xl">
              <div className="flex items-center gap-4 border-b border-grey-700 pb-4">
                <Search size={24} className="text-grey-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search productions, people..."
                  className="flex-1 bg-transparent font-serif text-2xl md:text-4xl text-cream placeholder:text-grey-600 outline-none"
                />
              </div>

              <div className="mt-8 space-y-8 max-h-[60vh] overflow-y-auto">
                {filteredProductions.length > 0 && (
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-purple mb-4">
                      Productions
                    </h3>
                    <div className="space-y-2">
                      {filteredProductions.slice(0, 5).map((p) => (
                        <Link
                          key={p.slug}
                          href={`/productions/${p.slug}`}
                          onClick={onClose}
                          className="block py-3 px-4 hover:bg-grey-800 transition-colors group"
                        >
                          <span className="text-cream group-hover:text-purple transition-colors">
                            {p.title}
                          </span>
                          <span className="text-grey-400 text-sm ml-2">
                            {p.year} · {p.language}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {filteredPeople.length > 0 && (
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-purple mb-4">
                      People
                    </h3>
                    <div className="space-y-2">
                      {filteredPeople.slice(0, 5).map((p) => (
                        <Link
                          key={p.slug}
                          href={`/people/${p.slug}`}
                          onClick={onClose}
                          className="block py-3 px-4 hover:bg-grey-800 transition-colors group"
                        >
                          <span className="text-cream group-hover:text-purple transition-colors">
                            {p.name}
                          </span>
                          <span className="text-grey-400 text-sm ml-2">
                            {p.roles.join(", ")}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {q && filteredProductions.length === 0 && filteredPeople.length === 0 && (
                  <p className="text-grey-400 text-center py-8">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
