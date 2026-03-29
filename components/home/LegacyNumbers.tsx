"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "motion/react";
import { LEGACY_NUMBERS } from "@/lib/constants";

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-serif text-5xl md:text-6xl lg:text-7xl text-cream tabular-nums leading-none">
      {count}{suffix}
    </span>
  );
}

export function LegacyNumbers() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-grey-700">
        {LEGACY_NUMBERS.map((item, i) => (
          <div
            key={item.label}
            className={`py-10 md:py-16 text-center ${
              i < LEGACY_NUMBERS.length - 1 ? "border-r border-grey-700" : ""
            } ${i < 2 ? "border-b border-grey-700 md:border-b-0" : ""}`}
          >
            <CountUp target={item.value} suffix={item.suffix} />
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-grey-400">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
