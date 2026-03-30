"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { HERO_VIDEO_ID } from "@/lib/constants";

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function Hero() {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function createPlayer() {
      if (!playerRef.current) return;
      new window.YT.Player(playerRef.current, {
        videoId: HERO_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          playlist: HERO_VIDEO_ID,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event: YT.PlayerEvent) => {
            event.target.mute();
            event.target.playVideo();
          },
          onStateChange: (event: YT.OnStateChangeEvent) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo();
            }
          },
        },
      });
    }

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    }
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-16 md:pb-24 overflow-hidden">
      {/* Video Background — full edge-to-edge */}
      <div className="absolute inset-0 overflow-hidden [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-none" aria-hidden="true">
        <div
          ref={playerRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[100vw] min-h-[100vh] w-[177.78vh] h-[56.25vw] pointer-events-none"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/90" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
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
          className="mt-8"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-grey-400 mb-1">Founded by</p>
          <p className="font-serif text-2xl text-cream">Manoj Shah</p>
          <p className="text-grey-400 text-sm mt-1">Director, Actor, Producer</p>
        </motion.div>
      </div>
    </section>
  );
}
