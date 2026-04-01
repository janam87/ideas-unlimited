"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface ProductionHeroProps {
  title: string;
  subtitle?: string;
  image: string;
  videoUrl?: string;
  isUpcoming: boolean;
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
  return match ? match[1] : null;
}

export function ProductionHero({ title, subtitle, image, videoUrl, isUpcoming }: ProductionHeroProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const videoId = videoUrl ? extractYouTubeId(videoUrl) : null;

  useEffect(() => {
    if (!videoId) return;

    function createPlayer() {
      if (!playerRef.current) return;
      new window.YT.Player(playerRef.current, {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          playlist: videoId,
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
  }, [videoId]);

  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-16 md:pb-24 overflow-hidden">
      {/* Background */}
      {videoId ? (
        <div
          className="absolute inset-0 overflow-hidden [&_iframe]:absolute [&_iframe]:top-1/2 [&_iframe]:left-1/2 [&_iframe]:-translate-x-1/2 [&_iframe]:-translate-y-1/2 [&_iframe]:min-w-[100vw] [&_iframe]:min-h-[100vh] [&_iframe]:w-[177.78vh] [&_iframe]:h-[56.25vw] [&_iframe]:border-none [&_iframe]:pointer-events-none"
          aria-hidden="true"
        >
          <div ref={playerRef} />
        </div>
      ) : (
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/90" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {isUpcoming && (
          <Badge variant="amber" className="mb-4">Now Performing</Badge>
        )}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream leading-[0.9]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-purple text-xl md:text-2xl font-serif italic mt-4">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
