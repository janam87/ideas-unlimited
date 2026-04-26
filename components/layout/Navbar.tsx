"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { NAV_PRIMARY, NAV_GROUPS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { formatShowDate, formatShowTime } from "@/lib/shows";
import type { Production, Show } from "@/lib/types";
import type { BlogPost } from "@/lib/blog";

interface NavbarProps {
  hasNowPerforming?: boolean;
  onSearchOpen: () => void;
  featured?: { production: Production; show?: Show };
  featuredPost?: BlogPost;
}

export function Navbar({ hasNowPerforming, onSearchOpen, featured, featuredPost }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  // Esc to close
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-500 border-b",
          hasNowPerforming ? "top-9" : "top-0",
          scrolled || menuOpen
            ? "bg-white/[0.06] backdrop-blur-2xl backdrop-saturate-150 border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent border-transparent"
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/images/iu-logo.png"
              alt="IU Logo"
              width={36}
              height={36}
              className="md:w-10 md:h-10"
            />
            <div className="leading-none">
              <span className="block text-cream text-sm md:text-base font-bold tracking-wide group-hover:text-purple transition-colors" style={{ fontFamily: "'Trebuchet MS', sans-serif" }}>
                Ideas Unlimited
              </span>
              <span className="block text-cream/70 text-[10px] md:text-xs tracking-widest uppercase" style={{ fontFamily: "'Trebuchet MS', sans-serif" }}>
                Production
              </span>
            </div>
          </Link>

          {/* Right side — primary link, search, menu */}
          <div className="flex items-center gap-3 md:gap-6">
            {/* Primary links visible on desktop, hidden when full-screen menu open */}
            <div className={cn("hidden items-center gap-6", !menuOpen && "md:flex")}>
              {NAV_PRIMARY.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm tracking-wide transition-colors duration-300",
                    pathname === link.href
                      ? "text-purple"
                      : "text-grey-300 hover:text-cream"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {hasNowPerforming && (
                <span className="relative flex h-2.5 w-2.5" title="Now Performing">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber" />
                </span>
              )}
            </div>

            <button
              onClick={onSearchOpen}
              className="text-grey-400 hover:text-cream transition-colors p-2"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 text-grey-300 hover:text-cream transition-colors px-2 py-2"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
              <span className="hidden md:inline text-sm tracking-widest uppercase">
                {menuOpen ? "Close" : "Menu"}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen menu overlay — Modulus-style 3-col with grid lines, fits 100vh */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={cn(
              "fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col",
              hasNowPerforming ? "pt-[6.25rem] md:pt-[7.25rem]" : "pt-16 md:pt-20"
            )}
          >
            <div className="relative flex-1 flex flex-col min-h-0">
              {/* Body */}
              <div className="relative flex-1 flex flex-col min-h-0 overflow-y-auto">
                <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-14 py-8 md:py-10 flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-0 lg:divide-x lg:divide-grey-700/60 lg:border-l lg:border-r lg:border-grey-700/60 h-full">

                    {/* Column 1 — Now Performing photo + Featured Blog headline */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.08 }}
                      className="md:col-span-2 lg:col-span-5 lg:px-8 space-y-7"
                    >
                      {featured && (
                        <div>
                          <Link
                            href="/upcoming-shows"
                            className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber hover:text-amber/70 mb-3 flex items-center gap-2 transition-colors"
                          >
                            {featured.show && (
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber" />
                              </span>
                            )}
                            Upcoming Shows
                          </Link>
                          <Link
                            href={`/productions/${featured.production.slug}`}
                            className="group block"
                          >
                            <div className="relative aspect-[16/9] w-full overflow-hidden">
                              <Image
                                src={featured.production.image}
                                alt={featured.production.title}
                                fill
                                sizes="(max-width: 1024px) 100vw, 480px"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            </div>
                            <h4 className="mt-3 font-serif text-xl md:text-2xl text-cream group-hover:text-purple transition-colors leading-tight">
                              {featured.production.title}
                            </h4>
                          </Link>

                          {featured.show && (
                            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-grey-300">
                              <span>{formatShowDate(featured.show.date)}</span>
                              <span aria-hidden className="text-grey-600">·</span>
                              <span>{formatShowTime(featured.show.time)}</span>
                              <span aria-hidden className="text-grey-600">·</span>
                              <span>{featured.show.venue}, {featured.show.city}</span>
                            </div>
                          )}

                          <Link
                            href="/upcoming-shows"
                            className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-purple hover:text-purple-light transition-colors group/cta"
                          >
                            View All Upcoming Shows
                            <ArrowUpRight size={13} className="group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
                          </Link>
                        </div>
                      )}

                      {featuredPost && (
                        <Link
                          href={`/blog/${featuredPost.slug}`}
                          className="hidden md:block group pt-6 border-t border-grey-700/60"
                        >
                          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-purple mb-2">
                            Stories · {featuredPost.category}
                          </p>
                          <h4 className="font-serif text-lg md:text-xl text-cream group-hover:text-purple transition-colors leading-snug">
                            {featuredPost.title}
                          </h4>
                          <p className="text-grey-300 text-sm mt-1.5 line-clamp-2 leading-relaxed">
                            {featuredPost.excerpt}
                          </p>
                          <span className="mt-2 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-purple group-hover:text-purple-light transition-colors">
                            Read story
                            <ArrowUpRight size={13} />
                          </span>
                        </Link>
                      )}
                    </motion.div>

                    {/* Column 2 — Theatre group */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.16 }}
                      className="lg:col-span-4 lg:px-8"
                    >
                      {NAV_GROUPS.filter((g) => g.title === "Theatre").map((group) => (
                        <div key={group.title}>
                          <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-purple mb-5">
                            {group.title}
                          </h3>
                          <ul>
                            {group.links.map((link) => {
                              const isActive = pathname === link.href;
                              return (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    className={cn(
                                      "group/item flex items-center justify-between py-3 border-b border-grey-700/50 transition-colors",
                                      isActive ? "text-purple" : "text-cream hover:text-purple"
                                    )}
                                  >
                                    <span className="font-serif text-2xl md:text-3xl leading-tight">
                                      {link.label}
                                    </span>
                                    <ArrowUpRight size={18} className="text-grey-600 group-hover/item:text-purple group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all" />
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </motion.div>

                    {/* Column 3 — More */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.24 }}
                      className="lg:col-span-3 lg:px-8"
                    >
                      {NAV_GROUPS.filter((g) => g.title === "More").map((group) => (
                        <div key={group.title}>
                          <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-purple mb-5">
                            {group.title}
                          </h3>
                          <ul>
                            {group.links.map((link) => {
                              const isActive = pathname === link.href;
                              return (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    className={cn(
                                      "group/item flex items-center justify-between py-3 border-b border-grey-700/50 transition-colors",
                                      isActive ? "text-purple" : "text-cream hover:text-purple"
                                    )}
                                  >
                                    <span className="font-serif text-xl md:text-2xl leading-tight">
                                      {link.label}
                                    </span>
                                    <ArrowUpRight size={16} className="text-grey-600 group-hover/item:text-purple group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all" />
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.32 }}
                className="border-t border-grey-700/60 bg-background/40 backdrop-blur"
              >
                <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-14 py-4 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8 text-xs">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-grey-400">Follow</span>
                    <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className="text-cream hover:text-purple transition-colors">Instagram</a>
                    <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" className="text-cream hover:text-purple transition-colors">Facebook</a>
                    <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" className="text-cream hover:text-purple transition-colors">YouTube</a>
                  </div>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-grey-400">Contact</span>
                    <a href={`mailto:${SITE.email}`} className="text-cream hover:text-purple transition-colors">{SITE.email}</a>
                    <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="text-cream hover:text-purple transition-colors">{SITE.phone}</a>
                  </div>
                  <p className="font-serif italic text-cream md:text-right">
                    {SITE.tagline} · Since {SITE.foundedYear}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
