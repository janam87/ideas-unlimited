"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { HERO_VIDEO_ID } from "@/lib/constants";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Window {
    YT: any;
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
          onReady: (event: { target: { mute: () => void; playVideo: () => void } }) => {
            event.target.mute();
            event.target.playVideo();
          },
          onStateChange: (event: { data: number; target: { playVideo: () => void } }) => {
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
      <div className="absolute inset-0 overflow-hidden [&_iframe]:absolute [&_iframe]:top-1/2 [&_iframe]:left-1/2 [&_iframe]:-translate-x-1/2 [&_iframe]:-translate-y-1/2 [&_iframe]:min-w-[100vw] [&_iframe]:min-h-[100vh] [&_iframe]:w-[177.78vh] [&_iframe]:h-[56.25vw] [&_iframe]:border-none [&_iframe]:pointer-events-none" aria-hidden="true">
        <div
          ref={playerRef}
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
          className="font-mono text-xs uppercase tracking-[0.4em] text-purple mb-4"
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
