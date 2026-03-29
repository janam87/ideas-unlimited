"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-16 md:pb-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-grey-900/30 to-background" />
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: "url(/images/placeholder-hero.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content — newspaper masthead style */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Top rule */}
        <hr className="editorial-rule-thick mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0">
          {/* Main headline — spans 8 cols */}
          <div className="lg:col-span-8 lg:border-r lg:border-grey-700 lg:pr-12">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-mono text-xs uppercase tracking-[0.4em] text-gold mb-4"
            >
              Est. 1990 — Mumbai, India
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] text-cream leading-[0.9] tracking-tight"
            >
              35 Years of
              <br />
              Fearless Theatre
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-8 text-grey-300 text-lg md:text-xl max-w-xl leading-relaxed"
            >
              Ideas Unlimited Productions has been creating powerful,
              thought-provoking theatre across India — in Hindi, Gujarati,
              and English.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row items-start gap-4"
            >
              <Button href="/productions" size="lg">
                Explore Productions
              </Button>
              <Button href="/manoj-shah" variant="ghost" size="lg">
                Meet the Founder &rarr;
              </Button>
            </motion.div>
          </div>

          {/* Sidebar — spans 4 cols */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="lg:col-span-4 lg:pl-12 flex flex-col justify-end"
          >
            <div className="space-y-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-grey-400 mb-1">Founded by</p>
                <p className="font-serif text-2xl text-cream">Manoj Shah</p>
                <p className="text-grey-400 text-sm mt-1">Director, Actor, Producer</p>
              </div>
              <hr className="editorial-rule" />
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-grey-400 mb-1">Languages</p>
                <p className="text-cream">Hindi &middot; Gujarati &middot; English</p>
              </div>
              <hr className="editorial-rule" />
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-grey-400 mb-1">Home Stage</p>
                <p className="text-cream">Prithvi Theatre, Mumbai</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom rule */}
        <hr className="editorial-rule mt-12" />
      </div>
    </section>
  );
}
