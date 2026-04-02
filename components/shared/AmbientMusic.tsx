"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AmbientMusicProps {
  src: string;
  volume?: number;
}

export function AmbientMusic({ src, volume = 0.15 }: AmbientMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Fade out on unmount
  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio && !audio.paused) {
        let vol = audio.volume;
        const fade = setInterval(() => {
          vol = Math.max(0, vol - 0.02);
          audio.volume = vol;
          if (vol <= 0) {
            clearInterval(fade);
            audio.pause();
          }
        }, 30);
      }
    };
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Fade out
      let vol = audio.volume;
      const fade = setInterval(() => {
        vol = Math.max(0, vol - 0.02);
        audio.volume = vol;
        if (vol <= 0) {
          clearInterval(fade);
          audio.pause();
          setIsPlaying(false);
        }
      }, 30);
    } else {
      audio.volume = 0;
      audio.play().then(() => {
        setIsPlaying(true);
        setShowHint(false);
        // Fade in
        let vol = 0;
        const fade = setInterval(() => {
          vol = Math.min(volume, vol + 0.01);
          audio.volume = vol;
          if (vol >= volume) clearInterval(fade);
        }, 30);
      }).catch(() => {
        // Autoplay blocked — user needs to interact first
      });
    }
  }, [isPlaying, volume]);

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="none" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      >
        <AnimatePresence>
          {showHint && !isPlaying && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="font-mono text-xs text-grey-400 bg-grey-900/90 backdrop-blur-sm border border-grey-700 px-3 py-1.5 rounded-full"
            >
              Play ambient music
            </motion.span>
          )}
        </AnimatePresence>
        <button
          onClick={toggle}
          aria-label={isPlaying ? "Mute ambient music" : "Play ambient music"}
          className="group relative w-10 h-10 flex items-center justify-center rounded-full bg-grey-900/90 backdrop-blur-sm border border-grey-700 hover:border-purple transition-colors"
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 text-purple-light" />
              <span className="absolute inset-0 rounded-full border border-purple/40 animate-ping opacity-20" />
            </>
          ) : (
            <VolumeX className="w-4 h-4 text-grey-400 group-hover:text-cream transition-colors" />
          )}
        </button>
      </motion.div>
    </>
  );
}
