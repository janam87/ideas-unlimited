"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface NavbarProps {
  hasNowPerforming?: boolean;
  onSearchOpen: () => void;
}

export function Navbar({ hasNowPerforming, onSearchOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-500 border-b",
        hasNowPerforming ? "top-9" : "top-0",
        scrolled
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

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
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

          <button
            onClick={onSearchOpen}
            className="text-grey-400 hover:text-cream transition-colors p-2"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          {hasNowPerforming && (
            <span className="relative flex h-2.5 w-2.5" title="Now Performing">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber" />
            </span>
          )}
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onSearchOpen}
            className="text-grey-400 hover:text-cream p-2"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-grey-400 hover:text-cream p-2"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 top-16 bg-background/98 backdrop-blur-lg z-40 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-serif text-3xl transition-colors",
                    pathname === link.href ? "text-purple" : "text-cream"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
